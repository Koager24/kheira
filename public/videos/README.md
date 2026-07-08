# Echte Übungsvideos einfügen

1. Video (9:16, MP4 oder WebM) in diesen Ordner legen, z. B. `FPL1.mp4`.
2. In `src/data/protocols.ts` beim passenden Eintrag in `videoAssets`:
   - `status: "available"` setzen
   - `src: "/videos/FPL1.mp4"` eintragen — **mit führendem Slash**,
     damit der Pfad von jeder Route aus an der Domain-Wurzel aufgelöst wird
   - optional `poster: "/videos/FPL1.jpg"` (Standbild der Ausgangsposition)

Die App zeigt das Video dann automatisch anstelle des Platzhalters an –
in der Übungsdetailansicht und im Therapieplan. Ein Video-Asset kann von
mehreren Übungen referenziert werden (z. B. die passive Beugung in den
Wochen 1–3); es genügt, den einen Eintrag freizuschalten.

Wichtig beim Hochladen neuer ZIP-Stände zu GitHub: bereits committete
Videodateien in diesem Ordner (z. B. `FPL1.mp4`) nicht überschreiben
oder löschen – sie sind nicht Teil des Quellcode-ZIPs.
