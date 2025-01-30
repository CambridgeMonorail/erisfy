import { FC, useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Tooltip, TooltipTrigger, TooltipContent, Progress, Carousel } from '@erisfy/shadcnui';
import { Stepper } from '@erisfy/shadcnui-blocks';
import { useNavigate } from 'react-router-dom';

const OnboardingFlow: FC = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 4) {
      navigate('/screener/results');
    }
  }, [step, navigate]);

  const handleNextStep = () => {
    setStep(step + 1);
    setProgress((step + 1) * 25);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
    setProgress((step - 1) * 25);
  };

  const steps = [
    { title: 'Welcome', description: 'Introduction to Erisfy', icon: () => <span>1</span> },
    { title: 'Select Investment Style', description: 'Choose your style', icon: () => <span>2</span> },
    { title: 'Set Risk Tolerance', description: 'Select your risk level', icon: () => <span>3</span> },
    { title: 'Start Screening', description: 'Go to results', icon: () => <span>4</span> },
  ];

  const welcomeContent = {
    header: "Welcome to Erisfy! Your AI-Powered Investment Tool",
    description: "Making smarter investment decisions has never been easier. Erisfy helps you find, analyze, and track stocks that fit your investment goals—faster and more efficiently. Whether you’re a seasoned investor or just getting started, our AI-powered filters and insights help you maximize your potential.",
    bulletPoints: [
      "✅ Cut Through the Noise – Instantly filter stocks based on growth, value, dividends, and more.",
      "✅ AI-Powered Insights – Get real-time recommendations and trend alerts.",
      "✅ Personalized Experience – Customize filters, watchlists, and notifications for smarter investing."
    ],
    cta: "Get Started →"
  };

  return (
    <div className="p-6 m-4 space-y-6 container mx-auto bg-background text-foreground">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-semibold mb-2 text-primary">
            Smart Start
          </CardTitle>
        </CardHeader>
        <CardContent >
          <Stepper className='mb-8' currentStep={step} steps={steps} onStepClick={setStep} />
          {step === 1 && (
            <div>
              <div className="hero-section">
                <h2 className="text-4xl font-bold mb-4">{welcomeContent.header}</h2>
                <p className="mb-4">{welcomeContent.description}</p>
                <ul className="list-disc list-inside mb-4">
                  {welcomeContent.bulletPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                <Button className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary" onClick={handleNextStep}>
                  {welcomeContent.cta}
                </Button>
              </div>
              <div className="carousel-section mt-8">
                <Carousel>
                  <div className="carousel-item">Benefit 1: Filtering stocks</div>
                  <div className="carousel-item">Benefit 2: AI-powered insights</div>
                  <div className="carousel-item">Benefit 3: Personalized experience</div>
                </Carousel>
              </div>
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
