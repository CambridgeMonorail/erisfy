/*
  Warnings:

  - The `marketSentiment` column on the `NewsAnalysisResult` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "MarketSentiment" AS ENUM ('positive', 'negative', 'neutral');

-- AlterTable
ALTER TABLE "NewsAnalysisResult" DROP COLUMN "marketSentiment",
ADD COLUMN     "marketSentiment" "MarketSentiment" NOT NULL DEFAULT 'neutral';

-- AlterTable
ALTER TABLE "Onboarding" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
