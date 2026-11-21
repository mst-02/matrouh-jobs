import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  JobPost,
  Organization,
  Application,
  JobSeekerProfile,
  UserRole,
  ApplicationStatus,
  CandidateCV,
  AuthUser,
  AreaName,
} from '../types';
import {
  INITIAL_JOBS,
  INITIAL_ORGANIZATIONS,
  INITIAL_USER_PROFILE,
} from '../data/mockData';
import { translations, Language } from '../i18n/translations';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'application' | 'verification' | 'job' | 'system' | 'warning' | 'notice';
  targetOrgId?: string;
  targetOrgName?: string;
  targetRole?: 'employer' | 'seeker' | 'admin' | 'all';
}

interface AppContextType {
  // Language & i18n
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations['ar'];

  // Auth & Roles
  currentUser: AuthUser | null;
  userRole: UserRole;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register' | 'admin';
  setAuthModalMode: (mode: 'login' | 'register' | 'admin') => void;
  login: (email: string, password?: string) => void;
  loginAdmin: (password: string) => boolean;
  loginWithGoogle: (
    preferredRole?: 'seeker' | 'employer',
    facilityName?: string,
    customEmail?: string,
    customName?: string,
    customAvatar?: string
  ) => void;
  logout: () => void;
  switchRoleDirectly: (role: UserRole) => void;

  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSideDrawerOpen: boolean;
  setIsSideDrawerOpen: (open: boolean) => void;

  // Primary Data
  jobs: JobPost[];
  organizations: Organization[];
  applications: Application[];
  savedJobIds: string[];
  seekerProfile: JobSeekerProfile;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  pendingJobId: string | null;
  setPendingJobId: (id: string | null) => void;

  // Selected state for Modals
  selectedJob: JobPost | null;
  setSelectedJob: (job: JobPost | null) => void;
  isApplyModalOpen: boolean;
  setIsApplyModalOpen: (open: boolean) => void;
  isCvModalOpen: boolean;
  setIsCvModalOpen: (open: boolean) => void;
  isPostJobModalOpen: boolean;
  setIsPostJobModalOpen: (open: boolean) => void;
  isFacilityProfileModalOpen: boolean;
  setIsFacilityProfileModalOpen: (open: boolean) => void;

  // Actions
  registerAccount: (accountData: {
    name: string;
    email: string;
    phone?: string;
    role: 'seeker' | 'employer';
    facilityName?: string;
    area?: string;
    password?: string;
  }) => void;
  updateOrganization: (orgId: string, data: Partial<Organization>) => void;
  applyToJob: (jobId: string, coverNote?: string) => { success: boolean; reason?: string };
  withdrawApplication: (applicationId: string) => void;
  uploadCV: (cvData: Partial<CandidateCV>) => void;
  deleteCV: () => void;
  toggleSaveJob: (jobId: string) => void;
  postNewJob: (jobData: Omit<JobPost, 'id' | 'publishedAt' | 'organizationId' | 'organizationName' | 'organizationLogo' | 'organizationVerified'>) => void;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus, internalNote?: string) => void;
  verifyOrganization: (orgId: string, status: 'موثقة' | 'بانتظار التحقق' | 'مرفوضة') => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'masr_jobs_user_v2',
  JOBS: 'masr_jobs_list_v2',
  ORGS: 'masr_jobs_orgs_v2',
  APPLICATIONS: 'masr_jobs_apps_v2',
  SAVED: 'masr_jobs_saved_v2',
  PROFILE: 'masr_jobs_profile_v2',
  NOTIFICATIONS: 'masr_jobs_notifs_v2',
};

// Preset demo users
const DEMO_SEEKER: AuthUser = {
  id: 'user-seeker-1',
  name: 'أحمد محمود',
  email: 'ahmed.matrouh@example.com',
  phone: '01012345678',
  role: 'seeker',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
};

const DEMO_EMPLOYER: AuthUser = {
  id: 'user-employer-1',
  name: 'إدارة مطعم حسني للمشويات',
  email: 'hosny.restaurant@matrouh.com',
  phone: '0464931200',
  role: 'employer',
  organizationId: 'org-1',
  avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=120&h=120&q=80',
};

const DEMO_ADMIN: AuthUser = {
  id: 'user-admin-root',
  name: 'مدير المنصة (Admin)',
  email: 'admin@matrouhjobs.com',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80',
};

interface RegisteredAccount {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  organizationId?: string;
  phone?: string;
  avatar?: string;
}

const DEFAULT_ACCOUNTS: RegisteredAccount[] = [
  {
    id: 'user-seeker-1',
    name: 'أحمد محمود',
    email: 'ahmed.matrouh@example.com',
    password: '123',
    role: 'seeker',
    phone: '01012345678',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: 'user-employer-1',
    name: 'إدارة مطعم حسني للمشويات',
    email: 'hosny.restaurant@matrouh.com',
    password: '123',
    role: 'employer',
    organizationId: 'org-1',
    phone: '0464931200',
    avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: 'user-admin-root',
    name: 'مدير المنصة (Admin)',
    email: 'admin@matrouhjobs.com',
    password: 'admin',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80',
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<RegisteredAccount[]>(() => {
    const saved = localStorage.getItem('masr_jobs_accounts_v3');
    return saved ? JSON.parse(saved) : DEFAULT_ACCOUNTS;
  });

  useEffect(() => {
    localStorage.setItem('masr_jobs_accounts_v3', JSON.stringify(accounts));
  }, [accounts]);

  // Language (i18n)
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('masr_jobs_lang');
    return (saved === 'en' || saved === 'ar') ? (saved as Language) : 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('masr_jobs_lang', lang);
    document.documentElement.dir = translations[lang].dir;
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  useEffect(() => {
    document.documentElement.dir = translations[language].dir;
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  // Current logged in user (defaults to Ahmed the seeker, or null if logged out)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const isExplicitlyLoggedOut = localStorage.getItem('masr_jobs_logged_out') === 'true';
    if (isExplicitlyLoggedOut) return null;
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    return saved ? JSON.parse(saved) : DEMO_SEEKER;
  });

  const userRole: UserRole = currentUser ? currentUser.role : 'seeker';

  // Navigation & Drawer
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState<boolean>(false);

  // Auth Modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'admin'>('login');
  const [isFacilityProfileModalOpen, setIsFacilityProfileModalOpen] = useState(false);

  // Primary Data
  const [jobs, setJobs] = useState<JobPost[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.JOBS);
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [organizations, setOrganizations] = useState<Organization[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORGS);
    return saved ? JSON.parse(saved) : INITIAL_ORGANIZATIONS;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'app-seed-1',
        jobPostId: 'job-1',
        jobTitle: 'شيف مشويات وفحم (لحوم وأسماك)',
        organizationId: 'org-1',
        organizationName: 'مطعم حسني للمشويات والأسماك',
        candidateUserId: 'user-seeker-1',
        candidateName: 'أحمد محمود',
        candidatePhone: '01012345678',
        candidateEmail: 'ahmed.matrouh@example.com',
        candidateArea: 'مرسى مطروح',
        cvSnapshot: {
          cvId: 'cv-101',
          filename: 'Ahmed_Mahmoud_Chef_CV.pdf',
          version: 1,
          fileSize: '1.4 MB',
          uploadedAt: '2026-11-15 14:20',
        },
        status: 'مقابلة محددة',
        appliedAt: '2026-11-18 10:15',
        coverNote: 'جاهز للمقابلة الفورية ولدي خبرة جيدة في تتبيل وشوي لحوم الضأن والأسماك.',
        internalNote: 'المرشح ممتاز وخبرته السابقة تناسب متطلبات مطعم حسني، تم الاتصال لتأكيد المقابلة يوم الخميس.',
        interviewDate: 'الخميس القادم - 4:00 عصراً بمقر الكورنيش',
      },
    ];
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED);
    return saved ? JSON.parse(saved) : ['job-2'];
  });

  const [seekerProfile, setSeekerProfile] = useState<JobSeekerProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'notif-1',
        title: 'تحديد موعد مقابلة! 🎉',
        message: 'تم تحديد موعد مقابلة شخصية لوظيفة (شيف مشويات) في مطعم حسني بمطروح.',
        date: 'منذ ساعتين',
        read: false,
        type: 'application',
      },
    ];
  });

  // Modal controls
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [pendingJobId, setPendingJobId] = useState<string | null>(null);

  // Persistence
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORGS, JSON.stringify(organizations));
  }, [organizations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(seekerProfile));
  }, [seekerProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Auth Handlers
  const registerAccount = (data: {
    name: string;
    email: string;
    phone?: string;
    role: 'seeker' | 'employer';
    facilityName?: string;
    area?: string;
    password?: string;
  }) => {
    let orgId: string | undefined = undefined;
    const finalFacilityName = data.facilityName || data.name;

    if (data.role === 'employer') {
      orgId = `org-${Date.now()}`;
      const newOrg: Organization = {
        id: orgId,
        name: finalFacilityName,
        category: 'مطعم ومأكولات ومشويات',
        area: (data.area as AreaName) || 'مرسى مطروح',
        address: `${data.area || 'مرسى مطروح'}، محافظة مطروح`,
        phone: data.phone || '0464930000',
        logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&h=200&q=80',
        coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        description: `منشأة ${finalFacilityName} لخدمات الضيافة والمأكولات في مطروح.`,
        verificationStatus: 'بانتظار التحقق',
        branchesCount: 1,
        createdAt: new Date().toISOString().split('T')[0],
        commercialRecordNumber: 'CR-' + Math.floor(10000 + Math.random() * 90000) + '-MATROUH',
      };
      setOrganizations((prev) => [newOrg, ...prev]);
    }

    const newAcc: RegisteredAccount = {
      id: `acc-${Date.now()}`,
      name: data.role === 'employer' ? finalFacilityName : data.name,
      email: data.email.toLowerCase().trim(),
      password: data.password || '123456',
      role: data.role,
      organizationId: orgId,
      phone: data.phone,
      avatar: data.role === 'employer'
        ? 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=120&h=120&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    };

    setAccounts((prev) => [...prev, newAcc]);

    const authUser: AuthUser = {
      id: newAcc.id,
      name: newAcc.name,
      email: newAcc.email,
      phone: newAcc.phone,
      role: newAcc.role,
      organizationId: newAcc.organizationId,
      avatar: newAcc.avatar,
    };

    localStorage.removeItem('masr_jobs_logged_out');
    setCurrentUser(authUser);
    setIsAuthModalOpen(false);

    if (newAcc.role === 'employer') {
      setActiveTab('employer-dashboard');
    } else {
      setActiveTab('home');
    }
  };

  const login = (email: string, password?: string) => {
    const cleanEmail = (email || '').toLowerCase().trim();

    // 1. Admin login check
    if (
      cleanEmail === 'admin@matrouhjobs.com' ||
      cleanEmail === 'admin' ||
      password === 'admin' ||
      password === 'admin123' ||
      password === 'matrouh2026'
    ) {
      setCurrentUser(DEMO_ADMIN);
      setActiveTab('admin-dashboard');
      setIsAuthModalOpen(false);
      return;
    }

    // 2. Check registered accounts in DB
    const existing = accounts.find((a) => a.email.toLowerCase() === cleanEmail);
    if (existing) {
      const authUser: AuthUser = {
        id: existing.id,
        name: existing.name,
        email: existing.email,
        phone: existing.phone,
        role: existing.role,
        organizationId: existing.organizationId,
        avatar: existing.avatar,
      };
      localStorage.removeItem('masr_jobs_logged_out');
    setCurrentUser(authUser);
      setIsAuthModalOpen(false);
      if (existing.role === 'employer') {
        setActiveTab('employer-dashboard');
      } else if (existing.role === 'admin') {
        setActiveTab('admin-dashboard');
      } else {
        setActiveTab('home');
      }
      return;
    }

    // 3. Fallback heuristic for new emails
    const isEmployerEmail =
      cleanEmail.includes('rest') ||
      cleanEmail.includes('org') ||
      cleanEmail.includes('hotel') ||
      cleanEmail.includes('cafe');

    if (isEmployerEmail) {
      const newOrgId = `org-${Date.now()}`;
      const facilityName = cleanEmail.split('@')[0];
      const newOrg: Organization = {
        id: newOrgId,
        name: facilityName,
        category: 'مطعم ومأكولات ومشروبات',
        area: 'مرسى مطروح',
        address: 'مرسى مطروح',
        phone: '0464930000',
        logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&h=200&q=80',
        coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        description: 'منشأة معتمدة لخدمات الضيافة بمطروح.',
        verificationStatus: 'موثقة',
        branchesCount: 1,
        createdAt: new Date().toISOString().split('T')[0],
        commercialRecordNumber: 'CR-' + Math.floor(10000 + Math.random() * 90000) + '-MATROUH',
      };
      setOrganizations((prev) => [newOrg, ...prev]);

      const empUser: AuthUser = {
        id: `user-${Date.now()}`,
        name: facilityName,
        email: cleanEmail,
        role: 'employer',
        organizationId: newOrgId,
        avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=120&h=120&q=80',
      };
      setCurrentUser(empUser);
      setActiveTab('employer-dashboard');
    } else {
      const seekerUser: AuthUser = {
        id: `user-${Date.now()}`,
        name: cleanEmail ? cleanEmail.split('@')[0] : 'باحث عن عمل',
        email: cleanEmail || 'seeker@example.com',
        role: 'seeker',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      };
      setCurrentUser(seekerUser);
      setActiveTab('home');
    }

    setIsAuthModalOpen(false);
  };

  const loginAdmin = (password: string): boolean => {
    if (password === 'admin' || password === 'admin123' || password === 'matrouh2026') {
      localStorage.removeItem('masr_jobs_logged_out');
      setCurrentUser(DEMO_ADMIN);
      setActiveTab('admin-dashboard');
      setIsAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const loginWithGoogle = (
    preferredRole: 'seeker' | 'employer' = 'seeker',
    facilityName?: string,
    customEmail?: string,
    customName?: string,
    customAvatar?: string
  ) => {
    if (preferredRole === 'employer') {
      const newOrgId = `org-${Date.now()}`;
      const orgName = facilityName || customName || 'مشويات ومطاعم مطروح (Google)';
      const newOrg: Organization = {
        id: newOrgId,
        name: orgName,
        category: 'مشويات وأسماك مطروح الطازجة',
        area: 'مرسى مطروح',
        address: 'شارع الإسكندرية، مرسى مطروح',
        phone: '0464930000',
        logo: customAvatar || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&h=200&q=80',
        coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        description: 'منشأة مأكولات وضيافة مسجلة بحساب Google.',
        verificationStatus: 'موثقة',
        branchesCount: 1,
        createdAt: new Date().toISOString().split('T')[0],
        commercialRecordNumber: 'CR-' + Math.floor(10000 + Math.random() * 90000) + '-MATROUH',
      };
      setOrganizations((prev) => [newOrg, ...prev]);

      const newEmployerUser: AuthUser = {
        id: `user-google-${Date.now()}`,
        name: orgName,
        email: customEmail || 'restaurant.owner@gmail.com',
        role: 'employer',
        organizationId: newOrgId,
        avatar: customAvatar || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=120&h=120&q=80',
      };
      localStorage.removeItem('masr_jobs_logged_out');
      setCurrentUser(newEmployerUser);
      setActiveTab('employer-dashboard');
    } else {
      const newSeekerUser: AuthUser = {
        id: `user-google-${Date.now()}`,
        name: customName || 'أحمد محمود (Google)',
        email: customEmail || 'ahmed.google@gmail.com',
        role: 'seeker',
        avatar: customAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      };
      localStorage.removeItem('masr_jobs_logged_out');
      setCurrentUser(newSeekerUser);
      setActiveTab('home');
    }
    setIsAuthModalOpen(false);
  };

  const updateOrganization = (orgId: string, updatedFields: Partial<Organization>) => {
    setOrganizations((prev) =>
      prev.map((org) => (org.id === orgId ? { ...org, ...updatedFields } : org))
    );
    if (currentUser && currentUser.organizationId === orgId && updatedFields.name) {
      setCurrentUser((prev) => prev ? { ...prev, name: updatedFields.name! } : null);
    }
  };

  const logout = () => {
    localStorage.setItem('masr_jobs_logged_out', 'true');
    localStorage.removeItem(STORAGE_KEYS.USER);
    setCurrentUser(null);
    setActiveTab('home');
    setIsSideDrawerOpen(false);
  };

  const switchRoleDirectly = (role: UserRole) => {
    if (role === 'employer') {
      setCurrentUser(DEMO_EMPLOYER);
      setActiveTab('employer-dashboard');
    } else if (role === 'admin') {
      setCurrentUser(DEMO_ADMIN);
      setActiveTab('admin-dashboard');
    } else {
      setCurrentUser(DEMO_SEEKER);
      setActiveTab('home');
    }
    setIsSideDrawerOpen(false);
  };

  // Actions
  const applyToJob = (jobId: string, coverNote?: string) => {
    if (!currentUser) {
      setPendingJobId(jobId);
      setIsAuthModalOpen(true);
      return { success: false, reason: 'NEED_LOGIN' };
    }

    if (userRole === 'admin' || userRole === 'employer') {
      return { success: false, reason: 'ROLE_NOT_ALLOWED' };
    }

    const targetJob = jobs.find((j) => j.id === jobId);
    if (!targetJob) return { success: false, reason: 'JOB_NOT_FOUND' };

    // 1. Strict Server Check: Does candidate have a valid READY CV?
    if (!seekerProfile.cv || seekerProfile.cv.status !== 'جاهز') {
      setPendingJobId(jobId);
      setIsCvModalOpen(true);
      return { success: false, reason: 'NEED_CV' };
    }

    // 2. Strict Check: Already applied?
    const alreadyApplied = applications.some(
      (app) => app.jobPostId === jobId && app.candidateUserId === seekerProfile.userId
    );
    if (alreadyApplied) {
      return { success: false, reason: 'ALREADY_APPLIED' };
    }

    // 3. Create Immutable Application with Snapshot
    const newApplication: Application = {
      id: `app-${Date.now()}`,
      jobPostId: targetJob.id,
      jobTitle: targetJob.title,
      organizationId: targetJob.organizationId,
      organizationName: targetJob.organizationName,
      candidateUserId: seekerProfile.userId,
      candidateName: seekerProfile.fullName,
      candidatePhone: seekerProfile.phone,
      candidateEmail: seekerProfile.email,
      candidateArea: seekerProfile.area,
      cvSnapshot: {
        cvId: seekerProfile.cv.id,
        filename: seekerProfile.cv.filename,
        version: seekerProfile.cv.version,
        fileSize: seekerProfile.cv.fileSize,
        uploadedAt: seekerProfile.cv.uploadedAt,
      },
      status: 'تم الإرسال',
      appliedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      coverNote: coverNote || '',
    };

    setApplications((prev) => [newApplication, ...prev]);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'تم إرسال طلبك بنجاح! 🚀',
        message: `تم تسليم ملفك وسيرتك الذاتية إلى إدارة "${targetJob.organizationName}". ستصلك إشعارات بأي تحديث.`,
        date: 'الآن',
        read: false,
        type: 'application',
      },
      ...prev,
    ]);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00A896', '#0F3D59', '#F4A261'],
      });
    } catch {
      // ignore
    }

    setPendingJobId(null);
    return { success: true };
  };

  const withdrawApplication = (applicationId: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === applicationId ? { ...app, status: 'تم الانسحاب' } : app))
    );
  };

  const uploadCV = (cvData: Partial<CandidateCV>) => {
    const currentVersion = seekerProfile.cv ? seekerProfile.cv.version + 1 : 1;
    const newCv: CandidateCV = {
      id: `cv-${Date.now()}`,
      userId: seekerProfile.userId,
      filename: cvData.filename || 'سيرتي_الذاتية.pdf',
      fileSize: cvData.fileSize || '1.2 MB',
      mimeType: 'application/pdf',
      uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'جاهز',
      version: currentVersion,
    };

    setSeekerProfile((prev) => ({
      ...prev,
      cv: newCv,
    }));

    setIsCvModalOpen(false);

    if (pendingJobId) {
      const job = jobs.find((j) => j.id === pendingJobId);
      if (job) {
        setSelectedJob(job);
        setIsApplyModalOpen(true);
      }
    }
  };

  const deleteCV = () => {
    setSeekerProfile((prev) => ({
      ...prev,
      cv: undefined,
    }));
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const postNewJob = (
    jobData: Omit<JobPost, 'id' | 'publishedAt' | 'organizationId' | 'organizationName' | 'organizationLogo' | 'organizationVerified'>
  ) => {
    const employerOrg = organizations[0];
    const newJob: JobPost = {
      ...jobData,
      id: `job-${Date.now()}`,
      organizationId: employerOrg.id,
      organizationName: employerOrg.name,
      organizationLogo: employerOrg.logo,
      organizationVerified: employerOrg.verificationStatus === 'موثقة',
      publishedAt: new Date().toISOString().split('T')[0],
      status: 'منشور',
    };

    setJobs((prev) => [newJob, ...prev]);
    setIsPostJobModalOpen(false);
  };

  const updateApplicationStatus = (
    applicationId: string,
    status: ApplicationStatus,
    internalNote?: string
  ) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId
          ? {
              ...app,
              status,
              internalNote: internalNote !== undefined ? internalNote : app.internalNote,
            }
          : app
      )
    );

    const app = applications.find((a) => a.id === applicationId);
    if (app) {
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: `تحديث طلب وظيفة: ${app.jobTitle}`,
          message: `قامت إدارة "${app.organizationName}" بتحديث حالة طلبك إلى: "${status}".`,
          date: 'الآن',
          read: false,
          type: 'application',
        },
        ...prev,
      ]);
    }
  };

  const verifyOrganization = (orgId: string, status: 'موثقة' | 'بانتظار التحقق' | 'مرفوضة') => {
    setOrganizations((prev) =>
      prev.map((org) => (org.id === orgId ? { ...org, verificationStatus: status } : org))
    );
    setJobs((prev) =>
      prev.map((job) =>
        job.organizationId === orgId
          ? { ...job, organizationVerified: status === 'موثقة' }
          : job
      )
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setJobs(INITIAL_JOBS);
    setOrganizations(INITIAL_ORGANIZATIONS);
    setSeekerProfile(INITIAL_USER_PROFILE);
    setCurrentUser(DEMO_SEEKER);
    setApplications([]);
    setSavedJobIds([]);
    window.location.reload();
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        currentUser,
        userRole,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        login,
        loginAdmin,
        loginWithGoogle,
        logout,
        switchRoleDirectly,
        activeTab,
        setActiveTab,
        isSideDrawerOpen,
        setIsSideDrawerOpen,
        jobs,
        organizations,
        applications,
        savedJobIds,
        seekerProfile,
        notifications,
        setNotifications,
        pendingJobId,
        setPendingJobId,
        selectedJob,
        setSelectedJob,
        isApplyModalOpen,
        setIsApplyModalOpen,
        isCvModalOpen,
        setIsCvModalOpen,
        isPostJobModalOpen,
        setIsPostJobModalOpen,
        isFacilityProfileModalOpen,
        setIsFacilityProfileModalOpen,
        registerAccount,
        updateOrganization,
        applyToJob,
        withdrawApplication,
        uploadCV,
        deleteCV,
        toggleSaveJob,
        postNewJob,
        updateApplicationStatus,
        verifyOrganization,
        markNotificationAsRead,
        clearAllNotifications,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
