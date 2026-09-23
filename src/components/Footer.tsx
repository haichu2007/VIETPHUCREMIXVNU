import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'remix' | 'discover' | 'ai' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1E1D1B] text-[#FAF8F5] border-t border-[#33312E] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#383531]">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-sm bg-[#8B1E1E] flex items-center justify-center font-serif font-bold text-white text-base">
                V
              </div>
              <span className="font-editorial text-xl font-bold tracking-tight">
                VIỆT PHỤC REMIX
              </span>
            </div>
            <p className="text-xs text-[#B5ABA0] max-w-sm leading-relaxed">
              “Việt phục truyền thống. Phong cách của bạn.” — Nền tảng kết nối di sản phục trang cổ truyền Việt Nam với tư duy thẩm mỹ và phong cách thời trang của thế hệ Gen Z.
            </p>
            <div className="text-[11px] text-[#8E8478] pt-1">
              Sản phẩm dự thi Sáng tạo Ý tưởng & Ứng dụng Văn hóa Số.
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C89B3C] block mb-3">
              Tính Năng Trọng Tâm
            </span>
            <ul className="space-y-1.5 text-xs text-[#D8CEBE]">
              <li>
                <button
                  onClick={() => onNavigate('remix')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Phòng Thử Đồ Kỹ Thuật Số (Digital Dressing Room)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ai')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  AI Remix Stylist
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('discover')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Khám Phá Bản Phối Cộng Đồng (12+ Outfits)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bách Khoa Cổ Phục & Bảng Màu Di Sản
                </button>
              </li>
            </ul>
          </div>

          {/* Heritage Philosophy */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C89B3C] block mb-3">
              Thông Điệp Tôn Vinh Di Sản
            </span>
            <p className="text-xs text-[#B5ABA0] leading-relaxed italic border-l border-[#8B1E1E] pl-3 py-0.5">
              “Tôn trọng quá khứ không đồng nghĩa với việc đóng băng nó trong tủ kính. Di sản chỉ sống động và trường tồn khi được người trẻ mặc bằng tất cả sự tự hào và sáng tạo.”
            </p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#80776D] gap-3">
          <p>© {new Date().getFullYear()} Việt Phục Remix. All cultural heritage designs inspired by Vietnamese history.</p>
          <div className="flex items-center gap-1">
            <span>Dành trọn tâm huyết cho di sản Việt Nam</span>
            <Heart size={12} className="text-[#8B1E1E] fill-[#8B1E1E]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
