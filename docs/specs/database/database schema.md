# Erisfy Database Schema Documentation

## Table of Contents

1. [Users & Authentication](#1-users--authentication)
2. [Portfolio Snapshots](#2-portfolio-snapshots)
3. [Asset Master Data & Fundamentals](#3-asset-master-data--fundamentals)
4. [Watchlists](#4-watchlists)
5. [AI / Filtering / System-Level Weightings](#5-ai--filtering--system-level-weightings)
6. [Logging & Auditing](#6-logging--auditing)
7. [Final Schema Sample](#7-final-schema-sample)

---

## 1. Users & Authentication

Since you're using **NestJS + Passport** for social logins (Google, Facebook, GitHub, etc.), your `User` table stores minimal identity info.

### `User`

| Field | Type | Description |
|-------|------|-------------|
| id | string/UUID | Primary key |
| email | string \| null | User's email address |
| firstName | string \| null | First name |
| lastName | string \| null | Last name |
| role | enum | User permissions (ADMIN, STANDARD) |
| provider | enum | Auth provider (GOOGLE, FACEBOOK, etc.) |
| providerAccountId | string \| null | Provider's unique ID |
| hashedPassword | string \| null | For local login fallback |
| createdAt | DateTime | Creation timestamp |
| updatedAt | DateTime | Last update timestamp |

> **Note**: Additional profile data (avatar URL, tokens) can be added if needed. Ensure GDPR compliance for personal data storage.

---

## 2. Portfolio Snapshots

You mentioned you will store **current holdings** only (no transaction-level data). Also, you plan to support **multi-currency** and **multi-asset** (stocks + crypto, etc.).

### `Portfolio`
- **id** (UUID).
- **userId** (fk → `User.id`).
- **name** (string) - e.g. "Main Portfolio," "Crypto + Stocks," etc.
- **baseCurrency** (string) - e.g. "USD", "EUR".  
- **createdAt**, **updatedAt** (DateTime).

### `PortfolioPosition`
- **id** (UUID).
- **portfolioId** (fk → `Portfolio.id`).
- **assetSymbol** (string) - e.g. "AAPL", "BTC", or “TSLA”. This references the `SymbolReference.symbol`.
- **assetType** (enum: `STOCK`, `CRYPTO`, `ETF`, etc.) - to handle differences in data. 
- **currency** (string) - if the position itself is quoted differently from the portfolio’s base currency (optional).
- **quantity** (decimal) - quantity/units.
- **avgCost** (decimal | null) - if you choose to store the average cost basis or just snapshot price. 
- **notes** (string | null).
- **createdAt**, **updatedAt** (DateTime).

> **Note**: If you prefer not to store `avgCost`, you can omit it. For multi-currency holdings, your daily price feed might also track currency conversions if you need to show total portfolio value in a single currency.

---

## 3. Asset Master Data & Fundamentals

You plan to store daily price data (not intraday) and store fundamentals for historical periods. Let’s refine these.

### `SymbolReference`
- **id** (UUID).
- **symbol** (string) - e.g. "AAPL" or “BTC-USD” for crypto.
- **name** (string) - e.g. “Apple Inc.”
- **exchange** (string) - e.g. “NASDAQ” (stocks), “BINANCE” (crypto) if relevant.
- **sector** (string | null) - if applicable (stocks).
- **industry** (string | null).
- **assetType** (enum: `STOCK`, `CRYPTO`, `ETF`, etc.).
- **country** (string | null).
- **active** (boolean).
- **createdAt**, **updatedAt** (DateTime).

### `DailyPrice`
- **id** (UUID).
- **symbolId** (fk → `SymbolReference.id`).
- **date** (Date) - EOD date.
- **open**, **close**, **high**, **low** (decimal) - daily EOD price data.
- **volume** (bigint) - daily volume, if relevant.
- **currency** (string) - e.g. “USD,” “EUR.”  
- **source** (string) - e.g. data feed name.

### `SymbolFundamentals`
- **id** (UUID).
- **symbolId** (fk → `SymbolReference.id`).
- **fiscalPeriod** (Date or string) - e.g. “2023-Q1” or an actual date representing the period end.
- **eps** (decimal | null) - earnings per share.
- **revenue** (decimal | null).
- **marketCap** (decimal | null).
- **peRatio** (decimal | null).
- **dividendYield** (decimal | null).
- **createdAt**, **updatedAt** (DateTime).

> **Note**: You can add fields as needed (cash flow, EBITDA, etc.) and store each row by quarter/year. If you prefer a simpler approach, you can store them in a JSON field like `fundamentalsJson`, but a typed schema is usually more standard.

---

## 4. Watchlists

A user can maintain separate watchlists. We keep it simple:

### `Watchlist`
- **id** (UUID).
- **userId** (fk → `User.id`).
- **title** (string).
- **description** (string | null).
- **createdAt**, **updatedAt** (DateTime).

### `WatchlistItem`
- **id** (UUID).
- **watchlistId** (fk → `Watchlist.id`).
- **symbolId** (fk → `SymbolReference.id`).
- **notes** (string | null).
- **addedAt** (DateTime).

---

## 5. AI / Filtering / System-Level Weightings

You said you do **not** plan to store custom user weighting schemes; weightings are system-level. So we keep it simpler.

### `ScreenerFilter` 
*(Optional, if you still plan to store filter definitions for reference)*
- **id** (UUID).
- **name** (string) - e.g. “Value + Low Vol,” “Momentum Screener.”
- **filterConfig** (JSON) - to store system-level criteria, e.g. “P/E < 20, Beta < 1.2”.
- **active** (boolean) - if you want to enable/disable certain system filters.
- **createdAt**, **updatedAt** (DateTime).

We don’t need a user-level weighting if everything is system-based. If you plan to let **some** advanced users define their own screeners, add `userId` as optional (null = system filter).

**No chain-of-thought logs** means we skip storing agent logs or verbose multi-step logic. Possibly we keep a small record of summary decisions:

### `ScreenerRun`
*(Optional, if you want logging for internal or product analytics)*
- **id** (UUID).
- **screenerFilterId** (fk → `ScreenerFilter.id`) - which system filter was used.
- **executedAt** (DateTime).
- **resultCount** (int).

### `ScreenerResult`
*(Optional)*
- **id** (UUID).
- **screenerRunId** (fk → `ScreenerRun.id`).
- **symbolId** (fk → `SymbolReference.id`).
- **score** (decimal | null).
- **explanation** (string | null).

---

## 6. Logging & Auditing

You might want some minimal logging:

### `AuditLog`
- **id** (UUID).
- **userId** (fk → `User.id` | null) - might be `null` for unauthenticated actions.
- **action** (string) - e.g. “LOGIN”, “ADD_WATCHLIST_ITEM”, “RUN_SCREEN”.
- **description** (string | null) - store JSON or string about the action.
- **createdAt** (DateTime).

---

## 7. Final Schema Sample

```prisma
model User {
  id                String   @id @default(uuid())
  email             String?  @unique
  firstName         String?
  lastName          String?
  role              Role     @default(STANDARD)
  provider          Provider
  providerAccountId String?
  hashedPassword    String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  portfolios        Portfolio[]
  watchlists        Watchlist[]
  auditLogs         AuditLog[]
}

enum Role {
  ADMIN
  STANDARD
}

enum Provider {
  GOOGLE
  FACEBOOK
  GITHUB
  LOCAL
}

model Portfolio {
  id          String           @id @default(uuid())
  userId      String
  user        User             @relation(fields: [userId], references: [id])
  name        String
  baseCurrency String
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt

  positions   PortfolioPosition[]
}

model PortfolioPosition {
  id           String     @id @default(uuid())
  portfolioId  String
  portfolio    Portfolio  @relation(fields: [portfolioId], references: [id])
  assetSymbol  String
  assetType    AssetType
  currency     String?
  quantity     Decimal
  avgCost      Decimal?
  notes        String?
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
}

enum AssetType {
  STOCK
  CRYPTO
  ETF
  BOND
  // etc...
}

model SymbolReference {
  id         String    @id @default(uuid())
  symbol     String
  name       String
  exchange   String?
  sector     String?
  industry   String?
  assetType  AssetType?
  country    String?
  active     Boolean   @default(true)
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt

  dailyPrices       DailyPrice[]
  fundamentals      SymbolFundamentals[]
}

model DailyPrice {
  id         String          @id @default(uuid())
  symbolId   String
  symbol     SymbolReference @relation(fields: [symbolId], references: [id])
  date       DateTime
  open       Decimal?
  close      Decimal?
  high       Decimal?
  low        Decimal?
  volume     BigInt?
  currency   String?
  source     String?
}

model SymbolFundamentals {
  id           String          @id @default(uuid())
  symbolId     String
  symbol       SymbolReference @relation(fields: [symbolId], references: [id])
  fiscalPeriod String          // e.g. "2023-Q1"
  eps          Decimal?
  revenue      Decimal?
  marketCap    Decimal?
  peRatio      Decimal?
  dividendYield Decimal?
  createdAt    DateTime        @default(now())
  updatedAt    DateTime        @updatedAt
}

model Watchlist {
  id          String    @id @default(uuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id])
  title       String
  description String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  items       WatchlistItem[]
}

model WatchlistItem {
  id           String      @id @default(uuid())
  watchlistId  String
  watchlist    Watchlist   @relation(fields: [watchlistId], references: [id])
  symbolId     String
  symbol       SymbolReference @relation(fields: [symbolId], references: [id])
  notes        String?
  addedAt      DateTime    @default(now())
}

model ScreenerFilter {
  id          String   @id @default(uuid())
  name        String
  filterConfig Json
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  screenerRuns ScreenerRun[]
}

model ScreenerRun {
  id               String         @id @default(uuid())
  screenerFilterId String
  screenerFilter   ScreenerFilter @relation(fields: [screenerFilterId], references: [id])
  executedAt       DateTime
  resultCount      Int
  screenerResults  ScreenerResult[]
}

model ScreenerResult {
  id           String       @id @default(uuid())
  screenerRunId String
  screenerRun  ScreenerRun  @relation(fields: [screenerRunId], references: [id])
  symbolId     String
  symbol       SymbolReference @relation(fields: [symbolId], references: [id])
  score        Decimal?
  explanation  String?
}

model AuditLog {
  id          String   @id @default(uuid())
  userId      String?
  user        User?    @relation(fields: [userId], references: [id])
  action      String
  description String?
  createdAt   DateTime @default(now())
}
```

## Additional Notes

- All IDs use UUID v4 for globally unique identifiers
- Timestamps use UTC for consistency across timezones
- Decimal fields use appropriate precision for financial calculations
- JSON fields are used sparingly and only for truly dynamic data
- Foreign keys maintain referential integrity through cascading deletes where appropriate

