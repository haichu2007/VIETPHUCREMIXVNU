import React, { useState } from 'react';
import { OutfitSelection } from '../types';
import { WEATHER_OPTIONS, EVENT_OPTIONS, getWeatherEventSuggestion } from '../data/mockData';
import { MannequinPreview } from './MannequinPreview';
import { CloudSun, Calendar, Sparkles, Check, ArrowRight, X } from 'lucide-react';

interface WeatherEventRecommenderProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyOutfit: (selection: OutfitSelection) => void;
}

export const WeatherEventRecommender: React.FC<WeatherEventRecommenderProps> = ({
  isOpen,
  onClose,
  onApplyOutfit
}) => {
  const [selectedWeather, setSelectedWeather] = useState<string>('autumn-cool');
  const [selectedEvent, setSelectedEvent] = useState<string>('cafe-street');

  if (!isOpen) return null;

  const suggestion = getWeatherEventSuggestion(selectedWeather, selectedEvent);
  const activeWeatherObj = WEATHER_OPTIONS.find((w) => w.id === selectedWeather) || WEATHER_OPTIONS[0];
  const activeEventObj = EVENT_OPTIONS.find((e) => e.id === selectedEvent) || EVENT_OPTIONS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border border-[#E5DDD0] w-full max-w-4xl max-h-[92vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#E5DDD0] bg-[#F4EFEA] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#8B1E1E]/10 text-[#8B1E1E] flex items-center justify-center">
              <CloudSun size={18} />
            </div>
            <div>
              <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#1E1D1B]">
                Gợi Ý Phối Đồ Theo Thời Tiết & Sự Kiện
              </h2>
              <p className="text-[11px] text-[#7A7061]">
                Tối ưu hóa chất liệu vải và phong thái theo bối cảnh thực tế đời thường.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7A7061] hover:text-[#1E1D1B] rounded-lg transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls: Weather & Event Pickers */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Weather Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1.5 mb-2.5">
                <CloudSun size={14} className="text-[#8B1E1E]" />
                1. Chọn Điều Kiện Thời Tiết
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                {WEATHER_OPTIONS.map((w) => {
                  const isSelected = selectedWeather === w.id;
                  return (
                    <button
                      key={w.id}
                      onClick={() => setSelectedWeather(w.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 shadow-xs'
                          : 'border-[#E5DDD0] bg-white hover:border-[#D0C4B3]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base">{w.icon}</span>
                        <span className="text-[10px] font-mono text-[#8B1E1E] font-semibold">
                          {w.temperature}
                        </span>
                      </div>
                      <span className="font-editorial text-xs font-bold text-[#1E1D1B] block mt-1">
                        {w.name}
                      </span>
                      <p className="text-[10px] text-[#695F50] mt-0.5 line-clamp-2">
                        {w.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Weather Fabric Tip */}
              <div className="mt-2.5 p-2.5 bg-[#F4EFEA] rounded-lg text-[11px] text-[#554D40] flex items-center gap-2">
                <span className="font-semibold text-[#8B1E1E] shrink-0">Chất liệu khuyên dùng:</span>
                <span className="truncate">{activeWeatherObj.recommendedFabric}</span>
              </div>
            </div>

            {/* 2. Event Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1.5 mb-2.5">
                <Calendar size={14} className="text-[#23395B]" />
                2. Chọn Không Gian & Sự Kiện
              </label>

              <div className="space-y-2">
                {EVENT_OPTIONS.map((e) => {
                  const isSelected = selectedEvent === e.id;
                  return (
                    <button
                      key={e.id}
                      onClick={() => setSelectedEvent(e.id)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 shadow-xs'
                          : 'border-[#E5DDD0] bg-white hover:border-[#D0C4B3]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{e.icon}</span>
                        <div>
                          <span className="text-xs font-bold text-[#1E1D1B] block">
                            {e.name}
                          </span>
                          <span className="text-[10px] text-[#6E6454]">
                            {e.description}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#EAE2D4] text-[#695D4D] font-medium hidden sm:inline-block">
                          {e.formalityLevel}
                        </span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#8B1E1E] text-white flex items-center justify-center text-[10px]">
                            <Check size={12} />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Recommendation Preview */}
          <div className="lg:col-span-5 bg-white border border-[#E5DDD0] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-3 pb-2 border-b border-[#E5DDD0]">
                <span className="font-bold text-[#1E1D1B] flex items-center gap-1.5">
                  <Sparkles size={13} className="text-[#C89B3C]" />
                  Đề Xuất Tối Ưu:
                </span>
                <span className="text-[10px] font-mono text-[#8B1E1E] font-semibold">
                  MATCH RATE 98%
                </span>
              </div>

              <h4 className="font-editorial text-base font-bold text-[#1E1D1B]">
                {suggestion.title}
              </h4>

              <p className="text-xs text-[#524A3D] leading-relaxed mt-1.5 mb-4">
                {suggestion.reasoning}
              </p>

              {/* Mannequin Preview */}
              <div className="h-60 rounded-xl overflow-hidden border border-[#E5DDD0] bg-[#FAF8F5]">
                <MannequinPreview selection={suggestion.selection} interactive={false} compact={true} />
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 mt-4 border-t border-[#E5DDD0]">
              <button
                onClick={() => {
                  onApplyOutfit(suggestion.selection);
                  onClose();
                }}
                className="w-full py-3 bg-[#8B1E1E] hover:bg-[#721717] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Áp dụng bản phối này vào phòng thử đồ</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
