
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import PreFooter from '../PreFooter';
import MobileBottomNav from '../MobileBottomNav';
import CookieBanner from '../CookieBanner';

interface MainLayoutProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onSearchOpen: () => void;
  onOpenApp: (context?: any) => void;
  onOpenSimulator: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, isDarkMode, setIsDarkMode, onSearchOpen, onOpenApp, onOpenSimulator 
}) => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 bg-white dark:bg-slate-950">
      <Header 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        onSearchOpen={onSearchOpen} 
        onOpenApp={onOpenApp} 
        onOpenSimulator={onOpenSimulator}
      />

      <main className="flex-grow pt-[60px] lg:pt-0 pb-[60px] lg:pb-0">
        {children}
      </main>

      <PreFooter onOpenApp={onOpenApp} />
      <Footer />
      <CookieBanner />
      <MobileBottomNav onOpenApp={onOpenApp} onOpenSimulator={onOpenSimulator} />
    </div>
  );
};

export default MainLayout;
