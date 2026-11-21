import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Check,
  AlertCircle,
  Building2,
  X,
  MapPin,
  Phone,
  FileText,
  Clock,
  Briefcase,
  Users,
  MessageSquare,
  Send,
} from 'lucide-react';
import { Organization } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { organizations, jobs, applications, verifyOrganization, setNotifications } = useApp();
  const [actionToast, setActionToast] = useState<string | null>(null);
  const [inspectedOrg, setInspectedOrg] = useState<Organization | null>(null);
  const [messagingOrg, setMessagingOrg] = useState<Organization | null>(null);
  const [messageText, setMessageText] = useState('');

  const verifiedCount = organizations.filter((o) => o.verificationStatus === 'موثقة').length;
  const pendingCount = organizations.filter((o) => o.verificationStatus === 'بانتظار التحقق').length;

  const handleStatusChange = (
    orgId: string,
    orgName: string,
    status: 'موثقة' | 'بانتظار التحقق' | 'مرفوضة'
  ) => {
    verifyOrganization(orgId, status);
    if (inspectedOrg && inspectedOrg.id === orgId) {
      setInspectedOrg({ ...inspectedOrg, verificationStatus: status });
    }
    const label = status === 'موثقة' ? 'اعتماد' : status === 'بانتظار التحقق' ? 'تعليق' : 'رفض';
    setActionToast(`تم تنفيذ إجراء (${label}) على منشأة: ${orgName}`);
    setTimeout(() => setActionToast(null), 3000);
  };

  const openMessageModal = (org: Organization) => {
    setMessagingOrg(org);
    setMessageText('يرجى استيفاء وتحديث صورة السجل التجاري ورخصة التشغيل لاستكمال الاعتماد.');
  };

  const handleSendMessage = () => {
    if (!messagingOrg || !messageText.trim()) return;

    setNotifications((prev: any[]) => [
      {
        id: `notif-${Date.now()}`,
        title: `ملاحظة من إدارة وظائف مطروح`,
        message: messageText.trim(),
        date: 'الآن',
        read: false,
        type: 'warning',
        targetOrgId: messagingOrg.id,
        targetOrgName: messagingOrg.name,
        targetRole: 'employer',
      },
      ...prev,
    ]);

    const orgName = messagingOrg.name;
    setMessagingOrg(null);
    setMessageText('');
    setActionToast(`تم إرسال الملاحظة بنجاح إلى إدارة: ${orgName}`);
    setTimeout(() => setActionToast(null), 3500);
  };

  const inspectedJobs = inspectedOrg
    ? jobs.filter((j) => j.organizationId === inspectedOrg.id)
    : [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5">
      {/* Admin Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h1 className="text-base sm:text-lg font-black">لوحة الإشراف المركزية والرقابة</h1>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            تدقيق السجلات التجارية، اعتماد المنشآت ومراقبة جودة وظائف مطروح
          </p>
        </div>
      </div>

      {actionToast && (
        <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold rounded-xl animate-in fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-teal-600 shrink-0" />
          <span>{actionToast}</span>
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] text-slate-400 font-bold block">إجمالي المنشآت</span>
          <span className="text-xl font-black text-slate-800 mt-0.5 block">{organizations.length}</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] text-amber-700 font-bold block">طلبات معلقة</span>
          <span className="text-xl font-black text-amber-600 mt-0.5 block">{pendingCount}</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] text-teal-700 font-bold block">منشآت معتمدة</span>
          <span className="text-xl font-black text-teal-700 mt-0.5 block">{verifiedCount}</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] text-slate-400 font-bold block">إجمالي الطلبات</span>
          <span className="text-xl font-black text-[#0F3D59] mt-0.5 block">{applications.length}</span>
        </div>
      </div>

      {/* Organizations List */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h2 className="text-xs sm:text-sm font-black text-slate-900">
              قائمة المطاعم والمنشآت المسجلة ({organizations.length})
            </h2>
            <span className="text-[11px] text-slate-400 font-medium">
              اضغط على أي مطعم لعرض ملف التراخيص والسجل التجاري والوظائف
            </span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {organizations.map((org) => (
            <div
              key={org.id}
              onClick={() => setInspectedOrg(org)}
              className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={org.logo}
                  alt={org.name}
                  className="w-11 h-11 rounded-xl object-cover border border-slate-100 shadow-2xs group-hover:scale-105 transition-transform shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {org.name}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        org.verificationStatus === 'موثقة'
                          ? 'bg-teal-100 text-teal-800'
                          : org.verificationStatus === 'بانتظار التحقق'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {org.verificationStatus}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    {org.category} • {org.area} • سجل: <strong>{org.commercialRecordNumber || 'غير مدخل'}</strong>
                  </span>
                </div>
              </div>

              {/* Clean action buttons with direct messaging */}
              <div
                className="flex items-center gap-1.5 self-end sm:self-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => openMessageModal(org)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 text-xs font-bold transition-all flex items-center gap-1 border border-slate-200/80 shadow-2xs"
                  title="إرسال ملاحظة أو طلب استيفاء للمنشأة"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                  <span>ملاحظة</span>
                </button>

                {org.verificationStatus !== 'موثقة' ? (
                  <button
                    onClick={() => handleStatusChange(org.id, org.name, 'موثقة')}
                    className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    اعتماد
                  </button>
                ) : (
                  <button
                    onClick={() => handleStatusChange(org.id, org.name, 'بانتظار التحقق')}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-all"
                  >
                    تعليق
                  </button>
                )}

                <button
                  onClick={() => handleStatusChange(org.id, org.name, 'مرفوضة')}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-rose-700 text-xs font-bold transition-all"
                >
                  رفض
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facility Inspection Drawer/Modal */}
      {inspectedOrg && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-3">
                <img
                  src={inspectedOrg.logo}
                  alt={inspectedOrg.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs"
                />
                <div>
                  <h3 className="text-base font-black text-[#0F3D59]">
                    {inspectedOrg.name}
                  </h3>
                  <span className="text-xs text-slate-500">
                    ملف التراخيص والسجل التجاري والوظائف
                  </span>
                </div>
              </div>

              <button
                onClick={() => setInspectedOrg(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inspection Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
              {/* Verification Status Pill */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-700">حالة الاعتماد والتوثيق الحالية:</span>
                <span
                  className={`font-black px-3 py-1 rounded-full text-xs ${
                    inspectedOrg.verificationStatus === 'موثقة'
                      ? 'bg-teal-100 text-teal-800 border border-teal-300'
                      : inspectedOrg.verificationStatus === 'بانتظار التحقق'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  {inspectedOrg.verificationStatus}
                </span>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold">النشاط والتصنيف</span>
                  <span className="text-xs font-bold text-slate-800 mt-0.5 block">
                    {inspectedOrg.category}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold">المدينة والمركز</span>
                  <span className="text-xs font-bold text-slate-800 mt-0.5 block flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    {inspectedOrg.area}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold">رقم الهاتف</span>
                  <span className="text-xs font-bold text-slate-800 mt-0.5 block flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-teal-600" />
                    <span dir="ltr">{inspectedOrg.phone}</span>
                  </span>
                </div>

                <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-200">
                  <span className="text-[10px] text-teal-700 block font-bold">رقم السجل التجاري / الترخيص</span>
                  <span className="text-xs font-black text-teal-950 mt-0.5 block font-mono" dir="ltr">
                    {inspectedOrg.commercialRecordNumber || 'لم يتم إدخال سجل بعد'}
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-bold">العنوان التفصيلي</span>
                <span className="text-xs text-slate-700 mt-0.5 block">{inspectedOrg.address}</span>
              </div>

              {/* Jobs by this restaurant */}
              <div>
                <span className="font-extrabold text-slate-800 block mb-2">
                  الوظائف التابعة للمنشأة ({inspectedJobs.length}):
                </span>
                {inspectedJobs.length === 0 ? (
                  <p className="text-slate-400 italic">لا توجد وظائف معلنة من هذا المطعم حتى الآن.</p>
                ) : (
                  <div className="space-y-1.5">
                    {inspectedJobs.map((j) => (
                      <div
                        key={j.id}
                        className="p-2.5 rounded-xl border border-slate-200 flex items-center justify-between bg-white"
                      >
                        <div>
                          <span className="font-bold text-slate-900 block">{j.title}</span>
                          <span className="text-[10px] text-slate-500">
                            {j.area} • {j.employmentType}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {j.vacanciesCount} شواغر
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => openMessageModal(inspectedOrg)}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-colors shadow-2xs cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                <span>إرسال ملاحظة / طلب استيفاء ترخيص</span>
              </button>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => handleStatusChange(inspectedOrg.id, inspectedOrg.name, 'موثقة')}
                  className={`px-4 py-2 rounded-xl font-bold text-xs shadow-xs transition-transform hover:scale-105 ${
                    inspectedOrg.verificationStatus === 'موثقة'
                      ? 'bg-teal-700 text-white'
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
                >
                  اعتماد المنشأة
                </button>

                <button
                  onClick={() =>
                    handleStatusChange(inspectedOrg.id, inspectedOrg.name, 'بانتظار التحقق')
                  }
                  className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs"
                >
                  تعليق
                </button>

                <button
                  onClick={() => handleStatusChange(inspectedOrg.id, inspectedOrg.name, 'مرفوضة')}
                  className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs"
                >
                  رفض
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messaging / Deficiency Notice Modal */}
      {messagingOrg && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-150">
          <div className="bg-white text-slate-800 w-full max-w-md rounded-3xl p-5 shadow-2xl border border-slate-200 space-y-4 text-right">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-black text-sm text-[#0F3D59]">
                <MessageSquare className="w-5 h-5 text-teal-600" />
                <span>إرسال ملاحظة رسمية إلى: {messagingOrg.name}</span>
              </div>
              <button
                onClick={() => setMessagingOrg(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                نماذج سريعة شائعة:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'يرجى إرفاق صورة واضحة من السجل التجاري الساري.',
                  'صورة ترخيص وزارة السياحة أو تصريح التشغيل غير مكتملة.',
                  'الاسم التجاري أو العنوان غير مطابق للأوراق الرسمية.',
                  'يرجى تحديث رقم التواصل المعتمد للمنشأة.',
                ].map((tmpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMessageText(tmpl)}
                    className="text-[10.5px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200/80 transition-colors text-right cursor-pointer"
                  >
                    {tmpl}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                نص الملاحظة الموجهة للمنشأة:
              </label>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="اكتب تفاصيل الملاحظة أو النواقص المطلوب استيفاؤها..."
                rows={3}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500 leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setMessagingOrg(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                إلغاء
              </button>

              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                إرسال الإشعار فوراً
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
