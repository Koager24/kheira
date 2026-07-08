import { useCallback, useEffect, useState } from "react";
import type { TherapyPhase, TherapyProtocol } from "../data/types";

// ---------------------------------------------------------------------------
// Persistenz (localStorage) – kein Server, kein Login.
// ---------------------------------------------------------------------------

const KEY = "kheira.v1";

export interface AppState {
  onboardingDone: boolean;
  safetyConfirmed: boolean;
  /** ISO-Datum (YYYY-MM-DD) der Operation. */
  opDate: string | null;
  protocolId: string | null;
  /** Erledigte Durchgänge pro Tag: { "YYYY-MM-DD": { [exerciseId]: Anzahl } } */
  progress: Record<string, Record<string, number>>;
  /** Zeitpunkt des zuletzt bestätigten Durchgangs (ISO). */
  lastSetAt: string | null;
  /** Zuletzt gesehener Therapieabschnitt – für den "Neue Phase"-Hinweis. */
  lastSeenPhaseId: string | null;
  /** Erreichte Meilensteine: { badgeId: ISO-Datum des Erreichens }. */
  badges: Record<string, string>;
}

const defaultState: AppState = {
  onboardingDone: false,
  safetyConfirmed: false,
  opDate: null,
  protocolId: null,
  progress: {},
  lastSetAt: null,
  lastSeenPhaseId: null,
  badges: {},
};

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...(JSON.parse(raw) as Partial<AppState>) };
  } catch {
    return defaultState;
  }
}

function saveState(state: AppState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* Speicherung nicht möglich – App bleibt nutzbar, Fortschritt geht beim Neuladen verloren. */
  }
}

export function useAppState() {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const update = useCallback((patch: Partial<AppState>) => {
    setState((s) => ({ ...s, ...patch }));
  }, []);

  const logSet = useCallback((exerciseId: string) => {
    const day = todayKey();
    setState((s) => {
      const forDay = { ...(s.progress[day] ?? {}) };
      forDay[exerciseId] = (forDay[exerciseId] ?? 0) + 1;
      return {
        ...s,
        progress: { ...s.progress, [day]: forDay },
        lastSetAt: new Date().toISOString(),
      };
    });
  }, []);

  const resetAll = useCallback(() => {
    setState(defaultState);
  }, []);

  return { state, update, logSet, resetAll };
}

// ---------------------------------------------------------------------------
// Datumslogik
// ---------------------------------------------------------------------------

export function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Tage seit OP (0 = OP-Tag). Negativ, falls das OP-Datum in der Zukunft liegt. */
export function daysSinceOp(opDate: string): number {
  const [y, m, d] = opDate.split("-").map(Number);
  const op = new Date(y, m - 1, d);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((today.getTime() - op.getTime()) / 86_400_000);
}

/** Woche nach OP (Tag 1–7 = Woche 1). Am OP-Tag selbst: Woche 1. */
export function weekAfterOp(day: number): number {
  return Math.max(1, Math.ceil(Math.max(day, 1) / 7));
}

export function currentPhase(protocol: TherapyProtocol, day: number): TherapyPhase | null {
  const phase = protocol.phases.find(
    (p) => day >= p.startDay && (p.endDay === null || day <= p.endDay)
  );
  if (phase) return phase;
  // Vor Beginn der ersten Phase (z. B. OP-Datum in der Zukunft): Schutzphase anzeigen.
  return protocol.phases[0] ?? null;
}

export type PhaseStatus = "done" | "active" | "locked";

export function phaseStatus(phase: TherapyPhase, day: number): PhaseStatus {
  if (phase.endDay !== null && day > phase.endDay) return "done";
  if (day >= phase.startDay) return "active";
  return "locked";
}

export function formatGermanDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
