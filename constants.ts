export interface StyleOption {
  name: string;
  prompt: string;
}

export interface StyleCategory {
  category: string;
  styles: StyleOption[];
}

export const CATEGORIZED_SUIT_STYLES: StyleCategory[] = [
  {
    category: 'African Bespoke',
    styles: [
      {
        name: 'Nigerian Senator',
        prompt: 'a stylish Nigerian Senator style suit in royal blue with intricate embroidery on the chest',
      },
      {
        name: 'Ankara Print Blazer',
        prompt: 'a modern suit featuring a blazer made from vibrant, geometric Ankara print fabric',
      },
      {
        name: 'Kente Cloth Formal',
        prompt: 'an elegant formal suit incorporating rich, colorful Ghanaian Kente cloth patterns on the lapels and cuffs',
      },
      {
        name: 'Modern Dashiki',
        prompt: 'a tailored, modern interpretation of a Dashiki, worn as a stylish suit jacket in black with gold embroidery',
      },
      {
        name: 'Brocade Agbada',
        prompt: 'a magnificent white brocade Agbada with intricate gold embroidery, worn over a matching tunic and trousers',
      },
      {
        name: 'Tailored Kaftan',
        prompt: 'a sharp, tailored emerald green kaftan suit with clean lines and subtle silver detailing on the collar',
      },
      {
        name: 'Mudcloth Blazer',
        prompt: 'a contemporary blazer featuring authentic Malian mudcloth patterns in black, white, and earthy tones',
      },
      {
        name: 'Adire Tie-Dye Suit',
        prompt: 'a vibrant indigo blue suit made from Adire tie-dye fabric, featuring captivating patterns, tailored in a modern slim fit',
      },
      {
        name: 'Full Kente Three-Piece',
        prompt: 'a powerful three-piece suit crafted entirely from bold, geometric Ghanaian Kente cloth, complete with a matching waistcoat',
      },
      {
        name: 'Kenyan Flag Accent',
        prompt: 'a modern black suit with tasteful Kenyan flag color accents (black, red, green, white) on the lapel pin and pocket square',
      },
      {
        name: 'Presidential Ceremony',
        prompt: 'a distinguished dark navy suit, worn with a presidential sash featuring the colors of the Kenyan flag, suitable for a national ceremony',
      },
      {
        name: 'Embroidered Coat of Arms',
        prompt: 'an elegant black blazer with the Kenyan coat of arms finely embroidered in gold thread on the chest pocket',
      },
      {
        name: 'Maasai Shuka Inspired',
        prompt: 'a bold, modern suit that creatively incorporates the iconic red and black checkered pattern of a Maasai shuka into the design of the blazer',
      },
    ]
  },
  {
    category: 'Indian Regal',
    styles: [
      {
        name: 'Classic Sherwani',
        prompt: 'a regal cream-colored Sherwani with intricate gold embroidery and a matching turban',
      },
      {
        name: 'Nehru Jacket Ensemble',
        prompt: 'a sophisticated charcoal grey Nehru jacket worn over a crisp white kurta pajama set',
      },
      {
        name: 'Jodhpuri Suit (Bandhgala)',
        prompt: 'a sharp, royal blue Jodhpuri suit (Bandhgala) with classic metallic buttons',
      },
      {
        name: 'Silk Kurta Jacket Set',
        prompt: 'an elegant silk kurta in deep maroon, paired with a contrasting beige brocade jacket',
      },
      {
        name: 'Modern Pathani Suit',
        prompt: 'a stylish black Pathani suit with a modern, tailored fit and silver buttons',
      },
    ]
  },
  {
    category: 'Arabic Attire',
    styles: [
      {
        name: 'Classic White Thobe & Ghutra',
        prompt: 'a pristine white Thobe (Dishdasha) with a matching white Ghutra and black Agal, exuding timeless elegance',
      },
      {
        name: 'Embroidered Black Bisht',
        prompt: 'a luxurious black Bisht cloak with intricate gold embroidery along the edges, worn over a crisp white Thobe',
      },
      {
        name: 'Modern Emirati Kandura',
        prompt: 'a modern, tailored Emirati Kandura in a sophisticated sandy beige color with subtle tassel (Tarbousha) detailing',
      },
      {
        name: 'Striped Moroccan Djellaba',
        prompt: 'a stylish Moroccan Djellaba with subtle grey and white vertical stripes, a pointed hood (qob), and a relaxed yet refined fit',
      },
      {
        name: 'Formal Saudi Thobe',
        prompt: 'a formal Saudi-style Thobe in a slightly off-white color, with structured cuffs and a high collar, projecting an air of authority',
      },
    ]
  },
  {
    category: 'Western Classics',
    styles: [
      {
        name: 'Classic Tuxedo',
        prompt: 'a classic black tuxedo with a bow tie',
      },
      {
        name: 'Navy Business',
        prompt: 'a modern navy blue business suit with a white shirt and a tie',
      },
      {
        name: 'Charcoal Pinstripe',
        prompt: 'a sharp charcoal grey pinstripe suit',
      },
      {
        name: 'Summer Linen',
        prompt: 'a lightweight beige summer linen suit',
      },
      {
        name: 'Velvet Dinner Jacket',
        prompt: 'a luxurious deep burgundy velvet dinner jacket',
      },
      {
        name: 'Tweed Jacket',
        prompt: 'a classic brown tweed sports jacket with elbow patches',
      },
      {
        name: 'Modern Slim Fit',
        prompt: 'a sleek, modern slim-fit gray suit',
      },
      {
        name: 'Double Breasted',
        prompt: 'a powerful double-breasted suit in royal blue',
      },
      {
        name: 'White Dinner Jacket',
        prompt: 'an elegant white dinner jacket with black trousers, James Bond style',
      },
      {
        name: 'Bold Plaid',
        prompt: 'a fashionable and bold plaid suit with a complementary tie',
      },
      {
        name: 'Light Grey Wool',
        prompt: 'a versatile light grey wool suit, perfect for business or casual events',
      },
      {
        name: 'Classic Three-Piece',
        prompt: 'a classic charcoal grey three-piece suit with a waistcoat',
      },
      {
        name: 'Summer Seersucker',
        prompt: 'a light blue and white striped seersucker suit, ideal for a summer event',
      },
      {
        name: 'Emerald Green Corduroy',
        prompt: 'a stylish emerald green corduroy suit with a modern cut',
      },
      {
        name: 'Midnight Blue Shawl Lapel',
        prompt: 'an elegant midnight blue tuxedo with a satin shawl lapel',
      },
      {
        name: 'Brown Checkered Wool',
        prompt: 'a sophisticated light brown checkered wool suit',
      },
      {
        name: 'Silver-Gray Sharkskin',
        prompt: 'a retro-style silver-gray sharkskin suit with a subtle sheen',
      },
      {
        name: 'Crimson Red Peak Lapel',
        prompt: 'a bold crimson red suit with sharp peak lapels',
      },
      {
        name: "Lawyer's Gown & Wig",
        prompt: "a traditional black barrister's court gown worn over a white shirt with bands, complete with a classic white horsehair barrister's wig",
      },
    ]
  }
];


export const BACKGROUND_OPTIONS: StyleOption[] = [
  {
    name: 'Original',
    prompt: '', // Empty string means no change
  },
  {
    name: 'Conference',
    prompt: 'in a professional conference hall with an audience',
  },
  {
    name: 'Wedding',
    prompt: 'at an elegant outdoor wedding ceremony',
  },
  {
    name: 'Office',
    prompt: 'in a modern, sunlit corner office with a city view',
  },
  {
    name: 'With President Ruto',
    prompt: 'standing next to Kenyan President William Ruto at an official state house press event',
  },
  {
    name: 'Gala Event',
    prompt: 'at a glamorous black-tie gala event with chandeliers and a red carpet',
  },
  {
    name: 'Rooftop Bar',
    prompt: 'on a chic rooftop bar at night with a stunning city skyline in the background',
  },
  {
    name: 'Art Gallery',
    prompt: 'inside a modern art gallery, surrounded by contemporary paintings and sculptures',
  },
  {
    name: 'Luxury Car',
    prompt: 'standing next to a sleek, black luxury sports car in a modern garage',
  },
  {
    name: 'Vintage Library',
    prompt: 'in a classic, wood-paneled library or study, surrounded by old books',
  },
];

export const LIGHTING_OPTIONS: StyleOption[] = [
  {
    name: 'Original',
    prompt: '', // Empty string means no change
  },
  {
    name: 'Studio Lighting',
    prompt: 'bright, professional studio lighting with soft shadows, highlighting the details of the suit',
  },
  {
    name: 'Golden Hour',
    prompt: 'the warm, soft, and directional light of a golden hour sunset',
  },
  {
    name: 'Dramatic Evening',
    prompt: 'a dramatic, high-contrast evening lighting setup with deep shadows and highlighted edges, creating a moody atmosphere',
  },
  {
    name: 'Natural Daylight',
    prompt: 'neutral and clear natural daylight, as if taken outdoors on a slightly overcast day to avoid harsh shadows',
  },
];

export const DEFAULT_SHOE_OPTION: StyleOption = {
  name: 'Original',
  prompt: '', // Empty string means no change
};

export const CATEGORIZED_SHOE_STYLES: StyleCategory[] = [
  {
    category: 'Formal (Oxfords)',
    styles: [
      { name: 'Polished Black Leather', prompt: 'classic, highly polished black leather Oxford shoes' },
      { name: 'Rich Brown Leather', prompt: 'rich dark brown leather Oxford shoes' },
      { name: 'Deep Burgundy Leather', prompt: 'deep burgundy (oxblood) leather Oxford shoes' },
    ]
  },
  {
    category: 'Business Casual (Brogues & Monk Straps)',
    styles: [
      { name: 'Tan Leather Brogues', prompt: 'stylish tan leather brogue shoes with decorative perforations' },
      { name: 'Chocolate Suede Brogues', prompt: 'chocolate brown suede brogue shoes' },
      { name: 'Black Double Monk Straps', prompt: 'sophisticated black leather double monk strap shoes' },
      { name: 'Cognac Single Monk Straps', prompt: 'elegant cognac-colored single monk strap shoes' },
    ]
  },
  {
    category: 'Smart Casual (Loafers & Boots)',
    styles: [
      { name: 'Navy Suede Loafers', prompt: 'elegant navy blue suede loafers' },
      { name: 'Black Penny Loafers', prompt: 'classic black leather penny loafers' },
      { name: 'Dark Brown Chelsea Boots', prompt: 'sleek dark brown leather Chelsea boots' },
      { name: 'Grey Suede Chukka Boots', prompt: 'versatile grey suede Chukka boots' },
    ]
  }
];


export interface QualityOption {
  name: string;
  value: string;
}

export const QUALITY_OPTIONS: QualityOption[] = [
  {
    name: 'Standard',
    value: 'standard',
  },
  {
    name: 'High',
    value: 'high',
  },
];