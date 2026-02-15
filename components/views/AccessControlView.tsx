
import React, { useState, useMemo } from 'react';
import { MOCK_COURSES } from '../../constants.tsx';
import { Course, Module, UserRole, Lesson } from '../../types.ts';
import { 
  ShieldCheck, 
  Zap, 
  ChevronDown, 
  X, 
  Check, 
  Layers, 
  Search, 
  BookMarked,
  Clock,
  Calendar,
  Timer,
  Save,
  MonitorPlay,
  FileText,
  ClipboardList,
  Link,
  MessageSquareQuote,
  FileSearch,
  ChevronLeft,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface AccessControlViewProps {
  activeRole: UserRole;
  onBack: () => void;
}

/**
 * Scheduling Modal for setting Time/Date Access
 */
const SchedulingModal = ({ 
  title, 
  initialStart, 
  initialEnd, 
  onClose, 
  onSave 
}: { 
  title: string, 
  initialStart?: string, 
  initialEnd?: string, 
  onClose: () => void, 
  onSave: (start: string, end: string) => void 
}) => {
  const [startDate, setStartDate] = useState(initialStart || '');
  const [endDate, setEndDate] = useState(initialEnd || '');

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border-t-[12px] border-[#F05A28] relative animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl">
          <X size={20} strokeWidth={4} />
        </button>

        <div className="text-center mb-8 shrink-0">
           <div className="w-16 h-16 bg-orange-50 text-[#F05A28] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner border-2 border-orange-100 rotate-3">
              <Timer size={32} strokeWidth={3} />
           </div>
           <h3 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Scheduling Protocol</h3>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{title}</p>
        </div>

        <div className="space-y-6 flex-1">
           <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Calendar size={14} className="text-[#3b82f6]" /> Activate From (Date/Time)
              </label>
              <input 
                type="datetime-local" 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-[#304B9E] outline-none focus:border-[#F05A28] transition-all shadow-inner"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
           </div>

           <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <X size={14} className="text-[#ec2027]" /> Deactivate After (Date/Time)
              </label>
              <input 
                type="datetime-local" 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-[#304B9E] outline-none focus:border-[#F05A28] transition-all shadow-inner"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
           </div>

           <div className="p-4 bg-blue-50 rounded-2xl border border-indigo-100 flex items-start gap-3 mt-4">
              <Sparkles size={16} className="text-[#304B9E] shrink-0 mt-1" />
              <p className="text-[9px] font-bold text-slate-500 uppercase leading-relaxed">
                Automated scheduling ensures nodes only become available to learners within the specified timeline. Leave empty for permanent access.
              </p>
           </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 shrink-0">
           <button onClick={onClose} className="flex-1 py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
           <button 
             onClick={() => onSave(startDate, endDate)}
             className="flex-[2] py-5 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 border-b-6 border-black/10 transition-all active:scale-95"
           >
              <Save size={18} strokeWidth={3} /> Deploy Schedule
           </button>
        </div>
      </div>
    </div>
  );
};

const SwitchToggle = ({ active, onToggle, label, size = 'md', disabled = false, onScheduleClick, hasSchedule }: { 
  active: boolean, 
  onToggle: () => void, 
  label?: string, 
  size?: 'sm' | 'md' | 'lg', 
  disabled?: boolean,
  onScheduleClick?: () => void,
  hasSchedule?: boolean
}) => {
  const dims = size === 'sm' ? 'w-10 h-5' : size === 'lg' ? 'w-16 h-8' : 'w-12 h-6';
  const circle = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
  const translate = size === 'sm' ? 'translate-x-5' : size === 'lg' ? 'translate-x-8' : 'translate-x-6';

  return (
    <div className={`flex items-center gap-4 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {onScheduleClick && (
        <button 
          onClick={(e) => { e.stopPropagation(); onScheduleClick(); }}
          className={`p-2 rounded-xl border-2 transition-all active:scale-90 ${hasSchedule ? 'bg-indigo-50 border-indigo-200 text-[#304B9E] shadow-sm' : 'bg-white border-slate-100 text-slate-300 hover:text-[#304B9E]'}`}
          title="Set Availability Schedule"
        >
          <Clock size={size === 'lg' ? 24 : 16} strokeWidth={3} />
        </button>
      )}
      <div className="flex flex-col items-center">
        {label && <span className={`text-[7px] font-black uppercase tracking-widest mb-1 ${active ? 'text-[#00a651]' : 'text-slate-300'}`}>{label}</span>}
        <button 
          disabled={disabled}
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className={`${dims} rounded-full relative transition-all duration-300 shadow-inner group ${active ? 'bg-[#00a651]' : 'bg-slate-200'}`}
        >
          <div className={`absolute top-0.5 left-0.5 ${circle} bg-white rounded-full shadow-lg transition-transform duration-300 flex items-center justify-center ${active ? translate : 'translate-x-0'}`}>
            {active ? <Check size={8} className="text-[#00a651]" strokeWidth={4} /> : <X size={8} className="text-slate-300" strokeWidth={4} />}
          </div>
        </button>
        <span className={`text-[6px] font-black uppercase mt-0.5 ${active ? 'text-[#00a651]' : 'text-slate-400'}`}>
          {active ? 'ONLINE' : 'OFFLINE'}
        </span>
      </div>
    </div>
  );
};

export const AccessControlView: React.FC<AccessControlViewProps> = ({ activeRole, onBack }) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('ubook_courses_v7');
    return saved ? JSON.parse(saved) : MOCK_COURSES;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'published' | 'draft'>('all');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
  
  const [schedulingContext, setSchedulingContext] = useState<{ 
    type: 'course' | 'module' | 'test', 
    courseId: string, 
    modId?: string, 
    lsnId?: string,
    title: string,
    initialStart?: string,
    initialEnd?: string
  } | null>(null);

  const isAdmin = activeRole === UserRole.MAIN_CENTER || activeRole === UserRole.SUPER_ADMIN || activeRole === UserRole.SCHOOL_ADMIN;

  const handleUpdate = (updated: Course[]) => {
    setCourses(updated);
    localStorage.setItem('ubook_courses_v7', JSON.stringify(updated));
  };

  const toggleCourse = (id: string) => {
    if (!isAdmin) return;
    const next = courses.map(c => c.id === id ? { ...c, isPublished: !c.isPublished } : c);
    handleUpdate(next);
  };

  const toggleModule = (courseId: string, modId: string) => {
    if (!isAdmin) return;
    const next = courses.map(c => {
      if (c.id !== courseId) return c;
      return {
        ...c,
        modules: c.modules.map(m => m.id === modId ? { ...m, isPublished: !m.isPublished } : m)
      };
    });
    handleUpdate(next);
  };

  const toggleLesson = (courseId: string, modId: string, lsnId: string) => {
    if (!isAdmin) return;
    const next = courses.map(c => {
      if (c.id !== courseId) return c;
      return {
        ...c,
        modules: c.modules.map(m => {
          if (m.id !== modId) return m;
          return {
            ...m,
            lessons: m.lessons.map(l => l.id === lsnId ? { ...l, isPublished: !l.isPublished } : l)
          };
        })
      };
    });
    handleUpdate(next);
  };

  const setSchedule = (start: string, end: string) => {
    if (!isAdmin || !schedulingContext) return;
    const { type, courseId, modId, lsnId } = schedulingContext;

    const next = courses.map(c => {
      if (c.id !== courseId) return c;
      if (type === 'course') return { ...c, startDate: start, endDate: end };
      return {
        ...c,
        modules: c.modules.map(m => {
          if (m.id !== modId) return m;
          if (type === 'module') return { ...m, startDate: start, endDate: end };
          return {
            ...m,
            lessons: m.lessons.map(l => {
              if (l.id !== lsnId) return l;
              return { ...l, startDate: start, endDate: end };
            })
          };
        })
      };
    });

    handleUpdate(next);
    setSchedulingContext(null);
  };

  const getScheduleStatus = (start?: string, end?: string) => {
    if (!start && !end) return null;
    const now = new Date();
    const sDate = start ? new Date(start) : null;
    const eDate = end ? new Date(end) : null;

    if (eDate && now > eDate) return { label: 'EXPIRED', color: 'bg-red-50 text-red-600 border-red-100' };
    if (sDate && now < sDate) return { label: 'SCHEDULED', color: 'bg-amber-50 text-amber-600 border-amber-100' };
    return { label: 'LIVE NOW', color: 'bg-emerald-50 text-emerald-600 border-emerald-100 pulse' };
  };

  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = 
        filterMode === 'all' || 
        (filterMode === 'published' && c.isPublished) || 
        (filterMode === 'draft' && !c.isPublished);
      return matchesSearch && matchesFilter;
    });
  }, [courses, searchTerm, filterMode]);

  const getIcon = (type: string) => {
    switch(type) {
        case 'video': return <MonitorPlay size={14} />;
        case 'quiz': return <Zap size={14} fill="currentColor" />;
        case 'assignment': return <ClipboardList size={14} />;
        case 'matching': return <Link size={14} />;
        case 'question-answer': return <MessageSquareQuote size={14} />;
        case 'pdf': return <FileSearch size={14} />;
        default: return <FileText size={14} />;
    }
  }

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in duration-500">
      
      {schedulingContext && (
        <SchedulingModal 
          title={schedulingContext.title}
          initialStart={schedulingContext.initialStart}
          initialEnd={schedulingContext.initialEnd}
          onClose={() => setSchedulingContext(null)}
          onSave={setSchedule}
        />
      )}

      {/* Header */}
      <div className="w-full bg-[#304B9E] rounded-[2.5rem] p-6 md:p-8 text-white shadow-xl border-b-[10px] border-[#F05A28] flex flex-col md:flex-row items-center justify-between gap-6 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-6 relative z-10">
           <button onClick={onBack} className="p-3 bg-white/10 rounded-xl text-white shadow-lg hover:bg-[#F05A28] transition-all active:scale-90 border-2 border-white/10 flex items-center gap-2 mr-2">
             <ChevronLeft size={20} strokeWidth={4} />
             <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Back to Hub</span>
           </button>
           <div className="p-4 md:p-5 bg-[#F05A28] rounded-2xl text-white shadow-xl rotate-3 border-b-4 border-black/10">
             <ShieldCheck size={32} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-2xl md:text-3xl font-black leading-none tracking-tight uppercase">Master <span className="text-white opacity-60">Control Hub</span></h2>
             <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-2">Activate/Deactivate & Schedule Curriculum Nodes</p>
           </div>
        </div>
      </div>

      {/* Search & Tabs */}
      <div className="w-full bg-white p-3 md:p-4 rounded-[2rem] shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-4 flex-shrink-0">
        <div className="flex-[2] flex items-center gap-4 bg-slate-50 px-6 py-3.5 rounded-2xl border border-slate-100 w-full group focus-within:border-[#F05A28] transition-all shadow-inner">
          <Search size={22} className="text-slate-400 group-focus-within:text-[#304B9E]" strokeWidth={3} />
          <input 
            type="text" 
            placeholder="Search curricula nodes to manage..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-base font-black text-[#304B9E] outline-none w-full placeholder:text-slate-300 uppercase"
          />
        </div>
        <div className="flex gap-2">
           {['all', 'published', 'draft'].map(mode => (
             <button 
               key={mode}
               onClick={() => setFilterMode(mode as any)}
               className={`px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm ${filterMode === mode ? 'bg-[#304B9E] text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
             >
                {mode}
             </button>
           ))}
        </div>
      </div>

      {/* Registry Table */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-20 px-2">
         <div className="space-y-4">
            {filteredCourses.map((course) => {
              const status = getScheduleStatus(course.startDate, course.endDate);
              return (
              <div key={course.id} className="bg-white rounded-[2.5rem] shadow-xl border-2 border-slate-50 overflow-hidden animate-in zoom-in duration-300">
                 <div 
                   onClick={() => setExpandedCourseId(expandedCourseId === course.id ? null : course.id)}
                   className={`p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer transition-colors ${course.isPublished ? 'bg-white' : 'bg-slate-50 opacity-80'}`}
                 >
                    <div className="flex items-center gap-6">
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl border-b-4 border-black/10 transition-transform ${course.isPublished ? 'bg-[#304B9E] text-white rotate-3' : 'bg-slate-200 text-slate-400'}`}>
                          <BookMarked size={28} strokeWidth={2.5} />
                       </div>
                       <div>
                          <span className="text-[8px] font-black text-[#F05A28] uppercase tracking-[0.2em] mb-1 block">Course Node</span>
                          <h3 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">{course.name}</h3>
                          {status && (
                            <span className={`inline-block mt-2 px-2 py-0.5 rounded-lg border text-[7px] font-black tracking-widest ${status.color}`}>
                              {status.label}: {course.startDate?.split('T')[0]} - {course.endDate?.split('T')[0]}
                            </span>
                          )}
                       </div>
                    </div>
                    <div className="flex items-center gap-8 bg-slate-50/50 p-4 rounded-[2rem] border border-slate-100 shadow-inner">
                       <SwitchToggle 
                         active={!!course.isPublished} 
                         onToggle={() => toggleCourse(course.id)} 
                         label="GLOBAL" 
                         size="lg"
                         onScheduleClick={() => setSchedulingContext({ type: 'course', courseId: course.id, title: course.name, initialStart: course.startDate, initialEnd: course.endDate })}
                         hasSchedule={!!(course.startDate || course.endDate)}
                       />
                       <ChevronDown size={20} strokeWidth={4} className={`transition-transform duration-500 ${expandedCourseId === course.id ? 'rotate-180 text-[#F05A28]' : 'text-slate-300'}`} />
                    </div>
                 </div>

                 {expandedCourseId === course.id && (
                   <div className="bg-slate-50/30 p-8 pt-0 animate-in slide-in-from-top-4 duration-500">
                      <div className="space-y-6">
                         {course.modules.map((mod, mIdx) => {
                           const mStatus = getScheduleStatus(mod.startDate, mod.endDate);
                           return (
                           <div key={mod.id} className="bg-white rounded-[2rem] p-6 shadow-md border-2 border-slate-100/50">
                              <div className="flex items-center justify-between border-b border-slate-50 pb-4 mb-4">
                                 <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all ${mod.isPublished ? 'bg-indigo-50 text-[#304B9E] shadow-sm' : 'bg-slate-50 text-slate-300'}`}>{mIdx + 1}</div>
                                    <div>
                                      <h4 className={`text-base font-black uppercase tracking-tight ${mod.isPublished ? 'text-[#304B9E]' : 'text-slate-400'}`}>{mod.title}</h4>
                                      {mStatus && (
                                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-lg border text-[6px] font-black tracking-widest ${mStatus.color}`}>
                                          AUTO-LOGIC: {mod.startDate?.split('T')[0]}
                                        </span>
                                      )}
                                    </div>
                                 </div>
                                 <SwitchToggle 
                                    active={!!mod.isPublished} 
                                    onToggle={() => toggleModule(course.id, mod.id)} 
                                    label="MODULE" 
                                    onScheduleClick={() => setSchedulingContext({ type: 'module', courseId: course.id, modId: mod.id, title: mod.title, initialStart: mod.startDate, initialEnd: mod.endDate })}
                                    hasSchedule={!!(mod.startDate || mod.endDate)}
                                  />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                 {mod.lessons.map((lsn) => {
                                   const lStatus = getScheduleStatus(lsn.startDate, lsn.endDate);
                                   return (
                                   <div key={lsn.id} className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${lsn.isPublished ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-50 opacity-50'}`}>
                                      <div className="flex items-center gap-3 min-w-0">
                                         <div className={`p-2 rounded-lg shadow-sm ${lsn.isPublished ? 'bg-[#304B9E] text-white' : 'bg-slate-100 text-slate-300'}`}>
                                            {getIcon(lsn.type)}
                                         </div>
                                         <div className="min-w-0">
                                            <p className={`text-[10px] font-black uppercase tracking-tight truncate ${lsn.isPublished ? 'text-[#304B9E]' : 'text-slate-400'}`}>{lsn.title}</p>
                                            <div className="flex items-center gap-2">
                                              <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">
                                                {lsn.type === 'quiz' ? 'Assessment' : lsn.type === 'assignment' ? 'Workshop' : lsn.type === 'matching' ? 'Logic Game' : 'Content'}
                                              </p>
                                              {lStatus && <div className={`w-1.5 h-1.5 rounded-full ${lStatus.label === 'LIVE NOW' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />}
                                            </div>
                                         </div>
                                      </div>
                                      <SwitchToggle 
                                        active={!!lsn.isPublished} 
                                        onToggle={() => toggleLesson(course.id, mod.id, lsn.id)} 
                                        size="sm" 
                                        onScheduleClick={() => setSchedulingContext({ type: 'test', courseId: course.id, modId: mod.id, lsnId: lsn.id, title: lsn.title, initialStart: lsn.startDate, initialEnd: lsn.endDate })}
                                        hasSchedule={!!(lsn.startDate || lsn.endDate)}
                                      />
                                   </div>
                                 );})}
                              </div>
                           </div>
                         );})}
                      </div>
                   </div>
                 )}
              </div>
            );})}
         </div>
      </div>
      
      {/* Footer Info */}
      <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 flex items-center justify-between mx-2 mb-4 shrink-0">
         <div className="flex items-center gap-3">
            <CheckCircle2 size={16} className="text-[#00a651]" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Temporal Logic Engine Active</span>
         </div>
         <p className="text-[8px] font-black text-[#304B9E] uppercase tracking-widest italic opacity-60">Centralized synchronization across all network nodes</p>
      </div>
    </div>
  );
};
