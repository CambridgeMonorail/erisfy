# Backtesting Requirements Document

## 1. Overview & Objectives

- **Goal**: Evaluate and refine investment rule sets under historical market data with minimal storage overhead and cost.  
- **Key Points**:  
  1. **On-Demand Data Retrieval**: Pull just the necessary slices from the data vendor to avoid ballooning costs.  
  2. **Modular Rule Engine**: Implement a pluggable, weighted filters system so rule sets can evolve.  
  3. **Feedback Loop**: Store backtest outcomes and automatically adjust rule weights.  
  4. **Lightweight Local Storage**: Maintain daily or aggregated data within Postgres for recently needed ranges; rely on external APIs for older data.

## 2. Functional Requirements

1. **Modular Rule Engine**  
   - *Description*: Each rule returns a pass/fail or 0–1 score. A weighting module aggregates these scores.  
   - *Requirement*:  
     - Provide a standard interface (e.g., `evaluate(stockData) => number`) for custom rule modules.  
     - Allow dynamic reordering or weighting of these rules.  
     - Support chaining or layering multiple rule sets.  
2. **On-Demand Historical Data**  
   - *Description*: Pull historical data only when needed, focusing on daily or aggregated intervals to reduce cost.  
   - *Requirement*:  
     - Integrate with the data vendor’s date-ranged endpoint.  
     - Cache only the most recent or most frequently used data in Postgres.  
     - Discard or compress older data unless a user explicitly requests it for a new backtest.  
3. **Backtest Pipeline**  
   - *Description*: Provide a repeatable pipeline for “fetch data → run rules → evaluate performance → store outcomes.”  
   - *Requirement*:  
     - Nx `target` (e.g., `nx backtest <portfolio>`) to orchestrate fetch, run, and store steps.  
     - Summarize final P&L, volatility, or classification accuracy for the time window.  
     - Export key metrics (like Sharpe Ratio, Max Drawdown, etc.) in a standard JSON format.  
4. **Performance Feedback & Weight Adjustments**  
   - *Description*: Over time, rules that historically perform well get higher weights; poorly performing rules get discounted.  
   - *Requirement*:  
     - Log final returns vs. benchmark, store them in `backtest_results` table.  
     - Automate or semi-automate the reweighting of each rule based on historical performance.  
5. **Versioning of Rule Sets**  
   - *Description*: Keep track of different rule sets over time (e.g., “Ruleset v1.0,” “Ruleset v2.3”).  
   - *Requirement*:  
     - Each ruleset must have a unique ID or version label.  
     - Changes to rule weighting or logic should be appended with a new version.  
     - The backtest pipeline should reference the ruleset version in each run.

## 3. Technical Requirements

1. **Architecture & Code Organization**  
   - Place backtesting logic in `libs/backtest-engine/` for easy reuse.  
   - Expose an Nx target, e.g. `nx backtest`, referencing a script in `tools/backtesting/`.  
   - Use React hooks for UI components that display results or let the user configure a new backtest in `apps/client/src/components/Backtest/`.  
2. **Data Layer**  
   - **Local Storage**:  
     - Postgres DB in `apps/api/src/db/` or `libs/db/` with a `daily_ohlc` (or similar) table.  
     - Keep a rolling window (e.g., 3–5 years) for immediate re-tests.  
   - **Remote Vendor API**:  
     - Provide config in `.env` for base URLs and tokens.  
     - Implement an `onDemandFetch()` function in your `@erisfy/api-client` library for date-ranged queries.  
3. **Rule Engine**  
   - **Filter & Score**:  
     - Each rule:  

       ```ts
       export function valuationRule(stockData: StockData): number {
         // returns a 0..1 score
       }
       ```  

     - Weighted aggregator sums or averages the rule outputs.  
   - **Feedback**:  
     - Store final returns and rule contributions (e.g. Weighted Score) in a `backtest_results` table.  
     - Automatic or semi-automatic reweighting using either a basic formula or a more advanced method (RL/online learning).  
4. **Error Handling**  
   - Use `ApiError` from `@erisfy/api-client` for vendor calls.  
   - Log vendor errors, especially around unavailable historical data, and fallback gracefully.  
5. **Testing**  
   - Vitest for unit tests in `libs/backtest-engine/src/tests/`.  
   - A small set of end-to-end tests in `apps/client-e2e` to verify the UI triggers the backtest pipeline.  

## 4. Operational Flow

1. **User Requests a Backtest**  
   - A user or scheduled job calls `nx backtest <rulesetVersion>` or triggers a UI button in the client.  
2. **Fetch Data**  
   - If needed date range is outside local Postgres coverage, system calls remote vendor (via `@erisfy/api-client`) to retrieve older data on-demand.  
3. **Run Rule Engine**  
   - Data flows through each pluggable rule.  
   - Weighted aggregator compiles a final score or simulated trade decisions.  
4. **Evaluate Performance**  
   - The system simulates P&L or classification accuracy for the chosen period.  
   - Outcomes are stored in `backtest_results`.  
5. **Feedback & Weights**  
   - If automatic mode: run reweighting.  
   - If manual mode: store suggestions for an investment team to accept or reject.  

## 5. Security & Cost Considerations

1. **Security**  
   - Use environment variables to store data vendor credentials (`API_BASE_URL`, `API_KEY`).  
   - Restrict DB access to minimal privileges for the backtest pipeline.  
2. **Cost**  
   - Keep minimal local data, rely on vendor’s date-range endpoints.  
   - Possibly batch multiple user requests to reduce repeated vendor fetch calls.  

## 6. Deliverables

- **Backtest Engine** library with:  
  - Rules interface and aggregator.  
  - Weighted filters and feedback.  
  - Nx target (`nx backtest`).  
- **Database Schema** changes with `daily_ohlc` (and optional `intraday` for advanced usage).  
- **CLI & UI Integration** to run backtests, display results, manage rule sets.  
- **Automated Tests**: Vitest unit tests + small E2E checks with Playwright.

## 7. Timeline & Next Steps

1. **Setup** (1–2 sprints)  
   - Build out `libs/backtest-engine/`, define rule interface, aggregator, Nx target.  
   - Create Postgres schema for minimal daily OHLC.  
2. **Integration** (1–2 sprints)  
   - Implement “fetch on-demand” flow from vendor.  
   - Wire up UI to let users pick date ranges, rule sets, etc.  
3. **Feedback Loop** (1 sprint)  
   - Implement basic weighting updates.  
   - Store logs in `backtest_results`.  
4. **Refinement** (Ongoing)  
   - Expand advanced features (e.g., reinforcement learning, multiple time frames).

---
