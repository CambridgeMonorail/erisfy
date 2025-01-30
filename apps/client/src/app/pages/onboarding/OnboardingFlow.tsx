import { FC, useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Progress, Carousel } from '@erisfy/shadcnui';
import { Stepper } from '@erisfy/shadcnui-blocks';
import { useNavigate } from 'react-router-dom';
import { CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselApi } from '@erisfy/shadcnui';
import { Filter, BrainCircuit, SlidersHorizontal, Activity, BarChart } from 'lucide-react';

const OnboardingFlow: FC = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (step === 4) {
      navigate('/screener/results');
    }
  }, [step, navigate]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

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
    { title: 'Investment Style', description: 'Choose your style', icon: () => <span>2</span> },
    { title: 'Risk Tolerance', description: 'Select your risk level', icon: () => <span>3</span> },
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
                <ul className="list-disc list-inside mr -4 mb-4 p-4">
                  {welcomeContent.bulletPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                <Button className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary" onClick={handleNextStep}>
                  {welcomeContent.cta}
                </Button>
              </div>
              <div className="carousel-section mt-8 flex flex-col items-center">
                <Carousel setApi={setApi} className="w-full max-w-xs">
                  <CarouselContent>
                    <CarouselItem>
                      <div className="flex flex-col items-center">
                        <Filter className="w-12 h-12 mb-4 text-primary" />
                        <h3 className="text-xl font-semibold mb-2">Smarter Stock Filtering</h3>
                        <p className="text-center">Find the right stocks—faster. Tired of sifting through endless tickers? Erisfy’s advanced filtering system helps you discover stocks that match your strategy in seconds. Whether you're a growth investor, a value seeker, or a momentum trader, our powerful filters make stock discovery effortless.</p>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="flex flex-col items-center">
                        <BrainCircuit className="w-12 h-12 mb-4 text-primary" />
                        <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
                        <p className="text-center">Let AI do the heavy lifting. Stop guessing—Erisfy’s AI-driven analytics scan the market in real time, delivering trend analysis, risk signals, and strategic insights tailored to your investment style. Stay ahead of market movements with cutting-edge AI recommendations.</p>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="flex flex-col items-center">
                        <SlidersHorizontal className="w-12 h-12 mb-4 text-primary" />
                        <h3 className="text-xl font-semibold mb-2">A Personalized Investing Experience</h3>
                        <p className="text-center">Your strategy, your way. Investing isn’t one-size-fits-all. Erisfy adapts to your goals, whether you’re optimizing for long-term growth, dividends, or short-term trading opportunities. Save custom filters, track watchlists, and receive tailored updates—all in a beautifully intuitive interface.</p>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="flex flex-col items-center">
                        <Activity className="w-12 h-12 mb-4 text-primary" />
                        <h3 className="text-xl font-semibold mb-2">Real-time Market Data</h3>
                        <p className="text-center">Stay updated with real-time market data. Erisfy provides you with the latest market information, ensuring you make informed decisions based on the most current data available.</p>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="flex flex-col items-center">
                        <BarChart className="w-12 h-12 mb-4 text-primary" />
                        <h3 className="text-xl font-semibold mb-2">Comprehensive Stock Analysis</h3>
                        <p className="text-center">Get a complete view of your stocks. Erisfy’s comprehensive stock analysis tools provide you with detailed insights into each stock’s performance, helping you make well-informed investment decisions.</p>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <div className="py-2 text-center text-sm text-muted-foreground">
                  {current} of {count}
                </div>
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
