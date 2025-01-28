import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@erisfy/shadcnui';

interface NewsEventsProps {
  news: { headline: string; date: string }[];
  events: { event: string; date: string }[];
}

const NewsEvents: FC<NewsEventsProps> = ({ news, events }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold mb-2 text-primary">
          News and Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <strong>Recent News:</strong>
            <ul className="list-disc list-inside">
              {news.map((item, index) => (
                <li key={index}>
                  {item.headline} - {new Date(item.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Upcoming Events:</strong>
            <ul className="list-disc list-inside">
              {events.map((item, index) => (
                <li key={index}>
                  {item.event} - {new Date(item.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { NewsEvents };
