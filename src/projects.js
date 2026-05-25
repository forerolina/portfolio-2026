export const projects = [
  {
    slug: 'voice-assistant',
    title: 'Voice Assistant',
    summary: 'Redesigning a flight booking flow for voice and chat assistants.',
    year: '2025',
    imageUrl: '/case-studies/voice-assistant/voice-ai-thumbnail.png',
  },
  {
    slug: 'design-system',
    title: 'Chatbot',
    summary: 'Scaling UI patterns and tokens across product teams.',
    year: '2024',
    imageUrl: '/case-studies/voice-assistant/chatbot-screens-thumbnail.png',
  },
  {
    slug: 'mobile-checkout',
    title: 'Appointment scheduling',
    summary: 'Simplifying payment steps to reduce drop-off on mobile.',
    year: '2024',
    imageUrl: '/case-studies/voice-assistant/appointment-thumbnail.png',
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getProjectByPath(pathname) {
  const path = pathname.replace(/^\/+|\/+$/g, '');
  if (!path) return null;
  return projects.find((p) => p.slug === path) ?? null;
}

export function getProjectPath(project) {
  return `/${project.slug}`;
}
