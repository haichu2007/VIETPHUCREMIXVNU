import React from 'react';
import { OutfitSelection } from '../types';
import { calculateStyleScore } from '../utils/styleScore';
import { MannequinPreview } from './MannequinPreview';
import {
  GARMENTS,
  BOTTOM_PIECES,
  HEADWEAR_PIECES,
  FOOTWEAR_PIECES,
  BAG_PIECES,
  ACCESSORY_PIECES,
  STYLES,
  COLORS
} from '../data/mockData';
import { X, Bookmark, Share2, RefreshCw, Check, Sparkles } from 'lucide-react';

interface OutfitResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  selection: OutfitSelection;
  outfitCode: string;
  onSaveOutfit: () => void;
  isSaved: boolean;
  onShare: () => void;
  onContinueRemix: () => void;
  onGenerateDirectImage?: () => void;
}

export const OutfitResultModal: React.FC<OutfitResultModalProps> = ({
  isOpen,
  onClose,
  selection,
  outfitCode,
  onSaveOutfit,
  isSaved,
  onShare,
  onContinueRemix,
  onGenerateDirectImage
}) => {
  if (!isOpen) return null;

  const scoreResult = calculateStyleScore(selection);
  const garment = GARMENTS.find((g) => g.id === selection.garmentId) || GARMENTS[0];
  const bottom = BOTTOM_PIECES.find((b) => b.id === selection.bottomId) || BOTTOM_PIECES[0];
  const headwear = HEADWEAR_PIECES.find((h) => h.id === selection.headwearId) || HEADWEAR_PIECES[0];
  const footwear = FOOTWEAR_PIECES.find((f) => f.id === selection.footwearId) || FOOTWEAR_PIECES[0];
  const bag = BAG_PIECES.find((b) => b.id === selection.bagId) || BAG_PIECES[0];
  const accessory = ACCESSORY_PIECES.find((a) => a.id === selection.accessoryId) || ACCESSORY_PIECES[0];
  const style = STYLES.find((s) => s.id === selection.styleId) || STYLES[0];
  const color = COLORS.find((c) => c.id === selection.colorId) || COLORS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5DDD0] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E1E]" />
            <span className="font-editorial text-lg font-bold text-[#1E1D1B] tracking-tight">
              Bản Phối Hoàn Thiện
            </span>
            <span className="text-[#968C7C]">·</span>
            <span className="font-mono text-xs text-[#8B1E1E] font-semibold">
              {outfitCode}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#756B5D] hover:text-[#1E1D1B] hover:bg-[#EBE3D7]/60 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: Big Outfit Preview */}
          <div className="md:col-span-6 h-[440px] flex items-center justify-center">
            <MannequinPreview selection={selection} interactive={false} compact={true} />
          </div>

          {/* Right: Editorial Outfit Details */}
          <div className="md:col-span-6 flex flex-col justify-between h-full space-y-4">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#8B1E1E] font-semibold mb-1">
                {outfitCode}
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E1D1B] leading-tight">
                {garment.name} · {style.name}
              </h2>
              <div className="flex items-center gap-2 mt-2 text-xs text-[#6B6152]">
                <span className="inline-block w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: color.hex }} />
                <span className="font-medium text-[#1E1D1B]">{color.name} ({color.vietnameseName})</span>
              </div>
            </div>

            {/* Key Pieces List */}
            <div className="bg-[#F4EFEA] rounded-xl p-4 border border-[#E5DDD0]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#574D3F] mb-2.5 flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#8B1E1E]" />
                Key Pieces (Thành phần bản phối)
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-[#332E27]">
                  <span className="text-[#8B1E1E] font-bold">1.</span>
                  <span className="font-medium truncate">{garment.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#332E27]">
                  <span className="text-[#8B1E1E] font-bold">2.</span>
                  <span className="font-medium truncate">{bottom.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#332E27]">
                  <span className="text-[#8B1E1E] font-bold">3.</span>
                  <span className="font-medium truncate">{footwear.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#332E27]">
                  <span className="text-[#8B1E1E] font-bold">4.</span>
                  <span className="font-medium truncate">{bag.name}</span>
                </div>
                {headwear.id !== 'head-none' && (
                  <div className="flex items-center gap-1.5 text-[#332E27]">
                    <span className="text-[#8B1E1E] font-bold">5.</span>
                    <span className="font-medium truncate">{headwear.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-[#332E27]">
                  <span className="text-[#8B1E1E] font-bold">6.</span>
                  <span className="font-medium truncate">{accessory.name}</span>
                </div>
              </div>
            </div>

            {/* Mix Ratio Visualization */}
            <div className="border border-[#E5DDD0] rounded-xl p-3.5 bg-[#FAF8F5]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[#5A5143] uppercase tracking-wider text-[11px]">
                  Mix Ratio (Tỷ lệ phối)
                </span>
                <span className="font-mono text-xs font-semibold text-[#1E1D1B]">
                  Di sản {scoreResult.traditionalScore}% · Gen Z {scoreResult.modernScore}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-[#E5DDD0] rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[#8B1E1E] transition-all"
                  style={{ width: `${scoreResult.traditionalScore}%` }}
                />
                <div
                  className="h-full bg-[#23395B] transition-all"
                  style={{ width: `${scoreResult.modernScore}%` }}
                />
              </div>
            </div>

            {/* Why This Works Brief */}
            <p className="text-xs text-[#524B40] leading-relaxed italic border-l-2 border-[#8B1E1E] pl-3">
              “{scoreResult.whyThisWorks}”
            </p>

            {/* Direct AI Image Generation CTA (gemini-3.1-flash-image-preview) */}
            {onGenerateDirectImage && (
              <button
                type="button"
                onClick={onGenerateDirectImage}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-linear-to-r from-[#8B1E1E] via-[#A02424] to-[#8B1E1E] hover:from-[#721717] hover:to-[#721717] text-white shadow-md transition-all cursor-pointer active:scale-98"
              >
                <Sparkles size={16} className="text-[#FFDF78] animate-pulse" />
                <span>TẠO ẢNH AI TRỰC TIẾP TỪ LOOK NÀY</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-black/25 rounded text-[#FFDF78]">
                  Direct AI
                </span>
              </button>
            )}

            {/* Action Buttons: Lưu outfit, Remix tiếp, Chia sẻ */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <button
                onClick={onSaveOutfit}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-[#1E382B] text-white'
                    : 'bg-[#FAF8F5] text-[#1E1D1B] border border-[#D5CABE] hover:bg-[#EFE7DC]'
                }`}
              >
                {isSaved ? <Check size={14} /> : <Bookmark size={14} />}
                <span>{isSaved ? 'Đã lưu' : 'Lưu outfit'}</span>
              </button>

              <button
                onClick={onContinueRemix}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold bg-[#FAF8F5] text-[#1E1D1B] border border-[#D5CABE] hover:bg-[#EFE7DC] transition-all cursor-pointer"
              >
                <RefreshCw size={14} />
                <span>Remix tiếp</span>
              </button>

              <button
                onClick={onShare}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold bg-[#8B1E1E] text-white hover:bg-[#721717] transition-all shadow-xs cursor-pointer"
              >
                <Share2 size={14} />
                <span>Chia sẻ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
