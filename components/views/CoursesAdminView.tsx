
import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_COURSES, LEVELS } from '../../constants.tsx';
import { Course, Module, Lesson } from '../../types.ts';
import { QuizBuilder, QuizViewer } from './TestsView.tsx';
import { 
  BookOpen, 
  ChevronLeft, 
  Type, 
  Layers,
  Clock,
  Zap,
  MonitorPlay,
  Edit3,
  FileText,
  PlusCircle,
  UploadCloud,
  Settings2,
  ChevronRight,
  Layout,
  Globe,
  ImageIcon,
  Tag,
  Signal,
  ChevronDown,
  Search,
  Users,
  Trash2,
  PlayCircle,
  X,
  CheckCircle2,
  Plus,
  Eye,
  ToggleLeft,
  ToggleRight,
  Save,
  Video,
  FileQuestion,
  Sparkles
} from 'lucide-react';

interface CoursesAdminViewProps {
  initialCourseId?: string | null;
  onExitEdit?: () => void;
  onPreviewCourse?: (id: string) => void;
  checkPermission?: (category: any, action: string) => boolean;
}

const SwitchToggle = ({ active, onClick }: { active: boolean; onClick: () => void }) => (
  <button 
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    className={`w-10 h-5 rounded-full relative transition-all duration-300 shadow-inner overflow-hidden ${active ? 'bg-[#00a651]' : 'bg-slate-300'}`}
  >
    <div 
      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${active ? 'translate-x-5' : 'translate-x-0'}`}
    />
  </button>
);

const EditTaskModal = ({ 
  lesson, 
  onClose, 
  onSave 
}: { 
  lesson: Lesson, 
  onClose: () => void, 
  onSave: (updatedLesson: Lesson) => void 
}) => {
  const [formData, setFormData] = useState<Lesson>({ ...lesson });

  const taskTypes: { id: Lesson['type'], label: string, icon: any }[] = [
    { id: 'video', label: 'Video Lesson', icon: MonitorPlay },
    { id: 'text', label: 'Text/Reading', icon: FileText },
    { id: 'quiz', label: 'Interactive Quiz', icon: Zap },
    { id: 'assignment', label: 'Workshop Task', icon: Edit3 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] w-full max-w-xl shadow-2xl border-t-[12px] border-[#F05A28] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 relative max-h-[90vh]">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl z-50">
          <X size={20} strokeWidth={4} />
        </button>

        <div className="p-8 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#304B9E] text-white rounded-2xl shadow-xl">
              <Settings2 size={24} strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">Task Architect</h2>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Node ID: {formData.id}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Task Name</label>
            <input 
              required
              type="text"
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 font-black text-[#304B9E] text-sm outline-none focus:border-[#F05A28] transition-all uppercase placeholder:text-slate-200"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Payload Type</label>
            <div className="grid grid-cols-2 gap-2">
              {taskTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: type.id })}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left ${
                    formData.type === type.id 
                      ? 'bg-indigo-50 border-[#304B9E] shadow-md' 
                      : 'bg-white border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <type.icon size={18} className={formData.type === type.id ? 'text-[#304B9E]' : 'text-slate-300'} />
                  <span className={`text-[10px] font-black uppercase tracking-tight ${formData.type === type.id ? 'text-[#304B9E]' : 'text-slate-400'}`}>
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full"></div>

          {/* Contextual Fields */}
          {formData.type === 'text' && (
            <div className="space-y-1.5 animate-in slide-in-from-top-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <FileText size={12} /> Reading Content
              </label>
              <textarea 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 font-bold text-slate-600 text-xs outline-none focus:border-[#304B9E] transition-all min-h-[150px] resize-none"
                placeholder="Enter lesson narrative here..."
                value={formData.content || ''}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>
          )}

          {formData.type === 'assignment' && (
            <div className="space-y-1.5 animate-in slide-in-from-top-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Edit3 size={12} /> Workshop Instructions
              </label>
              <textarea 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 font-bold text-slate-600 text-xs outline-none focus:border-[#304B9E] transition-all min-h-[120px] resize-none"
                placeholder="Describe the practical challenge..."
                value={formData.assignmentInstructions || ''}
                onChange={(e) => setFormData({ ...formData, assignmentInstructions: e.target.value })}
              />
            </div>
          )}

          {formData.type === 'video' && (
            <div className="space-y-4 animate-in slide-in-from-top-2">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <MonitorPlay size={12} /> Video Source URL
                </label>
                <input 
                  type="text"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 font-bold text-slate-600 text-xs outline-none focus:border-[#304B9E] transition-all"
                  placeholder="https://youtube.com/embed/..."
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>
              <div className="p-4 bg-blue-50 rounded-2xl border border-indigo-100 flex items-center gap-3">
                 <Sparkles size={16} className="text-[#304B9E]" />
                 <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">Embedded player automatically scales to learner screens.</p>
              </div>
            </div>
          )}

          {formData.type === 'quiz' && (
            <div className="p-6 bg-orange-50 rounded-[2rem] border-2 border-dashed border-orange-200 text-center animate-in slide-in-from-top-2">
              <Zap size={32} className="mx-auto text-[#F05A28] mb-3" fill="currentColor" />
              <h4 className="text-sm font-black text-[#304B9E] uppercase tracking-widest mb-2">Quiz Logic Configured</h4>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight px-4 leading-relaxed">
                Use the dedicated Exam Control view to manage specific question sets for this node.
              </p>
            </div>
          )}
        </form>

        <div className="p-8 border-t border-slate-100 bg-white shrink-0 flex gap-4">
           <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">Cancel</button>
           <button 
            type="submit" 
            onClick={handleSubmit}
            className="flex-[2] py-4 bg-[#304B9E] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#00a651] transition-all border-b-4 border-black/10 active:scale-95 flex items-center justify-center gap-2"
           >
              <Save size={18} /> Deploy Changes
           </button>
        </div>
      </div>
    </div>
  );
};

const NewCourseModal = ({ onClose, onSave }: { onClose: () => void, onSave: (course: Course) => void }) => {
  const [courseName, setCourseName] = useState('');

  const handleCreate = () => {
    if (!courseName.trim()) return;
    
    const newCourse: Course = {
      id: 'course-' + Date.now(),
      name: courseName,
      isPurchased: true,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
      description: `New course module for U Book Store learners.`,
      category: 'Digital Literacy',
      level: '🔰 Beginner',
      duration: "15 Hours",
      lastUpdated: new Date().toISOString(),
      modules: [
        {
          id: 'm1-' + Date.now(),
          title: 'Module 1: Introduction & Basics',
          isPublished: true,
          lessons: [
            { id: 'l1-' + Date.now(), title: 'Welcome to the Course', type: 'video', isPublished: true }
          ]
        }
      ]
    };
    onSave(newCourse);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border-t-[12px] border-[#ec2027] relative animate-in zoom-in-95 duration-300 overflow-hidden">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl">
          <X size={20} strokeWidth={3} />
        </button>

        <div className="text-center mb-8">
           <div className="w-16 h-16 bg-red-50 text-[#304B9E] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner border-2 border-red-100 rotate-3">
              <PlusCircle size={32} strokeWidth={3} />
           </div>
           <h3 className="text-2xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">New Course</h3>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Curriculum Architect</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Type size={12} className="text-[#3b82f6]" /> Course Title
            </label>
            <input 
              required
              type="text" 
              placeholder="e.g. Digital Logic V2" 
              className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#ec2027] focus:bg-white outline-none font-black text-base text-[#304B9E] transition-all shadow-inner"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
           <button 
             onClick={onClose}
             className="py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95"
           >
              Cancel
           </button>
           <button 
             onClick={handleCreate}
             disabled={!courseName.trim()}
             className={`py-5 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 border-b-4 border-black/10 transition-all active:scale-95 ${
               courseName.trim() ? 'bg-[#ec2027] hover:bg-[#00a651]' : 'bg-slate-300 cursor-not-allowed grayscale'
             }`}
           >
              <CheckCircle2 size={18} strokeWidth={3} /> create course
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
  checkPermission 
}) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('ubook_courses_v3');
    return saved ? JSON.parse(saved) : MOCK_COURSES;
  });
  const [editingCourseId, setEditingCourseId] = useState<string | null>(initialCourseId || null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [previewingQuiz, setPreviewingQuiz] = useState<Lesson | null>(null);
  
  // State for the new Edit Node functionality
  const [nodeToEdit, setNodeToEdit] = useState<{ lesson: Lesson, moduleId: string } | null>(null);

  const currentCourse = useMemo(() => 
    courses.find(c => c.id === editingCourseId), 
    [courses, editingCourseId]
  );

  const filteredCourses = useMemo(() => 
    courses.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [courses, searchTerm]
  );

  const handleCreateCourse = (newCourse: Course) => {
    const updated = [newCourse, ...courses];
    setCourses(updated);
    localStorage.setItem('ubook_courses_v3', JSON.stringify(updated));
    setEditingCourseId(newCourse.id);
    setIsNewModalOpen(false);
  };

  const toggleModuleAccess = (modId: string) => {
    if (!editingCourseId) return;
    const updated = courses.map(c => {
      if (c.id !== editingCourseId) return c;
      return {
        ...c,
        modules: c.modules.map(m => m.id === modId ? { ...m, isPublished: !m.isPublished } : m)
      };
    });
    setCourses(updated);
    localStorage.setItem('ubook_courses_v3', JSON.stringify(updated));
  };

  const toggleLessonAccess = (modId: string, lessonId: string) => {
    if (!editingCourseId) return;
    const updated = courses.map(c => {
      if (c.id !== editingCourseId) return c;
      return {
        ...c,
        modules: c.modules.map(m => {
          if (m.id !== modId) return m;
          return {
            ...m,
            lessons: m.lessons.map(l => l.id === lessonId ? { ...l, isPublished: !l.isPublished } : l)
          };
        })
      };
    });
    setCourses(updated);
    localStorage.setItem('ubook_courses_v3', JSON.stringify(updated));
  };

  const handleUpdateTask = (updatedLesson: Lesson) => {
    if (!editingCourseId || !nodeToEdit) return;
    
    const updated = courses.map(c => {
      if (c.id !== editingCourseId) return c;
      return {
        ...c,
        modules: c.modules.map(m => {
          if (m.id !== nodeToEdit.moduleId) return m;
          return {
            ...m,
            lessons: m.lessons.map(l => l.id === updatedLesson.id ? updatedLesson : l)
          };
        })
      };
    });
    
    setCourses(updated);
    localStorage.setItem('ubook_courses_v3', JSON.stringify(updated));
    setNodeToEdit(null);
  };

  if (editingCourseId && currentCourse) {
     return (
       <div className="h-full flex flex-col gap-6 animate-in slide-in-from-right duration-500 overflow-hidden">
          {previewingQuiz && (
            <QuizViewer 
              title={previewingQuiz.title} 
              questions={previewingQuiz.quiz || []} 
              onClose={() => setPreviewingQuiz(null)} 
            />
          )}

          {nodeToEdit && (
            <EditTaskModal 
              lesson={nodeToEdit.lesson} 
              onClose={() => setNodeToEdit(null)} 
              onSave={handleUpdateTask} 
            />
          )}

          <div className="w-full bg-[#304B9E] rounded-xl p-4 md:p-5 text-white shadow-xl border-b-6 border-[#ec2027] flex items-center justify-between shrink-0">
             <div className="flex items-center gap-6">
                <button onClick={() => { setEditingCourseId(null); if(onExitEdit) onExitEdit(); }} className="p-3 bg-white/10 rounded-xl hover:bg-[#ec2027] transition-all border border-white/10 active:scale-90">
                  <ChevronLeft size={24} strokeWidth={4} />
                </button>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight leading-none">Edit <span className="text-[#F05A28]">Course</span></h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1 truncate max-w-[250px]">{currentCourse.name}</p>
                </div>
             </div>
             
             <div className="flex items-center gap-3">
                <button 
                  onClick={() => onPreviewCourse?.(currentCourse.id)}
                  className="px-6 py-2.5 bg-white/10 hover:bg-[#F05A28] text-white rounded-xl transition-all border border-white/20 active:scale-95 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                >
                   <PlayCircle size={16} /> Preview
                </button>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide p-2">
             <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter">Syllabus Access Control</h4>
                  <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Master Center Privilege</span>
                  </div>
                </div>
                
                <div className="space-y-12">
                  {currentCourse.modules.map((mod, idx) => (
                    <div key={mod.id} className={`p-8 rounded-[3rem] border-2 transition-all ${mod.isPublished !== false ? 'bg-white border-slate-100 shadow-xl' : 'bg-slate-50 border-slate-200 grayscale-[0.5]'}`}>
                       <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-6">
                          <div className="flex items-center gap-5">
                             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg border-b-4 border-black/10 transition-all ${mod.isPublished !== false ? 'bg-[#304B9E] text-[#F05A28]' : 'bg-slate-300 text-slate-500'}`}>{idx + 1}</div>
                             <div>
                                <h5 className={`font-black text-xl uppercase tracking-tighter ${mod.isPublished !== false ? 'text-[#304B9E]' : 'text-slate-400'}`}>{mod.title}</h5>
                                <div className="flex items-center gap-3 mt-1">
                                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{mod.isPublished !== false ? 'Status: Active Protocol' : 'Status: Access Revoked'}</p>
                                  <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                                  <p className="text-[9px] font-black text-[#F05A28] uppercase tracking-widest">{mod.lessons.length} Tasks Defined</p>
                                </div>
                             </div>
                          </div>
                          <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100 shadow-inner">
                             <span className="text-[10px] font-black text-[#304B9E] uppercase tracking-widest">Access Control</span>
                             <SwitchToggle active={mod.isPublished !== false} onClick={() => toggleModuleAccess(mod.id)} />
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {mod.lessons.map((lesson, lIdx) => (
                            <div key={lesson.id} className={`group p-5 rounded-2xl border-2 flex flex-col justify-between transition-all ${lesson.isPublished !== false ? 'bg-white border-slate-50 shadow-md hover:border-[#304B9E]/20' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
                               <div className="flex items-start justify-between mb-4">
                                  <div className="flex items-center gap-3">
                                     <div className={`p-2.5 rounded-xl shadow-inner ${lesson.isPublished !== false ? 'bg-indigo-50 text-[#304B9E]' : 'bg-slate-100 text-slate-300'}`}>
                                        {lesson.type === 'video' ? <MonitorPlay size={18} /> : lesson.type === 'quiz' ? <Zap size={18} /> : lesson.type === 'assignment' ? <Edit3 size={18} /> : <FileText size={18} />}
                                     </div>
                                     <div>
                                        <p className="text-[8px] font-black text-[#F05A28] uppercase tracking-[0.2em] mb-0.5">Task {lIdx + 1}</p>
                                        <span className={`text-xs font-black uppercase tracking-tight truncate block max-w-[150px] ${lesson.isPublished !== false ? 'text-[#304B9E]' : 'text-slate-400'}`}>{lesson.title}</span>
                                     </div>
                                  </div>
                                  <SwitchToggle active={lesson.isPublished !== false} onClick={() => toggleLessonAccess(mod.id, lesson.id)} />
                               </div>
                               
                               <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-50">
                                  <button 
                                    onClick={() => setNodeToEdit({ lesson, moduleId: mod.id })}
                                    className="flex-1 py-2 bg-slate-50 hover:bg-[#304B9E] hover:text-white text-slate-400 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all shadow-sm"
                                  >
                                     Edit Node
                                  </button>
                                  <button 
                                    onClick={() => {
                                      if (lesson.type === 'quiz') setPreviewingQuiz(lesson);
                                      else setNodeToEdit({ lesson, moduleId: mod.id });
                                    }}
                                    className="p-2 bg-slate-50 hover:bg-[#F05A28] hover:text-white text-slate-300 rounded-lg shadow-sm transition-all"
                                  >
                                     <Eye size={14} />
                                  </button>
                               </div>
                            </div>
                          ))}
                          <button className="p-6 border-4 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-300 hover:text-[#304B9E] hover:border-[#304B9E]/40 hover:bg-slate-50 transition-all group min-h-[140px]">
                             <PlusCircle size={28} className="group-hover:rotate-90 transition-transform" />
                             <span className="text-[10px] font-black uppercase tracking-widest">Register Task {mod.lessons.length + 1}</span>
                          </button>
                       </div>
                    </div>
                  ))}
                  <button className="w-full py-10 border-4 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center gap-4 text-slate-300 hover:bg-indigo-50/30 hover:text-[#304B9E] hover:border-[#304B9E]/20 transition-all group">
                      <div className="p-4 bg-white rounded-3xl shadow-xl group-hover:scale-110 transition-transform">
                        <PlusCircle size={48} strokeWidth={2.5} className="text-[#F05A28]" />
                      </div>
                      <div className="text-center">
                        <span className="text-lg font-black uppercase tracking-[0.3em]">Initialize Global Module {currentCourse.modules.length + 1}</span>
                        <p className="text-[9px] font-bold uppercase tracking-widest mt-1 opacity-60">Expand curriculum framework</p>
                      </div>
                  </button>
                </div>
             </div>
          </div>
       </div>
     );
  }

  return (
    <div className="h-full flex flex-col gap-3 overflow-hidden animate-in fade-in duration-500">
      {isNewModalOpen && <NewCourseModal onClose={() => setIsNewModalOpen(false)} onSave={handleCreateCourse} />}
      
      <div className="w-full bg-[#304B9E] rounded-xl p-4 md:p-5 text-white shadow-xl border-b-6 border-[#ec2027] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="flex items-center gap-3 relative z-10">
           <div className="p-2.5 bg-[#ec2027] rounded-lg text-white shadow-lg rotate-3">
             <Settings2 size={22} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-lg md:text-xl font-black leading-none tracking-tight uppercase">Course <span className="text-[#F05A28]">Architect</span></h2>
             <p className="text-[8px] font-black uppercase tracking-widest text-white/40 mt-1">U Book Store Catalog Control</p>
           </div>
        </div>
        <button 
          onClick={() => setIsNewModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F05A28] text-white rounded-lg font-black text-[9px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all border-b-4 border-black/10 relative z-10"
        >
          <PlusCircle size={14} strokeWidth={3} />
          <span>New Course</span>
        </button>
      </div>

      <div className="w-full bg-white p-2.5 rounded-2xl shadow-lg border border-slate-100 flex flex-col md:flex-row items-center gap-2.5 flex-shrink-0">
        <div className="flex-1 relative w-full group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#304B9E] transition-colors" />
          <input 
            type="text" 
            placeholder="Search course lists by title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl border border-slate-100 outline-none font-black text-[10px] text-[#304B9E] uppercase placeholder:text-slate-200 focus:border-[#304B9E] transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCourses.map((course) => (
            <div key={course.id} className="group bg-white rounded-[2rem] p-6 shadow-md border-4 border-slate-50 hover:border-[#F05A28]/20 transition-all hover:shadow-xl flex flex-col gap-4 relative overflow-hidden">
                <div className="aspect-video w-full rounded-2xl overflow-hidden mb-2 relative">
                   <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                   <div className="absolute top-2 right-2">
                     <span className="px-2 py-1 bg-white/90 backdrop-blur text-[8px] font-black uppercase text-[#304B9E] rounded shadow-sm">{course.level.split(' ')[0]}</span>
                   </div>
                </div>
                
                <div className="min-w-0">
                  <h4 className="text-base font-black text-[#304B9E] uppercase tracking-tight leading-tight group-hover:text-[#ec2027] transition-colors line-clamp-2">{course.name}</h4>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1.5">
                    <Layers size={10} className="text-[#3b82f6]" /> {course.modules.length} Modules
                  </p>
                </div>
                
                <div className="mt-auto pt-4 border-t-2 border-slate-50 flex items-center gap-2 relative z-10">
                   <button 
                     onClick={() => setEditingCourseId(course.id)} 
                     className="flex-1 py-3 bg-[#304B9E] text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-[#F05A28] transition-all flex items-center justify-center gap-2 shadow-md border-b-4 border-black/10 active:scale-95"
                   >
                     <Edit3 size={14} strokeWidth={3} /> Edit
                   </button>
                   <button 
                     onClick={() => onPreviewCourse?.(course.id)}
                     className="p-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100 hover:bg-[#304B9E] hover:text-white transition-all shadow-sm active:scale-90"
                   >
                      <Eye size={16} />
                   </button>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
