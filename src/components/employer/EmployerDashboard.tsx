import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Users,
  Briefcase,
  Calendar,
  CheckCircle2,
  Search,
  Filter,
  Eye,
  FileText,
  Download,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronLeft,
  X,
  Plus,
} from 'lucide-react';
import { Application, ApplicationStatus } from '../../types';

export const EmployerDashboard: React.FC = () => {
  const {
    currentUser,
    organizations,
    jobs,
    applications,
    updateApplicationStatus,
    setIsPostJobModalOpen,
    setIsFacilityProfileModalOpen,
    setActiveTab,
  } = useApp();

  const myOrg =
    organizations.find((o) => o.id === currentUser?.organizationId) ||
    organizations.find((o) => o.name === currentUser?.name) ||
    organizations[0];

  const myJobs = jobs.filter((j) => j.organizationId === myOrg.id);
  const myApplications = applications.filter((a) => a.organizationId === myOrg.id);

  // Filters
  const [selectedJobFilter, setSelectedJobFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected candidate drawer
  const [activeApplication, setActiveApplication] = useState<Application | null>(null);
  const [internalNoteInput, setInternalNoteInput] = useState('');
  const [interviewDateInput, setInterviewDateInput] = useState('');
  const [saveToast, setSaveToast] = useState(false);
  const [downloadAuditToast, setDownloadAuditToast] = useState<string | null>(null);

  // Filtered applications
  const filteredApps = myApplications.filter((app) => {
    const matchesJob = selectedJobFilter === 'all' || app.jobPostId === selectedJobFilter;
    const matchesStatus = selectedStatusFilter === 'all' || app.status === selectedStatusFilter;
    const matchesQuery =
      searchQuery.trim() === '' ||
      app.candidateName.includes(searchQuery) ||
      app.jobTitle.includes(searchQuery) ||
      app.candidatePhone.includes(searchQuery);
    return matchesJob && matchesStatus && matchesQuery;
  });

  const handleOpenCandidate = (app: Application) => {
    setActiveApplication(app);
    setInternalNoteInput(app.internalNote || '');
    setInterviewDateInput(app.interviewDate || '');
    if (app.status === 'تم الإرسال') {
      updateApplicationStatus(app.id, 'تم الاطلاع');
    }
  };

  const handleSaveNotes = () => {
    if (!activeApplication) return;
    updateApplicationStatus(activeApplication.id, activeApplication.status, internalNoteInput);
    if (interviewDateInput) {
      activeApplication.interviewDate = interviewDateInput;
    }
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleSimulateDownloadCV = (app: Application) => {
    setDownloadAuditToast(
      `تم توليد رابط مؤقت مشفر (5 دقائق) للسيرة: ${app.cvSnapshot.filename} | تم تسجيل العملية في سجل التدقيق`
    );
    setTimeout(() => setDownloadAuditToast(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5">
      {/* Sleek Minimalist Restaurant Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src={myOrg.logo}
            alt={myOrg.name}
            className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-2xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-[#0F3D59]">{myOrg.name}</h1>
              {myOrg.verificationStatus === 'موثقة' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-[11px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>موثقة</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
              <span>{myOrg.category}</span>
              <span>•</span>
              <span>{myOrg.area}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPostJobModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>نشر وظيفة جديدة</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] text-slate-400 font-bold block">الوظائف النشطة</span>
          <span className="text-xl font-black text-[#0F3D59] mt-0.5 block">{myJobs.length}</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] text-slate-400 font-bold block">طلبات التوظيف</span>
          <span className="text-xl font-black text-teal-700 mt-0.5 block">{myApplications.length}</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] text-amber-700 font-bold block">مقابلات محددة</span>
          <span className="text-xl font-black text-amber-600 mt-0.5 block">
            {myApplications.filter((a) => a.status === 'مقابلة محددة').length}
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] text-emerald-700 font-bold block">تم القبول</span>
          <span className="text-xl font-black text-emerald-600 mt-0.5 block">
            {myApplications.filter((a) => a.status === 'تم القبول').length}
          </span>
        </div>
      </div>

      {/* Modern Applicant Tracking Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Search & Filter Header */}
        <div className="p-3.5 sm:p-4 border-b border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50/70">
          <h2 className="text-sm font-black text-slate-800">
            المتقدمون للوظائف ({filteredApps.length})
          </h2>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:w-44">
              <input
                type="text"
                placeholder="بحث بالاسم أو الهاتف..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs p-2 pr-7 rounded-xl border border-slate-200 bg-white"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5" />
            </div>

            <select
              value={selectedJobFilter}
              onChange={(e) => setSelectedJobFilter(e.target.value)}
              className="text-xs p-2 rounded-xl border border-slate-200 bg-white font-medium"
            >
              <option value="all">كل الوظائف</option>
              {myJobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title}
                </option>
              ))}
            </select>

            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="text-xs p-2 rounded-xl border border-slate-200 bg-white font-medium"
            >
              <option value="all">كل الحالات</option>
              <option value="تم الإرسال">تم الإرسال</option>
              <option value="تم الاطلاع">تم الاطلاع</option>
              <option value="قيد المراجعة">قيد المراجعة</option>
              <option value="مقابلة محددة">مقابلة محددة</option>
              <option value="تم القبول">تم القبول</option>
              <option value="نعتذر حالياً">نعتذر حالياً</option>
            </select>
          </div>
        </div>

        {/* Applicants List */}
        {filteredApps.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            لا توجد طلبات توظيف تطابق هذا الفلتر حالياً.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                onClick={() => handleOpenCandidate(app)}
                className="p-3.5 sm:p-4 hover:bg-slate-50/80 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 font-black flex items-center justify-center shrink-0 text-xs">
                    {app.candidateName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                        {app.candidateName}
                      </h3>
                      <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded-md font-semibold">
                        {app.candidateArea}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium block mt-0.5">
                      {app.jobTitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-center">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                      app.status === 'مقابلة محددة'
                        ? 'bg-amber-100 text-amber-800'
                        : app.status === 'تم القبول'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {app.status}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenCandidate(app);
                    }}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span>عرض</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Candidate Details Drawer Modal */}
      {activeApplication && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-600 text-white font-black flex items-center justify-center text-xs shadow-xs">
                  {activeApplication.candidateName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900">
                    {activeApplication.candidateName}
                  </h3>
                  <span className="text-xs text-slate-500">
                    متقدم لـ: {activeApplication.jobTitle}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveApplication(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1 text-xs">
              {saveToast && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl animate-in fade-in">
                  ✓ تم حفظ التحديثات وتحديد الموعد بنجاح!
                </div>
              )}
              {downloadAuditToast && (
                <div className="p-2.5 bg-blue-50 border border-blue-200 text-blue-900 text-[11px] font-bold rounded-xl animate-in fade-in">
                  🛡️ {downloadAuditToast}
                </div>
              )}

              {/* Contact info */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                  <a href={`tel:${activeApplication.candidatePhone}`} dir="ltr" className="hover:underline">
                    {activeApplication.candidatePhone}
                  </a>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  <span>{activeApplication.candidateArea}</span>
                </div>
              </div>

              {/* CV Snapshot Card */}
              <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-teal-600" />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {activeApplication.cvSnapshot.filename}
                    </span>
                    <span className="text-[10px] text-teal-700">
                      v{activeApplication.cvSnapshot.version} • {activeApplication.cvSnapshot.fileSize}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleSimulateDownloadCV(activeApplication)}
                  className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold flex items-center gap-1 shadow-2xs"
                >
                  <Download className="w-3 h-3" />
                  <span>تحميل الـ CV</span>
                </button>
              </div>

              {/* Change Status */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  تحديث حالة المتقدم:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(
                    [
                      'قيد المراجعة',
                      'تم الاطلاع',
                      'مقابلة محددة',
                      'عرض عمل',
                      'تم القبول',
                      'نعتذر حالياً',
                    ] as ApplicationStatus[]
                  ).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        updateApplicationStatus(activeApplication.id, st);
                        setActiveApplication({ ...activeApplication, status: st });
                      }}
                      className={`p-1.5 rounded-lg border font-bold transition-all text-center ${
                        activeApplication.status === st
                          ? 'bg-[#0F3D59] text-white border-[#0F3D59]'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interview date field */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  موعد ومكان المقابلة (يصل للمتقدم بإشعار مباشر):
                </label>
                <input
                  type="text"
                  placeholder="مثال: الخميس القادم - 4:00 عصراً بمقر المطعم"
                  value={interviewDateInput}
                  onChange={(e) => setInterviewDateInput(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
                />
              </div>

              {/* Internal notes */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  ملاحظات سرية للمطعم:
                </label>
                <textarea
                  rows={2}
                  placeholder="ملاحظات تقييم مهارات المتقدم..."
                  value={internalNoteInput}
                  onChange={(e) => setInternalNoteInput(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveApplication(null)}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl"
              >
                إغلاق
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                حفظ التحديثات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
