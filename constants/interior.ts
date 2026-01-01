import { OptionGroup } from './shared.ts';

export const CATEGORIZED_INTERIOR_STYLES: OptionGroup[] = [
    {
        category: "Modern Styles",
        styles: [
            { id: "scandi", name: "Scandinavian", prompt: "Scandinavian interior design, light wood, white walls, minimalist.", tags: ['modern', 'minimal'] },
            { id: "industrial", name: "Industrial Loft", prompt: "Industrial loft style, exposed brick, metal accents, leather furniture.", tags: ['modern', 'bold'] }
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
