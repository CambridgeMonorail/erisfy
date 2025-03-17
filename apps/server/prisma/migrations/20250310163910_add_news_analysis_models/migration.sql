-- CreateTable
CREATE TABLE "NewsArticle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "source" TEXT,
    "relevancyScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsAnalysisResult" (
    "id" TEXT NOT NULL,
    "query" TEXT,
    "isDefaultQuery" BOOLEAN NOT NULL DEFAULT false,
    "analysis" TEXT NOT NULL,
    "marketSentiment" TEXT,
    "sectors" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsAnalysisResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockDataSnapshot" (
    "id" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "dayChange" DOUBLE PRECISION NOT NULL,
    "dayChangePercent" DOUBLE PRECISION NOT NULL,
    "marketCap" DOUBLE PRECISION NOT NULL,
    "snapshotTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StockDataSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NewsAnalysisResultToNewsArticle" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_NewsAnalysisResultToNewsArticle_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_NewsAnalysisResultToStockDataSnapshot" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_NewsAnalysisResultToStockDataSnapshot_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "NewsArticle_publishedAt_idx" ON "NewsArticle"("publishedAt");

-- CreateIndex
CREATE INDEX "NewsAnalysisResult_createdAt_idx" ON "NewsAnalysisResult"("createdAt");

-- CreateIndex
CREATE INDEX "StockDataSnapshot_ticker_snapshotTime_idx" ON "StockDataSnapshot"("ticker", "snapshotTime");

-- CreateIndex
CREATE INDEX "_NewsAnalysisResultToNewsArticle_B_index" ON "_NewsAnalysisResultToNewsArticle"("B");

-- CreateIndex
CREATE INDEX "_NewsAnalysisResultToStockDataSnapshot_B_index" ON "_NewsAnalysisResultToStockDataSnapshot"("B");

-- AddForeignKey
ALTER TABLE "_NewsAnalysisResultToNewsArticle" ADD CONSTRAINT "_NewsAnalysisResultToNewsArticle_A_fkey" FOREIGN KEY ("A") REFERENCES "NewsAnalysisResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsAnalysisResultToNewsArticle" ADD CONSTRAINT "_NewsAnalysisResultToNewsArticle_B_fkey" FOREIGN KEY ("B") REFERENCES "NewsArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsAnalysisResultToStockDataSnapshot" ADD CONSTRAINT "_NewsAnalysisResultToStockDataSnapshot_A_fkey" FOREIGN KEY ("A") REFERENCES "NewsAnalysisResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsAnalysisResultToStockDataSnapshot" ADD CONSTRAINT "_NewsAnalysisResultToStockDataSnapshot_B_fkey" FOREIGN KEY ("B") REFERENCES "StockDataSnapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
