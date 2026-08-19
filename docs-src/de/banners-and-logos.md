---
title: Banner und Logos hochladen und einfügen
navTitle: Banner und Logos
description: Fügen Sie Firmenlogos und Kampagnenbanner zu Gmail-Signaturvorlagen in SignatureCat hinzu - Bildbibliothek, ALT-Beschreibungen, Größen, Klick-Links und das Löschen.
updated: 2026-08-19
---

# Banner und Logos hochladen und einfügen

SignatureCat verwaltet zwei Arten von Firmenbildern in einer Bibliothek pro Workspace: **Logos** (standardmäßig 115x115 px) und **Banner** (standardmäßig 450x100 px, auf kleinen Bildschirmen verkleinert). Jede Vorlage wählt ihr eigenes Logo und ihren eigenen Banner, eingefügt über die Token `{{logo}}` und `{{banner}}` - und kann beide mit den [Ziehpunkten des visuellen Editors](/docs/visual-editor#bilder-logo-banner-und-foto) für sich selbst in der Größe ändern.

## Ein Bild zur Bibliothek hinzufügen

1. Öffnen Sie eine Vorlage im Editor auf [Signaturen](https://app.signature.cat/signatures).
2. Klicken Sie in der Werkzeugleiste auf **Logo** oder **Banner** - jeder Button öffnet seine eigene Galerie (Logos und Banner mischen sich nie).
3. Wählen Sie **Zur Bibliothek hinzufügen** und dann entweder:
   - **Ich habe einen Link** - fügen Sie eine öffentliche HTTPS-URL eines Bildes ein, das Sie bereits hosten, oder
   - **Datei hochladen** - PNG, JPG oder GIF, empfohlen bis 200 KB (hartes Limit: 5 MB, animiertes GIF bis 20 MB).
4. Legen Sie optional einen Bibliotheksnamen, einen Klick-Link ("Führt beim Klick zu") und eine **Bildbeschreibung (ALT)** fest und speichern Sie. Das Bild wird zur Bibliothek hinzugefügt und für diese Vorlage ausgewählt.

Für Banner können Sie außerdem dem **Bibliothekseintrag eine eigene Größe** geben (eine Checkbox mit Feldern für Breite und Höhe, 24-600 x 24-400 px) - sowohl beim Hinzufügen des Eintrags als auch später in den Details des ausgewählten Eintrags. Diese Größe wird zum Standard des Eintrags, wo immer er verwendet wird; wird sie geleert, gilt wieder 450x100.

> [!NOTE]
> Nur PNG, JPG und GIF - SVG-Dateien werden nicht akzeptiert (schlechte Unterstützung in Mail-Clients und Sicherheitsgründe). Animierte GIFs laufen in Gmail; das klassische Outlook unter Windows zeigt nur das erste Bild. Die Bibliothek fasst bis zu 200 Bilder pro Art.

## In eine Vorlage einfügen

Wählen Sie ein Bild in der Galerie und klicken Sie auf **Auswahl verwenden** - der Editor kann das Token `{{logo}}` oder `{{banner}}` auch an der Cursorposition für Sie einfügen. Beim Rendern wird das Token zu einem richtigen Bild-Tag; hat das Bild einen Klick-Link, wird es automatisch in einen Link eingeschlossen.

Verwendet eine Vorlage `{{banner}}` ohne ausgewählten Banner, wird stattdessen ein neutraler Platzhalter gerendert und der Editor erinnert Sie daran, einen auszuwählen - die Signatur bricht nie.

## Bildgrößen: Bibliotheksstandard vs. pro Vorlage

Zwei Ebenen steuern, wie groß ein Logo oder Banner gerendert wird, und die spezifischere gewinnt:

1. **Größe pro Vorlage** - gesetzt mit den Ziehpunkten im [visuellen Editor](/docs/visual-editor#bilder-logo-banner-und-foto) (Banner 24-600 x 24-400 px, Logo 24-300 px). Sie gilt nur für diese Vorlage; das Ändern der Bannergröße in einer Vorlage verändert also nie die anderen, die dasselbe Bild teilen.
2. **Größe des Bibliothekseintrags** (nur Banner) - der oben beschriebene eigene Standard des Eintrags.

Ist keines von beiden gesetzt, gelten die Standardwerte: Logo 115x115, Banner 450x100.

## Klick-Links

Der Klick-Link gehört zum **Bibliotheksbild**, nicht zur Vorlage: Aktualisieren Sie den Link einmal, und jede Vorlage, die dieses Bild verwendet, übernimmt ihn beim nächsten Rendern. Das ist praktisch für wechselnde Kampagnenbanner - tauschen Sie die Ziel-URL, ohne Vorlagen anzufassen.

Soll sich eine einzelne Vorlage anders verhalten, wählen Sie den Bild-Chip im [visuellen Editor](/docs/visual-editor#bilder-logo-banner-und-foto) aus und nutzen Sie den Button **Link**: den Bibliotheks-Link behalten, den Link nur für diese Vorlage entfernen oder auf eine andere URL zeigen lassen.

## Bildbeschreibung (ALT)

Jedes Bibliotheksbild kann eine **Bildbeschreibung (ALT)** tragen, bis zu 300 Zeichen. Die App sagt es klar: "Diese Beschreibung sieht der Empfänger, wenn sein Mailprogramm das Bild nicht anzeigen kann." Viele Menschen lesen E-Mails mit standardmäßig blockierten Bildern, und Screenreader lesen die Beschreibung statt des Bildes vor - ein Logo-Eintrag mit der Beschreibung "Acme-Logo" sagt also immer noch etwas Nützliches.

Legen Sie sie fest, wenn Sie das Bild hinzufügen (sowohl bei **Ich habe einen Link** als auch bei **Datei hochladen**), im Bildschritt des Assistenten für neue Vorlagen oder später im Bereich **Details des gewählten Bildes** der Bibliothek. Wie der Klick-Link gehört die Beschreibung zum Bibliothekseintrag, jede Vorlage mit diesem Bild liefert also dieselbe aus - und Bilder, die Sie selbst hosten, bekommen das Feld genauso wie Uploads. Lassen Sie es leer, wird das Bild als dekorativ gerendert, ohne Beschreibung.

> [!TIP]
> Beschreiben Sie, was das Bild aussagt, nicht dass es ein Bild ist: "Acme-Logo" oder "Aktion Frühling 2026 - 20 Prozent Rabatt" schlägt "banner.png".

## Größenempfehlungen

| Art | Gerenderte Standardgröße | Empfehlung |
|---|---|---|
| Logo | 115x115 px (pro Vorlage bis 300 px änderbar) | Quadratisches Bild, PNG mit Transparenz funktioniert am besten. |
| Banner | 450x100 px (eigene Größen bis 600x400 px; max-width 100%) | Für scharfes HiDPI-Rendering in doppelter Anzeigegröße exportieren, Datei unter 200 KB halten. |

Große Bilder verlangsamen das Rendern von E-Mails und können Nachrichten in Gmail in den Bereich "Nachricht gekürzt" schieben - halten Sie die Dateien klein.

## Bilder löschen

Das Löschen eines Bibliotheksbildes trennt es von jeder Vorlage, die es ausgewählt hatte - diese Vorlagen fallen auf den Platzhalter zurück und werden weiterhin normal gesetzt. Die App warnt Sie vorher: "Dieses Bild wird in N Vorlage(n) verwendet. Nach dem Löschen wird es dort nicht mehr angezeigt - stattdessen erscheint ein Platzhalter."

War das gelöschte Bild noch in Verwendung, sagt SignatureCat es auch dem Workspace: Eine Benachrichtigung in der App ("Ein von Ihren Signaturen verwendetes Logo wurde gelöscht") erscheint in der Glocke, und eine E-Mail geht an die Admins und den Inhaber, die die betroffenen Vorlagen auflistet. Niemand muss den Platzhalter zufällig entdecken.

> [!IMPORTANT]
> Bei Bildern, die SignatureCat hostet, ist das Löschen endgültig: Die gespeicherte Datei wird beim nächsten täglichen Aufräumen freigegeben, das Bild lädt also auch in bereits zugestellten E-Mails nicht mehr, und es gibt kein Rückgängig im Self-Service.

Bilder, die Sie über **Ich habe einen Link** hinzugefügt haben, sind davon nicht betroffen - die Datei bleibt auf Ihrem eigenen Server, alte E-Mails laden sie also weiter. Um ein gehostetes Bild sicher zu tauschen, laden Sie das neue hoch, richten Sie die Vorlagen darauf aus und löschen Sie den alten Eintrag erst, wenn Sie sicher sind, dass ihn nichts mehr braucht.

## Woher Bilder ausgeliefert werden

Bibliotheksbilder werden standardmäßig unter `images.signature.cat` gehostet. Um sie von Ihrer eigenen Subdomain auszuliefern (bessere Zustellbarkeit), siehe [Bilder von der eigenen Domain ausliefern](/docs/custom-image-domain). Bilder aus externen URLs ("Ich habe einen Link") werden immer von dort geladen, wo Sie sie hosten - sie müssen dauerhaft öffentlich über HTTPS erreichbar bleiben.
