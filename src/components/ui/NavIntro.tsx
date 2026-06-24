import { useEffect, useRef, useState } from "react";

const KEY = "gma_intro_seenxd1sdadas";

const TOP  = "M2 12 C5.5 6.5 9.5 5 12 5 C14.5 5 18.5 6.5 22 12";
const BOT  = "M22 12 C18.5 17.5 14.5 19 12 19 C9.5 19 5.5 17.5 2 12";
const IRIS = "M12 8.5 A3.5 3.5 0 0 1 15.5 12 A3.5 3.5 0 0 1 12 15.5 A3.5 3.5 0 0 1 8.5 12 A3.5 3.5 0 0 1 12 8.501";

const ES = "cubic-bezier(0.34,1.56,0.64,1)";
const EO = "cubic-bezier(0.16,1,0.3,1)";
const EI = "cubic-bezier(0.25,0.46,0.45,0.94)";

interface Props { onComplete: () => void; }

export function NavIntro({ onComplete }: Props) {
  const [active] = useState(() => {
    try {
      if (typeof window === "undefined") return false;
      if (window.innerWidth >= 768) return false;
      return true;
    } catch { return false; }
  });

  const [mounted, setMounted] = useState(true);

  const overlayRef  = useRef<HTMLDivElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);
  const topRef      = useRef<SVGPathElement>(null);
  const botRef      = useRef<SVGPathElement>(null);
  const irisRef     = useRef<SVGCircleElement>(null);
  const pupilRef    = useRef<SVGCircleElement>(null);
  const shineRef    = useRef<SVGCircleElement>(null);
  const gradRef     = useRef<SVGRectElement>(null);
  const nibTopRef   = useRef<SVGCircleElement>(null);
  const nibBotRef   = useRef<SVGCircleElement>(null);
  const nibIrisRef  = useRef<SVGCircleElement>(null);
  const topAnimRef  = useRef<SVGElement>(null);
  const botAnimRef  = useRef<SVGElement>(null);
  const irisAnimRef = useRef<SVGElement>(null);

  const tids = useRef<ReturnType<typeof setTimeout>[]>([]);
  const after = (ms: number, fn: () => void) => { tids.current.push(setTimeout(fn, ms)); };
  const rAF   = (fn: () => void) => requestAnimationFrame(() => requestAnimationFrame(fn));
  const st    = (el: Element | null, s: Partial<CSSStyleDeclaration>) => {
    if (el) Object.assign((el as HTMLElement).style, s);
  };

  const done = (fast = false) => {
    tids.current.forEach(clearTimeout);
    tids.current = [];
    try { sessionStorage.setItem(KEY, "1"); } catch {}

    // 1. Logo del nav aparece con spring
    const anchor = document.getElementById("nav-logo-anchor");
    const logoDur = fast ? 100 : 220;
    st(anchor, {
      transition: `opacity ${logoDur}ms ${ES}, transform ${logoDur}ms ${ES}`,
      opacity: "1",
      transform: "scale(1)",
    });

    // 2. Overlay se disuelve — onComplete dispara DESPUÉS (hero entra cuando overlay ya desapareció)
    const overlay = overlayRef.current;
    if (overlay) {
      const fadeDur = fast ? 120 : 360;
      const startDelay = fast ? 0 : 60;
      setTimeout(() => {
        overlay.style.transition = `opacity ${fadeDur}ms ${EO}`;
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
      }, startDelay);

      // onComplete dispara cuando el overlay ya terminó de desvanecerse
      setTimeout(() => {
        onComplete();
      }, startDelay + fadeDur);

      // Unmount con un pequeño buffer
      setTimeout(() => {
        document.body.style.overflow = "";
        setMounted(false);
      }, startDelay + fadeDur + 60);
    } else {
      document.body.style.overflow = "";
      setMounted(false);
      onComplete();
    }
  };

  useEffect(() => {
    if (!active) return;

    // Bloquear scroll durante la animación
    document.body.style.overflow = "hidden";

    // Ocultar logo del nav hasta que el ojo lo alcance
    const anchor = document.getElementById("nav-logo-anchor");
    st(anchor, { opacity: "0", transform: "scale(.4)", transition: "none" });

    const skip = () => done(true);
    window.addEventListener("scroll",     skip, { once: true, passive: true });
    window.addEventListener("touchstart", skip, { once: true, passive: true });

    const wrap  = wrapRef.current;
    const topA  = topRef.current;
    const botA  = botRef.current;
    const iris  = irisRef.current;
    const pupil = pupilRef.current;
    const shine = shineRef.current;
    const gradR = gradRef.current;

    const startNib = (nib: SVGCircleElement | null, anim: SVGElement | null, dur: number) => {
      if (!nib || !anim) return;
      nib.style.opacity = "1";
      (anim as SVGAnimationElement).beginElement();
      setTimeout(() => st(nib, { transition: `opacity 100ms ${EI}`, opacity: "0" }), dur - 110);
    };

    // ① Aparición del ojo desde el fondo
    after(60, () => {
      if (!wrap) return;
      wrap.style.transition = `opacity 220ms ${ES}, transform 220ms ${ES}`;
      wrap.style.opacity = "1";
      wrap.style.transform = "scale(1)";
    });

    // ② Párpado superior — lápiz de izquierda a derecha
    after(160, () => {
      if (!topA) return;
      topA.style.opacity = "1";
      topA.style.transition = `stroke-dashoffset 300ms ${EO}`;
      rAF(() => { topA.style.strokeDashoffset = "0"; });
      startNib(nibTopRef.current, topAnimRef.current, 300);
    });

    // ③ Párpado inferior — cierra el ojo
    after(430, () => {
      if (!botA) return;
      botA.style.opacity = "1";
      botA.style.transition = `stroke-dashoffset 260ms ${EO}`;
      rAF(() => { botA.style.strokeDashoffset = "0"; });
      startNib(nibBotRef.current, botAnimRef.current, 260);
    });

    // ④ Iris — compás
    after(670, () => {
      if (!iris) return;
      iris.style.opacity = "1";
      iris.style.transition = `stroke-dashoffset 170ms ${EO}`;
      rAF(() => { iris.style.strokeDashoffset = "0"; });
      startNib(nibIrisRef.current, irisAnimRef.current, 170);
    });

    // ⑤ Pupila + brillo especular con spring
    after(810, () => {
      st(pupil, { transition: `opacity 180ms ${ES}`, opacity: "1" });
      after(55, () => st(shine, { transition: `opacity 150ms ${ES}`, opacity: "1" }));
    });

    // ⑥ Morph: el ojo vuela hacia la posición del logo
    after(930, () => {
      const logoAnchor = document.getElementById("nav-logo-anchor");
      if (!wrap || !logoAnchor) return;
      const lR = logoAnchor.getBoundingClientRect();
      const wR = wrap.getBoundingClientRect();
      const dx = (lR.left + lR.width / 2)  - (wR.left + wR.width / 2);
      const dy = (lR.top  + lR.height / 2) - (wR.top  + wR.height / 2);
      const sc = lR.width / wR.width;
      st(wrap, {
        transition: `transform 260ms ${EI}, opacity 220ms ${EI} 80ms`,
        transform:  `translate(${dx}px,${dy}px) scale(${sc * 1.08})`,
        opacity:    "0",
      });
      [topA, botA, iris].forEach(el => st(el, { transition: `opacity 200ms ${EI}`, opacity: "0" }));
      st(gradR, { transition: `opacity 220ms ${EI} 30ms`, opacity: "0.9" });
    });

    // ⑦ Overlay se disuelve → web entra
    after(1120, () => done(false));

    return () => {
      tids.current.forEach(clearTimeout);
      document.body.style.overflow = "";
      window.removeEventListener("scroll",     skip);
      window.removeEventListener("touchstart", skip);
    };
  }, []);

  if (!active || !mounted) return null;

  return (
    /* Overlay opaco — cubre TODO, solo el ojo es visible */
    <div
      ref={overlayRef}
      onClick={() => done(true)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#1A0A19",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Halo de marca detrás del ojo */}
      <div style={{
        position: "absolute",
        width: 160,
        height: 160,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(208,51,224,.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }}/>

      <div ref={wrapRef} style={{ opacity: 0, transform: "scale(.3)", willChange: "transform, opacity", position: "relative", zIndex: 1 }}>
        <svg width="80" height="80" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
          <defs>
            <filter id="ni-glow">
              <feGaussianBlur stdDeviation="1.2" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="ni-tip">
              <feGaussianBlur stdDeviation="0.9" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <linearGradient id="ni-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D033E0"/>
              <stop offset="100%" stopColor="#CD6FA1"/>
            </linearGradient>
          </defs>

          <rect ref={gradRef} x="3" y="6" width="18" height="12" rx="6" fill="url(#ni-grad)" style={{ opacity: 0 }}/>

          <path ref={topRef} d={TOP} fill="none" stroke="#D033E0" strokeWidth="1.5" strokeLinecap="round"
            style={{ strokeDasharray: 50, strokeDashoffset: 50, opacity: 0 }}/>
          <path ref={botRef} d={BOT} fill="none" stroke="#D033E0" strokeWidth="1.5" strokeLinecap="round"
            style={{ strokeDasharray: 50, strokeDashoffset: 50, opacity: 0 }}/>
          <circle ref={irisRef} cx="12" cy="12" r="3.5" fill="none" stroke="#CD6FA1" strokeWidth="1.1"
            style={{ strokeDasharray: 22, strokeDashoffset: 22, opacity: 0, transform: "rotate(-90deg)", transformOrigin: "12px 12px" }}/>
          <circle ref={pupilRef} cx="12" cy="12" r="1.9" fill="#D033E0" filter="url(#ni-glow)" style={{ opacity: 0 }}/>
          <circle ref={shineRef} cx="13.3" cy="10.7" r="0.75" fill="rgba(255,255,255,.95)" style={{ opacity: 0 }}/>

          {/* Puntas de lápiz con animateMotion */}
          <circle ref={nibTopRef} r="1.4" fill="white" filter="url(#ni-tip)" style={{ opacity: 0 }}>
            <animateMotion ref={topAnimRef as never} dur="0.30s" begin="indefinite" fill="freeze" path={TOP}/>
          </circle>
          <circle ref={nibBotRef} r="1.4" fill="white" filter="url(#ni-tip)" style={{ opacity: 0 }}>
            <animateMotion ref={botAnimRef as never} dur="0.26s" begin="indefinite" fill="freeze" path={BOT}/>
          </circle>
          <circle ref={nibIrisRef} r="1.2" fill="white" filter="url(#ni-tip)" style={{ opacity: 0 }}>
            <animateMotion ref={irisAnimRef as never} dur="0.17s" begin="indefinite" fill="freeze" path={IRIS}/>
          </circle>
        </svg>
      </div>
    </div>
  );
}
