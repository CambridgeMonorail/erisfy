[Back to Documentation Overview](./readme.md)

# Modular Agent Architecture with Weighted Filters & Rule Sets

## 1. Overview

This document outlines a modular agent architecture designed for AI-powered stock screening. It integrates rule-based filtering, dynamic weighting, and aggregated decision-making to enhance stock selection. The approach prioritizes modularity, scalability, and adaptability, allowing for continual evolution through feedback loops.

## 2. Core Components

### 2.1 Filtering & Rule Engine Module

**Purpose**  
This module applies predefined rules and filters to incoming market data, enabling the system to shortlist potential investment opportunities.

**Implementation**  
Uses a rules engine (or a custom-built version in JavaScript/TypeScript). Each rule is a function that returns a Boolean (pass/fail) or a score based on various conditions such as valuation metrics, technical indicators, and sentiment thresholds.

**Example Implementation**

```typescript
interface FilterRule {
  id: string;
  description: string;
  evaluate: (stockData: StockData) => number; // Returns a score between 0 and 1
}

const valuationRule: FilterRule = {
  id: "valuation",
  description: "Check if intrinsic value is below market price by a margin",
  evaluate: (stockData) => {
    const ratio = stockData.intrinsicValue / stockData.marketPrice;
    return ratio > 1.1 ? 1 : ratio; // Example scoring logic
  }
};
```

### 2.2 Weighting & Rating Module

**Purpose**  
Each rule or filter is assigned a weight, reflecting its importance or reliability. Over time, these weights adjust based on historical performance.

**Implementation**  
Uses a dynamic weight vector, updated via performance feedback. Can incorporate simple online learning algorithms or reinforcement learning techniques.

**Example Implementation**

```typescript
interface RuleWeight {
  ruleId: string;
  weight: number; // Weight between 0 and 1, initially set by experts
}

// Example rule weights
let ruleWeights: RuleWeight[] = [
  { ruleId: "valuation", weight: 0.4 },
  { ruleId: "sentiment", weight: 0.3 },
];

function updateWeights(feedback: TradeOutcomeFeedback): void {
  // Adjust weights dynamically (e.g., increase if a rule was predictive)
  // More advanced approaches could involve gradient descent or RL.
}
```

### 2.3 Aggregation & Decision Module

**Purpose**  
This module aggregates individual rule scores, applying their weights to generate a composite signal for stock selection.

**Implementation**  
Uses a weighted sum approach to combine rule scores. Applies threshold-based filtering to identify potential investment opportunities.

**Example Implementation**

```typescript
function aggregateSignal(
  stockData: StockData,
  rules: FilterRule[],
  weights: RuleWeight[]
): number {
  let totalScore = 0;
  let totalWeight = 0;

  for (const rule of rules) {
    const ruleScore = rule.evaluate(stockData);
    const ruleWeight = weights.find(w => w.ruleId === rule.id)?.weight || 0;
    totalScore += ruleScore * ruleWeight;
    totalWeight += ruleWeight;
  }

  return totalWeight > 0 ? totalScore / totalWeight : 0; // Normalize final score
}
```

## 3. Modular & Extensible Design

### 3.1 Pluggable Rules

New rules can be added without modifying the core engine. Possible through dynamic rule registration via config files or module loaders.

### 3.2 Performance Feedback Loop

Captures trade outcomes and compares them against predicted signals. Uses this data to dynamically adjust rule weights.

### 3.3 Inter-Agent Communication

Initially, valuation, sentiment, and fundamentals were separate agents. This model integrates them into specialized rule modules. However, independent agents can still feed data into this system for modularity.

### 3.4 Extensibility & Maintenance

Each component is independent, allowing modifications without major overhauls. The system can be deployed as microservices if needed.

## 4. Evolution Over Time

### 4.1 Data Logging & Analytics

Logs each decision along with:

- Input stock data
- Rule scores
- Applied weights
- Final outcomes

Enables historical analysis to refine rule effectiveness.

### 4.2 Automated Weight Adjustment

Implements a scheduled retraining mechanism to periodically update weights based on recent performance.

### 4.3 User Feedback Integration

Allows manual feedback from operators to influence rule weighting. Provides a way for domain experts to fine-tune the system.

## 5. System Workflow

The system follows this high-level workflow:

1. **Data Collection** → Market data is fetched from financial datasets.
2. **Rule Evaluation** → Each filter rule evaluates stock data and generates scores.
3. **Signal Aggregation** → Weighted rule scores combine to produce an overall opportunity score.
4. **Decision Support** → The system presents this score, along with reasoning, to users via a React-based SPA.
5. **Feedback Collection** → After an investment decision or simulation, the outcome is recorded.
6. **Weight Adjustment** → Over time, the system adjusts rule weights to improve accuracy.

## 6. Summary & Key Benefits

This modular agent architecture provides:

**Rules & Filters**  
✅ Easily extended or modified through dynamic rule registration.

**Dynamic Weighting**  
✅ The system learns over time, optimizing for better predictions.

**User-Centric Decision Support**  
✅ Even novice investors receive clear, actionable AI-driven insights.

This self-improving architecture ensures a scalable, adaptable, and intelligent stock screening system tailored to meet the needs of the Erisfy project.

**Next Steps**

- Prototype development to validate rule evaluation and weight adjustments.
- Iterate on performance feedback models for improved accuracy.
- Deploy a test environment to measure real-world effectiveness.

**Next Document: [Back to Documentation Overview](./readme.md)**
