export type Language = 'ar' | 'en';

export const translations = {
  ar: {
    dir: 'rtl',
    langName: 'العربية',
    switchLangText: 'English',
    // Brand
    brandName: 'وظائف مطروح',
    brandTagline: 'بوابة العمل',
    officialBadge: 'رسمي',

    // Navigation
    navHome: 'الرئيسية',
    navExplore: 'استكشاف الوظائف',
    navMyApplications: 'طلباتي',
    navEmployerDashboard: 'لوحة المطاعم والمنشآت',
    navAdminDashboard: 'لوحة تحكم الإدارة',
    navFacilityProfile: 'بيانات المنشأة والتراخيص',
    navPostJob: 'نشر وظيفة جديدة',
    navLogin: 'تسجيل الدخول',
    navRegister: 'إنشاء حساب جديد',
    navLogout: 'تسجيل الخروج',
    navProfile: 'الملف الشخصي',

    // Role tags
    roleSeeker: 'باحث عن عمل',
    roleEmployer: 'صاحب مطعم / منشأة',
    roleAdmin: 'مدير النظام',

    // Hero
    heroTitle: 'وظائف مطاعم ومنتجعات',
    heroHighlight: 'مطروح والساحل الشمالي',
    heroSubtitle: 'تواصل مباشر مع أصحاب العمل برواتب محددة وسكن مجاني وبدون أي وسطاء',
    searchKeyword: 'المسمى: شيف، ويتر، باريستا...',
    searchAreaAll: 'كل مناطق مطروح',
    searchCategoryAll: 'كل التخصصات',
    searchSubmit: 'بحث فوري',
    suggestionsLabel: 'مقترحات سريعة:',
    installAndroid: 'تثبيت تطبيق أندرويد',
    installIos: 'تثبيت لتطبيق الآيفون (iOS)',
    orWord: 'أو',

    // Area section
    areasTitle: 'وظائف المطاعم موزعة جغرافياً',
    areasSubtitle: 'تصفح الوظائف المتاحة حالياً في مدن ومراكز مطروح والساحل',
    allAreas: 'كافة المناطق',
    openJobsCount: 'وظيفة نشطة',

    // Jobs Explorer & Cards
    latestJobs: 'أحدث الوظائف المنشورة والمعتمدة',
    verifiedFacility: 'منشأة موثقة وسجل ساري',
    verifiedBadge: 'موثقة',
    pendingVerification: 'بانتظار التحقق',
    viewAndApply: 'عرض والتقديم',
    appliedStatus: 'تم التقديم',
    saveJob: 'حفظ في المفضلة',
    freeHousingBadge: 'سكن مجاني',
    mealsBadge: 'وجبات مؤمنة',
    salaryMonthly: 'شهرياً',
    egp: 'ج.م',
    noJobsFound: 'لا توجد وظائف مطابقة للبحث حالياً.',

    // Employment Types
    fullTime: 'دوام كامل',
    partTime: 'دوام جزئي',
    summerSeason: 'موسم صيف',

    // Applications & Seeker
    myAppsTitle: 'سجل تقديماتي على الوظائف',
    statsTotalApplied: 'إجمالي التقديمات',
    statsUnderReview: 'قيد الفحص والمراجعة',
    statsInterview: 'مقابلات محددة',
    statsAccepted: 'تم القبول',
    statsRejected: 'لم يتم التوافق',
    savedJobsSection: 'الوظائف المحفوظة (المفضلة)',
    noSavedJobs: 'لم تقم بحفظ أي وظائف بعد.',
    withdrawBtn: 'سحب الطلب',
    interviewScheduled: 'تم تحديد موعد مقابلة شخصية!',

    // Employer
    employerWelcome: 'مرحباً بإدارة',
    employerActiveJobs: 'وظائفك النشطة المعلنة',
    candidatesList: 'قائمة المتقدمين',
    updateStatus: 'تحديث حالة المرشح',
    scheduleInterview: 'تحديد موعد مقابلة',
    acceptCandidate: 'قبول المرشح',
    rejectCandidate: 'اعتذار عن الطلب',
    unverifiedWarningTitle: 'الحساب بانتظار الاعتماد الإداري',
    unverifiedWarningMsg: 'لا يمكنك استقبال متقدمين أو إظهار وظائفك للعامة قبل اعتماد السجل التجاري من قبل الإدارة.',

    // Admin
    adminTitle: 'لوحة التحكم الإداري الشاملة',
    adminSubtitle: 'اعتماد المنشآت ومراجعة التراخيص والسجلات التجارية',
    allFacilities: 'كافة المنشآت المسجلة',
    actionApprove: 'اعتماد',
    actionSuspend: 'تعليق',
    actionReject: 'رفض',
    facilityDetails: 'بيانات المنشأة والتراخيص',
    crNumber: 'رقم السجل التجاري',
    phoneLabel: 'رقم الهاتف',
    addressLabel: 'العنوان',

    // Legal & Privacy
    privacyTitle: 'سياسة الخصوصية وحماية البيانات',
    termsTitle: 'شروط وسياسة الاستخدام',
    aboutTitle: 'عن منصة وظائف مطروح',
    legalNavPrivacy: 'سياسة الخصوصية',
    legalNavTerms: 'سياسة الاستخدام',
    legalNavAbout: 'من نحن',
    closeBtn: 'إغلاق',
    languageSwitcherTitle: 'تغيير لغة المنصة:',

    // Privacy Content
    privacyLawNotice: 'نلتزم بالكامل بأحكام قانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020.',
    privacyItem1Title: '1. سرية السيرة الذاتية (CV)',
    privacyItem1Desc: 'السيرة الذاتية المرفوعة لا تظهر للعامة ولا يمكن لأي محرك بحث فهرستها. لا يتم مشاركة السيرة إلا حصرياً مع المنشأة التي اخترت التقديم إليها بإرادتك الكاملة.',
    privacyItem2Title: '2. تجميد نسخة التقديم (Snapshot Security)',
    privacyItem2Desc: 'عند تقديمك على وظيفة، ينشئ النظام نسخة ثابتة ومؤمنة مرتبطة بطلبك فقط، ولا يمكن تعديلها بعد الإرسال لضمان النزاهة بينك وبين صاحب العمل.',
    privacyItem3Title: '3. حماية أرقام الهواتف وبيانات التواصل',
    privacyItem3Desc: 'رقم هاتفك وبريدك الإلكتروني محجوبان تماماً عن الزوار، ويتم كشفهما لمدير التوظيف بالمنشأة فقط بعد مراجعة طلبك وتحديد موعد المقابلة.',
    privacyItem4Title: '4. حق حذف البيانات (Right to Erasure)',
    privacyItem4Desc: 'يحق لك في أي لحظة حذف حسابك أو مسح سيرتك الذاتية بشكل نهائي وفوري من خوادم النظام دون أي قيود.',

    // Terms Content
    termsItem1Title: '1. معايير الشفافية لأصحاب المنشآت',
    termsItem1Desc: 'يلتزم كل مطعم أو فندق مسجل بذكر الراتب الفعلي وتفاصيل السكن والبدلات بأمانة ودون أي تضليل للباحث عن عمل.',
    termsItem2Title: '2. منع رسوم التوظيف أو السماسرة نهائياً',
    termsItem2Desc: 'يحظر على أي منشأة أو جهة طلب أي مبالغ مالية أو عمولات أو رسوم استمارة من المتقدمين. المنصة مجانية 100% للباحثين عن عمل.',
    termsItem3Title: '3. التوثيق الإلزامي بالسجل التجاري',
    termsItem3Desc: 'تخضع كافة المنشآت للتدقيق والفحص الإداري قبل منح شارة الاعتماد، ويتم إيقاف أي منشأة تخالف معايير العمل اللائق بمحافظة مطروح.',

    // About Content
    aboutVisionTitle: 'رؤيتنا',
    aboutVisionDesc: 'توفير بنية رقمية حديثة وموثوقة لربط شباب مصر بفرص العمل الحقيقية في مطاعم وفنادق ومنتجعات مطروح والساحل الشمالي دون وسيط.',
    aboutValuesTitle: 'قيمنا ومبادئنا',
    aboutValuesDesc: 'الشفافية في الرواتب، توثيق المنشآت بالسجل التجاري، وحماية كاملة لخصوصية المتقدمين.',

    // Auth Modal
    authLoginTitle: 'تسجيل الدخول للمنصة',
    authRegisterTitle: 'إنشاء حساب جديد',
    authGoogleBtn: 'المتابعة باستخدام حساب Google',
    googleSelectAccountText: 'اختر حساب Google للمتابعة',
    emailLabel: 'البريد الإلكتروني',
    passwordLabel: 'كلمة المرور',
    nameLabel: 'الاسم بالكامل',
    phoneInputLabel: 'رقم الهاتف (واتساب)',
    facilityNameLabel: 'اسم المطعم أو المنشأة',
    chooseRoleLabel: 'نوع الحساب:',
    roleSeekerOption: 'باحث عن عمل',
    roleEmployerOption: 'صاحب مطعم / منشأة سياحية',
    loginSubmit: 'تسجيل الدخول',
    registerSubmit: 'إنشاء الحساب فوراً',
    haveAccount: 'لديك حساب بالفعل؟',
    noAccount: 'ليس لديك حساب؟',

    // Footer
    footerRights: 'جميع الحقوق محفوظة لمنصة وظائف مطروح © 2026',
    footerLoc: 'محافظة مطروح والساحل الشمالي، جمهورية مصر العربية',
  },

  en: {
    dir: 'ltr',
    langName: 'English',
    switchLangText: 'العربية',
    // Brand
    brandName: 'Matrouh Jobs',
    brandTagline: 'Work Portal',
    officialBadge: 'Official',

    // Navigation
    navHome: 'Home',
    navExplore: 'Explore Jobs',
    navMyApplications: 'My Applications',
    navEmployerDashboard: 'Employer Portal',
    navAdminDashboard: 'Admin Portal',
    navFacilityProfile: 'Facility & Licensing',
    navPostJob: 'Post a New Job',
    navLogin: 'Sign In',
    navRegister: 'Create Account',
    navLogout: 'Sign Out',
    navProfile: 'My Profile',

    // Role tags
    roleSeeker: 'Job Seeker',
    roleEmployer: 'Restaurant / Business Owner',
    roleAdmin: 'System Admin',

    // Hero
    heroTitle: 'Restaurant & Resort Jobs in',
    heroHighlight: 'Matrouh & North Coast',
    heroSubtitle: 'Direct connection with verified employers, clear salaries, free accommodation & zero brokers',
    searchKeyword: 'Role: Chef, Waiter, Barista...',
    searchAreaAll: 'All Matrouh Areas',
    searchCategoryAll: 'All Categories',
    searchSubmit: 'Search Jobs',
    suggestionsLabel: 'Quick Suggestions:',
    installAndroid: 'Install Android App',
    installIos: 'Install iPhone App (iOS)',
    orWord: 'OR',

    // Area section
    areasTitle: 'Jobs by Geographic Region',
    areasSubtitle: 'Browse current openings across Matrouh cities and North Coast destinations',
    allAreas: 'All Regions',
    openJobsCount: 'active jobs',

    // Jobs Explorer & Cards
    latestJobs: 'Latest Approved Openings',
    verifiedFacility: 'Verified Commercial Record',
    verifiedBadge: 'Verified',
    pendingVerification: 'Pending Review',
    viewAndApply: 'View & Apply',
    appliedStatus: 'Applied',
    saveJob: 'Save to Favorites',
    freeHousingBadge: 'Free Housing',
    mealsBadge: 'Meals Provided',
    salaryMonthly: '/ Month',
    egp: 'EGP',
    noJobsFound: 'No matching jobs found right now.',

    // Employment Types
    fullTime: 'Full Time',
    partTime: 'Part Time',
    summerSeason: 'Summer Season',

    // Applications & Seeker
    myAppsTitle: 'My Submitted Job Applications',
    statsTotalApplied: 'Total Applied',
    statsUnderReview: 'Under Review',
    statsInterview: 'Interviews Scheduled',
    statsAccepted: 'Accepted',
    statsRejected: 'Not Selected',
    savedJobsSection: 'Saved Jobs (Favorites)',
    noSavedJobs: 'You have not saved any jobs yet.',
    withdrawBtn: 'Withdraw Application',
    interviewScheduled: 'Interview has been scheduled!',

    // Employer
    employerWelcome: 'Welcome, Management of',
    employerActiveJobs: 'Your Active Job Posts',
    candidatesList: 'Applicant Candidates',
    updateStatus: 'Update Candidate Status',
    scheduleInterview: 'Schedule Interview',
    acceptCandidate: 'Accept Candidate',
    rejectCandidate: 'Decline Application',
    unverifiedWarningTitle: 'Account Pending Admin Verification',
    unverifiedWarningMsg: 'You cannot receive candidates or display jobs publicly until your commercial record is verified by Admin.',

    // Admin
    adminTitle: 'Administrative Management Console',
    adminSubtitle: 'Facility Verification, Commercial License Review & Compliance',
    allFacilities: 'All Registered Facilities',
    actionApprove: 'Approve',
    actionSuspend: 'Suspend',
    actionReject: 'Reject',
    facilityDetails: 'Facility & License Inspection',
    crNumber: 'Commercial Record Number',
    phoneLabel: 'Phone Number',
    addressLabel: 'Address',

    // Legal & Privacy
    privacyTitle: 'Privacy Policy & Data Protection',
    termsTitle: 'Terms & Usage Guidelines',
    aboutTitle: 'About Matrouh Jobs',
    legalNavPrivacy: 'Privacy Policy',
    legalNavTerms: 'Terms of Use',
    legalNavAbout: 'About Us',
    closeBtn: 'Close',
    languageSwitcherTitle: 'Select Platform Language:',

    // Privacy Content
    privacyLawNotice: 'Fully compliant with Egyptian Personal Data Protection Law No. 151 of 2020.',
    privacyItem1Title: '1. Strict CV Confidentiality',
    privacyItem1Desc: 'Uploaded CVs are never publicly exposed or indexed by search engines. Your resume is strictly shared with the exact employer you deliberately apply to.',
    privacyItem2Title: '2. Application Snapshot Security',
    privacyItem2Desc: 'When applying to an opening, a secure immutable snapshot is recorded to preserve data integrity between the candidate and the hiring establishment.',
    privacyItem3Title: '3. Contact Info Masking',
    privacyItem3Desc: 'Phone numbers and emails are hidden from general visitors and revealed exclusively to the authorized hiring manager once your application is reviewed.',
    privacyItem4Title: '4. Right to Erasure',
    privacyItem4Desc: 'You maintain full authority to delete your profile, CV, and all related records from our systems at any time with immediate effect.',

    // Terms Content
    termsItem1Title: '1. Transparency for Establishments',
    termsItem1Desc: 'Every registered establishment commits to stating truthful salaries, accommodation terms, and working conditions without misrepresentation.',
    termsItem2Title: '2. Zero Recruitment or Broker Fees',
    termsItem2Desc: 'Charging job seekers any recruitment fees, application costs, or commissions is strictly prohibited. The platform is 100% free for applicants.',
    termsItem3Title: '3. Commercial Verification Requirement',
    termsItem3Desc: 'All employers undergo administrative verification before public listing to ensure safe and fair employment conditions in Matrouh.',

    // About Content
    aboutVisionTitle: 'Our Vision',
    aboutVisionDesc: 'Empowering Egyptian youth with direct, transparent access to verified hospitality and restaurant careers across Matrouh and the North Coast.',
    aboutValuesTitle: 'Our Core Values',
    aboutValuesDesc: 'Salary transparency, commercial verification, and uncompromised privacy protection for all applicants.',

    // Auth Modal
    authLoginTitle: 'Sign In to Platform',
    authRegisterTitle: 'Create a New Account',
    authGoogleBtn: 'Continue with Google',
    googleSelectAccountText: 'Choose a Google Account to continue',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    nameLabel: 'Full Name',
    phoneInputLabel: 'Phone Number (WhatsApp)',
    facilityNameLabel: 'Restaurant or Facility Name',
    chooseRoleLabel: 'Account Type:',
    roleSeekerOption: 'Job Seeker',
    roleEmployerOption: 'Restaurant / Business Owner',
    loginSubmit: 'Sign In',
    registerSubmit: 'Create Account',
    haveAccount: 'Already have an account?',
    noAccount: "Don't have an account?",

    // Footer
    footerRights: 'All rights reserved © 2026 Matrouh Jobs Platform',
    footerLoc: 'Matrouh Governorate & North Coast, Arab Republic of Egypt',
  },
};
