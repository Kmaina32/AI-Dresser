
// --- INTERFACES ---

export interface SimpleOption {
    name: string;
    prompt: string;
    value?: string;
}

export interface StyleOption {
    id: string;
    name: string;
    prompt: string;
    tags: string[];
    previewImage?: string;
    isColorCustomizable?: boolean;
    colorPalette?: string[];
}

export interface StyleCategory {
    category: string;
    styles: StyleOption[];
}

export interface QualityOption {
    name: string;
    value: string;
}

export interface RemixConfig {
    attireType: 'menswear' | 'womenswear' | 'kidswear';
    stylePrompt: string;
    backgroundPrompt: string;
    lightingPrompt: string;
    shoePrompt?: string;
    shirtPrompt?: string;
    tiePrompt?: string;
    handbagPrompt?: string;
    eyewearPrompt?: string;
    headwearPrompt?: string;
}

export interface PoliticalParty {
    id: string;
    name: string;
    fullName: string;
    symbol: string;
    colors: string;
    hexColor: string;
}

export interface PosterIconOptions {
    name: string;
    prompt: string;
}

// --- OPTIONS & DATA ---

export const QUALITY_OPTIONS: QualityOption[] = [
    { name: 'Standard', value: 'standard' },
    { name: 'High (HD)', value: 'high' },
];

export const POSTER_ICON_OPTIONS: SimpleOption[] = [
    { name: 'None', prompt: '' },
    { name: 'Parental Advisory', prompt: 'parental advisory sticker' },
    { name: 'Explicit Content', prompt: 'explicit content warning label' },
];

// --- APPAREL STYLES ---

export const CATEGORIZED_SUIT_STYLES: StyleCategory[] = [
    {
        category: "Cultural Heritage",
        styles: [
            { id: "nigerian_senator", name: "Nigerian Senator", prompt: "a tailored Nigerian Senator suit consisting of a long-sleeve tunic and matching trousers, high-quality fabric", tags: ["cultural", "formal"], isColorCustomizable: true, colorPalette: ["#003366", "#FFFFFF", "#000000", "#800020"] },
            { id: "agbada", name: "Grand Agbada", prompt: "a grand, voluminous Agbada robe with intricate embroidery, worn over a matching inner outfit", tags: ["cultural", "ceremony"], isColorCustomizable: true, colorPalette: ["#FFFFFF", "#4B0082", "#DAA520"] }
        ]
    },
    {
        category: "Western Classics",
        styles: [
            { id: "tuxedo", name: "Classic Tuxedo", prompt: "a classic black tuxedo with a satin lapel, crisp white shirt, and black bow tie", tags: ["formal", "classic"], isColorCustomizable: false },
            { id: "double_breasted", name: "Double Breasted Suit", prompt: "a sharp double-breasted suit jacket with peak lapels and matching trousers", tags: ["business", "classic"], isColorCustomizable: true, colorPalette: ["#1a1a1a", "#000080", "#4a4a4a"] },
            { id: "white_dinner", name: "White Dinner Jacket", prompt: "a white dinner jacket with black trousers, James Bond style", tags: ["formal", "themed"], isColorCustomizable: false }
        ]
    },
    {
        category: "Medieval",
        styles: [
             { id: "knight", name: "Knight in Shining Armor", prompt: "a full suit of polished steel medieval plate armor with intricate engravings", tags: ["themed", "costume"], isColorCustomizable: false }
        ]
    }
];

export const CATEGORIZED_WOMENS_STYLES: StyleCategory[] = [
    {
        category: "Gowns & Dresses",
        styles: [
            { id: "ankara_gown", name: "Vibrant Ankara Gown", prompt: "a stunning floor-length gown made from vibrant, colorful Ankara fabric with bold patterns", tags: ["cultural", "modern"], isColorCustomizable: true, colorPalette: ["#FF4500", "#FFD700", "#008000"] },
            { id: "evening_gown", name: "Silk Evening Gown", prompt: "an elegant, flowing silk evening gown", tags: ["formal", "classic"], isColorCustomizable: true, colorPalette: ["#FF0000", "#000000", "#C0C0C0"] }
        ]
    },
    {
        category: "Business & Formal",
        styles: [
             { id: "power_suit", name: "Power Pantsuit", prompt: "a tailored, professional pantsuit with a modern cut", tags: ["business", "modern"], isColorCustomizable: true, colorPalette: ["#FFFFFF", "#000000", "#FF00FF"] }
        ]
    },
    {
        category: "Roaring Twenties",
        styles: [
             { id: "flapper", name: "Beaded Flapper Dress", prompt: "a 1920s style flapper dress with fringe and intricate beadwork", tags: ["themed", "vintage"], isColorCustomizable: true, colorPalette: ["#D4AF37", "#C0C0C0", "#000000"] }
        ]
    }
];

export const CATEGORIZED_KIDS_STYLES: StyleCategory[] = [
    {
        category: "Formal",
        styles: [
            { id: "kids_suit", name: "Mini Suit", prompt: "a cute, perfectly fitted miniature suit", tags: ["formal"], isColorCustomizable: true, colorPalette: ["#000080", "#000000"] },
            { id: "kids_dress", name: "Party Dress", prompt: "a frilly, colorful party dress", tags: ["formal"], isColorCustomizable: true, colorPalette: ["#FFC0CB", "#FFFF00"] }
        ]
    }
];

// --- VEHICLE STYLES ---

export const CATEGORIZED_VEHICLE_STYLES: StyleCategory[] = [
    {
        category: "Wraps & Paint",
        styles: [
            { id: "matte_black", name: "Matte Black Wrap", prompt: "a sleek matte black full vehicle wrap", tags: ["modern"], isColorCustomizable: false },
            { id: "chrome", name: "Chrome Wrap", prompt: "a highly reflective chrome vehicle wrap", tags: ["show"], isColorCustomizable: true, colorPalette: ["#C0C0C0", "#D4AF37", "#00FFFF"] },
            { id: "camo", name: "Camo Livery", prompt: "a geometric camouflage vehicle livery", tags: ["tactical"], isColorCustomizable: true, colorPalette: ["#556B2F", "#808080", "#FFFFFF"] }
        ]
    },
    {
        category: "Body Kits",
        styles: [
             { id: "widebody", name: "Widebody Kit", prompt: "an aggressive widebody kit with flared fenders and side skirts", tags: ["mod"], isColorCustomizable: true, colorPalette: ["#FF0000", "#000000"] }
        ]
    }
];

export const CATEGORIZED_VEHICLE_RIMS: StyleCategory[] = [
    {
        category: "Sport",
        styles: [
            { id: "rim_te37", name: "6-Spoke Sport", prompt: "bronze 6-spoke sport racing wheels", tags: ["sport"], isColorCustomizable: false },
            { id: "rim_mesh", name: "Silver Mesh", prompt: "intricate silver mesh alloy wheels", tags: ["luxury"], isColorCustomizable: false }
        ]
    }
];

export const CATEGORIZED_VEHICLE_AERO: StyleCategory[] = [
    {
        category: "Spoilers",
        styles: [
            { id: "gt_wing", name: "GT Wing", prompt: "a large carbon fiber GT rear wing", tags: ["race"], isColorCustomizable: false },
            { id: "lip_spoiler", name: "Lip Spoiler", prompt: "a subtle trunk lip spoiler", tags: ["clean"], isColorCustomizable: true, colorPalette: ["#000000"] }
        ]
    }
];

export const CATEGORIZED_VEHICLE_INTERIOR: StyleCategory[] = [
    {
        category: "Seats",
        styles: [
            { id: "bucket_seats", name: "Racing Buckets", prompt: "red leather racing bucket seats", tags: ["race"], isColorCustomizable: true, colorPalette: ["#FF0000", "#000000", "#FFFFFF"] }
        ]
    }
];

export const CATEGORIZED_VEHICLE_LIGHTING_GRILL: StyleCategory[] = [
    {
        category: "Lights",
        styles: [
            { id: "halo_lights", name: "Halo Headlights", prompt: "modern LED halo ring headlights", tags: ["modern"], isColorCustomizable: false }
        ]
    }
];

export const DEFAULT_VEHICLE_MOD_OPTION: SimpleOption = { name: 'None', prompt: '', value: 'none' };

// --- INTERIOR STYLES ---

export const CATEGORIZED_INTERIOR_STYLES: StyleCategory[] = [
    {
        category: "Styles",
        styles: [
            { id: "minimalist", name: "Modern Minimalist", prompt: "clean lines, neutral colors, and minimalist furniture", tags: ["modern"], isColorCustomizable: true, colorPalette: ["#FFFFFF", "#F5F5DC"] },
            { id: "industrial", name: "Industrial Lofts", prompt: "exposed brick, metal accents, and leather furniture", tags: ["urban"], isColorCustomizable: false }
        ]
    }
];

// --- LANDSCAPE STYLES ---

export const CATEGORIZED_LANDSCAPE_STYLES: StyleCategory[] = [
    {
        category: "Gardens",
        styles: [
            { id: "japanese", name: "Japanese Zen", prompt: "a Japanese Zen garden with rocks, moss, and maple trees", tags: ["zen"], isColorCustomizable: false },
            { id: "tropical", name: "Tropical Oasis", prompt: "lush tropical plants, palms, and vibrant flowers", tags: ["nature"], isColorCustomizable: false }
        ]
    }
];

// --- BACKGROUNDS ---

export const APPAREL_BACKGROUNDS: SimpleOption[] = [
    { name: 'Keep Original', prompt: '' },
    { name: 'Studio Grey', prompt: 'a professional studio background with neutral grey tone' },
    { name: 'Office', prompt: 'a modern corporate office setting with glass windows' },
    { name: 'Art Gallery', prompt: 'a bright, modern art gallery' },
    { name: 'Gala Event', prompt: 'a glamorous evening gala with bokeh lights' }
];
export const BACKGROUND_OPTIONS = APPAREL_BACKGROUNDS; // Alias

export const VEHICLE_BACKGROUNDS: SimpleOption[] = [
    { name: 'Keep Original', prompt: '' },
    { name: 'Showroom', prompt: 'a pristine white car showroom with glossy floors' },
    { name: 'City Night', prompt: 'a rainy city street at night with neon reflections' },
    { name: 'Desert Road', prompt: 'an open desert highway' }
];

export const INTERIOR_BACKGROUNDS: SimpleOption[] = [
     { name: 'Keep Original', prompt: '' },
     { name: 'City View', prompt: 'visible city skyline through the windows' },
     { name: 'Forest View', prompt: 'lush forest visible through the windows' }
];

export const LANDSCAPE_BACKGROUNDS: SimpleOption[] = [
    { name: 'Keep Original', prompt: '' },
    { name: 'Sunset', prompt: 'warm golden hour lighting at sunset' },
    { name: 'Overcast', prompt: 'soft overcast sky' }
];

// --- LIGHTING ---

export const APPAREL_LIGHTING: SimpleOption[] = [
    { name: 'Natural Daylight', prompt: 'soft, natural daylight' },
    { name: 'Studio Lighting', prompt: 'professional 3-point studio lighting' },
    { name: 'Dramatic Evening', prompt: 'dramatic, high-contrast evening lighting' },
    { name: 'Golden Hour', prompt: 'warm golden hour sunlight' }
];
export const LIGHTING_OPTIONS = APPAREL_LIGHTING; // Alias

export const VEHICLE_LIGHTING: SimpleOption[] = [
    { name: 'Natural', prompt: 'natural outdoor lighting' },
    { name: 'Studio Softbox', prompt: 'large softbox studio lighting reflecting on curves' },
    { name: 'Neon', prompt: 'cyberpunk neon lighting' }
];

export const INTERIOR_LIGHTING: SimpleOption[] = [
    { name: 'Warm', prompt: 'warm interior ambient lighting' },
    { name: 'Cool', prompt: 'bright cool daylight' }
];

export const LANDSCAPE_LIGHTING: SimpleOption[] = [
    { name: 'Sunny', prompt: 'bright sunny day' },
    { name: 'Moonlight', prompt: 'cool moonlight' }
];

// --- ACCESSORIES ---

export const DEFAULT_SHOE_OPTION: SimpleOption = { name: 'None', prompt: '', value: 'none' };
export const CATEGORIZED_SHOE_STYLES: StyleCategory[] = [
    {
        category: "Formal",
        styles: [{ id: "oxfords", name: "Black Oxfords", prompt: "shiny black leather oxford shoes", tags: [], isColorCustomizable: false }]
    }
];
export const CATEGORIZED_WOMENS_SHOE_STYLES: StyleCategory[] = [
    {
        category: "Heels",
        styles: [{ id: "stilettos", name: "Red Stilettos", prompt: "high red stiletto heels", tags: [], isColorCustomizable: false }]
    }
];
export const CATEGORIZED_KIDS_SHOE_STYLES: StyleCategory[] = [
    {
        category: "Casual",
        styles: [{ id: "sneakers", name: "Sneakers", prompt: "clean white sneakers", tags: [], isColorCustomizable: false }]
    }
];

export const DEFAULT_SHIRT_OPTION: SimpleOption = { name: 'Default', prompt: '', value: 'default' };
export const SHIRT_OPTIONS: SimpleOption[] = [
    { name: 'White Dress Shirt', prompt: 'a crisp white dress shirt' },
    { name: 'Black Turtleneck', prompt: 'a black turtleneck sweater' }
];

export const DEFAULT_TIE_OPTION: SimpleOption = { name: 'None', prompt: '', value: 'none' };
export const CATEGORIZED_TIE_STYLES: StyleCategory[] = [
     {
        category: "Ties",
        styles: [{ id: "red_tie", name: "Red Silk Tie", prompt: "a red silk necktie", tags: [], isColorCustomizable: false }]
    }
];

export const DEFAULT_HANDBAG_OPTION: SimpleOption = { name: 'None', prompt: '', value: 'none' };
export const CATEGORIZED_HANDBAG_STYLES: StyleCategory[] = [
    {
        category: "Bags",
        styles: [{ id: "clutch", name: "Silver Clutch", prompt: "a silver evening clutch", tags: [], isColorCustomizable: false }]
    }
];

export const DEFAULT_EYEWEAR_OPTION: SimpleOption = { name: 'None', prompt: '', value: 'none' };
export const CATEGORIZED_EYEWEAR_STYLES: StyleCategory[] = [
     {
        category: "Glasses",
        styles: [{ id: "aviators", name: "Aviator Sunglasses", prompt: "classic gold aviator sunglasses", tags: [], isColorCustomizable: false }]
    }
];

export const DEFAULT_HEADWEAR_OPTION: SimpleOption = { name: 'None', prompt: '', value: 'none' };
export const CATEGORIZED_HEADWEAR_STYLES: StyleCategory[] = [
    {
        category: "Hats",
        styles: [{ id: "fedora", name: "Fedora", prompt: "a stylish fedora hat", tags: [], isColorCustomizable: false }]
    }
];

export const DEFAULT_POSTURE_OPTION: SimpleOption = { name: 'Natural', prompt: 'natural standing posture', value: 'natural' };
export const POSTURE_OPTIONS: SimpleOption[] = [
    { name: 'Hands in Pockets', prompt: 'standing with hands in pockets, relaxed' },
    { name: 'Arms Crossed', prompt: 'standing confidently with arms crossed' }
];


// --- POSTER CONFIG ---

export const POSTER_POSES: SimpleOption[] = [
    { name: 'Back-to-Back', prompt: 'standing back-to-back' },
    { name: 'Side-by-Side', prompt: 'standing side-by-side looking at camera' },
    { name: 'V-Formation', prompt: 'standing in a V-formation' }
];

export const POSTER_ASPECT_RATIOS: QualityOption[] = [
    { name: 'Portrait (9:16)', value: '9:16' },
    { name: 'Square (1:1)', value: '1:1' },
    { name: 'Landscape (16:9)', value: '16:9' }
];

export const POSTER_BACKGROUND_OPTIONS: SimpleOption[] = [
    { name: 'Studio Dark', prompt: 'dark minimalist studio background' },
    { name: 'Abstract Neon', prompt: 'abstract neon smoke background' },
    { name: 'Solid Color (Hex)', prompt: 'solid hex color background: ' }
];

export const POSTER_LIGHTING_OPTIONS: SimpleOption[] = [
    { name: 'Cinematic Blue', prompt: 'cinematic teal and orange lighting' },
    { name: 'High Contrast', prompt: 'high contrast black and white lighting' }
];

export const POSTER_DISTANCE_OPTIONS: SimpleOption[] = [
    { name: 'Medium Shot', prompt: 'medium shot from waist up' },
    { name: 'Full Body', prompt: 'full body shot' }
];

export const POSTER_INDIVIDUAL_POSTURES: SimpleOption[] = [
    { name: 'Cool Lean', prompt: 'leaning slightly with attitude' },
    { name: 'Power Stance', prompt: 'wide stance, assertive' }
];

export const POSTER_FONT_OPTIONS: SimpleOption[] = [
    { name: 'Serif Bold', prompt: 'Bold Serif Typography' },
    { name: 'Sans-Serif Minimal', prompt: 'Minimal Sans-Serif Typography' },
    { name: 'Gothic', prompt: 'Gothic Calligraphy' }
];

// --- STUDIO CONFIG ---

export const STUDIO_SCENARIOS: SimpleOption[] = [
    { name: 'Business Meeting', prompt: 'a formal business meeting setting, shaking hands' },
    { name: 'Casual Hangout', prompt: 'casual coffee shop hangout, laughing' },
    { name: 'Red Carpet', prompt: 'posing on a red carpet event' }
];

export const STUDIO_POSES: SimpleOption[] = [
    { name: 'Handshake', prompt: 'shaking hands firmly' },
    { name: 'Conversation', prompt: 'engaged in conversation' },
    { name: 'Posing', prompt: 'posing for a photo together' }
];

// --- CAMPAIGN CONFIG ---

export const KENYAN_PARTIES: PoliticalParty[] = [
    { id: 'uda', name: 'UDA', fullName: 'United Democratic Alliance', symbol: 'Wheelbarrow', colors: 'Yellow and Green', hexColor: '#FFD700' },
    { id: 'odm', name: 'ODM', fullName: 'Orange Democratic Movement', symbol: 'Orange', colors: 'Orange and Blue', hexColor: '#FFA500' },
    { id: 'jubilee', name: 'Jubilee', fullName: 'Jubilee Party', symbol: 'Dove', colors: 'Red and White', hexColor: '#FF0000' }
];

export const CAMPAIGN_POSITIONS: SimpleOption[] = [
    { name: 'President', prompt: 'President', value: 'President' },
    { name: 'Governor', prompt: 'Governor', value: 'Governor' },
    { name: 'Senator', prompt: 'Senator', value: 'Senator' },
    { name: 'MP', prompt: 'Member of Parliament', value: 'Member of Parliament' },
    { name: 'Woman Rep', prompt: 'Woman Representative', value: 'Woman Representative' },
    { name: 'MCA', prompt: 'Member of County Assembly', value: 'Member of County Assembly' }
];

export const CAMPAIGN_WRAP_STYLES: SimpleOption[] = [
    { name: 'Full Body Branding', prompt: 'Full Body Branding', value: 'full' },
    { name: 'Rally Stripe', prompt: 'Rally Stripe', value: 'rally' },
    { name: 'Door Decals', prompt: 'Door Decals', value: 'minimal' },
    { name: 'Sound Truck', prompt: 'Sound Truck', value: 'soundtruck' }
];

export const CAMPAIGN_MODS: SimpleOption[] = [
    { name: 'PA Speakers', prompt: 'roof mounted PA speakers', value: 'speakers' },
    { name: 'Bullbar', prompt: 'front metal bullbar', value: 'bullbar' },
    { name: 'Flag Mounts', prompt: 'corner flag mounts', value: 'flags' }
];
