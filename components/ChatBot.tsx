
import React, { useState, useRef, useEffect } from 'react';
import { X, Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { getFinancialAdvice } from '../geminiService';
import ChatMessageList from './chatbot/ChatMessageList';
import ChatInput from './chatbot/ChatInput';

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
      setMessages(prev => [...prev, {
        text: advice || t('chatbot.error'),
        isAssistant: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
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
    <div className="fixed bottom-24 right-6 z-[200] w-[calc(100vw-3rem)] sm:w-[380px] h-[500px] sm:h-[600px] bg-white dark:bg-slate-950 rounded-[2.5rem] shadow-3xl flex flex-col border border-slate-100 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 bg-brand-primary text-white flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10">
            <Bot size={24} />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-tight">{t('chatbot.brand_label')}</h4>
            <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">{t('chatbot.agent_name')}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors active:scale-90">
          <X size={20} />
        </button>
      </div>

      <ChatMessageList 
        messages={messages} 
        isLoading={isLoading} 
        messagesEndRef={messagesEndRef} 
      />

      <ChatInput 
        value={input} 
        onChange={setInput} 
        onSend={handleSend} 
        isLoading={isLoading} 
      />
    </div>
  );
};

export default ChatBot;
