---
title: Ihren Google Workspace verbinden
navTitle: Google Workspace verbinden
description: Registrieren Sie SignatureCat als Google Workspace-Super-Admin, richten Sie Ihr isoliertes Service-Konto ein und autorisieren Sie Domain-Wide Delegation.
updated: 2026-07-17
---

# Ihren Google Workspace verbinden

Um einen Google Workspace mit SignatureCat zu verbinden, meldet sich ein **Workspace-Super-Admin** unter [app.signature.cat](https://app.signature.cat) an, richtet ein dediziertes Service-Konto ein und autorisiert es in der Google Admin console über Domain-Wide Delegation (DWD). Der gesamte Ablauf dauert etwa 10 Minuten und ist genau einmal erforderlich.

> [!IMPORTANT]
> Die erste Registrierung eines Firmenkontos muss von einem **Google Workspace-Super-Admin** durchgeführt werden. Nur ein Super-Admin kann die Domain-Wide Delegation-Seite in der Google Admin console öffnen, und SignatureCat benötigt Directory-Zugriff, um Ihre Nutzerzahl korrekt zu ermitteln. Reguläre Nutzer können später eingeladen werden - sie benötigen keine Admin-Rechte. Siehe [Benutzerverwaltung](/docs/user-management/).

## Schritt 1: Mit Google anmelden

Öffnen Sie [app.signature.cat](https://app.signature.cat) und klicken Sie auf **Mit Google anmelden** mit Ihrem Firmenkonto. SignatureCat fordert an dieser Stelle nur die grundlegenden Anmelde-Bereiche `openid email profile` an - die Workspace-Berechtigungen werden separat in Schritt 3 erteilt, und zwar nur an Ihr eigenes isoliertes Service-Konto.

Private Gmail-Konten werden abgelehnt: SignatureCat erfordert ein Google Workspace-Konto.

## Schritt 2: Ihren Workspace einrichten

Direkt nach der ersten Anmeldung landen Sie auf dem Bildschirm **Richten Sie Ihren Workspace ein**. Ein Klick auf **Workspace einrichten** erstellt ein dediziertes, isoliertes Google Cloud-Service-Konto für Ihre Organisation - das ist die Identität, die in Ihrem Namen Gmail-Signaturen verwalten wird. Das dauert in der Regel wenige Sekunden (bis zu 15).

> [!NOTE]
> Jeder Kunde erhält sein **eigenes** Service-Konto. Dessen Zugangsdaten werden in einem Secrets-Tresor gespeichert, nie in der Anwendungsdatenbank, und die Schlüssel werden automatisch rotiert. Die Rotation ändert die Client-ID nie, Sie müssen also deswegen nie neu autorisieren.

Nur der Administrator, der die Organisation erstellt hat, kann diesen Schritt abschließen.

## Schritt 3: Domain-Wide Delegation autorisieren

Anschließend führt Sie der Assistent **SignatureCat im Workspace autorisieren** unter [app.signature.cat/onboarding/dwd](https://app.signature.cat/onboarding/dwd) durch die Google Admin console:

1. **Admin-Konsole öffnen** - der Assistent verlinkt direkt zur [Domain-wide delegation-Seite](https://admin.google.com/ac/owl/domainwidedelegation) (Sicherheit, API-Steuerung, Domain-wide delegation). Melden Sie sich als Super-Admin an.
2. **Hinzufügen** - klicken Sie auf **Add new**, um einen API-Client hinzuzufügen.
3. **Client-ID einfügen** - kopieren Sie die im Assistenten angezeigte numerische Client-ID (eindeutig für Ihre Organisation) und fügen Sie sie in das Formular der Admin console ein. Verwenden Sie den Kopieren-Button; es muss die numerische ID sein, keine E-Mail-Adresse.
4. **OAuth-Bereiche einfügen** - kopieren Sie die kommagetrennte Bereichs-Zeichenkette aus dem Assistenten und fügen Sie sie in das Feld für OAuth-Bereiche ein:

```
https://www.googleapis.com/auth/gmail.settings.basic,https://www.googleapis.com/auth/admin.directory.user.readonly,https://www.googleapis.com/auth/admin.directory.group.member.readonly,https://www.googleapis.com/auth/admin.directory.customer.readonly,https://www.googleapis.com/auth/gmail.settings.sharing
```

5. **Autorisieren** - klicken Sie in der Admin console auf **Authorize**.
6. **Prüfen** - klicken Sie zurück in SignatureCat auf **Prüfen**. Die App führt einen Verbindungstest für jeden Bereich aus und zeigt pro Bereich ein OK / Fehler-Ergebnis.

Der letzte Bereich, `gmail.settings.sharing`, ist **optional**: Er wird nur benötigt, um Signaturen auf send-as-Aliasse zu schreiben. Sie können ihn jetzt überspringen und später hinzufügen - alles andere funktioniert, und der Assistent zeigt den Hinweis „Alias-Signaturen sind deaktiviert". Siehe [Zuweisungen](/docs/assignments/#alias-modes) dazu, was Aliasse ermöglichen.

> [!WARNING]
> Fügen Sie die Bereichs-Zeichenkette exakt wie kopiert ein. Ein fehlender oder veränderter Bereich lässt die Prüfung mit einem Fehler pro Bereich fehlschlagen, etwa „Diese Berechtigung wurde nicht erteilt. Wiederholen Sie Schritt 4 mit der exakten Zeichenkette."

### Die Prüfung meldet, dass der Zugriff noch übernommen wird

Google braucht einen Moment, um eine frische DWD-Erteilung zu übernehmen - typischerweise Sekunden, manchmal bis zu etwa 30 Sekunden. Der Button **Prüfen** wartet dieses Fenster bereits größtenteils ab. Sehen Sie weiterhin die gelbe Karte „Der Zugriff wird möglicherweise noch übernommen", warten Sie einen Moment und klicken Sie erneut auf **Prüfen**. Das ist kein Fehler.

## Schritt 4: Abrechnung

Nachdem DWD verifiziert ist, gelangen Sie zur [Abrechnung](https://app.signature.cat/billing), um die kostenlose 7-Tage-Testphase zu starten (Karte wird vorab erfasst, belastet erst nach Ende der Testphase). Siehe [Rechnungen](/docs/invoices/) für die Preisstufen.

Das war's - machen Sie weiter mit [Ihre erste Vorlage erstellen](/docs/create-your-first-template/).

## Domain-Wide Delegation erneuern oder neu erteilen

Wird der DWD-Eintrag oder einer seiner Bereiche später in der Google Admin console entfernt, erkennt SignatureCat das vor der nächsten Synchronisierung: Signatur-Synchronisierungen pausieren, Admins erhalten eine Benachrichtigung in der App und eine E-Mail, und die App bittet Sie, den Assistenten erneut auszuführen.

Um ihn jederzeit erneut auszuführen, öffnen Sie die [Einstellungen](https://app.signature.cat/settings), suchen Sie den Bereich **Service-Konto** und klicken Sie auf **DWD-Assistent erneut ausführen** (dort wird auch die Client-ID angezeigt). Sobald die Prüfung besteht, werden die Synchronisierungen automatisch fortgesetzt.

> [!WARNING]
> Das Entfernen des Domain-Wide Delegation-Eintrags in der Admin console unterbricht sofort die Signaturverwaltung für Ihren gesamten Workspace. Wenn Sie Ihr SignatureCat-Konto löschen, entfernen Sie den DWD-Eintrag danach - SignatureCat kann ihn nicht für Sie entfernen.
