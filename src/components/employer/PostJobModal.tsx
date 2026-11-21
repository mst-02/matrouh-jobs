import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  PlusCircle,
  Briefcase,
  MapPin,
  Banknote,
  Clock,
  Sparkles,
  Home,
  UtensilsCrossed,
  Users,
} from 'lucide-react';
import { MATROUH_AREAS, JOB_CATEGORIES } from '../../data/mockData';
import { AreaName, JobCategory, EmploymentType, ExperienceLevel, SalaryPeriod } from '../../types';

export const PostJobModal: React.FC = () => {
  const {
    isPostJobModalOpen,
    setIsPostJobModalOpen,
    postNewJob,
    organizations,
    currentUser,
    setActiveTab,
  } = useApp();

  const myOrg =
    organizations.find((o) => o.id === currentUser?.organizationId) ||
    organizations.find((o) => o.name === currentUser?.name) ||
    organizations[0];

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<JobCategory>('مطبخ وشيفات');
  const [area, setArea] = useState<AreaName>('مرسى مطروح');
  const [address, setAddress] = useState('شارع الجلاء، الكورنيش، مرسى مطروح');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('دوام كامل');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('1 - 3 سنوات');
  const [salaryMin, setSalaryMin] = useState<number>(7000);
  const [salaryMax, setSalaryMax] = useState<number>(9500);
  const [salaryPeriod, setSalaryPeriod] = useState<SalaryPeriod>('شهري');
  const [vacanciesCount, setVacanciesCount] = useState<number>(2);
  const [description, setDescription] = useState('');
  const [requirementsText, setRequirementsText] = useState(
    'خبرة سابقة لا تقل عن سنتين\nالالتزام بمعايير النظافة والسرعة\nحسن المظهر واللباقة'
  );
  const [isSeasonal, setIsSeasonal] = useState(true);

  // Perks
  const [benefits, setBenefits] = useState<string[]>([
    'سكن مغتربين مفروش ومكيف مجاناً',
    '3 وجبات يومية من المطعم',
    'تبس وحوافز موسمية ممتازة',
  ]);
  const [customBenefit, setCustomBenefit] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isPostJobModalOpen) return null;

  if (myOrg && myOrg.verificationStatus !== 'موثقة') {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
        <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">
              منشأتك قيد المراجعة والاعتماد
            </h3>
            <span className="text-xs font-bold text-amber-700 block mt-1">
              الحالة الحالية: {myOrg.verificationStatus}
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            عفواً، لا يمكن نشر إعلانات توظيف حتى يتم تدقيق واعتماد السجل التجاري لمنشأتك من قِبل إدارة المنصة. يرجى استكمال بيانات المنشأة أولاً بانتظار موافقة الإدارة.
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => {
                setIsPostJobModalOpen(false);
                setActiveTab('facility-profile');
              }}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs"
            >
              استكمال وتعديل بيانات المنشأة والتراخيص
            </button>
            <button
              onClick={() => setIsPostJobModalOpen(false)}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    );
  }

  const toggleBenefit = (item: string) => {
    setBenefits((prev) =>
      prev.includes(item) ? prev.filter((b) => b !== item) : [...prev, item]
    );
  };

  const handleAddCustomBenefit = () => {
    if (customBenefit.trim() && !benefits.includes(customBenefit.trim())) {
      setBenefits([...benefits, customBenefit.trim()]);
      setCustomBenefit('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setValidationError('يرجى ملء المسمى الوظيفي والوصف.');
      return;
    }

    const reqList = requirementsText
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    postNewJob({
      title,
      category,
      area,
      address,
      employmentType,
      experienceLevel,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      salaryPeriod,
      vacanciesCount: Number(vacanciesCount),
      description,
      requirements: reqList,
      benefits,
      images: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      ],
      status: 'منشور',
      featured: true,
      isSeasonal,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#0F3D59]">
              نشر إعلان وظيفة جديد
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              المنشأة: {organizations[0]?.name || 'مطعم حسني للمشويات'}
            </span>
          </div>

          <button
            onClick={() => setIsPostJobModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {validationError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold">
              {validationError}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              المسمى الوظيفي (إجباري)
            </label>
            <input
              type="text"
              required
              placeholder="مثال: شيف بيتزا نابولية، ويتر صالة، باريستا محترف..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
            />
          </div>

          {/* Category & Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">التصنيف الوظيفي</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as JobCategory)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
              >
                {JOB_CATEGORIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">المنطقة في مطروح</label>
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
            </div>
          </div>

          {/* Address & Vacancies */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">العنوان التفصيلي</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">العدد المطلوب</label>
              <input
                type="number"
                min={1}
                value={vacanciesCount}
                onChange={(e) => setVacanciesCount(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
              />
            </div>
          </div>

          {/* Employment Type & Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">نوع الدوام</label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
              >
                <option value="دوام كامل">دوام كامل</option>
                <option value="دوام جزئي">دوام جزئي</option>
                <option value="موسم صيف">موسم صيف</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">مستوى الخبرة المطلوبة</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
              >
                <option value="بدون خبرة">بدون خبرة (تدريب متاح)</option>
                <option value="أقل من سنة">أقل من سنة</option>
                <option value="1 - 3 سنوات">1 - 3 سنوات</option>
                <option value="أكثر من 3 سنوات">أكثر من 3 سنوات (محترف)</option>
              </select>
            </div>
          </div>

          {/* Salary Min / Max */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <span className="text-xs font-bold text-slate-800 block">نطاق الراتب المتوقع</span>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[11px] text-slate-500 block mb-0.5">الحد الأدنى (ج.م)</label>
                <input
                  type="number"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(Number(e.target.value))}
                  className="w-full text-xs p-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-500 block mb-0.5">الحد الأقصى (ج.م)</label>
                <input
                  type="number"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(Number(e.target.value))}
                  className="w-full text-xs p-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-500 block mb-0.5">الفترة</label>
                <select
                  value={salaryPeriod}
                  onChange={(e) => setSalaryPeriod(e.target.value as SalaryPeriod)}
                  className="w-full text-xs p-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="شهري">شهري</option>
                  <option value="يومي">يومي</option>
                  <option value="أسبوعي">أسبوعي</option>
                  <option value="قابل للتفاوض">قابل للتفاوض</option>
                </select>
              </div>
            </div>
          </div>

          {/* Seasonal Checkbox */}
          <label className="flex items-center gap-2 p-3 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900 cursor-pointer">
            <input
              type="checkbox"
              checked={isSeasonal}
              onChange={(e) => setIsSeasonal(e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded-sm"
            />
            <span className="font-bold">وظيفة موسم صيف 2026 (تمييز الإعلان بشارة سياحية خاصة)</span>
          </label>

          {/* Benefits Checkboxes */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              المزايا وتسهيلات العمل (مهمة لجذب أفضل المتقدمين)
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                'سكن مغتربين مفروش ومكيف مجاناً',
                '3 وجبات يومية من المطعم',
                'تبس وحوافز موسمية ممتازة',
                'بدل انتقالات من وإلى مطروح',
                'تأمين صحي واجتماعي',
                'يوم راحة أسبوعي مدفوع',
              ].map((perk, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => toggleBenefit(perk)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                    benefits.includes(perk)
                      ? 'bg-teal-50 border-teal-400 text-teal-800 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  {benefits.includes(perk) ? '✓ ' : '+ '} {perk}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              الوصف والمهام الوظيفية
            </label>
            <textarea
              required
              rows={3}
              placeholder="اكتب تفاصيل المهام اليومية، أوقات الورديات، والمسؤوليات..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              الشروط والمتطلبات (سطر لكل شرط)
            </label>
            <textarea
              rows={3}
              value={requirementsText}
              onChange={(e) => setRequirementsText(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsPostJobModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md shadow-teal-600/20 flex items-center gap-1.5 transition-all hover:scale-[1.02]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>نشر الوظيفة الآن</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
