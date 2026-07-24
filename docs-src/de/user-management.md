---
title: Benutzerverwaltung und Zugriffsstufen
navTitle: Benutzerverwaltung
description: Wer sich bei SignatureCat anmelden kann, was jede Zugriffsstufe erlaubt und wie Sie einzelnen Nutzern oder ganzen Google-Gruppen Zugriff gewähren.
updated: 2026-07-17
---

# Benutzerverwaltung und Zugriffsstufen

Nur Personen, die Sie ausdrücklich hereinlassen, können sich bei SignatureCat anmelden: Workspace-Super-Admins (immer erlaubt), Nutzer mit direkter Zugriffsberechtigung und Mitglieder von Gruppen, denen Sie Zugriff gewährt haben. Alle anderen werden bei der Anmeldung abgewiesen. Der Zugriff wird auf der Seite [Benutzerverwaltung](https://app.signature.cat/user-management) verwaltet (nur Admins).

## Was erlaubt jede Zugriffsstufe?

| Zugriffsstufe | Was sie erlaubt |
|---|---|
| Self-Service | Setzt die eigene Signatur nur aus Organisationsvorlagen. |
| Self-Service + Bearbeiten | Self-Service plus eigenes HTML für die Signatur. |
| Designer | Bearbeitet die Signaturvorlagen der Organisation. |
| Editor | Designer plus Verwaltung von Zuweisungen und Anwendungs-Aufträgen sowie In-App-Benachrichtigungen. |
| Admin | Vollzugriff, einschließlich Abrechnung, Benutzerverwaltung, Bilddomains und DWD-Assistent. |

Ein paar praktische Konsequenzen:

- **Vorlagen** ([Signaturen](https://app.signature.cat/signatures)): Designer, Editor, Admin.
- **Zuweisungen und Anwenden** ([Zuweisungen](https://app.signature.cat/assignments), [Anwenden](https://app.signature.cat/apply)): Editor, Admin.
- **Abrechnung, Benutzerverwaltung, eigene Bilddomain**: nur Admin.
- Editoren sehen [Benachrichtigungen](/docs/notifications/) in der App; Hinweis- und Abrechnungs-**E-Mails** gehen nur an Admins.

> [!NOTE]
> Workspace-**Super-Admins** haben immer die Stufe Admin. Sie wird bei jeder Anmeldung durchgesetzt und kann in SignatureCat nicht entzogen werden - um sie zu ändern, ändern Sie deren Admin-Status in Google Workspace selbst.

## Wer kann sich anmelden?

Die Anmeldung erfolgt ausschließlich über Google und erfordert ein Google Workspace-Konto in Ihrer Domain. Versucht es jemand ohne Zugriff, sieht er: „Ihr Konto hat noch keinen Zugriff auf SignatureCat. Bitten Sie einen Workspace-Super-Admin, Ihnen Zugriff zu gewähren, und melden Sie sich dann erneut an." - und in Ihrem Workspace ändert sich nichts.

Sitzungen dauern bis zu 7 Tage Inaktivität mit einer harten Obergrenze von 14 Tagen, danach ist eine Google-Neuanmeldung mit einem Klick nötig.

## Einem einzelnen Nutzer Zugriff gewähren

1. Öffnen Sie die [Benutzerverwaltung](https://app.signature.cat/user-management) und klicken Sie auf **Zugriff hinzufügen**.
2. Geben Sie im Tab **Benutzer** die E-Mail-Adresse ein (sie muss zu Ihrem Workspace gehören, sekundäre Domains eingeschlossen).
3. Wählen Sie eine Zugriffsstufe und klicken Sie auf **Zugriff speichern**.

Der Nutzer erhält eine E-Mail-Einladung „Sie haben jetzt Zugriff auf signature.cat".

Eine direkte Nutzer-Berechtigung **überschreibt** immer jede Gruppen-Berechtigung für diese Person - selbst wenn die Gruppen-Berechtigung stärker ist.

## Einer ganzen Google-Gruppe Zugriff gewähren

1. Wechseln Sie im selben Bereich zum Tab **Gruppe**.
2. Fügen Sie die Gruppen-E-Mail ein (zum Beispiel `engineering@example.com`), wählen Sie die Stufe und speichern Sie.

> [!WARNING]
> Eine Gruppen-Berechtigung erfasst **alle in der Gruppe, auch künftig hinzugefügte Personen** - die Mitgliedschaft wird bei jeder Anmeldung live geprüft, ohne Bestätigung pro Person. Gewähren Sie breiten Gruppen die niedrigste Stufe, die ausreicht (in der Regel Self-Service).

> [!IMPORTANT]
> Die Gruppenmitgliedschaft wird bei der Anmeldung des Nutzers ausgewertet. Wer bereits angemeldet ist oder gerade zur Gruppe hinzugefügt wurde, muss sich unter Umständen **erneut anmelden**, bevor der neue Zugriff wirkt.

## Zugriff entfernen und ändern

- Bearbeiten oder entfernen Sie Berechtigungen auf derselben Seite. Das Entfernen einer Berechtigung blockiert die nächste Anmeldung; eine bereits auf das Postfach angewendete Signatur wird nicht entfernt.
- Sie können Ihren **eigenen** Zugriff nicht ändern oder entfernen - das muss ein anderer Admin tun (die Oberfläche zeigt statt der Bedienelemente ein „Sie"-Badge).
- Zugriffsstufen steuern nur die SignatureCat-App. Sie haben keine Auswirkung auf das Google-Konto des Nutzers.

## Nutzer ihre eigene Signatur verwalten lassen

Gewähren Sie Nutzern (oder einer Gruppe) die Stufe **Self-Service** und aktivieren Sie mindestens eine Vorlage für Self-Service - der vollständige Ablauf ist in [Self-Service](/docs/self-service/) beschrieben.
