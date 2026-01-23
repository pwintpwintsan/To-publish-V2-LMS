
import React, { useState } from 'react';
import { MOCK_SCHOOLS } from '../../constants.tsx';
import { UserRole } from '../../types.ts';
import { 
  ShieldCheck, 
  Building2, 
  ChevronDown, 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  Plus,
  Lock,
  Eye,
  Edit3,
  FileCheck,
  BarChart3,
  UserPlus,
  LayoutGrid,
  Zap,
  Palette,
  ClipboardList
} from 'lucide-react';

interface RolesPermissionsViewProps {
  activeRole: UserRole;
  onRegisterBranch: () => void;
}

type PermissionStatus = 'yes' | 'no' | string;

interface PermissionRow {
  feature: string;
  mainCenterAdmin: PermissionStatus;
  schoolAdmin: PermissionStatus;
  teacher: PermissionStatus;
  student: PermissionStatus;
  icon: any;
}

export const RolesPermissionsView: React.FC<RolesPermissionsViewProps> = ({ activeRole, onRegisterBranch }) => {
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>(MOCK_SCHOOLS[0].id);
  const selectedSchool = MOCK_SCHOOLS.find(s => s.id === selectedSchoolId) || MOCK_SCHOOLS[0];

  const isMainAdmin = activeRole === UserRole.MAIN_CENTER;

  const permissionRows: PermissionRow[] = [
    { feature: 'View courses', mainCenterAdmin: 'All courses', schoolAdmin: 'Purchased only', teacher: 'Assigned only', student: 'Enrolled only', icon: Eye },
    { feature: 'Edit courses', mainCenterAdmin: '✅ Full', schoolAdmin: 'no', teacher: '✅ Content only', student: 'no', icon: Edit3 },
    { feature: 'Edit modules / tasks', mainCenterAdmin: 'yes', schoolAdmin: 'no', teacher: 'no', student: 'no', icon: LayoutGrid },
    { feature: 'Default exam (per module)', mainCenterAdmin: '✅ On / Off', schoolAdmin: 'no', teacher: 'no', student: 'no', icon: FileCheck },
    { feature: 'Final exam edit', mainCenterAdmin: 'no', schoolAdmin: 'yes', teacher: 'yes', student: 'no', icon: Zap },
    { feature: 'View reports', mainCenterAdmin: '✅ Full', schoolAdmin: 'yes', teacher: 'yes', student: 'no', icon: BarChart3 },
    { feature: 'View marks / progress', mainCenterAdmin: 'yes', schoolAdmin: 'yes', teacher: 'yes', student: '✅ Marks only', icon: ShieldCheck },
    { feature: 'Upload banners / design', mainCenterAdmin: 'yes', schoolAdmin: 'no', teacher: 'no', student: 'no', icon: Palette },
    { feature: 'Register teachers / students', mainCenterAdmin: 'yes', schoolAdmin: 'yes', teacher: 'no', student: 'no', icon: UserPlus },
    { feature: 'Edit names & roles', mainCenterAdmin: 'no', schoolAdmin: 'yes', teacher: 'no', student: 'no', icon: Users },
    { feature: 'Create & name classes', mainCenterAdmin: 'no', schoolAdmin: '✅ (popup)', teacher: 'no', student: 'no', icon: LayoutGrid },
    { feature: 'Assign course to class', mainCenterAdmin: 'no', schoolAdmin: 'yes', teacher: 'no', student: 'no', icon: ClipboardList },
  ];

  const renderStatus = (status: PermissionStatus) => {
    if (status === 'yes') return <div className="flex items-center justify-center text-emerald-500 bg-emerald-50 w-8 h-8 rounded-lg mx-auto shadow-sm"><CheckCircle2 size={18} strokeWidth={3} /></div>;
    if (status === 'no') return <div className="flex items-center justify-center text-rose-500 bg-rose-50 w-8 h-8 rounded-lg mx-auto shadow-sm"><XCircle size={18} strokeWidth={3} /></div>;
    
    if (status.includes('✅')) {
        return (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100 font-black text-[9px] uppercase tracking-tight">
                {status}
            </div>
        );
    }
    if (status.includes('❌')) {
      return (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 text-rose-700 rounded-md border border-rose-100 font-black text-[9px] uppercase tracking-tight">
              {status}
          </div>
      );
  }
    
    return (
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-[#3b82f6] rounded-md border border-indigo-100 font-black text-[9px] uppercase tracking-tight">
            {status}
        </div>
    );
  };

  return (
    <div className="h-full flex flex-col gap-3 overflow-hidden animate-in fade-in duration-500">
      {/* Compact Header */}
      <div className="w-full bg-[#292667] rounded-xl p-4 md:p-5 text-white shadow-xl border-b-6 border-[#3b82f6] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="flex items-center gap-3 relative z-10">
           <div className="p-2.5 bg-[#3b82f6] rounded-lg text-white shadow-lg rotate-3">
             <ShieldCheck size={22} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-lg md:text-xl font-black leading-none tracking-tight uppercase">Access <span className="text-[#ec2027]">Control</span></h2>
             <p className="text-[8px] font-black uppercase tracking-widest text-white/40 mt-1">Permission matrix</p>
           </div>
        </div>
        {isMainAdmin && (
          <button 
            onClick={onRegisterBranch}
            className="flex items-center gap-2 px-4 py-2 bg-[#ec2027] text-white rounded-lg font-black uppercase tracking-widest text-[9px] shadow-lg hover:scale-105 active:scale-95 transition-all relative z-10 border-b-4 border-black/10"
          >
             <Plus size={14} strokeWidth={4} /> Register Hub
          </button>
        )}
      </div>

      {/* Compact Hub Selection Control */}
      <div className="w-full bg-white p-2.5 rounded-2xl shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-2.5 flex-shrink-0">
        <div className="flex flex-1 items-center gap-3 w-full">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3b82f6]">
              <Building2 size={18} strokeWidth={3} />
            </div>
            <select 
              value={selectedSchoolId}
              onChange={(e) => setSelectedSchoolId(e.target.value)}
              className="w-full bg-slate-50 pl-10 pr-8 py-2.5 rounded-xl border border-slate-100 focus:border-[#3b82f6] outline-none font-black text-[#292667] text-[10px] uppercase appearance-none transition-all cursor-pointer hover:bg-slate-100"
            >
              {MOCK_SCHOOLS.map(s => <option key={s.id} value={s.id}>{s.name} - {s.location}</option>)}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
               <ChevronDown size={14} strokeWidth={3} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 border-l-2 border-slate-100">
           <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                <Users size={12} className="text-[#ec2027]" />
                <span className="text-[10px] font-black text-[#292667]">{selectedSchool.currentTeacherCount}/{selectedSchool.teacherQuota}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                <GraduationCap size={12} className="text-[#3b82f6]" />
                <span className="text-[10px] font-black text-[#292667]">{selectedSchool.currentStudentCount}/{selectedSchool.studentQuota}</span>
              </div>
           </div>
        </div>
      </div>

      {/* Permissions Table */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-xl flex flex-col overflow-hidden mb-2">
        <div className="flex-1 overflow-auto scrollbar-hide">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-20 shadow-sm">
              <tr className="bg-[#292667] text-white">
                <th className="px-6 py-4 text-left text-[9px] font-black uppercase tracking-widest border-r border-white/5 min-w-[180px]">Permission Feature</th>
                {isMainAdmin && (
                  <th className="px-3 py-4 text-center text-[9px] font-black uppercase tracking-widest min-w-[120px] bg-[#ec2027]/20 text-[#ec2027]">Main Admin</th>
                )}
                <th className="px-3 py-4 text-center text-[9px] font-black uppercase tracking-widest min-w-[120px] bg-white/5">School Admin</th>
                <th className="px-3 py-4 text-center text-[9px] font-black uppercase tracking-widest min-w-[120px]">Teacher</th>
                <th className="px-3 py-4 text-center text-[9px] font-black uppercase tracking-widest min-w-[120px]">Student</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {permissionRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-6 py-3 border-r border-slate-50">
                     <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-slate-100 text-slate-400 rounded-lg group-hover:bg-[#292667] group-hover:text-[#ec2027] transition-all">
                           <row.icon size={14} strokeWidth={3} />
                        </div>
                        <span className="text-xs font-black text-[#292667] uppercase tracking-tight">{row.feature}</span>
                     </div>
                  </td>
                  {isMainAdmin && (
                    <td className="px-3 py-3 text-center bg-[#ec2027]/5 font-black border-r border-slate-50">
                       {renderStatus(row.mainCenterAdmin)}
                    </td>
                  )}
                  <td className="px-3 py-3 text-center font-black border-r border-slate-50">
                     {renderStatus(row.schoolAdmin)}
                  </td>
                  <td className="px-3 py-3 text-center font-black border-r border-slate-50">
                     {renderStatus(row.teacher)}
                  </td>
                  <td className="px-3 py-3 text-center font-black">
                     {renderStatus(row.student)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
           <div className="flex items-center gap-3">
              <Lock size={14} className="text-slate-300" />
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Matrix ID: DIR-SYS-2025</p>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-[#00a651] animate-pulse"></div>
             <p className="text-[9px] font-black text-[#292667] uppercase tracking-widest">
                System Node <span className="text-[#3b82f6]">ACTIVE</span>
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};
