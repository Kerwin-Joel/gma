import { ArrowRight, ShoppingBag } from "lucide-react";
import { SectionLabel } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { useMobile } from "../../hooks/useMobile";
import { GRADIENT, IMG } from "../../constants/theme";

const STORE_URL = "https://tienda.opticasgma.com";
const STORE_LINK = { href: STORE_URL, target: "_blank", rel: "noopener noreferrer" } as const;

const Q = "?w=800&h=600&q=85&fit=crop&auto=format";

const CATS = [
  {
    name: "Monturas",
    sub: "Ópticas · Deportivas · Moda",
    desde: "Desde S/ 89",
    img: `https://plus.unsplash.com/premium_photo-1661319134179-50e9552b63c0${Q}`,
  },
  {
    name: "Lentes de Sol",
    sub: "UV400 · Polarizados · Espejados",
    desde: "Desde S/ 79",
    img: `https://plus.unsplash.com/premium_photo-1692340973236-e4617a167ff4${Q}`,
  },
  {
    name: "Lentes de Contacto",
    sub: "Diarios · Mensuales · Color",
    desde: "Desde S/ 45",
    img: `https://plus.unsplash.com/premium_photo-1671656333452-7369599f92ee${Q}`,
  },
  {
    name: "Accesorios",
    sub: "Estuches · Cadenas · Líquidos",
    desde: "Desde S/ 15",
    img: `https://images.unsplash.com/photo-1509695507497-903c140c43b0${Q}`,
  },
];

function CategoryCard({ name, sub, desde, img, mob = false }: {
  name: string; sub: string; desde: string; img: string; mob?: boolean;
}) {
  return (
    <a {...STORE_LINK} style={{ textDecoration: "none" }}>
      <div
        style={{
          position: "relative", overflow: "hidden",
          borderRadius: mob ? 14 : 16,
          height: mob ? 140 : 160,
          cursor: "pointer",
          transition: "transform 220ms ease, box-shadow 220ms ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(-3px)";
          el.style.boxShadow = "0 12px 28px rgba(0,0,0,.18)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "none";
        }}
      >
        <img src={img} alt={name} style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
          transition: "transform 400ms ease",
        }} />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,.75) 0%, rgba(0,0,0,.25) 55%, rgba(0,0,0,.05) 100%)",
        }} />
        {/* Text */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: mob ? "12px 14px" : "14px 16px",
        }}>
          <div style={{
            fontFamily: "var(--hf)", fontWeight: 700,
            fontSize: mob ? 14 : 16, color: "#fff",
            marginBottom: 2, letterSpacing: "-.01em",
          }}>
            {name}
          </div>
          <div style={{
            fontSize: mob ? 10 : 11, color: "rgba(255,255,255,.62)",
            lineHeight: 1.4, marginBottom: mob ? 6 : 8,
          }}>
            {sub}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: mob ? 11 : 12, color: "rgba(255,255,255,.65)", fontWeight: 500 }}>
              {desde}
            </span>
            <span style={{
              display: "flex", alignItems: "center", gap: 4,
              fontSize: 11, fontWeight: 700, color: "#fff",
              background: "rgba(255,255,255,.18)",
              backdropFilter: "blur(6px)",
              borderRadius: 20, padding: "4px 10px",
            }}>
              Pedir <ArrowRight size={9} />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export function Store() {
  const mob = useMobile(768);
  const tab = useMobile(1024);
  const px = mob ? "18px" : tab ? "32px" : "64px";
  const py = mob ? "52px" : tab ? "72px" : "96px";

  return (
    <section style={{
      background: "linear-gradient(160deg,#FFF7FA 0%,#F7FAFD 60%,#F2F6FB 100%)",
      padding: `${py} ${px}`,
      width: "100%",
      overflowX: "hidden",
      position: "relative",
    }}>
      {/* Dot pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle,rgba(var(--p-rgb),.055) 1.5px,transparent 1.5px)",
        backgroundSize: "44px 44px",
      }} />
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(var(--p-rgb),.07),transparent 65%)",
        top: -120, right: -80, pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1160, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>

        {/* ── Header centrado ── */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: mob ? 28 : 44 }}>
            <SectionLabel style={{ justifyContent: "center" }}>Tienda Online</SectionLabel>
            <h2 style={{ marginTop: 10, marginBottom: 14, lineHeight: 1.1 }}>
              Encuentra tu{" "}
              <span style={{
                background: GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                estilo visual
              </span>{" "}perfecto.
            </h2>
            <p style={{
              fontSize: mob ? 14 : 16, color: "var(--body)",
              maxWidth: 480, margin: "0 auto", lineHeight: 1.75,
            }}>
              Monturas, lentes de sol, de contacto y accesorios. Compra
              en línea con asesoría personalizada.
            </p>
          </div>
        </Reveal>

        {/* ── Hero card contenida ── */}
        <Reveal>
          <div style={{
            borderRadius: mob ? 20 : 28,
            overflow: "hidden",
            position: "relative",
            height: mob ? 280 : tab ? 360 : 440,
            marginBottom: mob ? 16 : 24,
            boxShadow: "0 8px 40px rgba(13,27,42,.12)",
          }}>
            <img
              src={IMG.clinic}
              alt="Ópticas GMA tienda"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: mob ? "center top" : "center 30%" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(120deg,rgba(10,5,20,.75) 0%,rgba(10,5,20,.3) 55%,transparent 100%)",
            }} />

            {/* Glassmorphism card */}
            <div style={{
              position: "absolute",
              ...(mob
                ? { bottom: 20, left: "50%", transform: "translateX(-50%)", width: "calc(100% - 32px)" }
                : { top: "50%", left: 32, transform: "translateY(-50%)", maxWidth: 400 }
              ),
              background: "rgba(255,255,255,.11)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,.22)",
              borderRadius: mob ? 16 : 20,
              padding: mob ? "18px 18px" : "28px 30px",
            }}>
              <p style={{
                fontSize: mob ? 10 : 11, fontWeight: 700,
                letterSpacing: ".1em", textTransform: "uppercase",
                color: "rgba(255,255,255,.6)", margin: "0 0 8px",
              }}>
                Ópticas GMA · Tienda Online
              </p>
              <h3 style={{
                color: "#fff", lineHeight: 1.15, margin: "0 0 8px",
                fontSize: mob ? 18 : 24, fontWeight: 700,
                letterSpacing: "-.02em",
              }}>
                Compra desde casa,<br />
                <span style={{ color: "rgba(255,255,255,.85)" }}>ahorra tiempo.</span>
              </h3>
              {!mob && (
                <p style={{
                  fontSize: 13, color: "rgba(255,255,255,.65)",
                  lineHeight: 1.65, margin: "0 0 18px",
                }}>
                  Explora nuestro catálogo, elige tu modelo favorito
                  y coordinamos el envío a domicilio.
                </p>
              )}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: mob ? 12 : 0 }}>
                <a
                  {...STORE_LINK}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: GRADIENT, color: "#fff", textDecoration: "none",
                    borderRadius: 40, padding: mob ? "9px 16px" : "11px 22px",
                    fontSize: mob ? 12 : 13, fontWeight: 700,
                    boxShadow: "0 4px 16px rgba(var(--p-rgb),.4)",
                  }}
                >
                  <ShoppingBag size={13} /> Ver catálogo
                </a>
                <a
                  {...STORE_LINK}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: "rgba(255,255,255,.14)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,.28)",
                    color: "#fff", textDecoration: "none",
                    borderRadius: 40, padding: mob ? "9px 16px" : "11px 22px",
                    fontSize: mob ? 12 : 13, fontWeight: 600,
                  }}
                >
                  Pedir asesoría <ArrowRight size={12} />
                </a>
              </div>
            </div>

            {/* Stats badge flotante */}
            {!mob && (
              <div style={{
                position: "absolute", bottom: 24, right: 24,
                background: "rgba(255,255,255,.12)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,.2)",
                borderRadius: 14, padding: "12px 18px",
                display: "flex", alignItems: "center", gap: 16,
              }}>
                {[["200+", "Modelos"], ["14+", "Años"], ["2", "Locales"]].map(([n, l], i, arr) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{n}</div>
                      <div style={{ fontSize: 9.5, color: "rgba(255,255,255,.55)", marginTop: 2 }}>{l}</div>
                    </div>
                    {i < arr.length - 1 && <div style={{ width: 1, height: 28, background: "rgba(255,255,255,.18)" }} />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        {/* ── Category cards — layout asimétrico ── */}
        <Reveal>
          {mob ? (
            /* Mobile: 2 columnas simples */
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {CATS.map(({ name, sub, desde, img }) => (
                <CategoryCard key={name} name={name} sub={sub} desde={desde} img={img} mob />
              ))}
            </div>
          ) : (
            /* Desktop/tablet: 1 grande + 3 pequeñas */
            <div style={{ display: "grid", gridTemplateColumns: tab ? "1fr 1fr" : "1.15fr 1fr", gap: 14 }}>

              {/* Tarjeta feature — Monturas */}
              <a {...STORE_LINK} style={{ textDecoration: "none", gridRow: tab ? "auto" : "span 3" }}>
                <div
                  style={{
                    position: "relative", overflow: "hidden",
                    borderRadius: 20, height: tab ? 200 : "100%", minHeight: tab ? undefined : 340,
                    border: "1px solid rgba(0,0,0,.05)",
                    cursor: "pointer",
                    transition: "transform 220ms ease, box-shadow 220ms ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "translateY(-3px)";
                    el.style.boxShadow = "0 12px 32px rgba(0,0,0,.10)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <img
                    src={CATS[0].img}
                    alt={CATS[0].name}
                    style={{
                      position: "absolute", inset: 0,
                      width: "100%", height: "100%",
                      objectFit: "cover", objectPosition: "center",
                    }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,.75) 0%, rgba(0,0,0,.25) 55%, rgba(0,0,0,.05) 100%)",
                  }} />
                  <div style={{ position: "relative", zIndex: 1, padding: "28px 28px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{
                        display: "inline-block",
                        background: "rgba(255,255,255,.18)",
                        backdropFilter: "blur(8px)",
                        borderRadius: 30, padding: "4px 12px",
                        fontSize: 11, fontWeight: 700,
                        color: "#fff", marginBottom: 16,
                        letterSpacing: ".04em",
                      }}>
                        200+ modelos
                      </div>
                      <h3 style={{
                        fontFamily: "var(--hf)", fontWeight: 800,
                        fontSize: tab ? 26 : 32, color: "#fff",
                        lineHeight: 1.1, margin: "0 0 8px",
                        letterSpacing: "-.02em",
                      }}>
                        {CATS[0].name}
                      </h3>
                      <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.7)", margin: 0, lineHeight: 1.6 }}>
                        {CATS[0].sub}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{CATS[0].desde}</span>
                      <span style={{
                        display: "flex", alignItems: "center", gap: 6,
                        fontSize: 13, fontWeight: 700, color: "#fff",
                        background: "rgba(255,255,255,.18)", backdropFilter: "blur(6px)",
                        borderRadius: 30, padding: "7px 14px",
                      }}>
                        Ver ahora <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              </a>

              {/* 3 tarjetas pequeñas */}
              {CATS.slice(1).map(({ name, sub, desde, img }) => (
                <CategoryCard key={name} name={name} sub={sub} desde={desde} img={img} />
              ))}
            </div>
          )}
        </Reveal>

      </div>
    </section>
  );
}
