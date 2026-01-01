import { CATEGORIZED_SUIT_STYLES, CATEGORIZED_WOMENS_STYLES } from '../constants/apparel.ts';
import { StyleOption } from '../constants/shared.ts';

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

  let filteredStyles = allStyles.filter((style) => {
    const tags = style.tags || [];
    return tags.includes(occasion) && tags.includes(vibe);
  });

  if (filteredStyles.length < 3) {
    const occasionMatches = allStyles.filter((s) => s.tags.includes(occasion));
    const vibeMatches = allStyles.filter((s) => s.tags.includes(vibe));
    filteredStyles.push(...occasionMatches, ...vibeMatches);
  }

  const uniqueStyles: StyleOption[] = [
    ...new Map<string, StyleOption>(filteredStyles.map((item) => [item.id, item])).values(),
  ];

  for (let i = uniqueStyles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [uniqueStyles[i], uniqueStyles[j]] = [uniqueStyles[j], uniqueStyles[i]];
  }
  
  return uniqueStyles.slice(0, 3);
}
