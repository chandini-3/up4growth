export const coachingOffers = [
  {
    id: 'anyone-who-wants-to-grow',
    title: 'Anyone Who Wants To Grow!',
    shortTitle: 'Anyone Who Wants To Grow!',
    badge: 'Coaching',
    category: 'wellbeing',
    outcomeTitle: 'Ready to take your personal growth to the next level?',
    outcomeTitleItalic: true,
    duration: '50 minutes per session · 90 days',
    format: 'Online (Zoom or Microsoft Teams) or In-Person in Basel',
    formatLabel: 'Delivery option',
    heroImage: '/images/consciously-design-your-future-hero.png',
    canonicalPath: '/coaching/anyone-who-wants-to-grow',
    backTo: '/coaching',
    backLabel: '← Back to Coaching',
    whyTag: 'Why this coaching',
    seoSection: 'One-on-One Coaching',
    excerpt:
      'Ready to take your personal growth to the next level? Join the journey to a more fulfilling and successful life with personal growth coaching!',
    description:
      'Personal development coaching is a process of helping individuals identify and achieve their personal and professional goals through a series of discussions, assessments, and action plans. Being a coach, I can help you to gain clarity on your goals, overcome obstacles, and develop strategies to achieve your desired outcomes.',
    purpose: [
      'Help individuals identify and achieve personal and professional goals through discussions, assessments, and action plans',
      'Gain clarity on your goals, overcome obstacles, and develop strategies to achieve desired outcomes',
      'Use the first session for introductions and discovery, to find out how you can maximize your personal and professional potential',
      'Align on goals, logistics, and a coaching program that supports your growth journey',
    ],
    highlights: [
      'Discovery session for introductions and to explore how coaching can support you',
      'Program duration: 90 days',
      'Each session lasts 50 minutes',
      'Sessions available via Zoom or Microsoft Teams',
      'In-person sessions for people located in Basel',
    ],
    outcomes: [
      'Gain clarity on your personal and professional goals',
      'Overcome obstacles with structured discussions and assessments',
      'Leave with strategies and action plans to achieve your desired outcomes',
      'Maximize your personal and professional potential with dedicated coaching support',
    ],
    audience: [
      'Individuals who would like to grow by unleashing their full potential',
      'Professionals seeking clarity on personal and career goals',
      'Anyone ready to take personal growth to the next level',
    ],
    howItWorks: {
      title: 'How the coaching program works?',
      intro:
        'We offer one-to-one personalized coaching programs virtually via Google Meet or Zoom. This means location is not a constraint and we can coach you wherever you are in the world.',
      steps: [
        {
          title: 'Start with FREE discovery session',
          description:
            'Discovery sessions is an opportunity for you and the coach to see if there is a good mutual fit for the coaching program.',
          icon: 'calendar',
          color: 'blue',
        },
        {
          title: 'Agree on the goals for the program',
          description:
            'Coach facilitates and helps you in identifying what is most important and define measurable goals for success.',
          icon: 'award',
          color: 'green',
        },
        {
          title: 'Coaching Sessions',
          description:
            'Every coaching session ends with a clear direction and action plan to reach the goal defined for the session.',
          icon: 'trending-up',
          color: 'orange',
        },
      ],
    },
    ctaTitle: 'Register! 45 minutes discovery session.',
    ctaText:
      'Experience personal coaching with a FREE confidential, no obligation discovery session to find out how you can maximize your personal and professional potential with personal coaching program',
  },
];

export function getCoachingOfferById(id) {
  return coachingOffers.find((offer) => offer.id === id);
}
