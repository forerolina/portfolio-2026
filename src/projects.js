export const projects = [
  {
    slug: 'voice-assistant',
    title: 'Voice Assistant',
    summary: 'Redesigning a flight booking flow for voice and chat assistants.',
    year: '2025',
    imageUrl:
      'https://images.unsplash.com/photo-1556388158-1580f402d1cb?q=80&w=1974&auto=format&fit=crop',
  },
  {
    slug: 'design-system',
    title: 'Chatbot',
    summary: 'Scaling UI patterns and tokens across product teams.',
    year: '2024',
    imageUrl:
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1964&auto=format&fit=crop',
  },
  {
    slug: 'mobile-checkout',
    title: 'Appointment scheduling',
    summary: 'Simplifying payment steps to reduce drop-off on mobile.',
    year: '2024',
    imageUrl:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
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
