import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  MapPin,
  Banknote,
  Clock,
  Sparkles,
  CheckCircle2,
  Bookmark,
  Users,
  Building,
  Check,
  Share2,
  Calendar,
  AlertCircle,
  Home,
  UtensilsCrossed,
} from 'lucide-react';

export const JobDetailsModal: React.FC = () => {
  const {
    selectedJob,
    setSelectedJob,
    setIsApplyModalOpen,
    savedJobIds,
    toggleSaveJob,
    applications,
    seekerProfile,
    setIsCvModalOpen,
    setPendingJobId,
    userRole,
    setActiveTab,
  } = useApp();

  if (!selectedJob) return null;

  const isSaved = savedJobIds.includes(selectedJob.id);
  const myApp = applications.find(
    (app) => app.jobPostId === selectedJob.id && app.candidateUserId === seekerProfile.userId
  );

  const handleApply = () => {
    if (!seekerProfile.cv || seekerProfile.cv.status !== 'جاهز') {
      setPendingJobId(selectedJob.id);
      setIsCvModalOpen(true);
    } else {
      setIsApplyModalOpen(true);
    }
  };

  const [copiedToast, setCopiedToast] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedJob.title,
        text: `فرصة عمل ممتازة في مطروح: ${selectedJob.title} في ${selectedJob.organizationName}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200/80 my-4 max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="relative h-44 sm:h-56 bg-slate-900 shrink-0">
          <img
            src={
              selectedJob.images && selectedJob.images[0]
                ? selectedJob.images[0]
                : 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
            }
            alt={selectedJob.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

          {/* Close & Action Buttons */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <button
              onClick={() => setSelectedJob(null)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {copiedToast && (
                <span className="text-[11px] font-bold bg-teal-600 text-white px-3 py-1 rounded-full shadow-md animate-in fade-in">
                  تم نسخ الرابط!
                </span>
              )}
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors"
                title="مشاركة"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => toggleSaveJob(selectedJob.id)}
                className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                  isSaved
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/20 hover:bg-white/40 text-white'
                }`}
                title="حفظ"
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          {/* Header Card overlay */}
          <div className="absolute bottom-4 right-4 left-4 flex items-end gap-3 sm:gap-4">
            <img
              src={selectedJob.organizationLogo}
              alt={selectedJob.organizationName}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-white shadow-md bg-white shrink-0"
            />
            <div className="text-white">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs sm:text-sm font-semibold opacity-90">
                  {selectedJob.organizationName}
                </span>
                {selectedJob.organizationVerified && (
                  <span className="inline-flex items-center text-teal-400">
                    <CheckCircle2 className="w-4 h-4 fill-teal-400 text-slate-900" />
                  </span>
                )}
                {selectedJob.isSeasonal && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/90 text-white">
                    موسم صيف 2026
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-2xl font-black mt-0.5 line-clamp-1">
                {selectedJob.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Key Facts Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span className="text-[11px] text-slate-400 font-medium block">الموقع</span>
              <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs sm:text-sm mt-0.5">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="truncate">{selectedJob.area}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span className="text-[11px] text-slate-400 font-medium block">الراتب المتوقع</span>
              <div className="flex items-center gap-1.5 font-bold text-emerald-700 text-xs sm:text-sm mt-0.5">
                <Banknote className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">
                  {selectedJob.salaryMin
                    ? `${selectedJob.salaryMin.toLocaleString('ar-EG')} ج.م`
                    : 'تفاوض'}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span className="text-[11px] text-slate-400 font-medium block">طبيعة الدوام</span>
              <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs sm:text-sm mt-0.5">
                <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="truncate">{selectedJob.employmentType}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span className="text-[11px] text-slate-400 font-medium block">العدد المطلوب</span>
              <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs sm:text-sm mt-0.5">
                <Users className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{selectedJob.vacanciesCount} أفراد</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 mb-2">الوصف الوظيفي والمسؤوليات</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
              {selectedJob.description}
            </p>
          </div>

          {/* Requirements */}
          {selectedJob.requirements && selectedJob.requirements.length > 0 && (
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 mb-2">شروط ومتطلبات التقديم</h3>
              <div className="space-y-2">
                {selectedJob.requirements.map((req, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                  >
                    <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits & Perks */}
          {selectedJob.benefits && selectedJob.benefits.length > 0 && (
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 mb-2">المزايا وتسهيلات العمل</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedJob.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/60 text-xs sm:text-sm text-emerald-900 font-semibold"
                  >
                    {benefit.includes('سكن') ? (
                      <Home className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <UtensilsCrossed className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work location details */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <Building className="w-5 h-5 text-teal-600 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-slate-800 block">عنوان وبيئة العمل:</span>
              <span className="text-slate-500">{selectedJob.address}</span>
            </div>
          </div>

          {/* CV Prerequisite notice (Seeker only) */}
          {userRole !== 'employer' && !seekerProfile.cv && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-xs text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                لم تقم برفع سيرتك الذاتية بعد. عند الضغط على "قدّم الآن" سيتم فتح نافذة رفع السيرة الذاتية أولاً ثم إتمام طلبك تلقائياً.
              </span>
            </div>
          )}
        </div>

        {/* Modal Bottom Sticky CTA */}
        <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">الراتب الصافي</span>
            <span className="text-base font-black text-[#0F3D59]">
              {selectedJob.salaryMin
                ? `${selectedJob.salaryMin.toLocaleString('ar-EG')} - ${selectedJob.salaryMax?.toLocaleString('ar-EG')} ج.م`
                : 'حسب الخبرة'}
            </span>
          </div>

          {userRole === 'admin' ? (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl">
                حساب مدير نظام (التقديم مخصص للباحثين عن العمل)
              </span>
              <button
                onClick={() => {
                  setSelectedJob(null);
                  setActiveTab('admin-dashboard');
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
              >
                لوحة الإدارة
              </button>
            </div>
          ) : userRole === 'employer' ? (
            <button
              onClick={() => {
                setSelectedJob(null);
                setActiveTab('employer-dashboard');
              }}
              className="px-6 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors"
            >
              الذهاب للوحة تحكم المطعم
            </button>
          ) : myApp ? (
            <div className="flex items-center gap-2">
              <span className="px-4 py-2.5 rounded-2xl bg-teal-100 text-teal-800 font-bold text-xs sm:text-sm">
                تم التقديم سابقاً ({myApp.status})
              </span>
            </div>
          ) : (
            <button
              onClick={handleApply}
              className="px-6 sm:px-8 py-3 rounded-2xl bg-gradient-to-r from-[#0F3D59] to-[#00A896] hover:from-[#0b2b3f] hover:to-[#008f80] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-teal-900/15 transition-all hover:scale-[1.02] active:scale-95"
            >
              قدّم الآن على الوظيفة
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
