import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Img } from "../ui/Img";
import { SectionLabel } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { STEPS_PROCESS } from "../../data/services";
import { IMG } from "../../constants/theme";
import { useMobile } from "../../hooks/useMobile";

const EO = "cubic-bezier(0.16, 1, 0.3, 1)";

interface ProcessProps {
  onBooking: () => void;
}

export function Process({ onBooking }: ProcessProps) {
  const mob = useMobile(768);
  const tab = useMobile(1024);
  const px = mob ? "18px" : tab ? "32px" : "64px";
  const py = mob ? "52px" : tab ? "72px" : "96px";

  const [animated, setAnimated] = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const tlRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Mobile: fire animation on viewport entry, then loop every 5 s
  useEffect(() => {
    const el = tlRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval>;
    const restart = () => {
      setAnimated(false);
      // Two rAFs flush the class removal before re-adding it
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimated(true)),
      );
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setAnimated(true);
          io.disconnect();
          timer = setInterval(restart, 10000);
        }
      },
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [mob]);

  // Desktop: track active dot on manual scroll + auto-advance every 5 s
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handleScroll = () => {
      const maxScroll = track.scrollWidth - track.offsetWidth;
      if (maxScroll <= 0) return;
      const idx = Math.round(
        (track.scrollLeft / maxScroll) * (STEPS_PROCESS.length - 1),
      );
      setActiveDot(Math.max(0, Math.min(idx, STEPS_PROCESS.length - 1)));
    };
    const advance = () => {
      setActiveDot((prev) => {
        const next = (prev + 1) % STEPS_PROCESS.length;
        const maxScroll = track.scrollWidth - track.offsetWidth;
        if (maxScroll > 0)
          track.scrollTo({
            left: (next / (STEPS_PROCESS.length - 1)) * maxScroll,
            behavior: "smooth",
          });
        return next;
      });
    };
    track.addEventListener("scroll", handleScroll, { passive: true });
    const timer = setInterval(advance, 6000);
    return () => {
      track.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, [mob]);

  return (
    <section
      style={{ position: "relative", overflow: "hidden", width: "100%" }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Img
          src={IMG.process}
          alt="Proceso"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(13,27,42,.85) 0%, rgba(60,9,80,.80) 60%, rgba(100,9,121,.75) 100%)",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 2, padding: `${py} ${px}` }}>
        {/* Header */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: mob ? 36 : 56 }}>
            <SectionLabel
              style={{
                justifyContent: "center",
                color: "var(--p)",
              }}
            >
              Nuestro Proceso
            </SectionLabel>
            <h2 style={{ color: "#fff", marginBottom: 12 }}>
              Pasos Claros hacia
              <br />
              una Mejor Visión
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,.6)",
                fontSize: mob ? 14 : 15,
                maxWidth: 480,
                margin: "0 auto",
              }}
            >
              Desde tu primera consulta hasta el seguimiento, te acompañamos en
              cada etapa.
            </p>
          </div>
        </Reveal>

        {mob ? (
          /* ── MOBILE: Vertical timeline ── */
          <div
            ref={tlRef}
            className={`proc-tl${animated ? " proc-animate" : ""}`}
            style={{
              position: "relative",
              paddingLeft: 38,
              maxWidth: 400,
              margin: "0 auto",
            }}
          >
            {/* Vertical connector line */}
            <div
              style={{
                position: "absolute",
                left: 12,
                top: 8,
                bottom: 8,
                width: "1.5px",
                background: "rgba(255,255,255,.1)",
              }}
            />

            {STEPS_PROCESS.map(({ n, t, d }, i) => {
              const delay = i * 680;
              return (
                <div
                  key={n}
                  style={{
                    position: "relative",
                    paddingBottom: i < STEPS_PROCESS.length - 1 ? 28 : 0,
                    minHeight: 62,
                  }}
                >
                  {/* Dot — spring pops from scale(0.2) */}
                  <div
                    className="proc-dot"
                    style={{
                      position: "absolute",
                      left: -31,
                      top: 4,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "rgba(var(--p-rgb), 1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      animationDelay: `${delay}ms`,
                    }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#fff",
                      }}
                    />
                  </div>

                  {/* Decorative big number — stamps from scale(1.5) */}
                  <div
                    className="proc-bignum"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: -4,
                      fontFamily: "var(--hf)",
                      fontSize: 46,
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      color: "rgba(var(--p-rgb), 1)",
                      pointerEvents: "none",
                      userSelect: "none",
                      animationDelay: `${delay}ms`,
                    }}
                  >
                    {n}
                  </div>

                  {/* Content — slides from -8px */}
                  <div
                    className="proc-content"
                    style={{
                      position: "relative",
                      zIndex: 1,
                      animationDelay: `${delay + 120}ms`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: ".1em",
                        color: "rgba(var(--p-rgb), .85)",
                        marginBottom: 3,
                      }}
                    >
                      {n}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--hf)",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#fff",
                        marginBottom: 5,
                        lineHeight: 1.35,
                      }}
                    >
                      {t}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,.45)",
                        lineHeight: 1.7,
                      }}
                    >
                      {d}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ── DESKTOP: Horizontal carousel ── */
          <Reveal>
            <div style={{ maxWidth: 1160, margin: "0 auto" }}>
              <div
                ref={trackRef}
                className="proc-track"
                style={
                  {
                    display: "flex",
                    gap: 16,
                    overflowX: "auto",
                    scrollSnapType: "x mandatory",
                    paddingBottom: 8,
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                  } as React.CSSProperties
                }
              >
                {STEPS_PROCESS.map(({ n, Icon, t, d }) => (
                  <div
                    key={n}
                    style={{
                      flexShrink: 0,
                      width: "calc((100% - 80px) / 6)",
                      minWidth: 160,
                      scrollSnapAlign: "start",
                      background: "rgba(255,255,255,.07)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,.1)",
                      borderRadius: 16,
                      padding: "22px 16px",
                      transition: `background 400ms ${EO}`,
                      cursor: "default",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(var(--p-rgb), .14)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,.07)")
                    }
                  >
                    {/* Icon circle */}
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        background: "rgba(var(--p-rgb), .12)",
                        border: "1.5px solid rgba(var(--p-rgb), .28)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 14,
                        color: "rgba(var(--p-rgb), 1)",
                      }}
                    >
                      <Icon size={22} strokeWidth={1.6} />
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: ".1em",
                        color: "rgba(var(--p-rgb), .9)",
                        marginBottom: 6,
                      }}
                    >
                      {n}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--hf)",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#fff",
                        marginBottom: 8,
                        lineHeight: 1.3,
                      }}
                    >
                      {t}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,.55)",
                        lineHeight: 1.7,
                      }}
                    >
                      {d}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress dots */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 6,
                  marginTop: 20,
                }}
              >
                {STEPS_PROCESS.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: 5,
                      borderRadius: 3,
                      width: i === activeDot ? 20 : 5,
                      background:
                        i === activeDot
                          ? "rgba(var(--p-rgb),1)"
                          : "rgba(255,255,255,.22)",
                      transition: `width 380ms ${EO}, background 380ms ${EO}`,
                    }}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* CTA */}
        <Reveal delay={180}>
          <div style={{ textAlign: "center", marginTop: mob ? 36 : 48 }}>
            <button
              className="btn"
              style={{
                background: "#fff",
                color: "var(--p)",
                boxShadow: "0 4px 18px rgba(var(--p-rgb), .25",
              }}
              onClick={onBooking}
            >
              Iniciar mi proceso <ArrowRight size={14} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
