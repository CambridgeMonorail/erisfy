import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@erisfy/shadcnui';

interface PeerComparisonProps {
  peers: { ticker: string; companyName: string; metric: number }[];
}

const PeerComparison: FC<PeerComparisonProps> = ({ peers }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold mb-2 text-primary">
          Peer Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ul className="list-disc list-inside">
            {peers.map((peer, index) => (
              <li key={index}>
                {peer.companyName} ({peer.ticker}): {peer.metric}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export { PeerComparison };
