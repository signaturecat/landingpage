---
title: Dienststatus und SLA
navTitle: Dienststatus
description: Die Live-Statusseite von SignatureCat, das Ziel von 99 % monatlicher Verfügbarkeit, was als Ausfallzeit zählt und wo Wartungsfenster angekündigt werden.
updated: 2026-07-17
---

# Dienststatus und SLA

Live-Verfügbarkeit, Vorfälle und Wartungsfenster werden unter **[status.signature.cat](https://status.signature.cat/)** veröffentlicht. Die Statusseite ist der Referenzpunkt für die Verfügbarkeit: Was sie meldet, zählt - auch für das SLA unten. Ihr Badge wird außerdem im Kopfbereich dieser Dokumentation angezeigt.

## Verfügbarkeitsziel

SignatureCat strebt **mindestens 99 % Verfügbarkeit pro Kalendermonat** an, gemessen und veröffentlicht auf der [Statusseite](https://status.signature.cat/). Das Ziel gilt nicht während der kostenlosen Testphase.

Nicht als Ausfallzeit zählen:

- **geplante Wartungen**, vorab angekündigt unter [status.signature.cat/maintenance](https://status.signature.cat/maintenance),
- Ausfälle von Drittanbietern, von denen die Plattform abhängt (Hosting, CDN, Zahlungsabwicklung, Google-APIs),
- höhere Gewalt,
- Ursachen auf Kundenseite - insbesondere eine entzogene [Domain-Wide Delegation](/docs/domain-wide-delegation/)-Erteilung oder Änderungen an der Workspace-Konfiguration.

Die Signaturauslieferung hängt von der Verfügbarkeit und den Richtlinien der Google-APIs ab; Änderungen, die Google an diesen APIs oder an Ihrem Workspace vornimmt, liegen außerhalb der Kontrolle von SignatureCat.

Der vollständige, verbindliche Wortlaut steht in den [Nutzungsbedingungen](https://signature.cat/legal/) - die Bedingungen sehen standardmäßig keine Service-Gutschriften vor; individuelle SLA-Garantien können in einem separaten Vertrag vereinbart werden.

## Während eines Vorfalls

- Aktuelle Auswirkungen und Updates werden im Verlauf des Vorfalls auf der [Statusseite](https://status.signature.cat/) veröffentlicht.
- Signatur-**Synchronisierungen werden eingereiht, nicht verloren** - nach der Wiederherstellung bringt die tägliche Synchronisierung jedes Postfach zurück in seinen Zielzustand.
- Ausfälle oder Auffälligkeiten können Sie an [contact@signature.cat](mailto:contact@signature.cat) melden - siehe [Hilfe erhalten](/docs/get-help/).

## Wartungsfenster

Geplante technische Unterbrechungen werden vorab unter [status.signature.cat/maintenance](https://status.signature.cat/maintenance) angekündigt. Sie werden so geplant, dass die Auswirkungen minimal bleiben, und zählen nicht als Ausfallzeit.

> [!TIP]
> Die Statusseite bietet Abonnement-Optionen - abonnieren Sie sie mit Ihrem Ops- oder IT-Kanal, damit Vorfall-Updates Sie ohne manuelles Nachsehen erreichen.
