import React, { useState } from 'react';
import { OutfitSelection, WhereToWearLocation } from '../types';
import { WHERE_TO_WEAR_LOCATIONS, getWhereToWearRecommendations } from '../data/mockData';
import {
  MapPin,
  Camera,
  Compass,
  Sparkles,
  Clock,
  Shirt,
  X,
  Navigation,
  Check,
  ChevronRight,
  Filter,
  ExternalLink,
  Map as MapIcon,
  Copy,
  Layers
} from 'lucide-react';

interface WhereToWearModalProps {
  isOpen: boolean;
  onClose: () => void;
  selection: OutfitSelection;
  onApplyOutfitForLocation?: (loc: WhereToWearLocation) => void;
}

export const WhereToWearModal: React.FC<WhereToWearModalProps> = ({
  isOpen,
  onClose,
  selection,
  onApplyOutfitForLocation
}) => {
  const [selectedCity, setSelectedCity] = useState<'all' | 'Hà Nội' | 'TP. Hồ Chí Minh' | 'Huế' | 'Hội An' | 'Đà Lạt'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'heritage' | 'contemporary_art' | 'concept_cafe' | 'indie_event' | 'festival'>('all');
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'details' | 'map'>('details');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const rankedLocations = getWhereToWearRecommendations(selection);

  const filteredLocations = rankedLocations.filter((loc) => {
    const cityMatch = selectedCity === 'all' || loc.city === selectedCity;
    const catMatch = selectedCategory === 'all' || loc.category === selectedCategory;
    return cityMatch && catMatch;
  });

  const activeLocation = rankedLocations.find((l) => l.id === (activeLocationId || rankedLocations[0].id)) || rankedLocations[0];

  const getGoogleMapsUrl = (loc: WhereToWearLocation) => {
    if (loc.googleMapsUrl) return loc.googleMapsUrl;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name + ' ' + loc.address)}`;
  };

  const getGoogleDirectionsUrl = (loc: WhereToWearLocation) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc.name + ', ' + loc.address)}`;
  };

  const handleCopyAddress = (loc: WhereToWearLocation) => {
    navigator.clipboard.writeText(`${loc.name} - ${loc.address}`);
    setCopiedId(loc.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#E5DDD0] bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#8B1E1E]/10 border border-[#8B1E1E]/20 flex items-center justify-center text-[#8B1E1E]">
              <Compass size={18} className="animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-base sm:text-lg font-bold text-[#1E1D1B]">
                  Where to Wear?
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8B1E1E] text-white uppercase tracking-wider shadow-2xs">
                  Bản Đồ Google Maps
                </span>
              </div>
              <p className="text-xs text-[#756B5D] mt-0.5">
                Gợi ý địa điểm & sự kiện văn hóa thực tế tại Việt Nam — Xem trực tiếp trên Google Maps
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

        {/* Filter Bar */}
        <div className="px-5 sm:px-6 py-3 border-b border-[#E5DDD0] bg-[#F4EFEA] flex flex-wrap items-center justify-between gap-2.5">
          {/* City Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar py-0.5">
            <span className="text-[11px] font-semibold text-[#5A5043] flex items-center gap-1 shrink-0 mr-1">
              <MapPin size={12} className="text-[#8B1E1E]" /> Thành phố:
            </span>
            {(['all', 'Hà Nội', 'TP. Hồ Chí Minh', 'Huế', 'Hội An', 'Đà Lạt'] as const).map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer shrink-0 ${
                  selectedCity === city
                    ? 'bg-[#8B1E1E] text-white font-semibold shadow-2xs'
                    : 'bg-white text-[#635849] border border-[#DFD5C6] hover:border-[#C7BBA8]'
                }`}
              >
                {city === 'all' ? 'Tất cả (5)' : city}
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar py-0.5">
            <span className="text-[11px] font-semibold text-[#5A5043] flex items-center gap-1 shrink-0 mr-1">
              <Filter size={12} className="text-[#8B1E1E]" /> Loại hình:
            </span>
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'heritage', label: '🏛️ Di tích' },
              { id: 'contemporary_art', label: '🎨 Triển lãm' },
              { id: 'concept_cafe', label: '☕ Cafe' },
              { id: 'festival', label: '🏮 Lễ hội' },
              { id: 'indie_event', label: '🎸 Đêm nhạc' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#1E1D1B] text-white font-semibold shadow-2xs'
                    : 'bg-white text-[#635849] border border-[#DFD5C6] hover:border-[#C7BBA8]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Content - 2 Column Layout */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Ranked List of Locations (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#8B1E1E]" />
                <span>Điểm Đến Khớp Vibe ({filteredLocations.length})</span>
              </span>
              <span className="text-[11px] text-[#7A6E5D]">
                Nhấn để xem chi tiết & Maps
              </span>
            </div>

            <div className="space-y-2.5 max-h-[520px] overflow-y-auto custom-scrollbar pr-1">
              {filteredLocations.map((loc) => {
                const isSelected = activeLocation.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setActiveLocationId(loc.id)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all relative ${
                      isSelected
                        ? 'border-[#8B1E1E] bg-[#8B1E1E]/6 ring-1.5 ring-[#8B1E1E]/40 shadow-xs'
                        : 'border-[#E5DDD0] bg-white hover:border-[#D0C4B3] hover:shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-editorial text-sm font-bold text-[#1E1D1B]">
                            {loc.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-[#786D5E]">
                          <span className="flex items-center gap-0.5 text-[#8B1E1E] font-semibold">
                            <MapPin size={11} />
                            {loc.city}
                          </span>
                          <span>•</span>
                          <span>{loc.categoryName}</span>
                        </div>
                      </div>

                      {/* Vibe Match Badge */}
                      <div className="shrink-0 text-right">
                        <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs">
                          {loc.matchScore}% Match
                        </span>
                      </div>
                    </div>

                    {/* Vibe Tag */}
                    <div className="mt-2 text-[10px] font-medium text-[#8B1E1E] bg-[#F9F5EE] px-2 py-0.5 rounded border border-[#EAE0D1] inline-block">
                      ✨ {loc.vibeTag}
                    </div>

                    <p className="text-xs text-[#52493D] mt-1.5 line-clamp-2 leading-relaxed">
                      "{loc.quote}"
                    </p>

                    {/* Quick Google Map Link in card */}
                    <div className="mt-2 pt-2 border-t border-[#EAE2D5] flex items-center justify-between">
                      <span className="text-[10px] text-[#7A6E5D] truncate max-w-[200px]">
                        📍 {loc.address}
                      </span>
                      <a
                        href={getGoogleMapsUrl(loc)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] font-bold text-[#8B1E1E] hover:underline flex items-center gap-0.5 shrink-0"
                      >
                        <span>Google Maps</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Location Dossier & Photography Angle (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5DDD0] p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {/* Location Header Hero */}
              <div className="border-b border-[#EAE2D5] pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B1E1E] bg-[#8B1E1E]/10 px-2.5 py-0.5 rounded-md border border-[#8B1E1E]/20">
                    {activeLocation.categoryName} • {activeLocation.city}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <Sparkles size={12} />
                    <span>Độ hòa hợp: {activeLocation.matchScore}%</span>
                  </div>
                </div>

                <h3 className="font-editorial text-xl font-bold text-[#1E1D1B] mt-2">
                  {activeLocation.name}
                </h3>
                <p className="text-xs text-[#706555] flex items-center gap-1 mt-1">
                  <Navigation size={12} className="text-[#8B1E1E] shrink-0" />
                  <span>{activeLocation.address}</span>
                </p>

                {/* Google Maps Actions Bar */}
                <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-[#F0EBE1]">
                  <a
                    href={getGoogleMapsUrl(activeLocation)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-3 bg-[#8B1E1E] hover:bg-[#721717] text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <MapIcon size={12} />
                    <span>Mở Trên Google Maps</span>
                    <ExternalLink size={11} />
                  </a>

                  <a
                    href={getGoogleDirectionsUrl(activeLocation)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-3 bg-[#FAF8F5] hover:bg-[#F0EAE1] border border-[#D5CABE] text-[#1E1D1B] text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Navigation size={12} className="text-[#8B1E1E]" />
                    <span>Chỉ Đường Đi</span>
                  </a>

                  <button
                    onClick={() => handleCopyAddress(activeLocation)}
                    className="py-1.5 px-2.5 bg-[#FAF8F5] hover:bg-[#F0EAE1] border border-[#D5CABE] text-[#6B5F50] text-xs font-medium rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                    title="Sao chép địa chỉ"
                  >
                    {copiedId === activeLocation.id ? (
                      <>
                        <Check size={12} className="text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Chép địa chỉ</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setViewMode(viewMode === 'details' ? 'map' : 'details')}
                    className="py-1.5 px-2.5 bg-[#FAF5EE] hover:bg-[#F0EAE1] border border-[#8B1E1E]/30 text-[#8B1E1E] text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ml-auto cursor-pointer"
                  >
                    <Layers size={12} />
                    <span>{viewMode === 'details' ? 'Bản Đồ Vệ Tinh' : 'Chi Tiết Tips'}</span>
                  </button>
                </div>
              </div>

              {viewMode === 'map' ? (
                /* Interactive Map View with coordinates */
                <div className="space-y-3 animate-in fade-in duration-150">
                  <div className="relative w-full h-[260px] rounded-xl overflow-hidden border border-[#E5DDD0] bg-[#FAF8F5] flex items-center justify-center">
                    <iframe
                      title={`Bản đồ ${activeLocation.name}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        activeLocation.name + ' ' + activeLocation.address
                      )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    />
                  </div>

                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DDD0] flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#1E1D1B] block">{activeLocation.name}</span>
                      <span className="text-[#7A6E5D] text-[11px]">{activeLocation.address}</span>
                    </div>
                    <a
                      href={getGoogleMapsUrl(activeLocation)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#8B1E1E] text-white font-bold rounded-lg text-xs flex items-center gap-1 hover:bg-[#721717]"
                    >
                      <span>Mở Google Maps App</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              ) : (
                /* Details view */
                <>
                  {/* Vibe Check Quote */}
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DDD0] text-xs italic text-[#594F42] font-editorial leading-relaxed">
                    "{activeLocation.quote}"
                  </div>

                  {/* Detailed Breakdown Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* 1. Best Time to Visit */}
                    <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DDD0] space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1">
                        <Clock size={12} className="text-[#8B1E1E]" />
                        <span>Khung Giờ Lý Tưởng</span>
                      </span>
                      <p className="text-xs font-semibold text-[#1E1D1B] leading-snug">
                        {activeLocation.bestTime}
                      </p>
                    </div>

                    {/* 2. Ideal Styling Formula */}
                    <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DDD0] space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E1D1B] flex items-center gap-1">
                        <Shirt size={12} className="text-[#8B1E1E]" />
                        <span>Bản Phối Đề Xuất</span>
                      </span>
                      <p className="text-xs font-medium text-[#4D4438] leading-snug">
                        {activeLocation.stylingTips}
                      </p>
                    </div>
                  </div>

                  {/* Photography Angle & Pose Tip (Khoảnh khắc Lookbook) */}
                  <div className="p-3.5 bg-gradient-to-r from-[#8B1E1E]/5 to-[#FAF8F5] rounded-xl border border-[#8B1E1E]/20 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B1E1E] flex items-center gap-1.5">
                      <Camera size={13} />
                      <span>Góc Chụp Check-in & Tips Tạo Dáng Thần Thánh</span>
                    </span>
                    <p className="text-xs text-[#3E372E] leading-relaxed">
                      {activeLocation.photoAngleTip}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Bottom Action */}
            <div className="pt-3 border-t border-[#EAE2D5] flex items-center justify-between gap-3">
              <div className="text-xs text-[#7A6E5D]">
                <span>Tọa độ văn hóa đã được ghim vị trí trên</span>{' '}
                <strong className="text-[#8B1E1E]">Google Maps</strong>
              </div>

              {onApplyOutfitForLocation && (
                <button
                  onClick={() => {
                    onApplyOutfitForLocation(activeLocation);
                    onClose();
                  }}
                  className="px-4 py-2 bg-[#8B1E1E] hover:bg-[#721717] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-98 shrink-0"
                >
                  <Sparkles size={13} />
                  <span>Lên Đồ Chuẩn Điểm Đến Này</span>
                  <ChevronRight size={13} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
