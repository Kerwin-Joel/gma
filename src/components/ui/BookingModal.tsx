import { useState, useEffect, useRef } from "react";
import type { ReactNode, FC } from "react";
import {
  X,
  ArrowLeft,
  ArrowRight,
  Check,
  Sun,
  Clock,
  Moon,
  Users,
  MapPin,
} from "lucide-react";
import { SVCS } from "../../data/services";

// Brand SVGs not available in lucide-react
function GIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2.002C6.579 2.002 2.13 6.45 2.13 11.902c0 5.452 4.449 9.9 9.91 9.9s9.91-4.448 9.91-9.9c0-.545-.05-1.079-.14-1.598H12.04v3.03h5.41c-.23 1.237-.94 2.285-2.004 2.984v2.48h3.244C20.46 17.13 21.87 14.7 21.87 11.9c0-.55-.05-1.084-.14-1.6H12.04V13h5.41c-.24 1.25-.95 2.3-2.01 3v2.48h3.24C20.46 17.13 21.87 14.7 21.87 11.9c0-5.452-4.45-9.898-9.83-9.898zm-.04 3.73a6.17 6.17 0 0 1 3.96 1.44l-1.61 1.61a3.84 3.84 0 0 0-2.35-.8 3.852 3.852 0 0 0-3.6 2.49H5.84V8.13A9.878 9.878 0 0 1 12 5.732zm-6.18 5.53c-.14.45-.22.93-.22 1.43 0 .5.08.98.22 1.43v2.34H3.04c-.56-1.1-.87-2.34-.87-3.77 0-1.43.31-2.67.87-3.77l2.78 2.34zm.39 5.43A6.17 6.17 0 0 0 12 19.17a6.17 6.17 0 0 0 4.27-1.56l-2.08-1.62a3.87 3.87 0 0 1-2.19.66 3.85 3.85 0 0 1-3.6-2.49H6.21z"/>
    </svg>
  );
}
function IgIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
function FbIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function WAIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.38 1.26 4.8L2 22l5.46-1.37c1.38.73 2.95 1.13 4.58 1.13 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.27 13.92c-.22.62-1.3 1.2-1.79 1.27-.49.07-1.13.1-1.82-.14-.42-.15-.96-.34-1.65-.64-2.89-1.25-4.79-4.15-4.93-4.34-.14-.19-1.12-1.49-1.12-2.84 0-.75.28-1.41.75-1.91.19-.2.41-.3.6-.3.15 0 .29.01.42.01.13 0 .32-.05.5.39.18.44.62 1.52.67 1.63.06.11.09.24.02.39-.07.15-.11.24-.22.37-.11.12-.22.27-.31.37-.11.11-.22.22-.09.43.12.21.55.9 1.18 1.46.81.72 1.5.94 1.71 1.05.21.1.33.08.45-.05.12-.14.52-.6.66-.81.14-.2.27-.17.46-.1.18.07 1.17.55 1.37.65.2.1.33.15.38.23.05.09.05.51-.14 1z"/>
    </svg>
  );
}

interface Props {
  onClose: () => void;
  inline?: boolean;
}

// ── Slot generation: 8:30 AM → 9:00 PM, every 25 min ────────────────────────

interface SlotEntry {
  label: string;
  totalMin: number;
}

function buildAllSlots(): SlotEntry[] {
  const result: SlotEntry[] = [];
  let total = 8 * 60 + 30;
  while (total <= 21 * 60) {
    const h = Math.floor(total / 60);
    const m = total % 60;
    const per = h < 12 ? "AM" : "PM";
    const dh = h === 0 ? 12 : h > 12 ? h - 12 : h;
    result.push({
      label: `${dh}:${String(m).padStart(2, "0")} ${per}`,
      totalMin: total,
    });
    total += 25;
  }
  return result;
}

const ALL_SLOTS = buildAllSlots(); // 31 slots

const GRP = {
  morning: ALL_SLOTS.filter((s) => Math.floor(s.totalMin / 60) < 12),
  afternoon: ALL_SLOTS.filter((s) => {
    const h = Math.floor(s.totalMin / 60);
    return h >= 12 && h < 18;
  }),
  evening: ALL_SLOTS.filter((s) => Math.floor(s.totalMin / 60) >= 18),
};

// ── Availability ──────────────────────────────────────────────────────────────

type Avail = "many" | "few" | "full";

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

const JUNE_AVAIL: Record<number, Avail> = {
  24: "many",
  25: "few",
  26: "full",
  27: "many",
  29: "many",
  30: "few",
};

function getDayAvail(year: number, month: number, day: number): Avail | null {
  if (month === 5 && year === 2026) return JUNE_AVAIL[day] ?? null;
  if (month === 6 && year === 2026) {
    const dow = new Date(year, month, day).getDay();
    if (dow === 0) return null;
    if ([4, 10, 17, 23].includes(day)) return "full";
    if (dow === 6) return "few";
    return "many";
  }
  return null;
}

function isSlotTaken(slotIdx: number, dayNum: number, avail: Avail): boolean {
  if (avail === "full") return true;
  const v = ((dayNum * 37 + slotIdx * 11) & 0x7fff) % 100;
  return avail === "many" ? v < 28 : v < 68;
}

// ── Referral options with icons ───────────────────────────────────────────────

type IconComp = FC<{ size?: number }>;

const REFS: Array<{ label: string; Icon: IconComp }> = [
  { label: "Google",        Icon: GIcon },
  { label: "Instagram",     Icon: IgIcon },
  { label: "Facebook",      Icon: FbIcon },
  { label: "WhatsApp",      Icon: WAIcon },
  { label: "Recomendación", Icon: Users },
  { label: "Pasé por aquí", Icon: MapPin },
];

// ── Constants ─────────────────────────────────────────────────────────────────

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const MONTHS_S = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];
const WDAYS = ["D", "L", "M", "X", "J", "V", "S"];

const STEP_LABELS = ["Servicio", "Fecha", "Datos", "Confirmar"] as const;
const AGES = ["Menor de 18", "18 – 30", "31 – 50", "51+"];

// ── Calendar builder ──────────────────────────────────────────────────────────

interface CalCell {
  day: number;
  avail: Avail | null;
  today: boolean;
  past: boolean;
}

function buildCalendar(year: number, month: number): Array<CalCell | null> {
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<CalCell | null> = Array(firstDow).fill(null);

  for (let d = 1; d <= daysInMonth; d++) {
    const dt = new Date(year, month, d);
    dt.setHours(0, 0, 0, 0);
    const dow = dt.getDay();
    const past = dt <= TODAY;
    const tod = dt.getTime() === TODAY.getTime();
    const av = past || dow === 0 ? null : getDayAvail(year, month, d);
    cells.push({ day: d, avail: av, today: tod, past: past && !tod });
  }
  return cells;
}

// ── Scroll-shadow slot wrapper ────────────────────────────────────────────────
// key={selDay} on this component forces remount when day changes → scroll resets

function SlotScroller({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [topSh, setTop] = useState(false);
  const [botSh, setBot] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setTop(el.scrollTop > 4);
      setBot(el.scrollTop < el.scrollHeight - el.clientHeight - 4);
    };
    update(); // evaluate immediately after mount
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, []);

  const shadow = (dir: "top" | "bot") => ({
    position: "absolute" as const,
    [dir === "top" ? "top" : "bottom"]: 0,
    left: 0,
    right: 0,
    height: 44,
    zIndex: 2,
    background:
      dir === "top"
        ? "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,.92) 45%, transparent 100%)"
        : "linear-gradient(to top,   #fff 0%, rgba(255,255,255,.92) 45%, transparent 100%)",
    pointerEvents: "none" as const,
    opacity: (dir === "top" ? topSh : botSh) ? 1 : 0,
    transition: "opacity .22s cubic-bezier(0.16,1,0.3,1)",
  });

  return (
    <div style={{ position: "relative" }}>
      <div aria-hidden="true" style={shadow("top")} />
      <div ref={ref} className="bk-slots-scroll">
        {children}
      </div>
      <div aria-hidden="true" style={shadow("bot")} />
    </div>
  );
}

// ── Validation helpers ────────────────────────────────────────────────────────

function errNombreMsg(v: string) {
  if (!v.trim()) return "El nombre es requerido";
  if (v.trim().length < 2) return "Mínimo 2 caracteres";
  return "";
}

function errWAMsg(v: string) {
  const digits = v.replace(/\D/g, "");
  if (!v.trim()) return "El WhatsApp es requerido";
  if (digits.length < 7) return "Número muy corto (mínimo 7 dígitos)";
  if (digits.length > 15) return "Número muy largo (máximo 15 dígitos)";
  return "";
}

function errEmailMsg(v: string) {
  if (!v) return "";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    ? ""
    : "Formato de email inválido";
}

// ── Component ─────────────────────────────────────────────────────────────────

export function BookingModal({ onClose, inline = false }: Props) {
  // Navigation
  const [step, setStep] = useState(0);
  const dirRef = useRef<1 | -1>(1);

  // Calendar
  const [calMonth, setCalMonth] = useState(TODAY.getMonth());
  const [calYear, setCalYear] = useState(TODAY.getFullYear());
  const [selDay, setSelDay] = useState<number | null>(null);
  const [slot, setSlot] = useState("");

  // Booking
  const [servicio, setServicio] = useState("");

  // Lead funnel
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [edad, setEdad] = useState("31 – 50");
  const [primeraVisita, setPrimeraVisita] = useState("Sí, primera vez");
  const [referral, setReferral] = useState("");
  const [motivo, setMotivo] = useState("");

  // Validation "touched" state — error shown only after blur or submit attempt
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const touch = (f: string) => setTouched((t) => ({ ...t, [f]: true }));

  // Confirm toggles
  const [remWA, setRemWA] = useState(true);
  const [remCal, setRemCal] = useState(false);

  // Submit
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // Eye animation on success
  useEffect(() => {
    if (!done) return;
    const ids = ["bk-eo", "bk-ei", "bk-ep", "bk-es", "bk-esc", "bk-ec", "bk-el"];
    const t = setTimeout(() => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          el.classList.remove("go");
          void el.offsetWidth;
          el.classList.add("go");
        }
      });
    }, 80);
    return () => clearTimeout(t);
  }, [done]);

  // Derived
  const calCells = buildCalendar(calYear, calMonth);
  const dayAvail =
    selDay !== null ? getDayAvail(calYear, calMonth, selDay) : null;
  const fecha =
    selDay !== null ? `${selDay} ${MONTHS_S[calMonth]} ${calYear}` : "";
  const apptCode = `GMA-${String(calMonth + 1).padStart(2, "0")}${String(selDay ?? 0).padStart(2, "0")}`;
  const atMinMonth =
    calYear === TODAY.getFullYear() && calMonth === TODAY.getMonth();
  const atMaxMonth =
    calYear === TODAY.getFullYear() && calMonth === TODAY.getMonth() + 1;

  // Computed errors
  const eNombre = errNombreMsg(nombre);
  const eWhatsapp = errWAMsg(whatsapp);
  const eEmail = errEmailMsg(email);

  // Step validations
  const s0ok = !!servicio;
  const s1ok = selDay !== null && !!slot;
  const s2ok = !eNombre && !eWhatsapp && !eEmail;

  function slotTaken(idx: number) {
    return dayAvail ? isSlotTaken(idx, selDay ?? 0, dayAvail) : false;
  }

  function goTo(target: number) {
    if (target === 4) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setDone(true);
      }, 1200);
      return;
    }
    dirRef.current = target > step ? 1 : -1;
    setStep(target);
  }

  function tryStep3() {
    if (!s2ok) {
      setTouched({ nombre: true, whatsapp: true, email: true });
      return;
    }
    goTo(3);
  }

  function changeMonth(dir: number) {
    let m = calMonth + dir;
    let y = calYear;
    if (m > 11) {
      m = 0;
      y++;
    }
    if (m < 0) {
      m = 11;
      y--;
    }
    setCalMonth(m);
    setCalYear(y);
    setSelDay(null);
    setSlot("");
  }

  // ── SUCCESS ──────────────────────────────────────────────────────────────────

  if (done) {
    const successContent = (
      <div style={{ padding: "26px 24px", textAlign: "center" }}>
          <span className="bk-brand">GMA Ópticas</span>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "6px 0 10px",
            }}
          >
            <svg
              width="110"
              height="62"
              viewBox="-55 -31 110 62"
              role="img"
              aria-label="Logo ojo GMA"
            >
              <defs>
                <clipPath id="bk-eye-clip">
                  <path d="M-50,0 Q-25,-28 0,-28 Q25,-28 50,0 Q25,28 0,28 Q-25,28 -50,0 Z"/>
                </clipPath>
              </defs>
              <path
                id="bk-eo"
                className="bk-eye-out"
                d="M-50,0 Q-25,-28 0,-28 Q25,-28 50,0 Q25,28 0,28 Q-25,28 -50,0 Z"
              />
              <circle id="bk-ei" className="bk-eye-iris" cx="0" cy="0" r="17" />
              <circle id="bk-ep" className="bk-eye-pupil" cx="0" cy="0" r="8" />
              <circle id="bk-es" className="bk-eye-shine" cx="7" cy="-6" r="2.5" />
              <line   id="bk-esc" className="bk-eye-scan" x1="-38" y1="-7" x2="38" y2="-7" />
              {/* Blink curtain — clipped to eye shape, slides from top */}
              <rect
                id="bk-ec"
                className="bk-eye-curtain"
                x="-50" y="-28" width="100" height="56"
                clipPath="url(#bk-eye-clip)"
              />
              <path
                id="bk-el"
                className="bk-eye-lid"
                d="M-50,0 Q-25,-28 0,-28 Q25,-28 50,0"
              />
            </svg>
          </div>

          <h3
            style={{
              fontFamily: "var(--hf)",
              fontSize: 21,
              color: "var(--head)",
              marginBottom: 8,
            }}
          >
            ¡Cita reservada!
          </h3>
          <p
            style={{
              fontSize: 13,
              color: "var(--body)",
              lineHeight: 1.75,
              maxWidth: 320,
              margin: "0 auto 18px",
            }}
          >
            Recibirás un recordatorio 24 h antes por WhatsApp. Te confirmamos en
            menos de 2 horas.
          </p>

          <div className="bk-sum" style={{ textAlign: "left" }}>
            {[
              { l: "Servicio", v: servicio },
              { l: "Fecha", v: fecha },
              { l: "Hora", v: slot },
              {
                l: "Paciente",
                v: [nombre, apellido].filter(Boolean).join(" ") || "—",
              },
              { l: "Código", v: apptCode, accent: true },
            ].map(({ l, v, accent }) => (
              <div key={l} className="bk-sum-row">
                <span style={{ color: "var(--body)" }}>{l}</span>
                <span
                  style={{
                    fontWeight: 600,
                    color: accent ? "var(--p)" : "var(--head)",
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              style={{
                flex: 1,
                padding: "11px",
                borderRadius: 10,
                border: "0.5px solid var(--br)",
                background: "none",
                fontSize: 12,
                cursor: "pointer",
                color: "var(--body)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                transition: "background .2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--bg)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Agregar al calendario
            </button>
            <button
              className="btn"
              style={{ flex: 1, justifyContent: "center", padding: "11px 16px" }}
              onClick={inline ? () => { setDone(false); setStep(0); setSelDay(null); setSlot(""); setServicio(""); } : onClose}
            >
              {inline ? "Nueva reserva" : "Listo"} <Check size={14} />
            </button>
          </div>
        </div>
    );
    return inline
      ? <div className="bk-inline">{successContent}</div>
      : <div className="modal-backdrop" onClick={onClose}><div className="modal" onClick={(e) => e.stopPropagation()}>{successContent}</div></div>;
  }

  // ── WIZARD ───────────────────────────────────────────────────────────────────

  const stepClass = dirRef.current === 1 ? "bk-step-fwd" : "bk-step-bwd";

  const wizardContent = (
    <>
      {/* Header */}
      <div className="modal-head" style={{ paddingBottom: 16 }}>
          <div>
            <span className="bk-brand">GMA Ópticas</span>
            <h3
              style={{
                fontFamily: "var(--hf)",
                fontSize: 19,
                color: "var(--head)",
                marginBottom: 3,
              }}
            >
              Reservar cita
            </h3>
            <p style={{ fontSize: 11.5, color: "var(--body)" }}>
              Paso {step + 1} de 4 &middot; {STEP_LABELS[step]}
            </p>
          </div>
          {!inline && (
            <button className="modal-close" onClick={onClose} aria-label="Cerrar">
              <X size={15} />
            </button>
          )}
        </div>

        <div className="modal-body" style={{ paddingTop: 0 }}>
          {/* Step indicator */}
          <div className="bk-step-row">
            {(STEP_LABELS as readonly string[]).reduce<ReactNode[]>(
              (acc, label, i) => {
                acc.push(
                  <div key={`n${i}`} className="bk-step-node">
                    <div
                      className={`bk-step-circ ${i < step ? "done" : i === step ? "cur" : "pend"}`}
                    >
                      {i < step ? <Check size={10} /> : i + 1}
                    </div>
                    <div
                      className={`bk-step-label${i === step ? " active" : ""}`}
                    >
                      {label}
                    </div>
                  </div>,
                );
                if (i < STEP_LABELS.length - 1) {
                  acc.push(
                    <div
                      key={`l${i}`}
                      className={`bk-step-line${i < step ? " done" : ""}`}
                    />,
                  );
                }
                return acc;
              },
              [],
            )}
          </div>

          {/* Step content */}
          <div key={step} className={stepClass}>
            {/* ──────────────────────────────────────────── */}
            {/* STEP 0 — Service selection                  */}
            {/* ──────────────────────────────────────────── */}
            {step === 0 && (
              <>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--body)",
                    marginBottom: 12,
                  }}
                >
                  ¿Qué tipo de atención necesitas?
                </p>
                <div className="bk-svc-grid">
                  {SVCS.map((s) => (
                    <button
                      key={s.id}
                      className={`bk-svc-card${servicio === s.n ? " on" : ""}`}
                      onClick={() => setServicio(s.n)}
                    >
                      <s.Icon
                        size={18}
                        strokeWidth={1.7}
                        color={servicio === s.n ? "var(--p)" : "var(--body)"}
                        style={{
                          display: "block",
                          marginBottom: 7,
                          transition: "color .22s",
                        }}
                      />
                      <div
                        style={{
                          fontSize: 11.5,
                          fontWeight: 500,
                          lineHeight: 1.3,
                          marginBottom: 3,
                          color: servicio === s.n ? "var(--p)" : "var(--head)",
                          transition: "color .22s",
                        }}
                      >
                        {s.n}
                      </div>
                      <div
                        style={
                          {
                            fontSize: 10,
                            color: "var(--body)",
                            lineHeight: 1.4,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          } as React.CSSProperties
                        }
                      >
                        {s.d}
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  className="btn"
                  style={{ width: "100%", justifyContent: "center" }}
                  disabled={!s0ok}
                  onClick={() => goTo(1)}
                >
                  Continuar <ArrowRight size={14} />
                </button>
              </>
            )}

            {/* ──────────────────────────────────────────── */}
            {/* STEP 1 — Calendar + slots                   */}
            {/* ──────────────────────────────────────────── */}
            {step === 1 && (
              <>
                {/* Month navigation */}
                <div className="bk-cal-hd">
                  <button
                    className="bk-cal-nav"
                    onClick={() => changeMonth(-1)}
                    disabled={atMinMonth}
                    aria-label="Mes anterior"
                  >
                    ‹
                  </button>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--head)",
                    }}
                  >
                    {MONTHS[calMonth]} {calYear}
                  </div>
                  <button
                    className="bk-cal-nav"
                    onClick={() => changeMonth(1)}
                    disabled={atMaxMonth}
                    aria-label="Mes siguiente"
                  >
                    ›
                  </button>
                </div>

                {/* Calendar grid */}
                <div className="bk-cal-grid">
                  {WDAYS.map((d) => (
                    <div key={d} className="bk-cal-wd">
                      {d}
                    </div>
                  ))}
                  {calCells.map((cell, idx) => {
                    if (!cell) return <div key={`e${idx}`} />;
                    const isSelected = selDay === cell.day;
                    const selectable =
                      cell.avail !== null && cell.avail !== "full";
                    return (
                      <div
                        key={cell.day}
                        className={[
                          "bk-cal-day",
                          cell.past ? "past" : "",
                          cell.today ? "today" : "",
                          selectable ? "avail" : "",
                          isSelected ? "on" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => {
                          if (selectable) {
                            setSelDay(cell.day);
                            setSlot("");
                          }
                        }}
                      >
                        {cell.day}
                        {cell.avail !== null && !cell.past && !cell.today && (
                          <div className={`bk-cal-dot ${cell.avail}`} />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="bk-legend">
                  <span>
                    <span
                      className="bk-legend-dot"
                      style={{ background: "#22c55e" }}
                    />
                    Disponible
                  </span>
                  <span>
                    <span
                      className="bk-legend-dot"
                      style={{ background: "#f59e0b" }}
                    />
                    Pocos turnos
                  </span>
                  <span>
                    <span
                      className="bk-legend-dot"
                      style={{ background: "var(--br)" }}
                    />
                    Lleno
                  </span>
                </div>

                {/* Slots with scroll shadows */}
                {selDay !== null && dayAvail && dayAvail !== "full" && (
                  <>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: "var(--body)",
                        marginBottom: 8,
                      }}
                    >
                      Horarios disponibles &mdash; {selDay} {MONTHS_S[calMonth]}
                    </div>

                    {/* key={selDay} → unmount/remount on day change → scroll resets, shadows re-evaluated */}
                    <SlotScroller key={selDay}>
                      <div className="bk-slots-section">
                        <div className="bk-slots-section-lbl">
                          <Sun size={10} />
                          Mañana
                        </div>
                        <div className="bk-slots-grid-3">
                          {GRP.morning.map(({ label }, i) => {
                            const taken = slotTaken(i);
                            return (
                              <button
                                key={label}
                                disabled={taken}
                                className={`bk-slot${taken ? " taken" : ""}${slot === label ? " on" : ""}`}
                                onClick={() => !taken && setSlot(label)}
                              >
                                <span className="bk-slot-t">{label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="bk-slots-section">
                        <div className="bk-slots-section-lbl">
                          <Clock size={10} />
                          Tarde
                        </div>
                        <div className="bk-slots-grid-3">
                          {GRP.afternoon.map(({ label }, i) => {
                            const taken = slotTaken(GRP.morning.length + i);
                            return (
                              <button
                                key={label}
                                disabled={taken}
                                className={`bk-slot${taken ? " taken" : ""}${slot === label ? " on" : ""}`}
                                onClick={() => !taken && setSlot(label)}
                              >
                                <span className="bk-slot-t">{label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="bk-slots-section">
                        <div className="bk-slots-section-lbl">
                          <Moon size={10} />
                          Noche
                        </div>
                        <div className="bk-slots-grid-3">
                          {GRP.evening.map(({ label }, i) => {
                            const taken = slotTaken(
                              GRP.morning.length + GRP.afternoon.length + i,
                            );
                            return (
                              <button
                                key={label}
                                disabled={taken}
                                className={`bk-slot${taken ? " taken" : ""}${slot === label ? " on" : ""}`}
                                onClick={() => !taken && setSlot(label)}
                              >
                                <span className="bk-slot-t">{label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </SlotScroller>
                  </>
                )}

                {selDay !== null && dayAvail === "full" && (
                  <p className="bk-no-slots">
                    Este día está completo. Por favor elige otro.
                  </p>
                )}

                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button
                    className="bk-back"
                    onClick={() => goTo(0)}
                    aria-label="Atrás"
                  >
                    <ArrowLeft size={15} />
                  </button>
                  <button
                    className="btn"
                    style={{ flex: 1, justifyContent: "center" }}
                    disabled={!s1ok}
                    onClick={() => goTo(2)}
                  >
                    Continuar <ArrowRight size={14} />
                  </button>
                </div>
              </>
            )}

            {/* ──────────────────────────────────────────── */}
            {/* STEP 2 — Lead funnel data + validations     */}
            {/* ──────────────────────────────────────────── */}
            {step === 2 && (
              <>
                {/* ── Contact info ── */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <label>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: "var(--body)",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      Nombre *
                    </span>
                    <input
                      className={`inp${touched.nombre && eNombre ? " bk-inp-err" : ""}`}
                      placeholder="Ana"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      onBlur={() => touch("nombre")}
                      style={{ fontSize: 13 }}
                    />
                    {touched.nombre && eNombre && (
                      <span className="bk-field-err">{eNombre}</span>
                    )}
                  </label>
                  <label>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: "var(--body)",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      Apellido
                    </span>
                    <input
                      className="inp"
                      placeholder="García"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      style={{ fontSize: 13 }}
                    />
                  </label>
                </div>

                <div style={{ marginBottom: 8 }}>
                  <label
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: "var(--body)",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    WhatsApp *
                  </label>
                  <input
                    className={`inp${touched.whatsapp && eWhatsapp ? " bk-inp-err" : ""}`}
                    placeholder="+51 952 950 811"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    onBlur={() => touch("whatsapp")}
                    style={{ fontSize: 13 }}
                  />
                  {touched.whatsapp && eWhatsapp && (
                    <span className="bk-field-err">{eWhatsapp}</span>
                  )}
                </div>

                <div style={{ marginBottom: 4 }}>
                  <label
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: "var(--body)",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Email
                  </label>
                  <input
                    className={`inp${touched.email && eEmail ? " bk-inp-err" : ""}`}
                    type="email"
                    placeholder="ana@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => touch("email")}
                    style={{ fontSize: 13 }}
                  />
                  {touched.email && eEmail && (
                    <span className="bk-field-err">{eEmail}</span>
                  )}
                </div>

                {/* ── Separator ── */}
                <hr className="bk-section-div" />

                {/* ── Demographic & funnel ── */}
                <div style={{ marginBottom: 22 }}>
                  <label
                    style={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: "var(--head)",
                      display: "block",
                      marginBottom: 10,
                    }}
                  >
                    Rango de edad
                  </label>
                  <div className="bk-chips">
                    {AGES.map((a) => (
                      <button
                        key={a}
                        className={`bk-chip${edad === a ? " on" : ""}`}
                        onClick={() => setEdad(a)}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 22 }}>
                  <label
                    style={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: "var(--head)",
                      display: "block",
                      marginBottom: 10,
                    }}
                  >
                    ¿Primera visita con nosotros?
                  </label>
                  <div className="bk-chips">
                    {["Sí, primera vez", "Ya fui antes"].map((v) => (
                      <button
                        key={v}
                        className={`bk-chip${primeraVisita === v ? " on" : ""}`}
                        onClick={() => setPrimeraVisita(v)}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 22 }}>
                  <label
                    style={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: "var(--head)",
                      display: "block",
                      marginBottom: 10,
                    }}
                  >
                    ¿Cómo nos encontraste?
                  </label>
                  <div className="bk-chips">
                    {REFS.map(({ label, Icon: RefIcon }) => (
                      <button
                        key={label}
                        className={`bk-chip${referral === label ? " on" : ""}`}
                        onClick={() => setReferral(label)}
                      >
                        <RefIcon size={11} />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label
                    style={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: "var(--head)",
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    Motivo de consulta{" "}
                    <span style={{ color: "var(--body)", fontWeight: 400, fontSize: 11 }}>
                      (opcional)
                    </span>
                  </label>
                  <textarea
                    className="inp"
                    placeholder="Ej: me cuesta ver de lejos hace 3 meses..."
                    style={{ height: 52, resize: "none", fontSize: 12 }}
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                  />
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="bk-back"
                    onClick={() => goTo(1)}
                    aria-label="Atrás"
                  >
                    <ArrowLeft size={15} />
                  </button>
                  <button
                    className="btn"
                    style={{ flex: 1, justifyContent: "center" }}
                    onClick={tryStep3}
                  >
                    Revisar cita <ArrowRight size={14} />
                  </button>
                </div>
              </>
            )}

            {/* ──────────────────────────────────────────── */}
            {/* STEP 3 — Review & confirm                   */}
            {/* ──────────────────────────────────────────── */}
            {step === 3 && (
              <>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--body)",
                    marginBottom: 12,
                  }}
                >
                  Revisa los datos antes de confirmar:
                </p>

                <div className="bk-sum">
                  {[
                    { l: "Servicio", v: servicio },
                    { l: "Fecha", v: fecha },
                    { l: "Hora", v: slot },
                    {
                      l: "Paciente",
                      v: [nombre, apellido].filter(Boolean).join(" "),
                    },
                    { l: "WhatsApp", v: whatsapp },
                    ...(email ? [{ l: "Email", v: email }] : []),
                  ].map(({ l, v }) => (
                    <div key={l} className="bk-sum-row">
                      <span style={{ color: "var(--body)" }}>{l}</span>
                      <span style={{ fontWeight: 600, color: "var(--head)" }}>
                        {v}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bk-toggle-row">
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--head)",
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
                        fill="#25D366"
                      />
                      <path
                        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"
                        fill="#25D366"
                      />
                    </svg>
                    Recordatorio por WhatsApp
                  </span>
                  <button
                    className={`bk-toggle ${remWA ? "on" : "off"}`}
                    onClick={() => setRemWA((v) => !v)}
                    aria-pressed={remWA}
                    aria-label="Toggle recordatorio WhatsApp"
                  >
                    <div className="bk-toggle-dot" />
                  </button>
                </div>

                <div className="bk-toggle-row">
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--head)",
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--p)"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Agregar a Google Calendar
                  </span>
                  <button
                    className={`bk-toggle ${remCal ? "on" : "off"}`}
                    onClick={() => setRemCal((v) => !v)}
                    aria-pressed={remCal}
                    aria-label="Toggle Google Calendar"
                  >
                    <div className="bk-toggle-dot" />
                  </button>
                </div>

                {/* Tip */}
                <div style={{
                  display: "flex", gap: 9, alignItems: "flex-start",
                  background: "rgba(var(--p-rgb),.05)",
                  border: "0.5px solid rgba(var(--p-rgb),.18)",
                  borderRadius: 10, padding: "10px 12px", marginTop: 14,
                }}>
                  <Clock size={14} color="var(--p)" style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: 11.5, color: "var(--body)", lineHeight: 1.65, margin: 0 }}>
                    <strong style={{ color: "var(--head)", fontWeight: 600 }}>
                      Te recomendamos llegar con anticipación.
                    </strong>{" "}
                    Contamos con solo 5 minutos de tolerancia para no afectar las citas siguientes.
                  </p>
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button
                    className="bk-back"
                    onClick={() => goTo(2)}
                    aria-label="Atrás"
                  >
                    <ArrowLeft size={15} />
                  </button>
                  <button
                    className="btn"
                    style={{ flex: 1, justifyContent: "center" }}
                    disabled={submitting}
                    onClick={() => goTo(4)}
                  >
                    {submitting ? (
                      "Reservando..."
                    ) : (
                      <>
                        <Check size={14} /> Confirmar cita
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
    </>
  );

  return inline
    ? <div className="bk-inline">{wizardContent}</div>
    : (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          {wizardContent}
        </div>
      </div>
    );
}
