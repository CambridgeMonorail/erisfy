'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NewsStoryCard, type Story } from '../news-story-card';
import { cn } from '@erisfy/shadcnui';
import { DEFAULT_OPTIONS } from './constants';
import type { CarouselOptions } from './types';

export type { CarouselOptions };
export { DEFAULT_OPTIONS };

const BREAKPOINTS = {
  sm: '50%',
  lg: '33.33%',
} as const;

export type NewsCarouselProps = {
  /** Array of news stories to display in the carousel */
  stories: Story[];
  /** Optional className for custom styling */
  className?: string;
  /** Optional carousel configuration options */
  options?: Partial<CarouselOptions>;
};

/**
 * A responsive carousel component for displaying news stories
 * with navigation controls and slide indicators
 */
export function NewsCarousel({
  stories,
  className = '',
  options = {},
}: NewsCarouselProps) {
  // Debug the stories prop
  useEffect(() => {
    console.log('[NewsCarousel] Received stories:', {
      stories,
      count: stories?.length || 0,
      isArray: Array.isArray(stories),
      firstStory: stories?.[0] || null
    });
  }, [stories]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...DEFAULT_OPTIONS,
    ...options,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (stories.length === 0) {
    console.log('[NewsCarousel] No stories, returning null');
    return null;
  }

  console.log('[NewsCarousel] Rendering carousel with', stories.length, 'stories');

  return (
    <div
      className={cn('relative max-w-7xl mx-auto px-4', className)}
      role="region"
      aria-label="News Stories Carousel"
      aria-roledescription="carousel"
      data-testid="news-carousel"
    >
      <div
        className="overflow-hidden -mx-4"
        ref={emblaRef}
        tabIndex={0}
        aria-live="polite"
        data-testid="news-carousel-viewport"
      >
        <div className="flex pb-2">
          {stories.map((story, index) => (
            <div
              key={`${story.title}-${index}`}
              className={cn(
                'flex-[0_0_100%] min-w-0',
                'sm:flex-[0_0_50%]',
                'lg:flex-[0_0_33.33%]',
                'px-4',
              )}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${stories.length}`}
              data-testid={`news-carousel-slide-${index}`}
            >
              <NewsStoryCard story={story} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors disabled:opacity-50"
          onClick={scrollPrev}
          disabled={!prevBtnEnabled}
          aria-label="Previous slide"
          data-testid="news-carousel-prev-button"
        >
          <ChevronLeft className="w-6 h-6 text-primary" />
        </button>

        <div
          className="flex space-x-2"
          role="tablist"
          aria-label="Carousel navigation"
          data-testid="news-carousel-dots"
        >
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                'w-3 h-3 rounded-full transition-colors',
                index === selectedIndex
                  ? 'bg-primary'
                  : 'bg-muted hover:bg-primary/50',
              )}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === selectedIndex}
              role="tab"
              data-testid={`news-carousel-dot-${index}`}
            />
          ))}
        </div>

        <button
          className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors disabled:opacity-50"
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
          aria-label="Next slide"
          data-testid="news-carousel-next-button"
        >
          <ChevronRight className="w-6 h-6 text-primary" />
        </button>
      </div>
    </div>
  );
}
