import { useCallback, useEffect, useRef } from 'react';

type CallbackFunction<Args extends unknown[], Return> = (...args: Args) => Return;

export const useDebounce = <Args extends unknown[], Return>(
  callback: CallbackFunction<Args, Return>,
  delay: number
): CallbackFunction<Args, void> => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};
