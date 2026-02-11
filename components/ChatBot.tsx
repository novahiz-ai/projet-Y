import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { getFinancialAdvice } from '../geminiService';

interface Message {
  text: string;
  isAssistant: boolean;
  time: string;
}

interface ChatBotProps {
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      { 
        text: t('chatbot.welcome'), 
        isAssistant: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      text: input,
      isAssistant: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const advice = await getFinancialAdvice(input, i18n.language, location.pathname);
      const assistantMessage: Message = {
        text: advice || t('chatbot.error'),
        isAssistant: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        text: t('chatbot.error'),
        isAssistant: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-[200] w-[calc(100vw-3rem)] sm:w-[380px] h-[500px] sm:h-[600px] bg-white dark:bg-slate-950 rounded-[2.5rem] shadow-3xl flex flex-col border border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="p-6 bg-brand-primary text-white flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10 dark:border-slate-700/50">
            <Bot size={24} />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-tight">{t('chatbot.brand_label')}</h4>
            <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">{t('chatbot.agent_name')}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.isAssistant ? 'justify-start' : 'justify-end'}`}>
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
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl rounded-tl-sm border border-slate-100 dark:border-slate-800">
               <div className="flex space-x-1">
                 <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce"></div>
                 <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                 <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
               </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
        <div className="flex items-center space-x-3 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm focus-within:border-brand-primary/30 transition-all">
          <input 
            type="text" 
            placeholder={t('chatbot.placeholder')}
            className="flex-1 bg-transparent border-none px-4 py-2 text-sm font-medium outline-none text-slate-950 dark:text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 bg-brand-primary text-white rounded-xl flex items-center justify-center shadow-brand active:scale-90 transition-all disabled:opacity-50 disabled:grayscale"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center space-x-2 text-slate-400">
           <ShieldCheck size={12} className="text-emerald-500" />
           <span className="text-[8px] font-black uppercase tracking-[0.2em]">{t('chatbot.secure_notice')}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;