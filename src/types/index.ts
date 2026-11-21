export type AreaName =
  | 'مرسى مطروح'
  | 'العلمين الجديدة'
  | 'الساحل الشمالي'
  | 'سيوة'
  | 'الحمام'
  | 'الضبعة'
  | 'سيدي براني'
  | 'النجيلة'
  | 'السلوم';

export interface Area {
  id: string;
  name: AreaName;
  tagline: string;
  image: string;
  jobCount?: number;
}

export type JobCategory =
  | 'مطبخ وشيفات'
  | 'صالة وخدمة (ويتر)'
  | 'باريستا وكافيهات'
  | 'كاشير واستقبال'
  | 'ديليفري وتوصيل'
  | 'مساعد مطبخ ونظافة'
  | 'إدارة وإشراف'
  | 'فنادق ومنتجعات';

export type EmploymentType = 'دوام كامل' | 'دوام جزئي' | 'موسم صيف';
export type ExperienceLevel = 'بدون خبرة' | 'أقل من سنة' | '1 - 3 سنوات' | 'أكثر من 3 سنوات';
export type SalaryPeriod = 'شهري' | 'يومي' | 'أسبوعي' | 'بالساعة' | 'قابل للتفاوض';

export type ApplicationStatus =
  | 'تم الإرسال'
  | 'قيد المراجعة'
  | 'تم الاطلاع'
  | 'مقابلة محددة'
  | 'عرض عمل'
  | 'تم القبول'
  | 'نعتذر حالياً'
  | 'تم الانسحاب';

export interface JobPost {
  id: string;
  organizationId: string;
  organizationName: string;
  organizationLogo: string;
  organizationVerified: boolean;
  title: string;
  category: JobCategory;
  area: AreaName;
  address: string;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  salaryMin?: number;
  salaryMax?: number;
  salaryPeriod: SalaryPeriod;
  isNegotiableSalary?: boolean;
  vacanciesCount: number;
  description: string;
  requirements: string[];
  benefits: string[];
  images: string[];
  publishedAt: string;
  closesAt?: string;
  status: 'منشور' | 'مسودة' | 'مغلق';
  featured?: boolean;
  isSeasonal?: boolean;
}

export interface Organization {
  id: string;
  name: string;
  category: string;
  area: AreaName;
  address: string;
  phone: string;
  logo: string;
  coverImage: string;
  description: string;
  verificationStatus: 'موثقة' | 'بانتظار التحقق' | 'مرفوضة';
  branchesCount: number;
  createdAt: string;
  commercialRecordPdf?: string;
  commercialRecordNumber?: string;
}

export interface CandidateCV {
  id: string;
  userId: string;
  filename: string;
  fileSize: string;
  mimeType: string;
  uploadedAt: string;
  status: 'جاهز' | 'قيد الفحص';
  version: number;
  parsedData?: {
    extractedName?: string;
    extractedPhone?: string;
    extractedSkills?: string[];
  };
}

export interface Application {
  id: string;
  jobPostId: string;
  jobTitle: string;
  organizationId: string;
  organizationName: string;
  candidateUserId: string;
  candidateName: string;
  candidatePhone: string;
  candidateEmail?: string;
  candidateArea: AreaName;
  cvSnapshot: {
    cvId: string;
    filename: string;
    version: number;
    fileSize: string;
    uploadedAt: string;
  };
  status: ApplicationStatus;
  appliedAt: string;
  coverNote?: string;
  internalNote?: string;
  interviewDate?: string;
}

export interface JobSeekerProfile {
  userId: string;
  fullName: string;
  phone: string;
  email?: string;
  area: AreaName;
  headline: string;
  bio: string;
  experienceYears: number;
  skills: string[];
  cv?: CandidateCV;
}

export type UserRole = 'seeker' | 'employer' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  organizationId?: string;
}

export interface SupportContact {
  landline: string;
  mobile: string;
  email: string;
  address: string;
}
