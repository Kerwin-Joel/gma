import { useRef, type CSSProperties } from "react";
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

  if (mob) return <HeroMobile onBooking={onBooking} ready={ready} />;
  return <HeroDesktop onBooking={onBooking} tab={tab} />;
}

const EO = "cubic-bezier(0.16,1,0.3,1)";

function HeroMobile({ onBooking, ready = true }: HeroProps) {
  const wasReady = useRef(ready);

  const slide = (delay: number): CSSProperties => {
    if (wasReady.current) return {};
    // transition siempre puesta — si coincide con el cambio de opacity, el browser anima
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
        flexDirection: "column",
        background: "#1A0A19",
      }}
    >
      {/* Foto — cara nítida, overlay reducido */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img
          src={DOCTOR_IMG}
          alt="Especialista Ópticas GMA"
          fetchPriority="high"
          decoding="async"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "20%",
            opacity: wasReady.current ? 1 : ready ? 1 : 0,
            transition: wasReady.current ? "none" : `opacity 900ms ${EO}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(26,10,25,0) 0%, rgba(26,10,25,.02) 28%, rgba(26,10,25,.38) 52%, rgba(26,10,25,.72) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 58%, rgba(26,10,25,.18) 100%)",
          }}
        />
      </div>

      {/* Spacer superior — más pequeño para subir la identidad */}
      <div style={{ flex: 3 }} />

      {/* [1] Firma identidad — izquierda, ancho contenido */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 20px",
          alignSelf: "flex-start",
          maxWidth: "62%",
          ...slide(0),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 9,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 7,
              background: PRIMARY,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Eye size={12} color="#fff" strokeWidth={1.8} />
          </div>
          <span
            style={{
              fontSize: 8.5,
              fontWeight: 700,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "var(--bg)",
            }}
          >
            Ópticas GMA
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            marginBottom: 3,
          }}
        >
          <span
            style={{
              fontFamily: "var(--hf)",
              fontWeight: "bold",
              fontSize: 17,
              color: "white",
              letterSpacing: "-.015em",
            }}
          >
            Antonio Santamaría
          </span>
          <BadgeCheck size={13} color={PRIMARY} style={{ flexShrink: 0 }} />
        </div>
        <div
          style={{
            fontSize: 10.5,
            color: "rgba(255,255,255)",
            marginBottom: 7,
          }}
        >
          Director General · Optómetra
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 9px",
            background: "rgba(208,51,224,.12)",
            border: "0.5px solid rgba(208,51,224,.28)",
            borderRadius: 20,
          }}
        >
          <Shield size={10} color="#DC58E8" />
          <span
            style={{
              fontSize: 8.5,
              fontWeight: 700,
              color: "var(--bg)",
              whiteSpace: "nowrap",
              letterSpacing: ".03em",
            }}
          >
            Optómetra Cert.
          </span>
        </div>
      </div>

      {/* Spacer inferior — más grande para bajar el contenido */}
      <div style={{ flex: 2 }} />

      {/* Contenido — H1 + CTAs pegados al fondo */}
      <div style={{ position: "relative", zIndex: 2, padding: "0 20px 20px" }}>
        {/* [2] H1 */}
        <h1
          style={{
            color: "#fff",
            marginBottom: 10,
            lineHeight: 1.07,
            fontSize: "clamp(26px,7vw,34px)",
            letterSpacing: "-.025em",
            ...slide(90),
          }}
        >
          Tu visión, en manos
          <br />
          de{" "}
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

        {/* [3] CTA principal */}
        <div style={{ marginBottom: 8, ...slide(180) }}>
          <button
            className="btn"
            style={{
              padding: "13px 22px",
              justifyContent: "center",
              width: "100%",
            }}
            onClick={onBooking}
          >
            Reservar Cita <ArrowRight size={14} />
          </button>
        </div>

        {/* Enlace secundario */}
        <div style={{ marginBottom: 18, ...slide(240) }}>
          <button
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,.42)",
              fontSize: 12,
              fontFamily: "var(--sf)",
              fontWeight: 600,
              letterSpacing: ".04em",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: 0,
            }}
          >
            Conoce la clínica <ArrowRight size={11} />
          </button>
        </div>

        {/* Prueba social */}
        <div style={{ ...slide(300) }}>
          <AvatarRow />
        </div>
      </div>

      <InfoBar variant="mobile" />
    </section>
  );
}

function HeroDesktop({ onBooking, tab }: HeroProps & { tab: boolean }) {
  return (
    <section
      style={{
        minHeight: "100vh",
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
          maxWidth: 1160,
          margin: "0 auto",
          width: "100%",
          padding: tab ? "110px 32px 48px" : "110px 64px 56px",
          gap: tab ? 40 : 48,
          flexDirection: "row",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* LEFT */}
        <div
          style={{
            flex: "0 0 auto",
            width: tab ? "50%" : "48%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Pill className="s1" style={{ marginBottom: 20 }}>
            Especialistas en Salud Visual · Norte del Perú
          </Pill>
          <h1
            className="s2"
            style={{ marginBottom: 18, lineHeight: 1.08, color: "var(--head)" }}
          >
            Tu visión, en manos
            <br />
            de <span className="gt">especialistas</span>.
          </h1>
          <p
            className="s3"
            style={{
              fontSize: tab ? 14.5 : 16,
              color: "var(--body)",
              lineHeight: 1.85,
              marginBottom: 32,
              maxWidth: 420,
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
            flex: 1,
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            minHeight: tab ? 480 : 560,
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: tab ? 340 : 420,
              height: tab ? 420 : 500,
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
              width: tab ? 320 : 400,
              height: tab ? 400 : 480,
              border: "1.5px dashed rgba(var(--p-rgb),.22)",
              borderRadius: "60% 40% 55% 45% / 60% 55% 45% 40%",
              zIndex: 0,
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: tab ? 300 : 380,
              height: tab ? 400 : 500,
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
              top: tab ? 60 : 40,
              right: tab ? 0 : 20,
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
              bottom: tab ? 60 : 80,
              left: tab ? -10 : 0,
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
              bottom: tab ? 20 : 30,
              right: tab ? 0 : 10,
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
