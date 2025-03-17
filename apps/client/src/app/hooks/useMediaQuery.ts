import { useState, useEffect } from 'react';

/**
 * Hook that returns whether a media query matches the current viewport
 * 
 * @param query - CSS media query string (e.g., '(min-width: 768px)')
 * @returns Boolean indicating whether the media query matches
 * 
 * @example
 * ```tsx
 * const isMobile = useMediaQuery('(max-width: 767px)');
 * const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
 * const isDesktop = useMediaQuery('(min-width: 1024px)');
 * ```
 */
export function useMediaQuery(query: string): boolean {
  // Default to false for SSR environment where window is not available
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Check if window is defined (for SSR safety)
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia(query);
    // Set initial value
    setMatches(mediaQuery.matches);

    // Define event handler
    const handler = (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    };

    // Add event listener
    mediaQuery.addEventListener('change', handler);

    // Clean up event listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}
