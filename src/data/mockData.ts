import {
  Garment,
  BottomPiece,
  HeadwearPiece,
  FootwearPiece,
  BagPiece,
  AccessoryPiece,
  StyleOption,
  ColorOption,
  SavedOutfit,
  AIStylistPromptExample,
  AvatarModel,
  WeatherOption,
  EventOption,
  OutfitSelection,
  CulturalIntegrityCheck,
  ColorHarmonyReport,
  WhereToWearLocation,
  SustainableItem,
  SmartAIContext
} from '../types';

export const GARMENTS: Garment[] = [
  {
    id: 'ao-ngu-than',
    name: 'Áo Ngũ Thân',
    vietnameseName: 'Áo Ngũ Thân Tay Chẽn / Tay Thụng',
    englishSub: 'Five-paneled Traditional Robe',
    category: 'garment',
    era: 'Triều Nguyễn (Thế kỷ 18 - 20)',
    description: 'Trang phục chuẩn mực của người Việt thời Nguyễn, cấu thành từ 5 thân vải tượng trưng cho Tứ thân phụ mẫu và chính bản thân người mặc.',
    culturalContext: 'Áo ngũ thân đại diện cho cốt cách mực thước, kín đáo và triết lý gia đình sâu sắc. 5 cúc áo cài bên mạn sườn phải mang ý nghĩa Ngũ Thường (Nhân - Lễ - Nghĩa - Trí - Tín). Áo có phom dáng đứng đắn, cổ đứng nghiêm cẩn.',
    structureDetails: [
      '5 thân vải ghép khéo léo (2 thân trước, 2 thân sau, 1 thân con bên trong)',
      'Cổ đứng cao ôm khít, thể hiện sự chính trực',
      'Cài cúc mạn sườn phải (5 hạt cúc bằng đồng, ngọc hoặc gỗ)',
      'Tay áo chia làm hai dạng: tay chẽn năng động hoặc tay thụng uy nghi'
    ],
    modernTips: 'Phối mở cúc ngực khoác ngoài như áo khoác kimono hiện đại, hoặc cài kín kết hợp cùng sneaker chunky và quần tây ống rộng.',
    defaultColor: 'lacquer-red',
    supportedColors: ['lacquer-red', 'indigo-blue', 'imperial-gold', 'charcoal-black', 'pearl-white', 'jade-green'],
    silhouetteSvg: 'ngu-than'
  },
  {
    id: 'ao-dai',
    name: 'Áo Dài',
    vietnameseName: 'Áo Dài Tân Thời / Hiện Đại',
    englishSub: 'Iconic Vietnamese Tunic',
    category: 'garment',
    era: 'Đầu thế kỷ 20 đến nay',
    description: 'Biểu tượng trang phục kinh điển của Việt Nam với thiết kế ôm nhẹ tôn dáng, hai vạt trước sau buông thả tha thướt trên nền quần dài.',
    culturalContext: 'Phát triển từ áo ngũ thân dưới làn sóng canh tân mỹ thuật thập niên 1930 (họa sĩ Cát Tường - Lemur), Áo Dài kết tinh vẻ đẹp thanh tao, mềm mại nhưng đầy khí chất của người phụ nữ Việt Nam qua các thời kỳ.',
    structureDetails: [
      'Hai vạt áo dài trước - sau cân đối buông rủ',
      'Cổ áo biến tấu đa dạng: cổ cao 3cm truyền thống, cổ thuyền hoặc cổ tròn khoét nhẹ',
      'Đường xẻ tà ngang eo tạo độ bay bổng khi chuyển động',
      'Cài nút bấm chéo từ cổ sang nách phải'
    ],
    modernTips: 'Chọn tà áo dáng lửng (midi) phối cùng quần jeans ống suông hoặc chân váy xếp ly hiện đại, kết hợp túi kẹp nách baguette.',
    defaultColor: 'pearl-white',
    supportedColors: ['pearl-white', 'lacquer-red', 'jade-green', 'lotus-pink', 'imperial-gold', 'charcoal-black'],
    silhouetteSvg: 'ao-dai'
  },
  {
    id: 'ao-tu-than',
    name: 'Áo Tứ Thân',
    vietnameseName: 'Áo Tứ Thân Kinh Bắc',
    englishSub: 'Four-panel Northern Robe',
    category: 'garment',
    era: 'Văn hóa Đồng bằng Bắc Bộ (Thế kỷ 12 - 20)',
    description: 'Trang phục mộc mạc và phóng khoáng của phụ nữ Bắc Bộ với 4 vạt áo buông lơi, mặc cùng yếm đào thắm sắc và thắt lưng lụa.',
    culturalContext: 'Tứ thân tượng trưng cho sự gắn bó đôi bờ cha mẹ chồng và cha mẹ đẻ. Vạt trước thường buộc nhẹ trước bụng tạo dáng vẻ thắt đáy lưng ong, gợi nhớ những làn điệu quan họ mượt mà và ngày hội làng truyền thống.',
    structureDetails: [
      '2 thân sau may liền ở sống lưng tạo đường may dứt khoát',
      '2 vạt trước để buông rủ tự nhiên hoặc thắt nút điệu đà trước bụng',
      'Mặc lót cùng yếm cổ xây hoặc yếm cánh nhạn',
      'Khăn thắt lưng lụa ruột bao giữ dáng yếm'
    ],
    modernTips: 'Biến áo tứ thân thành áo khoác duster jacket dáng dài, phối cùng croptop trơn và quần denim cạp cao cho phong cách festival trẻ trung.',
    defaultColor: 'jade-green',
    supportedColors: ['jade-green', 'lotus-pink', 'indigo-blue', 'imperial-gold', 'charcoal-black'],
    silhouetteSvg: 'tu-than'
  },
  {
    id: 'ao-giao-linh',
    name: 'Áo Giao Lĩnh',
    vietnameseName: 'Áo Giao Lĩnh Cổ Phục',
    englishSub: 'Cross-collared Ancient Robe',
    category: 'garment',
    era: 'Triều Lý - Trần - Hậu Lê',
    description: 'Trang phục cổ xưa với hai vạt cổ bắt chéo qua nhau tạo thành góc chữ V tao nhã, phong thái khoáng đạt của bậc trí thức nho nhã.',
    culturalContext: 'Giao lĩnh xuất hiện qua nhiều triều đại thịnh trị của Đại Việt. Đường cắt cổ giao thoa tượng trưng cho sự dung hòa âm dương trời đất, thể hiện chiều sâu triết lý phương Đông và phong vị cổ kính đậm đặc.',
    structureDetails: [
      'Cổ áo vắt chéo chữ V cố định bằng dây buộc ngang hông',
      'Ống tay rộng bay bổng hoặc tay chẽn gọn gàng',
      'Vạt áo dài qua gối xẻ tà sâu hai bên mạn sườn',
      'Đai thắt lưng bằng vải bản rộng hoặc lụa tơ'
    ],
    modernTips: 'Phối mở như áo cardigan ngoại cỡ phối cùng áo thun cổ tròn tối giản, quần ống thụng và giày da monkstrap.',
    defaultColor: 'charcoal-black',
    supportedColors: ['charcoal-black', 'pearl-white', 'indigo-blue', 'lacquer-red', 'court-purple'],
    silhouetteSvg: 'giao-linh'
  },
  {
    id: 'ao-ba-ba',
    name: 'Áo Bà Ba',
    vietnameseName: 'Áo Bà Ba Nam Bộ',
    englishSub: 'Southern Silk Blouse',
    category: 'garment',
    era: 'Văn hóa Nam Bộ (Thế kỷ 19 - nay)',
    description: 'Chiếc áo giản dị, tươi tắn của miền sông nước Cửu Long với đường lượn eo nhẹ, xẻ tà hông và hai túi nhỏ tiện lợi phía trước.',
    culturalContext: 'Áo bà ba gắn với sự phóng khoáng, chân chất và đôn hậu của con người phương Nam. Áo ôm gọn cơ thể một cách tự nhiên, chất vải gấm, lụa hoặc xoa tạo cảm giác mát mẻ, gần gũi với thiên nhiên sông nước.',
    structureDetails: [
      'Thân áo không có bâu (cổ tròn viền nhẹ)',
      'Hàng cúc cài chính giữa ngực chạy dài xuống gấu áo',
      'Xẻ tà hai bên hông tạo sự thoải mái tối đa khi cử động',
      'Hai túi vuông nhỏ phía trước vạt dưới'
    ],
    modernTips: 'Chọn chất liệu lụa satin bóng nhẹ mặc cùng quần jeans rách gối, vòng cổ chocker và giày mule cao gót hiện đại.',
    defaultColor: 'imperial-gold',
    supportedColors: ['imperial-gold', 'lotus-pink', 'indigo-blue', 'pearl-white', 'lacquer-red'],
    silhouetteSvg: 'ba-ba'
  },
  {
    id: 'ao-doi-kham',
    name: 'Áo Đối Khâm',
    vietnameseName: 'Áo Đối Khâm Cung Đình',
    englishSub: 'Parallel-lapel Robe',
    category: 'garment',
    era: 'Triều Lê - Nguyễn',
    description: 'Áo khoác vạt song song đối xứng, buông thả thẳng đứng trước ngực, mang đến khí chất uy nghi nhưng vẫn thanh thoát.',
    culturalContext: 'Thường được mặc ngoài như một chiếc cẩm y lộng lẫy trong các nghi lễ trang trọng chốn cung đình xưa. Vạt áo song song mở ra một khoảng không gian để lộ phần y phục lót bên trong đầy tinh tế.',
    structureDetails: [
      'Hai vạt áo thẳng song song không giao nhau',
      'Viền nẹp áo to bản thường thêu hoa văn hoặc dệt nổi gấm',
      'Phom dáng rủ thẳng, phóng khoáng',
      'Có dải lụa thắt hờ ngang ngực'
    ],
    modernTips: 'Sử dụng như áo khoác trench coat mùa thu đông, khoác bên ngoài đầm lụa trơn hoặc set đồ công sở thanh lịch.',
    defaultColor: 'court-purple',
    supportedColors: ['court-purple', 'lacquer-red', 'indigo-blue', 'pearl-white', 'charcoal-black'],
    silhouetteSvg: 'doi-kham'
  }
];

export const BOTTOM_PIECES: BottomPiece[] = [
  {
    id: 'pants-silk-wide',
    name: 'Quần Lụa Ống Rộng Di Sản',
    category: 'bottom',
    isTraditional: true,
    styleTag: 'Heritage Classic',
    description: 'Ống quần suông rộng may từ lụa tơ tằm Hà Đông mềm mại, buông rủ tự nhiên theo từng bước chân.',
    silhouetteSvg: 'pants-wide'
  },
  {
    id: 'pants-denim-wide',
    name: 'Quần Denim Ống Suông Gen Z',
    category: 'bottom',
    isTraditional: false,
    styleTag: 'Street Modern',
    description: 'Chất liệu jeans xanh bạc hoặc đen cạp cao dáng thụng, tạo độ tương phản cá tính giữa cổ điển và đường phố.',
    silhouetteSvg: 'pants-denim'
  },
  {
    id: 'skirt-pleated-midi',
    name: 'Chân Váy Lụa Dập Ly Xếp Tầng',
    category: 'bottom',
    isTraditional: false,
    styleTag: 'Soft Chic',
    description: 'Lấy cảm hứng từ váy đụp Bắc Bộ nhưng cải biên đường dập ly mảnh hiện đại, độ xòe vừa phải.',
    silhouetteSvg: 'skirt-pleated'
  },
  {
    id: 'pants-cargo-minimal',
    name: 'Quần Cargo Utility Tối Giản',
    category: 'bottom',
    isTraditional: false,
    styleTag: 'Tech Y2K',
    description: 'Quần túi hộp form suông phong cách cyberpunk/utilitarian, chất vải dù nhẹ kháng nước.',
    silhouetteSvg: 'pants-cargo'
  },
  {
    id: 'pants-tailored-high',
    name: 'Quần Tây May Đo Cạp Cao',
    category: 'bottom',
    isTraditional: false,
    styleTag: 'Old Money',
    description: 'Đường ly ủi sắc nét, chất len pha mát mẻ, tạo phong thái đĩnh đạc và chuẩn mực văn phòng đương đại.',
    silhouetteSvg: 'pants-tailored'
  },
  {
    id: 'skirt-asymmetric-wrap',
    name: 'Chân Váy Quấn Bất Đối Xứng',
    category: 'bottom',
    isTraditional: false,
    styleTag: 'Creative Editorial',
    description: 'Cắt vạt chéo sắc sảo gợi liên tưởng đến tà áo dài cách tân, chất vải lanh thô dệt thủ công.',
    silhouetteSvg: 'skirt-asymmetric'
  },
  {
    id: 'shorts-denim-mini',
    name: 'Quần Shorts Denim Siêu Ngắn',
    category: 'bottom',
    isTraditional: false,
    styleTag: 'Casual Summer',
    description: 'Quần soóc jeans ngắn hiện đại mang tính năng động mùa hè nhưng cần thận trọng khi phối cùng cổ phục truyền thống.',
    silhouetteSvg: 'shorts-denim'
  }
];

export const HEADWEAR_PIECES: HeadwearPiece[] = [
  {
    id: 'head-khan-dong',
    name: 'Khăn Đóng / Khăn Xếp Truyền Thống',
    category: 'headwear',
    isTraditional: true,
    styleTag: 'Heritage Classic',
    description: 'Khăn quấn xếp nếp hình chữ Nhân (人) phía trước trán, chuẩn mực lịch thiệp ngàn đời của người Việt.',
    silhouetteSvg: 'khan-dong'
  },
  {
    id: 'head-man-cach-tan',
    name: 'Mấn Lụa Cách Tân Đính Ngọc',
    category: 'headwear',
    isTraditional: true,
    styleTag: 'Royal Chic',
    description: 'Mấn bọc gấm hoặc lụa trơn đính ngọc trai nhân tạo, thanh thoát và gọn gàng cho tóc búi thấp.',
    silhouetteSvg: 'man-cach-tan'
  },
  {
    id: 'head-khan-mo-qua',
    name: 'Khăn Mỏ Quạ Lụa Đen',
    category: 'headwear',
    isTraditional: true,
    styleTag: 'Northern Poetic',
    description: 'Khăn lụa vuông gập chéo thắt hình mỏ quạ ôm khít khuôn mặt, tôn gò má và nét duyên mộc.',
    silhouetteSvg: 'khan-mo-qua'
  },
  {
    id: 'head-beret-modern',
    name: 'Mũ Beret Da Thuần Chay',
    category: 'headwear',
    isTraditional: false,
    styleTag: 'French-Indochine',
    description: 'Dấu ấn giao thoa văn hóa Đông Dương đầu thế kỷ 20, tạo vẻ nghệ sĩ hoài cổ và phóng khoáng.',
    silhouetteSvg: 'beret'
  },
  {
    id: 'head-bandana-silk',
    name: 'Khăn Bandana Tơ Tằm Họa Tiết',
    category: 'headwear',
    isTraditional: false,
    styleTag: 'Y2K Street',
    description: 'Khăn vuông in hoa văn gốm hoa lam trùm đầu kiểu streetwear hoặc quấn quanh trán tinh nghịch.',
    silhouetteSvg: 'bandana'
  },
  {
    id: 'head-none',
    name: 'Tóc Tự Nhiên / Không Đội Nón',
    category: 'headwear',
    isTraditional: false,
    styleTag: 'Minimalist Clean',
    description: 'Kiểu tóc rẽ ngôi buông tự nhiên hoặc kẹp càng cua gọn gàng, tôn trọn nét mặt mộc trẻ trung.',
    silhouetteSvg: 'hair-natural'
  }
];

export const FOOTWEAR_PIECES: FootwearPiece[] = [
  {
    id: 'shoes-chunky-sneaker',
    name: 'Chunky Sneaker Trắng Retro',
    category: 'footwear',
    isTraditional: false,
    styleTag: 'Gen Z Street',
    description: 'Đế dày tôn chiều cao, tạo độ tương phản mạnh mẽ với vẻ mềm rủ của vạt áo truyền thống.',
    silhouetteSvg: 'sneaker'
  },
  {
    id: 'shoes-guoc-moc',
    name: 'Guốc Mộc Sơn Mài Quai Nhung',
    category: 'footwear',
    isTraditional: true,
    styleTag: 'Heritage Classic',
    description: 'Đôi guốc gỗ dừa khắc mộc sơn son thếp vàng, phát ra tiếng lộc cộc duyên dáng qua từng nhịp bước.',
    silhouetteSvg: 'guoc-moc'
  },
  {
    id: 'shoes-leather-loafer',
    name: 'Giày Penny Loafer Da Đen',
    category: 'footwear',
    isTraditional: false,
    styleTag: 'Old Money',
    description: 'Da thuộc bóng nhẹ, mũi tròn cổ điển, thanh lịch và chuẩn phong cách học giả trí thức.',
    silhouetteSvg: 'loafer'
  },
  {
    id: 'shoes-minimal-mule',
    name: 'Mule Sandal Gót Vuông',
    category: 'footwear',
    isTraditional: false,
    styleTag: 'Modern Minimal',
    description: 'Quai da mảnh trơn, gót gỗ thấp vững chãi, nhẹ nhàng thanh thoát cho những buổi cafe tản bộ.',
    silhouetteSvg: 'mule'
  },
  {
    id: 'shoes-chelsea-boots',
    name: 'Chelsea Boots Cổ Thấp Da Bóng',
    category: 'footwear',
    isTraditional: false,
    styleTag: 'Creative Editorial',
    description: 'Phom dáng sắc gọn, góc cạnh nam tính hoặc phi giới tính, tiếp thêm năng lượng hiện đại cho tà áo.',
    silhouetteSvg: 'boots'
  },
  {
    id: 'shoes-embroidered-flats',
    name: 'Giày Vải Thêu Chỉ Kim Tuyến',
    category: 'footwear',
    isTraditional: true,
    styleTag: 'Royal Detail',
    description: 'Mũi hài cong nhẹ thêu hoa sen hoặc vân mây cung đình bằng chỉ tơ óng ánh.',
    silhouetteSvg: 'embroidered-shoes'
  },
  {
    id: 'shoes-dep-le-flipflop',
    name: 'Dép Lê Xỏ Ngón Xuề Xòa',
    category: 'footwear',
    isTraditional: false,
    styleTag: 'Casual Beach',
    description: 'Dép lê xốp hoặc quai kẹp xuề xòa dùng đi dạo biển hoặc sinh hoạt thường ngày, xung đột khi kết hợp cùng cổ phục nghi lễ.',
    silhouetteSvg: 'flipflop'
  }
];

export const BAG_PIECES: BagPiece[] = [
  {
    id: 'bag-crossbody-nylon',
    name: 'Túi Crossbody Nylon Kỹ Thuật',
    category: 'bag',
    isTraditional: false,
    styleTag: 'Tech Streetwear',
    description: 'Dây đai bản to vắt chéo ngực, chất liệu nylon chống nước bền bỉ, tiện dụng cho nhịp sống đô thị.',
    silhouetteSvg: 'crossbody'
  },
  {
    id: 'bag-shoulder-leather',
    name: 'Túi Kẹp Nách Baguette Da Mềm',
    category: 'bag',
    isTraditional: false,
    styleTag: 'Y2K Minimal',
    description: 'Dáng túi thon gọn kẹp sát nách, màu nâu cafe hoặc đen tuyền, chuẩn phong thái It-Girl sành điệu.',
    silhouetteSvg: 'shoulder-bag'
  },
  {
    id: 'bag-woven-coi',
    name: 'Túi Mây Tre Đan Thủ Công',
    category: 'bag',
    isTraditional: true,
    styleTag: 'Eco Heritage',
    description: 'Làng nghề đan thủ công từ cói Kim Sơn hoặc tre mây, mang hơi thở thiên nhiên mộc mạc.',
    silhouetteSvg: 'woven-bag'
  },
  {
    id: 'bag-tote-dongho',
    name: 'Túi Tote Vải Đay In Mộc Đông Hồ',
    category: 'bag',
    isTraditional: false,
    styleTag: 'Cultural Youth',
    description: 'Túi tote sức chứa lớn in nét khắc gỗ dân gian Vinh Hoa Phú Quý hoặc Hứng Dừa phá cách.',
    silhouetteSvg: 'tote-bag'
  },
  {
    id: 'bag-clutch-lacquer',
    name: 'Clutch Cầm Tay Dáng Quạt Sơn Mài',
    category: 'bag',
    isTraditional: true,
    styleTag: 'Editorial Couture',
    description: 'Tạo hình dẻ quạt khảm ốc xà cừ hoặc phủ sơn mài đen bóng, món phụ kiện dạ tiệc xa hoa.',
    silhouetteSvg: 'clutch'
  },
  {
    id: 'bag-none',
    name: 'Không Mang Túi Xách',
    category: 'bag',
    isTraditional: false,
    styleTag: 'Minimalist Clean',
    description: 'Tối giản đôi tay buông nhẹ tự nhiên, giải phóng chuyển động cơ thể không vướng bận.',
    silhouetteSvg: 'none'
  }
];

export const ACCESSORY_PIECES: AccessoryPiece[] = [
  {
    id: 'acc-none',
    name: 'Không Đeo Phụ Kiện',
    category: 'accessories',
    isTraditional: false,
    styleTag: 'Minimalist Clean',
    description: 'Giữ nét mộc mạc nguyên bản của y phục, không điểm xuyết vòng cổ, kính hay quạt cầm tay.',
    silhouetteSvg: 'none'
  },
  {
    id: 'acc-silver-kieng',
    name: 'Kiềng Bạc Chạm Hoa Văn Trống Đồng',
    category: 'accessories',
    isTraditional: true,
    styleTag: 'Ancestral Silver',
    description: 'Chiếc kiềng bạc nguyên khối uốn tròn quanh cổ, khắc chìm họa tiết chim Lạc và mặt trời Đông Sơn.',
    silhouetteSvg: 'kieng-bac'
  },
  {
    id: 'acc-headphones',
    name: 'Tai Nghe Chụp Tai Over-Ear Bạc',
    category: 'accessories',
    isTraditional: false,
    styleTag: 'Gen Z Aesthetic',
    description: 'Món phụ kiện công nghệ biểu tượng của Gen Z đeo hờ quanh cổ, phối ngẫu nhiên cùng áo ngũ thân.',
    silhouetteSvg: 'headphones'
  },
  {
    id: 'acc-sunglasses-oval',
    name: 'Kính Râm Gọng Oval Y2K',
    category: 'accessories',
    isTraditional: false,
    styleTag: 'Futuristic Retro',
    description: 'Mắt kính tráng gương hoặc đen khói gọng kim loại thanh mảnh, tạo ánh nhìn sắc sảo bí ẩn.',
    silhouetteSvg: 'sunglasses'
  },
  {
    id: 'acc-wooden-fan',
    name: 'Quạt Gỗ Trầm Hương Xếp Nếp',
    category: 'accessories',
    isTraditional: true,
    styleTag: 'Aristocratic Breeze',
    description: 'Nan gỗ mun hoặc trầm khắc lọng họa tiết hoa sen, tỏa hương thoang thoảng mỗi lần phẩy tay.',
    silhouetteSvg: 'wooden-fan'
  },
  {
    id: 'acc-jade-earrings',
    name: 'Khuyên Tai Ngọc Bích Bọc Vàng',
    category: 'accessories',
    isTraditional: true,
    styleTag: 'Vintage Elegance',
    description: 'Mặt ngọc xanh lục bảo thiên nhiên thả nhẹ buông lơi, bắt sáng lung linh theo nhịp bước.',
    silhouetteSvg: 'earrings'
  },
  {
    id: 'acc-silk-belt',
    name: 'Thắt Lưng Lụa Thổ Cẩm Dệt Tay',
    category: 'accessories',
    isTraditional: true,
    styleTag: 'Ethnic Weave',
    description: 'Họa tiết dệt tay từ người Thái/Mông với tua rua lụa óng ả điểm xuyết quanh eo.',
    silhouetteSvg: 'silk-belt'
  }
];

export const STYLES: StyleOption[] = [
  {
    id: 'style-street',
    name: 'Modern Street',
    tag: 'Phố Thị Đương Đại',
    description: 'Đem hồn cốt trang phục cổ vào nhịp thở đường phố với sneaker, quần phom rộng và phụ kiện techwear.',
    traditionalRatio: 65,
    modernRatio: 35,
    individualityScore: 92,
    badge: 'Street Vibe'
  },
  {
    id: 'style-minimal',
    name: 'Modern Minimal',
    tag: 'Tối Giản Thanh Lịch',
    description: 'Loại bỏ chi tiết rườm rà, tập trung tuyệt đối vào đường cắt sắc nét, phom dáng đứng và bảng màu thuần khiết.',
    traditionalRatio: 75,
    modernRatio: 25,
    individualityScore: 84,
    badge: 'Timeless'
  },
  {
    id: 'style-soft',
    name: 'Soft Girl & Poetic',
    tag: 'Thơ Mộng Dịu Dàng',
    description: 'Chất liệu lụa mỏng nhẹ bay bổng, gam màu phấn dịu ngọt, mấn cách tân và phụ kiện hoa ngọc.',
    traditionalRatio: 80,
    modernRatio: 20,
    individualityScore: 78,
    badge: 'Romantic'
  },
  {
    id: 'style-y2k',
    name: 'Y2K Retro-Futurism',
    tag: 'Phá Cách Vị Lai',
    description: 'Sự giao thoa đầy bất ngờ giữa cổ phục trầm tĩnh và tinh thần nổi loạn Y2K: kính râm, chất liệu bóng, phối khối màu pop.',
    traditionalRatio: 55,
    modernRatio: 45,
    individualityScore: 96,
    badge: 'Bold Remix'
  },
  {
    id: 'style-old-money',
    name: 'Heritage Old Money',
    tag: 'Hào Hoa Kinh Kỳ',
    description: 'Khắc họa khí chất vương giả, nho nhã kín đáo với gấm dệt chìm, giày loafer da cao cấp và kiềng bạc gia truyền.',
    traditionalRatio: 85,
    modernRatio: 15,
    individualityScore: 88,
    badge: 'Noble Chic'
  },
  {
    id: 'style-korean',
    name: 'Asian Fusion Layering',
    tag: 'Phối Lớp Trẻ Trung',
    description: 'Lấy cảm hứng từ cách phối layer hiện đại của giới trẻ Seoul/Tokyo: mở tà áo như áo choàng over-shirt, phụ kiện tote tối giản.',
    traditionalRatio: 60,
    modernRatio: 40,
    individualityScore: 86,
    badge: 'Fusion Layer'
  },
  {
    id: 'style-casual',
    name: 'Daily Casual',
    tag: 'Đời Thường Thoải Mái',
    description: 'Biến Việt phục thành trang phục thường nhật dễ mặc đi làm, đi học, cafe cuối tuần mà không hề gò bó.',
    traditionalRatio: 70,
    modernRatio: 30,
    individualityScore: 80,
    badge: 'Everyday Life'
  },
  {
    id: 'style-creative',
    name: 'Creative Editorial',
    tag: 'Thời Trang Triển Lãm',
    description: 'Bản phối mang tính tuyên ngôn nghệ thuật cao độ, bất đối xứng, phối cấu trúc kịch tính cho tuần lễ thời trang.',
    traditionalRatio: 50,
    modernRatio: 50,
    individualityScore: 98,
    badge: 'Runway Statement'
  }
];

export const COLORS: ColorOption[] = [
  {
    id: 'lacquer-red',
    name: 'Đỏ Sơn Mài',
    vietnameseName: 'Sắc Son Chu Sa & Cánh Gián',
    hex: '#8B1E1E',
    secondaryHex: '#581010',
    textColor: '#FFFFFF',
    culturalMeaning: 'Màu son chu sa trong nghệ thuật sơn mài truyền thống, đại diện cho năng lượng hưng thịnh, điềm lành và may mắn viên mãn.',
    element: 'Hỏa'
  },
  {
    id: 'imperial-gold',
    name: 'Vàng Hoàng Yến',
    vietnameseName: 'Vàng Hoàng Cung & Tơ Tằm',
    hex: '#C89B3C',
    secondaryHex: '#8C671C',
    textColor: '#1E1D1B',
    culturalMeaning: 'Màu của ánh thái dương và di sản hoàng gia Huế, gợi nhớ sắc óng ả của những kén tằm chín rộ trên nương dâu.',
    element: 'Thổ'
  },
  {
    id: 'indigo-blue',
    name: 'Xanh Chàm Indigo',
    vietnameseName: 'Chàm Nhuộm Lá Tự Nhiên',
    hex: '#23395B',
    secondaryHex: '#142137',
    textColor: '#FFFFFF',
    culturalMeaning: 'Sắc màu trầm mặc từ cây chàm của đồng bào vùng cao Tây Bắc, biểu trưng cho sự bền bỉ, mộc mạc và tri thức thâm sâu.',
    element: 'Thủy'
  },
  {
    id: 'jade-green',
    name: 'Xanh Ngọc Lục Bảo',
    vietnameseName: 'Ngọc Bích & Thao Thiết',
    hex: '#1E382B',
    secondaryHex: '#0F2117',
    textColor: '#FFFFFF',
    culturalMeaning: 'Sắc xanh tĩnh lặng của khối ngọc bích cổ, mang ý nghĩa thanh khiết, trường thọ và sự bình an cho tâm hồn người mặc.',
    element: 'Mộc'
  },
  {
    id: 'pearl-white',
    name: 'Trắng Ngọc Trai',
    vietnameseName: 'Bạch Ngọc & Tơ Sống',
    hex: '#F4EFEA',
    secondaryHex: '#DED3C4',
    textColor: '#1E1D1B',
    culturalMeaning: 'Màu trắng ngà óng ánh của ngọc trai biển khơi và tơ tằm nguyên bản, biểu tượng của sự thuần hậu, thanh tao không vướng bụi trần.',
    element: 'Kim'
  },
  {
    id: 'charcoal-black',
    name: 'Đen Mực Tàu',
    vietnameseName: 'Hắc Y & Mực Khắc Mộc',
    hex: '#1E1D1B',
    secondaryHex: '#0D0C0B',
    textColor: '#FFFFFF',
    culturalMeaning: 'Sắc đen sâu lắng từ mực tàu trên giấy điệp, tạo nên uy quyền kiên định, sự bí ẩn và nét tương phản đồ họa sắc bén.',
    element: 'Thủy'
  },
  {
    id: 'lotus-pink',
    name: 'Hồng Sen Đào',
    vietnameseName: 'Hồng Tố Nữ & Sen Đồng',
    hex: '#C47281',
    secondaryHex: '#8E3F4E',
    textColor: '#FFFFFF',
    culturalMeaning: 'Sắc hồng e ấp của búp sen sớm mai trên hồ Tây, thể hiện nét duyên dáng, sức sống thanh xuân và vẻ đẹp tươi mới.',
    element: 'Hỏa'
  },
  {
    id: 'court-purple',
    name: 'Tím Cung Đình',
    vietnameseName: 'Tím Cố Đô & Khảm Trầm',
    hex: '#532D4B',
    secondaryHex: '#32162C',
    textColor: '#FFFFFF',
    culturalMeaning: 'Màu tím trầm mặc lắng đọng của cố đô Huế, gợi cảm thức hoài niệm, lòng thủy chung son sắt và chiều sâu lịch sử.',
    element: 'Thổ'
  }
];

export const SKIN_TONE_OPTIONS = [
  { id: 'porcelain', name: 'Bạch Ngọc', hex: '#F7E7D9', shadowHex: '#E5CFBE', desc: 'Trắng sứ thanh khiết Á Đông' },
  { id: 'warm-ivory', name: 'Ngà Ấm', hex: '#EFE0D3', shadowHex: '#DCBEAB', desc: 'Sáng tự nhiên rạng rỡ' },
  { id: 'golden-honey', name: 'Mật Ong', hex: '#E5CDAE', shadowHex: '#CCA989', desc: 'Ấm áp khỏe khoắn nhiệt đới' },
  { id: 'caramel', name: 'Bánh Mật', hex: '#D2AF89', shadowHex: '#B28E67', desc: 'Nâu rám nắng thời thượng' },
];

export const AVATAR_MODELS: AvatarModel[] = [
  {
    id: 'avatar-female-classic',
    name: 'Tố Nữ Đài Các',
    vietnameseTitle: 'Cổ Điển Hoàng Gia',
    gender: 'female',
    badge: 'Cổ Phong',
    vibe: 'Đoan trang · Đài các · Quý phái',
    skinTone: 'porcelain',
    skinHex: '#F7E7D9',
    shadowHex: '#E5CFBE',
    blushHex: '#E8A598',
    lipHex: '#9C3A3A',
    description: 'Nét đẹp Á Đông đài các, chân mày lá liễu thanh thoát, tóc búi lụa cài trâm ngọc cung đình.',
    hairDescription: 'Búi tóc cao cài trâm ngọc dát vàng',
    faceStyle: 'female-classic',
    quote: 'Nét kiêu sa trầm mặc ngàn năm văn hiến Kinh kỳ.'
  },
  {
    id: 'avatar-female-genz',
    name: 'Hà Thành Gen Z',
    vietnameseTitle: 'Phố Thị Đương Đại',
    gender: 'female',
    badge: 'Gen Z Trend',
    vibe: 'Phá cách · Năng động · Thời thượng',
    skinTone: 'warm-ivory',
    skinHex: '#EFE0D3',
    shadowHex: '#DCBEAB',
    blushHex: '#F29E85',
    lipHex: '#B84545',
    description: 'Tóc bob ngắn tỉa layer, mái bay hiện đại, ánh nhìn sắc sảo tự tin phối hợp di sản cùng streetwear.',
    hairDescription: 'Tóc Bob ngắn thời thượng tỉa layer',
    faceStyle: 'female-modern',
    quote: 'Hơi thở di sản trong nhịp sống Gen Z không giới hạn.'
  },
  {
    id: 'avatar-female-poet',
    name: 'Nàng Thơ Xứ Huế',
    vietnameseTitle: 'Trầm Tích Sông Hương',
    gender: 'female',
    badge: 'Nàng Thơ',
    vibe: 'Dịu dàng · Thơ mộng · Sâu lắng',
    skinTone: 'golden-honey',
    skinHex: '#E5CDAE',
    shadowHex: '#CCA989',
    blushHex: '#DE9688',
    lipHex: '#A34850',
    description: 'Mái tóc dài bồng bềnh buông nhẹ một bên vai, nụ cười e ấp đượm chất thơ mộng cố đô.',
    hairDescription: 'Tóc dài buông lơi một bên vai cài hoa sen',
    faceStyle: 'female-poet',
    quote: 'Dịu dàng nghiêng nón bài thơ bên hiên chùa cổ.'
  },
  {
    id: 'avatar-male-scholar',
    name: 'Thư Sinh Nho Nhã',
    vietnameseTitle: 'Đông Kinh Nghĩa Thục',
    gender: 'male',
    badge: 'Nho Sĩ',
    vibe: 'Trí thức · Điềm đạm · Cương trực',
    skinTone: 'warm-ivory',
    skinHex: '#EFE0D3',
    shadowHex: '#DCBEAB',
    blushHex: '#DDA094',
    lipHex: '#A8534C',
    description: 'Gương mặt tuấn tú góc cạnh, sống mũi cao thẳng, tóc rẽ ngôi cổ điển phong thái nho nhã.',
    hairDescription: 'Tóc ngắn rẽ ngôi 7/3 lịch lãm',
    faceStyle: 'male-sharp',
    quote: 'Văn phong đĩnh đạc, cốt cách thanh cao.'
  },
  {
    id: 'avatar-male-dandy',
    name: 'Công Tử Phố Cổ',
    vietnameseTitle: 'Lãng Tử Hà Thành',
    gender: 'male',
    badge: 'Lãng Tử',
    vibe: 'Phong trần · Cuốn hút · Nghệ sĩ',
    skinTone: 'caramel',
    skinHex: '#D2AF89',
    shadowHex: '#B28E67',
    blushHex: '#C98575',
    lipHex: '#9E4E42',
    description: 'Làn da rám nắng khỏe khoắn, tóc gợn sóng nghệ sĩ, ánh nhìn cuốn hút mang phong thái lãng tử.',
    hairDescription: 'Tóc xoăn sóng nhẹ lãng tử',
    faceStyle: 'male-dandy',
    quote: 'Chất lãng đãng nghìn năm của chàng trai phố cổ.'
  },
  {
    id: 'avatar-androgynous',
    name: 'Haute Couture Editorial',
    vietnameseTitle: 'Sàn Diễn Quốc Tế',
    gender: 'androgynous',
    badge: 'High Fashion',
    vibe: 'Sắc lạnh · Phi giới tính · Tiên phong',
    skinTone: 'porcelain',
    skinHex: '#F7E7D9',
    shadowHex: '#E5CFBE',
    blushHex: '#D9988C',
    lipHex: '#8C3838',
    description: 'Gò má sắc nét, tóc vuốt ngược bóng mượt runway, ánh nhìn sắc lạnh biểu trưng của thời trang cao cấp.',
    hairDescription: 'Tóc vuốt ngược Slicked-back High-Fashion',
    faceStyle: 'editorial',
    quote: 'Bứt phá ranh giới thời trang với ngôn ngữ hình thể quốc tế.'
  }
];

export const WEATHER_OPTIONS: WeatherOption[] = [
  {
    id: 'summer-hot',
    name: 'Nắng Hè Oi Ả',
    icon: '☀️',
    temperature: '32°C - 38°C',
    description: 'Thời tiết nóng bức, ưu tiên chất liệu lụa tơ, đũi mộc mỏng nhẹ, phom suông thoáng khí.',
    recommendedFabric: 'Lụa tơ tằm Bảo Lộc, Vải đũi Nam Cao mộc mát'
  },
  {
    id: 'autumn-cool',
    name: 'Thu Hà Nội Se Lạnh',
    icon: '🍂',
    temperature: '20°C - 26°C',
    description: 'Gió heo may mát dịu, lý tưởng nhất cho việc phối nhiều lớp (layering), gấm hoa chìm.',
    recommendedFabric: 'Gấm dệt Vạn Phúc, Satin óng nhẹ, Lụa the 2 lớp'
  },
  {
    id: 'spring-drizzle',
    name: 'Mưa Xuân & Lễ Hội',
    icon: '🌸',
    temperature: '18°C - 23°C',
    description: 'Không khí lễ hội đầu năm, sắc màu tươi sáng rạng rỡ (Đỏ sơn mài, Vàng hoàng yến).',
    recommendedFabric: 'Tơ sống tơ sen, gấm thêu cung đình'
  },
  {
    id: 'winter-cold',
    name: 'Đông Lạnh Miền Bắc',
    icon: '❄️',
    temperature: '12°C - 17°C',
    description: 'Thời tiết giá buốt, áo ngũ thân chần bông hoặc áo đối khâm khoác ngoài giữ ấm.',
    recommendedFabric: 'Gấm chần bông, Nỉ dạ cao cấp phối viền cổ phục'
  }
];

export const EVENT_OPTIONS: EventOption[] = [
  {
    id: 'cafe-street',
    name: 'Dạo Phố & Cafe Cuối Tuần',
    icon: '☕',
    description: 'Thoải mái, phóng khoáng, dễ vận động, chụp ảnh check-in phong cách Gen Z.',
    formalityLevel: 'Casual & Trendy'
  },
  {
    id: 'temple-heritage',
    name: 'Đi Chùa / Không Gian Di Sản',
    icon: '🏮',
    description: 'Trang nghiêm, kín đáo, chuẩn mực văn hóa (cổ đứng cao, cúc cài ngay ngắn).',
    formalityLevel: 'Nghi lễ & Tôn nghiêm'
  },
  {
    id: 'gala-party',
    name: 'Dạ Tiệc Tối & Gala Night',
    icon: '✨',
    description: 'Sang trọng, quyền quý, lộng lẫy với ánh gấm, phụ kiện bạc hoặc vàng.',
    formalityLevel: 'High Fashion & Black Tie'
  },
  {
    id: 'university',
    name: 'Đi Học Đại Học / Thuyết Trình',
    icon: '🎓',
    description: 'Trẻ trung, thanh lịch, kết hợp sneaker, túi tote và quần âu hoặc denim.',
    formalityLevel: 'Smart Casual'
  },
  {
    id: 'festival-concert',
    name: 'Lễ Hội Âm Nhạc / Concert',
    icon: '🎸',
    description: 'Bùng nổ cá tính, nổi bật giữa đám đông, Y2K retro hoặc Streetwear phá cách.',
    formalityLevel: 'Expressive & Bold'
  }
];

// Helper: Cultural Safeguard Integrity Checker
export const checkCulturalIntegrity = (selection: OutfitSelection): CulturalIntegrityCheck => {
  const { garmentId, styleId, bottomId, headwearId, footwearId } = selection;

  // Rule 1: Áo Dài truyền thống phối Quần Shorts / Váy siêu ngắn (Vi phạm tính kín đáo)
  if (garmentId === 'ao-dai' && bottomId === 'shorts-denim-mini') {
    return {
      isSafe: false,
      severity: 'warning',
      title: 'Vi Phạm Tính Kín Đáo & Chuẩn Mực Áo Dài',
      message: 'Áo Dài từ thời Lemur đến nay luôn quy định mặc kèm quần dài chấm gót (quần lụa hoặc quần tây), tôn nét đoan trang thắt đáy lưng ong. Phối cùng quần shorts siêu ngắn làm mất đi tính thẩm mỹ thanh lịch vốn có.',
      reason: 'Cấu trúc tà xẻ cao đến eo của Áo Dài vốn được tính toán ăn khớp tuyệt đối với quần dài che kín phần hông để tôn vinh sự kín đáo tao nhã.',
      respectfulSuggestion: 'Hãy phối Áo Dài cùng Quần lụa ống rộng di sản, Quần tây may đo cạp cao hoặc Chân váy dập ly midi xếp tầng duyên dáng.',
      culturalContextRef: 'Lịch sử Canh tân Áo Dài Lemur & Tiêu chuẩn Phục trang Phụ nữ Việt Nam'
    };
  }

  // Rule 2: Áo Ngũ Thân cung đình phối Dép lê xỏ ngón xuề xòa
  if (garmentId === 'ao-ngu-than' && footwearId === 'shoes-dep-le-flipflop') {
    return {
      isSafe: false,
      severity: 'warning',
      title: 'Xung Đột Tính Trang Trọng Của Áo Ngũ Thân',
      message: 'Áo Ngũ Thân là biểu tượng mực thước của Nho phong phương Đông và quy chế triều Nguyễn. Dép lê xỏ ngón mang tính sinh hoạt buông tuồng, làm mai một cốt cách trang nghiêm của y phục.',
      reason: 'Áo ngũ thân với cổ đứng nghiêm cẩn và 5 cúc tượng trưng cho Ngũ Thường (Nhân - Lễ - Nghĩa - Trí - Tín) đòi hỏi phụ kiện đi cùng có tính chỉn chu, tươm tất.',
      respectfulSuggestion: 'Gợi ý kết hợp cùng Giày da Penny Loafer thanh lịch, Chunky Sneaker trắng retro năng động hoặc Guốc mộc quai nhung truyền thống.',
      culturalContextRef: 'Khâm Định Đại Nam Hội Điển Sự Lệ & Quy chế Y phục Triều Nguyễn'
    };
  }

  // Rule 3: Áo Đối Khâm cung đình đại triều phối quá phá cách Y2K
  if (garmentId === 'ao-doi-kham' && styleId === 'style-y2k') {
    return {
      isSafe: false,
      severity: 'warning',
      title: 'Lưu Ý Tính Trang Nghiêm Của Áo Đối Khâm',
      message: 'Áo Đối Khâm là phẩm phục trang trọng bậc nhất trong hoàng cung triều Lê - Nguyễn. Phối cùng phong cách Y2K vị lai nổi loạn có thể làm mai một tính tôn nghiêm của trang phục cung đình.',
      reason: 'Cổ phục cung đình thường gắn liền với sự cân xứng, kín đáo và vị thế lễ nghi quốc gia.',
      respectfulSuggestion: 'Khuyên dùng phong cách "Creative Editorial" hoặc "Heritage Old Money", phối cùng Quần tây may đo hoặc Quần lụa ống rộng để giữ vẻ vương giả mà vẫn hiện đại.',
      culturalContextRef: 'Lễ phục triều Lê - Nguyễn (Khâm Định Đại Nam Hội Điển Sự Lệ)'
    };
  }

  // Rule 4: Khăn Đóng / Khăn Mỏ Quạ xứ Bắc phối cùng Áo Bà Ba Nam Bộ
  if (garmentId === 'ao-ba-ba' && (headwearId === 'head-khan-dong' || headwearId === 'head-khan-mo-qua')) {
    return {
      isSafe: false,
      severity: 'caution',
      title: 'Xung Đột Ngữ Cảnh Văn Hóa Vùng Miền',
      message: 'Khăn mỏ quạ và khăn đóng chữ Nhân là di sản xứ Bắc, gắn với yếm đào áo tứ thân; trong khi Áo Bà Ba là linh hồn của phù sa sông nước Nam Bộ. Kết hợp này tạo cảm giác khiên cưỡng, lẫn lộn sinh hoạt.',
      reason: 'Áo bà ba gắn với lối sống phóng khoáng, lao động sông nước miền Tây; khăn đóng gắn với lễ nghi nho giáo kinh kỳ xứ Bắc.',
      respectfulSuggestion: 'Hãy thử đổi sang Khăn Bandana tơ tằm họa tiết hoa lam, Mũ beret phong cách Indochine hoặc để tóc tự nhiên cài kẹp ngọc.',
      culturalContextRef: 'Văn hóa trang phục dân gian Nam Bộ & Bắc Bộ'
    };
  }

  // Rule 5: Áo Tứ Thân phối cùng Quần Cargo túi hộp quá hầm hố
  if (garmentId === 'ao-tu-than' && bottomId === 'pants-cargo-minimal') {
    return {
      isSafe: false,
      severity: 'caution',
      title: 'Độ Tương Phản Phom Dáng Cần Cân Nhắc',
      message: 'Áo Tứ Thân Kinh Bắc mang nét duyên dáng, bay bổng đặc trưng của liền chị quan họ. Quần cargo túi hộp quân đội tạo cảm giác nặng nề, lấn át nét thanh thoát của vạt áo và dải lụa ruột bao.',
      reason: 'Cấu trúc áo tứ thân có 4 vạt rủ mềm và thắt lưng buộc nút, đòi hỏi phần thân dưới có độ suông êm dịu.',
      respectfulSuggestion: 'Đề xuất đổi sang Chân váy dập ly midi bay bổng hoặc Quần lụa ống rộng đen truyền thống.',
      culturalContextRef: 'Trang phục Quan họ Bắc Ninh & Hội Lim'
    };
  }

  // Rule 6: Áo Dài phối dép lê xuề xòa
  if (garmentId === 'ao-dai' && footwearId === 'shoes-dep-le-flipflop') {
    return {
      isSafe: false,
      severity: 'caution',
      title: 'Cần Nâng Cấp Phụ Kiện Cho Tà Áo Dài',
      message: 'Áo Dài bay bổng tha thướt kết hợp với dép lê tạo cảm giác chưa chỉn chu, làm giảm vẻ thanh thoát của dáng đi.',
      reason: 'Tà áo dài dài chấm gót cần giày có độ nâng hoặc guốc mộc để giữ tà áo không quệt đất và tạo dáng thanh thoát.',
      respectfulSuggestion: 'Nên kết hợp cùng Guốc mộc sơn mài, Mule gót vuông hoặc Giày sneaker retro để tôn dáng tà áo.',
      culturalContextRef: 'Mỹ học Trang phục Dân tộc Việt Nam'
    };
  }

  // Rule 7: Áo Tứ Thân phối Y2K nổi loạn
  if (garmentId === 'ao-tu-than' && styleId === 'style-y2k') {
    return {
      isSafe: false,
      severity: 'caution',
      title: 'Cân Nhắc Tinh Thần Lễ Hội Quan Họ',
      message: 'Áo Tứ Thân Kinh Bắc gắn liền với nét đẹp nền nã, ý nhị của Liền chị. Phong cách Y2K vị lai nổi loạn có thể làm đứt gãy sự mềm mại của yếm đào và ruột bao lụa.',
      reason: 'Vẻ đẹp tứ thân nằm ở đường thắt lưng ong kín đáo và sự thanh tân của các lớp yếm màu sắc.',
      respectfulSuggestion: 'Hãy thử phong cách "Soft Girl & Poetic" hoặc "Modern Street" với chân váy dập ly để giữ nguyên nét thơ.',
      culturalContextRef: 'Dân ca Quan họ & Trang phục truyền thống Kinh Bắc'
    };
  }

  // Default Safe
  return {
    isSafe: true,
    severity: 'safe',
    title: 'Bản Phối Chuẩn Mực Văn Hóa',
    message: 'Bản phối kết hợp hài hòa giữa cấu trúc cổ phục truyền thống và các chi tiết cách tân hiện đại của Gen Z mà không làm biến dạng giá trị cốt lõi.',
    reason: 'Các thành phần tôn trọng phom dáng, số lượng vạt áo, hàng cúc và thần thái nguyên bản.',
    respectfulSuggestion: 'Bạn có thể tự tin diện bản phối này khi ra phố, đi sự kiện hoặc xuất thẻ lookbook chia sẻ!',
    culturalContextRef: 'Nguyên lý bảo tồn động (Dynamic Heritage Preservation)'
  };
};

// Helper: Color Harmony Checker
export const checkColorHarmony = (selection: OutfitSelection): ColorHarmonyReport => {
  const garmentColor = COLORS.find((c) => c.id === selection.colorId) || COLORS[0];
  const element = garmentColor.element;

  // Determine complementary harmony
  let ruleName = 'Ngũ Hành Tương Sinh';
  let elementAffinity = 'Hỏa sinh Thổ · Di sản bền vững';
  let score = 92;
  let status: 'excellent' | 'balanced' | 'daring' | 'clashing' = 'excellent';
  let explanation = '';
  let culturalPhilosophy = '';

  switch (element) {
    case 'Hỏa': // Đỏ sơn mài, Hồng sen đào
      ruleName = 'Sơn Mài Chu Sa & Hỏa Sinh Thổ';
      elementAffinity = 'Hỏa sinh Thổ · Vượng khí & Hưng thịnh';
      score = 96;
      status = 'excellent';
      explanation = `Màu ${garmentColor.name} tỏa ra năng lượng ấm áp, thịnh vượng. Khi phối cùng tông đen hoặc xanh denim tạo nên thế tương phản đồ họa mạnh mẽ, hút mắt.`;
      culturalPhilosophy = 'Triết lý âm dương hòa hợp: Sắc đỏ son đại diện cho khí dương quang minh, khi có nền trầm cân bằng sẽ tạo nên thần thái trang nhã, quyền quý.';
      break;

    case 'Thủy': // Xanh chàm, Đen mực tàu
      ruleName = 'Thủy Mặc Kinh Bắc & Thủy Dưỡng Mộc';
      elementAffinity = 'Thủy dưỡng Mộc · Chiều sâu trầm mặc';
      score = 94;
      status = 'excellent';
      explanation = `Tông màu ${garmentColor.name} đại diện cho chiều sâu trí tuệ và sự kiên định. Dễ dàng phối với sneaker trắng ngà hoặc phụ kiện kim loại bạc.`;
      culturalPhilosophy = 'Đạo của nước là nhu thuận nhưng nội lực sâu xa; màu chàm cổ truyền gắn bó với nếp sống thanh bần tao nhã của danh sĩ xưa.';
      break;

    case 'Thổ': // Vàng hoàng yến, Tím cung đình
      ruleName = 'Hoàng Triều Vương Giả & Thổ Sinh Kim';
      elementAffinity = 'Thổ sinh Kim · Tinh hoa hoàng cung';
      score = 95;
      status = 'excellent';
      explanation = `Sắc ${garmentColor.name} gợi cảm giác vương giả, uy nghiêm của chốn hoàng cung Huế, phối tuyệt đẹp với kiềng bạc hoặc trang sức ngọc.`;
      culturalPhilosophy = 'Trung cung Thổ đức: Đất nuôi dưỡng vạn vật, màu hoàng thổ tượng trưng cho đức độ bao dung và sự vững vàng của sơn hà.';
      break;

    case 'Mộc': // Xanh ngọc lục bảo
      ruleName = 'Ngọc Bích Thanh Khiết & Mộc Sinh Hỏa';
      elementAffinity = 'Mộc sinh Hỏa · Sinh khí thanh tân';
      score = 91;
      status = 'balanced';
      explanation = `Sắc ${garmentColor.name} thanh nhã, tôn da người Việt, mang lại cảm giác an yên và mát mắt khi nhìn.`;
      culturalPhilosophy = 'Ngọc dưỡng người, người dưỡng ngọc; màu xanh ngọc biểu thị phẩm chất quân tử khiêm cung, thuần hậu.';
      break;

    case 'Kim': // Trắng ngọc trai
      ruleName = 'Bạch Ngọc Thuần Khiết & Kim Sinh Thủy';
      elementAffinity = 'Kim sinh Thủy · Tao nhã trường cửu';
      score = 93;
      status = 'excellent';
      explanation = `Sắc ${garmentColor.name} là tấm toan hoàn hảo cho mọi kiểu phối đồ, tôn vinh mọi đường cắt may tinh vi nhất.`;
      culturalPhilosophy = 'Vẻ đẹp không cầu kỳ nhưng trường tồn; sắc trắng tơ tằm nguyên bản nhắc nhở về sự chân thật, thanh bạch.';
      break;

    default:
      score = 88;
      status = 'balanced';
      explanation = 'Bản phối màu cân đối, mang đậm hơi thở thời trang hiện đại.';
      culturalPhilosophy = 'Sự hòa hợp giữa nét xưa và nay.';
  }

  return {
    score,
    ruleName,
    status,
    explanation,
    culturalPhilosophy,
    elementAffinity,
    paletteColors: [
      { name: garmentColor.name, hex: garmentColor.hex },
      { name: 'Nền Đối Ứng', hex: garmentColor.secondaryHex },
      { name: 'Phụ Kiện Trắng Ngà', hex: '#FAF8F5' },
      { name: 'Điểm Nhấn Hoàn Thiện', hex: '#1E1D1B' }
    ]
  };
};

// Helper: Weather & Event Suggestion Engine
export const getWeatherEventSuggestion = (
  weatherId: string,
  eventId: string
): { selection: OutfitSelection; reasoning: string; title: string } => {
  // Scenario 1: Summer + Cafe Street
  if (weatherId === 'summer-hot' && eventId === 'cafe-street') {
    return {
      title: 'Bà Ba Gió Mát Cafe Cuối Tuần',
      selection: {
        garmentId: 'ao-ba-ba',
        bottomId: 'pants-denim-wide',
        headwearId: 'head-none',
        footwearId: 'shoes-chunky-sneaker',
        bagId: 'bag-shoulder-leather',
        accessoryId: 'acc-sunglasses-oval',
        styleId: 'style-street',
        colorId: 'imperial-gold'
      },
      reasoning: 'Áo bà ba lụa tơ vàng hoàng yến xẻ tà mát rượi, phối cùng denim thụng năng động, kính oval Y2K và túi kẹp nách; vừa thoáng khí dưới nắng hè 35°C vừa cực kỳ ăn ảnh khi ngồi cafe phố cổ.'
    };
  }

  // Scenario 2: Temple / Heritage + Any weather
  if (eventId === 'temple-heritage') {
    return {
      title: 'Ngũ Thân Trang Nghiêm Hành Hương',
      selection: {
        garmentId: 'ao-ngu-than',
        bottomId: 'pants-silk-wide',
        headwearId: 'head-khan-dong',
        footwearId: 'shoes-embroidered-flats',
        bagId: 'bag-clutch-lacquer',
        accessoryId: 'acc-silver-kieng',
        styleId: 'style-old-money',
        colorId: 'indigo-blue'
      },
      reasoning: 'Áo ngũ thân cổ cao 5 cúc khép kín, quần lụa đen buông rủ cùng kiềng bạc chạm hoa văn trống đồng; đảm bảo 100% sự tôn kính, trang nghiêm nơi cửa Phật và không gian di sản.'
    };
  }

  // Scenario 3: Gala Party / Dạ tiệc
  if (eventId === 'gala-party') {
    return {
      title: 'Đối Khâm Hoàng Gia Dạ Tiệc Đêm',
      selection: {
        garmentId: 'ao-doi-kham',
        bottomId: 'pants-tailored-high',
        headwearId: 'head-man-cach-tan',
        footwearId: 'shoes-leather-loafer',
        bagId: 'bag-clutch-lacquer',
        accessoryId: 'acc-jade-earrings',
        styleId: 'style-creative',
        colorId: 'court-purple'
      },
      reasoning: 'Áo đối khâm tím cung đình viền nẹp gấm dệt kim sa, phối mấn đính ngọc và clutch sơn mài; khí chất uy nghi, nổi bật tuyệt đối tại thảm đỏ sự kiện thời trang.'
    };
  }

  // Scenario 4: Winter Cold + University
  if (weatherId === 'winter-cold') {
    return {
      title: 'Áo Dài Đông Ấm Giảng Đường',
      selection: {
        garmentId: 'ao-dai',
        bottomId: 'pants-tailored-high',
        headwearId: 'head-beret-modern',
        footwearId: 'shoes-chelsea-boots',
        bagId: 'bag-tote-dongho',
        accessoryId: 'acc-headphones',
        styleId: 'style-minimal',
        colorId: 'lacquer-red'
      },
      reasoning: 'Áo dài lụa gấm đỏ sơn mài ấm áp kết hợp mũ beret cổ điển, chelsea boots giữ nhiệt và túi tote đựng laptop; thanh lịch, ấm áp và giàu cảm hứng học tập.'
    };
  }

  // Scenario 5: Festival / Concert
  if (eventId === 'festival-concert') {
    return {
      title: 'Tứ Thân Y2K Rave & Festival',
      selection: {
        garmentId: 'ao-tu-than',
        bottomId: 'skirt-asymmetric-wrap',
        headwearId: 'head-bandana-silk',
        footwearId: 'shoes-chunky-sneaker',
        bagId: 'bag-crossbody-nylon',
        accessoryId: 'acc-sunglasses-oval',
        styleId: 'style-y2k',
        colorId: 'lacquer-red'
      },
      reasoning: 'Yếm đào phối áo tứ thân buông lơi, chân váy bất đối xứng cùng bandana tơ tằm và sneaker; vũ đạo bùng nổ, phá cách vị lai mà vẫn đậm bản sắc dân tộc.'
    };
  }

  // Default Fallback:
  return {
    title: 'Việt Phục Remix Đương Đại',
    selection: {
      garmentId: 'ao-ngu-than',
      bottomId: 'pants-denim-wide',
      headwearId: 'head-none',
      footwearId: 'shoes-chunky-sneaker',
      bagId: 'bag-crossbody-nylon',
      accessoryId: 'acc-headphones',
      styleId: 'style-street',
      colorId: 'lacquer-red'
    },
    reasoning: 'Bản phối kinh điển dung hòa giữa áo ngũ thân di sản và phong cách đường phố năng động của Gen Z.'
  };
};


export const MOCK_COMMUNITY_OUTFITS: SavedOutfit[] = [
  {
    id: 'outfit-001',
    code: 'VIỆT PHỤC REMIX #001',
    name: 'Ngũ Thân Street',
    selection: {
      garmentId: 'ao-ngu-than',
      bottomId: 'pants-denim-wide',
      headwearId: 'head-none',
      footwearId: 'shoes-chunky-sneaker',
      bagId: 'bag-crossbody-nylon',
      accessoryId: 'acc-headphones',
      styleId: 'style-street',
      colorId: 'lacquer-red'
    },
    mixRatio: {
      traditional: 65,
      modern: 35,
      individuality: 94
    },
    whyThisWorks: 'Bản phối giữ áo ngũ thân đỏ son làm yếu tố văn hóa trung tâm, trong khi quần denim ống thụng và chunky sneaker tạo sự cân bằng tuyệt đối với đời sống đường phố của Gen Z.',
    culturalSummary: 'Form áo ngũ thân 5 cúc tượng trưng cho Ngũ Thường, giải phóng khỏi không gian lễ nghi để bước ra phố.',
    creator: {
      name: 'Minh Quân',
      handle: '@quan.remix',
      avatar: 'MQ'
    },
    likesCount: 342,
    createdAt: '2 giờ trước',
    tags: ['Áo ngũ thân', 'Street', 'Đỏ sơn mài', 'Sneaker']
  },
  {
    id: 'outfit-002',
    code: 'VIỆT PHỤC REMIX #002',
    name: 'Áo Dài Minimal',
    selection: {
      garmentId: 'ao-dai',
      bottomId: 'pants-tailored-high',
      headwearId: 'head-none',
      footwearId: 'shoes-minimal-mule',
      bagId: 'bag-shoulder-leather',
      accessoryId: 'acc-silver-kieng',
      styleId: 'style-minimal',
      colorId: 'pearl-white'
    },
    mixRatio: {
      traditional: 75,
      modern: 25,
      individuality: 86
    },
    whyThisWorks: 'Vẻ thanh thoát của tà áo dài lụa trắng kết hợp kiềng bạc truyền thống, tinh giản phụ kiện với túi kẹp nách và mule gót thấp giúp tôn dáng mà không hề rườm rà.',
    culturalSummary: 'Cốt cách áo dài trắng thuần khiết kết tinh vẻ đẹp phụ nữ Việt qua các thời kỳ, hiện đại hóa qua phom may đo.',
    creator: {
      name: 'Khánh Linh',
      handle: '@linh.heritage',
      avatar: 'KL'
    },
    likesCount: 420,
    createdAt: '5 giờ trước',
    tags: ['Áo dài', 'Minimal', 'Trắng ngọc trai', 'Kiềng bạc']
  },
  {
    id: 'outfit-003',
    code: 'VIỆT PHỤC REMIX #003',
    name: 'Tứ Thân Soft',
    selection: {
      garmentId: 'ao-tu-than',
      bottomId: 'skirt-pleated-midi',
      headwearId: 'head-man-cach-tan',
      footwearId: 'shoes-guoc-moc',
      bagId: 'bag-woven-coi',
      accessoryId: 'acc-jade-earrings',
      styleId: 'style-soft',
      colorId: 'lotus-pink'
    },
    mixRatio: {
      traditional: 80,
      modern: 20,
      individuality: 82
    },
    whyThisWorks: 'Bản phối dịu ngọt với gam hồng sen đào và chân váy lụa dập ly, điểm xuyết đôi guốc mộc thanh lịch và túi cói đan tay tạo vẻ đẹp mộc mạc như nàng thơ.',
    culturalSummary: 'Hơi thở dân gian quan họ Kinh Bắc thăng hoa trong chất liệu hiện đại nhẹ tênh.',
    creator: {
      name: 'Thảo My',
      handle: '@my.vietstyle',
      avatar: 'TM'
    },
    likesCount: 289,
    createdAt: '1 ngày trước',
    tags: ['Áo tứ thân', 'Soft', 'Hồng sen đào', 'Nàng thơ']
  },
  {
    id: 'outfit-004',
    code: 'VIỆT PHỤC REMIX #004',
    name: 'Áo Dài Y2K',
    selection: {
      garmentId: 'ao-dai',
      bottomId: 'pants-cargo-minimal',
      headwearId: 'head-bandana-silk',
      footwearId: 'shoes-chunky-sneaker',
      bagId: 'bag-shoulder-leather',
      accessoryId: 'acc-sunglasses-oval',
      styleId: 'style-y2k',
      colorId: 'lacquer-red'
    },
    mixRatio: {
      traditional: 55,
      modern: 45,
      individuality: 96
    },
    whyThisWorks: 'Sự va chạm bất ngờ giữa tà áo dài lụa đỏ và quần túi hộp cargo cùng kính râm oval retro-futuristic, mang đến khí chất vị lai cá tính bậc nhất.',
    culturalSummary: 'Phá vỡ định kiến áo dài chỉ dành cho dịp lễ tết, biến trang phục thành tuyên ngôn thời trang Gen Z.',
    creator: {
      name: 'Bảo Long',
      handle: '@long.y2kviet',
      avatar: 'BL'
    },
    likesCount: 512,
    createdAt: '1 ngày trước',
    tags: ['Áo dài', 'Y2K', 'Quần cargo', 'Kính râm']
  },
  {
    id: 'outfit-005',
    code: 'VIỆT PHỤC REMIX #005',
    name: 'Ngũ Thân Old Money',
    selection: {
      garmentId: 'ao-ngu-than',
      bottomId: 'pants-tailored-high',
      headwearId: 'head-khan-dong',
      footwearId: 'shoes-leather-loafer',
      bagId: 'bag-clutch-lacquer',
      accessoryId: 'acc-silver-kieng',
      styleId: 'style-old-money',
      colorId: 'indigo-blue'
    },
    mixRatio: {
      traditional: 85,
      modern: 15,
      individuality: 90
    },
    whyThisWorks: 'Khắc họa khí chất học giả quý phái xứ kinh kỳ với áo ngũ thân xanh chàm, khăn đóng chỉnh tề kết hợp đôi giày loafer da Ý và clutch sơn mài đẳng cấp.',
    culturalSummary: 'Triết lý mực thước Nho phong thời Nguyễn chuyển hóa thành nét sang trọng vượt thời gian.',
    creator: {
      name: 'Hoàng Bách',
      handle: '@bach.heritage',
      avatar: 'HB'
    },
    likesCount: 630,
    createdAt: '2 ngày trước',
    tags: ['Áo ngũ thân', 'Old money', 'Xanh chàm', 'Khăn đóng']
  },
  {
    id: 'outfit-006',
    code: 'VIỆT PHỤC REMIX #006',
    name: 'Tứ Thân Casual',
    selection: {
      garmentId: 'ao-tu-than',
      bottomId: 'pants-denim-wide',
      headwearId: 'head-none',
      footwearId: 'shoes-minimal-mule',
      bagId: 'bag-tote-dongho',
      accessoryId: 'acc-wooden-fan',
      styleId: 'style-casual',
      colorId: 'jade-green'
    },
    mixRatio: {
      traditional: 70,
      modern: 30,
      individuality: 81
    },
    whyThisWorks: 'Áo tứ thân xanh ngọc mặc như áo khoác mở tà buông nhẹ, phối kèm quần jean ống đứng và túi tote vải đay in tranh Đông Hồ rất thân thuộc.',
    culturalSummary: 'Vạt trước tứ thân buông lơi tự nhiên, thích hợp cho buổi dạo phố cuối tuần hay đọc sách bên hiên quán.',
    creator: {
      name: 'Phương Nhi',
      handle: '@nhi.casualviet',
      avatar: 'PN'
    },
    likesCount: 310,
    createdAt: '2 ngày trước',
    tags: ['Áo tứ thân', 'Casual', 'Xanh ngọc', 'Túi tote']
  },
  {
    id: 'outfit-007',
    code: 'VIỆT PHỤC REMIX #007',
    name: 'Áo Dài Monochrome',
    selection: {
      garmentId: 'ao-dai',
      bottomId: 'pants-silk-wide',
      headwearId: 'head-none',
      footwearId: 'shoes-leather-loafer',
      bagId: 'bag-shoulder-leather',
      accessoryId: 'acc-silver-kieng',
      styleId: 'style-minimal',
      colorId: 'charcoal-black'
    },
    mixRatio: {
      traditional: 78,
      modern: 22,
      individuality: 88
    },
    whyThisWorks: 'Tông đen tuyền mực tàu từ đầu đến chân với quần lụa đen và kiềng bạc sáng lấp lánh ở cổ áo tạo nên ấn tượng thị giác bí ẩn và quyền lực.',
    culturalSummary: 'Màu đen mực tàu gắn với áo dài truyền thống của nam giới và giới trí thức xưa, tái sinh trong phom dáng phi giới tính.',
    creator: {
      name: 'Việt Anh',
      handle: '@anh.mono',
      avatar: 'VA'
    },
    likesCount: 450,
    createdAt: '3 ngày trước',
    tags: ['Áo dài', 'Monochrome', 'Đen mực tàu', 'Kiềng bạc']
  },
  {
    id: 'outfit-008',
    code: 'VIỆT PHỤC REMIX #008',
    name: 'Việt Phục Night Out',
    selection: {
      garmentId: 'ao-doi-kham',
      bottomId: 'skirt-asymmetric-wrap',
      headwearId: 'head-none',
      footwearId: 'shoes-chelsea-boots',
      bagId: 'bag-clutch-lacquer',
      accessoryId: 'acc-sunglasses-oval',
      styleId: 'style-creative',
      colorId: 'court-purple'
    },
    mixRatio: {
      traditional: 58,
      modern: 42,
      individuality: 97
    },
    whyThisWorks: 'Áo đối khâm tím hoàng cung khoác ngoài chân váy quấn xẻ tà, đôi boots da cổ thấp và clutch sơn mài tạo tâm điểm nổi bật cho dạ tiệc sang trọng.',
    culturalSummary: 'Vạt áo đối khâm cung đình mở ra khoảng trống tạo hình đắt giá cho layer thời trang cao cấp ban đêm.',
    creator: {
      name: 'Diệu Thúy',
      handle: '@thuy.couture',
      avatar: 'DT'
    },
    likesCount: 570,
    createdAt: '3 ngày trước',
    tags: ['Áo đối khâm', 'Night out', 'Tím cung đình', 'Boots']
  },
  {
    id: 'outfit-009',
    code: 'VIỆT PHỤC REMIX #009',
    name: 'Việt Phục Cafe',
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
    mixRatio: {
      traditional: 72,
      modern: 28,
      individuality: 83
    },
    whyThisWorks: 'Áo bà ba vàng hoàng yến mềm mại phối cùng quần jeans thụng cạp cao, mũ beret da và quạt trầm tạo nét thư thái tuyệt vời khi thưởng thức cafe sáng.',
    culturalSummary: 'Áo bà ba Nam Bộ được tháo bỏ ranh giới thôn dã để hòa nhập vào đời sống quán xá thanh xuân của giới trẻ.',
    creator: {
      name: 'Quỳnh Trang',
      handle: '@trang.coffee',
      avatar: 'QT'
    },
    likesCount: 395,
    createdAt: '4 ngày trước',
    tags: ['Áo bà ba', 'Cafe vibe', 'Vàng hoàng yến', 'Mũ beret']
  },
  {
    id: 'outfit-010',
    code: 'VIỆT PHỤC REMIX #010',
    name: 'Việt Phục Festival',
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
    mixRatio: {
      traditional: 60,
      modern: 40,
      individuality: 95
    },
    whyThisWorks: 'Cổ áo giao lĩnh chữ V hoài cổ bay bổng giữa không gian âm nhạc bùng nổ, phối ăn ý với tai nghe over-ear và sneaker đế bự.',
    culturalSummary: 'Cổ phục thời Lý - Trần giao hòa tràn đầy sinh lực vào lễ hội âm nhạc và không gian nghệ thuật ngoài trời.',
    creator: {
      name: 'Đức Huy',
      handle: '@huy.festival',
      avatar: 'DH'
    },
    likesCount: 680,
    createdAt: '4 ngày trước',
    tags: ['Áo giao lĩnh', 'Festival', 'Xanh chàm', 'Gen Z']
  },
  {
    id: 'outfit-011',
    code: 'VIỆT PHỤC REMIX #011',
    name: 'Việt Phục University',
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
    mixRatio: {
      traditional: 76,
      modern: 24,
      individuality: 85
    },
    whyThisWorks: 'Bộ outfit trang nghiêm mực thước nhưng vẫn rất trẻ: Áo ngũ thân tay chẽn trắng ngà phối quần tây xếp ly, túi tote vải đựng vừa laptop và sách vở.',
    culturalSummary: 'Đưa vẻ đẹp tri thức của trang phục truyền thống quay trở lại giảng đường đại học hiện đại.',
    creator: {
      name: 'Tuấn Khang',
      handle: '@khang.uni',
      avatar: 'TK'
    },
    likesCount: 415,
    createdAt: '5 ngày trước',
    tags: ['Áo ngũ thân', 'University', 'Học đường', 'Trắng ngà']
  },
  {
    id: 'outfit-012',
    code: 'VIỆT PHỤC REMIX #012',
    name: 'Việt Phục Editorial',
    selection: {
      garmentId: 'ao-doi-kham',
      bottomId: 'skirt-asymmetric-wrap',
      headwearId: 'head-man-cach-tan',
      footwearId: 'shoes-chelsea-boots',
      bagId: 'bag-clutch-lacquer',
      accessoryId: 'acc-silver-kieng',
      styleId: 'style-creative',
      colorId: 'lacquer-red'
    },
    mixRatio: {
      traditional: 52,
      modern: 48,
      individuality: 99
    },
    whyThisWorks: 'Bản phối mang tính tuyên ngôn nghệ thuật bìa tạp chí: Áo đối khâm đỏ thêu chỉ vàng, mấn cao đính ngọc cùng kiềng bạc sáng rực rỡ bên đôi chelsea boots quyền lực.',
    culturalSummary: 'Cốt cách hoàng gia đỉnh cao hòa quyện cùng tư duy thời trang avant-garde quốc tế.',
    creator: {
      name: 'Hà Trang',
      handle: '@trang.editorial',
      avatar: 'HT'
    },
    likesCount: 890,
    createdAt: '6 ngày trước',
    tags: ['Áo đối khâm', 'Editorial', 'Đỏ sơn mài', 'Runway']
  }
];

export const AI_PROMPT_EXAMPLES: AIStylistPromptExample[] = [
  {
    id: 'ai-example-1',
    prompt: 'Tôi muốn một outfit Việt phục để đi cafe cùng bạn bè cuối tuần.',
    targetContext: 'Đi cafe chill, chụp ảnh check-in tự nhiên, trẻ trung',
    suggestedSelection: {
      garmentId: 'ao-ba-ba',
      bottomId: 'pants-denim-wide',
      headwearId: 'head-beret-modern',
      footwearId: 'shoes-minimal-mule',
      bagId: 'bag-woven-coi',
      accessoryId: 'acc-wooden-fan',
      styleId: 'style-casual',
      colorId: 'imperial-gold'
    },
    reasoning: 'Áo bà ba vàng hoàng yến mang lại cảm giác thân thiện, nhẹ nhõm, phối cùng quần denim rộng và túi cói đan tay tạo vẻ đẹp thanh xuân trong trẻo rất ăn ảnh dưới nắng quán cafe.'
  },
  {
    id: 'ai-example-2',
    prompt: 'Tôi muốn outfit Việt phục để đi học đại học và thuyết trình.',
    targetContext: 'Giảng đường, trang nhã, nghiêm túc nhưng không già',
    suggestedSelection: {
      garmentId: 'ao-ngu-than',
      bottomId: 'pants-tailored-high',
      headwearId: 'head-none',
      footwearId: 'shoes-leather-loafer',
      bagId: 'bag-tote-dongho',
      accessoryId: 'acc-wooden-fan',
      styleId: 'style-minimal',
      colorId: 'pearl-white'
    },
    reasoning: 'Áo ngũ thân tay chẽn trắng ngà tôn lên cốt cách mực thước, kín đáo phù hợp môi trường học đường, phối quần tây may đo và giày loafer tạo phong thái tự tin, trí thức.'
  },
  {
    id: 'ai-example-3',
    prompt: 'Tôi muốn outfit Việt phục đi concert âm nhạc hoặc festival.',
    targetContext: 'Sôi động, cần di chuyển nhiều, nổi bật đám đông',
    suggestedSelection: {
      garmentId: 'ao-giao-linh',
      bottomId: 'pants-cargo-minimal',
      headwearId: 'head-bandana-silk',
      footwearId: 'shoes-chunky-sneaker',
      bagId: 'bag-crossbody-nylon',
      accessoryId: 'acc-headphones',
      styleId: 'style-street',
      colorId: 'indigo-blue'
    },
    reasoning: 'Áo giao lĩnh mở tà bay bổng kết hợp quần cargo và chunky sneaker giúp bạn thoải mái nhảy nhót, trong khi tai nghe và khăn bandana tạo chất streetwear sắc lẹm.'
  },
  {
    id: 'ai-example-4',
    prompt: 'Tôi muốn outfit Việt phục chụp ảnh lookbook nghệ thuật tại bảo tàng hoặc phố cổ.',
    targetContext: 'Tạo hình nghệ thuật, đường nét sắc nét, có chiều sâu di sản',
    suggestedSelection: {
      garmentId: 'ao-dai',
      bottomId: 'pants-silk-wide',
      headwearId: 'head-man-cach-tan',
      footwearId: 'shoes-guoc-moc',
      bagId: 'bag-clutch-lacquer',
      accessoryId: 'acc-silver-kieng',
      styleId: 'style-old-money',
      colorId: 'lacquer-red'
    },
    reasoning: 'Sắc đỏ sơn mài tương phản trên nền không gian kiến trúc cổ kính. Tà áo dài tha thướt phối kiềng bạc sáng và guốc mộc tạo nên bố cục thị giác đắt giá từng khung hình.'
  },
  {
    id: 'ai-example-5',
    prompt: 'Tôi muốn outfit Việt phục theo phong cách streetwear phá cách táo bạo.',
    targetContext: 'Street style cá tính, tương phản mạnh, tinh thần Gen Z',
    suggestedSelection: {
      garmentId: 'ao-ngu-than',
      bottomId: 'pants-denim-wide',
      headwearId: 'head-none',
      footwearId: 'shoes-chunky-sneaker',
      bagId: 'bag-crossbody-nylon',
      accessoryId: 'acc-sunglasses-oval',
      styleId: 'style-street',
      colorId: 'charcoal-black'
    },
    reasoning: 'Áo ngũ thân đen mực tàu mở cúc ngực kết hợp cùng kính râm oval và sneaker đế hầm hố. Sự tôn trọng văn hóa nằm ở đường may chuẩn, còn cá tính nằm ở cách biến hóa tự do.'
  },
  {
    id: 'ai-example-6',
    prompt: 'Dự lễ cưới ngoài trời phong cách Bohemian & Di sản',
    targetContext: 'Lễ cưới sân vườn ngoài trời, lãng mạn, tôn vinh truyền thống',
    suggestedSelection: {
      garmentId: 'ao-dai',
      bottomId: 'skirt-pleated-midi',
      headwearId: 'head-man-cach-tan',
      footwearId: 'shoes-minimal-mule',
      bagId: 'bag-woven-coi',
      accessoryId: 'acc-jade-earrings',
      styleId: 'style-soft',
      colorId: 'lotus-pink'
    },
    reasoning: 'Áo dài lụa màu hồng sen đào kết hợp chân váy dập ly xòe nhẹ nhàng và mấn ngọc, điểm xuyết khuyên tai ngọc bích tạo vẻ đẹp thơ mộng, vừa đúng nghi lễ chúc phúc vừa phóng khoáng hòa vào thiên nhiên.'
  }
];

// =========================================================================
// 1. WHERE TO WEAR? (Bản đồ Vibe Check & Điểm Đến Thực Tế Tại Việt Nam)
// =========================================================================
export const WHERE_TO_WEAR_LOCATIONS: WhereToWearLocation[] = [
  {
    id: 'loc-hoang-thanh',
    name: 'Hoàng Thành Thăng Long & Đoan Môn',
    city: 'Hà Nội',
    category: 'heritage',
    categoryName: 'Di Tích Cung Đình',
    address: '19C Hoàng Diệu, Điện Bàn, Ba Đình, Hà Nội',
    vibeTag: 'Heritage Old Money & Cung Đình Trang Trọng',
    matchScore: 98,
    bestTime: '07:30 - 09:30 sáng (Nắng xiên rọi qua vòm cổng Đoan Môn)',
    photoAngleTip: 'Đứng tại bậc thềm Điện Kính Thiên hoặc chính giữa vòm cuốn Đoan Môn, chụp góc thấp để lấy trọn vạt tà áo bay và chiều sâu kiến trúc cổ kính.',
    recommendedGarments: ['ao-ngu-than', 'ao-tac', 'ao-giao-linh', 'ao-nhat-binh', 'ao-doi-kham'],
    stylingTips: 'Nên kết hợp cùng Kiềng Bạc Chạm Trống Đồng, Quần Lụa Tơ Tằm và Giày Loafer/Guốc Mộc để tạo thần thái đĩnh đạc, nho nhã.',
    quote: 'Nơi nghìn năm văn hiến giao hòa cùng nhịp bước của thế hệ mới.',
    heroColor: '#8B1E1E',
    coordinates: { lat: 21.0348, lng: 105.8404 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ho%C3%A0ng+Th%C3%A0nh+Th%C4%83ng+Long+19C+Ho%C3%A0ng+Di%E1%BB%87u+H%C3%A0+N%E1%BB%99i'
  },
  {
    id: 'loc-dai-noi-hue',
    name: 'Đại Nội Cố Đô & Lăng Khải Định',
    city: 'Huế',
    category: 'heritage',
    categoryName: 'Cố Đô Di Sản',
    address: 'Đường 23/8, Thuận Hòa, TP. Huế, Thừa Thiên Huế',
    vibeTag: 'Imperial Luxury & Hoàng Gia Trầm Mặc',
    matchScore: 96,
    bestTime: '15:30 - 17:15 chiều (Ánh hoàng hôn vàng cam buông xuống Ngọ Môn)',
    photoAngleTip: 'Chụp trên cầu Trung Đạo hướng nhìn ra Ngọ Môn hoặc dọc hành lang đỏ sơn son thếp vàng, xoay nhẹ người 45 độ khoe đường thêu nẹp áo.',
    recommendedGarments: ['ao-nhat-binh', 'ao-tac', 'ao-doi-kham', 'ao-ngu-than'],
    stylingTips: 'Lý tưởng nhất với sắc Tím Cung Đình hoặc Đỏ Sơn Mài, mang Mấn Ngọc Trai và quạt xếp thủ công.',
    quote: 'Dấu ấn cung đình vàng son một thuở lắng đọng trong từng nếp áo gấm.',
    heroColor: '#532D4B',
    coordinates: { lat: 16.4697, lng: 107.5775 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=%C4%90%E1%BA%A1i+N%E1%BB%99i+Hu%E1%BA%BF+%C4%91%C6%B0%E1%BB%9Dng+23%2F8+Thu%E1%BA%ADn+H%C3%B2a+Hu%E1%BA%BF'
  },
  {
    id: 'loc-the-factory-art',
    name: 'The Factory Contemporary Arts Centre',
    city: 'TP. Hồ Chí Minh',
    category: 'contemporary_art',
    categoryName: 'Triển Lãm Nghệ Thuật Đương Đại',
    address: '15 Nguyễn Ư Dĩ, Thảo Điền, TP. Thủ Đức, TP.HCM',
    vibeTag: 'Cyberpunk Noir & Avant-Garde Remix',
    matchScore: 94,
    bestTime: '14:00 - 18:00 (Ánh sáng studio và gallery đương đại)',
    photoAngleTip: 'Tạo dáng trước các mảng tường bê tông xám hoặc cụm installation nghệ thuật, tư thế tự tin khoe phối áo Giao Lĩnh mở cúc với kính râm oval.',
    recommendedGarments: ['ao-giao-linh', 'ao-ngu-than', 'ao-doi-kham'],
    stylingTips: 'Mix Áo Giao Lĩnh đen mực tàu cùng Quần Cargo, Chelsea Boots và Tai Nghe Over-Ear để toát lên chất avant-garde hiện đại.',
    quote: 'Sự giao thoa bất ngờ giữa di sản Việt và tinh thần nghệ thuật trừu tượng thế kỷ 21.',
    heroColor: '#23395B',
    coordinates: { lat: 10.8037, lng: 106.7329 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=15+Nguy%E1%BB%85n+%C6%AF+D%C4%A9+Th%E1%BA%A3o+%C4%90i%E1%BB%81n+Th%E1%BB%A7+%C4%90%E1%BB%A9c+TPHCM'
  },
  {
    id: 'loc-vcca-hanoi',
    name: 'Trung Tâm Nghệ Thuật Đương Đại VCCA',
    city: 'Hà Nội',
    category: 'contemporary_art',
    categoryName: 'Không Gian Triển Lãm Hiện Đại',
    address: 'B1-R3, Royal City, 72A Nguyễn Trãi, Thanh Xuân, Hà Nội',
    vibeTag: 'Minimalist Campus & High Fashion Gallery',
    matchScore: 92,
    bestTime: '10:00 - 19:00 (Ánh sáng spotlight gallery hoàn hảo cho lookbook)',
    photoAngleTip: 'Chụp toàn thân với background tranh trừu tượng khổ lớn, phối hợp ánh sáng spotlight chiếu rọi chất liệu lụa bóng.',
    recommendedGarments: ['ao-ngu-than', 'ao-tu-than', 'ao-dai'],
    stylingTips: 'Sơ vin vạt trước (French Tuck) với Quần Tây May Đo Cạp Cao và Giày Mule tối giản.',
    quote: 'Tuyên ngôn phong cách của người trẻ trí thức yêu nét đẹp cội nguồn.',
    heroColor: '#1E382B',
    coordinates: { lat: 21.0028, lng: 105.8158 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=VCCA+Vincom+Mega+Mall+Royal+City+72A+Nguy%E1%BB%85n+Tr%C3%A3i+H%C3%A0+N%E1%BB%99i'
  },
  {
    id: 'loc-pho-co-hoi-an',
    name: 'Phố Cổ Hội An & Giàn Hoa Giấy',
    city: 'Hội An',
    category: 'heritage',
    categoryName: 'Phố Cổ Sông Hoài',
    address: 'Trần Phú & Bạch Đằng, TP. Hội An, Quảng Nam',
    vibeTag: 'Poetic Chic & Hoài Niệm Phố Hội',
    matchScore: 95,
    bestTime: '06:30 - 08:00 sáng hoặc 18:30 phố lên đèn hoa đăng',
    photoAngleTip: 'Tựa nhẹ lưng vào bức tường vàng rêu phong dưới giàn hoa giấy rực rỡ, góc chụp nghiêng lấy nụ cười nhẹ và quạt gỗ xếp.',
    recommendedGarments: ['ao-ba-ba', 'ao-tu-than', 'ao-dai', 'ao-ngu-than'],
    stylingTips: 'Màu Hồng Sen Đào hoặc Vàng Hoàng Yến phối cùng Chân Váy Quấn Xẻ Tà, Túi Cói Đan Mây và Guốc Mộc.',
    quote: 'Chạm vào ký ức êm đềm bên dòng sông Hoài với tà áo mộc mạc.',
    heroColor: '#D97706',
    coordinates: { lat: 15.8778, lng: 108.3283 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ph%E1%BB%91+C%E1%BB%95+H%E1%BB%99i+An+Tr%E1%BA%A7n+Ph%C3%BA+B%E1%BA%A1ch+%C4%90%E1%BA%B1ng+Qu%E1%BA%A3ng+Nam'
  },
  {
    id: 'loc-industrial-cafe',
    name: 'Quán Cafe Concept Industrial & Brutalist',
    city: 'TP. Hồ Chí Minh',
    category: 'concept_cafe',
    categoryName: 'Cafe Không Gian Sáng Tạo',
    address: 'Các chuỗi concept: Là Việt, The Running Bean, Okkio Caffe',
    vibeTag: 'Daily Streetwear & Cafe Chill Cuối Tuần',
    matchScore: 91,
    bestTime: '09:00 - 11:30 sáng hoặc 15:00 - 17:00',
    photoAngleTip: 'Ngồi tại quầy bar inox/kim loại, tay cầm ly cà phê thủ công, chụp góc bán thân bắt cận chi tiết khuy cài ngọc và cổ áo năm thân.',
    recommendedGarments: ['ao-ba-ba', 'ao-ngu-than', 'ao-giao-linh'],
    stylingTips: 'Áo Bà Ba / Áo Ngũ Thân phối Quần Denim Ống Rộng Rách nhẹ và Chunky Sneaker — thoải mái làm việc hay trò chuyện cùng bạn bè.',
    quote: 'Khi cổ phục bước ra đời sống hàng ngày một cách tự nhiên và duyên dáng nhất.',
    heroColor: '#475569',
    coordinates: { lat: 10.7769, lng: 106.6953 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Okkio+Caffe+The+Running+Bean+L%C3%A0+Vi%E1%BB%87t+TP+H%E1%BB%93+Ch%C3%AD+Minh'
  },
  {
    id: 'loc-trung-thu-luong-nhu-hoc',
    name: 'Phố Lồng Đèn Lương Nhữ Học & Phố Đi Bộ',
    city: 'TP. Hồ Chí Minh',
    category: 'festival',
    categoryName: 'Lễ Hội Đèn Lồng & Dạo Phố',
    address: 'Khu phố cổ Chợ Lớn, Quận 5, TP. Hồ Chí Minh',
    vibeTag: 'Festive Vibrant & Ánh Sáng Lung Linh',
    matchScore: 97,
    bestTime: '18:00 - 21:30 tối mùa Trung Thu & Lễ Hội',
    photoAngleTip: 'Đứng giữa rừng đèn lồng rực rỡ sắc màu, tận dụng bokeh ánh đèn lấp lánh phản chiếu trên nền áo lụa bóng.',
    recommendedGarments: ['ao-ba-ba', 'ao-tu-than', 'ao-dai', 'ao-ngu-than'],
    stylingTips: 'Phối Áo Sắc Đỏ Sơn Mài hoặc Hồng Sen cùng Mấn Ngọc Cách Tân và Túi Cói, cầm lồng đèn con giống truyền thống.',
    quote: 'Sống trọn khoảnh khắc lễ hội tuổi thơ rực rỡ trong sắc áo quê hương.',
    heroColor: '#E11D48',
    coordinates: { lat: 10.7519, lng: 106.6601 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ph%E1%BB%91+l%E1%BB%93ng+%C4%91%C3%A8n+L%C6%B0%C6%A1ng+Nh%E1%BB%AF+H%E1%BB%8Dc+Qu%E1%BA%ADn+5+TPHCM'
  },
  {
    id: 'loc-monsoon-indie',
    name: 'Monsoon Music Festival & Indie Concert',
    city: 'Hà Nội',
    category: 'indie_event',
    categoryName: 'Đêm Nhạc Sống & Festival Trẻ',
    address: 'Quảng trường Đông Kinh Nghĩa Thục hoặc Sân khấu Hoàng Thành',
    vibeTag: 'Gen Z Rebellion & High Energy',
    matchScore: 93,
    bestTime: '19:00 - 23:00 (Không gian lễ hội âm nhạc đêm bùng nổ)',
    photoAngleTip: 'Bắt khoảnh khắc chuyển động (motion blur) khi hòa mình vào điệu nhạc, tà áo tung bay dưới ánh đèn laser sân khấu.',
    recommendedGarments: ['ao-giao-linh', 'ao-ngu-than'],
    stylingTips: 'Mix cùng Quần Cargo phản quang, Sneaker hầm hố và Khăn Bandana lụa buộc đầu cá tính.',
    quote: 'Âm nhạc đương đại và bản sắc di sản cùng hòa chung một nhịp đập tuổi trẻ.',
    heroColor: '#7C3AED',
    coordinates: { lat: 21.0315, lng: 105.8524 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Qu%E1%BA%A3ng+tr%C6%B0%E1%BB%9Dng+%C4%90%C3%B4ng+Kinh+Ngh%C4%A9a+Th%E1%BB%A5c+Ho%C3%A0n+Ki%E1%BA%BFm+H%C3%A0+N%E1%BB%99i'
  }
];

// =========================================================================
// 2. TỦ ĐỒ CỦA TÔI (Sustainable Digital Wardrobe & AI Scanner)
// =========================================================================
export const SUSTAINABLE_WARDROBE_ITEMS: SustainableItem[] = [
  {
    id: 'sus-levis-jeans',
    name: 'Quần Jeans Levi’s 501 Vintage Cũ Có Sẵn',
    category: 'bottom',
    brandOrType: 'Vintage Denim có sẵn trong tủ',
    material: '100% Rigid Cotton Denim',
    waterSavedLiters: 3200,
    co2SavedKg: 8.5,
    compatibilityNote: 'Độ cứng cáp và màu chàm của denim tôn lên sự mềm mại của tà áo Ngũ Thân hoặc Áo Bà Ba, tạo độ tương phản chất liệu cực hút mắt.',
    targetSlotId: 'bottomId',
    mappedItemId: 'pants-denim-wide',
    icon: '👖'
  },
  {
    id: 'sus-uniqlo-trousers',
    name: 'Quần Tây Xếp Ly May Đo Công Sở Có Sẵn',
    category: 'bottom',
    brandOrType: 'Smart Pleated Trousers (Uniqlo/Zara)',
    material: 'Polyester Blend co giãn thoáng khí',
    waterSavedLiters: 1800,
    co2SavedKg: 5.2,
    compatibilityNote: 'Phom ống đứng chuẩn mực giúp tôn dáng thư sinh khi sơ vin cùng Áo Ngũ Thân hoặc Áo Giao Lĩnh cạp cao.',
    targetSlotId: 'bottomId',
    mappedItemId: 'pants-tailored-high',
    icon: '🩳'
  },
  {
    id: 'sus-adidas-samba',
    name: 'Đôi Sneaker Adidas Samba / Gazelle Đi Hàng Ngày',
    category: 'footwear',
    brandOrType: 'Classic Low-top Sneaker',
    material: 'Leather & Suede Sole',
    waterSavedLiters: 2400,
    co2SavedKg: 6.8,
    compatibilityNote: 'Phom dáng thon gọn giúp bước đi thanh thoát, kéo gần khoảng cách giữa cổ phục trang nghiêm và phong cách dạo phố trẻ trung.',
    targetSlotId: 'footwearId',
    mappedItemId: 'shoes-chunky-sneaker',
    icon: '👟'
  },
  {
    id: 'sus-tote-canvas',
    name: 'Túi Tote Vải Canvas In Typo Nghệ Thuật',
    category: 'bag',
    brandOrType: 'Eco Canvas Everyday Tote',
    material: '100% Recycled Cotton Canvas',
    waterSavedLiters: 1200,
    co2SavedKg: 3.4,
    compatibilityNote: 'Chất liệu vải mộc thân thiện môi trường, phù hợp mang sách vở laptop đi học hoặc đi cà phê làm việc.',
    targetSlotId: 'bagId',
    mappedItemId: 'bag-crossbody-nylon',
    icon: '👜'
  },
  {
    id: 'sus-dr-martens',
    name: 'Giày Da Chelsea Boots / Dr. Martens 1461',
    category: 'footwear',
    brandOrType: 'Leather Oxford / Chelsea Boots',
    material: 'Smooth Black Leather',
    waterSavedLiters: 3500,
    co2SavedKg: 9.6,
    compatibilityNote: 'Đế đệm cao và chất da đen bóng tạo điểm tựa đĩnh đạc cho vạt áo Giao Lĩnh hoặc Áo Tấc khi đi sự kiện trang trọng.',
    targetSlotId: 'footwearId',
    mappedItemId: 'shoes-chelsea-boots',
    icon: '👞'
  },
  {
    id: 'sus-pleated-skirt',
    name: 'Chân Váy Dập Ly Dáng Dài Vintage',
    category: 'bottom',
    brandOrType: 'Midi Pleated Vintage Skirt',
    material: 'Soft Chiffon / Linen Blend',
    waterSavedLiters: 2100,
    co2SavedKg: 5.9,
    compatibilityNote: 'Độ xòe rủ bồng bềnh kết hợp hoàn hảo cùng Áo Dài Tố Nữ hoặc Áo Tứ Thân thắt dải yếm lụa.',
    targetSlotId: 'bottomId',
    mappedItemId: 'skirt-pleated-midi',
    icon: '👗'
  }
];

// =========================================================================
// 3. SMART AI CONTEXT (Gợi Ý Theo Ngữ Cảnh Thời Gian Thực & Thời Tiết)
// =========================================================================
export const REALTIME_SMART_CONTEXTS: SmartAIContext[] = [
  {
    id: 'ctx-hanoi-autumn-cold',
    title: 'Hà Nội Đông Se Lạnh (15°C - 18°C)',
    seasonOrFestival: 'Mùa Đông Gió Bấc & Phố Cổ Hà Nội',
    city: 'Hà Nội',
    temperature: '15°C',
    weatherCondition: 'Gió mùa đông bắc nhẹ, trời se lạnh khô ráo',
    icon: '🍁',
    aiPromptMessage: 'Hà Nội hôm nay 15°C se lạnh, AI gợi ý bạn phối Áo Tấc với một chiếc áo cổ lọ (turtleneck) mỏng bên trong để giữ ấm mà vẫn giữ chuẩn vibe Heritage sang trọng.',
    stylingRecommendation: 'Phối Áo Tấc hoặc Áo Ngũ Thân lụa dày dặn, mặc kèm áo len cổ lọ mỏng bên trong, đi cùng Quần Tây may đo và Chelsea Boots.',
    suggestedSelection: {
      garmentId: 'ao-tac',
      bottomId: 'pants-tailored-high',
      footwearId: 'shoes-chelsea-boots',
      accessoryId: 'acc-silver-kieng',
      fabricTexture: 'brocade',
      textureIntensity: 'rich',
      colorId: 'lacquer-red',
      tuckStyle: 'untucked'
    },
    destinationRefId: 'loc-hoang-thanh',
    badge: 'Trending Thời Tiết Hôm Nay'
  },
  {
    id: 'ctx-trung-thu-lantern',
    title: 'Mùa Trung Thu Dạo Phố Lồng Đèn',
    seasonOrFestival: 'Lễ Hội Trăng Rằm & Phố Lồng Đèn',
    city: 'TP. Hồ Chí Minh / Hà Nội',
    temperature: '26°C',
    weatherCondition: 'Đêm trăng thanh gió mát, phố xá lên đèn rực rỡ',
    icon: '🏮',
    aiPromptMessage: 'Chỉ còn ít ngày nữa là đến Trung Thu, thử ngay bản phối Áo Bà Ba phong cách Y2K để dạo phố lồng đèn Lương Nhữ Học hay Phố Đi Bộ nhé!',
    stylingRecommendation: 'Áo Bà Ba sắc vàng hoàng yến hoặc hồng cánh sen, phối Chân Váy Dập Ly hoặc Quần Denim, điểm xuyết Mấn Ngọc Trai và quạt gỗ xếp.',
    suggestedSelection: {
      garmentId: 'ao-ba-ba',
      bottomId: 'skirt-pleated-midi',
      headwearId: 'head-man-cach-tan',
      footwearId: 'shoes-minimal-mule',
      bagId: 'bag-woven-coi',
      accessoryId: 'acc-wooden-fan',
      colorId: 'imperial-gold',
      tuckStyle: 'half-tuck'
    },
    destinationRefId: 'loc-trung-thu-luong-nhu-hoc',
    badge: 'Mùa Lễ Hội Đang Diễn Ra'
  },
  {
    id: 'ctx-saigon-sunny',
    title: 'Sài Gòn Nắng Ráo (29°C - 32°C)',
    seasonOrFestival: 'Ngày Nắng Đẹp & Cafe Sáng Thảo Điền',
    city: 'TP. Hồ Chí Minh',
    temperature: '31°C',
    weatherCondition: 'Trời trong xanh, nắng ấm chan hòa',
    icon: '☀️',
    aiPromptMessage: 'Sài Gòn 31°C nắng đẹp, AI khuyên chọn Áo Ngũ Thân chất liệu Vải Lanh (Linen) thoáng khí cùng Quần Lụa Tơ Tằm mềm mát để thoải mái cafe.',
    stylingRecommendation: 'Áo Ngũ Thân tay chẽn hoặc Áo Đối Khâm dáng ngắn, mở tà nhẹ nhàng phối cùng Sneaker và Kính Râm Oval chống tia UV.',
    suggestedSelection: {
      garmentId: 'ao-ngu-than',
      bottomId: 'pants-silk-wide',
      footwearId: 'shoes-chunky-sneaker',
      accessoryId: 'acc-sunglasses-oval',
      fabricTexture: 'linen',
      textureIntensity: 'medium',
      colorId: 'jade-green',
      tuckStyle: 'untucked'
    },
    destinationRefId: 'loc-industrial-cafe',
    badge: 'Thoáng Khí & Năng Động'
  },
  {
    id: 'ctx-dalat-foggy',
    title: 'Đà Lạt Mù Sương & Chiều Tà (14°C)',
    seasonOrFestival: 'Cao Nguyên Sương Mù & Thung Lũng Mơ Màng',
    city: 'Đà Lạt',
    temperature: '14°C',
    weatherCondition: 'Sương mù lãng đãng, hoàng hôn buông se lạnh',
    icon: '🌲',
    aiPromptMessage: 'Đà Lạt 14°C thơ mộng, AI đề xuất phối Áo Giao Lĩnh kết hợp áo Mũ Beret Cổ Điển và Khăn Lụa Bandana ấm áp giữa rừng thông.',
    stylingRecommendation: 'Áo Giao Lĩnh cổ chéo kết hợp Mũ Nồi Beret, Quần Tây cạp cao và Boots da cổ cao, cầm túi da quai chéo.',
    suggestedSelection: {
      garmentId: 'ao-giao-linh',
      bottomId: 'pants-tailored-high',
      headwearId: 'head-beret-modern',
      footwearId: 'shoes-chelsea-boots',
      bagId: 'bag-shoulder-leather',
      colorId: 'indigo-blue',
      fabricTexture: 'silk',
      tuckStyle: 'full-tuck'
    },
    destinationRefId: 'loc-the-factory-art',
    badge: 'Vintage & Điện Ảnh'
  },
  {
    id: 'ctx-tet-du-xuan',
    title: 'Mùa Tết & Dạo Phố Du Xuân',
    seasonOrFestival: 'Tết Cổ Truyền & Hội Xuân',
    city: 'Toàn Quốc',
    temperature: '21°C',
    weatherCondition: 'Mưa xuân lất phất, đào mai nở rộ đón xuân',
    icon: '🌸',
    aiPromptMessage: 'Không khí Tết rộn ràng đón xuân mới, hãy chọn bản phối Áo Dài / Áo Ngũ Thân Sắc Đỏ Sơn Mài cùng Kiềng Bạc Đồng Đông Sơn rước may mắn tài lộc!',
    stylingRecommendation: 'Áo Ngũ Thân hoặc Áo Dài truyền thống sắc Đỏ Sơn Mài / Vàng Hoàng Yến, kết hợp Kiềng Bạc chạm khắc và Guốc Mộc thanh tao.',
    suggestedSelection: {
      garmentId: 'ao-dai',
      bottomId: 'pants-silk-wide',
      headwearId: 'head-man-cach-tan',
      footwearId: 'shoes-guoc-moc',
      accessoryId: 'acc-silver-kieng',
      bagId: 'bag-clutch-lacquer',
      colorId: 'lacquer-red',
      fabricTexture: 'brocade',
      tuckStyle: 'untucked'
    },
    destinationRefId: 'loc-hoang-thanh',
    badge: 'Lễ Hội Văn Hóa Đỉnh Cao'
  }
];

// Helper: Calculate Vibe Match and rank Where-to-Wear Destinations based on current OutfitSelection
export function getWhereToWearRecommendations(selection: OutfitSelection): WhereToWearLocation[] {
  const gId = selection.garmentId;
  const sId = selection.styleId;
  const bId = selection.bottomId;

  return WHERE_TO_WEAR_LOCATIONS.map((loc) => {
    let score = loc.matchScore;

    // Direct garment compatibility
    if (loc.recommendedGarments.includes(gId)) {
      score += 4;
    } else {
      score -= 8;
    }

    // Heritage bonus
    if ((loc.category === 'heritage' || loc.category === 'festival') && (gId === 'ao-tac' || gId === 'ao-nhat-binh' || gId === 'ao-ngu-than')) {
      score += 5;
    }

    // Street & Modern art bonus
    if (loc.category === 'contemporary_art' || loc.category === 'concept_cafe' || loc.category === 'indie_event') {
      if (sId === 'style-street' || sId === 'style-cyberpunk' || bId === 'pants-denim-wide' || bId === 'pants-cargo-minimal') {
        score += 6;
      }
    }

    // Soft & Poetic bonus for Hoi An / Cafe
    if (loc.id === 'loc-pho-co-hoi-an' && (gId === 'ao-ba-ba' || gId === 'ao-tu-than' || sId === 'style-soft')) {
      score += 6;
    }

    const finalScore = Math.min(99, Math.max(65, score));

    return {
      ...loc,
      matchScore: finalScore
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}
