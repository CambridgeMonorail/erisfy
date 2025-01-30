import { FC, useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Tooltip, TooltipTrigger, TooltipContent, Progress } from '@erisfy/shadcnui';

const OnboardingFlow: FC = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const handleNextStep = () => {
    setStep(step + 1);
    setProgress((step + 1) * 33.33);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
    setProgress((step - 1) * 33.33);
  };

  return (
    <div className="p-6 m-4 space-y-6 container mx-auto bg-background text-foreground">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-semibold mb-2 text-primary">
            Onboarding Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Welcome to the Stock Screener</h2>
              <p className="mb-4">This tool helps you set your preferences and learn more about the stock screener.</p>
              <Button onClick={handleNextStep}>Learn the Basics</Button>
              <Button onClick={handleNextStep}>Start Screening</Button>
              <Button onClick={handleNextStep}>Explore Presets</Button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Guided Steps</h2>
              <p className="mb-4">Highlighting essential features like filter library and results visualization.</p>
              <Tooltip>
                <TooltipTrigger>
                  <Button>Filter Library</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Explore various filters to narrow down your stock search.</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button>Results Visualization</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Visualize your screening results with interactive charts.</p>
                </TooltipContent>
              </Tooltip>
              <Button onClick={handlePreviousStep}>Previous</Button>
              <Button onClick={handleNextStep}>Next</Button>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Quick Setup Questionnaire</h2>
              <p className="mb-4">Answer a few questions to personalize your experience.</p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Investment Goals</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                  <option>Growth</option>
                  <option>Value</option>
                  <option>Income</option>
                </select>
              </div>
              <Button onClick={handlePreviousStep}>Previous</Button>
              <Button onClick={handleNextStep}>Finish</Button>
            </div>
          )}
          <Progress value={progress} className="mt-4" />
        </CardContent>
      </Card>
    </div>
  );
};

export { OnboardingFlow };
