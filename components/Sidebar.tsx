
import React from 'react';
import { 
  Users, 
  Award, 
  ClipboardCheck, 
  FileSearch,
  BookOpen,
  ShieldCheck,
  UserPlus,
  Building2,
  Zap,
  X,
  LayoutGrid,
  Settings2,
  BarChart3,
  Library
} from 'lucide-react';
import { View, UserRole } from '../types.ts';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  activeRole: UserRole;
  checkPermission: (category: any, action: string) => boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, activeRole, checkPermission, isOpen, onClose }) => {
  const isAdmin = activeRole === UserRole.MAIN_CENTER || activeRole === UserRole.SUPER_ADMIN;

  const getWelcomeMessage = () => {
    switch (activeRole) {
      case UserRole.MAIN_CENTER:
        return "Welcome Main Center Admin";
      case UserRole.SUPER_ADMIN:
        return "Welcome School Admin";
      case UserRole.TEACHER:
        return "Welcome Teacher";
      case UserRole.STUDENT:
        return "Welcome Student";
      default:
        return "Welcome User";
    }
  };

  const adminItems = [
    activeRole === UserRole.SUPER_ADMIN || activeRole === UserRole.SCHOOL_ADMIN
      ? { id: View.CENTER_PROFILE, label: 'Hub Profile', icon: Settings2, category: 'accounts' }
      : { id: View.CENTER_LIST, label: 'School Directory', icon: Building2, category: 'accounts' },
    
    ...(activeRole === UserRole.SUPER_ADMIN || activeRole === UserRole.SCHOOL_ADMIN
      ? [{ id: View.CLASSES, label: 'Classes', icon: LayoutGrid, category: 'accounts' }] 
      : []),

    { 
      id: activeRole === UserRole.MAIN_CENTER ? View.COURSES_ADMIN : View.MY_CLASSES, 
      label: 'Course Lists', 
      icon: Library, 
      category: 'accounts' 
    },
    
    { id: View.REPORTS, label: 'Reports', icon: BarChart3, category: 'reports' },
    { id: View.TESTS, label: 'Exams', icon: Zap, category: 'courses' },
    { id: View.ROLES_PERMISSIONS, label: 'Access', icon: ShieldCheck, category: 'accounts' },
    { id: View.RESOURCES, label: 'Library', icon: FileSearch, category: 'resources' },
    { id: View.EDIT_CERTIFICATES, label: 'Branding', icon: Award, category: 'certificates' },
    { id: View.ACCOUNT_CREATION, label: 'Accounts', icon: UserPlus, category: 'accounts' },
  ].filter(item => {
    return checkPermission(item.category as any, 'view');
  });

  const teacherItems = [
    { id: View.CENTER_PROFILE, label: 'Hub Profile', icon: Settings2, category: 'accounts' },
    { id: View.MY_CLASSES, label: 'Course Lists', icon: BookOpen, category: 'accounts' },
    { id: View.CLASSES, label: 'Classes', icon: LayoutGrid, category: 'accounts' },
    { id: View.STUDENTS, label: 'Roster', icon: Users, category: 'accounts' },
    { id: View.REPORTS, label: 'Reports', icon: BarChart3, category: 'reports' },
    { id: View.TESTS, label: 'Exams', icon: ClipboardCheck, category: 'courses' },
    { id: View.RESOURCES, label: 'Assets', icon: FileSearch, category: 'resources' },
    { id: View.CERTIFICATES, label: 'Awards', icon: Award, category: 'certificates' },
  ].filter(item => checkPermission(item.category as any, 'view'));

  const menuItems = isAdmin ? adminItems : teacherItems;

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[45] lg:hidden" onClick={onClose} />}
      <div className={`fixed lg:static inset-y-0 left-0 w-64 bg-white text-[#304B9E] flex flex-col border-r border-slate-100 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 flex-1 flex flex-col overflow-hidden">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-2">
            {getWelcomeMessage()}
          </p>
          <nav className="space-y-1 overflow-y-auto scrollbar-hide">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive ? 'bg-[#304B9E] text-white font-bold shadow-lg shadow-[#304B9E]/20' : 'text-slate-500 hover:bg-slate-50 hover:text-[#304B9E]'
                  }`}
                >
                  <Icon size={18} strokeWidth={2.5} className={isActive ? 'text-[#F05A28]' : 'text-slate-400'} />
                  <span className="text-[12px] font-bold uppercase tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100">
           <div className="flex items-center gap-3 px-2 py-1">
              <div className="w-8 h-8 rounded-lg bg-[#ec2027] flex items-center justify-center text-white text-[10px] font-bold">U</div>
              <div>
                 <p className="text-[10px] font-bold text-[#304B9E] uppercase leading-none">U Book Store</p>
                 <p className="text-[8px] text-slate-400 mt-0.5">LMS v2.5</p>
              </div>
           </div>
        </div>
      </div>
    </>
  );
};
