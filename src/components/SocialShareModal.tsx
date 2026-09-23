import React, { useState } from 'react';
import { OutfitSelection } from '../types';
import { calculateStyleScore } from '../utils/styleScore';
import { MannequinPreview } from './MannequinPreview';
import { GARMENTS, STYLES, COLORS } from '../data/mockData';
import { X, Copy, Check, Download, QrCode } from 'lucide-react';

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
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const scoreResult = calculateStyleScore(selection);
  const garment = GARMENTS.find((g) => g.id === selection.garmentId) || GARMENTS[0];
  const style = STYLES.find((s) => s.id === selection.styleId) || STYLES[0];
  const color = COLORS.find((c) => c.id === selection.colorId) || COLORS[0];

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5DDD0]">
          <div>
            <h3 className="font-editorial text-lg font-bold text-[#1E1D1B]">
              Thẻ Chia Sẻ Mạng Xã Hội
            </h3>
            <p className="text-xs text-[#7A7061]">Tỉ lệ 4:5 chuẩn Instagram Story & TikTok</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#756B5D] hover:text-[#1E1D1B] hover:bg-[#EBE3D7]/60 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* The 4:5 Social Card Container (designed for crisp screenshot / download) */}
        <div className="p-6 overflow-y-auto flex flex-col items-center">
          <div
            id="social-share-card"
            className="w-full max-w-[340px] aspect-[4/5] bg-[#F7F4EE] border-2 border-[#1E1D1B] rounded-xl p-5 shadow-lg flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top Brand Header */}
            <div className="flex items-center justify-between border-b border-[#1E1D1B]/20 pb-3">
              <div>
                <span className="font-editorial text-sm font-black tracking-widest text-[#1E1D1B] uppercase block">
                  VIỆT PHỤC REMIX
                </span>
                <span className="text-[9px] tracking-widest uppercase text-[#8B1E1E] font-bold">
                  {outfitCode}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-semibold text-[#1E1D1B] px-2 py-0.5 border border-[#1E1D1B] rounded-sm">
                  {style.name}
                </span>
              </div>
            </div>

            {/* Center Mannequin Visual */}
            <div className="my-auto h-[210px] w-full flex items-center justify-center">
              <MannequinPreview selection={selection} interactive={false} compact={true} />
            </div>

            {/* Bottom Statement & Stamp */}
            <div className="border-t border-[#1E1D1B]/20 pt-3">
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-editorial text-base font-bold text-[#1E1D1B] leading-tight">
                    “Traditional roots.
                    <br />
                    Gen Z attitude.”
                  </p>
                  <p className="text-[10px] text-[#696154] mt-1 font-medium">
                    {garment.name} · {color.name} · Score {scoreResult.traditionalScore}/{scoreResult.modernScore}
                  </p>
                </div>

                {/* Simulated Stamp / QR Code */}
                <div className="w-12 h-12 border border-[#1E1D1B] p-1 bg-white flex flex-col items-center justify-center text-center shrink-0">
                  <QrCode size={30} className="text-[#1E1D1B]" />
                  <span className="text-[7px] font-mono text-[#8B1E1E] font-bold mt-0.5">REMIX</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="w-full max-w-[340px] flex items-center gap-3 mt-4">
            <button
              onClick={handleCopyLink}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#FAF8F5] border border-[#D5CABE] hover:bg-[#EFE7DC] text-[#1E1D1B] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check size={14} className="text-green-700" /> : <Copy size={14} />}
              <span>{copied ? 'Đã sao chép link!' : 'Sao chép link'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#8B1E1E] hover:bg-[#721717] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              {downloadSuccess ? <Check size={14} /> : <Download size={14} />}
              <span>{downloadSuccess ? 'Đã lưu ảnh!' : 'Tải thẻ ảnh'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
