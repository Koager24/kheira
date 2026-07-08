import { useState } from "react";
import type { TherapyProtocol } from "../data/types";
import { getVideoAsset } from "../data/protocols";
import { daysSinceOp, phaseStatus } from "../lib/state";
import { navigate } from "../lib/router";
import { Eyebrow, IconCheck, IconLock, IconPlay, VideoSlot } from "../components/ui";

interface PlanProps {
  protocol: TherapyProtocol;
  opDate: string;
}

export function Plan({ protocol, opDate }: PlanProps) {
  const day = daysSinceOp(opDate);
  const [openInfo, setOpenInfo] = useState<string | null>(null);

  return (
    <div>
      <Eyebrow>{protocol.name}</Eyebrow>
      <h1 className="mt-1.5 text-[26px] font-bold leading-tight text-ink">Ihr Therapieplan</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink/60">
        {protocol.subtitle}. Vergangene Abschnitte sind abgehakt, der aktuelle ist hervorgehoben,
        kommende werden zum passenden Zeitpunkt freigeschaltet.
      </p>

      <div className="relative mt-7">
        {/* vertikale Linie */}
        <div className="absolute bottom-4 left-[15px] top-2 w-px bg-line" aria-hidden="true" />

        <div className="space-y-4">
          {protocol.phases.map((phase) => {
            const status = phaseStatus(phase, day);
            const active = status === "active";
            const done = status === "done";

            return (
              <div key={phase.id} className="relative pl-11">
                {/* Marker */}
                <div
                  className={`absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white ${
                    done
                      ? "border-ok text-ok"
                      : active
                        ? "border-accent text-accent shadow-[0_0_0_5px_rgba(74,123,181,0.14)]"
                        : "border-line text-ink/30"
                  }`}
                >
                  {done ? (
                    <IconCheck className="w-4 h-4" />
                  ) : active ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  ) : (
                    <IconLock className="w-3.5 h-3.5" />
                  )}
                </div>

                <div
                  className={`rounded-card border p-4 transition ${
                    active
                      ? "border-accentSoft bg-white shadow-lift"
                      : done
                        ? "border-line/70 bg-white/70"
                        : "border-line/60 bg-mist/40"
                  } ${status === "locked" ? "opacity-70" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={`text-[11px] font-bold uppercase tracking-[0.12em] ${active ? "text-accent" : "text-ink/40"}`}>
                        {phase.rangeLabel}
                      </p>
                      <p className={`mt-0.5 text-base font-bold ${status === "locked" ? "text-ink/50" : "text-ink"}`}>
                        {phase.title}
                      </p>
                    </div>
                    {active && (
                      <span className="shrink-0 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                        Heute
                      </span>
                    )}
                  </div>

                  {status !== "locked" && (
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">{phase.focus}</p>
                  )}

                  {/* Übungen der Phase */}
                  {status !== "locked" && phase.exercises.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      {phase.exercises.map((ex) => {
                        const video = getVideoAsset(ex.videoAssetId);
                        // Übungen bleiben auch in bereits abgeschlossenen Phasen einsehbar;
                        // gesperrte Phasen rendern diesen Block ohnehin nicht (Guard oben).
                        return (
                          <button
                            key={ex.id}
                            onClick={() => navigate(`/uebung/${ex.id}`)}
                            aria-label={`Übung öffnen: ${ex.title}`}
                            className="flex w-full items-center gap-2.5 rounded-xl border border-line/70 bg-paper px-3 py-2.5 text-left transition hover:border-accentSoft"
                          >
                            <IconPlay className="w-4 h-4 shrink-0 text-accent" />
                            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink/85">
                              {ex.title}
                            </span>
                            {video?.status === "comingSoon" && (
                              <span className="shrink-0 rounded-full bg-mist px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink/45">
                                Video folgt
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Instruktionsblöcke (z. B. Schutzphase, Spätphasen) */}
                  {status !== "locked" && phase.infoBlocks.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      {phase.infoBlocks.map((info) => {
                        const video = getVideoAsset(info.videoAssetId);
                        const open = openInfo === info.id;
                        return (
                          <div key={info.id} className="overflow-hidden rounded-xl border border-line/70 bg-paper">
                            <button
                              onClick={() => setOpenInfo(open ? null : info.id)}
                              aria-expanded={open}
                              className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left"
                            >
                              <IconPlay className="w-4 h-4 shrink-0 text-accent" />
                              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink/85">
                                {info.title}
                              </span>
                              {video?.status === "comingSoon" && (
                                <span className="shrink-0 rounded-full bg-mist px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink/45">
                                  Video folgt
                                </span>
                              )}
                            </button>
                            {open && (
                              <div className="space-y-4 border-t border-line/70 px-3 py-4">
                                <p className="text-sm leading-relaxed text-ink/70">{info.text}</p>
                                <VideoSlot asset={video} compact />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {status === "locked" && (
                    <p className="mt-2 text-xs text-ink/45">
                      Dieser Abschnitt wird zum passenden Zeitpunkt freigeschaltet.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
