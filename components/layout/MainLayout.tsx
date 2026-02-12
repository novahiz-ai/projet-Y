
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import PreFooter from '../PreFooter';
import MobileBottomNav from '../MobileBottomNav';
import CookieBanner from '../CookieBanner';
import MobileMenu from '../MobileMenu';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 bg-white dark:bg-slate-950">
      {!isLoginPage && (
        <Header 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
          onSearchOpen={onSearchOpen} 
          onOpenApp={onOpenApp} 
          onOpenSimulator={onOpenSimulator}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
      )}

      <main className={`flex-grow ${!isLoginPage ? 'pb-[60px] lg:pb-0' : ''}`}>
        {children}
      </main>

      {!isLoginPage && (
        <>
          <PreFooter onOpenApp={onOpenApp} />
          <Footer />
        </>
      )}
      
      <CookieBanner />
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        onOpenSimulator={onOpenSimulator}
      />

      {!isLoginPage && (
        <MobileBottomNav 
          onOpenApp={onOpenApp} 
          onOpenSimulator={onOpenSimulator} 
          onSearchOpen={onSearchOpen}
        />
      )}
    </div>
  );
};

export default MainLayout;
