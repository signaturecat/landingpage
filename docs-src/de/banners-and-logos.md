---
title: Banner und Logos hochladen und einfügen
navTitle: Banner und Logos
description: Fügen Sie Firmenlogos und Kampagnenbanner zu SignatureCat-Signaturvorlagen hinzu - Bildbibliothek, eigene Größen, Größenänderung pro Vorlage, Klick-Links und Platzhalter.
updated: 2026-07-26
---

# Banner und Logos hochladen und einfügen

SignatureCat verwaltet zwei Arten von Firmenbildern in einer Bibliothek pro Workspace: **Logos** (standardmäßig 115x115 px) und **Banner** (standardmäßig 450x100 px, auf kleinen Bildschirmen verkleinert). Jede Vorlage wählt ihr eigenes Logo und ihren eigenen Banner, eingefügt über die Token `{{logo}}` und `{{banner}}` - und kann beide mit den [Ziehpunkten des visuellen Editors](/docs/visual-editor/#images-logo-banner-and-photo) für sich selbst in der Größe ändern.

## Ein Bild zur Bibliothek hinzufügen

1. Öffnen Sie eine Vorlage im Editor auf [Signaturen](https://app.signature.cat/signatures).
2. Klicken Sie in der Werkzeugleiste auf **Logo** oder **Banner** - jeder Button öffnet seine eigene Galerie (Logos und Banner mischen sich nie).
3. Wählen Sie **Zur Bibliothek hinzufügen** und dann entweder:
   - **Ich habe einen Link** - fügen Sie eine öffentliche HTTPS-URL eines Bildes ein, das Sie bereits hosten, oder
   - **Datei hochladen** - PNG oder JPG, empfohlen bis 200 KB (hartes Limit 5 MB).
4. Legen Sie optional einen Bibliotheksnamen und einen Klick-Link fest ("Führt beim Klick zu") und speichern Sie. Das Bild wird zur Bibliothek hinzugefügt und für diese Vorlage ausgewählt.

Für Banner können Sie außerdem dem **Bibliothekseintrag eine eigene Größe** geben (eine Checkbox mit Feldern für Breite und Höhe, 24-600 x 24-400 px) - sowohl beim Hinzufügen des Eintrags als auch später in den Details des ausgewählten Eintrags. Diese Größe wird zum Standard des Eintrags, wo immer er verwendet wird; wird sie geleert, gilt wieder 450x100.

> [!NOTE]
> Nur PNG und JPG - SVG-Dateien werden nicht akzeptiert (schlechte Unterstützung in Mail-Clients und Sicherheitsgründe). Die Bibliothek fasst bis zu 200 Bilder pro Art.

## In eine Vorlage einfügen

Wählen Sie ein Bild in der Galerie und klicken Sie auf **Auswahl verwenden** - der Editor kann das Token `{{logo}}` oder `{{banner}}` auch an der Cursorposition für Sie einfügen. Beim Rendern wird das Token zu einem richtigen Bild-Tag; hat das Bild einen Klick-Link, wird es automatisch in einen Link eingeschlossen.

Verwendet eine Vorlage `{{banner}}` ohne ausgewählten Banner, wird stattdessen ein neutraler Platzhalter gerendert und der Editor erinnert Sie daran, einen auszuwählen - die Signatur bricht nie.

## Bildgrößen: Bibliotheksstandard vs. pro Vorlage

Zwei Ebenen steuern, wie groß ein Logo oder Banner gerendert wird, und die spezifischere gewinnt:

1. **Größe pro Vorlage** - gesetzt mit den Ziehpunkten im [visuellen Editor](/docs/visual-editor/#images-logo-banner-and-photo) (Banner 24-600 x 24-400 px, Logo 24-300 px). Sie gilt nur für diese Vorlage; das Ändern der Bannergröße in einer Vorlage verändert also nie die anderen, die dasselbe Bild teilen.
2. **Größe des Bibliothekseintrags** (nur Banner) - der oben beschriebene eigene Standard des Eintrags.

Ist keines von beiden gesetzt, gelten die Standardwerte: Logo 115x115, Banner 450x100.

## Klick-Links

Der Klick-Link gehört zum **Bibliotheksbild**, nicht zur Vorlage: Aktualisieren Sie den Link einmal, und jede Vorlage, die dieses Bild verwendet, übernimmt ihn beim nächsten Rendern. Das ist praktisch für wechselnde Kampagnenbanner - tauschen Sie die Ziel-URL, ohne Vorlagen anzufassen.

Soll sich eine einzelne Vorlage anders verhalten, wählen Sie den Bild-Chip im [visuellen Editor](/docs/visual-editor/#images-logo-banner-and-photo) aus und nutzen Sie den Button **Link**: den Bibliotheks-Link behalten, den Link nur für diese Vorlage entfernen oder auf eine andere URL zeigen lassen.

## Größenempfehlungen

| Art | Gerenderte Standardgröße | Empfehlung |
|---|---|---|
| Logo | 115x115 px (pro Vorlage bis 300 px änderbar) | Quadratisches Bild, PNG mit Transparenz funktioniert am besten. |
| Banner | 450x100 px (eigene Größen bis 600x400 px; max-width 100%) | Für scharfes HiDPI-Rendering in doppelter Anzeigegröße exportieren, Datei unter 200 KB halten. |

Große Bilder verlangsamen das Rendern von E-Mails und können Nachrichten in Gmail in den Bereich "Nachricht gekürzt" schieben - halten Sie die Dateien klein.

## Bilder löschen

Das Löschen eines Bibliotheksbildes trennt es von jeder Vorlage, die es ausgewählt hatte - diese Vorlagen fallen auf den Platzhalter zurück. Die App warnt Sie vorher: "Dieses Bild wird in N Vorlage(n) verwendet. Nach dem Löschen wird es dort nicht mehr angezeigt - stattdessen erscheint ein Platzhalter."

> [!NOTE]
> Bereits gesendete E-Mails behalten ihre Bilder - das Löschen betrifft nur zukünftige Renderings.

## Woher Bilder ausgeliefert werden

Bibliotheksbilder werden standardmäßig unter `images.signature.cat` gehostet. Um sie von Ihrer eigenen Subdomain auszuliefern (bessere Zustellbarkeit), siehe [Bilder von der eigenen Domain ausliefern](/docs/custom-image-domain/). Bilder aus externen URLs ("Ich habe einen Link") werden immer von dort geladen, wo Sie sie hosten - sie müssen dauerhaft öffentlich über HTTPS erreichbar bleiben.
