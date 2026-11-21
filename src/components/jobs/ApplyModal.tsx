import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  FileText,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Lock,
  Send,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

export const ApplyModal: React.FC = () => {
  const {
    selectedJob,
    isApplyModalOpen,
    setIsApplyModalOpen,
    seekerProfile,
    applyToJob,
    setIsCvModalOpen,
    setPendingJobId,
  } = useApp();

  const [coverNote, setCoverNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isApplyModalOpen || !selectedJob) return null;

  // Strict check: CV existence
  if (!seekerProfile.cv || seekerProfile.cv.status !== 'جاهز') {
    // Should route to CV upload
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
        <div className="bg-white w-full max-w-md rounded-3xl p-6 text-center space-y-4 shadow-2xl border border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-900">أضف سيرتك الذاتية أولاً</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            وفقاً لقواعد التوظيف في منصة وظائف مطروح، يلزم وجود سيرة ذاتية صالحة لإتمام التقديم على وظيفة: <br />
            <strong className="text-slate-800 font-bold">"{selectedJob.title}"</strong>
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setPendingJobId(selectedJob.id);
                setIsApplyModalOpen(false);
                setIsCvModalOpen(true);
              }}
              className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/20"
            >
              رفع السيرة الذاتية الآن
            </button>
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="w-full py-2.5 rounded-2xl bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200"
            >
              إلغاء التقديم
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    setErrorMsg(null);

    setTimeout(() => {
      const result = applyToJob(selectedJob.id, coverNote);
      setIsSubmitting(false);

      if (result.success) {
        setIsApplyModalOpen(false);
        setCoverNote('');
      } else {
        if (result.reason === 'ALREADY_APPLIED') {
          setErrorMsg('لقد قمت بالتقديم على هذه الوظيفة بالفعل.');
        } else if (result.reason === 'NEED_CV') {
          setErrorMsg('السيرة الذاتية غير جاهزة. يرجى إعادة رفعها.');
        } else {
          setErrorMsg('حدث خطأ أثناء إرسال الطلب، يرجى المحاولة ثانية.');
        }
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <span className="text-[11px] font-bold text-teal-600 block">تأكيد طلب التوظيف</span>
            <h3 className="text-base sm:text-lg font-black text-[#0F3D59] line-clamp-1">
              {selectedJob.title}
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              المنشأة: {selectedJob.organizationName}
            </span>
          </div>

          <button
            onClick={() => setIsApplyModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Candidate Profile Summary */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
              بيانات المتقدم التي ستشارك مع المطعم
            </span>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <User className="w-3.5 h-3.5 text-teal-600" />
                <span>{seekerProfile.fullName}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <Phone className="w-3.5 h-3.5 text-teal-600" />
                <span dir="ltr">{seekerProfile.phone}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>{seekerProfile.area}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700 truncate">
                <Mail className="w-3.5 h-3.5 text-teal-600" />
                <span className="truncate">{seekerProfile.email || 'لم يُحدد'}</span>
              </div>
            </div>
          </div>

          {/* Attached Fixed CV Snapshot Info */}
          <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block truncate max-w-[200px]">
                  {seekerProfile.cv.filename}
                </span>
                <span className="text-[10px] text-teal-700 font-medium">
                  النسخة v{seekerProfile.cv.version} • {seekerProfile.cv.fileSize}
                </span>
              </div>
            </div>

            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800">
              نسخة ثابتة مؤمنة
            </span>
          </div>

          {/* Cover note input */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              رسالة أو نبذة مختصرة للمطعم (اختياري)
            </label>
            <textarea
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              placeholder="مثال: جاهز للعمل الفوري خلال الموسم الصيفي، ولدي خبرة سابقة في المشويات..."
              rows={3}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          {/* Privacy & Legal disclaimer */}
          <div className="flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed">
            <Lock className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
            <span>
              بالضغط على "تأكيد وإرسال الطلب"، فإنك توافق على مشاركة نسخة ثابتة من سيرتك الذاتية وبيانات الاتصال حصرياً مع إدارة هذا المطعم.
            </span>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={() => setIsApplyModalOpen(false)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            إلغاء
          </button>
          <button
            onClick={handleConfirmSubmit}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-extrabold text-xs shadow-md shadow-teal-600/20 flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'جاري الإرسال...' : 'تأكيد وإرسال الطلب'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
