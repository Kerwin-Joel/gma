import { Img } from "../ui/Img";
import { Reveal } from "../ui/Reveal";
import { BookingModal } from "../ui/BookingModal";
import { PRIMARY, GRADIENT, IMG } from "../../constants/theme";
import { useMobile } from "../../hooks/useMobile";

interface BookingTestimonialProps {
  onBooking: () => void;
}

export function BookingTestimonial({ onBooking }: BookingTestimonialProps) {
  const mob = useMobile(768);
  const tab = useMobile(1024);

  return (
    <section
      style={{ background: "var(--bg)", width: "100%", overflowX: "hidden" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: mob || tab ? "column" : "row",
          maxWidth: "100%",
        }}
      >
        {/* Testimonial */}
        <Reveal
          style={{
            flex: mob || tab ? "none" : "1 1 50%",
            position: "relative",
            minHeight: mob ? 240 : tab ? 300 : 520,
            overflow: "hidden",
          }}
        >
          <Img
            src={IMG.exam}
            alt="Consulta"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(13,27,42,.7)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              padding: mob ? "28px 18px" : tab ? "36px" : "52px 48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                fontSize: mob ? 48 : 64,
                fontFamily: "Georgia,serif",
                color: PRIMARY,
                lineHeight: 1,
                marginBottom: 10,
                opacity: 0.8,
              }}
            >
              "
            </div>
            <p
              style={{
                fontSize: mob ? 13.5 : 15,
                color: "rgba(255,255,255,.88)",
                lineHeight: 1.8,
                marginBottom: 18,
                fontStyle: "italic",
              }}
            >
              Él optometrista fue fantástico, haciéndonos sentir cómodos durante
              todo el examen. Muy profesionales.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: GRADIENT,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 15, color: "#fff", fontWeight: 700 }}>
                  M
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: PRIMARY,
                    fontFamily: "var(--hf)",
                  }}
                >
                  Marta Vásquez
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,.5)",
                    marginTop: 2,
                  }}
                >
                  Paciente
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Booking form */}
        <Reveal
          delay={150}
          style={{
            flex: mob || tab ? "none" : "1 1 50%",
            background: "#fff",
            padding: mob ? "36px 18px" : tab ? "44px 32px" : "52px 48px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--hf)",
              fontSize: mob ? 22 : 27,
              color: "var(--head)",
              marginBottom: 8,
            }}
          >
            Reserva una Cita
          </h3>
          <div style={{ marginTop: 8 }}>
            <BookingModal inline onClose={() => {}} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
