export const coachingOffers = [
  {
    id: 'anyone-who-wants-to-grow',
    title: 'Anyone Who Wants To Grow!',
    badge: 'Growth',
    category: 'wellbeing',
    heroImage: '/images/consciously-design-your-future-hero.png',
    excerpt:
      'Personalized coaching for professionals ready to grow with clarity, confidence, and purposeful action in their career and life.',
  },
  {
    id: 'own-your-career',
    title: 'Own Your Career',
    badge: 'Career',
    category: 'career',
    heroImage: '/images/own-your-career-hero.png',
    excerpt:
      'Take charge of your professional growth with a 12-week career coaching program — personalized sessions, Career Model Canvas, and clear action plans with accountability.',
  },
  {
    id: 'leadership-coaching',
    title: 'Leadership Coaching',
    badge: 'Leadership',
    category: 'leadership',
    heroImage: '/images/constructive-feedback-hero.png',
    excerpt:
      'Strengthen leadership presence, strategic thinking, and the ability to inspire teams through focused one-on-one coaching — including feedback, communication, and culture-building skills.',
  },
];

export function getCoachingOfferById(id) {
  return coachingOffers.find((offer) => offer.id === id);
}
