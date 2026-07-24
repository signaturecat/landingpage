---
title: Anwendungs-Aufträge
navTitle: Anwendungs-Aufträge
description: Wie SignatureCat Signaturen anwendet - die tägliche Zuweisungssynchronisierung, manuelle Einmal-Aufträge von der Anwenden-Seite und die Auftragsverfolgung.
updated: 2026-07-17
---

# Anwendungs-Aufträge

Jeder Signatur-Schreibvorgang läuft innerhalb eines **Auftrags**: entweder die wiederkehrende **Zuweisungssynchronisierung** oder ein **manuelles Anwenden**, das Sie selbst auslösen. Aufträge laufen im Hintergrund, melden Ergebnisse pro Nutzer und lassen sich live verfolgen.

## Die Zuweisungssynchronisierung

Einmal am Tag löst SignatureCat alle [Zuweisungen](/docs/assignments/) neu auf und wendet die Signaturen im gesamten Workspace erneut an. So bleiben Signaturen aktuell, wenn Personen Gruppen beitreten, zwischen OUs wechseln oder neu eingestellt werden. Dieselbe Synchronisierung können Sie jederzeit mit **Jetzt synchronisieren** auf [Zuweisungen](https://app.signature.cat/assignments) anstoßen.

## Manuelles Anwenden: die Anwenden-Seite

Die Seite [Anwenden](https://app.signature.cat/apply) (Editoren und Admins) löst einen **Einmal**-Auftrag aus: Vorlage wählen, Empfänger bestimmen, einmal anwenden. Er ist unabhängig von Zuweisungen - nützlich für einmalige Rollouts, das Korrigieren einzelner Postfächer oder Personen außerhalb jeder Zuweisung.

Empfänger können beliebig kombiniert werden (bis zu 50 Einträge):

- **Alle** - ein Klick erfasst jeden aktiven Nutzer im Workspace zum Anwendungszeitpunkt.
- **Nutzer** - einzelne Nutzer, gefunden per E-Mail-Suche. Dies ist die einzige Stelle mit Einzelnutzer-Targeting.
- **Gruppen** - Mitglieder werden zum Anwendungszeitpunkt aufgelöst. Hinweis: Verschachtelte Gruppen werden hier **nicht** erweitert (anders als bei Zuweisungen mit **+ Untergruppen**).
- **OUs** - per Pfad, mit einer Checkbox **inkl. Unter-OUs**.
- **Aliasse** - bestimmte send-as-Adressen (bis zu 50). Jede wird ihrem Postfach-Inhaber zugeordnet und nur signiert, wenn sie ein akzeptierter send-as-Alias ist; `{{email}}` / `{{domain}}` rendern anhand des Alias.

Nach dem Absenden werden Sie zur Live-Auftragsansicht weitergeleitet.

> [!NOTE]
> Ein Einmal-Anwenden schreibt die Signatur **einmal**. Ist der Nutzer von einer Zuweisung oder einer Self-Service-Wahl erfasst, überschreibt die nächste tägliche Synchronisierung das Einmal-Ergebnis gemäß den [Vorrangregeln](/docs/assignments/#how-precedence-works).

## Einen Auftrag verfolgen

Die Auftragsansicht unter `app.signature.cat/jobs/{id}` aktualisiert sich live, während der Auftrag läuft: Status, Fortschritt und eine Ergebnistabelle pro Nutzer mit Fehlercodes. Abgeschlossene Aufträge werden außerdem in den [Aufgabenprotokollen](https://app.signature.cat/assignments/logs) gelistet. **Fehlgeschlagene erneut ausführen** wiederholt nur die fehlgeschlagenen Zeilen.

Statuswerte und Fehlercodes sind in [Einen Zuweisungsauftrag prüfen](/docs/verify-assignments/#job-statuses) dokumentiert.

## Wie schnell sind Änderungen sichtbar?

Manuelles Anwenden und Self-Service-Speichern wirken nahezu sofort (Sekunden bis wenige Minuten bei großen Zielgruppen). Zuweisungsänderungen greifen bei der nächsten täglichen Synchronisierung, sofern Sie nicht **Jetzt synchronisieren** klicken. Gmail zeigt die neue Signatur beim nächsten Verfassen einer E-Mail - bereits gesendete E-Mails ändern sich nie.
