
import { useState, useEffect } from 'react';

export const useModals = () => {
  const [isAppFormOpen, setIsAppFormOpen] = useState(false);
  const [appContext, setAppContext] = useState<any>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [simulatorOfferId, setSimulatorOfferId] = useState<string | undefined>(undefined);

  const handleOpenAppForm = (context?: any) => {
    setAppContext(context || null);
    setIsAppFormOpen(true);
    setIsSimulatorOpen(false);
  };

  const handleOpenSimulator = (offerId?: string) => {
    setSimulatorOfferId(offerId);
    setIsSimulatorOpen(true);
  };

  const handleCloseAll = () => {
    setIsAppFormOpen(false);
    setIsSearchOpen(false);
    setIsSimulatorOpen(false);
  };

  useEffect(() => {
    const handleSimEvent = (e: any) => handleOpenSimulator(e.detail?.offerId);
    window.addEventListener('openSimulator', handleSimEvent);
    return () => window.removeEventListener('openSimulator', handleSimEvent);
  }, []);

  return {
    isAppFormOpen,
    setIsAppFormOpen,
    appContext,
    isSearchOpen,
    setIsSearchOpen,
    isSimulatorOpen,
    setIsSimulatorOpen,
    simulatorOfferId,
    handleOpenAppForm,
    handleOpenSimulator,
    handleCloseAll
  };
};
