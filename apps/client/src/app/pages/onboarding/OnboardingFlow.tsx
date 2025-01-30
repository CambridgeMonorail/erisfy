import { FC, useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Progress, Carousel } from '@erisfy/shadcnui';
import { Stepper } from '@erisfy/shadcnui-blocks';
import { useNavigate } from 'react-router-dom';
import { CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselApi } from '@erisfy/shadcnui';
import { Filter, BrainCircuit, SlidersHorizontal, Activity, BarChart, TrendingUp, Tag, DollarSign, Rocket, Scale, User, Shield } from 'lucide-react';

const OnboardingFlow: FC = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (step === 5) {
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
    setProgress((step + 1) * 20);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
    setProgress((step - 1) * 20);
  };

  const steps = [
    { title: 'Welcome', description: 'Introduction to Erisfy', icon: () => <span>1</span> },
    { title: 'Investment Style', description: 'Choose your style', icon: () => <span>2</span> },
    { title: 'Risk Tolerance', description: 'Select your risk level', icon: () => <span>3</span> },
    { title: 'Preferences', description: 'Set your preferences', icon: () => <span>4</span> },
    { title: 'Start Screening', description: 'Go to results', icon: () => <span>5</span> },
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

  const investmentStyles = [
    {
      title: 'Growth Investor',
      description: 'For those seeking high-growth stocks with strong future potential.',
      criteria: [
        'High revenue and earnings growth',
        'Strong price momentum',
        'High P/E ratios'
      ],
      icon: <TrendingUp className="w-12 h-12 mb-4 text-primary" />
    },
    {
      title: 'Value Investor',
      description: 'For those who prefer to invest in undervalued stocks with strong fundamentals.',
      criteria: [
        'Low P/E and P/B ratios',
        'Solid balance sheet',
        'High dividend yield'
      ],
      icon: <Tag className="w-12 h-12 mb-4 text-primary" />
    },
    {
      title: 'Dividend Investor',
      description: 'For those looking for steady income through high-dividend-paying stocks.',
      criteria: [
        'High dividend yield',
        'Stable earnings',
        'Strong payout ratio'
      ],
      icon: <DollarSign className="w-12 h-12 mb-4 text-primary" />
    },
    {
      title: 'Momentum Trader',
      description: 'For those who trade based on stock price trends and technical indicators.',
      criteria: [
        'High RSI',
        'Moving average breakouts',
        'Recent strong price performance'
      ],
      icon: <Rocket className="w-12 h-12 mb-4 text-primary" />
    },
    {
      title: 'Balanced Portfolio',
      description: 'For those who want a diversified approach combining value, growth, and income.',
      criteria: [
        'Mix of growth, value, and dividend stocks',
        'Risk-adjusted returns'
      ],
      icon: <Scale className="w-12 h-12 mb-4 text-primary" />
    },
    {
      title: 'I Know What I’m Doing (Experienced Investor)',
      description: 'Skip guidance and go straight to the full feature set.',
      criteria: [
        'Direct access to all filters and customization tools'
      ],
      icon: <User className="w-12 h-12 mb-4 text-primary" />
    }
  ];

  const riskTolerances = [
    {
      title: 'Conservative Investor (Low Risk)',
      description: 'Prioritizing stability over high returns.',
      criteria: [
        'Focus on low-volatility stocks',
        'Preference for dividend-paying & blue-chip companies',
        'Avoids highly speculative investments'
      ],
      icon: <Shield className="w-12 h-12 mb-4 text-primary" />
    },
    {
      title: 'Moderate Investor (Medium Risk)',
      description: 'Balancing growth potential with risk management.',
      criteria: [
        'Invests in a mix of stable and growth-oriented stocks',
        'Accepts some volatility for better returns',
        'Diversified portfolio with moderate risk exposure'
      ],
      icon: <Scale className="w-12 h-12 mb-4 text-primary" />
    },
    {
      title: 'Aggressive Investor (High Risk)',
      description: 'Seeking high returns with higher market exposure.',
      criteria: [
        'Comfortable with market fluctuations & volatility',
        'Invests in growth stocks, emerging markets, and high-risk sectors',
        'Willing to accept short-term losses for long-term gains'
      ],
      icon: <Rocket className="w-12 h-12 mb-4 text-primary" />
    },
    {
      title: 'I Know What I’m Doing (Custom Risk Level)',
      description: 'Skip guidance and manually configure risk settings.',
      criteria: [
        'Direct access to full customization of risk parameters',
        'Ability to fine-tune portfolio strategy without pre-set options'
      ],
      icon: <SlidersHorizontal className="w-12 h-12 mb-4 text-primary" />
    }
  ];

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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {investmentStyles.map((style, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="flex flex-col items-center">
                      {style.icon}
                      <CardTitle className="text-xl font-semibold mb-2">{style.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center mb-4">{style.description}</p>
                      <ul className="list-disc list-inside">
                        {style.criteria.map((criterion, idx) => (
                          <li key={idx}>{criterion}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <Button onClick={handlePreviousStep}>Previous</Button>
                <Button onClick={handleNextStep}>Next</Button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Set Risk Tolerance</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {riskTolerances.map((tolerance, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="flex flex-col items-center">
                      {tolerance.icon}
                      <CardTitle className="text-xl font-semibold mb-2">{tolerance.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center mb-4">{tolerance.description}</p>
                      <ul className="list-disc list-inside">
                        {tolerance.criteria.map((criterion, idx) => (
                          <li key={idx}>{criterion}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <Button onClick={handlePreviousStep}>Previous</Button>
                <Button onClick={handleNextStep}>Next</Button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Set Preferences</h2>
              <p className="mb-4">Customize your investment preferences.</p>
              <Button onClick={handlePreviousStep}>Previous</Button>
              <Button onClick={handleNextStep}>Next</Button>
            </div>
          )}
          {step === 5 && (
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
