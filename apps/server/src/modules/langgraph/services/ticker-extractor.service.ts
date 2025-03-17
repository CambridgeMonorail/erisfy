import { Injectable, Logger } from '@nestjs/common';
import { COMMON_COMPANY_TICKERS, COMMON_WORDS } from '../constants/llm-prompts';

@Injectable()
export class TickerExtractorService {
  private readonly logger = new Logger(TickerExtractorService.name);

  extractTickersFromText(text: string): string[] {
    if (!text) return [];

    // First try to match known company names
    const lowerText = text.toLowerCase();
    const tickersFromNames = Object.entries(COMMON_COMPANY_TICKERS)
      .filter(([company]) => lowerText.includes(company))
      .map(([_, ticker]) => ticker);

    // Then match stock ticker pattern: 1-5 uppercase letters not part of a larger word
    const matches = text.match(/\b[A-Z]{1,5}\b(?!\w)/g) || [];

    // Filter out common English words and abbreviations
    const tickers = matches.filter(match => !COMMON_WORDS.has(match));

    // Combine and deduplicate results
    const allTickers = [...new Set([...tickersFromNames, ...tickers])];

    this.logger.debug(`Extracted ${allTickers.length} potential tickers from text`, { allTickers });
    return allTickers;
  }

  extractTickersFromArticles(articles: { title?: string; description?: string }[]): string[] {
    const combinedText = articles
      .map(a => `${a.title || ''} ${a.description || ''}`)
      .join(' ');
    return this.extractTickersFromText(combinedText);
  }
}
