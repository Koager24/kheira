import type { ReactNode } from "react";
import type { VideoAsset } from "../data/types";
import { LogoMark } from "./Logo";

// ---------------------------------------------------------------------------
// Icons (Inline-SVG, keine Icon-Bibliothek nötig)
// ---------------------------------------------------------------------------

type IconProps = { className?: string };

export const IconArrowRight = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconArrowLeft = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconCheck = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconLock = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="5" y="11" width="14" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const IconPlay = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
  </svg>
);

export const IconShield = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M12 3 5 6v5c0 4.6 3 8.4 7 10 4-1.6 7-5.4 7-10V6l-7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

export const IconRepeat = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M17 2.5 20.5 6 17 9.5M20.5 6H8a4 4 0 0 0-4 4v1M7 21.5 3.5 18 7 14.5M3.5 18H16a4 4 0 0 0 4-4v-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconClock = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconHome = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="m4 11 8-7 8 7v8.5a1.5 1.5 0 0 1-1.5 1.5H14v-6h-4v6H5.5A1.5 1.5 0 0 1 4 19.5V11Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

export const IconTimeline = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="6" cy="5" r="2" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="6" cy="12" r="2" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="6" cy="19" r="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M11 5h8M11 12h8M11 19h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const IconHand = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M8 12V5.5a1.5 1.5 0 0 1 3 0V11m0-6.5v-1a1.5 1.5 0 0 1 3 0V11m0-5.5a1.5 1.5 0 0 1 3 0V13m-9-1-1.8-2.2a1.6 1.6 0 0 0-2.4 2.1L7.5 17c1.4 2.4 3.2 4 6 4 3.5 0 6.5-2.9 6.5-6.5V7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconChart = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M4 20V10m5.5 10V4M15 20v-8m5.5 8V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const IconGear = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 2.8 13 5a7.3 7.3 0 0 1 2.4 1l2.3-.8 1.6 2.7-1.6 1.8c.2.8.2 1.7 0 2.5l1.6 1.8-1.6 2.7-2.3-.8a7.3 7.3 0 0 1-2.4 1l-1 2.3h-3.1L10 19a7.3 7.3 0 0 1-2.4-1l-2.3.8-1.6-2.7 1.6-1.8a7.6 7.6 0 0 1 0-2.5L3.7 9.9 5.3 7.2l2.3.8A7.3 7.3 0 0 1 10 7l1-2.3h1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const IconWarning = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M12 4 2.8 19.5h18.4L12 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M12 10v4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="17" r="0.4" fill="currentColor" stroke="currentColor" />
  </svg>
);

// ---------------------------------------------------------------------------
// Bausteine
// ---------------------------------------------------------------------------

export function Card({
  children,
  className = "",
  watermark = false,
}: {
  children: ReactNode;
  className?: string;
  watermark?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-card bg-white shadow-card border border-line/70 ${className}`}>
      {watermark && (
        <LogoMark className="pointer-events-none select-none absolute -right-4 -bottom-3 w-36 opacity-[0.05]" />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  className = "",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-6 py-4 text-base font-semibold text-white shadow-lift transition active:scale-[0.98] disabled:opacity-40 disabled:shadow-none ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-center gap-2 rounded-2xl border border-line bg-white px-6 py-4 text-base font-semibold text-ink transition active:scale-[0.98] hover:border-accentSoft ${className}`}
    >
      {children}
    </button>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">{children}</div>
  );
}

export function SafetyBanner({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-warn/25 bg-warn/[0.06] px-4 py-3.5">
      <IconWarning className="mt-0.5 w-5 h-5 shrink-0 text-warn" />
      <p className="text-sm leading-relaxed text-ink/90">{text}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Video-Slot: echtes Video oder hochwertiger 9:16-Platzhalter
// ---------------------------------------------------------------------------

/**
 * Normalisiert Videopfade: Einträge ohne führenden Slash (z. B. "videos/x.mp4")
 * werden an der Domain-Wurzel verankert, damit sie von jeder Route aus laden.
 * Absolute URLs (http/https) bleiben unangetastet.
 */
function resolveMediaSrc(src: string): string {
  if (/^https?:\/\//.test(src) || src.startsWith("/")) return src;
  return `/${src}`;
}

export function VideoSlot({ asset, compact = false }: { asset: VideoAsset | null; compact?: boolean }) {
  if (asset && asset.status === "available" && asset.src) {
    return (
      <div className="mx-auto w-full max-w-[300px]">
        <video
          key={asset.id}
          className="aspect-[9/16] w-full rounded-card bg-ink object-cover shadow-lift"
          controls
          loop
          playsInline
          preload="metadata"
          poster={asset.poster ? resolveMediaSrc(asset.poster) : undefined}
        >
          <source src={resolveMediaSrc(asset.src)} />
          Ihr Browser kann dieses Video nicht abspielen.
        </video>
      </div>
    );
  }

  // Premium-Platzhalter mit KHEIRA-Branding
  return (
    <div className={`mx-auto w-full ${compact ? "max-w-[220px]" : "max-w-[300px]"}`}>
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-card border border-line bg-gradient-to-b from-mist via-white to-mist shadow-card">
        {/* dezente Wellen */}
        <svg className="absolute inset-x-0 top-1/2 -translate-y-1/2" viewBox="0 0 300 200" fill="none" aria-hidden="true">
          <path d="M-10 100 C 60 70, 130 130, 200 95 S 320 80, 340 100" stroke="#A8C4E5" strokeWidth="2" opacity="0.5">
            <animate attributeName="d" dur="7s" repeatCount="indefinite"
              values="M-10 100 C 60 70, 130 130, 200 95 S 320 80, 340 100;
                      M-10 100 C 60 120, 130 75, 200 105 S 320 115, 340 100;
                      M-10 100 C 60 70, 130 130, 200 95 S 320 80, 340 100" />
          </path>
          <path d="M-10 120 C 70 95, 140 145, 220 110 S 320 105, 340 120" stroke="#0A1F3C" strokeWidth="1.5" opacity="0.18">
            <animate attributeName="d" dur="9s" repeatCount="indefinite"
              values="M-10 120 C 70 95, 140 145, 220 110 S 320 105, 340 120;
                      M-10 120 C 70 140, 140 100, 220 128 S 320 132, 340 120;
                      M-10 120 C 70 95, 140 145, 220 110 S 320 105, 340 120" />
          </path>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-between px-5 py-6 text-center">
          <LogoMark className="w-16 opacity-80" />
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-white/80 text-ink/30 backdrop-blur">
              <IconPlay className="ml-0.5 w-6 h-6" />
            </div>
            {asset && <p className="text-sm font-semibold text-ink">{asset.title}</p>}
            {asset && !compact && (
              <p className="text-xs leading-relaxed text-ink/60">{asset.description}</p>
            )}
          </div>
          <span className="rounded-full border border-accentSoft bg-white/85 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-accent backdrop-blur">
            Video folgt
          </span>
        </div>
      </div>
    </div>
  );
}
