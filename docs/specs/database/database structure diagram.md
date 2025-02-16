# Erisfy Database Structure

## Table of Contents

1. [Overview](#overview)
2. [Entity Relationship Diagram](#entity-relationship-diagram)
3. [Table Descriptions](#table-descriptions)
4. [Implementation Notes](#notes)

---

## Overview

The database is designed to support Erisfy's core functionalities including user management, portfolio tracking, watchlists, stock screening, and market data storage. The schema emphasizes data integrity, scalability, and efficient querying patterns.

---

## Entity Relationship Diagram

The following diagram illustrates the relationships between all database tables and their attributes.

```mermaid
erDiagram

    %% ======================
    %% Entities / Tables
    %% ======================

    USER {
        string id PK
        string email
        string firstName
        string lastName
        enum role
        enum provider
        string providerAccountId
        string hashedPassword
        datetime createdAt
        datetime updatedAt
    }

    PORTFOLIO {
        string id PK
        string userId FK
        string name
        string baseCurrency
        datetime createdAt
        datetime updatedAt
    }

    PORTFOLIO_POSITION {
        string id PK
        string portfolioId FK
        string assetSymbol
        enum assetType
        string currency
        decimal quantity
        decimal avgCost
        string notes
        datetime createdAt
        datetime updatedAt
    }

    SYMBOL_REFERENCE {
        string id PK
        string symbol
        string name
        string exchange
        string sector
        string industry
        enum assetType
        string country
        boolean active
        datetime createdAt
        datetime updatedAt
    }

    DAILY_PRICE {
        string id PK
        string symbolId FK
        date date
        decimal open
        decimal close
        decimal high
        decimal low
        bigint volume
        string currency
        string source
    }

    SYMBOL_FUNDAMENTALS {
        string id PK
        string symbolId FK
        string fiscalPeriod
        decimal eps
        decimal revenue
        decimal marketCap
        decimal peRatio
        decimal dividendYield
        datetime createdAt
        datetime updatedAt
    }

    WATCHLIST {
        string id PK
        string userId FK
        string title
        string description
        datetime createdAt
        datetime updatedAt
    }

    WATCHLIST_ITEM {
        string id PK
        string watchlistId FK
        string symbolId FK
        string notes
        datetime addedAt
    }

    SCREENER_FILTER {
        string id PK
        string name
        json filterConfig
        boolean active
        datetime createdAt
        datetime updatedAt
    }

    SCREENER_RUN {
        string id PK
        string screenerFilterId FK
        datetime executedAt
        int resultCount
    }

    SCREENER_RESULT {
        string id PK
        string screenerRunId FK
        string symbolId FK
        decimal score
        string explanation
    }

    AUDIT_LOG {
        string id PK
        string userId FK
        string action
        string description
        datetime createdAt
    }

    %% ======================
    %% Relationships
    %% ======================

    %% User
    USER ||--|{ PORTFOLIO : "owns"
    USER ||--|{ WATCHLIST : "creates"
    USER ||--|{ AUDIT_LOG : "logs"

    %% Portfolio
    PORTFOLIO }|--|{ PORTFOLIO_POSITION : "has positions"

    %% Symbol Reference
    SYMBOL_REFERENCE ||--|{ DAILY_PRICE : "has daily prices"
    SYMBOL_REFERENCE ||--|{ SYMBOL_FUNDAMENTALS : "has fundamentals"
    SYMBOL_REFERENCE ||--|{ WATCHLIST_ITEM : "referenced by"
    SYMBOL_REFERENCE ||--|{ SCREENER_RESULT : "appears in"

    %% Watchlist
    WATCHLIST ||--|{ WATCHLIST_ITEM : "contains"

    %% Screener
    SCREENER_FILTER ||--|{ SCREENER_RUN : "executes"
    SCREENER_RUN ||--|{ SCREENER_RESULT : "produces"

    %% Foreign key connections
    PORTFOLIO_POSITION }|--|| PORTFOLIO : "belongs to"
    PORTFOLIO ||--|| USER : "belongs to"
    WATCHLIST_ITEM }|--|| WATCHLIST : "belongs to"
    WATCHLIST ||--|| USER : "belongs to"
    AUDIT_LOG }|--|| USER : "belongs to"
    DAILY_PRICE }|--|| SYMBOL_REFERENCE : "belongs to"
    SYMBOL_FUNDAMENTALS }|--|| SYMBOL_REFERENCE : "belongs to"
    SCREENER_RUN }|--|| SCREENER_FILTER : "belongs to"
    SCREENER_RESULT }|--|| SCREENER_RUN : "belongs to"
    SCREENER_RESULT }|--|| SYMBOL_REFERENCE : "references"
```

---

## Table Descriptions

### Core Entities

| Table | Description |
|-------|-------------|
| USER | Stores user account information and authentication details |
| PORTFOLIO | Represents investment portfolios owned by users |
| PORTFOLIO_POSITION | Tracks individual positions within portfolios |
| SYMBOL_REFERENCE | Master table for all tradable securities and instruments |

### Market Data

| Table | Description |
|-------|-------------|
| DAILY_PRICE | Historical price data for symbols |
| SYMBOL_FUNDAMENTALS | Financial metrics and fundamental data |

### Watchlists & Screening

| Table | Description |
|-------|-------------|
| WATCHLIST | User-created lists of symbols |
| WATCHLIST_ITEM | Individual symbols within watchlists |
| SCREENER_FILTER | Saved screening criteria |
| SCREENER_RUN | Records of screen executions |
| SCREENER_RESULT | Results from screening runs |

### Auditing

| Table | Description |
|-------|-------------|
| AUDIT_LOG | System-wide activity tracking for security and compliance |

---

## Notes

- All tables include created/updated timestamps for change tracking
- Foreign keys maintain referential integrity
- Enum types are used for fixed-value fields like roles and asset types
- Decimal types are used for financial calculations to maintain precision
