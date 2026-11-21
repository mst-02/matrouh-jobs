import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import { LegalModal } from '../legal/LegalModal';
import { AboutUsModal } from '../legal/AboutUsModal';

export const Footer: React.FC = () => {
  const { setActiveTab, language, setLanguage, t } = useApp();
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');
  const [aboutUsOpen, setAboutUsOpen] = useState(false);

  const openLegal = (tab: 'privacy' | 'terms') => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <>
      <footer className="bg-[#0b2b3f] text-slate-300 py-6 md:py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            {/* Minimal Custom Logo (White text for dark background) */}
            <Logo size="sm" showText={true} variant="dark" />

            {/* Quick Links in requested order: سياسة الخصوصية -> سياسة الاستخدام -> من نحن */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-semibold text-slate-300">
              <button
                onClick={() => setActiveTab('home')}
                className="hover:text-teal-400 transition-colors"
              >
                {t.navHome}
              </button>
              <button
                onClick={() => setActiveTab('search')}
                className="hover:text-teal-400 transition-colors"
              >
                {t.navExplore}
              </button>
              <button
                onClick={() => openLegal('privacy')}
                className="hover:text-teal-400 transition-colors"
              >
                {t.legalNavPrivacy}
              </button>
              <button
                onClick={() => openLegal('terms')}
                className="hover:text-teal-400 transition-colors"
              >
                {t.legalNavTerms}
              </button>
              <button
                onClick={() => setAboutUsOpen(true)}
                className="hover:text-teal-400 transition-colors"
              >
                {t.legalNavAbout}
              </button>

              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="px-2 py-0.5 rounded-lg border border-slate-700 hover:border-teal-500 text-teal-300 text-[11px] font-bold transition-colors"
              >
                {t.switchLangText}
              </button>
            </div>
          </div>

          {/* Bottom Credits */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <p>{t.footerRights} • {t.footerLoc}</p>
            <div className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>{language === 'ar' ? 'منشآت موثقة وسير ذاتية مؤمنة' : 'Verified Establishments & Secure CVs'}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalTab}
      />

      {/* About Us Modal */}
      <AboutUsModal
        isOpen={aboutUsOpen}
        onClose={() => setAboutUsOpen(false)}
      />
    </>
  );
};
