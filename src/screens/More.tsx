import { useState } from "react";
import type { TherapyProtocol } from "../data/types";
import { formatGermanDate } from "../lib/state";
import { navigate } from "../lib/router";
import {
  Card,
  Eyebrow,
  IconCheck,
  IconShield,
  IconWarning,
  PrimaryButton,
  SecondaryButton,
} from "../components/ui";

// ---------------------------------------------------------------------------
// Wichtige Hinweise / Sicherheitsregeln
// ---------------------------------------------------------------------------

export function Safety({ protocol }: { protocol: TherapyProtocol }) {
  return (
    <div>
      <Eyebrow>Zu Ihrer Sicherheit</Eyebrow>
      <h1 className="mt-1.5 text-[26px] font-bold leading-tight text-ink">Wichtige Hinweise</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink/60">
        Diese Regeln schützen die genähte Sehne während der gesamten Nachbehandlung.
      </p>

      <div className="mt-6 space-y-3">
        {protocol.safetyRules.map((rule) => (
          <Card key={rule.id} className="p-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-warn/10 text-warn">
                <IconShield className="w-[18px] h-[18px]" />
              </span>
              <div>
                <p className="text-sm leading-relaxed text-ink/85">{rule.text}</p>
                {rule.untilLabel && (
                  <span className="mt-2 inline-block rounded-full bg-mist px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink/55">
                    {rule.untilLabel}
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-5 border-accentSoft/60 bg-mist/40 p-5">
        <p className="text-sm leading-relaxed text-ink/75">{protocol.disclaimer}</p>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Einstellungen
// ---------------------------------------------------------------------------

export function Settings({
  protocol,
  opDate,
  onChangeOpDate,
  onReset,
}: {
  protocol: TherapyProtocol;
  opDate: string;
  onChangeOpDate: (iso: string) => void;
  onReset: () => void;
}) {
  const [draft, setDraft] = useState(opDate);
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const todayIso = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <Eyebrow>Ihre App</Eyebrow>
      <h1 className="mt-1.5 text-[26px] font-bold leading-tight text-ink">Einstellungen</h1>

      <Card className="mt-6 p-5">
        <p className="text-sm font-bold text-ink">OP-Datum</p>
        <p className="mt-1 text-xs leading-relaxed text-ink/55">
          Aktuell: {formatGermanDate(opDate)}. Das Datum wird nur auf diesem Gerät gespeichert.
        </p>
        <input
          type="date"
          max={todayIso}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="mt-3 w-full rounded-xl border border-line bg-paper px-4 py-3.5 text-base font-semibold text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accentSoft"
          aria-label="OP-Datum ändern"
        />
        <PrimaryButton
          className="mt-3"
          disabled={!draft || draft === opDate}
          onClick={() => {
            onChangeOpDate(draft);
            setSaved(true);
            setTimeout(() => setSaved(false), 1600);
          }}
        >
          {saved ? (
            <>
              <IconCheck /> Gespeichert
            </>
          ) : (
            "Datum speichern"
          )}
        </PrimaryButton>
      </Card>

      <Card className="mt-4 p-5">
        <p className="text-sm font-bold text-ink">Ihr Schema</p>
        <p className="mt-1 text-sm text-ink/65">
          {protocol.name} – {protocol.subtitle}
        </p>
        <SecondaryButton className="mt-3" onClick={() => navigate("/hinweise")}>
          Wichtige Hinweise ansehen
        </SecondaryButton>
      </Card>

      <Card className="mt-4 border-danger/20 p-5">
        <div className="flex items-start gap-3">
          <IconWarning className="mt-0.5 w-5 h-5 shrink-0 text-danger" />
          <div className="flex-1">
            <p className="text-sm font-bold text-ink">App zurücksetzen</p>
            <p className="mt-1 text-xs leading-relaxed text-ink/55">
              Löscht OP-Datum, Schema-Auswahl und alle Übungs-Häkchen auf diesem Gerät.
            </p>
            {!confirmReset ? (
              <SecondaryButton className="mt-3" onClick={() => setConfirmReset(true)}>
                Zurücksetzen …
              </SecondaryButton>
            ) : (
              <div className="mt-3 space-y-2">
                <button
                  onClick={onReset}
                  className="w-full rounded-2xl bg-danger px-6 py-3.5 text-base font-semibold text-white transition active:scale-[0.98]"
                >
                  Ja, alles löschen
                </button>
                <SecondaryButton onClick={() => setConfirmReset(false)}>Abbrechen</SecondaryButton>
              </div>
            )}
          </div>
        </div>
      </Card>

      <p className="mt-8 px-2 text-center text-xs leading-relaxed text-ink/45">{protocol.disclaimer}</p>
      <p className="mt-4 text-center text-[11px] font-semibold tracking-wide text-ink/35">
        KHEIRA · entwickelt von Dr. med. Christoph Wallner
      </p>
    </div>
  );
}
