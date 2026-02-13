import { useState, useEffect } from 'react';

export const useConnectivity = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setHasChanged(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setHasChanged(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, hasChanged };
};