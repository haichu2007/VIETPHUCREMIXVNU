import React, { useState } from 'react';
import { SavedOutfit } from '../types';
import { MOCK_COMMUNITY_OUTFITS } from '../data/mockData';
import { MannequinPreview } from './MannequinPreview';
import { BookOpen, Sparkles, Share2, Copy, Check, X, Plus, Trash2, Download } from 'lucide-react';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedOutfits: SavedOutfit[];
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  isOpen,
  onClose,
  savedOutfits
}) => {
  const allPool = [...savedOutfits, ...MOCK_COMMUNITY_OUTFITS];

  // Default Lookbook State
  const [lookbookTitle, setLookbookTitle] = useState('Hà Nội Gấm Hoa & Nhịp Thở Gen Z');
  const [lookbookSubtitle, setLookbookSubtitle] = useState('Tuyển tập bản phối di sản đương đại mùa Thu Đông 2026');
  const [lookbookCurator, setLookbookCurator] = useState('Nhà Giám Tuyển Trẻ @vietphuc.curator');
  const [curatorNote, setCuratorNote] = useState(
    '“Mỗi bản phối trong lookbook này không chỉ là quần áo; đó là cuộc đối thoại sống động giữa kỹ nghệ cắt may triều Nguyễn, Kinh Bắc và tư duy tự do, phóng khoáng của thế hệ trẻ hôm nay.”'
  );

  // Selected outfits in lookbook (default 3 outfits)
  const [selectedOutfitIds, setSelectedOutfitIds] = useState<string[]>([
    allPool[0]?.id || 'outfit-001',
    allPool[1]?.id || 'outfit-002',
    allPool[2]?.id || 'outfit-003'
  ]);

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('preview');

  if (!isOpen) return null;

  const currentLookbookOutfits = selectedOutfitIds
    .map((id) => allPool.find((o) => o.id === id))
    .filter(Boolean) as SavedOutfit[];

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleOutfit = (id: string) => {
    if (selectedOutfitIds.includes(id)) {
      if (selectedOutfitIds.length <= 1) return; // Keep at least 1
      setSelectedOutfitIds(selectedOutfitIds.filter((item) => item !== id));
    } else {
      if (selectedOutfitIds.length >= 6) return; // Max 6 for layout
      setSelectedOutfitIds([...selectedOutfitIds, id]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border border-[#E5DDD0] w-full max-w-5xl max-h-[95vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Top Navigation */}
        <div className="p-4 sm:p-5 border-b border-[#E5DDD0] bg-[#F4EFEA] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#8B1E1E]/10 text-[#8B1E1E] flex items-center justify-center">
              <BookOpen size={18} />
            </div>
            <div>
              <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#1E1D1B]">
                Lookbook Việt Phục Kỹ Thuật Số
              </h2>
              <span className="text-[11px] text-[#7A7061]">
                Tập san tuyển tập bản phối nghệ thuật & phong cách cá nhân
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View switcher */}
            <div className="bg-white/80 p-1 rounded-xl border border-[#E5DDD0] flex items-center gap-1 text-xs">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeTab === 'preview'
                    ? 'bg-[#1E1D1B] text-white shadow-2xs'
                    : 'text-[#615748] hover:text-[#1E1D1B]'
                }`}
              >
                Xem Tạp Chí
              </button>
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeTab === 'editor'
                    ? 'bg-[#1E1D1B] text-white shadow-2xs'
                    : 'text-[#615748] hover:text-[#1E1D1B]'
                }`}
              >
                Tùy Chỉnh Bộ Sưu Tập
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#7A7061] hover:text-[#1E1D1B] rounded-lg transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-7">
          {activeTab === 'preview' ? (
            /* =========================================================================
                LOOKBOOK MAGAZINE PREVIEW VIEW
               ========================================================================= */
            <div className="space-y-8 max-w-4xl mx-auto bg-white border border-[#E5DDD0] rounded-2xl p-6 sm:p-10 shadow-sm relative">
              {/* Editorial Watermark Lines */}
              <div className="absolute top-4 left-6 right-6 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#9C8F7E] uppercase border-b border-[#E5DDD0] pb-2">
                <span>VIỆT PHỤC REMIX ARCHIVES</span>
                <span>VOL. 01 / LOOKBOOK SPECIAL</span>
                <span>AUTUMN / WINTER 2026</span>
              </div>

              {/* Cover Title Section */}
              <div className="text-center pt-8 max-w-2xl mx-auto space-y-3">
                <span className="inline-block px-3 py-1 rounded-full bg-[#8B1E1E]/8 text-[#8B1E1E] text-[11px] font-bold tracking-widest uppercase">
                  Digital Fashion Lookbook
                </span>
                <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E1D1B] leading-tight">
                  {lookbookTitle}
                </h1>
                <p className="text-xs sm:text-sm text-[#706657] font-medium italic">
                  {lookbookSubtitle}
                </p>
                <div className="text-xs font-mono text-[#8B1E1E] pt-1">
                  Giám tuyển bởi: {lookbookCurator}
                </div>
              </div>

              {/* Curatorial Note Quote Block */}
              <div className="p-4 bg-[#FAF8F5] rounded-xl border-l-4 border-[#8B1E1E] text-xs text-[#524A3D] leading-relaxed italic max-w-2xl mx-auto">
                {curatorNote}
              </div>

              {/* Multi-Look Grid Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {currentLookbookOutfits.map((outfit, idx) => (
                  <div
                    key={outfit.id}
                    className="bg-[#FAF8F5] border border-[#E5DDD0] rounded-xl overflow-hidden shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      {/* Mannequin Preview Container */}
                      <div className="h-56 bg-[radial-gradient(ellipse_at_50%_40%,_#FFFFFF_0%,_#F6F0E7_60%,_#EAE0D1_100%)] p-2 border-b border-[#E5DDD0] relative overflow-hidden flex items-center justify-center">
                        <div className="scale-110">
                          <MannequinPreview selection={outfit.selection} interactive={false} compact={true} />
                        </div>
                        <span className="absolute top-2 left-2 bg-[#1E1D1B] text-white px-2 py-0.5 rounded-xs text-[9px] font-mono">
                          LOOK #{idx + 1}
                        </span>
                      </div>

                      <div className="p-3.5">
                        <div className="flex items-center justify-between text-[10px] text-[#786E5F] mb-0.5">
                          <span className="font-mono font-bold text-[#8B1E1E]">{outfit.code}</span>
                          <span>Di sản {outfit.mixRatio.traditional}%</span>
                        </div>
                        <h4 className="font-editorial text-sm font-bold text-[#1E1D1B] truncate">
                          {outfit.name}
                        </h4>
                        <p className="text-[11px] text-[#554D40] line-clamp-2 mt-1 leading-relaxed">
                          {outfit.whyThisWorks}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-[#F4EFEA] border-t border-[#E5DDD0] text-[10px] text-[#695F50] flex items-center justify-between">
                      <span className="truncate">Tác giả: {outfit.creator.name}</span>
                      <span className="font-mono text-[#8B1E1E]">★ {outfit.likesCount}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lookbook Share Footer */}
              <div className="pt-6 border-t border-[#E5DDD0] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#706657]">
                  Tổng hợp {currentLookbookOutfits.length} bản phối di sản văn hóa thế hệ mới.
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#F4EFEA] text-[#1E1D1B] border border-[#D5CABE] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copied ? 'Đã sao chép link' : 'Sao chép liên kết'}</span>
                  </button>

                  <button
                    onClick={() => {
                      alert('Lookbook đã sẵn sàng! Bạn có thể chia sẻ đường dẫn này tới ban giám khảo và bạn bè.');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#8B1E1E] hover:bg-[#721717] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    <Share2 size={14} />
                    <span>Chia sẻ Lookbook</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* =========================================================================
                LOOKBOOK METADATA & OUTFIT CURATION EDITOR VIEW
               ========================================================================= */
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Form inputs */}
              <div className="p-5 bg-white rounded-xl border border-[#E5DDD0] space-y-4">
                <h3 className="font-editorial text-base font-bold text-[#1E1D1B] border-b border-[#E5DDD0] pb-2">
                  Thông Tin Tuyển Tập Lookbook
                </h3>

                <div>
                  <label className="text-xs font-bold text-[#1E1D1B] block mb-1">
                    Tiêu Đề Lookbook:
                  </label>
                  <input
                    type="text"
                    value={lookbookTitle}
                    onChange={(e) => setLookbookTitle(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#D5CABE] rounded-lg text-[#1E1D1B] focus:outline-hidden focus:border-[#8B1E1E]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1E1D1B] block mb-1">
                    Phụ Đề / Chủ Đề Tuyển Tập:
                  </label>
                  <input
                    type="text"
                    value={lookbookSubtitle}
                    onChange={(e) => setLookbookSubtitle(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#D5CABE] rounded-lg text-[#1E1D1B] focus:outline-hidden focus:border-[#8B1E1E]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1E1D1B] block mb-1">
                    Tên Nhà Giám Tuyển / Người Tạo:
                  </label>
                  <input
                    type="text"
                    value={lookbookCurator}
                    onChange={(e) => setLookbookCurator(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#D5CABE] rounded-lg text-[#1E1D1B] focus:outline-hidden focus:border-[#8B1E1E]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1E1D1B] block mb-1">
                    Lời Tựa Giám Tuyển (Curator Statement):
                  </label>
                  <textarea
                    rows={3}
                    value={curatorNote}
                    onChange={(e) => setCuratorNote(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#D5CABE] rounded-lg text-[#1E1D1B] focus:outline-hidden focus:border-[#8B1E1E] resize-none"
                  />
                </div>
              </div>

              {/* Select Outfits to Include in Lookbook */}
              <div className="p-5 bg-white rounded-xl border border-[#E5DDD0] space-y-3">
                <div className="flex items-center justify-between border-b border-[#E5DDD0] pb-2">
                  <h3 className="font-editorial text-base font-bold text-[#1E1D1B]">
                    Chọn Bản Phối Đưa Vào Lookbook ({selectedOutfitIds.length}/6)
                  </h3>
                  <span className="text-[11px] text-[#7A7061]">Chọn tối thiểu 1, tối đa 6 bản phối</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                  {allPool.map((outfit) => {
                    const isSelected = selectedOutfitIds.includes(outfit.id);
                    return (
                      <div
                        key={outfit.id}
                        onClick={() => handleToggleOutfit(outfit.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 shadow-2xs font-semibold'
                            : 'border-[#E5DDD0] bg-[#FAF8F5] hover:border-[#CFC3B0]'
                        }`}
                      >
                        <div className="truncate">
                          <span className="text-xs text-[#1E1D1B] block truncate">
                            {outfit.name}
                          </span>
                          <span className="text-[10px] text-[#7A7061] font-mono">
                            {outfit.code}
                          </span>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center text-xs ${
                            isSelected
                              ? 'bg-[#8B1E1E] text-white'
                              : 'border border-[#D5CABE] bg-white'
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Done editing button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setActiveTab('preview')}
                  className="px-6 py-2.5 bg-[#8B1E1E] hover:bg-[#721717] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Xong & Xem Bản Trình Diễn Lookbook →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
