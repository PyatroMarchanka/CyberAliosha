import { useEffect, useState } from 'react';
import { loadSounds } from '../utils/Player';

export const useSoundsLoaded = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return [isLoaded, error];
};
