/**
 * Scroll suave a una sección del home.
 *
 * Las secciones usan `content-visibility: auto`, así que mientras están fuera
 * de pantalla ocupan lo que diga `contain-intrinsic-size` y no su alto real.
 * Al hacer scroll se van renderizando, el documento crece y el destino se
 * desplaza hacia abajo — un `scrollIntoView` suelto apunta a la posición
 * estimada y se queda corto (se nota sobre todo en las secciones bajas, como
 * #tienda). Reapuntamos hasta que la posición del destino deje de moverse.
 */

let activeRun = 0;

export function scrollToSection(id: string) {
  if (id === "inicio") {
    activeRun++;
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  const run = ++activeRun;
  let prev = -1;
  let tries = 0;

  const step = () => {
    if (run !== activeRun) return; // otra navegación tomó el control
    const top = Math.round(el.getBoundingClientRect().top + window.scrollY);
    if (top === prev || tries++ > 12) return; // posición estable
    prev = top;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(step, 150);
  };

  step();
}
