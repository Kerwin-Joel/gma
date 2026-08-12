/**
 * Scroll suave a una sección del home.
 *
 * Las secciones usan `content-visibility: auto`, así que mientras están fuera
 * de pantalla ocupan lo que diga `contain-intrinsic-size` y no su alto real.
 * Si se llama a `scrollIntoView` tal cual, el destino se calcula sumando esos
 * placeholders y el scroll se queda corto: para #tienda son ~2000px en móvil,
 * más de dos pantallas.
 *
 * La solución es desactivar `content-visibility` y forzar un reflow ANTES de
 * fijar el destino, para que el layout ya tenga las alturas reales. No se
 * vuelve a activar a propósito: `contain-intrinsic-size: auto` no conserva el
 * alto medido, así que restaurarlo encogería la página de golpe al terminar la
 * animación. Y a estas alturas ya no hace falta — lo que optimiza es la carga
 * inicial, que para cuando el usuario pulsa un enlace del menú ya ha pasado.
 */

export function scrollToSection(id: string) {
  if (id === "inicio") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  const root = document.documentElement;
  if (!root.classList.contains("cv-off")) {
    root.classList.add("cv-off");
    void root.offsetHeight; // fuerza el reflow con las alturas reales
  }

  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
