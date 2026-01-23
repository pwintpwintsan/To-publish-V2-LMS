
import React, { useState, useMemo } from 'react';
import { MOCK_SCHOOLS, REGIONS } from '../../constants.tsx';
import { 
  Building2, 
  MapPin, 
  Search, 
  ArrowRight, 
  ChevronDown,
  GraduationCap,
  Users,
  PlusCircle,
  X,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  Globe,
  Mail,
  UserPlus,
  Calendar,
  Briefcase,
  Phone,
  Map,
  FileText,
  Fingerprint,
  Hash,
  Database,
  Minus,
  Plus
} from 'lucide-react';

interface CenterListViewProps {
  onEnterCenter: (id: string) => void;
}

const RegisterSchoolModal = ({ onClose, onSave }: { onClose: () => void, onSave: (data: any) => void }) => {
  // Mock last issued ID for simulation
  const LAST_ISSUED_ID = 10000;

  const [formData, setFormData] = useState({
    schoolName: '',
    address: '',
    city: '',
    country: 'Myanmar',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactRole: 'Academic Director',
    adminId: '',
    teacherId: '',
    studentSeats: 25,
    teacherSeats: 5
  });

  const studentIdRange = useMemo(() => {
    const start = LAST_ISSUED_ID + 1;
    const end = LAST_ISSUED_ID + formData.studentSeats;
    return { start, end };
  }, [formData.studentSeats]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      generatedIds: studentIdRange
    });
  };

  const roles = ['Academic Director', 'Coordinator', 'Teacher'];

  const adjustStudentSeats = (amount: number) => {
    setFormData(prev => ({
      ...prev,
      studentSeats: Math.max(1, Math.min(1000, prev.studentSeats + amount))
    }));
  };

  const adjustTeacherSeats = (amount: number) => {
    setFormData(prev => ({
      ...prev,
      teacherSeats: Math.max(1, Math.min(50, prev.teacherSeats + amount))
    }));
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-[#304B9E]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl border-t-[12px] border-[#F05A28] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 relative max-h-[95vh]">
        
        {/* Header Section */}
        <div className="p-8 border-b border-slate-100 bg-slate-50/50 shrink-0 relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Fingerprint size={80} />
          </div>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#304B9E] text-white rounded-2xl shadow-xl">
                <Building2 size={24} strokeWidth={3} />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#304B9E] uppercase tracking-tighter leading-none">School registration</h2>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Direct registration Protocol</p>
                
                {/* Distributor and Date Information */}
                <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-10 border-t border-slate-200/60 pt-4">
                   <div>
                      <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Distributor / Agent</p>
                      <p className="text-[9px] font-black text-[#304B9E] uppercase">Digital Information Resources Co, Ltds.</p>
                   </div>
                   <div>
                      <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Date</p>
                      <p className="text-[9px] font-black text-[#304B9E] uppercase">2, February 2025</p>
                   </div>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 bg-white text-slate-300 hover:text-[#ec2027] transition-all rounded-xl shadow-sm border border-slate-100 active:scale-95">
              <X size={20} strokeWidth={4} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 scrollbar-hide space-y-8">
           {/* Section 1: School Information */}
           <div className="space-y-4">
              <h3 className="text-[10px] font-black text-[#F05A28] uppercase tracking-[0.3em] flex items-center gap-2 border-b border-slate-100 pb-2">
                <MapPin size={14} /> School / Institution Information
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">School / Institution Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-black text-[#304B9E] text-xs outline-none focus:border-[#F05A28] transition-all shadow-inner uppercase"
                    placeholder="e.g. EDULIGHT SCHOOL"
                    value={formData.schoolName}
                    onChange={(e) => setFormData({...formData, schoolName: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Complete Address</label>
                  <textarea 
                    required
                    rows={2}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-black text-[#304B9E] text-xs outline-none focus:border-[#F05A28] transition-all shadow-inner uppercase resize-none"
                    placeholder="STREET, QUARTER, DISTRICT..."
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
           </div>

           {/* Section 2: Capacity & Automatic ID Generation */}
           <div className="space-y-4">
              <h3 className="text-[10px] font-black text-[#304B9E] uppercase tracking-[0.3em] flex items-center gap-2 border-b border-slate-100 pb-2">
                <Database size={14} /> Capacity & Automated Provisioning
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Student Seats Counter */}
                <div className="space-y-4">
                   <div className="flex items-center justify-between px-1">
                      <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Student Seats</label>
                      <span className="text-[10px] font-black text-[#F05A28] uppercase bg-orange-50 px-2 py-0.5 rounded border border-orange-100">{formData.studentSeats} Slots</span>
                   </div>
                   
                   <div className="flex items-center gap-4">
                      <button 
                        type="button"
                        onClick={() => adjustStudentSeats(-5)}
                        className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#F05A28] hover:border-[#F05A28] hover:shadow-lg transition-all active:scale-90 shadow-sm"
                      >
                        <Minus size={20} strokeWidth={4} />
                      </button>
                      
                      <div className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] py-3 text-center shadow-inner relative group">
                         <span className="text-2xl font-black text-[#304B9E]">{formData.studentSeats}</span>
                         <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#F05A28]/20 rounded-[1.5rem] pointer-events-none transition-all"></div>
                      </div>

                      <button 
                        type="button"
                        onClick={() => adjustStudentSeats(5)}
                        className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#F05A28] hover:border-[#F05A28] hover:shadow-lg transition-all active:scale-90 shadow-sm"
                      >
                        <Plus size={20} strokeWidth={4} />
                      </button>
                   </div>

                   <div className="p-4 bg-[#304B9E] rounded-2xl border-b-4 border-black/10 shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-10">
                         <Hash size={40} className="text-white" />
                      </div>
                      <p className="text-[7px] font-black text-white/50 uppercase tracking-[0.2em] mb-1">Generated Student ID Range</p>
                      <div className="flex items-center gap-3">
                         <span className="text-sm font-mono font-black text-white">{studentIdRange.start}</span>
                         <ArrowRight size={14} className="text-[#F05A28]" strokeWidth={4} />
                         <span className="text-sm font-mono font-black text-white">{studentIdRange.end}</span>
                      </div>
                   </div>
                </div>

                {/* Teacher Quota Counter */}
                <div className="space-y-4">
                   <div className="flex items-center justify-between px-1">
                      <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Teacher Quota</label>
                      <span className="text-[10px] font-black text-[#3b82f6] uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{formData.teacherSeats} Staff</span>
                   </div>
                   
                   <div className="flex items-center gap-4">
                      <button 
                        type="button"
                        onClick={() => adjustTeacherSeats(-1)}
                        className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#3b82f6] hover:border-[#3b82f6] hover:shadow-lg transition-all active:scale-90 shadow-sm"
                      >
                        <Minus size={20} strokeWidth={4} />
                      </button>
                      
                      <div className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] py-3 text-center shadow-inner relative group">
                         <span className="text-2xl font-black text-[#304B9E]">{formData.teacherSeats}</span>
                      </div>

                      <button 
                        type="button"
                        onClick={() => adjustTeacherSeats(1)}
                        className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#3b82f6] hover:border-[#3b82f6] hover:shadow-lg transition-all active:scale-90 shadow-sm"
                      >
                        <Plus size={20} strokeWidth={4} />
                      </button>
                   </div>
                   
                   <div className="p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#3b82f6] flex items-center justify-center flex-shrink-0">
                         <Users size={16} strokeWidth={3} />
                      </div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-tight">
                        Teachers are assigned sequential staff identifiers upon activation
                      </p>
                   </div>
                </div>
              </div>
           </div>

           {/* Section 3: Contact Person */}
           <div className="space-y-4">
              <h3 className="text-[10px] font-black text-[#F05A28] uppercase tracking-[0.3em] flex items-center gap-2 border-b border-slate-100 pb-2">
                <UserCheck size={14} /> Contact Person Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-black text-[#304B9E] text-xs outline-none focus:border-[#F05A28] transition-all shadow-inner uppercase"
                    placeholder="MIN HEIN ZAW"
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Role Selection</label>
                  <div className="relative">
                     <select 
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-black text-[#304B9E] text-xs outline-none focus:border-[#F05A28] transition-all shadow-inner appearance-none cursor-pointer"
                        value={formData.contactRole}
                        onChange={(e) => setFormData({...formData, contactRole: e.target.value})}
                     >
                        {roles.map(r => <option key={r} value={r}>{r}</option>)}
                     </select>
                     <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                    <input 
                      required
                      type="text" 
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl pl-10 pr-4 py-3 font-black text-[#304B9E] text-xs outline-none focus:border-[#F05A28] transition-all shadow-inner"
                      placeholder="09..."
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                    />
                  </div>
                </div>
              </div>
           </div>

           {/* Submit */}
           <div className="pt-4 flex gap-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-[2] py-5 bg-[#304B9E] text-white rounded-2xl font-black [text-transform:uppercase] text-[10px] tracking-[0.2em] shadow-xl hover:bg-[#F05A28] transition-all border-b-6 border-black/10 active:scale-95 flex items-center justify-center gap-3"
              >
                <CheckCircle2 size={20} strokeWidth={3} /> Submit registration
              </button>
           </div>
        </form>
      </div>
    </div>
  );
};

export const CenterListView: React.FC<CenterListViewProps> = ({ onEnterCenter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('All Regions');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const regions = ['All Regions', ...REGIONS];

  const filteredSchools = useMemo(() => {
    return MOCK_SCHOOLS.filter(school => {
      const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           school.id.includes(searchTerm);
      const matchesRegion = regionFilter === 'All Regions' || school.region === regionFilter;
      return matchesSearch && matchesRegion;
    });
  }, [searchTerm, regionFilter]);

  const handleSaveSchool = (data: any) => {
    alert(`Registration for "${data.schoolName}" received!\n` +
          `Seats Provisioned: ${data.studentSeats}\n` +
          `Unique IDs assigned: ${data.generatedIds.start} – ${data.generatedIds.end}\n` +
          `IDs are sequentially generated and duplicate-proof.`);
    setIsRegisterModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col gap-4 animate-in fade-in duration-500 max-w-[1400px] mx-auto w-full">
      
      {isRegisterModalOpen && (
        <RegisterSchoolModal 
          onClose={() => setIsRegisterModalOpen(false)} 
          onSave={handleSaveSchool} 
        />
      )}

      <div className="w-full bg-[#304B9E] rounded-[2.5rem] p-6 md:p-8 text-white shadow-xl border-b-[10px] border-[#F05A28] flex flex-col md:flex-row items-center justify-between gap-6 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        
        <div className="flex items-center gap-6 relative z-10">
           <div className="p-4 md:p-5 bg-[#F05A28] rounded-2xl text-white shadow-xl rotate-3">
             <Globe size={32} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-2xl md:text-3xl font-black leading-none tracking-tight uppercase">School <span className="text-white opacity-60">Directory</span></h2>
             <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-2">U Book Store Global Network</p>
           </div>
        </div>

        <button 
          onClick={() => setIsRegisterModalOpen(true)}
          className="px-8 py-3.5 bg-white text-[#304B9E] rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#F05A28] hover:text-white transition-all border-b-4 border-black/10 flex items-center gap-2 active:scale-95 z-10"
        >
          <PlusCircle size={20} strokeWidth={3} /> Register School
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1 mt-2">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              type="text" 
              placeholder="Search schools..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border-2 border-slate-100 pl-10 pr-4 py-3 rounded-2xl text-xs font-black text-[#304B9E] outline-none focus:border-[#F05A28] transition-all w-full sm:w-64 uppercase shadow-sm placeholder:text-slate-200"
            />
          </div>
          <div className="relative">
            <select 
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="bg-white border-2 border-slate-100 pl-4 pr-10 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer w-40 shadow-sm text-[#304B9E]"
            >
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4 px-4 bg-slate-100/50 rounded-2xl py-2">
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Status:</span>
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-black text-[#304B9E] uppercase">{filteredSchools.length} Schools Active</span>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pr-1 pb-6 mt-2">
        <div className="flex flex-col gap-3">
          {filteredSchools.map((school) => (
            <div 
              key={school.id}
              onClick={() => onEnterCenter(school.id)}
              className="bg-white rounded-[2rem] p-6 border-2 border-slate-50 hover:border-[#304B9E]/20 hover:shadow-xl transition-all group cursor-pointer flex flex-col md:flex-row md:items-center gap-6"
            >
              <div className="flex items-center gap-6 md:w-1/4">
                <div className="w-14 h-14 bg-slate-50 text-[#304B9E] rounded-2xl flex items-center justify-center group-hover:bg-[#304B9E] group-hover:text-white transition-all shadow-inner shrink-0 group-hover:scale-105">
                  <Building2 size={24} strokeWidth={3} />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-black text-[#F05A28] uppercase tracking-[0.2em] block mb-1">CODE: {school.id}</span>
                  <h3 className="text-lg font-black text-[#304B9E] tracking-tight truncate leading-none uppercase">{school.name}</h3>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                 <div className="flex items-center gap-2 mb-2">
                    <MapPin size={12} className="text-[#F05A28]" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight">{school.location}</span>
                    <div className="px-2 py-0.5 bg-indigo-50 text-[#304B9E] rounded-lg text-[8px] font-black uppercase tracking-widest ml-2 border border-indigo-100">
                       {school.region}
                    </div>
                 </div>
                 <p className="text-[10px] text-slate-400 line-clamp-1 italic uppercase tracking-tight font-bold opacity-60">
                    {school.description || "Active U Book Store node providing curriculum services."}
                 </p>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-10 md:w-1/3 shrink-0">
                 <div className="flex gap-8">
                    <div className="flex flex-col items-end">
                       <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Learners</span>
                       <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                             <GraduationCap size={14} strokeWidth={3} />
                          </div>
                          <span className="text-sm font-black text-[#304B9E]">{school.currentStudentCount}</span>
                       </div>
                    </div>
                    <div className="flex flex-col items-end">
                       <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Capacity</span>
                       <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                             <Users size={14} strokeWidth={3} />
                          </div>
                          <span className="text-sm font-black text-[#304B9E]">{school.currentTeacherCount} Staff</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="w-10 h-10 flex items-center justify-center bg-slate-50 group-hover:bg-[#F05A28] group-hover:text-white rounded-xl transition-all shadow-sm border border-slate-100 group-hover:translate-x-2">
                    <ArrowRight size={20} strokeWidth={4} />
                 </div>
              </div>
            </div>
          ))}

          {filteredSchools.length === 0 && (
             <div className="py-32 text-center bg-white rounded-[3rem] border-4 border-dashed border-slate-50 opacity-40">
                <Search size={64} className="mx-auto text-slate-200 mb-4" />
                <h4 className="text-xl font-black text-[#304B9E] uppercase tracking-widest">No schools matched</h4>
                <p className="text-sm font-bold text-slate-400 mt-2 uppercase">Adjust your filters and try again</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
