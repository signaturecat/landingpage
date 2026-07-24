---
title: Vorlagen Gruppen, OUs oder allen zuweisen
navTitle: Vorlagen zuweisen
description: Binden Sie SignatureCat-Vorlagen an Google-Gruppen, Organisationseinheiten oder jeden aktiven Nutzer im Workspace und synchronisieren Sie Signaturen bei Bedarf.
updated: 2026-07-17
---

# Vorlagen Gruppen, OUs oder allen zuweisen

Zuweisungen binden eine Vorlage an ein Ziel - eine Google-Gruppe, eine Organisationseinheit (OU) oder jeden aktiven Nutzer in Ihrem Workspace - und halten sie automatisch angewendet. Sie verwalten sie auf der Seite [Zuweisungen](https://app.signature.cat/assignments) (verfügbar für Editoren und Admins).

## Einer Gruppe zuweisen

1. Fügen Sie auf [Zuweisungen](https://app.signature.cat/assignments) unter **Gruppen-Zuweisungen** einen Eintrag hinzu.
2. Geben Sie die **Gruppen-E-Mail** ein (zum Beispiel `engineering@example.com`).
3. Wählen Sie die **Vorlage**.
4. Aktivieren Sie optional **+ Untergruppen**, um Mitglieder verschachtelter Gruppen einzuschließen.
5. Wählen Sie optional unter **Aliasse** einen Alias-Modus - siehe [Alias-Modi](/docs/assignments/#alias-modes) dazu, was "Adressen aus der Gruppe" und "Alle Aliasse" bewirken.

## Einer Organisationseinheit zuweisen

1. Fügen Sie unter **OU-Zuweisungen** einen Eintrag hinzu.
2. Geben Sie den **OU-Pfad** beginnend mit einem Schrägstrich ein, zum Beispiel `/Engineering`.
3. Wählen Sie die Vorlage und aktivieren Sie optional **+ Unter-OUs**, um den gesamten Teilbaum abzudecken.

## Dem gesamten Workspace zuweisen

Der Bereich **Allen zuweisen** enthält höchstens einen Eintrag pro Workspace. Er erfasst jeden aktiven (nicht gesperrten) Nutzer und dient als Basisebene: OU- und Gruppen-Zuweisungen überschreiben ihn weiterhin pro Nutzer, sodass Sie einen unternehmensweiten Standard setzen und ihn für einzelne Teams verfeinern können.

Klicken Sie auf **Allen zuweisen**, wählen Sie die Vorlage und speichern Sie das Formular.

> [!IMPORTANT]
> Die Zuweisung an alle erreicht jeden aktiven Nutzer in Ihrem Workspace, und die tägliche Synchronisierung wendet sie ohne weitere Bestätigung immer wieder an. Prüfen Sie die Vorlage sorgfältig vor dem Speichern - idealerweise nach einem [Test auf Ihrem eigenen Postfach](/docs/create-your-first-template/#test-it-on-your-own-mailbox).

## Wann ändern sich Signaturen tatsächlich?

- Klicken Sie auf der Zuweisungen-Seite auf **Jetzt synchronisieren**, um alles sofort anzuwenden, oder
- warten Sie auf die **tägliche Hintergrund-Synchronisierung**, die alle Zuweisungen einmal am Tag erneut anwendet und neue Gruppenmitglieder, OU-Wechsel und Neueinstellungen automatisch berücksichtigt.

Passt ein Nutzer auf mehrere Zuweisungen, gewinnt genau eine: Gruppe schlägt OU, OU schlägt die Zuweisung an alle, und die eigene [Self-Service](/docs/self-service/)-Wahl eines Nutzers schlägt sie alle, sofern die Zuweisung nicht **Self-Service überschreiben** aktiviert hat. Die genauen Regeln stehen in der [Zuweisungen-Referenz](/docs/assignments/#how-precedence-works).

Weiter: [Prüfen Sie den Zuweisungsauftrag](/docs/verify-assignments/), um zu bestätigen, dass alles angekommen ist.

> [!NOTE]
> Jedes Ziel kann nur eine Zuweisung tragen. Der Versuch, eine zweite für dieselbe Gruppe oder OU anzulegen, zeigt "Dieses Ziel hat bereits eine Zuweisung. Bearbeiten Sie den bestehenden Eintrag oder wählen Sie ein anderes Ziel."
