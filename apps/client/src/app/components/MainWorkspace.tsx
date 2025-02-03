import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@erisfy/shadcnui';

interface MainWorkspaceProps {
  className?: string;
}

const MainWorkspace: FC<MainWorkspaceProps> = ({ className }): JSX.Element => {
  return (
    <Card 
      className={className}
      role="region"
      aria-label="Main workspace"
    >
      <CardHeader>
        <CardTitle 
          className="text-2xl font-semibold mb-2 text-primary"
          id="workspace-title"
        >
          Main Workspace
        </CardTitle>
      </CardHeader>
      <CardContent aria-labelledby="workspace-title">
        <div className="space-y-4">
          <div>
            <strong>Dynamic "Get Started" Section:</strong>
            <p>Suggested pre-built filters and a short walkthrough of key features.</p>
          </div>
          <div>
            <strong>Multiple View Modes:</strong>
            <ul className="list-disc list-inside">
              <li>Simple List View</li>
              <li>Tile-Based Grid View</li>
              <li>Interactive Heatmap View</li>
            </ul>
          </div>
          <div>
            <strong>AI-Generated Stock Insights:</strong>
            <p>Clicking a stock shows a quick AI summary of why it’s moving.</p>
          </div>
          <div>
            <strong>Main Workspace Coming Soon</strong>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { MainWorkspace };
