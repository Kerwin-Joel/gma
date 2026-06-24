import { useNavigate } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { SectionLabel } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { useMobile } from "../../hooks/useMobile";
import { BLOG_POSTS, formatDate } from "../../data/blogPosts";

export function Blog() {
  const nav = useNavigate();
  const mob = useMobile(768);
  const tab = useMobile(1024);
  const px = mob ? "18px" : tab ? "32px" : "64px";
  const py = mob ? "52px" : tab ? "72px" : "96px";

  const featured = BLOG_POSTS.find((p) => p.featured)!;
  const sidebar = BLOG_POSTS.filter((p) => !p.featured).slice(0, 3);

  const goPost = (slug: string) => nav(`/blog/${slug}`);
  const goBlog = () => nav("/blog");

  return (
    <section style={{ background: "#fff", padding: `${py} ${px}`, width: "100%", overflowX: "hidden" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", width: "100%" }}>

        <Reveal>
          <div style={{ display: "flex", alignItems: mob ? "flex-start" : "flex-end", justifyContent: "space-between", flexDirection: mob ? "column" : "row", gap: 12, marginBottom: mob ? 24 : 44 }}>
            <div>
              <SectionLabel style={{ justifyContent: "flex-start" }}>Blog</SectionLabel>
              <h2 style={{ marginBottom: 0 }}>Consejos para una Visión Clara</h2>
            </div>
            <button
              onClick={goBlog}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "1px solid var(--br)", borderRadius: 30, padding: "9px 18px", fontSize: 13, fontWeight: 600, color: "var(--body)", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "border-color .2s, color .2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--p)"; e.currentTarget.style.color = "var(--p)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--br)"; e.currentTarget.style.color = "var(--body)"; }}
            >
              Ver todos <ArrowRight size={13} />
            </button>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: mob || tab ? "1fr" : "1fr 1fr", gap: mob ? 24 : 40 }}>

          {/* Featured */}
          <Reveal delay={80}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => goPost(featured.slug)}
              onMouseEnter={(e) => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1)"; }}
            >
              <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 16 }} className="lens-img">
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", height: mob ? 190 : 260, objectFit: "cover", transition: "transform 500ms var(--ease-in-out)", display: "block" }}
                />
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ background: "rgba(var(--p-rgb),.1)", color: "var(--p)", fontWeight: 700, padding: "3px 12px", borderRadius: 30, fontSize: 10.5, textTransform: "uppercase", letterSpacing: ".06em" }}>
                  {featured.category}
                </span>
                <span style={{ fontSize: 11.5, color: "var(--body)", display: "flex", alignItems: "center", gap: 4 }}>
                  <Clock size={10} /> {featured.readTime} min · {formatDate(featured.publishedAt)}
                </span>
              </div>
              <h4 style={{ fontSize: mob ? 17 : 21, marginBottom: 10, lineHeight: 1.3 }}>
                {featured.title}
              </h4>
              <p style={{ fontSize: 13.5, color: "var(--body)", lineHeight: 1.7, marginBottom: 14 }}>
                {featured.excerpt}
              </p>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--p)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}>
                Leer más <ArrowRight size={12} />
              </span>
            </div>
          </Reveal>

          {/* Sidebar list */}
          <Reveal delay={180}>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {sidebar.map(({ slug, coverImage, title, category, readTime, publishedAt }, i) => (
                <div
                  key={slug}
                  style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "18px 0", borderBottom: i < sidebar.length - 1 ? "1px solid var(--br)" : "none", cursor: "pointer", transition: "opacity .2s" }}
                  onClick={() => goPost(slug)}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = ".75")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <div style={{ width: 80, height: 72, borderRadius: 10, overflow: "hidden", flexShrink: 0 }} className="lens-img">
                    <img src={coverImage} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, color: "var(--p)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 4 }}>
                      {category}
                    </div>
                    <div style={{ fontFamily: "var(--hf)", fontSize: mob ? 13 : 14.5, color: "var(--head)", marginBottom: 6, lineHeight: 1.35, fontWeight: 700 }}>
                      {title}
                    </div>
                    <span style={{ fontSize: 11, color: "var(--body)", display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={10} /> {readTime} min · {formatDate(publishedAt)}
                    </span>
                  </div>
                </div>
              ))}

              {/* Ver todos link */}
              <div style={{ paddingTop: 20 }}>
                <button
                  onClick={goBlog}
                  className="btn"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Ver todos los artículos <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
