

export interface SimpleOption {
    name: string;
    prompt: string;
}

export interface StyleOption {
    id: string;
    name: string;
    prompt: string;
    tags: string[];
    isColorCustomizable?: boolean;
    colorPalette?: string[];
    previewImage?: string;
}

export interface StyleCategory {
    category: string;
    styles: StyleOption[];
}

export interface OptionGroup {
    category: string;
    styles: StyleOption[];
}

export interface QualityOption {
    name: string;
    value: string;
}

export interface RemixConfig {
    attireType: string;
    stylePrompt: string;
    backgroundPrompt: string;
    lightingPrompt: string;
    shoePrompt?: string;
    shirtPrompt?: string;
    tiePrompt?: string;
}

export interface PoliticalParty {
    id: string;
    name: string;
    fullName: string;
    symbol: string;
    colors: string;
    hexColor: string;
    defaultSlogan?: string;
}

export const QUALITY_OPTIONS: QualityOption[] = [
    { name: 'Standard', value: 'standard' },
    { name: 'High Res (4K)', value: 'high' }
];

// --- CAMPAIGN CONFIGS ---

export const KENYAN_PARTIES: PoliticalParty[] = [
    { id: 'uda', name: 'UDA', fullName: 'United Democratic Alliance', symbol: 'Wheelbarrow', colors: 'Yellow and Green', hexColor: '#FFD700', defaultSlogan: 'Kazi ni Kazi' },
    { id: 'odm', name: 'ODM', fullName: 'Orange Democratic Movement', symbol: 'Orange', colors: 'Orange and White', hexColor: '#FFA500', defaultSlogan: 'Inawezekana' },
    { id: 'jubilee', name: 'Jubilee', fullName: 'Jubilee Party', symbol: 'Dove', colors: 'Red and White', hexColor: '#FF0000', defaultSlogan: 'Tuko Pamoja' },
    { id: 'wiper', name: 'Wiper', fullName: 'Wiper Democratic Movement', symbol: 'Umbrella', colors: 'Blue and White', hexColor: '#0000FF', defaultSlogan: 'One Kenya' }
];

export const CAMPAIGN_POSITIONS = [
    { name: 'President', value: 'President' },
    { name: 'Governor', value: 'Governor' },
    { name: 'Senator', value: 'Senator' },
    { name: 'MP', value: 'Member of Parliament' },
    { name: 'Woman Rep', value: 'Woman Representative' },
    { name: 'MCA', value: 'Member of County Assembly' }
];

export const CAMPAIGN_WRAP_STYLES = [
    { name: 'Full Branding', value: 'full' },
    { name: 'Minimal Decals', value: 'minimal' },
    { name: 'Rally Stripes', value: 'rally' },
    { name: 'Sound Truck', value: 'soundtruck' }
];

export const CAMPAIGN_MODS = [
    { name: 'PA System', prompt: 'roof mounted PA system speakers', value: 'pa_system' },
    { name: 'Flag Mounts', prompt: 'political party flags mounted on hood', value: 'flags' },
    { name: 'Bullbar', prompt: 'heavy duty front bullbar', value: 'bullbar' },
    { name: 'Floodlights', prompt: 'roof mounted floodlights', value: 'lights' }
];

export const MANIFESTO_FORMATS = [
    { name: 'Social Card (4:5)', value: '4:5', prompt: 'a vertical social media card format (4:5 ratio). Layout must be clean with a dedicated text area.' },
    { name: 'Story / Reel (9:16)', value: '9:16', prompt: 'a full screen phone story format (9:16 ratio). Text must be placed in a safe zone, not at the very top or bottom.' },
    { name: 'Print Flyer (A4)', value: '1:1.414', prompt: 'a standard A4 paper document format (vertical). High-resolution print ready layout with distinct margins.' },
    { name: 'Square (1:1)', value: '1:1', prompt: 'a perfectly square digital card format (1:1 ratio). Balanced symmetrical layout.' },
    { name: 'Bi-Fold Booklet (Spread)', value: '16:9', prompt: 'a bi-fold campaign booklet spread layout (landscape 16:9). STRICTLY: Left half is the candidate photo, Right half is a solid color block with the manifesto text.' },
    { name: 'Booklet Cover', value: '1:1.414', prompt: 'a glossy campaign manifesto booklet front cover (A4 vertical). Massive candidate name title and portrait.' }
];

export const CATEGORIZED_CAMPAIGN_TEMPLATES: OptionGroup[] = [
    {
        category: "Modern & Minimalist",
        styles: [
            { id: "swiss_style", name: "Swiss International", prompt: "Swiss International Style graphic design, clean grid layout, sans-serif bold typography, generous negative space, minimalist aesthetic", tags: ['modern'] },
            { id: "geometric_flat", name: "Geometric Flat", prompt: "Modern flat design with bold geometric shapes overlay, vector art style, clean lines, solid color blocks", tags: ['modern'] },
            { id: "corporate_clean", name: "Corporate Clean", prompt: "Professional corporate aesthetic, trustworthy deep blues and greys, structured layout, modern serif typography", tags: ['professional'] }
        ]
    },
    {
        category: "Bold & High Impact",
        styles: [
            { id: "constructivist", name: "Constructivist", prompt: "Russian Constructivist inspired, bold red and black angles, striking geometric composition, revolutionary vibe", tags: ['bold'] },
            { id: "block_text", name: "Blockbuster", prompt: "Heavy, massive block text filling the frame, high energy, action movie poster aesthetic", tags: ['bold'] },
            { id: "pop_art_bold", name: "Pop Art Bold", prompt: "Bold Pop Art style, halftone patterns, thick outlines, vibrant primary colors, comic book impact", tags: ['artistic'] }
        ]
    }
];

export const CATEGORIZED_MANIFESTO_TEMPLATES: OptionGroup[] = [
    {
        category: "Booklet & Brochure",
        styles: [
            { id: "party_standard", name: "Party Standard (Poster Match)", prompt: "Match the exact visual style of the campaign posters. Use the official party colors and theme as the dominant structural elements. Integrated, branded look.", tags: ['branded'] },
            { id: "policy_booklet", name: "Policy Handbook", prompt: "A clean, multi-page booklet aesthetic. Organized columns, bullet points (•), and clear headers. Use the party colors for page borders and headers.", tags: ['booklet'] },
            { id: "community_digest", name: "Community Digest", prompt: "A friendly, approachable newsletter style. Warm layout, readable serif fonts, clear separation between candidate image and text zones.", tags: ['community'] },
            { id: "vision_bi_fold", name: "Vision Bi-Fold", prompt: "A professional bi-fold brochure spread. Distinct left and right panels. High contrast text areas.", tags: ['formal'] }
        ]
    },
    {
        category: "High Modern",
        styles: [
            { id: "swiss_grid_doc", name: "Swiss Grid System", prompt: "High Modernism. A rigorous Swiss Grid layout. Helvetica typography. Asymmetrical balance. Strong use of whitespace and horizontal rules. The candidate name is treated as a modernist logotype.", tags: ['modern', 'clean'] },
            { id: "neo_brutalist", name: "Neo-Brutalist", prompt: "Trendy Neo-Brutalism. High contrast borders, raw unstyled aesthetic, large serif fonts, flat vibrant background colors, stark shadows.", tags: ['trendy', 'bold'] },
            { id: "glassmorphism_doc", name: "Frosted Glass", prompt: "Premium Glassmorphism. Frosted glass cards floating over a blurred mesh gradient background. Soft shadows, white text, futuristic and clean.", tags: ['modern', 'tech'] },
            { id: "dark_mode_lux", name: "Dark Mode Luxury", prompt: "Matte black background with gold or silver foil typography. High-end luxury editorial feel. Sharp, thin lines.", tags: ['luxury'] }
        ]
    },
    {
        category: "Classic & Print",
        styles: [
            { id: "newspaper_editorial", name: "The Editorial", prompt: "Classic newspaper front page aesthetic. Serif headlines, column layout, black and white photography with color accents.", tags: ['classic'] },
            { id: "official_letterhead", name: "Official Letterhead", prompt: "Official government document style. Watermarks, crests, formal layout, very structured and trustworthy.", tags: ['formal'] }
        ]
    }
];

// --- APPAREL STYLES ---

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
        category: "Evening & Gala",
        styles: [
            { id: "evening_gown_red", name: "Red Carpet Gown", prompt: "A glamorous floor-length red evening gown with a slit, off-shoulder design, elegant silhouette", tags: ["formal", "gala", "red"] },
            { id: "cocktail_dress_black", name: "Little Black Dress", prompt: "A chic, sophisticated little black dress (LBD), knee-length, modern cut", tags: ["formal", "party", "black"] },
            { id: "sequin_dress", name: "Sequin Party Dress", prompt: "A sparkling gold sequin dress, form-fitting, catching the light, party vibe", tags: ["party", "glamour", "gold"] }
        ]
    },
    {
        category: "Business & Power",
        styles: [
            { id: "power_suit_white", name: "White Power Suit", prompt: "A crisp, tailored white pantsuit with a structured blazer, modern professional look", tags: ["business", "formal", "white", "modern"] },
            { id: "blazer_skirt", name: "Blazer & Pencil Skirt", prompt: "A professional business ensemble with a fitted blazer and matching pencil skirt in slate grey", tags: ["business", "classic"] },
            { id: "modern_blouse", name: "Silk Blouse & Trousers", prompt: "A flowy silk blouse tucked into high-waisted wide-leg trousers, office chic", tags: ["business", "casual"] }
        ]
    },
    {
        category: "Cultural",
        styles: [
            { id: "ankara_gown", name: "Vibrant Ankara Gown", prompt: "A stunning floor-length mermaid gown made from vibrant, colorful Ankara wax print fabric", tags: ["cultural", "ceremony", "colorful"] },
            { id: "saree_silk", name: "Silk Saree", prompt: "An elegant traditional silk saree with gold borders, draped beautifully", tags: ["cultural", "wedding"] },
            { id: "kaftan_luxe", name: "Luxury Kaftan", prompt: "A flowing, embellished silk kaftan with intricate beadwork around the neckline", tags: ["cultural", "relaxed", "luxury"] }
        ]
    }
];

export const CATEGORIZED_KIDS_STYLES: StyleCategory[] = [
    {
        category: "Formal",
        styles: [
            { id: "ring_bearer", name: "Mini Tuxedo", prompt: "A cute, perfectly fitted miniature tuxedo for a child, black tie, white shirt", tags: ["formal", "wedding"] },
            { id: "flower_girl", name: "Flower Girl Dress", prompt: "A puffy white tulle dress with a satin sash, fairytale style", tags: ["formal", "wedding"] }
        ]
    },
    {
        category: "Casual",
        styles: [
            { id: "cool_kid", name: "Cool Kid Streetwear", prompt: "Trendy kids streetwear, denim jacket, graphic tee, colorful sneakers", tags: ["casual", "school"] },
            { id: "sunday_best", name: "Sunday Best", prompt: "Neat button-down shirt and chino shorts with suspenders", tags: ["smart-casual"] }
        ]
    }
];

// --- VEHICLE STYLES ---

export const CATEGORIZED_VEHICLE_STYLES: StyleCategory[] = [
    {
        category: "Wraps & Paint",
        styles: [
            { id: "matte_black", name: "Stealth Matte Black", prompt: "A high-quality satin matte black vinyl wrap covering the entire vehicle, stealth look", tags: ["modern", "stealth"] },
            { id: "racing_livery", name: "Racing Livery", prompt: "A dynamic racing livery with bold stripes, sponsor decals, and racing numbers", tags: ["sport", "racing"] },
            { id: "cyberpunk", name: "Cyberpunk", prompt: "A futuristic cyberpunk aesthetic wrap with neon accents, circuit patterns, and metallic textures", tags: ["futuristic"] },
            { id: "camo_urban", name: "Urban Camo", prompt: "A geometric urban camouflage wrap in shades of grey, white, and black", tags: ["tactical"] }
        ]
    },
    {
        category: "Body Kits",
        styles: [
            { id: "widebody", name: "Widebody Kit", prompt: "An aggressive widebody kit with flared fenders, lowered suspension, and a front splitter", tags: ["sport", "aggressive"] },
            { id: "offroad", name: "Offroad Ready", prompt: "Lifted suspension, off-road tires, roof rack with lights, bullbar", tags: ["utility", "rugged"] }
        ]
    }
];

// --- INTERIOR STYLES ---

export const CATEGORIZED_INTERIOR_STYLES: StyleCategory[] = [
    {
        category: "Residential",
        styles: [
            { id: "scandi", name: "Scandinavian", prompt: "Minimalist Scandinavian design, light wood furniture, white walls, cozy textiles, bright and airy", tags: ["modern", "minimal"] },
            { id: "industrial", name: "Industrial Loft", prompt: "Industrial loft style, exposed brick walls, metal accents, leather furniture, concrete floors", tags: ["urban", "modern"] },
            { id: "mid_century", name: "Mid-Century Modern", prompt: "Mid-century modern aesthetic, teak furniture, retro color accents, organic shapes", tags: ["retro", "classic"] }
        ]
    },
    {
        category: "Commercial",
        styles: [
            { id: "office_modern", name: "Modern Office", prompt: "Sleek modern office space, glass partitions, ergonomic chairs, clean desks, professional lighting", tags: ["business"] },
            { id: "cafe_cozy", name: "Cozy Cafe", prompt: "Warm and inviting cafe interior, rustic wood tables, ambient lighting, plants", tags: ["hospitality"] }
        ]
    }
];

// --- LANDSCAPE STYLES ---

export const CATEGORIZED_LANDSCAPE_STYLES: StyleCategory[] = [
    {
        category: "Gardens",
        styles: [
            { id: "japanese_garden", name: "Japanese Zen", prompt: "A peaceful Japanese Zen garden with raked sand, mossy rocks, bonsai trees, and a stone lantern", tags: ["peaceful", "asian"] },
            { id: "english_cottage", name: "English Cottage", prompt: "A lush English cottage garden overflowing with colorful flowers, roses, hollyhocks, and winding stone paths", tags: ["classic", "lush"] },
            { id: "modern_minimal", name: "Modern Xeriscape", prompt: "A modern minimalist landscape with drought-tolerant succulents, ornamental grasses, and concrete pavers", tags: ["modern", "dry"] }
        ]
    }
];

// --- BACKGROUNDS & LIGHTING ---

export interface BackgroundOption {
    name: string;
    prompt: string;
}

export const APPAREL_BACKGROUNDS: BackgroundOption[] = [
    { name: 'Original', prompt: '' },
    { name: 'Studio Grey', prompt: 'a professional photography studio with a neutral grey seamless background' },
    { name: 'Luxury Lobby', prompt: 'the lobby of a 5-star luxury hotel with marble floors and warm lighting' },
    { name: 'Urban Street', prompt: 'a blurry city street background with bokeh lights, fashion editorial style' },
    { name: 'Nature / Park', prompt: 'a serene park with green trees and soft sunlight' },
    { name: 'Red Carpet', prompt: 'a red carpet event with photographers flashes in the background' },
    { name: 'Office', prompt: 'a modern corporate office with glass walls' },
    { name: 'Art Gallery', prompt: 'a minimalist art gallery with white walls' },
    { name: 'Gala Event', prompt: 'a formal gala event with chandeliers' }
];
export const BACKGROUND_OPTIONS = APPAREL_BACKGROUNDS; // Alias

export const VEHICLE_BACKGROUNDS: BackgroundOption[] = [
    { name: 'Original', prompt: '' },
    { name: 'Showroom', prompt: 'a pristine, bright white car showroom with reflective floors' },
    { name: 'City Night', prompt: 'a wet city street at night with neon sign reflections' },
    { name: 'Desert Road', prompt: 'an open desert road with mountains in the distance' },
    { name: 'Race Track', prompt: 'a professional race track pit lane' }
];

export const INTERIOR_BACKGROUNDS: BackgroundOption[] = [
    { name: 'Original', prompt: '' },
    { name: 'City View', prompt: 'large windows overlooking a city skyline' },
    { name: 'Garden View', prompt: 'large windows opening onto a lush green garden' }
];

export const LANDSCAPE_BACKGROUNDS: BackgroundOption[] = [
    { name: 'Original', prompt: '' },
    { name: 'Sunset', prompt: 'bathed in the warm glow of a sunset' },
    { name: 'Overcast', prompt: 'soft, diffused overcast lighting' }
];

export const APPAREL_LIGHTING: BackgroundOption[] = [
    { name: 'Original', prompt: '' },
    { name: 'Studio Lighting', prompt: 'soft, balanced studio lighting that highlights facial features' },
    { name: 'Golden Hour', prompt: 'warm, golden hour sunlight coming from the side' },
    { name: 'Dramatic', prompt: 'high-contrast dramatic lighting with deep shadows, noir style' },
    { name: 'Neon', prompt: 'colorful neon lighting, cyberpunk aesthetic' },
    { name: 'Natural Daylight', prompt: 'bright, natural daylight' },
    { name: 'Dramatic Evening', prompt: 'dim, moody evening lighting' }
];
export const LIGHTING_OPTIONS = APPAREL_LIGHTING; // Alias

export const VEHICLE_LIGHTING: BackgroundOption[] = [
    { name: 'Original', prompt: '' },
    { name: 'Studio Reflections', prompt: 'studio lighting designed to accentuate car curves and reflections' },
    { name: 'Sunset', prompt: 'warm sunset lighting' }
];

export const INTERIOR_LIGHTING: BackgroundOption[] = [
    { name: 'Original', prompt: '' },
    { name: 'Warm & Cozy', prompt: 'warm, ambient lighting from lamps' },
    { name: 'Bright & Airy', prompt: 'bright natural light filling the room' }
];

export const LANDSCAPE_LIGHTING: BackgroundOption[] = [
    { name: 'Original', prompt: '' },
    { name: 'Morning Mist', prompt: 'soft morning light with a hint of mist' }
];


// --- ACCESSORIES ---

export const DEFAULT_SHOE_OPTION = { name: 'Keep Original', prompt: '' };
export const CATEGORIZED_SHOE_STYLES: OptionGroup[] = [
    { category: 'Formal', styles: [{ id: 'oxford', name: 'Black Oxfords', prompt: 'classic black leather oxford shoes', tags: [] }, { id: 'loafers', name: 'Penny Loafers', prompt: 'brown leather penny loafers', tags: [] }] },
    { category: 'Casual', styles: [{ id: 'sneakers_white', name: 'White Sneakers', prompt: 'clean white minimalist leather sneakers', tags: [] }, { id: 'boots', name: 'Leather Boots', prompt: 'rugged brown leather boots', tags: [] }] }
];
export const CATEGORIZED_WOMENS_SHOE_STYLES: OptionGroup[] = [
    { category: 'Heels', styles: [{ id: 'stilettos', name: 'Black Stilettos', prompt: 'classic black stiletto heels', tags: [] }, { id: 'pumps', name: 'Nude Pumps', prompt: 'nude patent leather pumps', tags: [] }] },
    { category: 'Flats', styles: [{ id: 'ballet', name: 'Ballet Flats', prompt: 'chic black ballet flats', tags: [] }] }
];
export const CATEGORIZED_KIDS_SHOE_STYLES: OptionGroup[] = [
    { category: 'Kids', styles: [{ id: 'kids_sneakers', name: 'Velcro Sneakers', prompt: 'colorful sneakers with velcro straps', tags: [] }] }
];

export const DEFAULT_SHIRT_OPTION = { name: 'Keep Original', prompt: '' };
export const SHIRT_OPTIONS: SimpleOption[] = [
    { name: 'White Dress Shirt', prompt: 'a crisp white dress shirt' },
    { name: 'Light Blue Shirt', prompt: 'a light blue dress shirt' },
    { name: 'Black Shirt', prompt: 'a sleek black dress shirt' },
    { name: 'Turtleneck', prompt: 'a black turtleneck sweater' },
    { name: 'Pink Dress Shirt', prompt: 'a stylish pink dress shirt' },
    { name: 'Striped Shirt', prompt: 'a classic vertically striped dress shirt' },
];

export const DEFAULT_TIE_OPTION = { name: 'Keep Original', prompt: '' };
export const CATEGORIZED_TIE_STYLES: OptionGroup[] = [
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

export const DEFAULT_HANDBAG_OPTION = { name: 'None', prompt: '' };
export const CATEGORIZED_HANDBAG_STYLES: OptionGroup[] = [
    { category: 'Bags', styles: [{ id: 'clutch', name: 'Evening Clutch', prompt: 'an elegant metallic evening clutch', tags: [] }, { id: 'tote', name: 'Leather Tote', prompt: 'a structured leather tote bag', tags: [] }] }
];

export const DEFAULT_POSTURE_OPTION = { name: 'Original', prompt: '' };
export const POSTURE_OPTIONS = [
    { name: 'Confident / Arms Crossed', prompt: 'standing confidently with arms crossed' },
    { name: 'Hands in Pockets', prompt: 'standing relaxed with hands in pockets' },
    { name: 'Walking', prompt: 'walking forward confidently' }
];

export const DEFAULT_EYEWEAR_OPTION = { name: 'None', prompt: '' };
export const CATEGORIZED_EYEWEAR_STYLES: OptionGroup[] = [
    { category: 'Glasses', styles: [{ id: 'aviators', name: 'Aviator Sunglasses', prompt: 'classic aviator sunglasses', tags: [] }, { id: 'optical', name: 'Thick Rimmed Glasses', prompt: 'stylish thick-rimmed optical glasses', tags: [] }] }
];

export const DEFAULT_HEADWEAR_OPTION = { name: 'None', prompt: '' };
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


// --- VEHICLE MODS ---

export const DEFAULT_VEHICLE_MOD_OPTION = { name: 'Keep Original', prompt: '' };
export const CATEGORIZED_VEHICLE_RIMS: OptionGroup[] = [
    { category: 'Street', styles: [{ id: 'alloy_silver', name: 'Silver Alloys', prompt: 'multi-spoke silver alloy performance wheels', tags: [] }, { id: 'black_rims', name: 'Gloss Black', prompt: 'gloss black racing rims', tags: [] }] }
];
export const CATEGORIZED_VEHICLE_AERO: OptionGroup[] = [
    { category: 'Aero', styles: [{ id: 'spoiler', name: 'Rear Spoiler', prompt: 'a large carbon fiber rear wing spoiler', tags: [] }, { id: 'splitter', name: 'Front Splitter', prompt: 'an aggressive front bumper splitter', tags: [] }] }
];
export const CATEGORIZED_VEHICLE_INTERIOR: OptionGroup[] = [
    { category: 'Seats', styles: [{ id: 'bucket_seats', name: 'Racing Seats', prompt: 'red leather racing bucket seats', tags: [] }, { id: 'tan_leather', name: 'Tan Leather', prompt: 'luxury tan leather upholstery', tags: [] }] }
];
export const CATEGORIZED_VEHICLE_LIGHTING_GRILL: OptionGroup[] = [
    { category: 'Lights', styles: [{ id: 'led_halo', name: 'LED Halo Rings', prompt: 'custom LED halo ring headlights', tags: [] }, { id: 'blackout', name: 'Smoked Lights', prompt: 'tinted smoked headlights and taillights', tags: [] }] }
];

// --- POSTER / STUDIO CONFIGS ---

export const POSTER_POSES = [
    { name: 'Back to Back', prompt: 'The two subjects are standing back to back, looking cool and confident.' },
    { name: 'Side by Side', prompt: 'The two subjects are standing side by side, facing forward, power stance.' },
    { name: 'Foreground/Background', prompt: 'One subject is in the foreground in focus, the other is slightly behind.' }
];

export const POSTER_ASPECT_RATIOS = [
    { name: 'Portrait (4:5)', value: '4:5' },
    { name: 'Square (1:1)', value: '1:1' },
    { name: 'Landscape (16:9)', value: '16:9' }
];

export const POSTER_BACKGROUND_OPTIONS = [
    { name: 'Dark Studio', prompt: 'a dark, moody studio background with smoke textures' },
    { name: 'Solid Color (Custom)', prompt: 'a solid background of hex color ' }, // Special handling in logic
    { name: 'Graffiti Wall', prompt: 'a colorful urban graffiti wall' },
    { name: 'Concert Stage', prompt: 'a concert stage with blinding lights in the background' }
];

export const POSTER_LIGHTING_OPTIONS = [
    { name: 'Dramatic Rim', prompt: 'dramatic rim lighting outlining the subjects' },
    { name: 'Soft Studio', prompt: 'soft, even studio lighting' },
    { name: 'Neon Cyber', prompt: 'blue and pink neon lighting' }
];

export const POSTER_DISTANCE_OPTIONS = [
    { name: 'Medium Shot', prompt: 'framed from the waist up' },
    { name: 'Full Body', prompt: 'showing the full body from head to toe' },
    { name: 'Close Up', prompt: 'a close up focused on faces and shoulders' }
];

export const POSTER_INDIVIDUAL_POSTURES = [
    { name: 'Crossed Arms', prompt: 'with arms crossed confidently' },
    { name: 'Hands in Pockets', prompt: 'with hands relaxed in pockets' },
    { name: 'Pointing', prompt: 'pointing towards the camera' }
];

export const POSTER_FONT_OPTIONS = [
    { name: 'Bold Sans', prompt: 'Bold modern sans-serif typography' },
    { name: 'Serif Classic', prompt: 'Classic elegant serif typography' },
    { name: 'Handwritten', prompt: 'Aggressive handwritten marker font' }
];

export const POSTER_ICON_OPTIONS = [
    { name: 'None', prompt: '' },
    { name: 'Parental Advisory', prompt: 'include a parental advisory explicit content label' }
];

export const STUDIO_SCENARIOS = [
    { name: 'Business Meeting', prompt: 'Two professionals shaking hands or discussing a document in an office.' },
    { name: 'Casual Conversation', prompt: 'Two friends laughing and talking in a cafe setting.' },
    { name: 'Couple Portrait', prompt: 'An intimate portrait of a couple standing close together.' }
];

export const STUDIO_POSES = [
    { name: 'Standing', prompt: 'standing naturally' },
    { name: 'Sitting', prompt: 'sitting on chairs or a sofa' }
];