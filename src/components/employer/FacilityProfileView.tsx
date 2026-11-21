import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  MapPin,
  Phone,
  ShieldCheck,
  Check,
  Camera,
  Edit2,
  AlertCircle,
  FileText,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { MATROUH_AREAS } from '../../data/mockData';
import { AreaName } from '../../types';

export const FacilityProfileView: React.FC = () => {
  const {
    currentUser,
    userRole,
    organizations,
    updateOrganization,
    setActiveTab,
    setNotifications,
  } = useApp();

  const myOrg =
    organizations.find((o) => o.id === currentUser?.organizationId) ||
    organizations.find((o) => o.name === currentUser?.name) ||
    organizations[0];

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(myOrg?.name || '');
  const [category, setCategory] = useState(myOrg?.category || '');
  const [area, setArea] = useState<AreaName>(myOrg?.area || 'مرسى مطروح');
  const [address, setAddress] = useState(myOrg?.address || '');
  const [phone, setPhone] = useState(myOrg?.phone || '');
  const [commercialRecord, setCommercialRecord] = useState(
    myOrg?.commercialRecordNumber || ''
  );
  const [logo, setLogo] = useState(myOrg?.logo || '');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Logo upload from local device (Same as Seeker Profile)
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newLogo = event.target.result as string;
          setLogo(newLogo);
          updateOrganization(myOrg.id, { logo: newLogo });
          if (currentUser) {
            currentUser.avatar = newLogo;
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrganization(myOrg.id, {
      name,
      category,
      area,
      address,
      phone,
      commercialRecordNumber: commercialRecord,
      logo: logo || myOrg.logo,
    });

    if (currentUser) {
      currentUser.name = name;
    }

    // Trigger in-app notification to Admin for moderation
    setNotifications((prev: any[]) => [
      {
        id: `notif-${Date.now()}`,
        title: 'طلب اعتماد منشأة وسجل تجاري',
        message: `قام مطعم (${name}) بتحديث بياناته والسجل التجاري (${commercialRecord || 'غير محدد'}) بانتظار الاعتماد.`,
        date: 'الآن',
        read: false,
        type: 'verification',
      },
      ...prev,
    ]);

    setIsEditing(false);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(userRole === 'admin' ? 'admin-dashboard' : 'employer-dashboard')}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
              title="العودة للوحة التحكم"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <h1 className="text-lg sm:text-xl font-black text-[#0F3D59]">
              بيانات المنشأة والتراخيص
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            إدارة بيانات المطعم، السجل التجاري، ورقم التواصل المعتمد
          </p>
        </div>

        <div className="flex items-center gap-2">
          {userRole === 'admin' ? (
            <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 font-bold text-xs border border-amber-200">
              ملف المنشأة (عرض رقابي للقراءة فقط)
            </span>
          ) : !isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-transform hover:scale-105"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>تعديل البيانات</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
            >
              إلغاء التعديل
            </button>
          )}
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-2xl flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>تم حفظ التعديلات وإرسال السجل التجاري للإدارة المركزية للمراجعة والاعتماد!</span>
        </div>
      )}

      {/* Verification Status Alert Card */}
      <div
        className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
          myOrg.verificationStatus === 'موثقة'
            ? 'bg-teal-50/70 border-teal-200 text-teal-900'
            : myOrg.verificationStatus === 'بانتظار التحقق'
            ? 'bg-amber-50/80 border-amber-200 text-amber-950'
            : 'bg-rose-50 border-rose-200 text-rose-900'
        }`}
      >
        <ShieldCheck
          className={`w-5 h-5 shrink-0 mt-0.5 ${
            myOrg.verificationStatus === 'موثقة'
              ? 'text-teal-600'
              : myOrg.verificationStatus === 'بانتظار التحقق'
              ? 'text-amber-600'
              : 'text-rose-600'
          }`}
        />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm">حالة اعتماد المنشأة:</span>
            <span className="font-black px-2 py-0.5 rounded-md bg-white border border-current">
              {myOrg.verificationStatus}
            </span>
          </div>
          <p className="mt-1">
            {myOrg.verificationStatus === 'موثقة'
              ? 'منشأتك معتمدة رسمياً وموثقة بسجل تجاري صالح. كافة وظائفك منشورة وتظهر للباحثين عن العمل على الصفحة الرئيسية وبحث الوظائف.'
              : 'بيانات منشأتك والسجل التجاري قيد المراجعة من قِبل إدارة المنصة. بمجرد الاعتماد من الأدمن، ستتمكن من نشر إعلانات الوظائف فوراً وتظهر للعامة.'}
          </p>
        </div>
      </div>

      {/* Main Details Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Cover / Banner */}
        <div className="relative h-32 sm:h-44 bg-slate-800">
          <img
            src={myOrg.coverImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'}
            alt={myOrg.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        </div>

        {/* Logo and Quick Info */}
        <div className="p-5 sm:p-6 relative pt-0 -mt-12 sm:-mt-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-end gap-3.5">
              <div className="relative group shrink-0">
                <img
                  src={logo || myOrg.logo}
                  alt={myOrg.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-3 border-white shadow-md bg-white"
                />
                <label
                  htmlFor="facility-logo-upload"
                  className="absolute bottom-1 left-1 p-1.5 rounded-lg bg-[#0F3D59] hover:bg-teal-600 text-white cursor-pointer shadow-md transition-colors"
                  title="تغيير الشعار من جهازك"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <input
                    id="facility-logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  {myOrg.name}
                </h2>
                <span className="text-xs text-slate-500 font-medium block mt-0.5">
                  {myOrg.category} • {myOrg.area}
                </span>
                <span className="text-[11px] text-teal-700 font-bold block mt-1">
                  رقم السجل: {myOrg.commercialRecordNumber || 'قيد الاستكمال'}
                </span>
              </div>
            </div>
          </div>

          {/* Form / View */}
          <form onSubmit={handleSave} className="pt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  اسم المطعم أو المنشأة *
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-xl border transition-colors ${
                    isEditing
                      ? 'border-teal-500 bg-white focus:outline-hidden'
                      : 'border-slate-200 bg-slate-50 text-slate-700 cursor-not-allowed'
                  }`}
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  النشاط والتخصص *
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-xl border transition-colors ${
                    isEditing
                      ? 'border-teal-500 bg-white focus:outline-hidden'
                      : 'border-slate-200 bg-slate-50 text-slate-700 cursor-not-allowed'
                  }`}
                />
              </div>

              {/* Area */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  المدينة أو المركز *
                </label>
                <select
                  disabled={!isEditing}
                  value={area}
                  onChange={(e) => setArea(e.target.value as AreaName)}
                  className={`w-full text-xs p-2.5 rounded-xl border transition-colors ${
                    isEditing
                      ? 'border-teal-500 bg-white focus:outline-hidden'
                      : 'border-slate-200 bg-slate-50 text-slate-700 cursor-not-allowed'
                  }`}
                >
                  {MATROUH_AREAS.map((a) => (
                    <option key={a.id} value={a.name}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  رقم الهاتف للتواصل *
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  disabled={!isEditing}
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-xl border transition-colors text-right ${
                    isEditing
                      ? 'border-teal-500 bg-white focus:outline-hidden'
                      : 'border-slate-200 bg-slate-50 text-slate-700 cursor-not-allowed'
                  }`}
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                العنوان التفصيلي وموقع الفرع *
              </label>
              <input
                type="text"
                disabled={!isEditing}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`w-full text-xs p-2.5 rounded-xl border transition-colors ${
                  isEditing
                    ? 'border-teal-500 bg-white focus:outline-hidden'
                    : 'border-slate-200 bg-slate-50 text-slate-700 cursor-not-allowed'
                }`}
              />
            </div>

            {/* Commercial Record */}
            <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-700" />
                  <span>رقم السجل التجاري / رخصة المنشأة *</span>
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                  {myOrg.verificationStatus}
                </span>
              </div>
              <input
                type="text"
                dir="ltr"
                disabled={!isEditing}
                placeholder="CR-89241-MATROUH"
                value={commercialRecord}
                onChange={(e) => setCommercialRecord(e.target.value)}
                className={`w-full text-xs p-2.5 rounded-xl border transition-colors ${
                  isEditing
                    ? 'border-teal-500 bg-white focus:outline-hidden'
                    : 'border-teal-200 bg-white/70 text-slate-800 cursor-not-allowed'
                }`}
              />
              <p className="text-[11px] text-slate-500">
                يقوم فريق الإدارة بمطابقة هذا الرقم مع السجلات الرسمية بمطروح لاعتماد ونشر الوظائف.
              </p>
            </div>

            {isEditing && (
              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-xs transition-transform hover:scale-105"
                >
                  حفظ التعديلات وإرسال للإدارة
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
