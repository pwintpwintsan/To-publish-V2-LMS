
import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Mail, 
  Users, 
  GraduationCap, 
  Upload, 
  Save, 
  ChevronLeft, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Info, 
  Sparkles,
  User,
  Hash
} from 'lucide-react';

interface BranchRegistrationViewProps {
  onBack: () => void;
}

export const BranchRegistrationView: React.FC<BranchRegistrationViewProps> = ({ onBack }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    branchId: '',
    adminEmail: '',
    contactPerson: '',
    teacherQuota: 10,
    studentQuota: 200,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => onBack(), 2000);
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in slide-in-from-bottom duration-500">
      {/* Standardized Header */}
      <div className="w-full bg-[#304B9E] rounded-[2.5rem] p-6 md:p-8 text-white shadow-xl border-b-[10px] border-[#F05A28] flex flex-col md:flex-row items-center justify-between gap-6 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-6 relative z-10">
           <button onClick={onBack} className="p-4 md:p-5 bg-white/10 rounded-2xl text-white shadow-xl hover:bg-[#ec2027] transition-all group active:scale-90 border-2 border-white/10">
             <ChevronLeft size={32} strokeWidth={4} />
           </button>
           <div>
             <h2 className="text-2xl md:text-3xl font-black leading-none tracking-tight uppercase">Hub <span className="text-[#F05A28]">Registry</span></h2>
             <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-2">Activate new center location</p>
           </div>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 relative z-10 backdrop-blur-sm">
           <Building2 size={24} className="text-[#F05A28]" />
           <span className="text-[10px] font-black uppercase tracking-widest">System Registry Active</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-10">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 space-y-8 relative">
          {isSuccess && (
            <div className="absolute inset-0 z-50 bg-[#00a651] flex flex-col items-center justify-center text-white p-10 animate-in fade-in rounded-[3rem]">
               <CheckCircle2 size={80} strokeWidth={4} className="mb-4 animate-bounce" />
               <h3 className="text-4xl font-black uppercase tracking-tighter">Hub Activated!</h3>
               <p className="text-lg font-bold opacity-80 uppercase tracking-widest mt-2 text-center">Center added to Digital Information Resources network</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <h3 className="text-sm font-black text-[#304B9E] uppercase tracking-widest mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#ec2027] rounded-full"></div> Identity
                </h3>
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Branch Name</label>
                   <input required type="text" className="w-full bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 focus:border-[#F05A28] outline-none font-black text-base text-[#304B9E] shadow-inner transition-all" placeholder="e.g. North Point Hub" />
                </div>
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Physical Location</label>
                   <input required type="text" className="w-full bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 focus:border-[#F05A28] outline-none font-black text-base text-[#304B9E] shadow-inner transition-all" placeholder="e.g. Mandalay City" />
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-sm font-black text-[#304B9E] uppercase tracking-widest mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#3b82f6] rounded-full"></div> Allocation
                </h3>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Staff Cap</label>
                      <input type="number" defaultValue={10} className="w-full bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 outline-none font-black text-lg text-[#304B9E] text-center" />
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Learner Cap</label>
                      <input type="number" defaultValue={200} className="w-full bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 outline-none font-black text-lg text-[#304B9E] text-center" />
                   </div>
                </div>
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Email</label>
                   <input required type="email" className="w-full bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 focus:border-[#F05A28] outline-none font-black text-base text-[#304B9E] shadow-inner transition-all" placeholder="admin@hub.ubook.com" />
                </div>
             </div>
          </div>

          <button type="submit" className="w-full py-6 bg-[#304B9E] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-[#00a651] transition-all border-b-6 border-black/10 active:scale-95">
             Verify and Register Center
          </button>
        </form>
      </div>
    </div>
  );
};