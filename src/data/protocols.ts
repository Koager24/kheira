import type { TherapyProtocol, VideoAsset } from "./types";

// ---------------------------------------------------------------------------
// Video-Assets
// ---------------------------------------------------------------------------
// Sobald ein echtes Video vorliegt:
//   1. Datei (MP4/WebM, 9:16) nach /public/videos/ kopieren,
//   2. hier status auf "available" setzen und src MIT führendem Slash eintragen,
//      z. B. src: "/videos/daumen-passive-beugung.mp4".
//      (Der führende Slash stellt sicher, dass der Pfad von jeder Route aus
//      an der Domain-Wurzel aufgelöst wird.)
// Optional ein Posterbild unter poster angeben, z. B. "/videos/FPL1.jpg".
// ---------------------------------------------------------------------------

export const videoAssets: VideoAsset[] = [
  {
    id: "vid-daumen-schutzphase",
    title: "Schutzphase und Hochlagerung",
    protocolId: "daumen-manchester",
    phaseId: "phase-0",
    exerciseId: null,
    aspectRatio: "9:16",
    status: "comingSoon",
    src: null,
    poster: null,
    description: "Hochlagerung der Hand und Verhalten in den ersten Tagen nach der Operation.",
  },
  {
    id: "vid-daumen-passive-beugung",
    title: "Passive Beugung des Daumens",
    protocolId: "daumen-manchester",
    phaseId: "phase-1",
    exerciseId: "ex-passive-beugung",
    aspectRatio: "9:16",
    status: "available",
    src: "/videos/FPL1.mp4",
    poster: null,
    description: "Vorsichtiges passives Einrollen des Daumens mit der unverletzten Hand.",
  },
  {
    id: "vid-daumen-aktive-beugung-w1",
    title: "Aktive Beugung – Woche 1",
    protocolId: "daumen-manchester",
    phaseId: "phase-1",
    exerciseId: "ex-aktive-beugung-w1",
    aspectRatio: "9:16",
    status: "comingSoon",
    src: null,
    poster: null,
    description: "Aktives Einrollen des Daumens mit drei Fingern der unverletzten Hand in der Handinnenfläche.",
  },
  {
    id: "vid-daumen-aktive-streckung",
    title: "Aktive Streckung des Daumens",
    protocolId: "daumen-manchester",
    phaseId: "phase-1",
    exerciseId: "ex-aktive-streckung",
    aspectRatio: "9:16",
    status: "comingSoon",
    src: null,
    poster: null,
    description: "Aktive Streckung des Daumens bis zum Schienendach.",
  },
  {
    id: "vid-daumen-aktive-beugung-w2",
    title: "Aktive Beugung – Woche 2",
    protocolId: "daumen-manchester",
    phaseId: "phase-2",
    exerciseId: "ex-aktive-beugung-w2",
    aspectRatio: "9:16",
    status: "comingSoon",
    src: null,
    poster: null,
    description: "Aktives Einrollen mit zwei Fingern der unverletzten Hand in der Handinnenfläche.",
  },
  {
    id: "vid-daumen-aktive-beugung-w3",
    title: "Aktive Beugung – Woche 3",
    protocolId: "daumen-manchester",
    phaseId: "phase-3",
    exerciseId: "ex-aktive-beugung-w3",
    aspectRatio: "9:16",
    status: "comingSoon",
    src: null,
    poster: null,
    description: "Aktives Einrollen mit dem Zeigefinger der unverletzten Hand in der Handinnenfläche.",
  },
  {
    id: "vid-daumen-aktive-beugung-w4",
    title: "Aktive Beugung – ab Woche 4",
    protocolId: "daumen-manchester",
    phaseId: "phase-4",
    exerciseId: "ex-aktive-beugung-w4",
    aspectRatio: "9:16",
    status: "comingSoon",
    src: null,
    poster: null,
    description: "Freies aktives Einrollen des Daumens ohne Hilfsfinger.",
  },
  {
    id: "vid-daumen-aktive-streckung-w4",
    title: "Aktive Streckung – Fortsetzung",
    protocolId: "daumen-manchester",
    phaseId: "phase-4",
    exerciseId: "ex-aktive-streckung-w4",
    aspectRatio: "9:16",
    status: "comingSoon",
    src: null,
    poster: null,
    description: "Fortgesetzte aktive Streckung bis zum Schienendach.",
  },
  {
    id: "vid-daumen-passive-mobilisation",
    title: "Passive Mobilisation",
    protocolId: "daumen-manchester",
    phaseId: "phase-5",
    exerciseId: null,
    aspectRatio: "9:16",
    status: "comingSoon",
    src: null,
    poster: null,
    description: "Sanfte passive Mobilisation nach Reduktion der Schiene.",
  },
  {
    id: "vid-daumen-kontrollierte-bewegung",
    title: "Kontrollierte aktive Bewegung",
    protocolId: "daumen-manchester",
    phaseId: "phase-5",
    exerciseId: null,
    aspectRatio: "9:16",
    status: "comingSoon",
    src: null,
    poster: null,
    description: "Kontrollierte aktive Bewegung ohne Widerstand in Beugerichtung.",
  },
  {
    id: "vid-daumen-verbote",
    title: "Was weiterhin verboten ist",
    protocolId: "daumen-manchester",
    phaseId: "phase-5",
    exerciseId: null,
    aspectRatio: "9:16",
    status: "comingSoon",
    src: null,
    poster: null,
    description: "Überblick über weiterhin verbotene Belastungen bis Woche 10.",
  },
  {
    id: "vid-daumen-belastungsaufbau",
    title: "Belastungsaufbau",
    protocolId: "daumen-manchester",
    phaseId: "phase-6",
    exerciseId: null,
    aspectRatio: "9:16",
    status: "comingSoon",
    src: null,
    poster: null,
    description: "Langsamer Belastungsaufbau in Beugerichtung ab Woche 8.",
  },
  {
    id: "vid-daumen-alltagseinsatz",
    title: "Alltagseinsatz",
    protocolId: "daumen-manchester",
    phaseId: "phase-6",
    exerciseId: null,
    aspectRatio: "9:16",
    status: "comingSoon",
    src: null,
    poster: null,
    description: "Schrittweise Steigerung des Handeinsatzes im Alltag.",
  },
  {
    id: "vid-daumen-blocking",
    title: "Blocking Exercise – Erklärung",
    protocolId: "daumen-manchester",
    phaseId: "phase-6",
    exerciseId: null,
    aspectRatio: "9:16",
    status: "comingSoon",
    src: null,
    poster: null,
    description: "Erklärung dosierter Blocking Exercises – nur nach Freigabe durch das Behandlungsteam.",
  },
  {
    id: "vid-daumen-rueckkehr",
    title: "Rückkehr zur Belastung",
    protocolId: "daumen-manchester",
    phaseId: "phase-7",
    exerciseId: null,
    aspectRatio: "9:16",
    status: "comingSoon",
    src: null,
    poster: null,
    description: "Rückkehr zu Arbeit, Sport und voller Belastung nach klinischer Freigabe.",
  },
];

export function getVideoAsset(id: string | null): VideoAsset | null {
  if (!id) return null;
  return videoAssets.find((v) => v.id === id) ?? null;
}

// ---------------------------------------------------------------------------
// Wiederkehrende Sicherheitsformulierungen
// ---------------------------------------------------------------------------

const NO_FORCE =
  "Keine Gewalt. Nicht gegen Schmerz, Blockade oder Widerstand üben. Bei Problemen wenden Sie sich an Ihr Behandlungsteam.";

const HOURLY = "Tagsüber stündlich, wenn Sie wach sind";

// ---------------------------------------------------------------------------
// Protokoll: Beugesehne Daumen – modifiziertes Manchester-Schema (MVP)
// ---------------------------------------------------------------------------

export const thumbFlexorManchester: TherapyProtocol = {
  id: "daumen-manchester",
  name: "Beugesehne Daumen",
  subtitle: "Modifiziertes Manchester-Schema",
  available: true,
  disclaimer:
    "KHEIRA unterstützt Sie bei der Durchführung der von Ihrem Behandlungsteam freigegebenen Übungen. Die Anwendung ersetzt keine ärztliche oder therapeutische Kontrolle. Führen Sie Übungen nicht gegen Schmerz, Widerstand oder Blockade aus. Bei zunehmenden Schmerzen, Schwellung, Taubheit, Wundproblemen oder Unsicherheit kontaktieren Sie bitte Ihr Behandlungsteam.",
  safetyRules: [
    { id: "sr-hochhalten", text: "Halten Sie die Hand möglichst hoch – besonders in der Frühphase. Die Hand sollte oberhalb des Herzens sein." },
    { id: "sr-keine-gewalt", text: "Führen Sie Übungen nie mit Gewalt aus." },
    { id: "sr-kein-schmerz", text: "Üben Sie nicht gegen Schmerz, Blockade oder Widerstand." },
    {
      id: "sr-verbote",
      text: "Verboten sind: festes Zugreifen, schweres Tragen, Abstützen mit der betroffenen Hand, Auto-, Fahrrad- oder Motorradfahren sowie Sportarten mit Handbelastung.",
      untilLabel: "bis Ende Woche 10",
    },
    { id: "sr-frequenz", text: "Führen Sie die Übungen tagsüber stündlich durch, jeweils 10 Wiederholungen – sofern von Ihrem Behandlungsteam so freigegeben." },
    { id: "sr-schiene", text: "Sichern Sie Finger und Daumen nachts oder außerhalb der Übungszeiten gemäß der Schienenanweisung." },
  ],
  phases: [
    {
      id: "phase-0",
      index: 0,
      title: "Schutzphase",
      rangeLabel: "OP bis Tag 2–3",
      startDay: 0,
      endDay: 2,
      focus:
        "Ihre Hand ist durch Schiene oder Gips geschützt. In dieser Phase gibt es keine eigenständigen Übungen, außer Ihr Behandlungsteam hat sie ausdrücklich erlaubt. Halten Sie die Hand hoch und schonen Sie sie.",
      informationalOnly: true,
      exercises: [],
      infoBlocks: [
        {
          id: "info-schutzphase",
          title: "Schutzphase und Hochlagerung",
          text: "Die Hand bleibt in der angelegten Schiene oder im Gips. Lagern Sie die Hand hoch: im Stehen auf der Schulter, im Sitzen mit dem Ellenbogen auf dem Tisch aufgestellt, im Liegen auf einem dicken Kissen.",
          videoAssetId: "vid-daumen-schutzphase",
        },
      ],
    },
    {
      id: "phase-1",
      index: 1,
      title: "Frühe Mobilisation",
      rangeLabel: "Tag 2–3 bis Ende Woche 1",
      startDay: 2,
      endDay: 7,
      focus:
        "Sanfte erste Bewegungen in der Schiene: passive Beugung, vorsichtige aktive Beugung mit Unterstützung und aktive Streckung bis zum Schienendach.",
      informationalOnly: false,
      exercises: [
        {
          id: "ex-passive-beugung",
          title: "Passive Beugung",
          shortSummary: "Der Daumen wird vorsichtig mit der unverletzten Hand eingerollt – ohne eigene Kraft.",
          steps: [
            { text: "Ausgangsstellung: Der Fingerhaltegurt liegt am Grundglied des Daumens an." },
            { text: "Lassen Sie das Handgelenk so weit gestreckt nach hinten fallen, wie es die Schiene zulässt." },
            { text: "Lassen Sie die Finger locker hängen." },
            { text: "Rollen Sie den Daumen mit der unverletzten Hand vorsichtig passiv ein." },
            { text: "Lassen Sie den Daumen anschließend wieder locker in die Ausgangsstellung zurückkehren." },
          ],
          repetitions: 10,
          frequency: HOURLY,
          safetyNote: NO_FORCE,
          videoAssetId: "vid-daumen-passive-beugung",
        },
        {
          id: "ex-aktive-beugung-w1",
          title: "Aktive Beugung – Woche 1",
          shortSummary: "Der Daumen beugt sich aus eigener Kraft bis zu den aufgelegten Fingern der unverletzten Hand.",
          steps: [
            { text: "Ausgangsstellung wie bei der passiven Beugung: Gurt am Grundglied, Handgelenk nach hinten fallen lassen, Finger locker." },
            { text: "Legen Sie Zeige-, Mittel- und Ringfinger der unverletzten Hand in die Handinnenfläche der verletzten Hand." },
            { text: "Der Kleinfinger der verletzten Hand liegt dabei zwischen Klein- und Ringfinger der unverletzten Hand." },
            { text: "Rollen Sie den Daumen der verletzten Hand vorsichtig aus eigener Kraft bis zum obersten in der Handfläche liegenden Finger ein." },
            { text: "Nur die Daumenspitze soll aufliegen." },
            { text: "Strecken Sie den Daumen danach wieder locker." },
          ],
          repetitions: 10,
          frequency: HOURLY,
          safetyNote: NO_FORCE,
          videoAssetId: "vid-daumen-aktive-beugung-w1",
        },
        {
          id: "ex-aktive-streckung",
          title: "Aktive Streckung",
          shortSummary: "Der Daumen streckt sich aus eigener Kraft bis zum Schienendach.",
          steps: [
            { text: "Ausgangsstellung: Anders als bei der Beugung lassen Sie das Handgelenk nun locker handinnenflächenwärts hängen." },
            { text: "Strecken Sie den Daumen aktiv bis zum Schienendach – so weit, wie es die Schiene zulässt." },
            { text: "Lassen Sie den Daumen anschließend wieder locker sinken." },
          ],
          repetitions: 10,
          frequency: HOURLY,
          safetyNote: NO_FORCE,
          videoAssetId: "vid-daumen-aktive-streckung",
        },
      ],
      infoBlocks: [],
    },
    {
      id: "phase-2",
      index: 2,
      title: "Steigerung – Woche 2",
      rangeLabel: "Woche 2",
      startDay: 8,
      endDay: 14,
      focus:
        "Die aktive Beugung wird gesteigert: Nur noch zwei Finger der unverletzten Hand liegen in der Handinnenfläche. Passive Beugung und aktive Streckung werden fortgeführt.",
      informationalOnly: false,
      exercises: [
        {
          id: "ex-passive-beugung-w2",
          title: "Passive Beugung",
          shortSummary: "Wie in Woche 1: vorsichtiges passives Einrollen des Daumens mit der unverletzten Hand.",
          steps: [
            { text: "Ausgangsstellung: Gurt am Grundglied, Handgelenk nach hinten fallen lassen, Finger locker hängen lassen." },
            { text: "Rollen Sie den Daumen mit der unverletzten Hand vorsichtig passiv ein." },
            { text: "Lassen Sie den Daumen wieder locker zurückkehren." },
          ],
          repetitions: 10,
          frequency: HOURLY,
          safetyNote: NO_FORCE,
          videoAssetId: "vid-daumen-passive-beugung",
        },
        {
          id: "ex-aktive-beugung-w2",
          title: "Aktive Beugung – Woche 2",
          shortSummary: "Wie Woche 1, jedoch nur noch mit Zeige- und Mittelfinger in der Handinnenfläche.",
          steps: [
            { text: "Ausgangsstellung wie in Woche 1: Gurt am Grundglied, Handgelenk nach hinten fallen lassen, Finger locker." },
            { text: "Legen Sie nur noch Zeige- und Mittelfinger der unverletzten Hand in die Handinnenfläche der verletzten Hand." },
            { text: "Der Kleinfinger der verletzten Hand liegt zwischen Mittel- und Ringfinger der unverletzten Hand." },
            { text: "Rollen Sie den Daumen vorsichtig aktiv bis zum obersten Finger ein – nur die Daumenspitze soll aufliegen." },
            { text: "Strecken Sie den Daumen danach wieder locker." },
          ],
          repetitions: 10,
          frequency: HOURLY,
          safetyNote: NO_FORCE,
          videoAssetId: "vid-daumen-aktive-beugung-w2",
        },
        {
          id: "ex-aktive-streckung-w2",
          title: "Aktive Streckung",
          shortSummary: "Fortsetzung der aktiven Streckung bis zum Schienendach.",
          steps: [
            { text: "Lassen Sie das Handgelenk locker handinnenflächenwärts hängen." },
            { text: "Strecken Sie den Daumen aktiv bis zum Schienendach." },
            { text: "Lassen Sie den Daumen wieder locker sinken." },
          ],
          repetitions: 10,
          frequency: HOURLY,
          safetyNote: NO_FORCE,
          videoAssetId: "vid-daumen-aktive-streckung",
        },
      ],
      infoBlocks: [],
    },
    {
      id: "phase-3",
      index: 3,
      title: "Steigerung – Woche 3",
      rangeLabel: "Woche 3",
      startDay: 15,
      endDay: 21,
      focus:
        "Weitere Steigerung: Nur noch der Zeigefinger der unverletzten Hand liegt in der Handinnenfläche. Passive Beugung und aktive Streckung laufen weiter.",
      informationalOnly: false,
      exercises: [
        {
          id: "ex-passive-beugung-w3",
          title: "Passive Beugung",
          shortSummary: "Vorsichtiges passives Einrollen des Daumens mit der unverletzten Hand.",
          steps: [
            { text: "Ausgangsstellung: Gurt am Grundglied, Handgelenk nach hinten fallen lassen, Finger locker hängen lassen." },
            { text: "Rollen Sie den Daumen mit der unverletzten Hand vorsichtig passiv ein." },
            { text: "Lassen Sie den Daumen wieder locker zurückkehren." },
          ],
          repetitions: 10,
          frequency: HOURLY,
          safetyNote: NO_FORCE,
          videoAssetId: "vid-daumen-passive-beugung",
        },
        {
          id: "ex-aktive-beugung-w3",
          title: "Aktive Beugung – Woche 3",
          shortSummary: "Wie Woche 1 und 2, jedoch nur noch mit dem Zeigefinger in der Handinnenfläche.",
          steps: [
            { text: "Ausgangsstellung wie in den Vorwochen: Gurt am Grundglied, Handgelenk nach hinten fallen lassen, Finger locker." },
            { text: "Legen Sie nur noch den Zeigefinger der unverletzten Hand in die Handinnenfläche der verletzten Hand." },
            { text: "Der Kleinfinger der verletzten Hand liegt zwischen Zeige- und Mittelfinger der unverletzten Hand." },
            { text: "Rollen Sie den Daumen vorsichtig aktiv bis zum obersten Finger ein – nur die Daumenspitze soll aufliegen." },
            { text: "Strecken Sie den Daumen danach wieder locker." },
          ],
          repetitions: 10,
          frequency: HOURLY,
          safetyNote: NO_FORCE,
          videoAssetId: "vid-daumen-aktive-beugung-w3",
        },
        {
          id: "ex-aktive-streckung-w3",
          title: "Aktive Streckung",
          shortSummary: "Fortsetzung der aktiven Streckung bis zum Schienendach.",
          steps: [
            { text: "Lassen Sie das Handgelenk locker handinnenflächenwärts hängen." },
            { text: "Strecken Sie den Daumen aktiv bis zum Schienendach." },
            { text: "Lassen Sie den Daumen wieder locker sinken." },
          ],
          repetitions: 10,
          frequency: HOURLY,
          safetyNote: NO_FORCE,
          videoAssetId: "vid-daumen-aktive-streckung",
        },
      ],
      infoBlocks: [],
    },
    {
      id: "phase-4",
      index: 4,
      title: "Freie aktive Beugung",
      rangeLabel: "Woche 4 bis Ende Woche 6",
      startDay: 22,
      endDay: 42,
      focus:
        "Der Daumen wird nun ohne Hilfsfinger aus eigener Kraft so weit wie möglich eingerollt. Die aktive Streckung bis zum Schienendach wird fortgesetzt.",
      informationalOnly: false,
      exercises: [
        {
          id: "ex-aktive-beugung-w4",
          title: "Aktive Beugung – ab Woche 4",
          shortSummary: "Freies aktives Einrollen des Daumens ohne Finger der unverletzten Hand in der Handinnenfläche.",
          steps: [
            { text: "Ausgangsstellung: Gurt am Grundglied, Handgelenk nach hinten fallen lassen, Finger locker." },
            { text: "Es liegt kein Finger der unverletzten Hand mehr in der Handinnenfläche." },
            { text: "Rollen Sie den Daumen vorsichtig aus eigener Kraft so weit wie möglich ein." },
            { text: "Strecken Sie den Daumen danach wieder locker." },
          ],
          repetitions: 10,
          frequency: HOURLY,
          safetyNote: NO_FORCE,
          videoAssetId: "vid-daumen-aktive-beugung-w4",
        },
        {
          id: "ex-aktive-streckung-w4",
          title: "Aktive Streckung – Fortsetzung",
          shortSummary: "Aktive Streckung bis zum Schienendach, wie in den Vorwochen.",
          steps: [
            { text: "Lassen Sie das Handgelenk locker handinnenflächenwärts hängen." },
            { text: "Strecken Sie den Daumen aktiv bis zum Schienendach." },
            { text: "Lassen Sie den Daumen wieder locker sinken." },
          ],
          repetitions: 10,
          frequency: HOURLY,
          safetyNote: NO_FORCE,
          videoAssetId: "vid-daumen-aktive-streckung-w4",
        },
      ],
      infoBlocks: [],
    },
    {
      id: "phase-5",
      index: 5,
      title: "Übergang ohne Schiene",
      rangeLabel: "Ende Woche 6 bis Ende Woche 8",
      startDay: 43,
      endDay: 56,
      focus:
        "Die Schiene wird nach Anweisung Ihres Behandlungsteams entfernt oder reduziert. Passive Mobilisation und kontrollierte aktive Bewegung – noch ohne Widerstand in Beugerichtung.",
      informationalOnly: true,
      exercises: [],
      infoBlocks: [
        {
          id: "info-passive-mobilisation",
          title: "Passive Mobilisation",
          text: "Sanfte passive Bewegungen des Daumens, wie sie Ihnen Ihr Behandlungsteam gezeigt hat. Weiterhin ohne Gewalt und nicht gegen Schmerz oder Widerstand.",
          videoAssetId: "vid-daumen-passive-mobilisation",
        },
        {
          id: "info-kontrollierte-bewegung",
          title: "Kontrollierte aktive Bewegung",
          text: "Kontrollierte aktive Bewegungen im Alltag – noch ohne Widerstand in Beugerichtung.",
          videoAssetId: "vid-daumen-kontrollierte-bewegung",
        },
        {
          id: "info-verbote",
          title: "Was weiterhin verboten ist",
          text: "Bis Ende Woche 10 weiterhin verboten: forcierte Streckung und Überstreckung, Abstützen, Auto-, Fahrrad- und Motorradfahren sowie schweres Tragen.",
          videoAssetId: "vid-daumen-verbote",
        },
      ],
    },
    {
      id: "phase-6",
      index: 6,
      title: "Belastungsaufbau",
      rangeLabel: "Ende Woche 8 bis Ende Woche 12",
      startDay: 57,
      endDay: 84,
      focus:
        "Die Sehne wird zunehmend belastungsstabil. Der Belastungsaufbau in Beugerichtung und der Handeinsatz im Alltag werden langsam gesteigert. Dosierte Blocking Exercises nur nach Freigabe durch das Behandlungsteam.",
      informationalOnly: true,
      exercises: [],
      infoBlocks: [
        {
          id: "info-belastungsaufbau",
          title: "Belastungsaufbau",
          text: "Langsamer, dosierter Aufbau der Belastung in Beugerichtung – in Abstimmung mit Ihrem Behandlungsteam.",
          videoAssetId: "vid-daumen-belastungsaufbau",
        },
        {
          id: "info-alltagseinsatz",
          title: "Alltagseinsatz",
          text: "Steigern Sie den Einsatz der Hand im Alltag schrittweise. Vermeiden Sie weiterhin plötzliche oder schwere Belastungen.",
          videoAssetId: "vid-daumen-alltagseinsatz",
        },
        {
          id: "info-blocking",
          title: "Blocking Exercise – Erklärung",
          text: "Dosierte Blocking Exercises sind nur nach ausdrücklicher Freigabe durch Ihr Behandlungsteam erlaubt und werden langsam gesteigert.",
          videoAssetId: "vid-daumen-blocking",
        },
      ],
    },
    {
      id: "phase-7",
      index: 7,
      title: "Rückkehr zur Belastung",
      rangeLabel: "Ab Ende Woche 12",
      startDay: 85,
      endDay: null,
      focus:
        "Die Sehne ist voll belastungsstabil, sofern Ihr Behandlungsteam dies klinisch freigegeben hat. Rückkehr zu Arbeit und Sport nur nach ärztlicher oder therapeutischer Einschätzung.",
      informationalOnly: true,
      exercises: [],
      infoBlocks: [
        {
          id: "info-rueckkehr",
          title: "Rückkehr zur Belastung",
          text: "Besprechen Sie die Rückkehr zu Arbeit, Sport und voller Belastung mit Ihrem Behandlungsteam. Erst nach klinischer Freigabe ist die Sehne voll belastbar.",
          videoAssetId: "vid-daumen-rueckkehr",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Kommende Schemata – sichtbar als "demnächst verfügbar", nicht ausgearbeitet.
// Ein neues Schema wird ergänzt, indem hier ein weiteres TherapyProtocol-Objekt
// mit available: true angelegt wird. Die gesamte UI entsteht daraus automatisch.
// ---------------------------------------------------------------------------

const comingSoonBase = {
  available: false as const,
  disclaimer: "",
  safetyRules: [],
  phases: [],
};

export const protocols: TherapyProtocol[] = [
  thumbFlexorManchester,
  {
    id: "langfinger-manchester",
    name: "Beugesehnen Langfinger",
    subtitle: "Manchester-Schema, Zeige- bis Kleinfinger",
    ...comingSoonBase,
  },
  {
    id: "strecksehne",
    name: "Strecksehnen",
    subtitle: "Nachbehandlung nach Zonen",
    ...comingSoonBase,
  },
];

export function getProtocol(id: string | null): TherapyProtocol | null {
  if (!id) return null;
  return protocols.find((p) => p.id === id) ?? null;
}
