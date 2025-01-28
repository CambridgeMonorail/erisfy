import { FC } from 'react';
import { Button } from '@erisfy/shadcnui';

interface SaveAddPortfolioProps {
  ticker: string;
}

const SaveAddPortfolio: FC<SaveAddPortfolioProps> = ({ ticker }) => {
  const handleSave = () => {
    console.log(`Saved ${ticker} to watchlist`);
  };

  const handleAddToPortfolio = () => {
    console.log(`Added ${ticker} to portfolio`);
  };

  return (
    <div className="flex space-x-4">
      <Button onClick={handleSave} className="bg-primary text-primary-foreground">
        Save to Watchlist
      </Button>
      <Button onClick={handleAddToPortfolio} className="bg-secondary text-secondary-foreground">
        Add to Portfolio
      </Button>
    </div>
  );
};

export { SaveAddPortfolio };
