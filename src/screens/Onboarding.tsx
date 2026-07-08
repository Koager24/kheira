import { useState } from "react";
import { protocols, thumbFlexorManchester } from "../data/protocols";
import { LogoFull, LogoMark } from "../components/Logo";
import {
  Card,
  Eyebrow,
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconShield,
  PrimaryButton,
  SecondaryButton,
} from "../components/ui";

interface OnboardingProps {
  onComplete: (opDate: string, protocolId: string) => void;
}

type Step = "willkommen" | "freigabe" | "opdatum" | "schema" | "sicherheit";
const ORDER: Step[] = ["willkommen", "freigabe", "opdatum", "schema", "sicherheit"];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<Step>("willkommen");
  const [opDate, setOpDate] = useState("");
  const [protocolId, setProtocolId] = useState<string | null>(null);
  const [rulesChecked, setRulesChecked] = useState<Record<string, boolean>>({});

  const idx = ORDER.indexOf(step);
  const next = () => setStep(ORDER[Math.min(idx + 1, ORDER.length - 1)]);
  const back = () => setStep(ORDER[Math.max(idx - 1, 0)]);

  const protocol = thumbFlexorManchester;
  const allRulesChecked = protocol.safetyRules.every((r) => rulesChecked[r.id]);

  const todayIso = new Date().toISOString().slice(0, 10);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-8 pt-6">
      {/* Fortschrittsleiste */}
      <div className="mb-8 flex items-center gap-3">
        {idx > 0 ? (
          <button onClick={back} aria-label="Zurück" className="rounded-full p-2 text-ink/60 hover:bg-mist">
            <IconArrowLeft />
          </button>
        ) : (
          <div className="w-9" />
        )}
        <div className="flex flex-1 gap-1.5">
          {ORDER.map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= idx ? "bg-accent" : "bg-line"
              }`}
            />
          ))}
        </div>
        <div className="w-9" />
      </div>

      {step === "willkommen" && (
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <LogoFull />
            <h1 className="mt-10 text-2xl font-bold text-ink">Willkommen bei KHEIRA</h1>
            <p className="mt-3 max-w-xs text-base leading-relaxed text-ink/65">
              Ihre digitale Anleitung für die Nachbehandlung nach einer Handsehnenverletzung –
              klar, sicher und Schritt für Schritt.
            </p>
          </div>
          <PrimaryButton onClick={next}>
            Los geht&rsquo;s <IconArrowRight />
          </PrimaryButton>
        </div>
      )}

      {step === "freigabe" && (
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col justify-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-mist text-accent">
              <IconShield className="w-8 h-8" />
            </div>
            <h1 className="text-center text-2xl font-bold text-ink">Ärztliche Freigabe</h1>
            <Card className="mt-6 p-5" watermark>
              <p className="text-base leading-relaxed text-ink/80">
                Diese Anleitung gilt nur, wenn Ihr Behandlungsteam dieses Schema für Sie
                freigegeben hat.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                KHEIRA ersetzt keine ärztliche oder therapeutische Kontrolle. Bei zunehmenden
                Schmerzen, Schwellung, Taubheit, Wundproblemen oder Unsicherheit kontaktieren Sie
                bitte Ihr Behandlungsteam.
              </p>
            </Card>
          </div>
          <PrimaryButton onClick={next}>
            Mein Behandlungsteam hat das Schema freigegeben <IconArrowRight className="w-5 h-5 shrink-0" />
          </PrimaryButton>
        </div>
      )}

      {step === "opdatum" && (
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col justify-center">
            <Eyebrow>Ihr Startpunkt</Eyebrow>
            <h1 className="mt-2 text-2xl font-bold text-ink">Wann wurden Sie operiert?</h1>
            <p className="mt-2 text-base leading-relaxed text-ink/65">
              Aus dem OP-Datum berechnet KHEIRA Ihren Tag und Ihre Woche nach der Operation –
              und zeigt Ihnen genau die Übungen, die jetzt an der Reihe sind.
            </p>
            <Card className="mt-6 p-5">
              <label htmlFor="op-date" className="text-sm font-semibold text-ink/70">
                OP-Datum
              </label>
              <input
                id="op-date"
                type="date"
                max={todayIso}
                value={opDate}
                onChange={(e) => setOpDate(e.target.value)}
                className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3.5 text-lg font-semibold text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accentSoft"
              />
              <div className="mt-3 flex gap-2">
                {[
                  { label: "Heute", offset: 0 },
                  { label: "Gestern", offset: 1 },
                  { label: "Vorgestern", offset: 2 },
                ].map(({ label, offset }) => (
                  <button
                    key={label}
                    onClick={() => {
                      const d = new Date();
                      d.setDate(d.getDate() - offset);
                      setOpDate(d.toISOString().slice(0, 10));
                    }}
                    className="flex-1 rounded-xl border border-line bg-white px-2 py-2 text-xs font-semibold text-ink/70 transition hover:border-accentSoft"
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-ink/50">
                Das Datum wird nur auf diesem Gerät gespeichert und kann jederzeit in den
                Einstellungen geändert werden.
              </p>
            </Card>
          </div>
          <PrimaryButton onClick={next} disabled={!opDate}>
            Weiter <IconArrowRight />
          </PrimaryButton>
        </div>
      )}

      {step === "schema" && (
        <div className="flex flex-1 flex-col">
          <div className="flex-1">
            <Eyebrow>Ihr Nachbehandlungsschema</Eyebrow>
            <h1 className="mt-2 text-2xl font-bold text-ink">Welches Schema wurde Ihnen verordnet?</h1>
            <div className="mt-6 space-y-3">
              {protocols.map((p) =>
                p.available ? (
                  <button
                    key={p.id}
                    onClick={() => setProtocolId(p.id)}
                    className={`w-full rounded-card border-2 bg-white p-5 text-left shadow-card transition ${
                      protocolId === p.id ? "border-accent" : "border-transparent hover:border-line"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-base font-bold text-ink">{p.name}</p>
                        <p className="mt-0.5 text-sm text-ink/60">{p.subtitle}</p>
                      </div>
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition ${
                          protocolId === p.id
                            ? "border-accent bg-accent text-white"
                            : "border-line text-transparent"
                        }`}
                      >
                        <IconCheck className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                ) : (
                  <div
                    key={p.id}
                    className="w-full rounded-card border border-dashed border-line bg-mist/50 p-5 opacity-70"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-base font-bold text-ink/50">{p.name}</p>
                        <p className="mt-0.5 text-sm text-ink/40">{p.subtitle}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink/40">
                        Demnächst
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <PrimaryButton onClick={next} disabled={!protocolId} className="mt-6">
            Weiter <IconArrowRight />
          </PrimaryButton>
        </div>
      )}

      {step === "sicherheit" && (
        <div className="flex flex-1 flex-col">
          <div className="flex-1">
            <Eyebrow>Zu Ihrer Sicherheit</Eyebrow>
            <h1 className="mt-2 text-2xl font-bold text-ink">Bitte bestätigen Sie die Sicherheitsregeln</h1>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">
              Diese Regeln schützen die genähte Sehne. Sie finden sie jederzeit unter
              „Wichtige Hinweise“.
            </p>
            <div className="mt-5 space-y-2.5">
              {protocol.safetyRules.map((rule) => {
                const checked = !!rulesChecked[rule.id];
                return (
                  <button
                    key={rule.id}
                    onClick={() => setRulesChecked((s) => ({ ...s, [rule.id]: !s[rule.id] }))}
                    className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
                      checked ? "border-accent bg-accent/[0.04]" : "border-line bg-white"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition ${
                        checked ? "border-accent bg-accent text-white" : "border-line text-transparent"
                      }`}
                    >
                      <IconCheck className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-sm leading-relaxed text-ink/85">
                      {rule.text}
                      {rule.untilLabel && (
                        <span className="font-semibold text-ink"> ({rule.untilLabel})</span>
                      )}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <PrimaryButton
              onClick={() => opDate && protocolId && onComplete(opDate, protocolId)}
              disabled={!allRulesChecked}
            >
              Bestätigen und starten <IconArrowRight />
            </PrimaryButton>
            {!allRulesChecked && (
              <SecondaryButton
                onClick={() => {
                  const all: Record<string, boolean> = {};
                  protocol.safetyRules.forEach((r) => (all[r.id] = true));
                  setRulesChecked(all);
                }}
              >
                Alle Regeln gelesen und verstanden
              </SecondaryButton>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-center opacity-40">
        <LogoMark className="w-10" />
      </div>
    </div>
  );
}
