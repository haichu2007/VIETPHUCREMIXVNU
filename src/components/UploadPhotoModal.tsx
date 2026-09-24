import React, { useState, useRef } from 'react';
import { OutfitSelection } from '../types';
import { Upload, X, Camera, Check, Sparkles, Image as ImageIcon, RotateCcw, AlertCircle } from 'lucide-react';

interface UploadPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  selection: OutfitSelection;
  onApplyPhoto: (photoUrl: string | undefined) => void;
}

const SAMPLE_AVATAR_FACES = [
  {
    id: 'sample-1',
    name: 'Nữ Thanh Lịch',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    desc: 'Chân dung góc nghiêng thanh thoát Á Đông'
  },
  {
    id: 'sample-2',
    name: 'Nữ Hiện Đại Gen Z',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    desc: 'Ánh nhìn tự tin, thần thái thời trang đường phố'
  },
  {
    id: 'sample-3',
    name: 'Nam Thư Sinh',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    desc: 'Gương mặt thư sinh tuấn tú, đường nét sắc sảo'
  },
  {
    id: 'sample-4',
    name: 'Nam Lãng Tử',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    desc: 'Phong trần, cuốn hút, hợp phong cách Heritage'
  }
];

export const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({
  isOpen,
  onClose,
  selection,
  onApplyPhoto
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | undefined>(selection.customPhotoUrl);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setSelectedPhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setSelectedPhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onApplyPhoto(selectedPhoto);
    onClose();
  };

  const handleRemove = () => {
    setSelectedPhoto(undefined);
    onApplyPhoto(undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E5DDD0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#8B1E1E]/10 text-[#8B1E1E] flex items-center justify-center border border-[#8B1E1E]/20">
              <Upload size={16} />
            </div>
            <div>
              <h3 className="font-editorial text-lg font-bold text-[#1E1D1B]">
                Tải Ảnh Người Mẫu Cá Nhân
              </h3>
              <p className="text-xs text-[#7A7061]">
                Ghép khuôn mặt thật vào ma-nơ-canh Việt Phục Remix
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8A7F6E] hover:text-[#1E1D1B] hover:bg-[#F4EFEA] rounded-lg transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Active Preview cameo */}
          <div className="flex flex-col items-center justify-center p-4 bg-[#F4EFEA] rounded-xl border border-[#E5DDD0] text-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#8B1E1E] shadow-md bg-white mb-2 flex items-center justify-center">
              {selectedPhoto ? (
                <img
                  src={selectedPhoto}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-[#8C8270]">
                  <ImageIcon size={28} />
                  <span className="text-[9px] mt-1 font-semibold">Chưa có ảnh</span>
                </div>
              )}
            </div>
            <span className="text-xs font-bold text-[#1E1D1B]">
              {selectedPhoto ? 'Đã chọn ảnh đại diện' : 'Sử dụng khuôn mặt mặc định'}
            </span>
            <span className="text-[11px] text-[#7A7061] mt-0.5">
              Ảnh sẽ hiển thị trong khung tròn cameo trên ma-nơ-canh ảo
            </span>
          </div>

          {/* Upload Dropzone */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B] block mb-2">
              Tải Ảnh Từ Thiết Bị (PNG, JPG, WEBP)
            </label>
            <div
              onDragEnter={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragActive(false);
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 ring-2 ring-[#8B1E1E]/20'
                  : 'border-[#D5CABE] bg-white hover:border-[#8B1E1E] hover:bg-[#FAF8F5]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5] text-[#8B1E1E] flex items-center justify-center mb-2 border border-[#E5DDD0]">
                <Camera size={20} />
              </div>
              <p className="text-xs font-bold text-[#1E1D1B]">
                Nhấn để chọn ảnh hoặc kéo thả vào đây
              </p>
              <p className="text-[11px] text-[#7A7061] mt-1">
                Khuyến nghị: Ảnh chân dung chính diện hoặc góc 3/4 rõ nét
              </p>
            </div>
          </div>

          {/* Sample preset models */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#1E1D1B] block mb-2">
              Hoặc Chọn Ảnh Mẫu Có Sẵn
            </label>
            <div className="grid grid-cols-2 gap-2">
              {SAMPLE_AVATAR_FACES.map((sample) => {
                const isSelected = selectedPhoto === sample.url;
                return (
                  <button
                    key={sample.id}
                    onClick={() => setSelectedPhoto(sample.url)}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#8B1E1E] bg-[#8B1E1E]/5 ring-1 ring-[#8B1E1E]/30'
                        : 'border-[#E5DDD0] bg-white hover:border-[#CFC2B0]'
                    }`}
                  >
                    <img
                      src={sample.url}
                      alt={sample.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0 border border-black/10"
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[#1E1D1B] block truncate">
                        {sample.name}
                      </span>
                      <span className="text-[10px] text-[#7A7061] block truncate">
                        {sample.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#E5DDD0] bg-white flex items-center justify-between gap-2">
          {selection.customPhotoUrl && (
            <button
              onClick={handleRemove}
              className="px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw size={13} />
              <span>Gỡ ảnh</span>
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#554E41] hover:bg-[#F4EFEA] rounded-lg transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-xs font-bold text-white bg-[#8B1E1E] hover:bg-[#721717] rounded-lg transition-all shadow-xs cursor-pointer flex items-center gap-1.5 active:scale-98"
            >
              <Check size={14} />
              <span>Áp Dụng Cho Ma-nơ-canh</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
