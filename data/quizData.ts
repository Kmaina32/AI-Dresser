import { CATEGORIZED_SUIT_STYLES, CATEGORIZED_WOMENS_STYLES, StyleOption } from '../constants.ts';

type AttireType = 'menswear' | 'womenswear';

export interface QuizQuestion {
  id: number;
  title: string;
  key: string;
  options: {
    label: string;
    value: string;
  }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: "First, what's the occasion?",
    key: 'occasion',
    options: [
      { label: 'Everyday Style', value: 'everyday' },
      { label: 'Professional / Business', value: 'business' },
      { label: 'Formal Event / Gala', value: 'formal' },
      { label: 'Cultural Ceremony', value: 'ceremony' },
      { label: 'Something Themed & Fun', value: 'themed' },
    ],
  },
  {
    id: 2,
    title: 'And which of these vibes best describes your desired look?',
    key: 'vibe',
    options: [
      { label: 'Modern & Bold', value: 'modern' },
      { label: 'Classic & Timeless', value: 'classic' },
      { label: 'Regal & Ornate', value: 'regal' },
    ],
  },
];

export function getStyleRecommendations(
  answers: Record<string, string>,
  attireType: AttireType
): StyleOption[] {
  const { occasion, vibe } = answers;

  if (!occasion || !vibe) return [];

  const allStyles = (
    attireType === 'menswear'
      ? CATEGORIZED_SUIT_STYLES
      : CATEGORIZED_WOMENS_STYLES
  ).flatMap((c) => c.styles);

  // Find styles that match both selected tags
  let filteredStyles = allStyles.filter((style) => {
    const tags = style.tags || [];
    return tags.includes(occasion) && tags.includes(vibe);
  });

  // If not enough direct matches, broaden the search
  if (filteredStyles.length < 3) {
    const occasionMatches = allStyles.filter((s) => s.tags.includes(occasion));
    const vibeMatches = allStyles.filter((s) => s.tags.includes(vibe));
    filteredStyles.push(...occasionMatches, ...vibeMatches);
  }

  // Ensure variety and remove duplicates, then take the top 3
  const uniqueStyles = [
    ...new Map(filteredStyles.map((item) => [item.id, item])).values(),
  ];

  // Shuffle to provide different results on subsequent tries with same answers
  for (let i = uniqueStyles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [uniqueStyles[i], uniqueStyles[j]] = [uniqueStyles[j], uniqueStyles[i]];
  }
  
  return uniqueStyles.slice(0, 3);
}