import React, { useState, useMemo } from 'react';
import { MOCK_COURSES } from '../../constants.tsx';
import { Course, Module, Lesson, UserRole, QuizQuestion } from '../../types.ts';
import { QuizBuilder } from './TestsView.tsx';
import { 
  ChevronRight,
  Settings2,
  Search,
  Layers,
  Eye,
  X,
  PlusCircle,
  Edit3,
  MonitorPlay,
  Zap,
  FileText,
  Save,
  ClipboardList,
  Info,
  CheckCircle2,
  LayoutGrid,
  BookPlus,
  ShieldCheck,
  Settings,
  PlusSquare,
  Lock,
  Plus,
  Trash2,
  Video,
  EyeOff,
  Image as ImageIcon,
  Clock,
  Target,
  FileSearch,
  CheckSquare,
  Type
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
    {label && <span className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-[#00a651]' : 'text-slate-400'}`}>{label}</span>}
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
 * Access Control Modal - Purely for toggling visibility
 */
const AccessControlModal = ({ 
  course, 
  onClose, 
  onUpdate 
}: { 
  course: Course, 
  onClose: () => void, 
  onUpdate: (updatedCourse: Course) => void 
}) => {
  const [formData, setFormData] = useState<Course>({ ...course });

  const toggleModule = (modId: string) => {
    const updated = {
      ...formData,
      modules: formData.modules.map(m => m.id === modId ? { ...m, isPublished: !m.isPublished } : m)
    };
    setFormData(updated);
  };

  const toggleTask = (modId: string, taskId: string) => {
    const updated = {
      ...formData,
      modules: formData.modules.map(m => {
        if (m.id !== modId) return m;
        return {
          ...m,
          lessons: m.lessons.map(l => l.id === taskId ? { ...l, isPublished: !l.isPublished } : l)
        };
      })
    };
    setFormData(updated);
  };

  const handleSave = () => {
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 md:p-8 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] w-full max-w-4xl shadow-2xl border-t-[12px] border-[#F05A28] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 relative max-h-[90vh]">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#304B9E] text-white rounded-2xl shadow-xl">
              <ShieldCheck size={28} strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Access Control</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Manage Visibility for {formData.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-white rounded-xl shadow-sm border border-slate-100">
            <X size={20} strokeWidth={4} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide space-y-6">
           <div className="bg-blue-50 p-6 rounded-3xl border border-indigo-100 flex items-start gap-4">
              <Info size={20} className="text-[#304B9E] shrink-0 mt-0.5" />
              <p className="text-[10px] font-bold text-slate-600 uppercase leading-relaxed">
                Toggling units <span className="text-[#ec2027]">OFF</span> will hide them from the learner's syllabus view across all hubs.
              </p>
           </div>
           <div className="space-y-6">
              {formData.modules.map((mod, mIdx) => (
                <div key={mod.id} className={`p-6 rounded-[2.5rem] border-2 transition-all relative overflow-hidden ${mod.isPublished !== false ? 'bg-white border-slate-100 shadow-md' : 'bg-slate-50 border-red-100 opacity-80'}`}>
                   <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-50">
                      <div className="flex items-center gap-4">
                         <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shadow-md ${mod.isPublished !== false ? 'bg-[#304B9E] text-[#F05A28]' : 'bg-slate-200 text-slate-400'}`}>
                            {mIdx + 1}
                         </div>
                         <h4 className={`text-sm font-black uppercase tracking-tight ${mod.isPublished !== false ? 'text-[#304B9E]' : 'text-slate-400'}`}>
                           {mod.title}
                         </h4>
                      </div>
                      <SwitchToggle active={mod.isPublished !== false} onClick={() => toggleModule(mod.id)} label="Module status" />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {mod.lessons.map((lesson) => (
                        <div key={lesson.id} className={`p-3 rounded-xl border-2 transition-all flex items-center justify-between ${lesson.isPublished !== false ? 'bg-white border-slate-50 shadow-sm' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
                           <div className="flex items-center gap-3 min-w-0">
                              <span className={`text-[10px] font-black uppercase tracking-tight truncate ${lesson.isPublished !== false ? 'text-[#304B9E]' : 'text-slate-400'}`}>{lesson.title}</span>
                           </div>
                           <SwitchToggle active={lesson.isPublished !== false} onClick={() => toggleTask(mod.id, lesson.id)} />
                        </div>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </div>
        <div className="p-8 border-t border-slate-100 bg-white flex gap-4">
           <button onClick={onClose} className="flex-1 py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95">Cancel</button>
           <button onClick={handleSave} className="flex-[2] py-5 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#00a651] transition-all border-b-4 border-black/10 active:scale-95 flex items-center justify-center gap-2">
              <Save size={18} strokeWidth={3} /> Save Visibility
           </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Task Content Editor - Specific fields for different task types
 */
const TaskEditorOverlay = ({ 
  lesson, 
  onClose, 
  onSave 
}: { 
  lesson: Lesson, 
  onClose: () => void, 
  onSave: (data: Lesson) => void 
}) => {
  const [data, setData] = useState<Lesson>({ ...lesson });

  return (
    <div className="absolute inset-0 z-[500] flex items-center justify-center p-8 bg-[#304B9E]/95 animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] w-full max-w-4xl shadow-2xl border-t-[10px] border-[#F05A28] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300 max-h-[90vh]">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
             <div className={`p-4 bg-[#F05A28] text-white rounded-2xl shadow-xl rotate-3 border-b-4 border-black/10`}>
               {lesson.type === 'video' ? <MonitorPlay size={28} /> : 
                lesson.type === 'quiz' ? <Zap size={28} fill="currentColor" /> : 
                lesson.type === 'assignment' ? <ClipboardList size={28} /> : <FileText size={28} />}
             </div>
             <div>
               <h3 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Task Architect</h3>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Configuring registry node: {lesson.type}</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-white rounded-xl shadow-sm border border-slate-100">
             <X size={24} strokeWidth={4} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 scrollbar-hide space-y-10">
           {/* Common Task Fields */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Task Display Title</label>
                 <input 
                   type="text" 
                   className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-[#304B9E] text-base outline-none focus:border-[#F05A28] transition-all uppercase shadow-inner"
                   value={data.title}
                   onChange={(e) => setData({ ...data, title: e.target.value })}
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Registry Component Type</label>
                 <select 
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-[#304B9E] text-xs outline-none focus:border-[#F05A28] transition-all appearance-none cursor-pointer"
                    value={data.type}
                    onChange={(e) => setData({ ...data, type: e.target.value as any })}
                 >
                    <option value="video">VIDEO CONTENT</option>
                    <option value="text">READING / TEXT</option>
                    <option value="assignment">WORKSHOP / ASSIGNMENT</option>
                    <option value="quiz">QUIZ / ASSESSMENT</option>
                 </select>
              </div>
           </div>

           {/* Type Specific Payload Fields */}
           <div className="border-t border-slate-100 pt-10">
             <h4 className="text-[9px] font-black text-[#F05A28] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Target size={14} /> Functional payload
             </h4>

             {data.type === 'video' && (
                <div className="space-y-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Video Stream URL</label>
                      <input 
                        type="text" 
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-600 text-sm outline-none focus:border-[#F05A28] transition-all"
                        placeholder="https://vimeo.com/..."
                        value={data.content || ''}
                        onChange={(e) => setData({ ...data, content: e.target.value })}
                      />
                   </div>
                   <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-start gap-4">
                      <MonitorPlay className="text-[#304B9E] shrink-0" size={20} />
                      <p className="text-[11px] font-bold text-slate-600 uppercase leading-relaxed">
                         Ensure the URL is a direct stream or embeddable link for the integrated hub player.
                      </p>
                   </div>
                </div>
             )}

             {data.type === 'text' && (
                <div className="space-y-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Curriculum Narrative Content</label>
                      <textarea 
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-8 py-8 font-bold text-slate-600 text-sm outline-none focus:border-[#F05A28] transition-all shadow-inner min-h-[300px] resize-none"
                        placeholder="Type the reading material here..."
                        value={data.content || ''}
                        onChange={(e) => setData({ ...data, content: e.target.value })}
                      />
                   </div>
                </div>
             )}

             {data.type === 'assignment' && (
                <div className="space-y-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Workshop / Practical Instructions</label>
                      <textarea 
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-8 py-8 font-bold text-slate-600 text-sm outline-none focus:border-[#F05A28] transition-all shadow-inner min-h-[200px] resize-none"
                        value={data.assignmentInstructions || ''}
                        onChange={(e) => setData({ ...data, assignmentInstructions: e.target.value })}
                      />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Character Limit</label>
                         <input 
                            type="number" 
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-black text-[#304B9E] text-xs outline-none focus:border-[#F05A28]"
                            value={data.characterLimit || 1000}
                            onChange={(e) => setData({...data, characterLimit: parseInt(e.target.value)})}
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Auto-Pass on Upload</label>
                         <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-xl border-2 border-slate-100">
                            <SwitchToggle active={data.autoPassOnUpload || false} onClick={() => setData({...data, autoPassOnUpload: !data.autoPassOnUpload})} />
                            <span className="text-[10px] font-black text-[#304B9E] uppercase tracking-widest">{data.autoPassOnUpload ? 'Enabled' : 'Disabled'}</span>
                         </div>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Registry Model Answer</label>
                      <textarea 
                        className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-6 font-bold text-slate-400 text-xs outline-none focus:border-[#00a651] transition-all shadow-sm italic"
                        placeholder="Expected answer for teacher grading..."
                        value={data.modelAnswer || ''}
                        onChange={(e) => setData({ ...data, modelAnswer: e.target.value })}
                      />
                   </div>
                </div>
             )}

             {data.type === 'quiz' && (
                <div className="flex flex-col h-[600px] border-2 border-slate-50 rounded-[2.5rem] overflow-hidden">
                   <QuizBuilder 
                     compact={true}
                     title={data.title}
                     initialQuestions={data.quiz || []}
                     onSave={(qs) => setData({ ...data, quiz: qs })}
                     onBack={() => {}}
                   />
                </div>
             )}
           </div>
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50 shrink-0 flex gap-4">
           <button onClick={onClose} className="flex-1 py-5 bg-white text-slate-400 border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95">Discard</button>
           <button onClick={() => onSave(data)} className="flex-[2] py-5 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#00a651] transition-all border-b-6 border-black/10 active:scale-95 flex items-center justify-center gap-2">
              <CheckCircle2 size={18} strokeWidth={3} /> Commit payload
           </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Main Full Course Editor Modal
 */
const FullCourseEditorModal = ({ 
  course, 
  onClose, 
  onSave 
}: { 
  course: Course, 
  onClose: () => void, 
  onSave: (updatedCourse: Course) => void 
}) => {
  const [formData, setFormData] = useState<Course>({ ...course });
  const [activeTaskEditor, setActiveTaskEditor] = useState<{ lesson: Lesson, modId: string } | null>(null);

  const addModule = () => {
    const newMod: Module = { id: 'mod-' + Date.now(), title: 'NEW MODULE NODE', lessons: [], isPublished: true };
    setFormData({ ...formData, modules: [...formData.modules, newMod] });
  };

  const deleteModule = (id: string) => {
    if (confirm("Permanently remove this module registry? All associated tasks will be lost.")) {
      setFormData({ ...formData, modules: formData.modules.filter(m => m.id !== id) });
    }
  };

  const addTask = (modId: string, type: Lesson['type']) => {
    const newTask: Lesson = { id: 'task-' + Date.now(), title: `NEW ${type.toUpperCase()} TASK`, type, isPublished: true };
    setFormData({
      ...formData,
      modules: formData.modules.map(m => m.id === modId ? { ...m, lessons: [...m.lessons, newTask] } : m)
    });
  };

  const deleteTask = (modId: string, taskId: string) => {
    setFormData({
      ...formData,
      modules: formData.modules.map(m => m.id === modId ? { ...m, lessons: m.lessons.filter(l => l.id !== taskId) } : m)
    });
  };

  const saveTaskDetails = (updatedLesson: Lesson) => {
    if (!activeTaskEditor) return;
    setFormData({
      ...formData,
      modules: formData.modules.map(m => m.id === activeTaskEditor.modId ? {
        ...m, lessons: m.lessons.map(l => l.id === updatedLesson.id ? updatedLesson : l)
      } : m)
    });
    setActiveTaskEditor(null);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 bg-[#304B9E]/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] w-full max-w-6xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-t-[12px] border-[#F05A28] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 relative max-h-[95vh]">
        
        {activeTaskEditor && (
          <TaskEditorOverlay 
            lesson={activeTaskEditor.lesson} 
            onClose={() => setActiveTaskEditor(null)} 
            onSave={saveTaskDetails} 
          />
        )}

        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0 relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Settings2 size={120} />
          </div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="p-4 bg-[#304B9E] text-white rounded-2xl shadow-2xl rotate-3 border-b-4 border-black/10">
              <Edit3 size={32} strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Course Architect</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Full Global registry management</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-white text-slate-300 hover:text-[#ec2027] transition-all rounded-2xl shadow-sm border-2 border-slate-50 active:scale-90 relative z-10">
            <X size={28} strokeWidth={4} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 scrollbar-hide space-y-16">
           {/* Section 1: Course Identity */}
           <section className="space-y-8">
              <h3 className="text-[11px] font-black text-[#F05A28] uppercase tracking-[0.4em] border-l-4 border-[#F05A28] pl-6 flex items-center gap-3">
                 <ImageIcon size={18} /> Identity & Metadata
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                 <div className="md:col-span-4 space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Course Banner URL</label>
                    <div className="aspect-video w-full rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-xl group relative">
                       <img src={formData.thumbnail} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Preview" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white border border-white/20"><Edit3 size={20} /></button>
                       </div>
                    </div>
                    <input 
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2 font-mono text-[9px] text-[#304B9E] focus:border-[#F05A28] outline-none"
                      value={formData.thumbnail}
                      onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                    />
                 </div>
                 <div className="md:col-span-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Name</label>
                          <input 
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-[#304B9E] text-base outline-none focus:border-[#F05A28] transition-all uppercase shadow-inner"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                             <select 
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 font-black text-[#304B9E] text-[10px] uppercase outline-none focus:border-[#F05A28]"
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                             >
                                <option>Standard Curriculum</option>
                                <option>Robotics</option>
                                <option>Logic & Coding</option>
                                <option>Digital Arts</option>
                             </select>
                          </div>
                          <div className="space-y-1.5">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Level Tag</label>
                             <select 
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 font-black text-[#304B9E] text-[10px] outline-none focus:border-[#F05A28]"
                                value={formData.level}
                                onChange={(e) => setFormData({...formData, level: e.target.value})}
                             >
                                <option>🔰 Beginner</option>
                                <option>⭐ Intermediate</option>
                                <option>🏆 Advanced</option>
                             </select>
                          </div>
                       </div>
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Curriculum Abstract</label>
                       <textarea 
                         rows={3}
                         className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-8 py-6 font-bold text-slate-600 text-xs outline-none focus:border-[#F05A28] transition-all shadow-inner resize-none"
                         value={formData.description}
                         onChange={(e) => setFormData({...formData, description: e.target.value})}
                       />
                    </div>
                 </div>
              </div>
           </section>

           {/* Section 2: Units and Tasks */}
           <section className="space-y-8">
              <div className="flex items-center justify-between border-l-4 border-[#3b82f6] pl-6">
                 <h3 className="text-[11px] font-black text-[#304B9E] uppercase tracking-[0.4em] flex items-center gap-3">
                    <Layers size={18} /> Functional mapping
                 </h3>
                 <button 
                  onClick={addModule}
                  className="px-8 py-3 bg-[#F05A28] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-[#304B9E] transition-all active:scale-95 flex items-center gap-2 border-b-4 border-black/10"
                 >
                    <Plus size={18} strokeWidth={3} /> Add Module Registry
                 </button>
              </div>

              <div className="space-y-12">
                 {formData.modules.map((mod, mIdx) => (
                   <div key={mod.id} className="bg-slate-50/50 rounded-[3rem] p-10 border-2 border-slate-100 relative group/mod hover:border-indigo-100 transition-all shadow-sm">
                      <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
                         <div className="flex items-center gap-5 flex-1">
                            <div className="w-14 h-14 rounded-2xl bg-[#304B9E] text-[#F05A28] flex items-center justify-center font-black text-2xl shadow-xl border-b-4 border-black/10 rotate-3">
                               {mIdx + 1}
                            </div>
                            <div className="flex-1 space-y-1">
                               <label className="text-[8px] font-black text-slate-300 uppercase tracking-widest ml-1">Module ID: {mod.id}</label>
                               <input 
                                 className="w-full bg-transparent font-black text-2xl text-[#304B9E] uppercase outline-none focus:text-[#F05A28] transition-colors border-b-2 border-transparent focus:border-[#F05A28]/20"
                                 value={mod.title}
                                 onChange={(e) => {
                                   const next = formData.modules.map(m => m.id === mod.id ? {...m, title: e.target.value} : m);
                                   setFormData({...formData, modules: next});
                                 }}
                               />
                            </div>
                         </div>
                         <button onClick={() => deleteModule(mod.id)} className="p-3 bg-white text-slate-200 hover:text-red-500 transition-all rounded-xl border border-slate-100 shadow-sm active:scale-90" title="Delete Module">
                            <Trash2 size={24} />
                         </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                         {mod.lessons.map((task) => (
                           <div key={task.id} className="bg-white p-5 rounded-[2rem] border-2 border-slate-50 shadow-lg group/task flex flex-col justify-between hover:border-[#304B9E]/30 transition-all relative overflow-hidden">
                              <div className="flex items-start justify-between mb-6">
                                 <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-xl text-white shadow-xl group-hover/task:rotate-6 transition-all ${
                                      task.type === 'video' ? 'bg-indigo-500' : 
                                      task.type === 'quiz' ? 'bg-red-500' : 
                                      task.type === 'assignment' ? 'bg-rose-500' : 'bg-emerald-500'
                                    }`}>
                                       {task.type === 'video' ? <MonitorPlay size={18} /> : task.type === 'quiz' ? <Zap size={18} fill="currentColor" /> : <FileText size={18} />}
                                    </div>
                                    <div className="min-w-0">
                                       <p className="text-[11px] font-black text-[#304B9E] uppercase tracking-tight truncate leading-none mb-1">{task.title}</p>
                                       <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{task.type}</p>
                                    </div>
                                 </div>
                                 <button onClick={() => deleteTask(mod.id, task.id)} className="p-1.5 text-slate-200 hover:text-red-500 transition-colors opacity-0 group-hover/task:opacity-100">
                                    <X size={16} strokeWidth={4} />
                                 </button>
                              </div>
                              <button 
                                onClick={() => setActiveTaskEditor({ lesson: task, modId: mod.id })}
                                className="w-full py-3.5 bg-slate-50 text-[#304B9E] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#304B9E] hover:text-white transition-all flex items-center justify-center gap-2 border border-slate-100 shadow-sm active:scale-95 group/btn"
                              >
                                 <Edit3 size={16} className="group-hover/btn:rotate-12 transition-transform" /> Edit Payload
                              </button>
                           </div>
                         ))}
                         
                         {/* Rapid Add Buttons */}
                         <div className="bg-white/50 rounded-[2rem] border-2 border-dashed border-slate-200 p-5 flex flex-col gap-4">
                            <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest text-center">Add registry node</p>
                            <div className="grid grid-cols-2 gap-2">
                               {[
                                 { type: 'video', icon: MonitorPlay, color: 'hover:bg-indigo-500' },
                                 { type: 'text', icon: FileText, color: 'hover:bg-emerald-500' },
                                 { type: 'assignment', icon: ClipboardList, color: 'hover:bg-rose-500' },
                                 { type: 'quiz', icon: Zap, color: 'hover:bg-red-500' }
                               ].map((btn) => (
                                 <button 
                                   key={btn.type}
                                   onClick={() => addTask(mod.id, btn.type as any)}
                                   title={`Add ${btn.type}`}
                                   className={`p-4 bg-slate-50 border border-slate-100 ${btn.color} hover:text-white rounded-xl text-slate-300 transition-all flex items-center justify-center active:scale-90 shadow-sm`}
                                 >
                                   <btn.icon size={20} strokeWidth={3} />
                                 </button>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                 ))}

                 {formData.modules.length === 0 && (
                    <div className="py-24 text-center opacity-30 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem]">
                       <Layers size={80} className="mx-auto text-slate-300 mb-6" />
                       <h4 className="text-2xl font-black text-[#304B9E] uppercase tracking-widest">No mapping nodes detected</h4>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Initialize your curriculum structure to begin</p>
                    </div>
                 )}
              </div>
           </section>
        </div>

        <div className="p-8 border-t border-slate-100 bg-white shrink-0 flex gap-4">
           <button onClick={onClose} className="flex-1 py-5 bg-slate-100 text-slate-400 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95">Discard changes</button>
           <button 
             onClick={() => { onSave(formData); onClose(); }}
             className="flex-[2] py-5 bg-[#304B9E] text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-[0_15px_40px_-10px_rgba(48,75,158,0.5)] hover:bg-[#00a651] transition-all border-b-6 border-black/10 active:scale-95 flex items-center justify-center gap-3"
           >
              <Save size={24} strokeWidth={3} /> Deploy Curriculum Registry
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
  const [accessCourse, setAccessCourse] = useState<Course | null>(null);
  const [fullEditCourse, setFullEditCourse] = useState<Course | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  const isMainAdmin = activeRole === UserRole.MAIN_CENTER;

  const filteredCourses = useMemo(() => 
    courses.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [courses, searchTerm]
  );

  const saveToRegistry = (updatedCourse: Course) => {
    const next = courses.map(c => c.id === updatedCourse.id ? updatedCourse : c);
    setCourses(next);
    localStorage.setItem('ubook_courses_v3', JSON.stringify(next));
  };

  const handleCreateCourse = (data: Partial<Course>) => {
    const newCourse: Course = {
      id: 'course-' + Date.now(),
      name: data.name || 'NEW CATALOG ITEM',
      category: data.category || 'Standard Curriculum',
      level: data.level || '🔰 Beginner',
      isPurchased: true,
      thumbnail: data.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      modules: [],
      duration: '20 Hours',
      ...data
    };
    const next = [newCourse, ...courses];
    setCourses(next);
    localStorage.setItem('ubook_courses_v3', JSON.stringify(next));
    setIsCreating(false);
    setFullEditCourse(newCourse);
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in duration-500">
      
      {isCreating && (
        <CreateCourseModal onClose={() => setIsCreating(false)} onSave={handleCreateCourse} />
      )}

      {accessCourse && (
        <AccessControlModal 
          course={accessCourse} 
          onClose={() => setAccessCourse(null)} 
          onUpdate={saveToRegistry} 
        />
      )}

      {fullEditCourse && (
        <FullCourseEditorModal 
          course={fullEditCourse} 
          onClose={() => setFullEditCourse(null)} 
          onSave={saveToRegistry} 
        />
      )}

      {/* Primary Header */}
      <div className="w-full bg-[#304B9E] rounded-[2rem] p-6 text-white shadow-xl border-b-[10px] border-[#F05A28] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-4 relative z-10">
           <div className="p-4 bg-[#F05A28] rounded-2xl text-white shadow-lg rotate-3 border-b-4 border-black/10">
             <Settings2 size={28} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-2xl md:text-3xl font-black leading-none tracking-tight uppercase">Syllabus <span className="text-white/60">Registry</span></h2>
             <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">U Book Store Global Catalog</p>
           </div>
        </div>

        {isMainAdmin && (
          <button 
            onClick={() => setIsCreating(true)}
            className="px-10 py-5 bg-[#F05A28] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-[#00a651] transition-all border-b-6 border-black/10 active:scale-95 flex items-center gap-3 relative z-10 group"
          >
             <div className="p-1.5 bg-white/20 rounded-lg group-hover:rotate-90 transition-transform">
                <PlusSquare size={24} strokeWidth={4} />
             </div>
             Add New Course
          </button>
        )}
      </div>

      {/* Control Bar */}
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

      {/* Course Grid */}
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
                  <div className="flex items-center gap-2 mb-1.5">
                     <span className="text-[7px] font-black uppercase text-[#F05A28] tracking-widest">{course.level}</span>
                  </div>
                  <h4 className="text-lg font-black text-[#304B9E] uppercase tracking-tight leading-tight mb-2 group-hover:text-[#F05A28] transition-colors line-clamp-2">{course.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight line-clamp-2 leading-relaxed opacity-80">
                    {course.description || "Course catalog item provisioned for hub delivery."}
                  </p>
                </div>

                <div className="mt-auto flex flex-col gap-2 pt-4 border-t-2 border-slate-50">
                   {/* Access Control - Visible to all admin roles */}
                   <button 
                     onClick={() => setAccessCourse(course)} 
                     className="w-full py-4 bg-[#304B9E] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#00a651] transition-all flex items-center justify-center gap-2 shadow-md border-b-4 border-black/10 active:scale-95"
                   >
                     <ShieldCheck size={14} strokeWidth={3} /> Access Control
                   </button>
                   
                   <div className="grid grid-cols-2 gap-2">
                      {/* Edit Course - RESTRICTED TO MAIN ADMIN ONLY */}
                      {isMainAdmin ? (
                        <button 
                          onClick={() => setFullEditCourse(course)}
                          className="py-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100 hover:bg-blue-50 hover:text-[#3b82f6] transition-all active:scale-90 flex items-center justify-center gap-2"
                        >
                           <Edit3 size={14} /> <span className="text-[8px] font-black uppercase">Edit Course</span>
                        </button>
                      ) : (
                        <div className="py-3 bg-slate-50 text-slate-300 rounded-xl border border-slate-100 flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
                           <Lock size={12} /> <span className="text-[8px] font-black uppercase">Locked</span>
                        </div>
                      )}

                      {/* Live View - Visible to all */}
                      <button 
                        onClick={() => onPreviewCourse?.(course.id)}
                        className="py-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100 hover:bg-[#304B9E] hover:text-white transition-all active:scale-90 flex items-center justify-center gap-2"
                      >
                         <Eye size={14} /> <span className="text-[8px] font-black uppercase">Live View</span>
                      </button>
                   </div>
                </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer System Info */}
      <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-between shrink-0">
         <div className="flex items-center gap-3">
            <CheckCircle2 size={16} className="text-[#00a651]" />
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">U Book Store Registry Node Active</p>
         </div>
         <p className="text-[9px] font-black text-[#304B9E] uppercase tracking-widest">Assets Verified: {courses.length}</p>
      </div>
    </div>
  );
};

/**
 * Metadata creation modal
 */
const CreateCourseModal = ({ onClose, onSave }: { onClose: () => void, onSave: (data: Partial<Course>) => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Standard Curriculum',
    level: '🔰 Beginner',
    description: ''
  });

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] w-full max-w-md shadow-2xl border-t-[12px] border-[#F05A28] p-10 flex flex-col gap-8 animate-in zoom-in-95 duration-300">
        <div className="text-center">
           <div className="w-16 h-16 bg-orange-50 text-[#F05A28] rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-inner border-2 border-orange-100 rotate-3">
              <BookPlus size={32} strokeWidth={3} />
           </div>
           <h3 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">New Program</h3>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Initialize Hub Curriculum</p>
        </div>

        <div className="space-y-4">
           <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Program Name</label>
              <input 
                autoFocus
                type="text" 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-[#304B9E] text-base outline-none focus:border-[#F05A28] transition-all uppercase shadow-inner"
                placeholder="e.g. ROBOTICS MASTER"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
           </div>
           <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Level Assignment</label>
              <select 
                 className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-[#304B9E] text-xs outline-none focus:border-[#F05A28] transition-all appearance-none cursor-pointer"
                 value={formData.level}
                 onChange={(e) => setFormData({...formData, level: e.target.value})}
              >
                 <option>🔰 Beginner</option>
                 <option>⭐ Intermediate</option>
                 <option>🏆 Advanced</option>
              </select>
           </div>
        </div>

        <div className="flex gap-4 pt-2">
           <button onClick={onClose} className="flex-1 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
           <button 
             onClick={() => onSave({ ...formData, modules: [], thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800' })}
             disabled={!formData.name}
             className="flex-[2] py-4 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#00a651] transition-all border-b-4 border-black/10 disabled:bg-slate-200 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center gap-2"
           >
              <PlusSquare size={18} strokeWidth={3} /> Deploy Program
           </button>
        </div>
      </div>
    </div>
  );
};
