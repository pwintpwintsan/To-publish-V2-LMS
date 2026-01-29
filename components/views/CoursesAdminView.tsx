import React, { useState, useMemo } from 'react';
import { MOCK_COURSES } from '../../constants.tsx';
import { Course, Module, Lesson, UserRole, QuizQuestion } from '../../types.ts';
import { QuizBuilder } from './TestsView.tsx';
import { 
  ChevronLeft, 
  ChevronRight,
  Settings2,
  Search,
  Layers,
  Eye,
  X,
  Plus,
  PlusCircle,
  Trash2,
  Edit3,
  MonitorPlay,
  Zap,
  FileText,
  Save,
  Sparkles,
  ClipboardList,
  MessageSquare,
  Video,
  Info,
  CheckCircle2,
  AlertCircle,
  LayoutGrid,
  BookPlus,
  Power,
  ToggleLeft,
  ToggleRight,
  // Fix: Added ShieldCheck to imports
  ShieldCheck
} from 'lucide-react';

interface CoursesAdminViewProps {
  initialCourseId?: string | null;
  onExitEdit?: () => void;
  onPreviewCourse?: (id: string) => void;
  checkPermission?: (category: any, action: string) => boolean;
  activeRole?: UserRole;
}

const SwitchToggle = ({ active, onClick, label }: { active: boolean; onClick: () => void; label?: string }) => (
  <div className="flex items-center gap-2 group cursor-pointer" onClick={(e) => { e.stopPropagation(); onClick(); }}>
    {label && <span className={`text-[8px] font-black uppercase tracking-widest ${active ? 'text-[#00a651]' : 'text-slate-400'}`}>{label}: {active ? 'ON' : 'OFF'}</span>}
    <div 
      className={`w-10 h-5 rounded-full relative transition-all duration-300 shadow-inner overflow-hidden ${active ? 'bg-[#00a651]' : 'bg-slate-300'}`}
    >
      <div 
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${active ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </div>
  </div>
);

/**
 * Modal for creating a brand new course from scratch
 */
const CreateCourseModal = ({ onClose, onSave }: { onClose: () => void, onSave: (data: Partial<Course>) => void }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Standard Curriculum');

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] w-full max-w-md shadow-2xl border-t-[12px] border-[#F05A28] p-10 flex flex-col gap-8 animate-in zoom-in-95 duration-300">
        <div className="text-center">
           <div className="w-16 h-16 bg-orange-50 text-[#F05A28] rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-inner border-2 border-orange-100 rotate-3">
              <BookPlus size={32} strokeWidth={3} />
           </div>
           <h3 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Initialize Program</h3>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">New Global Curriculum Registry</p>
        </div>

        <div className="space-y-4">
           <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Program Title</label>
              <input 
                autoFocus
                type="text" 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-[#304B9E] text-base outline-none focus:border-[#F05A28] transition-all uppercase shadow-inner"
                placeholder="e.g. ROBOTICS LEVEL 1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
           </div>
           <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Curriculum Category</label>
              <select 
                 className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-[#304B9E] text-xs outline-none focus:border-[#F05A28] transition-all appearance-none cursor-pointer"
                 value={category}
                 onChange={(e) => setCategory(e.target.value)}
              >
                 <option>Standard Curriculum</option>
                 <option>Robotics</option>
                 <option>Logic & Coding</option>
                 <option>Digital Arts</option>
              </select>
           </div>
        </div>

        <div className="flex gap-4 pt-2">
           <button onClick={onClose} className="flex-1 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
           <button 
             onClick={() => onSave({ name, category, modules: [], thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800' })}
             disabled={!name}
             className="flex-[2] py-4 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#00a651] transition-all border-b-4 border-black/10 disabled:bg-slate-200 disabled:cursor-not-allowed"
           >
              Create Master Node
           </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Master Course Editor Modal
 */
const CourseEditorModal = ({ 
  course, 
  onClose, 
  onSave 
}: { 
  course: Course, 
  onClose: () => void, 
  onSave: (updatedCourse: Course) => void 
}) => {
  const [formData, setFormData] = useState<Course>({ ...course });
  const [editingTask, setEditingTask] = useState<{ lesson: Lesson, moduleId: string } | null>(null);

  const handleUpdateCourseInfo = (field: keyof Course, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleToggleModule = (modId: string) => {
    const newModules = formData.modules.map(m => m.id === modId ? { ...m, isPublished: !m.isPublished } : m);
    setFormData({ ...formData, modules: newModules });
  };

  const handleToggleTask = (modId: string, taskId: string) => {
    const newModules = formData.modules.map(m => {
      if (m.id !== modId) return m;
      return {
        ...m,
        lessons: m.lessons.map(l => l.id === taskId ? { ...l, isPublished: !l.isPublished } : l)
      };
    });
    setFormData({ ...formData, modules: newModules });
  };

  const handleAddModule = () => {
    const newModule: Module = {
      id: 'mod-' + Date.now(),
      title: 'NEW MODULE',
      isPublished: true,
      lessons: []
    };
    setFormData({ ...formData, modules: [...formData.modules, newModule] });
  };

  const handleDeleteModule = (modId: string) => {
    if (confirm("Delete this module and all tasks inside?")) {
      setFormData({ ...formData, modules: formData.modules.filter(m => m.id !== modId) });
    }
  };

  const handleAddTask = (modId: string) => {
    const newTask: Lesson = {
      id: 'task-' + Date.now(),
      title: 'NEW TASK',
      type: 'text',
      isPublished: true
    };
    const newModules = formData.modules.map(m => m.id === modId ? { ...m, lessons: [...m.lessons, newTask] } : m);
    setFormData({ ...formData, modules: newModules });
  };

  const handleDeleteTask = (modId: string, taskId: string) => {
    const newModules = formData.modules.map(m => m.id === modId ? { ...m, lessons: m.lessons.filter(l => l.id !== taskId) } : m);
    setFormData({ ...formData, modules: newModules });
  };

  const handleSaveTaskPayload = (updatedLesson: Lesson) => {
    if (!editingTask) return;
    const newModules = formData.modules.map(m => {
      if (m.id !== editingTask.moduleId) return m;
      return {
        ...m,
        lessons: m.lessons.map(l => l.id === updatedLesson.id ? updatedLesson : l)
      };
    });
    setFormData({ ...formData, modules: newModules });
    setEditingTask(null);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] w-full max-w-6xl shadow-2xl border-t-[12px] border-[#F05A28] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 relative max-h-[90vh]">
        
        {editingTask && (
          <TaskSubEditor 
            lesson={editingTask.lesson} 
            onClose={() => setEditingTask(null)} 
            onSave={handleSaveTaskPayload} 
          />
        )}

        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-[#304B9E] text-white rounded-2xl shadow-xl rotate-3">
              <Settings2 size={24} strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Curriculum Architect</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Manage Global Modules & Node Access</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 bg-white text-slate-300 hover:text-[#ec2027] transition-all rounded-xl shadow-sm border border-slate-100 active:scale-90">
            <X size={24} strokeWidth={4} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-10 scrollbar-hide space-y-12">
          
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-l-4 border-[#F05A28] pl-4">
              <h3 className="text-sm font-black text-[#304B9E] uppercase tracking-widest">General Identity</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Course Title</label>
                <input 
                  type="text"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-[#304B9E] text-base outline-none focus:border-[#F05A28] transition-all uppercase shadow-inner"
                  value={formData.name}
                  onChange={(e) => handleUpdateCourseInfo('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Global Description</label>
                <textarea 
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-600 text-xs outline-none focus:border-[#F05A28] transition-all shadow-inner h-full min-h-[60px] resize-none"
                  value={formData.description}
                  onChange={(e) => handleUpdateCourseInfo('description', e.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="space-y-6">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 border-l-4 border-[#3b82f6] pl-4">
                  <h3 className="text-sm font-black text-[#304B9E] uppercase tracking-widest">Syllabus Matrix</h3>
                </div>
                <button 
                  onClick={handleAddModule}
                  className="px-6 py-3 bg-[#F05A28] text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg hover:bg-[#304B9E] transition-all flex items-center gap-2 border-b-4 border-black/10 active:scale-95"
                >
                   <PlusCircle size={16} strokeWidth={3} /> Add Module
                </button>
             </div>

             <div className="space-y-10">
                {formData.modules.map((mod, mIdx) => (
                  <div key={mod.id} className={`bg-slate-50/50 rounded-[2.5rem] p-8 border-2 transition-all relative overflow-hidden group ${mod.isPublished !== false ? 'border-slate-100' : 'border-red-100 bg-red-50/10'}`}>
                     <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-5">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg border-b-4 border-black/10 transition-all ${mod.isPublished !== false ? 'bg-[#304B9E] text-white' : 'bg-slate-200 text-slate-400 grayscale'}`}>
                            {mIdx + 1}
                          </div>
                          <div className="flex flex-col">
                             <input 
                               className="bg-transparent font-black text-lg text-[#304B9E] uppercase outline-none focus:text-[#F05A28] transition-colors"
                               value={mod.title}
                               onChange={(e) => {
                                 const next = formData.modules.map(m => m.id === mod.id ? { ...m, title: e.target.value } : m);
                                 setFormData({ ...formData, modules: next });
                               }}
                             />
                             <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-1">Status: {mod.isPublished !== false ? 'Accessible' : 'Restricted'}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                           <SwitchToggle 
                              active={mod.isPublished !== false} 
                              onClick={() => handleToggleModule(mod.id)} 
                              label="Access"
                           />
                           <button onClick={() => handleDeleteModule(mod.id)} className="p-2 text-slate-300 hover:text-[#ec2027] transition-all"><Trash2 size={18} /></button>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mod.lessons.map((lesson, lIdx) => (
                          <div key={lesson.id} className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between group/card ${lesson.isPublished !== false ? 'bg-white border-slate-50 shadow-md' : 'bg-slate-50 border-slate-100 opacity-60 grayscale'}`}>
                             <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                   <div className={`p-2.5 rounded-xl text-white shadow-sm rotate-3 ${
                                     lesson.type === 'video' ? 'bg-indigo-500' :
                                     lesson.type === 'quiz' ? 'bg-[#F05A28]' :
                                     lesson.type === 'assignment' ? 'bg-emerald-500' : 'bg-slate-400'
                                   }`}>
                                      {lesson.type === 'video' ? <MonitorPlay size={16} /> :
                                       lesson.type === 'quiz' ? <Zap size={16} fill="currentColor" /> :
                                       lesson.type === 'assignment' ? <ClipboardList size={16} /> : <FileText size={16} />}
                                   </div>
                                   <div className="min-w-0">
                                      <input 
                                        className="bg-transparent text-[11px] font-black uppercase tracking-tight truncate outline-none w-full focus:text-[#F05A28]"
                                        value={lesson.title}
                                        onChange={(e) => {
                                          const next = formData.modules.map(m => m.id === mod.id ? {
                                            ...m, lessons: m.lessons.map(l => l.id === lesson.id ? { ...l, title: e.target.value } : l)
                                          } : m);
                                          setFormData({ ...formData, modules: next });
                                        }}
                                      />
                                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">{lesson.type}</p>
                                   </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <SwitchToggle 
                                    active={lesson.isPublished !== false} 
                                    onClick={() => handleToggleTask(mod.id, lesson.id)} 
                                  />
                                  <button onClick={() => handleDeleteTask(mod.id, lesson.id)} className="p-1 text-slate-200 hover:text-red-500 transition-colors opacity-0 group-hover/card:opacity-100"><X size={14} strokeWidth={4} /></button>
                                </div>
                             </div>

                             <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                                <button 
                                  onClick={() => setEditingTask({ lesson, moduleId: mod.id })}
                                  className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#304B9E] hover:text-[#F05A28] transition-colors"
                                >
                                   Edit Node <ChevronRight size={14} strokeWidth={3} />
                                </button>
                             </div>
                          </div>
                        ))}
                        <button 
                          onClick={() => handleAddTask(mod.id)}
                          className="p-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-300 hover:border-[#304B9E] hover:text-[#304B9E] transition-all group/add"
                        >
                           <Plus size={24} strokeWidth={3} className="group-hover/add:rotate-90 transition-transform" />
                           <span className="text-[9px] font-black uppercase tracking-widest">New Task</span>
                        </button>
                     </div>
                  </div>
                ))}
             </div>
          </section>
        </div>

        <div className="p-8 border-t border-slate-100 bg-white shrink-0 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-[#00a651]" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight max-w-md">
                 Deployed changes propagate to all associated regional centers instantly.
              </p>
           </div>
           <div className="flex gap-4">
              <button onClick={onClose} className="px-8 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest">Cancel</button>
              <button 
                onClick={() => onSave(formData)}
                className="px-10 py-4 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#00a651] transition-all border-b-4 border-black/10 active:scale-95 flex items-center gap-2"
              >
                <Save size={18} strokeWidth={3} /> Deploy Program
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Task Sub-Editor Overlay
 */
const TaskSubEditor = ({ 
  lesson, 
  onClose, 
  onSave 
}: { 
  lesson: Lesson, 
  onClose: () => void, 
  onSave: (updatedLesson: Lesson) => void 
}) => {
  const [data, setData] = useState<Lesson>({ 
    ...lesson,
    quiz: lesson.quiz || [],
    assignmentInstructions: lesson.assignmentInstructions || '',
    content: lesson.content || ''
  });

  return (
    <div className="absolute inset-0 z-[400] flex items-center justify-center p-8 md:p-16 bg-[#304B9E]/95 animate-in fade-in duration-300">
       <div className="bg-white rounded-[3rem] w-full max-w-4xl shadow-2xl border-t-[10px] border-[#F05A28] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300 max-h-[85vh]">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
             <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl text-white shadow-md rotate-2 ${
                   lesson.type === 'video' ? 'bg-indigo-500' :
                   lesson.type === 'quiz' ? 'bg-[#F05A28]' :
                   lesson.type === 'assignment' ? 'bg-emerald-500' : 'bg-slate-400'
                }`}>
                   {lesson.type === 'video' ? <MonitorPlay size={24} /> :
                    lesson.type === 'quiz' ? <Zap size={24} fill="currentColor" /> :
                    lesson.type === 'assignment' ? <ClipboardList size={24} /> : <MessageSquare size={24} />}
                </div>
                <div>
                   <h3 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Task Architect</h3>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Configuring: {lesson.type} node</p>
                </div>
             </div>
             <button onClick={onClose} className="p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-white rounded-xl">
                <X size={20} strokeWidth={4} />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto p-10 scrollbar-hide space-y-10">
             <div className="space-y-4">
                <label className="text-[10px] font-black text-[#F05A28] uppercase tracking-[0.2em] ml-1">Task Title</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-[#304B9E] text-base outline-none focus:border-[#F05A28] transition-all uppercase shadow-inner"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                />
             </div>

             <div className="h-px bg-slate-100 w-full"></div>

             {lesson.type === 'video' && (
                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <MonitorPlay size={14} className="text-[#3b82f6]" /> Video Stream URL (Embed Source)
                   </label>
                   <input 
                     type="text" 
                     className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 font-bold text-slate-600 text-xs outline-none focus:border-[#F05A28] transition-all shadow-inner"
                     placeholder="https://www.youtube.com/embed/..."
                     value={data.content || ''}
                     onChange={(e) => setData({ ...data, content: e.target.value })}
                   />
                </div>
             )}

             {lesson.type === 'quiz' && (
                <div className="animate-in slide-in-from-top-4 flex flex-col h-full">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-6 flex items-center gap-2">
                      <Zap size={14} className="text-[#F05A28]" fill="currentColor" /> Assessment Configuration
                   </label>
                   <div className="flex-1 min-h-[400px] border-2 border-dashed border-slate-200 rounded-[2.5rem] bg-slate-50/50 p-6 overflow-y-auto scrollbar-hide">
                      <QuizBuilder 
                        title={data.title} 
                        initialQuestions={data.quiz || []} 
                        onSave={(qs) => setData({...data, quiz: qs})} 
                        onBack={() => {}} 
                        compact={true}
                      />
                   </div>
                </div>
             )}

             {lesson.type === 'assignment' && (
                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <ClipboardList size={14} className="text-emerald-500" /> Workshop Task Instructions
                   </label>
                   <textarea 
                     className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-6 font-bold text-slate-600 text-sm outline-none focus:border-[#F05A28] transition-all shadow-inner min-h-[200px] resize-none"
                     placeholder="Instructions for learner upload..."
                     value={data.assignmentInstructions || ''}
                     onChange={(e) => setData({ ...data, assignmentInstructions: e.target.value })}
                   />
                </div>
             )}

             {lesson.type === 'text' && (
                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <FileText size={14} className="text-slate-400" /> Reading Content / Q&A Narrative
                   </label>
                   <textarea 
                     className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-6 font-bold text-slate-600 text-sm outline-none focus:border-[#F05A28] transition-all shadow-inner min-h-[200px] resize-none"
                     placeholder="Enter narrative content or Q&A body..."
                     value={data.content || ''}
                     onChange={(e) => setData({ ...data, content: e.target.value })}
                   />
                </div>
             )}
          </div>

          <div className="p-8 border-t border-slate-100 bg-white shrink-0 flex gap-4">
             <button onClick={onClose} className="flex-1 py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest">Discard</button>
             <button onClick={() => onSave(data)} className="flex-[2] py-5 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#00a651] transition-all flex items-center justify-center gap-2">
                <CheckCircle2 size={18} strokeWidth={3} /> Save Node Payload
             </button>
          </div>
       </div>
    </div>
  );
};

export const CoursesAdminView: React.FC<CoursesAdminViewProps> = ({ 
  initialCourseId, 
  onExitEdit, 
  onPreviewCourse,
  checkPermission,
  activeRole
}) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('ubook_courses_v3');
    return saved ? JSON.parse(saved) : MOCK_COURSES;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  const isMainAdmin = activeRole === UserRole.MAIN_CENTER;

  const filteredCourses = useMemo(() => 
    courses.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [courses, searchTerm]
  );

  const saveToRegistry = (updatedCourse: Course) => {
    const newCourses = courses.map(c => c.id === updatedCourse.id ? updatedCourse : c);
    setCourses(newCourses);
    localStorage.setItem('ubook_courses_v3', JSON.stringify(newCourses));
    setEditingCourse(null);
    alert(`Program "${updatedCourse.name}" updated globally.`);
  };

  const handleCreateCourse = (data: Partial<Course>) => {
    const newCourse: Course = {
      id: 'course-' + Date.now(),
      name: data.name || 'UNNAMED PROGRAM',
      category: data.category || 'Standard Curriculum',
      isPurchased: true,
      thumbnail: data.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      modules: [],
      ...data
    };
    const next = [newCourse, ...courses];
    setCourses(next);
    localStorage.setItem('ubook_courses_v3', JSON.stringify(next));
    setIsCreating(false);
    setEditingCourse(newCourse);
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in duration-500">
      
      {isCreating && (
        <CreateCourseModal onClose={() => setIsCreating(false)} onSave={handleCreateCourse} />
      )}

      {editingCourse && (
        <CourseEditorModal 
          course={editingCourse} 
          onClose={() => setEditingCourse(null)} 
          onSave={saveToRegistry} 
        />
      )}

      <div className="w-full bg-[#304B9E] rounded-[2rem] p-6 text-white shadow-xl border-b-[10px] border-[#F05A28] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-4 relative z-10">
           <div className="p-4 bg-[#F05A28] rounded-2xl text-white shadow-lg rotate-3 border-b-4 border-black/10">
             <Settings2 size={28} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-2xl md:text-3xl font-black leading-none tracking-tight uppercase">Syllabus <span className="text-white/60">Registry</span></h2>
             <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">U Book Store Master Architect</p>
           </div>
        </div>

        {isMainAdmin && (
          <button 
            onClick={() => setIsCreating(true)}
            className="px-8 py-4 bg-white text-[#304B9E] rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#F05A28] hover:text-white transition-all border-b-4 border-black/10 active:scale-95 flex items-center gap-3 relative z-10"
          >
             <Plus size={20} strokeWidth={4} /> Add New Program
          </button>
        )}
      </div>

      <div className="w-full bg-white p-3 md:p-4 rounded-[2rem] shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-4 flex-shrink-0">
        <div className="flex-1 flex items-center gap-4 bg-slate-50 px-6 py-3.5 rounded-2xl border border-slate-100 w-full group focus-within:border-[#F05A28] transition-all shadow-inner">
          <Search size={22} className="text-slate-400 group-focus-within:text-[#304B9E]" strokeWidth={3} />
          <input 
            type="text" 
            placeholder="Search programs by title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-base font-black text-[#304B9E] outline-none w-full placeholder:text-slate-300 uppercase"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-10 px-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-[2.5rem] p-6 shadow-md border-4 border-slate-50 hover:border-[#F05A28]/20 transition-all hover:shadow-xl group flex flex-col relative overflow-hidden">
                <div className="aspect-video w-full rounded-2xl overflow-hidden mb-6 relative shadow-lg">
                   <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                   <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[7px] font-black uppercase tracking-widest text-[#304B9E] border border-white">
                         {course.category}
                      </span>
                   </div>
                </div>
                
                <div className="flex-1 mb-6">
                  <h4 className="text-lg font-black text-[#304B9E] uppercase tracking-tight leading-tight mb-2 group-hover:text-[#F05A28] transition-colors">{course.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight line-clamp-2 leading-relaxed opacity-80">
                    {course.description || "Comprehensive syllabus for digital learners."}
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-2 pt-4 border-t-2 border-slate-50">
                   <button 
                     onClick={() => setEditingCourse(course)} 
                     className="flex-1 py-4 bg-[#304B9E] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#F05A28] transition-all flex items-center justify-center gap-2 shadow-md border-b-4 border-black/10 active:scale-95"
                   >
                     <Edit3 size={14} strokeWidth={3} /> Edit Course
                   </button>
                   <button 
                     onClick={() => onPreviewCourse?.(course.id)}
                     className="p-4 bg-slate-50 text-slate-300 rounded-2xl border border-slate-100 hover:bg-[#304B9E] hover:text-white transition-all active:scale-90 shadow-sm"
                   >
                      <Eye size={18} strokeWidth={3} />
                   </button>
                </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-between shrink-0">
         <div className="flex items-center gap-3">
            <CheckCircle2 size={16} className="text-[#00a651]" />
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">U Book Store Global Sync Active</p>
         </div>
         <p className="text-[9px] font-black text-[#304B9E] uppercase tracking-widest">Active Assets: {courses.length}</p>
      </div>
    </div>
  );
};