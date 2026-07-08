// ---------------------------------------------------------------------------
// Meilenstein-System (Gamification, klinisch verantwortungsvoll)
//
// Grundsätze:
//  - Belohnt wird Regelmäßigkeit und der Heilungsweg – nie die Menge.
//    Ein "aktiver Tag" ist jeder Tag mit mindestens einem dokumentierten
//    Durchgang; mehr Durchgänge bringen keinen Vorteil.
//  - "Volle Tage" zählen nur bis zum Tagesziel (10 Durchgänge je Übung),
//    darüber hinaus gibt es nichts zu gewinnen.
//  - Keine Streaks, die reißen können, keine Ranglisten, kein Verlust:
//    Einmal erreichte Meilensteine bleiben.
// ---------------------------------------------------------------------------

import type { AppState } from "../lib/state";
import { daysSinceOp } from "../lib/state";

export type BadgeTier = 1 | 2 | 3;

export interface BadgeDef {
  id: string;
  title: string;
  description: string;
  /** Steuert die Darstellung des Wappens (Stufe / "Metall"). */
  tier: BadgeTier;
  /** Kurzwert im Wappenband, z. B. "7 Tage", "W 6", "15×". */
  label: string;
  category: "konsistenz" | "heilungsweg" | "volle-tage";
}

export const BADGES: BadgeDef[] = [
  // --- Konsistenz: aktive Tage (Tage mit mindestens einem Durchgang) ---
  { id: "aktiv-1", label: "1 Tag", title: "Erster Schritt", description: "Ihr erster dokumentierter Übungstag.", tier: 1, category: "konsistenz" },
  { id: "aktiv-3", label: "3 Tage", title: "Gut begonnen", description: "An 3 Tagen geübt.", tier: 1, category: "konsistenz" },
  { id: "aktiv-7", label: "7 Tage", title: "Eine Woche stark", description: "An 7 Tagen geübt.", tier: 2, category: "konsistenz" },
  { id: "aktiv-14", label: "14 Tage", title: "Zwei Wochen Routine", description: "An 14 Tagen geübt.", tier: 2, category: "konsistenz" },
  { id: "aktiv-21", label: "21 Tage", title: "Drei Wochen im Rhythmus", description: "An 21 Tagen geübt.", tier: 2, category: "konsistenz" },
  { id: "aktiv-30", label: "30 Tage", title: "Ein Monat Konsequenz", description: "An 30 Tagen geübt – die Königsdisziplin der Schienenphase.", tier: 3, category: "konsistenz" },

  // --- Heilungsweg: erreichte Etappen nach OP ---
  { id: "weg-w1", label: "W 1", title: "Woche 1 geschafft", description: "Die erste Woche nach der Operation liegt hinter Ihnen.", tier: 1, category: "heilungsweg" },
  { id: "weg-w3", label: "W 3", title: "Steigerung gemeistert", description: "Die Aufbauwochen 2 und 3 sind abgeschlossen.", tier: 2, category: "heilungsweg" },
  { id: "weg-w6", label: "W 6", title: "Schienen-Etappe erreicht", description: "Ende Woche 6 – der Übergang ohne Schiene beginnt.", tier: 2, category: "heilungsweg" },
  { id: "weg-w8", label: "W 8", title: "Belastungsaufbau erreicht", description: "Ab jetzt wird die Sehne zunehmend belastungsstabil.", tier: 3, category: "heilungsweg" },
  { id: "weg-w12", label: "W 12", title: "Ziel erreicht", description: "Woche 12 – die letzte Etappe Ihrer Nachbehandlung.", tier: 3, category: "heilungsweg" },

  // --- Volle Tage: Tagesziel bei allen Übungen erreicht (nie mehr als das Ziel) ---
  { id: "voll-1", label: "1×", title: "Ein voller Tag", description: "Alle Übungen eines Tages vollständig dokumentiert.", tier: 1, category: "volle-tage" },
  { id: "voll-5", label: "5×", title: "Fünf volle Tage", description: "An 5 Tagen das komplette Tagesprogramm dokumentiert.", tier: 2, category: "volle-tage" },
  { id: "voll-15", label: "15×", title: "Fünfzehn volle Tage", description: "An 15 Tagen das komplette Tagesprogramm dokumentiert.", tier: 3, category: "volle-tage" },
];

export const CATEGORY_LABELS: Record<BadgeDef["category"], string> = {
  konsistenz: "Regelmäßigkeit",
  heilungsweg: "Heilungsweg",
  "volle-tage": "Volle Tage",
};

/** Anzahl aktiver Tage (mindestens ein Durchgang). */
function activeDays(progress: AppState["progress"]): number {
  return Object.values(progress).filter((d) => Object.values(d).some((n) => n > 0)).length;
}

/**
 * Anzahl "voller Tage": alle an diesem Tag dokumentierten Übungen haben das
 * Tagesziel erreicht, und es waren mindestens zwei Übungen. So funktioniert der
 * Meilenstein in jeder aktiven Phase (Phase 4 hat z. B. nur zwei Übungen) und
 * belohnt nie mehr als das verordnete Pensum.
 */
function fullDays(progress: AppState["progress"], dailyTarget: number): number {
  return Object.values(progress).filter((d) => {
    const counts = Object.values(d);
    if (counts.length < 2) return false;
    return counts.every((n) => n >= dailyTarget);
  }).length;
}

/** Berechnet alle aktuell verdienten Badge-IDs. */
export function computeEarnedBadges(
  progress: AppState["progress"],
  opDate: string,
  dailyTarget: number
): string[] {
  const act = activeDays(progress);
  const full = fullDays(progress, dailyTarget);
  const day = daysSinceOp(opDate);
  const earned: string[] = [];

  const actThresholds: [string, number][] = [
    ["aktiv-1", 1], ["aktiv-3", 3], ["aktiv-7", 7],
    ["aktiv-14", 14], ["aktiv-21", 21], ["aktiv-30", 30],
  ];
  for (const [id, n] of actThresholds) if (act >= n) earned.push(id);

  // Heilungsweg nur, wenn überhaupt geübt wurde – bloßes Verstreichen von Zeit
  // ohne jede Aktivität soll nicht "belohnt" wirken.
  if (act >= 1) {
    const wayThresholds: [string, number][] = [
      ["weg-w1", 8], ["weg-w3", 22], ["weg-w6", 43], ["weg-w8", 57], ["weg-w12", 85],
    ];
    for (const [id, d] of wayThresholds) if (day >= d) earned.push(id);
  }

  const fullThresholds: [string, number][] = [["voll-1", 1], ["voll-5", 5], ["voll-15", 15]];
  for (const [id, n] of fullThresholds) if (full >= n) earned.push(id);

  return earned;
}
