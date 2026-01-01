import { OptionGroup } from './shared.ts';

export interface PoliticalParty {
    id: string;
    name: string;
    fullName: string;
    symbol: string;
    colors: string;
    hexColor: string;
    defaultSlogan?: string;
}

export const KENYAN_PARTIES: PoliticalParty[] = [
    { id: 'uda', name: 'UDA', fullName: 'United Democratic Alliance', symbol: 'Wheelbarrow', colors: 'Yellow and Green', hexColor: '#FFD700', defaultSlogan: 'Kazi ni Kazi' },
    { id: 'odm', name: 'ODM', fullName: 'Orange Democratic Movement', symbol: 'Orange', colors: 'Orange and White', hexColor: '#FFA500', defaultSlogan: 'Mbele Pamoja' }
];

export const CAMPAIGN_POSITIONS = [
    { name: 'President', value: 'President' },
    { name: 'Governor', value: 'Governor' },
    { name: 'Senator', value: 'Senator' },
    { name: 'MP', value: 'Member of Parliament' },
    { name: 'MCA', value: 'MCA' }
];

export const CAMPAIGN_WRAP_STYLES = [
    { name: 'Full Body Wrap', value: 'full', prompt: 'full body vinyl wrap covering the entire vehicle' },
    { name: 'Door Branding', value: 'door', prompt: 'branding logo and text placed on the side doors only' }
];

export const CAMPAIGN_MODS = [
    { name: 'Roof Speakers', prompt: 'large PA system speakers mounted on the roof rack', value: 'speakers' },
    { name: 'Flag Mounts', prompt: 'campaign flags mounted on the front fenders', value: 'flags' }
];

export const MANIFESTO_FORMATS = [
    { name: 'A4 Booklet', prompt: 'A4 vertical booklet cover' },
    { name: 'Trifold Brochure', prompt: 'Trifold brochure layout' },
    { name: 'Standard Document', prompt: 'Standard A4 document layout' }
];

export const CATEGORIZED_CAMPAIGN_TEMPLATES: OptionGroup[] = [
    {
        category: "Greetings & Wishes",
        styles: [
            { id: "congrats_gold", name: "Official Congratulations", prompt: "A celebratory design. The background image (recipient) is the HERO visual, fully visible with only a subtle vignette. The candidate (sender) is placed in a small circle badge or signature area at the bottom. Elegant gold script typography. 'Congratulations' header.", tags: ['greeting', 'celebration'] },
            { id: "birthday_wish", name: "Birthday / Well Wishes", prompt: "Warm and personal. The background person is the main focus. Soft lighting, party colors or warm tones. The candidate appears as a 'Best Wishes, [Name]' footer element.", tags: ['greeting', 'casual'] }
        ]
    },
    {
        category: "Presidential",
        styles: [
            { id: "presidential_classic", name: "The Oval Office", prompt: "Classic presidential aesthetics, deep navy blue background, serif typography, gold accents.", tags: ['classic', 'formal'] }
        ]
    }
];

export const CATEGORIZED_MANIFESTO_TEMPLATES: OptionGroup[] = [
    {
        category: "Professional Documents",
        styles: [
            { id: "swiss_doc", name: "Swiss Minimal", prompt: "Swiss minimalist layout, heavy use of grid, helvetica font, lots of whitespace.", tags: ['clean'] }
        ]
    }
];
