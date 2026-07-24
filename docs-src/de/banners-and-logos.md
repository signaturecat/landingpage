---
title: Banner und Logos hochladen und einfügen
navTitle: Banner und Logos
description: Fügen Sie Firmenlogos und Kampagnenbanner zu SignatureCat-Signaturvorlagen hinzu - Bildbibliothek, Upload-Limits, Klick-Links und Platzhalter.
updated: 2026-07-17
---

# Banner und Logos hochladen und einfügen

SignatureCat verwaltet zwei Arten von Firmenbildern in einer Bibliothek pro Workspace: **Logos** (gerendert mit 115x115 px) und **Banner** (gerendert mit 450x100 px, auf kleinen Bildschirmen verkleinert). Jede Vorlage wählt ihr eigenes Logo und ihren eigenen Banner, eingefügt über die Token `{{logo}}` und `{{banner}}`.

## Ein Bild zur Bibliothek hinzufügen

1. Öffnen Sie eine Vorlage im Editor auf [Signaturen](https://app.signature.cat/signatures).
2. Klicken Sie in der Werkzeugleiste auf **Logo** oder **Banner** - jeder Button öffnet seine eigene Galerie (Logos und Banner mischen sich nie).
3. Wählen Sie **Zur Bibliothek hinzufügen** und dann entweder:
   - **Ich habe einen Link** - fügen Sie eine öffentliche HTTPS-URL eines Bildes ein, das Sie bereits hosten, oder
   - **Datei hochladen** - PNG oder JPG, empfohlen bis 200 KB (hartes Limit 5 MB).
4. Legen Sie optional einen Bibliotheksnamen und einen Klick-Link fest ("Führt beim Klick zu") und speichern Sie. Das Bild wird zur Bibliothek hinzugefügt und für diese Vorlage ausgewählt.

> [!NOTE]
> Nur PNG und JPG - SVG-Dateien werden nicht akzeptiert (schlechte Unterstützung in Mail-Clients und Sicherheitsgründe). Die Bibliothek fasst bis zu 200 Bilder pro Art.

## In eine Vorlage einfügen

Wählen Sie ein Bild in der Galerie und klicken Sie auf **Auswahl verwenden** - der Editor kann das Token `{{logo}}` oder `{{banner}}` auch an der Cursorposition für Sie einfügen. Beim Rendern wird das Token zu einem richtigen Bild-Tag; hat das Bild einen Klick-Link, wird es automatisch in einen Link eingeschlossen.

Verwendet eine Vorlage `{{banner}}` ohne ausgewählten Banner, wird stattdessen ein neutraler Platzhalter gerendert und der Editor erinnert Sie daran, einen auszuwählen - die Signatur bricht nie.

## Klick-Links

Der Klick-Link gehört zum **Bibliotheksbild**, nicht zur Vorlage: Aktualisieren Sie den Link einmal, und jede Vorlage, die dieses Bild verwendet, übernimmt ihn beim nächsten Rendern. Das ist praktisch für wechselnde Kampagnenbanner - tauschen Sie die Ziel-URL, ohne Vorlagen anzufassen.

## Größenempfehlungen

| Art | Gerenderte Größe | Empfehlung |
|---|---|---|
| Logo | 115x115 px | Quadratisches Bild, PNG mit Transparenz funktioniert am besten. |
| Banner | 450x100 px (max-width 100%) | Für scharfes HiDPI-Rendering mit 900x200 px exportieren, Datei unter 200 KB halten. |

Große Bilder verlangsamen das Rendern von E-Mails und können Nachrichten in Gmail in den Bereich "Nachricht gekürzt" schieben - halten Sie die Dateien klein.

## Bilder löschen

Das Löschen eines Bibliotheksbildes trennt es von jeder Vorlage, die es ausgewählt hatte - diese Vorlagen fallen auf den Platzhalter zurück. Die App warnt Sie vorher: "Dieses Bild wird in N Vorlage(n) verwendet. Nach dem Löschen wird es dort nicht mehr angezeigt - stattdessen erscheint ein Platzhalter."

> [!NOTE]
> Bereits gesendete E-Mails behalten ihre Bilder - das Löschen betrifft nur zukünftige Renderings.

## Woher Bilder ausgeliefert werden

Bibliotheksbilder werden standardmäßig unter `images.signature.cat` gehostet. Um sie von Ihrer eigenen Subdomain auszuliefern (bessere Zustellbarkeit), siehe [Bilder von der eigenen Domain ausliefern](/docs/custom-image-domain/). Bilder aus externen URLs ("Ich habe einen Link") werden immer von dort geladen, wo Sie sie hosten - sie müssen dauerhaft öffentlich über HTTPS erreichbar bleiben.
