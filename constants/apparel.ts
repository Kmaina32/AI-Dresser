
import { OptionGroup } from './shared.ts';

/**
 * APPAREL STUDIO CONSTANTS
 * A comprehensive library of high-fashion styles, brands, and technical photography settings.
 */

// --- MENSWEAR STYLES (Hundreds of unique entries across sub-categories) ---
export const CATEGORIZED_SUIT_STYLES: OptionGroup[] = [
    {
        category: "Original State",
        styles: [
            { id: "original", name: "Keep Original Attire", prompt: "Preserve the user's original clothing exactly. No AI clothing changes.", tags: ['original'] }
        ]
    },
    {
        category: "Bespoke British (Savile Row)",
        styles: [
            { id: "huntsman_one_button", name: "Huntsman One-Button Bespoke", prompt: "A structured Huntsman-style Savile Row suit, sharp one-button closure, high armholes, flared skirt, heavy charcoal wool, peak lapels.", tags: ['formal', 'classic', 'british'] },
            { id: "gieves_hawkes_naval", name: "Gieves & Hawkes Admiral Cut", prompt: "Military-inspired Gieves & Hawkes tailoring, double-breasted navy wool, gold buttons, structured shoulders, traditional British elegance.", tags: ['formal', 'bold', 'british'] },
            { id: "anderson_sheppard_drape", name: "Anderson & Sheppard Soft Drape", prompt: "The classic English Drape cut, soft natural shoulders, full chest, comfortable but sharp silhouette, mid-grey flannel.", tags: ['classic', 'business'] },
            { id: "henry_poole_tuxedo", name: "Henry Poole Evening Dress", prompt: "Traditional Henry Poole tuxedo, grosgrain silk lapels, midnight blue barathea wool, perfectly balanced proportions.", tags: ['formal', 'gala'] },
            { id: "richard_james_modern", name: "Richard James Modern Slim", prompt: "Contemporary Savile Row slim fit, narrow lapels, vibrant lining, modern proportions, electric blue mohair blend.", tags: ['modern', 'business'] }
        ]
    },
    {
        category: "Italian Luxury (Milanese & Neapolitan)",
        styles: [
            { id: "brioni_masterpiece", name: "Brioni 'The Master' Suit", prompt: "Hand-stitched Brioni Roman-style suit, structured but lightweight, navy pinstripe Super 180s wool, high-gorge notch lapels.", tags: ['formal', 'power', 'italian'] },
            { id: "kiton_neapolitan", name: "Kiton Neapolitan Bespoke", prompt: "Unstructured Kiton silhouette, 'spalla camicia' shirt-style shoulders, 3-roll-2 buttoning, luxurious vicuña fabric, relaxed Mediterranean elegance.", tags: ['luxury', 'italian'] },
            { id: "armani_fluid_80s", name: "Giorgio Armani 'Power' Fluid", prompt: "The iconic 1980s Armani fluid suit, wide shoulders, low gorge, unstructured drape, greige crepe wool, relaxed executive look.", tags: ['vintage', 'business', 'italian'] },
            { id: "zegna_trofeo", name: "Ermenegildo Zegna Trofeo", prompt: "Zegna Trofeo silk-wool blend suit, modern tailored fit, iridescent finish, Italian high-performance luxury.", tags: ['modern', 'business'] },
            { id: "canali_kei", name: "Canali Kei Unlined", prompt: "Unlined Canali Kei jacket and trousers, casual elegance, textured hopsack wool, soft construction.", tags: ['casual', 'business'] }
        ]
    },
    {
        category: "Modern Executive (Global Brands)",
        styles: [
            { id: "tom_ford_windsor", name: "Tom Ford Windsor (Power Suit)", prompt: "Signature Tom Ford Windsor cut, wide peak lapels, roped shoulders, ticket pocket, luxurious windowpane check wool.", tags: ['bold', 'power', 'business'] },
            { id: "hugo_boss_superblack", name: "Hugo Boss Superblack Slim", prompt: "Sharp Hugo Boss slim-fit suit, deep jet-black wool, minimalist details, modern corporate aesthetic.", tags: ['modern', 'business'] },
            { id: "brooks_brothers_madison", name: "Brooks Brothers Madison", prompt: "Classic American Brooks Brothers sack suit, relaxed fit, natural shoulders, traditional pinstripe, Ivy League style.", tags: ['classic', 'american'] },
            { id: "paul_smith_artist", name: "Paul Smith Artist Stripe", prompt: "Slim Paul Smith suit with subtle colorful stripe details under the collar and lining, British quirky luxury.", tags: ['modern', 'creative'] },
            { id: "ralph_lauren_purple", name: "RL Purple Label Glen Plaid", prompt: "Ralph Lauren Purple Label glen plaid 3-piece suit, high-end equestrian vibes, peak lapels, luxury cashmere wool.", tags: ['luxury', 'classic'] }
        ]
    },
    {
        category: "Global Heritage & Cultural Luxe",
        styles: [
            { id: "nigerian_agbada_royal", name: "Royal Nigerian Agbada", prompt: "Grand 4-piece Nigerian Agbada, heavy gold intricate embroidery on cream damask, matching fila cap, royal prestige look.", tags: ['cultural', 'regal', 'ceremony'] },
            { id: "nigerian_senator_tailored", name: "Tailored Senator Suit", prompt: "Sleek Nigerian Senator attire, long-line tunic, royal blue high-quality fabric, subtle chest embroidery, matching trousers.", tags: ['cultural', 'business', 'modern'] },
            { id: "indian_sherwani_manish", name: "Manish Malhotra Sherwani", prompt: "Exquisite Indian Sherwani, heavy zardosi work, velvet stole with gold borders, silk churidar, celebrity wedding aesthetic.", tags: ['cultural', 'ceremony', 'regal'] },
            { id: "japanese_yukata_designer", name: "Modern Designer Yukata", prompt: "Japanese Yukata redesigned by modern designers, avant-garde patterns, technical fabric, architectural obi belt.", tags: ['cultural', 'modern'] },
            { id: "ghanaian_kente_suit", name: "Kente Fusion Suit", prompt: "Modern tailored suit featuring hand-woven Ghanaian Kente cloth panels on lapels and pockets, vibrant heritage chic.", tags: ['cultural', 'vibrant'] },
            { id: "arabian_bisht_gold", name: "Royal Arabian Bisht", prompt: "Traditional black Arabian Bisht with heavy gold 'Zari' embroidery on the borders, worn over a crisp white Thobe.", tags: ['cultural', 'regal'] },
            { id: "kenyan_maasai_modern", name: "Maasai High-Fashion", prompt: "Contemporary suit incorporating authentic Maasai Shuka red plaid patterns, beadwork details, East African pride.", tags: ['cultural', 'bold'] }
        ]
    },
    {
        category: "Red Carpet & Black Tie",
        styles: [
            { id: "velvet_dinner_jacket", name: "Velvet Dinner Jacket (Emerald)", prompt: "Slim-fit emerald green velvet dinner jacket, black satin shawl lapels, tuxedo trousers, luxury evening gala look.", tags: ['formal', 'gala'] },
            { id: "white_tie_tails", name: "Full White Tie & Tails", prompt: "The highest formal standard: Black tailcoat, white piqué waistcoat, white wing-collar shirt, white bow tie.", tags: ['formal', 'royal'] },
            { id: "double_breasted_tux", name: "DB Midnight Blue Tuxedo", prompt: "Midnight blue double-breasted tuxedo, peak lapels in black grosgrain, silk-wrapped buttons.", tags: ['formal', 'gala'] }
        ]
    }
];

// --- WOMENSWEAR STYLES ---
export const CATEGORIZED_WOMENS_STYLES: OptionGroup[] = [
    {
        category: "Original State",
        styles: [
            { id: "original", name: "Keep Original Attire", prompt: "Preserve the user's original clothing exactly.", tags: ['original'] }
        ]
    },
    {
        category: "Couture & Red Carpet Gowns",
        styles: [
            { id: "dior_ballgown_50s", name: "Dior 'New Look' Ballgown", prompt: "Christian Dior inspired architectural ballgown, cinched waist, massive tulle skirt, elegant structure, 1950s haute couture.", tags: ['formal', 'vintage', 'gala'] },
            { id: "versace_safety_pin", name: "Versace Medusa Gown", prompt: "Iconic Versace silk gown, high leg slit, gold safety pin details, Medusa hardware, sultry 90s supermodel glamour.", tags: ['bold', 'gala', 'designer'] },
            { id: "eliee_saab_lace", name: "Elie Saab Ethereal Lace", prompt: "Intricately beaded Elie Saab gown, floor-length lace, sequins, soft pastels, ethereal dream-like elegance.", tags: ['formal', 'gala'] },
            { id: "valentino_red", name: "Signature Valentino Red", prompt: "Floor-length Valentino silk gown in signature vibrant red, minimalist silhouette with dramatic cape sleeves.", tags: ['bold', 'formal'] },
            { id: "schanel_tweed_dress", name: "Chanel Tweed Ensemble", prompt: "Chanel-style pastel tweed shift dress and matching cropped jacket, pearl buttons, braided trim, Parisian chic.", tags: ['classic', 'business'] }
        ]
    },
    {
        category: "Power Suits & Tailoring",
        styles: [
            { id: "ysl_le_smoking", name: "YSL 'Le Smoking' Tuxedo", prompt: "The iconic Saint Laurent 'Le Smoking' tuxedo for women, sharp black blazer, slim trousers, silk lapels, androgynous power.", tags: ['business', 'bold', 'modern'] },
            { id: "alexander_mcqueen_armour", name: "McQueen Sharp Shoulders", prompt: "Alexander McQueen tailored blazer, architectural exaggerated shoulders, cinched waist, lace inserts, avant-garde power dressing.", tags: ['bold', 'modern'] },
            { id: "victoria_beckham_minimal", name: "VB Minimalist Executive", prompt: "Victoria Beckham style high-waisted wide-leg trousers, perfectly tailored silk blouse, oversized camel wool coat.", tags: ['business', 'modern', 'minimal'] },
            { id: "white_power_pantsuit", name: "Gala White Pantsuit", prompt: "All-white double-breasted power pantsuit, silk satin lapels, wide-leg trousers, red carpet authority look.", tags: ['business', 'formal'] }
        ]
    },
    {
        category: "Heritage & Global Couture",
        styles: [
            { id: "deola_sagoe_komole", name: "Deola Sagoe Komole", prompt: "High-end Deola Sagoe Komole lace gown, sculptural iro and buba design, intricate laser-cut textures, Nigerian bridal luxury.", tags: ['cultural', 'regal'] },
            { id: "sabyasachi_lehenga_red", name: "Sabyasachi Bridal Lehenga", prompt: "Red Sabyasachi bridal lehenga, heavy hand-embroidered gold zardosi work, jewelry set, Indian royalty aesthetic.", tags: ['cultural', 'ceremony'] },
            { id: "modern_cheongsam_silk", name: "Modern Silk Qipao", prompt: "Sleek silk Cheongsam (Qipao), modern side cutouts, hand-painted crane motifs, high-fashion Chinese heritage.", tags: ['cultural', 'modern'] },
            { id: "rich_aunty_ankara", name: "Rich Aunty Ankara Gown", prompt: "Dramatic puff-sleeve Ankara gown, vibrant patterns, floor-length mermaid silhouette, regal headwrap, high-status African look.", tags: ['cultural', 'vibrant'] }
        ]
    }
];

// --- KIDWEAR STYLES ---
export const CATEGORIZED_KIDS_STYLES: OptionGroup[] = [
    {
        category: "Original State",
        styles: [
            { id: "original", name: "Keep Original Attire", prompt: "Keep the child's original clothes.", tags: ['original'] }
        ]
    },
    {
        category: "Junior Formal",
        styles: [
            { id: "mini_tuxedo_black", name: "Junior Ring Bearer", prompt: "A perfectly scaled black miniature tuxedo, satin lapels, white shirt, black bow tie, child-sized formal elegance.", tags: ['formal', 'ceremony'] },
            { id: "flower_girl_lace", name: "Flower Girl Princess", prompt: "Ivory lace and tulle princess dress, satin sash, delicate embroidery, adorable gala look.", tags: ['formal', 'ceremony'] },
            { id: "gucci_kids_velvet", name: "Gucci Kids Velvet Blazer", prompt: "Deep navy velvet blazer for kids, gold crest buttons, khaki trousers, luxury preppy child look.", tags: ['luxury', 'classic'] }
        ]
    }
];

// --- NECKWEAR (Ties, Bow Ties, Scarves) ---
export const CATEGORIZED_TIE_STYLES: OptionGroup[] = [
    {
        category: "Neckwear",
        styles: [
            { id: "original", name: "No Neckwear Change", prompt: "", tags: ['original'] },
            { id: "silk_knit_navy", name: "Navy Silk Knit Tie", prompt: "Textured navy blue silk knit necktie with a square bottom, smart casual business look.", tags: ['business'] },
            { id: "hermes_pattern_silk", name: "Hermes Pattern Silk Tie", prompt: "Luxury Hermes-style orange silk tie with small animal prints, vibrant executive finish.", tags: ['luxury'] },
            { id: "black_silk_bow_tie", name: "Classic Black Bow Tie", prompt: "Hand-tied black silk satin bow tie, formal gala standard.", tags: ['formal'] },
            { id: "ascot_silk_cravat", name: "Silk Ascot Cravat", prompt: "Sophisticated silk patterned cravat tucked into an open-collar shirt, vintage aristocratic vibe.", tags: ['vintage', 'casual'] },
            { id: "bolotie_western", name: "Western Silver Bolo Tie", prompt: "Turquoise and silver bolo tie, black leather cord, authentic Western formal style.", tags: ['themed'] }
        ]
    }
];

// --- HEADWEAR (Hats, Caps, Headwraps) ---
export const CATEGORIZED_HEADWEAR_STYLES: OptionGroup[] = [
    {
        category: "Headwear",
        styles: [
            { id: "original", name: "No Headwear Change", prompt: "", tags: ['original'] },
            { id: "borsalino_fedora", name: "Borsalino Wool Fedora", prompt: "Classic charcoal grey Borsalino felt fedora, wide brim, grosgrain band, timeless movie star style.", tags: ['accessory', 'classic'] },
            { id: "panama_hat_summer", name: "Ecuadorian Panama Hat", prompt: "Fine hand-woven straw Panama hat, black band, summer vacation elegance.", tags: ['accessory', 'casual'] },
            { id: "ny_yankees_cap", name: "New Era NY Yankees Cap", prompt: "Classic navy and white New Era NY Yankees baseball cap, streetwear iconic look.", tags: ['streetwear'] },
            { id: "beret_parisian", name: "Wool Parisian Beret", prompt: "Classic black wool beret, artistic French aesthetic.", tags: ['accessory'] },
            { id: "cultural_gele_regal", name: "Regal Nigerian Gele", prompt: "Stiff, architectural hand-wrapped Nigerian Gele headtie, matching the outfit's vibrant fabric.", tags: ['cultural', 'regal'] },
            { id: "arabian_ghutra_royal", name: "Royal Ghutra & Agal", prompt: "White Arabian Ghutra held by a black Agal, perfectly folded, traditional prestige.", tags: ['cultural'] }
        ]
    }
];

// --- FOOTWEAR (Men & Women) ---
export const CATEGORIZED_SHOE_STYLES: OptionGroup[] = [
    {
        category: "Men's Luxury & Formal",
        styles: [
            { id: "original", name: "Keep Original Shoes", prompt: "", tags: ['original'] },
            { id: "john_lobb_oxford", name: "John Lobb City Oxfords", prompt: "Handmade John Lobb black leather Oxford shoes, mirror-shine finish, the pinnacle of formal footwear.", tags: ['formal'] },
            { id: "berluti_patina", name: "Berluti Wholecut Patina", prompt: "Berluti Alessandro wholecut leather shoes with a deep tobacco-brown hand-painted patina.", tags: ['luxury', 'bold'] },
            { id: "gucci_horsebit_loafers", name: "Gucci Horsebit Loafers", prompt: "Classic black leather Gucci loafers with gold horsebit hardware, timeless Italian casual luxury.", tags: ['luxury', 'business'] },
            { id: "jordan_1_chicago", name: "Jordan 1 Retro High", prompt: "Air Jordan 1 'Chicago' colorway, high-top basketball sneakers, high-end streetwear icon.", tags: ['streetwear'] },
            { id: "chelsea_boots_suede", name: "Saint Laurent Chelsea Boots", prompt: "Slim-fit tan suede Chelsea boots, sleek silhouette, rock-and-roll luxury vibe.", tags: ['modern', 'designer'] }
        ]
    },
    {
        category: "Women's Designer Shoes",
        styles: [
            { id: "original", name: "Keep Original Shoes", prompt: "", tags: ['original'] },
            { id: "louboutin_so_kate", name: "Louboutin Red Bottoms", prompt: "Christian Louboutin 'So Kate' black patent leather pumps, signature red soles, 120mm heel.", tags: ['formal', 'gala'] },
            { id: "manolo_hangisi", name: "Manolo Blahnik Hangisi", prompt: "Royal blue satin Manolo Blahnik pumps with a large crystal buckle, Sex and the City iconic style.", tags: ['formal', 'luxury'] },
            { id: "jimmy_choo_glitter", name: "Jimmy Choo Glitter Pumps", prompt: "Silver sparkling glitter Jimmy Choo high heels, perfect for a red carpet event.", tags: ['gala'] },
            { id: "stuart_weitzman_otk", name: "Stuart Weitzman OTK Boots", prompt: "Over-the-knee black suede Stuart Weitzman boots, sleek leg-hugging fit.", tags: ['modern', 'casual'] }
        ]
    }
];

// --- POSTURES (Photography Poses) ---
export const POSTURE_OPTIONS = [
    { id: 'original', name: 'Original Pose', prompt: 'Preserve the original body angle and posture exactly.', tags: ['original'] },
    { id: 'editorial_power', name: 'Editorial Power Stance', prompt: 'Subject standing confidently, feet shoulder-width apart, hands at sides, direct authoritative gaze at camera.', tags: ['pose'] },
    { id: 'candid_walking', name: 'Candid Street Walk', prompt: 'Mid-stride walking down a city street, looking away naturally, motion blur on legs for realism.', tags: ['pose'] },
    { id: 'sitting_ceo', name: 'Executive Seated Pose', prompt: 'Sitting in a high-back leather chair, legs crossed, arms resting on armrests, thinking man gesture.', tags: ['pose'] },
    { id: 'hands_in_pockets', name: 'Relaxed Hand-in-Pocket', prompt: 'Leaning slightly to the side, one hand in trouser pocket, relaxed but tailored silhouette.', tags: ['pose'] },
    { id: 'crossed_arms_modern', name: 'Modern Arms Crossed', prompt: 'Arms crossed over chest, looking friendly and approachable but professional.', tags: ['pose'] }
];

// --- BACKGROUNDS (Global Locations & Studios) ---
export const APPAREL_BACKGROUNDS = [
    { name: "Original / As Is", prompt: "Preserve the original background from the uploaded photo exactly." },
    { name: "Studio: Cyclorama White", prompt: "A professional seamless white cyclorama studio wall, soft floor shadows, high-key commercial look." },
    { name: "Studio: Dark V-Flat", prompt: "Moody dark grey studio background with soft light falloff, professional fashion editorial setup." },
    { name: "Paris: Rue de Rivoli", prompt: "Blurred elegant Paris street background, Haussmann architecture, afternoon light." },
    { name: "NYC: Soho Rooftop", prompt: "Industrial New York City rooftop, iron railings, skyline in the distance, sunset glow." },
    { name: "Dubai: Burj Al Arab Lobby", prompt: "Opulent gold and marble lobby, grand chandeliers, high-end luxury lifestyle vibe." },
    { name: "Milan: Galleria Vittorio", prompt: "Magnificent glass-domed Italian arcade background, historic luxury shopping atmosphere." }
];

// --- LIGHTING (Cinematic & Professional) ---
export const APPAREL_LIGHTING = [
    { name: "Original / As Is", prompt: "Preserve the lighting from the original photo exactly." },
    { name: "Rembrandt Lighting", prompt: "Classic portrait lighting with a distinctive triangle of light on the cheek, moody and artistic." },
    { name: "Butterfly (Paramount) Lighting", prompt: "High-fashion glamour lighting, flawless skin, bright eyes, shadow directly under the nose." },
    { name: "Golden Hour Sunset", prompt: "Warm, diffused amber sunlight hitting the subject from the side, long shadows, lens flares." },
    { name: "Cinematic Neon Noir", prompt: "Dramatic teal and magenta lighting, high contrast shadows, cyberpunk urban feel." },
    { name: "Studio Softbox (Even)", prompt: "Very soft, even, diffused lighting from multiple large softboxes, no harsh shadows." }
];

// --- DEFAULTS ---
export const DEFAULT_SHOE_OPTION = { id: 'original', name: 'Original Shoes', prompt: '', tags: [] };
export const DEFAULT_SHIRT_OPTION = { id: 'original', name: 'No Change', prompt: '', tags: [] };
export const DEFAULT_TIE_OPTION = { id: 'original', name: 'No Change', prompt: '', tags: [] };
export const DEFAULT_HANDBAG_OPTION = { id: 'original', name: 'No Change', prompt: '', tags: [] };
export const DEFAULT_POSTURE_OPTION = { id: 'original', name: 'Original Pose', prompt: '', tags: [] };
export const DEFAULT_EYEWEAR_OPTION = { id: 'original', name: 'No Change', prompt: '', tags: [] };
export const DEFAULT_HEADWEAR_OPTION = { id: 'original', name: 'No Change', prompt: '', tags: [] };

export const SHIRT_OPTIONS = [
    { id: 'white_poplin', name: 'White Poplin Shirt', prompt: 'Crisp white high-thread count cotton poplin shirt with stiff spread collar', tags: ['formal'] },
    { id: 'black_silk_turtleneck', name: 'Black Silk Turtleneck', prompt: 'Slim-fit black silk-blend turtleneck, modern and sophisticated.', tags: ['modern'] }
];

export const CATEGORIZED_HANDBAG_STYLES: OptionGroup[] = [
    { 
        category: 'Luxury Bags', 
        styles: [
            { id: 'original', name: 'No Change', prompt: '', tags: ['original'] },
            { id: 'hermes_birkin_35', name: 'Hermes Birkin 35', prompt: 'Iconic Hermes Birkin bag in orange togo leather, silver hardware.', tags: ['luxury'] },
            { id: 'chanel_classic_flap', name: 'Chanel Classic Flap', prompt: 'Black quilted Chanel leather bag with gold chain strap.', tags: ['luxury'] }
        ] 
    }
];

export const CATEGORIZED_EYEWEAR_STYLES: OptionGroup[] = [
    {
        category: 'Designer Frames',
        styles: [
            { id: 'original', name: 'No Change', prompt: '', tags: ['original'] },
            { id: 'rayban_wayfarer', name: 'Ray-Ban Wayfarer', prompt: 'Classic Ray-Ban Wayfarer black sunglasses.', tags: ['accessory'] },
            { id: 'cartier_santos_glasses', name: 'Cartier Santos Frames', prompt: 'Luxury Cartier gold-rimmed optical glasses.', tags: ['accessory'] }
        ]
    }
];

export const CATEGORIZED_KIDS_SHOE_STYLES: OptionGroup[] = [
    { 
        category: "Kids Shoes", 
        styles: [
            { id: "original", name: "Original Shoes", prompt: "", tags: ['original'] },
            { id: "patent_loafers", name: "Patent Loafers", prompt: "Shiny black patent leather loafers for children.", tags: ['formal'] }
        ] 
    }
];

export const CATEGORIZED_WOMENS_SHOE_STYLES: OptionGroup[] = CATEGORIZED_SHOE_STYLES.filter(c => c.category.includes("Women"));
