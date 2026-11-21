import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Building2,
  FileCheck2,
  PlusCircle,
  Globe,
} from 'lucide-react';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const {
    currentUser,
    userRole,
    activeTab,
    setActiveTab,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
    setIsAuthModalOpen,
    setAuthModalMode,
    setIsSideDrawerOpen,
    logout,
    language,
    toggleLanguage,
    t,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Strictly filter notifications by role to prevent cross-account leaks
  const userNotifications = notifications.filter((n) => {
    if (userRole === 'admin') {
      return n.type === 'verification' || n.type === 'system';
    }
    if (userRole === 'employer') {
      return n.type === 'job' || n.type === 'verification';
    }
    // Seeker
    return n.type === 'application' || n.type === 'system';
  });

  const unreadCount = userNotifications.filter((n) => !n.read).length;

  // Click outside to close notifications and user menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notifId: string, notifType: string) => {
    markNotificationAsRead(notifId);
    setIsNotifOpen(false);

    if (userRole === 'employer') {
      setActiveTab('employer-dashboard');
    } else {
      setActiveTab('applications');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 sm:h-16">
          {/* Right Section: 3-Bars Hamburger Menu + Custom SVG Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSideDrawerOpen(true)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
              aria-label="القائمة والخدمات"
              title="القائمة والخدمات الإضافية"
            >
              <Menu className="w-5 h-5 text-slate-800" />
            </button>

            {/* Custom Logo & Brand */}
            <div
              onClick={() => setActiveTab('home')}
              className="cursor-pointer group"
            >
              <Logo size="md" />
            </div>
          </div>

          {/* Center Links (Clean & Spacious) */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-600">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'home'
                  ? 'bg-slate-100 text-[#0F3D59] font-black'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t.navHome}
            </button>

            {userRole === 'seeker' && (
              <>
                <button
                  onClick={() => setActiveTab('search')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all ${
                    activeTab === 'search'
                      ? 'bg-slate-100 text-[#0F3D59] font-black'
                      : 'hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {t.navExplore}
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all ${
                    activeTab === 'applications'
                      ? 'bg-slate-100 text-[#0F3D59] font-black'
                      : 'hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {t.navMyApplications}
                </button>
              </>
            )}

            {userRole === 'employer' && (
              <>
                <button
                  onClick={() => setActiveTab('employer-dashboard')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all ${
                    activeTab === 'employer-dashboard'
                      ? 'bg-teal-50 text-teal-800 font-black'
                      : 'hover:text-teal-900 hover:bg-teal-50/50'
                  }`}
                >
                  {t.navEmployerDashboard}
                </button>
                <button
                  onClick={() => setActiveTab('facility-profile')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all ${
                    activeTab === 'facility-profile'
                      ? 'bg-teal-50 text-teal-800 font-black'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {t.navFacilityProfile}
                </button>
              </>
            )}

            {userRole === 'admin' && (
              <button
                onClick={() => setActiveTab('admin-dashboard')}
                className={`px-3.5 py-1.5 rounded-xl transition-all ${
                  activeTab === 'admin-dashboard'
                    ? 'bg-amber-50 text-amber-900 font-black'
                    : 'hover:text-amber-900 hover:bg-amber-50/50'
                }`}
              >
                {t.navAdminDashboard}
              </button>
            )}
          </nav>

          {/* Left Controls: Language Switcher, Notifications & Clean Avatar Menu */}
          <div className="flex items-center gap-2">
            {/* Direct Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title={language === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              <span>{t.switchLangText}</span>
            </button>

            {/* Notifications Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors relative"
                aria-label="الإشعارات"
              >
                <Bell className="w-4 h-4 text-slate-700" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown (Auto-closes when clicking outside) */}
              {isNotifOpen && (
                <div className="absolute left-0 mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <span className="text-xs font-black text-[#0F3D59]">
                      التنبيهات ({userNotifications.length})
                    </span>
                    {unreadCount > 0 && (
                      <button
                        onClick={clearAllNotifications}
                        className="text-[11px] text-teal-600 font-semibold hover:underline"
                      >
                        تحديد الكل كمقروء
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-1.5 no-scrollbar">
                    {userNotifications.length === 0 ? (
                      <p className="text-center py-6 text-xs text-slate-400">لا توجد تنبيهات جديدة</p>
                    ) : (
                      userNotifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => handleNotificationClick(n.id, n.type)}
                          className={`p-2.5 rounded-xl text-right transition-colors cursor-pointer ${
                            n.read ? 'bg-slate-50' : 'bg-teal-50/70 border-r-3 border-teal-500'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-bold text-slate-800">{n.title}</h4>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.date}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                            {n.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Clean Avatar-Only Dropdown (No bulky name text!) */}
            {currentUser ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                  title={currentUser.name}
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80'}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-xl object-cover border border-slate-200 shadow-2xs"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-2 border-b border-slate-100 mb-1">
                      <span className="text-xs font-black text-slate-900 block truncate">
                        {currentUser.name}
                      </span>
                      <span className="text-[10px] text-teal-700 font-semibold">
                        {userRole === 'seeker' && t.roleSeeker}
                        {userRole === 'employer' && t.roleEmployer}
                        {userRole === 'admin' && t.roleAdmin}
                      </span>
                    </div>

                    {userRole === 'seeker' && (
                      <>
                        <button
                          onClick={() => {
                            setActiveTab('profile');
                            setIsUserMenuOpen(false);
                          }}
                          className={`w-full ${language === 'ar' ? 'text-right' : 'text-left'} px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg`}
                        >
                          {t.navProfile}
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab('applications');
                            setIsUserMenuOpen(false);
                          }}
                          className={`w-full ${language === 'ar' ? 'text-right' : 'text-left'} px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg`}
                        >
                          {t.navMyApplications}
                        </button>
                      </>
                    )}

                    {userRole === 'employer' && (
                      <>
                        <button
                          onClick={() => {
                            setActiveTab('employer-dashboard');
                            setIsUserMenuOpen(false);
                          }}
                          className={`w-full ${language === 'ar' ? 'text-right' : 'text-left'} px-3 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-50 rounded-lg`}
                        >
                          {t.navEmployerDashboard}
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab('facility-profile');
                            setIsUserMenuOpen(false);
                          }}
                          className={`w-full ${language === 'ar' ? 'text-right' : 'text-left'} px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg`}
                        >
                          {t.navFacilityProfile}
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className={`w-full ${language === 'ar' ? 'text-right' : 'text-left'} px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg flex items-center justify-between border-t border-slate-100 mt-1 pt-1.5`}
                    >
                      <span>{t.navLogout}</span>
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-transform hover:scale-105"
              >
                {t.navLogin}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
