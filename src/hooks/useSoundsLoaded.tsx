import { useEffect, useState } from 'react';
import { loadSounds } from '../utils/Player';

export const useSoundsLoaded = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadSounds()
      .then(() => {
        setIsLoaded(true);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  });

  return [isLoaded, error];
};
