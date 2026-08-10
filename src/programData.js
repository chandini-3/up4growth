export const programs = [
  {
    id: 'deep-work',
    title: 'Deep Work Sprints',
    badge: 'Productivity',
    category: 'productivity',
    heroImage: '/images/deep-work-hero.png',
    excerpt:
      'Build discipline and focus with 60-minute daily deep work sprints for 6 weeks — group accountability, flow structure, and lasting productivity habits.',
  },
  {
    id: 'custom-growth',
    title: 'Own Your Career',
    badge: 'Career Coaching',
    category: 'career',
    heroImage: '/images/own-your-career-hero.png',
    excerpt:
      'Take charge of your professional growth with a 12-week coaching program — career vision, personalized action plans, and accountability for lasting progress.',
  },
];

export function getProgramById(id) {
  return programs.find((program) => program.id === id);
}
