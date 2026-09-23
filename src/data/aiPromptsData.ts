import { MasterPromptFormula } from '../types';

export interface FullBodyPoseOption {
  id: string;
  name: string;
  description: string;
  promptSnippet: string;
  iconName: string;
}

export interface FullBodyEnvironmentOption {
  id: string;
  name: string;
  tag: string;
  description: string;
  promptSnippet: string;
  backgroundGradient: string;
}

export interface BodyProportionOption {
  id: string;
  name: string;
  description: string;
  promptSnippet: string;
}

export const FULLBODY_POSES: FullBodyPoseOption[] = [
  {
    id: 'pose-standing-frontal',
    name: 'Đứng Thẳng Editorial',
    description: 'Dáng đứng thẳng đĩnh đạc nhìn thẳng ống kính, toàn thân từ đỉnh đầu đến gót giày',
    promptSnippet: 'Full-length frontal fashion standing pose, standing tall and poised with upright posture, hands resting gracefully at sides, full body in sharp focus from crown to shoes',
    iconName: 'User'
  },
  {
    id: 'pose-editorial-profile',
    name: 'Nghiêng 3/4 High-Fashion',
    description: 'Xoay người góc 3/4 tôn dáng vai và đường cúc cài bên sườn của áo ngũ thân',
    promptSnippet: 'Standing in a high-fashion 3/4 angle editorial stance, body angled slightly while head turns toward camera, accentuating the side button placket and graceful drapery of the robe',
    iconName: 'Compass'
  },
  {
    id: 'pose-walking-silk',
    name: 'Sải Bước Tà Áo Bay',
    description: 'Dáng bước đi thanh thoát, tà áo và nếp lụa chuyển động bay bổng tự nhiên',
    promptSnippet: 'Captured mid-stride in an elegant walking motion, silk panels billowing naturally with kinetic flow, dynamic full-body silhouette with confident fashion runway energy',
    iconName: 'Wind'
  },
  {
    id: 'pose-seated-heritage',
    name: 'Ngồi Ghế Trường Kỷ Quý Phái',
    description: 'Ngồi trang trọng trên ghế gỗ mun cung đình, hai tay đặt gối, tà áo buông phủ gối',
    promptSnippet: 'Full-body seated pose on an antique carved Vietnamese dark rosewood chair, regal and composed posture with hands resting gently on lap, elongated flowing robe draped elegantly',
    iconName: 'Armchair'
  }
];

export const FULLBODY_ENVIRONMENTS: FullBodyEnvironmentOption[] = [
  {
    id: 'env-minimal-studio',
    name: 'Studio Vogue Tối Giản',
    tag: 'Editorial',
    description: 'Phông nền xi măng thô, rèm lụa trắng mỏng và vệt nắng xiên nghệ thuật',
    promptSnippet: 'Minimalist high-fashion studio with warm textured raw concrete wall, sheer off-white silk drapery diffusing warm golden sunlight, subtle dramatic cast shadows on the floor',
    backgroundGradient: 'from-[#2A2624] via-[#1E1D1B] to-[#141312]'
  },
  {
    id: 'env-hue-citadel',
    name: 'Đại Nội Hoàng Thành Huế',
    tag: 'Di Sản',
    description: 'Sân lát đá cổ kính triều Nguyễn, cột sơn son thếp vàng trong ánh hoàng hôn',
    promptSnippet: 'Ancient Hue Imperial Citadel stone courtyard at golden hour, weathered mossy flagstones underfoot, red lacquered palace pillars and soft misty sunset glow in the background',
    backgroundGradient: 'from-[#3B1E1E] via-[#241717] to-[#160E0E]'
  },
  {
    id: 'env-hoian-lantern',
    name: 'Phố Cổ Hội An Hoài Niệm',
    tag: 'Cổ Kính',
    description: 'Bức tường vàng rêu phong hoa giấy, lồng đèn lụa lung linh ấm áp',
    promptSnippet: 'Historic Hoi An ancient town street corner, warm ochre textured heritage walls, blooming magenta bougainvillea, softly glowing silk lanterns creating warm ambient bokeh',
    backgroundGradient: 'from-[#3A2D1B] via-[#261E13] to-[#18120B]'
  },
  {
    id: 'env-modern-gallery',
    name: 'Bảo Tàng Nghệ Thuật Đương Đại',
    tag: 'Contemporary',
    description: 'Không gian triển lãm tranh khắc gỗ, sàn gỗ sẫm bóng và đèn rọi spotlight',
    promptSnippet: 'Contemporary art museum gallery space, polished dark terrazzo floor reflecting subtle amber spotlights, minimalist bronze sculptural pedestal in the background',
    backgroundGradient: 'from-[#1E2530] via-[#151B24] to-[#0E1218]'
  }
];

export const BODY_PROPORTIONS: BodyProportionOption[] = [
  {
    id: 'body-regular',
    name: 'Cân Đối Tự Nhiên',
    description: 'Tỷ lệ hình thể người Việt Nam tiêu chuẩn, áo may vừa vặn ôm phom tự nhiên',
    promptSnippet: 'Natural balanced Vietnamese body proportions, tailored garment silhouette with authentic ease and drape'
  },
  {
    id: 'body-slim',
    name: 'Thon Gọn Thanh Thoát',
    description: 'Dáng mảnh mai thư sinh, tôn chiều dài tà áo và nếp gấp thanh mảnh',
    promptSnippet: 'Slender elegant body build, elongated vertical silhouette highlighting the fluid drape of silk panels'
  },
  {
    id: 'body-athletic',
    name: 'Khỏe Khoắn Vai Rộng',
    description: 'Khung vai ngang vững chãi, dựng phom áo đứng dáng chuẩn phong thái quý tộc',
    promptSnippet: 'Athletic structured posture with broad shoulders, crisp architectural collar and defined sleeve lines'
  },
  {
    id: 'body-curvy',
    name: 'Mềm Mại Đầy Đặn',
    description: 'Đường nét mềm mại, tà áo xòe nhẹ tự nhiên thoải mái và quý phái',
    promptSnippet: 'Graceful curvier silhouette, flowing fabrics falling naturally with generous movement and comfort'
  }
];

export const MASTER_PROMPT_STEPS_LOADING = [
  {
    phase: 1,
    title: 'Phân tích nhân dạng & tỷ lệ vóc dáng toàn thân',
    desc: 'Trích xuất ngũ quan, tông da và dựng khung xương tỷ lệ toàn thân từ đầu đến gót chân...',
    durationMs: 900
  },
  {
    phase: 2,
    title: 'Khảo sát phom dáng Cổ Phục Toàn Thân (Head-to-Toe)',
    desc: 'Định hình lập lĩnh chuẩn ngũ thân, vạt hò, tà áo buông rủ dài qua đầu gối và nẹp áo năm thân...',
    durationMs: 1000
  },
  {
    phase: 3,
    title: 'Dệt chất liệu tơ lụa & hoa văn gấm hoàng triều',
    desc: 'Dệt sợi tơ tằm Vạn Phúc óng nhẹ, thêu chỉ ngũ sắc và khâu đính 5 khuy ngọc bích phong thủy...',
    durationMs: 1100
  },
  {
    phase: 4,
    title: 'Đồng bộ phối đồ Gen Z: Quần ống suông, Giày & Phụ kiện',
    desc: 'Khâu ghép quần âu xếp ly / quần sa lụa trắng, chelsea boots da bóng và kiềng bạc chạm hoa sen...',
    durationMs: 1000
  },
  {
    phase: 5,
    title: 'Xuất bản ảnh thời trang toàn thân Full-Body 8K',
    desc: 'Áp dụng thiết lập máy ảnh Hasselblad medium format và ánh sáng bìa tạp chí Vogue Vietnam...',
    durationMs: 800
  }
];

export const MASTER_PROMPTS_COLLECTION: MasterPromptFormula[] = [
  {
    id: 'prompt-ngu-than-minimal',
    garmentName: 'Áo Ngũ Thân Tay Chẽn (Toàn Thân)',
    vietnameseTitle: 'Hậu Duệ Thư Sinh · Imperial Minimalist Full-Body',
    styleVibe: 'Clean Tailored Minimal · Trang nhã thanh lịch toàn thân',
    garmentId: 'ao-ngu-than',
    accentColor: '#C89B3C',
    editorialBackdrop: 'Studio phông nền bê tông thô xám ấm kết hợp tấm bình phong sơn mài ánh hoàng kim',
    englishPrompt: `Full-body high-fashion editorial photograph of a young Vietnamese individual standing head-to-toe, strictly retaining the authentic facial features, facial structure, skin tone, hair, and eye gaze from the provided user input photograph.
Framing: Complete full-body shot from head to shoes, showing the entire figure standing gracefully.
Garment: Authentically wearing an iconic Vietnamese Áo Ngũ Thân tay chẽn (traditional five-panel robe) made of ivory-cream Bao Loc mulberry silk with subtle tone-on-tone damask jacquard cloud patterns. Authentic crisp standing mandarin collar (lập lĩnh) with five polished brass and jade filigree buttons fastened down the curved right collar and side placket. The flowing silk robe extends gracefully down past the knees with exquisite natural fabric drapery and soft realistic folds.
Gen Z Styling: Paired modernly with tailored high-waisted pleated wide-leg trousers in charcoal black, sleek minimalist black leather chelsea boots, and a subtle antique silver signet ring.
Setting: Minimalist architectural fashion studio with textured raw concrete walls, sheer linen curtains diffusing warm morning sun, casting soft diagonal shadows on the floor.
Photography: Shot on Hasselblad H6D-100c medium format, 85mm f/1.4 lens, natural skin pore texture, realistic fabric weave, Kodak Portra 400 color grading, complete full-length body view.`,
    anatomicalBreakdown: {
      subjectIdentity: 'Full-body Vietnamese subject retaining user facial contours, natural gaze, realistic skin texture and full-length body proportions.',
      traditionalGarment: 'Authentic Áo Ngũ Thân five-panel robe in ivory mulberry silk, standing mandarin collar (lập lĩnh), 5 jade buttons, flowing past knees.',
      genZModernLayer: 'High-waisted pleated charcoal trousers, sleek black leather boots, minimalist antique silver ring.',
      studioLighting: 'Vogue Vietnam editorial studio, dramatic soft rim light, warm key spotlight caressing silk sheen, rich deep shadows.',
      cameraGear: 'Hasselblad H6D-100c, 85mm f/1.4 lens, full-body framing head-to-toe, 8k resolution, Kodak Portra 400 tone curve.'
    },
    suggestedSelection: {
      garmentId: 'ao-ngu-than',
      bottomId: 'pants-tailored-high',
      headwearId: 'head-none',
      footwearId: 'shoes-chelsea-boots',
      bagId: 'bag-shoulder-leather',
      accessoryId: 'acc-wooden-fan',
      styleId: 'style-minimal',
      colorId: 'pearl-white'
    }
  },
  {
    id: 'prompt-doi-kham-couture',
    garmentName: 'Áo Đối Khâm Cung Đình (Toàn Thân)',
    vietnameseTitle: 'Hoàng Triều Tái Sinh · Avant-Garde Haute Couture Full-Body',
    styleVibe: 'High Fashion Editorial · Quyền uy & Phá cách toàn thân',
    garmentId: 'ao-doi-kham',
    accentColor: '#8B1E1E',
    editorialBackdrop: 'Không gian triển lãm nghệ thuật đương đại, ánh đèn hắt đỏ sơn mài và bệ đá chạm rồng',
    englishPrompt: `Full-body high-fashion editorial photograph of a stylish young Vietnamese person standing full-length head to toe, maintaining the exact facial features, skin tone, and likeness from the user input photo.
Framing: Complete full-body fashion portrait showing the entire body silhouette down to the shoes.
Garment: Wearing a magnificent imperial Vietnamese Áo Đối Khâm (Dai Viet court open robe) in deep lacquer crimson red and gold. Parallel bilateral open front lapels falling straight down to the floor, lavishly embroidered with imperial cloud dragon and lotus wave motifs in gold thread.
Gen Z Styling: Draped over a modern black silk slip inner tunic and an asymmetric pleated wrap skirt, styled with chunky platform leather loafers, and an antique handcrafted engraved silver kiềng necklace.
Setting: Grand historic Hue citadel stone courtyard at golden hour, weathered ancient stone floor reflecting warm amber rim light, majestic mist in the background.
Photography: Hasselblad H6D-100c, 85mm f/1.8 lens, Vogue Vietnam cover aesthetic, realistic embroidery relief, full-body head-to-toe composition.`,
    anatomicalBreakdown: {
      subjectIdentity: 'Subject retaining exact facial features and skin tone from input photo, assertive high-fashion full-body posture.',
      traditionalGarment: 'Imperial Áo Đối Khâm open-front robe, deep lacquer crimson, parallel bilateral lapels, gold bullion cloud embroidery.',
      genZModernLayer: 'Asymmetric pleated architectural wrap skirt, glossy chunky platform loafers, antique engraved silver kiềng.',
      studioLighting: 'High-contrast studio lighting, sharp gold rim light carving embroidery relief, moody atmospheric vignette.',
      cameraGear: 'Hasselblad H6D-100c, 85mm f/1.8 lens, full-body framing head-to-toe, 8k resolution, extreme fabric detail.'
    },
    suggestedSelection: {
      garmentId: 'ao-doi-kham',
      bottomId: 'skirt-asymmetric-wrap',
      headwearId: 'head-none',
      footwearId: 'shoes-chelsea-boots',
      bagId: 'bag-clutch-lacquer',
      accessoryId: 'acc-silver-kieng',
      styleId: 'style-creative',
      colorId: 'lacquer-red'
    }
  },
  {
    id: 'prompt-tu-than-streetwear',
    garmentName: 'Áo Tứ Thân Kinh Bắc (Toàn Thân)',
    vietnameseTitle: 'Kinh Bắc Nổi Loạn · Neo-Folk Streetwear Full-Body',
    styleVibe: 'Neo-Folk & Y2K Edge · Tự do phóng khoáng toàn thân',
    garmentId: 'ao-tu-than',
    accentColor: '#23395B',
    editorialBackdrop: 'Góc phố cổ Hà Nội lúc chạng vạng với ánh đèn neon xanh chàm phản chiếu trên nền gạch ướt',
    englishPrompt: `Full-body fashion editorial street-style photograph of a young Vietnamese individual retaining the authentic facial features and facial identity from reference photo, confident and relaxed attitude.
Framing: Full length head-to-feet framing, showing the complete streetwear ensemble down to the sneakers.
Garment: Wearing a modern deconstructed Vietnamese Áo Tứ Thân (Kinh Bac four-panel robe) in raw indigo blue linen, two front panels tied loosely at the waist with an emerald green silk ruột bao sash, flowing down the hips.
Gen Z Styling: Styled over oversized distressed raw denim wide-leg jeans, chunky futuristic platform sneakers, and narrow chrome sunglasses.
Setting: Atmospheric historic Hanoi old quarter street corner at dusk, rain-slicked pavement reflecting warm lantern lights and cool indigo neon.
Photography: Leica M11 with Summilux 50mm f/1.4, subtle 35mm film grain, analog color grade, full-body capture, photorealistic.`,
    anatomicalBreakdown: {
      subjectIdentity: 'Subject with user face structure, confident modern street attitude, natural skin tones, full body pose.',
      traditionalGarment: 'Deconstructed Áo Tứ Thân in raw indigo linen, flowing front panels tied with emerald green silk ruột bao sash.',
      genZModernLayer: 'Oversized distressed raw denim wide-leg jeans, chunky platform sneakers, futuristic chrome sunglasses.',
      studioLighting: 'Cinematic dusk lighting, warm tungsten key on face, neon indigo rim light outlining garment silhouette.',
      cameraGear: 'Leica M11, Summilux 50mm f/1.4, subtle 35mm film grain, full-length head to toe view.'
    },
    suggestedSelection: {
      garmentId: 'ao-tu-than',
      bottomId: 'pants-denim-wide',
      headwearId: 'head-bandana-silk',
      footwearId: 'shoes-chunky-sneaker',
      bagId: 'bag-crossbody-nylon',
      accessoryId: 'acc-sunglasses-oval',
      styleId: 'style-street',
      colorId: 'indigo-blue'
    }
  },
  {
    id: 'prompt-ao-dai-retro',
    garmentName: 'Áo Dài Cổ Cao Cách Tân (Toàn Thân)',
    vietnameseTitle: 'Tân Thời Sài Gòn · Retro Cyber Romance Full-Body',
    styleVibe: 'Cinematic Romance · Đài các hoài niệm toàn thân',
    garmentId: 'ao-dai',
    accentColor: '#3A5A40',
    editorialBackdrop: 'Studio phong cách điện ảnh Vương Gia Vệ, rèm lụa xanh rêu và bóng nắng chiều xuyên qua chấn song',
    englishPrompt: `Full-body editorial cinematic photograph of a young Vietnamese individual with distinct facial features from reference photo, standing full length from head to shoes with contemplative poise.
Framing: Complete full-length shot showcasing the long continuous silhouette of the Áo Dài down to the hem and footwear.
Garment: Tailored modern Vietnamese Áo Dài in deep emerald green silk with elongated flowing panels and high side slits reaching the waistline, revealing crisp high-waisted pearl white silk trousers that sweep gracefully over the shoes.
Gen Z Styling: Minimalist silver kiềng neck ring, handcrafted dark wooden platform mules, and a sleek lacquer clutch.
Setting: Wong Kar-wai inspired vintage studio interior, green velvet drapery, warm amber golden-hour sunbeams casting diagonal shadows through window blinds.
Photography: Arri Alexa Mini, Cooke Anamorphic 65mm lens, 4k cinematic frame, breathtaking photorealism, luxurious silk texture, complete head-to-toe view.`,
    anatomicalBreakdown: {
      subjectIdentity: 'Subject facial resemblance from reference photo, contemplative poetic gaze, full length standing figure.',
      traditionalGarment: 'Tailored Vietnamese Áo Dài in emerald silk, high standing collar, elongated flowing panels with authentic side slits.',
      genZModernLayer: 'High-waisted pearl silk trousers, minimalist silver kiềng, wooden block mules, sleek lacquer clutch.',
      studioLighting: 'Wong Kar-wai golden hour palette, warm amber side key, deep emerald shadows, soft anamorphic flare.',
      cameraGear: 'Arri Alexa Mini with Cooke Anamorphic 65mm, 4k cinematic still, rich color depth, full-body portrait.'
    },
    suggestedSelection: {
      garmentId: 'ao-dai',
      bottomId: 'pants-silk-wide',
      headwearId: 'head-none',
      footwearId: 'shoes-guoc-moc',
      bagId: 'bag-clutch-lacquer',
      accessoryId: 'acc-silver-kieng',
      styleId: 'style-old-money',
      colorId: 'bamboo-green'
    }
  },
  {
    id: 'prompt-ba-ba-urban',
    garmentName: 'Áo Bà Ba Nam Bộ (Toàn Thân)',
    vietnameseTitle: 'Gió Nam Thành Thị · Urban Mekong Chic Full-Body',
    styleVibe: 'Urban Relaxed Chic · Phóng khoáng Nam Bộ toàn thân',
    garmentId: 'ao-ba-ba',
    accentColor: '#4A3D36',
    editorialBackdrop: 'Không gian quán cafe nghệ thuật ngập nắng sớm Sài Gòn, bàn gỗ mộc và tường vôi vàng hoài niệm',
    englishPrompt: `Full-body contemporary fashion editorial photograph of a young Vietnamese person matching the facial structure from input image, standing full length head to feet with radiant effortless posture.
Framing: Complete full-body head-to-toe shot showing the casual chic ensemble.
Garment: Earth-toned saffron yellow Áo Bà Ba crafted from breathable hand-loomed raw silk linen, raglan sleeves with neat button placket and side slit hems resting at the hip.
Gen Z Styling: Draped silk checkered khăn rằn scarf, modern dark wash relaxed-fit wide-leg denim jeans, and minimalist brown leather mules.
Setting: Sunlit Saigon heritage cafe courtyard, warm textured ochre wall, lush tropical green banana leaves, natural morning sunlight.
Photography: Sony A7R V, 50mm f/1.2 GM lens, eye AF sharp focus, shallow depth of field, magazine editorial quality, full-body framing.`,
    anatomicalBreakdown: {
      subjectIdentity: 'Exact facial characteristics of the user, radiant effortless expression, warm natural skin tones, full body pose.',
      traditionalGarment: 'Ochre yellow Áo Bà Ba, hand-loomed Nam Cao linen, signature raglan sleeve cut, side split hems.',
      genZModernLayer: 'Modern dark wash denim jeans, minimal leather mules, artisanal woven bag, checkered silk khăn rằn.',
      studioLighting: 'Soft diffused morning window light, gentle natural bounce, clean editorial shadows.',
      cameraGear: 'Sony A7R V, 50mm f/1.2 GM lens, eye-tracking sharpness, medium format look, full length shot.'
    },
    suggestedSelection: {
      garmentId: 'ao-ba-ba',
      bottomId: 'pants-denim-wide',
      headwearId: 'head-beret-modern',
      footwearId: 'shoes-minimal-mule',
      bagId: 'bag-woven-coi',
      accessoryId: 'acc-wooden-fan',
      styleId: 'style-casual',
      colorId: 'imperial-gold'
    }
  }
];

export const CROP_GUIDELINES = {
  dos: [
    {
      title: 'Ảnh nhìn rõ người & gương mặt',
      description: 'Chụp rõ nét, nhìn thẳng hoặc chếch nhẹ 15-30°. Có thể dùng ảnh chân dung hoặc ảnh toàn thân hiện có của bạn.'
    },
    {
      title: 'Ánh sáng tự nhiên đều khuôn hình',
      description: 'Ánh sáng ban ngày hoặc đèn phòng sáng rõ, giúp AI nhận diện chuẩn tông da tự nhiên và tỷ lệ vóc dáng.'
    },
    {
      title: 'Tư thế thoải mái, phông nền đơn giản',
      description: 'Đứng hoặc ngồi tự nhiên, vai thả lỏng để AI phân bổ chuẩn nếp rủ của tà áo và lập lĩnh.'
    }
  ],
  donts: [
    {
      title: 'Không đeo kính râm hay khẩu trang',
      description: 'Phụ kiện che khuất mắt/mũi sẽ làm mất đặc trưng ngũ quan và hướng nhìn của bạn.'
    },
    {
      title: 'Tránh góc chụp quá nghiêng / từ trên cao',
      description: 'Góc chụp bird-eye từ trên xuống sẽ làm sai lệch tỷ lệ cơ thể và độ dài tà áo.'
    },
    {
      title: 'Tránh ảnh bị nhòe hoặc ngược sáng mạnh',
      description: 'Ảnh quá tối hoặc vỡ nét làm giảm độ chi tiết của sợi tơ lụa và hoa văn dệt trên trang phục.'
    }
  ]
};

