import React, { useState } from 'react';
import { OutfitSelection } from '../types';
import { calculateStyleScore } from '../utils/styleScore';
import { MannequinPreview } from './MannequinPreview';
import { RealProductsFinder } from './RealProductsFinder';
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
  SKIN_TONE_OPTIONS,
  getWhereToWearRecommendations
} from '../data/mockData';
import {
  X,
  Bookmark,
  Share2,
  RefreshCw,
  Check,
  Sparkles,
  ShoppingBag,
  SlidersHorizontal,
  UserCheck,
  Compass,
  MapPin,
  Clock,
  Navigation
} from 'lucide-react';

interface OutfitResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  selection: OutfitSelection;
  outfitCode: string;
  onSaveOutfit: () => void;
  isSaved: boolean;
  onShare: () => void;
  onContinueRemix: () => void;
}

export const OutfitResultModal: React.FC<OutfitResultModalProps> = ({
  isOpen,
  onClose,
  selection,
  outfitCode,
  onSaveOutfit,
  isSaved,
  onShare,
  onContinueRemix
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'where_to_wear' | 'products'>('overview');

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
  const avatar = AVATAR_MODELS.find((av) => av.id === selection.avatarId) || AVATAR_MODELS[0];
  const skin = SKIN_TONE_OPTIONS.find((s) => s.id === selection.skinTone) || SKIN_TONE_OPTIONS[0];

  const rankedLocations = getWhereToWearRecommendations(selection);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-[#E5DDD0] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E1E]" />
            <span className="font-editorial text-base sm:text-lg font-bold text-[#1E1D1B] tracking-tight">
              Bản Phối Hoàn Thiện
            </span>
            <span className="text-[#968C7C]">·</span>
            <span className="font-mono text-xs text-[#8B1E1E] font-semibold">
              {outfitCode}
            </span>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1 bg-[#EFE9E0] p-0.5 rounded-xl border border-[#DFD5C6]">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-white text-[#8B1E1E] shadow-2xs'
                  : 'text-[#695F50] hover:text-[#1E1D1B]'
              }`}
            >
              <SlidersHorizontal size={12} />
              <span>Tổng quan</span>
            </button>
            <button
              onClick={() => setActiveTab('where_to_wear')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'where_to_wear'
                  ? 'bg-white text-[#8B1E1E] shadow-2xs font-bold'
                  : 'text-[#695F50] hover:text-[#1E1D1B]'
              }`}
            >
              <Compass size={12} className="text-[#8B1E1E]" />
              <span>Gợi ý điểm đến</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#8B1E1E] text-white rounded-full">
                Vibe
              </span>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'products'
                  ? 'bg-[#8B1E1E] text-white shadow-2xs'
                  : 'text-[#695F50] hover:text-[#1E1D1B]'
              }`}
            >
              <ShoppingBag size={12} />
              <span>Tìm mua thực tế</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#756B5D] hover:text-[#1E1D1B] hover:bg-[#EBE3D7]/60 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left: Big Outfit Preview */}
                <div className="md:col-span-6 h-[420px] flex items-center justify-center">
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
                    <div className="flex flex-wrap items-center gap-2 mt-2.5 text-xs text-[#6B6152]">
                      <div className="flex items-center gap-1.5 bg-[#F0EAE1] px-2.5 py-1 rounded-md border border-[#E3D9CC]">
                        <span
                          className="inline-block w-3 h-3 rounded-full border border-black/10"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="font-medium text-[#1E1D1B]">{color.name}</span>
                      </div>

                      <div className="flex items-center gap-1.5 bg-[#F0EAE1] px-2.5 py-1 rounded-md border border-[#E3D9CC]">
                        <UserCheck size={12} className="text-[#8B1E1E]" />
                        <span className="font-medium text-[#1E1D1B]">{avatar.vietnameseTitle}</span>
                      </div>

                      <span className="bg-[#8B1E1E]/10 text-[#8B1E1E] px-2.5 py-1 rounded-md font-medium">
                        {garment.era}
                      </span>
                    </div>
                  </div>

                  {/* Score Summary Grid */}
                  <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E5DDD0]">
                    <div className="text-center">
                      <div className="text-xs text-[#6B6152]">Di sản</div>
                      <div className="font-editorial text-lg font-bold text-[#8B1E1E]">
                        {scoreResult.traditionalScore}%
                      </div>
                    </div>
                    <div className="text-center border-x border-[#E5DDD0]">
                      <div className="text-xs text-[#6B6152]">Đương đại</div>
                      <div className="font-editorial text-lg font-bold text-[#23395B]">
                        {scoreResult.modernScore}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-[#6B6152]">Cá tính</div>
                      <div className="font-editorial text-lg font-bold text-[#C89B3C]">
                        {scoreResult.individualityScore}%
                      </div>
                    </div>
                  </div>

                  {/* Selected Item Breakdown Chips */}
                  <div className="space-y-1.5 text-xs">
                    <div className="font-bold text-[#1E1D1B] flex items-center gap-1.5">
                      <Sparkles size={12} className="text-[#8B1E1E]" />
                      <span>Thành phần trang phục:</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#554D40]">
                      <div className="p-1.5 bg-white rounded-lg border border-[#EBE3D7]">
                        <strong>Áo:</strong> {garment.name}
                      </div>
                      <div className="p-1.5 bg-white rounded-lg border border-[#EBE3D7]">
                        <strong>Phần dưới:</strong> {bottom.name}
                      </div>
                      <div className="p-1.5 bg-white rounded-lg border border-[#EBE3D7]">
                        <strong>Giày:</strong> {footwear.name}
                      </div>
                      <div className="p-1.5 bg-white rounded-lg border border-[#EBE3D7]">
                        <strong>Phụ kiện:</strong> {accessory.name}
                      </div>
                    </div>
                  </div>

                  {/* Why this works insight */}
                  <p className="text-xs text-[#4A4237] leading-relaxed italic bg-white/70 p-3 rounded-xl border border-[#E8E0D4]">
                    "{scoreResult.whyThisWorks}"
                  </p>

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

              {/* DYNAMIC 'GỢI Ý ĐIỂM ĐẾN' (VIBE-MATCHED LOCATIONS) SECTION */}
              <div className="pt-4 border-t border-[#E5DDD0] space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#8B1E1E]/10 border border-[#8B1E1E]/20 flex items-center justify-center text-[#8B1E1E]">
                      <Compass size={15} />
                    </div>
                    <div>
                      <h3 className="font-editorial text-base font-bold text-[#1E1D1B] flex items-center gap-2">
                        <span>Gợi Ý Điểm Đến Phù Hợp Vibe (Where to Wear?)</span>
                        <span className="text-[10px] font-sans font-bold px-2 py-0.5 bg-[#8B1E1E] text-white rounded-full">
                          {scoreResult.modernScore >= 60 ? 'Modern Street Vibe' : scoreResult.traditionalScore >= 70 ? 'Heritage / Old Money' : 'Neo-Tradition'}
                        </span>
                      </h3>
                      <p className="text-xs text-[#7A6E5D]">
                        Dựa trên tỷ lệ Di sản ({scoreResult.traditionalScore}%) & Đương đại ({scoreResult.modernScore}%), AI đề xuất các điểm đến thực tế ăn ý nhất:
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('where_to_wear')}
                    className="self-start sm:self-auto text-xs font-bold text-[#8B1E1E] hover:text-[#721717] flex items-center gap-1 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-[#E5DDD0] shadow-2xs hover:bg-[#FAF8F5] transition-all"
                  >
                    <span>Xem toàn bộ bản đồ & gợi ý pose</span>
                    <span className="text-sm">→</span>
                  </button>
                </div>

                {/* 3 Top Ranked Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {rankedLocations.slice(0, 3).map((loc) => (
                    <div
                      key={loc.id}
                      className="p-3 bg-white rounded-xl border border-[#E5DDD0] shadow-2xs flex flex-col justify-between space-y-2 hover:border-[#8B1E1E]/40 transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1E1E] bg-[#8B1E1E]/8 px-1.5 py-0.5 rounded border border-[#8B1E1E]/15">
                            {loc.city} • {loc.categoryName}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {loc.matchScore}% Match
                          </span>
                        </div>

                        <h4 className="font-editorial text-sm font-bold text-[#1E1D1B] mt-1.5 truncate">
                          {loc.name}
                        </h4>
                        <p className="text-[11px] text-[#7A6E5D] truncate flex items-center gap-1 mt-0.5">
                          <Navigation size={10} className="text-[#8B1E1E] shrink-0" />
                          <span className="truncate">{loc.address}</span>
                        </p>
                      </div>

                      <div className="p-2 bg-[#FAF8F5] rounded-lg border border-[#EAE2D5] space-y-1 text-[11px] text-[#4A4237]">
                        <div className="flex items-center gap-1 text-[#8B1E1E] font-semibold text-[10px]">
                          <Clock size={11} />
                          <span>Thời điểm: {loc.bestTime}</span>
                        </div>
                        <p className="line-clamp-2 leading-relaxed">
                          <strong>Góc chụp:</strong> {loc.photoAngleTip}
                        </p>
                      </div>

                      <div className="pt-1.5 border-t border-[#EAE2D5] flex items-center justify-between text-[10px] text-[#7A6E5D]">
                        <span>Vibe: <strong className="text-[#1E1D1B]">{loc.vibeTag}</strong></span>
                        <a
                          href={loc.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name + ' ' + loc.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8B1E1E] font-bold hover:underline flex items-center gap-0.5"
                        >
                          <span>Maps ↗</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}


          {activeTab === 'where_to_wear' && (
            /* Where to Wear Tab */
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-3.5 bg-gradient-to-r from-[#8B1E1E]/8 to-[#FAF8F5] rounded-xl border border-[#8B1E1E]/20 flex items-center justify-between">
                <div>
                  <h3 className="font-editorial text-base font-bold text-[#1E1D1B] flex items-center gap-2">
                    <Compass size={16} className="text-[#8B1E1E]" />
                    <span>Bản Đồ Gợi Ý Điểm Đến Khớp Vibe (Where to Wear)</span>
                  </h3>
                  <p className="text-xs text-[#6B5F50] mt-0.5">
                    Dựa trên thuật toán đánh giá phong cách của bộ outfit này, đây là những tọa độ check-in hoàn hảo nhất tại Việt Nam.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#8B1E1E] bg-white px-3 py-1 rounded-lg border border-[#E5DDD0] shadow-2xs">
                  Top 4 Điểm Đến
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {rankedLocations.slice(0, 4).map((loc) => (
                  <div
                    key={loc.id}
                    className="p-4 bg-white rounded-xl border border-[#E5DDD0] shadow-2xs flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1E1E] bg-[#8B1E1E]/8 px-2 py-0.5 rounded border border-[#8B1E1E]/15">
                            {loc.categoryName} • {loc.city}
                          </span>
                          <h4 className="font-editorial text-base font-bold text-[#1E1D1B] mt-1.5">
                            {loc.name}
                          </h4>
                          <p className="text-[11px] text-[#7A6E5D] flex items-center gap-1 mt-0.5">
                            <Navigation size={11} className="text-[#8B1E1E]" />
                            {loc.address}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs">
                            {loc.matchScore}% Match
                          </span>
                        </div>
                      </div>

                      <div className="mt-2.5 p-2 bg-[#FAF8F5] rounded-lg border border-[#EAE2D5] space-y-1 text-xs">
                        <div className="flex items-center gap-1 text-[#8B1E1E] font-bold text-[11px]">
                          <Clock size={12} />
                          <span>Khung giờ đẹp nhất: {loc.bestTime}</span>
                        </div>
                        <div className="text-[#4A4237] leading-relaxed text-[11px]">
                          <strong>Góc chụp & Dáng pose:</strong> {loc.photoAngleTip}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#EAE2D5] flex items-center justify-between text-[11px] text-[#7A6E5D]">
                      <span>Style Vibe: <strong className="text-[#1E1D1B]">{loc.vibeTag}</strong></span>
                      <a
                        href={loc.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name + ' ' + loc.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1 px-2.5 bg-[#8B1E1E] text-white rounded-lg text-xs font-bold hover:bg-[#721717] flex items-center gap-1 shadow-2xs"
                      >
                        <span>Mở Google Maps</span>
                        <Navigation size={11} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-[#E5DDD0]">
                <button
                  onClick={() => setActiveTab('overview')}
                  className="text-xs font-semibold text-[#6E6557] hover:text-[#1E1D1B] flex items-center gap-1 cursor-pointer"
                >
                  <span>← Quay lại chi tiết bản phối</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onSaveOutfit}
                    className={`flex items-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isSaved
                        ? 'bg-[#1E382B] text-white'
                        : 'bg-white text-[#1E1D1B] border border-[#D5CABE] hover:bg-[#EFE7DC]'
                    }`}
                  >
                    {isSaved ? <Check size={13} /> : <Bookmark size={13} />}
                    <span>{isSaved ? 'Đã lưu' : 'Lưu outfit'}</span>
                  </button>
                  <button
                    onClick={onShare}
                    className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-[#8B1E1E] text-white hover:bg-[#721717] transition-all shadow-xs cursor-pointer"
                  >
                    <Share2 size={13} />
                    <span>Chia sẻ</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            /* Products Tab: Google Search Grounding Data for Real Products */
            <div className="space-y-4">
              <RealProductsFinder selection={selection} outfitCode={outfitCode} />

              <div className="flex justify-between items-center pt-2 border-t border-[#E5DDD0]">
                <button
                  onClick={() => setActiveTab('overview')}
                  className="text-xs font-semibold text-[#6E6557] hover:text-[#1E1D1B] flex items-center gap-1 cursor-pointer"
                >
                  <span>← Quay lại chi tiết bản phối</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onSaveOutfit}
                    className={`flex items-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isSaved
                        ? 'bg-[#1E382B] text-white'
                        : 'bg-white text-[#1E1D1B] border border-[#D5CABE] hover:bg-[#EFE7DC]'
                    }`}
                  >
                    {isSaved ? <Check size={13} /> : <Bookmark size={13} />}
                    <span>{isSaved ? 'Đã lưu' : 'Lưu outfit'}</span>
                  </button>
                  <button
                    onClick={onShare}
                    className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-[#8B1E1E] text-white hover:bg-[#721717] transition-all shadow-xs cursor-pointer"
                  >
                    <Share2 size={13} />
                    <span>Chia sẻ</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
