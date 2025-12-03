
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
    { name: 'Standard (2K)', value: 'standard' },
    { name: 'High Res (4K)', value: 'high' }
];

// --- CAMPAIGN CONFIGS ---

export const KENYAN_PARTIES: PoliticalParty[] = [
    { id: 'uda', name: 'UDA', fullName: 'United Democratic Alliance', symbol: 'Wheelbarrow', colors: 'Yellow and Green', hexColor: '#FFD700', defaultSlogan: 'Kazi ni Kazi' },
    { id: 'odm', name: 'ODM', fullName: 'Orange Democratic Movement', symbol: 'Orange', colors: 'Orange and White', hexColor: '#FFA500', defaultSlogan: 'Inawezekana' },
    { id: 'jubilee', name: 'Jubilee', fullName: 'Jubilee Party', symbol: 'Dove', colors: 'Red and White', hexColor: '#FF0000', defaultSlogan: 'Tuko Pamoja' },
    { id: 'wiper', name: 'Wiper', fullName: 'Wiper Democratic Movement', symbol: 'Umbrella', colors: 'Blue and White', hexColor: '#0000FF', defaultSlogan: 'One Kenya' },
    { id: 'walalahoi', name: 'Walalahoi', fullName: 'Walalahoi Party', symbol: 'Two Open Hands', colors: 'Red and Black', hexColor: '#D32F2F', defaultSlogan: 'The Walalahoi Alliance' }
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
    { name: 'PA System', prompt: 'roof mounted PA system with 4 big speakers, arranged to face all directions: one facing front, one facing back, one facing left, and one facing right', value: 'pa_system' },
    { name: 'Flag Mounts', prompt: 'political party flags mounted on hood', value: 'flags' },
    { name: 'Bullbar & Antenna', prompt: 'replace the entire front bumper with a heavy-duty black TM-equipped offroad bumper featuring a mounted long-range radio antenna', value: 'bullbar' },
    { name: 'Floodlights', prompt: 'roof mounted floodlights', value: 'lights' }
];

export const VALID_ASPECT_RATIOS = [
    { name: 'Landscape (16:9)', value: '16:9' },
    { name: 'Wide (4:3)', value: '4:3' },
    { name: 'Square (1:1)', value: '1:1' },
    { name: 'Tall (3:4)', value: '3:4' },
    { name: 'Portrait (9:16)', value: '9:16' }
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
        category: "Presidential & Corporate",
        styles: [
            { id: "presidential_classic", name: "The Oval Office", prompt: "Classic presidential aesthetics, deep navy blue background, serif typography (Times New Roman), gold accents, trustworthy and authoritative.", tags: ['classic', 'formal'] },
            { id: "corporate_blue", name: "Corporate Trust", prompt: "Modern corporate design, slate blue and grey palette, clean sans-serif fonts, structured grid, professional headshot integration.", tags: ['corporate'] },
            { id: "executive_slate", name: "Executive Slate", prompt: "Dark grey slate background, white bold text, minimalist layout, focus on leadership and stability.", tags: ['corporate'] },
            { id: "diplomat_white", name: "The Diplomat", prompt: "Clean white background, elegant black serif text, understated and sophisticated, high-end editorial feel.", tags: ['formal'] },
            { id: "statesman_gold", name: "Statesman Gold", prompt: "Rich gold and black theme, premium feel, laurel wreath motifs, traditional political branding.", tags: ['classic'] },
            { id: "modern_democrat", name: "Modern Democrat", prompt: "Bright blue and white, circular geometric motifs, Gotham font, optimistic and forward-looking.", tags: ['modern'] },
            { id: "conservative_red", name: "Conservative Red", prompt: "Bold red and navy, strong borders, traditional block layout, patriotic feel.", tags: ['classic'] },
            { id: "senate_floor", name: "Senate Floor", prompt: "Marble texture background, roman columns inspiration, dignified and legislative look.", tags: ['formal'] },
            { id: "fortune_500", name: "Fortune 500 CEO", prompt: "Aesthetic of a high-end business magazine cover, sharp focus, professional lighting, 'Man of the Year' vibes.", tags: ['corporate'] },
            { id: "trust_teal", name: "Trust Teal", prompt: "Teal and charcoal color scheme, approachable yet professional, modern medical or educational leadership vibe.", tags: ['modern'] }
        ]
    },
    {
        category: "Swiss & Minimalist",
        styles: [
            { id: "swiss_international", name: "Swiss International", prompt: "Swiss International Style, rigid grid system, Helvetica Bold, asymmetrical layout, massive negative space, red accent.", tags: ['minimalist'] },
            { id: "helvetica_hero", name: "Helvetica Hero", prompt: "Pure typography focus, massive black Helvetica font on white, candidate image cut-out interacting with text.", tags: ['minimalist'] },
            { id: "bauhaus_geo", name: "Bauhaus Geometric", prompt: "Bauhaus inspired, primary colors (red, blue, yellow), simple geometric shapes, clean lines, artistic minimalism.", tags: ['artistic'] },
            { id: "clean_slate", name: "Clean Slate", prompt: "Off-white background, thin dark grey text, ultra-minimalist, plenty of breathing room, sophisticated.", tags: ['minimalist'] },
            { id: "mono_type", name: "Monospaced", prompt: "Typewriter or code-style monospaced font, raw and honest aesthetic, black and white only.", tags: ['minimalist'] },
            { id: "mid_century_mod", name: "Mid-Century Poster", prompt: "1950s modernist poster style, muted pastel colors, simple shapes, retro-modern typography.", tags: ['retro'] },
            { id: "nordic_design", name: "Nordic Clean", prompt: "Scandinavian minimalism, cool grey tones, icy blue accents, sharp geometric lines.", tags: ['minimalist'] },
            { id: "architectural_grid", name: "Architectural Grid", prompt: "Blueprint style layout, fine white lines on blueprint blue, precise and structural.", tags: ['technical'] },
            { id: "gallery_wall", name: "Gallery Wall", prompt: "Museum exhibition poster style, large margins, elegant caption text, focus on the image as art.", tags: ['artistic'] },
            { id: "typographic_shout", name: "Typographic Shout", prompt: "Text fills the entire frame edge-to-edge, candidate image overlay with transparency modes, bold impact.", tags: ['bold'] }
        ]
    },
    {
        category: "Bold & Revolutionary",
        styles: [
            { id: "constructivist_red", name: "Constructivist Red", prompt: "Russian Constructivist art style, diagonal dynamic lines, red, black and cream colors, revolutionary energy.", tags: ['revolutionary'] },
            { id: "shepard_fairey", name: "Hope Style", prompt: "Iconic high-contrast stencil portrait style, red, beige, and light blue color palette, vector art look.", tags: ['artistic'] },
            { id: "impact_yellow", name: "Impact Yellow", prompt: "Hazard yellow background, massive black bold text, urgent and attention-grabbing, grassroots warning.", tags: ['urgent'] },
            { id: "street_stencil", name: "Street Stencil", prompt: "Spray paint stencil aesthetic, gritty texture, urban wall background, rebellious vibe.", tags: ['urban'] },
            { id: "propaganda_retro", name: "Retro Propaganda", prompt: "WPA poster style, sunrays in background, hero pose, optimistic looking up, vintage texture.", tags: ['retro'] },
            { id: "black_power", name: "Power & Fist", prompt: "High contrast black and white, red accents, strong fist iconography, bold slab serif fonts.", tags: ['revolutionary'] },
            { id: "punk_zine", name: "Punk Zine", prompt: "Cut-and-paste collage style, ransom note letters, photocopier texture, raw energy.", tags: ['urban'] },
            { id: "guerrilla_marketing", name: "Guerrilla Paste-Up", prompt: "Wheatpaste poster look, slightly torn edges, layered over other posters, urban street context.", tags: ['urban'] },
            { id: "industrial_revolution", name: "Industrial Strength", prompt: "Steel and rust textures, heavy blocky gears motifs, strong orange and grey, worker focused.", tags: ['industrial'] },
            { id: "blockbuster_movie", name: "Action Hero", prompt: "Action movie poster grading, teal and orange contrast, lens flares, dramatic clouds, cinematic text.", tags: ['cinematic'] }
        ]
    },
    {
        category: "Digital & Future",
        styles: [
            { id: "cyber_neon", name: "Cyber Neon", prompt: "Cyberpunk aesthetic, glowing neon pink and blue text, dark grid background, glitch effects.", tags: ['futuristic'] },
            { id: "glassmorphism_ui", name: "Glass UI", prompt: "Frosted glass panels, soft blurred colored orbs in background, white text, modern app interface look.", tags: ['tech'] },
            { id: "gradient_mesh", name: "Gradient Mesh", prompt: "Fluid liquid gradient background, vibrant purple, pink and blue blends, clean white typography.", tags: ['modern'] },
            { id: "tech_startup", name: "Tech Startup", prompt: "Silicon Valley startup branding, friendly rounded sans-serif, illustration style, vibrant flat colors.", tags: ['modern'] },
            { id: "data_stream", name: "Data Stream", prompt: "Matrix code rain or data visualization graphics in background, tech-focused, analytic vibe.", tags: ['tech'] },
            { id: "holographic_foil", name: "Holographic Foil", prompt: "Iridescent holographic metal texture background, silver text, futuristic luxury.", tags: ['futuristic'] },
            { id: "metaverse_avatar", name: "Metaverse", prompt: "3D rendered style environment, smooth plastic textures, vibrant virtual world lighting.", tags: ['futuristic'] },
            { id: "solar_punk", name: "Solar Punk", prompt: "Green technology aesthetic, plants mixed with futuristic glass buildings, bright sunlight, optimistic future.", tags: ['eco'] },
            { id: "social_story", name: "Viral Story", prompt: "Instagram Story aesthetic, stickers, emojis, gradient background, vertical layout focused.", tags: ['social'] },
            { id: "dark_mode_app", name: "Dark Mode App", prompt: "Matte black interface, vibrant accent buttons, clean iOS style typography.", tags: ['tech'] }
        ]
    },
    {
        category: "Artistic & Expressive",
        styles: [
            { id: "oil_painting", name: "Presidential Portrait", prompt: "Classic oil painting style, visible brushstrokes, canvas texture, dignified and timeless.", tags: ['artistic'] },
            { id: "watercolor_splash", name: "Watercolor Hope", prompt: "Soft watercolor splashes in background, artistic and gentle, bleeding ink edges, dreamy.", tags: ['artistic'] },
            { id: "comic_book_hero", name: "Comic Hero", prompt: "Halftone dot pattern, thick black outlines, speech bubbles, vibrant primary colors.", tags: ['fun'] },
            { id: "collage_art", name: "Mixed Media Collage", prompt: "Artistic collage of vintage photos, torn paper, and paint strokes, eclectic and creative.", tags: ['artistic'] },
            { id: "double_exposure", name: "Double Exposure", prompt: "Double exposure effect, candidate silhouette filled with city skyline or crowd of people.", tags: ['artistic'] },
            { id: "pencil_sketch", name: "Charcoal Sketch", prompt: "Black and white charcoal sketch, rough paper texture, hand-drawn typography.", tags: ['artistic'] },
            { id: "pop_art_warhol", name: "Warhol Pop", prompt: "Andy Warhol style, four-panel repetition (if possible) or vibrant unnatural colors, high contrast.", tags: ['artistic'] },
            { id: "art_deco", name: "Art Deco Great Gatsby", prompt: "Gold geometric patterns on black, intricate borders, luxury 1920s font.", tags: ['retro'] },
            { id: "graffiti_mural", name: "City Mural", prompt: "Large scale wall mural look, vibrant spray paint colors, urban community feel.", tags: ['urban'] },
            { id: "paper_cutout", name: "Paper Cutout", prompt: "Layered paper craft style, depth and shadows, flat colors, playful and tactile.", tags: ['craft'] }
        ]
    },
    {
        category: "Grassroots & Community",
        styles: [
            { id: "organic_green", name: "Organic Roots", prompt: "Natural earth tones, kraft paper texture, green leaf motifs, eco-friendly vibe.", tags: ['eco'] },
            { id: "community_chalkboard", name: "Chalkboard", prompt: "Green chalkboard background, white chalk typography, hand-drawn doodles, educational vibe.", tags: ['community'] },
            { id: "polaroid_cluster", name: "Polaroid Wall", prompt: "Candidate photo looks like a pinned polaroid, corkboard background, approachable and nostalgic.", tags: ['casual'] },
            { id: "farmers_market", name: "Farmers Market", prompt: "Rustic wood texture, hand-painted sign style, warm and welcoming.", tags: ['rustic'] },
            { id: "union_strong", name: "Union Strong", prompt: "Solid blue background, white block text, gear icons, solidarity styling.", tags: ['community'] },
            { id: "volunteer_vest", name: "Volunteer Vest", prompt: "Bright neon orange or yellow safety vest aesthetic, reflective strips, 'At Work' vibe.", tags: ['community'] },
            { id: "town_hall", name: "Town Hall Flyer", prompt: "Simple flyer aesthetic, photocopied look on colored paper, very local and direct.", tags: ['local'] },
            { id: "unity_hands", name: "Unity Hands", prompt: "Illustration of diverse hands holding up the candidate or text, community support focus.", tags: ['community'] },
            { id: "sunrise_hope", name: "Sunrise Hope", prompt: "Warm sunrise gradient (orange to yellow), silhouette of landscape, inspirational.", tags: ['hope'] },
            { id: "blueprint_future", name: "Blueprint for Future", prompt: "Literal blueprint background, white lines, 'Plan for the City' text overlay.", tags: ['technical'] }
        ]
    },
    {
        category: "Texture & Material",
        styles: [
            { id: "denim_jeans", name: "Denim & Stitch", prompt: "Dark blue denim texture background, white stitched text, working class appeal.", tags: ['texture'] },
            { id: "leather_gold", name: "Leather & Gold", prompt: "Black leather texture background with embossed gold foil text, luxury and tough.", tags: ['texture'] },
            { id: "concrete_urban", name: "Urban Concrete", prompt: "Grey concrete wall texture, spray painted text, brutalist and strong.", tags: ['texture'] },
            { id: "linen_paper", name: "Fine Linen", prompt: "High quality linen paper texture, elegant serif text, invitation style.", tags: ['texture'] },
            { id: "corrugated_metal", name: "Corrugated Metal", prompt: "Silver corrugated metal background, industrial bold text, manufacturing vibe.", tags: ['industrial'] },
            { id: "cork_board", name: "Notice Board", prompt: "Cork texture, pinned notes style, community information vibe.", tags: ['casual'] },
            { id: "fabric_flag", name: "Waving Flag", prompt: "Texture of a waving fabric flag, patriotic colors, dynamic folds.", tags: ['texture'] },
            { id: "sand_beach", name: "Coastal Sand", prompt: "Sand texture, written in sand style or breezy coastal colors, tourism vibe.", tags: ['nature'] },
            { id: "chalk_pavement", name: "Pavement Chalk", prompt: "Asphalt texture, colorful chalk drawings and text, playful and temporary.", tags: ['urban'] },
            { id: "old_newsprint", name: "Vintage Newspaper", prompt: "Yellowed vintage newspaper texture background, headline typography.", tags: ['retro'] }
        ]
    },
    {
        category: "Global & Cultural",
        styles: [
            { id: "pan_african", name: "Pan-African", prompt: "Red, black, and green color scheme, geometric tribal patterns, bold and empowering.", tags: ['cultural'] },
            { id: "asian_modern", name: "Asian Modern", prompt: "Red and gold palette, vertical typography alignment, minimal circular motifs.", tags: ['cultural'] },
            { id: "latin_fiesta", name: "Latin Vibrance", prompt: "Bright turquoise, yellow, and pink, festive energy, dynamic curved shapes.", tags: ['cultural'] },
            { id: "nordic_wood", name: "Scandi Wood", prompt: "Light blonde wood texture, white minimalism, simple nature motifs.", tags: ['cultural'] },
            { id: "middle_eastern_geo", name: "Islamic Geometric", prompt: "Intricate geometric tessellations in gold and azure, elegant calligraphy style fonts.", tags: ['cultural'] },
            { id: "indian_festive", name: "Indian Festive", prompt: "Vibrant marigold orange and fuchsia, mandala patterns, celebratory feel.", tags: ['cultural'] },
            { id: "indigenous_art", name: "Indigenous Earth", prompt: "Earth tones (ochre, rust, clay), dot painting or traditional line art motifs.", tags: ['cultural'] },
            { id: "caribbean_breeze", name: "Caribbean Breeze", prompt: "Aquamarine and sunny yellow, palm leaf shadows, relaxed and warm.", tags: ['cultural'] },
            { id: "slavic_folk", name: "Slavic Folk", prompt: "Red and white floral embroidery patterns, traditional font style.", tags: ['cultural'] },
            { id: "celtic_knot", name: "Celtic Heritage", prompt: "Green background, intricate Celtic knotwork borders, serif typeface.", tags: ['cultural'] }
        ]
    },
    {
        category: "Monochrome & Noir",
        styles: [
            { id: "noir_film", name: "Film Noir", prompt: "High contrast black and white, dramatic shadows, venetian blind lighting shadows, mystery.", tags: ['cinematic'] },
            { id: "silver_screen", name: "Silver Screen", prompt: "Soft glowing silver black and white, glamorous 1940s Hollywood lighting.", tags: ['cinematic'] },
            { id: "ink_blot", name: "Ink Blot", prompt: "Stark white background with exploding black ink effects, Rorschach style.", tags: ['artistic'] },
            { id: "newspaper_headline", name: "Front Page", prompt: "Simulates a newspaper front page layout, halftone photo, bold headline text.", tags: ['classic'] },
            { id: "silhouette_city", name: "City Silhouette", prompt: "Black silhouette of city skyline against a white or grey sky, clean and urban.", tags: ['urban'] },
            { id: "minimal_dark", name: "Dark Minimalist", prompt: "Matte black background, dark grey text (low contrast), mysterious and sleek.", tags: ['modern'] },
            { id: "minimal_light", name: "High Key", prompt: "Blown out white background, high key lighting, ethereal and pure.", tags: ['modern'] },
            { id: "carbon_fiber", name: "Carbon Fiber", prompt: "Black carbon fiber weave texture, techy and sporty.", tags: ['texture'] },
            { id: "graphite_drawing", name: "Graphite", prompt: "Soft grey graphite shading, pencil texture, artistic realism.", tags: ['artistic'] },
            { id: "sin_city", name: "Sin City Style", prompt: "Black and white high contrast with a single color isolation (e.g., red tie).", tags: ['cinematic'] }
        ]
    },
    {
        category: "Typography Focused",
        styles: [
            { id: "big_bold_type", name: "Big Bold Type", prompt: "Text is the main image, letters cropped by frame, massive impact.", tags: ['bold'] },
            { id: "serif_elegance", name: "Serif Elegance", prompt: "High-contrast serif font (Didot/Bodoni), editorial fashion magazine layout.", tags: ['fashion'] },
            { id: "script_signature", name: "Signature Script", prompt: "Focus on a handwritten signature style logo, personal and authentic.", tags: ['personal'] },
            { id: "vertical_type", name: "Vertical Type", prompt: "Typography running vertically up the side, modern art poster vibe.", tags: ['modern'] },
            { id: "outline_stroke", name: "Outline Stroke", prompt: "Transparent text with thick colored outlines, overlapping image.", tags: ['modern'] },
            { id: "3d_typography", name: "3D Typography", prompt: "Text rendered in 3D with shadows and depth, popping off the page.", tags: ['tech'] },
            { id: "kinetic_type", name: "Kinetic Motion", prompt: "Blurred motion text effect, sense of speed and movement.", tags: ['dynamic'] },
            { id: "retro_future_type", name: "Retro Future Type", prompt: "Chrome gradient text, 80s grid background, synthwave font.", tags: ['retro'] },
            { id: "grunge_type", name: "Grunge Type", prompt: "Distressed, eroded font style, gritty background, alternative vibe.", tags: ['urban'] },
            { id: "minimal_sans", name: "Minimal Sans", prompt: "Tiny, widely spaced sans-serif text, surrounded by vast empty space.", tags: ['minimalist'] }
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
    category: 'Royal & Ceremonial',
    styles: [
        { id: 'prince_ceremonial', name: 'Prince Ceremonial', prompt: 'a regal ceremonial prince uniform inspired by European royalty, featuring a high-collar tunic with gold embroidery, epaulettes, a sash across the chest, and medals', tags: ['royal', 'formal', 'costume'] },
        { id: 'military_general', name: 'Military General', prompt: 'a highly decorated military general dress uniform, olive drab or dark blue, with a chest full of ribbons and medals, gold shoulder boards, and a peaked cap', tags: ['military', 'uniform', 'authority'] },
        { id: 'grand_marshal', name: 'Grand Marshal', prompt: 'an ornate military ceremonial uniform with excessive gold embroidery, a sash, and a high collar, authoritative style', tags: ['military', 'regal', 'costume'] },
        { id: 'admiral_white', name: 'Naval Admiral', prompt: 'a pristine white naval dress uniform with gold shoulder boards and a peaked cap', tags: ['military', 'uniform', 'white'] }
    ]
  },
  {
  category: 'Paramilitary & Combat Wear',
  styles: [
    // 1
    { id: 'tactical-black-ops', name: 'Tactical Black Ops', 
      prompt: 'full black tactical uniform with MOLLE vest, reinforced combat pants, black gloves and balaclava', 
      tags: ['combat', 'tactical', 'black-ops'] },

    // 2
    { id: 'urban-swat', name: 'Urban SWAT Gear', 
      prompt: 'SWAT-style uniform with dark navy tactical vest, elbow pads, knee pads, and utility belt', 
      tags: ['swat', 'urban', 'tactical'] },

    // 3
    { id: 'desert-camo', name: 'Desert Camo Soldier', 
      prompt: 'desert camouflage uniform with tan combat boots and tactical backpack', 
      tags: ['desert', 'military', 'combat'] },

    // 4
    { id: 'jungle-camo', name: 'Jungle Camo', 
      prompt: 'green jungle camouflage with leaf-pattern ghillie elements and heavy-duty boots', 
      tags: ['jungle', 'camouflage', 'sniper'] },

    // 5
    { id: 'ghillie-sniper', name: 'Ghillie Sniper Suit', 
      prompt: 'full-body ghillie suit with natural foliage textures for stealth operations', 
      tags: ['sniper', 'stealth', 'forest'] },

    // 6
    { id: 'navy-seal', name: 'Navy SEAL Gear', 
      prompt: 'navy seal combat uniform with amphibious gear and tactical vest', 
      tags: ['navy-seal', 'elite', 'combat'] },

    // 7
    { id: 'marine-corps', name: 'Marine Corps Combat', 
      prompt: 'US marine corps digital camo uniform with plate carrier', 
      tags: ['marine', 'us-military', 'combat'] },

    // 8
    { id: 'airborne-paratrooper', name: 'Airborne Paratrooper', 
      prompt: 'airborne paratrooper gear with harness, helmet, and tactical uniform', 
      tags: ['airborne', 'paratrooper', 'military'] },

    // 9
    { id: 'royal-commandos', name: 'Royal Commandos', 
      prompt: 'UK commando uniform with beret, utility vest and tactical boots', 
      tags: ['uk', 'commandos', 'military'] },

    // 10
    { id: 'ranger-green', name: 'US Ranger Green', 
      prompt: 'ranger green tactical uniform with minimalistic chest rig', 
      tags: ['ranger', 'us-army', 'tactical'] },

    // 11
    { id: 'armored-riot-police', name: 'Armored Riot Police', 
      prompt: 'riot police armor with heavy padding, transparent shield and baton', 
      tags: ['riot', 'police', 'armor'] },

    // 12
    { id: 'winter-whiteout', name: 'Winter Whiteout Camo', 
      prompt: 'snow camouflage uniform with thermal jacket and white balaclava', 
      tags: ['winter', 'snow', 'camo'] },

    // 13
    { id: 'spec-ops-grey', name: 'Special Ops Grey', 
      prompt: 'matte grey tactical gear with drop-leg holster and reinforced boots', 
      tags: ['special-ops', 'tactical', 'combat'] },

    // 14
    { id: 'hostage-rescue', name: 'Hostage Rescue Team', 
      prompt: 'HRT-style uniform with tactical helmet, visor and sleek black gear', 
      tags: ['HRT', 'swat', 'elite'] },

    // 15
    { id: 'pilot-flight-suit', name: 'Military Flight Suit', 
      prompt: 'green aviation flight suit with chest pockets and flight gloves', 
      tags: ['pilot', 'aviation', 'military'] },

    // 16
    { id: 'tank-crew', name: 'Tank Crew Suit', 
      prompt: 'fire-resistant tank crew coverall with padded helmet', 
      tags: ['tank', 'crew', 'military'] },

    // 17
    { id: 'naval-uniform', name: 'Naval Operations Uniform', 
      prompt: 'navy blue maritime tactical outfit with waterproof boots', 
      tags: ['navy', 'water', 'tactical'] },

    // 18
    { id: 'anti-poaching-unit', name: 'Anti-Poaching Tactical', 
      prompt: 'rugged African bush tactical uniform with khaki camo and ranger vest', 
      tags: ['ranger', 'africa', 'conservation'] },

    // 19
    { id: 'border-patrol', name: 'Border Patrol Unit', 
      prompt: 'dark green tactical outfit with patrol patches and combat boots', 
      tags: ['border', 'patrol', 'tactical'] },

    // 20
    { id: 'undercover-tactical', name: 'Undercover Tactical', 
      prompt: 'casual civilian clothing layered with concealed tactical gear', 
      tags: ['undercover', 'covert', 'tactical'] },

    // 21
    { id: 'riot-gear-light', name: 'Light Riot Gear', 
      prompt: 'lightweight riot uniform with flexible armor and helmet', 
      tags: ['riot', 'police', 'urban'] },

    // 22
    { id: 'mountain-trooper', name: 'Mountain Trooper', 
      prompt: 'cold-weather climbing uniform with reinforced knees and tactical parka', 
      tags: ['mountain', 'snow', 'elite'] },

    // 23
    { id: 'jungle-guerilla', name: 'Jungle Guerilla Outfit', 
      prompt: 'lightweight guerilla-style uniform with green fatigues and bandana', 
      tags: ['guerilla', 'jungle', 'combat'] },

    // 24
    { id: 'cyber-tactical', name: 'Cyber Tactical Suit', 
      prompt: 'futuristic tactical suit with armored plates and neon accents', 
      tags: ['futuristic', 'tactical', 'sci-fi'] },

    // 25
    { id: 'mercenary-style', name: 'Private Military Contractor', 
      prompt: 'PMC outfit with tan cargo pants, plate carrier and baseball cap', 
      tags: ['pmc', 'contractor', 'tactical'] },

    // 26
    { id: 'desert-operator', name: 'Desert Operator', 
      prompt: 'tan tactical uniform with dust goggles and reinforced gloves', 
      tags: ['desert', 'operator', 'military'] },

    // 27
    { id: 'forest-ranger', name: 'Forest Ranger Tactical', 
      prompt: 'deep green ranger uniform with practical gear for forest operations', 
      tags: ['forest', 'ranger', 'conservation'] },

    // 28
    { id: 'motorized-infantry', name: 'Motorized Infantry', 
      prompt: 'combat uniform with armored vest and helmet suited for vehicle crews', 
      tags: ['infantry', 'military', 'armor'] },

    // 29
    { id: 'black-urban-ops', name: 'Black Urban Ops', 
      prompt: 'sleek black uniform with urban tactical vest and combat gloves', 
      tags: ['urban', 'stealth', 'black-ops'] },

    // 30
    { id: 'peacekeeping-blue', name: 'UN Peacekeeping Blue', 
      prompt: 'UN peacekeeping sky-blue beret, vest and uniform', 
      tags: ['un', 'peacekeeping', 'military'] },

    // 31
    { id: 'anti-terror-unit', name: 'Anti-Terror Unit', 
      prompt: 'elite anti-terror uniform with heavy armor and tactical helmet', 
      tags: ['anti-terror', 'elite', 'tactical'] },

    // 32
    { id: 'high-altitude-soldier', name: 'High Altitude Gear', 
      prompt: 'oxygen-ready combat suit with insulated layers for extreme altitudes', 
      tags: ['altitude', 'snow', 'military'] },

    // 33
    { id: 'stealth-night-ops', name: 'Night Stealth Ops', 
      prompt: 'night camouflage uniform with blackout gear and NVG mount', 
      tags: ['night', 'stealth', 'elite'] },

    // 34
    { id: 'armored-explosive-tech', name: 'Explosive Ordnance Suit', 
      prompt: 'heavy bomb-disposal armored suit with reinforced plating', 
      tags: ['bomb', 'EOD', 'armor'] },

    // 35
    { id: 'tactical-civilian', name: 'Tactical Civilian Wear', 
      prompt: 'civilian clothing upgraded with tactical pockets and covert vest', 
      tags: ['covert', 'civilian', 'tactical'] },

    // 36
    { id: 'airforce-blue', name: 'Air Force Combat Uniform', 
      prompt: 'airforce blue camouflage with flight-ready gear', 
      tags: ['airforce', 'military', 'camo'] },

    // 37
    { id: 'wildlands-operator', name: 'Wildlands Operator', 
      prompt: 'outdoor tactical uniform for rugged terrains with hydration pack', 
      tags: ['outdoor', 'terrain', 'tactical'] },

    // 38
    { id: 'contractor-black', name: 'Black Contractor Fit', 
      prompt: 'PMC black uniform with plate carrier and tactical gloves', 
      tags: ['pmc', 'black', 'tactical'] },

    // 39
    { id: 'police-k9-unit', name: 'K9 Tactical Handler', 
      prompt: 'police K9 handler tactical uniform with padded sleeves', 
      tags: ['k9', 'police', 'tactical'] },

    // 40
    { id: 'rapid-response', name: 'Rapid Response Unit', 
      prompt: 'light, fast-response tactical uniform with soft armor', 
      tags: ['rapid', 'urban', 'tactical'] },

    // 41
    { id: 'border-scout', name: 'Border Scout Uniform', 
      prompt: 'camouflage field scout uniform with binocular harness', 
      tags: ['scout', 'border', 'field'] },

    // 42
    { id: 'field-medic', name: 'Combat Medic Uniform', 
      prompt: 'combat medic tactical outfit with medical patches and bag', 
      tags: ['medic', 'combat', 'tactical'] },

    // 43
    { id: 'PMC-tan', name: 'PMC Desert Tan', 
      prompt: 'private contractor desert tan uniform and tactical sunglasses', 
      tags: ['contractor', 'desert', 'tactical'] },

    // 44
    { id: 'parade-military', name: 'Military Parade Dress', 
      prompt: 'ceremonial military outfit with medals and highly polished boots', 
      tags: ['ceremony', 'uniform', 'formal'] },

    // 45
    { id: 'royal-guard', name: 'Royal Guard Uniform', 
      prompt: 'elite royal guard combat uniform with beret', 
      tags: ['royal', 'elite', 'guard'] },

    // 46
    { id: 'armor-lightweight', name: 'Light Tactical Armor', 
      prompt: 'light armor plates with breathable combat shirt and modular vest', 
      tags: ['armor', 'lightweight', 'tactical'] },

    // 47
    { id: 'special-police', name: 'Special Police Taskforce', 
      prompt: 'special police tactical uniform with minimal design', 
      tags: ['police', 'special', 'tactical'] },

    // 48
    { id: 'night-patrol', name: 'Night Patrol', 
      prompt: 'dark tactical uniform with reflective stripes for patrol duties', 
      tags: ['patrol', 'night', 'police'] },

    // 49
    { id: 'covert-ops', name: 'Deep Covert Ops', 
      prompt: 'all-black minimal gear with concealed weapons', 
      tags: ['covert', 'black-ops', 'stealth'] },

    // 50
    { id: 'marine-diver', name: 'Combat Diver Suit', 
      prompt: 'marine amphibious diving suit with tactical fins and waterproof kit', 
      tags: ['diver', 'marine', 'water'] },

    // 51
    { id: 'anti-drug-unit', name: 'Anti-Narcotics Unit', 
      prompt: 'dark green tactical uniform with anti-drug patches', 
      tags: ['narcotics', 'police', 'tactical'] },

    // 52
    { id: 'wildlife-patrol', name: 'Wildlife Protection Officer', 
      prompt: 'khaki outfit with chest rig for field patrols', 
      tags: ['wildlife', 'ranger', 'field'] },

    // 53
    { id: 'black-ops-armored', name: 'Armored Black Ops', 
      prompt: 'heavily armored black ops suit with tactical helmet and plates', 
      tags: ['armor', 'elite', 'tactical'] },

    // 54
    { id: 'special-recon', name: 'Recon Operator', 
      prompt: 'stealth-focused recon uniform with minimal loadout', 
      tags: ['recon', 'stealth', 'elite'] },

    // 55
    { id: 'PMC-jungle', name: 'PMC Jungle Gear', 
      prompt: 'contractor style with green fatigues and tactical cap', 
      tags: ['jungle', 'pmc', 'combat'] },

    // 56
    { id: 'rural-patrol', name: 'Rural Patrol Officer', 
      prompt: 'khaki uniform with tactical elements designed for rural landscapes', 
      tags: ['rural', 'police', 'field'] },

    // 57
    { id: 'high-threat', name: 'High Threat Response', 
      prompt: 'heavy armor tactical suit for high-risk missions', 
      tags: ['armor', 'threat', 'tactical'] },

    // 58
    { id: 'special-mountain', name: 'Special Mountain Ops', 
      prompt: 'mountain combat gear with climbing harness and camo jacket', 
      tags: ['mountain', 'elite', 'tactical'] },

    // 59
    { id: 'PMC-blackout', name: 'PMC Night Blackout', 
      prompt: 'contractor black tactical outfit optimized for night missions', 
      tags: ['pmc', 'night', 'stealth'] },

    // 60
    { id: 'tactical-athleisure', name: 'Tactical Athleisure', 
      prompt: 'sporty clothing mixed with tactical pockets and covert belts', 
      tags: ['civilian', 'athletic', 'tactical'] },

    // 61
    { id: 'stealth-camo-grey', name: 'Stealth Grey Camo', 
      prompt: 'urban grey camouflage uniform for city operations', 
      tags: ['urban', 'camo', 'stealth'] }
  ]
},

  {
    category: 'Western Classics',
    styles: [
        { id: 'grey-three-piece-suit', name: 'Grey Three-Piece Suit', prompt: 'a tailored grey three-piece suit with matching vest and a sleek tie', tags: ['formal', 'classic', 'business'] },
        { id: 'brown-three-piece-suit', name: 'Brown Three-Piece Suit', prompt: 'a vintage brown three-piece suit with a patterned tie and polished shoes', tags: ['vintage', 'classic', 'formal'] },
        { id: 'tan-suit', name: 'Tan Suit', prompt: 'a light tan suit with a white shirt and brown leather shoes for a modern classic look', tags: ['modern', 'classic', 'business'] },
        { id: 'midnight-blue-suit', name: 'Midnight Blue Suit', prompt: 'a luxurious midnight blue suit with a black satin tie', tags: ['formal', 'classic', 'event'] },
        { id: 'charcoal-business-suit', name: 'Charcoal Business Suit', prompt: 'a sharp charcoal business suit ideal for corporate settings', tags: ['business', 'formal'] },
        { id: 'light-grey-summer-suit', name: 'Light Grey Summer Suit', prompt: 'a breathable light grey suit perfect for summer events', tags: ['summer', 'classic', 'event'] },
        { id: 'khaki-smart-casual', name: 'Khaki Smart Casual', prompt: 'a khaki blazer with navy chinos and loafers', tags: ['casual', 'classic', 'everyday'] },
        { id: 'camel-coat-style', name: 'Camel Coat Look', prompt: 'a stylish camel long coat over a turtleneck and trousers', tags: ['classic', 'winter', 'fashion'] },
        { id: 'navy-blazer-jeans', name: 'Navy Blazer + Jeans', prompt: 'a timeless navy blazer paired with denim jeans and a white button-down shirt', tags: ['smart-casual', 'classic', 'everyday'] },
        { id: 'oxford-shirt-look', name: 'Oxford Shirt Look', prompt: 'a crisp blue Oxford shirt tucked into tailored chinos', tags: ['classic', 'everyday', 'casual'] },
        { id: 'white-oxford-suit', name: 'White Oxford Suit', prompt: 'a clean white oxford cloth suit perfect for sunny outdoor events', tags: ['formal', 'classic'] },
        { id: 'black-shirt-suit', name: 'Black Shirt Suit', prompt: 'a bold black shirt paired with a fitted grey suit', tags: ['modern', 'stylish', 'event'] },
        { id: 'burgundy-suit', name: 'Burgundy Suit', prompt: 'a deep burgundy slim-fit suit for elegant events', tags: ['formal', 'event', 'classic'] },
        { id: 'olive-green-suit', name: 'Olive Green Suit', prompt: 'a unique olive green suit styled with brown leather accessories', tags: ['classic', 'modern', 'fashion'] },
        { id: 'cream-linen-suit', name: 'Cream Linen Suit', prompt: 'a lightweight cream linen suit perfect for summer weddings', tags: ['summer', 'wedding', 'classic'] },
        { id: 'linen-blazer-chinos', name: 'Linen Blazer + Chinos', prompt: 'a soft linen blazer paired with tailored chinos and loafers', tags: ['summer', 'casual', 'classic'] },
        { id: 'herringbone-blazer', name: 'Herringbone Blazer', prompt: 'a vintage herringbone blazer styled with a turtleneck', tags: ['vintage', 'classic', 'winter'] },
        { id: 'houndstooth-suit', name: 'Houndstooth Suit', prompt: 'a patterned houndstooth suit for a strong vintage aesthetic', tags: ['vintage', 'formal'] },
        { id: 'glenn-plaid-suit', name: 'Glenn Plaid Suit', prompt: 'a glenn plaid patterned suit with classic wide lapels', tags: ['classic', 'vintage', 'business'] },
        { id: 'windowpane-suit', name: 'Windowpane Suit', prompt: 'a bold windowpane check suit with complementary tie', tags: ['classic', 'fashion', 'formal'] },
        { id: 'rust-suit', name: 'Rust Suit', prompt: 'a modern rust-colored suit perfect for fashion-forward men', tags: ['modern', 'event'] },
        { id: 'light-blue-suit', name: 'Light Blue Suit', prompt: 'a soft pastel blue suit suitable for daytime events', tags: ['formal', 'event'] },
        { id: 'forest-green-suit', name: 'Forest Green Suit', prompt: 'a deep forest green formal suit with gold accents', tags: ['event', 'classic'] },
        { id: 'all-black-outfit', name: 'All Black Outfit', prompt: 'a sleek all-black outfit with a black turtleneck and coat', tags: ['modern', 'fashion', 'everyday'] },
        { id: 'black-turtleneck-blazer', name: 'Black Turtleneck + Blazer', prompt: 'a premium black turtleneck layered under a fitted black blazer', tags: ['winter', 'classic'] },
        { id: 'trench-coat-classic', name: 'Trench Coat Classic', prompt: 'a beige trench coat over a suit for a London gentleman style', tags: ['classic', 'formal'] },
        { id: 'peacoat-style', name: 'Peacoat Style', prompt: 'a navy peacoat layered over a sweater', tags: ['winter', 'classic'] },
        { id: 'black-overcoat-suit', name: 'Black Overcoat Suit', prompt: 'a long black overcoat layered over a tailored suit', tags: ['formal', 'winter'] },
        { id: 'brown-overcoat', name: 'Brown Overcoat', prompt: 'a rich brown overcoat worn with a grey turtleneck and slacks', tags: ['classic', 'winter'] },
        { id: 'lightweight-blazer', name: 'Lightweight Blazer', prompt: 'a soft unstructured blazer for everyday casual elegance', tags: ['casual', 'modern'] },
        { id: 'navy-cardigan-look', name: 'Navy Cardigan Layered Look', prompt: 'a navy cardigan layered over a button-down shirt', tags: ['classic', 'casual'] },
        { id: 'white-shirt-jeans', name: 'White Shirt + Jeans', prompt: 'a crisp white shirt tucked into blue jeans with a belt', tags: ['classic', 'everyday'] },
        { id: 'polo-shirt-chinos', name: 'Polo Shirt + Chinos', prompt: 'a fitted polo shirt with chinos for a casual classic look', tags: ['casual', 'everyday'] },
        { id: 'turtleneck-coat', name: 'Turtleneck + Coat', prompt: 'a dark turtleneck under a heavy wool coat', tags: ['winter', 'classic'] },
        { id: 'blue-blazer-khaki', name: 'Blue Blazer + Khaki', prompt: 'a navy blazer worn with khaki trousers', tags: ['smart-casual', 'classic'] },
        { id: 'casual-suit-no-tie', name: 'Casual Suit No Tie', prompt: 'a relaxed-fit suit worn with no tie and loafers', tags: ['casual', 'classic'] },
        { id: 'loafers-chinos', name: 'Loafers + Chinos', prompt: 'brown loafers worn with chinos and a button-down shirt', tags: ['everyday', 'classic'] },
        { id: 'formal-waistcoat-look', name: 'Formal Waistcoat Look', prompt: 'a waistcoat paired with a crisp shirt and trousers', tags: ['formal', 'classic'] },
        { id: 'blue-pinstripe-modern', name: 'Blue Pinstripe Modern', prompt: 'a modern slim pinstripe suit with wide lapels', tags: ['business', 'classic'] },
        { id: 'corduroy-blazer', name: 'Corduroy Blazer', prompt: 'a vintage corduroy blazer paired with dark trousers', tags: ['vintage', 'classic'] },
        { id: 'tweed-blazer-casual', name: 'Tweed Blazer Casual', prompt: 'a tweed blazer worn with jeans and a turtleneck', tags: ['vintage', 'classic'] },
        { id: 'chocolate-brown-suit', name: 'Chocolate Brown Suit', prompt: 'a rich chocolate brown suit with a matching tie', tags: ['formal', 'classic'] },
        { id: 'executive-navy-suit', name: 'Executive Navy Suit', prompt: 'a powerful executive navy blue suit', tags: ['business', 'formal'] },
        { id: 'white-casual-linen', name: 'White Casual Linen', prompt: 'a white linen shirt tucked into beige trousers', tags: ['summer', 'casual'] },
        { id: 'checked-sport-coat', name: 'Checked Sport Coat', prompt: 'a check-pattern sport coat with dark jeans', tags: ['smart-casual', 'classic'] },
        { id: 'business-travel-look', name: 'Business Travel Look', prompt: 'a tailored blazer worn with a turtleneck and travel trousers', tags: ['business', 'modern'] },
        { id: 'vintage-70s-suit', name: 'Vintage 70s Suit', prompt: 'a retro 1970s-style suit with wide lapels and earth tones', tags: ['vintage', 'classic'] }
    ]
  },
  {
    category: 'Rugged & Street',
    styles: [
        { id: 'brown-leather-jacket', name: 'Brown Leather Jacket', prompt: 'a rugged brown leather jacket over a white tee and jeans', tags: ['casual', 'classic', 'everyday'] },
        { id: 'denim-jacket-style', name: 'Denim Jacket Style', prompt: 'a denim jacket worn over a flannel shirt and black jeans', tags: ['casual', 'classic'] },
        { id: 'bomber-jacket-look', name: 'Bomber Jacket Look', prompt: 'a modern bomber jacket styled with fitted trousers', tags: ['casual', 'modern'] },
        { id: 'rugged-workwear', name: 'Rugged Workwear', prompt: 'a workwear jacket paired with denim and boots', tags: ['casual', 'vintage'] },
        { id: 'western-denim-shirt', name: 'Western Denim Shirt', prompt: 'a snap-button denim shirt styled with boots', tags: ['casual', 'western'] },
        { id: 'lumberjack-plaid', name: 'Lumberjack Plaid', prompt: 'a red plaid flannel shirt with rugged jeans', tags: ['casual', 'classic'] },
        { id: 'safari-jacket-style', name: 'Safari Jacket Style', prompt: 'a beige safari jacket with earth-tone trousers', tags: ['classic', 'outdoors'] },
        { id: 'western-boots-outfit', name: 'Western Boots Outfit', prompt: 'a western outfit featuring cowboy boots and denim', tags: ['western', 'casual'] }
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
        category: "Racing Specs",
        styles: [
            { id: "wrc_rally", name: "WRC Rally Spec", prompt: "Full WRC rally specification, mud flaps, roof scoop, white rally wheels, roll cage, aggressive aero", tags: ["rally", "racing"] },
            { id: "drift_missile", name: "Drift Missile", prompt: "Drift missile style, exposed intercooler, zip ties, mismatched panels, extreme lowered stance, negative camber", tags: ["drift", "street"] },
            { id: "drag_strip", name: "Drag Strip Beast", prompt: "Drag racing setup, massive rear slick tires, skinny front runner wheels, parachute pack on rear", tags: ["drag", "racing"] }
        ]
    },
    {
        category: "Street Culture",
        styles: [
            { id: "midnight_racer", name: "Midnight Racer", prompt: "Japanese highway racer style (Wangan), dark tint, large wing, underglow, clean street look", tags: ["street", "jdm"] },
            { id: "vip_style", name: "VIP Style (Bippu)", prompt: "Japanese VIP style, deep black paint, extreme lowering, deep dish wheels, curtains in windows, luxury stance", tags: ["luxury", "stance"] },
            { id: "lowrider", name: "Classic Lowrider", prompt: "Custom hydraulic suspension lowrider, vibrant candy paint with pinstriping, wire wheels with whitewall tires, chrome plating", tags: ["classic", "lowrider"] }
        ]
    },
    {
        category: "Super Gloss Colors",
        styles: [
            { id: "gloss_red", name: "Gloss Ferrari Red", prompt: "High gloss Rosso Corsa red paint", tags: ["gloss", "red"] },
            { id: "gloss_blue", name: "Gloss Deep Blue", prompt: "High gloss deep ocean blue paint", tags: ["gloss", "blue"] },
            { id: "gloss_white", name: "Gloss Arctic White", prompt: "High gloss arctic white paint", tags: ["gloss", "white"] },
            { id: "gloss_black", name: "Gloss Piano Black", prompt: "High gloss piano black paint", tags: ["gloss", "black"] },
            { id: "gloss_yellow", name: "Gloss Speed Yellow", prompt: "High gloss speed yellow paint", tags: ["gloss", "yellow"] },
            { id: "gloss_orange", name: "Gloss Sunset Orange", prompt: "High gloss sunset orange paint", tags: ["gloss", "orange"] },
            { id: "gloss_green", name: "Gloss British Racing Green", prompt: "High gloss British racing green paint", tags: ["gloss", "green"] },
            { id: "gloss_purple", name: "Gloss Royal Purple", prompt: "High gloss royal purple paint", tags: ["gloss", "purple"] },
            { id: "gloss_pink", name: "Gloss Hot Pink", prompt: "High gloss hot pink paint", tags: ["gloss", "pink"] },
            { id: "gloss_grey", name: "Gloss Nardo Grey", prompt: "High gloss Nardo grey paint", tags: ["gloss", "grey"] },
        ]
    },
    {
        category: "Matte & Satin",
        styles: [
            { id: "matte_black", name: "Stealth Matte Black", prompt: "Satin matte black vinyl wrap, stealth look", tags: ["matte", "black"] },
            { id: "matte_white", name: "Matte Frozen White", prompt: "Satin matte frozen white vinyl wrap", tags: ["matte", "white"] },
            { id: "matte_military", name: "Matte Military Green", prompt: "Matte olive drab military green paint", tags: ["matte", "green"] },
            { id: "satin_grey", name: "Satin Dark Grey", prompt: "Satin dark gunmetal grey wrap", tags: ["satin", "grey"] },
            { id: "matte_blue", name: "Matte Electric Blue", prompt: "Matte electric blue vinyl wrap", tags: ["matte", "blue"] },
            { id: "matte_red", name: "Matte Crimson Red", prompt: "Matte crimson red vinyl wrap", tags: ["matte", "red"] },
            { id: "satin_gold", name: "Satin Gold Dust", prompt: "Satin gold dust metallic wrap", tags: ["satin", "gold"] },
        ]
    },
    {
        category: "Chrome & Metals",
        styles: [
            { id: "chrome_silver", name: "Mirror Chrome Silver", prompt: "Highly reflective mirror chrome silver wrap", tags: ["chrome"] },
            { id: "chrome_gold", name: "Mirror Gold", prompt: "Highly reflective gold chrome wrap", tags: ["chrome", "gold"] },
            { id: "chrome_blue", name: "Blue Chrome", prompt: "Blue tinted mirror chrome wrap", tags: ["chrome", "blue"] },
            { id: "chrome_red", name: "Red Chrome", prompt: "Red tinted mirror chrome wrap", tags: ["chrome", "red"] },
            { id: "chrome_rose", name: "Rose Gold Chrome", prompt: "Rose gold tinted mirror chrome wrap", tags: ["chrome", "rose"] },
            { id: "brushed_steel", name: "Brushed Steel", prompt: "Brushed stainless steel texture wrap", tags: ["metal"] },
            { id: "brushed_black", name: "Brushed Black Metallic", prompt: "Brushed black metallic texture wrap", tags: ["metal"] },
            { id: "brushed_alum", name: "Brushed Aluminium", prompt: "Brushed aluminium texture wrap", tags: ["metal"] },
        ]
    },
    {
        category: "Color Shift / Chameleon",
        styles: [
            { id: "cham_purple_blue", name: "Midnight Purple/Blue", prompt: "Color shifting chameleon paint fading from midnight purple to deep blue", tags: ["color-shift"] },
            { id: "cham_cyan_purple", name: "Cyan/Purple Flip", prompt: "Iridescent color flip wrap changing from cyan to purple", tags: ["color-shift"] },
            { id: "cham_red_gold", name: "Red/Gold Volcanic", prompt: "Volcanic color shift paint changing from dark red to gold", tags: ["color-shift"] },
            { id: "cham_green_purple", name: "Green/Purple Alien", prompt: "Alien green to purple color shifting paint", tags: ["color-shift"] },
            { id: "pearl_white", name: "Pearlescent White", prompt: "White paint with a pink/green pearlescent shimmer", tags: ["pearl"] },
            { id: "holographic", name: "Holographic Prismatic", prompt: "Silver holographic prismatic rainbow effect wrap", tags: ["holo"] },
        ]
    },
    {
        category: "Camouflage Patterns",
        styles: [
            { id: "camo_arctic", name: "Arctic Camo", prompt: "White, grey, and black geometric arctic camouflage pattern", tags: ["camo"] },
            { id: "camo_digital", name: "Digital Desert", prompt: "Pixelated digital desert camouflage pattern (tan, brown)", tags: ["camo"] },
            { id: "camo_woodland", name: "Classic Woodland", prompt: "Classic green, brown, and black woodland camouflage pattern", tags: ["camo"] },
            { id: "camo_urban", name: "Urban Geometric", prompt: "Grey, black, and white sharp geometric urban camo", tags: ["camo"] },
            { id: "camo_blue", name: "Naval Blue Camo", prompt: "Blue, light blue, and white naval camouflage pattern", tags: ["camo"] },
            { id: "camo_pink", name: "Pink Fashion Camo", prompt: "Pink, white, and grey fashion camouflage pattern", tags: ["camo"] },
            { id: "camo_red", name: "Red Tiger Camo", prompt: "Red and black aggressive tiger stripe camouflage", tags: ["camo"] },
        ]
    },
    {
        category: "Racing Liveries",
        styles: [
            { id: "livery_martini", name: "Martini Racing", prompt: "Classic white racing livery with blue and red Martini stripes", tags: ["racing"] },
            { id: "livery_gulf", name: "Gulf Oil", prompt: "Iconic powder blue and orange Gulf Oil racing livery", tags: ["racing"] },
            { id: "livery_jps", name: "Black & Gold Lotus", prompt: "Classic John Player Special style black livery with gold pinstriping", tags: ["racing"] },
            { id: "livery_rally", name: "Castrol Rally", prompt: "White, red, and green Castrol rally livery with mud splatters", tags: ["racing"] },
            { id: "livery_drift", name: "Neon Drift", prompt: "Aggressive drift livery with neon splatter and jagged shapes on black", tags: ["racing", "drift"] },
            { id: "livery_nascar", name: "Stock Car Numbers", prompt: "Bright stock car racing livery with massive numbers on the door and many sponsor decals", tags: ["racing"] },
            { id: "livery_f1", name: "Silver Arrows", prompt: "Silver and teal modern Formula 1 style livery", tags: ["racing"] },
        ]
    },
    {
        category: "Itasha & Anime",
        styles: [
            { id: "itasha_girl", name: "Anime Character Full", prompt: "Full side Itasha wrap featuring a cute anime girl character with colorful background", tags: ["anime"] },
            { id: "itasha_manga", name: "Manga Pages", prompt: "Black and white manga comic book pages collage wrap covering the car", tags: ["anime"] },
            { id: "itasha_cyber", name: "Cyber Anime", prompt: "Futuristic anime mecha style wrap with neon panel lines", tags: ["anime"] },
            { id: "itasha_kawaii", name: "Kawaii Pink", prompt: "Pink pastel wrap with cute mascots, stars, and hearts", tags: ["anime"] },
        ]
    },
    {
        category: "Art & Graphic",
        styles: [
            { id: "art_graffiti", name: "Street Graffiti", prompt: "Colorful street art graffiti tags and mural covering the car", tags: ["art"] },
            { id: "art_stickerbomb", name: "Stickerbomb", prompt: "JDM Stickerbomb wrap, hundreds of overlapping stickers on the fender and bumper", tags: ["art"] },
            { id: "art_galaxy", name: "Galaxy Space", prompt: "Deep space nebula and stars galaxy print wrap", tags: ["art"] },
            { id: "art_fire", name: "Realistic Flames", prompt: "Realistic fire flames licking up the front of the car from the grill", tags: ["art"] },
            { id: "art_tribal", name: "Tribal Tattoos", prompt: "Black tribal tattoo graphics on the side of the car", tags: ["art"] },
            { id: "art_splatter", name: "Paint Splatter", prompt: "White car with multi-colored chaotic paint splatter effects", tags: ["art"] },
            { id: "art_tron", name: "Tron Lines", prompt: "Matte black car with glowing neon blue edges and contour lines", tags: ["art", "scifi"] },
            { id: "wrap_outline", name: "Blueprint Outline", prompt: "A technical wireframe outline sketch of the car model applied as a wrap, white lines on dark background, blueprint aesthetic", tags: ["art", "sketch"] },
            { id: "edu_mark_sketch", name: "Edu-Mark Sketch", prompt: "Create a full-vehicle car wrap design that makes the car look like a hand-drawn sketch. The wrap should visually mimic a pencil or marker sketch directly on the body of the car. Use rough sketch lines, bold outlines, shading strokes, and contour marks that follow the car’s curves, edges, and panels. The style should resemble an automotive designer’s concept sketch—minimal, artistic, monochrome (black on white or white on matte black), with subtle shading lines around the wheels, headlights, windows, and body contours. Include dynamic sketch strokes around wheel arches, vents, and doors to exaggerate the design. The wrap should look like the entire vehicle is a 2D drawing, even though it is 3D. Add perspective lines, cross-hatching, and intentional imperfections for authenticity. The final result should appear like a real car turned into a designer’s sketch—clean, modern, artistic, and visually striking", tags: ["art", "sketch", "monochrome"] },
        ]
    },
    {
        category: "Cyberpunk & Sci-Fi",
        styles: [
            { id: "cyber_distressed", name: "Distressed Future", prompt: "Dirty, worn sci-fi spacecraft look, industrial grey with caution stripes", tags: ["scifi"] },
            { id: "cyber_synthwave", name: "Synthwave Sunset", prompt: "Retro 80s synthwave sunset grid gradient, purple to orange", tags: ["scifi"] },
            { id: "cyber_circuit", name: "Circuit Board", prompt: "Green circuit board pattern on black background", tags: ["scifi"] },
            { id: "tech_mainframe", name: "Mainframe Access", prompt: "Deep blue and black server rack aesthetic, glowing data streams, tech nodes, futuristic server room vibe wrap", tags: ["tech", "scifi"] },
            { id: "tech_quantum", name: "Quantum Grid", prompt: "White and cyan quantum computing grid pattern, floating geometric cubes, clean laboratory aesthetic wrap", tags: ["tech", "clean"] },
            { id: "tech_nanotech", name: "Nanotech Hive", prompt: "Hexagonal honeycomb nanotech armor pattern, metallic grey with glowing orange interstices, high-tech armor wrap", tags: ["tech", "armor"] },
            { id: "tech_breach", name: "Data Breach", prompt: "Glitch art style, red and black corrupted data artifacts, pixel sorting effects, chaotic digital noise wrap", tags: ["tech", "glitch"] },
            { id: "tech_hex", name: "Cyber Hex", prompt: "Matte black background with a glowing neon purple hexagonal mesh overlay, structured and futuristic wrap", tags: ["tech", "scifi"] },
        ]
    },
    {
        category: "Emergency & Utility",
        styles: [
            { id: "theme_police", name: "Police Interceptor", prompt: "Black and white police interceptor livery with police lights", tags: ["theme"] },
            { id: "theme_taxi", name: "NYC Taxi", prompt: "Yellow cab taxi livery with checkerboard stripe", tags: ["theme"] },
            { id: "theme_biohazard", name: "Zombie Response", prompt: "Umbrella corp style zombie response vehicle, white with red umbrella logo and blood splatter", tags: ["theme"] },
        ]
    },
    {
        category: "Body Kits & Stance",
        styles: [
            { id: "widebody", name: "Widebody Kit", prompt: "An aggressive widebody kit with flared fenders, lowered suspension, and a front splitter", tags: ["sport", "aggressive"] },
            { id: "offroad", name: "Offroad Ready", prompt: "Lifted suspension, off-road tires, roof rack with lights, bullbar", tags: ["utility", "rugged"] },
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
    { 
        category: 'Street', 
        styles: [
            { id: 'alloy_silver', name: 'Silver Alloys', prompt: 'multi-spoke silver alloy performance wheels', tags: [] }, 
            { id: 'black_rims', name: 'Gloss Black', prompt: 'gloss black racing rims', tags: [] }
        ] 
    },
    {
        category: 'JDM Legends',
        styles: [
            { id: 'te37_bronze', name: 'Volk Bronze', prompt: 'iconic bronze 6-spoke racing wheels (TE37 style), performance look', tags: [] },
            { id: 'te37_white', name: 'Volk White', prompt: 'iconic white 6-spoke racing wheels (TE37 style)', tags: [] },
            { id: 'work_meister', name: 'Work Meister S1', prompt: 'deep dish 3-piece 5-spoke wheels (Work Meister S1 style) with polished lip', tags: [] },
            { id: 'ce28n', name: 'Volk CE28N', prompt: 'Volk CE28N style multi-spoke lightweight bronze wheels', tags: [] },
            { id: 'rpf1', name: 'Enkei RPF1', prompt: 'Enkei RPF1 silver split-spoke lightweight racing wheels', tags: [] },
            { id: 'advan_gt', name: 'Advan GT', prompt: 'Advan GT style 5-spoke racing wheels', tags: [] },
        ]
    },
    {
        category: 'Euro Stance',
        styles: [
            { id: 'bbs_rs', name: 'BBS RS Mesh', prompt: 'Classic BBS RS mesh wheels with polished lips, gold centers', tags: [] },
            { id: 'bbs_lm', name: 'BBS LM', prompt: 'BBS LM style multi-spoke mesh wheels', tags: [] },
            { id: 'rotiform_blq', name: 'Rotiform BLQ', prompt: 'Rotiform BLQ intricate mesh design wheels', tags: [] },
            { id: 'rotiform_aerodisc', name: 'Aero Disc', prompt: 'Rotiform white Aerodiscs on the front wheels', tags: [] },
            { id: 'oz_superturismo', name: 'OZ Superturismo', prompt: 'OZ Racing Superturismo white multi-spoke rally wheels', tags: [] },
        ]
    },
    {
        category: 'American Muscle',
        styles: [
            { id: 'cragar_ss', name: 'Cragar S/S', prompt: 'Classic chrome Cragar S/S 5-spoke muscle car wheels', tags: [] },
            { id: 'torque_thrust', name: 'Torque Thrust', prompt: 'American Racing Torque Thrust wheels, gunmetal spokes with polished lip', tags: [] },
            { id: 'weld_racing', name: 'Weld Drag', prompt: 'Polished Weld Racing drag wheels, skinnies in front, beadlocks in rear', tags: [] },
        ]
    },
    {
        category: 'Luxury & VIP',
        styles: [
            { id: 'maybach_dish', name: 'Maybach Dish', prompt: 'Polished solid dish Maybach style luxury wheels', tags: [] },
            { id: 'vossen_cvt', name: 'Vossen CVT', prompt: 'Vossen CVT directional multi-spoke luxury wheels', tags: [] },
            { id: 'forgiato', name: 'Forgiato', prompt: 'Oversized Forgiato custom painted luxury wheels', tags: [] },
        ]
    },
    {
        category: 'Rally & Offroad',
        styles: [
            { id: 'oz_rally_white', name: 'White Rally Turbofans', prompt: 'white rally racing wheels, turbofan style, durable look', tags: [] },
            { id: 'beadlock_offroad', name: 'Beadlock Offroad', prompt: 'heavy duty beadlock offroad wheels with chunky tires', tags: [] },
            { id: 'steelies', name: 'Black Steelies', prompt: 'Basic black steel wheels, utilitarian rugged look', tags: [] },
        ]
    }
];

export const CATEGORIZED_VEHICLE_AERO: OptionGroup[] = [
    { 
        category: 'Spoilers & Wings', 
        styles: [
            { id: 'spoiler_gt', name: 'Big GT Wing', prompt: 'a massive carbon fiber GT racing wing mounted on the trunk', tags: [] },
            { id: 'spoiler_ducktail', name: 'Ducktail Spoiler', prompt: 'an aggressive ducktail trunk spoiler integrated into the body lines', tags: [] },
            { id: 'spoiler_chassis', name: 'Chassis Mount Wing', prompt: 'a huge chassis-mounted rear wing extending behind the bumper', tags: [] },
            { id: 'spoiler_lip', name: 'Subtle Lip Spoiler', prompt: 'a subtle body-color lip spoiler on the trunk', tags: [] },
        ] 
    },
    {
        category: 'Body Work',
        styles: [
            { id: 'widebody_rocket', name: 'Rocket Bunny Widebody', prompt: 'Rocket Bunny style widebody kit with exposed rivets and fender flares', tags: [] },
            { id: 'widebody_liberty', name: 'Liberty Walk', prompt: 'Liberty Walk style aggressive widebody kit with bolt-on fenders', tags: [] },
            { id: 'widebody_smooth', name: 'Smooth Widebody', prompt: 'Molded, smooth widebody fender widening without visible rivets', tags: [] },
            { id: 'hood_carbon', name: 'Vented Carbon Hood', prompt: 'exposed carbon fiber hood with cooling vents', tags: [] },
            { id: 'roof_scoop', name: 'Roof Scoop', prompt: 'a rally-style roof air scoop', tags: [] },
            { id: 'diffuser', name: 'Rear Diffuser', prompt: 'aggressive rear bumper diffuser with aero fins', tags: [] },
            { id: 'canards', name: 'Front Canards', prompt: 'carbon fiber dive planes/canards on the front bumper', tags: [] },
            { id: 'roof_box', name: 'Thule Roof Box', prompt: 'aerodynamic roof cargo box carrier', tags: [] }
        ]
    }
];

export const CATEGORIZED_VEHICLE_INTERIOR: OptionGroup[] = [
    { category: 'Seats', styles: [{ id: 'bucket_seats', name: 'Racing Seats', prompt: 'red leather racing bucket seats', tags: [] }, { id: 'tan_leather', name: 'Tan Leather', prompt: 'luxury tan leather upholstery', tags: [] }] }
];

export const CATEGORIZED_VEHICLE_LIGHTING_GRILL: OptionGroup[] = [
    { 
        category: 'Headlights', 
        styles: [
            { id: 'led_halo', name: 'LED Halo Rings', prompt: 'custom LED halo ring headlights (Angel Eyes)', tags: [] }, 
            { id: 'demon_eyes', name: 'Red Demon Eyes', prompt: 'headlights with glowing red projector lenses (Demon Eyes)', tags: [] },
            { id: 'yellow_jdm', name: 'Yellow JDM Lens', prompt: 'yellow tinted JDM style headlight lenses', tags: [] },
            { id: 'blackout_lights', name: 'Smoked Lights', prompt: 'tinted smoked headlights and taillights', tags: [] }
        ] 
    },
    {
        category: 'Glass & Tint',
        styles: [
            { id: 'tint_5', name: '5% Limo Tint', prompt: 'completely opaque 5% black window tint on all windows', tags: [] },
            { id: 'tint_35', name: '35% Smoke Tint', prompt: 'standard 35% smoke window tint', tags: [] },
            { id: 'tint_red', name: 'Red Mirror Tint', prompt: 'reflective red mirror window tint', tags: [] },
            { id: 'tint_blue', name: 'Blue Mirror Tint', prompt: 'reflective blue mirror window tint', tags: [] },
            { id: 'tint_gold', name: 'Gold Mirror Tint', prompt: 'reflective gold mirror window tint', tags: [] },
            { id: 'chameleon_tint', name: 'Chameleon Windshield', prompt: 'iridescent chameleon purple-green window tint', tags: [] },
        ] 
    },
    {
        category: 'Underglow',
        styles: [
            { id: 'neon_green', name: 'Green Underglow', prompt: 'vibrant green neon underglow lighting beneath the chassis', tags: [] },
            { id: 'neon_purple', name: 'Purple Underglow', prompt: 'vibrant purple neon underglow lighting', tags: [] },
            { id: 'neon_blue', name: 'Blue Underglow', prompt: 'cool blue neon underglow lighting', tags: [] },
            { id: 'neon_red', name: 'Red Underglow', prompt: 'aggressive red neon underglow lighting', tags: [] },
            { id: 'neon_white', name: 'White Underglow', prompt: 'bright white LED underglow lighting', tags: [] },
        ]
    }
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
