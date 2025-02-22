-- CreateTable
CREATE TABLE "MarketDataRecord" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketDataRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketStory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "one_line_summary" TEXT NOT NULL,
    "whats_happening" TEXT NOT NULL,
    "market_impact" TEXT NOT NULL,
    "market_sector" TEXT NOT NULL,
    "marketDataRecordId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketStory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MarketStory" ADD CONSTRAINT "MarketStory_marketDataRecordId_fkey" FOREIGN KEY ("marketDataRecordId") REFERENCES "MarketDataRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
