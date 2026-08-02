---
title: Rechtliches
navTitle: Rechtliches
description: Rechtsdokumente von SignatureCat - Nutzungsbedingungen, Datenschutzerklärung und AVV - sowie was die App aus Google Workspace liest und als Gmail-Signatur schreibt.
updated: 2026-08-02
---

# Rechtliches

Alle Rechtsdokumente liegen unter [signature.cat/legal](https://signature.cat/legal/). Die polnischen Fassungen der Nutzungsbedingungen und der Datenschutzerklärung sind rechtlich bindend; englische, deutsche und französische Übersetzungen werden zur Orientierung bereitgestellt.

## Dokumente

- **[Nutzungsbedingungen](https://signature.cat/legal/#terms)** - der Dienstleistungsvertrag, einschließlich der in [Dienststatus und SLA](/docs/service-status) beschriebenen Verfügbarkeitszusagen.
- **[Datenschutzerklärung](https://signature.cat/legal/#privacy)** - Datenkategorien, Zwecke, Rechtsgrundlagen, Aufbewahrungsfristen und Betroffenenrechte.
- **[Auftragsverarbeitungsvertrag (AVV)](https://signature.cat/legal/#dpa)** - geschlossen nach Art. 28 DSGVO, auf Englisch, auf Anfrage: E-Mail an [contact@signature.cat](mailto:contact@signature.cat). Kategorien von Unterauftragsverarbeitern sind in der Datenschutzerklärung aufgeführt; die vollständige namentliche Liste wird Kunden im Rahmen des AVV zur Verfügung gestellt.

## Datenschutz in Kürze

- SignatureCat wird **in der EU gehostet** und ist auf DSGVO-Konformität (RODO) ausgelegt.
- Die App liest die Directory-Felder, die für [Vorlagenvariablen](/docs/template-variables) benötigt werden, schreibt die fertige Signatur in die Gmail-Signatureinstellungen und kann diese Signatur zurücklesen, um zu zeigen, was Gmail tatsächlich gespeichert hat. Sie hat keinen Zugriff auf E-Mail-Inhalte.
- Nur wenn ein Admin [Benutzerdaten](/docs/user-data) ausdrücklich einschaltet, speichert die App zusätzlich Werte pro Nutzer - die, die der Admin oder der Nutzer einträgt - und nur für die Nutzer, die tatsächlich jemand überschrieben hat. Das Abschalten der Funktion löscht jeden gespeicherten Wert.
- Jeder Kunde läuft auf einem **isolierten Service-Konto**; die Zugangsdaten werden in einem Secrets-Tresor gespeichert und automatisch rotiert. Siehe [Domain-Wide Delegation](/docs/domain-wide-delegation) dazu, was genau autorisiert wird.
- Cookie-Einstellungen auf den Websites lassen sich jederzeit über den Link "Cookie-Einstellungen" im Footer von [signature.cat](https://signature.cat/) ändern.

> [!NOTE]
> Diese Seite ist eine Übersicht zur Orientierung, keine Rechtsberatung, und ersetzt nicht die verbindlichen Dokumente unter [signature.cat/legal](https://signature.cat/legal/).
