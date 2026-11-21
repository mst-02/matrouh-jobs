import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Building2,
  MapPin,
  Phone,
  ShieldCheck,
  Check,
  Image,
  FileText,
} from 'lucide-react';
import { MATROUH_AREAS } from '../../data/mockData';
import { AreaName } from '../../types';

interface FacilityProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FacilityProfileModal: React.FC<FacilityProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentUser, organizations, updateOrganization } = useApp();

  const myOrg =
    organizations.find((o) => o.id === currentUser?.organizationId) ||
    organizations[0];

  const [name, setName] = useState(myOrg?.name || '');
  const [category, setCategory] = useState(myOrg?.category || '');
  const [area, setArea] = useState<AreaName>(myOrg?.area || 'مرسى مطروح');
  const [address, setAddress] = useState(myOrg?.address || '');
  const [phone, setPhone] = useState(myOrg?.phone || '');
  const [commercialRecord, setCommercialRecord] = useState(
    myOrg?.commercialRecordNumber || ''
  );
  const [logo, setLogo] = useState(myOrg?.logo || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen || !myOrg) return null;

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
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#0F3D59]">
                بيانات المنشأة والتراخيص
              </h3>
              <span className="text-xs text-slate-500">
                تحديث بيانات المطعم، السجل التجاري، ورقم التواصل
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>تم حفظ وتحديث بيانات المنشأة بنجاح!</span>
            </div>
          )}

          {/* Logo & Name */}
          <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200/60">
            <img
              src={logo || myOrg.logo}
              alt={name}
              className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-2xs shrink-0"
            />
            <div className="flex-1">
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                رابط شعار المنشأة (Logo URL)
              </label>
              <input
                type="text"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="https://..."
                className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500 bg-white"
              />
            </div>
          </div>

          {/* Facility Name */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              اسم المطعم أو المنشأة *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              النشاط والتخصص *
            </label>
            <input
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="مثال: مشويات وأسماك، كافيه، فندق ومنتجع..."
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
            />
          </div>

          {/* Area & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                المدينة / المركز *
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value as AreaName)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500 bg-white"
              >
                {MATROUH_AREAS.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                رقم الهاتف / الاتصال *
              </label>
              <input
                type="text"
                required
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500 text-right"
              />
            </div>
          </div>

          {/* Detailed Address */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              العنوان التفصيلي وموقع الفرع *
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="الشارع، الحي، أقرب علامة مميزة بمطروح"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
            />
          </div>

          {/* Commercial Record & Verification */}
          <div className="p-3.5 bg-teal-50/50 rounded-2xl border border-teal-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>رقم السجل التجاري / الترخيص</span>
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                {myOrg.verificationStatus}
              </span>
            </div>
            <input
              type="text"
              dir="ltr"
              value={commercialRecord}
              onChange={(e) => setCommercialRecord(e.target.value)}
              placeholder="CR-XXXXX-MATROUH"
              className="w-full text-xs p-2 rounded-xl border border-teal-200 bg-white focus:outline-hidden focus:border-teal-500"
            />
            <p className="text-[10px] text-slate-500">
              يتم فحص وتدقيق السجل بمعرفة إدارة المنصة لمنح شارة التوثيق الرسمية.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-xs transition-transform hover:scale-105"
            >
              حفظ التعديلات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
