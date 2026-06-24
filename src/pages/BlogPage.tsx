import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock, ArrowRight, BookOpen, Home } from "lucide-react";
import { PageSEO } from "../components/seo/PageSEO";
import { breadcrumbSchema } from "../seo/schemas";
import { Nav } from "../components/layout/Nav";
import { MobileDrawer } from "../components/layout/MobileDrawer";
import { BookingModal } from "../components/ui/BookingModal";
import { WAIcon } from "../components/ui/WAIcon";
import { SectionLabel } from "../components/ui/Badge";
import { Reveal } from "../components/ui/Reveal";
import { useMobile } from "../hooks/useMobile";
import { BLOG_POSTS, CATEGORIES, formatDate } from "../data/blogPosts";
import type { BlogPost } from "../data/blogPosts";

export function BlogPage() {
  const nav = useNavigate();
  const mob = useMobile(768);
  const tab = useMobile(1024);
  const px = mob ? "18px" : tab ? "32px" : "64px";

  const [booking, setBk] = useState(false);
  const [menu, setM] = useState(false);
  const [scrolled, setSc] = useState(false);
  const [activeCategory, setCategory] = useState("todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const fn = () => setSc(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const featured = BLOG_POSTS.find((p) => p.featured);
  const filtered = useMemo(() => {
    let list = BLOG_POSTS.filter((p) => !p.featured);
    if (activeCategory !== "todos")
      list = list.filter((p) => p.categorySlug === activeCategory);
    if (search.trim())
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      );
    return list;
  }, [activeCategory, search]);

  const goPost = (slug: string) => nav(`/blog/${slug}`);

  return (
    <>
      <Nav
        scrolled={scrolled}
        onBooking={() => setBk(true)}
        onMenu={() => setM(true)}
        menuOpen={menu}
        onHome={() => nav("/")}
      />
      <MobileDrawer open={menu} onClose={() => setM(false)} onBooking={() => setBk(true)} />

      <PageSEO
        title="Blog de Salud Visual | Ópticas GMA — Jaén"
        description="Artículos sobre salud visual escritos por especialistas. Aprende sobre miopía, glaucoma, lentes progresivos, salud ocular infantil y más. Ópticas GMA, Jaén."
        path="/blog"
        keywords="blog salud visual, artículos oftalmología, miopía niños, lentes progresivos, glaucoma Perú, consejos vista"
        jsonLd={breadcrumbSchema([{ name: "Inicio", path: "/" }, { name: "Blog", path: "/blog" }])}
      />

      <div className="blog-page" style={{ paddingTop: 72 }}>

        {/* ── Breadcrumb ── */}
        <div style={{ padding: mob ? "14px 18px 0" : "16px 64px 0" }}>
          <nav className="blog-breadcrumb" aria-label="Navegación">
            <button onClick={() => nav("/")}><Home size={12} style={{ verticalAlign: "middle", marginRight: 3 }} />Inicio</button>
            <span className="sep">›</span>
            <span className="cur">Blog</span>
          </nav>
        </div>

        {/* ── Header ── */}
        <div
          style={{
            background: "var(--dark-bg)",
            backgroundImage: [
              "radial-gradient(ellipse 340px 200px at 80% 50%, rgba(232,62,240,.55) 0%, transparent 65%)",
              "radial-gradient(ellipse 200px 160px at 10% 80%, rgba(205,111,161,.4) 0%, transparent 60%)",
            ].join(", "),
            padding: mob ? "48px 18px 52px" : `64px ${px} 68px`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,4,10,.3)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
            <SectionLabel style={{ color: "rgba(255,255,255,.7)", borderColor: "rgba(255,255,255,.15)" }}>
              Blog · Ópticas GMA
            </SectionLabel>
            <h1
              style={{
                fontFamily: "var(--hf)",
                fontSize: mob ? 28 : 42,
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: 14,
              }}
            >
              Consejos para una<br />visión más saludable
            </h1>
            <p style={{ fontSize: mob ? 14 : 15.5, color: "rgba(255,255,255,.65)", lineHeight: 1.7, maxWidth: 520 }}>
              Artículos escritos por nuestros especialistas sobre salud visual, óptica, pediatría ocular y tendencias en cuidado de la vista.
            </p>
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: mob ? "36px 18px 80px" : `48px ${px} 96px` }}>

          {/* Search */}
          <div className="blog-search-wrap">
            <Search size={16} className="blog-search-icon" />
            <input
              className="blog-search"
              placeholder="Buscar artículos…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category tabs */}
          <div className="blog-tabs">
            {CATEGORIES.map((c) => (
              <button
                key={c.slug}
                className={`blog-tab ${activeCategory === c.slug ? "active" : ""}`}
                onClick={() => { setCategory(c.slug); setSearch(""); }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Featured — only on "todos" and no search */}
          {featured && activeCategory === "todos" && !search && (
            <Reveal>
              <div className="blog-featured" onClick={() => goPost(featured.slug)}>
                <div className="blog-featured-img lens-img">
                  <img src={featured.coverImage} alt={featured.title} loading="lazy" />
                </div>
                <div className="blog-featured-body">
                  <div className="blog-featured-badge">
                    <BookOpen size={10} /> Artículo destacado
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(var(--p-rgb),.1)", color: "var(--p)", fontSize: 10, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 20, marginBottom: 12 }}>
                    {featured.category}
                  </div>
                  <div className="blog-featured-title">{featured.title}</div>
                  <p className="blog-featured-excerpt">{featured.excerpt}</p>
                  <div className="blog-featured-meta">
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--g)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>
                        {featured.author.initials}
                      </div>
                      <span>{featured.author.name}</span>
                    </div>
                    <span>·</span>
                    <span>{formatDate(featured.publishedAt)}</span>
                    <span>·</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={11} /> {featured.readTime} min
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--p)", fontWeight: 700, marginTop: 2 }}>
                      Leer artículo <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* Grid */}
          <div className="blog-grid">
            {filtered.length === 0 ? (
              <div className="blog-empty">
                <div className="blog-empty-icon">🔍</div>
                <p style={{ fontSize: 15, fontWeight: 600, color: "var(--head)" }}>No se encontraron artículos</p>
                <p style={{ fontSize: 13, marginTop: 6 }}>Prueba con otra búsqueda o categoría.</p>
              </div>
            ) : (
              filtered.map((post, i) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  delay={i * 60}
                  onClick={() => goPost(post.slug)}
                />
              ))
            )}
          </div>
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

// ── Blog Card ────────────────────────────────────────────────────────────────

function BlogCard({ post, delay, onClick }: { post: BlogPost; delay: number; onClick: () => void }) {
  return (
    <div
      className="blog-card blog-card-anim"
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      <div className="blog-card-img lens-img">
        <img src={post.coverImage} alt={post.title} loading="lazy" />
        <span className="blog-card-cat">{post.category}</span>
      </div>
      <div className="blog-card-body">
        <div className="blog-card-title">{post.title}</div>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <div className="blog-card-foot">
          <div className="blog-card-meta">
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--g)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
              {post.author.initials}
            </div>
            <Clock size={10} /> {post.readTime} min
          </div>
          <span className="blog-card-read">
            Leer <ArrowRight size={11} />
          </span>
        </div>
      </div>
    </div>
  );
}
