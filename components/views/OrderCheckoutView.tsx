
import React, { useState } from 'react';
import { Order } from '../../types.ts';
import { 
  ChevronLeft, 
  Building2, 
  Users, 
  Mail, 
  MapPin, 
  Rocket, 
  ShieldCheck, 
  Zap
} from 'lucide-react';

interface OrderCheckoutViewProps {
  order: Order;
  onBack: () => void;
}

export const OrderCheckoutView: React.FC<OrderCheckoutViewProps> = ({ order, onBack }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    hubName: '',
    location: '',
    adminEmail: '',
    seats: order.seats || 10
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onBack();
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-slate-50 animate-in fade-in duration-500">
        <div className="bg-white rounded-[3.5rem] p-12 max-w-lg w-full shadow-2xl border-b-[15px] border-[#00a651] text-center animate-in zoom-in-95 duration-300 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16"></div>
           <div className="w-24 h-24 bg-green-100 text-[#00a651] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border-2 border-green-200">
              <ShieldCheck size={56} strokeWidth={2.5} />
           </div>
           <h3 className="text-4xl font-black text-[#292667] mb-4 uppercase tracking-tighter">Hub Activated!</h3>
           <p className="text-slate-500 font-bold mb-10 text-sm uppercase tracking-widest leading-relaxed">
             The program <span className="text-[#00a651]">{order.courseName}</span> is now registered for your center. Access is being provisioned.
           </p>
           <button 
             onClick={onBack}
             className="w-full py-5 bg-[#292667] text-[#ec2027] rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-[#00a651] hover:text-white transition-all shadow-xl border-b-6 border-black/10 active:scale-95"
           >
             Go to Console
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in slide-in-from-bottom duration-500">
      {/* Header Bar */}
      <div className="w-full bg-[#292667] rounded-[2.5rem] p-6 md:p-8 text-white shadow-xl border-b-[12px] border-[#3b82f6] flex flex-col md:flex-row items-center justify-between gap-6 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-6 relative z-10">
           <button onClick={onBack} className="p-4 bg-white/10 rounded-2xl text-white shadow-lg hover:bg-[#ec2027] transition-all active:scale-90 border-2 border-white/10 flex-shrink-0">
             <ChevronLeft size={32} strokeWidth={4} />
           </button>
           <div>
             <h2 className="text-2xl md:text-3xl font-black leading-none tracking-tight uppercase">Hub <span className="text-[#ec2027]">Registration</span></h2>
             <p className="text-xs font-black text-white/40 uppercase tracking-widest mt-2">New Program Activation Portal</p>
           </div>
        </div>
        <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-md relative z-10">
           <Zap size={20} className="text-[#ec2027] fill-[#ec2027]" />
           <span className="font-black text-[10px] uppercase tracking-[0.2em]">License Node: Open</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-6">
        <div className="max-w-4xl mx-auto w-full">
          {/* Form Column */}
          <form onSubmit={handleRegister} className="bg-white rounded-[3rem] border-2 border-slate-50 shadow-2xl overflow-hidden flex flex-col">
             <div className="p-8 border-b-4 border-slate-50 bg-slate-50/50 flex items-center gap-6 shrink-0">
                <div className="p-5 bg-[#3b82f6] rounded-[2rem] text-white shadow-xl rotate-3">
                   <Building2 size={32} strokeWidth={3} />
                </div>
                <div>
                   <h3 className="text-2xl font-black text-[#292667] uppercase tracking-tighter leading-none">Center Information</h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Required for local branch authentication</p>
                </div>
             </div>

             <div className="p-8 md:p-12 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                         <Building2 size={14} className="text-[#3b82f6]" /> Registered Hub Name
                      </label>
                      <input 
                         required
                         type="text" 
                         placeholder="e.g. Mandalay Tech Hub"
                         className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#3b82f6] outline-none font-black text-lg text-[#292667] transition-all shadow-inner"
                         value={formData.hubName}
                         onChange={e => setFormData({...formData, hubName: e.target.value})}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                         <MapPin size={14} className="text-[#ec2027]" /> Division / Location
                      </label>
                      <input 
                         required
                         type="text" 
                         placeholder="e.g. Central Mandalay"
                         className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#3b82f6] outline-none font-black text-lg text-[#292667] transition-all shadow-inner"
                         value={formData.location}
                         onChange={e => setFormData({...formData, location: e.target.value})}
                      />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                         <Mail size={14} className="text-[#3b82f6]" /> Hub Admin Email
                      </label>
                      <input 
                         required
                         type="email" 
                         placeholder="admin@yourhub.com"
                         className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#3b82f6] outline-none font-black text-lg text-[#292667] transition-all shadow-inner"
                         value={formData.adminEmail}
                         onChange={e => setFormData({...formData, adminEmail: e.target.value})}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                         <Users size={14} className="text-[#00a651]" /> Initial Learner Seats
                      </label>
                      <div className="relative">
                         <input 
                            type="number" 
                            min="5"
                            step="5"
                            className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#3b82f6] outline-none font-black text-2xl text-[#292667] transition-all shadow-inner"
                            value={formData.seats}
                            onChange={e => setFormData({...formData, seats: parseInt(e.target.value) || 0})}
                         />
                         <div className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-xs text-slate-300 uppercase tracking-widest pointer-events-none">Slots</div>
                      </div>
                   </div>
                </div>

                <div className="p-8 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex items-center justify-center gap-4 text-slate-400">
                   <ShieldCheck size={24} />
                   <span className="text-xs font-black uppercase tracking-widest">Verify center data before activation</span>
                </div>
             </div>

             <div className="p-8 bg-white border-t-4 border-slate-50 shrink-0">
                <button 
                  type="submit"
                  className="w-full py-6 bg-[#292667] text-white rounded-[2rem] font-black text-xl uppercase tracking-[0.2em] shadow-2xl hover:bg-[#00a651] transition-all border-b-8 border-black/10 active:scale-[0.98] flex items-center justify-center gap-4 group"
                >
                   <Rocket size={32} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> REGISTER HUB & ACTIVATE
                </button>
             </div>
          </form>
        </div>
      </div>
    </div>
  );
};
