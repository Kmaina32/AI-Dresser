import { 
  APPAREL_BACKGROUNDS, 
  CATEGORIZED_SUIT_STYLES, 
  CATEGORIZED_WOMENS_STYLES, 
  APPAREL_LIGHTING 
} from "../constants/apparel.ts";

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
        stylePrompt: CATEGORIZED_SUIT_STYLES[0].styles[0].prompt, 
        backgroundPrompt: APPAREL_BACKGROUNDS.find(o => o.name === 'Office')?.prompt || '',
        lightingPrompt: APPAREL_LIGHTING.find(o => o.name === 'Studio Lighting')?.prompt || '',
    },
    {
        image: 'https://storage.googleapis.com/aistudio-project-files/assets/gallery/gallery_2.webp',
        title: 'Classic Hollywood Glamour',
        description: 'An elegant white dinner jacket exudes timeless James Bond style, set against a dramatic evening backdrop.',
        attireType: 'menswear',
        stylePrompt: CATEGORIZED_SUIT_STYLES[0].styles.find(s => s.name === 'White Dinner Jacket')?.prompt || '',
        backgroundPrompt: APPAREL_BACKGROUNDS.find(o => o.name === 'Gala Event')?.prompt || '',
        lightingPrompt: APPAREL_LIGHTING.find(o => o.name === 'Dramatic Evening')?.prompt || '',
    },
    {
        image: 'https://storage.googleapis.com/aistudio-project-files/assets/gallery/gallery_3.webp',
        title: 'Vibrant Ankara Power',
        description: 'A stunning, floor-length gown made from vibrant Ankara fabric, perfect for making a bold statement.',
        attireType: 'womenswear',
        stylePrompt: CATEGORIZED_WOMENS_STYLES[0].styles[0].prompt, 
        backgroundPrompt: APPAREL_BACKGROUNDS.find(o => o.name === 'Art Gallery')?.prompt || '',
        lightingPrompt: APPAREL_LIGHTING.find(o => o.name === 'Studio Lighting')?.prompt || '',
    },
    {
        image: 'https://storage.googleapis.com/aistudio-project-files/assets/gallery/gallery_4.webp',
        title: 'Golden Hour Knight',
        description: 'A valiant medieval knight in a full suit of polished steel plate armor, bathed in the warm glow of sunset.',
        attireType: 'menswear',
        stylePrompt: CATEGORIZED_SUIT_STYLES[1].styles.find(s => s.name === "Knight in Shining Armor")?.prompt || '',
        backgroundPrompt: '', 
        lightingPrompt: APPAREL_LIGHTING.find(o => o.name === 'Golden Hour')?.prompt || '',
    }
];
