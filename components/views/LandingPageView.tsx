
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  User, 
  Lock, 
  LogIn, 
  Key, 
  CheckCircle2, 
  X, 
  ShieldAlert, 
  Scale, 
  Check, 
  FileText,
  Building2,
  GraduationCap,
  ChevronDown,
  Eye,
  EyeOff,
  Briefcase,
  School
} from 'lucide-react';
import { LogoMark } from '../Header.tsx';
import { UserRole } from '../../types.ts';

interface LandingPageViewProps {
  onOrderCreate: (order: any) => void;
  onLogin?: (role: UserRole) => void;
  onCourseClick?: (id: string) => void;
}

const Logo = ({ className = "", size = 60 }: { className?: string, size?: number }) => (
  <div className={`flex flex-col items-center gap-1 select-none ${className}`}>
    <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border-4 border-slate-50 mb-2">
      <LogoMark className="w-20 h-20" />
    </div>
    <div className="flex flex-col items-center text-center">
      <span className="text-xl font-black text-[#304B9E] leading-tight tracking-tighter uppercase" style={{ fontSize: size * 0.25 }}>Digital Information Resources</span>
      <span className="text-[7px] font-black text-[#F05A28] uppercase tracking-[0.3em] leading-none mt-1" style={{ fontSize: size * 0.1 }}>Learning Hub</span>
    </div>
  </div>
);

/**
 * Activation Modal for Teachers and School Admins
 */
const ActivationModal = ({ onClose, onConfirm, roleName }: { onClose: () => void, onConfirm: () => void, roleName: string }) => {
  // These would typically come from the server after the initial credential check
  const [identity] = useState({ 
    school: 'EDULIGHT SCHOOL', 
    firstName: 'JANE', 
    lastName: 'SMITH' 
  });
  const [confirmed, setConfirmed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const isValid = confirmed && privacyAgreed;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 bg-[#304B9E]/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] w-full max-w-xl shadow-2xl border-t-[12px] border-[#F05A28] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 relative max-h-[95vh]">
        
        <div className="p-8 border-b border-slate-100 bg-slate-50/50 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <UserCheckIcon size={120} />
          </div>
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-[#304B9E] text-white rounded-2xl shadow-xl rotate-3">
                <ShieldCheck size={28} strokeWidth={3} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">School registration</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{roleName} Identity Verification</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2.5 bg-white text-slate-300 hover:text-[#ec2027] transition-all rounded-xl shadow-sm border border-slate-100 active:scale-90">
              <X size={20} strokeWidth={4} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-10 scrollbar-hide space-y-6">
          <div className="grid grid-cols-1 gap-4">
             <div className="space-y-1.5">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Official School Name</label>
                <div className="relative">
                   <School className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                   <input 
                      type="text" 
                      readOnly
                      className="w-full bg-slate-100/50 pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-100 font-black text-[#304B9E] text-xs uppercase cursor-default outline-none"
                      value={identity.school}
                   />
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                    <input 
                      type="text" 
                      readOnly
                      className="w-full bg-slate-100/50 px-4 py-3.5 rounded-2xl border-2 border-slate-100 font-black text-[#304B9E] text-xs uppercase cursor-default outline-none"
                      value={identity.firstName}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                    <input 
                      type="text" 
                      readOnly
                      className="w-full bg-slate-100/50 px-4 py-3.5 rounded-2xl border-2 border-slate-100 font-black text-[#304B9E] text-xs uppercase cursor-default outline-none"
                      value={identity.lastName}
                    />
                </div>
             </div>
          </div>

          <div className="space-y-3">
             <label className="group flex items-start gap-4 p-5 bg-blue-50/50 rounded-2xl border-2 border-indigo-100 cursor-pointer hover:border-[#304B9E]/30 transition-all">
                <div className="relative flex items-center justify-center mt-1">
                    <input 
                      type="checkbox" 
                      className="peer appearance-none w-6 h-6 rounded-lg border-2 border-indigo-200 checked:bg-[#00a651] checked:border-[#00a651] transition-all cursor-pointer"
                      checked={confirmed}
                      onChange={(e) => setConfirmed(e.target.checked)}
                    />
                    <Check className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" size={14} strokeWidth={4} />
                </div>
                <p className="text-[10px] font-bold text-slate-700 leading-relaxed uppercase tracking-tight">
                  I confirm that my school and name are correct and I am ready to start working.
                </p>
             </label>

             <label className="group flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border-2 border-slate-100 cursor-pointer hover:border-slate-200 transition-all">
                <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="peer appearance-none w-6 h-6 rounded-lg border-2 border-slate-200 checked:bg-[#304B9E] checked:border-[#304B9E] transition-all cursor-pointer"
                      checked={privacyAgreed}
                      onChange={(e) => setPrivacyAgreed(e.target.checked)}
                    />
                    <Check className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" size={14} strokeWidth={4} />
                </div>
                <div className="flex-1">
                    <p className="text-[10px] font-black text-[#304B9E] uppercase tracking-wide">I agree to the Terms & Privacy Policy</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">Secure Data Protection Protocol Enabled</p>
                </div>
             </label>
          </div>
        </div>

        <div className="p-8 border-t border-slate-100 bg-white shrink-0 flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95"
          >
            Back
          </button>
          <button 
            onClick={onConfirm}
            disabled={!isValid}
            className={`flex-[2] py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all border-b-4 border-black/10 active:scale-95 flex items-center justify-center gap-3 ${
              isValid 
                ? 'bg-[#00a651] text-white hover:bg-[#304B9E]' 
                : 'bg-slate-100 text-slate-300 cursor-not-allowed grayscale'
            }`}
          >
            <CheckCircle2 size={18} /> Activate
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Standard Privacy Modal for Main Center
 */
const PrivacyModal = ({ onClose, onConfirm }: { onClose: () => void, onConfirm: () => void }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 bg-[#304B9E]/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] w-full shadow-2xl border-t-[12px] border-[#F05A28] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 relative max-w-xl">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50 shrink-0 relative overflow-hidden">
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-[#304B9E] text-white rounded-2xl shadow-xl rotate-3">
                <ShieldCheck size={28} strokeWidth={3} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Security Consent</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Main Hub Authorization</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2.5 bg-white text-slate-300 hover:text-[#ec2027] transition-all rounded-xl shadow-sm border border-slate-100 active:scale-90">
              <X size={20} strokeWidth={4} />
            </button>
          </div>
        </div>
        <div className="p-10 space-y-8">
           <div className="p-6 bg-blue-50/50 rounded-2xl border border-indigo-100 flex items-start gap-4">
              <Scale className="text-[#304B9E] shrink-0" size={20} />
              <p className="text-xs font-bold text-slate-700 leading-relaxed uppercase tracking-tight">
                Access to the Global Hub is restricted to authorized DIR personnel and partners. All activities within this session are logged and protected by Binary Logic security protocols.
              </p>
           </div>
           <label className="group flex items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border-2 border-slate-100 cursor-pointer hover:border-[#304B9E]/20 transition-all">
                <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="peer appearance-none w-8 h-8 rounded-xl border-2 border-slate-200 checked:bg-[#00a651] checked:border-[#00a651] transition-all cursor-pointer"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <Check className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" size={20} strokeWidth={4} />
                </div>
                <div className="flex-1">
                    <p className="text-[11px] font-black text-[#304B9E] uppercase tracking-wide group-hover:text-slate-900 transition-colors">I accept the DIR Terms & Privacy Policy</p>
                </div>
           </label>
        </div>
        <div className="p-8 border-t border-slate-100 bg-white flex flex-col sm:flex-row gap-4">
           <button onClick={onClose} className="flex-1 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Back</button>
           <button 
             onClick={onConfirm}
             disabled={!agreed}
             className={`flex-[2] py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all border-b-4 border-black/10 ${agreed ? 'bg-[#304B9E] text-white' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
           >
              Get started
           </button>
        </div>
      </div>
    </div>
  );
};

const UserCheckIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>
  </svg>
);

export const LandingPageView: React.FC<LandingPageViewProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.TEACHER);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [credentials, setCredentials] = useState({ user: '', pass: '' });

  const roles = [
    { id: UserRole.MAIN_CENTER, title: 'Main Center', icon: ShieldAlert, color: 'text-red-500' },
    { id: UserRole.SUPER_ADMIN, title: 'School Admin', icon: Building2, color: 'text-blue-500' },
    { id: UserRole.TEACHER, title: 'Teacher', icon: GraduationCap, color: 'text-indigo-500' }
  ];

  const handleInitialProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.user || !credentials.pass) return;
    setShowAuthModal(true);
  };

  const handleFinalConfirm = () => {
    setShowAuthModal(false);
    if (onLogin) onLogin(selectedRole);
  };

  // Helper to safely render the icon for the selected role
  const renderRoleIcon = () => {
    const role = roles.find(r => r.id === selectedRole);
    if (!role) return null;
    const Icon = role.icon;
    return <Icon size={16} strokeWidth={3} />;
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-white overflow-hidden relative">
      
      {/* Dynamic Modal Logic */}
      {showAuthModal && (
        selectedRole === UserRole.MAIN_CENTER ? (
          <PrivacyModal onClose={() => setShowAuthModal(false)} onConfirm={handleFinalConfirm} />
        ) : (
          <ActivationModal 
            roleName={roles.find(r => r.id === selectedRole)?.title || 'User'} 
            onClose={() => setShowAuthModal(false)} 
            onConfirm={handleFinalConfirm} 
          />
        )
      )}

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#F05A28]/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#304B9E]/5 blur-[120px] rounded-full"></div>

      {/* Main Container */}
      <div className="w-full max-w-sm flex flex-col items-center z-10 px-6 animate-in fade-in zoom-in-95 duration-700">
        <Logo size={90} className="mb-12" />
        
        {/* Consolidated HUB Login Card */}
        <div className="w-full bg-white rounded-[3rem] p-8 md:p-10 shadow-[0_30px_80px_-15px_rgba(48,75,158,0.15)] border-[6px] border-[#304B9E] relative overflow-hidden group">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-[#304B9E] rounded-2xl text-white shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
              <ShieldCheck size={24} strokeWidth={3} />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#304B9E] uppercase tracking-tighter leading-none">Hub Login</h3>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Secure Gateway v2.8</p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleInitialProceed}>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Role</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  {renderRoleIcon()}
                </div>
                <select 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="w-full bg-slate-50 pl-11 pr-10 py-3.5 rounded-2xl border-2 border-slate-50 focus:border-[#F05A28] focus:bg-white outline-none font-black text-[#304B9E] transition-all text-xs uppercase appearance-none cursor-pointer"
                >
                  {roles.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">ID Code / Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input 
                  required 
                  type="text" 
                  placeholder="USERNAME" 
                  className="w-full bg-slate-50 pl-11 pr-4 py-3.5 rounded-2xl border-2 border-slate-50 focus:border-[#F05A28] focus:bg-white outline-none font-black text-[#304B9E] transition-all text-xs uppercase"
                  value={credentials.user}
                  onChange={(e) => setCredentials({...credentials, user: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input 
                  required 
                  type={showPass ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full bg-slate-50 pl-11 pr-12 py-3.5 rounded-2xl border-2 border-slate-50 focus:border-[#F05A28] focus:bg-white outline-none font-black text-[#304B9E] transition-all text-xs" 
                  value={credentials.pass}
                  onChange={(e) => setCredentials({...credentials, pass: e.target.value})}
                />
                <button 
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#304B9E] transition-colors"
                >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
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
      <div className="absolute bottom-8 left-8 flex items-center gap-3 animate-in slide-in-from-left-4 duration-1000 hidden sm:flex">
        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl shadow-sm flex items-center gap-3 px-4 group hover:bg-white hover:border-[#F05A28] transition-all cursor-default">
          <Key size={14} className="text-[#F05A28]" strokeWidth={3} />
          <div className="flex flex-col">
            <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none mb-0.5">Access Node Status</span>
            <span className="text-[10px] font-black text-[#304B9E] uppercase tracking-widest">DIR-LIVE-2025</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex items-center gap-2 opacity-30 hover:opacity-100 transition-opacity duration-500 animate-in slide-in-from-right-4 duration-1000 hidden sm:flex">
         <Logo size={50} />
      </div>
    </div>
  );
};
