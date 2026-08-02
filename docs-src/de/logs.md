---
title: Protokolle
navTitle: Protokolle
description: Wo SignatureCat jeden Gmail-Signatur-Auftrag festhält - Aufgabenprotokolle, Ergebnisse pro Nutzer, das Badge von Gmail gekürzt, Live-Prüfungen im Postfach und Aufbewahrung.
updated: 2026-08-02
---

# Protokolle

SignatureCat führt ein Betriebsprotokoll über jeden Signatur-Auftrag, pro Nutzer und pro Adresse, damit Sie jederzeit beantworten können: "Wurde sie angewendet, und wenn nicht, warum?" Der Einstiegspunkt ist der Tab **Protokolle** in der oberen Navigation: [Aufgabenprotokolle](https://app.signature.cat/logs).

## Aufgabenprotokolle

Die [Aufgabenprotokolle](https://app.signature.cat/logs) (Editoren und Admins) listen die zuletzt abgeschlossenen Aufträge Ihres Workspace, neueste zuerst:

- **Art** - Zuweisungssynchronisierung (der tägliche Auftrag oder **Jetzt synchronisieren**) oder Manuelles Anwenden (von der [Anwenden](https://app.signature.cat/apply)-Seite und Self-Service-Speichervorgängen).
- **Status** - Erfolgreich, Teilweise, Fehlgeschlagen oder Abgebrochen.
- **Wer** - der Nutzer, der ihn ausgelöst hat, oder "Automatisch" für die geplante Synchronisierung.
- **Zahlen** - "N erfolgreich, N fehlgeschlagen, N übersprungen".

Das Aufklappen einer Zeile zeigt die Ergebnisse pro Nutzer direkt an; **Vollständige Aufgabenansicht öffnen** öffnet die komplette Ergebnistabelle unter `app.signature.cat/jobs/{id}`.

## Was eine Ergebniszeile enthält

Eine Zeile pro geschriebener Adresse: der Nutzer (oder Alias, markiert mit einem "Alias"-Badge), das Ergebnis und ein Fehlercode bei Fehlschlägen oder Überspringungen. Häufige Codes und ihre Lösungen sind in [Einen Zuweisungsauftrag prüfen](/docs/verify-assignments#was-die-zeilen-pro-nutzer-aussagen) aufgeführt. Zeilen können zusätzlich den Vermerk "N andere Zuweisung(en) für diesen Nutzer überschrieben" tragen - für [Vorrang](/docs/assignments#wie-der-vorrang-funktioniert)-Audits.

Eine erfolgreiche Zeile kann zusätzlich ein bernsteinfarbenes Badge **von Gmail gekürzt** tragen, mit der Zeile "Angewendet, aber Gmail hat eine gekürzte Kopie dieser Signatur gespeichert." Das Anwenden selbst hat funktioniert - Gmail hat den Schreibvorgang angenommen und das HTML anschließend beim Speichern auf den eigenen Servern umgeschrieben. **Technische Details** in der Zeile nennt die entfernten Elemente und die Zeichenzahlen davor und danach. Siehe [Wenn Gmail Ihre Signatur kürzt](/docs/gmail-sanitization).

## Die aktuelle Signatur aus dem Postfach lesen

Zwei Aktionen auf dieser Seite lesen ein Postfach live: **Aktuelle Signatur anzeigen** in einer erfolgreichen Ergebniszeile und **Signatur eines Mitarbeiters prüfen** im Kopfbereich der Seite. Beide öffnen dasselbe schreibgeschützte Fenster mit dem Titel "Aktuelle Signatur aus dem Postfach" und dem Untertitel "Liest die Signatur direkt aus dem Gmail-Postfach des Nutzers."

- **Aktuelle Signatur anzeigen** wird in erfolgreichen Zeilen angeboten und startet die Abfrage für diese Adresse sofort.
- Mit **Signatur eines Mitarbeiters prüfen** wählen Sie im Feld **Mitarbeiter** eine beliebige Person in Ihrem Workspace und klicken auf **Signatur anzeigen**.
- Beide stehen Editoren und Admins offen.
- Das Fenster zeigt die Signatur, es bearbeitet sie nicht. Weil es Gmail liest und nicht die eigenen Aufzeichnungen von SignatureCat, zeigt es auch Signaturen, die ein Nutzer in seinen Gmail-Einstellungen von Hand geändert hat.
- Ist nichts gespeichert, erscheint statt einer Vorschau "{email} hat in Gmail keine Signatur gesetzt."

> [!NOTE]
> Jede Abfrage wird im Aktivitätsprotokoll Ihres Kontos in den [Einstellungen](https://app.signature.cat/settings) festgehalten, mit der geprüften Adresse und der Länge der Signatur - nie ihrem Inhalt. Die Signatur selbst wird von SignatureCat nicht gespeichert.

## Aufbewahrung

Auftragsprotokolle werden für ein begrenztes Zeitfenster aufbewahrt (standardmäßig **30 Tage** nach Abschluss eines Auftrags) und dann automatisch entfernt - die Seite nennt das aktuelle Zeitfenster. Exportieren oder prüfen Sie alles Nötige zeitnah nach großen Rollouts.

> [!NOTE]
> Das Aufbewahrungsfenster gilt für die Ausführungsprotokolle der Aufträge. Ihre Vorlagen, Zuweisungen und Einstellungen sind selbstverständlich dauerhaft.

## Laufende Aufträge

Ein laufender Auftrag lässt sich am besten auf seiner eigenen Seite verfolgen, `app.signature.cat/jobs/{id}`, die den Fortschritt abfragt - siehe [Anwendungs-Aufträge](/docs/apply-jobs#einen-auftrag-verfolgen).
