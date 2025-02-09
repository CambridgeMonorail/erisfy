"use client"

import { useState, useCallback, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { NewsStoryCard, type Story } from "../news-story-card"

export interface NewsCarouselProps {
  stories: Story[]
  className?: string
}

export function NewsCarousel({ stories, className = "" }: NewsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  if (stories.length === 0) {
    return null
  }

  return (
    <div className={`relative max-w-7xl mx-auto px-4 ${className}`} role="region">
      <div className="overflow-hidden -mx-4" ref={emblaRef}>
        <div className="flex">
          {stories.map((story, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4">
              <NewsStoryCard story={story} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors disabled:opacity-50"
          onClick={() => scrollTo(selectedIndex - 1)}
          disabled={selectedIndex === 0}
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6 text-primary" />
        </button>
        <div className="flex space-x-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === selectedIndex
                  ? "bg-primary"
                  : "bg-muted hover:bg-primary/50"
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button
          className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors disabled:opacity-50"
          onClick={() => scrollTo(selectedIndex + 1)}
          disabled={selectedIndex === scrollSnaps.length - 1}
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6 text-primary" />
        </button>
      </div>
    </div>
  )
}
