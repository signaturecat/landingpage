---
title: Visueller Editor
navTitle: Visueller Editor
description: Gestalten Sie Gmail-Signaturen, ohne HTML zu schreiben - der visuelle Editor von SignatureCat mit Variablen-Chips, Bildgrößenänderung, Spalten, Schriften und garantiert Gmail-sicherer Ausgabe.
updated: 2026-07-26
---

# Visueller Editor

Mit dem visuellen Editor gestalten Sie eine Signaturvorlage, ohne eine Zeile HTML zu schreiben. Sie arbeiten auf einer Arbeitsfläche mit Textformatierung, Variablen-Chips und Bildern in Echtgröße - und alles, was er erzeugt, ist garantiert E-Mail-sicher: Der Editor kann nur Markup ausgeben, das in Gmail korrekt rendert, sodass sich gar keine Signatur bauen lässt, die im Postfach bricht.

Der Editor liegt auf derselben Seite wie der [HTML-Editor](/docs/templates/#the-editor): Öffnen Sie eine beliebige Vorlage auf [Signaturen](https://app.signature.cat/signatures) und wechseln Sie zwischen den Tabs **Visuell** und **HTML**.

## Bearbeitungsmodi

Jede Vorlage wird in einem von zwei Modi bearbeitet, und der Editor öffnet sich in dem Modus, in dem die Vorlage zuletzt gespeichert wurde:

- **Visuell** - die auf dieser Seite beschriebene Arbeitsfläche. Beim Speichern werden sowohl das visuelle Dokument als auch das erzeugte HTML gespeichert.
- **HTML** - der klassische Code-Editor mit Token-Autovervollständigung; siehe [Vorlagen](/docs/templates/#the-editor).

Der Wechsel ist jederzeit möglich, mit zwei Einschränkungen:

- **HTML zu Visuell ist eine Einweg-Konvertierung.** Der Importer übersetzt Ihr Markup nach bestem Bemühen in Blöcke auf der Arbeitsfläche - einfache Layouts (einschließlich einzeiliger Tabellen, die zu [Spalten](#spalten) werden) konvertieren sauber, tief verschachtelte Tabellen-Layouts werden dagegen abgeflacht. Vor einer verlustbehafteten Konvertierung warnt der Editor.
- **Visuell zu HTML ist ein Downgrade.** Sie erhalten das erzeugte HTML zur freien Bearbeitung, aber das Speichern aus dem HTML-Tab verwirft das visuelle Dokument - wer später zurückwechselt, konvertiert erneut.

## Text, Schriften und Farben

Die Arbeitsfläche unterstützt die Formatierung, die Mail-Clients zuverlässig überlebt: Absätze, **fett**, *kursiv*, Unterstreichung, Aufzählungs- und nummerierte Listen, eine E-Mail-sichere Textfarbpalette, Links (Web, mailto und tel) sowie Rückgängig/Wiederholen.

Zwei Dropdowns steuern die Typografie:

- **Schriftgröße** - 10 bis 24 px.
- **Schriftart** - "Standard (Mail-Client)" plus sieben websichere Familien: Arial, Verdana, Tahoma, Trebuchet MS, Georgia, Times New Roman und Courier New. Die Standardoption gibt gar keine Schrift aus und überlässt jedem Empfänger die seines Mail-Clients - die sicherste Wahl.

> [!NOTE]
> Websichere Schriften rendern konsistent, weil sie mit dem System des Empfängers ausgeliefert werden, nicht mit der E-Mail. Beim ersten Auswählen einer Nicht-Standard-Schrift zeigt der Editor einen kurzen Kompatibilitätshinweis.

## Spalten

Fügen Sie über die Werkzeugleiste eine Zeile mit 2 oder 3 Spalten ein, um Inhalte nebeneinander zu platzieren - zum Beispiel ein Foto links und Kontaktdaten rechts. Spalten werden im erzeugten HTML als einzeilige Tabelle gespeichert, die einzige Layout-Technik, die jeder Mail-Client korrekt rendert. Vorhandene einzeilige Tabellen in importiertem HTML werden automatisch zu Spalten.

## Variablen als Chips

Personenvariablen wie `{{firstname}}` oder `{{phone}}` erscheinen auf der Arbeitsfläche als **Chips** - feste Token, die Sie nicht versehentlich durch Hineintippen zerstören können. Chips können:

- über das Menü **Variable einfügen** eingefügt werden,
- wie Text formatiert werden (fett, kursiv und Unterstreichung wirken auf den aufgelösten Wert),
- per Drag-and-drop an eine beliebige Stelle der Arbeitsfläche gezogen werden,
- mit dem Papierkorb-Button entfernt werden, der beim Überfahren mit der Maus erscheint.

Die vollständige Variablenliste und die Auflösungsregeln stehen in [Vorlagenvariablen](/docs/template-variables/).

## Bilder: Logo, Banner und Foto

`{{logo}}`, `{{banner}}` und `{{photo}}` werden auf der Arbeitsfläche als Bild-Chips in ihrer echten Größe gerendert - die Logo- und Banner-Chips zeigen das tatsächlich aus Ihrer [Bibliothek](/docs/banners-and-logos/) gewählte Bild, der Foto-Chip zeigt einen runden Avatar-Platzhalter (echte Fotos werden beim Rendern pro Nutzer eingesetzt).

Wählen Sie einen Bild-Chip aus und ziehen Sie seine **Ziehpunkte** (Kanten und Ecke), um ihn für diese Vorlage zu dimensionieren - wie beim Vergrößern eines Fensters. Ein Doppelklick stellt die Standardgröße wieder her; die Ziehpunkte funktionieren auch per Tastatur (Pfeiltasten in 10-px-Schritten, Umschalt+Pfeiltasten in 50-px-Schritten, Pos1/Ende springen zu den Grenzen). Erlaubte Bereiche:

| Bild | Standardgröße | Größenbereich |
|---|---|---|
| Logo | 115x115 px | 24-300 px pro Seite |
| Banner | 450x100 px (oder die eigene Größe des Bibliothekseintrags) | 24-600 x 24-400 px |
| Foto | 115x115 px, rund | 24-300 px pro Seite |

Größen werden **pro Vorlage** gespeichert: Das Ändern der Bannergröße in einer Vorlage verändert nie andere Vorlagen, die dasselbe Bibliotheksbild verwenden.

Ein ausgewählter Logo- oder Banner-Chip bietet außerdem einen Button **Link**: den Klick-Link des Bibliotheksbildes behalten, den Link nur für diese Vorlage entfernen oder auf eine andere URL zeigen lassen - ohne den Bibliothekseintrag anzufassen, den andere Vorlagen teilen.

## Bedingte Blöcke

`{{del}}`- und `{{delete}}`-Umschließungen erscheinen auf der Arbeitsfläche als gerahmte Blöcke, sodass Sie genau sehen, was verschwindet, wenn die Daten eines Nutzers fehlen. Wird ein Speichern wegen unausgeglichener Tags abgelehnt, zeigt der Editor zwei kleine Demo-Animationen in Schleife, die das Verhalten von `{{del}}` und `{{delete}}` gegenüberstellen - die genauen Regeln stehen in [Vorlagenvariablen](/docs/template-variables/#conditional-blocks-del-and-delete).

## Innerhalb der Gmail-Limits bleiben

Gmail begrenzt Signaturen auf 10.000 Zeichen. Ein Live-Zähler unter der Arbeitsfläche verfolgt die Größe des erzeugten HTML - so wissen Sie es lange, bevor Gmail die Signatur ablehnen würde.

## Zurücksetzen und Validierung

- **Auf Gespeichertes zurücksetzen** (sichtbar, sobald Sie ungespeicherte Änderungen haben) stellt die Vorlage nach einer Bestätigung auf ihren zuletzt gespeicherten Stand zurück, einschließlich des gespeicherten Bearbeitungsmodus.
- Validierungsfehler sind konkret: Ein unbekanntes Token wird beim Namen genannt, unausgeglichene bedingte Tags kommen mit Öffnungs-/Schließzählern - kein Rätselraten.

Wenn Ihre Vorlage gut aussieht, prüfen Sie die Vorschau mit echten Nutzern und testen Sie sie auf Ihrem eigenen Postfach - siehe [Ihre erste Vorlage erstellen](/docs/create-your-first-template/#preview-as-a-real-user).
