import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, ArrowRight, ArrowLeft, CheckCircle2, Shield, User, Briefcase, Mail, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FormLabel, FormInput, FormSelect } from '../ui/FormControls';
import CustomDatePicker from '../CustomDatePicker';
import CountrySelector from '../CountrySelector';
import StandardButton from '../StandardButton';
import Logo from '../Logo';

interface SignupFormProps {
  onSwitch: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitch }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    civility: 'mr',
    country: 'FR',
    city: '',
    job: ''
  });

  const nextStep = () => {
    setDirection(1);
    setStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(prev => Math.max(prev - 1, 1));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[3rem] shadow-3xl border border-slate-100 dark:border-slate-800 relative w-[350px] h-[450px] flex flex-col overflow-hidden"
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800">
        <motion.div 
          className="h-full bg-brand-primary"
          initial={{ width: "25%" }}
          animate={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="flex flex-col items-center space-y-2 mb-6 shrink-0">
          <Logo size="sm" />
          <div className="flex items-center space-x-2">
            <span className="text-[7px] font-black uppercase tracking-[0.4em] text-slate-400">Étape {step} / 4</span>
          </div>
        </div>

        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full"
            >
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">Vos Identifiants</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <FormLabel className="!text-[8px]" Icon={Mail}>Email</FormLabel>
                      <FormInput 
                        type="email" 
                        placeholder="nom@exemple.com" 
                        className="!py-2.5 !text-xs !rounded-xl" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <FormLabel className="!text-[8px]" Icon={Lock}>Mot de passe</FormLabel>
                      <FormInput 
                        type="password" 
                        placeholder="••••••••" 
                        className="!py-2.5 !text-xs !rounded-xl" 
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">Votre Profil</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1 col-span-1">
                        <FormLabel className="!text-[8px]">Civ.</FormLabel>
                        <FormSelect 
                          className="!py-2.5 !text-xs !rounded-xl !px-3"
                          value={formData.civility}
                          onChange={(e) => setFormData({...formData, civility: e.target.value})}
                        >
                          <option value="mr">M.</option>
                          <option value="mrs">Mme</option>
                        </FormSelect>
                      </div>
                      <div className="space-y-1 col-span-2">
                        <FormLabel className="!text-[8px]">Prénom</FormLabel>
                        <FormInput 
                          placeholder="Jean" 
                          className="!py-2.5 !text-xs !rounded-xl" 
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <FormLabel className="!text-[8px]">Nom</FormLabel>
                      <FormInput 
                        placeholder="Dupont" 
                        className="!py-2.5 !text-xs !rounded-xl" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <CustomDatePicker 
                        label="Date de Naissance" 
                        value={formData.birthDate} 
                        onChange={(val) => setFormData({...formData, birthDate: val})} 
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">Localisation & Job</h3>
                  <div className="space-y-3">
                    <CountrySelector 
                      label="Pays de résidence" 
                      value={formData.country} 
                      onChange={(c) => setFormData({...formData, country: c.code})} 
                    />
                    <div className="space-y-1">
                      <FormLabel className="!text-[8px]">Ville</FormLabel>
                      <FormInput 
                        placeholder="Paris" 
                        className="!py-2.5 !text-xs !rounded-xl" 
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <FormLabel className="!text-[8px]" Icon={Briefcase}>Profession</FormLabel>
                      <FormInput 
                        placeholder="Analyste" 
                        className="!py-2.5 !text-xs !rounded-xl" 
                        value={formData.job}
                        onChange={(e) => setFormData({...formData, job: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 text-center py-4">
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle2 size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">Presque Terminé !</h3>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-bold uppercase tracking-tight">
                      En cliquant sur "Finaliser", vous acceptez nos conditions générales et notre politique de confidentialité.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center space-x-3 text-slate-400">
                    <Shield size={16} className="text-brand-primary" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Protection des données AES-256</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="pt-6 space-y-4 shrink-0">
          <div className="flex items-center space-x-3">
            {step > 1 && (
              <button 
                onClick={prevStep}
                className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl hover:bg-slate-200 transition-all active:scale-90"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <StandardButton 
              className="flex-1 !py-4 shadow-brand"
              onClick={step === 4 ? () => {} : nextStep}
            >
              <span className="text-xs">{step === 4 ? "Finaliser" : "Continuer"}</span>
              <ArrowRight size={16} />
            </StandardButton>
          </div>

          <div className="text-center space-y-2">
            <div className="h-px w-8 bg-slate-100 dark:bg-slate-800 mx-auto" />
            <button 
              onClick={onSwitch}
              className="text-[9px] font-black uppercase tracking-widest text-brand-primary hover:underline"
            >
              {t('auth.have_account')} <span className="underline italic ml-1">Se connecter</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignupForm;