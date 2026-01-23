
import React, { useState } from 'react';
import { MOCK_SCHOOLS } from '../../constants.tsx';
import { 
  UserPlus, 
  Search, 
  Trash2, 
  Edit, 
  ChevronDown 
} from 'lucide-react';

interface AccountCreationViewProps {
  checkPermission?: (category: any, action: string) => boolean;
}

export const AccountCreationView: React.FC<AccountCreationViewProps> = ({ checkPermission }) => {
  const [mockStaff, setMockStaff] = useState([
    { id: 's1', name: 'Alice Teacher', role: 'Teacher', branch: 'Downtown Branch', email: 'alice@ubook.com', status: 'Active' },
    { id: 's2', name: 'Bob Admin', role: 'School Admin', branch: 'Westside Academy', email: 'bob@ubook.com', status: 'Active' },
    { id: 's3', name: 'Charlie Editor', role: 'LMS Editor', branch: 'Main Center', email: 'charlie@ubook.com', status: 'Active' },
    { id: 's4', name: 'David Smith', role: 'Student', branch: 'Global Park Center', email: 'david@ubook.com', status: 'Active' },
  ]);

  const canEdit = checkPermission?.('accounts', 'edit') ?? true;
  const canDelete = checkPermission?.('accounts', 'delete') ?? true;

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden animate-in fade-in duration-500">
      {/* Standardized Header - Updated to Blue and Orange */}
      <div className="w-full bg-[#304B9E] rounded-2xl p-5 md:p-6 text-white shadow-xl border-b-8 border-[#F05A28] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-4 relative z-10">
           <div className="p-3.5 bg-[#3b82f6] rounded-xl text-white shadow-lg rotate-3 border-b-4 border-black/10">
             <UserPlus size={28} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-xl md:text-2xl font-black leading-none tracking-tight uppercase">Staff <span className="text-[#F05A28]">Directory</span></h2>
             <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">Global hub account manager</p>
           </div>
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md hidden sm:block">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#F05A28]">{mockStaff.length} ACTIVE USERS</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-xl flex flex-col overflow-hidden">
          {/* Search Bar Area */}
          <div className="p-3 border-b border-slate-100 bg-slate-50/30 flex items-center">
             <div className="flex-1 flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-100 w-full focus-within:border-[#F05A28] transition-all shadow-sm">
               <Search size={18} className="text-slate-300" strokeWidth={3} />
               <input placeholder="Search members by name or email..." className="bg-transparent outline-none w-full font-black text-[#304B9E] text-xs placeholder:text-slate-200 uppercase" />
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-[#304B9E] text-white text-[9px] font-black uppercase tracking-widest z-20">
                <tr>
                  <th className="px-8 py-4">User Account</th>
                  <th className="px-8 py-4">Hub Assignment</th>
                  <th className="px-8 py-4">Role</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {mockStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-4">
                       <div className="flex items-center gap-3">
                         <img src={`https://picsum.photos/seed/${staff.id}/120`} className="w-9 h-9 rounded-lg border border-white shadow-sm object-cover" alt="" />
                         <div>
                           <p className="font-black text-[#304B9E] text-sm uppercase leading-none mb-1">{staff.name}</p>
                           <p className="text-[9px] font-bold text-slate-400 font-mono tracking-widest truncate">{staff.email}</p>
                         </div>
                       </div>
                    </td>
                    <td className="px-8 py-4 text-[10px] font-black text-[#304B9E] uppercase tracking-tight truncate max-w-[180px]">{staff.branch}</td>
                    <td className="px-8 py-4">
                       <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                          staff.role === 'Student' ? 'bg-emerald-50 text-emerald-600 border-emerald-500/10' : 
                          staff.role === 'Teacher' ? 'bg-indigo-50 text-indigo-600 border-indigo-500/10' : 
                          'bg-red-50 text-red-600 border-red-500/10'
                       }`}>
                         {staff.role}
                       </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                       <div className="flex justify-end gap-1">
                         {canEdit && (
                           <button className="p-2 text-slate-300 hover:text-[#304B9E] transition-all"><Edit size={16} strokeWidth={3} /></button>
                         )}
                         {canDelete && (
                           <button className="p-2 text-slate-300 hover:text-[#ec2027] transition-all"><Trash2 size={16} strokeWidth={3} /></button>
                         )}
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
