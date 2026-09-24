import React, { useState, useEffect } from 'react';
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
import {
  ExternalLink,
  ShoppingBag,
  Search,
  RefreshCw,
  Sparkles,
  Info,
  CheckCircle2,
  Tag,
  Store,
  Copy,
  Check
} from 'lucide-react';

interface RealProductItem {
  id: string;
  category: string;
  categoryLabel: string;
  name: string;
  searchQuery: string;
  platform: string;
  estimatedPrice: string;
  url: string;
  snippet?: string;
  sourceType: 'google_search_grounding' | 'verified_ecommerce_link';
}

interface SearchProductsResponse {
  success: boolean;
  source: 'gemini_google_search' | 'ecommerce_grounding_engine';
  outfitTitle: string;
  products: RealProductItem[];
  groundingLinks: { title: string; url: string }[];
  summary: string;
  disclaimer: string;
}

interface RealProductsFinderProps {
  selection: OutfitSelection;
  outfitCode?: string;
  compact?: boolean;
}

export const RealProductsFinder: React.FC<RealProductsFinderProps> = ({
  selection,
  outfitCode,
  compact = false
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<SearchProductsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const garment = GARMENTS.find((g) => g.id === selection.garmentId) || GARMENTS[0];
  const bottom = BOTTOM_PIECES.find((b) => b.id === selection.bottomId) || BOTTOM_PIECES[0];
  const headwear = HEADWEAR_PIECES.find((h) => h.id === selection.headwearId) || HEADWEAR_PIECES[0];
  const footwear = FOOTWEAR_PIECES.find((f) => f.id === selection.footwearId) || FOOTWEAR_PIECES[0];
  const bag = BAG_PIECES.find((b) => b.id === selection.bagId) || BAG_PIECES[0];
  const accessory = ACCESSORY_PIECES.find((a) => a.id === selection.accessoryId) || ACCESSORY_PIECES[0];
  const color = COLORS.find((c) => c.id === selection.colorId) || COLORS[0];
  const style = STYLES.find((s) => s.id === selection.styleId) || STYLES[0];

  const fetchRealProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/gemini/search-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          garmentName: garment.name,
          bottomName: bottom.name,
          footwearName: footwear.name,
          headwearName: headwear.id !== 'head-none' ? headwear.name : undefined,
          bagName: bag.name,
          accessoryName: accessory.name,
          colorName: `${color.name} (${color.vietnameseName})`,
          styleName: style.name,
          outfitCode
        })
      });

      if (!response.ok) {
        throw new Error(`Lỗi tải dữ liệu tìm kiếm (${response.status})`);
      }

      const json: SearchProductsResponse = await response.json();
      setData(json);
    } catch (err: any) {
      console.error('Fetch real products error:', err);
      setError(err?.message || 'Không thể tìm kiếm sản phẩm lúc này');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealProducts();
  }, [selection.garmentId, selection.bottomId, selection.footwearId, selection.colorId, selection.accessoryId]);

  const handleCopyLinks = () => {
    if (!data?.products) return;
    const text = data.products
      .map((p, idx) => `${idx + 1}. [${p.categoryLabel}] ${p.name}\n   Nơi mua: ${p.platform} (${p.estimatedPrice})\n   Link: ${p.url}`)
      .join('\n\n');
    const header = `DANH SÁCH SẢN PHẨM THỰC TẾ CHO BẢN PHỐI: ${data.outfitTitle}\n(Nguồn: Google Search TMĐT qua Việt Phục Remix - Nền tảng không bán hàng)\n\n`;
    navigator.clipboard.writeText(header + text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#8B1E1E]/10 flex items-center justify-center text-[#8B1E1E]">
            <Search size={18} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-[#1E1D1B] tracking-tight">
                Google Search Data · Tìm Mua Sản Phẩm Thực Tế
              </h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#1A73E8]/10 text-[#1A73E8] border border-[#1A73E8]/20 flex items-center gap-1">
                <Sparkles size={10} />
                Live Grounding
              </span>
            </div>
            <p className="text-[11px] text-[#7A7060]">
              Tự động đối chiếu món đồ trong bản phối với sản phẩm trên Shopee, Lazada, Tiki & xưởng may
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {data?.products && (
            <button
              onClick={handleCopyLinks}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-[#D5CABE] text-[#3E382F] hover:bg-[#F2ECE4] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Sao chép toàn bộ link mua sắm"
            >
              {copied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
              <span>{copied ? 'Đã chép link' : 'Sao chép link'}</span>
            </button>
          )}

          <button
            onClick={fetchRealProducts}
            disabled={loading}
            className="p-1.5 rounded-lg text-[#6B6152] hover:text-[#1E1D1B] hover:bg-[#EBE3D7] transition-all cursor-pointer disabled:opacity-50"
            title="Làm mới tìm kiếm"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Prominent Disclaimer Notice ("Chúng tôi không bán") */}
      <div className="p-3 bg-[#FFF9E6] border border-[#FFE082] rounded-xl text-xs text-[#7A5B00] flex items-start gap-2.5">
        <Info size={16} className="text-[#C68A00] shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-[11px] leading-relaxed">
          <span className="font-bold">Lưu ý quan trọng: </span>
          <span>
            Nền tảng Việt Phục Remix chỉ hỗ trợ tìm kiếm và gợi ý liên kết sản phẩm thực tế từ Google Search và các sàn TMĐT uy tín. 
            <strong className="text-[#8B1E1E]"> Chúng tôi không trực tiếp bán, phân phối hoặc nhận hoa hồng từ các sản phẩm này.</strong> Mọi giao dịch được thực hiện trực tiếp trên sàn TMĐT hoặc xưởng bạn chọn.
          </span>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-3.5 bg-white rounded-xl border border-[#E5DDD0] space-y-2.5">
              <div className="h-4 bg-[#EBE3D7] rounded w-2/3" />
              <div className="h-3 bg-[#F2EDE4] rounded w-full" />
              <div className="h-3 bg-[#F2EDE4] rounded w-1/2" />
              <div className="h-7 bg-[#EBE3D7] rounded-lg w-full mt-2" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={fetchRealProducts}
            className="px-3 py-1 bg-red-600 text-white rounded-md text-xs font-semibold cursor-pointer"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Products Grid */}
      {!loading && data?.products && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.products.map((item) => (
              <div
                key={item.id}
                className="group relative p-3.5 bg-white hover:bg-[#FAF8F5] border border-[#E5DDD0] hover:border-[#8B1E1E]/40 rounded-xl transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between space-y-2.5"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1E1E] bg-[#8B1E1E]/8 px-2 py-0.5 rounded-md">
                      {item.categoryLabel}
                    </span>
                    <span className="text-[10px] font-semibold text-[#5A5143] bg-[#EFE9E0] px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Store size={10} />
                      {item.platform}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-[#1E1D1B] group-hover:text-[#8B1E1E] transition-colors line-clamp-1">
                    {item.name}
                  </h4>

                  <div className="flex items-center gap-1.5 mt-1 text-xs text-[#2A6B3A] font-semibold">
                    <Tag size={12} />
                    <span>Giá tham khảo: {item.estimatedPrice}</span>
                  </div>

                  {item.snippet && (
                    <p className="text-[11px] text-[#695F50] mt-1.5 line-clamp-2 leading-relaxed">
                      {item.snippet}
                    </p>
                  )}
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-[#FAF6F0] hover:bg-[#8B1E1E] text-[#8B1E1E] hover:text-white border border-[#E2D6C5] hover:border-[#8B1E1E] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs group-hover:shadow-xs mt-1"
                >
                  <ShoppingBag size={13} />
                  <span>Tìm Mua Trên {item.platform.split('/')[0].trim()}</span>
                  <ExternalLink size={12} className="opacity-75" />
                </a>
              </div>
            ))}
          </div>

          {/* Grounding Source Citation Badges */}
          {data.groundingLinks && data.groundingLinks.length > 0 && (
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DDD0] text-[11px]">
              <div className="font-semibold text-[#5A5143] mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-[#2A6B3A]" />
                <span>Nguồn dữ liệu thực tế đối chiếu qua Google Search:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {data.groundingLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E0D7C9] text-[#473F33] hover:text-[#8B1E1E] hover:border-[#8B1E1E] transition-colors truncate max-w-[280px]"
                  >
                    <ExternalLink size={10} className="shrink-0" />
                    <span className="truncate">{link.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
