---
title: Einführung
navTitle: Einführung
description: Was SignatureCat ist und wie es Gmail-Signaturen in Ihrem gesamten Google Workspace verwaltet - Vorlagen, Zuweisungen und automatische tägliche Synchronisierung.
updated: 2026-07-17
---

# SignatureCat-Dokumentation

SignatureCat verwaltet Gmail-Signaturen zentral über Ihren gesamten Google Workspace. Sie gestalten eine HTML-Signaturvorlage mit Variablen, weisen sie Nutzern über Gruppen, Organisationseinheiten oder den gesamten Workspace zu, und SignatureCat schreibt eine personalisierte Signatur in jedes Postfach - und hält sie automatisch aktuell.

Die App läuft unter [app.signature.cat](https://app.signature.cat). Diese Dokumentation deckt alles ab, von der ersten Einrichtung bis zur täglichen Referenz.

## Wie funktioniert SignatureCat?

1. **Verbinden Sie Ihren Google Workspace.** Ein Workspace-Super-Admin autorisiert SignatureCat über [Domain-Wide Delegation](/docs/domain-wide-delegation/), damit es Ihr Nutzer-Directory lesen und Gmail-Signaturen schreiben kann.
2. **Erstellen Sie eine Vorlage.** Eine HTML-Vorlage mit [Variablen](/docs/template-variables/) wie `{{firstname}}` oder `{{jobtitle}}`, die pro Nutzer aus Ihrem Google Directory aufgelöst werden.
3. **Weisen Sie sie zu.** Binden Sie Vorlagen auf der Seite [Zuweisungen](https://app.signature.cat/assignments) an Gruppen, Organisationseinheiten oder alle auf einmal.
4. **Bleiben Sie aktuell.** Eine Hintergrund-Synchronisierung wendet Zuweisungen einmal am Tag erneut an, sodass Neueinstellungen und Teamwechsel die richtige Signatur erhalten, ohne dass jemand einen Finger rühren muss.

## Was Sie benötigen

- Eine **Google Workspace**-Domain (private Gmail-Konten werden nicht unterstützt).
- Einen **Workspace-Super-Admin**, der Ihr Unternehmen registriert und die einmalige Autorisierung abschließt. Die tägliche Arbeit kann danach über die [Benutzerverwaltung](/docs/user-management/) an Nicht-Admins delegiert werden.
- Etwa **10 Minuten** für die gesamte Ersteinrichtung.

> [!NOTE]
> Jeder Workspace startet mit einer kostenlosen 7-Tage-Testphase. Eine Karte wird bei der Registrierung erfasst und erstmals belastet, wenn die Testphase endet. Siehe [Rechnungen](/docs/invoices/) für Preise und Abrechnungsdetails.

## Erste Schritte

Folgen Sie den Einstiegsanleitungen der Reihe nach:

1. [Ihren Google Workspace verbinden](/docs/connect-google-workspace/) - Registrierung, Einrichtung und der Domain-Wide Delegation-Assistent.
2. [Ihre erste Vorlage erstellen](/docs/create-your-first-template/) - der Editor, Variablen, Vorschau und Test auf dem eigenen Postfach.
3. [Vorlagen zuweisen](/docs/assign-templates/) - Gruppen, OUs oder der gesamte Workspace.
4. [Einen Zuweisungsauftrag prüfen](/docs/verify-assignments/) - bestätigen, dass Signaturen dort angekommen sind, wo sie sollen.

## Wo Sie etwas nachschlagen

- [Vorlagen](/docs/templates/) und [Vorlagenvariablen](/docs/template-variables/) - die vollständige Editor- und Variablenreferenz.
- [Zuweisungen](/docs/assignments/) - Vorrangregeln und Alias-Modi.
- [Anwendungs-Aufträge](/docs/apply-jobs/) und [Protokolle](/docs/logs/) - wie der Signatur-Rollout nachverfolgt wird.
- [Benachrichtigungen](/docs/notifications/) - welche Hinweise per E-Mail kommen und welche in der App erscheinen.
- [Hilfe erhalten](/docs/get-help/) - Support-Kontakt und [Dienststatus](/docs/service-status/).
