---
title: Benachrichtigungen
navTitle: Benachrichtigungen
description: Welche SignatureCat-Hinweise per E-Mail eintreffen und welche in der App erscheinen - DWD-Verlust, fehlende Zuweisungsziele, Testphasen- und Zahlungsereignisse.
updated: 2026-07-17
---

# Benachrichtigungen

SignatureCat benachrichtigt Sie über zwei Kanäle: **E-Mail** für Konto-Ereignisse, die Handlung erfordern, und die **Benachrichtigungsglocke in der App** für operative Hinweise. E-Mails gehen an Admins (und den Kontoinhaber); die Glocke ist für Admins und Editoren sichtbar.

## Was kommt per E-Mail?

| E-Mail | Wann sie gesendet wird | Wer sie erhält |
|---|---|---|
| Willkommen bei signature.cat | Erste Anmeldung eines neuen Nutzers | Der neue Nutzer |
| Sie haben jetzt Zugriff auf signature.cat | Ein Admin gewährt einem Nutzer Zugriff über die [Benutzerverwaltung](https://app.signature.cat/user-management) | Der berechtigte Nutzer |
| Ihre signature.cat-Testphase hat begonnen | Testphase beginnt | Admins + Inhaber |
| Ihre signature.cat-Testphase endet bald | Etwa 3 Tage vor Ende der Testphase | Admins + Inhaber |
| Ihr signature.cat-Plan ist aktiv | Erste erfolgreiche Abbuchung nach der Testphase | Admins + Inhaber |
| Handlung erforderlich - signature.cat-Zahlung fehlgeschlagen | Eine Abbuchung schlägt fehl (Kulanzfrist beginnt) | Admins + Inhaber |
| Ein signature.cat-Zuweisungsziel existiert nicht mehr | Eine zugewiesene Gruppe oder OU wurde im Workspace gelöscht | Admins + Inhaber |
| Handlung erforderlich - signature.cat hat den Workspace-Zugriff verloren (DWD) | Domain-Wide Delegation brach oder ein erforderlicher Bereich wurde entzogen | Admins + Inhaber |

Hinweis-E-Mails werden dedupliziert (höchstens eine pro Thema und Tag) und nur beim Eintritt in den Fehlerzustand gesendet, nicht bei jedem erneuten Versuch.

> [!NOTE]
> Diese Produkt-E-Mails sind getrennt von den **Rechnungen und Belegen** von Stripe, die an die [Rechnungs-E-Mail](/docs/invoices/#set-the-invoice-email)-Adresse gehen. Editoren und Designer erhalten keine Hinweis-E-Mails - nur Benachrichtigungen in der App.

## Was erscheint in der App?

Das Glockensymbol in der oberen Navigation (Admins und Editoren) sammelt operative Benachrichtigungen; ungelesene zeigen ein Badge, und jeder Eintrag lässt sich verwerfen.

| In-App-Benachrichtigung | Schweregrad | Auslöser |
|---|---|---|
| Domain-Wide Delegation-Zugriff verloren | Fehler | DWD oder ein erforderlicher Bereich brach; Synchronisierungen sind pausiert, bis ein Admin den [DWD-Assistenten](/docs/domain-wide-delegation/#what-happens-if-dwd-is-removed-or-a-scope-revoked) erneut ausführt. |
| Gruppe / OU existiert nicht mehr | Warnung | Ein [Zuweisungsziel](/docs/assignments/#when-targets-disappear) fehlt; der Worker versucht es bei der nächsten Synchronisierung erneut. |
| Benutzer ohne Self-Service-Signatur | Warnung | Self-Service-Nutzer, die noch keine Vorlage gewählt haben (höchstens einmal pro 7 Tage). |
| Ihre Testphase endet bald | Warnung | Etwa 3 Tage vor Ende der Testphase. |
| Zahlung fehlgeschlagen | Fehler | Eine Abbuchung schlug fehl; die Kulanzfrist läuft. |

Neben der Glocke können zwei Banner in der App erscheinen: das gelbe **Testphasen-Banner** in den letzten Tagen der Testphase und das rote **Zahlungs-Banner** („Aktualisieren Sie Ihre Karte bis {date}, sonst wird die Signaturverwaltung pausiert") während der Kulanzfrist.

## Empfohlene Einrichtung

- Stellen Sie sicher, dass mindestens ein regelmäßig gelesenes Postfach die Stufe **Admin** hat - Hinweis-E-Mails gehen nur an Admins und den Inhaber. Siehe [Benutzerverwaltung](/docs/user-management/).
- Lassen Sie die [Rechnungs-E-Mail](/docs/invoices/#set-the-invoice-email) auf die Buchhaltung zeigen, damit Belege nie von einem Admin-Postfach abhängen.
- Beobachten Sie [status.signature.cat](https://status.signature.cat/) für Vorfälle auf Plattformebene - siehe [Dienststatus](/docs/service-status/).
