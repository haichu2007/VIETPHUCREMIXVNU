import React, { useState } from 'react';
import { CulturalIntegrityCheck } from '../types';
import { ShieldCheck, AlertTriangle, AlertCircle, Info, ChevronRight, X, Sparkles } from 'lucide-react';

interface CulturalWarningAlertProps {
  checkResult: CulturalIntegrityCheck;
  onApplySuggestion?: () => void;
}

export const CulturalWarningAlert: React.FC<CulturalWarningAlertProps> = ({
  checkResult
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // If safe, render clean, reassuring badge
  if (checkResult.isSafe) {
    return (
      <div className="bg-[#FAF8F5] border border-[#E5DDD0] rounded-xl p-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
            <ShieldCheck size={15} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#1E1D1B]">
                {checkResult.title}
              </span>
              <span className="text-[10px] bg-emerald-100/70 text-emerald-800 font-semibold px-1.5 py-0.5 rounded-xs">
                Chuẩn Mực
              </span>
            </div>
            <p className="text-[11px] text-[#696052] line-clamp-1 mt-0.5">
              Tôn trọng cấu trúc cổ phục và tinh thần văn hóa dân tộc.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="text-xs text-[#8B1E1E] hover:underline font-semibold flex items-center gap-1 shrink-0 ml-2 cursor-pointer"
        >
          <span>Chi tiết</span>
          <ChevronRight size={13} />
        </button>

        {/* Modal Info */}
        {isModalOpen && (
          <CulturalDetailModal
            checkResult={checkResult}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    );
  }

  // If caution or warning, render attention-grabbing but respectful banner
  const isWarning = checkResult.severity === 'warning';

  return (
    <>
      <div
        className={`rounded-xl p-3.5 border transition-all shadow-xs ${
          isWarning
            ? 'bg-amber-50/90 border-amber-300 text-amber-950'
            : 'bg-orange-50/80 border-orange-200 text-orange-950'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                isWarning ? 'bg-amber-200/80 text-amber-900' : 'bg-orange-200/80 text-orange-900'
              }`}
            >
              {isWarning ? <AlertTriangle size={15} /> : <AlertCircle size={15} />}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wide">
                  {checkResult.title}
                </span>
                <span
                  className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-xs ${
                    isWarning ? 'bg-amber-200 text-amber-900' : 'bg-orange-200 text-orange-900'
                  }`}
                >
                  {isWarning ? 'Lưu ý tôn nghiêm' : 'Cân nhắc hài hòa'}
                </span>
              </div>
              <p className="text-xs mt-1 leading-relaxed opacity-90 line-clamp-2">
                {checkResult.message}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-2.5 py-1 text-[11px] font-bold bg-white hover:bg-amber-100/50 rounded-lg border border-amber-300 shadow-2xs shrink-0 cursor-pointer transition-colors"
          >
            Đọc & Gợi ý
          </button>
        </div>
      </div>

      {isModalOpen && (
        <CulturalDetailModal
          checkResult={checkResult}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

interface CulturalDetailModalProps {
  checkResult: CulturalIntegrityCheck;
  onClose: () => void;
}

const CulturalDetailModal: React.FC<CulturalDetailModalProps> = ({ checkResult, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border border-[#E5DDD0] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-[#E5DDD0] flex items-center justify-between bg-[#F4EFEA]">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                checkResult.isSafe
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {checkResult.isSafe ? <ShieldCheck size={16} /> : <AlertTriangle size={16} />}
            </div>
            <h3 className="font-editorial text-lg font-bold text-[#1E1D1B]">
              Bảo Tồn Bản Sắc & Chuẩn Mực Văn Hóa
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#786F62] hover:text-[#1E1D1B] rounded-lg transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs text-[#453D32]">
          <div>
            <span className="font-bold text-[#1E1D1B] text-sm block mb-1">
              {checkResult.title}
            </span>
            <p className="leading-relaxed text-[#554D40]">
              {checkResult.message}
            </p>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-[#E5DDD0] space-y-2">
            <span className="font-bold uppercase tracking-wider text-[#8B1E1E] text-[10px] block">
              Cơ sở lịch sử & ngữ cảnh văn hóa:
            </span>
            <p className="leading-relaxed">
              {checkResult.reason}
            </p>
            <div className="text-[10px] text-[#786E5F] italic pt-1 border-t border-[#F0EAE1]">
              Trích xuất tài liệu tham chiếu: {checkResult.culturalContextRef}
            </div>
          </div>

          <div className="p-3.5 bg-[#8B1E1E]/5 rounded-xl border border-[#8B1E1E]/20 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#8B1E1E] font-bold text-xs">
              <Sparkles size={13} />
              <span>Gợi ý cách phối hiện đại mà vẫn tôn trọng di sản:</span>
            </div>
            <p className="leading-relaxed text-[#4A3F33]">
              {checkResult.respectfulSuggestion}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E5DDD0] bg-[#F4EFEA] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#8B1E1E] hover:bg-[#721717] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            Đã hiểu & Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
};
