---
title: Protokolle
navTitle: Protokolle
description: Wo SignatureCat festhält, was passiert ist - Aufgabenprotokolle für Synchronisierungs- und Anwendungs-Aufträge, Ergebnisse pro Nutzer, Aufbewahrung und Audit-Trail.
updated: 2026-07-19
---

# Protokolle

SignatureCat führt ein Betriebsprotokoll über jeden Signatur-Auftrag, pro Nutzer und pro Adresse, damit Sie jederzeit beantworten können: „Wurde sie angewendet, und wenn nicht, warum?" Der Haupteinstiegspunkt sind die [Aufgabenprotokolle](https://app.signature.cat/assignments/logs).

## Aufgabenprotokolle

Die [Aufgabenprotokolle](https://app.signature.cat/assignments/logs) (Editoren und Admins) listen die zuletzt abgeschlossenen Aufträge Ihres Workspace, neueste zuerst:

- **Art** - Zuweisungssynchronisierung (der tägliche Auftrag oder **Jetzt synchronisieren**) oder Manuelles Anwenden (von der [Anwenden](https://app.signature.cat/apply)-Seite und Self-Service-Speichervorgängen).
- **Status** - Erfolgreich, Teilweise, Fehlgeschlagen oder Abgebrochen.
- **Wer** - der Nutzer, der ihn ausgelöst hat, oder „Automatisch" für die geplante Synchronisierung.
- **Zahlen** - „N erfolgreich, N fehlgeschlagen, N übersprungen".

Das Aufklappen einer Zeile zeigt die Ergebnisse pro Nutzer direkt an; **Vollständige Aufgabenansicht öffnen** öffnet die komplette Ergebnistabelle unter `app.signature.cat/jobs/{id}`.

## Was eine Ergebniszeile enthält

Eine Zeile pro geschriebener Adresse: der Nutzer (oder Alias, markiert mit einem „Alias"-Badge), das Ergebnis und ein Fehlercode bei Fehlschlägen oder Überspringungen. Häufige Codes und ihre Lösungen sind in [Einen Zuweisungsauftrag prüfen](/docs/verify-assignments/#what-the-per-user-rows-tell-you) aufgeführt. Zeilen können zusätzlich den Vermerk „N andere Zuweisung(en) für diesen Nutzer überschrieben" tragen - für [Vorrang](/docs/assignments/#how-precedence-works)-Audits.

## Aufbewahrung

Auftragsprotokolle werden für ein begrenztes Zeitfenster aufbewahrt (standardmäßig **30 Tage** nach Abschluss eines Auftrags) und dann automatisch entfernt - die Seite nennt das aktuelle Zeitfenster. Exportieren oder prüfen Sie alles Nötige zeitnah nach großen Rollouts.

> [!NOTE]
> Das Aufbewahrungsfenster gilt für die Ausführungsprotokolle der Aufträge. Ihre Vorlagen, Zuweisungen und Einstellungen sind selbstverständlich dauerhaft.

## Laufende Aufträge

Ein laufender Auftrag lässt sich am besten auf seiner eigenen Seite verfolgen, `app.signature.cat/jobs/{id}`, die den Fortschritt abfragt - siehe [Anwendungs-Aufträge](/docs/apply-jobs/#watching-a-job).
