import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import MaintenanceOverlay from '../components/maintenance/MaintenanceOverlay';
import LoginBenefits from '../components/auth/LoginBenefits';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import LoginBackground from '../components/auth/LoginBackground';
import LoginNavigation from '../components/auth/LoginNavigation';

const LoginPage: React.FC = () => {
  // Réactivation forcée du mode maintenance (V16.5)
  const [showMaintenance, setShowMaintenance] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen flex items-stretch md:items-center justify-center bg-white dark:bg-slate-950 md:px-6 overflow-x-hidden relative">
      <MaintenanceOverlay isVisible={showMaintenance} />
      <LoginBackground />
      <LoginNavigation />

      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-12 md:gap-8 lg:gap-20 items-center relative z-10">
        <LoginBenefits isSignup={authMode === 'signup'} />
        
        <div className={`lg:col-span-6 w-full flex justify-center lg:justify-start transition-all duration-700 ${showMaintenance ? 'opacity-30 grayscale blur-[4px] pointer-events-none select-none' : 'opacity-100'}`}>
          <AnimatePresence mode="wait">
            {authMode === 'login' ? (
              <LoginForm key="login" onSwitch={() => setAuthMode('signup')} />
            ) : (
              <SignupForm key="signup" onSwitch={() => setAuthMode('login')} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;