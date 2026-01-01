
export interface StyleOption {
    id: string;
    name: string;
    prompt: string;
    tags: string[];
    previewImage?: string;
    isColorCustomizable?: boolean;
    colorPalette?: string[];
}

export interface OptionGroup {
    category: string;
    styles: StyleOption[];
}

export type StyleCategory = OptionGroup;

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

export const CATEGORIZED_CAMPAIGN_TEMPLATES: OptionGroup[] = [
    {
        category: "Greetings & Wishes",
        styles: [
            { id: "congrats_gold", name: "Official Congratulations", prompt: "A celebratory design. The background image (recipient) is the HERO visual, fully visible with only a subtle vignette. The candidate (sender) is placed in a small circle badge or signature area at the bottom. Elegant gold script typography. 'Congratulations' header.", tags: ['greeting', 'celebration'] },
            { id: "birthday_wish", name: "Birthday / Well Wishes", prompt: "Warm and personal. The background person is the main focus. Soft lighting, party colors or warm tones. The candidate appears as a 'Best Wishes, [Name]' footer element.", tags: ['greeting', 'casual'] },
            { id: "official_commendation", name: "Official Commendation", prompt: "Formal government commendation style. Background image is central and clear. Bordered edges, wax seal effect, authoritative serif fonts. Candidate is the endorsing authority at the bottom.", tags: ['greeting', 'formal'] }
        ]
    },
    {
        category: "Presidential & Corporate",
        styles: [
            { id: "presidential_classic", name: "The Oval Office", prompt: "Classic presidential aesthetics, deep navy blue background, serif typography (Times New Roman), gold accents, trustworthy and authoritative.", tags: ['classic', 'formal'] },
            { id: "corporate_blue", name: "Corporate Trust", prompt: "Modern corporate design, slate blue and grey palette, clean sans-serif fonts, structured grid, professional headshot integration.", tags: ['corporate'] }
        ]
    }
];

export const CATEGORIZED_MANIFESTO_TEMPLATES: OptionGroup[] = [
    {
        category: "Professional Documents",
        styles: [
            { id: "swiss_doc", name: "Swiss Minimal", prompt: "Swiss minimalist layout, heavy use of grid, helvetica font, lots of whitespace.", tags: ['clean'] },
            { id: "govt_official", name: "Government Official", prompt: "Official government document style, coat of arms watermarks, formal serif fonts.", tags: ['formal'] }
        ]
    }
];

export const CATEGORIZED_SUIT_STYLES: OptionGroup[] = [
    {
        category: "Classic Menswear",
        styles: [
            { id: "navy_suit", name: "Navy Power Suit", prompt: "A tailored navy blue suit, crisp white shirt, silk tie, professional business look.", tags: ['business', 'formal'] },
            { id: "tuxedo", name: "Black Tie Tuxedo", prompt: "A classic black tuxedo with a bow tie, formal evening wear.", tags: ['formal', 'ceremony'] },
            { id: "nigerian_senator", name: "Nigerian Senator", prompt: "A royal blue Nigerian Senator suit, high quality fabric, traditional cap.", tags: ['cultural', 'ceremony'] },
            { id: "white_dinner_jacket", name: "White Dinner Jacket", prompt: "Ivory dinner jacket, black trousers, James Bond style.", tags: ['classic', 'formal'] },
            { id: "knight_armor", name: "Knight in Shining Armor", prompt: "Full plate medieval steel armor, intricate engravings, heroic stance.", tags: ['themed', 'costume'] }
        ]
    },
    {
        category: "Medieval",
        styles: [
             { id: "knight_armor", name: "Knight in Shining Armor", prompt: "Full plate medieval steel armor, intricate engravings, heroic stance.", tags: ['themed', 'costume'] }
        ]
    },
    {
        category: "Western Classics",
        styles: [
             { id: "white_dinner_jacket", name: "White Dinner Jacket", prompt: "Ivory dinner jacket, black trousers, James Bond style.", tags: ['classic', 'formal'] },
        ]
    }
];

export const CATEGORIZED_WOMENS_STYLES: OptionGroup[] = [
    {
        category: "Formal & Business",
        styles: [
            { id: "power_pantsuit", name: "Power Pantsuit", prompt: "A sharp, tailored white power pantsuit, modern cut, professional.", tags: ['business', 'modern'] },
            { id: "evening_gown", name: "Evening Gown", prompt: "A floor-length elegant evening gown, silk fabric, red carpet look.", tags: ['formal', 'gala'] },
            { id: "ankara_gown", name: "Vibrant Ankara Gown", prompt: "A stunning floor-length gown made from vibrant Ankara fabric with intricate patterns.", tags: ['cultural', 'vibrant'] },
            { id: "flapper_dress", name: "Beaded Flapper Dress", prompt: "1920s style beaded flapper dress, vintage glamour.", tags: ['retro', 'party'] }
        ]
    },
    {
        category: "Roaring Twenties",
        styles: [
             { id: "flapper_dress", name: "Beaded Flapper Dress", prompt: "1920s style beaded flapper dress, vintage glamour.", tags: ['retro', 'party'] }
        ]
    },
    {
        category: "Business & Formal",
        styles: [
             { id: "power_pantsuit", name: "Power Pantsuit", prompt: "A sharp, tailored white power pantsuit, modern cut, professional.", tags: ['business', 'modern'] }
        ]
    }
];

export const CATEGORIZED_KIDS_STYLES: OptionGroup[] = [
    {
        category: "Kids Formal",
        styles: [
            { id: "ring_bearer", name: "Ring Bearer Suit", prompt: "Miniature tuxedo for a child, cute and formal.", tags: ['formal'] }
        ]
    }
];

export const APPAREL_BACKGROUNDS = [
    { name: "Studio Grey", prompt: "A clean, seamless studio grey background with soft shadows." },
    { name: "Office", prompt: "A modern, blurred corporate office background with glass walls." },
    { name: "Luxury Hotel Lobby", prompt: "An upscale hotel lobby with warm lighting and marble floors." },
    { name: "Urban Street", prompt: "A fashionable city street with blurred buildings in the background." },
    { name: "Nature / Garden", prompt: "A lush green garden with soft sunlight filtering through trees." },
    { name: "Gala Event", prompt: "A glamorous red carpet event background with camera flashes." },
    { name: "Art Gallery", prompt: "A minimal art gallery space with white walls." }
];

export const APPAREL_LIGHTING = [
    { name: "Studio Lighting", prompt: "Professional 3-point studio lighting, softbox fill, rim light." },
    { name: "Natural Daylight", prompt: "Soft, diffused natural daylight." },
    { name: "Golden Hour", prompt: "Warm, golden hour sunlight, cinematic look." },
    { name: "Dramatic Evening", prompt: "Moody, dramatic evening lighting with shadows." },
    { name: "Neon", prompt: "Cyberpunk neon lighting, blue and pink hues." }
];

export const CATEGORIZED_SHOE_STYLES: OptionGroup[] = [
    {
        category: "Formal",
        styles: [
            { id: "oxford", name: "Oxford Shoes", prompt: "Black leather Oxford shoes.", tags: ['formal'] }
        ]
    }
];

export const CATEGORIZED_WOMENS_SHOE_STYLES: OptionGroup[] = [
    {
        category: "Heels",
        styles: [
            { id: "stiletto", name: "Stiletto Heels", prompt: "High stiletto heels, matching color.", tags: ['formal'] }
        ]
    }
];

export const CATEGORIZED_KIDS_SHOE_STYLES: OptionGroup[] = [
    {
        category: "Kids Shoes",
        styles: [
            { id: "kids_dress_shoes", name: "Dress Shoes", prompt: "Black patent leather dress shoes for kids.", tags: ['formal'] }
        ]
    }
];

export const DEFAULT_SHOE_OPTION = { id: 'none', name: 'No Change', prompt: '', tags: [] };
export const DEFAULT_SHIRT_OPTION = { id: 'none', name: 'No Change', prompt: '', tags: [] };
export const DEFAULT_TIE_OPTION = { id: 'none', name: 'No Change', prompt: '', tags: [] };
export const DEFAULT_HANDBAG_OPTION = { id: 'none', name: 'No Change', prompt: '', tags: [] };
export const DEFAULT_POSTURE_OPTION = { id: 'none', name: 'Original Pose', prompt: '', tags: [] };
export const DEFAULT_EYEWEAR_OPTION = { id: 'none', name: 'No Change', prompt: '', tags: [] };
export const DEFAULT_HEADWEAR_OPTION = { id: 'none', name: 'No Change', prompt: '', tags: [] };

export const QUALITY_OPTIONS: QualityOption[] = [
    { name: 'Standard (HD)', value: 'standard' },
    { name: 'High (4K)', value: 'high' }
];

export const SHIRT_OPTIONS = [
    { id: 'white_shirt', name: 'White Dress Shirt', prompt: 'Crisp white dress shirt', tags: [] }
];

export const CATEGORIZED_TIE_STYLES: OptionGroup[] = [
    { category: 'Ties', styles: [{ id: 'red_tie', name: 'Red Silk Tie', prompt: 'Red silk tie', tags: [] }] }
];

export const CATEGORIZED_HANDBAG_STYLES: OptionGroup[] = [
    { category: 'Bags', styles: [{ id: 'clutch', name: 'Evening Clutch', prompt: 'Elegant evening clutch', tags: [] }] }
];

export const POSTURE_OPTIONS = [
    { id: 'standing_confidence', name: 'Standing Confidence', prompt: 'Standing confidently with good posture.', tags: [] }
];

export const CATEGORIZED_EYEWEAR_STYLES: OptionGroup[] = [
    { category: 'Glasses', styles: [{ id: 'sunglasses', name: 'Aviator Sunglasses', prompt: 'Classic aviator sunglasses', tags: [] }] }
];

export const CATEGORIZED_HEADWEAR_STYLES: OptionGroup[] = [
    { category: 'Hats', styles: [{ id: 'fedora', name: 'Fedora Hat', prompt: 'Stylish fedora hat', tags: [] }] }
];

export const POSTER_POSES = [
    { id: 'back_to_back', name: 'Back to Back', prompt: 'standing back to back, secret agent style', tags: [] },
    { id: 'side_by_side', name: 'Side by Side', prompt: 'standing side by side, looking at camera', tags: [] }
];

export const POSTER_ASPECT_RATIOS = [
    { name: 'Portrait (9:16)', value: '9:16' },
    { name: 'Square (1:1)', value: '1:1' },
    { name: 'Landscape (16:9)', value: '16:9' }
];

export const POSTER_BACKGROUND_OPTIONS = APPAREL_BACKGROUNDS;
export const POSTER_LIGHTING_OPTIONS = APPAREL_LIGHTING;

export const POSTER_DISTANCE_OPTIONS = [
    { id: 'medium_shot', name: 'Medium Shot', prompt: 'Medium shot from waist up', tags: [] }
];

export const POSTER_INDIVIDUAL_POSTURES = [
    { id: 'arms_crossed', name: 'Arms Crossed', prompt: 'arms crossed confidently', tags: [] }
];

export const POSTER_FONT_OPTIONS = [
    { id: 'sans_serif', name: 'Modern Sans', prompt: 'Modern bold sans-serif typography', tags: [] }
];

export const POSTER_ICON_OPTIONS = [
    { id: 'parental_advisory', name: 'Parental Advisory', prompt: 'Parental Advisory sticker in corner', tags: [] }
];

export const STUDIO_SCENARIOS = [
    { id: 'interview', name: 'TV Interview', prompt: 'Sitting in a TV interview setting, facing each other comfortably.', tags: [] }
];

export const STUDIO_POSES = POSTER_POSES;

export const KENYAN_PARTIES: PoliticalParty[] = [
    { id: 'uda', name: 'UDA', fullName: 'United Democratic Alliance', symbol: 'Wheelbarrow', colors: 'Yellow and Green', hexColor: '#FFD700', defaultSlogan: 'Kazi ni Kazi' },
    { id: 'odm', name: 'ODM', fullName: 'Orange Democratic Movement', symbol: 'Orange', colors: 'Orange and White', hexColor: '#FFA500', defaultSlogan: 'Mbele Pamoja' }
];

export const CAMPAIGN_POSITIONS = [
    { name: 'President', value: 'President' },
    { name: 'Governor', value: 'Governor' },
    { name: 'Senator', value: 'Senator' },
    { name: 'MP', value: 'Member of Parliament' },
    { name: 'MCA', value: 'MCA' }
];

export const CAMPAIGN_WRAP_STYLES = [
    { name: 'Full Body Wrap', value: 'full', prompt: 'full body vinyl wrap covering the entire vehicle' },
    { name: 'Door Branding', value: 'door', prompt: 'branding logo and text placed on the side doors only' }
];

export const CAMPAIGN_MODS = [
    { name: 'Roof Speakers', prompt: 'large PA system speakers mounted on the roof rack', value: 'speakers' },
    { name: 'Flag Mounts', prompt: 'campaign flags mounted on the front fenders', value: 'flags' }
];

export const MANIFESTO_FORMATS = [
    { name: 'A4 Booklet', prompt: 'A4 vertical booklet cover' },
    { name: 'Trifold Brochure', prompt: 'Trifold brochure layout' },
    { name: 'A4 Document', prompt: 'Standard A4 document layout' }
];

export const VALID_ASPECT_RATIOS = POSTER_ASPECT_RATIOS;

export const CATEGORIZED_VEHICLE_STYLES: OptionGroup[] = [
    {
        category: "Wraps",
        styles: [
            { id: "matte_black", name: "Matte Black", prompt: "Stealth matte black vinyl wrap.", tags: ['modern'] },
            { id: "racing_livery", name: "Racing Livery", prompt: "Sporty racing livery with stripes and numbers.", tags: ['sport'] }
        ]
    }
];

export const VEHICLE_BACKGROUNDS = APPAREL_BACKGROUNDS;
export const VEHICLE_LIGHTING = APPAREL_LIGHTING;

export const DEFAULT_VEHICLE_MOD_OPTION = { id: 'stock', name: 'Stock / No Change', prompt: '', tags: [] };

export const CATEGORIZED_VEHICLE_RIMS: OptionGroup[] = [
    { category: 'Wheels', styles: [{ id: 'alloy_sport', name: 'Sport Alloys', prompt: 'Large multi-spoke sport alloy rims', tags: [] }] }
];

export const CATEGORIZED_VEHICLE_AERO: OptionGroup[] = [
    { category: 'Aero', styles: [{ id: 'gt_wing', name: 'GT Wing', prompt: 'Large carbon fiber rear GT wing', tags: [] }] }
];

export const CATEGORIZED_VEHICLE_INTERIOR: OptionGroup[] = [
    { category: 'Interior', styles: [{ id: 'red_leather', name: 'Red Leather', prompt: 'Red leather seats and interior trim', tags: [] }] }
];

export const CATEGORIZED_VEHICLE_LIGHTING_GRILL: OptionGroup[] = [
    { category: 'Lights', styles: [{ id: 'led_halo', name: 'Halo LEDs', prompt: 'Custom halo LED headlights', tags: [] }] }
];

export const CATEGORIZED_INTERIOR_STYLES: OptionGroup[] = [
    {
        category: "Modern",
        styles: [
            { id: "scandi", name: "Scandinavian", prompt: "Scandinavian interior design, light wood, white walls, minimalist.", tags: ['modern'] },
            { id: "industrial", name: "Industrial Loft", prompt: "Industrial loft style, exposed brick, metal accents, leather furniture.", tags: ['modern'] }
        ]
    }
];

export const INTERIOR_BACKGROUNDS = [
    { name: "City Skyline View", prompt: "Large windows overlooking a city skyline at night." },
    { name: "Garden View", prompt: "Large windows opening to a lush garden." }
];

export const INTERIOR_LIGHTING = [
    { name: "Warm Ambient", prompt: "Warm ambient indoor lighting." },
    { name: "Natural Sunlight", prompt: "Bright natural sunlight streaming in." }
];

export const CATEGORIZED_LANDSCAPE_STYLES: OptionGroup[] = [
    {
        category: "Gardens",
        styles: [
            { id: "japanese_zen", name: "Japanese Zen", prompt: "Japanese Zen garden, gravel, rocks, bonsai trees.", tags: ['calm'] },
            { id: "english_cottage", name: "English Cottage", prompt: "English cottage garden, overflowing flowers, winding paths.", tags: ['nature'] }
        ]
    }
];

export const LANDSCAPE_BACKGROUNDS = [
    { name: "Sunset", prompt: "Sunset sky background." },
    { name: "Clear Blue Sky", prompt: "Clear blue sky." }
];

export const LANDSCAPE_LIGHTING = [
    { name: "Golden Hour", prompt: "Golden hour lighting." }
];

export const ARCHITECT_STYLES = [
    { name: "Modern Minimalist", value: "Modern minimalist architecture, clean lines, glass and concrete." },
    { name: "Contemporary", value: "Contemporary architecture with mixed materials." }
];

export const ARCHITECT_VIEW_TYPES = [
    { name: "Perspective", value: "Perspective view" },
    { name: "Front Elevation", value: "Front Elevation" }
];

export const ARCHITECT_SCALES = [
    { name: "1:100", value: "1:100 scale" }
];

// Aliases for gallery data compatibility
export const BACKGROUND_OPTIONS = APPAREL_BACKGROUNDS;
export const LIGHTING_OPTIONS = APPAREL_LIGHTING;
