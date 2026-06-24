import { useState, useEffect } from "react";

export function useCount(target: number, go: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!go) return;
    let cur = 0;
    const step = target / 50;
    const id = setInterval(() => {
      cur = Math.min(cur + step, target);
      setVal(Math.floor(cur));
      if (cur >= target) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [go, target]);
  return val;
}
