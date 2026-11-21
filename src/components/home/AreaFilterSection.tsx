import React from 'react';
import { MATROUH_AREAS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { MapPin } from 'lucide-react';

interface AreaFilterSectionProps {
  selectedArea: string;
  onSelectArea: (area: string) => void;
}

export const AreaFilterSection: React.FC<AreaFilterSectionProps> = ({
  selectedArea,
  onSelectArea,
}) => {
  const { jobs, organizations, t, language } = useApp();

  const verifiedOrgIds = organizations
    .filter((o) => o.verificationStatus === 'موثقة')
    .map((o) => o.id);

  // Calculate real active jobs count per area dynamically for verified establishments!
  const getJobCountForArea = (areaName: string) => {
    return jobs.filter((j) => j.area === areaName && verifiedOrgIds.includes(j.organizationId))
      .length;
  };

  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-teal-600" />
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            {t.areasTitle}
          </h2>
        </div>

        {selectedArea && (
          <button
            onClick={() => onSelectArea('')}
            className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-xl hover:bg-teal-100 transition-colors"
          >
            {language === 'ar' ? `عرض الكل (إلغاء: ${selectedArea})` : `Show All (Clear: ${selectedArea})`}
          </button>
        )}
      </div>

      {/* Grid of Areas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {MATROUH_AREAS.map((area) => {
          const isSelected = selectedArea === area.name;
          const realCount = getJobCountForArea(area.name);

          return (
            <div
              key={area.id}
              onClick={() => onSelectArea(isSelected ? '' : area.name)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                isSelected
                  ? 'border-teal-500 ring-2 ring-teal-500 ring-offset-1 shadow-sm'
                  : 'border-slate-200/90'
              }`}
            >
              <div className="h-24 sm:h-28 w-full relative">
                <img
                  src={area.image}
                  alt={area.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-2 right-2 left-2 text-white">
                  <h3 className="text-xs sm:text-sm font-black line-clamp-1 leading-tight">
                    {area.name}
                  </h3>
                  <span className="text-[10px] text-teal-300 font-bold block mt-0.5">
                    {realCount} {language === 'ar' ? (realCount === 1 ? 'وظيفة متاحة' : 'وظائف متاحة') : t.openJobsCount}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
