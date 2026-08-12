/* Schemas JSON-LD reutilizables por página */

const BASE = "https://opticasgma.com";

export const businessRef = { "@id": `${BASE}/#business` };
export const doctorRef   = { "@id": `${BASE}/#doctor` };

export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": name,
    "description": description,
    "url": `${BASE}${path}`,
    "provider": businessRef,
    "recognizingAuthority": {
      "@type": "MedicalOrganization",
      "name": "Colegio Médico del Perú"
    },
    "procedureType": "https://health-lifesci.schema.org/DiagnosticProcedure"
  };
}

export function articleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  coverImage: string;
  author: { name: string };
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "url": `${BASE}/blog/${post.slug}`,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "url": `${BASE}/nosotros`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ópticas GMA",
      "logo": { "@type": "ImageObject", "url": `${BASE}/favicon.svg` }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE}/blog/${post.slug}` },
    "articleSection": post.category,
    "inLanguage": "es-PE"
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": `${BASE}${item.path}`
    }))
  };
}

export function faqSchema(pairs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": pairs.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a }
    }))
  };
}
