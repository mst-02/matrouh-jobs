import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileCheck2,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Eye,
  AlertCircle,
  XCircle,
  Send,
  Bookmark,
  MapPin,
  Banknote,
  Trash2,
} from 'lucide-react';
import { ApplicationStatus } from '../../types';

export const MyApplicationsView: React.FC = () => {
  const {
    applications,
    withdrawApplication,
    setActiveTab,
    jobs,
    savedJobIds,
    toggleSaveJob,
    setSelectedJob,
  } = useApp();

  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  // Metrics for the applicant
  const totalApps = applications.length;
  const pendingApps = applications.filter(
    (a) => a.status === 'تم الإرسال' || a.status === 'قيد المراجعة' || a.status === 'تم الاطلاع'
  ).length;
  const interviewApps = applications.filter((a) => a.status === 'مقابلة محددة').length;
  const acceptedApps = applications.filter((a) => a.status === 'تم القبول' || a.status === 'عرض عمل').length;
  const rejectedApps = applications.filter((a) => a.status === 'نعتذر حالياً').length;

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'مقابلة محددة':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 animate-pulse">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>مقابلة محددة</span>
          </span>
        );
      case 'تم القبول':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>تم القبول النهائي</span>
          </span>
        );
      case 'تم الاطلاع':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            <span>تمت المشاهدة من المطعم</span>
          </span>
        );
      case 'قيد المراجعة':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-600" />
            <span>قيد مراجعة الـ CV</span>
          </span>
        );
      case 'نعتذر حالياً':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-300 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>نعتذر، لم يتم التوفيق</span>
          </span>
        );
      case 'تم الانسحاب':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            تم سحب الطلب
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300 flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-teal-600" />
            <span>تم الإرسال بنجاح</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5">
      {/* Page Title */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-lg sm:text-xl font-black text-[#0F3D59]">
            طلبات التوظيف ومتابعة الحالة
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            سجل طلباتك وحالات المقابلات الشخصية في مطاعم ومنشآت مطروح
          </p>
        </div>
      </div>

      {/* Mini KPI Dashboard for Applicant */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {/* Card 1: Total */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] text-slate-400 font-bold block">مقدم على</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-black text-[#0F3D59]">{totalApps}</span>
            <span className="text-[10px] text-slate-500">وظائف</span>
          </div>
        </div>

        {/* Card 2: Pending */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] text-purple-700 font-bold block">تحت الانتظار</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-black text-purple-700">{pendingApps}</span>
            <span className="text-[10px] text-slate-500">طلب</span>
          </div>
        </div>

        {/* Card 3: Interviews */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] text-amber-700 font-bold block">مقابلات محددة</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-black text-amber-600">{interviewApps}</span>
            <span className="text-[10px] text-slate-500">موعد</span>
          </div>
        </div>

        {/* Card 4: Accepted */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] text-emerald-700 font-bold block">تم القبول</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-black text-emerald-600">{acceptedApps}</span>
            <span className="text-[10px] text-slate-500">مبارك</span>
          </div>
        </div>

        {/* Card 5: Rejected */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs col-span-2 sm:col-span-1">
          <span className="text-[11px] text-slate-500 font-bold block">لم يتم التوفيق</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-black text-slate-600">{rejectedApps}</span>
            <span className="text-[10px] text-slate-500">طلب</span>
          </div>
        </div>
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 text-center border border-slate-200/80 shadow-2xs max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">لم تتقدم لأي وظيفة بعد</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            استكشف وظائف مطاعم مطروح والساحل المتاحة اليوم وقدّم سيرتك الذاتية بضغطة زر.
          </p>
          <button
            onClick={() => setActiveTab('search')}
            className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs"
          >
            تصفح الوظائف المتاحة الآن
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-3"
            >
              {/* Top Row: Org Name, Job Title, Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div>
                  <span className="text-xs text-teal-700 font-bold block">
                    {app.organizationName}
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                    {app.jobTitle}
                  </h3>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    تاريخ التقديم: {app.appliedAt}
                  </span>
                </div>

                <div className="self-start sm:self-center">{getStatusBadge(app.status)}</div>
              </div>

              {/* Interview callout if present */}
              {app.interviewDate && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold block">موعد ومكان المقابلة المحددة:</span>
                    <span className="text-amber-900 mt-0.5 block">{app.interviewDate}</span>
                  </div>
                </div>
              )}

              {/* CV Snapshot and Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-1">
                <div className="flex items-center gap-2 text-slate-500">
                  <FileText className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>
                    النسخة المرفقة بالطلب: <strong className="text-slate-700">{app.cvSnapshot.filename}</strong> (v{app.cvSnapshot.version})
                  </span>
                </div>

                {app.status !== 'تم الانسحاب' && app.status !== 'تم القبول' && (
                  <button
                    onClick={() => withdrawApplication(app.id)}
                    className="text-xs text-rose-600 hover:text-rose-700 font-semibold self-start sm:self-auto hover:underline"
                  >
                    سحب الطلب
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Saved / Bookmarked Jobs (المفضلة / المحفوظات) */}
      <div className="pt-6 border-t border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-rose-500 fill-rose-500" />
            <h2 className="text-sm sm:text-base font-black text-[#0F3D59]">
              الوظائف المحفوظة (المفضلة)
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {savedJobs.length}
            </span>
          </div>
        </div>

        {savedJobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center border border-dashed border-slate-200 text-xs text-slate-500">
            لم تقم بحفظ أي وظيفة حتى الآن. اضغط على علامة الحفظ (🔖) في أي بطاقة وظيفة لتظهر لك هنا للرجوع إليها لاحقاً.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-teal-500/50 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs text-teal-700 font-bold block">
                        {job.organizationName}
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-900 mt-0.5 line-clamp-1">
                        {job.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                      title="إزالة من المحفوظات"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-teal-600" />
                      {job.area}
                    </span>
                    <span className="flex items-center gap-1 font-bold text-slate-700">
                      <Banknote className="w-3 h-3 text-emerald-600" />
                      {job.salaryMin ? `${job.salaryMin.toLocaleString('ar-EG')} ج.م` : 'تفاوض'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{job.employmentType}</span>
                  {applications.some((a) => a.jobPostId === job.id) ? (
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 font-bold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                      <span>
                        تم التقديم (
                        {applications.find((a) => a.jobPostId === job.id)?.status}
                        )
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors"
                    >
                      قدّم الآن
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
