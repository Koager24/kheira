import { useEffect, useState } from "react";

// Minimaler Hash-Router ohne externe Abhängigkeit.
// Routen: #/home, #/plan, #/uebungen, #/uebung/<exerciseId>,
//         #/hinweise, #/fortschritt, #/einstellungen

export function useRoute(): string {
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || "/home");
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.slice(1) || "/home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

export function navigate(to: string) {
  window.location.hash = to;
  window.scrollTo({ top: 0 });
}
