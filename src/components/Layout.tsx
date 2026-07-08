import type { ReactNode } from "react";
import { navigate } from "../lib/router";
import { LogoMark, Wordmark } from "./Logo";
import { IconGear, IconHand, IconHome, IconTimeline } from "./ui";

const NAV = [
  { to: "/home", label: "Heute", icon: IconHome },
  { to: "/plan", label: "Plan", icon: IconTimeline },
  { to: "/uebungen", label: "Übungen", icon: IconHand },
  { to: "/einstellungen", label: "Mehr", icon: IconGear },
];

export function Layout({ route, children }: { route: string; children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-paper md:my-6 md:min-h-[calc(100dvh-3rem)] md:rounded-[2rem] md:border md:border-line md:shadow-lift">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-line/60 bg-paper/85 backdrop-blur-md md:rounded-t-[2rem]">
        <button
          onClick={() => navigate("/home")}
          className="mx-auto flex items-center justify-center gap-2.5 py-3.5"
          aria-label="Zur Startseite"
        >
          <LogoMark className="h-7 w-auto" />
          <Wordmark className="h-3.5 w-auto" />
        </button>
      </header>

      <main className="flex-1 px-5 pb-28 pt-5">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-md border-t border-line/70 bg-white/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:rounded-b-[2rem]">
        <div className="flex items-stretch justify-around">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = route === to || (to === "/uebungen" && route.startsWith("/uebung"));
            return (
              <button
                key={to}
                onClick={() => navigate(to)}
                className={`flex min-w-0 flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition ${
                  active ? "text-ink" : "text-ink/40 hover:text-ink/70"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="w-6 h-6" />
                {label}
                <span
                  className={`h-1 w-1 rounded-full transition ${active ? "bg-accent" : "bg-transparent"}`}
                />
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
