import { GoogleGenAI } from '@google/genai';

export interface GeminiStylistResult {
  success: boolean;
  source: 'gemini' | 'heuristic_engine';
  styleName: string;
  selection: {
    garmentId: string;
    bottomId: string;
    headwearId: string;
    footwearId: string;
    bagId: string;
    accessoryId: string;
    styleId: string;
    colorId: string;
  };
  reasoning: string;
  culturalPhilosophy: string;
}

const VALID_GARMENTS = ['ao-ngu-than', 'ao-dai', 'ao-tu-than', 'ao-giao-linh', 'ao-ba-ba', 'ao-doi-kham'];
const VALID_BOTTOMS = ['pants-silk-wide', 'pants-denim-wide', 'skirt-pleated-midi', 'pants-cargo-minimal', 'pants-tailored-high', 'skirt-asymmetric-wrap'];
const VALID_HEADWEAR = ['head-khan-dong', 'head-man-cach-tan', 'head-khan-mo-qua', 'head-beret-modern', 'head-bandana-silk', 'head-none'];
const VALID_FOOTWEAR = ['shoes-chunky-sneaker', 'shoes-guoc-moc', 'shoes-leather-loafer', 'shoes-minimal-mule', 'shoes-chelsea-boots', 'shoes-hai-theu', 'shoes-embroidered-flats'];
const VALID_BAGS = ['bag-crossbody-nylon', 'bag-shoulder-leather', 'bag-woven-coi', 'bag-tote-dongho', 'bag-clutch-lacquer'];
const VALID_ACCESSORIES = ['acc-silver-kieng', 'acc-headphones', 'acc-sunglasses-oval', 'acc-wooden-fan', 'acc-jade-earrings', 'acc-silk-belt'];
const VALID_STYLES = ['style-street', 'style-minimal', 'style-soft', 'style-old-money', 'style-y2k', 'style-casual'];
const VALID_COLORS = ['lacquer-red', 'imperial-gold', 'indigo-blue', 'jade-green', 'pearl-white', 'charcoal-black', 'lotus-pink', 'court-purple'];

export async function generateOutfitStyling(userPrompt: string): Promise<GeminiStylistResult> {
  const promptLower = (userPrompt || '').toLowerCase();
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const systemInstruction = `Bạn là Trợ lý Cố vấn Phong cách Việt Phục (Vietnamese Heritage & Modern Stylist) am hiểu sâu sắc về lịch sử trang phục Việt Nam và ngôn ngữ thời trang Gen Z.
Nhiệm vụ của bạn là nhận yêu cầu của người dùng và đề xuất một bộ trang phục phối hợp hoàn chỉnh.

QUY TẮC BẮT BUỘC:
Chỉ được chọn các ID sau:
- garmentId: 'ao-ngu-than' (Áo Ngũ Thân Triều Nguyễn), 'ao-dai' (Áo Dài), 'ao-tu-than' (Áo Tứ Thân Bắc Bộ), 'ao-giao-linh' (Áo Giao Lĩnh Lý-Trần-Lê), 'ao-ba-ba' (Áo Bà Ba Nam Bộ), 'ao-doi-kham' (Áo Đối Khâm Cung đình)
- bottomId: 'pants-silk-wide', 'pants-denim-wide', 'skirt-pleated-midi', 'pants-cargo-minimal', 'pants-tailored-high', 'skirt-asymmetric-wrap'
- headwearId: 'head-khan-dong', 'head-man-cach-tan', 'head-khan-mo-qua', 'head-beret-modern', 'head-bandana-silk', 'head-none'
- footwearId: 'shoes-chunky-sneaker', 'shoes-guoc-moc', 'shoes-leather-loafer', 'shoes-minimal-mule', 'shoes-chelsea-boots', 'shoes-hai-theu'
- bagId: 'bag-crossbody-nylon', 'bag-shoulder-leather', 'bag-woven-coi', 'bag-tote-dongho', 'bag-clutch-lacquer'
- accessoryId: 'acc-silver-kieng', 'acc-headphones', 'acc-sunglasses-oval', 'acc-wooden-fan', 'acc-jade-earrings', 'acc-silk-belt'
- styleId: 'style-street', 'style-minimal', 'style-soft', 'style-old-money', 'style-y2k', 'style-casual'
- colorId: 'lacquer-red', 'imperial-gold', 'indigo-blue', 'jade-green', 'pearl-white', 'charcoal-black', 'lotus-pink', 'court-purple'

LƯU Ý BẢO TỒN VĂN HÓA:
- Không phối Áo Đối Khâm với Y2K quá trớn.
- Không phối Khăn đóng hoặc Khăn mỏ quạ với Áo Bà Ba.
- Không phối Áo Dài với quần shorts/dép lê xuề xòa.

Trả về kết quả chuẩn JSON với các trường:
{
  "styleName": "Tên phong cách phối đồ gợi cảm hứng",
  "selection": {
    "garmentId": "...",
    "bottomId": "...",
    "headwearId": "...",
    "footwearId": "...",
    "bagId": "...",
    "accessoryId": "...",
    "styleId": "...",
    "colorId": "..."
  },
  "reasoning": "Lý giải thời trang vì sao bản phối này hiệu quả trong bối cảnh người dùng yêu cầu",
  "culturalPhilosophy": "Triết lý văn hóa di sản ẩn chứa trong trang phục cổ được chọn"
}`;

      const generatePromise = ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Người dùng yêu cầu: "${userPrompt}"`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json'
        }
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API timeout')), 6000)
      );

      const response = await Promise.race([generatePromise, timeoutPromise]);

      if (response && response.text) {
        const parsed = JSON.parse(response.text);
        if (
          parsed.selection &&
          VALID_GARMENTS.includes(parsed.selection.garmentId) &&
          VALID_BOTTOMS.includes(parsed.selection.bottomId) &&
          VALID_HEADWEAR.includes(parsed.selection.headwearId) &&
          VALID_FOOTWEAR.includes(parsed.selection.footwearId) &&
          VALID_BAGS.includes(parsed.selection.bagId) &&
          VALID_ACCESSORIES.includes(parsed.selection.accessoryId) &&
          VALID_STYLES.includes(parsed.selection.styleId) &&
          VALID_COLORS.includes(parsed.selection.colorId)
        ) {
          return {
            success: true,
            source: 'gemini',
            styleName: parsed.styleName || 'Viet Phuc Contemporary Styling',
            selection: parsed.selection,
            reasoning: parsed.reasoning || 'Bản phối tôn vinh nét đẹp cổ phục trong nhịp sống hiện đại.',
            culturalPhilosophy: parsed.culturalPhilosophy || 'Bảo tồn động giá trị di sản dân tộc.'
          };
        }
      }
    } catch (_err) {
      // Quietly engage intelligent cultural heuristic engine
    }
  }

  // Robust Heuristic Engine fallback with deep cultural rules & context matching
  return getHeuristicStyling(promptLower);
}

function getHeuristicStyling(prompt: string): GeminiStylistResult {
  // 1. Cafe & chill / strolling
  if (prompt.includes('cafe') || prompt.includes('cà phê') || prompt.includes('bạn bè') || prompt.includes('tản bộ') || prompt.includes('cuối tuần') || prompt.includes('phố cổ')) {
    return {
      success: true,
      source: 'heuristic_engine',
      styleName: 'Daily Casual & Cafe Vibe',
      selection: {
        garmentId: 'ao-ba-ba',
        bottomId: 'pants-denim-wide',
        headwearId: 'head-beret-modern',
        footwearId: 'shoes-minimal-mule',
        bagId: 'bag-woven-coi',
        accessoryId: 'acc-wooden-fan',
        styleId: 'style-casual',
        colorId: 'imperial-gold'
      },
      reasoning: 'Áo bà ba vàng hoàng yến mang lại cảm giác thân thiện, nhẹ nhõm, phối cùng quần denim ống suông và túi cói Kim Sơn tạo vẻ đẹp thanh xuân trong trẻo rất ăn ảnh dưới nắng quán cafe.',
      culturalPhilosophy: 'Áo Bà Ba là biểu trưng của sự bình dị, phóng khoáng và hồn hậu nơi đồng bằng sông Cửu Long.'
    };
  }

  // 2. University / lecture / graduation / office
  if (prompt.includes('học') || prompt.includes('giảng đường') || prompt.includes('thuyết trình') || prompt.includes('đồ án') || prompt.includes('công sở') || prompt.includes('đi làm')) {
    return {
      success: true,
      source: 'heuristic_engine',
      styleName: 'Campus Minimalist & Academic Chic',
      selection: {
        garmentId: 'ao-ngu-than',
        bottomId: 'pants-tailored-high',
        headwearId: 'head-none',
        footwearId: 'shoes-leather-loafer',
        bagId: 'bag-tote-dongho',
        accessoryId: 'acc-wooden-fan',
        styleId: 'style-minimal',
        colorId: 'pearl-white'
      },
      reasoning: 'Áo ngũ thân tay chẽn trắng ngà tôn lên cốt cách mực thước, kín đáo phù hợp môi trường học đường, phối quần tây may đo và giày loafer đen tạo phong thái tự tin, trí thức trẻ.',
      culturalPhilosophy: 'Áo Ngũ Thân với 5 cúc mang ý nghĩa Ngũ Thường (Nhân - Lễ - Nghĩa - Trí - Tín), răn dạy người mặc giữ đạo đức đoan chính.'
    };
  }

  // 3. Wedding / ceremony / bohemian / romantic
  if (prompt.includes('cưới') || prompt.includes('hôn lễ') || prompt.includes('bohemian') || prompt.includes('lãng mạn') || prompt.includes('tiệc ngoài trời') || prompt.includes('dịu dàng')) {
    return {
      success: true,
      source: 'heuristic_engine',
      styleName: 'Bohemian Heritage Romance',
      selection: {
        garmentId: 'ao-dai',
        bottomId: 'skirt-pleated-midi',
        headwearId: 'head-man-cach-tan',
        footwearId: 'shoes-minimal-mule',
        bagId: 'bag-woven-coi',
        accessoryId: 'acc-jade-earrings',
        styleId: 'style-soft',
        colorId: 'lotus-pink'
      },
      reasoning: 'Áo dài lụa màu hồng sen đào kết hợp chân váy dập ly xòe bồng bềnh và mấn ngọc, điểm xuyết khuyên tai ngọc bích tạo vẻ đẹp thơ mộng, vừa đúng nghi lễ chúc phúc vừa phóng khoáng hòa vào thiên nhiên.',
      culturalPhilosophy: 'Sắc hồng hoa sen biểu trưng cho sự thuần khiết, thanh cao và khởi đầu tốt lành trong quan niệm Á Đông.'
    };
  }

  // 4. Concert / rock / festival / music / energetic
  if (prompt.includes('concert') || prompt.includes('âm nhạc') || prompt.includes('festival') || prompt.includes('rock') || prompt.includes('indie') || prompt.includes('quẩy') || prompt.includes('năng lượng')) {
    return {
      success: true,
      source: 'heuristic_engine',
      styleName: 'Festival Streetwear & Energetic Beat',
      selection: {
        garmentId: 'ao-giao-linh',
        bottomId: 'pants-cargo-minimal',
        headwearId: 'head-bandana-silk',
        footwearId: 'shoes-chunky-sneaker',
        bagId: 'bag-crossbody-nylon',
        accessoryId: 'acc-headphones',
        styleId: 'style-street',
        colorId: 'indigo-blue'
      },
      reasoning: 'Áo giao lĩnh mở tà bay bổng kết hợp quần cargo kháng nước và chunky sneaker giúp bạn tự do nhảy múa theo điệu nhạc, trong khi tai nghe bạc và khăn bandana tạo chất streetwear sắc lẹm.',
      culturalPhilosophy: 'Áo Giao Lĩnh với cổ vạt chéo giao thoa đại diện cho sự vận động không ngừng và dung hòa âm dương của đất trời.'
    };
  }

  // 5. Lookbook / photoshoot / museum / heritage
  if (prompt.includes('chụp ảnh') || prompt.includes('lookbook') || prompt.includes('bảo tàng') || prompt.includes('triển lãm') || prompt.includes('tết') || prompt.includes('nghệ thuật')) {
    return {
      success: true,
      source: 'heuristic_engine',
      styleName: 'Cinematic Heritage Old Money',
      selection: {
        garmentId: 'ao-dai',
        bottomId: 'pants-silk-wide',
        headwearId: 'head-man-cach-tan',
        footwearId: 'shoes-guoc-moc',
        bagId: 'bag-clutch-lacquer',
        accessoryId: 'acc-silver-kieng',
        styleId: 'style-old-money',
        colorId: 'lacquer-red'
      },
      reasoning: 'Sắc đỏ sơn mài tương phản ấn tượng trên nền kiến trúc rêu phong. Tà áo dài tha thướt phối kiềng bạc chạm chim Lạc và guốc mộc truyền thống tạo nên bố cục thị giác đắt giá, đậm chất điện ảnh.',
      culturalPhilosophy: 'Đỏ sơn mài thếp vàng là màu sắc tôn nghiêm của đền đài cung điện Việt xưa, biểu trưng cho quyền quý và may mắn trường tồn.'
    };
  }

  // 6. Streetwear / bold / Y2K
  if (prompt.includes('street') || prompt.includes('đường phố') || prompt.includes('phá cách') || prompt.includes('y2k') || prompt.includes('ngầu') || prompt.includes('cá tính')) {
    return {
      success: true,
      source: 'heuristic_engine',
      styleName: 'Modern Streetwear Bold',
      selection: {
        garmentId: 'ao-ngu-than',
        bottomId: 'pants-denim-wide',
        headwearId: 'head-none',
        footwearId: 'shoes-chunky-sneaker',
        bagId: 'bag-crossbody-nylon',
        accessoryId: 'acc-sunglasses-oval',
        styleId: 'style-street',
        colorId: 'charcoal-black'
      },
      reasoning: 'Áo ngũ thân đen mực tàu mở cúc ngực kết hợp cùng kính râm oval và sneaker đế hầm hố. Sự tôn trọng văn hóa nằm ở đường may chuẩn, còn cá tính nằm ở cách biến hóa tự do.',
      culturalPhilosophy: 'Màu mực tàu trầm mặc phản ánh phong thái thâm trầm, đĩnh đạc của người quân tử xưa.'
    };
  }

  // 7. Autumn / rain / cool weather / cozy
  if (prompt.includes('mưa') || prompt.includes('lạnh') || prompt.includes('thu') || prompt.includes('đông') || prompt.includes('se lạnh')) {
    return {
      success: true,
      source: 'heuristic_engine',
      styleName: 'Autumn Poetic Layering',
      selection: {
        garmentId: 'ao-tu-than',
        bottomId: 'skirt-pleated-midi',
        headwearId: 'head-beret-modern',
        footwearId: 'shoes-chelsea-boots',
        bagId: 'bag-shoulder-leather',
        accessoryId: 'acc-silk-belt',
        styleId: 'style-soft',
        colorId: 'jade-green'
      },
      reasoning: 'Áo tứ thân xanh ngọc lục bảo khoác layer cùng chân váy dập ly và mũ beret len mang lại cảm giác ấm áp, vừa lưu giữ vẻ duyên dáng quan họ vừa phảng phất chất lãng mạn mùa thu.',
      culturalPhilosophy: 'Thắt lưng lụa ruột bao và yếm hoa là biểu trưng cho tình cảm đùm bọc, kín đáo của người phụ nữ Bắc Bộ.'
    };
  }

  // Default: Creative High-Fashion Editorial
  return {
    success: true,
    source: 'heuristic_engine',
    styleName: 'Creative Runway Editorial',
    selection: {
      garmentId: 'ao-doi-kham',
      bottomId: 'skirt-asymmetric-wrap',
      headwearId: 'head-none',
      footwearId: 'shoes-chelsea-boots',
      bagId: 'bag-shoulder-leather',
      accessoryId: 'acc-silver-kieng',
      styleId: 'style-minimal',
      colorId: 'court-purple'
    },
    reasoning: 'Bản phối dung hợp chiếc áo đối khâm cung đình quý phái với chân váy bất đối xứng và chelsea boots da bóng, tôn vinh tư duy thời trang tự do và khí chất đương đại.',
    culturalPhilosophy: 'Áo Đối Khâm thời Lê - Nguyễn với hai vạt song song thể hiện phong thái ngay thẳng và trang trọng của bậc vương giả.'
  };
}
