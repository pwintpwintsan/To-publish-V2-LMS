
import React, { useState } from 'react';
import { MOCK_STUDENTS, MOCK_CLASSES } from '../../constants.tsx';
import { Student } from '../../types.ts';
import { Search, Filter, Edit, MoreVertical, Trash2, LayoutGrid, Users, Sparkles, ChevronDown, UserPlus, ChevronLeft } from 'lucide-react';

interface StudentsViewProps {
  onStudentClick: (id: string) => void;
  onAddStudent?: () => void;
  onBack?: () => void;
  checkPermission?: (category: any, action: string) => boolean;
}

export const StudentsView: React.FC<StudentsViewProps> = ({ onStudentClick, onAddStudent, onBack, checkPermission }) => {
  const [students] = useState<Student[]>(MOCK_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  const canEdit = checkPermission?.('accounts', 'edit') ?? true;
  const canDelete = checkPermission?.('accounts', 'delete') ?? true;
  const canCreate = checkPermission?.('accounts', 'create') ?? true;

  const filteredStudents = students.filter(s => {
    const matchesSearch = `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.username.includes(searchTerm);
    return matchesSearch;
  });

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in duration-500">
      {/* Standardized Header - Orange and Blue Theme */}
      <div className="w-full bg-[#304B9E] rounded-[2.5rem] p-6 md:p-8 text-white shadow-xl border-b-[10px] border-[#F05A28] flex flex-col md:flex-row items-center justify-between gap-6 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        
        <div className="flex items-center gap-6 relative z-10">
           {onBack && (
             <button onClick={onBack} className="p-3 bg-white/10 rounded-xl text-white shadow-lg hover:bg-[#F05A28] transition-all active:scale-90 border-2 border-white/10 flex items-center gap-2 mr-2">
               <ChevronLeft size={20} strokeWidth={4} />
               <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Back to Library</span>
             </button>
           )}
           <div className="p-4 md:p-5 bg-[#F05A28] rounded-2xl text-white shadow-xl rotate-3 border-b-4 border-black/10">
             <Users size={32} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-2xl md:text-3xl font-black leading-none tracking-tight uppercase">Learner <span className="text-white/60">Directory</span></h2>
             <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-2">Central U Book Store database</p>
           </div>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="flex items-center gap-6 bg-white/5 px-6 py-4 rounded-2xl border border-white/10 backdrop-blur-sm mr-4">
             <div className="text-center">
                <p className="text-3xl font-black text-white leading-none">{students.length}</p>
                <p className="text-[9px] font-black uppercase text-white/40 tracking-widest mt-1">Total</p>
             </div>
             <div className="w-px h-10 bg-white/10"></div>
             <div className="text-center">
                <p className="text-3xl font-black text-[#F05A28] leading-none">{filteredStudents.length}</p>
                <p className="text-[9px] font-black uppercase text-white/40 tracking-widest mt-1">Filtered</p>
             </div>
          </div>
          
          {canCreate && (
            <button 
              onClick={onAddStudent}
              className="px-8 py-4 bg-white text-[#304B9E] rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#F05A28] hover:text-white transition-all border-b-4 border-black/10 flex items-center gap-3 active:scale-95"
            >
              <UserPlus size={20} strokeWidth={3} />
              Add Students
            </button>
          )}
        </div>
      </div>

      {/* Standardized Switch Bar */}
      <div className="w-full bg-white p-3 md:p-4 rounded-[2rem] shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-4 flex-shrink-0">
        <div className="flex-[2] flex items-center gap-4 bg-slate-50 px-6 py-3.5 rounded-2xl border border-slate-100 w-full group focus-within:border-[#F05A28] transition-all">
          <Search size={22} className="text-slate-400 group-focus-within:text-[#304B9E]" strokeWidth={3} />
          <input 
            type="text" 
            placeholder="Search by name or ID code..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-base font-black text-[#304B9E] outline-none w-full placeholder:text-slate-300 uppercase"
          />
        </div>

        <div className="flex-1 min-w-[200px] relative w-full md:w-auto">
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full bg-slate-50 pl-5 pr-10 py-3.5 rounded-2xl border border-slate-100 outline-none font-black text-[10px] text-[#304B9E] uppercase appearance-none cursor-pointer focus:border-[#F05A28] transition-all"
          >
            <option value="all">All Classes</option>
            {MOCK_CLASSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-xl">
        <div className="h-full overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#304B9E] text-white uppercase text-[10px] font-black tracking-widest z-20 shadow-md">
              <tr>
                <th className="px-8 py-6">ID Code</th>
                <th className="px-8 py-6">Full Name</th>
                <th className="px-8 py-6">Course</th>
                <th className="px-8 py-6">Grade</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-5 font-mono text-sm font-black text-[#F05A28] tracking-widest">
                    <button onClick={() => onStudentClick(student.id)} className="hover:underline">
                      {student.username}
                    </button>
                  </td>
                  <td className="px-8 py-5">
                    <button onClick={() => onStudentClick(student.id)} className="flex items-center gap-4 text-left">
                      <img src={`https://picsum.photos/seed/${student.id}/64`} className="w-12 h-12 rounded-xl border-2 border-white shadow-md object-cover" alt="" />
                      <span className="font-black text-[#304B9E] text-sm uppercase tracking-tight">{student.firstName} {student.lastName}</span>
                    </button>
                  </td>
                  <td className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[150px]">{student.level}</td>
                  <td className="px-8 py-5">
                    <div className={`inline-block px-3 py-1 rounded-lg text-xs font-black shadow-sm ${
                      student.finalGrade >= 90 ? 'bg-emerald-500 text-white' : 'bg-[#F05A28] text-white'
                    }`}>
                      {student.finalGrade}%
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-lg text-[8px] font-black tracking-widest border ${
                      student.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-500/10' : 'bg-slate-100 text-slate-400 border-slate-200'
                    }`}>
                      {student.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {canEdit && (
                        <button className="p-2.5 bg-white text-slate-300 hover:text-[#304B9E] rounded-xl shadow-sm border border-slate-100 transition-all active:scale-90">
                          <Edit size={18} strokeWidth={3} />
                        </button>
                      )}
                      {canDelete && (
                        <button className="p-2.5 bg-white text-slate-300 hover:text-[#ec2027] rounded-xl shadow-sm border border-slate-100 transition-all active:scale-90">
                          <Trash2 size={18} strokeWidth={3} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                   <td colSpan={6} className="py-24 text-center opacity-30">
                      <Users size={64} className="mx-auto text-slate-200 mb-4" />
                      <h4 className="text-xl font-black text-[#304B9E] uppercase tracking-widest">No Learners Found</h4>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Footer Summary */}
      <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles size={16} className="text-[#F05A28]" />
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Master Learner Directory v2.4.0</p>
        </div>
        <div className="flex items-center gap-3">
           <p className="text-[9px] font-black text-[#304B9E] uppercase tracking-widest">Verified Nodes: {students.length}</p>
        </div>
      </div>
    </div>
  );
};
