import React from 'react';
import { JobPost } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Banknote,
  Clock,
  Bookmark,
  CheckCircle2,
  Home,
  UtensilsCrossed,
} from 'lucide-react';

interface JobCardProps {
  job: JobPost;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const {
    setSelectedJob,
    setIsApplyModalOpen,
    savedJobIds,
    toggleSaveJob,
    applications,
    seekerProfile,
    setIsCvModalOpen,
    setPendingJobId,
    currentUser,
    userRole,
    setIsAuthModalOpen,
    t,
    language,
  } = useApp();

  const isSaved = savedJobIds.includes(job.id);
  const myApp = applications.find(
    (app) => app.jobPostId === job.id && app.candidateUserId === seekerProfile.userId
  );

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedJob(job);

    if (!currentUser) {
      setPendingJobId(job.id);
      setIsAuthModalOpen(true);
      return;
    }

    if (!seekerProfile.cv || seekerProfile.cv.status !== 'جاهز') {
      setPendingJobId(job.id);
      setIsCvModalOpen(true);
    } else {
      setIsApplyModalOpen(true);
    }
  };

  const handleCardClick = () => {
    setSelectedJob(job);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 hover:border-teal-500/50 shadow-2xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
    >
      <div>
        {/* Header: Logo, Name, Verification, Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <img
              src={job.organizationLogo}
              alt={job.organizationName}
              className="w-11 h-11 rounded-xl object-cover border border-slate-100 shadow-2xs shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-slate-600">{job.organizationName}</span>
                {job.organizationVerified && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 fill-teal-50" />
                )}
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors mt-0.5 line-clamp-1">
                {job.title}
              </h3>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveJob(job.id);
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              isSaved
                ? 'bg-rose-50 text-rose-500 fill-rose-500'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
            aria-label="حفظ الوظيفة"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Location & Tags (Clean & Minimal) */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2.5 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md font-medium text-slate-700 text-[11px]">
            <MapPin className="w-3 h-3 text-teal-600" />
            {job.area}
          </span>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold ${
              job.employmentType === 'موسم صيف'
                ? 'bg-amber-100 text-amber-900 border border-amber-200'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Clock className="w-3 h-3 text-teal-600" />
            {job.employmentType === 'موسم صيف'
              ? t.summerSeason
              : job.employmentType === 'دوام كامل'
              ? t.fullTime
              : job.employmentType === 'دوام جزئي'
              ? t.partTime
              : job.employmentType}
          </span>
        </div>
      </div>

      {/* Footer: Salary & Action Button */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-xs font-black text-[#0F3D59]">
          <Banknote className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          {job.salaryMin && job.salaryMax ? (
            <span>
              {job.salaryMin.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')} - {job.salaryMax.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')} {t.egp}
            </span>
          ) : job.salaryMin ? (
            <span>{language === 'ar' ? `من ${job.salaryMin.toLocaleString('ar-EG')} ج.م` : `From ${job.salaryMin.toLocaleString('en-US')} EGP`}</span>
          ) : (
            <span>{language === 'ar' ? 'تفاوض' : 'Negotiable'}</span>
          )}
          <span className="text-[10px] text-slate-400 font-normal">
            /{language === 'ar' ? job.salaryPeriod : 'month'}
          </span>
        </div>

        {userRole === 'admin' ? (
          <button
            onClick={handleCardClick}
            className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs transition-colors"
          >
            {language === 'ar' ? 'معاينة كمدير' : 'Admin View'}
          </button>
        ) : userRole === 'employer' ? (
          <button
            onClick={handleCardClick}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
          </button>
        ) : myApp ? (
          <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 font-bold text-[11px] border border-teal-200">
            {t.appliedStatus}
          </span>
        ) : (
          <button
            onClick={handleApplyClick}
            className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-2xs transition-all hover:scale-105"
          >
            {language === 'ar' ? 'قدّم الآن' : 'Apply Now'}
          </button>
        )}
      </div>
    </div>
  );
};
