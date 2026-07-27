import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Share2, ArrowRight, Home } from "lucide-react";
import { PageSEO } from "../components/seo/PageSEO";
import { articleSchema, breadcrumbSchema } from "../seo/schemas";
import { Nav } from "../components/layout/Nav";
import { MobileDrawer } from "../components/layout/MobileDrawer";
import { BookingModal } from "../components/ui/BookingModal";
import { WAIcon } from "../components/ui/WAIcon";
import { useMobile } from "../hooks/useMobile";
import { BLOG_POSTS, formatDate } from "../data/blogPosts";
import type { BlogBlock } from "../data/blogPosts";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const nav = useNavigate();
  const mob = useMobile(768);
  const [booking, setBk] = useState(false);
  const [menu, setM] = useState(false);
  const [scrolled, setSc] = useState(false);
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const related = BLOG_POSTS.filter((p) => post?.relatedSlugs.includes(p.slug)).slice(0, 3);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.body.style.overflow = menu || booking ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu, booking, slug]);

  useEffect(() => {
    const fn = () => {
      setSc(window.scrollY > 80);
      const el = articleRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const pct = Math.min(100, Math.max(0, (-top / (height - window.innerHeight)) * 100));
      setProgress(pct);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (!post) {
    nav("/blog");
    return null;
  }

  const share = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <PageSEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.coverImage}
        imageAlt={post.title}
        type="article"
        publishedAt={post.publishedAt}
        keywords={`${post.category}, salud visual, ópticas Jaén, Dr. Antonio Santamaría`}
        jsonLd={[
          articleSchema({ title: post.title, excerpt: post.excerpt, slug: post.slug, publishedAt: post.publishedAt, coverImage: post.coverImage, author: post.author, category: post.category }),
          breadcrumbSchema([{ name: "Inicio", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }])
        ]}
      />

      {/* Reading progress */}
      <div className="blog-progress" style={{ width: `${progress}%` }} />

      <Nav
        scrolled={scrolled}
        onBooking={() => setBk(true)}
        onMenu={() => setM(true)}
        menuOpen={menu}
        onHome={() => nav("/")}
      />
      <MobileDrawer open={menu} onClose={() => setM(false)} onBooking={() => setBk(true)} />

      <div className="blog-post-page" style={{ paddingTop: 72 }}>

        {/* Back nav + breadcrumb */}
        <div className="blog-backnav">
          <button className="blog-back-btn" onClick={() => nav("/blog")}>
            <ArrowLeft size={14} /> Volver al blog
          </button>
          <nav className="blog-breadcrumb" aria-label="Navegación">
            <button onClick={() => nav("/")}><Home size={11} style={{ verticalAlign: "middle", marginRight: 3 }} />Inicio</button>
            <span className="sep">›</span>
            <button onClick={() => nav("/blog")}>Blog</button>
            <span className="sep">›</span>
            <span className="cur" style={{ maxWidth: mob ? 140 : 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "inline-block", verticalAlign: "middle" }}>{post.title}</span>
          </nav>
        </div>

        {/* Cover */}
        <div className="blog-cover lens-img" style={{ marginTop: 12 }}>
          <img src={post.coverImage} alt={post.title} loading="lazy" decoding="async" />
          <div className="blog-cover-overlay" />
          <div className="blog-cover-content">
            <div className="blog-cover-cat">{post.category}</div>
            <h1 className="blog-cover-title">{post.title}</h1>
            <div className="blog-cover-meta">
              <div className="blog-cover-avatar">{post.author.initials}</div>
              <div>
                <span className="blog-cover-author-name">{post.author.name}</span>
                <span className="blog-cover-author-info">{post.author.role}</span>
              </div>
              <div className="blog-cover-sep" />
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span className="blog-cover-date" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Calendar size={11} /> {formatDate(post.publishedAt)}
                </span>
                <span className="blog-cover-readtime">
                  <Clock size={11} /> {post.readTime} min de lectura
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Article */}
        <div ref={articleRef} className="blog-article-wrap">

          {/* Excerpt lead */}
          <p style={{ fontSize: 18, color: "var(--head)", fontWeight: 500, lineHeight: 1.7, marginBottom: 32, borderLeft: "3px solid var(--p)", paddingLeft: 18 }}>
            {post.excerpt}
          </p>

          {/* Content blocks */}
          {post.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}

          {/* Tags */}
          <div className="blog-tags">
            {post.tags.map((t) => (
              <span key={t} className="blog-tag">#{t}</span>
            ))}
          </div>

          {/* Share */}
          <div className="blog-share">
            <span className="blog-share-label">Compartir:</span>
            <button className="blog-share-btn" onClick={share}>
              <Share2 size={13} /> Compartir enlace
            </button>
            <button
              className="blog-share-btn"
              style={{ background: "#25D366", color: "#fff", borderColor: "#25D366" }}
              onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(post.title + " " + window.location.href)}`, "_blank")}
            >
              WhatsApp
            </button>
          </div>

          {/* Author card */}
          <div className="blog-author-card">
            <div className="blog-author-avatar">{post.author.initials}</div>
            <div>
              <div className="blog-author-name">{post.author.name}</div>
              <div className="blog-author-role">{post.author.role} · Ópticas GMA</div>
              <p className="blog-author-bio">
                Especialista en salud visual con más de 10 años de experiencia clínica. Comprometido con la educación y prevención de enfermedades oculares en Jaén, Cajamarca.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="blog-post-cta">
            <h3>¿Listo para cuidar tu visión?</h3>
            <p>Nuestros especialistas están disponibles de lunes a sábado. Agenda tu cita en minutos.</p>
            <button className="btn" style={{ display: "inline-flex", margin: "0 auto", justifyContent: "center" }} onClick={() => setBk(true)}>
              Reservar cita <ArrowRight size={14} />
            </button>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div style={{ marginTop: 56 }}>
              <h3 style={{ fontFamily: "var(--hf)", fontSize: 20, fontWeight: 800, color: "var(--head)", marginBottom: 20 }}>
                Artículos relacionados
              </h3>
              <div className="blog-related-grid">
                {related.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => nav(`/blog/${r.slug}`)}
                    style={{
                      background: "var(--bg)",
                      borderRadius: 12,
                      overflow: "hidden",
                      cursor: "pointer",
                      border: "0.5px solid var(--br)",
                      transition: "transform 250ms var(--ease-out), box-shadow 250ms var(--ease-out)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(50,26,49,.12)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                  >
                    <div style={{ height: 130, overflow: "hidden" }} className="lens-img">
                      <img src={r.coverImage} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                    </div>
                    <div style={{ padding: "14px 16px 16px" }}>
                      <div style={{ fontSize: 9.5, fontWeight: 700, color: "var(--p)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 6 }}>{r.category}</div>
                      <div style={{ fontFamily: "var(--hf)", fontSize: 13.5, fontWeight: 700, color: "var(--head)", lineHeight: 1.35 }}>{r.title}</div>
                      <div style={{ fontSize: 11.5, color: "var(--p)", fontWeight: 700, marginTop: 10, display: "flex", alignItems: "center", gap: 4 }}>
                        Leer <ArrowRight size={10} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* WA FAB */}
      <div className="wa" style={{ opacity: scrolled ? 1 : 0, transform: scrolled ? "scale(1)" : "scale(.7)", transition: "opacity .4s ease, transform .4s cubic-bezier(0.34,1.56,0.64,1)", pointerEvents: scrolled ? "all" : "none" }}>
        <WAIcon />
      </div>

      {booking && <BookingModal onClose={() => setBk(false)} />}
    </>
  );
}

// ── Content block renderer ───────────────────────────────────────────────────

function ContentBlock({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":   return <p>{block.text}</p>;
    case "h2":  return <h2>{block.text}</h2>;
    case "h3":  return <h3>{block.text}</h3>;
    case "ul":  return <ul>{block.items.map((it, i) => <li key={i}>{it}</li>)}</ul>;
    case "ol":  return <ol>{block.items.map((it, i) => <li key={i}>{it}</li>)}</ol>;
    case "callout": return <blockquote className="blog-callout">{block.text}</blockquote>;
    case "tip": return (
      <div className="blog-tip">
        <span className="blog-tip-icon">💡</span>
        <span>{block.text}</span>
      </div>
    );
    default: return null;
  }
}
