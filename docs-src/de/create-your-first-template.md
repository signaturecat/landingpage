---
title: Ihre erste Vorlage erstellen
navTitle: Ihre erste Vorlage erstellen
description: Erstellen Sie eine Gmail-Signaturvorlage in SignatureCat, personalisieren Sie sie mit Google Directory-Variablen, sehen Sie die Vorschau und testen Sie sie auf Ihrem eigenen Postfach.
updated: 2026-07-17
---

# Ihre erste Vorlage erstellen

Eine Vorlage ist eine HTML-Signatur, die SignatureCat pro Nutzer mit Daten aus Ihrem Google Directory personalisiert. Sie erstellen Vorlagen auf der Seite [Signaturen](https://app.signature.cat/signatures) und können das Ergebnis gefahrlos auf Ihrem eigenen Postfach testen, bevor Sie etwas ausrollen.

## Die Vorlage erstellen

1. Öffnen Sie [Signaturen](https://app.signature.cat/signatures) und klicken Sie auf **Neue Vorlage**.
2. Wählen Sie einen Startpunkt:
   - **Standard** - Directory-Foto plus Kontaktdaten.
   - **Mit Firmenlogo** - Ihr Logo (115x115 px) statt des persönlichen Fotos, einheitlich für die ganze Firma.
   - **Mit Banner** - die Signatur plus ein Kampagnenbanner (450x100 px) darunter.
3. Wählen Sie für die Logo- oder Banner-Starter ein Bild aus Ihrer Bibliothek oder laden Sie eines hoch - oder überspringen Sie den Schritt, dann wird ein Platzhalter verwendet, bis Sie eines wählen. Siehe [Banner und Logos](/docs/banners-and-logos/).

Der Editor öffnet sich sofort. Alles aus dem Starter lässt sich später anpassen.

## Mit Variablen personalisieren

Fügen Sie `{{variable}}`-Token über das Menü **Variable einfügen** ein - zum Beispiel `{{firstname}}`, `{{jobtitle}}` oder `{{phone}}`. Beim Anwenden löst jedes Token aus dem Google Directory-Datensatz des Nutzers auf, sodass eine Vorlage für alle eine persönliche Signatur erzeugt.

Schließen Sie optionale Zeilen in bedingte Tags ein, damit Signaturen sauber bleiben, wenn Daten fehlen:

- `{{del}} ... {{/del}}` entfernt den eingeschlossenen Block nur, wenn **alle** Variablen darin leer sind.
- `{{delete}} ... {{/delete}}` entfernt den Block, wenn **irgendeine** Variable darin leer ist.

Die vollständige Variablenliste, die Herkunft jedes Werts und die genauen Bedingungsregeln stehen in der Referenz [Vorlagenvariablen](/docs/template-variables/).

> [!TIP]
> Halten Sie die Directory-Daten vor dem Rollout sauber - Positionen, Abteilungen und Telefonnummern kommen direkt aus dem Google Directory. Leere Felder werden schlicht als leerer Text gerendert, sofern Sie sie nicht in `{{del}}`-Tags einschließen.

## Vorschau als echter Nutzer

Der Vorschaubereich rendert die aufgelöste Signatur live, während Sie tippen. Nutzen Sie das Steuerelement **Rendern als**, um den Directory-Datensatz eines beliebigen echten Nutzers einzusetzen - standardmäßig wird anhand Ihres eigenen gerendert. Die Vorschau sagt Ihnen genau, welcher Datensatz verwendet wurde: "Gerendert anhand der Directory-Daten von {email}."

## Auf dem eigenen Postfach testen

Klicken Sie in der Editor-Werkzeugleiste auf **Mir eine Testsignatur setzen**. SignatureCat rendert die Vorlage anhand Ihres eigenen Directory-Datensatzes und schreibt sie in Ihre eigene Gmail-Signatur - niemand sonst ist betroffen. Senden Sie sich eine E-Mail oder prüfen Sie die Gmail-Einstellungen, um das echte Ergebnis zu sehen.

Wenn Sie mit der Vorlage zufrieden sind, machen Sie weiter mit [Vorlagen zuweisen](/docs/assign-templates/).

> [!NOTE]
> Beim Speichern wird die Vorlage validiert: Unbekannte `{{tokens}}` und unausgeglichene `{{del}}`- / `{{delete}}`-Tags werden abgelehnt, und das HTML wird bereinigt (Skripte, iframes und Inline-Event-Handler werden entfernt). Siehe [Vorlagen](/docs/templates/) für die vollständige Referenz.
