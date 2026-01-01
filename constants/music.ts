
import { APPAREL_BACKGROUNDS, APPAREL_LIGHTING } from './apparel.ts';
import { VALID_ASPECT_RATIOS } from './shared.ts';

export const POSTER_POSES = [
    { id: 'back_to_back', name: 'Back to Back', prompt: 'standing back to back, secret agent style', tags: [] },
    { id: 'side_by_side', name: 'Side by Side', prompt: 'standing side by side, looking at camera', tags: [] }
];

export const POSTER_ASPECT_RATIOS = VALID_ASPECT_RATIOS;

export const POSTER_BACKGROUND_OPTIONS = APPAREL_BACKGROUNDS;
export const POSTER_LIGHTING_OPTIONS = APPAREL_LIGHTING;

export const POSTER_DISTANCE_OPTIONS = [
    { id: 'medium_shot', name: 'Medium Shot', prompt: 'Medium shot from waist up', tags: [] },
    { id: 'close_up', name: 'Close Up', prompt: 'Close up headshot', tags: [] }
];

export const POSTER_INDIVIDUAL_POSTURES = [
    { id: 'arms_crossed', name: 'Arms Crossed', prompt: 'arms crossed confidently', tags: [] }
];

export const POSTER_FONT_OPTIONS = [
    { id: 'sans_serif', name: 'Modern Sans', prompt: 'Modern bold sans-serif typography', tags: [] },
    { id: 'serif', name: 'Elegant Serif', prompt: 'High-end elegant serif typography', tags: [] }
];

export const POSTER_ICON_OPTIONS = [
    { id: 'parental_advisory', name: 'Parental Advisory', prompt: 'Parental Advisory sticker in corner', tags: [] },
    { id: 'none', name: 'No Sticker', prompt: 'No icons or stickers', tags: [] }
];

export const STUDIO_SCENARIOS = [
    { id: 'interview', name: 'TV Interview', prompt: 'Sitting in a TV interview setting, facing each other comfortably.', tags: [] },
    { id: 'podcast', name: 'Podcast Recording', prompt: 'Sitting with microphones in a modern podcast studio.', tags: [] }
];

export const STUDIO_POSES = POSTER_POSES;
