import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { JobCard } from './JobCard';
import {
  Search,
  Filter,
  MapPin,
  Utensils,
  Clock,
  Sparkles,
  Home,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { MATROUH_AREAS, JOB_CATEGORIES } from '../../data/mockData';
import { JobCategory, AreaName, EmploymentType } from '../../types';

interface JobsExplorerViewProps {
  initialSearch?: string;
  initialArea?: string;
  initialCategory?: string;
}

export const JobsExplorerView: React.FC<JobsExplorerViewProps> = ({
  initialSearch = '',
  initialArea = '',
  initialCategory = '',
}) => {
  const { jobs, organizations } = useApp();

  const [keyword, setKeyword] = useState(initialSearch);
  const [selectedArea, setSelectedArea] = useState(initialArea);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [onlySeasonal, setOnlySeasonal] = useState(false);
  const [onlyHousing, setOnlyHousing] = useState(false);
  const [sortBy, setSortBy] = useState<'latest' | 'salary'>('latest');

  const verifiedOrgIds = useMemo(
    () => organizations.filter((o) => o.verificationStatus === 'موثقة').map((o) => o.id),
    [organizations]
  );

  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) => {
        if (!verifiedOrgIds.includes(job.organizationId)) return false;

        const matchesKeyword =
          !keyword.trim() ||
          job.title.toLowerCase().includes(keyword.toLowerCase()) ||
          job.organizationName.toLowerCase().includes(keyword.toLowerCase()) ||
          job.description.toLowerCase().includes(keyword.toLowerCase());

        const matchesArea = !selectedArea || job.area === selectedArea;
        const matchesCategory = !selectedCategory || job.category === selectedCategory;
        const matchesType = selectedType === 'all' || job.employmentType === selectedType;
        const matchesSeasonal = !onlySeasonal || job.employmentType === 'موسم صيف';
        const matchesHousing =
          !onlyHousing || job.benefits.some((b) => b.includes('سكن'));

        return (
          matchesKeyword &&
          matchesArea &&
          matchesCategory &&
          matchesType &&
          matchesSeasonal &&
          matchesHousing
        );
      })
      .sort((a, b) => {
        if (sortBy === 'salary') {
          return (b.salaryMax || b.salaryMin || 0) - (a.salaryMax || a.salaryMin || 0);
        }
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
  }, [
    jobs,
    keyword,
    selectedArea,
    selectedCategory,
    selectedType,
    onlySeasonal,
    onlyHousing,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedArea('');
    setSelectedCategory('');
    setSelectedType('all');
    setOnlySeasonal(false);
    setOnlyHousing(false);
    setSortBy('latest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      {/* Search & Top Controls */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0F3D59]">
              استكشف وظائف مطروح والساحل
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              تصفح أحدث إعلانات المطاعم والمنشآت الموثقة بحسب منطقتك وتخصصك
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">الترتيب:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'salary')}
              className="text-xs p-2 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700"
            >
              <option value="latest">الأحدث نشرًا</option>
              <option value="salary">الراتب الأعلى</option>
            </select>
          </div>
        </div>

        {/* Input & Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث بمسمى الوظيفة أو المطعم..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full text-xs p-2.5 pr-8 rounded-xl border border-slate-200 bg-slate-50 focus:outline-hidden focus:border-teal-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3" />
          </div>

          <div>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
            >
              <option value="">كل مناطق مطروح ({MATROUH_AREAS.length})</option>
              {MATROUH_AREAS.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name} ({a.jobCount})
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
            >
              <option value="">كل التخصصات والمجالات</option>
              {JOB_CATEGORIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} ({c.count})
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
            >
              <option value="all">كل أنواع الدوام</option>
              <option value="دوام كامل">دوام كامل</option>
              <option value="دوام جزئي">دوام جزئي</option>
              <option value="موسم صيف">موسم صيف</option>
            </select>
          </div>
        </div>

        {/* Quick Badges Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setOnlySeasonal(!onlySeasonal)}
              className={`px-3 py-1.5 rounded-xl border font-bold transition-all ${
                onlySeasonal
                  ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              ☀️ موسم صيف 2026 فقط
            </button>

            <button
              onClick={() => setOnlyHousing(!onlyHousing)}
              className={`px-3 py-1.5 rounded-xl border font-bold transition-all ${
                onlyHousing
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-900 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              🏠 سكن مغتربين مجاني
            </button>
          </div>

          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-600 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة ضبط الفلاتر</span>
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
        <span>تم العثور على ({filteredJobs.length}) وظيفة مطابقة</span>
        {selectedArea && <span>المنطقة: {selectedArea}</span>}
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-xs max-w-md mx-auto space-y-3">
          <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-extrabold text-slate-800">
            لا توجد وظائف مطابقة لاختياراتك
          </h3>
          <p className="text-xs text-slate-500">
            جرب تغيير معايير البحث أو اختيار كل مناطق مطروح للاطلاع على باقي الفرص.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-teal-600 text-white text-xs font-bold rounded-xl shadow-xs"
          >
            عرض كل الوظائف
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};
