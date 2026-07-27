import { useRef, useState, useEffect, type CSSProperties } from "react";
import { Img } from "../ui/Img";
import {
  ArrowRight,
  Eye,
  BadgeCheck,
  Star,
  MapPin,
  Shield,
} from "lucide-react";
import { Pill } from "../ui/Badge";
import { InfoBar } from "../layout/InfoBar";
import { GRADIENT, PRIMARY, DOCTOR_IMG } from "../../constants/theme";
import { useMobile } from "../../hooks/useMobile";

interface HeroProps {
  onBooking: () => void;
  ready?: boolean;
}

export function Hero({ onBooking, ready = true }: HeroProps) {
  const mob = useMobile(768);
  const tab = useMobile(1024);
  const [portrait, setPortrait] = useState(() => window.innerHeight > window.innerWidth);

  useEffect(() => {
    const fn = () => setPortrait(window.innerHeight > window.innerWidth);
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, []);

  if (mob) return <HeroMobile onBooking={onBooking} ready={ready} />;
  return <HeroDesktop onBooking={onBooking} tab={tab} tabPortrait={tab && portrait} />;
}

const EO = "cubic-bezier(0.16,1,0.3,1)";

function HeroMobile({ onBooking, ready = true }: HeroProps) {
  const wasReady = useRef(ready);

  const slide = (delay: number): CSSProperties => {
    if (wasReady.current) return {};
    return {
      opacity: ready ? 1 : 0,
      transform: ready ? "translateY(0)" : "translateY(18px)",
      transition: `opacity 560ms ${EO} ${delay}ms, transform 560ms ${EO} ${delay}ms`,
    };
  };

  return (
    <section
      className="hero-mob-h"
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        background: "#1A0A19",
      }}
    >
      {/* Foto full bleed — cubre todo el ancho */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src={DOCTOR_IMG}
          alt="Dr. Antonio Santamaría — Ópticas GMA"
          fetchPriority="high"
          decoding="async"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "28% top",
            opacity: wasReady.current ? 1 : ready ? 1 : 0,
            transition: wasReady.current ? "none" : `opacity 900ms ${EO}`,
          }}
        />
      </div>

      {/* Vignette suave top y bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(26,10,25,.35) 0%, transparent 25%, transparent 70%, rgba(26,10,25,.5) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Columna izquierda: contenido con backdrop oscuro solo detrás del texto */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 12px 24px 20px",
          minHeight: "100%",
          background:
            "linear-gradient(to right, rgba(26,10,25,.80) 0%, rgba(26,10,25,.74) 18%, rgba(26,10,25,.58) 36%, rgba(26,10,25,.36) 55%, rgba(26,10,25,.14) 74%, rgba(26,10,25,.03) 88%, transparent 100%)",
        }}
      >
        {/* Etiqueta */}
        <div style={{ marginBottom: 7, ...slide(0) }}>
          <span
            style={{
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,.32)",
            }}
          >
            Ópticas GMA
          </span>
        </div>

        {/* H1 */}
        <h1
          style={{
            color: "#fff",
            marginBottom: 12,
            lineHeight: 1.1,
            fontSize: "clamp(22px,6.5vw,28px)",
            letterSpacing: "-.022em",
            ...slide(80),
          }}
        >
          Tu visión, en manos de{" "}
          <span
            style={{
              background: "white",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            especialistas
          </span>
          .
        </h1>

        {/* Identidad — borde izquierdo magenta */}
        <div
          style={{
            borderLeft: "2px solid #E83EF0",
            paddingLeft: 10,
            marginBottom: 14,
            ...slide(150),
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-.01em",
              marginBottom: 2,
            }}
          >
            Antonio Santamaría
          </div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,.45)" }}>
            Director General · Optómetra
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginBottom: 14, ...slide(210) }}>
          <button
            className="btn"
            style={{ padding: "12px 16px", justifyContent: "center", width: "100%" }}
            onClick={onBooking}
          >
            Reservar Cita <ArrowRight size={13} />
          </button>
        </div>

        {/* Social proof */}
        <div style={{ ...slide(270) }}>
          <AvatarRow />
        </div>
      </div>

      <InfoBar variant="mobile" />
    </section>
  );
}

function HeroDesktop({ onBooking, tab, tabPortrait }: HeroProps & { tab: boolean; tabPortrait?: boolean }) {
  return (
    <section
      style={{
        minHeight: "100dvh",
        background:
          "linear-gradient(135deg,#FFF7FA 0%,#F7FAFD 50%,#F2F6FB 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle,rgba(var(--p-rgb),.055) 1.5px,transparent 1.5px)",
          backgroundSize: "44px 44px",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(var(--p-rgb),.10),transparent 65%)",
          top: -100,
          right: -80,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: tabPortrait ? "center" : undefined,
          maxWidth: 1160,
          margin: "0 auto",
          width: "100%",
          padding: tabPortrait ? "80px 32px 40px" : tab ? "110px 32px 48px" : "110px 64px 56px",
          gap: tabPortrait ? 0 : tab ? 40 : 48,
          flexDirection: tabPortrait ? "column" : "row",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* LEFT */}
        <div
          style={{
            flex: "0 0 auto",
            width: tabPortrait ? "100%" : tab ? "50%" : "48%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: tabPortrait ? "center" : "flex-start",
            textAlign: tabPortrait ? "center" : "left",
            marginBottom: tabPortrait ? 40 : 0,
          }}
        >
          <Pill className="s1" style={{ marginBottom: 20 }}>
            Especialistas en Salud Visual · Norte del Perú
          </Pill>
          <h1
            className="s2"
            style={{
              marginBottom: 18,
              lineHeight: 1.08,
              color: "var(--head)",
              fontSize: tabPortrait ? "clamp(36px, 6vw, 52px)" : undefined,
            }}
          >
            Tu visión, en manos
            <br />
            de <span className="gt">especialistas</span>.
          </h1>
          <p
            className="s3"
            style={{
              fontSize: tabPortrait ? 16 : tab ? 14.5 : 16,
              color: "var(--body)",
              lineHeight: 1.85,
              marginBottom: 32,
              maxWidth: tabPortrait ? 560 : 420,
            }}
          >
            Más de 14 años cuidando la salud visual de las familias del norte
            del Perú, con tecnología de diagnóstico moderna y un trato cercano.
          </p>
          <div
            className="s4"
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 36,
              justifyContent: tabPortrait ? "center" : "flex-start",
            }}
          >
            <button className="btn" onClick={onBooking}>
              Reservar Cita <ArrowRight size={14} />
            </button>
            <button className="btn-ghost">Conoce la Clínica</button>
          </div>
          <div className="s5">
            <AvatarRow dark />
          </div>
        </div>

        {/* RIGHT */}
        <div
          style={{
            flex: tabPortrait ? "0 0 auto" : 1,
            width: tabPortrait ? "100%" : undefined,
            maxWidth: tabPortrait ? 520 : undefined,
            alignSelf: tabPortrait ? "center" : undefined,
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            minHeight: tabPortrait ? 360 : tab ? 480 : 560,
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: tabPortrait ? 320 : tab ? 340 : 420,
              height: tabPortrait ? 360 : tab ? 420 : 500,
              background: GRADIENT,
              borderRadius: "60% 40% 55% 45% / 60% 55% 45% 40%",
              opacity: 0.13,
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              width: tabPortrait ? 300 : tab ? 320 : 400,
              height: tabPortrait ? 340 : tab ? 400 : 480,
              border: "1.5px dashed rgba(var(--p-rgb),.22)",
              borderRadius: "60% 40% 55% 45% / 60% 55% 45% 40%",
              zIndex: 0,
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: tabPortrait ? 300 : tab ? 300 : 380,
              height: tabPortrait ? 360 : tab ? 400 : 500,
              borderRadius: "48% 52% 44% 56% / 52% 48% 52% 48%",
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(13,27,42,.18)",
            }}
          >
            <Img
              src={DOCTOR_IMG}
              alt="Especialista Ópticas GMA"
              duration={800}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "68% center",
              }}
            />
          </div>

          {/* Chip: 14+ años */}
          <div
            className="float"
            style={{
              position: "absolute",
              top: tabPortrait ? 20 : tab ? 60 : 40,
              right: tabPortrait ? 16 : tab ? 0 : 20,
              zIndex: 3,
              background: "#fff",
              borderRadius: 14,
              padding: "13px 16px",
              display: "flex",
              alignItems: "center",
              gap: 11,
              boxShadow: "0 10px 32px rgba(13,27,42,.12)",
              border: "1px solid var(--br)",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(var(--p-rgb),.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Shield size={16} color={PRIMARY} strokeWidth={1.8} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--hf)",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "var(--head)",
                  lineHeight: 1,
                }}
              >
                14+ años
              </div>
              <div style={{ fontSize: 11, color: "var(--body)", marginTop: 3 }}>
                de experiencia clínica
              </div>
            </div>
          </div>

          {/* Chip: doctor ID */}
          <div
            className="float-slow"
            style={{
              position: "absolute",
              bottom: tabPortrait ? 60 : tab ? 60 : 80,
              left: tabPortrait ? 16 : tab ? -10 : 0,
              zIndex: 3,
              background: "#fff",
              borderRadius: 16,
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: "0 12px 36px rgba(13,27,42,.14)",
              border: "1px solid var(--br)",
              minWidth: 220,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: GRADIENT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(var(--p-rgb),.3)",
              }}
            >
              <Eye size={19} color="#fff" strokeWidth={1.8} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  marginBottom: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--hf)",
                    fontWeight: 700,
                    fontSize: 14,
                    color: "var(--head)",
                  }}
                >
                  Antonio Santamaría
                </span>
                <BadgeCheck
                  size={13}
                  color={PRIMARY}
                  style={{ flexShrink: 0 }}
                />
              </div>
              <div style={{ fontSize: 11.5, color: "var(--body)" }}>
                Director · Ópticas GMA
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  marginTop: 5,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#22C55E",
                  }}
                />
                <span
                  style={{ fontSize: 10.5, color: "#22C55E", fontWeight: 600 }}
                >
                  Disponible hoy
                </span>
              </div>
            </div>
          </div>

          {/* Chip: 2 locales */}
          <div
            style={{
              position: "absolute",
              bottom: tabPortrait ? 16 : tab ? 20 : 30,
              right: tabPortrait ? 16 : tab ? 0 : 10,
              zIndex: 3,
              background: "#fff",
              borderRadius: 12,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 9,
              boxShadow: "0 8px 24px rgba(13,27,42,.10)",
              border: "1px solid var(--br)",
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: GRADIENT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 3px 10px rgba(var(--p-rgb),.28)",
              }}
            >
              <MapPin size={13} color="#fff" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--hf)",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "var(--head)",
                  lineHeight: 1.1,
                }}
              >
                2 locales
              </div>
              <div style={{ fontSize: 10, color: "var(--body)", marginTop: 2 }}>
                Jaén · Bagua Grande
              </div>
            </div>
          </div>
        </div>
      </div>

      <InfoBar variant="desktop" tab={tab} />
    </section>
  );
}

const AVATAR_COLORS = ["#D033E0", "#921EA0", "#CD6FA1"];

function AvatarRow({ dark = false }: { dark?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: dark ? 14 : 12,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex" }}>
        {["A", "M", "L", "+"].map((c, i) => (
          <div
            key={i}
            style={{
              width: dark ? 34 : 28,
              height: dark ? 34 : 28,
              borderRadius: "50%",
              border: dark
                ? "2.5px solid #fff"
                : "2px solid rgba(255,255,255,.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: dark ? 12 : 10,
              fontWeight: 700,
              color: "#fff",
              background:
                i === 3
                  ? dark
                    ? "rgba(50,26,49,.12)"
                    : "rgba(255,255,255,.1)"
                  : `linear-gradient(135deg,${AVATAR_COLORS[i] ?? "#D033E0"},#CD6FA1)`,
              marginLeft: i > 0 ? (dark ? -10 : -8) : 0,
              zIndex: 4 - i,
            }}
          >
            {c}
          </div>
        ))}
      </div>
      <div>
        <div style={{ display: "flex", gap: 2, marginBottom: dark ? 3 : 2 }}>
          {[...Array(5)].map((_, j) => (
            <Star key={j} size={dark ? 12 : 11} fill={PRIMARY} stroke="none" />
          ))}
        </div>
        <div
          style={{
            fontSize: dark ? 12.5 : 11.5,
            color: dark ? "var(--body)" : "rgba(255,255,255,.6)",
            fontWeight: 500,
          }}
        >
          <strong style={{ color: dark ? "var(--head)" : "#fff" }}>96%</strong>{" "}
          {dark ? "de pacientes nos recomiendan" : "nos recomiendan"}
        </div>
      </div>
    </div>
  );
}
