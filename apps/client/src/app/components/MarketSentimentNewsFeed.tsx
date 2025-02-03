import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@erisfy/shadcnui';

const MarketSentimentNewsFeed: FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold mb-2 text-primary">
          Market Sentiment & News Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <strong>Smart AI-Summarized News:</strong>
            <ul className="list-disc list-inside">
              <li>Top 3-5 stories that impact the market today.</li>
              <li>Each story summarized in 1-2 sentences.</li>
              <li>Highlight relevance to user watchlist.</li>
            </ul>
          </div>
          <div>
            <strong>Sentiment-Based Categorization:</strong>
            <p>
              Tags stories as{' '}
              <span role="img" aria-label="Bullish">🟢</span> Bullish,{' '}
              <span role="img" aria-label="Bearish">🔴</span> Bearish, or{' '}
              <span role="img" aria-label="Neutral">⚪</span> Neutral based on AI analysis.
            </p>
          </div>
          <div>
            <strong>Custom Watchlist News Feed:</strong>
            <p>Users see only news related to their selected stocks & sectors.</p>
          </div>
          <div>
            <strong>Market Sentiment & News Feed Coming Soon</strong>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { MarketSentimentNewsFeed };
