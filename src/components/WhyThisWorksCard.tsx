import React from 'react';
import { StyleScoreResult } from '../utils/styleScore';
import { Compass, Sparkles, Flame, ShieldCheck } from 'lucide-react';

interface WhyThisWorksCardProps {
  scoreResult: StyleScoreResult;
}

export const WhyThisWorksCard: React.FC<WhyThisWorksCardProps> = ({ scoreResult }) => {
  return (
    <div className="bg-[#FAF8F5] border border-[#EBE3D7] rounded-xl p-5 shadow-xs transition-all">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EBE3D7] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Sparkles size={15} className="text-[#8B1E1E]" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#1E1D1B]">
            Why This Works · Phân Tích Bản Phối
          </h3>
        </div>
        <span className="text-[11px] font-mono text-[#8B1E1E] bg-[#8B1E1E]/8 px-2 py-0.5 rounded-sm font-semibold">
          Style Score
        </span>
      </div>

      {/* Dynamic Narrative Explanation */}
      <p className="text-xs sm:text-[13px] text-[#3D3830] leading-relaxed mb-5 italic border-l-2 border-[#8B1E1E] pl-3 py-0.5">
        “{scoreResult.whyThisWorks}”
      </p>

      {/* Visual Metric Bars (Visualization of Cultural & Modern balance) */}
      <div className="space-y-3.5">
        {/* Metric 1: Truyền Thống */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-[#5A5144] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <ShieldCheck size={13} className="text-[#8B1E1E]" />
              Hồn Cốt Truyền Thống
            </span>
            <span className="font-mono text-xs font-bold text-[#1E1D1B] tabular-nums">
              {scoreResult.traditionalScore}%
            </span>
          </div>
          <div className="w-full h-2 bg-[#EBE3D7] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8B1E1E] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${scoreResult.traditionalScore}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Hiện Đại */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-[#5A5144] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Compass size={13} className="text-[#23395B]" />
              Nhịp Thở Hiện Đại (Gen Z)
            </span>
            <span className="font-mono text-xs font-bold text-[#1E1D1B] tabular-nums">
              {scoreResult.modernScore}%
            </span>
          </div>
          <div className="w-full h-2 bg-[#EBE3D7] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#23395B] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${scoreResult.modernScore}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Cá Tính */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-[#5A5144] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Flame size={13} className="text-[#C89B3C]" />
              Độ Tương Phản & Cá Tính
            </span>
            <span className="font-mono text-xs font-bold text-[#1E1D1B] tabular-nums">
              {scoreResult.individualityScore}%
            </span>
          </div>
          <div className="w-full h-2 bg-[#EBE3D7] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C89B3C] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${scoreResult.individualityScore}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#EBE3D7]/70 text-[11px] text-[#857B6C] flex items-center justify-between">
        <span>Tỷ lệ phối gợi ý: 70% Di sản · 30% Đương đại</span>
        <span className="font-medium text-[#1E1D1B]">Đạt chuẩn thẩm mỹ</span>
      </div>
    </div>
  );
};
