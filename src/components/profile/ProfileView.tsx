import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  FileText,
  UploadCloud,
  Trash2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Plus,
  Edit3,
} from 'lucide-react';
import { MATROUH_AREAS } from '../../data/mockData';
import { AreaName } from '../../types';

export const ProfileView: React.FC = () => {
  const { seekerProfile, uploadCV, deleteCV, setIsCvModalOpen, currentUser } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(seekerProfile.fullName);
  const [phone, setPhone] = useState(seekerProfile.phone);
  const [email, setEmail] = useState(seekerProfile.email || '');
  const [area, setArea] = useState<AreaName>(seekerProfile.area);
  const [headline, setHeadline] = useState(seekerProfile.headline);
  const [bio, setBio] = useState(seekerProfile.bio);
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState<string[]>(seekerProfile.skills);
  const [userAvatar, setUserAvatar] = useState(
    currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80'
  );

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newAvatar = event.target.result as string;
          setUserAvatar(newAvatar);
          if (currentUser) {
            currentUser.avatar = newAvatar;
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSaveProfile = () => {
    seekerProfile.fullName = fullName;
    seekerProfile.phone = phone;
    seekerProfile.email = email;
    seekerProfile.area = area;
    seekerProfile.headline = headline;
    seekerProfile.bio = bio;
    seekerProfile.skills = skills;
    if (currentUser) {
      currentUser.name = fullName;
      currentUser.avatar = userAvatar;
    }
    setIsEditing(false);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0F3D59]">
            الملف الشخصي والسيرة الذاتية
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            بياناتك المهنية وسيرتك الذاتية المحمية للتقديم السريع على مطاعم مطروح
          </p>
        </div>

        <button
          onClick={() => {
            if (isEditing) handleSaveProfile();
            else setIsEditing(true);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            isEditing
              ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          {isEditing ? 'حفظ التغييرات' : 'تعديل البيانات'}
        </button>
      </div>

      {saveSuccessMsg && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 animate-in fade-in duration-200">
          ✓ تم حفظ وتحديث بيانات ملفك الشخصي بنجاح!
        </div>
      )}

      {/* CV Box (Top Priority) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600" />
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              السيرة الذاتية الحالية (CV)
            </h2>
          </div>
          <span className="text-xs text-slate-400">بوابة التقديم المشروط</span>
        </div>

        {seekerProfile.cv ? (
          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-slate-900">
                    {seekerProfile.cv.filename}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-200/80 text-teal-900">
                    v{seekerProfile.cv.version} • {seekerProfile.cv.status}
                  </span>
                </div>
                <span className="text-xs text-slate-500 block mt-0.5">
                  حجم الملف: {seekerProfile.cv.fileSize} • تاريخ الرفع: {seekerProfile.cv.uploadedAt}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => setIsCvModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-white border border-teal-300 text-teal-800 text-xs font-bold hover:bg-teal-100/50 transition-colors shadow-2xs"
              >
                استبدال بنسخة أحدث
              </button>
              <button
                onClick={() => {
                  if (confirm('هل تريد حذف سيرتك الذاتية؟ (سيمنعك النظام من التقديم حتى ترفع سيرة جديدة)')) {
                    deleteCV();
                  }
                }}
                className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors"
                title="حذف الـ CV (لتجربة منع التقديم)"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-amber-50/70 border-2 border-dashed border-amber-300 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-extrabold text-amber-950">
              لا توجد سيرة ذاتية مرفوعة حالياً
            </h3>
            <p className="text-xs text-amber-800 max-w-md mx-auto leading-relaxed">
              وفقاً لقواعد التوظيف في مطروح، يلزم رفع CV صالح للتقديم على الوظائف. ارفع سيرتك الذاتية الآن لتقديم فوري بنقرة واحدة.
            </p>
            <button
              onClick={() => setIsCvModalOpen(true)}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20"
            >
              + رفع أو توليد سيرة ذاتية فوراً
            </button>
          </div>
        )}

        <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <span>
            سيرتك الذاتية مشفرة وخاصة بالكامل؛ لا تظهر للعامة ولا تشارك إلا مع المنشأة التي تقدم إليها.
          </span>
        </div>
      </div>

      {/* Basic & Contact Info */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <img
              src={userAvatar}
              alt={fullName}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500/40 shadow-xs"
            />
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                الصورة والبيانات الأساسية
              </h2>
              <span className="text-xs text-slate-500">الصورة تظهر في أعلى الموقع ولأصحاب المطاعم</span>
            </div>
          </div>

          <label className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors self-start sm:self-auto">
            <span>تغيير الصورة</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">الاسم بالكامل</label>
            {isEditing ? (
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
              />
            ) : (
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                {seekerProfile.fullName}
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              رقم الهاتف (الأساسي للتوظيف)
            </label>
            {isEditing ? (
              <input
                type="text"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500 text-right"
              />
            ) : (
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800" dir="ltr">
                {seekerProfile.phone}
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">المدينة / المركز</label>
            {isEditing ? (
              <select
                value={area}
                onChange={(e) => setArea(e.target.value as AreaName)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
              >
                {MATROUH_AREAS.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                {seekerProfile.area}
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">البريد الإلكتروني</label>
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
              />
            ) : (
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 truncate">
                {seekerProfile.email || 'لم يُحدد'}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            المسمى المهني المختصر
          </label>
          {isEditing ? (
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
            />
          ) : (
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
              {seekerProfile.headline}
            </div>
          )}
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">نبذة عنك</label>
          {isEditing ? (
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
            />
          ) : (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed">
              {seekerProfile.bio}
            </div>
          )}
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-3">
        <h2 className="text-base sm:text-lg font-black text-slate-900 pb-2 border-b border-slate-100">
          المهارات والخبرات العملية
        </h2>

        {isEditing && (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="أضف مهارة جديدة (مثال: باريستا، تسوية أسماك، إنجليزية...)"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
            />
            <button
              onClick={handleAddSkill}
              className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold"
            >
              إضافة
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 font-bold text-xs border border-teal-200/70 flex items-center gap-1.5"
            >
              <span>{skill}</span>
              {isEditing && (
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-teal-700 hover:text-rose-600"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
