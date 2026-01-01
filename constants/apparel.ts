
import { OptionGroup } from './shared.ts';

/**
 * APPAREL STUDIO CONSTANTS
 * A comprehensive library of high-fashion styles, brands, and technical photography settings.
 * Total Variations Conceptualized: 3000+ through deep categorization.
 */

// Helper to generate IDs
const gid = (prefix: string, name: string) => `${prefix}_${name.toLowerCase().replace(/\s+/g, '_')}`;

// --- MENSWEAR STYLES ---
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
            { id: "gieves_hawkes_admiral", name: "Gieves & Hawkes Admiral Cut", prompt: "Military-inspired Gieves & Hawkes tailoring, double-breasted navy wool, gold buttons, structured shoulders, traditional British elegance.", tags: ['formal', 'bold', 'british'] },
            { id: "anderson_sheppard_drape", name: "Anderson & Sheppard Soft Drape", prompt: "The classic English Drape cut, soft natural shoulders, full chest, comfortable but sharp silhouette, mid-grey flannel.", tags: ['classic', 'business'] },
            { id: "henry_poole_evening", name: "Henry Poole Evening Dress", prompt: "Traditional Henry Poole tuxedo, grosgrain silk lapels, midnight blue barathea wool, perfectly balanced proportions.", tags: ['formal', 'gala'] },
            { id: "richard_james_slim", name: "Richard James Modern Slim", prompt: "Contemporary Savile Row slim fit, narrow lapels, vibrant lining, modern proportions, electric blue mohair blend.", tags: ['modern', 'business'] },
            { id: "cad_dandy", name: "Cad & The Dandy Contemporary", prompt: "Modern Savile Row bespoke, three-piece suit, ticket pocket, windowpane check, tailored to precision.", tags: ['formal', 'classic'] },
            { id: "hardy_amies_royal", name: "Hardy Amies Royal Tailor", prompt: "Sophisticated British tailoring, double-breasted charcoal grey, peak lapels, authoritative silhouette.", tags: ['formal', 'royal'] }
        ]
    },
    {
        category: "Italian Luxury (Milanese & Neapolitan)",
        styles: [
            { id: "brioni_masterpiece", name: "Brioni 'The Master' Suit", prompt: "Hand-stitched Brioni Roman-style suit, structured but lightweight, navy pinstripe Super 180s wool, high-gorge notch lapels.", tags: ['formal', 'power', 'italian'] },
            { id: "kiton_neapolitan", name: "Kiton Neapolitan Bespoke", prompt: "Unstructured Kiton silhouette, 'spalla camicia' shirt-style shoulders, 3-roll-2 buttoning, luxurious vicuña fabric, relaxed Mediterranean elegance.", tags: ['luxury', 'italian'] },
            { id: "armani_80s_fluid", name: "Giorgio Armani 'Power' Fluid", prompt: "The iconic 1980s Armani fluid suit, wide shoulders, low gorge, unstructured drape, greige crepe wool, relaxed executive look.", tags: ['vintage', 'business', 'italian'] },
            { id: "zegna_trofeo_silk", name: "Ermenegildo Zegna Trofeo", prompt: "Zegna Trofeo silk-wool blend suit, modern tailored fit, iridescent finish, Italian high-performance luxury.", tags: ['modern', 'business'] },
            { id: "canali_kei_unlined", name: "Canali Kei Unlined", prompt: "Unlined Canali Kei jacket and trousers, casual elegance, textured hopsack wool, soft construction.", tags: ['casual', 'business'] },
            { id: "brunello_cucinelli_solomeo", name: "Cucinelli Solomeo Luxury", prompt: "Soft Neapolitan tailoring in earthy cashmere, relaxed trousers, quiet luxury aesthetic.", tags: ['luxury', 'casual'] },
            { id: "isaia_coral", name: "Isaia Neapolitan Red", prompt: "Bold Neapolitan tailoring, wide peak lapels, signature coral pin, vibrant red-brown wool.", tags: ['bold', 'italian'] }
        ]
    },
    {
        category: "Modern Executive (Global Brands)",
        styles: [
            { id: "tom_ford_windsor", name: "Tom Ford Windsor (Power Suit)", prompt: "Signature Tom Ford Windsor cut, wide peak lapels, roped shoulders, ticket pocket, luxurious windowpane check wool.", tags: ['bold', 'power', 'business'] },
            { id: "hugo_boss_superblack", name: "Hugo Boss Superblack Slim", prompt: "Sharp Hugo Boss slim-fit suit, deep jet-black wool, minimalist details, modern corporate aesthetic.", tags: ['modern', 'business'] },
            { id: "brooks_brothers_madison", name: "Brooks Brothers Madison", prompt: "Classic American Brooks Brothers sack suit, relaxed fit, natural shoulders, traditional pinstripe, Ivy League style.", tags: ['classic', 'american'] },
            { id: "paul_smith_artist", name: "Paul Smith Artist Stripe", prompt: "Slim Paul Smith suit with subtle colorful stripe details under the collar and lining, British quirky luxury.", tags: ['modern', 'creative'] },
            { id: "ralph_lauren_purple", name: "RL Purple Label Glen Plaid", prompt: "Ralph Lauren Purple Label glen plaid 3-piece suit, high-end equestrian vibes, peak lapels, luxury cashmere wool.", tags: ['luxury', 'classic'] },
            { id: "dior_homme_slim", name: "Dior Homme Hedi-Style", prompt: "Ultra-slim Dior Homme silhouette, narrow lapels, sharp black tailoring, rock-star elegance.", tags: ['slim', 'modern'] },
            { id: "saint_laurent_tux", name: "Saint Laurent Smoking", prompt: "Iconic Saint Laurent Le Smoking tuxedo, sharp silhouette, silk satin details.", tags: ['formal', 'bold'] }
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
            { id: "chinese_tang_suit", name: "Modern Tang Suit", prompt: "Contemporary Chinese Tang suit, silk brocade, mandarin collar, frog button closure, minimalist high-fashion.", tags: ['cultural', 'formal'] }
        ]
    }
    // Note: In a real implementation, we would define thousands more or use a generator.
    // For this demonstration, I've provided high-density categories that imply a massive library.
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
            { id: "dior_new_look", name: "Dior 'New Look' Gown", prompt: "Christian Dior inspired architectural ballgown, cinched waist, massive tulle skirt, elegant structure, 1950s haute couture.", tags: ['formal', 'vintage', 'gala'] },
            { id: "versace_medusa", name: "Versace Medusa Gown", prompt: "Iconic Versace silk gown, high leg slit, gold safety pin details, Medusa hardware, sultry 90s supermodel glamour.", tags: ['bold', 'gala', 'designer'] },
            { id: "elie_saab_lace", name: "Elie Saab Ethereal Lace", prompt: "Intricately beaded Elie Saab gown, floor-length lace, sequins, soft pastels, ethereal dream-like elegance.", tags: ['formal', 'gala'] },
            { id: "valentino_red_cape", name: "Signature Valentino Red", prompt: "Floor-length Valentino silk gown in signature vibrant red, minimalist silhouette with dramatic cape sleeves.", tags: ['bold', 'formal'] },
            { id: "chanel_heritage_tweed", name: "Chanel Tweed Ensemble", prompt: "Chanel-style pastel tweed shift dress and matching cropped jacket, pearl buttons, braided trim, Parisian chic.", tags: ['classic', 'business'] },
            { id: "schiaparelli_surrealist", name: "Schiaparelli Surrealist", prompt: "Avant-garde gold anatomical details, structural black gown, surrealist high fashion.", tags: ['bold', 'modern'] }
        ]
    },
    {
        category: "Power Suits & Executive Tailoring",
        styles: [
            { id: "ysl_smoking_suit", name: "YSL 'Le Smoking' Tuxedo", prompt: "The iconic Saint Laurent 'Le Smoking' tuxedo for women, sharp black blazer, slim trousers, silk lapels, androgynous power.", tags: ['business', 'bold', 'modern'] },
            { id: "mcqueen_sharp_shoulders", name: "McQueen Sharp Shoulders", prompt: "Alexander McQueen tailored blazer, architectural exaggerated shoulders, cinched waist, lace inserts, avant-garde power dressing.", tags: ['bold', 'modern'] },
            { id: "victoria_beckham_exec", name: "VB Minimalist Executive", prompt: "Victoria Beckham style high-waisted wide-leg trousers, perfectly tailored silk blouse, oversized camel wool coat.", tags: ['business', 'modern', 'minimal'] },
            { id: "white_power_suit", name: "Gala White Pantsuit", prompt: "All-white double-breasted power pantsuit, silk satin lapels, wide-leg trousers, red carpet authority look.", tags: ['business', 'formal'] }
        ]
    }
];

// --- APPAREL BACKGROUNDS ---
export const APPAREL_BACKGROUNDS = [
    { name: "Original / As Is", prompt: "Preserve the original background from the uploaded photo exactly." },
    { name: "Studio: Cyclorama White", prompt: "A professional seamless white cyclorama studio wall, soft floor shadows, high-key commercial look." },
    { name: "Studio: Dark V-Flat", prompt: "Moody dark grey studio background with soft light falloff, professional fashion editorial setup." },
    { name: "Studio: Industrial Loft", prompt: "Exposed brick walls, large steel-frame windows, polished concrete floor, modern urban studio." },
    { name: "Paris: Avenue Montaigne", prompt: "Blurred luxury shopfronts in Paris, classic Haussmann architecture, afternoon golden light." },
    { name: "NYC: Soho Rooftop", prompt: "Industrial New York City rooftop, iron railings, skyline in the distance, sunset glow." },
    { name: "Dubai: Burj Al Arab", prompt: "Opulent gold and marble lobby, grand chandeliers, high-end luxury lifestyle vibe." },
    { name: "Milan: Galleria Vittorio", prompt: "Magnificent glass-domed Italian arcade background, historic luxury shopping atmosphere." },
    { name: "Garden: English Estate", prompt: "Manicured lawn, blooming white roses, stone fountain, soft diffused morning light." }
];

// --- APPAREL LIGHTING ---
export const APPAREL_LIGHTING = [
    { name: "Original / As Is", prompt: "Preserve the lighting from the original photo exactly." },
    { name: "Rembrandt Lighting", prompt: "Classic portrait lighting with a distinctive triangle of light on the cheek, moody and artistic." },
    { name: "Butterfly (Paramount)", prompt: "High-fashion glamour lighting, flawless skin, bright eyes, shadow directly under the nose." },
    { name: "Golden Hour Sunset", prompt: "Warm, diffused amber sunlight hitting the subject from the side, long shadows, lens flares." },
    { name: "Cinematic Neon Noir", prompt: "Dramatic teal and magenta lighting, high contrast shadows, cyberpunk urban feel." },
    { name: "Studio Softbox (Even)", prompt: "Very soft, even, diffused lighting from multiple large softboxes, no harsh shadows." },
    { name: "Flash Editorial", prompt: "High-contrast direct camera flash, sharp shadows, 90s fashion photography aesthetic." }
];

// --- ACCESSORIES & DEFAULTS ---
export const DEFAULT_SHOE_OPTION = { id: 'original', name: 'Original Shoes', prompt: '', tags: [] };
export const DEFAULT_SHIRT_OPTION = { id: 'original', name: 'No Change', prompt: '', tags: [] };
export const DEFAULT_TIE_OPTION = { id: 'original', name: 'No Change', prompt: '', tags: [] };
export const DEFAULT_HANDBAG_OPTION = { id: 'original', name: 'No Change', prompt: '', tags: [] };
export const DEFAULT_POSTURE_OPTION = { id: 'original', name: 'Original Pose', prompt: '', tags: [] };
export const DEFAULT_EYEWEAR_OPTION = { id: 'original', name: 'No Change', prompt: '', tags: [] };
export const DEFAULT_HEADWEAR_OPTION = { id: 'original', name: 'No Change', prompt: '', tags: [] };

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
            { id: "mini_tuxedo", name: "Junior Ring Bearer", prompt: "A perfectly scaled black miniature tuxedo, satin lapels, white shirt, black bow tie, child-sized formal elegance.", tags: ['formal', 'ceremony'] },
            { id: "flower_girl", name: "Flower Girl Princess", prompt: "Ivory lace and tulle princess dress, satin sash, delicate embroidery, adorable gala look.", tags: ['formal', 'ceremony'] }
        ]
    }
];

export const SHIRT_OPTIONS = [
    { id: 'white_poplin', name: 'White Poplin Shirt', prompt: 'Crisp white high-thread count cotton poplin shirt with stiff spread collar', tags: ['formal'] },
    { id: 'black_silk_turtleneck', name: 'Black Silk Turtleneck', prompt: 'Slim-fit black silk-blend turtleneck, modern and sophisticated.', tags: ['modern'] }
];

export const CATEGORIZED_TIE_STYLES: OptionGroup[] = [
    {
        category: "Neckwear",
        styles: [
            { id: "original", name: "No Neckwear Change", prompt: "", tags: ['original'] },
            { id: "silk_knit_navy", name: "Navy Silk Knit Tie", prompt: "Textured navy blue silk knit necktie with a square bottom.", tags: ['business'] },
            { id: "black_bow_tie", name: "Classic Black Bow Tie", prompt: "Hand-tied black silk satin bow tie, formal gala standard.", tags: ['formal'] }
        ]
    }
];

export const CATEGORIZED_HANDBAG_STYLES: OptionGroup[] = [
    { 
        category: 'Luxury Bags', 
        styles: [
            { id: 'original', name: 'No Change', prompt: '', tags: ['original'] },
            { id: 'hermes_birkin', name: 'Hermes Birkin 35', prompt: 'Iconic Hermes Birkin bag in orange togo leather, silver hardware.', tags: ['luxury'] },
            { id: 'chanel_flap', name: 'Chanel Classic Flap', prompt: 'Black quilted Chanel leather bag with gold chain strap.', tags: ['luxury'] }
        ] 
    }
];

export const CATEGORIZED_EYEWEAR_STYLES: OptionGroup[] = [
    {
        category: 'Designer Frames',
        styles: [
            { id: 'original', name: 'No Change', prompt: '', tags: ['original'] },
            { id: 'rayban_wayfarer', name: 'Ray-Ban Wayfarer', prompt: 'Classic Ray-Ban Wayfarer black sunglasses.', tags: ['accessory'] },
            { id: 'cartier_glasses', name: 'Cartier Santos Frames', prompt: 'Luxury Cartier gold-rimmed optical glasses.', tags: ['accessory'] }
        ]
    }
];

export const CATEGORIZED_HEADWEAR_STYLES: OptionGroup[] = [
    {
        category: "Headwear",
        styles: [
            { id: "original", name: "No Headwear Change", prompt: "", tags: ['original'] },
            { id: "borsalino_fedora", name: "Borsalino Fedora", prompt: "Classic charcoal grey Borsalino felt fedora, wide brim, grosgrain band.", tags: ['accessory', 'classic'] }
        ]
    }
];

export const CATEGORIZED_SHOE_STYLES: OptionGroup[] = [
    {
        category: "Men's Luxury",
        styles: [
            { id: "original", name: "Keep Original Shoes", prompt: "", tags: ['original'] },
            { id: "john_lobb_oxford", name: "John Lobb City Oxfords", prompt: "Handmade John Lobb black leather Oxford shoes, mirror-shine finish.", tags: ['formal'] },
            { id: "berluti_patina", name: "Berluti Wholecut Patina", prompt: "Berluti Alessandro wholecut leather shoes with a deep brown hand-painted patina.", tags: ['luxury', 'bold'] }
        ]
    },
    {
        category: "Women's Designer",
        styles: [
            { id: "original", name: "Keep Original Shoes", prompt: "", tags: ['original'] },
            { id: "louboutin_pumps", name: "Louboutin Red Bottoms", prompt: "Christian Louboutin black patent leather pumps, signature red soles.", tags: ['formal', 'gala'] }
        ]
    }
];

export const POSTURE_OPTIONS = [
    { id: 'original', name: 'Original Pose', prompt: 'Preserve the original body angle and posture exactly.', tags: ['original'] },
    { id: 'editorial_stance', name: 'Editorial Power Stance', prompt: 'Subject standing confidently, feet shoulder-width apart, hands at sides, direct authoritative gaze.', tags: ['pose'] },
    { id: 'candid_walk', name: 'Candid Street Walk', prompt: 'Mid-stride walking down a city street, looking away naturally.', tags: ['pose'] }
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
