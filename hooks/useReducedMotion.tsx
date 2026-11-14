import { useColorScheme, useMediaQuery } from 'react-native';
import { useEffect, useState } from 'react';

export const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check system preference on mount
  useEffect(() => {
    const match = useMediaQuery('(prefers-reduced-motion: reduce)');
    setReducedMotion(match);
  }, []);

  // Update when system preference changes
  useEffect(() => {
    const listener = () => {
      // @ts-ignore
      const match = useMediaQuery('(prefers-reduced-motion: reduce)');
      setReducedMotion(match);
    };
    // @ts-ignore
    const changeEvent = window.addEventListener
      ? window.addEventListener('change', listener)
      : window.addEventListener('resize', listener);

    return () => {
      // @ts-ignore
      window.removeEventListener('change', listener);
      // @ts-ignore
      window.removeEventListener('resize', listener);
    };
  }, []);

  return { reducedMotion };
};