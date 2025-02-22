import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async getMarketStories(): Promise<any> {
    // Example prompt
    const prompt = `
      Identify the five biggest news stories today that are likely to impact the financial markets
      and the price of stocks, either positively or negatively. Then structure that data as JSON
      with the following structure:
      
      {
        "date": "<YYYY-MM-DD>",
        "stories": [
          {
            "title": "...",
            "one_line_summary": "...",
            "whats_happening": "...",
            "market_impact": "...",
            "market_sector": "..."
          },
          ...
        ]
      }
    `;

    // For ChatGPT, use createChatCompletion or createCompletion
    const response = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: 'You are a helpful financial assistant.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
    });

    // Note: In v4, response.data is no longer used; simply access the choices array.
    const rawContent = response.choices[0].message?.content || '';
    return rawContent;
  }
}
