import { FC, useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@erisfy/shadcnui';
import {
  Filter,
  BrainCircuit,
  SlidersHorizontal,
  Activity,
  BarChart,
} from 'lucide-react';

type FeatureCarouselProps = {
  api: CarouselApi | null;
  setApi: (api: CarouselApi) => void;
};

const features = [
  {
    icon: Filter,
    title: 'Smarter Stock Filtering',
    description: 'Find the right stocks—faster. Tired of sifting through endless tickers? Erisfy\'s advanced filtering system helps you discover stocks that match your strategy in seconds.',
  },
  {
    icon: BrainCircuit,
    title: 'AI-Powered Insights',
    description: 'Let AI do the heavy lifting. Stop guessing—Erisfy\'s AI-driven analytics scan the market in real time, delivering trend analysis, risk signals, and strategic insights.',
  },
  {
    icon: SlidersHorizontal,
    title: 'A Personalized Investing Experience',
    description: 'Your strategy, your way. Investing isn\'t one-size-fits-all. Erisfy adapts to your goals and helps you optimize for your specific investment objectives.',
  },
  {
    icon: Activity,
    title: 'Real-time Market Data',
    description: 'Stay updated with real-time market data. Erisfy provides you with the latest market information, ensuring you make informed decisions.',
  },
  {
    icon: BarChart,
    title: 'Comprehensive Stock Analysis',
    description: 'Get a complete view of your stocks. Erisfy\'s comprehensive stock analysis tools provide you with detailed insights into each stock\'s performance.',
  },
];

export const FeatureCarousel: FC<FeatureCarouselProps> = ({ api, setApi }) => {
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="carousel-section mt-8 flex flex-col items-center p-24">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {features.map((feature, index) => (
            <CarouselItem key={index} className="basis-1/2">
              <div className="flex flex-col items-center">
                <feature.icon className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-center">{feature.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        {current} of {count}
      </div>
    </div>
  );
};
