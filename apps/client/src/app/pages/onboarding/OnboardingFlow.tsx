import { FC, useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Tooltip, TooltipTrigger, TooltipContent, Progress } from '@erisfy/shadcnui';
import { Stepper } from '@erisfy/shadcnui-blocks';

const OnboardingFlow: FC = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const handleNextStep = () => {
    setStep(step + 1);
    setProgress((step + 1) * 20);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
    setProgress((step - 1) * 20);
  };

  const steps = [
    { title: 'Welcome Screen', description: 'Introduction to Erisfy', icon: () => <span>1</span> },
    { title: 'Select Investment Style', description: 'Choose your style', icon: () => <span>2</span> },
    { title: 'Set Risk Tolerance', description: 'Select your risk level', icon: () => <span>3</span> },
    { title: 'Set Preferences', description: 'Toggle key settings', icon: () => <span>4</span> },
    { title: 'Review & Confirm', description: 'Summary of choices', icon: () => <span>5</span> },
    { title: 'Redirect to Stock Screener Results', description: 'Go to results', icon: () => <span>6</span> },
  ];

  return (
    <div className="p-6 m-4 space-y-6 container mx-auto bg-background text-foreground">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-semibold mb-2 text-primary">
            Onboarding Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Stepper currentStep={step} steps={steps} />
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Welcome to Erisfy</h2>
              <p className="mb-4">This tool helps you set your preferences and learn more about the stock screener.</p>
              <Button onClick={handleNextStep}>Let's Get Started!</Button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Select Investment Style</h2>
              <p className="mb-4">Choose your investment style.</p>
              <Button onClick={handlePreviousStep}>Previous</Button>
              <Button onClick={handleNextStep}>Next</Button>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Set Risk Tolerance</h2>
              <p className="mb-4">Select your risk preference.</p>
              <Button onClick={handlePreviousStep}>Previous</Button>
              <Button onClick={handleNextStep}>Next</Button>
            </div>
          )}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Set Preferences</h2>
              <p className="mb-4">Toggle key settings.</p>
              <Button onClick={handlePreviousStep}>Previous</Button>
              <Button onClick={handleNextStep}>Next</Button>
            </div>
          )}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Review & Confirm</h2>
              <p className="mb-4">Summary of your choices.</p>
              <Button onClick={handlePreviousStep}>Previous</Button>
              <Button onClick={handleNextStep}>Go to Screener</Button>
            </div>
          )}
          {step === 6 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Redirecting to Stock Screener Results</h2>
              <p className="mb-4">You will be redirected shortly.</p>
            </div>
          )}
          <Progress value={progress} className="mt-4" />
        </CardContent>
      </Card>
    </div>
  );
};

export { OnboardingFlow };
