import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { NewsArticle } from '../../openai/interfaces/news-analysis.interface';

@Injectable()
export class ArticleManagerService {
  private readonly logger = new Logger(ArticleManagerService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findOrCreateArticles(articles: NewsArticle[]) {
    if (!articles?.length) return [];

    return Promise.all(articles.map(async article => {
      const existing = await this.prisma.newsArticle.findFirst({
        where: { url: article.url }
      });

      if (existing) {
        return { id: existing.id };
      }

      type EnrichedArticle = NewsArticle & { relevancyScore?: number };
      const articleWithScore = article as EnrichedArticle;

      const created = await this.prisma.newsArticle.create({
        data: {
          title: article.title,
          description: article.description,
          url: article.url,
          publishedAt: new Date(article.publishedAt),
          source: new URL(article.url).hostname,
          relevancyScore: articleWithScore.relevancyScore
        }
      });

      return { id: created.id };
    }));
  }

  formatArticlesForPrompt(articles: NewsArticle[]): string {
    return articles.map((article, i) => {
      const title = article.title?.trim() || 'No title available';
      const description = article.description?.trim() || 'No description available';
      return `Article ${i + 1}:\nTitle: ${title}\nSummary: ${description}\n`;
    }).join('\n');
  }
}
