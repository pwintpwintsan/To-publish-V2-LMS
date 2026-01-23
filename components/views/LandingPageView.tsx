
import React from 'react';
import { ShieldCheck, User, Lock, LogIn, Key } from 'lucide-react';
import { LogoMark } from '../Header.tsx';

interface LandingPageViewProps {
  onOrderCreate: (order: any) => void;
  onLogin?: () => void;
  onCourseClick?: (id: string) => void;
}

const Logo = ({ className = "", size = 60 }: { className?: string, size?: number }) => (
  <div className={`flex flex-col items-center gap-1 select-none ${className}`}>
    <div className="bg-white p-4 rounded-[2rem] shadow-2xl border-4 border-slate-50 mb-2">
      <LogoMark className="w-20 h-20" />
    </div>
    <div className="flex flex-col items-center text-center">
      <span className="text-xl font-black text-[#304B9E] leading-tight tracking-tighter uppercase" style={{ fontSize: size * 0.25 }}>Digital Information Resources</span>
      <span className="text-[7px] font-black text-[#F05A28] uppercase tracking-[0.3em] leading-none mt-1" style={{ fontSize: size * 0.1 }}>Learning Hub</span>
    </div>
  </div>
);

export const LandingPageView: React.FC<LandingPageViewProps> = ({ onLogin }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#F05A28]/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#304B9E]/5 blur-[120px] rounded-full"></div>

      {/* Main Login Interface */}
      <div className="w-full max-w-sm flex flex-col items-center z-10 animate-in fade-in zoom-in-95 duration-700">
        <Logo size={100} className="mb-10" />
        
        <div className="w-full bg-white rounded-[2.5rem] p-10 shadow-[0_30px_60px_-15px_rgba(48,75,158,0.15)] border-[6px] border-[#304B9E] relative group">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-[#304B9E] rounded-2xl text-white shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
              <ShieldCheck size={24} strokeWidth={3} />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#304B9E] uppercase tracking-tight leading-none">Hub Login</h3>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Authorization Required</p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); if (onLogin) onLogin(); }}>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input 
                  required 
                  type="text" 
                  placeholder="Enter username" 
                  className="w-full bg-slate-50 pl-10 pr-4 py-3.5 rounded-2xl border-2 border-slate-50 focus:border-[#ec2027] focus:bg-white outline-none font-black text-[#304B9E] transition-all text-xs" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input 
                  required 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-slate-50 pl-10 pr-4 py-3.5 rounded-2xl border-2 border-slate-50 focus:border-[#ec2027] focus:bg-white outline-none font-black text-[#304B9E] transition-all text-xs" 
                />
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full py-4 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-[#00a651] transition-all border-b-4 border-black/10 active:scale-95 flex items-center justify-center gap-3"
              >
                <LogIn size={18} /> Enter System
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Corners */}
      <div className="absolute bottom-8 left-8 flex items-center gap-3 animate-in slide-in-from-left-4 duration-1000">
        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl shadow-sm flex items-center gap-3 px-4 group hover:bg-white hover:border-[#ec2027] transition-all cursor-default">
          <Key size={14} className="text-[#ec2027]" strokeWidth={3} />
          <div className="flex flex-col">
            <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none mb-0.5">Authorized Register Code</span>
            <span className="text-[10px] font-black text-[#304B9E] uppercase tracking-widest">DIR-LIVE-2024-X</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex items-center gap-2 opacity-30 hover:opacity-100 transition-opacity duration-500 animate-in slide-in-from-right-4 duration-1000">
         <Logo size={50} />
      </div>
    </div>
  );
};