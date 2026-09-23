import React, { useState, useRef } from 'react';
import { OutfitSelection, SavedOutfit, FabricTextureType } from '../types';
import {
  GARMENTS,
  BOTTOM_PIECES,
  HEADWEAR_PIECES,
  FOOTWEAR_PIECES,
  BAG_PIECES,
  ACCESSORY_PIECES,
  STYLES,
  COLORS,
  AVATAR_MODELS,
  checkCulturalIntegrity
} from '../data/mockData';
import { calculateStyleScore } from '../utils/styleScore';
import { MannequinPreview, FABRIC_TEXTURE_OPTIONS } from './MannequinPreview';
import { CulturalWarningAlert } from './CulturalWarningAlert';
import { ColorHarmonyChecker } from './ColorHarmonyChecker';
import { WeatherEventRecommender } from './WeatherEventRecommender';
import { OutfitComparisonModal } from './OutfitComparisonModal';
import { LookbookModal } from './LookbookModal';
import {
  Sparkles,
  Shuffle,
  Eye,
  Shirt,
  Info,
  Layers,
  Palette,
  Check,
  UserCheck,
  Upload,
  CloudSun,
  ArrowLeftRight,
  BookOpen,
  Trash2
} from 'lucide-react';

interface RemixEditorProps {
  selection: OutfitSelection;
  setSelection: React.Dispatch<React.SetStateAction<OutfitSelection>>;
  onOpenResult: () => void;
  outfitCode: string;
  savedOutfits: SavedOutfit[];
}

export const RemixEditor: React.FC<RemixEditorProps> = ({
  selection,
  setSelection,
  onOpenResult,
  outfitCode,
  savedOutfits
}) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<
    'garment' | 'bottom' | 'footwear' | 'headwear' | 'bag' | 'accessories' | 'avatar'
  >('garment');

  const [activeRightTab, setActiveRightTab] = useState<'config' | 'culture' | 'score' | 'harmony'>('config');

  // Modals
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isLookbookModalOpen, setIsLookbookModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedGarment = GARMENTS.find((g) => g.id === selection.garmentId) || GARMENTS[0];
  const scoreResult = calculateStyleScore(selection);
  const culturalCheck = checkCulturalIntegrity(selection);

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
    const randomTextures: FabricTextureType[] = ['silk', 'linen', 'brocade', 'grain'];
    const randomTexture = randomTextures[Math.floor(Math.random() * randomTextures.length)];

    setSelection((prev) => ({
      ...prev,
      garmentId: randomGarment.id,
      bottomId: randomBottom.id,
      headwearId: randomHeadwear.id,
      footwearId: randomFootwear.id,
      bagId: randomBag.id,
      accessoryId: randomAccessory.id,
      styleId: randomStyle.id,
      colorId: randomColor.id,
      fabricTexture: randomTexture
    }));
  };

  // Handle User Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setSelection((prev) => ({
            ...prev,
            customPhotoUrl: reader.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setSelection((prev) => ({
      ...prev,
      customPhotoUrl: undefined
    }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Editor Sub-Header / Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-[#E5DDD0] mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-[#8B1E1E]">
            <Sparkles size={12} />
            <span>Phòng Thử Đồ Kỹ Thuật Số · Digital Dressing Room</span>
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E1D1B] mt-0.5">
            Remix Việt Phục & Gen Z Style
          </h1>
        </div>

        {/* Feature Triggers Action Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Weather & Event Button */}
          <button
            onClick={() => setIsWeatherModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white hover:bg-[#F4EFEA] text-[#1E1D1B] border border-[#D5CABE] rounded-lg transition-colors cursor-pointer shadow-2xs"
            title="Gợi ý trang phục theo thời tiết & sự kiện"
          >
            <CloudSun size={14} className="text-[#8B1E1E]" />
            <span>Thời tiết & Sự kiện</span>
          </button>

          {/* A/B Compare Button */}
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white hover:bg-[#F4EFEA] text-[#1E1D1B] border border-[#D5CABE] rounded-lg transition-colors cursor-pointer shadow-2xs"
            title="So sánh đối chiếu 2 phương án phối đồ"
          >
            <ArrowLeftRight size={14} className="text-[#23395B]" />
            <span>So sánh A/B</span>
          </button>

          {/* Lookbook Button */}
          <button
            onClick={() => setIsLookbookModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white hover:bg-[#F4EFEA] text-[#1E1D1B] border border-[#D5CABE] rounded-lg transition-colors cursor-pointer shadow-2xs"
            title="Tạo tuyển tập Lookbook Việt phục"
          >
            <BookOpen size={14} className="text-[#C89B3C]" />
            <span>Tạo Lookbook</span>
          </button>

          <button
            onClick={handleRandomRemix}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#FAF8F5] hover:bg-[#EAE1D3] text-[#423C33] border border-[#D5CABE] rounded-lg transition-colors cursor-pointer"
            title="Ngẫu nhiên tạo một bản phối bất ngờ"
          >
            <Shuffle size={14} className="text-[#8B1E1E]" />
            <span className="hidden sm:inline">Phối Ngẫu Nhiên</span>
          </button>

          <button
            onClick={onOpenResult}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#8B1E1E] hover:bg-[#721717] rounded-lg transition-all shadow-sm cursor-pointer active:scale-98"
          >
            <Eye size={14} />
            <span>Xuất Thẻ ({outfitCode})</span>
          </button>
        </div>
      </div>

      {/* 3-Column Studio Layout on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* =========================================================================
            COLUMN 1 (LEFT): Danh Mục Thành Phối (Garments, Bottoms, Shoes, Avatar...)
           ========================================================================= */}
        <div className="lg:col-span-4 bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl p-5 shadow-xs flex flex-col h-[740px]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD0] mb-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1E1D1B] flex items-center gap-1.5">
              <Shirt size={14} className="text-[#8B1E1E]" />
              Thành Phần Bản Phối
            </h2>
            <span className="text-[11px] text-[#7A7061]">Chọn để thay đổi</span>
          </div>

          {/* Category Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-[#F4EFEA] rounded-xl mb-3 text-[11px]">
            <button
              onClick={() => setActiveCategoryTab('garment')}
              className={`py-1.5 px-1.5 rounded-lg font-medium transition-all cursor-pointer truncate ${
                activeCategoryTab === 'garment'
                  ? 'bg-white text-[#1E1D1B] shadow-xs font-semibold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              Áo truyền thống
            </button>
            <button
              onClick={() => setActiveCategoryTab('bottom')}
              className={`py-1.5 px-1.5 rounded-lg font-medium transition-all cursor-pointer truncate ${
                activeCategoryTab === 'bottom'
                  ? 'bg-white text-[#1E1D1B] shadow-xs font-semibold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              Quần / Váy
            </button>
            <button
              onClick={() => setActiveCategoryTab('footwear')}
              className={`py-1.5 px-1.5 rounded-lg font-medium transition-all cursor-pointer truncate ${
                activeCategoryTab === 'footwear'
                  ? 'bg-white text-[#1E1D1B] shadow-xs font-semibold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              Giày dép
            </button>
            <button
              onClick={() => setActiveCategoryTab('headwear')}
              className={`py-1.5 px-1.5 rounded-lg font-medium transition-all cursor-pointer truncate ${
                activeCategoryTab === 'headwear'
                  ? 'bg-white text-[#1E1D1B] shadow-xs font-semibold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              Khăn / Mấn
            </button>
            <button
              onClick={() => setActiveCategoryTab('bag')}
              className={`py-1.5 px-1.5 rounded-lg font-medium transition-all cursor-pointer truncate ${
                activeCategoryTab === 'bag'
                  ? 'bg-white text-[#1E1D1B] shadow-xs font-semibold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              Túi xách
            </button>
            <button
              onClick={() => setActiveCategoryTab('accessories')}
              className={`py-1.5 px-1.5 rounded-lg font-medium transition-all cursor-pointer truncate ${
                activeCategoryTab === 'accessories'
                  ? 'bg-white text-[#1E1D1B] shadow-xs font-semibold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              Phụ kiện
            </button>
            <button
              onClick={() => setActiveCategoryTab('avatar')}
              className={`col-span-2 py-1.5 px-1.5 rounded-lg font-medium transition-all cursor-pointer truncate flex items-center justify-center gap-1 ${
                activeCategoryTab === 'avatar'
                  ? 'bg-[#8B1E1E] text-white shadow-xs font-semibold'
                  : 'bg-white text-[#8B1E1E] border border-[#8B1E1E]/30 font-semibold'
              }`}
            >
              <UserCheck size={12} />
              <span>Người Mẫu & Tải Ảnh</span>
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
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-[#8B1E1E] text-white rounded-full">
                            Đang chọn
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#524A3F] mt-1.5 line-clamp-2 leading-relaxed">
                        {g.description}
                      </p>
                    </div>
                  );
                })}
              </>
            )}

            {/* 2. Bottoms Tab */}
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

            {/* 7. Avatar Model & User Photo Upload Tab */}
            {activeCategoryTab === 'avatar' && (
              <div className="space-y-4">
                {/* Upload Photo Box */}
                <div className="p-4 bg-white rounded-xl border-2 border-dashed border-[#C89B3C]/50 text-center space-y-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#C89B3C]/10 text-[#C89B3C] mx-auto flex items-center justify-center">
                    <Upload size={18} />
                  </div>
                  <div>
                    <span className="font-editorial text-xs font-bold text-[#1E1D1B] block">
                      Thử Đồ Bằng Ảnh Của Bạn
                    </span>
                    <p className="text-[10px] text-[#7A7061] mt-0.5">
                      Tải ảnh chân dung rõ mặt để hiển thị trực tiếp trên người mẫu.
                    </p>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />

                  {selection.customPhotoUrl ? (
                    <div className="flex items-center justify-center gap-2 pt-1">
                      <span className="text-[11px] font-semibold text-emerald-700">✓ Đang dùng ảnh chân dung</span>
                      <button
                        onClick={handleRemovePhoto}
                        className="p-1 text-red-600 hover:text-red-800 transition-colors"
                        title="Hủy ảnh chân dung"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-[#1E1D1B] hover:bg-[#333] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Chọn Ảnh Chân Dung
                    </button>
                  )}
                </div>

                <div className="border-t border-[#E5DDD0] pt-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7061] block mb-2">
                    Hoặc chọn Người Mẫu Đại Diện (Archetype):
                  </span>

                  <div className="space-y-2">
                    {AVATAR_MODELS.map((av) => {
                      const isSelected = !selection.customPhotoUrl && (selection.avatarId === av.id || (!selection.avatarId && av.id === 'avatar-female-classic'));
                      return (
                        <div
                          key={av.id}
                          onClick={() => {
                            setSelection((prev) => ({
                              ...prev,
                              avatarId: av.id,
                              customPhotoUrl: undefined
                            }));
                          }}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 shadow-xs font-semibold'
                              : 'border-[#E5DDD0] bg-white hover:border-[#D0C4B3]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[#1E1D1B] font-bold">
                              {av.name}
                            </span>
                            {isSelected && (
                              <span className="w-4 h-4 rounded-full bg-[#8B1E1E] text-white flex items-center justify-center text-[9px]">
                                ✓
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#695F50] mt-0.5 line-clamp-2">
                            {av.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            COLUMN 2 (CENTER): Cultural Safeguard & Mannequin / Model Preview
           ========================================================================= */}
        <div className="lg:col-span-4 flex flex-col h-[740px] space-y-3">
          {/* Real-time Cultural Safeguard Alert Banner */}
          <CulturalWarningAlert checkResult={culturalCheck} />

          {/* Mannequin Preview Area with Tactile Editorial Overlays */}
          <div className="flex-1 w-full min-h-[480px]">
            <MannequinPreview
              selection={selection}
              interactive={true}
              fabricTexture={selection.fabricTexture || 'silk'}
              onFabricTextureChange={(tex) =>
                setSelection((prev) => ({ ...prev, fabricTexture: tex }))
              }
              textureIntensity={selection.textureIntensity || 'medium'}
              onTextureIntensityChange={(intensity) =>
                setSelection((prev) => ({ ...prev, textureIntensity: intensity }))
              }
            />
          </div>

          {/* Quick Action below Mannequin */}
          <div>
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
            COLUMN 3 (RIGHT): Cấu Hình Phong Cách, Di Sản, Score, Hài Hòa Màu Sắc
           ========================================================================= */}
        <div className="lg:col-span-4 bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl p-5 shadow-xs flex flex-col h-[740px]">
          {/* Top Tabs: Cấu hình / Hồ sơ văn hóa / Phân tích tỷ lệ / Hài hòa màu */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-[#F4EFEA] rounded-xl mb-4 text-[11px]">
            <button
              onClick={() => setActiveRightTab('config')}
              className={`py-1.5 px-1 rounded-lg font-medium transition-all cursor-pointer truncate ${
                activeRightTab === 'config'
                  ? 'bg-white text-[#1E1D1B] shadow-xs font-semibold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              Phong cách
            </button>
            <button
              onClick={() => setActiveRightTab('culture')}
              className={`py-1.5 px-1 rounded-lg font-medium transition-all cursor-pointer truncate ${
                activeRightTab === 'culture'
                  ? 'bg-white text-[#1E1D1B] shadow-xs font-semibold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              Di sản
            </button>
            <button
              onClick={() => setActiveRightTab('score')}
              className={`py-1.5 px-1 rounded-lg font-medium transition-all cursor-pointer truncate ${
                activeRightTab === 'score'
                  ? 'bg-white text-[#1E1D1B] shadow-xs font-semibold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              Style Score
            </button>
            <button
              onClick={() => setActiveRightTab('harmony')}
              className={`py-1.5 px-1 rounded-lg font-medium transition-all cursor-pointer truncate ${
                activeRightTab === 'harmony'
                  ? 'bg-white text-[#8B1E1E] shadow-xs font-bold'
                  : 'text-[#6E6557] hover:text-[#1E1D1B]'
              }`}
            >
              Màu sắc
            </button>
          </div>

          {/* Right Pane Tab Content */}
          <div className="overflow-y-auto flex-1 pr-1">
            {/* 1. CONFIG: Style & Color */}
            {activeRightTab === 'config' && (
              <div className="space-y-5">
                {/* Style Picker */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1.5 mb-2.5">
                    <Layers size={13} className="text-[#8B1E1E]" />
                    Định Hướng Phong Cách (Style Vibe)
                  </span>
                  <div className="space-y-2">
                    {STYLES.map((s) => {
                      const isSelected = selection.styleId === s.id;
                      return (
                        <div
                          key={s.id}
                          onClick={() => setSelection({ ...selection, styleId: s.id })}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 shadow-xs'
                              : 'border-[#E5DDD0] bg-white hover:border-[#D0C4B3]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#1E1D1B]">{s.name}</span>
                            <span className="text-[10px] font-mono text-[#8B1E1E] font-semibold">
                              {s.traditionalRatio}% Di sản
                            </span>
                          </div>
                          <span className="text-[11px] text-[#786F62] block mt-0.5">
                            {s.tag}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Color Swatches */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1.5">
                      <Palette size={13} className="text-[#C89B3C]" />
                      Bảng Màu Cung Đình & Tự Nhiên
                    </span>
                    <button
                      onClick={() => setActiveRightTab('harmony')}
                      className="text-[10px] font-bold text-[#8B1E1E] hover:underline cursor-pointer"
                    >
                      Bánh xe Ngũ Hành →
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {COLORS.map((c) => {
                      const isSelected = selection.colorId === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => setSelection({ ...selection, colorId: c.id })}
                          className={`group relative p-1.5 rounded-xl border text-center transition-all flex flex-col items-center cursor-pointer ${
                            isSelected
                              ? 'border-[#8B1E1E] bg-white shadow-xs ring-2 ring-[#8B1E1E]/20'
                              : 'border-[#E5DDD0] bg-white hover:border-[#D0C4B3]'
                          }`}
                          title={`${c.name} (${c.culturalMeaning})`}
                        >
                          <div
                            className="w-7 h-7 rounded-full border border-black/10 shadow-2xs mb-1 flex items-center justify-center"
                            style={{ backgroundColor: c.hex }}
                          >
                            {isSelected && (
                              <Check
                                size={12}
                                strokeWidth={3}
                                style={{ color: c.textColor }}
                              />
                            )}
                          </div>
                          <span className="text-[9px] font-semibold text-[#1E1D1B] truncate w-full">
                            {c.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tactile Fabric & Texture Overlays */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1.5">
                      <Sparkles size={13} className="text-[#8B1E1E]" />
                      Chất Liệu & Phủ Xúc Giác (Tactile Overlays)
                    </span>
                    <span className="text-[10px] font-mono text-[#8B1E1E] font-semibold">
                      CSS TEXTURES
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {FABRIC_TEXTURE_OPTIONS.map((tex) => {
                      const isSelected = (selection.fabricTexture || 'silk') === tex.id;
                      return (
                        <div
                          key={tex.id}
                          onClick={() => setSelection((prev) => ({ ...prev, fabricTexture: tex.id }))}
                          className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 shadow-xs ring-1 ring-[#8B1E1E]/20'
                              : 'border-[#E5DDD0] bg-white hover:border-[#D0C4B3]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[#8B1E1E] font-bold text-xs">{tex.icon}</span>
                              <span className="text-xs font-bold text-[#1E1D1B]">{tex.label}</span>
                              <span className="text-[10px] text-[#8C8274] font-medium hidden sm:inline">
                                ({tex.sublabel})
                              </span>
                            </div>
                            <span className="text-[10px] font-semibold text-[#8B1E1E]">
                              {tex.origin}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#695F50] block mt-1 leading-snug">
                            {tex.description}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Intensity control if active texture is not 'none' */}
                  {(selection.fabricTexture || 'silk') !== 'none' && (
                    <div className="mt-2.5 p-2 bg-[#F4EFEA] rounded-xl flex items-center justify-between">
                      <span className="text-[11px] font-medium text-[#5E5446]">
                        Mức độ phủ bề mặt:
                      </span>
                      <div className="flex items-center gap-1">
                        {(['subtle', 'medium', 'rich'] as const).map((lvl) => {
                          const currentIntensity = selection.textureIntensity || 'medium';
                          const isLvl = currentIntensity === lvl;
                          const label = lvl === 'subtle' ? 'Nhẹ (22%)' : lvl === 'medium' ? 'Vừa (40%)' : 'Rõ (62%)';
                          return (
                            <button
                              key={lvl}
                              onClick={() =>
                                setSelection((prev) => ({ ...prev, textureIntensity: lvl }))
                              }
                              className={`px-2 py-0.5 text-[10px] font-semibold rounded-md transition-all cursor-pointer ${
                                isLvl
                                  ? 'bg-[#8B1E1E] text-white shadow-2xs'
                                  : 'text-[#6B6152] hover:text-[#1E1D1B]'
                              }`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. CULTURE: Historical Architecture Dossier */}
            {activeRightTab === 'culture' && (
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-xl border border-[#E5DDD0]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1E1E] block mb-1">
                    Hồ Sơ Cổ Phục
                  </span>
                  <h3 className="font-editorial text-lg font-bold text-[#1E1D1B]">
                    {selectedGarment.vietnameseName}
                  </h3>
                  <span className="text-xs text-[#706657] block mb-2.5">
                    {selectedGarment.era}
                  </span>
                  <p className="text-xs text-[#4A4235] leading-relaxed">
                    {selectedGarment.culturalContext}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#E5DDD0]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B] block mb-2">
                    Đặc Trưng Cấu Trúc Bắt Buộc:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#524A3D]">
                    {selectedGarment.structureDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E1E] mt-1.5 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-[#F4EFEA] rounded-xl border border-[#E5DDD0]">
                  <span className="text-xs font-bold text-[#8B1E1E] block mb-1">
                    Gợi Ý Phối Lớp Hiện Đại (Modern Styling Tip):
                  </span>
                  <p className="text-xs text-[#554D40] leading-relaxed">
                    {selectedGarment.modernTips}
                  </p>
                </div>
              </div>
            )}

            {/* 3. SCORE: Why This Works Analysis */}
            {activeRightTab === 'score' && (
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-xl border border-[#E5DDD0]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B] block mb-3">
                    Đo Lường Cân Bằng Tỷ Lệ
                  </span>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#6E6454]">Hồn Cốt Di Sản:</span>
                        <span className="font-mono font-bold text-[#8B1E1E]">
                          {scoreResult.traditionalScore}%
                        </span>
                      </div>
                      <div className="h-2 bg-[#EAE2D4] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#8B1E1E] transition-all duration-500"
                          style={{ width: `${scoreResult.traditionalScore}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#6E6454]">Nhịp Thở Hiện Đại:</span>
                        <span className="font-mono font-bold text-[#23395B]">
                          {scoreResult.modernScore}%
                        </span>
                      </div>
                      <div className="h-2 bg-[#EAE2D4] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#23395B] transition-all duration-500"
                          style={{ width: `${scoreResult.modernScore}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#6E6454]">Chỉ Số Cá Tính (Individuality):</span>
                        <span className="font-mono font-bold text-[#C89B3C]">
                          {scoreResult.individualityScore}/100
                        </span>
                      </div>
                      <div className="h-2 bg-[#EAE2D4] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#C89B3C] transition-all duration-500"
                          style={{ width: `${scoreResult.individualityScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#E5DDD0]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E1E] block mb-1">
                    Tại Sao Bản Phối Này Hiệu Quả?
                  </span>
                  <p className="text-xs text-[#524A3D] leading-relaxed">
                    {scoreResult.whyThisWorks}
                  </p>
                </div>
              </div>
            )}

            {/* 4. HARMONY: Color Harmony & Ngũ Hành */}
            {activeRightTab === 'harmony' && (
              <ColorHarmonyChecker
                selection={selection}
                onSelectColor={(colorId) => setSelection({ ...selection, colorId })}
              />
            )}
          </div>
        </div>
      </div>

      {/* Weather & Event Recommender Modal */}
      <WeatherEventRecommender
        isOpen={isWeatherModalOpen}
        onClose={() => setIsWeatherModalOpen(false)}
        onApplyOutfit={(newSelection) => setSelection(newSelection)}
      />

      {/* Outfit Comparison Modal */}
      <OutfitComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        currentSelection={selection}
        savedOutfits={savedOutfits}
        onApplySelection={(newSelection) => setSelection(newSelection)}
      />

      {/* Lookbook Builder Modal */}
      <LookbookModal
        isOpen={isLookbookModalOpen}
        onClose={() => setIsLookbookModalOpen(false)}
        savedOutfits={savedOutfits}
      />
    </div>
  );
};
