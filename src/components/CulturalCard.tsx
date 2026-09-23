import React from 'react';
import { Garment } from '../types';
import { BookOpen, Sparkles, History, Compass, CheckCircle2 } from 'lucide-react';

interface CulturalCardProps {
  garment: Garment;
  onSelectAnother?: () => void;
}

export const CulturalCard: React.FC<CulturalCardProps> = ({ garment }) => {
  return (
    <div className="bg-[#FAF8F5] border border-[#EBE3D7] rounded-xl p-5 shadow-xs transition-all">
      {/* Title & Era */}
      <div className="flex items-start justify-between gap-3 border-b border-[#EBE3D7] pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] tracking-wider uppercase text-[#8B1E1E] font-semibold">
            <BookOpen size={13} />
            <span>Hồ Sơ Cổ Phục Di Sản</span>
          </div>
          <h3 className="font-editorial text-xl font-bold text-[#1E1D1B] mt-0.5">
            {garment.vietnameseName}
          </h3>
          <p className="text-xs text-[#7A7163] italic">{garment.englishSub}</p>
        </div>

        <div className="text-right shrink-0">
          <span className="inline-block text-[11px] font-medium text-[#7D4F27] bg-[#F2EAE0] px-2.5 py-1 rounded-sm border border-[#E2D5C3]">
            {garment.era}
          </span>
        </div>
      </div>

      {/* Cultural Meaning / Context */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#574E41] flex items-center gap-1.5 mb-1.5">
          <History size={13} className="text-[#8B1E1E]" />
          Ý nghĩa & Chi tiết văn hóa
        </h4>
        <p className="text-xs sm:text-[13px] text-[#3D3830] leading-relaxed">
          {garment.culturalContext}
        </p>
      </div>

      {/* Structural Hallmarks */}
      <div className="mb-4 bg-[#F4EFEA] rounded-lg p-3 border border-[#E8DEC0]/60">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#574E41] flex items-center gap-1.5 mb-2">
          <Compass size={13} className="text-[#C89B3C]" />
          Cấu trúc chuẩn mực
        </h4>
        <ul className="space-y-1.5 text-xs text-[#4F473B]">
          {garment.structureDetails.map((detail, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E1E] mt-1.5 shrink-0" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Modern Styling Recommendation */}
      <div className="bg-[#8B1E1E]/5 border border-[#8B1E1E]/15 rounded-lg p-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8B1E1E] flex items-center gap-1.5 mb-1">
          <Sparkles size={13} />
          Mẹo phối phong cách Gen Z
        </h4>
        <p className="text-xs text-[#423C32] leading-relaxed">
          {garment.modernTips}
        </p>
      </div>
    </div>
  );
};
