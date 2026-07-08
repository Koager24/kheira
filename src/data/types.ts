// Zentrale Typdefinitionen der datengetriebenen Therapiearchitektur.
// Neue Schemata (z. B. Langfinger, Strecksehne) werden ausschließlich über
// diese Strukturen ergänzt – ohne Änderungen an den UI-Komponenten.

export type VideoStatus = "available" | "comingSoon";

export interface VideoAsset {
  id: string;
  title: string;
  protocolId: string;
  phaseId: string;
  exerciseId: string | null; // null = Instruktionsblock ohne Übung
  aspectRatio: "9:16";
  status: VideoStatus;
  /** Pfad zur MP4/WebM-Datei, sobald vorhanden, z. B. "videos/passive-beugung.mp4" (in /public ablegen). */
  src: string | null;
  /** Optionales Vorschaubild (Poster) für das Video. */
  poster: string | null;
  description: string;
}

export interface ExerciseStep {
  text: string;
}

export interface Exercise {
  id: string;
  title: string;
  /** Kurzform für Karten und Listen. */
  shortSummary: string;
  steps: ExerciseStep[];
  repetitions: number;
  /** z. B. "Tagsüber stündlich, wenn wach" */
  frequency: string;
  safetyNote: string;
  videoAssetId: string;
}

export interface InfoBlock {
  id: string;
  title: string;
  text: string;
  videoAssetId: string | null;
}

export interface TherapyPhase {
  id: string;
  /** Reihenfolge innerhalb des Protokolls. */
  index: number;
  title: string;
  /** Zeitraum als Patiententext, z. B. "Tag 3 bis Ende Woche 1". */
  rangeLabel: string;
  /** Erster Tag nach OP, an dem die Phase beginnt (0 = OP-Tag). */
  startDay: number;
  /** Letzter Tag der Phase; null = offenes Ende. */
  endDay: number | null;
  /** Kurzbeschreibung dessen, worum es in der Phase geht. */
  focus: string;
  exercises: Exercise[];
  infoBlocks: InfoBlock[];
  /** Phasen ohne Übungsfreischaltung (z. B. Schutzphase, Spätphasen). */
  informationalOnly: boolean;
}

export interface SafetyRule {
  id: string;
  text: string;
  /** Regeln mit Zeitbezug, z. B. "bis Ende Woche 10". */
  untilLabel?: string;
}

export interface TherapyProtocol {
  id: string;
  name: string;
  subtitle: string;
  /** true = klinisch ausgearbeitet und wählbar; false = "demnächst verfügbar". */
  available: boolean;
  disclaimer: string;
  safetyRules: SafetyRule[];
  phases: TherapyPhase[];
}
