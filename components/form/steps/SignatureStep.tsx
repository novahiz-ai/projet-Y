
import React, { useEffect } from 'react';
import SignaturePad from 'signature_pad';
import { PenTool, RotateCcw } from 'lucide-react';

const SignatureStep = ({ canvasRef, signaturePadRef, t }: any) => {
  useEffect(() => {
    if (canvasRef.current) {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvasRef.current.width = canvasRef.current.offsetWidth * ratio;
      canvasRef.current.height = canvasRef.current.offsetHeight * ratio;
      canvasRef.current.getContext("2d")?.scale(ratio, ratio);
      
      signaturePadRef.current = new SignaturePad(canvasRef.current, {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        penColor: '#0f172a'
      });
    }
  }, []);

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-[0.9]">
          {t('form.sign_title')}
          <span className="text-brand-primary">{t('form.sign_highlight')}</span>
        </h1>
        <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">{t('form.sign_desc')}</p>
      </div>

      <div className="relative">
        <div className="absolute top-4 left-4 flex items-center space-x-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
           <PenTool size={12} />
           <span>Zone de signature</span>
        </div>
        <canvas 
          ref={canvasRef} 
          className="w-full h-64 bg-slate-50 dark:bg-white rounded-[2.5rem] border-4 border-slate-100 dark:border-slate-800 touch-none shadow-inner-soft cursor-crosshair"
        />
        <button 
          onClick={() => signaturePadRef.current?.clear()}
          className="absolute bottom-6 right-6 p-3 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-rose-500 transition-colors"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      <div className="flex items-center justify-center space-x-3 text-emerald-500">
         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
         <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t('form.sign_cert')}</span>
      </div>
    </div>
  );
};

export default SignatureStep;
