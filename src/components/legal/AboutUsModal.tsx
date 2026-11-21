import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Phone, PhoneCall, Mail, MapPin, ShieldCheck, Users, Globe } from 'lucide-react';
import { Logo } from '../common/Logo';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutUsModal: React.FC<AboutUsModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, t } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <Logo size="sm" />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 hover:bg-slate-100 text-teal-700 flex items-center gap-1.5 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t.switchLangText}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">
          <div>
            <h3 className="text-base font-black text-[#0F3D59] mb-2">{t.aboutTitle}</h3>
            <p className="leading-relaxed">
              {language === 'ar' ? (
                <>
                  <strong>وظائف مطروح</strong> هي أول منصة توظيف رقمية محلية موثقة في محافظة مطروح، صُممت خصيصاً لخدمة شباب المحافظة والمغتربين وربطهم مباشرة بإدارات المطاعم، الكافيهات، والمنتجعات السياحية في مرسى مطروح، العلمين، الساحل الشمالي، وسيوة، بدون أي سماسرة أو رسوم تقديم.
                </>
              ) : (
                <>
                  <strong>Matrouh Jobs</strong> is the premier verified local employment platform in Matrouh Governorate, specifically architected to directly connect Egyptian job seekers with restaurant, café, and hospitality managers across Marsa Matrouh, New Alamein, North Coast, and Siwa without brokers or application fees.
                </>
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200/70 space-y-1">
              <ShieldCheck className="w-5 h-5 text-teal-700" />
              <h4 className="font-extrabold text-teal-950 text-xs">
                {language === 'ar' ? 'منشآت معتمدة وموثقة' : 'Verified Establishments'}
              </h4>
              <p className="text-[11px] text-teal-800">
                {language === 'ar'
                  ? 'فحص السجلات التجارية لضمان جدية الوظائف والرواتب.'
                  : 'Rigorous commercial license auditing to ensure authentic vacancies and fair pay.'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/70 space-y-1">
              <Users className="w-5 h-5 text-amber-700" />
              <h4 className="font-extrabold text-amber-950 text-xs">
                {language === 'ar' ? 'تقديم مجاني 100%' : '100% Free Applications'}
              </h4>
              <p className="text-[11px] text-amber-800">
                {language === 'ar'
                  ? 'حظر أي رسوم للتقديم وتوفير سكن مجاني للمغتربين.'
                  : 'Strict prohibition of broker fees with verified housing for relocatees.'}
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <h4 className="font-extrabold text-slate-900 text-xs block mb-1">
              {language === 'ar' ? 'بيانات التواصل والمقر:' : 'Official Contact & Headquarters:'}
            </h4>

            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-teal-600" />
                <span>{language === 'ar' ? 'الخط الأرضي:' : 'Landline:'}</span>
              </span>
              <a href="tel:0464931200" dir="ltr" className="font-bold text-teal-800 hover:underline">
                046 493 1200
              </a>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-600" />
                <span>{language === 'ar' ? 'الموبايل وواتساب:' : 'Mobile & WhatsApp:'}</span>
              </span>
              <a href="tel:01012345678" dir="ltr" className="font-bold text-teal-800 hover:underline">
                010 1234 5678
              </a>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-600" />
                <span>{language === 'ar' ? 'البريد الإلكتروني:' : 'Email Address:'}</span>
              </span>
              <span className="font-bold text-slate-800">info@matrouhjobs.com</span>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>{language === 'ar' ? 'المقر الرئيسي:' : 'Headquarters:'}</span>
              </span>
              <span>{language === 'ar' ? 'شارع الجلاء، الكورنيش، مرسى مطروح' : 'El-Galaa St., Corniche, Marsa Matrouh'}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
