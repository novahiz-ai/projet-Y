import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  ArrowRightLeft, 
  CreditCard, 
  Send, 
  Globe, 
  Download, 
  FileText, 
  History, 
  Settings, 
  LogOut,
  Bell,
  User,
  ShieldAlert,
  ShieldCheck,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../Logo';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuSections = [
    {
      title: "Main Menu",
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { id: 'transactions', label: 'Transactions', icon: ArrowRightLeft, path: '/dashboard/history' },
        { id: 'cards', label: 'Cards', icon: CreditCard, path: '/dashboard/cards' },
      ]
    },
    {
      title: "Transfers",
      items: [
        { id: 'local', label: 'Local Transfer', icon: Send, path: '/dashboard/transfer-local' },
        { id: 'wire', label: 'International Wire', icon: Globe, path: '/dashboard/transfer-wire' },
        { id: 'deposit', label: 'Deposit', icon: Download, path: '/dashboard/deposit' },
      ]
    },
    {
      title: "Services",
      items: [
        { id: 'loan-req', label: 'Loan Request', icon: FileText, path: '/dashboard/loan' },
        { id: 'tax', label: 'IRS Tax Refund', icon: FileText, path: '/dashboard/tax' },
        { id: 'loan-hist', label: 'Loan History', icon: History, path: '/dashboard/loan-history' },
      ]
    },
    {
      title: "Account",
      items: [
        { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex transition-colors duration-500 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-[280px] bg-white border-r border-slate-100 flex flex-col h-screen shrink-0 overflow-y-auto scrollbar-hide">
        <div className="p-8 pb-4">
          <Logo size="md" />
        </div>

        {/* Profile Card */}
        <div className="px-6 mb-6">
          <div className="bg-[#f1f5f9] rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#81c784] flex items-center justify-center text-white font-black text-lg">
                NG
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-black text-slate-900 truncate">Nova Geek</h3>
                <p className="text-[10px] font-bold text-slate-400">ID: 6068590202</p>
              </div>
            </div>
            
            <button className="w-full py-2 bg-rose-50 text-rose-500 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-2 border border-rose-100 hover:bg-rose-100 transition-colors">
              <ShieldAlert size={14} />
              <span>Verify KYC</span>
            </button>

            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase text-slate-600 hover:bg-slate-50 flex items-center justify-center space-x-1">
                <User size={12} />
                <span>Profile</span>
              </button>
              <button className="flex-1 py-2 bg-[#2e7d32] text-white rounded-lg text-[10px] font-black uppercase hover:bg-[#1b5e20] flex items-center justify-center space-x-1">
                <LogOut size={12} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 pb-10">
          {menuSections.map((section, idx) => (
            <div key={idx} className="mb-6">
              <h4 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{section.title}</h4>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path || (item.id === 'dashboard' && location.pathname === '/dashboard');
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all group ${
                        isActive 
                          ? 'bg-[#81c784] text-slate-900 shadow-sm' 
                          : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <item.icon size={20} className={isActive ? 'text-slate-900' : 'text-slate-400 group-hover:text-emerald-600'} />
                        <span className="text-[12px] font-bold">{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[#4caf50]">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-black uppercase tracking-tight text-slate-400">Secure Banking</span>
          </div>
          <span className="text-[10px] font-bold text-slate-300">v1.2.0</span>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-[70px] bg-white border-b border-slate-100 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center space-x-3 text-slate-400">
            <FileText size={18} />
            <span className="text-xs font-bold">Friday, February 13, 2026</span>
          </div>

          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#81c784] text-slate-900 rounded-xl font-black text-sm shadow-sm hover:opacity-90 transition-opacity">
              <div className="w-5 h-5 rounded-md bg-[#4caf50] text-white flex items-center justify-center">
                <CreditCard size={12} />
              </div>
              <span>€0</span>
            </button>
            <button className="p-2 text-slate-400 hover:text-emerald-600 relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-100" />
            </button>
            <div className="w-10 h-10 rounded-full bg-[#a5d6a7] flex items-center justify-center text-slate-700 font-black text-xs border-2 border-slate-100 shadow-sm">
              NG
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 bg-[#f8fafc] scrollbar-hide">
          <div className="max-w-[1400px] mx-auto">
            {children}
            
            <footer className="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 pb-10">
              <div className="flex items-center space-x-2">
                <Logo size="sm" />
                <span className="text-[10px] font-bold text-slate-400">© 2026 CIE SA Financial Group. All rights reserved.</span>
              </div>
              <div className="flex items-center space-x-6">
                <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors">Privacy Policy</a>
                <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors">Terms of Service</a>
                <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors">Contact Support</a>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;