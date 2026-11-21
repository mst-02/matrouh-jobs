import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, AlertTriangle, Lock, Globe } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const { language, setLanguage, t } = useApp();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <h3 className="text-base font-black text-[#0F3D59]">
              {activeTab === 'privacy' ? t.privacyTitle : t.termsTitle}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Language Switcher Bar inside Privacy System */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-teal-50 via-slate-50 to-teal-50 border-b border-teal-100/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-900">
            <Globe className="w-4 h-4 text-teal-600" />
            <span>{t.languageSwitcherTitle}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-teal-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setLanguage('ar')}
              className={`px-3 py-1 text-xs font-black rounded-lg transition-all ${
                language === 'ar'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-teal-700'
              }`}
            >
              العربية (AR)
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-xs font-black rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-teal-700'
              }`}
            >
              English (EN)
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-100 p-2 gap-2">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'privacy'
                ? 'bg-white text-teal-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.legalNavPrivacy}
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'terms'
                ? 'bg-white text-teal-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.legalNavTerms}
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">
          {activeTab === 'privacy' ? (
            <div className="space-y-4">
              <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200 text-teal-900 text-xs font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4 text-teal-700 shrink-0" />
                <span>{t.privacyLawNotice}</span>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">
                  {t.privacyItem1Title}
                </h4>
                <p>{t.privacyItem1Desc}</p>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">
                  {t.privacyItem2Title}
                </h4>
                <p>{t.privacyItem2Desc}</p>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">
                  {t.privacyItem3Title}
                </h4>
                <p>{t.privacyItem3Desc}</p>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">
                  {t.privacyItem4Title}
                </h4>
                <p>{t.privacyItem4Desc}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  {language === 'ar'
                    ? 'التقديم مجاني 100% ويُحظر تماماً على أي منشأة طلب أي رسوم إدارية أو توظيف.'
                    : 'Applications are 100% free. Any establishment asking for administrative or recruitment fees is strictly banned.'}
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">
                  {t.termsItem1Title}
                </h4>
                <p>{t.termsItem1Desc}</p>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">
                  {t.termsItem2Title}
                </h4>
                <p>{t.termsItem2Desc}</p>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">
                  {t.termsItem3Title}
                </h4>
                <p>{t.termsItem3Desc}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            {language === 'ar' ? 'النسخة القانونية v2.1 (محدثة)' : 'Legal Version v2.1 (Updated)'}
          </span>
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
