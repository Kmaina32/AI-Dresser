

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
        { id: 'tweed-suit', name: 'Tweed Suit', prompt: 'a classic brown tweed suit, perfect for a vintage, academic look', tags: ['classic', 'vintage', 'business', 'everyday'] },
        { id: 'double-breasted-suit', name: 'Double-Breasted Suit', prompt: 'a sharp, powerful double-breasted suit in navy blue', tags: ['formal', 'business', 'classic'] },
    ]
  },
  {
    category: 'Old Money / Ivy League',
    styles: [
      {
        id: 'navy-blazer-gold-buttons',
        name: 'Navy Blazer & Chinos',
        prompt: 'a classic navy blue blazer with gold buttons, worn over a crisp white oxford shirt and paired with beige chino trousers',
        tags: ['classic', 'preppy', 'business', 'everyday'],
        isColorCustomizable: true,
        colorPalette: ['#000080', '#F5F5DC', '#808080', '#A52A2A'],
      },
      {
        id: 'tweed-sport-coat',
        name: 'Tweed Sport Coat',
        prompt: 'a sophisticated brown herringbone tweed sport coat, layered over a light blue button-down shirt with tan corduroy trousers',
        tags: ['classic', 'vintage', 'preppy', 'business'],
      },
      {
        id: 'cricket-sweater',
        name: 'Cricket Sweater Vibe',
        prompt: 'an iconic cream-colored V-neck cricket sweater with navy and red stripes along the collar, layered over a collared shirt and paired with grey flannel trousers',
        tags: ['classic', 'preppy', 'casual', 'everyday'],
      },
      {
        id: 'rugby-shirt-khakis',
        name: 'Classic Rugby Shirt',
        prompt: 'a classic, high-quality rugby shirt with horizontal stripes, worn with well-fitted khaki trousers, embodying a casual, sporty, preppy look',
        tags: ['casual', 'preppy', 'everyday', 'sporty'],
      },
      {
        id: 'barbour-jacket-countryside',
        name: 'Barbour Waxed Jacket',
        prompt: 'a timeless dark green Barbour waxed cotton jacket, layered over a chunky fisherman sweater, with dark wash denim jeans. The look is rugged and refined, suitable for the countryside.',
        tags: ['classic', 'preppy', 'casual', 'outdoors'],
      },
      {
        id: 'summer-linen-suit',
        name: 'Summer Linen Suit',
        prompt: 'an effortlessly elegant light beige linen suit, unbuttoned, worn with a simple white linen shirt, perfect for a summer garden party',
        tags: ['casual', 'preppy', 'summer', 'classic'],
      },
      {
        id: 'seersucker-suit-derby',
        name: 'Seersucker Suit',
        prompt: 'a quintessential southern gentleman style blue and white striped seersucker suit, worn with a light pink shirt and a bow tie',
        tags: ['classic', 'preppy', 'summer', 'formal'],
      },
      {
        id: 'cable-knit-and-chinos',
        name: 'Cable-Knit & Chinos',
        prompt: 'a chunky navy blue cable-knit sweater worn over a gingham button-down shirt, paired with Nantucket red chino shorts',
        tags: ['casual', 'preppy', 'everyday', 'coastal'],
      },
      {
        id: 'camel-overcoat-scarf',
        name: 'Camel Overcoat',
        prompt: 'a sophisticated, long camel-colored wool overcoat, draped over a grey suit, with a plaid wool scarf tucked in',
        tags: ['formal', 'business', 'classic', 'preppy'],
      },
      {
        id: 'fair-isle-sweater',
        name: 'Fair Isle Sweater',
        prompt: 'a classic Fair Isle patterned sweater in earthy tones, layered over a denim shirt, with dark corduroy trousers for a cozy, academic look',
        tags: ['vintage', 'preppy', 'casual', 'everyday'],
      },
      {
        id: 'polo-shirt-shorts',
        name: 'Polo & Chino Shorts',
        prompt: 'a classic white polo shirt with the collar popped, paired with navy blue chino shorts, looking ready for a day at the yacht club',
        tags: ['casual', 'preppy', 'summer', 'sporty'],
      },
      {
        id: 'oxford-cloth-button-down',
        name: 'OCBD & Repp Tie',
        prompt: 'a quintessential preppy look featuring a blue Oxford Cloth Button-Down (OCBD) shirt, a striped repp tie, and grey wool trousers',
        tags: ['business', 'preppy', 'classic', 'everyday'],
      },
      {
        id: 'madras-plaid-shirt',
        name: 'Madras Plaid Shirt',
        prompt: 'a vibrant, authentic Madras plaid short-sleeve shirt, worn with stone-colored linen trousers, perfect for a warm day',
        tags: ['casual', 'preppy', 'summer', 'classic'],
      },
      {
        id: 'gstaad-ski-chic',
        name: 'Gstaad Ski Chic',
        prompt: 'an elegant après-ski look with a vintage-style geometric patterned ski sweater, layered under a stylish quilted down vest, with slim-fit trousers',
        tags: ['winter', 'sporty', 'preppy', 'themed'],
      },
      {
        id: 'classic-trench-coat',
        name: 'Classic Trench Coat',
        prompt: 'a timeless beige double-breasted trench coat, belted at the waist, worn over a charcoal grey suit on a drizzly London day',
        tags: ['classic', 'business', 'formal', 'preppy'],
      },
    ]
  },
  {
    category: 'Indian Regal',
    styles: [
      { id: 'classic-sherwani', name: 'Classic Sherwani', prompt: 'an elegant, knee-length classic Sherwani in a rich fabric with intricate embroidery, worn with churidar trousers', tags: ['cultural', 'regal', 'formal', 'wedding', 'ceremony'] },
      { id: 'jodhpuri-suit', name: 'Jodhpuri Suit', prompt: 'a formal Jodhpuri suit (Bandhgala) with a Nehru collar jacket and trousers, looking sharp and sophisticated', tags: ['cultural', 'regal', 'formal', 'business'] },
    ]
  },
  {
    category: 'Arabic & Middle Eastern',
    styles: [
        { id: 'elegant-thobe', name: 'Elegant Thobe', prompt: 'a pristine white, ankle-length Thobe (Kandura) with subtle embroidery on the collar and cuffs, looking clean and dignified', tags: ['cultural', 'formal', 'everyday', 'regal'] },
        { id: 'ceremonial-bisht', name: 'Ceremonial Bisht', prompt: 'a luxurious black ceremonial Bisht with gold trim, worn over a white Thobe, for a look of high status and formality', tags: ['cultural', 'regal', 'formal', 'ceremony'] },
    ]
  },
  {
    category: 'Medieval',
    styles: [
        { id: 'knight-armor', name: 'Knight in Shining Armor', prompt: 'a full suit of polished steel plate armor, looking valiant and heroic', tags: ['themed', 'historical', 'fantasy'] },
    ]
  },
  {
    category: 'Modern Casual',
    styles: [
        {
            id: 'linen-shirt-shorts',
            name: 'Linen Shirt & Shorts',
            prompt: 'a relaxed-fit, open-collar white linen shirt with comfortable beige chino shorts',
            tags: ['casual', 'summer', 'everyday', 'modern'],
        },
        {
            id: 'denim-on-denim',
            name: 'Denim Jacket & Jeans',
            prompt: 'a classic blue denim jacket layered over a plain white t-shirt with slim-fit black jeans',
            tags: ['casual', 'modern', 'everyday', 'streetwear'],
        },
        {
            id: 'smart-hoodie-joggers',
            name: 'Athleisure Hoodie & Joggers',
            prompt: 'a high-quality, well-fitted charcoal grey hoodie with matching tapered joggers and clean sneakers, for a smart athleisure look',
            tags: ['casual', 'modern', 'everyday', 'sporty'],
        },
        {
            id: 'henley-chinos',
            name: 'Henley & Chinos',
            prompt: 'a comfortable long-sleeve henley shirt in olive green paired with classic khaki chino trousers',
            tags: ['casual', 'everyday', 'classic'],
        },
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
            { id: 'elegant-ball-gown', name: 'Elegant Ball Gown', prompt: 'a breathtaking, floor-length elegant ball gown with a full skirt and intricate bodice', tags: ['formal', 'event', 'classic'] },
        ]
    },
    {
      category: 'Old Money / Ivy League',
      styles: [
          {
              id: 'tweed-blazer-riding-boots',
              name: 'Equestrian Tweed Blazer',
              prompt: 'a classic brown tweed blazer with elbow patches, layered over a cream silk blouse, paired with slim-fit trousers tucked into tall brown leather riding boots',
              tags: ['classic', 'preppy', 'equestrian'],
          },
          {
              id: 'cashmere-sweater-set',
              name: 'Cashmere Sweater Set',
              prompt: 'an elegant twin-set featuring a cashmere cardigan over a matching shell top, paired with a string of pearls and a pleated wool skirt',
              tags: ['classic', 'preppy', 'business', 'everyday'],
              isColorCustomizable: true,
              colorPalette: ['#F5F5DC', '#ADD8E6', '#FFB6C1', '#DDA0DD'],
          },
          {
              id: 'breton-stripe-trench',
              name: 'Breton Stripe & Trench',
              prompt: 'a chic Parisian-inspired look with a navy and white Breton stripe long-sleeve shirt, worn under a classic beige trench coat with white wide-leg trousers',
              tags: ['classic', 'preppy', 'everyday', 'coastal'],
          },
          {
              id: 'tailored-shirtdress',
              name: 'Tailored Shirtdress',
              prompt: 'a crisp, white tailored cotton shirtdress, cinched at the waist with a thin leather belt, paired with tan leather loafers',
              tags: ['classic', 'preppy', 'summer', 'business', 'everyday'],
          },
          {
              id: 'tennis-skirt-polo',
              name: 'Country Club Tennis Look',
              prompt: 'a sporty and chic outfit with a white pleated tennis skirt and a sleeveless polo shirt, with a cable-knit sweater tied around the shoulders',
              tags: ['sporty', 'preppy', 'summer', 'casual'],
          },
          {
              id: 'silk-scarf-blouse',
              name: 'Silk Scarf & Blouse',
              prompt: 'a sophisticated look with a colorful designer silk scarf tied elegantly around the neck, worn with a simple silk blouse and high-waisted cream trousers',
              tags: ['classic', 'preppy', 'business', 'formal'],
          },
          {
              id: 'cable-knit-dress',
              name: 'Cable-Knit Sweater Dress',
              prompt: 'a cozy yet elegant cream-colored cable-knit sweater dress, knee-length, paired with suede ankle boots and a plaid blanket scarf',
              tags: ['casual', 'preppy', 'winter', 'everyday'],
          },
          {
              id: 'plaid-wool-skirt',
              name: 'Plaid A-Line Skirt',
              prompt: 'a classic dark academia look featuring a knee-length plaid A-line wool skirt, a black turtleneck sweater, and tights with loafers',
              tags: ['vintage', 'preppy', 'classic', 'business'],
          },
          {
              id: 'barbour-quilted-jacket-womens',
              name: 'Barbour Quilted Jacket',
              prompt: 'a classic navy blue Barbour quilted jacket, layered over a striped button-down shirt, with dark-wash jeans and Hunter rain boots',
              tags: ['classic', 'preppy', 'casual', 'outdoors'],
          },
          {
              id: 'peter-pan-collar-blouse',
              name: 'Peter Pan Collar Blouse',
              prompt: 'a charming look with a silk Peter Pan collar blouse tucked into a high-waisted navy blue A-line skirt',
              tags: ['classic', 'preppy', 'vintage', 'business'],
          },
          {
              id: 'gingham-capris',
              name: 'Gingham Capri Pants',
              prompt: 'a summer Hamptons look featuring blue and white gingham capri pants, a simple white sleeveless top, and classic espadille wedges',
              tags: ['summer', 'preppy', 'casual', 'coastal'],
          },
          {
              id: 'wide-leg-linen-trousers',
              name: 'Wide-Leg Linen Trousers',
              prompt: 'an effortlessly chic coastal grandmother aesthetic with high-waisted, wide-leg white linen trousers and a loose-fitting blue chambray shirt',
              tags: ['summer', 'casual', 'preppy', 'coastal'],
          },
          {
              id: 'yacht-club-chic',
              name: 'Yacht Club Chic',
              prompt: 'a nautical outfit featuring navy blue shorts with gold button details, a crisp white blouse, and a red cardigan draped over the shoulders',
              tags: ['summer', 'coastal', 'preppy', 'casual'],
          },
          {
              id: 'velvet-blazer-holiday',
              name: 'Holiday Velvet Blazer',
              prompt: 'a festive holiday party outfit with a deep green velvet blazer worn over a cream silk camisole, paired with black watch plaid trousers',
              tags: ['formal', 'preppy', 'winter', 'themed'],
          },
          {
              id: 'statement-collar-sweater',
              name: 'Statement Collar Sweater',
              prompt: 'a trendy take on preppy style, featuring a grey sweater with a large, ruffled statement collar peeking out, paired with straight-leg jeans',
              tags: ['modern', 'preppy', 'casual', 'everyday'],
          },
      ]
    },
    {
        category: 'Indian & South Asian',
        styles: [
          { id: 'embroidered-saree', name: 'Embroidered Saree', prompt: 'a beautiful, flowing silk saree with intricate gold embroidery, draped elegantly', tags: ['cultural', 'formal', 'wedding', 'ceremony', 'regal'] },
          { id: 'ornate-lehenga', name: 'Ornate Lehenga', prompt: 'a stunning, ornate Lehenga featuring a heavily embroidered skirt, a matching choli (blouse), and a dupatta (scarf)', tags: ['cultural', 'formal', 'wedding', 'ceremony', 'regal'] },
        ]
    },
    {
        category: 'East Asian',
        styles: [
            { id: 'silk-cheongsam', name: 'Silk Cheongsam (Qipao)', prompt: 'an elegant, form-fitting silk Cheongsam (Qipao) with a high collar and traditional patterns', tags: ['cultural', 'formal', 'classic', 'modern'] },
        ]
    },
    {
        category: 'Modern Casual',
        styles: [
            {
                id: 'flowy-maxi-dress',
                name: 'Flowy Maxi Dress',
                prompt: 'a comfortable and stylish flowy floral print maxi dress with spaghetti straps, perfect for a sunny day',
                tags: ['casual', 'summer', 'everyday', 'modern'],
                isColorCustomizable: false,
            },
            {
                id: 'leather-jacket-jeans',
                name: 'Leather Jacket & Jeans',
                prompt: 'a chic black leather moto jacket over a simple white top with light-wash, high-waisted skinny jeans',
                tags: ['casual', 'modern', 'everyday', 'edgy'],
            },
            {
                id: 'knit-sweater-midi-skirt',
                name: 'Knit Sweater & Midi Skirt',
                prompt: 'a cozy, oversized cream-colored knit sweater, partially tucked into a satin-finish pleated midi skirt in a champagne color',
                tags: ['casual', 'modern', 'everyday', 'chic'],
            },
            {
                id: 'utility-jumpsuit',
                name: 'Utility Jumpsuit',
                prompt: 'a stylish and comfortable long-sleeve utility-style jumpsuit in olive green, cinched at the waist with a matching fabric belt',
                tags: ['casual', 'modern', 'everyday', 'utilitarian'],
            },
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
      { id: 'derby-shoes', name: 'Derby Shoes', prompt: 'versatile brown leather Derby shoes', tags: ['formal', 'business', 'casual'] },
      { id: 'wholecut-shoes', name: 'Wholecut Oxfords', prompt: 'sleek, minimalist wholecut oxford shoes in polished black leather', tags: ['formal', 'business', 'modern'] },
    ],
  },
  {
    category: 'Casual',
    styles: [
      { id: 'loafers-suede', name: 'Suede Loafers', prompt: 'comfortable navy blue suede loafers', tags: ['casual', 'everyday'] },
      { id: 'sneakers-minimalist', name: 'Minimalist Sneakers', prompt: 'clean white minimalist leather sneakers', tags: ['casual', 'modern', 'everyday'] },
      { id: 'chelsea-boots', name: 'Chelsea Boots', prompt: 'stylish black leather Chelsea boots', tags: ['casual', 'modern', 'everyday'] },
      { id: 'chukka-boots', name: 'Chukka Boots', prompt: 'versatile desert chukka boots in sand-colored suede', tags: ['casual', 'everyday'] },
    ],
  },
  {
    category: 'Preppy & Ivy League',
    styles: [
      { id: 'penny-loafers', name: 'Penny Loafers', prompt: 'classic burgundy leather penny loafers, without socks', tags: ['classic', 'preppy'] },
      { id: 'boat-shoes', name: 'Boat Shoes', prompt: 'brown leather two-eye boat shoes with rawhide laces', tags: ['casual', 'preppy', 'summer'] },
      { id: 'brogues-wingtip', name: 'Wingtip Brogues', prompt: 'tan leather wingtip brogues with detailed perforations', tags: ['classic', 'preppy', 'business'] },
      { id: 'duck-boots', name: 'Duck Boots', prompt: 'iconic L.L. Bean boots with a tan leather upper and waterproof rubber bottom', tags: ['casual', 'preppy', 'outdoors'] },
    ],
  },
  {
    category: 'Designer & Luxury',
    styles: [
        { id: 'gucci-horsebit-loafer', name: 'Gucci Horsebit Loafer', prompt: 'iconic black leather Gucci Horsebit loafers', tags: ['designer', 'luxury', 'classic'] },
        { id: 'prada-monolith-loafer', name: 'Prada Monolith Loafer', prompt: 'chunky, modern Prada Monolith loafers in polished black leather', tags: ['designer', 'luxury', 'modern'] },
        { id: 'tom-ford-suede-sneaker', name: 'Tom Ford Suede Sneaker', prompt: 'a luxurious low-top suede sneaker by Tom Ford in a rich brown color', tags: ['designer', 'luxury', 'casual'] },
        { id: 'john-lobb-oxford', name: 'John Lobb Oxford', prompt: 'an impeccably crafted, classic leather cap-toe oxford by John Lobb', tags: ['designer', 'luxury', 'formal'] },
        { id: 'berluti-alessandro', name: 'Berluti Alessandro', prompt: 'a Berluti Alessandro wholecut oxford with a beautiful, hand-polished patina', tags: ['designer', 'luxury', 'formal'] },
        { id: 'common-projects-achilles', name: 'Common Projects Achilles', prompt: 'minimalist Common Projects Achilles Low sneakers in white leather with gold serial number', tags: ['designer', 'modern', 'casual'] },
        { id: 'balenciaga-triple-s', name: 'Balenciaga Triple S', prompt: 'the iconic Balenciaga Triple S chunky sneaker', tags: ['designer', 'streetwear', 'modern'] },
        { id: 'saint-laurent-wyatt-boot', name: 'Saint Laurent Wyatt Boot', prompt: 'a sleek Saint Laurent Wyatt harness boot in black leather', tags: ['designer', 'luxury', 'modern'] },
    ]
  }
];

export const CATEGORIZED_WOMENS_SHOE_STYLES: StyleCategory[] = [
    {
        category: 'Heels',
        styles: [
            { id: 'stiletto-pumps', name: 'Stiletto Pumps', prompt: 'classic black stiletto pumps', tags: ['formal', 'business'] },
            { id: 'strappy-sandals', name: 'Strappy Sandals', prompt: 'elegant silver strappy heeled sandals', tags: ['formal', 'event'] },
            { id: 'wedges', name: 'Wedges', prompt: 'comfortable yet stylish wedge sandals', tags: ['casual', 'summer'] },
            { id: 'block-heels', name: 'Block Heels', prompt: 'modern and comfortable block heel pumps in nude leather', tags: ['business', 'casual', 'modern'] },
        ]
    },
    {
        category: 'Flats',
        styles: [
            { id: 'ballet-flats', name: 'Ballet Flats', prompt: 'chic nude-colored ballet flats', tags: ['casual', 'everyday'] },
            { id: 'designer-sneakers', name: 'Designer Sneakers', prompt: 'fashionable white and gold designer sneakers', tags: ['casual', 'modern'] },
            { id: 'ankle-boots', name: 'Ankle Boots', prompt: 'sleek black leather ankle boots', tags: ['casual', 'modern', 'everyday'] },
            { id: 'mules', name: 'Mules', prompt: 'stylish leather pointed-toe mules', tags: ['casual', 'modern', 'business'] },
        ]
    },
    {
      category: 'Classic & Preppy',
      styles: [
          { id: 'riding-boots-leather', name: 'Leather Riding Boots', prompt: 'elegant, tall brown leather riding boots with a flat heel', tags: ['classic', 'preppy', 'equestrian'] },
          { id: 'loafers-womens', name: 'Horsebit Loafers', prompt: 'classic black leather loafers with a gold horsebit detail', tags: ['classic', 'preppy', 'business'] },
          { id: 'espadrille-wedges', name: 'Espadrille Wedges', prompt: 'stylish canvas espadrille wedges with ankle ties', tags: ['summer', 'casual', 'preppy'] },
      ]
    },
    {
      category: 'Designer & Luxury',
      styles: [
          { id: 'louboutin-so-kate', name: 'Christian Louboutin So Kate', prompt: 'iconic Christian Louboutin "So Kate" pumps in black patent leather with a red sole', tags: ['designer', 'luxury', 'formal'] },
          { id: 'manolo-blahnik-hangisi', name: 'Manolo Blahnik Hangisi', prompt: 'elegant Manolo Blahnik Hangisi pumps in royal blue satin with a crystal buckle', tags: ['designer', 'luxury', 'formal', 'event'] },
          { id: 'jimmy-choo-romey', name: 'Jimmy Choo Romy Pumps', prompt: 'classic Jimmy Choo Romy pumps in a glittery champagne fabric', tags: ['designer', 'luxury', 'formal', 'event'] },
          { id: 'chanel-cap-toe-flat', name: 'Chanel Cap-Toe Flat', prompt: 'timeless Chanel two-tone slingback flats in beige and black', tags: ['designer', 'luxury', 'classic'] },
          { id: 'gucci-jordaan-loafer', name: 'Gucci Jordaan Loafer', prompt: 'women\'s Gucci Jordaan horsebit loafers in classic brown leather', tags: ['designer', 'luxury', 'classic', 'business'] },
          { id: 'valentino-rockstud-pump', name: 'Valentino Rockstud Pump', prompt: 'edgy and chic Valentino Rockstud caged pumps in nude leather', tags: ['designer', 'luxury', 'modern'] },
          { id: 'hermes-oran-sandal', name: 'Hermès Oran Sandal', prompt: 'the minimalist and iconic Hermès Oran sandals in tan leather', tags: ['designer', 'luxury', 'summer', 'casual'] },
          { id: 'golden-goose-superstar', name: 'Golden Goose Superstar', prompt: 'stylish, pre-distressed Golden Goose Superstar sneakers with a star detail', tags: ['designer', 'luxury', 'casual', 'modern'] },
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
    { name: 'Pink Dress Shirt', prompt: 'a stylish pink dress shirt' },
    { name: 'Striped Shirt', prompt: 'a classic vertically striped dress shirt' },
];

export const DEFAULT_TIE_OPTION: SimpleOption = {
  name: 'Automatic / None',
  prompt: '',
};

export const CATEGORIZED_TIE_STYLES: StyleCategory[] = [
    {
        category: 'Classic Ties',
        styles: [
            { id: 'silk-tie-navy', name: 'Silk Tie (Navy)', prompt: 'a classic navy blue silk tie', tags: []},
            { id: 'silk-tie-burgundy', name: 'Silk Tie (Burgundy)', prompt: 'a rich burgundy red silk tie', tags: []},
            { id: 'silk-tie-black', name: 'Silk Tie (Black)', prompt: 'a sharp black silk tie', tags: []},
            { id: 'repp-stripe-tie', name: 'Repp Stripe Tie', prompt: 'a classic striped repp tie', tags: []},
            { id: 'grenadine-tie', name: 'Grenadine Tie', prompt: 'a textured grenadine silk tie', tags: []},
        ],
    },
    {
        category: 'Bow Ties',
        styles: [
            { id: 'bowtie-black-silk', name: 'Black Silk Bow Tie', prompt: 'a classic black silk self-tie bow tie', tags: []},
            { id: 'bowtie-velvet', name: 'Velvet Bow Tie', prompt: 'a plush velvet bow tie', tags: []},
            { id: 'bowtie-patterned', name: 'Patterned Bow Tie', prompt: 'a patterned bow tie with a subtle design', tags: []},
        ],
    },
    {
        category: 'Other Neckwear',
        styles: [
            { id: 'ascot-tie', name: 'Ascot', prompt: 'a sophisticated ascot tie', tags: []},
            { id: 'skinny-tie-black', name: 'Skinny Tie (Black)', prompt: 'a modern, skinny black tie', tags: []},
            { id: 'knitted-tie', name: 'Knitted Tie', prompt: 'a stylish knitted silk tie with a square end', tags: []},
        ],
    },
    {
        category: 'Designer Brands',
        styles: [
            { id: 'hermes-patterned-tie', name: 'Hermès Patterned Tie', prompt: 'an elegant silk Hermès tie with a distinctive, playful pattern', tags: []},
            { id: 'gucci-gg-tie', name: 'Gucci GG Motif Tie', prompt: 'a silk Gucci tie featuring the iconic GG monogram pattern', tags: []},
            { id: 'tom-ford-solid-tie', name: 'Tom Ford Solid Tie', prompt: 'a luxurious, perfectly proportioned solid color Tom Ford silk tie', tags: []},
            { id: 'zegna-silk-tie', name: 'Ermenegildo Zegna Tie', prompt: 'a refined Ermenegildo Zegna silk tie with a subtle pattern', tags: []},
            { id: 'charvet-silk-tie', name: 'Charvet Place Vendôme Tie', prompt: 'a classic patterned silk tie from the legendary Parisian shirtmaker Charvet', tags: []},
            { id: 'drakes-tie', name: 'Drake\'s of London Tie', prompt: 'a handmade Drake\'s tie with a classic English design', tags: []},
            { id: 'versace-barocco-tie', name: 'Versace Barocco Tie', prompt: 'a bold Versace silk tie with the iconic Barocco print', tags: []},
            { id: 'armani-silk-tie', name: 'Giorgio Armani Tie', prompt: 'an understated and elegant Giorgio Armani silk tie', tags: []},
        ]
    }
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

export const CATEGORIZED_EYEWEAR_STYLES: StyleCategory[] = [
    {
        category: 'Sunglasses',
        styles: [
            { id: 'ray-ban-aviator', name: 'Ray-Ban Aviator', prompt: 'classic Ray-Ban aviator sunglasses with a gold frame', tags: []},
            { id: 'ray-ban-wayfarer', name: 'Ray-Ban Wayfarer', prompt: 'iconic black Ray-Ban Wayfarer sunglasses', tags: []},
            { id: 'persol-649', name: 'Persol 649', prompt: 'vintage-style Persol 649 sunglasses with the signature arrow hinge', tags: []},
            { id: 'oliver-peoples-gregory-peck', name: 'Oliver Peoples Gregory Peck', prompt: 'Oliver Peoples Gregory Peck sunglasses with a retro aesthetic', tags: []},
            { id: 'tom-ford-snowdon', name: 'Tom Ford Snowdon', prompt: 'the stylish Tom Ford Snowdon sunglasses, famously worn by James Bond', tags: []},
            { id: 'gucci-oversized-sunglasses', name: 'Gucci Oversized Sunglasses', prompt: 'glamorous oversized square-frame sunglasses by Gucci', tags: []},
            { id: 'prada-symbole-sunglasses', name: 'Prada Symbole Sunglasses', prompt: 'modern, geometric Prada Symbole sunglasses', tags: []},
            { id: 'saint-laurent-cat-eye', name: 'Saint Laurent Cat-Eye', prompt: 'chic and sharp cat-eye sunglasses by Saint Laurent', tags: []},
            { id: 'carrera-champion', name: 'Carrera Champion', prompt: 'sporty and retro Carrera Champion aviator sunglasses', tags: []},
            { id: 'oakley-holbrook', name: 'Oakley Holbrook', prompt: 'casual and sporty Oakley Holbrook sunglasses', tags: []},
        ],
    },
    {
        category: 'Prescription Glasses',
        styles: [
            { id: 'horn-rimmed-glasses', name: 'Horn-rimmed Glasses', prompt: 'stylish horn-rimmed prescription glasses', tags: []},
            { id: 'warby-parker-watts', name: 'Warby Parker-style Glasses', prompt: 'classic, intellectual round-frame prescription glasses similar to Warby Parker\'s style', tags: []},
            { id: 'lindberg-rimless-glasses', name: 'Lindberg Rimless Glasses', prompt: 'ultralight and minimalist Lindberg-style rimless prescription glasses', tags: []},
            { id: 'cartier-c-decor', name: 'Cartier C de Cartier', prompt: 'luxurious Cartier C de Cartier glasses with the signature C hinge design', tags: []},
            { id: 'tom-ford-blue-block', name: 'Tom Ford Blue Block', prompt: 'stylish Tom Ford square-frame prescription glasses with blue block lenses', tags: []},
            { id: 'ray-ban-clubmaster-optical', name: 'Ray-Ban Clubmaster Optical', prompt: 'the iconic Ray-Ban Clubmaster browline frame as prescription glasses', tags: []},
            { id: 'giorgio-armani-frames', name: 'Giorgio Armani Frames', prompt: 'elegant and understated Giorgio Armani rectangular prescription frames', tags: []},
            { id: 'persol-optical', name: 'Persol Optical Frames', prompt: 'classic Persol optical frames with the iconic arrow detail', tags: []},
            { id: 'moscot-lemtosh', name: 'Moscot Lemtosh', prompt: 'the iconic Moscot Lemtosh round glasses for a vintage, intellectual look', tags: []},
            { id: 'cutler-and-gross', name: 'Cutler and Gross Frames', prompt: 'bold, handcrafted acetate prescription frames by Cutler and Gross', tags: []},
        ]
    }
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
      { id: 'pork-pie-hat', name: 'Pork Pie Hat', prompt: 'a stylish pork pie hat with a flat top and short brim', tags: ['vintage', 'modern'] },
    ],
  },
  {
    category: 'Caps & Berets',
    styles: [
      { id: 'flat-cap', name: 'Flat Cap', prompt: 'a classic tweed or wool flat cap (newsboy cap)', tags: ['vintage', 'classic', 'casual'] },
      { id: 'baseball-cap', name: 'Baseball Cap', prompt: 'a modern, stylish baseball cap', tags: ['casual', 'streetwear', 'modern'] },
      { id: 'beanie-hat', name: 'Beanie', prompt: 'a knitted beanie hat', tags: ['casual', 'winter'] },
      { id: 'beret-hat', name: 'Beret', prompt: 'a classic wool beret', tags: ['artistic', 'classic', 'casual'] },
      { id: 'washed-chino-cap', name: 'Washed Chino Baseball Cap', prompt: 'a soft, washed chino baseball cap in a faded navy blue with a small embroidered motif', tags: ['casual', 'preppy', 'modern'] },
      { id: 'ivy-cap', name: 'Ivy Cap', prompt: 'a classic wool ivy cap (a sleeker version of a flat cap)', tags: ['vintage', 'classic', 'preppy'] },
    ],
  },
  {
    category: 'Designer & Iconic Brands',
    styles: [
      { id: 'borsalino-fedora', name: 'Borsalino Fedora', prompt: 'a legendary, high-quality felt fedora from the Italian brand Borsalino', tags: ['designer', 'luxury', 'classic'] },
      { id: 'stetson-open-road', name: 'Stetson Open Road', prompt: 'an iconic Stetson "Open Road" western-style hat', tags: ['designer', 'classic', 'vintage'] },
      { id: 'lock-co-coke-hat', name: 'Lock & Co. Coke Hat', prompt: 'a classic Coke hat (bowler) from the historic London hatter Lock & Co.', tags: ['designer', 'luxury', 'classic'] },
      { id: 'kangol-504-cap', name: 'Kangol 504 Cap', prompt: 'the iconic Kangol 504 flat cap', tags: ['designer', 'streetwear', 'modern'] },
      { id: 'new-era-59fifty', name: 'New Era 59FIFTY Cap', prompt: 'a fitted New Era 59FIFTY baseball cap', tags: ['designer', 'streetwear', 'casual'] },
      { id: 'gucci-gg-beanie', name: 'Gucci GG Beanie', prompt: 'a wool beanie featuring the Gucci GG monogram', tags: ['designer', 'luxury', 'winter'] },
      { id: 'prada-bucket-hat', name: 'Prada Nylon Bucket Hat', prompt: 'the iconic Prada triangle logo nylon bucket hat', tags: ['designer', 'luxury', 'modern'] },
      { id: 'burberry-check-cap', name: 'Burberry Check Cap', prompt: 'a baseball cap in the classic Burberry vintage check pattern', tags: ['designer', 'luxury'] },
    ]
  }
];