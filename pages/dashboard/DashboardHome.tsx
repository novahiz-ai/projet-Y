import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Add missing User and Globe imports from lucide-react
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  History, 
  Download, 
  Send,
  CreditCard,
  ChevronRight,
  ArrowRight,
  Plus,
  User,
  Globe
} from 'lucide-react';

const DashboardHome: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);

  const stats = [
    { label: 'Current Balance', val: '€0', icon: Wallet, bg: 'bg-[#a5d6a7]', iconColor: 'text-[#2e7d32]' },
    { label: 'Monthly Income', val: '€0', icon: TrendingUp, bg: 'bg-white', iconColor: 'text-[#4caf50]' },
    { label: 'Monthly Outgoing', val: '€0', icon: TrendingDown, bg: 'bg-[#ffebee]', iconColor: 'text-rose-500' },
    { label: 'Transaction Limit', val: '€500,000.00', icon: Clock, bg: 'bg-white', iconColor: 'text-indigo-500' }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      {/* LEFT COLUMN - MAIN CONTENT */}
      <div className="xl:col-span-8 space-y-8">
        
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className={`${s.bg} border border-slate-100 p-6 rounded-2xl flex items-center justify-between shadow-sm`}>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-tight">{s.label}</p>
                <p className="text-xl font-black text-slate-900 italic">{s.val}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg === 'bg-white' ? 'bg-slate-100' : 'bg-white/50'} ${s.iconColor}`}>
                <s.icon size={20} />
              </div>
            </div>
          ))}
        </div>

        {/* Main Banner Card */}
        <div className="relative bg-gradient-to-br from-[#1b5e20] via-[#2e7d32] to-[#1b5e20] rounded-[2.5rem] p-10 text-white overflow-hidden shadow-2xl">
          {/* Subtle patterns */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-[20px] border-white/5 rounded-full -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 flex flex-col h-full justify-between space-y-12">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-black text-lg border border-white/30">NG</div>
                <div>
                  <p className="text-[10px] font-bold opacity-60">Good Afternoon</p>
                  <p className="text-lg font-black italic">Nova</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black italic leading-none">17:11:07</p>
                <p className="text-[10px] font-bold opacity-60">Friday, February 13, 2026</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-black uppercase tracking-widest opacity-80">Available Balance</p>
                <button onClick={() => setShowBalance(!showBalance)} className="opacity-60 hover:opacity-100">
                  {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              <p className="text-5xl font-black italic tracking-tighter">
                {showBalance ? '€0 EUR' : '••••••'}
              </p>
            </div>

            <div className="bg-black/10 backdrop-blur-md rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><ShieldCheck size={20} /></div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-[10px] font-bold opacity-60">Your Account Number</p>
                    <span className="px-2 py-0.5 bg-rose-500/20 text-rose-200 rounded-full text-[8px] font-black uppercase">Inactive</span>
                  </div>
                  <p className="text-lg font-black tracking-widest italic">6068590202</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="px-6 py-2.5 bg-white text-emerald-800 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 hover:bg-slate-50 transition-colors">
                  <TrendingUp size={14} />
                  <span>Transactions</span>
                </button>
                <button className="px-6 py-2.5 bg-white text-emerald-800 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 hover:bg-slate-50 transition-colors">
                  <Plus size={14} />
                  <span>Top up</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Grid Section */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm space-y-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">What would you like to do today?</h2>
            <p className="text-xs font-bold text-slate-400 uppercase">Choose from our popular actions below</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Account Info', icon: Wallet, color: 'bg-slate-100 text-slate-600' },
              { label: 'Send Money', icon: Send, color: 'bg-[#81c784] text-[#1b5e20]' },
              { label: 'Deposit', icon: Plus, color: 'bg-[#e8f5e9] text-[#2e7d32]' },
              { label: 'History', icon: History, color: 'bg-[#f3e5f5] text-[#7b1fa2]' }
            ].map((action, i) => (
              <button key={i} className="group flex flex-col items-center justify-center p-8 rounded-3xl space-y-4 hover:shadow-xl transition-all border border-slate-50">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                  <action.icon size={28} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Your Cards Section Preview */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3 text-slate-900">
               <CreditCard size={24} />
               <h3 className="text-xl font-black uppercase italic tracking-tight">Your Cards</h3>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center space-x-1 hover:underline">
              <span>View all</span>
              <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Small card preview placeholder */}
            <div className="aspect-[1.6/1] bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-slate-300">
               <Plus size={32} />
            </div>
            <div className="aspect-[1.6/1] bg-[#f8fafc] border border-slate-100 rounded-3xl p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                 <div className="w-8 h-6 bg-amber-400/50 rounded-md" />
                 <span className="text-[10px] font-black text-slate-300 uppercase">Visa</span>
              </div>
              <p className="text-slate-400 font-bold tracking-widest">•••• •••• •••• 0021</p>
              <div className="flex justify-between items-end">
                <span className="text-[8px] font-black text-slate-300 uppercase">Jean Dupont</span>
                <span className="text-[8px] font-black text-slate-300 uppercase">12 / 27</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - SIDEBAR WIDGETS */}
      <div className="xl:col-span-4 space-y-8">
        
        {/* Account Statistics */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm space-y-10">
          <h3 className="text-xl font-black uppercase italic tracking-tight text-slate-900">Account Statistics</h3>
          
          <div className="space-y-8">
            {[
              { label: 'Transaction Limit', val: '€500,000.00', icon: CreditCard, color: 'bg-[#a5d6a7] text-[#2e7d32]' },
              { label: 'Pending Transactions', val: '€0.00', icon: Clock, color: 'bg-[#fff9c4] text-[#fbc02d]' },
              { label: 'Transaction Volume', val: '€0.00', icon: TrendingUp, color: 'bg-[#e0f2f1] text-[#009688]' },
              { label: 'Account Age', val: '1 month', icon: History, color: 'bg-[#f3e5f5] text-[#7b1fa2]' }
            ].map((stat, i) => (
              <div key={i} className="flex items-center space-x-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${stat.color} shadow-sm`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">{stat.label}</p>
                  <p className="text-lg font-black text-slate-900 italic leading-none">{stat.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Transfer */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm space-y-8">
          <h3 className="text-xl font-black uppercase italic tracking-tight text-slate-900">Quick Transfer</h3>
          
          <div className="space-y-4">
            {[
              { label: 'Local Transfer', sub: '0% Handling charges', icon: User, color: 'bg-[#a5d6a7] text-[#2e7d32]' },
              { label: 'International Transfer', sub: 'Global reach, 0% fee', icon: Globe, color: 'bg-[#a5d6a7] text-[#2e7d32]' }
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center justify-between p-6 bg-[#f8fafc] rounded-3xl hover:bg-slate-100 transition-colors border border-slate-50 group">
                <div className="flex items-center space-x-5">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.color}`}>
                    <item.icon size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black text-slate-900 leading-none mb-1">{item.label}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{item.sub}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-600 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Support Alert Banner */}
        <div className="bg-[#fff3e0] border border-orange-100 rounded-[2.5rem] p-8 flex items-start space-x-5 shadow-sm">
           <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
             <ShieldCheck size={24} />
           </div>
           <div className="space-y-2">
             <h4 className="text-xs font-black uppercase text-orange-900">Need Assistance?</h4>
             <p className="text-[10px] font-bold text-orange-700 leading-relaxed uppercase tracking-tighter">Our financial security team is available 24/7 to secure your assets.</p>
             <button className="text-[9px] font-black uppercase text-orange-900 underline underline-offset-4">Talk to an analyst</button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;