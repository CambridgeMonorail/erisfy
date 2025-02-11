
# Value Investing Automation Requirements

## Overview

We aim to build an automated value investing system using [financialdatasets.ai](https://financialdatasets.ai/) as our primary data source. The system will be implemented with a **Node.js TypeScript** middle layer, incorporating **node-cron** for scheduled tasks.

## Key Features

1. **Automated Stock Screening**
   - Regularly fetch financial data for a defined list of stocks or the entire market
   - Apply quantifiable value investing heuristics to assess stock eligibility

2. **Scheduled Evaluations**
   - Use **node-cron** to automate periodic data fetching and evaluation (e.g., daily, weekly)
   - Generate reports or alerts when stocks meet value investing criteria

3. **API Integration**
   - Connect to [financialdatasets.ai](https://financialdatasets.ai/) for real-time financial data
   - Ensure secure and efficient API calls, handling rate limits and retries

4. **Report Generation**
   - Provide detailed reports of screened stocks, including metrics and explanations
   - Support export formats like JSON, CSV, and PDF

5. **User Configuration**
   - Allow customization of criteria thresholds (e.g., P/E ratio limit, ROE minimum)
   - Enable selection of specific industries, sectors, or stock lists

---

## Technical Requirements

### 1. Data Sources & API Integration

#### API Provider

- URL: [https://financialdatasets.ai/](https://financialdatasets.ai/)
- Authentication: API key required in headers as `X-API-KEY`

#### Example API Request

```typescript
import axios from 'axios';

const API_KEY = 'your_api_key_here';
const ticker = 'AAPL';
const period = 'annual';
const limit = 10;

const url = `https://api.financialdatasets.ai/financials/income-statements?ticker=${ticker}&period=${period}&limit=${limit}`;

axios.get(url, {
  headers: {
    'X-API-KEY': API_KEY,
  },
})
  .then(response => {
    const incomeStatements = response.data.income_statements;
    console.log(incomeStatements);
  })
  .catch(error => {
    console.error('Error fetching income statements:', error);
  });
```

#### Data to Retrieve

- **Valuation Metrics:**
  - **P/E Ratio:** [Historical Financial Metrics API](https://docs.financialdatasets.ai/api-reference/endpoint/financial-metrics/historical)
  - **P/B Ratio:** Same as above
  - **P/S Ratio:** Same as above
  - **Earnings Yield:** Derived from [Income Statements API](https://docs.financialdatasets.ai/api-reference/endpoint/financials/income-statements)

- **Profitability Metrics:**
  - **ROE, ROA, ROIC:** [Historical Financial Metrics API](https://docs.financialdatasets.ai/api-reference/endpoint/financial-metrics/historical)
  - **EPS Growth:** Calculated using [Income Statements API](https://docs.financialdatasets.ai/api-reference/endpoint/financials/income-statements)

- **Debt Metrics:**
  - **Debt-to-Equity, Current Ratio:** [Historical Financial Metrics API](https://docs.financialdatasets.ai/api-reference/endpoint/financial-metrics/historical)
  - **Interest Coverage Ratio:** Calculated from [Income Statements API](https://docs.financialdatasets.ai/api-reference/endpoint/financials/income-statements) and [Balance Sheets API](https://docs.financialdatasets.ai/api-reference/endpoint/financials/balance-sheets)

- **Free Cash Flow & Dividends:**
  - **FCF Yield:** Derived from [Cash Flow Statements API](https://docs.financialdatasets.ai/api-reference/endpoint/financials/cash-flow-statements)
  - **Dividend Yield, Payout Ratio, Dividend Growth:** [Historical Financial Metrics API](https://docs.financialdatasets.ai/api-reference/endpoint/financial-metrics/historical)

- **Industry Data:**
  - **Sector CAGR, Industry Growth Trends:** May require external sources as specific sector-level growth metrics may not be directly available

- **Historical Data:**
  - **5-10 Years Financial History:** Available through [Income Statements API](https://docs.financialdatasets.ai/api-reference/endpoint/financials/income-statements), [Balance Sheets API](https://docs.financialdatasets.ai/api-reference/endpoint/financials/balance-sheets), and [Cash Flow Statements API](https://docs.financialdatasets.ai/api-reference/endpoint/financials/cash-flow-statements)

### 2. Heuristic Implementation

- **Valuation Checks:**
  - P/E Ratio ≤ Industry Average
  - P/B Ratio ≤ 1.5
  - P/S Ratio ≤ 1.5
  - Earnings Yield ≥ 6%

- **Profitability Checks:**
  - ROE ≥ 15%
  - ROA ≥ 5%
  - ROIC ≥ 10%
  - EPS Growth ≥ 5% CAGR (5-10 years)

- **Debt & Stability Checks:**
  - Debt-to-Equity Ratio ≤ 1
  - Interest Coverage Ratio ≥ 3
  - Current Ratio ≥ 1.5

- **Free Cash Flow & Dividend Checks:**
  - FCF Yield ≥ 5%
  - Dividend Yield ≥ 3%
  - Dividend Payout Ratio ≤ 60%
  - 5-Year Dividend Growth ≥ 5% CAGR

- **Intrinsic Value & Margin of Safety:**
  - Discounted Cash Flow (DCF) Fair Value ≥ 30% above Current Price
  - Graham’s Formula Intrinsic Value > Current Price
  - Margin of Safety ≥ 30%

- **Avoid Value Traps:**
  - Revenue Growth ≥ 3% CAGR over 5–10 years
  - No EPS Decline for 3+ Consecutive Years
  - No Negative Free Cash Flow (FCF) for Last 3 Years
  - Industry Revenue Growth Positive over 5 Years

- **Sector & Market Checks:**
  - Sector CAGR > 0% (Growing Industry)
  - Stock Performance within 30% of Sector over 5 Years
  - Sector not at Risk of Technological Disruption (via industry reports)

### 3. Scheduling with node-cron

- **Frequency:**
  - Daily (at market close) and Weekly evaluations
- **Tasks:**
  - Fetch latest financial data
  - Apply heuristic checks
  - Generate and store reports
  - Send alerts if stocks meet all criteria

### 4. Output & Reporting

- **Formats:** JSON, CSV, PDF
- **Report Details:**
  - List of stocks that passed/failed
  - Explanation of metrics for each stock
  - Historical trends and sector performance
- **Notifications:**
  - Email or webhook alerts when stocks pass the checklist

### 5. Configuration & Customization

- **User-defined thresholds:** Allow overriding default metric thresholds
- **Sector/Industry Filters:** Enable focusing on specific sectors
- **Blacklist/Whitelist Stocks:** Exclude or prioritize certain stocks

---

## Potential Challenges & Considerations

1. **API Rate Limits:** Implement throttling and retries for API requests
2. **Data Completeness:** Ensure fallback mechanisms if certain data points are unavailable
3. **Performance Optimization:** Efficient data processing to handle large datasets
4. **Security:** Secure API keys and sensitive financial data

---

## Next Steps

1. Set up **Node.js TypeScript** environment
2. Integrate [financialdatasets.ai](https://financialdatasets.ai/) API and test data fetching
3. Implement heuristic checks as modular functions
4. Set up **node-cron** tasks for scheduling
5. Develop reporting and alerting mechanisms
6. Provide configuration options for users
7. Deploy and monitor performance

## Outstanding Questions

1. Are there any additional regulations or compliance requirements for handling user financial data?
2. How should error handling be reported to stakeholders (e.g., logs, dashboards, alerts)?
3. Does the solution need to support multiple data providers in case the primary API fails?
4. How often will historical data be queried for each assessment?
   - Should we cache data or store it locally to avoid repetitive network requests?
5. Do we have any retention policies for how long we store historical or user data?
