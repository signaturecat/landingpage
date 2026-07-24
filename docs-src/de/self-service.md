---
title: Self-Service-Signaturen
navTitle: Self-Service
description: Lassen Sie Endnutzer ihre eigene Gmail-Signatur aus admin-freigegebenen SignatureCat-Vorlagen wählen und anwenden - Einrichtung, Ablauf und Vorrangregeln.
updated: 2026-07-17
---

# Self-Service-Signaturen

Mit Self-Service wählt jeder Nutzer seine eigene Signatur aus Vorlagen, die Sie freigeben, und wendet sie sofort auf sein eigenes Postfach an - ohne das von jemand anderem anzufassen. Nutzer finden es unter **Meine Signatur** auf [app.signature.cat/self-service](https://app.signature.cat/self-service).

## Was Admins einrichten

Zwei Schalter machen Self-Service verfügbar:

1. **Vorlagen für Self-Service aktivieren.** Schalten Sie auf [Signaturen](https://app.signature.cat/signatures) Self-Service für jede Vorlage ein, die Nutzer wählen dürfen. Nur diese Vorlagen sind auf der Self-Service-Seite sichtbar.
2. **Nutzern Zugriff gewähren.** Gewähren Sie Nutzern oder Gruppen in der [Benutzerverwaltung](https://app.signature.cat/user-management) die Stufe **Self-Service** (oder **Self-Service + Bearbeiten**, um zusätzlich eigenes HTML zu erlauben). Siehe [Benutzerverwaltung](/docs/user-management/) - einschließlich der Warnung, dass Gruppen-Berechtigungen auch zukünftige Mitglieder erfassen.

> [!WARNING]
> Das Deaktivieren von Self-Service auf einer Vorlage löscht die Auswahl jedes Nutzers, der sie gewählt hat, und deren ausstehende Aufträge werden abgebrochen. Die App fragt vorher nach Bestätigung.

## Was der Nutzer tut

1. Unter [app.signature.cat](https://app.signature.cat) anmelden und **Meine Signatur** öffnen.
2. Eine **Organisationsvorlage** aus dem Dropdown wählen. Eine Live-Vorschau rendert anhand des eigenen Directory-Datensatzes des Nutzers.
3. Nutzer mit der Bearbeiten-Stufe können zu **Eigenes HTML** wechseln und das Markup anpassen, mit denselben verfügbaren [Variablen](/docs/template-variables/); **Auf Vorlage zurücksetzen** stellt das Original wieder her.
4. Auf **Signatur speichern** klicken. Die Signatur wird sofort auf das Postfach des Nutzers angewendet ("Gespeichert - auf Ihr Postfach angewendet"), einschließlich seiner akzeptierten send-as-Aliasse.

Ist das Dropdown leer, hat noch keine Vorlage Self-Service aktiviert: "Ihre Organisation hat noch keine Self-Service-Vorlagen veröffentlicht. Bitten Sie einen Admin, eine zu aktivieren."

## Wie Self-Service mit Zuweisungen zusammenspielt

Die Self-Service-Wahl eines Nutzers steht **ganz oben** auf der Vorrangleiter: Sie gewinnt über Gruppen-, OU- und Alle-Zuweisungen. Die einzige Ausnahme ist eine Zuweisung mit aktiviertem **Self-Service überschreiben**, die die Regel für die von ihr erfassten Nutzer umkehrt. Details: [Zuweisungen](/docs/assignments/#how-precedence-works).

> [!NOTE]
> Self-Service-Nutzer können immer nur ihre **eigene** Signatur setzen. Sie sehen nur die von Ihnen aktivierten Vorlagen, nie die Daten anderer Nutzer oder Admin-Seiten.
