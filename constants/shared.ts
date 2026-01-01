export interface StyleOption {
    id: string;
    name: string;
    prompt: string;
    tags: string[];
    previewImage?: string;
    isColorCustomizable?: boolean;
    colorPalette?: string[];
}

export interface OptionGroup {
    category: string;
    styles: StyleOption[];
}

export type StyleCategory = OptionGroup;

export interface QualityOption {
    name: string;
    value: string;
}

export interface RemixConfig {
    attireType: string;
    stylePrompt: string;
    backgroundPrompt: string;
    lightingPrompt: string;
    shoePrompt?: string;
    shirtPrompt?: string;
    tiePrompt?: string;
}

export const QUALITY_OPTIONS: QualityOption[] = [
    { name: 'Standard (HD)', value: 'standard' },
    { name: 'High (4K)', value: 'high' }
];

export const VALID_ASPECT_RATIOS = [
    { name: 'Portrait (9:16)', value: '9:16' },
    { name: 'Square (1:1)', value: '1:1' },
    { name: 'Landscape (16:9)', value: '16:9' }
];
