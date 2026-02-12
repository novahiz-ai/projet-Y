
import React from 'react';

interface Message {
  text: string;
  isAssistant: boolean;
  time: string;
}

interface ChatMessageProps {
  msg: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ msg }) => {
  return (
    <div className={`flex ${msg.isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[85%] space-y-2 ${msg.isAssistant ? 'order-2' : 'order-1'}`}>
        <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed ${
          msg.isAssistant 
          ? 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-tl-sm border border-slate-100 dark:border-slate-800' 
          : 'bg-brand-primary text-white rounded-tr-sm shadow-brand'
        }`}>
          {msg.text}
        </div>
        <p className={`text-[8px] font-black uppercase tracking-widest text-slate-400 ${msg.isAssistant ? 'text-left' : 'text-right'}`}>
          {msg.time}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
