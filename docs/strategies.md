# Quantitative Heuristics for Systematic Value Investing

A Data-Driven Approach to Value Investment Strategies

## Executive Summary

Value investing can be implemented with strict, data-driven rules. This document outlines **fundamental factor thresholds**, **market condition signals**, **momentum/technical overlays**, and **backtested evidence** for systematic value strategies. Each heuristic is quantifiable and objective, providing clear rules that investors can implement without subjective judgment.

---

## I. Fundamental Factors: Key Metrics & Thresholds

Value investors often screen for stocks that are statistically cheap based on fundamental ratios. Here are common metrics and specific numeric thresholds used in quantitative value strategies:

### Price-to-Earnings (P/E) Ratio

* **Key threshold:** P/E < 15 (Benjamin Graham's criterion)
* **Deep value threshold:** P/E < 10
* **Research evidence:** Basu (1977) found that low P/E stocks delivered significantly higher returns than high P/E stocks, demonstrating the "value effect"
* **Implementation:** Screen for stocks with P/E well below market average

### Price-to-Book (P/B) Ratio

* **Key threshold:** P/B < 1.5 (Graham's rule)
* **Ideal target:** P/B < 1.0 (buying at or below book value)
* **Research evidence:** Fama–French studies show companies with high book-to-market (low P/B) consistently outperform growth stocks by 4-5% per year on average
* **Implementation:** Look for stocks trading below their accounting book value

### Enterprise Value to EBIT (EV/EBIT) – Earnings Yield

* **Key threshold:** EV/EBIT < 10 (preferably single-digits)
* **Advanced approach:** Joel Greenblatt's Magic Formula combines high earnings yield (EBIT/EV) and high Return on Capital
* **Research evidence:** Studies find EV/EBIT to be one of the most effective value factors, delivering superior returns compared to other metrics
* **Implementation:** Filter for top 20% of stocks with highest earnings yield (EBIT/EV)

### Return on Invested Capital (ROIC) or Return on Equity (ROE)

* **Key threshold:** ROIC/ROE > 10-15%
* **Quality indicator:** Firms with ROIC ranking in top tier (often > 15-20%)
* **Research evidence:** Greenblatt's Magic Formula explicitly pairs high ROIC with low valuation
* **Implementation:** Add this filter to avoid "cheap but bad" companies

### Composite Value Scores (Multiple Criteria)

* **Key approach:** Combine several metrics into a single score (e.g., O'Shaughnessy's Value Composite)
* **Graham's combined rule:** P/E × P/B should not exceed 22.5
* **Implementation:** Screen for either P/E < 15 and P/B < 1.5, or the combined product < 22.5

### Financial Strength (Piotroski F-Score)

* **Key threshold:** F-Score of 7-9 (out of 9)
* **Components:** 9-point scoring system for fundamental health (profitability, leverage, liquidity, etc.)
* **Research evidence:** High F-Score value stocks beat low F-Score value stocks by ~7.5% per year
* **Implementation:** Require minimum F-Score (≥ 7) to filter out "value traps"

**Summary Rule Example:** Screen for stocks with **P/E < 15, P/B < 1.5, ROE > 12%, and F-Score ≥ 7** as a strict value stock selection filter.

---

## II. Market Signals: Quantitative Rules from Market Conditions

Beyond company-specific fundamentals, systematic value investors can incorporate broader market and economic signals to determine optimal timing:

### CAPE Ratio (Shiller P/E) as a Valuation Gauge

* **Key thresholds:**
  * If CAPE > 25: Be selective, focus only on most compelling value stocks
  * If CAPE < 15: Broad value buying opportunity
* **Historical average:** U.S. CAPE long-term average is ~16
* **Research evidence:** CAPE is "a powerful predictor of long-term returns"
* **Implementation:** Adjust aggressiveness of value strategy based on overall market valuation

### Market Volatility Index (VIX) as a Contrarian Signal

* **Key thresholds:**
  * High opportunity: VIX > 30 (extreme fear, potential buying opportunity)
  * Caution zone: VIX < 12 (complacency, fewer bargains available)
* **Research evidence:** High VIX levels often precede market rebounds
* **Implementation:** Deploy capital into value stocks during high-fear periods

### "Fed Model" – Earnings Yield vs. Bond Yield Gap

* **Key approach:** Compare S&P 500 earnings yield (E/P) to 10-year Treasury yield
* **Signal interpretation:**
  * Bullish: Earnings yield > Bond yield by significant margin
  * Bearish: Bond yields > Earnings yield
* **Implementation:** Favor value stocks when earnings yield exceeds bond yield by substantial margin

### Market Cap to GDP (Buffett Indicator)

* **Key thresholds:**
  * >100%: Potential overvaluation
  * 50-75%: Potential undervaluation
  * Aggressive buying: < 80%
  * Caution/selling: > 120%
* **Research evidence:** Warren Buffett called this "the best single measure" of market valuation
* **Implementation:** Commit new funds when ratio is below 100%; be cautious when extremely high

### Economic Cycle Indicators

* **Key metrics:** Unemployment rate, PMI, credit spreads, GDP
* **Example rule:** Increase equity exposure when unemployment is high (>8%) but starting to decline
* **Implementation:** Use macroeconomic data to identify potential market bottoms

---

## III. Momentum & Technical Indicators within a Value Framework

Momentum and technical signals can complement value investing by helping avoid traps and identify better entry points:

### Momentum Overlay – Positive Price Trend Requirement

* **Key approach:** Only buy value stocks showing recent positive momentum
* **Example rule:** Require 6-month price return > 0% in addition to value criteria
* **Research evidence:** Value and momentum tend to be negatively correlated (around -0.5 to -0.6)
* **Implementation:** Filter for stocks with both value characteristics and positive price momentum

### Avoiding Lowest Momentum and High Volatility Stocks

* **Key rule:** Eliminate candidates in bottom 10% of market by 12-month momentum
* **Volatility filter:** Avoid stocks with beta in top 5%
* **Research evidence:** Price signal filters improved predictive power more than complex financial models
* **Implementation:** Exclude stocks with 12-month momentum < -30% or beta > 1.5× market average

### Moving Average and Breakout Rules

* **Key approach:** Use 200-day moving average as trend confirmation
* **Example rule:** Buy only if stock price is above its 200-day moving average
* **Technical indicators:** Consider RSI (Relative Strength Index) for timing entries
* **Implementation:** Add technical confirmation before entering value positions

### Composite Quality/Momentum Scores

* **Key approach:** Blend value, quality, and momentum into unified scoring system
* **Example combination:** Piotroski F-Score plus positive 12-month momentum
* **Research evidence:** Asness et al. found 50/50 blend of value and momentum improved Sharpe ratios
* **Implementation:** Develop multi-factor model incorporating both value and momentum metrics

---

## IV. Backtested Strategies & Empirical Validation

Decades of data underscore the effectiveness of quantitative value heuristics:

### Value vs. Growth Performance by Decade

* **Long-term results:** Value stocks outperformed growth in nearly every decade since 1930s
* **Premium magnitude:** Low P/B stocks earned about 5.22% more per year than high P/B stocks (1930-2020)

### Value Premium (High Minus Low)

* **Research findings:** Since 1927, U.S. value stocks have beaten growth stocks by ~4% annually
* **Consistency:** Premium observed across different markets and eras
* **Risk-adjusted performance:** Value effect remains significant after accounting for risk factors

### Magic Formula Backtests

* **Greenblatt study (1988-2004):** 30.8% annualized returns vs 12.4% for S&P 500
* **Large-cap only:** ~22-23% annual returns (still ~10% above market)
* **Hong Kong study (2001-2014):** Beat market by 6-15% per year depending on company size
* **Recent period (2003-2015):** 11.4% vs 8.7% for S&P 500

### Piotroski F-Score Performance

* **Original study:** High F-Score value stocks beat low F-Score value stocks by ~7.5% annually
* **Return enhancement:** High F-Score, high book-to-market firms earned 13.4% yearly vs 5.9% for low F-Score
* **Global validation:** F-Score effective across various international markets

### Enterprise Multiple (EV/EBIT) Outperformance

* **European study (1999-2011):** Cheapest EV/EBIT quintile massively outperformed expensive quintile
* **Long-term analysis (1963-2022):** EV/EBIT strategy had highest top-decile returns among formulaic approaches
* **Return pattern:** All value metrics showed monotonic gains (cheaper deciles outperforming expensive ones)

### Momentum + Value Combination

* **Asness et al. (2013):** Value and momentum "work everywhere" across assets and countries
* **Portfolio enhancement:** 50/50 combined portfolio improved risk-adjusted returns significantly
* **Practical application:** Top 30% cheapest stocks after filtering for positive momentum outperformed pure value

### Decile Return Spreads

* **Long-term study (1963-2022):** Spread between cheapest and most expensive decile averaged 5-6% yearly
* **Risk-adjusted basis:** CAPM alpha spread of 7-12% annually
* **Consistent pattern:** Cheap decile portfolios delivered higher average returns and alphas

---

## Conclusion

A purely systematic value investing approach is achievable by adhering to the rules outlined in this document. Investors can screen for fundamental bargains, take cues from market conditions, and apply momentum filters to refine entry timing. Each rule is numeric and transparent – for example:

### Buy stocks with P/E < 12, EV/EBIT < 8, ROIC > 10%, only during high-volatility periods, and only if 6-month price momentum is positive.

Such an algorithmic strategy, backed by extensive backtesting, removes emotion and exploits the statistical edge that value investing has demonstrated. By sticking to data-driven heuristics, investors can systematically capture the value premium and improve their odds of long-term outperformance.

---

## References

The insights and rules in this report are supported by academic findings and practitioner research, including:

* Basu (1977) on P/E effect
* Benjamin Graham's classic value criteria
* Joel Greenblatt's Magic Formula results
* Joseph Piotroski's F-Score studies
* Fama-French factor research
* Asness et al. on combined value-momentum strategies
* Research Affiliates on CAPE ratio applications
* Quantitative Investing studies on EV/EBIT strategies
* Gray & Vogel's Quantitative Value research
* Schwartz & Hanauer analysis of formulaic investing approaches

*All data and examples cited are drawn from empirical studies to ensure the rules are grounded in evidence rather than theory.*
