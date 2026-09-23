import React from 'react';
import { OutfitSelection } from '../types';
import { COLORS, checkColorHarmony } from '../data/mockData';
import { Palette, Sparkles, CheckCircle2, Compass, CircleDot } from 'lucide-react';

interface ColorHarmonyCheckerProps {
  selection: OutfitSelection;
  onSelectColor?: (colorId: string) => void;
}

export const ColorHarmonyChecker: React.FC<ColorHarmonyCheckerProps> = ({
  selection,
  onSelectColor
}) => {
  const harmonyReport = checkColorHarmony(selection);
  const currentColor = COLORS.find((c) => c.id === selection.colorId) || COLORS[0];

  const elements = [
    { name: 'Kim', color: '#F4EFEA', border: '#D5CABE', label: 'Bạch Kim', meaning: 'Thuần khiết' },
    { name: 'Thủy', color: '#23395B', border: '#17273F', label: 'Hắc Thủy', meaning: 'Trầm mặc' },
    { name: 'Mộc', color: '#1E382B', border: '#102219', label: 'Thanh Mộc', meaning: 'Sinh khí' },
    { name: 'Hỏa', color: '#8B1E1E', border: '#5C1212', label: 'Xích Hỏa', meaning: 'Hưng thịnh' },
    { name: 'Thổ', color: '#C89B3C', border: '#8A671D', label: 'Hoàng Thổ', meaning: 'Vững chãi' }
  ];

  return (
    <div className="bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl p-5 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD0]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#8B1E1E]/10 text-[#8B1E1E] flex items-center justify-center">
            <Palette size={16} />
          </div>
          <div>
            <h3 className="font-editorial text-sm font-bold text-[#1E1D1B]">
              Kiểm Tra Hài Hòa Màu Sắc
            </h3>
            <span className="text-[10px] text-[#7A7061] block">
              Bánh Xe Ngũ Hành & Mỹ Thuật Di Sản
            </span>
          </div>
        </div>

        {/* Harmony Score Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-[#E5DDD0] shadow-2xs">
          <span className="text-[10px] text-[#706657] font-semibold uppercase">Điểm:</span>
          <span className="font-mono text-xs font-bold text-[#8B1E1E]">
            {harmonyReport.score}/100
          </span>
        </div>
      </div>

      {/* Main Harmony Gauge & Rule */}
      <div className="p-4 bg-white rounded-xl border border-[#E5DDD0]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#1E1D1B] flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#C89B3C]" />
            {harmonyReport.ruleName}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-sm bg-emerald-50 text-emerald-800 border border-emerald-200">
            {harmonyReport.status === 'excellent' ? 'Tuyệt Phẩm Hài Hòa' : 'Cân Bằng Hài Hòa'}
          </span>
        </div>

        <p className="text-xs text-[#524A3D] leading-relaxed">
          {harmonyReport.explanation}
        </p>

        {/* Palette Swatch Bar */}
        <div className="mt-4 pt-3 border-t border-[#F0EAE1]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7061] block mb-2">
            Hệ Phối Màu Đang Áp Dụng:
          </span>
          <div className="grid grid-cols-4 gap-2">
            {harmonyReport.paletteColors.map((palette: { name: string; hex: string }, idx: number) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div
                  className="w-full h-8 rounded-lg border border-black/15 shadow-2xs mb-1"
                  style={{ backgroundColor: palette.hex }}
                />
                <span className="text-[9px] text-[#554D40] font-medium truncate w-full">
                  {palette.name}
                </span>
                <span className="text-[8px] font-mono text-[#948A7B]">
                  {palette.hex}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ngũ Hành Five Elements Cultural Affinity */}
      <div className="p-4 bg-[#F4EFEA] rounded-xl border border-[#E5DDD0]">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1.5">
            <Compass size={13} className="text-[#23395B]" />
            Vòng Ngũ Hành Tương Sinh
          </span>
          <span className="text-[10px] font-bold text-[#8B1E1E]">
            Mệnh: {currentColor.element}
          </span>
        </div>

        {/* 5 Elements Interactive Dots */}
        <div className="flex items-center justify-between py-2 px-1">
          {elements.map((el) => {
            const isCurrent = currentColor.element === el.name;
            return (
              <div key={el.name} className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCurrent
                      ? 'ring-2 ring-[#8B1E1E] scale-110 shadow-sm'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: el.color,
                    border: `1.5px solid ${el.border}`,
                    color: el.name === 'Kim' ? '#1E1D1B' : '#FFFFFF'
                  }}
                  title={`${el.name} - ${el.label}`}
                >
                  {el.name}
                </div>
                <span className="text-[9px] text-[#695F50] mt-1 font-semibold">
                  {el.meaning}
                </span>
              </div>
            );
          })}
        </div>

        {/* Dynamic Philosophy Quote */}
        <div className="mt-3 p-2.5 bg-white/80 rounded-lg text-[11px] text-[#4A4235] leading-relaxed italic border border-[#E5DDD0]/70">
          “{harmonyReport.culturalPhilosophy}”
        </div>
      </div>
    </div>
  );
};
