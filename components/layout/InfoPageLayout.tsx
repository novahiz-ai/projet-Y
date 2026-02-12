
import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../ui/PageHeader';
import FadeIn from '../ui/FadeIn';
import ContactSection from '../ContactSection';
import LegalWarning from '../LegalWarning';

interface InfoPageLayoutProps {
  header: {
    title: string;
    highlight: string;
    description?: string;
    label?: string;
    Icon?: any;
    image?: string;
  };
  children: React.ReactNode;
  maxContainerWidth?: string;
}

const InfoPageLayout: React.FC<InfoPageLayoutProps> = ({ 
  header, children, maxContainerWidth = "max-w-7xl" 
}) => {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pb-24 transition-colors duration-500">
      <PageHeader 
        title={header.title}
        highlight={header.highlight}
        description={header.description}
        label={header.label}
        Icon={header.Icon}
        image={header.image}
      />

      <div className={`${maxContainerWidth} mx-auto px-6 py-24 space-y-32`}>
        {children}
        <FadeIn>
          <ContactSection accentColor="text-brand-primary" />
        </FadeIn>
        <FadeIn>
          <LegalWarning />
        </FadeIn>
      </div>
    </div>
  );
};

export default InfoPageLayout;
