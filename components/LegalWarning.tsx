
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';

interface LegalWarningProps {
  className?: string;
}

const LegalWarning: React.FC<LegalWarningProps> = ({ className = "" }) => {
  const { t } = useTranslation();
  return (
    <div className={`pt-10 flex items-center justify-center space-x-3 text-slate-400 opacity-60 ${className}`}>
      <AlertCircle size={16} />
      <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed text-center">
        {t('consent.warning')}
      </p>
    </div>
  );
};

export default LegalWarning;
