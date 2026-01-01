import { OptionGroup } from './shared.ts';
import { APPAREL_BACKGROUNDS, APPAREL_LIGHTING } from './apparel.ts';

export const CATEGORIZED_VEHICLE_STYLES: OptionGroup[] = [
    {
        category: "Wraps & Finishes",
        styles: [
            { id: "matte_black", name: "Matte Black", prompt: "Stealth matte black vinyl wrap.", tags: ['modern', 'minimal'] },
            { id: "racing_livery", name: "Racing Livery", prompt: "Sporty racing livery with stripes and numbers.", tags: ['sport'] },
            { id: "gold_chrome", name: "Gold Chrome", prompt: "High-gloss mirror finish gold chrome wrap.", tags: ['luxury'] }
        ]
    }
];

export const VEHICLE_BACKGROUNDS = APPAREL_BACKGROUNDS;
export const VEHICLE_LIGHTING = APPAREL_LIGHTING;

export const DEFAULT_VEHICLE_MOD_OPTION = { id: 'stock', name: 'Stock / No Change', prompt: '', tags: [] };

export const CATEGORIZED_VEHICLE_RIMS: OptionGroup[] = [
    { category: 'Wheels', styles: [{ id: 'alloy_sport', name: 'Sport Alloys', prompt: 'Large multi-spoke sport alloy rims', tags: ['mod'] }] }
];

export const CATEGORIZED_VEHICLE_AERO: OptionGroup[] = [
    { category: 'Aero', styles: [{ id: 'gt_wing', name: 'GT Wing', prompt: 'Large carbon fiber rear GT wing', tags: ['mod'] }] }
];

export const CATEGORIZED_VEHICLE_INTERIOR: OptionGroup[] = [
    { category: 'Interior', styles: [{ id: 'red_leather', name: 'Red Leather', prompt: 'Red leather seats and interior trim', tags: ['mod'] }] }
];

export const CATEGORIZED_VEHICLE_LIGHTING_GRILL: OptionGroup[] = [
    { category: 'Lights', styles: [{ id: 'led_halo', name: 'Halo LEDs', prompt: 'Custom halo LED headlights', tags: ['mod'] }] }
];
