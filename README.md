# KHEIRA – Handtherapie. Klar geführt.

Digitale, patientenzentrierte Anleitung für die Nachbehandlung nach Handsehnenverletzungen.
MVP-Fokus: **Beugesehne Daumen – modifiziertes Manchester-Schema**.
Entwickelt von Dr. med. Christoph Wallner.

Responsive Web-App (mobile-first), ohne Backend, ohne Login. OP-Datum und Fortschritt werden
ausschließlich lokal im Browser gespeichert (localStorage).

## Schnellstart

```bash
npm install
npm run dev        # Entwicklung (http://localhost:5173)
npm run build      # Produktionsbuild nach dist/
npm run build:preview  # Eigenständige Einzeldatei nach dist-preview/index.html
```

Der Inhalt von `dist/` kann auf jedem statischen Hosting ausgeliefert werden. Die Datei
`dist-preview/index.html` läuft ohne Server direkt im Browser – praktisch für schnelle Tests
auf dem Smartphone (alle Bilder sind eingebettet).

## Deployment: GitHub + Vercel

```bash
git init
git add .
git commit -m "KHEIRA MVP: Beugesehne Daumen (Manchester-Schema)"
git branch -M main
git remote add origin https://github.com/<IHR_ACCOUNT>/kheira.git
git push -u origin main
```

Anschließend auf vercel.com „Add New → Project" wählen, das Repository importieren und
deployen – `vercel.json` ist bereits hinterlegt (Framework Vite, Build `npm run build`,
Output `dist/`). Jeder Push auf `main` löst danach automatisch ein neues Deployment aus.
Eine `.gitignore` (node_modules, dist, dist-preview, .vercel) liegt bei.

## Higgsfield-Logo-Animation im Splash

Sobald die animierte Logo-Sequenz aus Higgsfield vorliegt: MP4/WebM nach
`public/brand/splash.mp4` legen und in `src/components/SplashScreen.tsx` die Konstante
`SPLASH_VIDEO_SRC` auf ``${import.meta.env.BASE_URL}brand/splash.mp4`` setzen. Das Video
ersetzt dann das statische Logo im Splash Screen; Claim und Credit-Zeile bleiben erhalten.

## Projektstruktur

```
src/
  data/
    types.ts        Zentrale Typen: TherapyProtocol, TherapyPhase, Exercise,
                    SafetyRule, VideoAsset (datengetriebene Architektur)
    protocols.ts    Daumen-Manchester-Schema + videoAssets + kommende Schemata
  lib/
    state.ts        localStorage-Persistenz, Tag/Woche-nach-OP-Berechnung,
                    Phasenauflösung, Fortschrittslogik
    router.ts       Minimaler Hash-Router (keine externe Abhängigkeit)
  components/
    Logo.tsx        KHEIRA-Bildmarke, Wortmarke, Wasserzeichen (SVG)
    SplashScreen.tsx
    Layout.tsx      Header + Bottom-Navigation
    ui.tsx          Card, Buttons, Icons, SafetyBanner, VideoSlot (+ Platzhalter)
  screens/
    Onboarding.tsx  Willkommen → Freigabe-Hinweis → OP-Datum → Schema → Sicherheitsregeln
    Home.tsx        „Was steht heute an?“ mit Tagesübungen und Fortschritt
    Plan.tsx        Therapieplan als vertikale Timeline
    Exercises.tsx   Übungsliste + Übungsdetail (Video, Schritte, Checkliste)
    More.tsx        Wichtige Hinweise, Fortschritt, Einstellungen
public/
  videos/           Ablageort für echte 9:16-Videos (siehe README dort)
```

## Echte Videos einfügen

1. MP4/WebM (9:16) nach `public/videos/` kopieren.
2. In `src/data/protocols.ts` beim passenden `videoAssets`-Eintrag `status: "available"` setzen
   und `src: "videos/<datei>.mp4"` eintragen (optional `poster`).
3. Fertig – Übungsdetail und Therapieplan zeigen das Video automatisch anstelle des Platzhalters.

## Neues Schema ergänzen (z. B. Langfinger, Strecksehne)

1. In `src/data/protocols.ts` ein neues `TherapyProtocol`-Objekt anlegen
   (Phasen mit `startDay`/`endDay`, Übungen, Sicherheitsregeln, Video-Assets).
2. `available: true` setzen.
3. Das Schema erscheint automatisch im Onboarding; sämtliche Screens (Home, Plan,
   Übungen, Freischaltung nach Wochen) entstehen aus den Daten.

## Rechtlicher Rahmen

KHEIRA ist eine digitale Patienteninformation nach ärztlicher Freigabe – kein Medizinprodukt.
Die App trifft keine diagnostischen oder therapeutischen Entscheidungen, gibt keine Heilungs-
versprechen und ersetzt keine ärztliche oder therapeutische Kontrolle. Der entsprechende
Disclaimer ist im Onboarding, in den Hinweisen und in den Einstellungen hinterlegt.
