import React, { useState } from 'react';
import { OutfitSelection, SavedOutfit } from '../types';
import { GARMENTS, BOTTOM_PIECES, FOOTWEAR_PIECES, ACCESSORY_PIECES, STYLES, COLORS, MOCK_COMMUNITY_OUTFITS } from '../data/mockData';
import { calculateStyleScore } from '../utils/styleScore';
import { MannequinPreview } from './MannequinPreview';
import { GitCompare, X, Check, ArrowRight, ArrowLeftRight, Sparkles } from 'lucide-react';

interface OutfitComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSelection: OutfitSelection;
  savedOutfits: SavedOutfit[];
  onApplySelection: (selection: OutfitSelection) => void;
}

export const OutfitComparisonModal: React.FC<OutfitComparisonModalProps> = ({
  isOpen,
  onClose,
  currentSelection,
  savedOutfits,
  onApplySelection
}) => {
  // Candidate pool for Look B
  const availableLooks = [...savedOutfits, ...MOCK_COMMUNITY_OUTFITS];
  const [selectedLookBId, setSelectedLookBId] = useState<string>(
    availableLooks[1]?.id || availableLooks[0]?.id || 'outfit-002'
  );

  if (!isOpen) return null;

  const lookB = availableLooks.find((l) => l.id === selectedLookBId) || availableLooks[0];
  const selectionB = lookB.selection;

  const scoreA = calculateStyleScore(currentSelection);
  const scoreB = calculateStyleScore(selectionB);

  const garmentA = GARMENTS.find((g) => g.id === currentSelection.garmentId);
  const garmentB = GARMENTS.find((g) => g.id === selectionB.garmentId);

  const bottomA = BOTTOM_PIECES.find((b) => b.id === currentSelection.bottomId);
  const bottomB = BOTTOM_PIECES.find((b) => b.id === selectionB.bottomId);

  const footA = FOOTWEAR_PIECES.find((f) => f.id === currentSelection.footwearId);
  const footB = FOOTWEAR_PIECES.find((f) => f.id === selectionB.footwearId);

  const styleA = STYLES.find((s) => s.id === currentSelection.styleId);
  const styleB = STYLES.find((s) => s.id === selectionB.styleId);

  const colorA = COLORS.find((c) => c.id === currentSelection.colorId);
  const colorB = COLORS.find((c) => c.id === selectionB.colorId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border border-[#E5DDD0] w-full max-w-5xl max-h-[94vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#E5DDD0] bg-[#F4EFEA] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#8B1E1E]/10 text-[#8B1E1E] flex items-center justify-center">
              <ArrowLeftRight size={18} />
            </div>
            <div>
              <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#1E1D1B]">
                So Sánh Đối Chiếu Các Phương Án Phối (A / B Split View)
              </h2>
              <p className="text-[11px] text-[#7A7061]">
                Đánh giá trực quan sự khác biệt giữa hai bản phối về cấu trúc, tỷ lệ và khí chất.
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Selector for Look B */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-xl border border-[#E5DDD0]">
            <span className="text-xs font-bold text-[#1E1D1B]">
              Chọn bản phối đối sánh (Phương án B):
            </span>
            <select
              value={selectedLookBId}
              onChange={(e) => setSelectedLookBId(e.target.value)}
              className="text-xs py-1.5 px-3 bg-[#FAF8F5] border border-[#D5CABE] rounded-lg text-[#1E1D1B] focus:outline-hidden focus:border-[#8B1E1E]"
            >
              {availableLooks.map((look) => (
                <option key={look.id} value={look.id}>
                  {look.name} ({look.code})
                </option>
              ))}
            </select>
          </div>

          {/* Side-by-Side Dual Mannequins */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LOOK A */}
            <div className="bg-white border-2 border-[#8B1E1E]/30 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#E5DDD0] mb-3">
                  <span className="text-xs font-bold text-[#8B1E1E] uppercase tracking-wider">
                    Phương Án A (Hiện Tại)
                  </span>
                  <span className="text-[11px] font-mono text-[#786F61]">
                    {styleA?.name}
                  </span>
                </div>

                <div className="h-64 rounded-xl overflow-hidden border border-[#E5DDD0] bg-[#FAF8F5] mb-4">
                  <MannequinPreview selection={currentSelection} interactive={false} compact={true} />
                </div>

                {/* Score Ratio Bars */}
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-semibold text-[#665D4F]">Hồn Cốt Di Sản:</span>
                      <span className="font-mono font-bold text-[#8B1E1E]">{scoreA.traditionalScore}%</span>
                    </div>
                    <div className="h-2 bg-[#EAE2D4] rounded-full overflow-hidden">
                      <div className="h-full bg-[#8B1E1E]" style={{ width: `${scoreA.traditionalScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-semibold text-[#665D4F]">Nhịp Thở Hiện Đại:</span>
                      <span className="font-mono font-bold text-[#23395B]">{scoreA.modernScore}%</span>
                    </div>
                    <div className="h-2 bg-[#EAE2D4] rounded-full overflow-hidden">
                      <div className="h-full bg-[#23395B]" style={{ width: `${scoreA.modernScore}%` }} />
                    </div>
                  </div>
                </div>

                {/* Pieces Summary */}
                <div className="mt-4 pt-3 border-t border-[#F0EAE1] space-y-1 text-[11px] text-[#4A4235]">
                  <div><strong>Áo:</strong> {garmentA?.name}</div>
                  <div><strong>Quần/Váy:</strong> {bottomA?.name}</div>
                  <div><strong>Giày:</strong> {footA?.name}</div>
                  <div><strong>Màu Sắc:</strong> {colorA?.name}</div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E5DDD0]">
                <button
                  disabled
                  className="w-full py-2 bg-emerald-50 text-emerald-800 text-xs font-bold uppercase rounded-lg border border-emerald-200 opacity-90 cursor-default"
                >
                  ✓ Đang Là Bản Phối Hiện Tại
                </button>
              </div>
            </div>

            {/* LOOK B */}
            <div className="bg-white border-2 border-[#D5CABE] hover:border-[#8B1E1E]/50 rounded-2xl p-5 shadow-xs flex flex-col justify-between transition-colors">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#E5DDD0] mb-3">
                  <span className="text-xs font-bold text-[#23395B] uppercase tracking-wider">
                    Phương Án B ({lookB.name})
                  </span>
                  <span className="text-[11px] font-mono text-[#786F61]">
                    {styleB?.name}
                  </span>
                </div>

                <div className="h-64 rounded-xl overflow-hidden border border-[#E5DDD0] bg-[#FAF8F5] mb-4">
                  <MannequinPreview selection={selectionB} interactive={false} compact={true} />
                </div>

                {/* Score Ratio Bars */}
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-semibold text-[#665D4F]">Hồn Cốt Di Sản:</span>
                      <span className="font-mono font-bold text-[#8B1E1E]">{scoreB.traditionalScore}%</span>
                    </div>
                    <div className="h-2 bg-[#EAE2D4] rounded-full overflow-hidden">
                      <div className="h-full bg-[#8B1E1E]" style={{ width: `${scoreB.traditionalScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-semibold text-[#665D4F]">Nhịp Thở Hiện Đại:</span>
                      <span className="font-mono font-bold text-[#23395B]">{scoreB.modernScore}%</span>
                    </div>
                    <div className="h-2 bg-[#EAE2D4] rounded-full overflow-hidden">
                      <div className="h-full bg-[#23395B]" style={{ width: `${scoreB.modernScore}%` }} />
                    </div>
                  </div>
                </div>

                {/* Pieces Summary */}
                <div className="mt-4 pt-3 border-t border-[#F0EAE1] space-y-1 text-[11px] text-[#4A4235]">
                  <div><strong>Áo:</strong> {garmentB?.name}</div>
                  <div><strong>Quần/Váy:</strong> {bottomB?.name}</div>
                  <div><strong>Giày:</strong> {footB?.name}</div>
                  <div><strong>Màu Sắc:</strong> {colorB?.name}</div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E5DDD0]">
                <button
                  onClick={() => {
                    onApplySelection(selectionB);
                    onClose();
                  }}
                  className="w-full py-2 bg-[#8B1E1E] hover:bg-[#721717] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Chọn & Đổi Sang Phương Án B
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
