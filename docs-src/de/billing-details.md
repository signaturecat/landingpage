---
title: Rechnungsdaten und Zahlungsdetails ändern
navTitle: Rechnungsdaten
description: Aktualisieren Sie Karte, Firmenname, Rechnungsadresse und Steuernummer für SignatureCat-Rechnungen über das Stripe-Abrechnungsportal.
updated: 2026-07-17
---

# Rechnungsdaten und Zahlungsdetails ändern

Zahlungskarten und Firmendaten für Rechnungen werden im **Stripe-Abrechnungsportal** verwaltet, das aus SignatureCat heraus geöffnet wird. Nur Admins haben Zugriff auf die Abrechnung.

## Die Zahlungskarte aktualisieren

1. Öffnen Sie [Abrechnung](https://app.signature.cat/billing) und klicken Sie auf **Abrechnung verwalten** (oder öffnen Sie [Einstellungen](https://app.signature.cat/settings), Bereich Abrechnung, **Im Stripe-Portal verwalten**).
2. Fügen Sie im Stripe-Portal die neue Karte hinzu und legen Sie sie als Standard fest.

Die nächste Abbuchung verwendet die neue Karte. Befinden Sie sich in einer Kulanzfrist nach fehlgeschlagener Zahlung, stellt eine erfolgreiche Abbuchung sofort alles wieder her.

## Firmenname, Adresse oder Steuernummer aktualisieren

Im selben Stripe-Portal können Sie den rechtlichen **Firmennamen**, die **Rechnungsadresse** und die **Steuernummer** (USt-IdNr. / NIP - polnische Unternehmen verwenden die USt-IdNr. mit dem Präfix `PL`) bearbeiten. Diese Angaben erscheinen auf jeder nach der Änderung ausgestellten Rechnung; bereits ausgestellte Rechnungen bleiben unverändert.

> [!NOTE]
> Die **Rechnungs-E-Mail** ist im Stripe-Portal bewusst nicht bearbeitbar - ändern Sie sie in den [Einstellungen](https://app.signature.cat/settings), Bereich Abrechnung, damit App und Stripe immer übereinstimmen. Siehe [Rechnungen](/docs/invoices/#set-the-invoice-email).

## Ihren Abonnementstatus prüfen

Der Bereich Abrechnung in den [Einstellungen](https://app.signature.cat/settings) zeigt den Abonnementstatus (Aktiv, Testphase, Überfällig, Gekündigt), die aktuelle Zahl aktiver Nutzer und das Verlängerungsdatum („Aktiv bis ...").

## Das Abonnement kündigen

Klicken Sie in den [Einstellungen](https://app.signature.cat/settings), Bereich Abrechnung, auf **Abonnement kündigen**. Der Zugriff läuft bis zum Ende des aktuellen Abrechnungszeitraums weiter, danach endet die Signaturverwaltung. Ihre Gmail-Signaturen werden nicht entfernt - sie werden lediglich nicht mehr verwaltet und aktualisiert.

> [!WARNING]
> Die Kündigung löscht weder Ihre Daten noch den Domain-Wide Delegation-Eintrag. Wenn Sie endgültig gehen, löschen Sie zusätzlich das Konto in der Gefahrenzone in den [Einstellungen](https://app.signature.cat/settings) und entfernen Sie den DWD-Eintrag in der Google Admin console - siehe [Domain-Wide Delegation](/docs/domain-wide-delegation/#removing-signaturecat).
