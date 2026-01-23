
import React, { useState, useMemo } from 'react';
import { MOCK_SCHOOLS } from '../../constants.tsx';
import { 
  Building2, 
  MapPin, 
  Search, 
  ArrowRight, 
  ChevronDown,
  GraduationCap,
  Users
} from 'lucide-react';

interface CenterListViewProps {
  onEnterCenter: (id: string) => void;
}

export const CenterListView: React.FC<CenterListViewProps> = ({ onEnterCenter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('All Regions');

  const regions = ['All Regions', 'Central', 'West', 'East', 'North', 'South'];

  const filteredSchools = useMemo(() => {
    return MOCK_SCHOOLS.filter(school => {
      const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           school.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = regionFilter === 'All Regions' || school.region === regionFilter;
      return matchesSearch && matchesRegion;
    });
  }, [searchTerm, regionFilter]);

  return (
    <div className="h-full flex flex-col gap-4 animate-in fade-in duration-500 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        <div>
          <h2 className="text-2xl font-bold text-[#292667] tracking-tight">Hub Directory</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Global Learning Network</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              type="text" 
              placeholder="Filter hubs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-slate-200 pl-8 pr-3 py-2 rounded-lg text-xs outline-none focus:border-[#292667] transition-all w-40 sm:w-56 uppercase font-bold"
            />
          </div>
          <div className="relative">
            <select 
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="bg-white border border-slate-200 pl-3 pr-8 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest outline-none appearance-none cursor-pointer w-32"
            >
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pr-1 pb-6">
        <div className="flex flex-col gap-2">
          {filteredSchools.map((school) => (
            <div 
              key={school.id}
              onClick={() => onEnterCenter(school.id)}
              className="bg-white rounded-xl p-4 border border-slate-100 hover:border-[#292667]/20 hover:shadow-lg transition-all group cursor-pointer flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="flex items-center gap-4 md:w-1/4">
                <div className="w-10 h-10 bg-slate-50 text-[#292667] rounded-lg flex items-center justify-center group-hover:bg-[#292667] group-hover:text-white transition-colors shrink-0">
                  <Building2 size={20} />
                </div>
                <div className="min-w-0">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">{school.id}</span>
                  <h3 className="text-sm font-bold text-[#292667] tracking-tight truncate leading-none uppercase">{school.name}</h3>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                 <div className="flex items-center gap-2 mb-0.5">
                    <MapPin size={10} className="text-[#ec2027]" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{school.location}</span>
                    <span className="text-[10px] font-bold text-[#3b82f6] uppercase tracking-tight ml-2">[{school.region}]</span>
                 </div>
                 <p className="text-[10px] text-slate-400 line-clamp-1 italic uppercase tracking-tight opacity-70">
                    {school.description || "Active U Book Store Hub node providing curriculum services."}
                 </p>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 md:w-1/4 shrink-0">
                 <div className="flex gap-4">
                    <div className="flex flex-col items-end">
                       <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Learners</span>
                       <div className="flex items-center gap-1">
                          <GraduationCap size={12} className="text-[#00a651]" />
                          <span className="text-xs font-bold text-[#292667]">{school.currentStudentCount}</span>
                       </div>
                    </div>
                    <div className="flex flex-col items-end">
                       <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Staff</span>
                       <div className="flex items-center gap-1">
                          <Users size={12} className="text-[#3b82f6]" />
                          <span className="text-xs font-bold text-[#292667]">{school.currentTeacherCount}</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="w-8 h-8 flex items-center justify-center bg-slate-50 group-hover:bg-[#ec2027] group-hover:text-white rounded-lg transition-all">
                    <ArrowRight size={16} />
                 </div>
              </div>
            </div>
          ))}

          {filteredSchools.length === 0 && (
             <div className="py-20 text-center bg-white rounded-2xl border-2 border-dashed border-slate-100 opacity-40">
                <Search size={32} className="mx-auto text-slate-300 mb-2" />
                <h4 className="text-xs font-bold text-[#292667] uppercase tracking-widest">No hubs found</h4>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
