
import React from 'react';
import { Menu, X, ShieldAlert, GraduationCap, ShieldCheck, LogOut, LogIn } from 'lucide-react';
import { UserRole } from '../types.ts';

interface HeaderProps {
  schoolName: string;
  teacherCode: string;
  activeRole: UserRole;
  isLoggedIn: boolean;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onRoleChange: (role: UserRole) => void;
  onLogout: () => void;
  onLogin: () => void;
}

export const LogoMark = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stylized R brand mark based on DIR logo */}
    {/* Pixel bits at top left */}
    <rect x="36" y="25" width="4" height="4" fill="#304B9E" />
    <rect x="42" y="25" width="4" height="4" fill="#F05A28" />
    <rect x="42" y="31" width="4" height="4" fill="#F05A28" />
    
    {/* Orange vertical bar */}
    <rect x="48" y="31" width="10" height="52" fill="#F05A28" />
    
    {/* Blue R loop */}
    <path d="M58 31H76C84 31 88 38 88 45C88 52 84 59 76 59H58V31Z" fill="#304B9E" />
    
    {/* Blue R leg */}
    <path d="M58 59H68L84 83H74L58 64V59Z" fill="#304B9E" />
    
    {/* Intersection waves */}
    <path d="M35 65C45 55 55 65 65 70C75 75 85 65 85 65L85 70C75 80 65 75 55 70C45 65 35 75 35 75Z" fill="#304B9E" />
    <path d="M35 68C45 58 55 68 65 73C75 78 85 68 85 68L85 71C75 81 65 76 55 71C45 66 35 76 35 76Z" fill="#F05A28" />
  </svg>
);

const Logo = () => (
  <div className="flex items-center gap-3 py-1 select-none group">
    <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
      <LogoMark className="w-8 h-8" />
    </div>
    <div className="flex flex-col min-w-0">
      <span className="text-[10px] font-bold text-[#304B9E] leading-none tracking-tight uppercase">Digital Information</span>
      <span className="text-[10px] font-bold text-[#304B9E] leading-none tracking-tight uppercase">Resources</span>
      <span className="text-[7px] font-medium text-[#F05A28] uppercase tracking-widest leading-none mt-0.5">LEARNING HUB</span>
    </div>
  </div>
);

export const Header: React.FC<HeaderProps> = ({ schoolName, teacherCode, activeRole, isLoggedIn, isSidebarOpen, onToggleSidebar, onRoleChange, onLogout, onLogin }) => {
  const roles = [
    { id: UserRole.MAIN_CENTER, label: 'Main Center Admin', icon: ShieldAlert, color: 'text-[#ec2027]' },
    { id: UserRole.SUPER_ADMIN, label: 'School Admin', icon: ShieldCheck, color: 'text-[#3b82f6]' },
    { id: UserRole.TEACHER, label: 'Teacher', icon: GraduationCap, color: 'text-[#304B9E]' },
  ];

  return (
    <header className="sticky top-0 z-[60] w-full bg-white border-b border-slate-100 flex items-center shrink-0 h-16">
      <div className="max-w-[1600px] mx-auto px-6 w-full flex justify-between items-center">
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <button 
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-50 active:scale-95 transition-all"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
          <Logo />
        </div>

        {isLoggedIn ? (
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100/50">
              {roles.map((role) => {
                const Icon = role.icon;
                const isActive = activeRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => onRoleChange(role.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                      isActive 
                        ? 'bg-white shadow-sm text-[#304B9E]' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Icon size={14} strokeWidth={2.5} />
                    <span className="text-[10px] font-bold uppercase tracking-tight">
                      {role.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
              <div className="hidden lg:block text-right">
                <p className="text-[10px] font-bold text-[#304B9E] uppercase leading-none">{schoolName}</p>
                <p className="text-[9px] text-slate-400 font-medium mt-1 uppercase tracking-tighter">{teacherCode}</p>
              </div>
              
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                <img src={`https://picsum.photos/seed/u-profile/64`} className="w-full h-full object-cover" alt="" />
              </div>

              <button 
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={onLogin}
            className="flex items-center gap-2 px-6 py-2 bg-[#304B9E] text-white rounded-lg font-bold text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-md"
          >
            <LogIn size={14} /> Sign In
          </button>
        )}
      </div>
    </header>
  );
};
