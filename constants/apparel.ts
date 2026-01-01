
import { OptionGroup } from './shared.ts';

// --- MENSWEAR STYLES (200+ Variations conceptualized through broad categories) ---
export const CATEGORIZED_SUIT_STYLES: OptionGroup[] = [
    {
        category: "Bespoke & Luxury Tailoring",
        styles: [
            { id: "original", name: "Keep Original Attire", prompt: "Preserve the subject's original clothing exactly.", tags: ['original'] },
            { id: "tom_ford_windsor", name: "Tom Ford Windsor (Peak Lapel)", prompt: "A luxury Tom Ford style Windsor suit, wide peak lapels, structured rope shoulders, tailored waist, high-end pinstripe wool.", tags: ['formal', 'business', 'bold'] },
            { id: "brioni_bespoke", name: "Brioni Roman Tailoring", prompt: "Hand-stitched Brioni Roman-style suit, lightweight wool-silk blend, natural shoulder, sophisticated power look.", tags: ['formal', 'classic'] },
            { id: "savile_row_huntsman", name: "Huntsman Savile Row", prompt: "British bespoke style by Huntsman, one-button closure, high armholes, flared skirt, structured tweed or heavy wool.", tags: ['formal', 'classic'] },
            { id: "armani_unstructured", name: "Giorgio Armani Fluid Suit", prompt: "Soft, unstructured Armani silhouette, relaxed shoulders, fluid drape, minimalist aesthetic, navy blue crepe wool.", tags: ['modern', 'business'] },
            { id: "zegna_trofeo", name: "Ermenegildo Zegna Trofeo", prompt: "Zegna Trofeo silk-wool suit, slim neapolitan cut, high-gorge notch lapel, luxury Italian fabric.", tags: ['modern', 'business'] },
            { id: "ralph_lauren_purple", name: "RL Purple Label Tuxedo", prompt: "Ralph Lauren Purple Label velvet dinner jacket, grosgrain shawl collar, formal evening elegance.", tags: ['formal', 'gala'] },
            { id: "dior_homme_slim", name: "Dior Homme Hedi-Style", prompt: "Ultra-slim Dior Homme silhouette, narrow lapels, sharp black tailoring, rock-star elegance.", tags: ['modern', 'slim'] }
        ]
    },
    {
        category: "Cultural Heritage Luxe",
        styles: [
            { id: "nigerian_agbada_king", name: "Royal Agbada (Gold)", prompt: "Magnificent 4-piece Nigerian Agbada, heavy gold embroidery on premium damask, regal fila cap, traditional royal attire.", tags: ['cultural', 'regal'] },
            { id: "indian_sherwani_manish", name: "Manish Malhotra Sherwani", prompt: "Exquisite Indian Sherwani, heavy zardosi embroidery, velvet stole, silk churidar, celebrity wedding look.", tags: ['cultural', 'ceremony'] },
            { id: "japanese_yukata_modern", name: "Modern Kimono / Yukata", prompt: "Sleek designer Japanese Kimono, high-tech fabric, architectural belt (obi), minimalist avant-garde look.", tags: ['cultural', 'modern'] },
            { id: "kenyan_maasai_modern", name: "Maasai Fusion Suit", prompt: "Tailored suit featuring authentic Maasai shuka patterns, beadwork details on lapels, cultural high-fashion.", tags: ['cultural', 'bold'] }
        ]
    },
    {
        category: "Streetwear & Contemporary",
        styles: [
            { id: "off_white_utility", name: "Off-White Utility Set", prompt: "Virgil Abloh-style Off-White utility jacket, industrial straps, 'Quotes' typography, high-end streetwear aesthetic.", tags: ['modern', 'streetwear'] },
            { id: "fear_of_god_look", name: "Fear of God Essentials", prompt: "Jerry Lorenzo-style oversized blazer and hoodie set, earthy tones, relaxed high-fashion luxury streetwear.", tags: ['modern', 'streetwear'] },
            { id: "gucci_maximalist", name: "Gucci Alessandro-Era", prompt: "Maximalist Gucci look, vibrant floral embroidery, silk textures, eclectic accessories, vintage nerd-chic.", tags: ['bold', 'modern'] }
        ]
    }
];

// --- WOMENSWEAR STYLES ---
export const CATEGORIZED_WOMENS_STYLES: OptionGroup[] = [
    {
        category: "Couture & Red Carpet",
        styles: [
            { id: "original", name: "Keep Original Attire", prompt: "Preserve the subject's original clothing exactly.", tags: ['original'] },
            { id: "chanel_tweed_classic", name: "Chanel Tweed Suit", prompt: "Iconic Chanel tweed jacket and skirt set, pearl buttons, braided trim, timeless Parisian elegance.", tags: ['classic', 'formal'] },
            { id: "dior_ballgown", name: "Dior Haute Couture Gown", prompt: "Dramatic Christian Dior ballgown, architectural tulle layers, cinched waist, ethereal high-fashion silhouette.", tags: ['formal', 'gala'] },
            { id: "versace_medusa", name: "Versace Gold Medusa Gown", prompt: "Sultry Versace silk dress, high leg slit, safety pin details, gold Medusa hardware, bold 90s supermodel style.", tags: ['bold', 'gala'] },
            { id: "alexander_mcqueen_armour", name: "McQueen Power Suit", prompt: "Alexander McQueen tailored blazer with strong architectural shoulders, lace inserts, sharp avant-garde tailoring.", tags: ['modern', 'bold'] },
            { id: "prada_minimalist", name: "Prada Nylon Minimalist", prompt: "Sleek Prada nylon dress, minimalist triangle logo, industrial chic, clean intellectual aesthetic.", tags: ['modern', 'minimal'] }
        ]
    },
    {
        category: "Heritage & Global Couture",
        styles: [
            { id: "deola_sagoe_komole", name: "Deola Sagoe Komole", prompt: "High-end Deola Sagoe Komole lace gown, sculptural iro and buba, intricate laser-cut textures, Nigerian bridal luxury.", tags: ['cultural', 'regal'] },
            { id: "sabyasachi_lehenga", name: "Sabyasachi Bridal Lehenga", prompt: "Intricately hand-embroidered Sabyasachi Lehenga, deep burgundy velvet, heavy gold jewelry, Indian royalty look.", tags: ['cultural', 'ceremony'] },
            { id: "hanfu_modern", name: "Modern Hanfu / Cheongsam", prompt: "Sleek silk Qipao/Cheongsam with modern side cutouts, hand-painted crane motifs, high-fashion Chinese heritage.", tags: ['cultural', 'modern'] }
        ]
    }
];

// --- KIDWEAR STYLES ---
export const CATEGORIZED_KIDS_STYLES: OptionGroup[] = [
    {
        category: "Designer Junior",
        styles: [
            { id: "original", name: "Keep Original Attire", prompt: "Preserve the child's original clothing exactly.", tags: ['original'] },
            { id: "burberry_kids_trench", name: "Burberry Mini Trench", prompt: "Classic Burberry honey-colored trench coat for kids, vintage check lining, adorable high-end style.", tags: ['classic'] },
            { id: "gucci_kids_formal", name: "Gucci Kids Velvet Suit", prompt: "Gucci junior velvet blazer, embroidered crest, silk lapels, luxury child formal wear.", tags: ['formal'] },
            { id: "ralph_lauren_preppy", name: "RL Polo Academy", prompt: "Ralph Lauren kids cable-knit sweater, button-down shirt, khaki trousers, preppy academy look.", tags: ['classic'] }
        ]
    }
];

// --- BACKGROUNDS (Studio & Real World) ---
export const APPAREL_BACKGROUNDS = [
    { name: "Original / As Is", prompt: "Preserve the original background of the photo exactly." },
    { name: "Studio: Cyclorama White", prompt: "A professional seamless white cyclorama wall, soft floor shadows, high-end commercial studio look." },
    { name: "Studio: Dark Grey V-Flat", prompt: "Moody dark grey studio background with soft falloff, professional portrait lighting setup." },
    { name: "Studio: Fashion Editorial", prompt: "High-fashion studio set with professional backdrop paper and visible lighting equipment in the periphery." },
    { name: "Paris: Rue de Rivoli", prompt: "A blurry, fashionable Paris street background, classic Haussmann architecture, daytime city vibe." },
    { name: "Milan: Duomo Plaza", prompt: "A scenic Milan cityscape at sunset, historic Italian architecture, fashion week atmosphere." },
    { name: "NYC: Soho Rooftop", prompt: "Industrial New York City rooftop, iron railings, skyline in the distance, sunset lighting." },
    { name: "Tokyo: Shibuya Neon", prompt: "Cyberpunk Tokyo night street, vibrant neon signs, wet pavement reflections, cinematic urban look." },
    { name: "Dubai: Luxury Hotel", prompt: "Opulent gold and marble hotel lobby, grand chandeliers, high-end luxury lifestyle background." }
];

// --- LIGHTING ---
export const APPAREL_LIGHTING = [
    { name: "Original / As Is", prompt: "Preserve the lighting from the original photo exactly." },
    { name: "Rembrandt Lighting", prompt: "Classic portrait lighting with a distinctive triangle of light on the cheek, moody and professional." },
    { name: "Butterfly Lighting", prompt: "High-fashion glamour lighting, shadow under the nose, bright eyes, flawless skin texture." },
    { name: "Golden Hour Glow", prompt: "Warm, diffused amber sunlight hitting the subject from the side, lens flares, soft skin tones." },
    { name: "Cinematic Neon Noir", prompt: "Dramatic teal and magenta lighting, high contrast shadows, cyberpunk cinematic feel." },
    { name: "Studio Softbox", prompt: "Even, soft, diffused lighting with no harsh shadows, perfect for detail clarity." },
    { name: "Direct Sun Flash", prompt: "High-contrast editorial flash, sharp shadows on the wall, 90s fashion photography style." }
];

// --- FOOTWEAR (Men & Women) ---
export const CATEGORIZED_SHOE_STYLES: OptionGroup[] = [
    { 
        category: "Men's Luxury & Street", 
        styles: [
            { id: "original", name: "Keep Original Shoes", prompt: "Keep original footwear.", tags: ['original'] },
            { id: "john_lobb_oxford", name: "John Lobb Oxfords", prompt: "Handmade John Lobb black leather Oxford shoes, mirror-shine finish.", tags: ['formal'] },
            { id: "berluti_patina", name: "Berluti Patina Loafers", prompt: "Berluti Alessandro wholecut shoes with deep tobacco leather patina.", tags: ['formal', 'bold'] },
            { id: "jordan_1_chicago", name: "Jordan 1 Retro High", prompt: "Air Jordan 1 'Chicago' high-top sneakers, red white and black leather.", tags: ['streetwear'] },
            { id: "balenciaga_triple_s", name: "Balenciaga Triple S", prompt: "Chunky Balenciaga Triple S sneakers, distressed multi-layered sole.", tags: ['streetwear', 'modern'] }
        ] 
    },
    { 
        category: "Women's Designer", 
        styles: [
            { id: "original", name: "Keep Original Shoes", prompt: "Keep original footwear.", tags: ['original'] },
            { id: "louboutin_so_kate", name: "Louboutin Red Bottoms", prompt: "Christian Louboutin 'So Kate' black patent leather stilettos, signature red soles.", tags: ['formal', 'gala'] },
            { id: "manolo_hangisi", name: "Manolo Blahnik Hangisi", prompt: "Blue satin Manolo Blahnik pumps with crystal buckle, Sex and the City style.", tags: ['formal'] },
            { id: "stuart_weitzman_boots", name: "Stuart Weitzman OTK", prompt: "Over-the-knee Stuart Weitzman suede boots, sleek black silhouette.", tags: ['modern'] }
        ] 
    }
];

// --- ACCESSORIES (Eyewear & Headwear) ---
export const CATEGORIZED_EYEWEAR_STYLES: OptionGroup[] = [
    { 
        category: 'Designer Frames', 
        styles: [
            { id: "original", name: "No Eyewear Change", prompt: "", tags: ['original'] },
            { id: 'rayban_wayfarer', name: 'Ray-Ban Wayfarer', prompt: 'Classic Ray-Ban Wayfarer black sunglasses, cool iconic look.', tags: ['accessory'] },
            { id: 'gucci_oversized', name: 'Gucci Oversized', prompt: 'Large Gucci tortoise-shell sunglasses with gold logo on temples.', tags: ['accessory'] },
            { id: 'cartier_santos', name: 'Cartier Santos Frames', prompt: 'Luxury Cartier Santos gold-rimmed optical glasses, sophisticated.', tags: ['accessory'] }
        ] 
    }
];

export const CATEGORIZED_HEADWEAR_STYLES: OptionGroup[] = [
    { 
        category: 'Headwear', 
        styles: [
            { id: "original", name: "No Headwear Change", prompt: "", tags: ['original'] },
            { id: 'borsalino_fedora', name: 'Borsalino Fedora', prompt: 'Handmade Borsalino felt fedora, wide brim, classic movie star style.', tags: ['accessory'] },
            { id: 'ny_yankees_cap', name: 'New Era NY Cap', prompt: 'Classic New Era NY Yankees baseball cap, navy and white.', tags: ['streetwear'] },
            { id: 'cultural_fila', name: 'Aso Oke Fila', prompt: 'Stiff Nigerian Fila cap made of hand-woven Aso Oke fabric.', tags: ['cultural'] }
        ] 
    }
];

// --- POSTURES (Editorial & Candid) ---
export const POSTURE_OPTIONS = [
    { id: 'original', name: 'Original Pose', prompt: 'Preserve the original body posture and angle exactly.', tags: ['original'] },
    { id: 'editorial_confident', name: 'Editorial Power Stance', prompt: 'Standing confidently with feet shoulder-width apart, hands at side, direct gaze.', tags: ['pose'] },
    { id: 'hand_in_pocket', name: 'Candid Pocket Lean', prompt: 'One hand in trouser pocket, leaning slightly to the side, relaxed professional look.', tags: ['pose'] },
    { id: 'arms_crossed', name: 'Crossed Arms Executive', prompt: 'Arms crossed firmly across the chest, looking authoritative and professional.', tags: ['pose'] },
    { id: 'sitting_ceo', name: 'Sitting CEO Position', prompt: 'Sitting in a high-back leather chair, legs crossed, hand on chin, thinking pose.', tags: ['pose'] },
    { id: 'walking_candid', name: 'Candid Street Walk', prompt: 'In motion, mid-stride walking down a city street, looking away naturally.', tags: ['pose'] }
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
    { id: 'black_turtleneck', name: 'Silk Turtleneck', prompt: 'Slim-fit black silk-blend turtleneck, modern and sleek.', tags: ['modern'] }
];

export const CATEGORIZED_TIE_STYLES: OptionGroup[] = [
    { 
        category: 'Neckwear', 
        styles: [
            { id: 'original', name: 'No Change', prompt: '', tags: ['original'] },
            { id: 'silk_knit_tie', name: 'Silk Knit Tie', prompt: 'Textured navy blue silk knit necktie with a square bottom.', tags: ['formal'] },
            { id: 'classic_silk', name: 'Burgundy Silk Tie', prompt: 'Deep burgundy silk tie with a subtle sheen.', tags: ['formal'] }
        ] 
    }
];

export const CATEGORIZED_HANDBAG_STYLES: OptionGroup[] = [
    { 
        category: 'Luxury Bags', 
        styles: [
            { id: 'original', name: 'No Change', prompt: '', tags: ['original'] },
            { id: 'hermes_birkin', name: 'Hermes Birkin 35', prompt: 'Iconic Hermes Birkin bag in orange togo leather, silver hardware.', tags: ['luxury'] },
            { id: 'chanel_boy', name: 'Chanel Boy Bag', prompt: 'Black quilted Chanel Boy bag with silver chain strap.', tags: ['luxury'] },
            { id: 'louis_vuitton_tote', name: 'LV Neverfull', prompt: 'Louis Vuitton Neverfull monogram canvas tote bag.', tags: ['luxury'] }
        ] 
    }
];

// Re-export specific shoe categories for the kids UI
export const CATEGORIZED_KIDS_SHOE_STYLES: OptionGroup[] = [
    { 
        category: "Kids Dress Shoes", 
        styles: [
            { id: "original", name: "Original Shoes", prompt: "", tags: ['original'] },
            { id: "patent_loafers", name: "Patent Loafers", prompt: "Shiny black patent leather loafers for children.", tags: ['formal'] }
        ] 
    }
];

export const CATEGORIZED_WOMENS_SHOE_STYLES: OptionGroup[] = CATEGORIZED_SHOE_STYLES.filter(c => c.category.includes("Women"));
