import React, { useState } from 'react';
import { SmartAIContext, OutfitSelection } from '../types';
import { REALTIME_SMART_CONTEXTS } from '../data/mockData';
import {
  Sparkles,
  CloudSun,
  ChevronDown,
  ArrowRight,
  Check,
  Calendar,
  Thermometer,
  MapPin
} from 'lucide-react';

interface SmartContextBarProps {
  onApplyContextOutfit: (suggestedSelection: Partial<OutfitSelection>, context: SmartAIContext) => void;
}

export const SmartContextBar: React.FC<SmartContextBarProps> = ({ onApplyContextOutfit }) => {
  const [activeContextIndex, setActiveContextIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toastApplied, setToastApplied] = useState(false);

  const activeContext = REALTIME_SMART_CONTEXTS[activeContextIndex] || REALTIME_SMART_CONTEXTS[0];

  const handleApply = (ctx: SmartAIContext, idx: number) => {
    setActiveContextIndex(idx);
    setIsDropdownOpen(false);
    onApplyContextOutfit(ctx.suggestedSelection, ctx);
    setToastApplied(true);
    setTimeout(() => setToastApplied(false), 2500);
  };

  return (
    <div className="relative mb-3.5 animate-in fade-in duration-200">
      <div className="p-3 sm:p-3.5 bg-gradient-to-r from-[#FAF8F5] via-[#FFFDF9] to-[#FAF8F5] rounded-2xl border border-[#E5DDD0] shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Left Context Message */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#8B1E1E]/10 border border-[#8B1E1E]/20 flex items-center justify-center text-base shrink-0">
              {activeContext.icon}
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1E1E] bg-[#8B1E1E]/8 px-2 py-0.5 rounded border border-[#8B1E1E]/15">
                  AI Context • {activeContext.city} • {activeContext.temperature}
                </span>
                <span className="text-[10px] font-medium text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  {activeContext.badge}
                </span>
              </div>
              <p className="text-xs text-[#2B2723] font-medium leading-relaxed">
                "{activeContext.aiPromptMessage}"
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            {/* Context Switcher Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-2.5 py-1.5 bg-white hover:bg-[#F4EFEA] border border-[#DFD5C6] rounded-xl text-xs font-semibold text-[#5A5043] flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                title="Đổi bối cảnh thời gian thực (thời tiết / mùa lễ hội)"
              >
                <span>{activeContext.title}</span>
                <ChevronDown size={13} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-72 bg-white border border-[#E5DDD0] rounded-xl shadow-xl z-40 p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2 py-1 text-[10px] font-bold text-[#8C8070] uppercase tracking-wider border-b border-[#EFE9DF]">
                    Chọn Ngữ Cảnh Thời Gian Thực
                  </div>
                  {REALTIME_SMART_CONTEXTS.map((ctx, idx) => {
                    const isCurrent = idx === activeContextIndex;
                    return (
                      <button
                        key={ctx.id}
                        onClick={() => handleApply(ctx, idx)}
                        className={`w-full text-left p-2 rounded-lg text-xs transition-all flex items-start gap-2 cursor-pointer ${
                          isCurrent
                            ? 'bg-[#8B1E1E]/8 text-[#8B1E1E] font-bold'
                            : 'text-[#4A4237] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <span className="text-base">{ctx.icon}</span>
                        <div className="flex-1">
                          <div className="font-semibold leading-tight">{ctx.title}</div>
                          <div className="text-[10px] text-[#786D5F] font-normal mt-0.5">{ctx.weatherCondition}</div>
                        </div>
                        {isCurrent && <Check size={14} className="text-[#8B1E1E] shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 1-Click Apply Button */}
            <button
              onClick={() => handleApply(activeContext, activeContextIndex)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-98 ${
                toastApplied
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#8B1E1E] hover:bg-[#721717] text-white'
              }`}
            >
              {toastApplied ? (
                <>
                  <Check size={13} className="stroke-[3]" />
                  <span>Đã Áp Dụng!</span>
                </>
              ) : (
                <>
                  <Sparkles size={13} />
                  <span>Áp Dụng Phối Lớp AI</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
