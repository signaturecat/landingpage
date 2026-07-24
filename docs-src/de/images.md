---
title: Bilder
navTitle: Bilder
description: SignatureCat-Bilder-Referenz - die Bibliothek pro Workspace, Hosting auf images.signature.cat oder der eigenen Domain, Formate, Limits und Lebenszyklus.
updated: 2026-07-17
---

# Bilder

Signaturbilder - Firmenlogos, Kampagnenbanner und Profilfotos - stammen in SignatureCat aus drei Quellen: der eingebauten **Bildbibliothek**, **externen URLs**, die Sie selbst hosten, und Google Directory-**Profilfotos**. Diese Seite ist die Referenz; der Praxisleitfaden ist [Banner und Logos](/docs/banners-and-logos/).

## Die Bildbibliothek

Jeder Workspace hat eine Bibliothek mit zwei Arten von Einträgen:

| Art | Gerenderte Größe | Token | Bibliothekslimit |
|---|---|---|---|
| Logo | 115x115 px | `{{logo}}` | 200 Einträge |
| Banner | 450x100 px, max-width 100% | `{{banner}}` | 200 Einträge |

Bibliothekseinträge tragen einen optionalen Namen und einen optionalen **Klick-Link**. Jede Vorlage wählt ihr eigenes Logo und ihren eigenen Banner aus der Bibliothek; Vorlagen ohne Auswahl rendern einen neutralen Platzhalter. Uploads sind PNG oder JPG, bis 5 MB (200 KB empfohlen); SVG wird nicht akzeptiert.

## Woher Bilder ausgeliefert werden

- **Bibliotheks-Uploads** werden von SignatureCat gespeichert und über ein CDN mit langlebigem Caching von `https://images.signature.cat/...` ausgeliefert.
- Mit einer verifizierten [eigenen Bilddomain](/docs/custom-image-domain/) liefern neu gerenderte Signaturen Bibliotheksbilder stattdessen von Ihrer Subdomain aus (zum Beispiel `images.yourcompany.com`) - bessere Zustellbarkeit, gleicher Speicher.
- **Bilder aus externen URLs** („Ich habe einen Link") werden direkt von dort geladen, wo Sie sie hosten. Sie müssen öffentlich und HTTPS sein; idealerweise hosten Sie sie auf Ihrer eigenen Domain.

> [!IMPORTANT]
> Bild-URLs werden fest in jede gerenderte Signatur eingebettet. E-Mails, die bereits in den Postfächern der Empfänger liegen, laden weiterhin die URL, mit der sie gesendet wurden - deshalb löscht SignatureCat die zugrunde liegenden Dateien entfernter Bibliotheksbilder nie, und deshalb erscheint ein externes Bild, das Sie offline nehmen, in alten E-Mails als defekt.

## Profilfotos

Die Variable `{{photo}}` verwendet das Google-Profilfoto des Nutzers aus dem Directory (automatisch auf 400 px skaliert). Es ist nicht Teil der Bibliothek - Nutzer und Admins verwalten Profilfotos in Google Workspace. Siehe [Vorlagenvariablen](/docs/template-variables/#person-variables-google-directory).

## Hinweise zum Lebenszyklus

- **Ein Bild ersetzen:** Fügen Sie die neue Datei zur Bibliothek hinzu und wählen Sie sie in der Vorlage aus - oder behalten Sie denselben Bibliothekseintrag und aktualisieren Sie nur dessen Klick-Link (wird beim nächsten Rendern übernommen).
- **Das Löschen eines Bibliothekseintrags** trennt ihn von den Vorlagen, die ihn verwenden (sie fallen auf den Platzhalter zurück) - nach einer Warnung mit der Anzahl der Verwendungen.
- **Bereits gesendete E-Mails** sind von Bibliotheksänderungen nie betroffen.

## Tipps zur Zustellbarkeit

- Halten Sie Dateien klein (Banner unter 200 KB) - große Bilder verlangsamen das Rendern und verschlechtern Spam-Bewertungen.
- Liefern Sie Bilder mit einer [eigenen Bilddomain](/docs/custom-image-domain/) von Ihrer eigenen Domain aus - Mail-Clients vertrauen der Absenderdomain mehr.
- Gmail leitet Bilder für Empfänger über einen Proxy, daher brechen exotische Hosting-Setups (IP-Allowlists, Referer-Prüfungen) das Rendern. Halten Sie Bilder schlicht öffentlich.
