export interface SuitStyle {
  name: string;
  prompt: string;
}

export const SUIT_STYLES: SuitStyle[] = [
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
];

export interface BackgroundOption {
  name: string;
  prompt: string;
}

export const BACKGROUND_OPTIONS: BackgroundOption[] = [
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