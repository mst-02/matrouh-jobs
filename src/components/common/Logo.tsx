import React from 'react';
import { useApp } from '../../context/AppContext';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'light',
}) => {
  const { t, language } = useApp();
  const iconSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const textClass =
    size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';

  const isDarkBg = variant === 'dark';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Nautical Mediterranean Sunset & Wave Logo Icon */}
      <div
        className={`${iconSize} rounded-2xl bg-gradient-to-tr from-[#0F3D59] via-[#0b4d66] to-[#00A896] p-1.5 shadow-md shadow-teal-900/15 flex items-center justify-center shrink-0 border border-white/20`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Golden Mediterranean Sun */}
          <circle cx="50" cy="36" r="18" fill="url(#sunGradient)" />
          {/* Waves of Matrouh Coast */}
          <path
            d="M15 72C28 66 38 78 50 72C62 66 72 78 85 72"
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M22 84C32 80 40 88 50 84C60 80 68 88 78 84"
            stroke="#4FD1C5"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Seagull / Career Opportunity symbol */}
          <path
            d="M36 32Q43 24 50 30Q57 24 64 32"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <defs>
            <linearGradient id="sunGradient" x1="50" y1="18" x2="50" y2="54" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F6AD55" />
              <stop offset="1" stopColor="#ED8936" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className={`flex flex-col ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <span className={`${textClass} font-black ${isDarkBg ? 'text-white' : 'text-[#0F3D59]'} tracking-tight leading-none`}>
            {t.brandName}
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`text-[10px] ${isDarkBg ? 'text-slate-300' : 'text-slate-500'} font-bold leading-none`}>
              {t.brandTagline}
            </span>
            <span className={`text-[8.5px] font-extrabold px-1.5 py-0.5 rounded-sm ${isDarkBg ? 'bg-teal-900/60 text-teal-300 border-teal-700' : 'bg-teal-50 text-teal-700 border-teal-200'} border leading-none`}>
              {t.officialBadge}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
