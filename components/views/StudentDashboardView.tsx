
import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Rocket, 
  Trophy, 
  Clock, 
  BookOpen, 
  Star, 
  Play, 
  Medal,
  Target,
  Search,
  FilterX,
  Activity
} from 'lucide-react';
import { MOCK_COURSES, MOCK_STUDENTS } from '../../constants.tsx';

interface StudentDashboardViewProps {
  onEnterCourse: (id: string) => void;
  onCourseClick?: (id: string) => void;
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({ onEnterCourse, onCourseClick }) => {
  const student = MOCK_STUDENTS[0];
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Standard Curriculum', 'Robotics', 'Logic'];

  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const achievements = [
    { name: 'Fast Learner', icon: Rocket, color: 'bg-blue-500' },
    { name: 'Star Student', icon: Star, color: 'bg-[#ec2027]' },
    { name: 'Logic Master', icon: Target, color: 'bg-[#00a651]' },
    { name: 'Certificate Earned', icon: Trophy, color: 'bg-[#3b82f6]' }
  ];

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden animate-in fade-in duration-500">
      {/* Hero Header Standardized - Yellow to Red */}
      <div className="w-full bg-[#292667] rounded-2xl p-6 text-white shadow-xl border-b-8 border-[#00a651] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="p-0.5 bg-white rounded-2xl shadow-xl relative">
            <img src={`https://picsum.photos/seed/timmy/200`} className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 border-white object-cover" alt="Student" />
            <div className="absolute -bottom-1 -right-1 bg-[#ec2027] text-white p-1.5 rounded-lg shadow-lg rotate-12">
              <Sparkles size={14} strokeWidth={3} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black leading-none tracking-tight">HELLO, <span className="text-[#ec2027]">{student.firstName.toUpperCase()}!</span></h2>
            <div className="flex items-center gap-2 mt-2">
               <span className="px-3 py-1 bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-white border border-white/10">Learning Level 3</span>
               <span className="text-[10px] font-black text-[#ec2027] uppercase tracking-widest opacity-60">Elite Hub Member</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6 relative z-10 bg-white/5 px-6 py-4 rounded-2xl border border-white/10 backdrop-blur-md">
           <div className="text-center group cursor-pointer hover:scale-110 transition-transform">
              <p className="text-3xl font-black text-[#ec2027] leading-none mb-1">12</p>
              <p className="text-[8px] font-black uppercase text-white/40 tracking-[0.2em]">Earned Stars</p>
           </div>
           <div className="w-px h-10 bg-white/10"></div>
           <div className="text-center group cursor-pointer hover:scale-110 transition-transform">
              <p className="text-3xl font-black text-[#00a651] leading-none mb-1">08</p>
              <p className="text-[8px] font-black uppercase text-white/40 tracking-[0.2em]">Completed Tasks</p>
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden pb-1">
        {/* Course Library */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
             <h3 className="text-xl font-black text-[#292667] uppercase tracking-tight flex items-center gap-3">
               <div className="p-2 bg-red-50 rounded-xl text-[#ec2027]"><BookOpen size={24} strokeWidth={3} /></div>
               My U Books
             </h3>
             
             <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 group focus-within:border-[#ec2027] transition-all shadow-inner">
                <Search size={18} className="text-slate-300" strokeWidth={3} />
                <input 
                  type="text" 
                  placeholder="Search library..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-xs font-black text-[#292667] outline-none placeholder:text-slate-200 w-full md:w-32" 
                />
             </div>
          </div>

          <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide shrink-0">
             {categories.map(cat => (
               <button 
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border-b-2 active:scale-95 ${
                    activeCategory === cat 
                      ? 'bg-[#ec2027] text-white border-red-900' 
                      : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide space-y-3 pr-1">
            {filteredCourses.map((course, idx) => (
              <div key={course.id} onClick={() => onCourseClick?.(course.id)} className="bg-slate-50 p-4 rounded-2xl border-2 border-transparent hover:border-[#ec2027] hover:bg-white transition-all cursor-pointer group flex items-center gap-4 shadow-sm">
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md border-2 border-white flex-shrink-0">
                   <img src={course.thumbnail} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-white rounded-md text-[7px] font-black uppercase text-slate-400 tracking-widest border border-slate-100">{course.category}</span>
                  </div>
                  <h4 className="text-base font-black text-[#292667] uppercase tracking-tight truncate group-hover:text-[#ec2027] transition-colors">{course.name}</h4>
                  <div className="mt-2 flex items-center gap-3">
                     <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden border border-white">
                        <div className={`h-full transition-all duration-1000 ${idx % 2 === 0 ? 'bg-[#00a651]' : 'bg-[#ec2027]'}`} style={{ width: `${60 + idx * 5}%` }}></div>
                     </div>
                     <span className="text-[9px] font-black text-[#292667]">{60 + idx * 5}%</span>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnterCourse(course.id);
                  }}
                  className="w-10 h-10 rounded-xl bg-[#292667] text-white flex items-center justify-center shadow-lg group-hover:bg-[#00a651] transition-all active:scale-90 border-b-2 border-black/10"
                >
                   <Play size={18} className="ml-0.5" fill="currentColor" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#292667] rounded-3xl p-6 shadow-xl border-b-8 border-[#ec2027] text-white relative overflow-hidden group">
             <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-[#ec2027] mb-4 flex items-center gap-2">
               <Activity size={16} /> Daily Performance
             </h4>
             <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                   <p className="text-2xl font-black">4.5h</p>
                   <p className="text-[8px] font-black uppercase text-white/30 tracking-widest mt-1">Study Time</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                   <p className="text-2xl font-black text-[#00a651]">92%</p>
                   <p className="text-[8px] font-black uppercase text-white/30 tracking-widest mt-1">Score Avg</p>
                </div>
             </div>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex-1 flex flex-col overflow-hidden">
            <h4 className="text-lg font-black text-[#292667] uppercase tracking-tight mb-4 flex items-center gap-3">
               <Trophy size={22} className="text-red-500" strokeWidth={3} /> Badges Room
            </h4>
            <div className="grid grid-cols-2 gap-3 overflow-y-auto scrollbar-hide">
               {achievements.map((item) => (
                 <div key={item.name} className="bg-slate-50 p-4 rounded-xl border-b-4 border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:border-[#ec2027] transition-all shadow-sm">
                    <div className={`${item.color} p-2.5 rounded-lg text-white shadow-md mb-2 group-hover:rotate-6 transition-all`}>
                       <item.icon size={20} strokeWidth={3} />
                    </div>
                    <p className="text-[9px] font-black text-[#292667] uppercase tracking-tight">{item.name}</p>
                 </div>
               ))}
               <div className="aspect-square bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-100">
                  <Sparkles size={24} />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
