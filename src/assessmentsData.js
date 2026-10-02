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
    slug: 'wheel-of-life',
    title: 'Wheel of Life',
    categories: ['life', 'wellbeing', 'career'],
    image: '/images/wheel-of-life-card.png',
    imageAlt: 'Wheel of Life with eight life domains labeled around the circle',
    imageBackground: '#ffffff',
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
  {
    id: 'career-audit',
    slug: 'career-audit',
    title: 'Career Audit Assessment',
    categories: ['career'],
    image: '/images/career-audit-card.png',
    imageAlt: 'Career Audit wheel with eight career dimensions labeled around the circle',
    imageBackground: '#ffffff',
    imageFit: 'contain',
    imagePosition: 'center',
    duration: '8–10 min',
    domains: 8,
    summary:
      'Rate eight career dimensions—and see where intentional focus will move you forward.',
    cta: 'Start assessment',
    component: 'career-audit',
    available: true,
  },
];

export const lifeAuditDomains = [
  {
    name: 'Career',
    color: '#e11d48',
    shortLabel: 'Career',
    tableLabel: 'Career',
    description: 'Your work direction, fulfillment, and professional progress.',
    now: 'How satisfied are you currently with your career?',
    future: 'How satisfied do you want to be with your career in the future?',
  },
  {
    name: 'Health',
    color: '#f97316',
    shortLabel: 'Health',
    tableLabel: 'Health',
    description: 'Your energy, wellbeing, and care for body and mind.',
    now: 'How satisfied are you currently with your health?',
    future: 'How satisfied do you want to be with your health in the future?',
  },
  {
    name: 'Financial Well-Being',
    color: '#eab308',
    shortLabel: 'Financial',
    tableLabel: 'Financial Well-Being',
    description: 'Your income, savings, security, and financial peace of mind.',
    now: 'How satisfied are you currently with your financial well-being?',
    future: 'How satisfied do you want to be with your financial well-being in the future?',
  },
  {
    name: 'Relationships',
    color: '#22c55e',
    shortLabel: 'Relationships',
    tableLabel: 'Relationships',
    description: 'Your connection with family, friends, and people who matter.',
    now: 'How satisfied are you currently with your relationships?',
    future: 'How satisfied do you want to be with your relationships in the future?',
  },
  {
    name: 'Fun and Recreation',
    color: '#14b8a6',
    shortLabel: 'Fun',
    tableLabel: 'Fun & Recreation',
    description: 'Your leisure, hobbies, play, and enjoyment of life.',
    now: 'How satisfied are you currently with your fun and recreation?',
    future: 'How satisfied do you want to be with your fun and recreation in the future?',
  },
  {
    name: 'Physical Environment',
    color: '#0ea5e9',
    shortLabel: 'Environment',
    tableLabel: 'Physical Environment',
    description: 'Your living space, workspace, and everyday surroundings.',
    now: 'How satisfied are you currently with your physical environment?',
    future: 'How satisfied do you want to be with your physical environment in the future?',
  },
  {
    name: 'Personal Growth',
    color: '#6366f1',
    shortLabel: 'Growth',
    tableLabel: 'Personal Growth',
    description: 'Your learning, skills, self-awareness, and development.',
    now: 'How satisfied are you currently with your personal growth?',
    future: 'How satisfied do you want to be with your personal growth in the future?',
  },
  {
    name: 'Spirituality',
    color: '#a855f7',
    shortLabel: 'Spirituality',
    tableLabel: 'Spirituality',
    description: 'Your meaning, values, inner peace, and sense of purpose.',
    now: 'How satisfied are you currently with your spirituality?',
    future: 'How satisfied do you want to be with your spirituality in the future?',
  },
];

/** Eight career dimensions for the Career Audit Assessment. */
export const careerAuditDomains = [
  {
    name: 'Career Direction',
    color: '#e11d48',
    shortLabel: 'Direction',
    tableLabel: 'Career Direction',
    description: 'Your trajectory, growth, and alignment with long-term professional goals.',
    now: 'How satisfied are you with your career direction today?',
    nowExamples: 'Growth, clarity, opportunities, support at work, future path',
    future: 'How satisfied would you like to be with your career direction?',
    futureExamples: 'Clear goals, meaningful growth, confidence in your path',
  },
  {
    name: 'Income',
    color: '#f97316',
    shortLabel: 'Income',
    tableLabel: 'Income',
    description: 'Your earnings, financial stability, and long-term financial growth.',
    now: 'How satisfied are you with your income today?',
    nowExamples: 'Salary, financial stability, savings, long-term growth',
    future: 'How satisfied would you like to be with your income?',
    futureExamples: 'Stronger security, higher earnings, financial freedom',
  },
  {
    name: 'Mental Wellbeing',
    color: '#eab308',
    shortLabel: 'Wellbeing',
    tableLabel: 'Mental Wellbeing',
    description: 'Your stress levels, energy, sleep, self-care, and emotional balance.',
    now: 'How satisfied are you with your mental wellbeing today?',
    nowExamples: 'Stress, energy, sleep, self-care, emotional balance',
    future: 'How satisfied would you like to be with your mental wellbeing?',
    futureExamples: 'Lower stress, healthier lifestyle, peace of mind',
  },
  {
    name: 'Work-Life Balance',
    color: '#22c55e',
    shortLabel: 'Balance',
    tableLabel: 'Work-Life Balance',
    description: 'Time and energy for family, hobbies, rest, and life beyond work.',
    now: 'How satisfied are you with your work-life balance today?',
    nowExamples: 'Family time, hobbies, rest, flexibility, personal life',
    future: 'How satisfied would you like to be with your work-life balance?',
    futureExamples: 'More personal time, healthier routine, clearer boundaries',
  },
  {
    name: 'Relationships at Work',
    color: '#14b8a6',
    shortLabel: 'Relations',
    tableLabel: 'Relationships at Work',
    description: 'Team connection, collaboration, networking, and support from colleagues.',
    now: 'How satisfied are you with your relationships at work today?',
    nowExamples: 'Team trust, collaboration, networking, peer support',
    future: 'How satisfied would you like to be with your relationships at work?',
    futureExamples: 'Stronger connections, better collaboration, meaningful ties',
  },
  {
    name: 'Professional Development',
    color: '#0ea5e9',
    shortLabel: 'Growth',
    tableLabel: 'Professional Development',
    description: 'Learning opportunities, skills growth, training, and career advancement.',
    now: 'How satisfied are you with your professional development today?',
    nowExamples: 'Learning, skills growth, training, expertise building',
    future: 'How satisfied would you like to be with your professional development?',
    futureExamples: 'New skills, continuous growth, confidence in abilities',
  },
  {
    name: 'Workplace Performance',
    color: '#6366f1',
    shortLabel: 'Performance',
    tableLabel: 'Workplace Performance',
    description: 'Your impact, visibility, recognition, and progression at work.',
    now: 'How satisfied are you with your workplace performance today?',
    nowExamples: 'Impact, visibility, recognition, promotion readiness',
    future: 'How satisfied would you like to be with your workplace performance?',
    futureExamples: 'Greater recognition, stronger impact, clear progression',
  },
  {
    name: 'Work Environment',
    color: '#a855f7',
    shortLabel: 'Environment',
    tableLabel: 'Work Environment',
    description: 'Culture, flexibility, commute, comfort, and day-to-day workplace conditions.',
    now: 'How satisfied are you with your work environment today?',
    nowExamples: 'Culture, flexibility, commute, comfort, office setup',
    future: 'How satisfied would you like to be with your work environment?',
    futureExamples: 'Better culture, more flexibility, inspiring workplace',
  },
];

export const assessmentConfigs = {
  'life-audit': {
    id: 'life-audit',
    title: 'Wheel of Life',
    summary: 'Get instant clarity on where your life feels aligned—and where it\'s asking for more.',
    introInfoTitle: 'What is the Wheel of Life?',
    introInfoParagraphs: [
      'The Wheel of Life is a tool to help you explore where you are in your life right now and where you would like to be in the future.',
      'Get a panoramic view of your well-being across eight key life areas. Use this free assessment to spotlight your strengths, uncover blind-spots, and kick-start an action plan that moves you forward.',
    ],
    domainsHeading: 'Life Domains',
    domainColumnLabel: 'Life Domain',
    pdfTitle: 'Your Wheel of Life',
    pdfSubtitle: 'Your personal snapshot of today and the future you want to create',
    pdfAreaHeader: 'LIFE AREA',
    resultsTableTitle: 'Wheel of Life',
    nextStepsCopy:
      'If you\'d like personalized support to close the gap between where you are and your ideal life balance, schedule a free discovery session with one of our coaches.',
    chartAriaLabel: 'Example Wheel of Life chart across eight life domains',
    domains: lifeAuditDomains,
    /** Radar/PDF wedge order (clockwise from top). */
    chartOrder: [
      'Career',
      'Financial Well-Being',
      'Relationships',
      'Fun and Recreation',
      'Spirituality',
      'Health',
      'Physical Environment',
      'Personal Growth',
    ],
  },
  'career-audit': {
    id: 'career-audit',
    title: 'Career Audit Assessment',
    summary:
      'Rate eight career dimensions—and see where intentional focus will move you forward.',
    introInfoTitle: 'What is the Career Audit?',
    introInfoParagraphs: [
      'The Career Audit helps you assess where you are today and where you want to be across the areas that shape a fulfilling career.',
      'Rate eight key dimensions on a scale of 1 (very dissatisfied) to 10 (very satisfied) to spot strengths, gaps, and the priorities that matter most.',
    ],
    domainsHeading: 'Career Dimensions',
    domainColumnLabel: 'Career Dimension',
    pdfTitle: 'Your Career Audit',
    pdfSubtitle: 'Your personal snapshot of today and the career you want to build',
    pdfAreaHeader: 'CAREER AREA',
    resultsTableTitle: 'Career Audit',
    scoreLowLabel: 'Very Dissatisfied',
    scoreHighLabel: 'Very Satisfied',
    nextStepsCopy:
      'If you\'d like personalized support to close the gap between where you are and the career you want, schedule a free discovery session with one of our coaches.',
    chartAriaLabel: 'Example Career Audit chart across eight career dimensions',
    domains: careerAuditDomains,
    chartOrder: [
      'Career Direction',
      'Income',
      'Mental Wellbeing',
      'Work-Life Balance',
      'Relationships at Work',
      'Professional Development',
      'Workplace Performance',
      'Work Environment',
    ],
  },
};

export function getAssessmentConfig(id) {
  return assessmentConfigs[id] ?? null;
}

export function getAssessmentsForCategory(categoryKey) {
  if (categoryKey === 'all') return assessments;
  return assessments.filter((item) => item.categories.includes(categoryKey));
}

export function getAssessmentById(id) {
  return assessments.find((item) => item.id === id) ?? null;
}

export function getAssessmentBySlug(slug) {
  if (!slug) return null;
  return (
    assessments.find((item) => item.slug === slug || item.id === slug) ?? null
  );
}

export function getAssessmentPath(assessmentOrId) {
  const item =
    typeof assessmentOrId === 'string'
      ? getAssessmentById(assessmentOrId) || getAssessmentBySlug(assessmentOrId)
      : assessmentOrId;
  if (!item) return '/assessments';
  return `/assessments/${item.slug || item.id}`;
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
