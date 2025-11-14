

export interface StyleOption {
  id: string;
  name: string;
  prompt: string;
  previewImage?: string;
  tags: string[];
  isColorCustomizable?: boolean;
  colorPalette?: string[];
}

export interface StyleCategory {
  category: string;
  styles: StyleOption[];
}

export interface BackgroundOption {
  name: string;
  prompt: string;
}

export interface QualityOption {
  name: string;
  value: string;
}

export interface SimpleOption {
    name: string;
    prompt: string;
}

export const CATEGORIZED_SUIT_STYLES: StyleCategory[] = [
  {
    category: 'African Bespoke',
    styles: [
      {
        id: 'nigerian-senator',
        name: 'Nigerian Senator',
        prompt: 'a stylish Nigerian Senator style suit with intricate embroidery on the chest',
        previewImage: 'https://images.unsplash.com/photo-1621216124563-384e5a43513e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['cultural', 'regal', 'modern', 'formal'],
        isColorCustomizable: true,
        colorPalette: ['#00008B', '#FFFFFF', '#D4AF37', '#800020', '#006400', '#000000'],
      },
      {
        id: 'brocade-agbada',
        name: 'Brocade Agbada',
        prompt: 'a magnificent brocade Agbada with intricate gold embroidery, worn over a matching tunic and trousers',
        tags: ['cultural', 'regal', 'ornate', 'ceremony', 'formal'],
        isColorCustomizable: true,
        colorPalette: ['#FFFFFF', '#F5F5DC', '#FFD700', '#E6E6FA'],
      },
      {
        id: 'senegalese-kaftan',
        name: 'Senegalese Kaftan',
        prompt: 'an elegant, flowing Senegalese kaftan (boubou) made of rich Bazin fabric, featuring intricate, tone-on-tone embroidery around the neck and chest. The look should be grand and stately.',
        tags: ['cultural', 'regal', 'ornate', 'ceremony', 'formal'],
        isColorCustomizable: true,
        colorPalette: ['#FFFFFF', '#ADD8E6', '#90EE90', '#FFD700', '#E0B0FF'],
      },
      {
        id: 'kaunda-suit',
        name: 'Kaunda Suit',
        prompt: "a classic Kaunda suit, known for its safari-style jacket with two chest pockets and two lower pockets, paired with matching trousers, worn with a simple collared shirt underneath.",
        previewImage: 'https://images.unsplash.com/photo-1617137968427-8543702a4926?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['cultural', 'classic', 'business', 'everyday'],
        isColorCustomizable: true,
        colorPalette: ['#D2B48C', '#808080', '#F5F5DC', '#556B2F'],
      },
      {
        id: 'tailored-kaftan',
        name: 'Tailored Kaftan',
        prompt: 'a sharp, tailored kaftan suit with clean lines and subtle silver detailing on the collar',
        tags: ['cultural', 'modern', 'everyday', 'business'],
        isColorCustomizable: true,
        colorPalette: ['#006400', '#4682B4', '#8B0000', '#000000', '#FFFFFF'],
      },
      {
        id: 'modern-dashiki',
        name: 'Modern Dashiki',
        prompt: 'a tailored, modern interpretation of a Dashiki, worn as a stylish suit jacket with gold embroidery',
        tags: ['cultural', 'modern', 'everyday'],
        isColorCustomizable: true,
        colorPalette: ['#000000', '#FFD700', '#8B4513', '#FFFFFF'],
      },
    ],
  },
  {
    category: 'Western Classics',
    styles: [
        { id: 'black-tuxedo', name: 'Black Tuxedo', prompt: 'a classic black tuxedo with a crisp white shirt, black bow tie, and satin lapels', tags: ['formal', 'classic', 'wedding'] },
        { id: 'white-dinner-jacket', name: 'White Dinner Jacket', prompt: 'an elegant white dinner jacket with black tuxedo trousers, a white shirt, and a black bow tie, embodying classic James Bond style', tags: ['formal', 'classic', 'event'] },
        { id: 'pinstripe-suit', name: 'Pinstripe Suit', prompt: 'a powerful navy blue pinstripe suit with a tie', tags: ['business', 'classic', 'formal'] },
        { id: 'modern-fit-suit', name: 'Modern Fit Suit', prompt: 'a modern slim-fit suit in charcoal grey', tags: ['business', 'modern', 'everyday'] },
    ]
  },
  {
    category: 'Medieval',
    styles: [
        { id: 'knight-armor', name: 'Knight in Shining Armor', prompt: 'a full suit of polished steel plate armor, looking valiant and heroic', tags: ['themed', 'historical', 'fantasy'] },
    ]
  }
];

export const CATEGORIZED_WOMENS_STYLES: StyleCategory[] = [
    {
        category: 'African & Cultural',
        styles: [
            { id: 'ankara-gown', name: 'Vibrant Ankara Gown', prompt: 'a stunning, floor-length mermaid gown made from vibrant, bold Ankara fabric with a modern design', tags: ['cultural', 'modern', 'formal', 'ceremony'], isColorCustomizable: false },
        ]
    },
    {
        category: 'Roaring Twenties',
        styles: [
            { id: 'flapper-dress', name: 'Beaded Flapper Dress', prompt: 'a glamorous, beaded flapper dress from the 1920s, with intricate art deco patterns and fringe that sways with movement', tags: ['themed', 'vintage', 'formal', 'classic'], isColorCustomizable: true, colorPalette: ['#C0C0C0', '#FFD700', '#000000', '#B76E79'] },
        ]
    },
    {
        category: 'Business & Formal',
        styles: [
            { id: 'power-pantsuit', name: 'Power Pantsuit', prompt: 'a sharp, impeccably tailored power pantsuit with a modern silhouette', tags: ['business', 'formal', 'modern'], isColorCustomizable: true, colorPalette: ['#FFFFFF', '#000080', '#4B0082', '#000000'] },
        ]
    }
];


export const BACKGROUND_OPTIONS: BackgroundOption[] = [
  { name: 'Keep Original', prompt: '' },
  { name: 'Office', prompt: 'a modern, sunlit corner office with a city view' },
  { name: 'Gala Event', prompt: 'a glamorous gala event with chandeliers and a red carpet' },
  { name: 'Art Gallery', prompt: 'a minimalist art gallery with large abstract paintings on the walls' },
  { name: 'Luxury Car', prompt: 'standing next to a sleek, modern luxury car' },
  { name: 'Wedding', prompt: 'a beautiful, elegant wedding ceremony' },
  { name: 'Conference Hall', prompt: 'a professional conference hall during a keynote speech' },
  { name: 'Urban Street', prompt: 'a vibrant, stylish urban street with graffiti art' },
];

export const LIGHTING_OPTIONS: SimpleOption[] = [
  { name: 'Keep Original', prompt: '' },
  { name: 'Studio Lighting', prompt: 'clean, professional studio lighting' },
  { name: 'Golden Hour', prompt: 'warm, soft golden hour sunlight' },
  { name: 'Dramatic Evening', prompt: 'dramatic, moody evening lighting with deep shadows' },
  { name: 'Natural Daylight', prompt: 'bright, natural daylight from a window' },
];

export const QUALITY_OPTIONS: QualityOption[] = [
  { name: 'Standard', value: 'standard' },
  { name: 'High', value: 'high' },
];

export const DEFAULT_SHOE_OPTION: SimpleOption = {
    name: 'Automatic / Not Visible',
    prompt: '',
};

export const CATEGORIZED_SHOE_STYLES: StyleCategory[] = [
  {
    category: 'Formal',
    styles: [
      { id: 'oxfords-leather', name: 'Leather Oxfords', prompt: 'classic black leather Oxfords', tags: ['formal', 'business'] },
      { id: 'monk-straps', name: 'Monk Straps', prompt: 'stylish brown double monk strap shoes', tags: ['formal', 'business', 'modern'] },
    ],
  },
  {
    category: 'Casual',
    styles: [
      { id: 'loafers-suede', name: 'Suede Loafers', prompt: 'comfortable navy blue suede loafers', tags: ['casual', 'everyday'] },
      { id: 'sneakers-minimalist', name: 'Minimalist Sneakers', prompt: 'clean white minimalist leather sneakers', tags: ['casual', 'modern', 'everyday'] },
    ],
  },
];

export const CATEGORIZED_WOMENS_SHOE_STYLES: StyleCategory[] = [
    {
        category: 'Heels',
        styles: [
            { id: 'stiletto-pumps', name: 'Stiletto Pumps', prompt: 'classic black stiletto pumps', tags: ['formal', 'business'] },
            { id: 'strappy-sandals', name: 'Strappy Sandals', prompt: 'elegant silver strappy heeled sandals', tags: ['formal', 'event'] },
        ]
    },
    {
        category: 'Flats',
        styles: [
            { id: 'ballet-flats', name: 'Ballet Flats', prompt: 'chic nude-colored ballet flats', tags: ['casual', 'everyday'] },
            { id: 'designer-sneakers', name: 'Designer Sneakers', prompt: 'fashionable white and gold designer sneakers', tags: ['casual', 'modern'] },
        ]
    }
];

export const DEFAULT_SHIRT_OPTION: SimpleOption = {
  name: 'Automatic',
  prompt: '',
};

export const SHIRT_OPTIONS: SimpleOption[] = [
    { name: 'White Dress Shirt', prompt: 'a crisp white dress shirt' },
    { name: 'Light Blue Shirt', prompt: 'a light blue dress shirt' },
    { name: 'Black Shirt', prompt: 'a sleek black dress shirt' },
    { name: 'Turtleneck', prompt: 'a black turtleneck sweater' },
];

export const DEFAULT_TIE_OPTION: SimpleOption = {
  name: 'Automatic / None',
  prompt: '',
};

export const TIE_OPTIONS: SimpleOption[] = [
    { name: 'Bow Tie', prompt: 'a classic black bow tie' },
    { name: 'Silk Tie (Navy)', prompt: 'a navy blue silk tie' },
    { name: 'Ascot', prompt: 'a sophisticated ascot tie' },
];

export const DEFAULT_HANDBAG_OPTION: SimpleOption = {
    name: 'Automatic / None',
    prompt: '',
};

export const CATEGORIZED_HANDBAG_STYLES: StyleCategory[] = [
    {
        category: 'Clutches',
        styles: [
            { id: 'box-clutch', name: 'Box Clutch', prompt: 'an elegant, metallic box clutch', tags: ['formal', 'evening'] },
        ]
    },
    {
        category: 'Shoulder Bags',
        styles: [
            { id: 'designer-tote', name: 'Designer Tote', prompt: 'a high-fashion designer leather tote bag', tags: ['business', 'everyday'] },
        ]
    }
];

export const DEFAULT_POSTURE_OPTION: SimpleOption = {
    name: 'Keep Original',
    prompt: '',
};

export const POSTURE_OPTIONS: SimpleOption[] = [
    { name: 'Power Pose', prompt: 'a confident power pose, standing tall with hands on hips' },
    { name: 'Leaning Casually', prompt: 'casually leaning against a wall' },
    { name: 'Walking Forward', prompt: 'walking confidently towards the camera' },
];

export const DEFAULT_EYEWEAR_OPTION: SimpleOption = {
  name: 'None',
  prompt: '',
};

export const EYEWEAR_OPTIONS: SimpleOption[] = [
    { name: 'Aviator Sunglasses', prompt: 'classic aviator sunglasses with a gold frame' },
    { name: 'Horn-rimmed Glasses', prompt: 'stylish horn-rimmed prescription glasses' },
    { name: 'Wayfarer Sunglasses', prompt: 'black wayfarer-style sunglasses' },
];

export const DEFAULT_HEADWEAR_OPTION: SimpleOption = {
  name: 'Automatic / None',
  prompt: '',
};

export const CATEGORIZED_HEADWEAR_STYLES: StyleCategory[] = [
  {
    category: 'Classic Hats',
    styles: [
      { id: 'fedora-classic', name: 'Fedora', prompt: 'a classic felt fedora hat', tags: ['classic', 'formal'] },
      { id: 'homburg-godfather', name: 'Homburg (Godfather Hat)', prompt: 'a classic Homburg hat, also known as a Godfather hat', tags: ['classic', 'formal', 'vintage'] },
      { id: 'trilby-hat', name: 'Trilby', prompt: 'a stylish short-brimmed trilby hat', tags: ['classic', 'modern', 'casual'] },
      { id: 'panama-hat', name: 'Panama Hat', prompt: 'a lightweight, light-colored Panama hat', tags: ['summer', 'classic', 'casual'] },
      { id: 'bowler-hat', name: 'Bowler Hat', prompt: 'a classic hard felt bowler hat (derby hat)', tags: ['vintage', 'classic'] },
    ],
  },
  {
    category: 'Caps & Berets',
    styles: [
      { id: 'kangol-style-cap', name: 'Kangol-Style Cap', prompt: 'a stylish Kangol-style cap (like the iconic 504 style)', tags: ['modern', 'streetwear', 'casual'] },
      { id: 'flat-cap', name: 'Flat Cap', prompt: 'a classic tweed or wool flat cap (newsboy cap)', tags: ['vintage', 'classic', 'casual'] },
      { id: 'baseball-cap', name: 'Baseball Cap', prompt: 'a modern, stylish baseball cap', tags: ['casual', 'streetwear', 'modern'] },
      { id: 'beanie-hat', name: 'Beanie', prompt: 'a knitted beanie hat', tags: ['casual', 'winter'] },
      { id: 'beret-hat', name: 'Beret', prompt: 'a classic wool beret', tags: ['artistic', 'classic', 'casual'] },
    ],
  },
];
