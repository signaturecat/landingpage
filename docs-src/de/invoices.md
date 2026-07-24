---
title: Rechnungen
navTitle: Rechnungen
description: Wie die SignatureCat-Abrechnung funktioniert - Preisstufen, die 7-Tage-Testphase, wohin Rechnungen gesendet werden und wie Sie eine eigene Rechnungs-E-Mail festlegen.
updated: 2026-07-17
---

# Rechnungen

SignatureCat rechnet monatlich pro aktivem Workspace-Nutzer ab, über Stripe. Rechnungen und Belege werden an Ihre **Rechnungs-E-Mail**-Adresse gesendet, die Sie unabhängig von jedem Admin-Konto auf Ihr Buchhaltungspostfach zeigen lassen können. Rechnungen für einen Monat werden spätestens am **10. Tag des Folgemonats** ausgestellt.

## Preise

Die Preise sind pro Nutzer gestaffelt - jede Stufe hat ihren eigenen Satz, und größere Workspaces werden anteilig günstiger:

| Nutzerzahl im Workspace | Preis pro Nutzer / Monat |
|---|---|
| 1 - 50 | 0,80 $ |
| 51 - 120 | 0,70 $ |
| 121 - 300 | 0,60 $ |
| 301+ | 0,55 $ |

Beispiel: 60 Nutzer kosten 50 x 0,80 $ + 10 x 0,70 $ = 47,00 $ pro Monat. Preise in USD, zuzüglich Steuern.

**Was als abrechenbarer Nutzer zählt:** die Zahl der aktiven (nicht gesperrten) Nutzer in Ihrem Google Workspace-Directory - nicht die Zahl der SignatureCat-Anmeldungen. Zuwächse werden sofort mit anteiliger Berechnung berücksichtigt; sinkt Ihre Nutzerzahl, gilt der niedrigere Wert ab dem nächsten Abrechnungszeitraum.

## Die 7-Tage-Testphase

Jeder Workspace startet mit einer kostenlosen 7-Tage-Testphase. Eine Karte wird bei der Registrierung erfasst und erstmals belastet, wenn die Testphase endet. In den letzten 3 Tagen der Testphase zeigt die App ein Erinnerungsbanner, und Sie erhalten außerdem etwa 3 Tage vor dem Ende eine E-Mail „Ihre signature.cat-Testphase endet bald".

> [!NOTE]
> Die Testphase wird **einmal pro Workspace-Domain** gewährt. Das Löschen des Kontos und die erneute Registrierung derselben Domain startet keine neue Testphase.

## Die Rechnungs-E-Mail festlegen

1. Öffnen Sie die [Einstellungen](https://app.signature.cat/settings) (nur Admin) und suchen Sie den Bereich **Abrechnung**.
2. Geben Sie die Adresse unter **Rechnungs-E-Mail** ein - „Stripe sendet Rechnungen und Belege an diese Adresse. Sie kann von der E-Mail des Admin-Kontos abweichen." - und klicken Sie auf **Speichern**.

Nutzen Sie das, um Belege direkt an die Buchhaltung zu leiten (zum Beispiel `invoices@yourcompany.com`). Abrechnungsbezogene Produkt-Hinweise (Testphase endet, Zahlung fehlgeschlagen) sind davon getrennt und gehen an Admin-Nutzer - siehe [Benachrichtigungen](/docs/notifications/).

## Firmendaten auf der Rechnung

Ihr rechtlicher Firmenname, die Rechnungsadresse und die Steuernummer (USt-IdNr. / NIP) werden ausschließlich in Stripe gespeichert und auf jeder Rechnung gedruckt, die nach ihrer Hinterlegung ausgestellt wird. Sie geben sie beim Checkout an und können sie jederzeit bearbeiten - siehe [Rechnungsdaten](/docs/billing-details/). Änderungen gelten für zukünftige Rechnungen; bereits ausgestellte Rechnungen sind unveränderlich.

## Was passiert, wenn eine Zahlung fehlschlägt?

Eine fehlgeschlagene Abbuchung kappt den Zugriff **nicht** sofort. Sie erhalten eine E-Mail „Handlung erforderlich - signature.cat-Zahlung fehlgeschlagen" und ein rotes Banner in der App, und Sie haben eine kurze Kulanzfrist (bis zu 3 Tage), um die Karte über **Abrechnung verwalten** auf [Abrechnung](https://app.signature.cat/billing) zu aktualisieren. Verstreicht die Frist ohne erfolgreiche Abbuchung, wird die Signaturverwaltung pausiert, bis die Zahlung gelingt - Ihre Gmail-Signaturen bleiben, wie sie sind, aber Änderungen und Synchronisierungen stoppen.
