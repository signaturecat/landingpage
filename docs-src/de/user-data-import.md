---
title: Benutzerdaten aus einer CSV importieren
navTitle: Benutzerdaten importieren
description: Signaturdaten pro Nutzer per CSV-Datei nach SignatureCat laden - Spalten, Ersetzungsregeln, Limits, die Vorschau und die Gmail-Synchronisierung danach.
updated: 2026-08-02
---

# Benutzerdaten aus einer CSV importieren

Ein CSV-Import setzt gespeicherte Werte für viele Nutzer auf einmal, unter [app.signature.cat/data/import](https://app.signature.cat/data/import) oder über **Aus CSV importieren** auf der Seite [Daten](https://app.signature.cat/data). Die Datei wird geprüft, bevor irgendetwas geschrieben wird, und der Import gilt ganz oder gar nicht. Schalten Sie die Funktion zuerst ein - siehe [Benutzerdaten-Überschreibungen](/docs/user-data).

## Wann Sie ihn nutzen

Nutzen Sie den Import, wenn Sie Dutzende oder Hunderte Nutzer einrichten müssen, typischerweise direkt aus einem HR-Export. Für eine einzelne Person ist der Editor pro Nutzer schneller und aktualisiert deren Signatur sofort.

Der Import berührt immer nur die in der Datei aufgeführten Adressen. Alle anderen behalten, was sie haben, auch Nutzer ganz ohne gespeicherte Daten.

## Die Datei

Beginnen Sie mit **CSV-Vorlage herunterladen** auf der Importseite - sie enthält die Kopfzeile und eine Beispielzeile:

```
email,firstname,lastname,jobtitle,department,photo,address,phone
jane.doe@yourcompany.com,Jane,Doe,Senior Account Manager,Sales,https://yourcompany.com/photos/jane.jpg,"Main Street 1, 00-001 Warsaw",+48 600 000 000
```

Das Format ist gewöhnliches CSV: kommagetrennt, eine Kopfzeile, Werte mit einem Komma darin in doppelten Anführungszeichen (ein Anführungszeichen innerhalb eines zitierten Werts wird verdoppelt), LF- oder CRLF-Zeilenenden, UTF-8.

`email` ist in jeder Datei Pflicht. Es identifiziert den Nutzer, dessen Eintrag die Zeile ersetzt, und muss dessen **primäre** Workspace-Adresse sein - es ist keine Überschreibung der Variablen `{{email}}` und wird in keine Signatur geschrieben. Aliasse werden hier nicht aufgelöst, eine Zeile mit einem Alias erreicht die Signatur dieser Person also nie.

Fügen Sie mindestens eine der Datenspalten hinzu. Jede setzt das gleichnamige Feld auf der Seite [Daten](https://app.signature.cat/data):

| Spalte | Setzt | Limit |
|---|---|---|
| `firstname` | **Vorname**, `{{firstname}}` | 120 Zeichen |
| `lastname` | **Nachname**, `{{lastname}}` | 120 Zeichen |
| `jobtitle` | **Position**, `{{jobtitle}}` | 200 Zeichen |
| `department` | **Abteilung**, `{{department}}` | 200 Zeichen |
| `photo` | **Foto-URL**, `{{photo}}` | 2048 Zeichen, nur `https://`-Link |
| `address` | **Adresse**, `{{address}}` | 300 Zeichen |
| `phone` | **Telefon**, `{{phone}}` | 60 Zeichen |

Die Spalten dürfen in beliebiger Reihenfolge stehen, aber jede Überschrift muss einer der obigen Namen sein, und keine darf zweimal vorkommen.

> [!IMPORTANT]
> Die Überschreibungen **E-Mail (angezeigt)** und **Domain (angezeigt)** sind bewusst nicht importierbar - das hält die Spalte `email` eindeutig. Setzen Sie diese beiden pro Nutzer im Editor auf der Seite [Daten](https://app.signature.cat/data).

## Was eine Zeile bewirkt

Eine Zeile ersetzt den gesamten gespeicherten Eintrag des Nutzers - sie ist keine Teilaktualisierung:

- eine gefüllte Zelle speichert diesen Wert;
- eine leere Zelle heißt "Verzeichnis verwenden" und löscht jeden für dieses Feld gespeicherten Wert;
- eine Spalte, die Sie in der Kopfzeile weggelassen haben, wird ebenfalls gelöscht, für jede Adresse in der Datei;
- eine Zeile mit einer Adresse und ganz ohne Werte entfernt den Eintrag dieses Nutzers vollständig;
- Nutzer, die nicht in der Datei stehen, werden nie angefasst.

Eine Datei mit nur `email` und `phone` löscht also jedes andere gespeicherte Feld der aufgeführten Nutzer. Exportieren Sie, was Sie schon haben, oder führen Sie jede Spalte auf, die Sie behalten wollen.

## Limits

Bis zu **2000 Datenzeilen** und **1 MB** pro Datei. Größere Dateien werden schon vor dem Upload abgelehnt - teilen Sie die Daten auf mehrere Dateien auf und importieren Sie sie nacheinander.

## Hochladen, prüfen, bestätigen

Es wird nichts geschrieben, bevor Sie die Vorschau bestätigen:

1. **Hochladen.** Wählen Sie die Datei mit **CSV-Datei auswählen**. Sie wird auf der Stelle geparst und validiert.
2. **Vor dem Import prüfen.** Sie erhalten eine Zusammenfassung (wie viele Zeilen, wie viele neu sind, wie viele einen bestehenden Eintrag aktualisieren) und eine Tabelle der Zeilen, markiert als **Neu** oder **Aktualisierung**, mit "Verzeichnis" überall dort, wo eine Zelle einen Wert löschen würde. Sehr lange Dateien listen nur die ersten Zeilen; importiert werden alle.
3. **Bestätigen.** Klicken Sie auf **N Zeilen importieren**. Erst jetzt wird etwas geschrieben. Der Ergebnisbildschirm meldet, wie viele Einträge gespeichert und wie viele durch leere Zeilen entfernt wurden.

## Eine fehlerhafte Zeile lehnt die ganze Datei ab

Der Import gilt ganz oder gar nicht: Scheitert eine Zeile oder die Datei selbst an der Validierung, wird nichts geschrieben und kein Eintrag ändert sich. Korrigieren Sie die Datei und laden Sie sie erneut hoch.

Probleme mit einer einzelnen Zeile:

| Was die App sagt | Ursache und Lösung |
|---|---|
| "Die E-Mail-Adresse ist ungültig." | Die Zelle `email` ist keine syntaktisch gültige Adresse. |
| "Diese E-Mail kommt in der Datei mehrfach vor." | Dieselbe Adresse steht zweimal in der Datei. Führen Sie die Zeilen zu einer zusammen - eine Zeile ersetzt den ganzen Eintrag, die zweite würde also stillschweigend gewinnen. |
| "Die Zeile hat eine andere Zellenzahl als die Kopfzeile." | Meist ein nicht zitiertes Komma innerhalb eines Werts. Setzen Sie solche Werte in doppelte Anführungszeichen. |
| "Die Zeile enthält Steuerzeichen (z. B. einen Zeilenumbruch in einem Wert)." | Werte müssen einzeiliger reiner Text sein. Entfernen Sie Zeilenumbrüche und Tabulatoren, auch innerhalb zitierter Zellen. |
| "Ein Wert ist für seine Spalte ungültig." | Ein Wert ist länger als das obige Limit, oder eine Zelle `photo` ist kein `https://`-Link. |

Probleme, die die Datei komplett ablehnen:

| Was die App sagt | Ursache und Lösung |
|---|---|
| "Die Datei enthält keine Datenzeilen." | Die Datei enthält nur eine Kopfzeile. |
| "Die Spalte email fehlt." | Fügen Sie die Pflichtspalte `email` hinzu. |
| "Fügen Sie neben email mindestens eine Datenspalte hinzu." | Eine Datei aus reinen Adressen bewirkt nichts. |
| "Unbekannte Spalte in der Kopfzeile." | Es werden nur die acht dokumentierten Spaltennamen akzeptiert, exakt geschrieben. |
| "Eine Spalte kommt in der Kopfzeile doppelt vor." | Entfernen Sie das Duplikat. |
| "Die Datei hat mehr als 2000 Datenzeilen." | Teilen Sie die Datei auf. |
| "Ein Anführungszeichen wurde nicht geschlossen - prüfen Sie die Zitierung." | Ein öffnendes doppeltes Anführungszeichen hat kein schließendes - oft ein verirrtes Anführungszeichen in einer Adresse. |

> [!TIP]
> Exporte aus Tabellenkalkulationen sind die übliche Fehlerquelle: Prüfen Sie, ob Ihr Programm reines CSV gespeichert hat (nicht semikolongetrennt) und ob keine Zelle einen Zeilenumbruch enthält.

## Nach dem Import

Importierte Werte erreichen die Postfächer mit der nächsten täglichen Synchronisierung. Um sie früher anzuwenden, nutzen Sie **Signaturen jetzt synchronisieren** auf dem Ergebnisbildschirm - das startet sofort eine Signatur-Synchronisierung. Die Schaltfläche ist optional; überspringen Sie sie, übernimmt einfach die tägliche Synchronisierung die Änderung. Läuft bereits eine Synchronisierung, sagt die App das, und was dieser Lauf verpasst, wendet der nächste an.

Anders als ein Speichern für einen einzelnen Nutzer auf der Seite [Daten](https://app.signature.cat/data) aktualisiert ein Import die Signaturen nicht von selbst - deshalb wird die Schaltfläche angeboten.

> [!NOTE]
> Eine Zeile für eine Adresse, die es in Ihrem Workspace nicht gibt, wird akzeptiert (Adressen werden nur auf ihre Form geprüft), passt nie zu einem Postfach und wird später automatisch bereinigt. Sie ist harmlos, sollte aber aus Ihrer Quelldatei entfernt werden.

Verwandt: [Benutzerdaten-Überschreibungen](/docs/user-data), [Vorlagenvariablen](/docs/template-variables), [Protokolle](/docs/logs).
