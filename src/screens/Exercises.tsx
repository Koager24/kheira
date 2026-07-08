import { useState } from "react";
import type { TherapyProtocol } from "../data/types";
import { getVideoAsset } from "../data/protocols";
import { currentPhase, daysSinceOp, todayKey, weekAfterOp } from "../lib/state";
import { navigate } from "../lib/router";
import {
  Card,
  Eyebrow,
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconClock,
  IconRepeat,
  PrimaryButton,
  SafetyBanner,
  SecondaryButton,
  VideoSlot,
} from "../components/ui";

// ---------------------------------------------------------------------------
// Übersicht der heutigen Übungen
// ---------------------------------------------------------------------------

export function ExerciseList({
  protocol,
  opDate,
  progress,
  dailyTarget,
}: {
  protocol: TherapyProtocol;
  opDate: string;
  progress: Record<string, Record<string, number>>;
  dailyTarget: number;
}) {
  const day = daysSinceOp(opDate);
  const phase = currentPhase(protocol, day);
  const todayProgress = progress[todayKey()] ?? {};

  return (
    <div>
      <Eyebrow>{phase?.title}</Eyebrow>
      <h1 className="mt-1.5 text-[26px] font-bold leading-tight text-ink">Ihre Übungen</h1>

      {phase && !phase.informationalOnly && phase.exercises.length > 0 ? (
        <div className="mt-6 space-y-3">
          {phase.exercises.map((ex) => {
            const sets = todayProgress[ex.id] ?? 0;
            const done = sets >= dailyTarget;
            return (
              <button
                key={ex.id}
                onClick={() => navigate(`/uebung/${ex.id}`)}
                className="w-full rounded-card border border-line bg-white p-5 text-left shadow-card transition hover:border-accentSoft"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-base font-bold text-ink">{ex.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink/60">{ex.shortSummary}</p>
                  </div>
                  {done && (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ok text-white">
                      <IconCheck className="w-4 h-4" />
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-ink/50">
                  <span className="flex items-center gap-1.5">
                    <IconRepeat className="w-4 h-4" /> {ex.repetitions} Wiederholungen
                  </span>
                  <span className="flex items-center gap-1.5">
                    <IconClock className="w-4 h-4" /> stündlich, wenn wach
                  </span>
                  <span className="ml-auto flex items-center gap-1 text-accent">
                    Öffnen <IconArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <Card className="mt-6 p-5" watermark>
          <p className="text-base font-bold text-ink">In diesem Abschnitt keine eigenständigen Übungen</p>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            Ihre Nachbehandlung richtet sich derzeit nach den individuellen Anweisungen Ihres
            Behandlungsteams. Die Inhalte dieser Phase finden Sie im Therapieplan.
          </p>
          <SecondaryButton className="mt-4" onClick={() => navigate("/plan")}>
            Zum Therapieplan <IconArrowRight />
          </SecondaryButton>
        </Card>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Übungsdetail mit Video-Slot, Schritten, Checkliste und Problem-Hinweis
// ---------------------------------------------------------------------------

export function ExerciseDetail({
  protocol,
  opDate,
  exerciseId,
  progress,
  dailyTarget,
  onLogSet,
}: {
  protocol: TherapyProtocol;
  opDate: string;
  exerciseId: string;
  progress: Record<string, Record<string, number>>;
  dailyTarget: number;
  onLogSet: (exerciseId: string) => void;
}) {
  const day = daysSinceOp(opDate);
  const week = weekAfterOp(day);
  const [showProblem, setShowProblem] = useState(false);
  const [justLogged, setJustLogged] = useState(false);

  // Übung in allen Phasen suchen (Detailseite bleibt auch über Phasengrenzen erreichbar)
  const found = protocol.phases
    .flatMap((p) => p.exercises.map((ex) => ({ phase: p, ex })))
    .find(({ ex }) => ex.id === exerciseId);

  if (!found) {
    return (
      <div className="py-16 text-center">
        <p className="text-base font-semibold text-ink">Übung nicht gefunden.</p>
        <SecondaryButton className="mt-5" onClick={() => navigate("/uebungen")}>
          Zurück zur Übersicht
        </SecondaryButton>
      </div>
    );
  }

  const { phase, ex } = found;
  const idx = phase.exercises.findIndex((x) => x.id === ex.id);
  const nextEx = idx >= 0 && idx < phase.exercises.length - 1 ? phase.exercises[idx + 1] : null;
  const video = getVideoAsset(ex.videoAssetId);
  const sets = (progress[todayKey()] ?? {})[ex.id] ?? 0;
  const done = sets >= dailyTarget;

  const handleLog = () => {
    onLogSet(ex.id);
    setJustLogged(true);
    setTimeout(() => setJustLogged(false), 1600);
  };

  return (
    <div>
      <button
        onClick={() => navigate("/uebungen")}
        className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-ink/55 transition hover:text-ink"
      >
        <IconArrowLeft className="w-4 h-4" /> Alle Übungen
      </button>

      <Eyebrow>
        {phase.title} · Woche {week}
      </Eyebrow>
      <h1 className="mt-1.5 text-[26px] font-bold leading-tight text-ink">{ex.title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink/65">{ex.shortSummary}</p>

      {/* Video oder Platzhalter (9:16) */}
      <div className="mt-6">
        <VideoSlot asset={video} />
      </div>

      {/* Eckdaten */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-card border border-line bg-white p-4 text-center shadow-card">
          <IconRepeat className="mx-auto w-5 h-5 text-accent" />
          <p className="mt-1.5 text-xl font-bold text-ink">{ex.repetitions}×</p>
          <p className="text-[11px] font-bold uppercase tracking-wide text-ink/45">Wiederholungen</p>
        </div>
        <div className="rounded-card border border-line bg-white p-4 text-center shadow-card">
          <IconClock className="mx-auto w-5 h-5 text-accent" />
          <p className="mt-1.5 text-xl font-bold text-ink">1× / Std.</p>
          <p className="text-[11px] font-bold uppercase tracking-wide text-ink/45">tagsüber, wenn wach</p>
        </div>
      </div>

      {/* Schritt-für-Schritt-Anleitung */}
      <Card className="mt-5 p-5">
        <p className="text-base font-bold text-ink">So geht die Übung</p>
        <ol className="mt-4 space-y-3.5">
          {ex.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mist text-xs font-bold text-accent">
                {i + 1}
              </span>
              <p className="pt-0.5 text-sm leading-relaxed text-ink/80">{step.text}</p>
            </li>
          ))}
        </ol>
      </Card>

      {/* Sicherheitswarnung */}
      <div className="mt-4">
        <SafetyBanner text={ex.safetyNote} />
      </div>

      {/* Durchgangs-Checkliste heute */}
      <Card className="mt-5 p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-ink">Heute erledigt</p>
          <p className="text-sm font-semibold text-ink/55">
            {sets} von {dailyTarget} Durchgängen
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {Array.from({ length: dailyTarget }).map((_, i) => (
            <span
              key={i}
              className={`h-2.5 flex-1 min-w-[14px] rounded-full transition ${
                i < sets ? "bg-ok" : "bg-mist"
              }`}
            />
          ))}
        </div>
        {done && (
          <p className="mt-3 text-sm font-semibold text-ok">
            Sehr gut – das Tagesziel für diese Übung ist erreicht. Weitere sanfte Durchgänge sind
            erlaubt, wenn Ihr Behandlungsteam es so vorgesehen hat.
          </p>
        )}
      </Card>

      {/* Aktionen */}
      <div className="mt-5 space-y-3">
        <PrimaryButton onClick={handleLog} className={justLogged ? "bg-ok" : ""}>
          {justLogged ? (
            <>
              <IconCheck /> Durchgang gespeichert
            </>
          ) : (
            <>10 Wiederholungen erledigt</>
          )}
        </PrimaryButton>
        {nextEx && (
          <SecondaryButton onClick={() => navigate(`/uebung/${nextEx.id}`)}>
            Nächste Übung: {nextEx.title} <IconArrowRight className="w-4 h-4 shrink-0" />
          </SecondaryButton>
        )}
        <SecondaryButton onClick={() => setShowProblem((s) => !s)}>
          Problem melden / Hinweis anzeigen
        </SecondaryButton>
      </div>

      {showProblem && (
        <Card className="mt-4 border-danger/25 p-5">
          <p className="text-base font-bold text-ink">Wenn etwas nicht stimmt</p>
          <p className="mt-2 text-sm leading-relaxed text-ink/75">
            Brechen Sie die Übung ab, wenn Sie Schmerzen, eine Blockade oder Widerstand spüren.
            Bei zunehmenden Schmerzen, Schwellung, Taubheit oder Wundproblemen kontaktieren Sie
            bitte umgehend Ihr Behandlungsteam oder Ihre Physiotherapie. KHEIRA ersetzt keine
            ärztliche oder therapeutische Kontrolle.
          </p>
        </Card>
      )}

      {/* Dezente Erinnerung */}
      <p className="mt-6 px-1 text-center text-xs leading-relaxed text-ink/45">
        Kleine Erinnerung: einmal pro wacher Stunde üben – Ihre Sehne dankt es Ihnen.
      </p>
    </div>
  );
}
