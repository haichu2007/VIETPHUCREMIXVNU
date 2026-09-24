import React, { useState } from 'react';
import { OutfitSelection, SustainableItem } from '../types';
import { SUSTAINABLE_WARDROBE_ITEMS } from '../data/mockData';
import {
  Upload,
  Leaf,
  Droplet,
  Wind,
  Sparkles,
  Check,
  Scan,
  RefreshCw,
  X,
  Scissors,
  Layers,
  ArrowRight,
  Shirt
} from 'lucide-react';

interface SustainableWardrobeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSelection: OutfitSelection;
  onApplySustainableItem: (item: SustainableItem) => void;
}

export const SustainableWardrobeModal: React.FC<SustainableWardrobeModalProps> = ({
  isOpen,
  onClose,
  currentSelection,
  onApplySustainableItem
}) => {
  const [selectedItem, setSelectedItem] = useState<SustainableItem>(SUSTAINABLE_WARDROBE_ITEMS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<'idle' | 'scanning' | 'removing_bg' | 'vectorizing' | 'completed'>('idle');
  const [appliedItem, setAppliedItem] = useState<SustainableItem | null>(null);

  if (!isOpen) return null;

  const handleStartScanAndMount = (item: SustainableItem) => {
    setSelectedItem(item);
    setIsScanning(true);
    setScanStep('scanning');

    // Step 1: Laser scanning fabric
    setTimeout(() => {
      setScanStep('removing_bg');
    }, 700);

    // Step 2: AI Auto-Remove Background
    setTimeout(() => {
      setScanStep('vectorizing');
    }, 1400);

    // Step 3: Complete and Mount
    setTimeout(() => {
      setScanStep('completed');
      setIsScanning(false);
      setAppliedItem(item);
      onApplySustainableItem(item);
    }, 2100);
  };

  // Calculate cumulative eco savings
  const totalWaterSaved = SUSTAINABLE_WARDROBE_ITEMS.reduce((acc, it) => acc + it.waterSavedLiters, 0);
  const totalCo2Saved = SUSTAINABLE_WARDROBE_ITEMS.reduce((acc, it) => acc + it.co2SavedKg, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#E5DDD0] bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-700">
              <Leaf size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-base sm:text-lg font-bold text-[#1E1D1B]">
                  Tủ Đồ Của Tôi & Thời Trang Bền Vững
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-700 text-white uppercase tracking-wider shadow-2xs">
                  AI Item Scanner
                </span>
              </div>
              <p className="text-xs text-[#756B5D] mt-0.5">
                Tận dụng quần jeans, sneaker, blazer có sẵn ở nhà để phối cùng Áo Cổ Phục — Giảm rác thải, tôn cá tính
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#756B5D] hover:text-[#1E1D1B] hover:bg-[#EBE3D7]/60 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Eco Impact Banner */}
        <div className="px-5 sm:px-6 py-2.5 bg-gradient-to-r from-emerald-50 via-[#F3FAF5] to-emerald-50 border-b border-emerald-200/60 flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-900">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Thời trang tuần hoàn: <strong>1 Cổ phục truyền thống có thể phối cùng vô vàn món đồ có sẵn</strong></span>
          </div>
          <div className="flex items-center gap-3 font-semibold text-[11px]">
            <span className="flex items-center gap-1 text-sky-700 bg-white px-2 py-0.5 rounded-md border border-sky-200">
              <Droplet size={12} className="text-sky-500" />
              Tiết kiệm ~{totalWaterSaved.toLocaleString()}L nước
            </span>
            <span className="flex items-center gap-1 text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
              <Wind size={12} className="text-emerald-500" />
              Giảm {totalCo2Saved.toFixed(1)}kg CO2
            </span>
          </div>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Left Column: Sustainable Items list (6 cols) */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1.5">
                <Shirt size={13} className="text-emerald-700" />
                <span>Chọn Món Đồ Có Sẵn Trong Tủ Của Bạn</span>
              </span>
              <span className="text-[10px] text-[#7A6E5E]">6 Món Đồ Điển Hình</span>
            </div>

            <div className="space-y-2.5 max-h-[460px] overflow-y-auto custom-scrollbar pr-1">
              {SUSTAINABLE_WARDROBE_ITEMS.map((item) => {
                const isSelected = selectedItem.id === item.id;
                const isAlreadyApplied = appliedItem?.id === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all relative ${
                      isSelected
                        ? 'border-emerald-700 bg-emerald-50/40 ring-1.5 ring-emerald-600/30 shadow-xs'
                        : 'border-[#E5DDD0] bg-white hover:border-[#D0C4B3] hover:shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#E5DDD0] flex items-center justify-center text-lg shadow-2xs shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <span className="font-editorial text-sm font-bold text-[#1E1D1B] block">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-[#756B5D] block mt-0.5">
                            {item.brandOrType} • {item.material}
                          </span>
                        </div>
                      </div>

                      {isAlreadyApplied && (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-700 text-white rounded-full shadow-2xs shrink-0">
                          ✓ Đang lắp
                        </span>
                      )}
                    </div>

                    {/* Eco badges */}
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#EAE2D5]/70 text-[10px] font-medium text-emerald-800">
                      <span className="flex items-center gap-0.5 bg-sky-50 text-sky-800 px-1.5 py-0.5 rounded border border-sky-200">
                        💧 -{item.waterSavedLiters}L Nước
                      </span>
                      <span className="flex items-center gap-0.5 bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">
                        🌿 -{item.co2SavedKg}kg CO2
                      </span>
                    </div>

                    <p className="text-xs text-[#52493D] mt-2 line-clamp-2">
                      {item.compatibilityNote}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: AI Laser Scanner & Live Background Removal Demo (6 cols) */}
          <div className="md:col-span-6 bg-white rounded-2xl border border-[#E5DDD0] p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#EAE2D5] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1.5">
                  <Scan size={14} className="text-emerald-700" />
                  <span>AI Scanner & Auto Background Removal</span>
                </span>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Instant Vectorizer
                </span>
              </div>

              {/* Interactive Virtual Scanning Stage */}
              <div className="relative h-48 sm:h-56 bg-[#FAF8F5] rounded-xl border border-dashed border-[#DFD5C6] flex flex-col items-center justify-center overflow-hidden p-4">
                {/* Laser scan line animation */}
                {isScanning && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_12px_#10B981] animate-bounce z-20" />
                )}

                {/* Big Item Visual & Status */}
                <div className="text-center relative z-10 space-y-2">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-white border border-[#E5DDD0] shadow-sm flex items-center justify-center text-4xl relative">
                    {selectedItem.icon}
                    {scanStep === 'completed' && (
                      <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shadow-2xs">
                        ✓
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-editorial text-sm font-bold text-[#1E1D1B]">
                      {selectedItem.name}
                    </h4>
                    <span className="text-[11px] text-[#7A6E5D] font-mono">
                      {selectedItem.material}
                    </span>
                  </div>

                  {/* Progress Status Message */}
                  <div className="text-xs font-medium min-h-[20px]">
                    {scanStep === 'idle' && (
                      <span className="text-[#8C7E6D]">Sẵn sàng quét và phân tách vật thể AI</span>
                    )}
                    {scanStep === 'scanning' && (
                      <span className="text-emerald-700 flex items-center justify-center gap-1 font-semibold animate-pulse">
                        <RefreshCw size={12} className="animate-spin" />
                        Đang quét cấu trúc sợi vải và phom dáng...
                      </span>
                    )}
                    {scanStep === 'removing_bg' && (
                      <span className="text-sky-700 flex items-center justify-center gap-1 font-semibold animate-pulse">
                        <Scissors size={12} />
                        AI Auto-Remove Background (Tách nền chuẩn xác)...
                      </span>
                    )}
                    {scanStep === 'vectorizing' && (
                      <span className="text-indigo-700 flex items-center justify-center gap-1 font-semibold animate-pulse">
                        <Layers size={12} />
                        Tạo vector map & căn chỉnh tỷ lệ người mẫu...
                      </span>
                    )}
                    {scanStep === 'completed' && (
                      <span className="text-emerald-700 font-bold flex items-center justify-center gap-1">
                        <Check size={14} className="stroke-[3]" />
                        Đã lắp thành công vào Ma-nơ-canh phòng thử đồ!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Sustainable Styling Insight */}
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/70 text-xs text-emerald-950 space-y-1">
                <span className="font-bold flex items-center gap-1 text-emerald-800">
                  <Sparkles size={12} />
                  <span>Lời Khuyên Phối Đồ Bền Vững:</span>
                </span>
                <p className="text-[11px] text-emerald-900/90 leading-relaxed">
                  {selectedItem.compatibilityNote}
                </p>
              </div>
            </div>

            {/* Bottom Action Button */}
            <div className="pt-3 border-t border-[#EAE2D5] flex items-center justify-between gap-3">
              <span className="text-xs text-[#7A6E5E]">
                Tiết kiệm chi phí, nâng niu hành tinh xanh
              </span>

              <button
                disabled={isScanning}
                onClick={() => handleStartScanAndMount(selectedItem)}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
              >
                <Sparkles size={14} />
                <span>{isScanning ? 'Đang Quét AI...' : 'Tách Nền & Lắp Vào Ma-nơ-canh Ngay'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
