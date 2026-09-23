import React, { useState } from 'react';
import { GARMENTS, COLORS } from '../data/mockData';
import { BookOpen, Sparkles, Compass, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [selectedGarmentIndex, setSelectedGarmentIndex] = useState(0);
  const activeGarment = GARMENTS[selectedGarmentIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Editorial Heading */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1E1E]/8 text-[#8B1E1E] text-xs font-semibold uppercase tracking-wider mb-3">
          <BookOpen size={13} />
          <span>Hồ Sơ Di Sản Văn Hóa</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#1E1D1B] tracking-tight">
          Cổ Phục Việt & Tinh Thần Đương Đại
        </h2>
        <p className="text-base text-[#5A5143] mt-3 leading-relaxed">
          “Văn hóa truyền thống không phải là di vật tĩnh lặng trong bảo tàng; văn hóa chỉ thực sự sống khi được thế hệ tiếp nối tự hào mặc lên người trong nhịp sống hôm nay.”
        </p>
      </div>

      {/* 4 Pillars of Product Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#8B1E1E]/10 text-[#8B1E1E] flex items-center justify-center mb-4">
            <ShieldCheck size={20} />
          </div>
          <h3 className="font-editorial text-lg font-bold text-[#1E1D1B] mb-2">
            1. Tôn Trọng Chuẩn Mực
          </h3>
          <p className="text-xs text-[#63594A] leading-relaxed">
            Mỗi phom áo ngũ thân, tứ thân, giao lĩnh đều được mô phỏng cấu trúc, số lượng cúc và ý nghĩa nhân sinh quan chuẩn xác từ tư liệu lịch sử.
          </p>
        </div>

        <div className="bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#23395B]/10 text-[#23395B] flex items-center justify-center mb-4">
            <Compass size={20} />
          </div>
          <h3 className="font-editorial text-lg font-bold text-[#1E1D1B] mb-2">
            2. Giải Phóng Ứng Dụng
          </h3>
          <p className="text-xs text-[#63594A] leading-relaxed">
            Tháo gỡ định kiến cổ phục chỉ để mặc chụp ảnh Tết hay lễ nghi trang trọng. Cổ phục hoàn toàn có thể bước ra phố, đi học, cafe, đi festival.
          </p>
        </div>

        <div className="bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#C89B3C]/10 text-[#C89B3C] flex items-center justify-center mb-4">
            <Sparkles size={20} />
          </div>
          <h3 className="font-editorial text-lg font-bold text-[#1E1D1B] mb-2">
            3. Trao Quyền Cho Gen Z
          </h3>
          <p className="text-xs text-[#63594A] leading-relaxed">
            Giới trẻ không muốn sự áp đặt bảo thủ; họ cần một công cụ trực quan để tự mình sáng tạo, thể hiện bản sắc cá nhân mà vẫn thấu cảm cội nguồn.
          </p>
        </div>

        <div className="bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#1E382B]/10 text-[#1E382B] flex items-center justify-center mb-4">
            <HeartHandshake size={20} />
          </div>
          <h3 className="font-editorial text-lg font-bold text-[#1E1D1B] mb-2">
            4. Trực Quan Hóa Tương Tác
          </h3>
          <p className="text-xs text-[#63594A] leading-relaxed">
            Thay vì những trang lý thuyết nặng nề, công nghệ phòng thử đồ kỹ thuật số giúp việc tiếp cận di sản trở nên cuốn hút, dễ hiểu chỉ sau một cú chạm.
          </p>
        </div>
      </div>

      {/* Garments Comprehensive Glossary */}
      <div className="bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl p-6 sm:p-8 shadow-xs mb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#E5DDD0] mb-6 gap-4">
          <div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E1D1B]">
              Bách Khoa Cổ Phục Việt
            </h3>
            <p className="text-xs text-[#736858] mt-1">
              Khám phá chi tiết cấu trúc, thời kỳ và câu chuyện lịch sử của từng kiểu trang phục.
            </p>
          </div>

          {/* Garment Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {GARMENTS.map((g, idx) => (
              <button
                key={g.id}
                onClick={() => setSelectedGarmentIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedGarmentIndex === idx
                    ? 'bg-[#8B1E1E] text-white shadow-xs'
                    : 'bg-[#F4EFEA] hover:bg-[#EAE2D4] text-[#554D3F] border border-[#E0D5C3]'
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Garment Detail View */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="text-[11px] font-mono text-[#8B1E1E] uppercase font-bold tracking-wider">
                {activeGarment.era}
              </span>
              <h4 className="font-editorial text-2xl font-bold text-[#1E1D1B] mt-0.5">
                {activeGarment.vietnameseName}
              </h4>
              <p className="text-xs text-[#7A7061] italic">{activeGarment.englishSub}</p>
            </div>

            <p className="text-xs sm:text-sm text-[#3E382E] leading-relaxed">
              {activeGarment.culturalContext}
            </p>

            <div className="bg-[#F4EFEA] p-4 rounded-xl border border-[#E5DDD0]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#574E41] block mb-2">
                Đặc trưng cấu trúc may đo:
              </span>
              <ul className="space-y-1.5 text-xs text-[#473F33]">
                {activeGarment.structureDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E1E] mt-1.5 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#8B1E1E]/5 p-4 rounded-xl border border-[#8B1E1E]/15">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E1E] block mb-1">
                Gợi ý phối đồ cho Gen Z:
              </span>
              <p className="text-xs text-[#4A4235] leading-relaxed">
                {activeGarment.modernTips}
              </p>
            </div>
          </div>

          <div className="md:col-span-5 bg-[#F4EFEA] rounded-2xl p-6 border border-[#E5DDD0] text-center flex flex-col items-center justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#786E5F] mb-4">
              Ý Nghĩa Tượng Trưng
            </span>

            {activeGarment.id === 'ao-ngu-than' && (
              <div className="space-y-3 text-xs text-[#453D32] text-left">
                <div className="p-3 bg-white rounded-lg border border-[#E5DDD0]">
                  <strong className="text-[#8B1E1E] block mb-0.5">5 Thân Áo:</strong>
                  Tượng trưng cho Tứ thân phụ mẫu (cha mẹ đôi bên) và chính bản thân người mặc ở trung tâm.
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E5DDD0]">
                  <strong className="text-[#8B1E1E] block mb-0.5">5 Hạt Cúc (Ngũ Thường):</strong>
                  Đại diện cho 5 phẩm hạnh Nho giáo cốt lõi: Nhân - Lễ - Nghĩa - Trí - Tín.
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E5DDD0]">
                  <strong className="text-[#8B1E1E] block mb-0.5">Cổ Đứng Cao:</strong>
                  Biểu thị sự ngay thẳng, chính trực và kín đáo của bậc quân tử và thục nữ.
                </div>
              </div>
            )}

            {activeGarment.id === 'ao-dai' && (
              <div className="space-y-3 text-xs text-[#453D32] text-left">
                <div className="p-3 bg-white rounded-lg border border-[#E5DDD0]">
                  <strong className="text-[#8B1E1E] block mb-0.5">Hai Vạt Bay Bổng:</strong>
                  Sự thăng hoa uyển chuyển, tôn vinh vẻ đẹp hình thể tự nhiên của người phụ nữ Việt.
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E5DDD0]">
                  <strong className="text-[#8B1E1E] block mb-0.5">Cải Biên Lemur 1930s:</strong>
                  Dấu ấn giao thoa hội họa Tây phương và mỹ cảm Á Đông thời kỳ canh tân mỹ thuật.
                </div>
              </div>
            )}

            {activeGarment.id !== 'ao-ngu-than' && activeGarment.id !== 'ao-dai' && (
              <div className="p-4 bg-white rounded-lg border border-[#E5DDD0] text-xs text-[#453D32] text-left">
                <p className="leading-relaxed">
                  Trang phục phản ánh triết lý dung hòa giữa con người và thiên nhiên, gắn liền với tín ngưỡng nông nghiệp và văn hóa giao tiếp tao nhã của người Việt qua nhiều thế kỷ.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Traditional Color Palette Showcase */}
      <div className="bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl p-6 sm:p-8 shadow-xs">
        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E1D1B] mb-2">
          Hệ Bảng Màu Di Sản
        </h3>
        <p className="text-xs text-[#736858] mb-6 max-w-2xl">
          Các sắc thái màu sắc được chiết xuất từ kỹ thuật nhuộm thảo mộc tự nhiên và mỹ nghệ cổ truyền (sơn mài, gốm lam, gấm lụa hoàng cung).
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {COLORS.map((col) => (
            <div
              key={col.id}
              className="bg-white p-3.5 rounded-xl border border-[#E5DDD0] flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-full h-12 rounded-lg mb-2 shadow-xs border border-black/10"
                  style={{ backgroundColor: col.hex }}
                />
                <h5 className="font-editorial text-sm font-bold text-[#1E1D1B]">
                  {col.name}
                </h5>
                <span className="text-[10px] text-[#7A7061] block mb-1">
                  {col.vietnameseName}
                </span>
              </div>
              <p className="text-[10px] text-[#554D40] leading-relaxed line-clamp-3 mt-1">
                {col.culturalMeaning}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
