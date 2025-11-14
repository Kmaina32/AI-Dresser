import { BACKGROUND_OPTIONS, CATEGORIZED_SUIT_STYLES, CATEGORIZED_WOMENS_STYLES, LIGHTING_OPTIONS } from "../constants.ts";

export interface GalleryItem {
    image: string;
    title: string;
    description: string;
    attireType: 'menswear' | 'womenswear';
    stylePrompt: string;
    backgroundPrompt: string;
    lightingPrompt: string;
    shoePrompt?: string;
    shirtPrompt?: string;
    tiePrompt?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
    {
        image: 'https://storage.googleapis.com/aistudio-project-files/assets/gallery/gallery_1.webp',
        title: 'Regal Nigerian Senator',
        description: 'A powerful and stylish look featuring a royal blue Nigerian Senator suit in a modern office setting.',
        attireType: 'menswear',
        stylePrompt: CATEGORIZED_SUIT_STYLES[0].styles[0].prompt, // Nigerian Senator
        backgroundPrompt: BACKGROUND_OPTIONS.find(o => o.name === 'Office')?.prompt || '',
        lightingPrompt: LIGHTING_OPTIONS.find(o => o.name === 'Studio Lighting')?.prompt || '',
    },
    {
        image: 'https://storage.googleapis.com/aistudio-project-files/assets/gallery/gallery_2.webp',
        title: 'Classic Hollywood Glamour',
        description: 'An elegant white dinner jacket exudes timeless James Bond style, set against a dramatic evening backdrop.',
        attireType: 'menswear',
        stylePrompt: CATEGORIZED_SUIT_STYLES.find(c => c.category === 'Western Classics')?.styles.find(s => s.name === 'White Dinner Jacket')?.prompt || '',
        backgroundPrompt: BACKGROUND_OPTIONS.find(o => o.name === 'Gala Event')?.prompt || '',
        lightingPrompt: LIGHTING_OPTIONS.find(o => o.name === 'Dramatic Evening')?.prompt || '',
    },
    {
        image: 'https://storage.googleapis.com/aistudio-project-files/assets/gallery/gallery_3.webp',
        title: 'Vibrant Ankara Power',
        description: 'A stunning, floor-length gown made from vibrant Ankara fabric, perfect for making a bold statement.',
        attireType: 'womenswear',
        stylePrompt: CATEGORIZED_WOMENS_STYLES[0].styles[0].prompt, // Vibrant Ankara Gown
        backgroundPrompt: BACKGROUND_OPTIONS.find(o => o.name === 'Art Gallery')?.prompt || '',
        lightingPrompt: LIGHTING_OPTIONS.find(o => o.name === 'Studio Lighting')?.prompt || '',
    },
    {
        image: 'https://storage.googleapis.com/aistudio-project-files/assets/gallery/gallery_4.webp',
        title: 'Golden Hour Knight',
        description: 'A valiant medieval knight in a full suit of polished steel plate armor, bathed in the warm glow of sunset.',
        attireType: 'menswear',
        stylePrompt: CATEGORIZED_SUIT_STYLES.find(c => c.category === 'Medieval')?.styles.find(s => s.name === "Knight in Shining Armor")?.prompt || '',
        backgroundPrompt: '', // Original background
        lightingPrompt: LIGHTING_OPTIONS.find(o => o.name === 'Golden Hour')?.prompt || '',
    },
    {
        image: 'https://storage.googleapis.com/aistudio-project-files/assets/gallery/gallery_5.webp',
        title: 'Roaring Twenties Flapper',
        description: 'An energetic flapper girl in a sparkling, beaded dress, ready to dance the night away in a glamorous gala setting.',
        attireType: 'womenswear',
        stylePrompt: CATEGORIZED_WOMENS_STYLES.find(c => c.category === 'Roaring Twenties')?.styles.find(s => s.name === 'Beaded Flapper Dress')?.prompt || '',
        backgroundPrompt: BACKGROUND_OPTIONS.find(o => o.name === 'Gala Event')?.prompt || '',
        lightingPrompt: LIGHTING_OPTIONS.find(o => o.name === 'Dramatic Evening')?.prompt || '',
    },
    {
        image: 'https://storage.googleapis.com/aistudio-project-files/assets/gallery/gallery_6.webp',
        title: 'Executive Power Suit',
        description: 'A sharp, tailored white power pantsuit that commands attention in a modern, sunlit corner office.',
        attireType: 'womenswear',
        stylePrompt: CATEGORIZED_WOMENS_STYLES.find(c => c.category === 'Business & Formal')?.styles.find(s => s.name === 'Power Pantsuit')?.prompt || '',
        backgroundPrompt: BACKGROUND_OPTIONS.find(o => o.name === 'Office')?.prompt || '',
        lightingPrompt: LIGHTING_OPTIONS.find(o => o.name === 'Natural Daylight')?.prompt || '',
    }
];