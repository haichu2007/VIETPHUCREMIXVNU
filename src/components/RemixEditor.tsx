import React, { useState } from 'react';
import { OutfitSelection } from '../types';
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
import { MannequinPreview } from './MannequinPreview';
import { CulturalCard } from './CulturalCard';
import { WhyThisWorksCard } from './WhyThisWorksCard';
import { calculateStyleScore } from '../utils/styleScore';
import {
  Shirt,
  Scissors,
  Sparkles,
  Palette,
  Shuffle,
  Eye,
  Check,
  Crown,
  Footprints,
  ShoppingBag,
  Gem,
  Bookmark
} from 'lucide-react';

interface RemixEditorProps {
  selection: OutfitSelection;
  setSelection: React.Dispatch<React.SetStateAction<OutfitSelection>>;
  onOpenResult: () => void;
  outfitCode: string;
}

export const RemixEditor: React.FC<RemixEditorProps> = ({
  selection,
  setSelection,
  onOpenResult,
  outfitCode
}) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<
    'garment' | 'bottom' | 'headwear' | 'footwear' | 'bag' | 'accessories'
  >('garment');

  const [activeRightTab, setActiveRightTab] = useState<'config' | 'culture' | 'score'>('config');

  const selectedGarment = GARMENTS.find((g) => g.id === selection.garmentId) || GARMENTS[0];
  const scoreResult = calculateStyleScore(selection);

  // Random Remix generator function
  const handleRandomRemix = () => {
    const randomGarment = GARMENTS[Math.floor(Math.random() * GARMENTS.length)];
    const randomBottom = BOTTOM_PIECES[Math.floor(Math.random() * BOTTOM_PIECES.length)];
    const randomHeadwear = HEADWEAR_PIECES[Math.floor(Math.random() * HEADWEAR_PIECES.length)];
    const randomFootwear = FOOTWEAR_PIECES[Math.floor(Math.random() * FOOTWEAR_PIECES.length)];
    const randomBag = BAG_PIECES[Math.floor(Math.random() * BAG_PIECES.length)];
    const randomAccessory = ACCESSORY_PIECES[Math.floor(Math.random() * ACCESSORY_PIECES.length)];
    const randomStyle = STYLES[Math.floor(Math.random() * STYLES.length)];
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];

    setSelection({
      garmentId: randomGarment.id,
      bottomId: randomBottom.id,
      headwearId: randomHeadwear.id,
      footwearId: randomFootwear.id,
      bagId: randomBag.id,
      accessoryId: randomAccessory.id,
      styleId: randomStyle.id,
      colorId: randomColor.id
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Editor Sub-Header / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#E5DDD0] mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-[#8B1E1E]">
            <Sparkles size={12} />
            <span>Phòng Thử Đồ Kỹ Thuật Số · Digital Dressing Room</span>
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E1D1B] mt-0.5">
            Remix Việt Phục & Gen Z Style
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRandomRemix}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#FAF8F5] hover:bg-[#EAE1D3] text-[#423C33] border border-[#D5CABE] rounded-lg transition-colors cursor-pointer"
            title="Ngẫu nhiên tạo một bản phối bất ngờ"
          >
            <Shuffle size={14} className="text-[#8B1E1E]" />
            <span>Phối Ngẫu Nhiên</span>
          </button>

          <button
            onClick={onOpenResult}
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#8B1E1E] hover:bg-[#721717] rounded-lg transition-all shadow-sm cursor-pointer active:scale-98"
          >
            <Eye size={14} />
            <span>Xem Bản Phối ({outfitCode})</span>
          </button>
        </div>
      </div>

      {/* 3-Column Studio Layout on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* =========================================================================
            COLUMN 1 (LEFT): Danh Mục Thành Phối (Garments, Bottoms, Shoes, Bags...)
           ========================================================================= */}
        <div className="lg:col-span-4 bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl p-5 shadow-xs flex flex-col h-[700px]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD0] mb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1E1D1B] flex items-center gap-1.5">
              <Shirt size={14} className="text-[#8B1E1E]" />
              Thành Phần Bản Phối
            </h2>
            <span className="text-[11px] text-[#7A7061]">Chọn để thay đổi</span>
          </div>

          {/* Category Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-[#F4EFEA] rounded-xl mb-3 text-xs">
            <button
              onClick={() => setActiveCategoryTab('garment')}
              className={`py-1.5 px-2 rounded-lg font-medium transition-all cursor-pointer truncate ${
                activeCategoryTab === 'garment'
                  ? 'bg-white text-[#1E1D1B] shadow-xs font-semibold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              Áo truyền thống
            </button>
            <button
              onClick={() => setActiveCategoryTab('bottom')}
              className={`py-1.5 px-2 rounded-lg font-medium transition-all cursor-pointer truncate ${
                activeCategoryTab === 'bottom'
                  ? 'bg-white text-[#1E1D1B] shadow-xs font-semibold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              Quần / Váy
            </button>
            <button
              onClick={() => setActiveCategoryTab('footwear')}
              className={`py-1.5 px-2 rounded-lg font-medium transition-all cursor-pointer truncate ${
                activeCategoryTab === 'footwear'
                  ? 'bg-white text-[#1E1D1B] shadow-xs font-semibold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              Giày dép
            </button>
            <button
              onClick={() => setActiveCategoryTab('headwear')}
              className={`py-1.5 px-2 rounded-lg font-medium transition-all cursor-pointer truncate ${
                activeCategoryTab === 'headwear'
                  ? 'bg-white text-[#1E1D1B] shadow-xs font-semibold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              Khăn / Mấn
            </button>
            <button
              onClick={() => setActiveCategoryTab('bag')}
              className={`py-1.5 px-2 rounded-lg font-medium transition-all cursor-pointer truncate ${
                activeCategoryTab === 'bag'
                  ? 'bg-white text-[#1E1D1B] shadow-xs font-semibold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              Túi xách
            </button>
            <button
              onClick={() => setActiveCategoryTab('accessories')}
              className={`py-1.5 px-2 rounded-lg font-medium transition-all cursor-pointer truncate ${
                activeCategoryTab === 'accessories'
                  ? 'bg-white text-[#1E1D1B] shadow-xs font-semibold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              Phụ kiện
            </button>
          </div>

          {/* Scrollable Item Options */}
          <div className="overflow-y-auto flex-1 pr-1 space-y-2.5">
            {/* 1. Garments Tab */}
            {activeCategoryTab === 'garment' && (
              <>
                {GARMENTS.map((g) => {
                  const isSelected = selection.garmentId === g.id;
                  return (
                    <div
                      key={g.id}
                      onClick={() => setSelection({ ...selection, garmentId: g.id })}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left relative ${
                        isSelected
                          ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 shadow-xs'
                          : 'border-[#E5DDD0] bg-white hover:border-[#CFC3B2]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-editorial text-sm font-bold text-[#1E1D1B]">
                              {g.name}
                            </span>
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E1E]" />
                            )}
                          </div>
                          <span className="text-[11px] text-[#7A7061] block mt-0.5">
                            {g.era}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#8B1E1E] text-white flex items-center justify-center text-[10px]">
                            <Check size={12} />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#524A3F] mt-2 line-clamp-2 leading-relaxed">
                        {g.description}
                      </p>
                    </div>
                  );
                })}
              </>
            )}

            {/* 2. Bottom Pieces Tab */}
            {activeCategoryTab === 'bottom' && (
              <>
                {BOTTOM_PIECES.map((b) => {
                  const isSelected = selection.bottomId === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelection({ ...selection, bottomId: b.id })}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 shadow-xs'
                          : 'border-[#E5DDD0] bg-white hover:border-[#CFC3B2]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1E1D1B]">{b.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-sm ${b.isTraditional ? 'bg-[#EAE2D4] text-[#695D4D]' : 'bg-[#23395B]/10 text-[#23395B] font-semibold'}`}>
                          {b.styleTag}
                        </span>
                      </div>
                      <p className="text-xs text-[#524A3F] mt-1.5 line-clamp-2">
                        {b.description}
                      </p>
                    </div>
                  );
                })}
              </>
            )}

            {/* 3. Footwear Tab */}
            {activeCategoryTab === 'footwear' && (
              <>
                {FOOTWEAR_PIECES.map((f) => {
                  const isSelected = selection.footwearId === f.id;
                  return (
                    <div
                      key={f.id}
                      onClick={() => setSelection({ ...selection, footwearId: f.id })}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 shadow-xs'
                          : 'border-[#E5DDD0] bg-white hover:border-[#CFC3B2]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1E1D1B]">{f.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#EAE2D4] text-[#695D4D]">
                          {f.styleTag}
                        </span>
                      </div>
                      <p className="text-xs text-[#524A3F] mt-1.5 line-clamp-2">
                        {f.description}
                      </p>
                    </div>
                  );
                })}
              </>
            )}

            {/* 4. Headwear Tab */}
            {activeCategoryTab === 'headwear' && (
              <>
                {HEADWEAR_PIECES.map((h) => {
                  const isSelected = selection.headwearId === h.id;
                  return (
                    <div
                      key={h.id}
                      onClick={() => setSelection({ ...selection, headwearId: h.id })}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 shadow-xs'
                          : 'border-[#E5DDD0] bg-white hover:border-[#CFC3B2]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1E1D1B]">{h.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#EAE2D4] text-[#695D4D]">
                          {h.styleTag}
                        </span>
                      </div>
                      <p className="text-xs text-[#524A3F] mt-1.5 line-clamp-2">
                        {h.description}
                      </p>
                    </div>
                  );
                })}
              </>
            )}

            {/* 5. Bag Tab */}
            {activeCategoryTab === 'bag' && (
              <>
                {BAG_PIECES.map((b) => {
                  const isSelected = selection.bagId === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelection({ ...selection, bagId: b.id })}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 shadow-xs'
                          : 'border-[#E5DDD0] bg-white hover:border-[#CFC3B2]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1E1D1B]">{b.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#EAE2D4] text-[#695D4D]">
                          {b.styleTag}
                        </span>
                      </div>
                      <p className="text-xs text-[#524A3F] mt-1.5 line-clamp-2">
                        {b.description}
                      </p>
                    </div>
                  );
                })}
              </>
            )}

            {/* 6. Accessories Tab */}
            {activeCategoryTab === 'accessories' && (
              <>
                {ACCESSORY_PIECES.map((a) => {
                  const isSelected = selection.accessoryId === a.id;
                  return (
                    <div
                      key={a.id}
                      onClick={() => setSelection({ ...selection, accessoryId: a.id })}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 shadow-xs'
                          : 'border-[#E5DDD0] bg-white hover:border-[#CFC3B2]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1E1D1B]">{a.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#EAE2D4] text-[#695D4D]">
                          {a.styleTag}
                        </span>
                      </div>
                      <p className="text-xs text-[#524A3F] mt-1.5 line-clamp-2">
                        {a.description}
                      </p>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>

        {/* =========================================================================
            COLUMN 2 (CENTER): Mannequin / Model Preview
           ========================================================================= */}
        <div className="lg:col-span-4 flex flex-col h-[700px]">
          <div className="flex-1 w-full">
            <MannequinPreview selection={selection} interactive={true} />
          </div>

          {/* Quick Action below Mannequin */}
          <div className="mt-3">
            <button
              onClick={onOpenResult}
              className="w-full py-3.5 px-4 bg-[#8B1E1E] hover:bg-[#721717] text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Sparkles size={16} />
              <span>REMIX OUTFIT & XUẤT THẺ CHIA SẺ</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            COLUMN 3 (RIGHT): Bảng Cấu Hình Phong Cách, Màu Sắc & Phân Tích
           ========================================================================= */}
        <div className="lg:col-span-4 bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl p-5 shadow-xs flex flex-col h-[700px]">
          {/* Top Tabs: Cấu hình / Hồ sơ văn hóa / Phân tích tỷ lệ */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-[#F4EFEA] rounded-xl mb-4 text-xs">
            <button
              onClick={() => setActiveRightTab('config')}
              className={`py-1.5 px-2 rounded-lg font-medium transition-all cursor-pointer ${
                activeRightTab === 'config'
                  ? 'bg-white text-[#1E1D1B] shadow-xs font-semibold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              Phong cách & Màu
            </button>
            <button
              onClick={() => setActiveRightTab('culture')}
              className={`py-1.5 px-2 rounded-lg font-medium transition-all cursor-pointer ${
                activeRightTab === 'culture'
                  ? 'bg-white text-[#1E1D1B] shadow-xs font-semibold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              Di sản văn hóa
            </button>
            <button
              onClick={() => setActiveRightTab('score')}
              className={`py-1.5 px-2 rounded-lg font-medium transition-all cursor-pointer ${
                activeRightTab === 'score'
                  ? 'bg-white text-[#1E1D1B] shadow-xs font-semibold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              Why This Works
            </button>
          </div>

          {/* Right Pane Tab Content */}
          <div className="overflow-y-auto flex-1 pr-1">
            {activeRightTab === 'config' && (
              <div className="space-y-5">
                {/* 1. Style Picker */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1.5">
                      <Crown size={13} className="text-[#C89B3C]" />
                      Phong cách thời trang
                    </span>
                    <span className="text-[11px] text-[#8B1E1E] font-medium">
                      {STYLES.find((s) => s.id === selection.styleId)?.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {STYLES.map((s) => {
                      const isSelected = selection.styleId === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setSelection({ ...selection, styleId: s.id })}
                          className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#8B1E1E] bg-[#8B1E1E]/8 text-[#1E1D1B] font-semibold'
                              : 'border-[#E5DDD0] bg-white text-[#4A4337] hover:border-[#D0C4B3]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs truncate">{s.name}</span>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E1E]" />}
                          </div>
                          <span className="text-[10px] text-[#786E5F] block truncate mt-0.5">
                            {s.tag}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Color Palette Picker */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1.5">
                      <Palette size={13} className="text-[#8B1E1E]" />
                      Bảng màu di sản & gấm lụa
                    </span>
                    <span className="text-[11px] font-medium text-[#1E1D1B]">
                      {COLORS.find((c) => c.id === selection.colorId)?.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {COLORS.map((c) => {
                      const isSelected = selection.colorId === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => setSelection({ ...selection, colorId: c.id })}
                          className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#8B1E1E] bg-white ring-2 ring-[#8B1E1E]/20 shadow-xs'
                              : 'border-[#E5DDD0] bg-[#FAF8F5] hover:border-[#CFC4B3]'
                          }`}
                          title={c.culturalMeaning}
                        >
                          <div
                            className="w-6 h-6 rounded-full border border-black/15 shadow-xs flex items-center justify-center text-white text-[10px]"
                            style={{ backgroundColor: c.hex }}
                          >
                            {isSelected && <Check size={12} strokeWidth={3} />}
                          </div>
                          <span className="text-[10px] text-[#3D372F] font-medium truncate max-w-full">
                            {c.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Color Meaning */}
                  <div className="mt-3 p-3 rounded-lg bg-[#F4EFEA] border border-[#E5DDD0] text-xs text-[#524A3D]">
                    <span className="font-semibold text-[#8B1E1E] block mb-0.5">
                      Ý nghĩa văn hóa:
                    </span>
                    <p className="text-[11px] leading-relaxed">
                      {COLORS.find((c) => c.id === selection.colorId)?.culturalMeaning}
                    </p>
                  </div>
                </div>

                {/* Quick Mix Ratio Snapshot */}
                <div className="p-3.5 bg-white rounded-xl border border-[#E5DDD0]">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-[#1E1D1B]">Mix Ratio Hiện Tại:</span>
                    <span className="font-mono text-xs font-semibold text-[#8B1E1E]">
                      {scoreResult.traditionalScore}% Di Sản · {scoreResult.modernScore}% Gen Z
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#E5DDD0] rounded-full overflow-hidden flex">
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
              </div>
            )}

            {/* Cultural Context Tab */}
            {activeRightTab === 'culture' && (
              <CulturalCard garment={selectedGarment} />
            )}

            {/* Style Score / Why This Works Tab */}
            {activeRightTab === 'score' && (
              <WhyThisWorksCard scoreResult={scoreResult} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
