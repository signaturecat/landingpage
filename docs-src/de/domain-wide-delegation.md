---
title: Domain-Wide Delegation
navTitle: Domain-Wide Delegation
description: Wie SignatureCat Google Domain-Wide Delegation nutzt - Bereiche, die kundeneigene Client-ID, Propagation, Erkennung von Entzug und Neuerteilung.
updated: 2026-07-17
---

# Domain-Wide Delegation

Domain-Wide Delegation (DWD) ist der Google Workspace-Mechanismus, mit dem das dedizierte Service-Konto von SignatureCat Ihr Directory lesen und Gmail-Signaturen schreiben kann - ohne je ein Passwort zu kennen. Sie erteilen die Berechtigung einmal in der Google Admin console; diese Seite erklärt genau, was erteilt wird und wie es sich über die Zeit verhält.

Die Schritt-für-Schritt-Einrichtung steht in [Ihren Google Workspace verbinden](/docs/connect-google-workspace/). Dies ist die Referenz.

## Was genau autorisiere ich?

Sie fügen **einen API-Client** auf der [Domain-wide delegation-Seite](https://admin.google.com/ac/owl/domainwidedelegation) der Admin console hinzu, identifiziert durch eine numerische **Client-ID**, die für Ihre Organisation eindeutig ist (jeder SignatureCat-Kunde hat sein eigenes isoliertes Service-Konto). Die Client-ID wird im DWD-Assistenten und später in den [Einstellungen](https://app.signature.cat/settings), Bereich Service-Konto, angezeigt.

Die Bereiche und wozu jeder dient:

| Bereich | Erforderlich | Verwendet für |
|---|---|---|
| `gmail.settings.basic` | Ja | Schreiben der Signatur auf der primären Adresse jedes Nutzers. |
| `admin.directory.user.readonly` | Ja | Lesen der Nutzerprofile - Namen, Positionen, Telefonnummern - für [Vorlagenvariablen](/docs/template-variables/). |
| `admin.directory.group.member.readonly` | Ja | Auflösen von Gruppen-Zuweisungen in Mitglieder. |
| `admin.directory.customer.readonly` | Ja | Lesen der Workspace-Nutzerzahl für die Abrechnung. |
| `gmail.settings.sharing` | Optional | Schreiben von Signaturen auf send-as-**Aliassen**. Ohne diesen Bereich bleiben Alias-Funktionen deaktiviert. |

SignatureCat fordert nie Bereiche für E-Mail-Inhalte an - es kann niemandes E-Mails lesen oder senden.

## Ist die Client-ID stabil?

Ja. SignatureCat rotiert seine Service-Konto-Schlüssel aus Sicherheitsgründen automatisch, aber die Rotation erzeugt einen neuen Schlüssel auf **demselben** Service-Konto - die numerische Client-ID ändert sich nie. Sie müssen DWD wegen einer Schlüsselrotation nie neu autorisieren.

## Wie schnell wirkt eine neue Erteilung?

Google übernimmt DWD-Änderungen mit Verzögerung - meist Sekunden, gelegentlich bis zu etwa 30 Sekunden. Der Button **Prüfen** im Assistenten wartet dieses Fenster ab, bevor er einen Fehler meldet, sodass ein einziger Klick direkt nach der Autorisierung in der Regel gelingt. Eine gelbe „Wird übernommen"-Karte bedeutet genau das: Warten Sie einen Moment und prüfen Sie erneut.

## Was passiert, wenn DWD entfernt oder ein Bereich entzogen wird?

SignatureCat prüft den DWD-Zustand vor jeder Synchronisierung. Wenn er bricht:

- **pausieren** Signatur-Synchronisierungen sofort (nichts wird halb angewendet),
- Admins erhalten die In-App-Benachrichtigung „Domain-Wide Delegation-Zugriff verloren" und eine „Handlung erforderlich"-E-Mail,
- die App leitet Admins zurück zum DWD-Assistenten.

Die Neuerteilung des fehlenden Eintrags oder Bereichs und ein bestandenes **Prüfen** setzen alles fort - der Zustand heilt sich selbst, nichts muss neu aufgebaut werden. Um den Assistenten jederzeit wieder zu öffnen, nutzen Sie **DWD-Assistent erneut ausführen** in den [Einstellungen](https://app.signature.cat/settings), Bereich Service-Konto.

> [!WARNING]
> Die DWD-Erteilung gilt organisationsweit, und ihr Entfernen stoppt die Signaturverwaltung für den gesamten Workspace auf einmal. Möchten Sie nur die Alias-Unterstützung aufgeben, entfernen Sie nur den Bereich `gmail.settings.sharing` und führen Sie **Prüfen** erneut aus.

## Den optionalen Alias-Bereich später hinzufügen

Fügen Sie `https://www.googleapis.com/auth/gmail.settings.sharing` zum bestehenden Eintrag in der Admin console hinzu (behalten Sie die anderen vier Bereiche), dann **DWD-Assistent erneut ausführen** und auf **Prüfen** klicken. Alias-Funktionen werden automatisch freigeschaltet - siehe [Alias-Modi](/docs/assignments/#alias-modes).

## SignatureCat entfernen

Wenn Sie Ihr Konto löschen, entfernt SignatureCat seine eigene Infrastruktur, kann aber Ihre Admin console nicht bearbeiten: **Löschen Sie den API-Client-Eintrag selbst** auf der [Domain-wide delegation-Seite](https://admin.google.com/ac/owl/domainwidedelegation), nachdem das Konto weg ist.
