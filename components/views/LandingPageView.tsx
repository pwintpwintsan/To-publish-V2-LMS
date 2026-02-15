
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  User, 
  Lock, 
  LogIn, 
  X, 
  Check, 
  ChevronDown, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldAlert,
  Fingerprint,
  Users,
  GraduationCap,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { LogoMark } from '../Header.tsx';
import { UserRole } from '../../types.ts';

interface LandingPageViewProps {
  onOrderCreate: (order: any) => void;
  onLogin?: (role: UserRole) => void;
  onCourseClick?: (id: string) => void;
}

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-col items-center gap-3 select-none ${className}`}>
    <div className="bg-white p-4 rounded-3xl shadow-2xl border-2 border-slate-50 shrink-0 rotate-3">
      <LogoMark className="w-16 h-16" />
    </div>
    <div className="flex flex-col items-center text-center">
      <span className="text-2xl font-black text-[#304B9E] leading-tight tracking-tighter uppercase">U Book Store</span>
      <span className="text-[10px] font-black text-[#F05A28] uppercase tracking-[0.4em] leading-none mt-1">Digital Information Hub</span>
    </div>
  </div>
);

/**
 * Activation Modal for Teachers and School Admins
 */
const ActivationModal = ({ onClose, onConfirm, roleName }: { onClose: () => void, onConfirm: () => void, roleName: string }) => {
  const [identity] = useState({ 
    school: 'EDULIGHT SCHOOL', 
    firstName: 'JANE', 
    lastName: 'SMITH' 
  });
  const [confirmed, setConfirmed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const isValid = confirmed && privacyAgreed;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-6 bg-[#304B9E]/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[3.5rem] w-full max-w-xl shadow-2xl border-t-[15px] border-[#F05A28] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 relative max-h-[95vh]">
        <div className="p-10 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-6">
              <div className="p-5 bg-[#304B9E] text-white rounded-3xl shadow-2xl rotate-3 border-b-4 border-black/10">
                <ShieldCheck size={32} strokeWidth={3} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Identity Check</h2>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-2">{roleName} Portal Verification</p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 bg-white text-slate-300 hover:text-[#ec2027] transition-all rounded-2xl shadow-md border border-slate-100 active:scale-90">
              <X size={24} strokeWidth={4} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10 scrollbar-hide space-y-8">
          <div className="grid grid-cols-1 gap-6">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assigned Institution</label>
                <input readOnly className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-2 border-slate-100 font-black text-[#304B9E] text-sm uppercase shadow-inner" value={identity.school} />
             </div>
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                   <input readOnly className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-2 border-slate-100 font-black text-[#304B9E] text-sm uppercase shadow-inner" value={identity.firstName} />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                   <input readOnly className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-2 border-slate-100 font-black text-[#304B9E] text-sm uppercase shadow-inner" value={identity.lastName} />
                </div>
             </div>
          </div>

          <div className="space-y-4">
             <label className="group flex items-start gap-5 p-6 bg-blue-50/50 rounded-3xl border-2 border-indigo-100 cursor-pointer hover:bg-indigo-50 transition-all">
                <input type="checkbox" className="mt-1 w-6 h-6 rounded-lg border-2 border-indigo-200 accent-[#00a651] cursor-pointer" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
                <p className="text-[11px] font-bold text-slate-700 leading-relaxed uppercase tracking-tight">I confirm my identity and institution are correctly assigned.</p>
             </label>
             <label className="group flex items-start gap-5 p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 cursor-pointer hover:bg-slate-100 transition-all">
                <input type="checkbox" className="mt-1 w-6 h-6 rounded-lg border-2 border-slate-200 accent-[#304B9E] cursor-pointer" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)} />
                <p className="text-[11px] font-bold text-slate-700 leading-relaxed uppercase tracking-tight">I agree to the Digital Information Hub Data Usage Protocol.</p>
             </label>
          </div>
        </div>

        <div className="p-10 border-t border-slate-100 bg-white shrink-0 flex gap-6">
          <button onClick={onClose} className="flex-1 py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 active:scale-95 transition-all">Back</button>
          <button onClick={onConfirm} disabled={!isValid} className={`flex-[2] py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all border-b-6 border-black/10 active:scale-95 ${isValid ? 'bg-[#00a651] text-white hover:bg-[#304B9E]' : 'bg-slate-100 text-slate-300'}`}>Authorize Hub</button>
        </div>
      </div>
    </div>
  );
};

export const LandingPageView: React.FC<LandingPageViewProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.TEACHER);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [credentials, setCredentials] = useState({ user: '', pass: '' });

  const handleInitialProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.user || !credentials.pass) return;
    if (selectedRole === UserRole.STUDENT) {
      if (onLogin) onLogin(selectedRole);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleFinalConfirm = () => {
    setShowAuthModal(false);
    if (onLogin) onLogin(selectedRole);
  };

  return (
    <div className="min-h-full w-full bg-slate-50 flex flex-col items-center justify-start py-12 md:py-20 px-6 relative overflow-y-auto scrollbar-hide font-sans">
      
      {showAuthModal && (
        <ActivationModal 
          roleName={selectedRole === UserRole.TEACHER ? 'Teacher' : 'Administrator'} 
          onClose={() => setShowAuthModal(false)} 
          onConfirm={handleFinalConfirm} 
        />
      )}

      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#304B9E]/5 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#F05A28]/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Logo Area */}
      <div className="relative z-10 mb-12">
        <Logo />
      </div>

      {/* Centered Login Card */}
      <div className="w-full max-w-md bg-white rounded-[3.5rem] shadow-[0_32px_64px_-12px_rgba(48,75,158,0.12)] border-2 border-slate-50 p-8 md:p-12 relative z-10 animate-in zoom-in-95 duration-500">
         <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#F05A28] rounded-2xl shadow-2xl flex items-center justify-center rotate-6 border-b-6 border-black/10 group transition-transform hover:rotate-0">
            <Lock size={28} strokeWidth={3} className="text-white" />
         </div>

         <div className="text-center mb-10 pt-4">
            <h2 className="text-3xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Console Entry</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-3">Authenticated Hub Access</p>
         </div>

         <form onSubmit={handleInitialProceed} className="space-y-6">
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <ShieldAlert size={14} className="text-[#3b82f6]" /> Select Identity Role
               </label>
               <div className="relative">
                  <select 
                     value={selectedRole}
                     onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                     className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-[#304B9E] outline-none focus:border-[#F05A28] transition-all text-xs uppercase appearance-none cursor-pointer shadow-sm hover:bg-slate-100"
                  >
                     <option value={UserRole.MAIN_CENTER}>Central Admin Hub</option>
                     <option value={UserRole.SUPER_ADMIN}>Institutional Lead</option>
                     <option value={UserRole.TEACHER}>Educator Portal</option>
                     <option value={UserRole.STUDENT}>Learner Account</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#F05A28] pointer-events-none" size={20} strokeWidth={3} />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Username / ID Code</label>
               <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#304B9E] transition-colors">
                     <Fingerprint size={20} />
                  </div>
                  <input 
                     required
                     className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-14 pr-4 py-4 font-black text-[#304B9E] outline-none focus:border-[#F05A28] transition-all text-sm uppercase shadow-sm placeholder:text-slate-200"
                     placeholder="NODE IDENTIFIER"
                     value={credentials.user}
                     onChange={(e) => setCredentials({...credentials, user: e.target.value})}
                  />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Key</label>
               <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#304B9E] transition-colors">
                     <Lock size={20} />
                  </div>
                  <input 
                     required
                     type={showPass ? "text" : "password"}
                     className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-14 pr-14 py-4 font-black text-[#304B9E] outline-none focus:border-[#F05A28] transition-all text-sm shadow-sm placeholder:text-slate-200"
                     placeholder="••••••••"
                     value={credentials.pass}
                     onChange={(e) => setCredentials({...credentials, pass: e.target.value})}
                  />
                  <button 
                     type="button"
                     onClick={() => setShowPass(!showPass)}
                     className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#304B9E] transition-colors"
                  >
                     {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
               </div>
            </div>

            <div className="pt-4">
               <button 
                  type="submit" 
                  className="w-full py-5 bg-[#304B9E] text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] shadow-[0_20px_40px_-10px_rgba(48,75,158,0.4)] hover:bg-[#F05A28] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 border-b-8 border-black/10 group"
               >
                  Authorize Entry <LogIn size={20} strokeWidth={4} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
         </form>

         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 mt-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Network Secured</span>
            </div>
            <button className="text-[10px] font-black text-[#304B9E] uppercase tracking-widest hover:text-[#F05A28] transition-colors underline underline-offset-4">Forgot Access Code?</button>
         </div>
      </div>

      {/* Demo Accounts Table Section */}
      <div className="w-full max-w-4xl mt-20 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
         <div className="flex items-center gap-3 mb-6 px-4">
            <div className="p-2.5 bg-white rounded-xl shadow-lg border border-slate-50 text-[#F05A28]">
               <BookOpen size={20} strokeWidth={3} />
            </div>
            <div>
               <h3 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Hub Registry</h3>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Available Demo Node Access</p>
            </div>
         </div>

         <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead className="bg-[#304B9E] text-white text-[10px] font-black uppercase tracking-widest">
                     <tr>
                        <th className="px-8 py-5">Role Identity</th>
                        <th className="px-8 py-5">Node ID</th>
                        <th className="px-8 py-5">Access Level</th>
                        <th className="px-8 py-5 text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {[
                        { role: 'Central Admin Hub', id: 'HQ-1001', level: 'Global Control', color: 'text-[#ec2027]' },
                        { role: 'Educator Portal', id: 'T4421', level: 'Classroom Management', color: 'text-[#3b82f6]' },
                        { role: 'Learner Account', id: '4001', level: 'Curriculum Path', color: 'text-[#00a651]' }
                     ].map((node, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-all group">
                           <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                 <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${node.color} shadow-inner`}>
                                    {idx === 0 ? <ShieldAlert size={18} strokeWidth={3} /> : idx === 1 ? <GraduationCap size={18} strokeWidth={3} /> : <Users size={18} strokeWidth={3} />}
                                 </div>
                                 <span className="font-black text-[#304B9E] text-[11px] uppercase tracking-tight">{node.role}</span>
                              </div>
                           </td>
                           <td className="px-8 py-5">
                              <span className="font-mono text-[11px] font-black text-slate-400 tracking-widest">{node.id}</span>
                           </td>
                           <td className="px-8 py-5">
                              <span className="px-3 py-1 bg-slate-50 text-slate-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-100">
                                 {node.level}
                              </span>
                           </td>
                           <td className="px-8 py-5 text-right">
                              <button 
                                 onClick={() => { setCredentials({ user: node.id, pass: 'demo' }); setSelectedRole(idx === 0 ? UserRole.MAIN_CENTER : idx === 1 ? UserRole.TEACHER : UserRole.STUDENT); }}
                                 className="px-6 py-2.5 bg-slate-50 text-[#304B9E] rounded-xl font-black text-[9px] uppercase tracking-widest border border-slate-100 hover:bg-[#304B9E] hover:text-white transition-all shadow-sm active:scale-95"
                              >
                                 Preload
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
               <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Registry Version 4.2.8 • Global Sync Active</span>
            </div>
         </div>
      </div>

      {/* Floating Status Badge */}
      <div className="fixed bottom-8 right-8 z-50 hidden lg:flex flex-col items-end gap-3 group">
         <div className="bg-[#304B9E] text-white px-5 py-2 rounded-2xl shadow-xl font-black text-[9px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 border-b-4 border-black/10">
            System Identity: Burma.Core.01
         </div>
         <div className="w-14 h-14 bg-white rounded-2xl shadow-2xl flex items-center justify-center border-2 border-slate-50 group-hover:scale-110 transition-transform">
            <LogoMark className="w-8 h-8" />
         </div>
      </div>
    </div>
  );
};

const ShieldAlert = ({ size, className, strokeWidth = 2 }: { size: number, className?: string, strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
