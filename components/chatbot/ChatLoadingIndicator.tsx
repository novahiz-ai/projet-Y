
import React from 'react';

const ChatLoadingIndicator: React.FC = () => (
  <div className="flex justify-start">
    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl rounded-tl-sm border border-slate-100 dark:border-slate-800">
       <div className="flex space-x-1">
         <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce"></div>
         <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
         <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
       </div>
    </div>
  </div>
);

export default ChatLoadingIndicator;
