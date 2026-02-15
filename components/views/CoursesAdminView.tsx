
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { MOCK_COURSES } from '../../constants.tsx';
import { Course, Module, Lesson, UserRole, QuizQuestion, MatchingPair } from '../../types.ts';
import { QuizBuilder } from './TestsView.tsx';
import { 
  Layers, 
  X, 
  Edit3, 
  MonitorPlay, 
  Zap, 
  FileText, 
  Save, 
  ClipboardList, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  ImageIcon, 
  Link, 
  MessageSquareQuote, 
  BookMarked,
  ChevronDown,
  ArrowLeft,
  Settings2,
  PlusCircle,
  FileCheck,
  ChevronRight,
  Database,
  Layout,
  PlusSquare,
  Sparkles,
  Search,
  BookOpen,
  FileSearch,
  ArrowUp,
  ArrowDown,
  Library,
  Target,
  Clock,
  ExternalLink,
  Wand2,
  Cpu,
  Code,
  Filter,
  Check,
  Tag,
  Rocket,
  Settings
} from 'lucide-react';

interface CoursesAdminViewProps {
  initialCourseId?: string | null;
  onExitEdit?: () => void;
  onPreviewCourse?: (id: string) => void;
  checkPermission?: (category: any, action: string) => boolean;
  activeRole?: UserRole;
}

const TASK_TYPES = [
  { value: 'text', label: 'Instruction Text', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50', category: 'content' },
  { value: 'video', label: 'Video Stream', icon: MonitorPlay, color: 'text-indigo-500', bg: 'bg-indigo-50', category: 'content' },
  { value: 'pdf', label: 'PDF Viewer', icon: FileSearch, color: 'text-cyan-500', bg: 'bg-cyan-50', category: 'content' },
  { value: 'quiz', label: 'Multiple Choice', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50', category: 'task' },
  { value: 'matching', label: 'Matching Logic', icon: Link, color: 'text-teal-500', bg: 'bg-teal-50', category: 'task' },
  { value: 'question-answer', label: 'Q&A Block', icon: MessageSquareQuote, color: 'text-rose-500', bg: 'bg-rose-50', category: 'task' },
  { value: 'assignment', label: 'Workshop Upload', icon: ClipboardList, color: 'text-emerald-500', bg: 'bg-emerald-50', category: 'task' },
];

const COURSE_STRUCTURE = [
  { 
    id: 'DIGITAL KIDS', 
    label: 'DIGITAL KIDS', 
    icon: Sparkles, 
    color: 'text-[#F05A28]', 
    bg: 'bg-orange-50', 
    levels: ['Starter', 'Explorer', 'Racer', 'Flyer', 'Genius', 'Expert'] 
  },
  { 
    id: 'Coding', 
    label: 'Coding', 
    icon: Code, 
    color: 'text-indigo-500', 
    bg: 'bg-indigo-50', 
    subCategories: [
      { id: 'Primary', label: 'Primary', levels: ['Can Code 1', 'Can Code 2', 'Can Code 3', 'Can Code 4', 'Can Code 5', 'Can Code 6'] },
      { id: 'Secondary', label: 'Secondary', levels: ['Can Code 1', 'Can Code 2'] }
    ]
  },
  { 
    id: 'Robotics', 
    label: 'Robotics', 
    icon: Cpu, 
    color: 'text-emerald-500', 
    bg: 'bg-emerald-50', 
    levels: ['Robotics 1', 'Robotics 2', 'Robotics 3', 'Robotics 4', 'Robotics 5', 'Robotics 6'] 
  },
];

/**
 * Task Editor Panel
 */
const InteractionEditor = ({ lesson, onUpdate }: { lesson: Lesson, onUpdate: (data: Partial<Lesson>) => void }) => {
  const [local, setLocal] = useState(lesson);
  useEffect(() => { setLocal(lesson); }, [lesson.id, lesson.type, lesson.title]);

  const commit = (updates: Partial<Lesson>) => {
    const next = { ...local, ...updates };
    setLocal(next);
    onUpdate(updates);
  };

  const currentType = TASK_TYPES.find(t => t.value === local.type) || TASK_TYPES[0];
  const IconComponent = currentType.icon;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${currentType.bg} ${currentType.color} shadow-sm border border-current/10 rotate-3`}>
              <IconComponent size={28} strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Editing Activity Node</span>
              <h3 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">{currentType.label}</h3>
            </div>
          </div>
          
          <div className="w-full md:w-72">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Update Logic Type</label>
            <div className="relative">
              <select 
                value={local.type}
                onChange={(e) => commit({ type: e.target.value as any })}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-black text-[#304B9E] text-[10px] uppercase appearance-none cursor-pointer focus:border-[#F05A28] outline-none transition-all shadow-inner"
              >
                <optgroup label="Learning Activities">
                   {TASK_TYPES.filter(t => t.category === 'content').map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </optgroup>
                <optgroup label="Module End Tests">
                   {TASK_TYPES.filter(t => t.category === 'task').map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </optgroup>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#304B9E] uppercase tracking-widest ml-1 block">Activity Title</label>
            <input 
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-[#304B9E] text-xl outline-none focus:border-[#F05A28] transition-all uppercase placeholder:text-slate-200 shadow-inner"
              value={local.title}
              onChange={(e) => commit({ title: e.target.value })}
              placeholder="ENTER TITLE..."
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[400px]">
        {local.type === 'video' && (
          <div className="space-y-6">
            <label className="text-[10px] font-black text-[#304B9E] uppercase tracking-widest flex items-center gap-2"><MonitorPlay size={14}/> Video Resource URL</label>
            <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-500 text-sm outline-none focus:border-[#304B9E] shadow-inner" placeholder="HTTPS://YOUTUBE.COM/..." value={local.content || ''} onChange={(e) => commit({ content: e.target.value })} />
          </div>
        )}
        {local.type === 'pdf' && (
          <div className="space-y-6">
            <label className="text-[10px] font-black text-[#304B9E] uppercase tracking-widest flex items-center gap-2"><FileSearch size={14}/> PDF Document URL</label>
            <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-500 text-sm outline-none focus:border-[#304B9E] shadow-inner" placeholder="HTTPS://STORAGE.COM/DOCUMENT.PDF" value={local.content || ''} onChange={(e) => commit({ content: e.target.value })} />
          </div>
        )}
        {local.type === 'quiz' && (
          <QuizBuilder compact={true} title={local.title} initialQuestions={local.quiz || []} onSave={(qs) => commit({ quiz: qs })} onBack={() => {}} />
        )}
        {local.type === 'text' && (
          <textarea className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-8 font-bold text-slate-600 text-base outline-none focus:border-blue-500 min-h-[400px] resize-none shadow-inner" placeholder="ENTER RICH TEXT SYLLABUS CONTENT..." value={local.content || ''} onChange={(e) => commit({ content: e.target.value })} />
        )}
        {local.type === 'matching' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-[#304B9E] uppercase tracking-widest">Logic Pairs</label>
              <button 
                onClick={() => commit({ matchingPairs: [...(local.matchingPairs || []), { id: Date.now().toString(), left: '', right: '' }] })}
                className="px-4 py-2 bg-[#F05A28] text-white rounded-xl font-black text-[9px] uppercase shadow-lg active:scale-95 transition-all"
              >
                Add Pair
              </button>
            </div>
            <div className="space-y-3">
              {(local.matchingPairs || []).map((pair, idx) => (
                <div key={pair.id} className="flex items-center gap-3 animate-in slide-in-from-top-1">
                  <input className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2 font-black text-[#304B9E] text-xs outline-none focus:border-[#304B9E]" value={pair.left} onChange={(e) => {
                    const next = [...(local.matchingPairs || [])];
                    next[idx] = { ...pair, left: e.target.value };
                    commit({ matchingPairs: next });
                  }} placeholder="Left Term" />
                  <ChevronRight size={14} className="text-slate-300" />
                  <input className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2 font-black text-[#304B9E] text-xs outline-none focus:border-[#304B9E]" value={pair.right} onChange={(e) => {
                    const next = [...(local.matchingPairs || [])];
                    next[idx] = { ...pair, right: e.target.value };
                    commit({ matchingPairs: next });
                  }} placeholder="Right Match" />
                  <button onClick={() => commit({ matchingPairs: (local.matchingPairs || []).filter(p => p.id !== pair.id) })} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        )}
        {local.type === 'question-answer' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-[#304B9E] uppercase tracking-widest">Open Ended Questions</label>
              <button 
                onClick={() => commit({ questions: [...(local.questions || []), ''] })}
                className="px-4 py-2 bg-[#F05A28] text-white rounded-xl font-black text-[9px] uppercase shadow-lg active:scale-95 transition-all"
              >
                Add Prompt
              </button>
            </div>
            <div className="space-y-3">
              {(local.questions || []).map((q, idx) => (
                <div key={idx} className="flex items-center gap-3 animate-in slide-in-from-top-1">
                  <textarea rows={2} className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2 font-black text-[#304B9E] text-xs outline-none focus:border-[#304B9E] resize-none" value={q} onChange={(e) => {
                    const next = [...(local.questions || [])];
                    next[idx] = e.target.value;
                    commit({ questions: next });
                  }} placeholder="Prompt text..." />
                  <button onClick={() => commit({ questions: (local.questions || []).filter((_, i) => i !== idx) })} className="p-2 text-slate-300 hover:text-red-500 transition-colors active:scale-90"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        )}
        {local.type === 'assignment' && (
           <div className="space-y-4">
              <label className="text-[10px] font-black text-[#304B9E] uppercase tracking-widest">Workshop Prompt</label>
              <textarea 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 font-bold text-slate-500 text-sm outline-none focus:border-emerald-500 min-h-[200px] shadow-inner"
                value={local.assignmentInstructions || ''}
                onChange={(e) => commit({ assignmentInstructions: e.target.value })}
                placeholder="DESCRIBE ASSIGNMENT..."
              />
           </div>
        )}
      </div>
    </div>
  );
};

/**
 * Main Controller Component
 */
export const CoursesAdminView: React.FC<CoursesAdminViewProps> = ({ 
  initialCourseId, 
  onExitEdit, 
  activeRole 
}) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('ubook_courses_v3');
    return saved ? JSON.parse(saved) : MOCK_COURSES;
  });

  const [activeCourseId, setActiveCourseId] = useState<string | null>(initialCourseId || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNode, setSelectedNode] = useState<{ type: 'course' | 'module' | 'task', id: string, modId?: string } | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  
  // Custom Filter State
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterLevel, setFilterLevel] = useState<string>('All');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const currentCourse = useMemo(() => courses.find(c => c.id === activeCourseId), [courses, activeCourseId]);

  useEffect(() => {
    if (currentCourse) {
      setSelectedNode({ type: 'course', id: currentCourse.id });
      setExpandedModules(new Set(currentCourse.modules.map(m => m.id)));
    } else {
      setSelectedNode(null);
    }
  }, [activeCourseId]);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  const updateGlobalRegistry = (updatedCourse: Course) => {
    const next = courses.map(c => c.id === updatedCourse.id ? updatedCourse : c);
    setCourses(next);
    localStorage.setItem('ubook_courses_v3', JSON.stringify(next));
  };

  const handleCreateNewCourse = () => {
    const newCourse: Course = {
      id: 'course-' + Date.now(),
      name: 'NEW CURRICULUM HUB',
      category: 'DIGITAL KIDS',
      level: 'Starter',
      isPurchased: true,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      modules: [],
      duration: '20 Hours',
      description: 'New program initialized in registry. Define synopsis to continue.'
    };
    const next = [newCourse, ...courses];
    setCourses(next);
    localStorage.setItem('ubook_courses_v3', JSON.stringify(next));
    setActiveCourseId(newCourse.id);
  };

  const addModule = () => {
    if (!currentCourse) return;
    const newMod: Module = { id: 'mod-' + Date.now(), title: 'NEW UNIT', description: '', lessons: [], isPublished: true };
    const updated = { ...currentCourse, modules: [...currentCourse.modules, newMod] };
    updateGlobalRegistry(updated);
    setSelectedNode({ type: 'module', id: newMod.id });
    setExpandedModules(new Set([...expandedModules, newMod.id]));
  };

  const addTask = (modId: string, type: Lesson['type'] = 'text') => {
    if (!currentCourse) return;
    const newTask: Lesson = { id: 'task-' + Date.now(), title: 'NEW ACTIVITY', type, description: '', isPublished: true };
    const updated = {
      ...currentCourse,
      modules: currentCourse.modules.map(m => m.id === modId ? { ...m, lessons: [...m.lessons, newTask] } : m)
    };
    updateGlobalRegistry(updated);
    setSelectedNode({ type: 'task', id: newTask.id, modId });
  };

  const updateTask = (taskId: string, modId: string, updates: Partial<Lesson>) => {
    if (!currentCourse) return;
    const updatedCourse = {
      ...currentCourse,
      modules: currentCourse.modules.map(m => {
        if (m.id !== modId) return m;
        return {
          ...m,
          lessons: m.lessons.map(l => l.id === taskId ? { ...l, ...updates } : l)
        };
      })
    };
    updateGlobalRegistry(updatedCourse);
  };

  const updateModule = (modId: string, updates: Partial<Module>) => {
    if (!currentCourse) return;
    const updated = {
      ...currentCourse,
      modules: currentCourse.modules.map(m => m.id === modId ? { ...m, ...updates } : m)
    };
    updateGlobalRegistry(updated);
  };

  const updateCourseMeta = (updates: Partial<Course>) => {
    if (!currentCourse) return;
    updateGlobalRegistry({ ...currentCourse, ...updates });
  };

  const reorderNode = (type: 'module' | 'task', id: string, direction: 'up' | 'down', modId?: string) => {
    if (!currentCourse) return;
    const updated = { ...currentCourse };
    if (type === 'module') {
      const idx = updated.modules.findIndex(m => m.id === id);
      if (direction === 'up' && idx > 0) [updated.modules[idx], updated.modules[idx-1]] = [updated.modules[idx-1], updated.modules[idx]];
      else if (direction === 'down' && idx < updated.modules.length - 1) [updated.modules[idx], updated.modules[idx+1]] = [updated.modules[idx+1], updated.modules[idx]];
    } else {
      const modIdx = updated.modules.findIndex(m => m.id === modId);
      if (modIdx === -1) return;
      const lessons = [...updated.modules[modIdx].lessons];
      const lIdx = lessons.findIndex(l => l.id === id);
      if (direction === 'up' && lIdx > 0) [lessons[lIdx], lessons[lIdx-1]] = [lessons[lIdx-1], lessons[lIdx]];
      else if (direction === 'down' && lIdx < lessons.length - 1) [lessons[lIdx], lessons[lIdx+1]] = [lessons[lIdx+1], lessons[lIdx]];
      updated.modules[modIdx].lessons = lessons;
    }
    updateGlobalRegistry(updated);
  };

  const deleteNode = (type: 'module' | 'task', id: string, modId?: string) => {
    if (!currentCourse) return;
    if (confirm(`PURGE THIS ${type.toUpperCase()}?`)) {
      let updated: Course;
      if (type === 'module') {
        updated = { ...currentCourse, modules: currentCourse.modules.filter(m => m.id !== id) };
        setSelectedNode({ type: 'course', id: currentCourse.id });
      } else {
        updated = {
          ...currentCourse,
          modules: currentCourse.modules.map(m => m.id === modId ? { ...m, lessons: m.lessons.filter(l => l.id !== id) } : m)
        };
        setSelectedNode({ type: 'module', id: modId! });
      }
      updateGlobalRegistry(updated);
    }
  };

  const selectedTask = useMemo(() => {
    if (selectedNode?.type !== 'task' || !currentCourse) return null;
    return currentCourse.modules.find(m => m.id === selectedNode.modId)?.lessons.find(l => l.id === selectedNode.id);
  }, [selectedNode, currentCourse]);

  const selectedModule = useMemo(() => {
    if (selectedNode?.type !== 'module' || !currentCourse) return null;
    return currentCourse.modules.find(m => m.id === selectedNode.id);
  }, [selectedNode, currentCourse]);

  const filteredCourses = useMemo(() => 
    courses.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || c.category === filterCategory;
      const matchesLevel = filterLevel === 'All' || c.level === filterLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    }),
    [courses, searchTerm, filterCategory, filterLevel]
  );

  const activeLevels = useMemo(() => {
    if (filterCategory === 'All') return [];
    const cat = COURSE_STRUCTURE.find(c => c.id === filterCategory);
    if (!cat) return [];
    if (cat.subCategories) {
      return cat.subCategories.flatMap(s => s.levels);
    }
    return cat.levels;
  }, [filterCategory]);

  // Logic for the Course Metadata editor levels
  const currentStructure = COURSE_STRUCTURE.find(s => s.id === currentCourse?.category);
  const metadataLevels = useMemo(() => {
    if (!currentCourse || !currentStructure) return [];
    if (currentStructure.subCategories) {
      return currentStructure.subCategories.find(s => s.id === currentCourse.subCategory)?.levels || [];
    }
    return currentStructure.levels;
  }, [currentCourse?.category, currentCourse?.subCategory, currentStructure]);

  /**
   * VIEW: GRID CATALOG
   */
  if (!activeCourseId) {
    return (
      <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in duration-500 font-sans">
        {/* Global Toolbar */}
        <div className="w-full bg-[#304B9E] rounded-[2.5rem] p-6 text-white shadow-xl border-b-[10px] border-[#F05A28] flex flex-col items-stretch gap-6 shrink-0 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none transition-opacity duration-1000 group-hover:opacity-20"></div>
           
           <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-5">
                 <div className="p-4 bg-[#F05A28] rounded-[1.5rem] shadow-xl rotate-3">
                    <Library size={32} strokeWidth={3} />
                 </div>
                 <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">Curriculum Studio</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mt-2">U Book Store Global Repository</p>
                 </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                 {/* Dynamic Category/Level Dropdown Filter Bar */}
                 <div className="flex bg-white/5 p-1.5 rounded-[1.5rem] border border-white/10 backdrop-blur-xl" ref={filterRef}>
                    <div className="flex items-center gap-1">
                       <button 
                        onClick={() => { setFilterCategory('All'); setFilterLevel('All'); }}
                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${filterCategory === 'All' ? 'bg-[#F05A28] text-white shadow-md' : 'text-white/60 hover:text-white'}`}
                       >
                         All
                       </button>
                       {COURSE_STRUCTURE.map(cat => (
                         <button 
                          key={cat.id}
                          onClick={() => { setFilterCategory(cat.id); setFilterLevel('All'); setIsFilterDropdownOpen(true); }}
                          className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${filterCategory === cat.id ? 'bg-[#304B9E] border border-white/20 text-white shadow-lg' : 'text-white/60 hover:text-white'}`}
                         >
                           {cat.label} {filterCategory === cat.id && <ChevronDown size={12} strokeWidth={4} />}
                         </button>
                       ))}
                    </div>

                    {isFilterDropdownOpen && filterCategory !== 'All' && (
                       <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-[2rem] shadow-2xl border-2 border-slate-100 p-6 z-[200] animate-in fade-in slide-in-from-top-2 duration-300 grid grid-cols-2 md:grid-cols-4 gap-3">
                          <button 
                            onClick={() => { setFilterLevel('All'); setIsFilterDropdownOpen(false); }}
                            className={`p-4 rounded-2xl border-2 transition-all font-black text-[10px] uppercase ${filterLevel === 'All' ? 'bg-[#304B9E] text-white border-[#304B9E]' : 'bg-slate-50 border-transparent text-slate-400 hover:border-[#304B9E]'}`}
                          >
                             Show All Levels
                          </button>
                          {activeLevels.map(lvl => (
                            <button 
                              key={lvl}
                              onClick={() => { setFilterLevel(lvl); setIsFilterDropdownOpen(false); }}
                              className={`p-4 rounded-2xl border-2 transition-all font-black text-[10px] uppercase flex items-center justify-between ${filterLevel === lvl ? 'bg-[#F05A28] text-white border-[#F05A28] shadow-lg' : 'bg-slate-50 border-transparent text-slate-400 hover:border-[#304B9E]'}`}
                            >
                               {lvl} {filterLevel === lvl && <Check size={14} strokeWidth={4} />}
                            </button>
                          ))}
                       </div>
                    )}
                 </div>

                 <div className="relative flex items-center gap-3 bg-white/5 px-6 py-3.5 rounded-2xl border border-white/10 backdrop-blur-md">
                    <Search className="text-white/40" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search node..." 
                      className="bg-transparent text-white font-black text-[11px] uppercase outline-none placeholder:text-white/20 w-32 md:w-48"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
              </div>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide pb-20 px-2">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {/* Create Card */}
              <div 
                onClick={handleCreateNewCourse}
                className="aspect-[4/5] bg-white rounded-[3.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center gap-6 group cursor-pointer hover:border-[#F05A28] hover:bg-orange-50/30 transition-all duration-500 shadow-sm hover:shadow-2xl"
              >
                 <div className="p-8 bg-slate-50 text-slate-300 rounded-full group-hover:bg-[#F05A28] group-hover:text-white transition-all shadow-inner group-hover:rotate-90 group-hover:scale-110">
                    <Plus size={56} strokeWidth={3} />
                 </div>
                 <div className="text-center px-6">
                    <h4 className="text-base font-black text-slate-400 group-hover:text-[#304B9E] uppercase tracking-[0.2em] transition-colors leading-tight">Create New Hub</h4>
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-2">Initialize Curriculum Node</p>
                 </div>
              </div>

              {filteredCourses.map((course) => (
                <div 
                  key={course.id}
                  onClick={() => setActiveCourseId(course.id)}
                  className="bg-white rounded-[3.5rem] overflow-hidden shadow-xl border-2 border-slate-50 hover:border-[#304B9E]/20 transition-all hover:shadow-2xl group cursor-pointer relative flex flex-col animate-in zoom-in duration-500"
                >
                   <div className="aspect-video relative overflow-hidden shrink-0">
                      <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4000ms]" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#304B9E]/90 to-transparent opacity-70 group-hover:opacity-40 transition-opacity"></div>
                      <div className="absolute top-6 left-6 flex flex-col gap-2">
                         <span className="px-4 py-1 bg-white/90 backdrop-blur-md text-[#F05A28] text-[9px] font-black uppercase rounded-lg border border-white/20 tracking-widest shadow-lg">{course.category}</span>
                         {course.subCategory && <span className="px-3 py-1 bg-[#F05A28] text-white text-[8px] font-black uppercase rounded-lg shadow-sm w-fit">{course.subCategory}</span>}
                      </div>
                   </div>
                   <div className="p-8 flex-1 flex flex-col">
                      <h4 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-tight group-hover:text-[#F05A28] transition-colors mb-3">{course.name}</h4>
                      <div className="flex items-center gap-6 mb-6">
                         <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#304B9E] flex items-center justify-center shadow-sm"><Layers size={16} strokeWidth={3} /></div>
                            <div className="flex flex-col">
                               <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Syllabus</span>
                               <span className="text-[10px] font-black text-[#304B9E] uppercase">{course.modules.length} Nodes</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F05A28] flex items-center justify-center shadow-sm"><Target size={16} strokeWidth={3} /></div>
                            <div className="flex flex-col">
                               <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Level</span>
                               <span className="text-[10px] font-black text-[#304B9E] uppercase">{course.level}</span>
                            </div>
                         </div>
                      </div>
                      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Certified Node</span>
                         </div>
                         <button className="p-3 bg-slate-50 text-[#304B9E] rounded-2xl group-hover:bg-[#304B9E] group-hover:text-white transition-all shadow-md active:scale-90">
                            <Edit3 size={18} strokeWidth={3} />
                         </button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  }

  /**
   * VIEW: ARCHITECT WORKSPACE
   */
  return (
    <div className="h-full flex flex-col bg-[#F8FAFC] overflow-hidden animate-in fade-in duration-500 font-sans">
      <div className="h-20 px-8 bg-white border-b-2 border-slate-100 flex items-center justify-between shrink-0 shadow-sm z-[60]">
        <div className="flex items-center gap-6">
          <button onClick={() => setActiveCourseId(null)} className="p-3 bg-slate-50 text-slate-400 hover:text-[#304B9E] rounded-2xl border-2 border-slate-100 transition-all active:scale-90 shadow-sm" title="Back to Catalog">
            <ArrowLeft size={20} strokeWidth={4} />
          </button>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-[#304B9E] text-white flex items-center justify-center shadow-lg border-b-4 border-black/10">
                <Settings2 size={24} />
             </div>
             <div className="flex items-center gap-3">
                <h2 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Curriculum Studio</h2>
                <div className="relative">
                   <select 
                     value={activeCourseId}
                     onChange={(e) => { setActiveCourseId(e.target.value); }}
                     className="bg-indigo-50 pl-4 pr-10 py-2 rounded-xl border border-indigo-100 font-black text-[#304B9E] text-[11px] uppercase appearance-none cursor-pointer outline-none focus:ring-4 ring-indigo-100 transition-all"
                   >
                      {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                   </select>
                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#304B9E]/60 pointer-events-none" size={14} strokeWidth={4} />
                </div>
             </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button onClick={() => alert('Registry synchronized with global node.')} className="px-10 py-3.5 bg-[#304B9E] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 hover:bg-[#00a651] transition-all active:scale-95 border-b-6 border-black/10 flex items-center gap-3">
            <Save size={18} strokeWidth={3} /> Commit Changes
           </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-[380px] bg-white border-r-2 border-slate-100 flex flex-col shrink-0 relative z-20 shadow-[8px_0_24px_rgba(0,0,0,0.02)]">
           <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-[11px] font-black text-[#304B9E] uppercase tracking-widest flex items-center gap-2">
                 <Layers size={18} className="text-[#F05A28]" strokeWidth={3} /> Syllabus Map
              </h3>
              <button onClick={addModule} className="p-2.5 bg-slate-50 text-[#F05A28] hover:bg-[#F05A28] hover:text-white rounded-xl transition-all shadow-sm active:scale-90 border border-slate-100 group" title="Add Unit"><Plus size={20} strokeWidth={4} className="group-hover:rotate-90 transition-transform" /></button>
           </div>
           <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-3">
              <button onClick={() => setSelectedNode({ type: 'course', id: activeCourseId })} className={`w-full flex items-center gap-4 p-5 rounded-[1.75rem] border-2 transition-all group ${selectedNode?.type === 'course' ? 'bg-[#304B9E] border-[#304B9E] text-white shadow-xl scale-[1.02]' : 'bg-white border-slate-50 text-slate-500 hover:bg-slate-50 hover:border-slate-100'}`}>
                <div className={`p-2.5 rounded-xl transition-colors ${selectedNode?.type === 'course' ? 'bg-white/10' : 'bg-slate-50 text-slate-300'}`}><BookMarked size={22} strokeWidth={3} /></div>
                <div className="text-left min-w-0"><p className="text-[10px] font-black uppercase tracking-widest leading-none">Global Metadata</p><p className={`text-[7px] font-black uppercase mt-1.5 truncate ${selectedNode?.type === 'course' ? 'text-white/40' : 'text-slate-300'}`}>Node Definition</p></div>
              </button>
              <div className="h-px bg-slate-100 mx-4 my-6" />
              <div className="space-y-4 pb-10">
                 {currentCourse?.modules.map((mod, mIdx) => (
                   <div key={mod.id} className="space-y-2 animate-in fade-in duration-300">
                      <div className={`group flex items-center justify-between p-4 rounded-[1.5rem] border-2 transition-all cursor-pointer ${selectedNode?.type === 'module' && selectedNode.id === mod.id ? 'bg-orange-50 border-[#F05A28] shadow-md' : 'bg-slate-50 border-transparent hover:border-slate-200'}`} onClick={() => setSelectedNode({ type: 'module', id: mod.id })}>
                         <div className="flex items-center gap-3 min-w-0">
                            <button onClick={(e) => { e.stopPropagation(); const next = new Set(expandedModules); if(next.has(mod.id)) next.delete(mod.id); else next.add(mod.id); setExpandedModules(next); }} className={`p-1 rounded-lg transition-transform ${expandedModules.has(mod.id) ? 'rotate-0' : '-rotate-90'} ${selectedNode?.id === mod.id ? 'text-[#F05A28]' : 'text-slate-400'}`}><ChevronDown size={16} strokeWidth={4} /></button>
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-[10px] transition-colors ${selectedNode?.id === mod.id ? 'bg-[#F05A28] text-white' : 'bg-white text-slate-300 shadow-inner'}`}>{mIdx + 1}</div>
                            <span className={`text-[10px] font-black uppercase tracking-tight truncate ${selectedNode?.id === mod.id ? 'text-[#304B9E]' : 'text-slate-400'}`}>{mod.title}</span>
                         </div>
                         <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                            <button onClick={(e) => { e.stopPropagation(); reorderNode('module', mod.id, 'up'); }} className="p-1 text-slate-300 hover:text-[#304B9E] transition-all"><ArrowUp size={14}/></button>
                            <button onClick={(e) => { e.stopPropagation(); deleteNode('module', mod.id); }} className="p-1 text-slate-300 hover:text-red-500 transition-all"><Trash2 size={14}/></button>
                         </div>
                      </div>
                      {expandedModules.has(mod.id) && (
                         <div className="ml-8 pl-6 border-l-2 border-dashed border-slate-100 space-y-4 py-4 animate-in slide-in-from-top-1">
                            {/* Content Nodes */}
                            <div className="space-y-1.5">
                               <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest px-2 mb-2">Learning activities</p>
                               {mod.lessons.filter(l => ['text', 'video', 'pdf'].includes(l.type)).map((task) => {
                                   const Icon = (TASK_TYPES.find(t => t.value === task.type) || TASK_TYPES[0]).icon;
                                   return (
                                     <div key={task.id} onClick={() => setSelectedNode({ type: 'task', id: task.id, modId: mod.id })} className={`group flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer ${selectedNode?.id === task.id ? 'bg-white border-blue-500 shadow-xl scale-[1.03] z-10' : 'bg-white border-transparent text-slate-400 hover:bg-slate-50 hover:border-slate-100'}`}>
                                       <div className="flex items-center gap-3 min-w-0">
                                          <div className={`p-1.5 rounded-lg transition-colors ${selectedNode?.id === task.id ? 'bg-blue-50 text-blue-600 shadow-sm' : 'bg-slate-50 text-slate-300'}`}><Icon size={12} strokeWidth={3} /></div>
                                          <span className={`text-[9px] font-black uppercase tracking-tight truncate ${selectedNode?.id === task.id ? 'text-[#304B9E]' : 'text-slate-400'}`}>{task.title}</span>
                                       </div>
                                       <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                         <button onClick={(e) => { e.stopPropagation(); reorderNode('task', task.id, 'up', mod.id); }} className="p-1 text-slate-200 hover:text-[#304B9E]"><ArrowUp size={10}/></button>
                                         <button onClick={(e) => { e.stopPropagation(); deleteNode('task', task.id, mod.id); }} className="p-1 text-slate-200 hover:text-red-500 transition-all active:scale-90"><Trash2 size={10} strokeWidth={3}/></button>
                                       </div>
                                     </div>
                                   );
                               })}
                               <div className="flex gap-1 pt-1">
                                  <button onClick={() => addTask(mod.id, 'text')} className="flex-1 py-2 bg-slate-50 text-[7px] font-black uppercase text-slate-300 rounded-lg border border-dashed border-slate-100 hover:text-[#304B9E] hover:border-[#304B9E] transition-all">+ Text</button>
                                  <button onClick={() => addTask(mod.id, 'video')} className="flex-1 py-2 bg-slate-50 text-[7px] font-black uppercase text-slate-300 rounded-lg border border-dashed border-slate-100 hover:text-[#304B9E] hover:border-[#304B9E] transition-all">+ Video</button>
                                  <button onClick={() => addTask(mod.id, 'pdf')} className="flex-1 py-2 bg-slate-50 text-[7px] font-black uppercase text-slate-300 rounded-lg border border-dashed border-slate-100 hover:text-[#304B9E] hover:border-[#304B9E] transition-all">+ PDF</button>
                               </div>
                            </div>

                            {/* Assessment Nodes */}
                            <div className="space-y-1.5 pt-2">
                               <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest px-2 mb-2">moudle end test</p>
                               {mod.lessons.filter(l => !['text', 'video', 'pdf'].includes(l.type)).map((task) => {
                                   const Icon = (TASK_TYPES.find(t => t.value === task.type) || TASK_TYPES[3]).icon;
                                   return (
                                     <div key={task.id} onClick={() => setSelectedNode({ type: 'task', id: task.id, modId: mod.id })} className={`group flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer ${selectedNode?.id === task.id ? 'bg-white border-[#F05A28] shadow-xl scale-[1.03] z-10' : 'bg-white border-transparent text-slate-400 hover:bg-slate-50 hover:border-slate-100'}`}>
                                       <div className="flex items-center gap-3 min-w-0">
                                          <div className={`p-1.5 rounded-lg transition-colors ${selectedNode?.id === task.id ? 'bg-orange-50 text-[#F05A28] shadow-sm' : 'bg-slate-50 text-slate-300'}`}><Icon size={12} strokeWidth={3} /></div>
                                          <span className={`text-[9px] font-black uppercase tracking-tight truncate ${selectedNode?.id === task.id ? 'text-[#304B9E]' : 'text-slate-400'}`}>{task.title}</span>
                                       </div>
                                       <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                         <button onClick={(e) => { e.stopPropagation(); reorderNode('task', task.id, 'up', mod.id); }} className="p-1 text-slate-200 hover:text-[#304B9E]"><ArrowUp size={10}/></button>
                                         <button onClick={(e) => { e.stopPropagation(); deleteNode('task', task.id, mod.id); }} className="p-1 text-slate-200 hover:text-red-500 transition-all active:scale-90"><Trash2 size={10} strokeWidth={3}/></button>
                                       </div>
                                     </div>
                                   );
                               })}
                               <div className="grid grid-cols-2 gap-1 pt-1">
                                  <button onClick={() => addTask(mod.id, 'quiz')} className="py-2 bg-slate-50 text-[7px] font-black uppercase text-slate-300 rounded-lg border border-dashed border-slate-100 hover:text-[#F05A28] hover:border-[#F05A28] transition-all">+ Quiz</button>
                                  <button onClick={() => addTask(mod.id, 'matching')} className="py-2 bg-slate-50 text-[7px] font-black uppercase text-slate-300 rounded-lg border border-dashed border-slate-100 hover:text-[#F05A28] hover:border-[#F05A28] transition-all">+ Match</button>
                                  <button onClick={() => addTask(mod.id, 'question-answer')} className="py-2 bg-slate-50 text-[7px] font-black uppercase text-slate-300 rounded-lg border border-dashed border-slate-100 hover:text-[#F05A28] hover:border-[#F05A28] transition-all">+ Q&A</button>
                                  <button onClick={() => addTask(mod.id, 'assignment')} className="py-2 bg-slate-50 text-[7px] font-black uppercase text-slate-300 rounded-lg border border-dashed border-slate-100 hover:text-[#F05A28] hover:border-[#F05A28] transition-all">+ Task</button>
                               </div>
                            </div>
                         </div>
                      )}
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="flex-1 flex flex-col bg-[#F8FAFC] overflow-hidden">
           <div className="flex-1 overflow-y-auto scrollbar-hide p-10 lg:p-20">
              {selectedNode?.type === 'task' && selectedTask && (
                <div className="max-w-4xl mx-auto"><InteractionEditor lesson={selectedTask} onUpdate={(updates) => updateTask(selectedTask.id, selectedNode.modId!, updates)} /></div>
              )}
              {selectedNode?.type === 'module' && selectedModule && (
                <div className="max-w-3xl mx-auto space-y-12">
                   <h3 className="text-3xl font-black text-[#304B9E] uppercase tracking-tighter">Unit Settings</h3>
                   <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl space-y-10">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 block">Module Title</label>
                         <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] px-12 py-10 font-black text-[#304B9E] text-4xl outline-none focus:border-[#F05A28] uppercase shadow-inner" value={selectedModule.title} onChange={(e) => updateModule(selectedModule.id, { title: e.target.value })} />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 block">Module Description</label>
                         <textarea className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] px-12 py-8 font-bold text-[#304B9E] text-xl outline-none focus:border-[#F05A28] uppercase shadow-inner resize-none min-h-[200px]" value={selectedModule.description || ''} onChange={(e) => updateModule(selectedModule.id, { description: e.target.value })} placeholder="UNIT OVERVIEW..." />
                      </div>
                   </div>
                </div>
              )}
              {selectedNode?.type === 'course' && currentCourse && (
                <div className="max-w-5xl mx-auto space-y-12">
                   <h3 className="text-3xl font-black text-[#304B9E] uppercase tracking-tighter">Global Hub Metadata</h3>
                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                      <div className="lg:col-span-4 space-y-8">
                         <div className="aspect-[4/5] w-full rounded-[3.5rem] overflow-hidden border-[12px] border-white shadow-2xl relative group bg-slate-200">
                            <img src={currentCourse.thumbnail} className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-110" alt="Banner" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-[8px] font-black text-slate-300 uppercase tracking-widest ml-2">Thumbnail URL</label>
                           <input className="w-full bg-white border-2 border-slate-100 rounded-xl px-4 py-3 font-mono text-[9px] text-slate-400 outline-none focus:text-[#304B9E] transition-all" value={currentCourse.thumbnail} onChange={e => updateCourseMeta({ thumbnail: e.target.value })} />
                         </div>

                         {/* DYNAMIC CATEGORY & LEVEL SELECTORS - MOVED TO LEFT PANEL AS REQUESTED */}
                         <div className="p-6 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-lg space-y-6">
                            <div className="space-y-3">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 flex items-center gap-2">
                                  <Rocket size={14} className="text-[#F05A28]" /> Hub Category
                               </label>
                               <div className="relative">
                                  <select 
                                     value={currentCourse.category || 'DIGITAL KIDS'}
                                     onChange={(e) => {
                                        const catId = e.target.value;
                                        const cat = COURSE_STRUCTURE.find(c => c.id === catId);
                                        updateCourseMeta({ 
                                          category: catId, 
                                          subCategory: cat?.subCategories ? cat.subCategories[0].id : undefined,
                                          level: cat?.subCategories ? cat.subCategories[0].levels[0] : cat?.levels[0]
                                        });
                                     }}
                                     className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-5 py-3 font-black text-[#304B9E] text-[11px] uppercase appearance-none cursor-pointer focus:border-[#F05A28] outline-none transition-all shadow-inner"
                                  >
                                     {COURSE_STRUCTURE.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                                  </select>
                                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                               </div>
                            </div>

                            {currentCourse.category === 'Coding' && (
                               <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 flex items-center gap-2">
                                     <Library size={14} className="text-[#3b82f6]" /> Target Stream
                                  </label>
                                  <div className="relative">
                                     <select 
                                        value={currentCourse.subCategory || 'Primary'}
                                        onChange={(e) => {
                                           const subId = e.target.value;
                                           const cat = COURSE_STRUCTURE.find(c => c.id === 'Coding');
                                           const sub = cat?.subCategories?.find(s => s.id === subId);
                                           updateCourseMeta({ 
                                              subCategory: subId,
                                              level: sub?.levels[0]
                                           });
                                        }}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-5 py-3 font-black text-[#304B9E] text-[11px] uppercase appearance-none cursor-pointer focus:border-[#F05A28] outline-none transition-all shadow-inner"
                                     >
                                        <option value="Primary">Primary</option>
                                        <option value="Secondary">Secondary</option>
                                     </select>
                                     <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                                  </div>
                               </div>
                            )}

                            <div className="space-y-3">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 flex items-center gap-2">
                                  <Settings size={14} className="text-[#3b82f6]" /> Curriculum Level
                               </label>
                               <div className="relative">
                                  <select 
                                     value={currentCourse.level}
                                     onChange={(e) => updateCourseMeta({ level: e.target.value })}
                                     className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-5 py-3 font-black text-[#304B9E] text-[11px] uppercase appearance-none cursor-pointer focus:border-[#F05A28] outline-none transition-all shadow-inner"
                                  >
                                     {metadataLevels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                                  </select>
                                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="lg:col-span-8 space-y-10">
                         <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Official Program Name</label>
                            <input className="w-full bg-white border-2 border-slate-100 rounded-[2.5rem] px-10 py-8 font-black text-[#304B9E] text-4xl outline-none focus:border-[#F05A28] transition-all uppercase shadow-xl" value={currentCourse.name} onChange={e => updateCourseMeta({ name: e.target.value })} />
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Program Synopsis</label>
                            <textarea className="w-full bg-white border-2 border-slate-100 rounded-[3rem] px-10 py-10 font-bold text-slate-600 text-lg outline-none focus:border-[#304B9E] transition-all min-h-[350px] resize-none shadow-xl" value={currentCourse.description} onChange={e => updateCourseMeta({ description: e.target.value })} />
                         </div>
                      </div>
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};
