import { FC } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@erisfy/shadcnui';
import { CheckCircle, AlertCircle, Filter, BrainCircuit, SlidersHorizontal, Activity, BarChart, TrendingUp, Tag, DollarSign, Rocket, Scale, User, Shield } from 'lucide-react';

const ErisfyProBanner: FC = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-6 mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-2">🚀 Unlock Advanced Investment Tools with Erisfy Pro</CardTitle>
        <CardDescription className="text-lg mb-4">Maximize your investments with cutting-edge AI, premium insights, and exclusive features.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-none space-y-2 mb-4">
          <li className="flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
            AI-driven stock predictions & alerts
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
            Real-time market sentiment analysis
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
            Advanced filtering & backtesting tools
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
            Personalized portfolio optimization
          </li>
        </ul>
        <blockquote className="border-l-4 border-green-400 pl-4 italic mb-4">
          "Erisfy Pro has completely transformed my investing strategy. The AI-powered insights have helped me identify opportunities I would’ve never spotted on my own. My portfolio is now outperforming the market!"
          <br />
          <span className="font-bold">— Alex Carter, Early Erisfy Pro Adopter</span>
        </blockquote>
        <Button className="bg-green-500 text-white hover:bg-green-600" onClick={() => window.location.href = '/upgrade'}>
          Go Pro →
        </Button>
      </CardContent>
    </Card>
  );
};

export { ErisfyProBanner };
