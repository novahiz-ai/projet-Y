
import React from 'react';
import { Send, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend, isLoading }) => {
  const { t } = useTranslation();

  return (
    <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="flex items-center space-x-3 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm focus-within:border-brand-primary/30 focus-within:ring-4 focus-within:ring-brand-primary/5 transition-all">
        <input 
          type="text" 
          placeholder={t('chatbot.placeholder')}
          className="flex-1 bg-transparent border-none px-4 py-2 text-sm font-bold outline-none text-slate-950 dark:text-white placeholder:text-slate-400/60"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
          disabled={isLoading}
        />
        <button 
          onClick={onSend}
          disabled={!value.trim() || isLoading}
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
  );
};

export default ChatInput;
