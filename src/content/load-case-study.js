const modules = import.meta.glob('./*.json', { eager: true });

export function getCaseStudyContent(slug) {
  const path = `./${slug}.json`;
  return modules[path]?.default ?? null;
}
