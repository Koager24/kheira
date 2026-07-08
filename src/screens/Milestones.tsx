import { useState } from "react";
import type { BadgeDef } from "../data/badges";
import { BADGES, CATEGORY_LABELS } from "../data/badges";
import { Card, Eyebrow } from "../components/ui";

// ---------------------------------------------------------------------------
// Wappen im KHEIRA-Stil – je Kategorie ein eigenes Motiv, je Stufe eine
// eigene "Metall"-Anmutung im klinischen Farbraum:
//   Stufe 1: Medical Blue hell   Stufe 2: Medical Blue   Stufe 3: Deep Navy + Gold-Akzent
// Motive:
//   Regelmäßigkeit  -> fließende Doppelwelle (der Rhythmus des Übens)
//   Heilungsweg     -> aufsteigender Bogen zur Sonne (die Etappen nach OP)
//   Volle Tage      -> geschlossener Ring über der Welle (ein runder Tag)
// Verdiente Wappen sind farbig mit sanftem Schein, offene zart und ruhig.
// ---------------------------------------------------------------------------

const TIER_COLORS: Record<1 | 2 | 3, { ring: string; motif: string; motifSoft: string; halo: string }> = {
  1: { ring: "#A8C4E5", motif: "#4A7BB5", motifSoft: "#A8C4E5", halo: "#EDF2F8" },
  2: { ring: "#4A7BB5", motif: "#26436B", motifSoft: "#4A7BB5", halo: "#DCE7F4" },
  3: { ring: "#0A1F3C", motif: "#0A1F3C", motifSoft: "#B9974A", halo: "#F2E8D5" },
};

const LOCKED = { ring: "#D5DBE4", motif: "#C0C8D4", motifSoft: "#D5DBE4", halo: "#F3F5F8" };

export function BadgeShield({
  tier,
  category,
  earned,
  label,
  className = "",
}: {
  tier: 1 | 2 | 3;
  category: BadgeDef["category"];
  earned: boolean;
  label?: string;
  className?: string;
}) {
  const c = earned ? TIER_COLORS[tier] : LOCKED;
  const gid = `bs-${category}-${tier}-${earned ? "e" : "l"}`;
  // Optionales Premium-Emblem aus public/badges/<kategorie>.png; bei 404 SVG-Motiv.
  const [artOk, setArtOk] = useState(true);
  const artSrc = `${import.meta.env.BASE_URL}badges/${category}.png`;

  return (
    <svg viewBox="0 0 96 108" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${gid}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={c.halo} />
        </linearGradient>
      </defs>

      {/* sanfter Schein hinter verdienten Wappen */}
      {earned && <ellipse cx="48" cy="56" rx="42" ry="46" fill={c.halo} opacity="0.55" />}

      {/* Schild: weiche, moderne Form */}
      <path
        d="M48 6 C 60 10, 74 13, 82 14 C 84 40, 82 62, 72 76 C 64 87, 55 95, 48 100 C 41 95, 32 87, 24 76 C 14 62, 12 40, 14 14 C 22 13, 36 10, 48 6 Z"
        fill={`url(#${gid}-fill)`}
        stroke={c.ring}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* innere Linie – ab Stufe 2 */}
      {tier >= 2 && (
        <path
          d="M48 14 C 57 17, 68 19.5, 74.5 20.5 C 76 42, 74 59, 66 70.5 C 59.5 79.5, 53 86, 48 90 C 43 86, 36.5 79.5, 30 70.5 C 22 59, 20 42, 21.5 20.5 C 28 19.5, 39 17, 48 14 Z"
          stroke={c.ring}
          strokeWidth="1.2"
          opacity="0.55"
          fill="none"
        />
      )}
      {/* Stufe-2-Zier: kleine Punkte an den Schultern */}
      {tier === 2 && earned && (
        <g fill={c.motifSoft}>
          <circle cx="22" cy="22" r="2" />
          <circle cx="74" cy="22" r="2" />
        </g>
      )}

      {/* Optionales Bild-Emblem */}
      {artOk && (
        <>
          <clipPath id={`${gid}-clip`}>
            <circle cx="48" cy="46" r="21" />
          </clipPath>
          <image
            href={artSrc}
            x="27"
            y="25"
            width="42"
            height="42"
            clipPath={`url(#${gid}-clip)`}
            preserveAspectRatio="xMidYMid slice"
            opacity={earned ? 1 : 0.35}
            onError={() => setArtOk(false)}
            style={earned ? undefined : { filter: "grayscale(1)" }}
          />
        </>
      )}

      {/* Motiv je Kategorie (leicht angehoben, Platz für das Wappenband) */}
      {!artOk && category === "konsistenz" && (
        <g transform="translate(0,-4)">
          <path d="M26 50 C 34 43, 44 55, 54 48 S 66 44, 70 47" stroke={c.motif} strokeWidth="3.4" strokeLinecap="round" fill="none" />
          <path d="M26 61 C 36 54, 46 66, 56 59 S 66 55, 70 58" stroke={c.motifSoft} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
          {tier >= 2 && <path d="M30 71 C 38 66, 48 74, 58 69 S 64 67, 66 68.5" stroke={c.motif} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.45" />}
          <circle cx="48" cy="31" r="3.4" fill={c.motifSoft} />
        </g>
      )}

      {!artOk && category === "heilungsweg" && (
        <g transform="translate(0,-4)">
          {/* aufsteigender Weg */}
          <path d="M25 72 C 36 70, 44 62, 51 52 C 57 44, 62 38, 69 34" stroke={c.motif} strokeWidth="3.4" strokeLinecap="round" fill="none" />
          {/* Etappenpunkte */}
          <circle cx="30" cy="70.5" r="2.6" fill={c.motifSoft} />
          <circle cx="48" cy="55.5" r="2.6" fill={c.motifSoft} />
          {/* Sonne am Ziel */}
          <circle cx="69" cy="33" r="5.5" fill="none" stroke={c.motifSoft} strokeWidth="2.6" />
          {tier >= 3 && <circle cx="69" cy="33" r="2" fill={c.motifSoft} />}
        </g>
      )}

      {!artOk && category === "volle-tage" && (
        <g transform="translate(0,-4)">
          {/* geschlossener Ring – der runde Tag */}
          <circle cx="48" cy="45" r="15" fill="none" stroke={c.motif} strokeWidth="3.4" strokeLinecap="round" />
          {tier >= 2 && (
            <path d="M41.5 45.5 l4.5 4.5 l9 -9.5" stroke={c.motif} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          )}
          <path d="M28 71 C 36 65, 46 74, 56 68 S 66 64, 68 66" stroke={c.motifSoft} strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      )}

      {/* Wappenband mit Kurzwert */}
      {label && (
        <g>
          <rect x="26" y="72" width="44" height="16" rx="8" fill={earned ? c.motif : "#E7EBF1"} />
          <text
            x="48"
            y="83.5"
            textAnchor="middle"
            fontFamily="Manrope, system-ui, sans-serif"
            fontSize="10.5"
            fontWeight="800"
            letterSpacing="0.04em"
            fill={earned ? "#FFFFFF" : "#9AA5B4"}
          >
            {label}
          </text>
        </g>
      )}

      {/* Stufe-3-Auszeichnung: Goldrand, Lorbeer und Stern an der Spitze */}
      {tier >= 3 && earned && (
        <g>
          <path
            d="M48 6 C 60 10, 74 13, 82 14 C 84 40, 82 62, 72 76 C 64 87, 55 95, 48 100 C 41 95, 32 87, 24 76 C 14 62, 12 40, 14 14 C 22 13, 36 10, 48 6 Z"
            stroke={c.motifSoft}
            strokeWidth="1.4"
            opacity="0.9"
            fill="none"
            transform="translate(0,0) scale(1)"
          />
          <g stroke={c.motifSoft} strokeWidth="2.2" strokeLinecap="round" fill="none">
            <path d="M23 78 C 27 84, 33 89, 40 92" />
            <path d="M73 78 C 69 84, 63 89, 56 92" />
          </g>
          <path d="M48 1.5 l2 4.2 4.4 0.7 -3.2 3.2 0.8 4.4 -4 -2.1 -4 2.1 0.8 -4.4 -3.2 -3.2 4.4 -0.7 Z" fill={c.motifSoft} />
        </g>
      )}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Meilenstein-Übersicht
// ---------------------------------------------------------------------------

export function Milestones({ earned }: { earned: Record<string, string> }) {
  const earnedCount = BADGES.filter((b) => earned[b.id]).length;
  const categories: BadgeDef["category"][] = ["konsistenz", "heilungsweg", "volle-tage"];

  return (
    <div>
      <Eyebrow>
        {earnedCount} von {BADGES.length} erreicht
      </Eyebrow>
      <h1 className="mt-1.5 text-[26px] font-bold leading-tight text-ink">Ihre Meilensteine</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink/60">
        Hier zählt Regelmäßigkeit, nicht Menge: Ein Tag ist „aktiv“, sobald Sie einen Durchgang
        dokumentieren – mehr bringt keinen Vorteil. Erreichte Meilensteine bleiben erhalten,
        auch wenn Sie einmal pausieren müssen.
      </p>

      {categories.map((cat) => (
        <div key={cat} className="mt-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/45">
            {CATEGORY_LABELS[cat]}
          </p>
          <Card className="mt-2.5 p-4">
            <div className="grid grid-cols-3 gap-x-2 gap-y-6">
              {BADGES.filter((b) => b.category === cat).map((b) => {
                const at = earned[b.id];
                return (
                  <div key={b.id} className="flex flex-col items-center text-center">
                    <BadgeShield tier={b.tier} category={b.category} earned={!!at} label={b.label} className="w-[72px]" />
                    <p className={`mt-1 text-xs font-bold leading-tight ${at ? "text-ink" : "text-ink/40"}`}>
                      {b.title}
                    </p>
                    {at ? (
                      <p className="mt-0.5 text-[10px] font-semibold text-ink/45">
                        {new Date(at).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}
                      </p>
                    ) : (
                      <p className="mt-0.5 text-[10px] leading-tight text-ink/35">{b.description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      ))}

      <p className="mt-6 px-2 text-center text-xs leading-relaxed text-ink/45">
        Wichtig: Üben Sie weiterhin nur im freigegebenen Rahmen – nie mit Gewalt, nicht gegen
        Schmerz oder Widerstand. Meilensteine belohnen Ihre Beständigkeit, nicht zusätzliche
        Wiederholungen.
      </p>
    </div>
  );
}
