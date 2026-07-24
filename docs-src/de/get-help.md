---
title: Hilfe erhalten
navTitle: Hilfe erhalten
description: So erreichen Sie den SignatureCat-Support, was in eine Meldung gehört und wo Sie vor dem Schreiben nachsehen sollten - Statusseite, Protokolle und häufige Lösungen.
updated: 2026-07-17
---

# Hilfe erhalten

Support gibt es per E-Mail an [contact@signature.cat](mailto:contact@signature.cat). Vor dem Schreiben führt ein kurzer Selbst-Check oft schneller zur Antwort - die meisten Fälle von "Signaturen werden nicht mehr angewendet" haben eine von drei bekannten Ursachen.

## Kurzer Selbst-Check

1. **Ist es ein Plattform-Vorfall?** Prüfen Sie [status.signature.cat](https://status.signature.cat/) - Vorfälle und Wartungen werden dort angekündigt. Siehe [Dienststatus](/docs/service-status/).
2. **Ist ein Auftrag fehlgeschlagen?** Öffnen Sie die [Aufgabenprotokolle](https://app.signature.cat/assignments/logs) und sehen Sie sich die Fehlercodes pro Nutzer an - [Einen Zuweisungsauftrag prüfen](/docs/verify-assignments/#what-the-per-user-rows-tell-you) erklärt jeden Code und seine Lösung.
3. **Ist Domain-Wide Delegation intakt?** Sind Synchronisierungen pausiert, haben Admins eine Benachrichtigung "Domain-Wide Delegation-Zugriff verloren" - führen Sie den Assistenten aus den [Einstellungen](https://app.signature.cat/settings) erneut aus. Siehe [Domain-Wide Delegation](/docs/domain-wide-delegation/#what-happens-if-dwd-is-removed-or-a-scope-revoked).
4. **Abrechnung pausiert?** Ein rotes Banner und der Status "Überfällig" auf [Abrechnung](https://app.signature.cat/billing) bedeuten, dass eine fehlgeschlagene Zahlung ihre Kulanzfrist überschritten hat - eine Kartenaktualisierung stellt alles wieder her. Siehe [Rechnungsdaten](/docs/billing-details/).

## An den Support schreiben

Schreiben Sie an [contact@signature.cat](mailto:contact@signature.cat), möglichst von einer Adresse Ihrer Workspace-Domain. Geben Sie an:

- Ihre **Workspace-Domain** (zum Beispiel `yourcompany.com`),
- **was Sie erwartet haben und was passiert ist**, mit Zeitstempeln und Ihrer Zeitzone,
- den **Auftragslink** (`app.signature.cat/jobs/...`) oder einen Screenshot der Zeile in den [Aufgabenprotokollen](https://app.signature.cat/assignments/logs), falls ein Auftrag beteiligt ist,
- jeden in der App angezeigten **Fehlercode** (Fehlermeldungen lassen sich aufklappen und zeigen Code, HTTP-Status und Request-ID - fügen Sie alle drei bei).

> [!TIP]
> Die Request-ID aus einer aufgeklappten Fehlermeldung lässt den Support Ihre exakte Anfrage in den Serverprotokollen finden - sie ist das nützlichste Einzelstück, das Sie anhängen können.

## Antwortzeiten

Support gibt es ausschließlich per E-Mail. Während der Testphase gibt es keine garantierte Antwortzeit; zahlende Kunden werden mit Priorität beantwortet. Vorfälle, die viele Kunden betreffen, werden öffentlich über die [Statusseite](https://status.signature.cat/) koordiniert.

## Funktionswünsche und Feedback

Senden Sie sie an dieselbe Adresse - echte Nutzungsberichte prägen die Roadmap. Beschreiben Sie Ihren Anwendungsfall statt nur den Funktionsnamen; das kommt besser an.
