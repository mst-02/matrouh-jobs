import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, MapPin, Utensils, Download, Smartphone, Apple, Check, X } from 'lucide-react';
import { MATROUH_AREAS, JOB_CATEGORIES } from '../../data/mockData';

interface HeroSectionProps {
  onSearch: (searchTerm: string, area: string, category: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const { setActiveTab, t, language } = useApp();
  const [keyword, setKeyword] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [showAndroidGuide, setShowAndroidGuide] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword, selectedArea, selectedCategory);
    setActiveTab('search');
  };

  const quickFilter = (text: string) => {
    setKeyword(text);
    onSearch(text, selectedArea, selectedCategory);
    setActiveTab('search');
  };

  const handleInstallAndroid = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    } else {
      setShowAndroidGuide(true);
    }
  };

  return (
    <div className="relative bg-[#0F3D59] text-white overflow-hidden py-9 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-teal-900/30">
      {/* Background Graphic & Scenic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
          alt="شواطئ مطروح"
          className="w-full h-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D59] via-[#0F3D59]/90 to-[#0F3D59]/70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
        {/* Main Heading */}
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
          {t.heroTitle}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-amber-300">
            {t.heroHighlight}
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          {t.heroSubtitle}
        </p>

        {/* Minimal Search Bar Box */}
        <form
          onSubmit={handleSearchSubmit}
          className={`bg-white p-2 rounded-2xl shadow-xl max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-12 gap-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}
        >
          {/* Keyword */}
          <div className="sm:col-span-5 flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/70">
            <Search className="w-4 h-4 text-teal-600 shrink-0" />
            <input
              type="text"
              placeholder={t.searchKeyword}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full text-xs sm:text-sm bg-transparent text-slate-800 placeholder-slate-400 focus:outline-hidden"
            />
          </div>

          {/* Area */}
          <div className="sm:col-span-3 flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/70">
            <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full text-xs sm:text-sm bg-transparent text-slate-800 focus:outline-hidden font-medium"
            >
              <option value="">{t.searchAreaAll}</option>
              {MATROUH_AREAS.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="sm:col-span-3 flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/70">
            <Utensils className="w-4 h-4 text-teal-600 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs sm:text-sm bg-transparent text-slate-800 focus:outline-hidden font-medium"
            >
              <option value="">{t.searchCategoryAll}</option>
              {JOB_CATEGORIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="sm:col-span-1">
            <button
              type="submit"
              className="w-full h-full min-h-[40px] rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs flex items-center justify-center shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              {t.searchSubmit}
            </button>
          </div>
        </form>

        {/* Quick Suggestions Chips */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5 text-xs text-slate-300">
          <span className="text-slate-400 text-[11px]">{t.suggestionsLabel}</span>
          {(language === 'ar'
            ? ['شيف مشويات', 'ويتر صالة', 'باريستا', 'سكن مجاني', 'موسم صيف']
            : ['Grill Chef', 'Dining Waiter', 'Barista', 'Free Housing', 'Summer Season']
          ).map((tag, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => quickFilter(tag)}
              className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium backdrop-blur-xs transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Download App Section (Android APK OR iPhone Web App) */}
        <div className="pt-2 flex flex-col items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md p-1.5 sm:p-2 rounded-2xl border border-white/20 shadow-md">
            {/* Android Install Button */}
            <button
              type="button"
              onClick={handleInstallAndroid}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-transform hover:scale-105 shadow-xs"
            >
              <Smartphone className="w-4 h-4" />
              <span>{t.installAndroid}</span>
            </button>

            <span className="text-slate-300 font-extrabold text-xs px-1">{t.orWord}</span>

            {/* iPhone / Apple App Button */}
            <button
              type="button"
              onClick={() => setShowIosGuide(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-950 text-white font-bold text-xs transition-transform hover:scale-105 shadow-xs border border-white/20"
            >
              <Apple className="w-4 h-4" />
              <span>{t.installIos}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Android App Installation Guide Modal */}
      {showAndroidGuide && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-150">
          <div className="bg-white text-slate-800 w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-slate-200 space-y-4 text-right">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-black text-sm text-[#0F3D59]">
                <Smartphone className="w-5 h-5 text-emerald-600" />
                <span>تثبيت تطبيق وظائف مطروح على أندرويد</span>
              </div>
              <button
                onClick={() => setShowAndroidGuide(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">1</span>
                <p>افتح الموقع في متصفح <strong>Chrome</strong> على هاتفك الأندرويد.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">2</span>
                <p>اضغط على قائمة المتصفح <strong>(الثلاث نقاط الرأسية ⋮)</strong> في أعلى الشاشة.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">3</span>
                <p>اختر <strong>«تثبيت التطبيق»</strong> أو <strong>«إضافة إلى الشاشة الرئيسية» (Add to Home screen)</strong>.</p>
              </div>
              <p className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                سيظهر التطبيق فوراً كأيقونة على شاشة هاتفك ويعمل بملء الشاشة فائق السرعة وبدون أي أخطاء ملفات APK.
              </p>
            </div>

            <button
              onClick={() => setShowAndroidGuide(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
            >
              تم، سأقوم بالتثبيت الآن
            </button>
          </div>
        </div>
      )}

      {/* iOS App Installation Guide Modal */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-150">
          <div className="bg-white text-slate-800 w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-slate-200 space-y-4 text-right">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-black text-sm text-[#0F3D59]">
                <Apple className="w-5 h-5 text-slate-900" />
                <span>تثبيت تطبيق وظائف مطروح على iPhone</span>
              </div>
              <button
                onClick={() => setShowIosGuide(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center shrink-0">1</span>
                <p>افتح الموقع في متصفح <strong>Safari</strong> على جهاز الآيفون الخاص بك.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center shrink-0">2</span>
                <p>اضغط على زر المشاركة <strong>(Share / سهم لأعلى)</strong> أسفل شاشة المتصفح.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center shrink-0">3</span>
                <p>اختر <strong>«إضافة إلى الشاشة الرئيسية» (Add to Home Screen)</strong>.</p>
              </div>
              <p className="text-[11px] text-teal-700 font-semibold bg-teal-50 p-2.5 rounded-xl border border-teal-200">
                سيعمل معك التطبيق فوراً بشاشة كاملة وبسرعة فائقة بدون الحاجة لـ App Store.
              </p>
            </div>

            <button
              onClick={() => setShowIosGuide(false)}
              className="w-full py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs"
            >
              تم الفهم
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
