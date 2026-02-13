import React from 'react';

const LoginBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
        alt=""
        className="w-full h-full object-cover opacity-[0.05] dark:opacity-[0.1]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-transparent dark:from-slate-950 dark:via-slate-950/90 dark:to-transparent" />
    </div>
  );
};

export default LoginBackground;