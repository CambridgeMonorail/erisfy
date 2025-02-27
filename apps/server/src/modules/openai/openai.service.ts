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

  async getMarketStories(): Promise<string> {
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
        { role: 'system', content: 'You are a helpful financial assistant who responds with clean, properly formatted JSON without any Markdown formatting.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
    });

    // Note: In v4, response.data is no longer used; simply access the choices array.
    let rawContent = response.choices[0].message?.content || '';

    // Clean up possible Markdown formatting in response
    rawContent = this.extractJsonFromMarkdown(rawContent);

    return rawContent;
  }

  /**
   * Extracts JSON content from a string that might contain Markdown formatting
   * @param content - Raw content that may contain Markdown formatting like ```json blocks
   * @returns Cleaned JSON string
   */
  private extractJsonFromMarkdown(content: string): string {
    // Remove Markdown code block indicators (```json, ```)
    const jsonRegex = /```(?:json)?\s*([\s\S]*?)```/;
    const match = content.match(jsonRegex);

    if (match && match[1]) {
      // Return just the JSON inside the code block
      return match[1].trim();
    }

    // If no code blocks found, return the original content with leading/trailing whitespace removed
    return content.trim();
  }
}
