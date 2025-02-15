import { FC, ReactElement, useEffect, useState, useRef } from 'react';

interface LogoCarouselProps {
  logos: ReactElement[];
  header?: string;
  subheader?: string;
}

/**
 * LogoCarousel component displays a horizontal scrolling carousel of logos.
 *
 * This component is useful for showcasing partner logos, client logos, or any
 * other set of logos in a visually appealing and interactive manner.
 */
const LogoCarousel: FC<LogoCarouselProps> = ({ logos, header, subheader }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [carouselLogos, setCarouselLogos] = useState([...logos, ...logos]); // Duplicate logos for seamless scroll

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollStep = 1; // Scroll speed (px per interval)
    const interval = 16; // Interval duration (~60 FPS)
    let animationFrame: number;

    const startScrolling = () => {
      if (!container) return;

      container.scrollLeft += scrollStep;

      // Check if the first logo is fully out of view
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0; // Reset scroll position to maintain seamless loop
      }

      animationFrame = requestAnimationFrame(startScrolling); // Keep scrolling
    };

    animationFrame = requestAnimationFrame(startScrolling); // Start the animation

    return () => cancelAnimationFrame(animationFrame); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Header Section */}
      {header && <h2 className="text-2xl font-bold text-primary">{header}</h2>}
      {subheader && <p className="text-lg">{subheader}</p>}

      {/* Logo Carousel */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden mt-4 pt-4"
        style={{ whiteSpace: 'nowrap' }}
      >
        <div className="flex">
          {carouselLogos.map((logo, index) => (
            <div
              key={`logo-${index}`}
              className="flex-shrink-0 w-[50%] sm:w-[33.333%] md:w-[25%] lg:w-[20%] xl:w-[16.666%] h-16 sm:h-20 md:h-24 flex items-center justify-center px-2 sm:px-4"
            >
              <div className="w-full max-w-[100px] sm:max-w-[120px] mx-auto">
                {logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { LogoCarousel, LogoCarouselProps };
