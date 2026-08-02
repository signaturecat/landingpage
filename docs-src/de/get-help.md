---
title: Hilfe erhalten
navTitle: Hilfe erhalten
description: So erreichen Sie den SignatureCat-Support bei Problemen mit Gmail-Signaturen - was Sie zuerst in Status, Protokollen und dem Google Workspace-Zugriff prüfen und was in die Meldung gehört.
updated: 2026-08-02
---

# Hilfe erhalten

Support gibt es per E-Mail an [contact@signature.cat](mailto:contact@signature.cat). Vor dem Schreiben führt ein kurzer Selbst-Check oft schneller zur Antwort - die meisten Fälle von "Signaturen werden nicht mehr angewendet" haben eine von drei bekannten Ursachen.

## Kurzer Selbst-Check

1. **Ist es ein Plattform-Vorfall?** Prüfen Sie [status.signature.cat](https://status.signature.cat/) - Vorfälle und Wartungen werden dort angekündigt. Siehe [Dienststatus](/docs/service-status).
2. **Ist ein Auftrag fehlgeschlagen?** Öffnen Sie die [Aufgabenprotokolle](https://app.signature.cat/logs) und sehen Sie sich die Fehlercodes pro Nutzer an - [Einen Zuweisungsauftrag prüfen](/docs/verify-assignments#was-die-zeilen-pro-nutzer-aussagen) erklärt jeden Code und seine Lösung.
3. **Ist Domain-Wide Delegation intakt?** Sind Synchronisierungen pausiert, haben Admins eine Benachrichtigung "Domain-Wide Delegation-Zugriff verloren" - führen Sie den Assistenten aus den [Einstellungen](https://app.signature.cat/settings) erneut aus. Siehe [Domain-Wide Delegation](/docs/domain-wide-delegation#was-passiert-wenn-dwd-entfernt-oder-ein-bereich-entzogen-wird).
4. **Abrechnung pausiert?** Ein rotes Banner und der Status "Überfällig" auf [Abrechnung](https://app.signature.cat/billing) bedeuten, dass eine fehlgeschlagene Zahlung ihre Kulanzfrist überschritten hat - eine Kartenaktualisierung stellt alles wieder her. Siehe [Rechnungsdaten](/docs/billing-details).
5. **Angewendet, aber in Gmail abgeschnitten?** War der Auftrag erfolgreich und die Signatur sieht im Postfach trotzdem unvollständig aus, achten Sie in der Ergebniszeile auf das bernsteinfarbene Badge **von Gmail gekürzt** - Gmail hat die Signatur beim Speichern umgeschrieben. Siehe [Wenn Gmail Ihre Signatur kürzt](/docs/gmail-sanitization).

## An den Support schreiben

Schreiben Sie an [contact@signature.cat](mailto:contact@signature.cat), möglichst von einer Adresse Ihrer Workspace-Domain. Geben Sie an:

- Ihre **Workspace-Domain** (zum Beispiel `yourcompany.com`),
- **was Sie erwartet haben und was passiert ist**, mit Zeitstempeln und Ihrer Zeitzone,
- den **Auftragslink** (`app.signature.cat/jobs/...`) oder einen Screenshot der Zeile in den [Aufgabenprotokollen](https://app.signature.cat/logs), falls ein Auftrag beteiligt ist,
- jeden in der App angezeigten **Fehlercode** (Fehlermeldungen lassen sich aufklappen und zeigen Code, HTTP-Status und Request-ID - fügen Sie alle drei bei).

> [!TIP]
> Die Request-ID aus einer aufgeklappten Fehlermeldung lässt den Support Ihre exakte Anfrage in den Serverprotokollen finden - sie ist das nützlichste Einzelstück, das Sie anhängen können.

## Antwortzeiten

Support gibt es ausschließlich per E-Mail. Während der Testphase gibt es keine garantierte Antwortzeit; zahlende Kunden werden mit Priorität beantwortet. Vorfälle, die viele Kunden betreffen, werden öffentlich über die [Statusseite](https://status.signature.cat/) koordiniert.

## Funktionswünsche und Feedback

Senden Sie sie an dieselbe Adresse - echte Nutzungsberichte prägen die Roadmap. Beschreiben Sie Ihren Anwendungsfall statt nur den Funktionsnamen; das kommt besser an.
