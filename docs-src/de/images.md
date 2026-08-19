---
title: Bilder
navTitle: Bilder
description: Referenz für Bilder in SignatureCat-E-Mail-Signaturen für Google Workspace - die Bibliothek, ALT-Beschreibungen, Hosting, Formate, Limits und das Löschen.
updated: 2026-08-19
---

# Bilder

Signaturbilder - Firmenlogos, Kampagnenbanner und Profilfotos - stammen in SignatureCat aus drei Quellen: der eingebauten **Bildbibliothek**, **externen URLs**, die Sie selbst hosten, und Google Directory-**Profilfotos**. Diese Seite ist die Referenz; der Praxisleitfaden ist [Banner und Logos](/docs/banners-and-logos).

## Die Bildbibliothek

Jeder Workspace hat eine Bibliothek mit zwei Arten von Einträgen:

| Art | Gerenderte Größe | Token | Bibliothekslimit |
|---|---|---|---|
| Logo | 115x115 px | `{{logo}}` | 200 Einträge |
| Banner | 450x100 px, max-width 100% | `{{banner}}` | 200 Einträge |

Bibliothekseinträge tragen einen optionalen Namen, einen optionalen **Klick-Link** und eine optionale **Bildbeschreibung (ALT)**. Jede Vorlage wählt ihr eigenes Logo und ihren eigenen Banner aus der Bibliothek; Vorlagen ohne Auswahl rendern einen neutralen Platzhalter. Uploads sind PNG, JPG oder GIF - bis 5 MB für PNG/JPG und bis 20 MB für GIF (für statische Bilder 200 KB empfohlen); SVG wird nicht akzeptiert.

## Bildbeschreibung (ALT)

Die **Bildbeschreibung (ALT)** ist das, was ein Empfänger statt des Bildes sieht, wenn sein Mail-Client Bilder blockiert, und was ein Screenreader vorliest. Sie ist optional und auf 300 Zeichen begrenzt.

- **Wo Sie sie festlegen:** im Hinzufügen-Formular, wenn Sie eine Datei hochladen oder einen Link einfügen, im Bildschritt des Assistenten für neue Vorlagen und später im Bereich **Details des gewählten Bildes** der Bibliothek.
- **Wofür sie gilt:** für jeden Bibliothekseintrag, egal ob SignatureCat die Datei hostet oder Sie auf Ihre eigene verlinken.
- **Wohin sie mitwandert:** mit dem Bibliothekseintrag, genau wie der Klick-Link - ändern Sie sie einmal, und jede Vorlage, die dieses Bild verwendet, liefert die neue Beschreibung beim nächsten Rendern aus.
- **Wenn Sie sie leer lassen:** wird das Bild als dekorativ gerendert und erhält keine Beschreibung.

## Woher Bilder ausgeliefert werden

- **Bibliotheks-Uploads** werden von SignatureCat gespeichert und über ein CDN mit langlebigem Caching von `https://images.signature.cat/...` ausgeliefert.
- Mit einer verifizierten [eigenen Bilddomain](/docs/custom-image-domain) liefern neu gerenderte Signaturen Bibliotheksbilder stattdessen von Ihrer Subdomain aus (zum Beispiel `images.yourcompany.com`) - bessere Zustellbarkeit, gleicher Speicher.
- **Bilder aus externen URLs** ("Ich habe einen Link") werden direkt von dort geladen, wo Sie sie hosten. Sie müssen öffentlich und HTTPS sein; idealerweise hosten Sie sie auf Ihrer eigenen Domain.

> [!IMPORTANT]
> Bild-URLs werden fest in jede gerenderte Signatur eingebettet, deshalb laden E-Mails, die bereits in den Postfächern der Empfänger liegen, weiterhin die URL, mit der sie gesendet wurden: Das Löschen eines Bibliothekseintrags, den SignatureCat hostet, gibt die gespeicherte Datei frei, und das Bild lädt irgendwann auch in bereits zugestellter Post nicht mehr.

## Profilfotos

Die Variable `{{photo}}` verwendet das Google-Profilfoto des Nutzers aus dem Directory (automatisch auf 400 px skaliert). Es ist nicht Teil der Bibliothek - Nutzer und Admins verwalten Profilfotos in Google Workspace. Siehe [Vorlagenvariablen](/docs/template-variables#personenvariablen-google-directory).

## Hinweise zum Lebenszyklus

- **Ein Bild ersetzen:** Laden Sie die neue Datei hoch, wählen Sie sie in jeder Vorlage aus, die die alte verwendet hat, und löschen Sie den alten Eintrag erst, wenn Sie sicher sind - oder behalten Sie denselben Bibliothekseintrag und aktualisieren Sie nur dessen Klick-Link oder ALT-Beschreibung, was jede Vorlage beim nächsten Rendern übernimmt.
- **Das Löschen eines Bibliothekseintrags** trennt ihn von den Vorlagen, die ihn verwenden (sie fallen auf den Platzhalter zurück) - nach einer Warnung mit der Anzahl der Verwendungen. Diese Signaturen werden in der Zwischenzeit weiterhin gesetzt.
- **Das Löschen eines verwendeten Bildes benachrichtigt den Workspace:** Eine Benachrichtigung erscheint in der Glocke in der App, und eine E-Mail geht an die Admins und den Inhaber, die die betroffenen Vorlagen nennt. Siehe [Benachrichtigungen](/docs/notifications).
- **Gehostete Dateien werden freigegeben:** Ist der Bibliothekseintrag weg, räumt SignatureCat die gespeicherte Datei beim nächsten täglichen Durchlauf auf, sodass das Bild auch in bereits zugestellten E-Mails nicht mehr lädt. Das Löschen ist endgültig, und es gibt kein Rückgängig im Self-Service.
- **Externe Bilder sind vom Löschen nicht betroffen.** Sie hosten die Datei, das Entfernen des Bibliothekseintrags entfernt also nur den Eintrag - alte E-Mails laden das Bild weiter, bis Sie es selbst offline nehmen.

## Tipps zur Zustellbarkeit

- Halten Sie Dateien klein (Banner unter 200 KB) - große Bilder verlangsamen das Rendern und verschlechtern Spam-Bewertungen.
- Liefern Sie Bilder mit einer [eigenen Bilddomain](/docs/custom-image-domain) von Ihrer eigenen Domain aus - Mail-Clients vertrauen der Absenderdomain mehr.
- Gmail leitet Bilder für Empfänger über einen Proxy, daher brechen exotische Hosting-Setups (IP-Allowlists, Referer-Prüfungen) das Rendern. Halten Sie Bilder schlicht öffentlich.
