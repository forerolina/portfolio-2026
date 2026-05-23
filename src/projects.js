export const projects = [
  {
    slug: 'conversational-booking',
    title: 'Conversational Booking',
    summary: 'Redesigning a flight booking flow for voice and chat assistants.',
    year: '2025',
  },
  {
    slug: 'design-system',
    title: 'Design System',
    summary: 'Scaling UI patterns and tokens across product teams.',
    year: '2024',
  },
  {
    slug: 'mobile-checkout',
    title: 'Mobile Checkout',
    summary: 'Simplifying payment steps to reduce drop-off on mobile.',
    year: '2024',
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug) ?? null;
}
