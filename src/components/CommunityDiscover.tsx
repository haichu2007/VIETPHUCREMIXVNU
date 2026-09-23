import React, { useState } from 'react';
import { SavedOutfit, OutfitSelection } from '../types';
import { MOCK_COMMUNITY_OUTFITS, GARMENTS, STYLES } from '../data/mockData';
import { MannequinPreview } from './MannequinPreview';
import { Heart, Sparkles, Filter, Search, ArrowUpRight, Compass } from 'lucide-react';

interface CommunityDiscoverProps {
  onRemixLook: (selection: OutfitSelection) => void;
  savedOutfits: SavedOutfit[];
}

export const CommunityDiscover: React.FC<CommunityDiscoverProps> = ({
  onRemixLook,
  savedOutfits
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  // Merge mock outfits with locally saved outfits
  const allOutfits = [...savedOutfits, ...MOCK_COMMUNITY_OUTFITS];

  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredOutfits = allOutfits.filter((outfit) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      outfit.name.toLowerCase().includes(query) ||
      outfit.tags.some((t) => t.toLowerCase().includes(query)) ||
      outfit.creator.name.toLowerCase().includes(query) ||
      outfit.creator.handle.toLowerCase().includes(query);

    if (!matchesQuery) return false;

    if (activeFilter === 'all') return true;
    if (activeFilter === 'ao-ngu-than') return outfit.selection.garmentId === 'ao-ngu-than';
    if (activeFilter === 'ao-dai') return outfit.selection.garmentId === 'ao-dai';
    if (activeFilter === 'ao-tu-than') return outfit.selection.garmentId === 'ao-tu-than';
    if (activeFilter === 'street') return outfit.selection.styleId === 'style-street';
    if (activeFilter === 'minimal') return outfit.selection.styleId === 'style-minimal';
    if (activeFilter === 'y2k') return outfit.selection.styleId === 'style-y2k';

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#E5DDD0] mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1E1E]/8 text-[#8B1E1E] text-xs font-semibold uppercase tracking-wider mb-2">
            <Compass size={13} />
            <span>Phòng Trưng Bày Cộng Đồng · Community Gallery</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1E1D1B] tracking-tight">
            Khám Phá Bản Phối Sáng Tạo
          </h2>
          <p className="text-sm text-[#6B6152] mt-1">
            Bộ sưu tập các bản phối Việt phục mang đậm phong cách Gen Z từ cộng đồng trẻ yêu văn hóa.
          </p>
        </div>

        {/* Search input with blueprint styling */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo phong cách, tên áo..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D5CABE] rounded-xl text-xs text-[#1E1D1B] placeholder-[#9E9484] focus:outline-hidden focus:border-[#8B1E1E] shadow-xs"
          />
          <Search size={14} className="absolute left-3 top-3 text-[#9E9484]" />
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs no-scrollbar">
        {[
          { id: 'all', label: 'Tất cả' },
          { id: 'ao-ngu-than', label: 'Áo ngũ thân' },
          { id: 'ao-dai', label: 'Áo dài' },
          { id: 'ao-tu-than', label: 'Áo tứ thân' },
          { id: 'street', label: 'Street style' },
          { id: 'minimal', label: 'Minimalist' },
          { id: 'y2k', label: 'Y2K Retro' }
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === filter.id
                ? 'bg-[#1E1D1B] text-white shadow-xs'
                : 'bg-[#F4EFEA] hover:bg-[#EAE2D4] text-[#554D3F] border border-[#E0D5C3]'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Outfits Grid with Tarot & Blueprint Framing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredOutfits.map((outfit, index) => {
          const isLiked = likedMap[outfit.id];
          const garment = GARMENTS.find((g) => g.id === outfit.selection.garmentId);
          const style = STYLES.find((s) => s.id === outfit.selection.styleId);
          const romanNumeral = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV'][index % 14];

          return (
            <div
              key={outfit.id}
              className="group relative bg-[#FAF8F5] border-2 border-[#E2D7C7] hover:border-[#8B1E1E]/60 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Tarot / Museum Double Hairline Border (1px Inner Inset Frame) */}
              <div className="absolute inset-2 border border-[#E8DFC0]/80 rounded-xl pointer-events-none z-20 transition-colors group-hover:border-[#8B1E1E]/30" />

              {/* Tarot Corner Accents */}
              <span className="absolute top-3 left-3 text-[8px] font-mono text-[#A89C89] z-20 pointer-events-none select-none">
                {romanNumeral}
              </span>
              <span className="absolute top-3 right-3 text-[8px] font-mono text-[#A89C89] z-20 pointer-events-none select-none">
                ◇
              </span>

              {/* Cropped Zoom-in Thumbnail Container (Focusing on waist, neckline, and drapery details) */}
              <div className="relative h-72 bg-[radial-gradient(ellipse_at_50%_40%,_#FFFFFF_0%,_#F6F0E7_60%,_#EAE0D1_100%)] p-2 flex items-center justify-center border-b border-[#E5DDD0] overflow-hidden">
                {/* 1px Blueprint Hairline Cross Grid */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] border-t border-dashed border-[#8B1E1E]" />
                  <div className="absolute top-0 bottom-0 left-1/2 w-[1px] border-l border-dashed border-[#8B1E1E]" />
                </div>

                {/* The Zoomed Mannequin (125% scale crop with smooth hover zoom) */}
                <div className="w-full h-full flex items-center justify-center scale-120 sm:scale-125 translate-y-2 group-hover:scale-130 transition-transform duration-500 ease-out">
                  <MannequinPreview selection={outfit.selection} interactive={false} compact={true} />
                </div>

                {/* Top Badge: Mix Ratio Snapshot */}
                <div className="absolute top-3 left-7 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-sm border border-[#E5DDD0] text-[9px] font-mono text-[#1E1D1B] z-20 shadow-xs">
                  Di sản {outfit.mixRatio.traditional}% · {outfit.mixRatio.modern}% Gen Z
                </div>

                {/* Like Button */}
                <button
                  onClick={(e) => handleToggleLike(outfit.id, e)}
                  className={`absolute top-3 right-7 p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer z-20 ${
                    isLiked
                      ? 'bg-[#8B1E1E] text-white'
                      : 'bg-white/85 hover:bg-white text-[#5E5547]'
                  }`}
                  title="Thả tim outfit"
                >
                  <Heart size={13} className={isLiked ? 'fill-white' : ''} />
                </button>
              </div>

              {/* Card Meta Content with Blueprint lines */}
              <div className="p-4 flex-1 flex flex-col justify-between relative z-10">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#786E5F] mb-1">
                    <span className="font-mono uppercase font-semibold text-[#8B1E1E] tracking-wider">
                      {outfit.code}
                    </span>
                    <span className="text-[10px] text-[#9E9484]">{outfit.createdAt}</span>
                  </div>

                  <h3 className="font-editorial text-lg font-bold text-[#1E1D1B] group-hover:text-[#8B1E1E] transition-colors leading-snug">
                    {outfit.name}
                  </h3>

                  <p className="text-xs text-[#524A3D] line-clamp-2 mt-1 leading-relaxed">
                    {outfit.whyThisWorks}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {outfit.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-sm bg-[#F0E9DF] text-[#554D40] border border-[#E3D8C8]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Creator info + "REMIX LOOK NÀY" CTA */}
                <div className="pt-3.5 mt-3.5 border-t border-[#EAE1D3] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#8B1E1E]/15 text-[#8B1E1E] font-bold text-[10px] flex items-center justify-center">
                      {outfit.creator.avatar}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#1E1D1B] block leading-none">
                        {outfit.creator.name}
                      </span>
                      <span className="text-[10px] text-[#807667]">
                        {outfit.creator.handle}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemixLook(outfit.selection)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#8B1E1E] hover:bg-[#721717] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-xs active:scale-95"
                    title="Đưa bản phối này vào phòng thử đồ"
                  >
                    <span>Remix look</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredOutfits.length === 0 && (
        <div className="text-center py-16 bg-[#FAF8F5] rounded-2xl border border-[#E5DDD0]">
          <p className="font-editorial text-lg text-[#5E5547]">
            Không tìm thấy bản phối phù hợp với bộ lọc hiện tại.
          </p>
          <button
            onClick={() => {
              setActiveFilter('all');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 bg-[#8B1E1E] text-white text-xs font-semibold rounded-lg cursor-pointer"
          >
            Xem tất cả bản phối
          </button>
        </div>
      )}
    </div>
  );
};
