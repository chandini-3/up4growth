export const workshopTopicCategories = [
  { key: 'all', label: 'All Topics' },
  { key: 'career', label: 'Career Development', badgeLabel: 'Career' },
  { key: 'wellbeing', label: 'Wellbeing', badgeLabel: 'Well-Being' },
  { key: 'leadership', label: 'Leadership', badgeLabel: 'Leadership' },
  { key: 'productivity', label: 'Productivity', badgeLabel: 'Productivity' },
];

export const workshopTopics = [
  {
    id: 'ai-anxiety-to-ai-advantage',
    title: 'AI Anxiety to AI Advantage',
    category: 'career',
  },
  {
    id: 'consciously-design-your-future',
    title: 'Consciously Design Your Future',
    category: 'career',
  },
  {
    id: 'networking-with-authenticity',
    title: 'Networking with Authenticity',
    category: 'career',
  },
  {
    id: 'own-your-career',
    title: 'Own Your Career: Take Charge of Your Professional Growth',
    category: 'career',
  },
  {
    id: 'constructive-feedback',
    title: 'Mastering the Art of Giving & Receiving Constructive Feedback',
    category: 'leadership',
  },
  {
    id: 'art-of-saying-no',
    title: 'The Art of Saying No: Setting Boundaries for Success',
    category: 'leadership',
  },
  {
    id: 'fearless-founder',
    title: 'Fearless Founder',
    category: 'leadership',
  },
  {
    id: 'unlock-productivity-potential',
    title: 'Unlock Your Productivity Potential',
    category: 'productivity',
  },
  {
    id: 'designing-habits-that-stick',
    title: 'Designing Habits That Stick',
    category: 'productivity',
  },
  {
    id: 'understanding-fears',
    title: 'Understanding and Managing Fears',
    category: 'wellbeing',
  },
];

export function getWorkshopCategoryMeta(categoryKey) {
  return workshopTopicCategories.find((category) => category.key === categoryKey)
    ?? workshopTopicCategories[0];
}

export function getWorkshopTopicById(id) {
  return workshopTopics.find((topic) => topic.id === id);
}
