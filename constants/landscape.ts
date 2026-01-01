import { OptionGroup } from './shared.ts';

export const CATEGORIZED_LANDSCAPE_STYLES: OptionGroup[] = [
    {
        category: "Gardens",
        styles: [
            { id: "japanese_zen", name: "Japanese Zen", prompt: "Japanese Zen garden, gravel, rocks, bonsai trees.", tags: ['calm', 'minimal'] },
            { id: "english_cottage", name: "English Cottage", prompt: "English cottage garden, overflowing flowers, winding paths.", tags: ['nature', 'colorful'] }
        ]
    }
];

export const LANDSCAPE_BACKGROUNDS = [
    { name: "Sunset Sky", prompt: "Vibrant sunset sky background." },
    { name: "Clear Blue Sky", prompt: "Clear bright blue sky." }
];

export const LANDSCAPE_LIGHTING = [
    { name: "Golden Hour", prompt: "Golden hour lighting, long warm shadows." }
];
