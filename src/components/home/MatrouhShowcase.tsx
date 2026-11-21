import React from 'react';
import { Home, ShieldCheck, SunMedium, UtensilsCrossed } from 'lucide-react';

export const MatrouhShowcase: React.FC = () => {
  return (
    <section className="py-8 bg-slate-100/60 border-y border-slate-200/70 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1 */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-2.5">
              <Home className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 mb-0.5">
              سكن مغتربين مجاني
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              إقامة مجهزة ومكيفة للعمالة القادمة من خارج المحافظة
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2.5">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 mb-0.5">
              وجبات يومية وتبس
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              وجبات طعام يومية مع مشاركة إكراميات موسم الصيف
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 mb-0.5">
              منشآت موثقة 100%
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              تواصل مباشر مع أصحاب المطاعم دون سماسرة أو رسوم
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-2.5">
              <SunMedium className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 mb-0.5">
              عقود موسمية ودائمة
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              فرص مرنة للمصيف أو عمل مستقر طوال العام
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
