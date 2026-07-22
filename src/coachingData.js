export const coachingOffers = [
  {
    id: 'anyone-who-wants-to-grow',
    title: 'Anyone Who Wants To Grow!',
    badge: 'Growth',
    category: 'wellbeing',
    excerpt:
      'Personalized coaching for professionals ready to grow with clarity, confidence, and purposeful action in their career and life.',
  },
  {
    id: 'own-your-career',
    title: 'Own Your Career',
    badge: 'Career',
    category: 'career',
    excerpt:
      'Take charge of your professional growth with coaching that builds self-awareness, clear goals, and a practical roadmap for advancement.',
  },
  {
    id: 'leadership-coaching',
    title: 'Leadership Coaching',
    badge: 'Leadership',
    category: 'leadership',
    excerpt:
      'Strengthen leadership presence, strategic thinking, and the ability to inspire teams through focused one-on-one coaching.',
  },
];

export function getCoachingOfferById(id) {
  return coachingOffers.find((offer) => offer.id === id);
}
