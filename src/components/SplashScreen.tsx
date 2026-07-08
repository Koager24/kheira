import { useEffect, useState } from "react";
import { LOGO_FULL } from "./Logo";

// Splash Screen im "Shader"-Stil: sanfter Verlauf von hellem Licht oben in
// tiefes Navy unten, mit langsam driftenden Farbfeldern. Logo auf schwebender
// weißer Karte, Claim darunter, Credit prominent am unteren Rand.
// Wird ausschließlich durch Tippen/Klicken beendet.
//
// Higgsfield-Logo-Animation einhängen:
//   1. MP4/WebM nach public/brand/splash.mp4 legen,
//   2. SPLASH_VIDEO_SRC auf `${import.meta.env.BASE_URL}brand/splash.mp4` setzen.
const SPLASH_VIDEO_SRC: string | null = null;

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setReady(true), reduce ? 200 : 1500);
    return () => clearTimeout(t);
  }, []);

  const handleContinue = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onDone, 450);
  };

  return (
    <button
      onClick={handleContinue}
      aria-label="KHEIRA starten"
      className={`splash-bg fixed inset-0 z-50 flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* driftende Farbfelder */}
      <div className="splash-blob splash-blob-a" aria-hidden="true" />
      <div className="splash-blob splash-blob-b" aria-hidden="true" />
      <div className="splash-blob splash-blob-c" aria-hidden="true" />
      <div className="splash-blob splash-blob-d" aria-hidden="true" />

      {/* Logo auf schwebender Karte */}
      <div className="splash-logo relative flex flex-col items-center px-8">
        <div className="rounded-[1.75rem] bg-white/95 px-10 py-9 shadow-[0_24px_60px_rgba(10,31,60,0.35)] backdrop-blur-sm">
          {SPLASH_VIDEO_SRC ? (
            <video
              src={SPLASH_VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              className="w-52 sm:w-60"
              aria-label="KHEIRA"
            />
          ) : (
            <img src={LOGO_FULL} alt="KHEIRA" draggable={false} className="w-52 select-none sm:w-60" />
          )}
        </div>
        <p className="splash-fade mt-7 text-base font-medium tracking-wide text-ink/75">
          Handtherapie. Klar geführt.
        </p>
      </div>

      {/* Tippen zum Starten */}
      <div
        className={`absolute bottom-28 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      >
        <span className="splash-pulse rounded-full border border-white/40 bg-white/15 px-5 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur-md">
          Tippen zum Starten
        </span>
      </div>

      {/* Credit – prominent auf dem dunklen Verlauf */}
      <p className="splash-fade-late absolute bottom-10 px-8 text-center text-[11px] font-bold uppercase tracking-[0.24em] text-white/85">
        Entwickelt von Dr. med. Christoph Wallner
      </p>
    </button>
  );
}
