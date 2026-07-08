// KHEIRA-Branding auf Basis des gelieferten Original-Logos.
// Die Assets liegen unter src/assets/brand/ (transparenter Hintergrund):
//   kheira-logo.png      – volle Marke (Hand/Welle + Schriftzug)
//   kheira-mark.png      – nur Bildmarke (Hand über Welle)
//   kheira-wordmark.png  – nur Schriftzug

import logoFull from "../assets/brand/kheira-logo.png";
import logoMark from "../assets/brand/kheira-mark.png";
import logoWordmark from "../assets/brand/kheira-wordmark.png";

export const LOGO_FULL = logoFull;
export const LOGO_MARK = logoMark;
export const LOGO_WORDMARK = logoWordmark;

export function LogoMark({ className = "" }: { className?: string }) {
  return <img src={LOGO_MARK} alt="" aria-hidden="true" className={`select-none ${className}`} draggable={false} />;
}

export function Wordmark({ className = "" }: { className?: string }) {
  return <img src={LOGO_WORDMARK} alt="KHEIRA" className={`select-none ${className}`} draggable={false} />;
}

export function LogoFull({ compact = false }: { compact?: boolean }) {
  return (
    <img
      src={LOGO_FULL}
      alt="KHEIRA"
      draggable={false}
      className={`select-none ${compact ? "w-28" : "w-52 sm:w-60"}`}
    />
  );
}

/** Dezentes Wasserzeichen für Karten und Video-Platzhalter. */
export function Watermark({ className = "" }: { className?: string }) {
  return (
    <img
      src={LOGO_MARK}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`pointer-events-none select-none opacity-[0.06] ${className}`}
    />
  );
}
