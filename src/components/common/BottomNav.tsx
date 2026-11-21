import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Compass,
  FileCheck2,
  UserCircle2,
  Building,
  PlusSquare,
  Shield,
  FileSpreadsheet,
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { userRole, activeTab, setActiveTab, applications, setIsPostJobModalOpen } = useApp();

  const activeAppsCount = applications.filter((a) => a.status !== 'تم الانسحاب').length;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 safe-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around h-16 px-2">
        {userRole === 'seeker' ? (
          <>
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                activeTab === 'home' ? 'text-teal-600 font-bold scale-105' : 'text-slate-400 font-medium'
              }`}
            >
              <Home className="w-5 h-5 mb-1" />
              <span className="text-[11px]">الرئيسية</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                activeTab === 'search' ? 'text-teal-600 font-bold scale-105' : 'text-slate-400 font-medium'
              }`}
            >
              <Compass className="w-5 h-5 mb-1" />
              <span className="text-[11px]">استكشف</span>
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all relative ${
                activeTab === 'applications' ? 'text-teal-600 font-bold scale-105' : 'text-slate-400 font-medium'
              }`}
            >
              <div className="relative">
                <FileCheck2 className="w-5 h-5 mb-1" />
                {activeAppsCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-teal-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                    {activeAppsCount}
                  </span>
                )}
              </div>
              <span className="text-[11px]">طلباتي</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                activeTab === 'profile' ? 'text-teal-600 font-bold scale-105' : 'text-slate-400 font-medium'
              }`}
            >
              <UserCircle2 className="w-5 h-5 mb-1" />
              <span className="text-[11px]">ملفي وCV</span>
            </button>
          </>
        ) : userRole === 'employer' ? (
          <>
            <button
              onClick={() => setActiveTab('employer-dashboard')}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                activeTab === 'employer-dashboard' ? 'text-teal-600 font-bold scale-105' : 'text-slate-400 font-medium'
              }`}
            >
              <Building className="w-5 h-5 mb-1" />
              <span className="text-[11px]">لوحة المطعم</span>
            </button>

            <button
              onClick={() => setIsPostJobModalOpen(true)}
              className="flex flex-col items-center justify-center flex-1 py-1 text-teal-600 font-bold hover:scale-105 transition-transform"
            >
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/30 -mt-5">
                <PlusSquare className="w-5 h-5" />
              </div>
              <span className="text-[11px] mt-0.5">نشر وظيفة</span>
            </button>

            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                activeTab === 'home' ? 'text-teal-600 font-bold scale-105' : 'text-slate-400 font-medium'
              }`}
            >
              <Home className="w-5 h-5 mb-1" />
              <span className="text-[11px]">استعراض</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveTab('admin-dashboard')}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                activeTab === 'admin-dashboard' ? 'text-amber-700 font-bold scale-105' : 'text-slate-400 font-medium'
              }`}
            >
              <Shield className="w-5 h-5 mb-1" />
              <span className="text-[11px]">الإشراف المركزي</span>
            </button>
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                activeTab === 'home' ? 'text-amber-700 font-bold scale-105' : 'text-slate-400 font-medium'
              }`}
            >
              <Home className="w-5 h-5 mb-1" />
              <span className="text-[11px]">عرض المنصة</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
