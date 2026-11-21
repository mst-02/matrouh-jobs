import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  UploadCloud,
  FileCheck2,
  FileText,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  ScanText,
} from 'lucide-react';

export const CvUploadModal: React.FC = () => {
  const {
    isCvModalOpen,
    setIsCvModalOpen,
    uploadCV,
    pendingJobId,
    jobs,
    userRole,
    organizations,
    seekerProfile,
  } = useApp();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parseProgress, setParseProgress] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<{
    name?: string;
    phone?: string;
    role?: string;
    skills?: string[];
    recordNumber?: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Quick builder inputs
  const [builderHeadline, setBuilderHeadline] = useState('شيف ومساعد مطبخ محترف');
  const [builderExperience, setBuilderExperience] = useState('خبرة سنتين في مطاعم المشويات والأسماك بمطروح');
  const [builderSkills, setBuilderSkills] = useState('شواء على الفحم، تتبيل لحوم، التزام بالمواعيد');
  const [activeMode, setActiveMode] = useState<'upload' | 'builder'>('upload');

  if (!isCvModalOpen) return null;

  const targetJob = pendingJobId ? jobs.find((j) => j.id === pendingJobId) : null;
  const isEmployer = userRole === 'employer';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg('حجم الملف يتجاوز الحد الأقصى المسموح (10 ميجابايت).');
        return;
      }
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        setErrorMsg('الصيغة المقبولة حصراً هي ملفات PDF.');
        return;
      }

      setErrorMsg(null);
      setSelectedFile(file);
      setExtractedData(null);
    }
  };

  const handleConfirmUpload = () => {
    if (!selectedFile) {
      setErrorMsg('يرجى اختيار ملف PDF أولاً.');
      return;
    }

    setIsProcessing(true);
    setParseProgress('جاري قراءة نصوص وفحص أمان ملف الـ PDF...');

    setTimeout(() => {
      setParseProgress('جاري استخراج المهارات والبيانات الأساسية وتعبئتها...');

      setTimeout(() => {
        const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(1);

        if (!isEmployer) {
          // Seeker extraction simulation
          const parsed = {
            name: seekerProfile.fullName,
            phone: seekerProfile.phone,
            role: 'شيف مشويات ومأكولات بحرية',
            skills: ['شواء الفحم', 'تتبيل اللحوم', 'سلامة الغذاء HACCP', 'خدمة عملاء'],
          };
          setExtractedData(parsed);

          uploadCV({
            filename: selectedFile.name,
            fileSize: `${sizeMB} MB`,
            mimeType: 'application/pdf',
            parsedData: {
              extractedName: parsed.name,
              extractedPhone: parsed.phone,
              extractedSkills: parsed.skills,
            },
          });
        } else {
          // Employer commercial register extraction simulation
          const parsed = {
            recordNumber: `CR-${Math.floor(10000 + Math.random() * 90000)}-MATROUH`,
          };
          setExtractedData(parsed);
          organizations[0].commercialRecordNumber = parsed.recordNumber;
          organizations[0].verificationStatus = 'موثقة';
        }

        setIsProcessing(false);
        setParseProgress(null);
      }, 700);
    }, 700);
  };

  const handleQuickBuild = () => {
    setIsProcessing(true);
    setTimeout(() => {
      uploadCV({
        filename: `سيرة_ذاتية_${builderHeadline.replace(/\s+/g, '_')}.pdf`,
        fileSize: '1.1 MB',
        mimeType: 'application/pdf',
      });
      setIsProcessing(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col">
        {/* Modal Top */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#0F3D59]">
              {isEmployer
                ? 'سجل وتراخيص المنشأة والمطعم'
                : 'السيرة الذاتية (CV)'}
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {isEmployer
                ? 'ارفع السجل التجاري أو رخصة المطعم لتوثيق منشأتك واستخراج رقم السجل'
                : targetJob
                ? `مطلوبة للتقديم على وظيفة: "${targetJob.title}"`
                : 'إرفاق ملف السيرة الذاتية لحسابك'}
            </span>
          </div>

          <button
            onClick={() => setIsCvModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch for Seeker only */}
        {!isEmployer && (
          <div className="p-2.5 bg-slate-100 flex gap-2 border-b border-slate-200">
            <button
              onClick={() => setActiveMode('upload')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeMode === 'upload'
                  ? 'bg-white text-[#0F3D59] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              رفع ملف PDF
            </button>
            <button
              onClick={() => setActiveMode('builder')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeMode === 'builder'
                  ? 'bg-white text-[#0F3D59] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              إنشاء سيرة ذاتية
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {errorMsg}
            </div>
          )}

          {activeMode === 'upload' ? (
            <div className="space-y-3">
              <label
                htmlFor="cv-upload-input"
                className="border-2 border-dashed border-teal-300 hover:border-teal-500 bg-teal-50/20 hover:bg-teal-50/50 rounded-2xl p-6 sm:p-7 flex flex-col items-center justify-center cursor-pointer transition-all text-center group"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-100 group-hover:scale-105 text-teal-700 flex items-center justify-center mb-2.5 transition-transform shadow-2xs">
                  {isEmployer ? (
                    <Building2 className="w-6 h-6" />
                  ) : (
                    <UploadCloud className="w-6 h-6" />
                  )}
                </div>

                <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                  {selectedFile
                    ? selectedFile.name
                    : isEmployer
                    ? 'اضغط لاختيار ملف السجل التجاري / رخصة المطعم (PDF)'
                    : 'اضغط لاختيار ملف السيرة الذاتية (PDF)'}
                </span>

                <span className="text-[11px] text-slate-400 mt-1">
                  صيغة PDF فقط • الحد الأقصى 10 ميجابايت
                </span>

                {selectedFile && (
                  <div className="mt-2.5 px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold rounded-lg flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>جاهز للتحليل ({((selectedFile.size) / (1024 * 1024)).toFixed(2)} MB)</span>
                  </div>
                )}
              </label>

              <input
                id="cv-upload-input"
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Progress Bar when scanning */}
              {isProcessing && (
                <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-xs text-teal-900 flex items-center gap-2 animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin text-teal-700" />
                  <span>{parseProgress}</span>
                </div>
              )}

              {/* Extracted Data Result Preview */}
              {extractedData && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1.5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>
                      {isEmployer
                        ? 'تم التحقق من السجل التجاري للمطعم بنجاح!'
                        : 'تم تحليل الـ PDF وتعبئة البيانات بنجاح!'}
                    </span>
                  </div>

                  {!isEmployer ? (
                    <div className="text-[11px] space-y-0.5 text-slate-600 pt-1">
                      <p>• المسمى المستخرج: {extractedData.role}</p>
                      <p>• المهارات المكتشفة: {extractedData.skills?.join('، ')}</p>
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-600 pt-1">
                      <p>• رقم السجل المستخرج: <strong>{extractedData.recordNumber}</strong></p>
                      <p>• تم منح المطعم شارة التوثيق المعتمدة.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                ميزة مخصصة لمستخدمي الموبايل الذين ليس لديهم ملف PDF جاهز؛ نقوم بتوليد سيرة ذاتية إلكترونية مرتبة في لحظات.
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  المسمى المهني المستهدف
                </label>
                <input
                  type="text"
                  value={builderHeadline}
                  onChange={(e) => setBuilderHeadline(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  سنوات وطبيعة الخبرة
                </label>
                <input
                  type="text"
                  value={builderExperience}
                  onChange={(e) => setBuilderExperience(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  المهارات الأساسية
                </label>
                <input
                  type="text"
                  value={builderSkills}
                  onChange={(e) => setBuilderSkills(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={() => setIsCvModalOpen(false)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            {extractedData ? 'تم الإغلاق' : 'إلغاء'}
          </button>

          {activeMode === 'upload' ? (
            <button
              onClick={handleConfirmUpload}
              disabled={!selectedFile || isProcessing}
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-xs flex items-center gap-1.5 disabled:opacity-50 transition-all hover:scale-105"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>جاري الحفظ...</span>
                </>
              ) : (
                <>
                  <FileCheck2 className="w-4 h-4" />
                  <span>{isEmployer ? 'رفع وتوثيق السجل' : 'إضافة سيرة ذاتية'}</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleQuickBuild}
              disabled={isProcessing}
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-xs flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <FileText className="w-4 h-4" />
              <span>إضافة سيرة ذاتية</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
