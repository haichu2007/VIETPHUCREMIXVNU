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
  AIStylistPromptExample
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
  }
];

export const ACCESSORY_PIECES: AccessoryPiece[] = [
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
    culturalMeaning: 'Màu son chu sa trong nghệ thuật sơn mài truyền thống, đại diện cho năng lượng hưng thịnh, điềm lành và may mắn viên mãn.'
  },
  {
    id: 'imperial-gold',
    name: 'Vàng Hoàng Yến',
    vietnameseName: 'Vàng Hoàng Cung & Tơ Tằm',
    hex: '#C89B3C',
    secondaryHex: '#8C671C',
    textColor: '#1E1D1B',
    culturalMeaning: 'Màu của ánh thái dương và di sản hoàng gia Huế, gợi nhớ sắc óng ả của những kén tằm chín rộ trên nương dâu.'
  },
  {
    id: 'indigo-blue',
    name: 'Xanh Chàm Indigo',
    vietnameseName: 'Chàm Nhuộm Lá Tự Nhiên',
    hex: '#23395B',
    secondaryHex: '#142137',
    textColor: '#FFFFFF',
    culturalMeaning: 'Sắc màu trầm mặc từ cây chàm của đồng bào vùng cao Tây Bắc, biểu trưng cho sự bền bỉ, mộc mạc và tri thức thâm sâu.'
  },
  {
    id: 'jade-green',
    name: 'Xanh Ngọc Lục Bảo',
    vietnameseName: 'Ngọc Bích & Thao Thiết',
    hex: '#1E382B',
    secondaryHex: '#0F2117',
    textColor: '#FFFFFF',
    culturalMeaning: 'Sắc xanh tĩnh lặng của khối ngọc bích cổ, mang ý nghĩa thanh khiết, trường thọ và sự bình an cho tâm hồn người mặc.'
  },
  {
    id: 'pearl-white',
    name: 'Trắng Ngọc Trai',
    vietnameseName: 'Bạch Ngọc & Tơ Sống',
    hex: '#F4EFEA',
    secondaryHex: '#DED3C4',
    textColor: '#1E1D1B',
    culturalMeaning: 'Màu trắng ngà óng ánh của ngọc trai biển khơi và tơ tằm nguyên bản, biểu tượng của sự thuần hậu, thanh tao không vướng bụi trần.'
  },
  {
    id: 'charcoal-black',
    name: 'Đen Mực Tàu',
    vietnameseName: 'Hắc Y & Mực Khắc Mộc',
    hex: '#1E1D1B',
    secondaryHex: '#0D0C0B',
    textColor: '#FFFFFF',
    culturalMeaning: 'Sắc đen sâu lắng từ mực tàu trên giấy điệp, tạo nên uy quyền kiên định, sự bí ẩn và nét tương phản đồ họa sắc bén.'
  },
  {
    id: 'lotus-pink',
    name: 'Hồng Sen Đào',
    vietnameseName: 'Hồng Tố Nữ & Sen Đồng',
    hex: '#C47281',
    secondaryHex: '#8E3F4E',
    textColor: '#FFFFFF',
    culturalMeaning: 'Sắc hồng e ấp của búp sen sớm mai trên hồ Tây, thể hiện nét duyên dáng, sức sống thanh xuân và vẻ đẹp tươi mới.'
  },
  {
    id: 'court-purple',
    name: 'Tím Cung Đình',
    vietnameseName: 'Tím Cố Đô & Khảm Trầm',
    hex: '#532D4B',
    secondaryHex: '#32162C',
    textColor: '#FFFFFF',
    culturalMeaning: 'Màu tím trầm mặc lắng đọng của cố đô Huế, gợi cảm thức hoài niệm, lòng thủy chung son sắt và chiều sâu lịch sử.'
  }
];

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
  }
];
