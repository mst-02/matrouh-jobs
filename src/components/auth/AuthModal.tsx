import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  User,
  Building2,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  MapPin,
  Check,
  Globe,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { MATROUH_AREAS } from '../../data/mockData';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    loginAdmin,
    loginWithGoogle,
    registerAccount,
    language,
    setLanguage,
    t,
  } = useApp();

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register form state
  const [registerRole, setRegisterRole] = useState<'seeker' | 'employer'>('seeker');
  const [fullName, setFullName] = useState('');
  const [facilityName, setFacilityName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('مرسى مطروح');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Google Account Chooser state
  const [showGoogleChooser, setShowGoogleChooser] = useState(false);
  const [customGmail, setCustomGmail] = useState('');
  const [customGmailName, setCustomGmailName] = useState('');
  const [customGmailRole, setCustomGmailRole] = useState<'seeker' | 'employer'>('seeker');
  const [isAddingNewGmail, setIsAddingNewGmail] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  // Unified single-button Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    login(email, password);
  };

  // Single-button Register with DB saving
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (registerRole === 'employer' && !facilityName.trim()) {
      setErrorMsg(language === 'ar' ? 'يرجى إدخال اسم المطعم أو المنشأة.' : 'Please enter restaurant or facility name.');
      return;
    }

    registerAccount({
      name: registerRole === 'employer' ? (fullName || facilityName) : fullName,
      email: regEmail,
      phone,
      role: registerRole,
      facilityName: registerRole === 'employer' ? facilityName : undefined,
      area,
      password: regPassword,
    });
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const success = loginAdmin(password);
    if (!success) {
      setErrorMsg(language === 'ar' ? 'كلمة المرور غير صحيحة. الافتراضية: admin' : 'Incorrect password. Default: admin');
    }
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGmail.trim()) return;
    const cleanMail = customGmail.includes('@') ? customGmail : `${customGmail}@gmail.com`;
    const derivedName = customGmailName.trim() || cleanMail.split('@')[0];
    loginWithGoogle(
      customGmailRole,
      customGmailRole === 'employer' ? derivedName : undefined,
      cleanMail,
      derivedName,
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80'
    );
    setShowGoogleChooser(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div>
            <h3 className="text-base font-black text-[#0F3D59]">
              {showGoogleChooser
                ? (language === 'ar' ? 'تسجيل الدخول باستخدام Google' : 'Sign in with Google')
                : authModalMode === 'login'
                ? t.authLoginTitle
                : authModalMode === 'register'
                ? t.authRegisterTitle
                : (language === 'ar' ? 'بوابة دخول الإدارة والرقابة' : 'Admin & Governance Portal')}
            </h3>
            <span className="text-xs text-slate-500">
              {showGoogleChooser
                ? (language === 'ar' ? 'اختر حساب Google للمتابعة إلى وظائف مطروح' : 'Choose an account to continue to Matrouh Jobs')
                : authModalMode === 'admin'
                ? (language === 'ar' ? 'مخصصة للإدارة المركزية لمطروح' : 'Central Matrouh Administration')
                : t.brandTagline}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="p-1.5 rounded-lg border border-slate-200 text-teal-700 hover:bg-slate-100 text-xs font-bold transition-colors"
              title={t.switchLangText}
            >
              <Globe className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setIsAuthModalOpen(false);
                setShowGoogleChooser(false);
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {errorMsg}
            </div>
          )}

          {/* GOOGLE ACCOUNT CHOOSER SCREEN */}
          {showGoogleChooser ? (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="text-xs text-slate-600 mb-2">
                {language === 'ar'
                  ? 'الحسابات المسجلة المتوفرة على هذا الجهاز:'
                  : 'Available accounts on this device:'}
              </div>

              {/* Account 1: Seeker */}
              <button
                type="button"
                onClick={() => {
                  loginWithGoogle(
                    'seeker',
                    undefined,
                    'ahmed.mahmoud@gmail.com',
                    'أحمد محمود (Google)',
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80'
                  );
                  setShowGoogleChooser(false);
                }}
                className={`w-full p-3 rounded-2xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/40 flex items-center justify-between transition-all ${language === 'ar' ? 'text-right' : 'text-left'}`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Ahmed"
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-black text-slate-900">أحمد محمود</h4>
                    <p className="text-[11px] text-slate-500 font-mono">ahmed.mahmoud@gmail.com</p>
                    <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-1.5 py-0.5 rounded-md border border-teal-200 inline-block mt-0.5">
                      {t.roleSeeker}
                    </span>
                  </div>
                </div>
                <Check className="w-4 h-4 text-teal-600" />
              </button>

              {/* Account 2: Employer */}
              <button
                type="button"
                onClick={() => {
                  loginWithGoogle(
                    'employer',
                    'مطعم حسني للمشويات (Google)',
                    'hosny.restaurant@gmail.com',
                    'إدارة مطعم حسني (Google)',
                    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=120&h=120&q=80'
                  );
                  setShowGoogleChooser(false);
                }}
                className={`w-full p-3 rounded-2xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/40 flex items-center justify-between transition-all ${language === 'ar' ? 'text-right' : 'text-left'}`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Hosny"
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-black text-slate-900">مطعم حسني للمشويات</h4>
                    <p className="text-[11px] text-slate-500 font-mono">hosny.restaurant@gmail.com</p>
                    <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-1.5 py-0.5 rounded-md border border-teal-200 inline-block mt-0.5">
                      {t.roleEmployer}
                    </span>
                  </div>
                </div>
                <Check className="w-4 h-4 text-teal-600" />
              </button>

              {/* Account 3: Use Another Gmail */}
              {!isAddingNewGmail ? (
                <button
                  type="button"
                  onClick={() => setIsAddingNewGmail(true)}
                  className={`w-full p-3 rounded-2xl border border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 flex items-center gap-3 text-slate-600 text-xs font-bold transition-all ${language === 'ar' ? 'text-right' : 'text-left'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span>{language === 'ar' ? 'استخدام حساب Gmail آخر...' : 'Use another Gmail account...'}</span>
                </button>
              ) : (
                <form onSubmit={handleCustomGoogleSubmit} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-800">
                    {language === 'ar' ? 'أدخل بريد Gmail الخاص بك:' : 'Enter your Gmail address:'}
                  </h4>
                  <input
                    type="email"
                    required
                    placeholder="yourname@gmail.com"
                    value={customGmail}
                    onChange={(e) => setCustomGmail(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
                  />
                  <input
                    type="text"
                    placeholder={language === 'ar' ? 'اسمك أو اسم المنشأة' : 'Your name or Facility name'}
                    value={customGmailName}
                    onChange={(e) => setCustomGmailName(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
                  />
                  <div className="flex gap-2 text-xs">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="customRole"
                        checked={customGmailRole === 'seeker'}
                        onChange={() => setCustomGmailRole('seeker')}
                      />
                      <span>{t.roleSeekerOption}</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="customRole"
                        checked={customGmailRole === 'employer'}
                        onChange={() => setCustomGmailRole('employer')}
                      />
                      <span>{t.roleEmployerOption}</span>
                    </label>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="submit"
                      className="flex-1 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl"
                    >
                      {language === 'ar' ? 'تسجيل ومتابعة' : 'Sign in & Continue'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingNewGmail(false)}
                      className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs rounded-xl font-medium"
                    >
                      {t.closeBtn}
                    </button>
                  </div>
                </form>
              )}

              <button
                type="button"
                onClick={() => setShowGoogleChooser(false)}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-semibold pt-2"
              >
                {language === 'ar' ? '← العودة لتسجيل الدخول التقليدي' : '← Back to regular sign in'}
              </button>
            </div>
          ) : authModalMode === 'login' ? (
            /* Mode 1: LOGIN (Single button, unified detection) */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Google Continue Button */}
              <button
                type="button"
                onClick={() => setShowGoogleChooser(true)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-2.5 shadow-2xs transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.64-5.2 3.64-9.15z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.09-6.68-4.91H1.21v3.15C3.25 21.46 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.32 14.29c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.56H1.21C.44 8.1 0 9.99 0 12s.44 3.9 1.21 5.44l4.11-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.54 1.21 6.56l4.11 3.15c.94-2.82 3.58-4.96 6.68-4.96z"
                  />
                </svg>
                <span>{t.authGoogleBtn}</span>
              </button>

              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-2 text-[11px] text-slate-400 absolute">
                  {language === 'ar' ? 'أو بالبريد' : 'or via email'}
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full text-xs p-2.5 ${language === 'ar' ? 'pr-8' : 'pl-8'} rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500`}
                  />
                  <Mail className={`w-3.5 h-3.5 text-slate-400 absolute ${language === 'ar' ? 'right-2.5' : 'left-2.5'} top-3`} />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t.passwordLabel}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full text-xs p-2.5 ${language === 'ar' ? 'pr-8' : 'pl-8'} rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500`}
                  />
                  <Lock className={`w-3.5 h-3.5 text-slate-400 absolute ${language === 'ar' ? 'right-2.5' : 'left-2.5'} top-3`} />
                </div>
              </div>

              {/* ONE SUBMIT BUTTON ONLY */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-xs transition-transform hover:scale-[1.01]"
              >
                {t.loginSubmit}
              </button>

              <div className="flex items-center justify-between pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => setAuthModalMode('register')}
                  className="font-bold text-teal-600 hover:underline"
                >
                  {t.authRegisterTitle}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEmail('admin@matrouhjobs.com');
                    setPassword('admin');
                    setAuthModalMode('admin');
                  }}
                  className="text-slate-400 hover:text-amber-600 flex items-center gap-1 text-[11px]"
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>{language === 'ar' ? 'دخول الإدارة' : 'Admin Login'}</span>
                </button>
              </div>
            </form>
          ) : authModalMode === 'register' ? (
            /* Mode 2: REGISTER (Creates real accounts and facilities) */
            <form
              onSubmit={handleRegisterSubmit}
              className="space-y-3.5 max-h-[75vh] overflow-y-auto pr-1 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* Role Selector */}
              <span className="text-xs font-bold text-slate-700 block">{t.chooseRoleLabel}</span>
              <div className="grid grid-cols-2 gap-2.5">
                <div
                  onClick={() => setRegisterRole('seeker')}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all text-center ${
                    registerRole === 'seeker'
                      ? 'border-teal-500 bg-teal-50/60 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <User className="w-5 h-5 mx-auto mb-1 text-teal-600" />
                  <span className="text-xs font-extrabold text-slate-900 block">{t.roleSeekerOption}</span>
                  <span className="text-[10px] text-slate-500">
                    {language === 'ar' ? 'للتقديم على الوظائف' : 'To apply for jobs'}
                  </span>
                </div>

                <div
                  onClick={() => setRegisterRole('employer')}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all text-center ${
                    registerRole === 'employer'
                      ? 'border-teal-500 bg-teal-50/60 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Building2 className="w-5 h-5 mx-auto mb-1 text-teal-600" />
                  <span className="text-xs font-extrabold text-slate-900 block">{t.roleEmployerOption}</span>
                  <span className="text-[10px] text-slate-500">
                    {language === 'ar' ? 'لنشر إعلانات الوظائف' : 'To post job openings'}
                  </span>
                </div>
              </div>

              {/* Dynamic Inputs based on role */}
              {registerRole === 'seeker' ? (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'ar' ? 'أحمد محمود عبد الله' : 'Full Name'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {t.facilityNameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={language === 'ar' ? 'مثال: كافيه ومطعم ريفيرا العلمين' : 'e.g. Riviera Restaurant & Cafe'}
                      value={facilityName}
                      onChange={(e) => setFacilityName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {language === 'ar' ? 'اسم مدير التوظيف أو المسؤول' : 'Manager or Contact Person'}
                    </label>
                    <input
                      type="text"
                      placeholder={language === 'ar' ? 'مثال: أ. محمد صبري' : 'e.g. Mr. Mohamed Sabry'}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
                    />
                  </div>
                </>
              )}

              {/* Shared inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t.phoneInputLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01012345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'ar' ? 'المدينة / المنطقة' : 'City / Region'}
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500 bg-white"
                  >
                    {MATROUH_AREAS.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t.passwordLabel}
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-teal-500"
                />
              </div>

              {/* Single Submit Button for Registration */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-xs transition-transform hover:scale-[1.01]"
              >
                {t.registerSubmit}
              </button>

              <button
                type="button"
                onClick={() => setShowGoogleChooser(true)}
                className="w-full py-2 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-600 text-xs font-bold flex items-center justify-center gap-2"
              >
                <span>{language === 'ar' ? 'المتابعة والتسجيل عبر Google' : 'Continue & Register with Google'}</span>
              </button>

              <div className="text-center pt-1">
                <span className="text-xs text-slate-500">{t.haveAccount} </span>
                <button
                  type="button"
                  onClick={() => setAuthModalMode('login')}
                  className="text-xs font-bold text-teal-600 hover:underline"
                >
                  {t.loginSubmit}
                </button>
              </div>
            </form>
          ) : (
            /* Mode 3: ADMIN LOGIN */
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                {language === 'ar' ? (
                  <>
                    أنت على وشك الدخول كـ <strong>مدير النظام (Admin)</strong>.
                    <br />
                    البريد: <code>admin@matrouhjobs.com</code>
                    <br />
                    كلمة المرور الافتراضية: <code>admin</code>
                  </>
                ) : (
                  <>
                    Logging in as <strong>System Administrator</strong>.
                    <br />
                    Email: <code>admin@matrouhjobs.com</code>
                    <br />
                    Default password: <code>admin</code>
                  </>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'ar' ? 'كلمة مرور مدير المنصة' : 'Admin Password'}
                </label>
                <input
                  type="password"
                  required
                  placeholder="admin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs"
              >
                {language === 'ar' ? 'دخول لوحة الرقابة والتحكم' : 'Access Admin Dashboard'}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setAuthModalMode('login')}
                  className="text-xs font-bold text-slate-500 hover:underline"
                >
                  {language === 'ar' ? 'العودة لتسجيل الدخول العادي' : 'Back to normal login'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
