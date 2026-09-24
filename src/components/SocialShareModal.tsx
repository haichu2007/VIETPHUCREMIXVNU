import React, { useState, useRef } from 'react';
import { OutfitSelection } from '../types';
import { calculateStyleScore } from '../utils/styleScore';
import { MannequinPreview } from './MannequinPreview';
import { GARMENTS, STYLES, COLORS, BOTTOM_PIECES, FOOTWEAR_PIECES, checkColorHarmony } from '../data/mockData';
import { X, Copy, Check, Download, Image as ImageIcon, Code, Sparkles } from 'lucide-react';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  selection: OutfitSelection;
  outfitCode: string;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  selection,
  outfitCode
}) => {
  const [aspectRatio, setAspectRatio] = useState<'4:5' | '1:1'>('4:5');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const scoreResult = calculateStyleScore(selection);
  const garment = GARMENTS.find((g) => g.id === selection.garmentId) || GARMENTS[0];
  const style = STYLES.find((s) => s.id === selection.styleId) || STYLES[0];
  const color = COLORS.find((c) => c.id === selection.colorId) || COLORS[0];
  const bottom = BOTTOM_PIECES.find((b) => b.id === selection.bottomId) || BOTTOM_PIECES[0];
  const footwear = FOOTWEAR_PIECES.find((f) => f.id === selection.footwearId) || FOOTWEAR_PIECES[0];
  const harmony = checkColorHarmony(selection);

  // 4 curated palette colors for this look
  const paletteSwatches = [
    { name: color.name, hex: color.hex },
    { name: 'Hoàng Kim', hex: '#C89B3C' },
    { name: 'Đen Mực Tàu', hex: '#1E1D1B' },
    { name: 'Trắng Điệp', hex: '#FAF8F5' }
  ];

  const editorialQuote = `Bản phối ${garment.name} kết hợp phong cách ${style.name} mang lại sự thăng hoa giữa phom dáng cổ điển và nhịp đập Gen Z. Tỷ lệ di sản đạt ${scoreResult.traditionalScore}% chuẩn mực.`;

  // Draw high-res Lookbook card onto Canvas API and export as PNG
  const renderLookbookToCanvas = async (): Promise<HTMLCanvasElement> => {
    const isPortrait = aspectRatio === '4:5';
    const width = 1080;
    const height = isPortrait ? 1350 : 1080;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    // 1. Background Fill (Paper Tone)
    ctx.fillStyle = '#FAF8F5';
    ctx.fillRect(0, 0, width, height);

    // Subtle paper border
    ctx.strokeStyle = '#E5DDD0';
    ctx.lineWidth = 16;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    // Inner double hairline
    ctx.strokeStyle = '#1E1D1B';
    ctx.lineWidth = 2;
    ctx.strokeRect(36, 36, width - 72, height - 72);

    // 2. Header Brand Section
    ctx.fillStyle = '#1E1D1B';
    ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
    ctx.textAlign = 'left';
    ctx.fillText('VIỆT PHỤC REMIX', 60, 95);

    ctx.fillStyle = '#8B1E1E';
    ctx.font = 'bold 20px "Be Vietnam Pro", sans-serif';
    ctx.fillText(outfitCode || 'BẢN PHỐI DI SẢN #027', 60, 125);

    // Header Right Badge
    ctx.fillStyle = '#1E1D1B';
    ctx.font = 'bold 18px "Be Vietnam Pro", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(style.name.toUpperCase(), width - 60, 95);
    ctx.fillStyle = '#7A7061';
    ctx.font = '16px "Be Vietnam Pro", sans-serif';
    ctx.fillText('LOOKBOOK 2026', width - 60, 122);

    // Horizontal divider
    ctx.strokeStyle = '#D5CABE';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(60, 145);
    ctx.lineTo(width - 60, 145);
    ctx.stroke();

    // 3. Central Visual (Vector Mannequin SVG Render)
    const svgElem = cardRef.current?.querySelector('svg');
    if (svgElem) {
      const svgData = new XMLSerializer().serializeToString(svgElem);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();

      await new Promise<void>((resolve) => {
        img.onload = () => {
          const mannequinW = isPortrait ? 480 : 380;
          const mannequinH = isPortrait ? 640 : 500;
          const posX = (width - mannequinW) / 2;
          const posY = isPortrait ? 170 : 160;
          ctx.drawImage(img, posX, posY, mannequinW, mannequinH);
          URL.revokeObjectURL(url);
          resolve();
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          resolve();
        };
        img.src = url;
      });
    }

    // 4. Metrics & Score Bars
    const bottomSectionY = isPortrait ? 840 : 680;

    // Divider line
    ctx.strokeStyle = '#D5CABE';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(60, bottomSectionY);
    ctx.lineTo(width - 60, bottomSectionY);
    ctx.stroke();

    // Metric 1: Di Sản (Heritage)
    ctx.fillStyle = '#5A5143';
    ctx.font = 'bold 16px "Be Vietnam Pro", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('ĐIỂM DI SẢN', 60, bottomSectionY + 35);
    ctx.fillStyle = '#8B1E1E';
    ctx.font = 'bold 22px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`${scoreResult.traditionalScore}%`, 60, bottomSectionY + 65);
    // Bar
    ctx.fillStyle = '#E5DDD0';
    ctx.fillRect(60, bottomSectionY + 75, 260, 8);
    ctx.fillStyle = '#8B1E1E';
    ctx.fillRect(60, bottomSectionY + 75, (260 * scoreResult.traditionalScore) / 100, 8);

    // Metric 2: Hiện Đại (Modernity)
    ctx.fillStyle = '#5A5143';
    ctx.font = 'bold 16px "Be Vietnam Pro", sans-serif';
    ctx.fillText('TÍNH HIỆN ĐẠI', 380, bottomSectionY + 35);
    ctx.fillStyle = '#1E1D1B';
    ctx.font = 'bold 22px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`${scoreResult.modernScore}%`, 380, bottomSectionY + 65);
    // Bar
    ctx.fillStyle = '#E5DDD0';
    ctx.fillRect(380, bottomSectionY + 75, 260, 8);
    ctx.fillStyle = '#23395B';
    ctx.fillRect(380, bottomSectionY + 75, (260 * scoreResult.modernScore) / 100, 8);

    // Metric 3: Cá Tính (Individuality)
    ctx.fillStyle = '#5A5143';
    ctx.font = 'bold 16px "Be Vietnam Pro", sans-serif';
    ctx.fillText('CÁ TÍNH GEN Z', 700, bottomSectionY + 35);
    ctx.fillStyle = '#C89B3C';
    ctx.font = 'bold 22px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`${scoreResult.individualityScore}%`, 700, bottomSectionY + 65);
    // Bar
    ctx.fillStyle = '#E5DDD0';
    ctx.fillRect(700, bottomSectionY + 75, 260, 8);
    ctx.fillStyle = '#C89B3C';
    ctx.fillRect(700, bottomSectionY + 75, (260 * scoreResult.individualityScore) / 100, 8);

    // 5. Palette Swatches
    const paletteY = bottomSectionY + 115;
    ctx.fillStyle = '#7A7061';
    ctx.font = 'bold 14px "Be Vietnam Pro", sans-serif';
    ctx.fillText('BẢNG MÀU CHỦ ĐẠO:', 60, paletteY + 20);

    paletteSwatches.forEach((swatch, idx) => {
      const sx = 230 + idx * 180;
      ctx.fillStyle = swatch.hex;
      ctx.fillRect(sx, paletteY, 40, 24);
      ctx.strokeStyle = '#D5CABE';
      ctx.strokeRect(sx, paletteY, 40, 24);

      ctx.fillStyle = '#1E1D1B';
      ctx.font = 'bold 14px "Be Vietnam Pro", sans-serif';
      ctx.fillText(swatch.name, sx + 50, paletteY + 16);
    });

    // 6. Editorial Explanation
    const editorialY = isPortrait ? 1040 : 870;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(60, editorialY, width - 120, isPortrait ? 160 : 120);
    ctx.strokeStyle = '#E5DDD0';
    ctx.strokeRect(60, editorialY, width - 120, isPortrait ? 160 : 120);

    ctx.fillStyle = '#8B1E1E';
    ctx.font = 'bold 15px "Be Vietnam Pro", sans-serif';
    ctx.fillText('VÌ SAO BẢN PHỐI NÀY HIỆU QUẢ:', 85, editorialY + 32);

    ctx.fillStyle = '#3A332A';
    ctx.font = 'italic 18px "Playfair Display", Georgia, serif';
    ctx.fillText(`“${editorialQuote}”`, 85, editorialY + 68);

    ctx.fillStyle = '#7A7061';
    ctx.font = '14px "Be Vietnam Pro", sans-serif';
    ctx.fillText(
      `Cấu trúc: ${garment.name} · ${bottom.name} · ${footwear.name}`,
      85,
      editorialY + 102
    );

    // 7. Footer Stamp & Author
    const footerY = height - 55;
    ctx.fillStyle = '#1E1D1B';
    ctx.font = 'bold 16px "Be Vietnam Pro", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Tác giả: Gen Z Heritage Stylist', 60, footerY);

    ctx.fillStyle = '#7A7061';
    ctx.font = '14px "Be Vietnam Pro", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('VIỆT PHỤC REMIX — BẢO TỒN ĐỘNG DI SẢN', width - 60, footerY);

    return canvas;
  };

  // 1. Download PNG
  const handleDownloadPng = async () => {
    setIsExporting(true);
    try {
      const canvas = await renderLookbookToCanvas();
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `viet-phuc-remix-${outfitCode.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading lookbook card:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // 2. Copy Image to Clipboard
  const handleCopyImage = async () => {
    setIsExporting(true);
    try {
      const canvas = await renderLookbookToCanvas();
      canvas.toBlob(async (blob) => {
        if (blob && navigator.clipboard && (window as any).ClipboardItem) {
          await navigator.clipboard.write([
            new (window as any).ClipboardItem({ 'image/png': blob })
          ]);
          setCopiedImage(true);
          setTimeout(() => setCopiedImage(false), 2500);
        } else {
          navigator.clipboard?.writeText?.(window.location.href);
          setCopiedLink(true);
          setTimeout(() => setCopiedLink(false), 2500);
        }
      }, 'image/png');
    } catch (err) {
      console.error('Clipboard image copy error:', err);
      navigator.clipboard?.writeText?.(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } finally {
      setIsExporting(false);
    }
  };

  // 3. Copy Recipe JSON
  const handleCopyJson = () => {
    const payload = JSON.stringify(selection, null, 2);
    navigator.clipboard?.writeText?.(payload);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
        <div className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl shadow-2xl overflow-hidden max-h-[96vh] flex flex-col">
          {/* Modal Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5DDD0] bg-[#F4EFEA]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#8B1E1E] uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={13} />
                  <span>Editorial Lookbook Studio</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                  Xuất Thẻ PNG Chuẩn Mạng Xã Hội
                </span>
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#1E1D1B]">
                Thẻ Lookbook Việt Phục Di Sản
              </h3>
            </div>

            {/* Aspect Ratio Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-[#E5DDD0]">
              <button
                onClick={() => setAspectRatio('4:5')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                  aspectRatio === '4:5'
                    ? 'bg-[#8B1E1E] text-white shadow-2xs'
                    : 'text-[#6E6556] hover:text-[#1E1D1B]'
                }`}
              >
                4:5 Story
              </button>
              <button
                onClick={() => setAspectRatio('1:1')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                  aspectRatio === '1:1'
                    ? 'bg-[#8B1E1E] text-white shadow-2xs'
                    : 'text-[#6E6556] hover:text-[#1E1D1B]'
                }`}
              >
                1:1 Vuông
              </button>

              <button
                onClick={onClose}
                className="p-1 rounded-full text-[#756B5D] hover:text-[#1E1D1B] hover:bg-[#EBE3D7]/60 transition-colors cursor-pointer ml-1"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Scrollable Preview Area */}
          <div className="p-4 sm:p-6 overflow-y-auto flex flex-col items-center">
            {/* Visual Mode Indicator */}
            <div className="w-full max-w-[440px] flex items-center justify-between mb-3 px-1 text-xs">
              <span className="text-[#695F50] font-medium flex items-center gap-1">
                Người mẫu hiển thị:
                <strong className="text-[#1E1D1B]">Ma-nơ-canh Vector Chuẩn Phom</strong>
              </span>
            </div>

            {/* THE CARD PREVIEW */}
            <div
              ref={cardRef}
              className={`w-full bg-[#FAF8F5] border-2 border-[#1E1D1B] rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between relative transition-all ${
                aspectRatio === '4:5' ? 'max-w-[420px] aspect-[4/5]' : 'max-w-[440px] aspect-square'
              }`}
            >
              {/* Inner frame */}
              <div className="absolute inset-1.5 border border-[#E5DDD0] rounded-xl pointer-events-none" />

              {/* Top Brand Header */}
              <div className="flex items-center justify-between border-b border-[#1E1D1B]/20 pb-3 z-10">
                <div>
                  <span className="font-editorial text-sm sm:text-base font-black tracking-widest text-[#1E1D1B] uppercase block">
                    VIỆT PHỤC REMIX
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-[#8B1E1E] font-bold">
                    {outfitCode}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-semibold text-[#1E1D1B] px-2.5 py-0.5 border border-[#1E1D1B] rounded-sm bg-white">
                    {style.name}
                  </span>
                  <span className="text-[9px] text-[#7A7061] block mt-0.5">
                    LOOKBOOK 2026
                  </span>
                </div>
              </div>

              {/* Center Visual: Vector Mannequin */}
              <div className="my-auto h-[220px] sm:h-[260px] w-full flex items-center justify-center z-10">
                <MannequinPreview selection={selection} interactive={false} compact={true} />
              </div>

              {/* 3 Metric Score Bars */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#1E1D1B]/15 z-10 bg-white/70 backdrop-blur-2xs rounded-lg px-2">
                <div>
                  <span className="text-[9px] uppercase font-bold text-[#6E6556] block">Di Sản</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-xs font-bold text-[#8B1E1E]">
                      {scoreResult.traditionalScore}%
                    </span>
                  </div>
                  <div className="w-full bg-[#E5DDD0] h-1.5 rounded-full overflow-hidden mt-0.5">
                    <div className="bg-[#8B1E1E] h-full" style={{ width: `${scoreResult.traditionalScore}%` }} />
                  </div>
                </div>

                <div>
                  <span className="text-[9px] uppercase font-bold text-[#6E6556] block">Hiện Đại</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-xs font-bold text-[#23395B]">
                      {scoreResult.modernScore}%
                    </span>
                  </div>
                  <div className="w-full bg-[#E5DDD0] h-1.5 rounded-full overflow-hidden mt-0.5">
                    <div className="bg-[#23395B] h-full" style={{ width: `${scoreResult.modernScore}%` }} />
                  </div>
                </div>

                <div>
                  <span className="text-[9px] uppercase font-bold text-[#6E6556] block">Cá Tính</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-xs font-bold text-[#C89B3C]">
                      {scoreResult.individualityScore}%
                    </span>
                  </div>
                  <div className="w-full bg-[#E5DDD0] h-1.5 rounded-full overflow-hidden mt-0.5">
                    <div className="bg-[#C89B3C] h-full" style={{ width: `${scoreResult.individualityScore}%` }} />
                  </div>
                </div>
              </div>

              {/* 4 Palette Swatches */}
              <div className="flex items-center justify-between py-2 z-10">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#7A7061]">Bảng màu:</span>
                <div className="flex items-center gap-1.5">
                  {paletteSwatches.map((swatch, idx) => (
                    <div key={idx} className="flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border border-[#E5DDD0]">
                      <div className="w-2.5 h-2.5 rounded-full border border-black/15" style={{ backgroundColor: swatch.hex }} />
                      <span className="text-[8px] font-semibold text-[#1E1D1B]">{swatch.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Editorial Paragraph */}
              <div className="border-t border-[#1E1D1B]/20 pt-2.5 z-10">
                <p className="font-editorial text-xs sm:text-[13px] font-bold text-[#1E1D1B] leading-snug line-clamp-2">
                  “{editorialQuote}”
                </p>
                <div className="flex items-center justify-between mt-1 text-[9px] text-[#7A7061]">
                  <span className="font-medium">Gen Z Heritage Stylist</span>
                  <span className="font-mono text-[#8B1E1E]">BẢO TỒN ĐỘNG DI SẢN</span>
                </div>
              </div>
            </div>

            {/* Action buttons (Download, Copy, Code) */}
            <div className="w-full max-w-[440px] grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-5">
              {/* Download PNG */}
              <button
                onClick={handleDownloadPng}
                disabled={isExporting}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#8B1E1E] hover:bg-[#721717] disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer active:scale-98"
              >
                <Download size={14} />
                <span>{isExporting ? 'Đang xuất...' : 'Tải thẻ PNG'}</span>
              </button>

              {/* Copy image to clipboard */}
              <button
                onClick={handleCopyImage}
                disabled={isExporting}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-[#D5CABE] hover:bg-[#F4EFEA] text-[#1E1D1B] text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                {copiedImage ? (
                  <>
                    <Check size={14} className="text-emerald-700" />
                    <span className="text-emerald-800">Đã sao chép!</span>
                  </>
                ) : (
                  <>
                    <ImageIcon size={14} />
                    <span>Sao chép ảnh</span>
                  </>
                )}
              </button>

              {/* Copy recipe JSON */}
              <button
                onClick={handleCopyJson}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#FAF8F5] border border-[#D5CABE] hover:bg-[#F4EFEA] text-[#1E1D1B] text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                {copiedJson ? (
                  <>
                    <Check size={14} className="text-emerald-700" />
                    <span className="text-emerald-800">Đã chép mã!</span>
                  </>
                ) : (
                  <>
                    <Code size={14} />
                    <span>Mã công thức</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
