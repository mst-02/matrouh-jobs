import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { SideDrawer } from './components/common/SideDrawer';
import { BottomNav } from './components/common/BottomNav';
import { Footer } from './components/common/Footer';
import { HomeView } from './components/home/HomeView';
import { JobsExplorerView } from './components/jobs/JobsExplorerView';
import { MyApplicationsView } from './components/applications/MyApplicationsView';
import { ProfileView } from './components/profile/ProfileView';
import { EmployerDashboard } from './components/employer/EmployerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { JobDetailsModal } from './components/jobs/JobDetailsModal';
import { ApplyModal } from './components/jobs/ApplyModal';
import { CvUploadModal } from './components/profile/CvUploadModal';
import { PostJobModal } from './components/employer/PostJobModal';
import { FacilityProfileView } from './components/employer/FacilityProfileView';
import { AuthModal } from './components/auth/AuthModal';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  const [searchParams, setSearchParams] = useState({
    keyword: '',
    area: '',
    category: '',
  });

  const handleHeroSearch = (keyword: string, area: string, category: string) => {
    setSearchParams({ keyword, area, category });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Clean Header */}
      <Header />

      {/* Slide-out Sidebar Drawer (3-bars right hamburger) */}
      <SideDrawer />

      {/* Main View Area */}
      <main className="flex-1 pb-16 md:pb-0">
        {activeTab === 'home' && <HomeView onSearch={handleHeroSearch} />}
        {activeTab === 'search' && (
          <JobsExplorerView
            initialSearch={searchParams.keyword}
            initialArea={searchParams.area}
            initialCategory={searchParams.category}
          />
        )}
        {activeTab === 'applications' && <MyApplicationsView />}
        {activeTab === 'profile' && <ProfileView />}
        {activeTab === 'employer-dashboard' && <EmployerDashboard />}
        {activeTab === 'facility-profile' && <FacilityProfileView />}
        {activeTab === 'admin-dashboard' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Webview Bottom Navigation */}
      <BottomNav />

      {/* Global Modals */}
      <JobDetailsModal />
      <ApplyModal />
      <CvUploadModal />
      <PostJobModal />
      <AuthModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
