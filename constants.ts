

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
        category: "Jumas Collection",
        styles: [
            { id: "jumas_varsity_blue", name: "Jumas Blue Varsity", prompt: "a heavy blue and white varsity jacket with 'Bellwood' patches and '44' number, worn with loose black cargo pants featuring blue graffiti-style text on the leg, a blue fitted cap, and sneakers", tags: ["jumas style", "street", "modern"], isColorCustomizable: true },
            { id: "jumas_varsity_red", name: "Jumas Red Edition", prompt: "a red and white varsity jacket with chenille patches, worn with black cargo pants featuring red graffiti text, a red cap, and chunky sneakers", tags: ["jumas style", "street"], isColorCustomizable: true },
            { id: "jumas_varsity_black", name: "Jumas Stealth", prompt: "a black and grey varsity jacket with white patches, worn with black cargo pants featuring white graffiti text, a black cap", tags: ["jumas style", "street"], isColorCustomizable: true },
            { id: "jumas_track_set", name: "Jumas Track Set", prompt: "a matching nylon track jacket and pants with bold graffiti patterns and stripes", tags: ["jumas style", "street"], isColorCustomizable: true }
        ]
    },
    {
        category: "African Luxury",
        styles: [
            { id: "agbada_grand", name: "Grand Agbada", prompt: "a majestic, voluminous Agbada robe with heavy, intricate embroidery, worn with a matching cap", tags: ["cultural", "ceremony", "luxury"], isColorCustomizable: true, colorPalette: ["#FFFFFF", "#000000", "#4B0082", "#800020", "#191970"] },
            { id: "senator_fitted", name: "Fitted Senator", prompt: "a sharp, tailored Nigerian Senator suit consisting of a long-sleeve tunic with geometric embroidery and fitted trousers", tags: ["cultural", "formal", "modern"], isColorCustomizable: true, colorPalette: ["#003366", "#008080", "#800020", "#333333", "#FFFFFF"] },
            { id: "senator_short", name: "Senator (Short Sleeve)", prompt: "a modern short-sleeve Nigerian Senator suit with a gold chain accessory", tags: ["cultural", "casual", "modern"], isColorCustomizable: true },
            { id: "isiagu_velvet", name: "Isiagu Chieftain", prompt: "a traditional Igbo Isiagu velvet top with lion head patterns, worn with black trousers and a red cap", tags: ["cultural", "ceremony"], isColorCustomizable: false },
            { id: "kaftan_silk", name: "Silk Kaftan", prompt: "a flowing, luxurious silk Kaftan set with subtle embroidery around the neck", tags: ["cultural", "casual", "luxury"], isColorCustomizable: true },
            { id: "kaftan_linen", name: "Linen Kaftan", prompt: "a breezy, structured linen Kaftan suit suitable for warm weather", tags: ["cultural", "casual"], isColorCustomizable: true },
            { id: "dashiki_modern", name: "Modern Dashiki", prompt: "a contemporary cut Dashiki shirt with bold tribal prints and fitted trousers", tags: ["cultural", "casual"], isColorCustomizable: true },
            { id: "dashiki_classic", name: "Classic Dashiki", prompt: "a loose-fitting traditional Dashiki shirt with ornate Angelina print", tags: ["cultural", "traditional"], isColorCustomizable: true },
            { id: "kente_royal", name: "Kente Royal Drape", prompt: "traditional Ghanaian Kente cloth draped majestically over one shoulder, gold jewelry", tags: ["cultural", "ceremony"], isColorCustomizable: false },
            { id: "smock_fugu", name: "Northern Smock (Fugu)", prompt: "a heavy woven traditional Smock (Fugu) from Northern Ghana", tags: ["cultural", "traditional"], isColorCustomizable: true },
            { id: "babriga", name: "Hausa Babriga", prompt: "a grand Hausa Babriga robe with massive, stiffened embroidery", tags: ["cultural", "ceremony"], isColorCustomizable: true },
            { id: "boubou", name: "Senegalese Boubou", prompt: "a flowing, wide-sleeved Senegalese Boubou robe in polished cotton", tags: ["cultural", "ceremony"], isColorCustomizable: true },
            { id: "djellaba", name: "Moroccan Djellaba", prompt: "a traditional hooded Djellaba robe with intricate trim", tags: ["cultural", "traditional"], isColorCustomizable: true },
            { id: "kanzu_jacket", name: "Kanzu & Jacket", prompt: "a white Kanzu robe worn with a fitted Western suit jacket", tags: ["cultural", "formal"], isColorCustomizable: true },
            { id: "kitenge_suit", name: "Kitenge Suit", prompt: "a tailored two-piece suit made entirely from vibrant Kitenge wax print fabric", tags: ["cultural", "modern"], isColorCustomizable: false },
            { id: "aso_oke_agbada", name: "Aso Oke Agbada", prompt: "a hand-woven Aso Oke Agbada with metallic threads", tags: ["cultural", "ceremony"], isColorCustomizable: true },
            { id: "batakari", name: "Ghanaian Batakari", prompt: "a striped heavy cotton Batakari smock", tags: ["cultural", "traditional"], isColorCustomizable: true }
        ]
    },
    {
        category: "Asian Heritage",
        styles: [
            { id: "sherwani_gold", name: "Gold Sherwani", prompt: "a regal gold brocade Sherwani with intricate beadwork, worn with a stole", tags: ["cultural", "wedding", "luxury"], isColorCustomizable: false },
            { id: "sherwani_velvet", name: "Velvet Sherwani", prompt: "a deep velvet Sherwani with gold buttons and embroidery", tags: ["cultural", "wedding"], isColorCustomizable: true, colorPalette: ["#800020", "#000080", "#006400"] },
            { id: "kurta_bundy", name: "Kurta & Bundy Vest", prompt: "a silk Kurta set topped with a floral Nehru jacket (Bundy vest)", tags: ["cultural", "casual"], isColorCustomizable: true },
            { id: "pathani_suit", name: "Pathani Suit", prompt: "a masculine Pathani suit with collars and chest pockets", tags: ["cultural", "traditional"], isColorCustomizable: true },
            { id: "tang_suit", name: "Chinese Tang Suit", prompt: "a silk Tang Suit with mandarin collar and frog buttons", tags: ["cultural", "traditional"], isColorCustomizable: true, colorPalette: ["#CC0000", "#000000", "#000080", "#D4AF37"] },
            { id: "changshan", name: "Changshan", prompt: "a traditional long Changshan tunic", tags: ["cultural", "formal"], isColorCustomizable: true },
            { id: "hakama_montsuki", name: "Montsuki Hakama", prompt: "a formal Japanese black silk kimono with striped hakama trousers and haori jacket with crests", tags: ["cultural", "formal"], isColorCustomizable: false },
            { id: "kimono_mens", name: "Casual Kimono", prompt: "a modern casual Kimono jacket layered over streetwear", tags: ["cultural", "modern"], isColorCustomizable: true },
            { id: "hanbok_mens", name: "Korean Hanbok", prompt: "a traditional men's Hanbok with Jeogori and Baji", tags: ["cultural", "traditional"], isColorCustomizable: true },
            { id: "barong", name: "Barong Tagalog", prompt: "a sheer, embroidered Pineapple fiber Barong Tagalog shirt worn over an undershirt", tags: ["cultural", "formal"], isColorCustomizable: false },
            { id: "baju_melayu", name: "Baju Melayu", prompt: "a traditional Baju Melayu set with a Sampin songket wrap", tags: ["cultural", "traditional"], isColorCustomizable: true },
            { id: "batik_shirt", name: "Batik Shirt", prompt: "a formal long-sleeve Indonesian Batik print shirt", tags: ["cultural", "business"], isColorCustomizable: false },
            { id: "ao_gam", name: "Vietnamese Ao Gam", prompt: "a traditional Vietnamese Ao Gam tunic with brocade patterns", tags: ["cultural", "traditional"], isColorCustomizable: true },
            { id: "dzongkha", name: "Bhutanese Gho", prompt: "a traditional Bhutanese Gho robe with knee-length socks", tags: ["cultural", "traditional"], isColorCustomizable: true },
            { id: "nehru_jacket", name: "Nehru Jacket", prompt: "a classic Nehru collar jacket worn over a crisp shirt", tags: ["cultural", "formal"], isColorCustomizable: true },
            { id: "safari_safari", name: "Jodhpuri Suit", prompt: "a regal Jodhpuri Bandhgala suit with trousers", tags: ["cultural", "formal"], isColorCustomizable: true }
        ]
    },
    {
        category: "Middle Eastern",
        styles: [
            { id: "thobe_bisht", name: "Thobe & Bisht", prompt: "a pristine white Thobe worn under a sheer, gold-trimmed black Bisht cloak", tags: ["cultural", "formal", "luxury"], isColorCustomizable: false },
            { id: "thobe_white", name: "Crisp White Thobe", prompt: "an immaculately tailored white Thobe/Dishdasha", tags: ["cultural", "everyday"], isColorCustomizable: false },
            { id: "thobe_colored", name: "Colored Thobe", prompt: "a modern tailored Thobe in earth tones", tags: ["cultural", "modern"], isColorCustomizable: true, colorPalette: ["#556B2F", "#8B4513", "#708090", "#191970"] },
            { id: "kandura", name: "Emirati Kandura", prompt: "a collarless Emirati style Kandura with tassel (tarboosh)", tags: ["cultural", "traditional"], isColorCustomizable: true },
            { id: "shemagh", name: "Shemagh & Agal", prompt: "a traditional red and white Shemagh headdress with Agal (head rope)", tags: ["cultural", "accessory"], isColorCustomizable: false },
            { id: "ghutra", name: "Ghutra & Agal", prompt: "a pure white Ghutra headdress with Agal", tags: ["cultural", "accessory"], isColorCustomizable: false },
            { id: "omani_dishdasha", name: "Omani Dishdasha", prompt: "a collarless Omani Dishdasha with subtle embroidery and tassel", tags: ["cultural", "traditional"], isColorCustomizable: true }
        ]
    },
    {
        category: "European & Americas",
        styles: [
            { id: "kilt_formal", name: "Formal Kilt", prompt: "a traditional Scottish tartan kilt with sporran, Prince Charlie jacket, and fly plaid", tags: ["cultural", "formal"], isColorCustomizable: false },
            { id: "charro", name: "Charro Suit", prompt: "a detailed Mexican Charro suit with silver embroidery and sombrero", tags: ["cultural", "traditional"], isColorCustomizable: false },
            { id: "guayabera", name: "Guayabera", prompt: "a classic white Guayabera shirt with pintucks and pockets", tags: ["cultural", "casual"], isColorCustomizable: false },
            { id: "tweed_hunting", name: "Tweed Hunting Suit", prompt: "a British tweed three-piece suit with breeches and flat cap", tags: ["vintage", "country"], isColorCustomizable: false },
            { id: "lederhosen", name: "Bavarian Lederhosen", prompt: "traditional leather Lederhosen with suspenders and checkered shirt", tags: ["cultural", "traditional"], isColorCustomizable: false },
            { id: "matador", name: "Matador Traje de Luces", prompt: "an ornate 'Suit of Lights' bullfighter outfit with heavy gold embroidery", tags: ["cultural", "costume"], isColorCustomizable: true },
            { id: "cowboy_rhinestone", name: "Nudie Suit", prompt: "a flamboyant 1950s country Nudie suit with rhinestones and embroidery", tags: ["cultural", "retro"], isColorCustomizable: true }
        ]
    },
    {
        category: "Black Tie & Formal",
        styles: [
            { id: "tuxedo_classic", name: "Classic Tuxedo", prompt: "a classic black tuxedo with satin peak lapels, crisp white pleated shirt, and black bow tie", tags: ["formal", "classic"], isColorCustomizable: false },
            { id: "tuxedo_midnight", name: "Midnight Blue Tux", prompt: "a midnight blue tuxedo with black satin shawl collar", tags: ["formal", "modern"], isColorCustomizable: false },
            { id: "tuxedo_white", name: "White Dinner Jacket", prompt: "a white dinner jacket with black trousers and black bowtie (James Bond style)", tags: ["formal", "classic"], isColorCustomizable: false },
            { id: "tuxedo_velvet", name: "Velvet Smoking Jacket", prompt: "a plush velvet smoking jacket tuxedo with satin lapels", tags: ["formal", "luxury"], isColorCustomizable: true, colorPalette: ["#800020", "#006400", "#000080", "#000000", "#4B0082"] },
            { id: "tuxedo_db", name: "Double Breasted Tux", prompt: "a double-breasted tuxedo with wide peak lapels", tags: ["formal", "classic"], isColorCustomizable: false },
            { id: "tailcoat", name: "White Tie Tailcoat", prompt: "a formal black tailcoat with white pique vest and white bow tie", tags: ["formal", "classic"], isColorCustomizable: false },
            { id: "morning_suit", name: "Morning Suit", prompt: "a morning suit with cutaway coat, striped trousers, and grey waistcoat", tags: ["formal", "wedding"], isColorCustomizable: true },
            { id: "jacquard_tux", name: "Jacquard Tuxedo", prompt: "a patterned floral jacquard tuxedo jacket with solid trousers", tags: ["formal", "modern"], isColorCustomizable: true },
            { id: "tuxedo_burgundy", name: "Burgundy Tuxedo", prompt: "a rich burgundy tuxedo with black lapels", tags: ["formal", "modern"], isColorCustomizable: false },
            { id: "tuxedo_creative", name: "Creative Black Tie", prompt: "a velvet blazer with black jeans and a bow tie", tags: ["formal", "modern"], isColorCustomizable: true }
        ]
    },
    {
        category: "Business Professional",
        styles: [
            { id: "suit_navy_pinstripe", name: "Navy Pinstripe", prompt: "a sharp navy blue pinstripe suit, double breasted", tags: ["business", "classic"], isColorCustomizable: false },
            { id: "suit_charcoal", name: "Charcoal 3-Piece", prompt: "a charcoal grey three-piece wool suit", tags: ["business", "classic"], isColorCustomizable: false },
            { id: "suit_pow", name: "Prince of Wales", prompt: "a grey Prince of Wales check suit with a blue overcheck", tags: ["business", "classic"], isColorCustomizable: false },
            { id: "suit_windowpane", name: "Windowpane Check", prompt: "a bold windowpane check suit", tags: ["business", "modern"], isColorCustomizable: true },
            { id: "suit_beige", name: "Beige Cotton Suit", prompt: "a tailored beige cotton suit", tags: ["business", "summer"], isColorCustomizable: false },
            { id: "suit_olive", name: "Olive Green Suit", prompt: "a modern olive green wool suit", tags: ["business", "modern"], isColorCustomizable: false },
            { id: "suit_brown", name: "Chocolate Brown Suit", prompt: "a rich chocolate brown suit with textured fabric", tags: ["business", "vintage"], isColorCustomizable: false },
            { id: "suit_black_modern", name: "Modern Black Suit", prompt: "a slim-fit matte black suit with skinny tie", tags: ["business", "modern"], isColorCustomizable: false },
            { id: "blazer_grey", name: "Grey Flannel Suit", prompt: "a mid-grey flannel suit", tags: ["business", "classic"], isColorCustomizable: false },
            { id: "power_suit_wallstreet", name: "80s Power Suit", prompt: "a 1980s Wall Street style power suit with wide shoulders and braces", tags: ["business", "vintage"], isColorCustomizable: true },
            { id: "suit_linen_tobacco", name: "Tobacco Linen", prompt: "a tobacco brown linen suit", tags: ["business", "summer"], isColorCustomizable: false },
            { id: "suit_double_breasted", name: "Double Breasted", prompt: "a six-button double breasted suit jacket", tags: ["business", "classic"], isColorCustomizable: true }
        ]
    },
    {
        category: "Smart Casual & Summer",
        styles: [
            { id: "linen_suit_cream", name: "Cream Linen Suit", prompt: "a relaxed cream linen suit", tags: ["casual", "summer"], isColorCustomizable: false },
            { id: "linen_suit_blue", name: "Pastel Blue Linen", prompt: "a light pastel blue linen suit", tags: ["casual", "summer"], isColorCustomizable: false },
            { id: "seersucker", name: "Seersucker Suit", prompt: "a classic blue and white striped seersucker suit", tags: ["casual", "summer"], isColorCustomizable: false },
            { id: "blazer_chinos", name: "Navy Blazer & Chinos", prompt: "a navy blazer with gold buttons paired with khaki chinos", tags: ["casual", "preppy"], isColorCustomizable: false },
            { id: "tweed_jacket", name: "Tweed Jacket", prompt: "a harris tweed jacket with elbow patches and corduroy trousers", tags: ["casual", "academic"], isColorCustomizable: false },
            { id: "corduroy_suit", name: "Corduroy Suit", prompt: "a vintage-inspired wide-wale corduroy suit", tags: ["casual", "vintage"], isColorCustomizable: true, colorPalette: ["#8B4513", "#006400", "#000080", "#D2691E"] },
            { id: "safari_suit", name: "Safari Suit", prompt: "a khaki 4-pocket safari suit", tags: ["casual", "vintage"], isColorCustomizable: false },
            { id: "polo_trousers", name: "Polo & Trousers", prompt: "a knitted polo shirt tucked into tailored pleated trousers", tags: ["casual", "oldmoney"], isColorCustomizable: true },
            { id: "sweater_over_shirt", name: "Sweater & Shirt", prompt: "a cable knit sweater worn over an oxford shirt with chinos", tags: ["casual", "preppy"], isColorCustomizable: true },
            { id: "miami_vice", name: "Miami Vice Style", prompt: "a white suit with a pastel t-shirt underneath, sleeves rolled up", tags: ["casual", "retro"], isColorCustomizable: false },
            { id: "riviera", name: "Riviera Style", prompt: "a Breton stripe shirt, white trousers, and a navy blazer", tags: ["casual", "summer"], isColorCustomizable: false },
            { id: "cardigan_shawl", name: "Shawl Cardigan", prompt: "a chunky shawl collar cardigan with jeans and boots", tags: ["casual", "cozy"], isColorCustomizable: true }
        ]
    },
    {
        category: "Streetwear & Avant-Garde",
        styles: [
            { id: "street_oversized", name: "Oversized Tailoring", prompt: "an oversized, boxy fit designer suit in a neutral tone", tags: ["modern", "street"], isColorCustomizable: true },
            { id: "techwear", name: "Cyber Techwear", prompt: "futuristic black techwear with straps, buckles, and cargo pockets", tags: ["modern", "tech"], isColorCustomizable: false },
            { id: "hypebeast", name: "Hypebeast Luxury", prompt: "a designer luxury streetwear outfit with logos, bomber jacket and sneakers", tags: ["modern", "street"], isColorCustomizable: true },
            { id: "denim_on_denim", name: "Double Denim", prompt: "a stylish denim jacket and jeans combination (Canadian Tuxedo)", tags: ["casual", "street"], isColorCustomizable: false },
            { id: "leather_biker", name: "Leather Biker", prompt: "a black leather biker jacket with skinny jeans and boots", tags: ["casual", "edgy"], isColorCustomizable: false },
            { id: "tracksuit_luxury", name: "Luxury Tracksuit", prompt: "a matching velour luxury tracksuit", tags: ["casual", "street"], isColorCustomizable: true },
            { id: "grunge", name: "90s Grunge", prompt: "a flannel shirt, band tee, and ripped jeans", tags: ["casual", "retro"], isColorCustomizable: false },
            { id: "met_gala", name: "Met Gala Avant-Garde", prompt: "an avant-garde high fashion ornate suit with cape and embroidery", tags: ["fashion", "costume"], isColorCustomizable: true },
            { id: "sequin_suit", name: "Full Sequin Suit", prompt: "a suit entirely covered in sequins", tags: ["fashion", "party"], isColorCustomizable: true },
            { id: "puffer_jacket", name: "Oversized Puffer", prompt: "a massive oversized puffer jacket and baggy pants", tags: ["modern", "street"], isColorCustomizable: true },
            { id: "skater_fit", name: "90s Skater", prompt: "baggy jeans, graphic tee, and open flannel shirt", tags: ["casual", "retro"], isColorCustomizable: true },
            { id: "drill_uk", name: "UK Drill", prompt: "a matching Nike tech fleece tracksuit and puffer vest", tags: ["modern", "street"], isColorCustomizable: true }
        ]
    },
    {
        category: "Historical & Period",
        styles: [
            { id: "regency_dandy", name: "Regency Dandy", prompt: "a Regency era tailcoat, high collar, cravat, and breeches (Bridgerton style)", tags: ["historical", "costume"], isColorCustomizable: true },
            { id: "victorian_gent", name: "Victorian Gentleman", prompt: "a Victorian frock coat, waistcoat, and top hat", tags: ["historical", "costume"], isColorCustomizable: false },
            { id: "gatsby_1920s", name: "1920s Gatsby", prompt: "a cream 1920s three-piece suit with a boater hat", tags: ["historical", "vintage"], isColorCustomizable: false },
            { id: "gangster_1930s", name: "1930s Mobster", prompt: "a wide-lapel pinstripe suit with a fedora and suspenders", tags: ["historical", "vintage"], isColorCustomizable: false },
            { id: "zoot_suit", name: "1940s Zoot Suit", prompt: "an exaggerated 1940s Zoot Suit with long coat and baggy trousers", tags: ["historical", "vintage"], isColorCustomizable: true },
            { id: "greaser_1950s", name: "1950s Greaser", prompt: "a tight white t-shirt, leather jacket, and cuffed jeans", tags: ["historical", "retro"], isColorCustomizable: false },
            { id: "mod_1960s", name: "1960s Mod", prompt: "a slim 1960s sharkskin suit with skinny tie", tags: ["historical", "retro"], isColorCustomizable: false },
            { id: "disco_1970s", name: "1970s Disco", prompt: "a white polyester disco suit with bell-bottoms and wide collar shirt", tags: ["historical", "retro"], isColorCustomizable: true },
            { id: "medieval_knight", name: "Medieval Armor", prompt: "a full suit of shining steel plate armor", tags: ["historical", "costume"], isColorCustomizable: false },
            { id: "viking_warrior", name: "Viking Warrior", prompt: "Viking leather armor, furs, and tunic", tags: ["historical", "costume"], isColorCustomizable: false },
            { id: "gladiator", name: "Roman Gladiator", prompt: "Roman gladiator leather armor and tunic", tags: ["historical", "costume"], isColorCustomizable: false },
            { id: "cowboy", name: "Wild West Cowboy", prompt: "rugged cowboy attire with leather vest, chaps, and stetson hat", tags: ["historical", "costume"], isColorCustomizable: false },
            { id: "pirate", name: "Pirate Captain", prompt: "an elaborate 18th century pirate captain coat and tricorn hat", tags: ["historical", "costume"], isColorCustomizable: false },
            { id: "peaky_blinders", name: "Peaky Blinders", prompt: "a 1920s tweed suit, overcoat, and newsboy cap", tags: ["historical", "vintage"], isColorCustomizable: false },
            { id: "hippie_1960s", name: "1960s Hippie", prompt: "tie-dye shirt, fringe vest, and bell bottom jeans", tags: ["historical", "retro"], isColorCustomizable: true }
        ]
    },
    {
        category: "Sci-Fi & Fantasy",
        styles: [
            { id: "cyberpunk_neon", name: "Cyberpunk Neon", prompt: "futuristic cyberpunk street samurai gear with neon accents", tags: ["scifi", "costume"], isColorCustomizable: true },
            { id: "space_fleet", name: "Space Fleet", prompt: "a sleek futuristic space fleet officer uniform", tags: ["scifi", "costume"], isColorCustomizable: true, colorPalette: ["#000080", "#800000", "#000000", "#FFFFFF"] },
            { id: "steampunk", name: "Steampunk Inventor", prompt: "Victorian steampunk attire with gears, goggles, and leather harness", tags: ["scifi", "costume"], isColorCustomizable: false },
            { id: "post_apoc", name: "Post-Apocalyptic", prompt: "rugged, distressed post-apocalyptic scavenger gear", tags: ["scifi", "costume"], isColorCustomizable: false },
            { id: "jedi_robe", name: "Jedi Robes", prompt: "layered earth-tone robes and tunic", tags: ["fantasy", "costume"], isColorCustomizable: false },
            { id: "sith_lord", name: "Dark Lord Armor", prompt: "black armored robes with a cape", tags: ["fantasy", "costume"], isColorCustomizable: false },
            { id: "elven_lord", name: "Elven Lord", prompt: "ethereal, intricate silver and velvet elven robes", tags: ["fantasy", "costume"], isColorCustomizable: true },
            { id: "wizard", name: "Wizard Robes", prompt: "grand wizard robes with star patterns", tags: ["fantasy", "costume"], isColorCustomizable: true },
            { id: "superhero", name: "Superhero Suit", prompt: "a tight armored superhero bodysuit with a chest emblem", tags: ["fantasy", "costume"], isColorCustomizable: true },
            { id: "vampire_lord", name: "Vampire Lord", prompt: "a gothic Victorian suit with a high collar cape", tags: ["fantasy", "costume"], isColorCustomizable: false },
            { id: "spartan_warrior", name: "Spartan Warrior", prompt: "bronze muscle cuirass, red cape, and helmet", tags: ["historical", "costume"], isColorCustomizable: false }
        ]
    },
    {
        category: "Occupational & Uniforms",
        styles: [
            { id: "pilot", name: "Airline Pilot", prompt: "an airline pilot uniform with hat and epaulettes", tags: ["uniform", "work"], isColorCustomizable: false },
            { id: "doctor", name: "Doctor", prompt: "a doctor's white coat over professional attire with a stethoscope", tags: ["uniform", "work"], isColorCustomizable: false },
            { id: "scrubs", name: "Medical Scrubs", prompt: "medical scrubs", tags: ["uniform", "work"], isColorCustomizable: true, colorPalette: ["#0000FF", "#008000", "#800080", "#FFC0CB"] },
            { id: "police", name: "Police Officer", prompt: "a police officer uniform", tags: ["uniform", "work"], isColorCustomizable: false },
            { id: "firefighter", name: "Firefighter", prompt: "firefighter turnout gear", tags: ["uniform", "work"], isColorCustomizable: false },
            { id: "military_dress", name: "Military Dress", prompt: "formal military dress uniform with medals", tags: ["uniform", "formal"], isColorCustomizable: false },
            { id: "chef", name: "Chef", prompt: "a white chef's double breasted jacket and hat", tags: ["uniform", "work"], isColorCustomizable: false },
            { id: "astronaut", name: "Astronaut Suit", prompt: "a white NASA space suit", tags: ["uniform", "scifi"], isColorCustomizable: false },
            { id: "racecar_driver", name: "Racing Driver", prompt: "a fireproof racing suit with sponsor logos", tags: ["uniform", "sport"], isColorCustomizable: true },
            { id: "construction", name: "Construction Worker", prompt: "high-visibility vest and hard hat", tags: ["uniform", "work"], isColorCustomizable: false },
            { id: "mechanic", name: "Mechanic", prompt: "grease-stained coveralls", tags: ["uniform", "work"], isColorCustomizable: false },
            { id: "judge", name: "Judge", prompt: "black judge robes", tags: ["uniform", "work"], isColorCustomizable: false }
        ]
    }
];

export const CATEGORIZED_WOMENS_STYLES: StyleCategory[] = [
    {
        category: "African Luxury",
        styles: [
            { id: "ankara_gown_mermaid", name: "Ankara Mermaid", prompt: "a stunning floor-length mermaid gown made from vibrant Ankara fabric", tags: ["cultural", "modern"], isColorCustomizable: true },
            { id: "ankara_peplum", name: "Ankara Peplum", prompt: "a fitted Ankara top with a peplum waist and matching pencil skirt", tags: ["cultural", "business"], isColorCustomizable: true },
            { id: "lace_iro_buba", name: "Lace Iro & Buba", prompt: "a traditional Nigerian Iro and Buba set made from high-quality Swiss lace with Gele", tags: ["cultural", "ceremony"], isColorCustomizable: true },
            { id: "kaftan_boubou", name: "Silk Boubou", prompt: "a flowing, rich silk Boubou gown with rhinestone embellishments", tags: ["cultural", "luxury"], isColorCustomizable: true },
            { id: "kente_gown", name: "Kente Ballgown", prompt: "a regal ballgown incorporating Ghanaian Kente cloth panels", tags: ["cultural", "formal"], isColorCustomizable: false },
            { id: "shweshwe_dress", name: "Shweshwe Dress", prompt: "a stylish dress made from South African Shweshwe fabric", tags: ["cultural", "modern"], isColorCustomizable: true },
            { id: "habesha_kemis", name: "Habesha Kemis", prompt: "a traditional Ethiopian Habesha Kemis white dress with tibeb borders", tags: ["cultural", "traditional"], isColorCustomizable: false },
            { id: "gomesi", name: "Ugandan Gomesi", prompt: "a traditional Ugandan Gomesi dress with large sash", tags: ["cultural", "traditional"], isColorCustomizable: true },
            { id: "aso_ebi", name: "Aso Ebi Glam", prompt: "a glamorous, highly embellished Aso Ebi lace gown with corset back and high slit", tags: ["cultural", "party"], isColorCustomizable: true },
            { id: "umushanana", name: "Rwandan Umushanana", prompt: "a traditional Rwandan Umushanana ceremonial dress", tags: ["cultural", "ceremony"], isColorCustomizable: true },
            { id: "bubu_kaftan", name: "Bubu Kaftan", prompt: "a loose, flowing Bubu Kaftan dress in vibrant batik", tags: ["cultural", "casual"], isColorCustomizable: true }
        ]
    },
    {
        category: "Asian Heritage",
        styles: [
            { id: "saree_silk", name: "Banarasi Saree", prompt: "a luxurious Banarasi silk saree with gold zari border", tags: ["cultural", "traditional"], isColorCustomizable: true },
            { id: "saree_modern", name: "Modern Saree", prompt: "a contemporary saree draped in a modern style", tags: ["cultural", "modern"], isColorCustomizable: true },
            { id: "lehenga_bridal", name: "Bridal Lehenga", prompt: "a heavily embroidered red bridal Lehenga Choli with jewelry", tags: ["cultural", "wedding"], isColorCustomizable: true },
            { id: "anarkali", name: "Anarkali Suit", prompt: "a floor-length Anarkali suit with dupatta", tags: ["cultural", "formal"], isColorCustomizable: true },
            { id: "qipao", name: "Qipao / Cheongsam", prompt: "a form-fitting silk Qipao with floral embroidery", tags: ["cultural", "formal"], isColorCustomizable: true },
            { id: "hanfu_fem", name: "Hanfu", prompt: "traditional flowing Chinese Hanfu dress with sash", tags: ["cultural", "traditional"], isColorCustomizable: true },
            { id: "kimono_furisode", name: "Furisode Kimono", prompt: "a formal Japanese Furisode kimono with long sleeves and obi belt", tags: ["cultural", "formal"], isColorCustomizable: true },
            { id: "hanbok_fem", name: "Korean Hanbok", prompt: "a traditional women's Hanbok with Jeogori and Chima", tags: ["cultural", "traditional"], isColorCustomizable: true },
            { id: "ao_dai", name: "Vietnamese Ao Dai", prompt: "a silk Ao Dai tunic worn over trousers", tags: ["cultural", "traditional"], isColorCustomizable: true },
            { id: "terno", name: "Filipiniana Terno", prompt: "a traditional Filipiniana Terno dress with butterfly sleeves", tags: ["cultural", "formal"], isColorCustomizable: true },
            { id: "kebaya", name: "Kebaya", prompt: "an intricately embroidered Kebaya with batik sarong", tags: ["cultural", "traditional"], isColorCustomizable: true },
            { id: "salwar_kameez", name: "Salwar Kameez", prompt: "a comfortable cotton Salwar Kameez set", tags: ["cultural", "casual"], isColorCustomizable: true }
        ]
    },
    {
        category: "Middle Eastern",
        styles: [
            { id: "abaya_luxury", name: "Luxury Abaya", prompt: "a flowing black open Abaya with gold embroidery and embellishments", tags: ["cultural", "modest"], isColorCustomizable: false },
            { id: "kaftan_moroccan", name: "Moroccan Takchita", prompt: "a two-piece Moroccan Takchita kaftan with belt", tags: ["cultural", "formal"], isColorCustomizable: true },
            { id: "jalabiya", name: "Embroidered Jalabiya", prompt: "a colorful embroidered Jalabiya dress", tags: ["cultural", "casual"], isColorCustomizable: true },
            { id: "thobe_womens", name: "Palestinian Thobe", prompt: "a traditional Palestinian Thobe with cross-stitch embroidery (Tatreez)", tags: ["cultural", "traditional"], isColorCustomizable: false }
        ]
    },
    {
        category: "European & Americas",
        styles: [
            { id: "dirndl", name: "Bavarian Dirndl", prompt: "a traditional Bavarian Dirndl dress with apron", tags: ["cultural", "traditional"], isColorCustomizable: true },
            { id: "flamenco", name: "Flamenco Dress", prompt: "a red ruffled Spanish Flamenco dress", tags: ["cultural", "costume"], isColorCustomizable: true },
            { id: "pollera", name: "Panamanian Pollera", prompt: "an elaborate Pollera dress with heavy jewelry", tags: ["cultural", "traditional"], isColorCustomizable: false },
            { id: "huipil", name: "Mexican Huipil", prompt: "a traditional embroidered Huipil tunic", tags: ["cultural", "traditional"], isColorCustomizable: true }
        ]
    },
    {
        category: "Gowns & Red Carpet",
        styles: [
            { id: "gown_ballgown", name: "Classic Ballgown", prompt: "a massive tulle ballgown fit for a princess", tags: ["formal", "gala"], isColorCustomizable: true },
            { id: "gown_mermaid", name: "Mermaid Gown", prompt: "a form-fitting mermaid silhouette evening gown", tags: ["formal", "gala"], isColorCustomizable: true },
            { id: "gown_slit", name: "High Slit Gown", prompt: "a satin evening gown with a high leg slit", tags: ["formal", "sexy"], isColorCustomizable: true },
            { id: "gown_sheath", name: "Sheath Dress", prompt: "an elegant, column-like sheath evening dress", tags: ["formal", "classic"], isColorCustomizable: true },
            { id: "gown_cape", name: "Cape Dress", prompt: "a dramatic evening gown with an attached cape", tags: ["formal", "regal"], isColorCustomizable: true },
            { id: "gown_sequin", name: "Full Sequin Gown", prompt: "a sparkling floor-length gown covered in sequins", tags: ["formal", "party"], isColorCustomizable: true },
            { id: "gown_backless", name: "Backless Silk Gown", prompt: "a slinky backless silk slip gown", tags: ["formal", "sexy"], isColorCustomizable: true },
            { id: "gown_avant_garde", name: "Avant-Garde Sculpture", prompt: "an architectural, sculptural high fashion gown", tags: ["formal", "fashion"], isColorCustomizable: true },
            { id: "gown_velvet", name: "Velvet Gown", prompt: "a luxurious deep velvet evening gown", tags: ["formal", "winter"], isColorCustomizable: true }
        ]
    },
    {
        category: "Business & Power",
        styles: [
            { id: "pantsuit_white", name: "White Power Suit", prompt: "a sharp, tailored white pantsuit", tags: ["business", "modern"], isColorCustomizable: false },
            { id: "pantsuit_color", name: "Colored Pantsuit", prompt: "a bold monochromatic pantsuit", tags: ["business", "modern"], isColorCustomizable: true, colorPalette: ["#FF0000", "#0000FF", "#FF69B4", "#FFFF00"] },
            { id: "skirt_suit_tweed", name: "Tweed Skirt Suit", prompt: "a classic boucle tweed jacket and skirt set (Chanel style)", tags: ["business", "classic"], isColorCustomizable: true },
            { id: "blazer_dress", name: "Blazer Dress", prompt: "a tailored double-breasted blazer dress", tags: ["business", "modern"], isColorCustomizable: true },
            { id: "trench_dress", name: "Trench Dress", prompt: "a sleeveless trench coat style dress", tags: ["business", "chic"], isColorCustomizable: true },
            { id: "silk_blouse", name: "Silk Blouse & Trousers", prompt: "a silk bow-tie blouse tucked into wide leg trousers", tags: ["business", "classic"], isColorCustomizable: true },
            { id: "wrap_dress", name: "Wrap Dress", prompt: "a classic jersey wrap dress", tags: ["business", "classic"], isColorCustomizable: true },
            { id: "pencil_skirt", name: "Blouse & Pencil Skirt", prompt: "a fitted pencil skirt with a crisp button-down shirt", tags: ["business", "classic"], isColorCustomizable: true }
        ]
    },
    {
        category: "Historical & Period",
        styles: [
            { id: "flapper_1920s", name: "1920s Flapper", prompt: "a beaded 1920s flapper dress with fringe and headband", tags: ["historical", "vintage"], isColorCustomizable: true },
            { id: "newlook_1950s", name: "1950s New Look", prompt: "a 1950s Dior style dress with cinched waist and full circle skirt", tags: ["historical", "retro"], isColorCustomizable: true },
            { id: "mod_1960s", name: "1960s Mod", prompt: "a color-block 1960s shift mini dress", tags: ["historical", "retro"], isColorCustomizable: true },
            { id: "boho_1970s", name: "1970s Boho", prompt: "a flowing 70s floral maxi dress with bell sleeves", tags: ["historical", "retro"], isColorCustomizable: false },
            { id: "power_80s", name: "80s Power Suit", prompt: "a 1980s skirt suit with massive shoulder pads", tags: ["historical", "retro"], isColorCustomizable: true },
            { id: "victorian_goth", name: "Victorian Gothic", prompt: "a black Victorian dress with lace, corset, and high neck", tags: ["historical", "goth"], isColorCustomizable: false },
            { id: "regency_gown", name: "Regency Empire Waist", prompt: "a Regency era empire waist gown (Bridgerton style)", tags: ["historical", "costume"], isColorCustomizable: true },
            { id: "renaissance", name: "Renaissance Gown", prompt: "an elaborate velvet Renaissance gown", tags: ["historical", "costume"], isColorCustomizable: true },
            { id: "marie_antoinette", name: "Rococo Gown", prompt: "a wide-hipped 18th century Rococo gown with wig", tags: ["historical", "costume"], isColorCustomizable: true },
            { id: "gibson_girl", name: "Gibson Girl", prompt: "an Edwardian Gibson Girl blouse and long skirt", tags: ["historical", "vintage"], isColorCustomizable: false },
            { id: "pinup_1940s", name: "1940s Pinup", prompt: "a 1940s pinup style romper or dress", tags: ["historical", "retro"], isColorCustomizable: true }
        ]
    },
    {
        category: "Bridal",
        styles: [
            { id: "bride_lace", name: "Lace Wedding Dress", prompt: "a romantic lace bridal gown with veil", tags: ["bridal", "wedding"], isColorCustomizable: false },
            { id: "bride_modern", name: "Minimalist Bridal", prompt: "a sleek, unadorned silk crepe wedding dress", tags: ["bridal", "modern"], isColorCustomizable: false },
            { id: "bride_boho", name: "Boho Bridal", prompt: "a bohemian wedding dress with bell sleeves", tags: ["bridal", "wedding"], isColorCustomizable: false },
            { id: "bride_ballgown", name: "Bridal Ballgown", prompt: "a massive satin bridal ballgown", tags: ["bridal", "wedding"], isColorCustomizable: false },
            { id: "bride_jumpsuit", name: "Bridal Jumpsuit", prompt: "a chic white bridal jumpsuit", tags: ["bridal", "modern"], isColorCustomizable: false }
        ]
    },
    {
        category: "Sci-Fi & Fantasy",
        styles: [
            { id: "elven_queen", name: "Elven Queen", prompt: "ethereal flowing elven robes with tiara", tags: ["fantasy", "costume"], isColorCustomizable: true },
            { id: "cyber_bodysuit", name: "Cyberpunk Bodysuit", prompt: "a futuristic paneled bodysuit with neon glow", tags: ["scifi", "costume"], isColorCustomizable: true },
            { id: "steampunk_lady", name: "Steampunk Adventurer", prompt: "steampunk corset, bustle skirt, and goggles", tags: ["scifi", "costume"], isColorCustomizable: false },
            { id: "warrior_princess", name: "Warrior Princess", prompt: "leather and metal fantasy armor", tags: ["fantasy", "costume"], isColorCustomizable: false },
            { id: "witch_supreme", name: "Witch Supreme", prompt: "elegant black witch robes", tags: ["fantasy", "costume"], isColorCustomizable: false },
            { id: "fairy", name: "Fairy Dress", prompt: "a sparkling fairy dress with wings", tags: ["fantasy", "costume"], isColorCustomizable: true },
            { id: "wonder_hero", name: "Superheroine", prompt: "an armored superheroine suit with cape", tags: ["fantasy", "costume"], isColorCustomizable: true },
            { id: "goddess_greek", name: "Greek Goddess", prompt: "a flowing white greek goddess gown with gold laurel wreath", tags: ["fantasy", "costume"], isColorCustomizable: false }
        ]
    },
    {
        category: "Street & Chic",
        styles: [
            { id: "street_hype", name: "Hypebeast", prompt: "designer streetwear with oversized hoodie and sneakers", tags: ["casual", "modern"], isColorCustomizable: true },
            { id: "leather_chic", name: "Leather Chic", prompt: "a leather moto jacket over a slip dress", tags: ["casual", "edgy"], isColorCustomizable: false },
            { id: "cozy_knit", name: "Cozy Knitwear", prompt: "a chunky oversized knit sweater and leggings", tags: ["casual", "comfortable"], isColorCustomizable: true },
            { id: "denim_luxe", name: "Denim Luxe", prompt: "a high-fashion denim jumpsuit", tags: ["casual", "modern"], isColorCustomizable: false },
            { id: "athleisure", name: "Luxury Athleisure", prompt: "a matching luxury yoga set and crop top", tags: ["casual", "sport"], isColorCustomizable: true },
            { id: "cottagecore", name: "Cottagecore", prompt: "a romantic floral prairie dress with apron", tags: ["casual", "retro"], isColorCustomizable: true },
            { id: "dark_academia", name: "Dark Academia", prompt: "a tweed blazer, plaid skirt, and turtleneck", tags: ["casual", "academic"], isColorCustomizable: false }
        ]
    }
];

export const CATEGORIZED_KIDS_STYLES: StyleCategory[] = [
    {
        category: "Formal",
        styles: [
            { id: "kids_tux", name: "Mini Tuxedo", prompt: "a cute miniature black tuxedo with bow tie", tags: ["formal"], isColorCustomizable: false },
            { id: "kids_suit", name: "Mini Suit", prompt: "a tailored suit for a child", tags: ["formal"], isColorCustomizable: true },
            { id: "flower_girl", name: "Flower Girl Dress", prompt: "a puffy white flower girl dress with sash", tags: ["formal"], isColorCustomizable: true },
            { id: "party_dress", name: "Sparkly Party Dress", prompt: "a colorful sequined party dress", tags: ["formal"], isColorCustomizable: true }
        ]
    },
    {
        category: "Cultural",
        styles: [
            { id: "kids_agbada", name: "Mini Agbada", prompt: "a miniature Agbada robe", tags: ["cultural"], isColorCustomizable: true },
            { id: "kids_sherwani", name: "Mini Sherwani", prompt: "a miniature Sherwani", tags: ["cultural"], isColorCustomizable: true },
            { id: "kids_kimono", name: "Mini Kimono", prompt: "a child's Kimono", tags: ["cultural"], isColorCustomizable: true },
            { id: "kids_hanbok", name: "Mini Hanbok", prompt: "a child's Hanbok", tags: ["cultural"], isColorCustomizable: true },
            { id: "kids_dashiki", name: "Mini Dashiki", prompt: "a colorful Dashiki for kids", tags: ["cultural"], isColorCustomizable: true }
        ]
    },
    {
        category: "Fantasy & Costumes",
        styles: [
            { id: "kids_superhero", name: "Superhero", prompt: "a superhero costume with cape", tags: ["costume"], isColorCustomizable: true },
            { id: "kids_princess", name: "Princess", prompt: "a Disney-style princess gown", tags: ["costume"], isColorCustomizable: true },
            { id: "kids_astronaut", name: "Astronaut", prompt: "a mini astronaut suit", tags: ["costume"], isColorCustomizable: false },
            { id: "kids_dino", name: "Dinosaur Onesie", prompt: "a cute dinosaur onesie", tags: ["costume"], isColorCustomizable: true },
            { id: "kids_harry", name: "Wizard Student", prompt: "Hogwarts student robes", tags: ["costume"], isColorCustomizable: false },
            { id: "kids_pirate", name: "Little Pirate", prompt: "a cute pirate costume", tags: ["costume"], isColorCustomizable: false }
        ]
    }
];

// --- VEHICLE STYLES ---

export const CATEGORIZED_VEHICLE_STYLES: StyleCategory[] = [
    {
        category: "Wraps & Paint",
        styles: [
            { id: "matte_black", name: "Matte Black Wrap", prompt: "a sleek matte black full vehicle wrap", tags: ["modern"], isColorCustomizable: false },
            { id: "matte_army", name: "Matte Army Green", prompt: "a matte army green vehicle wrap", tags: ["tactical"], isColorCustomizable: false },
            { id: "chrome", name: "Chrome Wrap", prompt: "a highly reflective chrome vehicle wrap", tags: ["show"], isColorCustomizable: true, colorPalette: ["#C0C0C0", "#D4AF37", "#00FFFF", "#FF00FF"] },
            { id: "satin_pearl", name: "Satin Pearl White", prompt: "a satin pearl white wrap", tags: ["luxury"], isColorCustomizable: false },
            { id: "camo_geo", name: "Geometric Camo", prompt: "a geometric urban camouflage vehicle livery", tags: ["tactical"], isColorCustomizable: true, colorPalette: ["#556B2F", "#808080", "#FFFFFF"] },
            { id: "camo_snow", name: "Snow Camo", prompt: "a white and grey snow camouflage livery", tags: ["tactical"], isColorCustomizable: false },
            { id: "carbon_fiber", name: "Full Carbon Fiber", prompt: "exposed carbon fiber body panels", tags: ["race"], isColorCustomizable: false },
            { id: "rust_wrap", name: "Rust/Patina Wrap", prompt: "a distressed rusty patina wrap design", tags: ["ratrod"], isColorCustomizable: false },
            { id: "itasha", name: "Itasha Anime", prompt: "a colorful Itasha anime style livery", tags: ["jdm"], isColorCustomizable: false },
            { id: "racing_stripes", name: "Racing Stripes", prompt: "dual racing stripes down the center", tags: ["classic"], isColorCustomizable: true },
            { id: "color_shift", name: "Color Shift / Chameleon", prompt: "a color shifting chameleon paint job", tags: ["show"], isColorCustomizable: false },
            { id: "patrol", name: "Police Livery", prompt: "a black and white police interceptor livery", tags: ["service"], isColorCustomizable: false }
        ]
    },
    {
        category: "Body Kits",
        styles: [
             { id: "widebody_liberty", name: "Bolt-on Widebody", prompt: "an aggressive Liberty Walk style widebody kit with exposed bolts", tags: ["mod"], isColorCustomizable: true, colorPalette: ["#FF0000", "#000000"] },
             { id: "widebody_clean", name: "Clean Widebody", prompt: "a molded, clean widebody kit extension", tags: ["mod"], isColorCustomizable: true },
             { id: "drift_missile", name: "Drift Missile", prompt: "a drift missile style with mismatched panels and zip ties", tags: ["drift"], isColorCustomizable: false },
             { id: "offroad", name: "Off-Road Conversion", prompt: "lifted suspension, off-road tires, and roof rack", tags: ["offroad"], isColorCustomizable: false },
             { id: "drag_car", name: "Drag Setup", prompt: "drag racing setup with parachute and skinny front tires", tags: ["race"], isColorCustomizable: false },
             { id: "time_attack", name: "Time Attack Aero", prompt: "massive front splitter, canards, and huge rear wing", tags: ["race"], isColorCustomizable: true }
        ]
    }
];

export const CATEGORIZED_VEHICLE_RIMS: StyleCategory[] = [
    {
        category: "Sport & JDM",
        styles: [
            { id: "rim_te37", name: "6-Spoke Bronze", prompt: "bronze TE37 style 6-spoke racing wheels", tags: ["sport"], isColorCustomizable: false },
            { id: "rim_rpf1", name: "Split Spoke Silver", prompt: "silver split-spoke lightweight racing wheels", tags: ["sport"], isColorCustomizable: false },
            { id: "rim_work", name: "Deep Dish 3-Piece", prompt: "deep dish 3-piece polished wheels with gold bolts", tags: ["stance"], isColorCustomizable: false }
        ]
    },
    {
        category: "Luxury & Classic",
        styles: [
            { id: "rim_mesh", name: "Silver Mesh", prompt: "intricate silver mesh alloy wheels", tags: ["luxury"], isColorCustomizable: false },
            { id: "rim_wire", name: "Wire Wheels", prompt: "classic wire spoke wheels (Dayton style)", tags: ["lowrider"], isColorCustomizable: false },
            { id: "rim_steel", name: "Steelies", prompt: "black steel wheels", tags: ["basic"], isColorCustomizable: false }
        ]
    }
];

export const CATEGORIZED_VEHICLE_AERO: StyleCategory[] = [
    {
        category: "Spoilers",
        styles: [
            { id: "gt_wing", name: "Big GT Wing", prompt: "a large carbon fiber GT rear wing", tags: ["race"], isColorCustomizable: false },
            { id: "ducktail", name: "Ducktail Spoiler", prompt: "an integrated ducktail trunk spoiler", tags: ["clean"], isColorCustomizable: true },
            { id: "lip_spoiler", name: "Lip Spoiler", prompt: "a subtle trunk lip spoiler", tags: ["clean"], isColorCustomizable: true }
        ]
    },
    {
        category: "Diffusers & Splitters",
        styles: [
             { id: "front_splitter", name: "Front Splitter", prompt: "an aggressive carbon fiber front splitter with support rods", tags: ["race"], isColorCustomizable: false },
             { id: "rear_diffuser", name: "Rear Diffuser", prompt: "an aggressive rear diffuser", tags: ["race"], isColorCustomizable: false }
        ]
    }
];

export const CATEGORIZED_VEHICLE_INTERIOR: StyleCategory[] = [
    {
        category: "Seats",
        styles: [
            { id: "bucket_seats", name: "Red Racing Buckets", prompt: "red bride racing bucket seats", tags: ["race"], isColorCustomizable: false },
            { id: "leather_seats", name: "Tan Leather", prompt: "luxurious tan diamond-stitched leather seats", tags: ["luxury"], isColorCustomizable: false }
        ]
    }
];

export const CATEGORIZED_VEHICLE_LIGHTING_GRILL: StyleCategory[] = [
    {
        category: "Lights",
        styles: [
            { id: "halo_lights", name: "Halo Headlights", prompt: "modern LED halo ring headlights", tags: ["modern"], isColorCustomizable: false },
            { id: "yellow_tints", name: "Yellow Fog Lights", prompt: "yellow tinted headlights and fog lights", tags: ["gt"], isColorCustomizable: false },
            { id: "smoked_lights", name: "Smoked Taillights", prompt: "tinted black smoked taillights", tags: ["stealth"], isColorCustomizable: false }
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
            { id: "industrial", name: "Industrial Loft", prompt: "exposed brick, metal accents, concrete floors, and leather furniture", tags: ["urban"], isColorCustomizable: false },
            { id: "scandi", name: "Scandinavian", prompt: "light wood, white walls, cozy textiles, and functional furniture", tags: ["modern"], isColorCustomizable: false },
            { id: "midcentury", name: "Mid-Century Modern", prompt: "teak wood furniture, organic curves, and retro aesthetics", tags: ["retro"], isColorCustomizable: true },
            { id: "boho", name: "Bohemian", prompt: "eclectic decor, plants, rugs, and macrame", tags: ["eclectic"], isColorCustomizable: false },
            { id: "artdeco", name: "Art Deco", prompt: "geometric patterns, gold accents, and velvet furniture", tags: ["vintage", "luxury"], isColorCustomizable: true },
            { id: "japandi", name: "Japandi", prompt: "hybrid of Japanese rustic minimalism and Scandinavian functionality", tags: ["modern", "zen"], isColorCustomizable: false },
            { id: "farmhouse", name: "Modern Farmhouse", prompt: "rustic wood, shiplap, and comfortable neutral furniture", tags: ["rustic"], isColorCustomizable: false },
            { id: "maximalist", name: "Maximalist", prompt: "bold colors, patterns, and an abundance of decor items", tags: ["eclectic"], isColorCustomizable: true },
            { id: "cyberpunk_room", name: "Cyberpunk Room", prompt: "dark room with neon lighting, computer screens, and futuristic furniture", tags: ["scifi"], isColorCustomizable: true }
        ]
    }
];

// --- LANDSCAPE STYLES ---

export const CATEGORIZED_LANDSCAPE_STYLES: StyleCategory[] = [
    {
        category: "Gardens",
        styles: [
            { id: "japanese", name: "Japanese Zen", prompt: "a Japanese Zen garden with rocks, moss, maple trees, and water feature", tags: ["zen"], isColorCustomizable: false },
            { id: "tropical", name: "Tropical Oasis", prompt: "lush tropical plants, palms, ferns, and vibrant flowers", tags: ["nature"], isColorCustomizable: false },
            { id: "english", name: "English Cottage", prompt: "an unruly, blooming English cottage garden with roses and lavender", tags: ["classic"], isColorCustomizable: false },
            { id: "desert", name: "Desert Xeriscape", prompt: "a modern desert landscape with cactus, succulents, and gravel", tags: ["modern"], isColorCustomizable: false },
            { id: "modern_pool", name: "Modern Poolside", prompt: "sleek concrete pavers, manicured grass, and a modern rectangular pool", tags: ["modern", "luxury"], isColorCustomizable: false },
            { id: "french_formal", name: "French Formal", prompt: "symmetrical hedges, topiaries, and gravel paths", tags: ["classic"], isColorCustomizable: false },
            { id: "mediterranean", name: "Mediterranean", prompt: "olive trees, terracotta pots, lavender, and gravel", tags: ["classic"], isColorCustomizable: false }
        ]
    }
];

// --- BACKGROUNDS ---

export const APPAREL_BACKGROUNDS: SimpleOption[] = [
    { name: 'Keep Original', prompt: '' },
    { name: 'Studio Grey', prompt: 'a professional studio background with neutral grey tone' },
    { name: 'Studio White', prompt: 'a high-key white infinity studio background' },
    { name: 'Studio Black', prompt: 'a dramatic black void studio background' },
    { name: 'Modern Office', prompt: 'a modern corporate office setting with glass windows and city view' },
    { name: 'Luxury Penthouse', prompt: 'a luxury penthouse interior' },
    { name: 'Art Gallery', prompt: 'a bright, modern art gallery' },
    { name: 'Gala Event', prompt: 'a glamorous evening gala with bokeh lights and red carpet' },
    { name: 'Paris Street', prompt: 'a chic Parisian street with cafe' },
    { name: 'Tokyo Neon', prompt: 'a cyberpunk Tokyo street at night with neon signs' },
    { name: 'Beach Sunset', prompt: 'a serene beach at golden hour' },
    { name: 'Garden', prompt: 'a lush green garden' },
    { name: 'Private Jet', prompt: 'the interior of a luxury private jet' },
    { name: 'Yacht Deck', prompt: 'the deck of a luxury yacht on the ocean' }
];
export const BACKGROUND_OPTIONS = APPAREL_BACKGROUNDS; // Alias

export const VEHICLE_BACKGROUNDS: SimpleOption[] = [
    { name: 'Keep Original', prompt: '' },
    { name: 'Showroom White', prompt: 'a pristine white car showroom with glossy floors' },
    { name: 'Showroom Dark', prompt: 'a moody dark car showroom with spot lighting' },
    { name: 'City Night', prompt: 'a rainy city street at night with neon reflections' },
    { name: 'Desert Road', prompt: 'an open desert highway' },
    { name: 'Race Track', prompt: 'a Formula 1 race track' },
    { name: 'Mountain Pass', prompt: 'a scenic mountain road' },
    { name: 'Cyberpunk Garage', prompt: 'a futuristic high-tech garage' },
    { name: 'Salt Flats', prompt: 'the white Bonneville Salt Flats' }
];

export const INTERIOR_BACKGROUNDS: SimpleOption[] = [
     { name: 'Keep Original', prompt: '' },
     { name: 'City View', prompt: 'visible city skyline through the windows' },
     { name: 'Forest View', prompt: 'lush forest visible through the windows' },
     { name: 'Ocean View', prompt: 'ocean horizon visible through the windows' }
];

export const LANDSCAPE_BACKGROUNDS: SimpleOption[] = [
    { name: 'Keep Original', prompt: '' },
    { name: 'Sunset', prompt: 'warm golden hour lighting at sunset' },
    { name: 'Overcast', prompt: 'soft overcast sky' },
    { name: 'Blue Hour', prompt: 'twilight blue hour lighting' }
];

// --- LIGHTING ---

export const APPAREL_LIGHTING: SimpleOption[] = [
    { name: 'Natural Daylight', prompt: 'soft, natural daylight' },
    { name: 'Studio Lighting', prompt: 'professional 3-point studio lighting' },
    { name: 'Dramatic Evening', prompt: 'dramatic, high-contrast evening lighting' },
    { name: 'Golden Hour', prompt: 'warm golden hour sunlight' },
    { name: 'Neon', prompt: 'colorful neon lighting (pink/blue)' },
    { name: 'Cinematic', prompt: 'cinematic teal and orange lighting' },
    { name: 'Rembrandt', prompt: 'moody Rembrandt lighting' },
    { name: 'Flash Photography', prompt: 'harsh direct flash photography style' }
];
export const LIGHTING_OPTIONS = APPAREL_LIGHTING; // Alias

export const VEHICLE_LIGHTING: SimpleOption[] = [
    { name: 'Natural', prompt: 'natural outdoor lighting' },
    { name: 'Studio Softbox', prompt: 'large softbox studio lighting reflecting on curves' },
    { name: 'Neon Underglow', prompt: 'cyberpunk neon lighting with underglow' },
    { name: 'Sunset', prompt: 'warm sunset reflections' }
];

export const INTERIOR_LIGHTING: SimpleOption[] = [
    { name: 'Warm', prompt: 'warm interior ambient lighting' },
    { name: 'Cool', prompt: 'bright cool daylight' },
    { name: 'Mood', prompt: 'dim, moody evening lighting' }
];

export const LANDSCAPE_LIGHTING: SimpleOption[] = [
    { name: 'Sunny', prompt: 'bright sunny day' },
    { name: 'Moonlight', prompt: 'cool moonlight' },
    { name: 'Overcast', prompt: 'soft diffuse light' }
];

// --- ACCESSORIES ---

export const DEFAULT_SHOE_OPTION: SimpleOption = { name: 'None', prompt: '', value: 'none' };
export const CATEGORIZED_SHOE_STYLES: StyleCategory[] = [
    {
        category: "Formal",
        styles: [
            { id: "oxfords_black", name: "Black Oxfords", prompt: "shiny black leather oxford shoes", tags: [], isColorCustomizable: false },
            { id: "oxfords_brown", name: "Brown Brogues", prompt: "brown leather brogue shoes", tags: [], isColorCustomizable: false },
            { id: "loafers", name: "Penny Loafers", prompt: "leather penny loafers", tags: [], isColorCustomizable: true },
            { id: "monkstrap", name: "Double Monkstrap", prompt: "double monkstrap shoes", tags: [], isColorCustomizable: true },
            { id: "velvet_slippers", name: "Velvet Slippers", prompt: "black velvet formal slippers", tags: [], isColorCustomizable: false }
        ]
    },
    {
        category: "Casual & Boots",
        styles: [
            { id: "sneakers_white", name: "White Sneakers", prompt: "clean white minimalist sneakers", tags: [], isColorCustomizable: false },
            { id: "chelsea_boots", name: "Chelsea Boots", prompt: "suede chelsea boots", tags: [], isColorCustomizable: true },
            { id: "jordan1", name: "High-Top Sneakers", prompt: "high-top basketball sneakers", tags: [], isColorCustomizable: true },
            { id: "boots_work", name: "Work Boots", prompt: "rugged leather work boots", tags: [], isColorCustomizable: false },
            { id: "slides", name: "Slides", prompt: "casual slides", tags: [], isColorCustomizable: true }
        ]
    }
];
export const CATEGORIZED_WOMENS_SHOE_STYLES: StyleCategory[] = [
    {
        category: "Heels",
        styles: [
            { id: "stilettos_red", name: "Red Stilettos", prompt: "high red stiletto heels", tags: [], isColorCustomizable: false },
            { id: "pumps_nude", name: "Nude Pumps", prompt: "classic nude pumps", tags: [], isColorCustomizable: false },
            { id: "heels_strappy", name: "Strappy Sandals", prompt: "strappy high heel sandals", tags: [], isColorCustomizable: true },
            { id: "platforms", name: "Platform Heels", prompt: "chunky platform heels", tags: [], isColorCustomizable: true }
        ]
    },
    {
        category: "Flats & Boots",
        styles: [
            { id: "boots_knee", name: "Knee High Boots", prompt: "leather knee high boots", tags: [], isColorCustomizable: true },
            { id: "sneakers_chunky", name: "Chunky Sneakers", prompt: "chunky dad sneakers", tags: [], isColorCustomizable: false },
            { id: "ballet_flats", name: "Ballet Flats", prompt: "simple ballet flats", tags: [], isColorCustomizable: true },
            { id: "ankle_boots", name: "Ankle Boots", prompt: "stylish ankle boots", tags: [], isColorCustomizable: true }
        ]
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
    { name: 'Blue Dress Shirt', prompt: 'a light blue dress shirt' },
    { name: 'Black Dress Shirt', prompt: 'a black dress shirt' },
    { name: 'Turtleneck', prompt: 'a turtleneck sweater' },
    { name: 'T-Shirt', prompt: 'a plain white t-shirt' },
    { name: 'Floral Shirt', prompt: 'a floral print shirt' },
    { name: 'Denim Shirt', prompt: 'a denim western shirt' }
];

export const DEFAULT_TIE_OPTION: SimpleOption = { name: 'None', prompt: '', value: 'none' };
export const CATEGORIZED_TIE_STYLES: StyleCategory[] = [
     {
        category: "Ties",
        styles: [
            { id: "red_tie", name: "Red Silk Tie", prompt: "a red silk necktie", tags: [], isColorCustomizable: false },
            { id: "black_tie", name: "Black Tie", prompt: "a black silk necktie", tags: [], isColorCustomizable: false },
            { id: "navy_tie", name: "Navy Tie", prompt: "a navy blue necktie", tags: [], isColorCustomizable: false },
            { id: "bow_tie", name: "Bow Tie", prompt: "a black bow tie", tags: [], isColorCustomizable: false },
            { id: "knit_tie", name: "Knit Tie", prompt: "a textured knit square-end tie", tags: [], isColorCustomizable: true }
        ]
    }
];

export const DEFAULT_HANDBAG_OPTION: SimpleOption = { name: 'None', prompt: '', value: 'none' };
export const CATEGORIZED_HANDBAG_STYLES: StyleCategory[] = [
    {
        category: "Bags",
        styles: [
            { id: "clutch", name: "Silver Clutch", prompt: "a silver evening clutch", tags: [], isColorCustomizable: false },
            { id: "tote", name: "Leather Tote", prompt: "a structured leather tote bag", tags: [], isColorCustomizable: true },
            { id: "chanel", name: "Quilted Bag", prompt: "a quilted chain strap shoulder bag", tags: [], isColorCustomizable: true },
            { id: "birkin", name: "Luxury Handbag", prompt: "a high-end luxury leather handbag", tags: [], isColorCustomizable: true },
            { id: "crossbody", name: "Crossbody Bag", prompt: "a small crossbody camera bag", tags: [], isColorCustomizable: true }
        ]
    }
];

export const DEFAULT_EYEWEAR_OPTION: SimpleOption = { name: 'None', prompt: '', value: 'none' };
export const CATEGORIZED_EYEWEAR_STYLES: StyleCategory[] = [
     {
        category: "Glasses",
        styles: [
            { id: "aviators", name: "Aviator Sunglasses", prompt: "classic gold aviator sunglasses", tags: [], isColorCustomizable: false },
            { id: "wayfarer", name: "Wayfarer", prompt: "black wayfarer sunglasses", tags: [], isColorCustomizable: false },
            { id: "round", name: "Round Wire", prompt: "round wire-frame glasses", tags: [], isColorCustomizable: false },
            { id: "cat_eye", name: "Cat Eye", prompt: "cat eye sunglasses", tags: [], isColorCustomizable: false },
            { id: "rimless", name: "Rimless", prompt: "minimalist rimless glasses", tags: [], isColorCustomizable: false }
        ]
    }
];

export const DEFAULT_HEADWEAR_OPTION: SimpleOption = { name: 'None', prompt: '', value: 'none' };
export const CATEGORIZED_HEADWEAR_STYLES: StyleCategory[] = [
    {
        category: "Hats",
        styles: [
            { id: "fedora", name: "Fedora", prompt: "a stylish fedora hat", tags: [], isColorCustomizable: false },
            { id: "panama", name: "Panama Hat", prompt: "a white straw panama hat", tags: [], isColorCustomizable: false },
            { id: "cap", name: "Baseball Cap", prompt: "a plain baseball cap", tags: [], isColorCustomizable: true },
            { id: "beanie", name: "Beanie", prompt: "a knit beanie", tags: [], isColorCustomizable: true },
            { id: "turban", name: "Turban", prompt: "a neatly wrapped turban", tags: [], isColorCustomizable: true },
            { id: "gele", name: "Gele", prompt: "a large traditional Nigerian Gele headtie", tags: [], isColorCustomizable: true },
            { id: "beret", name: "Beret", prompt: "a wool beret", tags: [], isColorCustomizable: true },
            { id: "bucket", name: "Bucket Hat", prompt: "a casual bucket hat", tags: [], isColorCustomizable: true }
        ]
    }
];

export const DEFAULT_POSTURE_OPTION: SimpleOption = { name: 'Natural', prompt: 'natural standing posture', value: 'natural' };
export const POSTURE_OPTIONS: SimpleOption[] = [
    { name: 'Hands in Pockets', prompt: 'standing with hands in pockets, relaxed' },
    { name: 'Arms Crossed', prompt: 'standing confidently with arms crossed' },
    { name: 'Walking', prompt: 'walking forward with purpose' },
    { name: 'Sitting', prompt: 'sitting comfortably' },
    { name: 'Hand on Hip', prompt: 'posing with hand on hip' },
    { name: 'Leaning', prompt: 'leaning casually against a wall' },
    { name: 'Looking Away', prompt: 'looking away candidly' }
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
    { name: 'City Skyline', prompt: 'city skyline at night background' },
    { name: 'Concert Stage', prompt: 'concert stage with lights background' },
    { name: 'Solid Color (Hex)', prompt: 'solid hex color background: ' }
];

export const POSTER_LIGHTING_OPTIONS: SimpleOption[] = [
    { name: 'Cinematic Blue', prompt: 'cinematic teal and orange lighting' },
    { name: 'High Contrast', prompt: 'high contrast black and white lighting' },
    { name: 'Red Neon', prompt: 'intense red neon lighting' },
    { name: 'Soft Studio', prompt: 'soft professional studio lighting' }
];

export const POSTER_DISTANCE_OPTIONS: SimpleOption[] = [
    { name: 'Medium Shot', prompt: 'medium shot from waist up' },
    { name: 'Full Body', prompt: 'full body shot' },
    { name: 'Close Up', prompt: 'close up portrait' }
];

export const POSTER_INDIVIDUAL_POSTURES: SimpleOption[] = [
    { name: 'Cool Lean', prompt: 'leaning slightly with attitude' },
    { name: 'Power Stance', prompt: 'wide stance, assertive' },
    { name: 'Relaxed', prompt: 'relaxed and casual' }
];

export const POSTER_FONT_OPTIONS: SimpleOption[] = [
    { name: 'Serif Bold', prompt: 'Bold Serif Typography' },
    { name: 'Sans-Serif Minimal', prompt: 'Minimal Sans-Serif Typography' },
    { name: 'Gothic', prompt: 'Gothic Calligraphy' },
    { name: 'Graffiti', prompt: 'Street Art Graffiti Style' }
];

// --- STUDIO CONFIG ---

export const STUDIO_SCENARIOS: SimpleOption[] = [
    { name: 'Business Meeting', prompt: 'a formal business meeting setting, shaking hands' },
    { name: 'Casual Hangout', prompt: 'casual coffee shop hangout, laughing' },
    { name: 'Red Carpet', prompt: 'posing on a red carpet event' },
    { name: 'Studio Portrait', prompt: 'a professional studio portrait' },
    { name: 'Street Style', prompt: 'walking down a city street together' }
];

export const STUDIO_POSES: SimpleOption[] = [
    { name: 'Handshake', prompt: 'shaking hands firmly' },
    { name: 'Conversation', prompt: 'engaged in conversation' },
    { name: 'Posing', prompt: 'posing for a photo together' },
    { name: 'Walking', prompt: 'walking side by side' }
];

// --- CAMPAIGN CONFIG ---

export const KENYAN_PARTIES: PoliticalParty[] = [
    { id: 'uda', name: 'UDA', fullName: 'United Democratic Alliance', symbol: 'Wheelbarrow', colors: 'Yellow and Green', hexColor: '#FFD700' },
    { id: 'odm', name: 'ODM', fullName: 'Orange Democratic Movement', symbol: 'Orange', colors: 'Orange and Blue', hexColor: '#FFA500' },
    { id: 'jubilee', name: 'Jubilee', fullName: 'Jubilee Party', symbol: 'Dove', colors: 'Red and White', hexColor: '#FF0000' },
    { id: 'wiper', name: 'Wiper', fullName: 'Wiper Democratic Movement', symbol: 'Umbrella', colors: 'Blue and White', hexColor: '#0000FF' },
    { id: 'kanu', name: 'KANU', fullName: 'Kenya African National Union', symbol: 'Cockerel', colors: 'Red, Black and Green', hexColor: '#800000' }
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
    { name: 'Flag Mounts', prompt: 'corner flag mounts', value: 'flags' },
    { name: 'Roof Rack', prompt: 'metal roof rack', value: 'roofrack' }
];

