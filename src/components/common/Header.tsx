import React, { useState, useEffect, useRef } from 'react';
import { useApp, NotificationItem } from '../../context/AppContext';
import {
  Menu,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Building2,
  FileCheck2,
  PlusCircle,
  X,
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
    t,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Strictly filter notifications by role to prevent cross-account leaks
  const userNotifications = notifications.filter((n) => {
    // 1. Role targeting check
    if (n.targetRole && n.targetRole !== 'all' && n.targetRole !== userRole) {
      return false;
    }

    if (userRole === 'admin') {
      return n.type === 'verification' || n.type === 'system' || n.targetRole === 'admin';
    }

    if (userRole === 'employer') {
      // Check if targeted specifically to this organization
      if (n.targetOrgId || n.targetOrgName) {
        const matchesOrg =
          (currentUser?.organizationId && n.targetOrgId === currentUser.organizationId) ||
          (currentUser?.name && n.targetOrgName && (currentUser.name.includes(n.targetOrgName) || n.targetOrgName.includes(currentUser.name))) ||
          (currentUser?.name && n.title && n.title.includes(currentUser.name));
        return matchesOrg;
      }
      return n.type === 'job' || n.type === 'verification' || n.type === 'warning' || n.type === 'notice';
    }

    // Seeker
    return n.type === 'application' || n.type === 'system' || n.targetRole === 'seeker';
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

  const handleNotificationClick = (notif: NotificationItem) => {
    markNotificationAsRead(notif.id);
    setIsNotifOpen(false);
    setSelectedNotification(notif);
  };

  return (
    <>
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

          {/* Left Controls: Notifications & Clean Avatar Menu */}
          <div className="flex items-center gap-2">
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
                          onClick={() => handleNotificationClick(n)}
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

    {/* Notification Details Modal (Window صغيرة تعرض نص الملاحظة/الإشعار بالكامل) */}
    {selectedNotification && (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
        <div className="bg-white text-slate-800 w-full max-w-sm sm:max-w-md rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 text-right">
          <div className="flex items-start justify-between pb-3 border-b border-slate-100 gap-2">
            <div className="flex items-center gap-2.5">
              <div
                className={`p-2 rounded-2xl ${
                  selectedNotification.type === 'warning'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-teal-100 text-teal-700'
                }`}
              >
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-sm text-[#0F3D59] leading-tight">
                  {selectedNotification.title}
                </h3>
                <span className="text-[10.5px] text-slate-400 font-bold block mt-0.5">
                  {selectedNotification.date}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedNotification(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Notification Text Card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 leading-relaxed text-xs text-slate-700 font-medium whitespace-pre-wrap">
            {selectedNotification.message}
          </div>

          <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
            {userRole === 'employer' && (
              <button
                type="button"
                onClick={() => {
                  setSelectedNotification(null);
                  setActiveTab('facility-profile');
                }}
                className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs transition-colors cursor-pointer"
              >
                فتح بيانات المنشأة والتراخيص
              </button>
            )}
            <button
              type="button"
              onClick={() => setSelectedNotification(null)}
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              حسناً، تم الاطلاع
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
};
