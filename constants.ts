

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

export interface PosterPose {
    name: string;
    prompt: string;
}

export interface PosterAspectRatio {
    name: string;
    value: string;
}

export interface OptionGroup {
    category: string;
    styles: StyleOption[];
}

// ==========================================
// KENYAN POLITICAL PARTIES
// ==========================================

export interface PoliticalParty {
    id: string;
    name: string;
    fullName: string;
    colors: string; // Text description for prompt
    hexColor: string; // Primary hex for UI
    symbol: string;
}

export const KENYAN_PARTIES: PoliticalParty[] = [
    { 
        id: 'uda', 
        name: 'UDA', 
        fullName: 'United Democratic Alliance', 
        colors: 'Bright Yellow and Green', 
        hexColor: '#FFD700', 
        symbol: 'Wheelbarrow' 
    },
    { 
        id: 'odm', 
        name: 'ODM', 
        fullName: 'Orange Democratic Movement', 
        colors: 'Orange and White', 
        hexColor: '#FFA500', 
        symbol: 'Orange (Fruit)' 
    },
    { 
        id: 'jubilee', 
        name: 'Jubilee', 
        fullName: 'Jubilee Party', 
        colors: 'Red and White', 
        hexColor: '#DC143C', 
        symbol: 'Dove / Clasped Hands' 
    },
    { 
        id: 'wiper', 
        name: 'Wiper', 
        fullName: 'Wiper Democratic Movement', 
        colors: 'Sky Blue and White', 
        hexColor: '#00BFFF', 
        symbol: 'Umbrella' 
    },
    { 
        id: 'kanu', 
        name: 'KANU', 
        fullName: 'Kenya African National Union', 
        colors: 'Red, Black, and Green', 
        hexColor: '#000000', 
        symbol: 'Cockerel' 
    },
    { 
        id: 'ford-k', 
        name: 'FORD Kenya', 
        fullName: 'Forum for the Restoration of Democracy – Kenya', 
        colors: 'Green and White', 
        hexColor: '#228B22', 
        symbol: 'Lion' 
    },
    { 
        id: 'narc-k', 
        name: 'NARC Kenya', 
        fullName: 'National Rainbow Coalition – Kenya', 
        colors: 'Red and Flower patterns', 
        hexColor: '#E60000', 
        symbol: 'Flower' 
    },
    { 
        id: 'roots', 
        name: 'Roots Party', 
        fullName: 'Roots Party of Kenya', 
        colors: 'Red, Gold, Green (Rasta Theme)', 
        hexColor: '#006400', 
        symbol: 'Tree / Leaf' 
    },
     { 
        id: 'independent', 
        name: 'Independent', 
        fullName: 'Independent Candidate', 
        colors: 'White and Gold', 
        hexColor: '#FFFFFF', 
        symbol: 'Briefcase' 
    }
];

export const CAMPAIGN_POSITIONS = [
    { name: 'President', value: 'President' },
    { name: 'Governor', value: 'Governor' },
    { name: 'Senator', value: 'Senator' },
    { name: 'MP', value: 'Member of Parliament' },
    { name: 'Woman Rep', value: 'Woman Representative' },
    { name: 'MCA', value: 'Member of County Assembly' },
];

export const CAMPAIGN_WRAP_STYLES = [
    { name: 'Full Body Wrap', value: 'full' },
    { name: 'Door & Hood Decals', value: 'minimal' },
    { name: 'Rally / Convoy Style', value: 'rally' },
    { name: 'High-Vis Sound Truck', value: 'soundtruck' },
];

export const CAMPAIGN_MODS = [
    { id: 'roof_speaker', name: 'Speaker Roof Rack', prompt: 'mount a large public address (PA) speaker system on a heavy-duty roof rack' },
    { id: 'pa_lights', name: 'PA & Strobe Lights', prompt: 'install amber and blue strobe lights for visibility and campaign underglow lighting' },
];

// ==========================================
// 1. APPAREL SECTOR (MENSWEAR)
// ==========================================

export const CATEGORIZED_SUIT_STYLES: StyleCategory[] = [
  {
    category: 'Ultra-Formal & Gala',
    styles: [
        { id: 'tux-velvet-midnight', name: 'Midnight Velvet Tuxedo', prompt: 'a luxurious midnight blue velvet tuxedo jacket with black satin peak lapels, crisp white dress shirt, and a black silk bowtie', tags: ['formal', 'gala', 'luxury'], isColorCustomizable: true, colorPalette: ['#191970', '#36013f', '#000000', '#003300'] },
        { id: 'tux-classic-black', name: 'Classic Black Tuxedo', prompt: 'a timeless black tuxedo with satin peak lapels, white pleated shirt, and black bow tie', tags: ['formal', 'classic'] },
        { id: 'tux-white-james', name: 'Ivory Dinner Jacket', prompt: 'a classic ivory white dinner jacket with a red carnation lapel pin, black tuxedo trousers, and a diamond-point bow tie', tags: ['formal', 'classic', 'wedding'] },
        { id: 'tailcoat-white-tie', name: 'White Tie Tailcoat', prompt: 'a traditional black tailcoat with a white piqué waistcoat, stiff winged collar shirt, and white bow tie', tags: ['formal', 'royal', 'classic'] },
        { id: 'morning-suit', name: 'Royal Morning Suit', prompt: 'a formal morning suit with a black cutaway coat, striped grey trousers, and a dove grey waistcoat', tags: ['formal', 'wedding', 'daytime'] },
        { id: 'sequin-blazer', name: 'Sequin Statement Blazer', prompt: 'a dazzling black sequin blazer that catches the light, paired with sleek satin trousers', tags: ['formal', 'party', 'bold'] },
        { id: 'smoking-jacket', name: 'Burgundy Smoking Jacket', prompt: 'a vintage burgundy velvet smoking jacket with quilted silk lapels and toggle frog closures', tags: ['formal', 'vintage', 'lounge'] },
    ]
  },
  {
    category: 'Modern Business',
    styles: [
        { id: 'suit-charcoal-pinstripe', name: 'Charcoal Pinstripe', prompt: 'a sharp three-piece charcoal grey pinstripe suit with wide peak lapels', tags: ['business', 'power'] },
        { id: 'suit-navy-solid', name: 'Navy Blue Power Suit', prompt: 'a perfectly tailored solid navy blue suit with a crisp white shirt and red power tie', tags: ['business', 'classic'] },
        { id: 'suit-grey-flannel', name: 'Light Grey Flannel', prompt: 'a textured light grey flannel suit, modern slim fit, worn with a knit tie', tags: ['business', 'winter'] },
        { id: 'suit-double-breasted', name: 'Double Breasted Navy', prompt: 'a classic six-button navy double-breasted suit with gold buttons', tags: ['business', 'formal'] },
        { id: 'suit-check-brown', name: 'Brown Glen Check', prompt: 'a vintage-inspired brown glen check wool suit with a waistcoat', tags: ['business', 'vintage'] },
        { id: 'suit-windowpane', name: 'Blue Windowpane', prompt: 'a bold blue suit with a subtle white windowpane check pattern', tags: ['business', 'modern'] },
        { id: 'blazer-turtleneck', name: 'Architect\'s Uniform', prompt: 'a textured grey tweed blazer worn over a black merino wool turtleneck', tags: ['business', 'creative'] },
    ]
  },
  {
    category: 'Casual & Summer',
    styles: [
        { id: 'linen-beige', name: 'Beige Linen Suit', prompt: 'a relaxed beige linen suit, wrinkled to perfection, white open-collar shirt, no socks', tags: ['casual', 'summer'] },
        { id: 'linen-sage', name: 'Sage Green Cotton', prompt: 'a casual sage green cotton suit, unstructured jacket, white t-shirt underneath', tags: ['casual', 'summer', 'trendy'] },
        { id: 'seersucker', name: 'Blue Seersucker', prompt: 'a classic blue and white striped seersucker suit, bow tie, white bucks shoes', tags: ['casual', 'summer', 'preppy'] },
        { id: 'guayabera', name: 'Guayabera & Slacks', prompt: 'a white linen Guayabera shirt with vertical pleats worn with tan dress trousers', tags: ['casual', 'summer', 'cultural'] },
    ]
  },
  {
    category: 'Shorts & Resort',
    styles: [
        { id: 'short-suit-linen', name: 'Linen Short Suit', prompt: 'a matching pastel blue linen blazer and tailored shorts, white polo shirt, loafers', tags: ['casual', 'summer', 'shorts'] },
        { id: 'shorts-chino-polo', name: 'Polo & Chino Shorts', prompt: 'a fitted navy polo shirt tucked into beige chino shorts with a braided leather belt', tags: ['casual', 'summer', 'shorts'] },
        { id: 'shorts-safari', name: 'Safari Set', prompt: 'a khaki safari shirt with pockets and matching belted shorts, rugged explorer look', tags: ['casual', 'adventure'] },
        { id: 'shorts-swim-cabana', name: 'Cabana Set', prompt: 'a matching patterned Hawaiian shirt and swim shorts, unbuttoned, poolside style', tags: ['casual', 'beach', 'shorts'] },
        { id: 'shorts-street', name: 'Streetwear Cargo', prompt: 'oversized black cargo shorts, oversized graphic tee, high socks, bucket hat', tags: ['casual', 'street', 'shorts'] },
    ]
  },
  {
    category: 'Global Heritage',
    styles: [
        { id: 'sherwani-royal', name: 'Royal Gold Sherwani', prompt: 'an opulent gold brocade Sherwani with intricate zardozi embroidery', tags: ['cultural', 'wedding'] },
        { id: 'agbada-grand', name: 'Grand Boubou Agbada', prompt: 'a voluminous, starched emerald green Agbada with massive embroidery', tags: ['cultural', 'ceremony'] },
        { id: 'thobe-bisht', name: 'Thobe & Bisht', prompt: 'a crisp white tailored Thobe worn under a sheer black Bisht with gold edging', tags: ['cultural', 'formal'] },
        { id: 'kimono-montsuki', name: 'Silk Montsuki Haori', prompt: 'a formal black silk Montsuki Haori with family crests and striped Hakama', tags: ['cultural', 'japan'] },
        { id: 'barong', name: 'Barong Tagalog', prompt: 'a translucent pineapple fiber Barong Tagalog with exquisite hand-embroidery', tags: ['cultural', 'formal'] },
        { id: 'kilt-prince', name: 'Prince Charlie Kilt', prompt: 'full Highland dress with a Prince Charlie jacket, tartan kilt, and sporran', tags: ['cultural', 'formal'] },
        { id: 'dashiki-suit', name: 'Modern Dashiki Suit', prompt: 'a fitted suit cut from vibrant African wax print fabric', tags: ['cultural', 'modern'] },
        { id: 'nehru-jacket', name: 'Nehru Jacket', prompt: 'a sleek black Nehru collar jacket worn over a white kurta', tags: ['cultural', 'formal'] },
    ]
  },
  {
    category: 'Avant-Garde & Street',
    styles: [
        { id: 'techwear-full', name: 'Cyber Techwear', prompt: 'futuristic black techwear, hardshell jacket, many straps, cargo pants', tags: ['street', 'futuristic'] },
        { id: 'hypebeast', name: 'Luxury Hypebeast', prompt: 'oversized designer hoodie, distressed denim, chunky sneakers, gold chain', tags: ['street', 'trendy'] },
        { id: 'matrix-coat', name: 'Neo Leather Coat', prompt: 'a floor-length black leather trench coat, dark sunglasses, combat boots', tags: ['edgy', 'movie'] },
        { id: 'rockstar-leather', name: 'Rockstar Leather', prompt: 'slim leather pants, animal print silk shirt, leather biker jacket', tags: ['edgy', 'music'] },
    ]
  }
];

// ==========================================
// 1b. APPAREL SECTOR (WOMENSWEAR)
// ==========================================

export const CATEGORIZED_WOMENS_STYLES: StyleCategory[] = [
    {
        category: 'Haute Couture & Red Carpet',
        styles: [
            { id: 'gown-mermaid-red', name: 'Scarlet Mermaid Gown', prompt: 'a dramatic red satin mermaid gown with a long train, off-shoulder neckline', tags: ['formal', 'gala'] },
            { id: 'gown-ballgown-tulle', name: 'Ethereal Tulle Ballgown', prompt: 'a massive, frothy tulle ballgown in pastel pink with crystal embellishments', tags: ['formal', 'dreamy'] },
            { id: 'gown-gold-sequin', name: 'Liquid Gold Gown', prompt: 'a floor-length gown made of liquid gold sequins, draping elegantly', tags: ['formal', 'luxury'] },
            { id: 'gown-black-velvet', name: 'Black Velvet Column', prompt: 'a sleek, strapless black velvet column dress with a high slit', tags: ['formal', 'classic'] },
            { id: 'suit-tuxedo-fem', name: 'Le Smoking Tuxedo', prompt: 'an Yves Saint Laurent style tailored black tuxedo for women, silk lapels, sheer blouse', tags: ['formal', 'androgynous'] },
        ]
    },
    {
        category: 'Shorts & Summer Chic',
        styles: [
            { id: 'shorts-paperbag', name: 'Paperbag Waist Shorts', prompt: 'high-waisted beige paperbag shorts with a tie belt, tucked in silk camisole', tags: ['casual', 'summer'] },
            { id: 'shorts-denim-chic', name: 'Denim Cutoffs & Blazer', prompt: 'denim cutoff shorts worn with an oversized white blazer and heels', tags: ['casual', 'chic'] },
            { id: 'romper-floral', name: 'Floral Romper', prompt: 'a cute, playful floral print romper with flutter sleeves', tags: ['casual', 'summer'] },
            { id: 'tennis-skirt', name: 'Tennis Set', prompt: 'a white pleated tennis skirt and matching polo top, old money aesthetic', tags: ['sport', 'preppy'] },
        ]
    },
    {
        category: 'Business & Power',
        styles: [
            { id: 'suit-white-power', name: 'White Power Suit', prompt: 'an impeccably tailored white pantsuit, deep v-neck blazer, wide leg trousers', tags: ['business', 'bold'] },
            { id: 'tweed-set', name: 'Parisian Tweed Set', prompt: 'a pink and black bouclé tweed jacket and skirt set, pearls', tags: ['business', 'classic'] },
            { id: 'blazer-oversized', name: 'Oversized Blazer Look', prompt: 'an oversized beige blazer over a slip dress, scandi cool', tags: ['modern', 'chic'] },
            { id: 'sheath-dress', name: 'Navy Sheath Dress', prompt: 'a fitted navy blue sheath dress, simple and professional', tags: ['business', 'classic'] },
        ]
    },
    {
        category: 'Cultural & Traditional',
        styles: [
            { id: 'saree-silk', name: 'Kanjivaram Saree', prompt: 'a rich silk Kanjivaram saree in peacock blue with gold zari borders', tags: ['cultural', 'formal'] },
            { id: 'lehenga-red', name: 'Bridal Lehenga', prompt: 'a heavily embroidered crimson velvet lehenga choli', tags: ['cultural', 'wedding'] },
            { id: 'kaftan-luxe', name: 'Embroidered Kaftan', prompt: 'a flowing Moroccan Takchita kaftan with gold belt', tags: ['cultural', 'modest'] },
            { id: 'cheongsam', name: 'Floral Cheongsam', prompt: 'a fitted high-collar silk Qipao with floral motifs', tags: ['cultural', 'formal'] },
            { id: 'hanbok', name: 'Pastel Hanbok', prompt: 'a traditional Korean Hanbok in soft pastel colors', tags: ['cultural', 'formal'] },
            { id: 'dirndl', name: 'Silk Dirndl', prompt: 'a high-quality silk Dirndl with lace apron', tags: ['cultural', 'festival'] },
        ]
    },
    {
        category: 'Boho & Festival',
        styles: [
            { id: 'boho-maxi', name: 'Boho Maxi Dress', prompt: 'a flowing floral print chiffon maxi dress, wide brim hat', tags: ['boho', 'summer'] },
            { id: 'crochet-dress', name: 'Crochet Festival Dress', prompt: 'a cream crochet mini dress, fringe boots, layered jewelry', tags: ['boho', 'festival'] },
            { id: 'leather-moto', name: 'Leather & Lace', prompt: 'black leather moto jacket over a delicate white lace dress', tags: ['edgy', 'modern'] },
        ]
    }
];

// ==========================================
// 1c. APPAREL SECTOR (KIDS)
// ==========================================

export const CATEGORIZED_KIDS_STYLES: StyleCategory[] = [
    {
        category: 'Formal & Special Occasion',
        styles: [
            { id: 'kid-suit-navy', name: 'Mini Navy Suit', prompt: 'a cute, perfectly fitted navy blue suit for a child, white shirt, red bow tie', tags: ['formal'] },
            { id: 'kid-tuxedo', name: 'Tiny Tuxedo', prompt: 'a miniature black tuxedo, white pleated shirt, black bow tie', tags: ['formal', 'wedding'] },
            { id: 'kid-flower-girl', name: 'Flower Girl Dress', prompt: 'a puffy white tulle flower girl dress with a satin sash and rose petals', tags: ['formal', 'wedding'] },
            { id: 'kid-party-dress', name: 'Sparkly Party Dress', prompt: 'a gold sequin party dress with a fluffy skirt', tags: ['party'] },
            { id: 'kid-blazer-jeans', name: 'Blazer & Jeans', prompt: 'a smart navy blazer worn with dark denim jeans and clean white sneakers', tags: ['smart-casual'] },
        ]
    },
    {
        category: 'Casual & Play',
        styles: [
            { id: 'kid-overalls', name: 'Denim Overalls', prompt: 'classic blue denim overalls over a striped t-shirt', tags: ['casual', 'play'] },
            { id: 'kid-summer-set', name: 'Summer Linen Set', prompt: 'a matching beige linen shirt and shorts set, sandals', tags: ['summer', 'casual'] },
            { id: 'kid-streetwear', name: 'Mini Hypebeast', prompt: 'an oversized hoodie, joggers, and high-top sneakers', tags: ['street', 'modern'] },
            { id: 'kid-pajamas', name: 'Animal Onesie', prompt: 'a cute plush dinosaur onesie pajama', tags: ['fun', 'cozy'] },
        ]
    },
    {
        category: 'Costumes & Fantasy',
        styles: [
            { id: 'kid-superhero', name: 'Superhero Cape', prompt: 'a superhero costume with a cape, mask, and chest emblem', tags: ['costume', 'fun'] },
            { id: 'kid-princess', name: 'Fairy Princess', prompt: 'a magical fairy princess dress with sparkling wings and a wand', tags: ['costume', 'dreamy'] },
            { id: 'kid-astronaut', name: 'Astronaut Suit', prompt: 'a detailed white NASA astronaut space suit', tags: ['costume', 'sci-fi'] },
            { id: 'kid-explorer', name: 'Jungle Explorer', prompt: 'a khaki jungle explorer outfit with a pith helmet and binoculars', tags: ['costume', 'adventure'] },
        ]
    }
];

// ==========================================
// 2. VEHICLE SECTOR
// ==========================================

export const CATEGORIZED_VEHICLE_STYLES: StyleCategory[] = [
  {
    category: 'Commercial & Branding',
    styles: [
      { id: 'brand-delivery', name: 'Fast Delivery', prompt: 'bright yellow delivery vehicle branding with red speed chevrons and logos, professional commercial wrap', tags: ['commercial'] },
      { id: 'brand-taxi', name: 'NYC Taxi', prompt: 'classic yellow New York City taxi livery with checkers and roof light', tags: ['commercial'] },
      { id: 'brand-pizza', name: 'Pizza Delivery', prompt: 'Italian pizza delivery car with red, white, and green branding and pizza graphics', tags: ['commercial'] },
      { id: 'brand-flower', name: 'Florist Van', prompt: 'pastel colored floral shop branding with painted flowers on the side, elegant commercial wrap', tags: ['commercial'] },
      { id: 'brand-security', name: 'Private Security', prompt: 'intimidating black private security branding with gold shield logos and reflective stripes', tags: ['commercial'] },
      { id: 'brand-tech', name: 'Tech Startup', prompt: 'minimalist white vehicle wrap with blue tech geometric patterns and QR codes', tags: ['commercial'] },
      { id: 'brand-plumber', name: 'Service Utility', prompt: 'white utility vehicle with blue wave graphics and tool iconography', tags: ['commercial'] },
    ]
  },
  {
    category: 'Paint Finishes',
    styles: [
      { id: 'paint-hand-drawn', name: 'Hand Drawn Sketch', prompt: 'a unique hand-drawn car wrap style that looks like a pencil sketch or marker drawing of the car, with rough artistic lines on a white background', tags: ['artistic', 'unique'] },
      { id: 'paint-british-green', name: 'British Racing Green', prompt: 'classic deep non-metallic British Racing Green paint, heritage style', tags: ['classic', 'luxury'] },
      { id: 'paint-matte-black', name: 'Stealth Matte Black', prompt: 'stealth fighter matte black paint finish', tags: ['modern'] },
      { id: 'paint-candy-red', name: 'Candy Apple Red', prompt: 'deep, multi-layered candy apple red metallic paint', tags: ['classic'] },
      { id: 'paint-midnight-purple', name: 'Midnight Purple III', prompt: 'legendary Midnight Purple color shifting paint', tags: ['jdm'] },
      { id: 'paint-miami-blue', name: 'Miami Blue', prompt: 'bright, vibrant Miami Blue Porsche paint code', tags: ['modern'] },
      { id: 'paint-chrome-gold', name: 'Dubai Gold Chrome', prompt: 'highly reflective mirror-finish gold chrome wrap', tags: ['luxury'] },
      { id: 'paint-chrome-silver', name: 'Silver Chrome', prompt: 'highly reflective mirror-finish silver chrome wrap', tags: ['luxury'] },
      { id: 'paint-satin-grey', name: 'Satin Nardo Grey', prompt: 'satin finish Nardo Grey paint, understated aggression', tags: ['modern'] },
      { id: 'paint-pearl-white', name: 'Pearlescent White', prompt: 'white paint with a heavy pearl flake that shines rainbow in the light', tags: ['luxury'] },
      { id: 'paint-mystichrome', name: 'Mystichrome', prompt: 'color-shifting mystichrome paint (blue/green/purple)', tags: ['muscle'] },
    ]
  },
  {
    category: 'Pop Culture & Movie Wraps',
    styles: [
        // Disney / Pixar
        { id: 'wrap-frozen', name: 'Frozen (Ice Queen)', prompt: 'a Disney Frozen themed car wrap, icy blue gradient, snowflakes, Elsa and Anna artwork on the sides', tags: ['cartoon', 'disney'] },
        { id: 'wrap-mcqueen', name: 'Lightning McQueen', prompt: 'full Lightning McQueen livery, red paint, Rust-eze logo on hood, lightning bolt side decal', tags: ['cartoon', 'disney'] },
        { id: 'wrap-toy-story', name: 'Toy Story Clouds', prompt: 'Andy\'s room cloud wallpaper pattern wrap, with Woody and Buzz Lightyear decals', tags: ['cartoon', 'disney'] },
        { id: 'wrap-lion-king', name: 'The Lion King', prompt: 'sunset savannah silhouette wrap with Simba, Timon, and Pumbaa', tags: ['cartoon', 'disney'] },
        { id: 'wrap-mickey', name: 'Mickey Mouse Club', prompt: 'red, black, and yellow Mickey Mouse themed wrap with polka dots and ear silhouette', tags: ['cartoon', 'disney'] },
        { id: 'wrap-mermaid', name: 'Little Mermaid', prompt: 'underwater teal and purple wrap with scales pattern and Ariel artwork', tags: ['cartoon', 'disney'] },
        
        // Marvel / Superhero
        { id: 'wrap-spiderman', name: 'Spiderman Suit', prompt: 'classic Spiderman red and blue suit texture wrap with black web pattern overlay', tags: ['cartoon', 'marvel'] },
        { id: 'wrap-ironman', name: 'Iron Man Armor', prompt: 'Hot Rod Red and Gold plating wrap, designed to look like Iron Man Mark 85 armor with arc reactor glow', tags: ['cartoon', 'marvel'] },
        { id: 'wrap-hulk', name: 'Incredible Hulk', prompt: 'purple and neon green smashed texture wrap, aggressive and bold', tags: ['cartoon', 'marvel'] },
        { id: 'wrap-black-panther', name: 'Black Panther', prompt: 'matte black vibranium weave pattern with subtle purple kinetic energy glow lines', tags: ['cartoon', 'marvel'] },
        { id: 'wrap-batman', name: 'The Dark Knight', prompt: 'matte stealth black Batmobile style wrap with carbon fiber accents and bat symbol', tags: ['cartoon', 'dc'] },
        { id: 'wrap-joker', name: 'The Joker', prompt: 'chaotic purple and green graffiti wrap with "HA HA HA" text pattern', tags: ['cartoon', 'dc'] },
        
        // Cartoon Network / Nick / Anime
        { id: 'wrap-spongebob', name: 'SpongeBob', prompt: 'yellow sponge texture wrap with pores and SpongeBob\'s face on the hood', tags: ['cartoon', 'nickelodeon'] },
        { id: 'wrap-tmnt', name: 'TMNT Van', prompt: 'Turtle Van party wagon style, green and yellow with shell texture and turtle heroes', tags: ['cartoon', 'nickelodeon'] },
        { id: 'wrap-ben10', name: 'Ben 10', prompt: 'green and black Ben 10 alien force aesthetic, Omnitrix logo on hood, circuit patterns', tags: ['cartoon', 'cn'] },
        { id: 'wrap-powerpuff', name: 'Powerpuff Girls', prompt: 'colorful pink, blue, and green wrap with bubbles and hearts pattern', tags: ['cartoon', 'cn'] },
        { id: 'wrap-mystery-machine', name: 'Mystery Machine', prompt: 'iconic Mystery Machine flower power psychedelic blue, green and orange livery', tags: ['cartoon', 'classic'] },
        { id: 'wrap-pokemon', name: 'Pikachu Electric', prompt: 'bright yellow Pikachu wrap with red cheeks on fenders and lightning bolt tail graphics', tags: ['cartoon', 'anime'] },
        { id: 'wrap-dbz', name: 'Goku Gi', prompt: 'orange and blue martial arts Gi style wrap with Goku symbol', tags: ['cartoon', 'anime'] },
        { id: 'wrap-naruto', name: 'Akatsuki Clouds', prompt: 'black wrap with red Akatsuki cloud pattern dispersed across the body', tags: ['cartoon', 'anime'] },
        
        // Other Movies
        { id: 'wrap-jurassic', name: 'Jurassic Park', prompt: 'classic Jurassic Park tour vehicle livery, red stripes on yellow to green gradient, door logo', tags: ['movie'] },
        { id: 'wrap-ghostbusters', name: 'Ecto-1', prompt: 'white Ecto-1 styling with red fins, caution stripes and Ghostbusters logo on doors', tags: ['movie'] },
        { id: 'wrap-delorean', name: 'Time Machine', prompt: 'stainless steel finish with exposed wires, flux capacitor glowing details, time travel aesthetic', tags: ['movie'] },
        { id: 'wrap-tron', name: 'Tron Legacy', prompt: 'matte black grid with glowing neon blue light strips following body lines', tags: ['movie'] },
        { id: 'wrap-barbie', name: 'Barbie Dream', prompt: 'hot pink glitter wrap with Barbie logo cursive side graphics', tags: ['movie'] },
        { id: 'wrap-speed-racer', name: 'Mach 5', prompt: 'gloss white Mach 5 livery with big red M on hood and number 5 on doors', tags: ['movie'] },
        { id: 'wrap-herbie', name: 'Herbie #53', prompt: 'cream white paint with red/white/blue racing stripes and number 53 in circle', tags: ['movie'] },
        { id: 'wrap-transformers', name: 'Bumblebee', prompt: 'yellow with black racing stripes, Autobot insignia on fenders', tags: ['movie'] },
        { id: 'wrap-fast', name: 'Brian\'s Supra', prompt: 'iconic orange Supra livery with "Nuclear Gladiator" side graphics', tags: ['movie'] },
    ]
  },
  {
    category: 'Wraps & Liveries',
    styles: [
      { id: 'wrap-marble', name: 'Carrara Marble', prompt: 'luxury white Carrara marble texture vinyl wrap with gold veins', tags: ['luxury', 'texture'] },
      { id: 'wrap-galaxy', name: 'Galaxy Print', prompt: 'a deep space galaxy print wrap with stars, nebulae and cosmic dust', tags: ['artistic'] },
      { id: 'wrap-rusty', name: 'Post-Apoc Rust', prompt: 'deliberate rusty patina, weathered texture, Mad Max wasteland style', tags: ['grunge'] },
      { id: 'wrap-camo-arctic', name: 'Arctic Camo', prompt: 'white, grey and black geometric arctic camouflage wrap', tags: ['wrap'] },
      { id: 'wrap-camo-digital', name: 'Digital Woodland Camo', prompt: 'pixelated green and brown military digital camo wrap', tags: ['wrap'] },
      { id: 'wrap-itasha', name: 'Anime Itasha', prompt: 'a colorful Itasha wrap featuring anime characters and bold graphics', tags: ['jdm', 'anime'] },
      { id: 'wrap-racing-gulf', name: 'Gulf Racing Livery', prompt: 'iconic light blue and orange Gulf Racing livery stripes', tags: ['racing'] },
      { id: 'wrap-racing-martini', name: 'Martini Racing', prompt: 'classic white car with Martini racing stripes (blue and red)', tags: ['racing'] },
      { id: 'wrap-police', name: 'Police Interceptor', prompt: 'black and white police interceptor livery with decals and light bar', tags: ['emergency'] },
      { id: 'wrap-stickerbomb', name: 'JDM Stickerbomb', prompt: 'chaotic collage of hundreds of colorful JDM stickers covering the panels', tags: ['street'] },
      { id: 'wrap-geometric', name: 'Geometric Shards', prompt: 'sharp geometric shard pattern in neon colors over black', tags: ['modern'] },
      { id: 'wrap-woodie', name: 'Woodie Panels', prompt: 'classic vintage wood grain side paneling', tags: ['classic'] },
    ]
  },
  {
    category: 'Body Modifications',
    styles: [
      { id: 'mod-side-skirts', name: 'Aero Side Skirts', prompt: 'install aggressive aerodynamic side skirts and a front splitter', tags: ['tuner', 'mod'] },
      { id: 'mod-fenders-wide', name: 'Bolt-on Fender Flares', prompt: 'wide bolt-on fender flares at all four corners, aggressive fitment', tags: ['tuner', 'mod'] },
      { id: 'mod-offroad-kit', name: 'Offroad Conversion', prompt: 'lifted suspension, chunky offroad mud terrain tires, bull bar, roof basket', tags: ['offroad', 'mod'] },
      { id: 'mod-mad-max', name: 'Wasteland War Rig', prompt: 'spikes, armor plating, chains, exhaust stacks, apocalyptic Mad Max modification', tags: ['scifi', 'movie'] },
      { id: 'mod-liberty-walk', name: 'Widebody Stance', prompt: 'Liberty Walk style widebody kit, exposed rivets, massive fenders', tags: ['tuner'] },
      { id: 'mod-rally', name: 'Dakar Rally Spec', prompt: 'lifted suspension, all-terrain tires, mud flaps, roof rack, light pods', tags: ['offroad'] },
      { id: 'mod-cyberpunk', name: 'Cyberpunk 2077', prompt: 'futuristic cyberpunk mods, glowing wheels, sensor pods, exposed wiring', tags: ['scifi'] },
      { id: 'mod-time-attack', name: 'Time Attack Aero', prompt: 'massive carbon front splitter, canards, gigantic rear GT wing', tags: ['racing'] },
      { id: 'mod-convertible', name: 'Convertible Conversion', prompt: 'roof removed, convertible top down styling', tags: ['custom'] },
      { id: 'mod-bosozoku', name: 'Bosozoku Style', prompt: 'exaggerated Japanese Bosozoku style, massive exhaust pipes reaching skyward, extended shark nose', tags: ['jdm'] },
    ]
  }
];

// ==========================================
// 3. INTERIOR SECTOR (EXPANDED)
// ==========================================

export const CATEGORIZED_INTERIOR_STYLES: StyleCategory[] = [
  {
    category: 'Living Room Aesthetics',
    styles: [
      { id: 'int-liv-modern', name: 'Modern Minimalist', prompt: 'a modern minimalist living room with clean lines, neutral palette, and low-profile furniture', tags: ['modern', 'minimal'] },
      { id: 'int-liv-scandi', name: 'Scandinavian Hygge', prompt: 'a cozy Scandinavian living room, white walls, light wood floors, sheepskin rugs, warm lighting', tags: ['cozy', 'scandi'] },
      { id: 'int-liv-industrial', name: 'Industrial Loft', prompt: 'an industrial NYC loft living room, exposed brick walls, ductwork, leather sofa, concrete floors', tags: ['urban', 'industrial'] },
      { id: 'int-liv-boho', name: 'Bohemian Chic', prompt: 'a boho chic living room, rattan furniture, macrame wall art, Persian rugs, overflowing plants', tags: ['boho', 'eclectic'] },
      { id: 'int-liv-midcen', name: 'Mid-Century Modern', prompt: 'a mid-century modern living room, teak sideboard, Eames lounge chair, sunburst clock, olive green accents', tags: ['retro', 'mid-century'] },
      { id: 'int-liv-artdeco', name: 'Art Deco Glamour', prompt: 'an Art Deco living room, geometric wallpaper, gold accents, velvet furniture, marble floors', tags: ['luxury', 'vintage'] },
      { id: 'int-liv-maximalist', name: 'Eclectic Maximalist', prompt: 'a colorful maximalist living room, gallery wall, mixed patterns, bold colors, velvet sofa', tags: ['bold', 'eclectic'] },
      { id: 'int-liv-coastal', name: 'Coastal Hamptons', prompt: 'a breezy Hamptons style living room, white wainscoting, blue accents, linen furniture, sisal rug', tags: ['coastal', 'classic'] },
      { id: 'int-liv-cabin', name: 'Rustic Log Cabin', prompt: 'a rustic log cabin living room, stone fireplace, exposed wooden beams, plaid accents, leather armchair', tags: ['rustic', 'cozy'] },
      { id: 'int-liv-french', name: 'French Country', prompt: 'a French Country living room, distressed wood furniture, toile fabric, crystal chandelier, soft pastels', tags: ['classic', 'romantic'] },
      { id: 'int-liv-hollywood', name: 'Hollywood Regency', prompt: 'a Hollywood Regency living room, mirrored furniture, lacquer finishes, black and white stripes, glam', tags: ['glam', 'retro'] },
      { id: 'int-liv-japandi', name: 'Japandi Zen', prompt: 'a Japandi living room blending Japanese rustic minimalism with Scandi functionality, wood slats, beige tones', tags: ['minimal', 'zen'] },
      { id: 'int-liv-jungle', name: 'Urban Jungle', prompt: 'a living room filled with indoor plants, hanging vines, botanical prints, green velvet sofa', tags: ['nature', 'biophilic'] },
      { id: 'int-liv-monochrome', name: 'Monochrome Black', prompt: 'a dramatic all-black monochrome living room, matte black walls, black velvet sofa, charcoal accents', tags: ['modern', 'moody'] },
      { id: 'int-liv-white', name: 'All-White Pristine', prompt: 'an all-white living room, white floors, white furniture, sheer curtains, airy and ethereal', tags: ['modern', 'clean'] },
      { id: 'int-liv-earth', name: 'Organic Earth Tone', prompt: 'an organic modern living room, terracotta walls, curved furniture, natural stone, beige and brown tones', tags: ['modern', 'organic'] },
      { id: 'int-liv-pastel', name: 'Pastel Pop', prompt: 'a playful living room with pastel pink, mint, and yellow furniture, memphis design elements', tags: ['fun', 'colorful'] },
      { id: 'int-liv-70s', name: 'Retro 70s Conversation Pit', prompt: 'a 1970s style sunken conversation pit, shag carpet, orange and brown color scheme, funk aesthetic', tags: ['retro', '70s'] },
      { id: 'int-liv-cyber', name: 'Cyberpunk Lounge', prompt: 'a futuristic cyberpunk living room, neon strip lighting, dark atmosphere, holographic displays', tags: ['scifi', 'futuristic'] },
      { id: 'int-liv-steampunk', name: 'Steampunk Study', prompt: 'a steampunk living room, brass gears, leather furniture, victorian industrial aesthetic, copper piping', tags: ['fantasy', 'industrial'] },
      { id: 'int-liv-gothic', name: 'Gothic Victorian', prompt: 'a dark Gothic Victorian living room, black lace, candelabras, crimson velvet, antique dark wood', tags: ['gothic', 'vintage'] },
      { id: 'int-liv-moroccan', name: 'Moroccan Riad', prompt: 'a Moroccan style living room, tiled floors, low seating, poufs, intricate lanterns, archways', tags: ['cultural', 'boho'] },
      { id: 'int-liv-southwest', name: 'Southwestern Desert', prompt: 'a Southwestern living room, adobe fireplace, navajo rugs, leather furniture, cactus plants', tags: ['rustic', 'regional'] },
      { id: 'int-liv-penthouse', name: 'Luxury Penthouse', prompt: 'a modern luxury penthouse living room, floor-to-ceiling windows, city skyline view, sleek Italian furniture', tags: ['luxury', 'modern'] },
      { id: 'int-liv-gallery', name: 'Art Collector Gallery', prompt: 'a living room designed as an art gallery, white walls, track lighting, large abstract paintings, sculptural furniture', tags: ['artsy', 'modern'] }
    ]
  },
  {
    category: 'Bedroom Sanctuaries',
    styles: [
      { id: 'int-bed-hotel', name: 'Luxury Hotel Suite', prompt: 'a 5-star hotel bedroom suite, crisp white linens, padded headboard, bedside sconces, neutral tones', tags: ['luxury', 'hotel'] },
      { id: 'int-bed-zen', name: 'Zen Master Bedroom', prompt: 'a minimalist Zen bedroom, low platform bed, tatami mats, shoji screens, soft lighting', tags: ['zen', 'minimal'] },
      { id: 'int-bed-parisian', name: 'Romantic Parisian', prompt: 'a Parisian apartment bedroom, wall moldings, parquet floors, vintage mirror, linen bedding', tags: ['romantic', 'classic'] },
      { id: 'int-bed-academia', name: 'Dark Academia', prompt: 'a Dark Academia bedroom, dark walls, bookshelves, vintage desk, plaid bedding, moody atmosphere', tags: ['moody', 'vintage'] },
      { id: 'int-bed-boho', name: 'Boho Sanctuary', prompt: 'a cozy boho bedroom, canopy bed with sheer drapes, string lights, patterned rugs, plants', tags: ['boho', 'cozy'] },
      { id: 'int-bed-safari', name: 'Kids Safari Room', prompt: 'a kids safari themed bedroom, jungle wallpaper, animal plushies, tent bed, green and beige tones', tags: ['kids', 'fun'] },
      { id: 'int-bed-space', name: 'Kids Space Station', prompt: 'a kids space themed bedroom, galaxy wallpaper, rocket ship bed, glow in the dark stars', tags: ['kids', 'scifi'] },
      { id: 'int-bed-gamer', name: 'Teen Gamer Setup', prompt: 'a teen bedroom with ultimate gaming setup, RGB lighting, multiple monitors, posters, black furniture', tags: ['teen', 'tech'] },
      { id: 'int-bed-princess', name: 'Princess Castle', prompt: 'a magical princess bedroom, pink castle bed, chandelier, fluffy rugs, pastel colors', tags: ['kids', 'fantasy'] },
      { id: 'int-bed-bunk', name: 'Modern Bunk Room', prompt: 'a modern built-in bunk bed room, shiplap walls, individual reading lights, nautical theme', tags: ['kids', 'modern'] },
      { id: 'int-bed-marble', name: 'Marble Master Suite', prompt: 'an opulent master bedroom with marble floors, gold accents, velvet furniture, fireplace', tags: ['luxury', 'glam'] },
      { id: 'int-bed-beach', name: 'Coastal Beach House', prompt: 'a light and airy beach house bedroom, white wood paneling, blue accents, ocean view window', tags: ['coastal', 'relaxing'] },
      { id: 'int-bed-concrete', name: 'Industrial Concrete', prompt: 'an industrial bedroom, concrete walls, exposed wiring, platform bed, minimalist decor', tags: ['industrial', 'modern'] },
      { id: 'int-bed-royal', name: 'Royal Palace', prompt: 'a royal palace bedroom, gold leaf detailing, four-poster bed with heavy drapes, antique furniture', tags: ['luxury', 'royal'] },
      { id: 'int-bed-velvet', name: 'Velvet Boudoir', prompt: 'a sultry boudoir bedroom, red velvet walls, tufted furniture, dim mood lighting', tags: ['romantic', 'glam'] },
      { id: 'int-bed-loft', name: 'City Loft Bedroom', prompt: 'an open concept city loft bedroom, large windows, brick walls, metal bed frame', tags: ['urban', 'industrial'] },
      { id: 'int-bed-attic', name: 'Cozy Attic Hideaway', prompt: 'a cozy attic bedroom with slanted ceilings, skylights, wood paneling, warm blankets', tags: ['cozy', 'rustic'] },
      { id: 'int-bed-glass', name: 'Glass Box Room', prompt: 'a modern bedroom with glass walls surrounded by nature, minimalist furniture', tags: ['modern', 'nature'] },
      { id: 'int-bed-underwater', name: 'Underwater View', prompt: 'a bedroom with a massive window looking into an aquarium or ocean, blue ambient light', tags: ['fantasy', 'unique'] },
      { id: 'int-bed-closet', name: 'Walk-in Closet Suite', prompt: 'a massive luxury walk-in closet converted into a dressing suite, island, shoe display, chandelier', tags: ['luxury', 'fashion'] }
    ]
  },
  {
    category: 'Kitchen & Dining',
    styles: [
      { id: 'int-kit-chef', name: 'Pro Chef Kitchen', prompt: 'a professional chef kitchen, stainless steel appliances, large island, hanging pot rack, subway tile', tags: ['modern', 'functional'] },
      { id: 'int-kit-farm', name: 'White Farmhouse', prompt: 'a white farmhouse kitchen, shaker cabinets, apron sink, butcher block counters, open shelving', tags: ['rustic', 'classic'] },
      { id: 'int-kit-black', name: 'Matte Black Modern', prompt: 'a sleek matte black kitchen, black cabinets, black marble counters, gold hardware, integrated lighting', tags: ['modern', 'moody'] },
      { id: 'int-kit-marble', name: 'Luxury Marble', prompt: 'a luxury kitchen with floor-to-ceiling calacatta marble, white cabinets, brass fixtures', tags: ['luxury', 'classic'] },
      { id: 'int-kit-diner', name: 'Retro 50s Diner', prompt: 'a retro 1950s style kitchen, checkered floor, red vinyl stools, pastel blue appliances, neon sign', tags: ['retro', 'fun'] },
      { id: 'int-kit-green', name: 'Eco-Green Kitchen', prompt: 'a kitchen with sage green cabinets, plenty of plants, natural wood accents, sustainable materials', tags: ['nature', 'modern'] },
      { id: 'int-kit-blue', name: 'Navy & Gold', prompt: 'a classic kitchen with navy blue cabinets, white marble counters, and brushed gold hardware', tags: ['classic', 'bold'] },
      { id: 'int-kit-smart', name: 'Future Smart Kitchen', prompt: 'a futuristic smart kitchen, touchscreens on fridge, minimalist white surfaces, hidden appliances', tags: ['tech', 'modern'] },
      { id: 'int-kit-coffee', name: 'Coffee Bar Aesthetic', prompt: 'a kitchen styled like a high-end coffee shop, espresso machine station, chalkboard menu, open shelves', tags: ['cafe', 'modern'] },
      { id: 'int-kit-wine', name: 'Wine Cellar Dining', prompt: 'a dining room inside a wine cellar, stone walls, wine racks, wooden table, candle lighting', tags: ['luxury', 'moody'] },
      { id: 'int-kit-pizza', name: 'Pizzeria Style', prompt: 'a rustic kitchen with a brick pizza oven, terra cotta tiles, hanging herbs, garlic braids', tags: ['rustic', 'warm'] },
      { id: 'int-kit-candy', name: 'Pastel Candy Shop', prompt: 'a playful kitchen with pastel colors, candy jar displays, whimsical decor, checkerboard floor', tags: ['fun', 'colorful'] },
      { id: 'int-kit-concrete', name: 'Concrete & Wood', prompt: 'a minimalist kitchen with concrete countertops, plywood cabinets, grey tones', tags: ['industrial', 'minimal'] },
      { id: 'int-kit-terrazzo', name: 'Terrazzo Pop', prompt: 'a trendy kitchen with colorful terrazzo countertops and backsplash, light wood cabinets', tags: ['modern', 'trendy'] },
      { id: 'int-kit-outdoor', name: 'Outdoor BBQ Kitchen', prompt: 'a luxury outdoor kitchen, stainless steel grill, stone counters, patio seating', tags: ['outdoor', 'luxury'] }
    ]
  },
  {
    category: 'Office & Workspace',
    styles: [
      { id: 'int-off-ceo', name: 'CEO Corner Office', prompt: 'a powerful corner office, panoramic city view, large mahogany desk, leather executive chair', tags: ['corporate', 'luxury'] },
      { id: 'int-off-creative', name: 'Creative Co-Working', prompt: 'a vibrant co-working space, colorful bean bags, whiteboard walls, exposed brick, industrial lighting', tags: ['modern', 'creative'] },
      { id: 'int-off-library', name: 'Home Library', prompt: 'a classic home library office, floor-to-ceiling bookshelves, rolling ladder, leather armchair, fireplace', tags: ['classic', 'cozy'] },
      { id: 'int-off-minimal', name: 'Minimalist Desk', prompt: 'a clean minimalist workspace, white desk, iMac, potted plant, no clutter, white walls', tags: ['minimal', 'clean'] },
      { id: 'int-off-studio', name: 'Artist Studio', prompt: 'a messy artist studio, easels, paint splatters, large windows for natural light, concrete floor', tags: ['creative', 'messy'] },
      { id: 'int-off-fashion', name: 'Fashion Atelier', prompt: 'a fashion design studio, dress forms, fabric rolls, sewing machines, mood boards, bright white light', tags: ['creative', 'fashion'] },
      { id: 'int-off-tech', name: 'Tech Startup Garage', prompt: 'a tech startup office in a garage, ping pong table, coding stations, neon logo, concrete floor', tags: ['tech', 'industrial'] },
      { id: 'int-off-law', name: 'Law Firm', prompt: 'a traditional law firm office, dark wood paneling, green bankers lamp, leather books, serious atmosphere', tags: ['classic', 'formal'] },
      { id: 'int-off-podcast', name: 'Podcast Studio', prompt: 'a soundproof podcast studio, acoustic foam on walls, microphones, boom arms, neon "On Air" sign', tags: ['tech', 'modern'] },
      { id: 'int-off-maker', name: 'Makerspace', prompt: 'a workshop makerspace, 3D printers, tool pegboards, workbenches, industrial vibe', tags: ['industrial', 'creative'] },
      { id: 'int-off-writer', name: 'Writer\'s Cabin', prompt: 'a secluded writer\'s cabin, wooden desk overlooking nature, typewriter, cozy lamp', tags: ['rustic', 'cozy'] },
      { id: 'int-off-trading', name: 'Trading Floor', prompt: 'a finance trading setup, six monitor display, ergonomic chair, stock ticker led, modern desk', tags: ['tech', 'finance'] }
    ]
  },
  {
    category: 'Bathroom & Spa',
    styles: [
      { id: 'int-bath-marble', name: 'White Marble Spa', prompt: 'a luxury spa bathroom, white carrara marble everywhere, soaking tub, fluffy towels', tags: ['luxury', 'spa'] },
      { id: 'int-bath-vintage', name: 'Vintage Clawfoot', prompt: 'a vintage bathroom, clawfoot tub, penny tile floor, pedestal sink, wainscoting', tags: ['vintage', 'classic'] },
      { id: 'int-bath-moody', name: 'Dark Moody Powder', prompt: 'a dramatic powder room, black floral wallpaper, brass mirror, dim lighting, black sink', tags: ['moody', 'glam'] },
      { id: 'int-bath-tropical', name: 'Tropical Outdoor Shower', prompt: 'an outdoor bathroom, stone shower, lush tropical plants, wooden slats, pebble floor', tags: ['nature', 'spa'] },
      { id: 'int-bath-onsen', name: 'Japanese Onsen', prompt: 'a Japanese style bath, hinoki wood tub, stone floor, bamboo accents, steam', tags: ['zen', 'cultural'] },
      { id: 'int-bath-pink', name: 'Retro Pink & Green', prompt: 'a retro 50s bathroom, pink tiles, mint green walls, chrome fixtures', tags: ['retro', 'colorful'] },
      { id: 'int-bath-industrial', name: 'Concrete Industrial', prompt: 'an industrial bathroom, concrete walls, exposed pipes, metal vanity, glass shower', tags: ['industrial', 'modern'] },
      { id: 'int-bath-infinity', name: 'Infinity View Tub', prompt: 'a bathroom with a freestanding tub next to a floor-to-ceiling window overlooking a view', tags: ['luxury', 'modern'] },
      { id: 'int-bath-bio', name: 'Biophilic Green Wall', prompt: 'a bathroom with a living green plant wall, wood accents, rainfall shower, skylight', tags: ['nature', 'modern'] },
      { id: 'int-bath-gold', name: 'Black & Gold', prompt: 'a glamorous bathroom, black marble walls, gold fixtures, crystal chandelier', tags: ['glam', 'luxury'] }
    ]
  },
  {
    category: 'Commercial & Retail',
    styles: [
      { id: 'int-com-coffee', name: 'Hipster Coffee Shop', prompt: 'a hipster coffee shop, exposed brick, Edison bulbs, reclaim wood tables, latte art', tags: ['commercial', 'cafe'] },
      { id: 'int-com-bar', name: 'Speakeasy Bar', prompt: 'a dark speakeasy bar, leather booths, velvet curtains, dim lighting, jazz atmosphere', tags: ['commercial', 'bar'] },
      { id: 'int-com-neon', name: 'Neon Nightclub', prompt: 'a nightclub with lasers, smoke machine, neon lights, dance floor, dj booth', tags: ['commercial', 'party'] },
      { id: 'int-com-hotel', name: 'Luxury Hotel Lobby', prompt: 'a grand hotel lobby, high ceilings, massive chandelier, marble reception, concierge desk', tags: ['commercial', 'luxury'] },
      { id: 'int-com-boutique', name: 'Fashion Boutique', prompt: 'a minimalist high-end clothing store, clothing racks, white walls, large mirrors', tags: ['commercial', 'retail'] },
      { id: 'int-com-bookstore', name: 'Cozy Bookstore', prompt: 'a cozy independent bookstore, towering shelves of books, reading nooks, rolling ladders', tags: ['commercial', 'cozy'] },
      { id: 'int-com-barber', name: 'Vintage Barbershop', prompt: 'a classic barbershop, checkered floors, leather barber chairs, striped pole', tags: ['commercial', 'retro'] },
      { id: 'int-com-salon', name: 'Beauty Salon', prompt: 'a chic beauty salon, pink chairs, large lighted mirrors, gold accents, glossy floor', tags: ['commercial', 'glam'] },
      { id: 'int-com-gym', name: 'Crossfit Gym', prompt: 'an industrial gym, rubber floors, weights, pull-up bars, large fans, garage doors', tags: ['commercial', 'industrial'] },
      { id: 'int-com-yoga', name: 'Yoga Studio', prompt: 'a peaceful yoga studio, bamboo floors, white walls, singing bowls, soft light', tags: ['commercial', 'zen'] },
      { id: 'int-com-diner', name: 'Fast Food Retro', prompt: 'a fast food restaurant, red and yellow booths, menu boards, plastic trays', tags: ['commercial', 'retro'] },
      { id: 'int-com-museum', name: 'Art Museum Hall', prompt: 'a modern art museum hall, white bench, abstract sculptures, hush atmosphere', tags: ['commercial', 'modern'] },
      { id: 'int-com-cinema', name: 'Cinema Lobby', prompt: 'a movie theater lobby, concession stand with popcorn, patterned carpet, movie posters', tags: ['commercial', 'fun'] },
      { id: 'int-com-airport', name: 'Airport Lounge', prompt: 'a luxury airport lounge, comfortable armchairs, buffet station, runway view', tags: ['commercial', 'modern'] },
      { id: 'int-com-casino', name: 'Casino Floor', prompt: 'a vibrant casino floor, slot machines, card tables, flashy carpet, bright lights', tags: ['commercial', 'party'] }
    ]
  },
  {
    category: 'Historical & Architectural',
    styles: [
      { id: 'arch-vic', name: 'Victorian Gothic', prompt: 'Victorian Gothic interior, dark wood paneling, stained glass windows, fireplace, ornate details', tags: ['historic', 'gothic'] },
      { id: 'arch-artnouveau', name: 'Art Nouveau', prompt: 'Art Nouveau interior, curved lines, floral motifs, stained glass, organic shapes', tags: ['historic', 'artistic'] },
      { id: 'arch-bauhaus', name: 'Bauhaus', prompt: 'Bauhaus interior, functional design, primary colors, geometric shapes, tubular steel furniture', tags: ['historic', 'modern'] },
      { id: 'arch-midcen', name: 'Mid-Century Atomic', prompt: 'Mid-Century Atomic Age interior, starburst patterns, boomerang tables, turquoise and orange', tags: ['historic', 'retro'] },
      { id: 'arch-brutalist', name: 'Brutalist', prompt: 'Brutalist interior, raw concrete walls, massive forms, monochromatic grey, geometric starkness', tags: ['historic', 'industrial'] },
      { id: 'arch-baroque', name: 'Baroque Opulence', prompt: 'Baroque interior, gold leaf, painted ceilings, elaborate moldings, silk tapestries', tags: ['historic', 'luxury'] },
      { id: 'arch-med', name: 'Mediterranean', prompt: 'Mediterranean interior, terracotta tiles, plaster walls, arched doorways, wrought iron', tags: ['historic', 'warm'] },
      { id: 'arch-tudor', name: 'English Tudor', prompt: 'Tudor style interior, dark exposed beams, leaded glass windows, stone fireplace', tags: ['historic', 'classic'] },
      { id: 'arch-frank', name: 'Frank Lloyd Wright', prompt: 'Prairie style interior, stained glass geometric windows, built-in wooden furniture, horizontal lines', tags: ['historic', 'classic'] },
      { id: 'arch-postmod', name: '80s Post-Modern', prompt: 'Post-Modern interior, Memphis group style, geometric shapes, squiggles, pastel colors', tags: ['historic', 'retro'] },
      { id: 'arch-greek', name: 'Ancient Greek', prompt: 'Ancient Greek temple interior, marble columns, statues, open to the sky, stone floor', tags: ['historic', 'ancient'] },
      { id: 'arch-egypt', name: 'Egyptian Revival', prompt: 'Egyptian Revival interior, hieroglyphics, gold and lapis lazuli, lotus columns', tags: ['historic', 'ancient'] },
      { id: 'arch-scifi', name: 'Futuristic Zaha', prompt: 'Futuristic parametric design, flowing white curves, Zaha Hadid style, organic forms', tags: ['modern', 'futuristic'] }
    ]
  },
  {
    category: 'Fantasy & Concept',
    styles: [
      { id: 'fan-spaceship', name: 'Sci-Fi Spaceship', prompt: 'interior of a sci-fi spaceship, control panels, metal corridors, view of stars', tags: ['fantasy', 'scifi'] },
      { id: 'fan-wizard', name: 'Wizard Tower', prompt: 'interior of a wizard tower, magical glowing orbs, scrolls, potions, stone walls', tags: ['fantasy', 'magic'] },
      { id: 'fan-hobbit', name: 'Hobbit Hole', prompt: 'cozy hobbit hole interior, round door, wood beams, earthy, fireplace', tags: ['fantasy', 'cozy'] },
      { id: 'fan-cyberpunk', name: 'Cyberpunk Apartment', prompt: 'cramped cyberpunk apartment, computer screens, neon outside window, clutter', tags: ['fantasy', 'scifi'] },
      { id: 'fan-candy', name: 'Candy Kingdom', prompt: 'a room made of candy, chocolate river, lollipop trees, gumdrop furniture', tags: ['fantasy', 'surreal'] },
      { id: 'fan-lego', name: 'Lego Room', prompt: 'a room built entirely out of Lego bricks, bright primary colors, blocky texture', tags: ['fantasy', 'fun'] },
      { id: 'fan-matrix', name: 'Matrix Code', prompt: 'a room dissolved into falling green Matrix code, digital rain atmosphere', tags: ['fantasy', 'scifi'] },
      { id: 'fan-vapor', name: 'Vaporwave Room', prompt: 'Vaporwave aesthetic room, pink and blue gradient, grid floor, greek bust, palm tree', tags: ['fantasy', 'artistic'] },
      { id: 'fan-postapoc', name: 'Post-Apoc Bunker', prompt: 'post-apocalyptic survival bunker, supplies, concrete walls, makeshift furniture', tags: ['fantasy', 'grunge'] },
      { id: 'fan-ice', name: 'Ice Palace', prompt: 'interior of an ice palace, carved ice furniture, cold blue lighting, snow floor', tags: ['fantasy', 'winter'] },
      { id: 'fan-zero', name: 'Zero Gravity', prompt: 'a zero gravity space station room, floating objects, padded walls, velcro', tags: ['fantasy', 'scifi'] },
      { id: 'fan-paper', name: 'Papercraft World', prompt: 'a world made entirely of folded paper, cardboard textures, origami furniture', tags: ['fantasy', 'artistic'] },
      { id: 'fan-sketch', name: 'Sketchbook World', prompt: 'a black and white pencil sketch world, rough lines, paper texture background', tags: ['fantasy', 'artistic'] }
    ]
  }
];

export const CATEGORIZED_LANDSCAPE_STYLES: StyleCategory[] = [
  {
    category: 'Garden Styles',
    styles: [
      { id: 'land-japanese', name: 'Kyoto Zen Garden', prompt: 'Japanese Zen garden, raked gravel, moss, maples', tags: ['zen'] },
      { id: 'land-english', name: 'English Cottage', prompt: 'English cottage garden, overflowing roses, winding stone path', tags: ['classic'] },
      { id: 'land-desert', name: 'Desert Xeriscape', prompt: 'modern desert garden, cactus, agave, white gravel, concrete', tags: ['arid'] },
      { id: 'land-tropical', name: 'Tropical Resort', prompt: 'lush tropical garden, palm trees, monstera, tiki torches', tags: ['lush'] },
      { id: 'land-french', name: 'French Formal', prompt: 'formal French garden, geometric hedges, symmetry, fountain', tags: ['formal'] },
    ]
  }
];

// ==========================================
// 5. BACKGROUNDS (50 OPTIONS)
// ==========================================

export const APPAREL_BACKGROUNDS: BackgroundOption[] = [
  { name: 'No Change', prompt: '' },
  // Studio
  { name: 'Studio: White Cyclorama', prompt: 'infinite white photography studio background' },
  { name: 'Studio: Dark Grey', prompt: 'dark grey minimalist studio background with spotlight' },
  { name: 'Studio: Black', prompt: 'pitch black void background, dramatic rim lighting' },
  { name: 'Studio: Beige Canvas', prompt: 'textured beige canvas photography backdrop' },
  { name: 'Studio: Abstract Neon', prompt: 'abstract background with glowing neon tubes' },
  // Luxury
  { name: 'Luxury: Hotel Lobby', prompt: 'opulent 5-star hotel lobby with marble floors and chandeliers' },
  { name: 'Luxury: Private Jet', prompt: 'interior of a luxury Gulfstream private jet, beige leather' },
  { name: 'Luxury: Penthouse View', prompt: 'modern penthouse balcony overlooking a city skyline at night' },
  { name: 'Luxury: Yacht Deck', prompt: 'deck of a superyacht, white leather seats, ocean in background' },
  { name: 'Luxury: Mansion Driveway', prompt: 'driveway of a massive luxury mansion, fountain in background' },
  { name: 'Luxury: Red Carpet', prompt: 'red carpet premiere event, velvet ropes, paparazzi flashes' },
  // Urban
  { name: 'Urban: NYC Street', prompt: 'busy New York City street, yellow taxis, steam vents' },
  { name: 'Urban: Tokyo Neon', prompt: 'rainy Tokyo street at night, reflected neon signs' },
  { name: 'Urban: Paris Cafe', prompt: 'outdoor Parisian cafe seating, cobblestone street' },
  { name: 'Urban: Graffiti Wall', prompt: 'gritty brick wall covered in colorful graffiti art' },
  { name: 'Urban: Rooftop Bar', prompt: 'chic rooftop bar at sunset, string lights, city view' },
  { name: 'Urban: Subway Station', prompt: 'clean, modern subway station with tiled walls' },
  { name: 'Urban: Industrial Loft', prompt: 'converted industrial loft space, large windows, brick' },
  // Nature
  { name: 'Nature: Tropical Beach', prompt: 'pristine white sand beach, turquoise water, palm trees' },
  { name: 'Nature: Deep Forest', prompt: 'mysterious misty forest, tall pine trees, ferns' },
  { name: 'Nature: Flower Field', prompt: 'endless field of blooming wildflowers, sunny day' },
  { name: 'Nature: Snowy Mountains', prompt: 'snow-covered mountain peak, clear blue sky' },
  { name: 'Nature: Desert Dunes', prompt: 'rolling sand dunes in the Sahara at sunset' },
  { name: 'Nature: Waterfall', prompt: 'base of a majestic waterfall, lush greenery' },
  { name: 'Nature: Autumn Park', prompt: 'park pathway covered in orange and red autumn leaves' },
  { name: 'Nature: Lavender Field', prompt: 'rows of purple lavender fields in Provence' },
  // Interiors
  { name: 'Interior: Minimal Home', prompt: 'bright, minimalist living room, white walls, plant' },
  { name: 'Interior: Library', prompt: 'classic library with floor-to-ceiling bookshelves, leather chair' },
  { name: 'Interior: Art Gallery', prompt: 'modern art gallery, white walls, abstract paintings' },
  { name: 'Interior: Nightclub', prompt: 'dark nightclub, lasers, haze, crowded background' },
  { name: 'Interior: Grand Ballroom', prompt: 'classic ballroom, high ceilings, gold molding' },
  // Sci-Fi & Fantasy
  { name: 'Sci-Fi: Cyber City', prompt: 'futuristic cyberpunk city, flying cars, holograms' },
  { name: 'Sci-Fi: Spaceship', prompt: 'clean white sci-fi spaceship corridor' },
  { name: 'Sci-Fi: Mars Surface', prompt: 'red rocky surface of Mars, planet Earth in sky' },
  { name: 'Fantasy: Enchanted Woods', prompt: 'magical forest with glowing mushrooms and fireflies' },
  { name: 'Fantasy: Cloud Kingdom', prompt: 'standing on fluffy clouds, castle in the sky' },
  // Artistic
  { name: 'Art: Oil Painting', prompt: 'inside an impressionist oil painting, brush strokes background' },
  { name: 'Art: Sketchbook', prompt: 'pencil sketch background, paper texture' },
  { name: 'Art: Vaporwave', prompt: 'vaporwave aesthetic, grid floor, pink sun, roman busts' },
  { name: 'Art: Pop Art', prompt: 'colorful pop art comic book style background' },
  { name: 'Art: Marble Texture', prompt: 'solid luxurious white and grey marble texture' },
  // Specific Locations
  { name: 'Travel: Santorini', prompt: 'white washed buildings and blue domes of Santorini' },
  { name: 'Travel: Kyoto Shrine', prompt: 'traditional Japanese wooden shrine gate, red torii' },
  { name: 'Travel: London Eye', prompt: 'London waterfront with the London Eye in background' },
  { name: 'Travel: Venice Canal', prompt: 'on a gondola in a Venice canal, old buildings' },
  { name: 'Travel: Times Square', prompt: 'bright lights of Times Square at night' },
  { name: 'Travel: Swiss Alps', prompt: 'green meadow in the Alps, wooden chalet' },
];

// Clone for other sectors for now, though Vehicle/Interior usually have their own.
// Keeping the specific lists for Vehicle/Interior from before but expanded slightly.
export const VEHICLE_BACKGROUNDS: BackgroundOption[] = [
  { name: 'No Change', prompt: '' },
  { name: 'Salt Flats', prompt: 'Bonneville Salt Flats, infinite white ground' },
  { name: 'Cyberpunk City', prompt: 'Neo-Tokyo street, wet asphalt, neon lights' },
  { name: 'Race Track Pit', prompt: 'Formula 1 pit lane, bright lights' },
  { name: 'Mountain Pass', prompt: 'Winding Swiss Alps road, snow peaks' },
  { name: 'Luxury Showroom', prompt: 'Pristine white car showroom, tile floor' },
  { name: 'Desert Highway', prompt: 'Arizona desert highway, red rocks' },
  { name: 'Industrial Warehouse', prompt: 'Abandoned concrete warehouse, shafts of light' },
  { name: 'Underground Garage', prompt: 'Concrete parking garage, moody lighting' },
  { name: 'Coastal Road', prompt: 'Pacific Coast Highway, ocean view' },
  { name: 'Tokyo Drift Garage', prompt: 'Crowded underground car meet garage' },
  { name: 'Moon Surface', prompt: 'Grey dusty surface of the moon, stars' },
];

export const INTERIOR_BACKGROUNDS: BackgroundOption[] = [
   { name: 'No Change', prompt: '' },
   { name: 'Manhattan Skyline', prompt: 'view of NYC skyline at dusk' },
   { name: 'Swiss Alps', prompt: 'view of snowy mountains' },
   { name: 'Tropical Jungle', prompt: 'view of lush rainforest' },
   { name: 'Oceanfront', prompt: 'view of calm blue ocean' },
   { name: 'Paris Rooftops', prompt: 'view of Parisian zinc rooftops' },
   { name: 'Zen Garden', prompt: 'view of peaceful rock garden' },
];

export const LANDSCAPE_BACKGROUNDS = APPAREL_BACKGROUNDS; // Reuse specifically generic ones if needed, but mostly landscape replaces the foreground.

// ==========================================
// 6. ACCESSORIES (100+ SHOES)
// ==========================================

export const CATEGORIZED_SHOE_STYLES: OptionGroup[] = [
  {
    category: 'Sneakers',
    styles: [
        { id: 'snk-white-min', name: 'White Minimalist Leather', prompt: 'clean white leather Common Projects style sneakers', tags: ['everyday', 'modern'] },
        { id: 'snk-jordan-1', name: 'Retro High-Tops (Red/White)', prompt: 'red and white retro high-top basketball sneakers', tags: ['everyday', 'street'] },
        { id: 'snk-yeezy', name: 'Knit Runners', prompt: 'futuristic beige knit running shoes', tags: ['modern', 'street'] },
        { id: 'snk-chunky', name: 'Chunky Dad Shoes', prompt: 'oversized 90s style chunky white sneakers', tags: ['everyday', 'retro'] },
        { id: 'snk-skate', name: 'Canvas Skate Shoes', prompt: 'black and white canvas skate shoes', tags: ['everyday', 'street'] },
        { id: 'snk-runner-tech', name: 'Tech Runners', prompt: 'neon and silver technical running shoes', tags: ['sport', 'modern'] },
        { id: 'snk-slip-on', name: 'Checkerboard Slip-Ons', prompt: 'checkerboard canvas slip-on sneakers', tags: ['everyday', 'casual'] },
        { id: 'snk-high-fashion', name: 'Designer High-Tops', prompt: 'luxury designer high-top sneakers with logos', tags: ['luxury', 'street'] },
        { id: 'snk-retro-runner', name: '70s Retro Joggers', prompt: 'suede and nylon 70s style jogging shoes', tags: ['retro', 'everyday'] },
        { id: 'snk-futuristic', name: 'Chrome Future Kicks', prompt: 'chrome plated futuristic concept sneakers', tags: ['modern', 'concept'] },
    ]
  },
  {
    category: 'Boots',
    styles: [
        { id: 'boot-chelsea-suede', name: 'Tan Suede Chelsea', prompt: 'tan suede Chelsea boots', tags: ['smart-casual', 'everyday'] },
        { id: 'boot-chelsea-black', name: 'Black Leather Chelsea', prompt: 'polished black leather Chelsea boots', tags: ['formal', 'modern'] },
        { id: 'boot-chukka', name: 'Desert Chukka Boots', prompt: 'brown suede desert boots', tags: ['smart-casual'] },
        { id: 'boot-combat', name: 'Black Combat Boots', prompt: 'chunky black leather military combat boots', tags: ['everyday', 'edgy'] },
        { id: 'boot-work', name: 'Classic Work Boots', prompt: 'yellow nubuck leather work boots', tags: ['work', 'everyday'] },
        { id: 'boot-cowboy', name: 'Western Cowboy Boots', prompt: 'ornate brown leather cowboy boots', tags: ['themed', 'western'] },
        { id: 'boot-dress', name: 'Lace-Up Dress Boots', prompt: 'polished brown leather dress boots', tags: ['formal', 'business'] },
        { id: 'boot-hiker', name: 'Leather Hikers', prompt: 'brown leather hiking boots with red laces', tags: ['outdoor', 'everyday'] },
        { id: 'boot-zip', name: 'Side-Zip Boots', prompt: 'sleek black leather side-zip boots', tags: ['modern', 'smart-casual'] },
        { id: 'boot-jodhpur', name: 'Jodhpur Boots', prompt: 'strapped leather Jodhpur boots', tags: ['formal', 'classic'] },
    ]
  },
  {
    category: 'Formal Shoes',
    styles: [
        { id: 'shoe-oxford-blk', name: 'Black Cap-Toe Oxford', prompt: 'polished black leather cap-toe Oxfords', tags: ['formal', 'business'] },
        { id: 'shoe-oxford-brn', name: 'Brown Wingtip Oxford', prompt: 'brogued brown leather wingtip Oxfords', tags: ['formal', 'business'] },
        { id: 'shoe-derby', name: 'Plain Toe Derby', prompt: 'classic black leather Derby shoes', tags: ['formal', 'smart-casual'] },
        { id: 'shoe-monk-double', name: 'Double Monk Strap', prompt: 'brown leather double monk strap shoes', tags: ['formal', 'modern'] },
        { id: 'shoe-monk-single', name: 'Single Monk Strap', prompt: 'black leather single monk strap shoes', tags: ['formal', 'modern'] },
        { id: 'shoe-wholecut', name: 'Wholecut Oxford', prompt: 'sleek seamless wholecut leather shoes', tags: ['formal', 'luxury'] },
        { id: 'shoe-tuxedo', name: 'Patent Leather Opera', prompt: 'shiny patent leather tuxedo shoes', tags: ['formal', 'gala'] },
        { id: 'shoe-velvet', name: 'Velvet Slippers', prompt: 'black velvet formal slippers with embroidery', tags: ['formal', 'luxury'] },
        { id: 'shoe-spectator', name: 'Two-Tone Spectators', prompt: 'black and white two-tone spectator shoes', tags: ['vintage', 'formal'] },
    ]
  },
  {
    category: 'Loafers & Slip-Ons',
    styles: [
        { id: 'loaf-penny', name: 'Penny Loafers', prompt: 'classic burgundy leather penny loafers', tags: ['smart-casual', 'preppy'] },
        { id: 'loaf-tassel', name: 'Tassel Loafers', prompt: 'brown suede tassel loafers', tags: ['smart-casual', 'classic'] },
        { id: 'loaf-horsebit', name: 'Horsebit Loafers', prompt: 'black leather loafers with gold horsebit', tags: ['smart-casual', 'luxury'] },
        { id: 'loaf-driving', name: 'Driving Mocs', prompt: 'soft suede driving moccasins', tags: ['casual', 'summer'] },
        { id: 'loaf-espadrille', name: 'Canvas Espadrilles', prompt: 'canvas espadrilles with rope soles', tags: ['summer', 'casual'] },
        { id: 'loaf-mule', name: 'Leather Mules', prompt: 'backless leather mules', tags: ['casual', 'modern'] },
        { id: 'loaf-boat', name: 'Boat Shoes', prompt: 'leather boat shoes with laces', tags: ['summer', 'preppy'] },
    ]
  },
  {
    category: 'Sandals',
    styles: [
        { id: 'sand-slide', name: 'Leather Slides', prompt: 'minimalist leather slide sandals', tags: ['summer', 'casual'] },
        { id: 'sand-gladiator', name: 'Gladiator Sandals', prompt: 'strappy leather gladiator sandals', tags: ['summer', 'themed'] },
        { id: 'sand-sport', name: 'Sport Sandals', prompt: 'technical nylon sport sandals', tags: ['summer', 'active'] },
        { id: 'sand-flip', name: 'Beach Flip-Flops', prompt: 'rubber beach flip-flops', tags: ['summer', 'beach'] },
        { id: 'sand-birks', name: 'Corkbed Sandals', prompt: 'leather strap sandals with cork soles', tags: ['summer', 'casual'] },
    ]
  }
];

export const CATEGORIZED_WOMENS_SHOE_STYLES: OptionGroup[] = [
    {
        category: 'Heels & Pumps',
        styles: [
            { id: 'heel-stiletto-blk', name: 'Black Stilettos', prompt: 'classic black patent leather stiletto pumps', tags: ['formal', 'classic'] },
            { id: 'heel-stiletto-nude', name: 'Nude Pumps', prompt: 'nude beige leather pumps', tags: ['formal', 'classic'] },
            { id: 'heel-red-sole', name: 'Red Bottoms', prompt: 'black pumps with iconic red soles', tags: ['luxury', 'formal'] },
            { id: 'heel-kitten', name: 'Kitten Heels', prompt: 'low kitten heel slingbacks', tags: ['business', 'classic'] },
            { id: 'heel-block', name: 'Block Heel Mary Janes', prompt: 'chunky block heel Mary Janes', tags: ['retro', 'everyday'] },
            { id: 'heel-platform', name: '70s Platforms', prompt: 'massive velvet platform heels', tags: ['retro', 'party'] },
            { id: 'heel-strappy', name: 'Gold Strappy Sandals', prompt: 'delicate gold strappy high-heel sandals', tags: ['formal', 'party'] },
            { id: 'heel-wedge', name: 'Espadrille Wedges', prompt: 'canvas wedge heels with rope soles', tags: ['summer', 'casual'] },
            { id: 'heel-clear', name: 'PVC Clear Heels', prompt: 'modern clear PVC Cinderella heels', tags: ['modern', 'party'] },
            { id: 'heel-sculptural', name: 'Sculptural Heel', prompt: 'artistic shoes with geometric shaped heels', tags: ['modern', 'artistic'] },
        ]
    },
    {
        category: 'Boots',
        styles: [
            { id: 'wboot-ankle', name: 'Ankle Booties', prompt: 'suede ankle booties with side cutout', tags: ['everyday', 'casual'] },
            { id: 'wboot-knee', name: 'Knee-High Leather', prompt: 'sleek black leather knee-high boots', tags: ['winter', 'classic'] },
            { id: 'wboot-thigh', name: 'Thigh-High Suede', prompt: 'dramatic suede thigh-high boots', tags: ['party', 'edgy'] },
            { id: 'wboot-combat', name: 'Lace-Up Combat', prompt: 'chunky leather combat boots', tags: ['everyday', 'edgy'] },
            { id: 'wboot-cowboy', name: 'White Cowboy Boots', prompt: 'white leather western boots with embroidery', tags: ['themed', 'western'] },
            { id: 'wboot-rain', name: 'Designer Rain Boots', prompt: 'glossy rubber Wellington rain boots', tags: ['rain', 'everyday'] },
            { id: 'wboot-chelsea', name: 'Platform Chelsea', prompt: 'chunky platform Chelsea boots', tags: ['everyday', 'modern'] },
            { id: 'wboot-sock', name: 'Knit Sock Boots', prompt: 'form-fitting knit sock boots', tags: ['modern', 'chic'] },
        ]
    },
    {
        category: 'Flats & Loafers',
        styles: [
            { id: 'flat-ballet', name: 'Ballet Flats', prompt: 'soft leather ballet flats with bow', tags: ['everyday', 'classic'] },
            { id: 'flat-pointy', name: 'Pointy Toe Flats', prompt: 'sleek pointy toe flats', tags: ['business', 'smart-casual'] },
            { id: 'flat-loafer', name: 'Chunky Loafers', prompt: 'chunky lug-sole leather loafers', tags: ['modern', 'smart-casual'] },
            { id: 'flat-mule', name: 'Flat Mules', prompt: 'backless flat leather mules', tags: ['everyday', 'casual'] },
            { id: 'flat-oxford', name: 'Brogue Oxfords', prompt: 'lace-up leather brogue oxfords', tags: ['smart-casual', 'classic'] },
        ]
    },
    {
        category: 'Sneakers & Sport',
        styles: [
            { id: 'wsnk-white', name: 'White Tennis Shoes', prompt: 'clean white canvas tennis sneakers', tags: ['everyday', 'casual'] },
            { id: 'wsnk-dad', name: 'Fashion Dad Sneakers', prompt: 'oversized pastel chunky fashion sneakers', tags: ['modern', 'street'] },
            { id: 'wsnk-hightop', name: 'Canvas High-Tops', prompt: 'classic canvas high-top sneakers', tags: ['everyday', 'casual'] },
            { id: 'wsnk-slip', name: 'Slip-On Plimsolls', prompt: 'quilted leather slip-on sneakers', tags: ['everyday', 'casual'] },
            { id: 'wsnk-running', name: 'Performance Runners', prompt: 'neon athletic running shoes', tags: ['sport', 'active'] },
        ]
    },
    {
        category: 'Sandals',
        styles: [
            { id: 'wsand-gladiator', name: 'Tall Gladiators', prompt: 'knee-high strappy gladiator sandals', tags: ['summer', 'themed'] },
            { id: 'wsand-slide', name: 'Designer Slides', prompt: 'luxury leather slide sandals', tags: ['summer', 'luxury'] },
            { id: 'wsand-jelly', name: 'Jelly Sandals', prompt: 'retro clear glitter jelly sandals', tags: ['retro', 'fun'] },
            { id: 'wsand-birks', name: 'Comfort Sandals', prompt: 'two-strap comfort sandals', tags: ['summer', 'casual'] },
        ]
    }
];

export const CATEGORIZED_KIDS_SHOE_STYLES: OptionGroup[] = [
    {
        category: 'Everyday',
        styles: [
            { id: 'kshoe-sneaker', name: 'Velcro Sneakers', prompt: 'colorful velcro strap sneakers', tags: ['everyday', 'play'] },
            { id: 'kshoe-lightup', name: 'Light-Up Shoes', prompt: 'sneakers with light-up soles', tags: ['fun', 'play'] },
            { id: 'kshoe-croc', name: 'Rubber Clogs', prompt: 'bright rubber garden clogs', tags: ['summer', 'play'] },
            { id: 'kshoe-canvas', name: 'Canvas Slip-Ons', prompt: 'cute patterned canvas slip-on shoes', tags: ['everyday', 'casual'] },
        ]
    },
    {
        category: 'Dressy',
        styles: [
            { id: 'kshoe-patent', name: 'Black Patent Leather', prompt: 'shiny black patent leather dress shoes', tags: ['formal', 'party'] },
            { id: 'kshoe-maryjane', name: 'White Mary Janes', prompt: 'classic white Mary Jane shoes', tags: ['formal', 'classic'] },
            { id: 'kshoe-boot', name: 'Mini Boots', prompt: 'miniature leather Chelsea boots', tags: ['smart-casual', 'winter'] },
        ]
    }
];


export const DEFAULT_SHOE_OPTION: SimpleOption = { name: 'No Change', prompt: '' };
export const SHIRT_OPTIONS: SimpleOption[] = [
  { name: 'Crisp White Dress Shirt', prompt: 'a crisp, high-thread-count white dress shirt' },
  { name: 'Black Silk Shirt', prompt: 'a flowing black silk shirt, unbuttoned at the top' },
  { name: 'Chambray Denim', prompt: 'a textured blue chambray denim shirt' },
  { name: 'Breton Stripe Tee', prompt: 'a classic French navy and white striped t-shirt' },
  { name: 'Vintage Band Tee', prompt: 'a faded vintage rock band t-shirt' },
  { name: 'Cashmere Turtleneck', prompt: 'a luxurious charcoal cashmere turtleneck' },
  { name: 'Cuban Collar', prompt: 'a retro patterned cuban collar short sleeve shirt' },
  { name: 'Oxford Button Down', prompt: 'a light blue oxford cloth button down shirt' },
  { name: 'Flannel Plaid', prompt: 'a red and black buffalo plaid flannel shirt' },
  { name: 'Silk Blouse', prompt: 'a delicate cream silk blouse with bow' },
  { name: 'Graphic Hoodie', prompt: 'an oversized graphic print hoodie' },
  { name: 'Polo Shirt', prompt: 'a fitted pique cotton polo shirt' },
  { name: 'Henley', prompt: 'a fitted cotton henley shirt' },
];
export const DEFAULT_SHIRT_OPTION: SimpleOption = { name: 'Automatic / Matching', prompt: '' };

export const CATEGORIZED_TIE_STYLES: OptionGroup[] = [
    {
        category: 'Classic',
        styles: [
            { id: 'tie-black-satin', name: 'Black Satin Tie', prompt: 'a slim black satin tie', tags: ['formal'] },
            { id: 'tie-navy-grenadine', name: 'Navy Grenadine', prompt: 'a textured navy blue grenadine tie', tags: ['business'] },
            { id: 'tie-repp-stripe', name: 'Repp Stripe', prompt: 'a classic collegiate diagonal stripe tie', tags: ['preppy'] },
            { id: 'tie-paisley', name: 'Silk Paisley', prompt: 'an intricate silk paisley pattern tie', tags: ['classic'] },
            { id: 'tie-polkadot', name: 'Polka Dot', prompt: 'a navy tie with small white polka dots', tags: ['business'] },
        ]
    },
    {
        category: 'Bow Ties & Bold',
        styles: [
            { id: 'bow-black', name: 'Black Bow Tie', prompt: 'a classic black silk bow tie', tags: ['formal'] },
            { id: 'bow-white', name: 'White Pique Bow', prompt: 'a white Marcella piqué bow tie', tags: ['formal'] },
            { id: 'tie-knit', name: 'Burgundy Knit', prompt: 'a casual burgundy knit tie with a square end', tags: ['casual'] },
            { id: 'bow-velvet', name: 'Velvet Bow Tie', prompt: 'an oversized floppy velvet bow tie', tags: ['artist'] },
            { id: 'ascot', name: 'Silk Ascot', prompt: 'a patterned silk ascot worn inside the collar', tags: ['vintage'] },
            { id: 'bolo', name: 'Bolo Tie', prompt: 'a western leather bolo tie with turquoise clasp', tags: ['western'] },
        ]
    }
];
export const DEFAULT_TIE_OPTION: SimpleOption = { name: 'Automatic / Matching', prompt: '' };

export const CATEGORIZED_HANDBAG_STYLES: OptionGroup[] = [
    {
        category: 'Icons',
        styles: [
            { id: 'bag-birkin', name: 'Structure Tote', prompt: 'a high-end structured leather tote bag with gold hardware', tags: ['luxury'] },
            { id: 'bag-quilted', name: 'Quilted Flap Bag', prompt: 'a classic black quilted leather shoulder bag with chain strap', tags: ['classic'] },
            { id: 'bag-clutch', name: 'Crystal Clutch', prompt: 'a sparkling crystal-encrusted evening clutch', tags: ['party'] },
            { id: 'bag-tote-canvas', name: 'Designer Canvas Tote', prompt: 'a large designer monogram canvas tote bag', tags: ['casual'] },
            { id: 'bag-saddle', name: 'Saddle Bag', prompt: 'a leather saddle bag with equestrian details', tags: ['boho'] },
            { id: 'bag-mini', name: 'Micro Mini Bag', prompt: 'a tiny, trendy micro mini handbag', tags: ['trendy'] },
            { id: 'bag-straw', name: 'Straw Basket', prompt: 'a woven straw basket bag', tags: ['summer'] },
        ]
    }
];
export const DEFAULT_HANDBAG_OPTION: SimpleOption = { name: 'None', prompt: '' };

export const POSTURE_OPTIONS: SimpleOption[] = [
  { name: 'Original / Natural', prompt: '' },
  { name: 'Power Stance', prompt: 'standing with legs apart, hands on hips, exuding confidence and power' },
  { name: 'Casual Lean', prompt: 'leaning casually against a wall or surface, relaxed posture, one leg crossed' },
  { name: 'Walking Away', prompt: 'walking away from the camera, looking back over the shoulder' },
  { name: 'Hands in Pockets', prompt: 'standing relaxed with both hands in pockets, shoulders down' },
  { name: 'Arms Crossed', prompt: 'standing firm with arms crossed over the chest, serious expression' },
  { name: 'Sitting on Stool', prompt: 'sitting elegantly on a high stool, one leg resting on the rung' },
  { name: 'Sitting on Floor', prompt: 'sitting comfortably on the floor, legs crossed' },
  { name: 'Action Jump', prompt: 'caught in mid-air jumping with energy' },
  { name: 'Running', prompt: 'running towards the camera, dynamic motion' },
  { name: 'Back to Camera', prompt: 'standing with back turned to camera, mysterious' },
  { name: 'Profile View', prompt: 'standing in side profile view, looking at horizon' },
  { name: 'Adjusting Tie/Cuff', prompt: 'adjusting a cufflink or tie, sophisticated pose' },
  { name: 'Hand on Chin', prompt: 'standing with one hand on chin, thinking pose' },
  { name: 'Waving', prompt: 'standing friendly and waving at the camera' },
  { name: 'Peace Sign', prompt: 'posing with a peace sign hand gesture' },
  { name: 'Lounging', prompt: 'lounging in a relaxed, reclining pose' },
  { name: 'Meditating', prompt: 'sitting in a lotus meditation pose' },
  { name: 'Pointing', prompt: 'pointing towards something in the distance' },
  { name: 'Hands Clasped', prompt: 'standing politely with hands clasped in front' },
  { name: 'Jacket Over Shoulder', prompt: 'standing holding a jacket slung over one shoulder' },
];
export const DEFAULT_POSTURE_OPTION: SimpleOption = { name: 'Original / Natural', prompt: '' };

export const CATEGORIZED_EYEWEAR_STYLES: OptionGroup[] = [
    {
        category: 'Sunglasses',
        styles: [
            { id: 'eye-aviator', name: 'Gold Aviators', prompt: 'gold rimmed classic aviator sunglasses', tags: ['classic'] },
            { id: 'eye-wayfarer', name: 'Black Wayfarers', prompt: 'classic black wayfarer sunglasses', tags: ['cool'] },
            { id: 'eye-cat', name: 'Cat Eye', prompt: 'exaggerated black cat-eye sunglasses', tags: ['chic'] },
            { id: 'eye-shield', name: 'Futuristic Shield', prompt: 'oversized wrap-around shield sunglasses, mirror lens', tags: ['modern'] },
            { id: 'eye-round-sun', name: 'Round Teashades', prompt: 'small round John Lennon style sunglasses', tags: ['retro'] },
        ]
    },
    {
        category: 'Optical',
        styles: [
            { id: 'eye-round', name: 'Architect Round', prompt: 'thick tortoise shell round glasses', tags: ['smart'] },
            { id: 'eye-rimless', name: 'Minimal Rimless', prompt: 'barely visible rimless glasses', tags: ['modern'] },
            { id: 'eye-club', name: 'Clubmaster', prompt: 'browline clubmaster glasses', tags: ['classic'] },
        ]
    }
];
export const DEFAULT_EYEWEAR_OPTION: SimpleOption = { name: 'None', prompt: '' };

export const CATEGORIZED_HEADWEAR_STYLES: OptionGroup[] = [
    {
        category: 'Hats',
        styles: [
            { id: 'hat-fedora', name: 'Wide Brim Fedora', prompt: 'a wide-brimmed felt fedora hat', tags: ['boho'] },
            { id: 'hat-beanie', name: 'Fisherman Beanie', prompt: 'a shallow knit fisherman beanie', tags: ['hipster'] },
            { id: 'hat-cap', name: 'Suede Baseball Cap', prompt: 'a premium suede baseball cap', tags: ['casual'] },
            { id: 'hat-beret', name: 'Wool Beret', prompt: 'a black wool beret worn tilted', tags: ['chic'] },
            { id: 'hat-fascinator', name: 'Royal Fascinator', prompt: 'an elaborate sculptural fascinator hat', tags: ['royal'] },
            { id: 'hat-bucket', name: 'Bucket Hat', prompt: 'a trendy 90s style bucket hat', tags: ['street'] },
            { id: 'hat-panama', name: 'Panama Hat', prompt: 'a woven straw Panama hat', tags: ['summer'] },
            { id: 'hat-flat', name: 'Flat Cap', prompt: 'a tweed newsboy flat cap', tags: ['vintage'] },
        ]
    }
];
export const DEFAULT_HEADWEAR_OPTION: SimpleOption = { name: 'None', prompt: '' };

// ==========================================
// VEHICLE MODS (RIMS, AERO, INTERIOR)
// ==========================================

export const DEFAULT_VEHICLE_MOD_OPTION: SimpleOption = { name: 'Stock / None', prompt: '' };

export const CATEGORIZED_VEHICLE_RIMS: OptionGroup[] = [
    {
        category: 'JDM / Tuner',
        styles: [
            { id: 'rim-te37', name: 'Volk TE37 Bronze', prompt: 'iconic bronze 6-spoke Volk TE37 wheels', tags: ['jdm'] },
            { id: 'rim-meister', name: 'Work Meister S1', prompt: 'deep dish 3-piece Work Meister S1 wheels with polished lip', tags: ['jdm'] },
            { id: 'rim-rpf1', name: 'Enkei RPF1', prompt: 'silver lightweight Enkei RPF1 racing wheels', tags: ['jdm'] },
            { id: 'rim-advan', name: 'Advan GT', prompt: '5-spoke Advan GT wheels in gloss black', tags: ['jdm'] },
            { id: 'rim-vsxx', name: 'Work VS-XX', prompt: 'classic gold mesh Work VS-XX wheels with polished lip', tags: ['jdm'] },
            { id: 'rim-ce28', name: 'Volk CE28N', prompt: 'multi-spoke bronze Volk CE28N wheels', tags: ['jdm'] },
            { id: 'rim-blitz', name: 'Blitz 03', prompt: 'classic Blitz 03 split 5-spoke wheels', tags: ['jdm'] },
            { id: 'rim-rg2', name: 'Advan RGII', prompt: 'gold 6-spoke Advan RGII wheels', tags: ['jdm'] },
            { id: 'rim-xt7', name: 'Work Emotion XT7', prompt: 'concave 7-spoke Work Emotion XT7 wheels', tags: ['jdm'] },
            { id: 'rim-crkai', name: 'Work Emotion CR Kai', prompt: 'white Work Emotion CR Kai wheels', tags: ['jdm'] },
        ]
    },
    {
        category: 'Euro / Luxury',
        styles: [
            { id: 'rim-bbs-rs', name: 'BBS RS Mesh', prompt: 'classic gold mesh BBS RS wheels with polished lip', tags: ['euro'] },
            { id: 'rim-rotiform-aero', name: 'Rotiform Aerodisc', prompt: 'white Rotiform Aerodisc wheels on the front', tags: ['euro'] },
            { id: 'rim-hrew', name: 'HRE P101', prompt: 'satin black HRE P101 forged monoblock wheels', tags: ['luxury'] },
            { id: 'rim-vossen', name: 'Vossen CVT', prompt: 'directional silver Vossen CVT wheels', tags: ['luxury'] },
            { id: 'rim-oz-rally', name: 'OZ Rally Racing', prompt: 'white OZ Racing rally wheels with red text', tags: ['euro'] },
            { id: 'rim-fifteen52', name: 'Fifteen52 Tarmac', prompt: 'white robust 5-spoke Fifteen52 Tarmac wheels', tags: ['euro'] },
            { id: 'rim-alpina', name: 'Alpina Classic', prompt: 'classic multi-spoke Alpina turbine wheels', tags: ['euro'] },
            { id: 'rim-amg-mono', name: 'AMG Monoblock', prompt: 'classic silver Mercedes AMG Monoblock wheels', tags: ['euro'] },
            { id: 'rim-porsche-fuchs', name: 'Porsche Fuchs', prompt: 'classic black and silver Porsche Fuchs wheels', tags: ['euro'] },
            { id: 'rim-turbofan', name: 'BBS Turbofans', prompt: 'vintage brake-cooling BBS Turbofans on front wheels', tags: ['euro'] },
        ]
    },
    {
        category: 'Muscle / Drag',
        styles: [
            { id: 'rim-welds', name: 'Weld Racing', prompt: 'polished Weld Racing drag wheels with beadlocks', tags: ['muscle'] },
            { id: 'rim-cragar', name: 'Cragar S/S', prompt: 'classic chrome Cragar S/S 5-spoke wheels', tags: ['muscle'] },
            { id: 'rim-torq-thrust', name: 'American Racing Torq Thrust', prompt: 'grey center American Racing Torq Thrust wheels', tags: ['muscle'] },
            { id: 'rim-magnum', name: 'Magnum 500', prompt: 'classic chrome and black Magnum 500 wheels', tags: ['muscle'] },
            { id: 'rim-steelies', name: 'Wide Steelies', prompt: 'widened black steel wheels with chrome beauty rings', tags: ['muscle'] },
            { id: 'rim-halibrand', name: 'Halibrand Cobra', prompt: 'vintage Halibrand Cobra wheels with spinners', tags: ['muscle'] },
            { id: 'rim-centerline', name: 'Center Line Auto Drag', prompt: 'solid aluminum Center Line Auto Drag wheels', tags: ['muscle'] },
        ]
    },
    {
        category: 'Offroad / Truck',
        styles: [
            { id: 'rim-method', name: 'Method Race Wheels', prompt: 'bronze Method Race Wheels with beadlock ring', tags: ['offroad'] },
            { id: 'rim-fuel', name: 'Fuel Off-Road', prompt: 'aggressive black milled Fuel Off-Road wheels', tags: ['offroad'] },
            { id: 'rim-steel-bead', name: 'Steel Beadlocks', prompt: 'black steel wheels with functional beadlocks', tags: ['offroad'] },
            { id: 'rim-trd', name: 'TRD Pro', prompt: 'matte black TRD Pro wheels', tags: ['offroad'] },
            { id: 'rim-black-rhino', name: 'Black Rhino Armory', prompt: 'military style Black Rhino Armory wheels', tags: ['offroad'] },
        ]
    },
    {
        category: 'Lowrider / Wire',
        styles: [
            { id: 'rim-dayton', name: '100-Spoke Daytons', prompt: '13-inch 100-spoke chrome Dayton wire wheels with knock-offs', tags: ['lowrider'] },
            { id: 'rim-gold-wire', name: 'Gold Wire Wheels', prompt: 'gold plated wire wheels', tags: ['lowrider'] },
        ]
    }
];

export const CATEGORIZED_VEHICLE_AERO: OptionGroup[] = [
    {
        category: 'Front Aero',
        styles: [
            { id: 'aero-lip-carbon', name: 'Carbon Fiber Lip', prompt: 'add a low-profile carbon fiber front lip spoiler', tags: ['aero'] },
            { id: 'aero-splitter', name: 'Track Splitter', prompt: 'add an aggressive front splitter with support rods', tags: ['aero'] },
            { id: 'aero-canards', name: 'Dive Planes / Canards', prompt: 'add carbon fiber dive planes (canards) to the front bumper', tags: ['aero'] },
            { id: 'aero-bumper-delete', name: 'Bumper Delete (Drift)', prompt: 'remove the front bumper entirely, exposing the intercooler and crash bar, drift style', tags: ['drift'] },
        ]
    },
    {
        category: 'Rear Aero',
        styles: [
            { id: 'aero-wing-gt', name: 'Big GT Wing', prompt: 'mount a massive chassis-mounted GT wing on the rear', tags: ['aero'] },
            { id: 'aero-ducktail', name: 'Ducktail Spoiler', prompt: 'add a sleek, integrated ducktail spoiler to the trunk', tags: ['aero'] },
            { id: 'aero-diffuser', name: 'Rear Diffuser', prompt: 'install an aggressive rear diffuser with large fins', tags: ['aero'] },
            { id: 'aero-roof-spoiler', name: 'Roof Spoiler', prompt: 'add a subtle roof spoiler above the rear window', tags: ['aero'] },
        ]
    },
    {
        category: 'Body Work',
        styles: [
            { id: 'aero-widebody-rivet', name: 'Riveted Widebody', prompt: 'install a bolt-on widebody kit with exposed rivets (Liberty Walk style)', tags: ['body'] },
            { id: 'aero-widebody-smooth', name: 'Molded Widebody', prompt: 'smoothly molded widebody fender flares', tags: ['body'] },
            { id: 'aero-hood-vent', name: 'Vented Carbon Hood', prompt: 'replace hood with a vented carbon fiber hood', tags: ['body'] },
            { id: 'aero-scoop', name: 'Hood Scoop', prompt: 'add a large functional hood scoop', tags: ['body'] },
            { id: 'aero-skirt', name: 'Side Skirt Extensions', prompt: 'add low side skirt extensions', tags: ['body'] },
        ]
    }
];

export const CATEGORIZED_VEHICLE_LIGHTING_GRILL: OptionGroup[] = [
    {
        category: 'Lighting Mods',
        styles: [
            { id: 'light-halo', name: 'Halo / Angel Eyes', prompt: 'install custom LED halo ring headlights (Angel Eyes)', tags: ['lighting'] },
            { id: 'light-yellow', name: 'Yellow Fog Lights', prompt: 'tint the fog lights selective yellow', tags: ['lighting'] },
            { id: 'light-underglow', name: 'Neon Underglow', prompt: 'add vibrant neon underglow lighting beneath the car', tags: ['lighting'] },
            { id: 'light-delete', name: 'Headlight Air Intake', prompt: 'remove one headlight and replace it with a carbon fiber air intake duct (Headlight Delete)', tags: ['performance'] },
            { id: 'light-smoked', name: 'Smoked Taillights', prompt: 'tint/smoke the taillights for a dark look', tags: ['lighting'] },
            { id: 'light-lightbar', name: 'LED Light Bar', prompt: 'mount a large LED light bar on the roof', tags: ['offroad'] },
            { id: 'light-hud', name: 'Heads Up Display (HUD)', prompt: 'project a digital Heads Up Display (HUD) speedometer onto the windshield', tags: ['tech'] },
        ]
    },
    {
        category: 'Grill & Cooling',
        styles: [
            { id: 'grill-mesh', name: 'Mesh Grill', prompt: 'replace the front grill with a black honeycomb mesh grill', tags: ['grill'] },
            { id: 'grill-chrome', name: 'Billet Chrome Grill', prompt: 'install a custom billet chrome front grill', tags: ['grill'] },
            { id: 'grill-intercooler', name: 'Exposed Intercooler', prompt: 'remove the grill to expose a massive front-mount intercooler', tags: ['performance'] },
            { id: 'grill-badgeless', name: 'Badgeless Grill', prompt: 'remove the manufacturer logo for a clean badgeless grill', tags: ['grill'] },
        ]
    }
];

export const CATEGORIZED_VEHICLE_INTERIOR: OptionGroup[] = [
    {
        category: 'Seating',
        styles: [
            { id: 'int-recaro-red', name: 'Red Recaro Buckets', prompt: 'install bright red Recaro racing bucket seats visible through the windows', tags: ['interior'] },
            { id: 'int-bride', name: 'Bride Gradient', prompt: 'install Bride gradient racing seats', tags: ['interior'] },
            { id: 'int-diamond-tan', name: 'Tan Diamond Stitch', prompt: 'reupholster interior in luxurious tan leather with diamond stitching', tags: ['interior'] },
            { id: 'int-white-leather', name: 'White Leather', prompt: 'pristine white leather interior upholstery', tags: ['interior'] },
        ]
    },
    {
        category: 'Cockpit',
        styles: [
            { id: 'int-rollcage', name: 'Roll Cage', prompt: 'install a color-matched multi-point roll cage inside', tags: ['race'] },
            { id: 'int-nardi', name: 'Wood Grain Steering', prompt: 'install a classic wood grain Nardi steering wheel', tags: ['classic'] },
            { id: 'int-carbon-dash', name: 'Carbon Fiber Dash', prompt: 'replace dashboard trim with carbon fiber', tags: ['interior'] },
            { id: 'int-dice', name: 'Fuzzy Dice', prompt: 'hang fuzzy dice from the rearview mirror', tags: ['classic'] },
        ]
    }
];

// ==========================================
// GLOBAL OPTIONS
// ==========================================

export const APPAREL_LIGHTING: SimpleOption[] = [
  { name: 'Original Lighting', prompt: '' },
  { name: 'Softbox Studio', prompt: 'professional softbox studio lighting, flattering soft shadows' },
  { name: 'Golden Hour', prompt: 'warm, golden hour sunlight coming from the side, rim lighting' },
  { name: 'Moody Rembrandt', prompt: 'dramatic Rembrandt lighting, strong contrast, artistic shadows' },
  { name: 'Neon Club', prompt: 'colorful pink and blue neon gel lighting, club atmosphere' },
  { name: 'Overcast Soft', prompt: 'soft, diffuse natural light from an overcast sky, no harsh shadows' },
  { name: 'Cinematic Teal/Orange', prompt: 'blockbuster movie teal and orange color graded lighting' },
  { name: 'Direct Sunlight', prompt: 'harsh, bright direct sunlight with hard shadows, summer vibe' },
  { name: 'Candlelight', prompt: 'warm, flickering candlelight glow from below' },
  { name: 'Ring Light', prompt: 'beauty ring light reflection in eyes, even facial illumination' },
];

export const VEHICLE_LIGHTING: SimpleOption[] = [
  { name: 'Original Lighting', prompt: '' },
  { name: 'Showroom Spots', prompt: 'high-intensity showroom spotlights creating starburst reflections' },
  { name: 'Sunset Horizon', prompt: 'low sun directly behind the car, silhouetting the shape' },
  { name: 'Overcast Diffused', prompt: 'giant softbox overhead lighting, perfectly smooth reflections' },
  { name: 'Neon Reflection', prompt: 'night time lighting with neon signs reflecting off the car body' },
  { name: 'Tunnel Lights', prompt: 'streaking overhead tunnel lights reflecting on the roof' },
];
export const INTERIOR_LIGHTING: SimpleOption[] = [
  { name: 'Original Lighting', prompt: '' },
  { name: 'Morning Sun', prompt: 'bright, crisp morning sunlight streaming through window' },
  { name: 'Cozy Evening', prompt: 'warm, dim artificial lighting, lamps, fireplace glow' },
  { name: 'Clinical Bright', prompt: 'bright, cool white architectural lighting, evenly lit' },
  { name: 'Moody Night', prompt: 'dark blue ambient night light coming from windows' },
];
export const LANDSCAPE_LIGHTING: SimpleOption[] = [
  { name: 'Original Lighting', prompt: '' },
  { name: 'High Noon', prompt: 'bright, direct overhead sunlight, vibrant colors' },
  { name: 'Sunset', prompt: 'dramatic orange and purple sunset sky, warm light' },
  { name: 'Moonlight', prompt: 'cool blue moonlight, night scene, garden lights' },
  { name: 'Rainy Day', prompt: 'overcast, moody, wet surfaces, soft green tones' },
  { name: 'Golden Hour', prompt: 'long shadows, warm golden light' },
];

export const BACKGROUND_OPTIONS: BackgroundOption[] = APPAREL_BACKGROUNDS; 
export const LIGHTING_OPTIONS: SimpleOption[] = APPAREL_LIGHTING;

export const QUALITY_OPTIONS: QualityOption[] = [
  { name: 'Standard', value: 'standard' },
  { name: 'High Res (Slower)', value: 'high' },
];

// --- POSTER CONSTANTS ---
export const POSTER_POSES: PosterPose[] = [
    { name: 'Back to Back', prompt: 'standing back to back, looking confident, movie poster style' },
    { name: 'Face Off', prompt: 'facing each other in a dramatic face-off, intense eye contact' },
    { name: 'Side by Side', prompt: 'standing side by side, power stance, looking at the camera' },
    { name: 'Levitating', prompt: 'floating slightly off the ground, mystical pose, defying gravity' },
    { name: 'Foreground/Background', prompt: 'one person close to camera in focus, one person further back and silhouetted' },
    { name: 'Walking Together', prompt: 'walking side by side towards the camera, blurry motion' },
    { name: 'Seated on Thrones', prompt: 'sitting on large ornate thrones, regal pose' },
    { name: 'Lean In', prompt: 'leaning in towards each other, intimate and close' },
];

export const POSTER_ASPECT_RATIOS: PosterAspectRatio[] = [
    { name: 'Square (1:1)', value: '1:1' },
    { name: 'Portrait (3:4)', value: '3:4' },
    { name: 'Landscape (16:9)', value: '16:9' },
    { name: 'Mobile (9:16)', value: '9:16' },
];

export const POSTER_BACKGROUND_OPTIONS: SimpleOption[] = [
    { name: 'Dark Studio', prompt: 'a dark, moody minimalist studio background' },
    { name: 'Concert Stage', prompt: 'a concert stage with blinding stage lights, smoke, and lasers' },
    { name: 'Space Galaxy', prompt: 'a cosmic background with stars, nebula, and galaxy dust' },
    { name: 'Solid Color', prompt: 'a solid studio background of hex color ' },
    { name: 'Graffiti Wall', prompt: 'a gritty urban brick wall covered in colorful graffiti' },
    { name: 'Clouds', prompt: 'surrounded by fluffy white cumulus clouds in a blue sky, dreamy' },
    { name: 'Fire & Embers', prompt: 'surrounded by flames and floating burning embers' },
    { name: 'Matrix Code', prompt: 'falling green digital matrix code rain background' },
];

export const POSTER_LIGHTING_OPTIONS: SimpleOption[] = [
    { name: 'Cinematic Teal/Orange', prompt: 'blockbuster teal and orange cinematic lighting, high contrast' },
    { name: 'Red Neon', prompt: 'intense red neon lighting, rim light, sinister mood' },
    { name: 'Black & White', prompt: 'high contrast black and white photography, noir style' },
    { name: 'Soft Glamour', prompt: 'soft, hazy glamour glow, vintage 80s filter' },
    { name: 'Cyberpunk Blue', prompt: 'cool blue and purple cyberpunk laser lighting' },
];

export const POSTER_DISTANCE_OPTIONS: SimpleOption[] = [
    { name: 'Close Together', prompt: 'standing close together, touching shoulders' },
    { name: 'Far Apart', prompt: 'standing far apart on opposite sides of the frame' },
    { name: 'Overlapping', prompt: 'standing with one person slightly in front of the other, overlapping' },
];

export const POSTER_INDIVIDUAL_POSTURES: SimpleOption[] = [
    { name: 'Natural', prompt: '' },
    { name: 'Arms Crossed', prompt: 'arms crossed over chest' },
    { name: 'Hands in Pockets', prompt: 'hands in pockets' },
    { name: 'Looking Away', prompt: 'looking off to the side, not at camera' },
];

export const POSTER_FONT_OPTIONS: SimpleOption[] = [
    { name: 'Modern Sans', prompt: 'modern sans-serif' },
    { name: 'Classic Serif', prompt: 'classic serif' },
    { name: 'Handwritten', prompt: 'handwritten script' },
    { name: 'Gothic', prompt: 'bold gothic blackletter' },
    { name: 'Sci-Fi', prompt: 'futuristic sci-fi font' },
];

export const POSTER_ICON_OPTIONS: SimpleOption[] = [
    { name: 'None', prompt: '' },
    { name: 'Parental Advisory', prompt: 'parental advisory sticker' },
    { name: 'Explicit Content', prompt: 'explicit content warning label' },
];

// --- STUDIO SESSION CONSTANTS ---

export const STUDIO_SCENARIOS = [
    { name: 'Professional Headshots', prompt: 'professional corporate photoshoot, confident and approachable' },
    { name: 'Fashion Editorial', prompt: 'high-fashion magazine editorial, stylish and trendy' },
    { name: 'Casual Hangout', prompt: 'relaxed lifestyle photography, candid and natural' },
    { name: 'Luxury Event', prompt: 'black tie gala event, elegant and sophisticated' },
    { name: 'Podcast / Interview', prompt: 'sitting in a podcast studio, engaging in conversation' },
    { name: 'Urban Street', prompt: 'walking down a city street, urban street style' },
];

export const STUDIO_POSES = [
    { name: 'Standing Side-by-Side', prompt: 'standing next to each other, facing the camera' },
    { name: 'Seated Conversation', prompt: 'sitting comfortably, turned slightly towards each other' },
    { name: 'Walking Together', prompt: 'walking forward together, dynamic motion' },
    { name: 'Back-to-Back', prompt: 'standing back to back, cool and composed' },
    { name: 'Close-Up Portrait', prompt: 'close-up portrait shot of both faces' },
];
