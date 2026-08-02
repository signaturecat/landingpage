---
title: Self-Service-Signaturen
navTitle: Self-Service
description: Lassen Sie Endnutzer ihre eigene Gmail-Signatur aus admin-freigegebenen SignatureCat-Vorlagen wählen und anwenden - Einrichtung, Ablauf, eigene Daten und Vorrangregeln.
updated: 2026-08-02
---

# Self-Service-Signaturen

Mit Self-Service wählt jeder Nutzer seine eigene Signatur aus Vorlagen, die Sie freigeben, und wendet sie sofort auf sein eigenes Postfach an - ohne das von jemand anderem anzufassen. Nutzer finden es unter **Meine Signatur** auf [app.signature.cat/self-service](https://app.signature.cat/self-service).

## Was Admins einrichten

Zwei Schalter machen Self-Service verfügbar:

1. **Vorlagen für Self-Service aktivieren.** Schalten Sie auf [Signaturen](https://app.signature.cat/signatures) Self-Service für jede Vorlage ein, die Nutzer wählen dürfen. Nur diese Vorlagen sind auf der Self-Service-Seite sichtbar.
2. **Nutzern Zugriff gewähren.** Gewähren Sie Nutzern oder Gruppen in der [Benutzerverwaltung](https://app.signature.cat/user-management) die Stufe **Self-Service** (oder **Self-Service + Bearbeiten**, um zusätzlich eigenes HTML zu erlauben). Siehe [Benutzerverwaltung](/docs/user-management) - einschließlich der Warnung, dass Gruppen-Berechtigungen auch zukünftige Mitglieder erfassen.

> [!WARNING]
> Das Deaktivieren von Self-Service auf einer Vorlage löscht die Auswahl jedes Nutzers, der sie gewählt hat, und deren ausstehende Aufträge werden abgebrochen. Die App fragt vorher nach Bestätigung.

## Was der Nutzer tut

1. Unter [app.signature.cat](https://app.signature.cat) anmelden und **Meine Signatur** öffnen.
2. Eine **Organisationsvorlage** aus dem Dropdown wählen. Eine Live-Vorschau rendert anhand des eigenen Directory-Datensatzes des Nutzers.
3. Nutzer mit der Bearbeiten-Stufe können zu **Eigenes HTML** wechseln und das Markup anpassen, mit denselben verfügbaren [Variablen](/docs/template-variables); **Auf Vorlage zurücksetzen** stellt das Original wieder her.
4. Auf **Signatur speichern** klicken. Die Signatur wird sofort auf das Postfach des Nutzers angewendet ("Gespeichert - auf Ihr Postfach angewendet"), einschließlich seiner akzeptierten send-as-Aliasse.

Ist das Dropdown leer, hat noch keine Vorlage Self-Service aktiviert: "Ihre Organisation hat noch keine Self-Service-Vorlagen veröffentlicht. Bitten Sie einen Admin, eine zu aktivieren."

## Meine Signaturdaten

**Meine Signaturdaten** ist eine Schaltfläche auf der Seite **Meine Signatur**, auf der ein Nutzer seine eigenen Werte für die Variablen in seiner Signatur einträgt - Position, Telefon, Adresse und den Rest. Sie erscheint, sobald ein Admin die Benutzerdaten für die Organisation eingeschaltet und das Schloss **Self-Service-Bearbeitung** geöffnet hat; siehe [Benutzerdaten](/docs/user-data).

Für den Nutzer läuft es so:

1. [Meine Signatur](https://app.signature.cat/self-service) öffnen und auf **Meine Signaturdaten** klicken.
2. Das Fenster **Ergänzen Sie Ihre Daten** öffnet sich: "Diese Werte füllen die Variablen in Ihrer Signatur."
3. Jedes Feld zeigt den Wert aus Ihrem Unternehmensverzeichnis, bis Sie auf das Symbol daneben klicken und Ihren eigenen eintippen.
4. Auf **Meine Daten speichern** klicken. **Verzeichnisdaten verwenden** tut das Gegenteil: Es entfernt alles, was Sie eingetragen haben, und setzt jedes Feld zurück auf den Verzeichniswert.

Was sich dadurch ändert:

- Die Werte speisen dieselben [Vorlagenvariablen](/docs/template-variables) wie überall sonst - die von Ihnen gewählte Organisationsvorlage, die Vorschau auf der Seite und die Signatur in Ihrem Postfach verwenden sie alle.
- Das Speichern wendet Ihre Signatur sofort erneut auf Ihr Postfach an ("Gespeichert. Ihre Signatur wird gerade aktualisiert."). Lässt sich in diesem Moment nichts anwenden, geht die Änderung mit der nächsten Signatur-Aktualisierung hinaus.
- Sie können immer nur Ihren **eigenen** Datensatz bearbeiten. Das Fenster arbeitet stets mit Ihrer eigenen Adresse.
- Ihr Admin sieht jeden Eintrag, einschließlich der Angabe, wer ihn zuletzt geändert hat, und kann ihn überschreiben oder löschen.

> [!NOTE]
> Keine Schaltfläche **Meine Signaturdaten** auf der Seite? Dann sind die Benutzerdaten für Ihre Organisation abgeschaltet, oder die Self-Service-Bearbeitung ist noch gesperrt. Fragen Sie einen Admin.

## Wie Self-Service mit Zuweisungen zusammenspielt

Die Self-Service-Wahl eines Nutzers steht **ganz oben** auf der Vorrangleiter: Sie gewinnt über Gruppen-, OU- und Alle-Zuweisungen. Die einzige Ausnahme ist eine Zuweisung mit aktiviertem **Self-Service überschreiben**, die die Regel für die von ihr erfassten Nutzer umkehrt. Details: [Zuweisungen](/docs/assignments#wie-der-vorrang-funktioniert).

> [!NOTE]
> Self-Service-Nutzer können immer nur ihre **eigene** Signatur setzen. Sie sehen nur die von Ihnen aktivierten Vorlagen, nie die Daten anderer Nutzer oder Admin-Seiten.
