import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Home,
  Compass,
  FileCheck2,
  Building2,
  UserCircle2,
  FileText,
  ShieldCheck,
  Headphones,
  LogOut,
  LogIn,
  ChevronDown,
  ChevronUp,
  Phone,
  PhoneCall,
  Mail,
  Edit2,
  Check,
  PlusCircle,
  Globe,
} from 'lucide-react';
import { Logo } from './Logo';
import { LegalModal } from '../legal/LegalModal';
import { AboutUsModal } from '../legal/AboutUsModal';

export const SideDrawer: React.FC = () => {
  const {
    isSideDrawerOpen,
    setIsSideDrawerOpen,
    currentUser,
    userRole,
    activeTab,
    setActiveTab,
    setIsAuthModalOpen,
    setAuthModalMode,
    logout,
    setIsCvModalOpen,
    setIsPostJobModalOpen,
    setIsFacilityProfileModalOpen,
    language,
    setLanguage,
    toggleLanguage,
    t,
  } = useApp();

  // Accordion state for Support & Complaints
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [landline, setLandline] = useState('046 493 1200');
  const [mobile, setMobile] = useState('010 1234 5678');
  const [isEditingSupport, setIsEditingSupport] = useState(false);

  // Legal & About Modals
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');
  const [aboutUsOpen, setAboutUsOpen] = useState(false);

  if (!isSideDrawerOpen) return null;

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    setIsSideDrawerOpen(false);
  };

  const handleOpenAuth = (mode: 'login' | 'register' | 'admin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
    setIsSideDrawerOpen(false);
  };

  const openLegal = (tab: 'privacy' | 'terms') => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
        {/* Backdrop */}
        <div
          onClick={() => setIsSideDrawerOpen(false)}
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        />

        {/* Drawer Panel */}
        <div
          className={`absolute inset-y-0 ${
            language === 'ar' ? 'right-0 border-l slide-in-from-right' : 'left-0 border-r slide-in-from-left'
          } max-w-xs sm:max-w-sm w-full bg-white shadow-2xl flex flex-col z-10 border-slate-200/90 animate-in duration-250`}
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
            <Logo size="sm" showText={true} />

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleLanguage}
                className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 hover:bg-slate-100 text-teal-700 flex items-center gap-1 transition-colors"
                title={language === 'ar' ? 'English' : 'العربية'}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{t.switchLangText}</span>
              </button>

              <button
                onClick={() => setIsSideDrawerOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Status Card */}
          <div className="p-3.5 border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
            {currentUser ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80'}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs"
                  />
                  <div>
                    <h4 className="text-xs font-black text-slate-900 line-clamp-1">
                      {currentUser.name}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md inline-block mt-0.5 bg-teal-50 text-teal-800 border border-teal-200">
                      {currentUser.role === 'seeker' && t.roleSeeker}
                      {currentUser.role === 'employer' && t.roleEmployer}
                      {currentUser.role === 'admin' && t.roleAdmin}
                    </span>
                  </div>
                </div>

                <button
                  onClick={logout}
                  title={t.navLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-slate-500">
                  {language === 'ar'
                    ? 'سجل دخولك لتتمكن من التقديم وإدارة الوظائف'
                    : 'Sign in to submit applications or manage postings'}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenAuth('login')}
                    className="flex-1 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>{t.navLogin}</span>
                  </button>
                  <button
                    onClick={() => handleOpenAuth('register')}
                    className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    {t.navRegister}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links & Services */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
            {/* Main Navigation (Customized per role!) */}
            <div>
              <span className={`text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mb-1.5 px-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {language === 'ar' ? 'التنقل السريع' : 'Quick Navigation'}
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => navigateTo('home')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${language === 'ar' ? 'text-right' : 'text-left'} ${
                    activeTab === 'home'
                      ? 'bg-teal-50 text-teal-800 font-black'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Home className="w-4 h-4 text-teal-600" />
                  <span>{t.navHome}</span>
                </button>

                {/* FOR SEEKER: Show 'استكشف الوظائف' */}
                {userRole === 'seeker' && (
                  <button
                    onClick={() => navigateTo('search')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${language === 'ar' ? 'text-right' : 'text-left'} ${
                      activeTab === 'search'
                        ? 'bg-teal-50 text-teal-800 font-black'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Compass className="w-4 h-4 text-teal-600" />
                    <span>{t.navExplore}</span>
                  </button>
                )}

                {/* FOR EMPLOYER: In place of 'استكشف الوظائف', show '+ نشر وظيفة جديدة'! */}
                {userRole === 'employer' && (
                  <button
                    onClick={() => {
                      setIsPostJobModalOpen(true);
                      setIsSideDrawerOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-teal-800 bg-teal-50/80 border border-teal-200 transition-all ${language === 'ar' ? 'text-right' : 'text-left'} hover:bg-teal-100`}
                  >
                    <PlusCircle className="w-4 h-4 text-teal-700" />
                    <span>{t.navPostJob}</span>
                  </button>
                )}

                {userRole === 'seeker' && (
                  <>
                    <button
                      onClick={() => navigateTo('applications')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${language === 'ar' ? 'text-right' : 'text-left'} ${
                        activeTab === 'applications'
                          ? 'bg-teal-50 text-teal-800 font-black'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <FileCheck2 className="w-4 h-4 text-teal-600" />
                      <span>{t.navMyApplications}</span>
                    </button>

                    <button
                      onClick={() => navigateTo('profile')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${language === 'ar' ? 'text-right' : 'text-left'} ${
                        activeTab === 'profile'
                          ? 'bg-teal-50 text-teal-800 font-black'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <UserCircle2 className="w-4 h-4 text-teal-600" />
                      <span>{t.navProfile}</span>
                    </button>
                  </>
                )}

                {userRole === 'employer' && (
                  <button
                    onClick={() => navigateTo('employer-dashboard')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${language === 'ar' ? 'text-right' : 'text-left'} ${
                      activeTab === 'employer-dashboard'
                        ? 'bg-teal-50 text-teal-800 font-black'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-teal-600" />
                    <span>{t.navEmployerDashboard}</span>
                  </button>
                )}

                {userRole === 'admin' && (
                  <button
                    onClick={() => navigateTo('admin-dashboard')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${language === 'ar' ? 'text-right' : 'text-left'} ${
                      activeTab === 'admin-dashboard'
                        ? 'bg-amber-50 text-amber-900 font-black'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>{t.navAdminDashboard}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Document / Profile Service (Tailored per role!) */}
            <div>
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mb-1.5 px-2">
                الوثائق والبيانات
              </span>
              <div className="space-y-1">
                {userRole === 'seeker' ? (
                  <button
                    onClick={() => {
                      setIsCvModalOpen(true);
                      setIsSideDrawerOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 text-right transition-colors bg-teal-50/40 border border-teal-100"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-teal-600" />
                      <span>السيرة الذاتية (CV)</span>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => navigateTo('facility-profile')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-right transition-colors ${
                      activeTab === 'facility-profile'
                        ? 'bg-teal-50 text-teal-800 font-black'
                        : 'text-slate-700 hover:bg-slate-50 bg-teal-50/40 border border-teal-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-teal-600" />
                      <span>بيانات المنشأة والتراخيص</span>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Support & Complaints Accordion (Inline list, no alerts!) */}
            <div>
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mb-1.5 px-2">
                المساعدة والشكاوى
              </span>
              <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => setIsSupportOpen(!isSupportOpen)}
                  className="w-full flex items-center justify-between p-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100/70 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-teal-600" />
                    <span>فريق الدعم والشكاوى</span>
                  </div>
                  {isSupportOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {isSupportOpen && (
                  <div className="p-3 pt-0 border-t border-slate-200/60 bg-white space-y-2 text-xs text-slate-600 animate-in fade-in duration-150">
                    <div className="pt-2 flex items-center justify-between text-slate-700 font-medium">
                      <span className="flex items-center gap-1.5">
                        <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
                        <span>الخط الأرضي للشكاوى:</span>
                      </span>
                      {isEditingSupport ? (
                        <input
                          type="text"
                          dir="ltr"
                          value={landline}
                          onChange={(e) => setLandline(e.target.value)}
                          className="w-28 text-xs p-1 border rounded-md"
                        />
                      ) : (
                        <a href={`tel:${landline.replace(/\s+/g, '')}`} dir="ltr" className="font-bold text-teal-800 hover:underline">
                          {landline}
                        </a>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-slate-700 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-teal-600" />
                        <span>موبايل وواتساب الدعم:</span>
                      </span>
                      {isEditingSupport ? (
                        <input
                          type="text"
                          dir="ltr"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          className="w-28 text-xs p-1 border rounded-md"
                        />
                      ) : (
                        <a href={`tel:${mobile.replace(/\s+/g, '')}`} dir="ltr" className="font-bold text-teal-800 hover:underline">
                          {mobile}
                        </a>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-slate-700 font-medium truncate">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-teal-600" />
                        <span>البريد:</span>
                      </span>
                      <span className="font-bold text-slate-700 text-[11px]">
                        support@matrouhjobs.com
                      </span>
                    </div>

                    {userRole === 'admin' && (
                      <div className="pt-2 border-t border-slate-100 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setIsEditingSupport(!isEditingSupport)}
                          className="text-[11px] font-bold text-amber-700 flex items-center gap-1 hover:underline"
                        >
                          {isEditingSupport ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>حفظ الأرقام</span>
                            </>
                          ) : (
                            <>
                              <Edit2 className="w-3 h-3" />
                              <span>تعديل أرقام الدعم (أدمن)</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Links in requested order: سياسة الخصوصية -> سياسة الاستخدام -> من نحن */}
            <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
              <button
                onClick={() => openLegal('privacy')}
                className={`w-full ${language === 'ar' ? 'text-right' : 'text-left'} py-1 px-2 text-slate-600 hover:text-teal-700 font-medium`}
              >
                {t.legalNavPrivacy}
              </button>
              <button
                onClick={() => openLegal('terms')}
                className={`w-full ${language === 'ar' ? 'text-right' : 'text-left'} py-1 px-2 text-slate-600 hover:text-teal-700 font-medium`}
              >
                {t.legalNavTerms}
              </button>
              <button
                onClick={() => setAboutUsOpen(true)}
                className={`w-full ${language === 'ar' ? 'text-right' : 'text-left'} py-1 px-2 text-slate-600 hover:text-teal-700 font-medium`}
              >
                {t.legalNavAbout}
              </button>
            </div>
          </div>
        </div>
      </div>

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
