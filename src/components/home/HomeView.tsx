import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HeroSection } from './HeroSection';
import { AreaFilterSection } from './AreaFilterSection';
import { MatrouhShowcase } from './MatrouhShowcase';
import { JobCard } from '../jobs/JobCard';
import {
  Sparkles,
  ArrowLeft,
  Building2,
  CheckCircle2,
  MapPin,
} from 'lucide-react';

interface HomeViewProps {
  onSearch: (searchTerm: string, area: string, category: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSearch }) => {
  const {
    jobs,
    organizations,
    setActiveTab,
    currentUser,
    setIsPostJobModalOpen,
    setIsAuthModalOpen,
    setAuthModalMode,
    t,
    language,
  } = useApp();
  const [selectedHomeArea, setSelectedHomeArea] = useState<string>('');

  const verifiedOrgs = organizations.filter((o) => o.verificationStatus === 'موثقة');
  const verifiedOrgIds = verifiedOrgs.map((o) => o.id);

  const featuredJobs = jobs.filter((j) => {
    if (!verifiedOrgIds.includes(j.organizationId)) return false;
    if (selectedHomeArea) return j.area === selectedHomeArea;
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Hero */}
      <HeroSection onSearch={onSearch} />

      {/* 2. Areas */}
      <AreaFilterSection
        selectedArea={selectedHomeArea}
        onSelectArea={(area) => setSelectedHomeArea(area)}
      />

      {/* 3. Latest Jobs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-base sm:text-xl font-black text-slate-900">
              {t.latestJobs}
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('search')}
            className="flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors"
          >
            <span>{language === 'ar' ? `عرض الكل (${jobs.length})` : `View All (${jobs.length})`}</span>
            <ArrowLeft className={`w-3.5 h-3.5 ${language === 'en' ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {featuredJobs.slice(0, 6).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* 4. Verified Brands */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-4 h-4 text-teal-600" />
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            {language === 'ar' ? 'أشهر المطاعم والمنشآت الموثقة' : 'Verified Establishments & Restaurants'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {verifiedOrgs.slice(0, 6).map((org) => (
            <div
              key={org.id}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center gap-3"
            >
              <img
                src={org.logo}
                alt={org.name}
                className="w-11 h-11 rounded-xl object-cover border border-slate-100 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-black text-slate-900 truncate">{org.name}</h3>
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 fill-teal-50 shrink-0" />
                </div>
                <span className="text-[11px] text-teal-700 font-medium block truncate">
                  {org.category}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-2.5 h-2.5" />
                  {org.area}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Benefits Summary */}
      <MatrouhShowcase />

      {/* 6. Clean Banner for Restaurant Owners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="rounded-3xl bg-gradient-to-r from-[#0F3D59] to-[#00A896] p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1">
            <h3 className="text-base sm:text-xl font-black">
              صاحب مطعم أو منشأة سياحية في مطروح؟
            </h3>
            <p className="text-xs text-slate-200">
              انشر إعلانات الوظائف مجاناً واستقبل المتقدمين مع سيرهم الذاتية بسهولة
            </p>
          </div>

          <button
            onClick={() => {
              if (currentUser?.role === 'employer') {
                setActiveTab('employer-dashboard');
                setIsPostJobModalOpen(true);
              } else {
                setAuthModalMode('register');
                setIsAuthModalOpen(true);
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-white text-[#0F3D59] font-black text-xs hover:bg-slate-100 transition-transform hover:scale-105 shrink-0 self-start sm:self-auto shadow-xs"
          >
            نشر إعلان وظيفة
          </button>
        </div>
      </section>
    </div>
  );
};
