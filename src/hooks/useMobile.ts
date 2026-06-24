import { useState, useEffect } from "react";

export function useMobile(bp = 768) {
  const [v, sv] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= bp : false
  );
  useEffect(() => {
    const fn = () => sv(window.innerWidth <= bp);
    window.addEventListener("resize", fn, { passive: true });
    fn();
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return v;
}
