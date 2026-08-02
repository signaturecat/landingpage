---
title: Visueller Editor
navTitle: Visueller Editor
description: Gestalten Sie Gmail-Signaturvorlagen, ohne HTML zu schreiben - Variablen-Chips, Spalten, Trennlinien, eigene Bilder und E-Mail-sichere Formatierung auf einer Arbeitsfläche.
updated: 2026-08-02
---

# Visueller Editor

Mit dem visuellen Editor gestalten Sie eine Signaturvorlage, ohne eine Zeile HTML zu schreiben. Sie arbeiten auf einer Arbeitsfläche mit Textformatierung, Variablen-Chips und Bildern in Echtgröße, und der Editor kann nur Markup aus einer E-Mail-sicheren Positivliste erzeugen - was die Arbeitsfläche ausgibt, ist genau das, was SignatureCat speichert und an Gmail sendet, nichts wird hinter Ihrem Rücken umgeschrieben.

> [!NOTE]
> Gmail hat das letzte Wort: Beim Speichern einer Signatur läuft dort eine eigene Bereinigung, sodass ein sehr kompliziertes Layout trotzdem gekürzt zurückkommen kann. Siehe [Wenn Gmail Ihre Signatur kürzt](/docs/gmail-sanitization).

Der Editor liegt auf derselben Seite wie der [HTML-Editor](/docs/templates#der-editor): Öffnen Sie eine beliebige Vorlage auf [Signaturen](https://app.signature.cat/signatures) und wechseln Sie zwischen den Tabs **Visuell** und **HTML**.

## Bearbeitungsmodi

Jede Vorlage wird in einem von zwei Modi bearbeitet, und der Editor öffnet sich in dem Modus, in dem die Vorlage zuletzt gespeichert wurde:

- **Visuell** - die auf dieser Seite beschriebene Arbeitsfläche. Beim Speichern werden sowohl das visuelle Dokument als auch das erzeugte HTML gespeichert.
- **HTML** - der klassische Code-Editor mit Token-Autovervollständigung; siehe [Vorlagen](/docs/templates#der-editor).

Der Wechsel ist jederzeit möglich, mit zwei Einschränkungen:

- **HTML zu Visuell ist eine Einweg-Konvertierung.** Der Importer übersetzt Ihr Markup nach bestem Bemühen in Blöcke auf der Arbeitsfläche, und eine handgeschriebene Signatur übersteht diesen Weg jetzt deutlich besser: Jede Zeile einer mehrzeiligen Layout-Tabelle wird zu einer eigenen [Spaltenzeile](#spalten), und `{{del}}`- oder `{{delete}}`-Wächter, die eine ganze Zelle, mehrere benachbarte Zellen oder eine ganze Zeile umschließen, bleiben erhalten, statt stillschweigend verworfen zu werden. Tief verschachtelte Tabellen-Layouts werden weiterhin abgeflacht, und vor einer verlustbehafteten Konvertierung warnt der Editor.
- **Visuell zu HTML ist ein Downgrade.** Sie erhalten das erzeugte HTML zur freien Bearbeitung, aber das Speichern aus dem HTML-Tab verwirft das visuelle Dokument - wer später zurückwechselt, konvertiert erneut.

## Text, Schriften und Farben

Die Arbeitsfläche unterstützt die Formatierung, die Mail-Clients zuverlässig überlebt: Absätze, **fett**, *kursiv*, Unterstreichung, Aufzählungs- und nummerierte Listen, eine E-Mail-sichere Textfarbpalette, Links (Web, mailto und tel) sowie Rückgängig/Wiederholen.

Zwei Dropdowns steuern die Typografie:

- **Schriftgröße** - sieben feste Größen plus **Standardgröße**: 10, 12, 14, 16, 18, 20 und 24 px. Etwas anderes wird nicht angeboten, und die Voreinstellung der Arbeitsfläche ist 14 px.
- **Schriftart** - "Standard (Mail-Programm)" plus sieben websichere Familien: Arial, Verdana, Tahoma, Trebuchet MS, Georgia, Times New Roman und Courier New. Die Standardoption gibt gar keine Schrift aus und überlässt jedem Empfänger die seines Mail-Clients - die sicherste Wahl. Die Schriftart gilt für die ganze Signatur, nicht für die Auswahl.

**Textfarbe** bietet acht E-Mail-sichere Farbfelder plus **Standardfarbe**, die die Farbe wieder entfernt.

> [!NOTE]
> Websichere Schriften rendern konsistent, weil sie mit dem System des Empfängers ausgeliefert werden, nicht mit der E-Mail. Beim ersten Auswählen einer Nicht-Standard-Schrift zeigt der Editor einen kurzen Kompatibilitätshinweis.

## Spalten

Fügen Sie über die Werkzeugleiste eine Zeile mit 2 oder 3 Spalten ein (**2 Spalten einfügen**, **3 Spalten einfügen**), um Inhalte nebeneinander zu platzieren - zum Beispiel ein Foto links und Kontaktdaten rechts. Spalten werden im erzeugten HTML als einzeilige Tabelle gespeichert, die einzige Layout-Technik, die jeder Mail-Client korrekt rendert. Einer vorhandenen Zeile lässt sich keine Spalte hinzufügen: Fügen Sie eine Zeile mit der Spaltenanzahl ein, die Sie brauchen.

Sobald eine Zeile auf der Arbeitsfläche liegt:

- **Die Proportionen ändern.** Ziehen Sie den Akzentbalken im Zwischenraum zwischen zwei Spalten (**Spaltenbreite (ziehen; Pfeiltasten passen an)**). Jede Spalte behält mindestens 10 Prozent der Breite, und der Ziehpunkt funktioniert auch per Tastatur - Pfeiltasten bewegen ihn in Schritten von 5 Prozent. Ein Ziehvorgang legt die Proportionen für die ganze Zeile fest, eine Zeile ist also entweder gleichmäßig geteilt oder vollständig frei aufgeteilt.
- **Die ganze Zeile verschieben.** Der Griff links oben an der Zeile (**Diese Zeile verschieben (zwischen Zeilen ablegen)**) zieht sie zwischen die anderen Blöcke, wobei eine Linie zeigt, wo sie landen wird.
- **Eine einzelne Spalte löschen.** Der Papierkorb-Button in der Spalten-Überlagerung entfernt sie; eine Spalte, die noch Inhalt enthält, fragt zuerst nach einer Bestätigung. Bleibt in einer Zeile nur eine Spalte übrig, wird die Zeile automatisch aufgelöst - Löschen kann also nie ein kaputtes Layout hinterlassen.
- **Eine Spalte bedingt machen.** Der Schalter in der Spalten-Überlagerung schaltet die Spalte reihum zwischen keinem Wächter, `{{del}}` und `{{delete}}` um (**Spalte bedingt machen (sie verschwindet, wenn ihre Variablen leer sind)**). Die ganze Spalte verschwindet dann für Nutzer, deren Variablen darin leer sind - zum Beispiel eine Fotospalte für Personen ohne Foto. Eine bedingte Spalte wird mit gestricheltem Rahmen und einer Ecken-Markierung mit dem Token gezeichnet; es gelten genau die Regeln der [bedingten Blöcke](/docs/template-variables#bedingte-blcke-del-und-delete).

Importiertes HTML behält sein Layout: Jede Zeile einer mehrzelligen Tabelle wird zu einer eigenen Spaltenzeile, sodass eine Zeile mit Foto und Name über einer Trennlinienzeile zwei Zeilen bleibt, statt zu einer einzigen zu verschmelzen.

## Trennlinien

Eine Trennlinie ist eine waagerechte Linie zwischen zwei Blöcken - die saubere Art, einen Namen von den Kontaktdaten abzusetzen. Fügen Sie eine mit **Trennlinie einfügen** ein; standardmäßig ist sie eine dünne hellgraue Linie mit etwas Abstand darüber und darunter.

Auf der Arbeitsfläche ist sie ein auswählbarer Block namens **Trennlinie**. Beim Überfahren mit der Maus erscheinen ein Griff, der sie zwischen die anderen Blöcke zieht, und ein Button, der sie entfernt. Zwei Eigenschaften bestimmen Sie selbst:

- **Farbe** - wählen Sie die Linie aus und dann ein Farbfeld aus der Palette in der Werkzeugleiste (**Linienfarbe (Linie auswählen, dann Farbe wählen)**).
- **Länge** - ziehen Sie den Ziehpunkt am Ende der Linie (**Linienlänge (ziehen; Doppelklick = volle Breite)**) zwischen 10 und 100 Prozent der Signaturbreite. Ein Doppelklick stellt die volle Breite wieder her.

Eine von Hand in HTML geschriebene Trennlinie behält beim Konvertieren der Vorlage in den visuellen Modus den Stil, den Sie ihr gegeben haben.

## Variablen als Chips

Personenvariablen wie `{{firstname}}` oder `{{phone}}` erscheinen auf der Arbeitsfläche als **Chips** - feste Token, die Sie nicht versehentlich durch Hineintippen zerstören können. Chips können:

- über das Menü **Variable einfügen** eingefügt werden,
- wie der Text um sie herum formatiert werden - fett, kursiv, unterstrichen, dazu **Textfarbe** und **Schriftgröße**, die bis in den Wert durchschlagen, der in der ausgelieferten Signatur landet,
- per Drag-and-drop an eine beliebige Stelle der Arbeitsfläche gezogen werden,
- mit dem Papierkorb-Button entfernt werden, der beim Überfahren mit der Maus erscheint.

Wählen Sie den Chip oder einen Textabschnitt aus, der ihn enthält, bevor Sie eine Größe oder eine Farbe wählen: Den Cursor neben einem Chip zu parken ändert nichts. Bild-Chips (`{{logo}}`, `{{banner}}`, `{{photo}}`) werden auf diese Weise nie umgestylt - sie werden stattdessen über ihre Ziehpunkte dimensioniert.

Die vollständige Variablenliste und die Auflösungsregeln stehen in [Vorlagenvariablen](/docs/template-variables).

## Bilder: Logo, Banner und Foto

`{{logo}}`, `{{banner}}` und `{{photo}}` werden auf der Arbeitsfläche als Bild-Chips in ihrer echten Größe gerendert - die Logo- und Banner-Chips zeigen das tatsächlich aus Ihrer [Bibliothek](/docs/banners-and-logos) gewählte Bild, der Foto-Chip zeigt einen Avatar-Platzhalter (echte Fotos werden beim Rendern pro Nutzer eingesetzt).

Wählen Sie einen Bild-Chip aus und ziehen Sie seine **Ziehpunkte** (Kanten und Ecke), um ihn für diese Vorlage zu dimensionieren - wie beim Vergrößern eines Fensters. Ein Doppelklick stellt die Standardgröße wieder her. Die Ziehpunkte werden mit der Maus bedient; eine Tastatursteuerung gibt es für sie nicht. Erlaubte Bereiche:

| Bild | Standardgröße | Größenbereich |
|---|---|---|
| Logo | 115x115 px | 24-300 px pro Seite |
| Banner | 450x100 px (oder die eigene Größe des Bibliothekseintrags) | 24-600 x 24-400 px |
| Foto | 115x115 px, rund | 24-300 px pro Seite |

Das Profilbild ist standardmäßig rund. Der kleine Schalter am Griff des Foto-Chips macht es für diese Vorlage eckig (**Zu eckigem Foto wechseln**) und wieder rund (**Zu rundem Foto wechseln**).

Größen werden **pro Vorlage** gespeichert: Das Ändern der Bannergröße in einer Vorlage verändert nie andere Vorlagen, die dasselbe Bibliotheksbild verwenden.

Ein ausgewählter Logo- oder Banner-Chip bietet außerdem einen Button **Link**: den Klick-Link des Bibliotheksbildes behalten, den Link nur für diese Vorlage entfernen oder auf eine andere URL zeigen lassen - ohne den Bibliothekseintrag anzufassen, den andere Vorlagen teilen.

## Eigene Bilder

Jedes Bild, das Sie bereits unter einer `https://`-Adresse hosten, kann direkt in eine Vorlage, ohne es der gemeinsamen Bibliothek hinzuzufügen. Klicken Sie in der Werkzeugleiste auf **Bild einfügen (URL)** und füllen Sie aus:

- **Bild-URL (https)** - die Adresse des Bildes. Sie muss mit `https://` beginnen.
- **Beschreibung (ALT, optional)** - was Empfänger sehen, wenn ihr Mail-Programm das Bild nicht anzeigen kann. Sie darf keine `{{ }}`-Vorlagen-Token enthalten.
- **Form** - **Eckig** oder **Rund**.

Auf der Arbeitsfläche verhält sich der Block wie die anderen Bilder: Der Griff verschiebt ihn zwischen den Blöcken, die Kanten- und Eck-Ziehpunkte ändern seine Größe (16 bis 600 px breit, 16 bis 400 px hoch), der Stift (**Bild bearbeiten**) öffnet Adresse, Beschreibung und Form erneut, und der Papierkorb-Button entfernt ihn. Setzen Sie ihn in einen Link, bleibt der Link erhalten.

Ein eigenes Bild gehört zu genau dieser einen Vorlage. Es ist kein Bibliothekseintrag: Es taucht in den Galerien Logo und Banner nicht auf, andere Vorlagen können es nicht auswählen, und es wird nicht unter [Banner und Logos](/docs/banners-and-logos) verwaltet. SignatureCat lädt die Datei weder hoch noch speichert sie - das Bild bleibt bei Ihrem Hoster, die Adresse muss also so lange funktionieren, wie die Signatur im Einsatz ist.

> [!TIP]
> Nutzen Sie die Bibliothek für das Logo und den Kampagnenbanner, die die ganze Firma teilt, und ein eigenes Bild für den Einzelfall - ein Auszeichnungs-Abzeichen oder ein Veranstaltungslogo, das nur in einer einzigen Vorlage lebt.

## Bedingte Blöcke

`{{del}}`- und `{{delete}}`-Umschließungen erscheinen auf der Arbeitsfläche als gerahmte Blöcke, sodass Sie genau sehen, was verschwindet, wenn die Daten eines Nutzers fehlen. Eine ganze [Spalte](#spalten) kann denselben Wächter tragen. Wird ein Speichern wegen unausgeglichener Tags abgelehnt, zeigt der Editor zwei kleine Demo-Animationen in Schleife, die das Verhalten von `{{del}}` und `{{delete}}` gegenüberstellen - die genauen Regeln stehen in [Vorlagenvariablen](/docs/template-variables#bedingte-blcke-del-und-delete).

## Innerhalb der Gmail-Limits bleiben

Gmail begrenzt Signaturen auf 10.000 Zeichen. Ein Live-Zähler unter der Arbeitsfläche verfolgt die Größe des erzeugten HTML - so wissen Sie es lange, bevor Gmail die Signatur ablehnen würde.

## Zurücksetzen und Validierung

- **Änderungen verwerfen** (sichtbar, sobald Sie ungespeicherte Änderungen haben, Tooltip "Zuletzt gespeicherte Version wiederherstellen") stellt die Vorlage nach einer Bestätigung auf ihren zuletzt gespeicherten Stand zurück, einschließlich des gespeicherten Bearbeitungsmodus.
- Validierungsfehler sind konkret: Ein unbekanntes Token wird beim Namen genannt, unausgeglichene bedingte Tags kommen mit Öffnungs-/Schließzählern - kein Rätselraten.

Wenn Ihre Vorlage gut aussieht, prüfen Sie sie auf den simulierten Clients über der Vorschau ([E-Mail-Client-Vorschau](/docs/mail-client-preview)), rendern Sie sie mit echten Nutzern und testen Sie sie auf Ihrem eigenen Postfach - siehe [Ihre erste Vorlage erstellen](/docs/create-your-first-template#vorschau-als-echter-nutzer).
