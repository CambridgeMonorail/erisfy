import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@erisfy/shadcnui';
import { CheckCircle } from 'lucide-react';

type ProFeature = {
  id: string;
  text: string;
};

const PRO_FEATURES: ProFeature[] = [
  { id: 'ai-predictions', text: 'AI-driven stock predictions & alerts' },
  { id: 'sentiment', text: 'Real-time market sentiment analysis' },
  { id: 'filtering', text: 'Advanced filtering & backtesting tools' },
  { id: 'portfolio', text: 'Personalized portfolio optimization' },
];

type ErisfyProBannerProps = {
  className?: string;
};

export const ErisfyProBanner: FC<ErisfyProBannerProps> = ({ className }) => {
  const navigate = useNavigate();

  const handleUpgradeClick = () => {
    navigate('/upgrade');
  };

  return (
    <Card className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-6 mt-8 ${className ?? ''}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-2">
          <span role="img" aria-label="rocket">🚀</span> Unlock Advanced Investment Tools with Erisfy Pro
        </CardTitle>
        <CardDescription className="text-lg mb-4 text-white">
          Maximize your investments with cutting-edge AI, premium insights, and exclusive features.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-none space-y-2 mb-4" aria-label="Pro features">
          {PRO_FEATURES.map(({ id, text }) => (
            <li key={id} className="flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-400" aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>
        <figure className="border-l-4 border-green-400 pl-4 mb-4">
          <blockquote className="italic">
            <p>
              "Erisfy Pro has completely transformed my investing strategy. The AI-powered insights have helped me identify opportunities I would've never spotted on my own. My portfolio is now outperforming the market!"
            </p>
          </blockquote>
          <figcaption className="font-bold mt-2">
            — Alex Carter, <cite>Early Erisfy Pro Adopter</cite>
          </figcaption>
        </figure>
        <Button 
          className="bg-green-500 text-white hover:bg-green-600"
          onClick={handleUpgradeClick}
          aria-label="Upgrade to Erisfy Pro"
        >
          Go Pro →
        </Button>
      </CardContent>
    </Card>
  );
};
