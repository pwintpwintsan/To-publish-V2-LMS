
import React, { useState } from 'react';
import { MOCK_STUDENTS, MOCK_CLASSES } from '../../constants.tsx';
import { Student } from '../../types.ts';
import { Search, Filter, Edit, MoreVertical, Trash2, LayoutGrid, Users, Sparkles, ChevronDown } from 'lucide-react';

interface StudentsViewProps {
  onStudentClick: (id: string) => void;
  checkPermission?: (category: any, action: string) => boolean;
}

export const StudentsView: React.FC<StudentsViewProps> = ({ onStudentClick, checkPermission }) => {
  const [students] = useState<Student[]>(MOCK_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  const canEdit = checkPermission?.('accounts', 'edit') ?? true;
  const canDelete = checkPermission?.('accounts', 'delete') ?? true;

  const filteredStudents = students.filter(s => {
    const matchesSearch = `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.username.includes(searchTerm);
    return matchesSearch;
  });

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      {/* Standardized Header */}
      <div className="w-full bg-[#292667] rounded-[2.5rem] p-6 md:p-8 text-white shadow-xl border-b-[10px] border-[#00a651] flex flex-col md:flex-row items-center justify-between gap-6 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        
        <div className="flex items-center gap-6 relative z-10">
           <div className="p-4 md:p-5 bg-[#00a651] rounded-2xl text-white shadow-xl rotate-3">
             <Users size={32} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-2xl md:text-3xl font-black leading-none tracking-tight uppercase">Learner <span className="text-[#fbee21]">Directory</span></h2>
             <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-2">Central U Book Store database</p>
           </div>
        </div>

        <div className="flex items-center gap-8 relative z-10 bg-white/5 px-6 py-4 rounded-2xl border border-white/10 backdrop-blur-sm">
           <div className="text-center">
              <p className="text-3xl font-black text-[#fbee21] leading-none">{students.length}</p>
              <p className="text-[9px] font-black uppercase text-white/40 tracking-widest mt-1">Total</p>
           </div>
           <div className="w-px h-10 bg-white/10"></div>
           <div className="text-center">
              <p className="text-3xl font-black text-[#ec2027] leading-none">{filteredStudents.length}</p>
              <p className="text-[9px] font-black uppercase text-white/40 tracking-widest mt-1">Filtered</p>
           </div>
        </div>
      </div>

      {/* Standardized Switch Bar */}
      <div className="w-full bg-white p-3 md:p-4 rounded-[2rem] shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-4 flex-shrink-0">
        <div className="flex-[2] flex items-center gap-4 bg-slate-50 px-6 py-3.5 rounded-2xl border border-slate-100 w-full group focus-within:border-[#ec2027] transition-all">
          <Search size={22} className="text-slate-400 group-focus-within:text-[#ec2027]" strokeWidth={3} />
          <input 
            type="text" 
            placeholder="Search by name or ID code..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-base font-black text-[#292667] outline-none w-full placeholder:text-slate-300 uppercase"
          />
        </div>

        <div className="flex-1 min-w-[200px] relative w-full md:w-auto">
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full bg-slate-50 pl-5 pr-10 py-3.5 rounded-2xl border border-slate-100 outline-none font-black text-[10px] text-[#292667] uppercase appearance-none cursor-pointer"
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
            <thead className="sticky top-0 bg-[#292667] text-white uppercase text-[10px] font-black tracking-widest z-20">
              <tr>
                <th className="px-8 py-5">ID Code</th>
                <th className="px-8 py-5">Full Name</th>
                <th className="px-8 py-5">Course</th>
                <th className="px-8 py-5">Grade</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-4 font-mono text-sm font-black text-[#ec2027]">
                    <button onClick={() => onStudentClick(student.id)} className="hover:underline">
                      {student.username}
                    </button>
                  </td>
                  <td className="px-8 py-4">
                    <button onClick={() => onStudentClick(student.id)} className="flex items-center gap-3 text-left">
                      <img src={`https://picsum.photos/seed/${student.id}/64`} className="w-10 h-10 rounded-xl border border-white shadow-sm object-cover" alt="" />
                      <span className="font-black text-[#292667] text-sm uppercase tracking-tight">{student.firstName} {student.lastName}</span>
                    </button>
                  </td>
                  <td className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[150px]">{student.level}</td>
                  <td className="px-8 py-4">
                    <div className={`inline-block px-3 py-1 rounded-lg text-xs font-black ${
                      student.finalGrade >= 90 ? 'bg-[#00a651] text-white' : 'bg-[#ec2027] text-white'
                    }`}>
                      {student.finalGrade}%
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black tracking-widest border ${
                      student.status === 'active' ? 'bg-green-50 text-[#00a651] border-[#00a651]' : 'bg-slate-100 text-slate-400 border-slate-200'
                    }`}>
                      {student.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {canEdit && (
                        <button className="p-2 text-slate-300 hover:text-[#292667] transition-all">
                          <Edit size={18} strokeWidth={3} />
                        </button>
                      )}
                      {canDelete && (
                        <button className="p-2 text-slate-300 hover:text-[#ec2027] transition-all">
                          <Trash2 size={18} strokeWidth={3} />
                        </button>
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
  );
};
