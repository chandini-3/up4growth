export const assessmentCategories = [
  {
    key: 'all',
    label: 'All Assessments',
    shortLabel: 'All',
    description:
      'Interactive tools to reflect on where you are and design where you want to grow — across life, career, and wellbeing.',
  },
  {
    key: 'life',
    label: 'Life Balance',
    shortLabel: 'Life',
    description: 'Assessments that help you see the full picture of your life and close the gaps that matter most.',
  },
  {
    key: 'career',
    label: 'Career',
    shortLabel: 'Career',
    description: 'Tools to clarify direction, fulfillment, and professional growth.',
  },
  {
    key: 'wellbeing',
    label: 'Wellbeing',
    shortLabel: 'Wellbeing',
    description: 'Reflections on health, energy, relationships, and inner balance.',
  },
];

/** Add new assessments here — cards render automatically on /assessments. */
export const assessments = [
  {
    id: 'life-audit',
    title: 'Life Audit Assessment',
    categories: ['life', 'wellbeing', 'career'],
    image: '/images/wheel-of-life-card.png',
    imageAlt: 'Colorful Wheel of Life with eight life domains',
    imageBackground: '#000000',
    imageFit: 'contain',
    imagePosition: 'center',
    duration: '8–10 min',
    domains: 8,
    summary:
      'Get instant clarity on where your life feels aligned—and where it\'s asking for more.',
    cta: 'Start assessment',
    component: 'life-audit',
    available: true,
  },
];

export const lifeAuditDomains = [
  { name: 'Career', color: '#e11d48' },
  { name: 'Health', color: '#f97316' },
  { name: 'Financial Well-Being', color: '#eab308' },
  { name: 'Relationships', color: '#22c55e' },
  { name: 'Fun and Recreation', color: '#14b8a6' },
  { name: 'Physical Environment', color: '#0ea5e9' },
  { name: 'Personal Growth', color: '#6366f1' },
  { name: 'Spirituality', color: '#a855f7' },
];

export function getAssessmentsForCategory(categoryKey) {
  if (categoryKey === 'all') return assessments;
  return assessments.filter((item) => item.categories.includes(categoryKey));
}

export function getAssessmentById(id) {
  return assessments.find((item) => item.id === id) ?? null;
}

export function getCategoryMeta(categoryKey) {
  return assessmentCategories.find((cat) => cat.key === categoryKey) ?? assessmentCategories[0];
}

export function getCategoryLabel(categoryKey) {
  return getCategoryMeta(categoryKey).label;
}

export function getCategoryCount(categoryKey) {
  return getAssessmentsForCategory(categoryKey).length;
}
