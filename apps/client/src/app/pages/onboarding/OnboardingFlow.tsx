import { FC, useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
} from '@erisfy/shadcnui';
import { Stepper } from '@erisfy/shadcnui-blocks';
import { useNavigate } from 'react-router-dom';
import type { CarouselApi } from '@erisfy/shadcnui';
import { ErisfyProBanner } from '../../components/ErisfyProBanner';
import { useOnboarding } from '../../hooks/useOnboarding';
import { useOnboardingPreferences } from '../../hooks/useOnboardingPreferences';
import { FeatureCarousel } from '../../components/onboarding/FeatureCarousel';
import type { InvestmentStyle, RiskTolerance } from './onboardingData.js';
import { investmentStylesData, riskTolerancesData } from './onboardingData.js';

const InvestmentStyleSection: FC<{
  onNext: () => void;
  onPrevious: () => void;
  selectedStyle: InvestmentStyle['value'] | null;
  onSelect: (style: InvestmentStyle['value']) => void;
}> = ({ onNext, onPrevious, selectedStyle, onSelect }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select Investment Style</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {investmentStylesData.map((style: InvestmentStyle) => (
          <Card
            key={style.value}
            className={`hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
              selectedStyle === style.value ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onSelect(style.value)}
          >
            <CardHeader className="flex flex-col items-center">
              <style.icon className="w-12 h-12 mb-4 text-primary" />
              <CardTitle className="text-xl font-semibold mb-2">{style.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-4">{style.description}</p>
              <ul className="list-disc list-inside">
                {style.criteria.map((criterion: string, idx: number) => (
                  <li key={idx}>{criterion}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <Button onClick={onPrevious}>Previous</Button>
        <Button onClick={onNext} disabled={!selectedStyle}>Next</Button>
      </div>
    </div>
  );
};

const RiskToleranceSection: FC<{
  onNext: () => void;
  onPrevious: () => void;
  selectedRisk: RiskTolerance['value'] | null;
  onSelect: (risk: RiskTolerance['value']) => void;
}> = ({ onNext, onPrevious, selectedRisk, onSelect }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Set Risk Tolerance</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {riskTolerancesData.map((tolerance: RiskTolerance) => (
          <Card
            key={tolerance.value}
            className={`hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
              selectedRisk === tolerance.value ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onSelect(tolerance.value)}
          >
            <CardHeader className="flex flex-col items-center">
              <tolerance.icon className="w-12 h-12 mb-4 text-primary" />
              <CardTitle className="text-xl font-semibold mb-2">{tolerance.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-4">{tolerance.description}</p>
              <ul className="list-disc list-inside">
                {tolerance.criteria.map((criterion: string, idx: number) => (
                  <li key={idx}>{criterion}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <Button onClick={onPrevious}>Previous</Button>
        <Button onClick={onNext} disabled={!selectedRisk}>Next</Button>
      </div>
    </div>
  );
};

const OnboardingFlow: FC = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const { isLoading: onboardingLoading, error: onboardingError } = useOnboarding();
  const {
    investmentStyle,
    setInvestmentStyle,
    riskTolerance,
    setRiskTolerance,
    savePreferences,
    isSaving,
    error: preferencesError,
  } = useOnboardingPreferences();

  useEffect(() => {
    if (step === 4) {
      savePreferences().then(() => {
        navigate('/screener/results');
      });
    }
  }, [step, navigate, savePreferences]);

  const handleNextStep = () => {
    setStep(step + 1);
    setProgress((step + 1) * 20);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
    setProgress((step - 1) * 20);
  };

  const steps = [
    {
      title: 'Welcome',
      description: 'Introduction to Erisfy',
      icon: () => <span>1</span>,
    },
    {
      title: 'Investment Style',
      description: 'Choose your style',
      icon: () => <span>2</span>,
    },
    {
      title: 'Risk Tolerance',
      description: 'Select your risk level',
      icon: () => <span>3</span>,
    },
    {
      title: 'Start Screening',
      description: 'Go to results',
      icon: () => <span>4</span>,
    },
  ];

  const welcomeContent = {
    header: 'Welcome to Erisfy! Your AI-Powered Investment Tool',
    description:
      'Making smarter investment decisions has never been easier. Erisfy helps you find, analyze, and track stocks that fit your investment goals—faster and more efficiently.',
    bulletPoints: [
      '✅ Cut Through the Noise – Instantly filter stocks based on growth, value, dividends, and more.',
      '✅ AI-Powered Insights – Get real-time recommendations and trend alerts.',
      '✅ Personalized Experience – Customize filters, watchlists, and notifications for smarter investing.',
    ],
    cta: 'Get Started →',
  };

  if (onboardingLoading || isSaving) {
    return <div>Loading...</div>;
  }

  if (onboardingError || preferencesError) {
    return <div>Error: {onboardingError || preferencesError}</div>;
  }

  return (
    <div className="p-6 m-4 space-y-6 container mx-auto bg-background text-foreground">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold mb-2 text-primary">
            Smart Start
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Stepper
            className="mb-8"
            currentStep={step}
            steps={steps}
            onStepClick={setStep}
          />
          {step === 1 && (
            <div className="space-y-8">
              <div className="hero-section">
                <h2 className="text-4xl font-bold mb-4">{welcomeContent.header}</h2>
                <p className="mb-4">{welcomeContent.description}</p>
                <ul className="list-disc list-inside mr-4 mb-4 p-4">
                  {welcomeContent.bulletPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  onClick={handleNextStep}
                >
                  {welcomeContent.cta}
                </Button>
              </div>
              <FeatureCarousel api={api} setApi={setApi} />
            </div>
          )}
          {step === 2 && (
            <InvestmentStyleSection
              onNext={handleNextStep}
              onPrevious={handlePreviousStep}
              selectedStyle={investmentStyle}
              onSelect={setInvestmentStyle}
            />
          )}
          {step === 3 && (
            <RiskToleranceSection
              onNext={handleNextStep}
              onPrevious={handlePreviousStep}
              selectedRisk={riskTolerance}
              onSelect={setRiskTolerance}
            />
          )}
          <Progress value={progress} className="mt-4" />
        </CardContent>
      </Card>
      <ErisfyProBanner />
    </div>
  );
};


export { OnboardingFlow };