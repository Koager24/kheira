import type { TherapyProtocol } from "../data/types";
import { currentPhase, daysSinceOp, todayKey, weekAfterOp } from "../lib/state";
import { navigate } from "../lib/router";
import { BADGES } from "../data/badges";
import { BadgeShield } from "./Milestones";
import {
  Card,
  Eyebrow,
  IconArrowRight,
  IconCheck,
  IconClock,
  IconShield,
  IconTimeline,
  PrimaryButton,
  SecondaryButton,
} from "../components/ui";

interface HomeProps {
  protocol: TherapyProtocol;
  opDate: string;
  progress: Record<string, Record<string, number>>;
  dailyTarget: number;
  lastSetAt: string | null;
  isNewPhase: boolean;
  badgeCount: number;
  freshBadges: string[];
  onDismissFresh: () => void;
}

export function Home({ protocol, opDate, progress, dailyTarget, lastSetAt, isNewPhase, badgeCount, freshBadges, onDismissFresh }: HomeProps) {
  const day = daysSinceOp(opDate);
  const week = weekAfterOp(day);
  const phase = currentPhase(protocol, day);
  const todayProgress = progress[todayKey()] ?? {};

  const exercises = phase?.exercises ?? [];

  return (
    <div className="space-y-5">
      {/* Kopfbereich: Was steht heute an? */}
      <div>
        <Eyebrow>
          Tag {Math.max(day, 0)} · Woche {week} nach OP
        </Eyebrow>
        <h1 className="mt-1.5 text-[26px] font-bold leading-tight text-ink">
          Was steht heute an?
        </h1>
      </div>

      {/* Ruhige Würdigung neu erreichter Meilensteine */}
      {freshBadges.length > 0 && (() => {
        const latest = BADGES.find((b) => b.id === freshBadges[freshBadges.length - 1]);
        if (!latest) return null;
        return (
          <div className="flex items-center gap-3 rounded-card border border-accentSoft bg-white p-4 shadow-lift">
            <BadgeShield tier={latest.tier} category={latest.category} earned label={latest.label} className="w-14 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
                {freshBadges.length > 1 ? `${freshBadges.length} neue Meilensteine` : "Neuer Meilenstein"}
              </p>
              <p className="text-sm font-bold text-ink">{latest.title}</p>
              <button onClick={() => navigate("/meilensteine")} className="mt-0.5 text-xs font-semibold text-accent">
                Alle Meilensteine ansehen
              </button>
            </div>
            <button
              onClick={onDismissFresh}
              aria-label="Hinweis schließen"
              className="shrink-0 rounded-full p-1.5 text-ink/40 transition hover:bg-mist hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
        );
      })()}

      {/* Hinweis: neue Phase freigeschaltet */}
      {isNewPhase && phase && (
        <div className="flex items-start gap-3 rounded-2xl border border-accentSoft bg-accent/[0.06] px-4 py-3.5">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white">
            <IconCheck className="w-3.5 h-3.5" />
          </span>
          <p className="text-sm leading-relaxed text-ink/85">
            <span className="font-bold">Neuer Therapieabschnitt freigeschaltet:</span> {phase.title}.
            Ihre Übungen wurden entsprechend angepasst.
          </p>
        </div>
      )}

      {/* Aktuelle Phase */}
      {phase && (
        <Card className="p-5" watermark>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/45">
                Aktueller Abschnitt
              </p>
              <p className="mt-1 text-lg font-bold text-ink">{phase.title}</p>
              <p className="text-sm text-ink/55">{phase.rangeLabel}</p>
            </div>
            <button
              onClick={() => navigate("/plan")}
              aria-label="Therapieplan ansehen"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-accent transition hover:bg-accentSoft/40"
            >
              <IconTimeline className="w-5 h-5" />
            </button>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">{phase.focus}</p>
        </Card>
      )}

      {/* Heutige Übungen */}
      {phase && !phase.informationalOnly && exercises.length > 0 ? (
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-base font-bold text-ink">Heutige Übungen</p>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-ink/50">
              <IconClock className="w-4 h-4" /> stündlich, wenn wach
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            {exercises.map((ex) => {
              const sets = todayProgress[ex.id] ?? 0;
              const done = sets >= dailyTarget;
              return (
                <button
                  key={ex.id}
                  onClick={() => navigate(`/uebung/${ex.id}`)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-line bg-paper p-3.5 text-left transition hover:border-accentSoft"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      done ? "bg-ok text-white" : sets > 0 ? "bg-accentSoft/50 text-ink" : "bg-mist text-ink/40"
                    }`}
                  >
                    {done ? <IconCheck className="w-[18px] h-[18px]" /> : <span className="text-xs font-bold">{sets}</span>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-ink">{ex.title}</p>
                    <p className="text-xs text-ink/55">
                      {ex.repetitions} Wiederholungen · {sets} von {dailyTarget} Durchgängen heute
                    </p>
                  </div>
                  <IconArrowRight className="w-4 h-4 shrink-0 text-ink/30" />
                </button>
              );
            })}
          </div>

          {lastSetAt && (
            <p className="mt-4 text-center text-xs font-semibold text-ink/45">
              Zuletzt geübt um{" "}
              {new Date(lastSetAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}{" "}
              Uhr
            </p>
          )}

          <PrimaryButton className="mt-4" onClick={() => navigate(`/uebung/${exercises[0].id}`)}>
            Übungen starten <IconArrowRight />
          </PrimaryButton>
        </Card>
      ) : (
        <Card className="p-5" watermark>
          <p className="text-base font-bold text-ink">Heute keine eigenständigen Übungen</p>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            {phase?.informationalOnly
              ? "In diesem Abschnitt richtet sich Ihre Nachbehandlung nach den individuellen Anweisungen Ihres Behandlungsteams. Die Inhalte dieser Phase finden Sie im Therapieplan."
              : "Ihr Therapieplan enthält für heute keine Übungen."}
          </p>
          <SecondaryButton className="mt-4" onClick={() => navigate("/plan")}>
            Therapieplan ansehen <IconArrowRight />
          </SecondaryButton>
        </Card>
      )}

      {/* Schnellzugriffe */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate("/meilensteine")}
          className="col-span-2 flex items-center gap-3 rounded-card border border-line bg-white p-4 text-left shadow-card transition hover:border-accentSoft"
        >
          <BadgeShield tier={2} category="konsistenz" earned className="h-11 w-10 shrink-0" />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-ink">Ihre Meilensteine</span>
            <span className="block text-xs text-ink/50">
              {badgeCount > 0
                ? `${badgeCount} erreicht – Beständigkeit zahlt sich aus`
                : "Der erste wartet auf Ihren ersten Übungstag"}
            </span>
          </span>
          <IconArrowRight className="w-4 h-4 shrink-0 text-ink/30" />
        </button>
        <button
          onClick={() => navigate("/hinweise")}
          className="flex flex-col items-start gap-2 rounded-card border border-line bg-white p-4 text-left shadow-card transition hover:border-accentSoft"
        >
          <IconShield className="w-6 h-6 text-warn" />
          <span className="text-sm font-bold text-ink">Wichtige Hinweise</span>
          <span className="text-xs text-ink/50">Sicherheitsregeln ansehen</span>
        </button>
        <button
          onClick={() => navigate("/plan")}
          className="flex flex-col items-start gap-2 rounded-card border border-line bg-white p-4 text-left shadow-card transition hover:border-accentSoft"
        >
          <IconTimeline className="w-6 h-6 text-accent" />
          <span className="text-sm font-bold text-ink">Therapieplan</span>
          <span className="text-xs text-ink/50">Alle Phasen im Überblick</span>
        </button>
      </div>

      {/* Dauerhafte Sicherheitszeile */}
      <p className="px-1 text-center text-xs leading-relaxed text-ink/45">
        Üben Sie nie mit Gewalt und nicht gegen Schmerz, Blockade oder Widerstand. Bei Problemen
        kontaktieren Sie Ihr Behandlungsteam.
      </p>
    </div>
  );
}
