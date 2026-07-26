---
title: Vorlagen
navTitle: Vorlagen
description: SignatureCat-Vorlagen-Referenz - der visuelle und der HTML-Editor, Starter, Vorschau, Test-Anwendung, Self-Service-Schalter, Standardvorlage und sicheres Löschen.
updated: 2026-07-26
---

# Vorlagen

Eine Vorlage ist ein einzelnes HTML-Dokument mit `{{variable}}`-Token, das SignatureCat pro Nutzer rendert. Vorlagen liegen auf der Seite [Signaturen](https://app.signature.cat/signatures) (Designer, Editoren und Admins) und werden entweder im [visuellen Editor](/docs/visual-editor/) oder in einem Code-Editor bearbeitet, beide mit Live-Vorschau.

Für einen geführten ersten Durchlauf siehe [Ihre erste Vorlage erstellen](/docs/create-your-first-template/). Der Variablensatz hat eine eigene Seite: [Vorlagenvariablen](/docs/template-variables/).

## Der Editor

Der Editor unter `app.signature.cat/signatures/{id}` hat zwei Tabs und öffnet sich in dem Modus, in dem die Vorlage zuletzt gespeichert wurde:

- **Visuell** - gestalten auf einer Arbeitsfläche, ohne HTML zu schreiben: Variablen-Chips, Ziehpunkte für Bildgrößen, Spalten, Schriften und eine garantiert Gmail-sichere Ausgabe. Er hat eine [eigene Seite](/docs/visual-editor/).
- **HTML** - das Signatur-Markup direkt bearbeiten, mit Autovervollständigung für alle `{{variable}}`-Token.

Die Konvertierung von HTML zu Visuell ist eine Einbahnstraße und erfolgt nach bestem Bemühen (komplexe Tabellen-Layouts werden abgeflacht; der Editor warnt vorher); das Speichern aus dem HTML-Tab verwirft das visuelle Dokument. In beiden Modi erhalten Sie:

- **Vorschau** - Live-Rendering der aufgelösten Signatur, in einer Sandbox. **Rendern als** setzt den Directory-Datensatz eines beliebigen echten Nutzers ein, damit Sie Grenzfälle prüfen können (lange Namen, fehlende Telefonnummern).
- **Variable einfügen** - Menü aller Personenvariablen, gruppiert und mit Hinweisen.
- **Logo / Banner** - die Bildgalerien pro Art; siehe [Banner und Logos](/docs/banners-and-logos/).
- **In {{del}} einschließen / In {{delete}} einschließen** - schließt die aktuelle Auswahl in bedingte Tags ein.
- **Mir eine Testsignatur setzen** - rendert anhand Ihres eigenen Directory-Datensatzes und wendet nur auf Ihr eigenes Gmail-Postfach an.
- **Name und Symbol** - ein Name, Symbol und eine Farbe für Vorlagenlisten (werden nie in Signaturen gerendert).

## Validierung und Bereinigung

Beim Speichern wird die Vorlage validiert und Folgendes abgelehnt:

- unbekannte Token (alles, was keine bekannte Variable, kein Asset-Token und kein bedingtes Tag ist),
- unausgeglichene `{{del}}`- / `{{delete}}`-Paare.

Fehlermeldungen sind konkret: Ein unbekanntes Token wird beim Namen genannt, und unausgeglichene bedingte Tags kommen mit ihren Öffnungs-/Schließzählern. Ein Live-Zähler verfolgt Gmails Signatur-Limit von 10.000 Zeichen.

Das HTML wird beim Speichern bereinigt: Skripte, iframes, Event-Handler (`onclick=` und Verwandte) und `javascript:`-URLs werden entfernt. Signaturen sind von Natur aus statisches HTML - Gmail würde aktive Inhalte ohnehin entfernen.

> [!TIP]
> Gmail-Signaturen rendern am besten mit tabellenbasierten Layouts und Inline-Styles. Vermeiden Sie externe CSS-Dateien und Webfonts; die meisten Mail-Clients ignorieren sie.

## Die Standardvorlage

Eine Vorlage kann als **Standard** markiert werden. Nutzer, die von keiner [Zuweisung](/docs/assignments/) oder [Self-Service](/docs/self-service/)-Wahl erfasst sind, fallen auf sie zurück - ebenso Nutzer, deren Zuweisung gelöscht wurde.

## Self-Service-Schalter

Jede Vorlage hat einen Self-Service-Schalter, der steuert, ob Endnutzer sie auf der Seite [Meine Signatur](https://app.signature.cat/self-service) wählen können. Das Deaktivieren löscht die Self-Service-Auswahlen, die sie verwenden (mit einer Bestätigung). Details: [Self-Service](/docs/self-service/).

## Eine Vorlage löschen

Das Löschen einer unbenutzten Vorlage entfernt sie einfach. Das Löschen einer Vorlage, die **in Verwendung** ist, zeigt zuerst einen Kaskaden-Dialog, der genau auflistet, was mit ihr verschwindet:

- ihre Gruppen- und OU-Zuweisungen,
- von Nutzern getroffene Self-Service-Auswahlen,
- eingereihte Anwendungs-Aufträge (werden abgebrochen).

> [!WARNING]
> Die Bestätigung mit **Trotzdem löschen** entfernt die Vorlage dauerhaft, zusammen mit ihren Zuweisungen und Self-Service-Auswahlen. Davon erfasste Nutzer fallen bei der nächsten Synchronisierung auf die Standardvorlage zurück. Dies kann nicht rückgängig gemacht werden.
