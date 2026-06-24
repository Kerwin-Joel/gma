import { Helmet } from "react-helmet-async";

const SITE_NAME = "Ópticas GMA";
const BASE_URL  = "https://www.opticasgma.com";
const DEFAULT_IMG = `${BASE_URL}/og-cover.jpg`;
const TWITTER_HANDLE = "@opticasgma";

interface PageSEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
  publishedAt?: string;
  modifiedAt?: string;
  keywords?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}

export function PageSEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMG,
  imageAlt,
  type = "website",
  publishedAt,
  modifiedAt,
  keywords,
  noindex = false,
  jsonLd,
}: PageSEOProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = `${BASE_URL}${path}`;
  const alt = imageAlt ?? title;

  return (
    <Helmet>
      {/* ── Básico ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />
      <link rel="canonical" href={url} />

      {/* ── Open Graph (Facebook, WhatsApp, LinkedIn, TikTok, Instagram DM) ── */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="es_PE" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={alt} />
      <meta property="og:image:type" content="image/jpeg" />

      {/* ── Twitter / X Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={alt} />

      {/* ── Artículo ── */}
      {type === "article" && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {type === "article" && modifiedAt && (
        <meta property="article:modified_time" content={modifiedAt} />
      )}
      {type === "article" && (
        <meta property="article:author" content="Dr. Alfredo Mendoza" />
      )}
      {type === "article" && (
        <meta property="article:publisher" content="https://www.facebook.com/GMAOptica" />
      )}

      {/* ── JSON-LD estructurado ── */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? { "@context": "https://schema.org", "@graph": jsonLd } : jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
