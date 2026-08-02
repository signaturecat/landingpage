---
title: Wenn Gmail Ihre Signatur kürzt
navTitle: Gmail-Kürzung
description: Warum Gmail eine gekürzte Kopie einer Signatur speichern kann, die SignatureCat in Ihrem Google Workspace angewendet hat, wie Sie das erkennen und wie Sie die Vorlage korrigieren.
updated: 2026-08-02
---

# Wenn Gmail Ihre Signatur kürzt

Wenn SignatureCat ein erfolgreiches Anwenden meldet, die Signatur in Gmail aber abgeschnitten aussieht, hat Gmail sie nach dem Schreibvorgang gekürzt. Gmail führt beim Speichern jeder Signatur seine eigene Bereinigung auf den Servern von Google aus, sodass die von Gmail behaltene Kopie strukturell von der abweichen kann, die SignatureCat gesendet hat - der Schreibvorgang gelingt, und das gespeicherte Ergebnis ist trotzdem kürzer. SignatureCat vergleicht beide bei jedem Schreibvorgang und sagt Ihnen, wenn sie sich unterscheiden.

## Warum Gmail eine erfolgreich angewendete Signatur verändert

Gmail bereinigt Signatur-HTML auf den eigenen Servern, nach Regeln, die Google nicht veröffentlicht. Der API-Aufruf kann Erfolg melden, und Gmail behält trotzdem eine reduzierte Kopie, in der Elemente fehlen, die es nicht speichern wollte. Das Umschreiben passiert innerhalb von Google, nachdem Ihre Vorlage SignatureCat verlassen hat - weder die Vorlagenvalidierung noch die Vorschau können es vorhersagen.

SignatureCat erkennt das unmittelbar danach. Bei jedem Signatur-Schreibvorgang liest SignatureCat die Kopie, die Gmail in seiner eigenen Schreibantwort zurückgibt - dieser Antwortinhalt ist die gespeicherte, bereits bereinigte Signatur - und vergleicht deren Struktur mit dem Gesendeten. Die Prüfung kostet keine zusätzlichen Google-API-Aufrufe und läuft auf allen vier Schreibwegen: Einmal-Anwendungen, die tägliche Zuweisungssynchronisierung und beide Alias-Schreibwege. Kosmetische Umschreibungen lösen keine Warnung aus: neu kodierte Entities, Leerraum, `b` gegen `strong` oder `i` gegen `em` getauscht oder eine Signatur, die Gmail in eigenes Markup einpackt, gelten alle als harmlos. Die Warnung erscheint nur, wenn tatsächlich strukturelle Elemente verschwunden sind.

> [!NOTE]
> Das ist ein Verhalten von Gmail auf Googles Seite, keine SignatureCat-Einstellung, und es lässt sich nicht abschalten. Die eigene Bereinigung von SignatureCat ist etwas anderes: Sie läuft früher, beim Speichern einer Vorlage, und entfernt Skripte, iframes und Inline-Event-Handler - siehe [Vorlagen](/docs/templates).

## Wo Sie die Warnung sehen

Zwei Stellen melden sie: die Auftragsergebnisse in den [Protokollen](/docs/logs) und die Test-Anwendung im Vorlagen-Editor.

### In den Protokollen und in der Auftragsansicht

Die Zeile pro Nutzer behält ihren grünen Haken und erhält zusätzlich ein bernsteinfarbenes Badge **von Gmail gekürzt** mit der Zeile "Angewendet, aber Gmail hat eine gekürzte Kopie dieser Signatur gespeichert." Dasselbe Badge und dieselbe Zeile erscheinen in der vollständigen Auftragsansicht unter `app.signature.cat/jobs/{id}`.

Öffnen Sie **Technische Details** in der Zeile für die Rohdaten: wie viele Zeichen gesendet wurden, wie viele Gmail gespeichert hat und welche Elemente entfernt wurden, mit den Zählern davor und danach, zum Beispiel:

```
Gmail stored a sanitized copy of the signature (2712 -> 1580 chars; dropped tags: tr 5->3, img 2->1)
```

Eine Signatur, die Gmail vollständig leer gespeichert hat, trägt dasselbe Badge und dieselbe Zeile - nur die technischen Details nennen die gespeicherte Signatur leer. Der Fehlercode pro Nutzer hinter dem Badge lautet `GMAIL_SIGNATURE_SANITIZED`; anders als die Codes in [Einen Zuweisungsauftrag prüfen](/docs/verify-assignments) steht er in einer erfolgreichen Zeile und ist eine Warnung, kein Fehlschlag.

### Nach einer Test-Anwendung im Editor

Klicken Sie im Vorlagen-Editor auf **Mir eine Testsignatur setzen**: SignatureCat schreibt die Vorlage in Ihre eigene Gmail-Signatur und liest Ihr Postfach anschließend zurück. Hat Gmail gekürzt, erscheint ein bernsteinfarbener, schließbarer Hinweis mit einem von zwei Titeln:

| Titel | Was Gmail gespeichert hat |
|---|---|
| Angewendet, aber Gmail hat eine gekürzte Kopie dieser Signatur gespeichert. | Eine strukturell abweichende, reduzierte Kopie. |
| Angewendet, aber Gmail hat eine leere Signatur gespeichert. | Gar nichts. |

Der Text lautet "Gmail schreibt Signaturen beim Speichern auf seinen Servern um. Prüfen Sie Ihr Postfach und vereinfachen Sie die betroffenen Stellen, falls etwas fehlt." Die aufklappbaren Details zeigen "{sent} Zeichen gesendet, Gmail hat {stored} gespeichert." und "Entfernte Elemente: {list}". **Warnung schließen** blendet den Hinweis aus.

> [!TIP]
> Das ist der schnellste Weg, das von Gmail abgelehnte Konstrukt zu finden: Es betrifft nur Ihr eigenes Postfach und prüft das Ergebnis nach jedem Schreibvorgang, sodass jeder Versuch ein Klick ist.

## Warum die Zeile trotzdem als Erfolg zählt

Der Schreibvorgang hat funktioniert, also bleibt die Zeile ein Erfolg. Gmail hat die Anfrage angenommen und eine Signatur gespeichert; dieselbe Vorlage erneut anzuwenden sendet dasselbe HTML, und Gmail speichert dieselbe gekürzte Kopie. Ein erneuter Rollout ändert daher nichts.

Die Korrektur liegt in der Vorlage, nicht im Auftrag:

1. Lesen Sie die entfernten Elemente in den technischen Details - sie benennen die verschwundenen Teile.
2. Vereinfachen Sie diesen Teil der Vorlage: Verschachtelung abflachen, einen komplizierten Block in einfache aufteilen, das Element entfernen, das an der Stelle sitzt, an der die Signatur abgeschnitten wird.
3. Wenden Sie sie mit **Mir eine Testsignatur setzen** auf sich selbst an und prüfen Sie, ob die Warnung verschwunden ist.
4. Lesen Sie das Postfach zurück, um zu bestätigen, was Gmail wirklich behalten hat.
5. Wenden Sie sie erneut auf die betroffenen Nutzer an, sobald der Test sauber zurückkommt.

## Prüfen, was wirklich im Postfach steht

Zwei Aktionen in den [Protokollen](/docs/logs) lesen eine Signatur live aus dem Postfach, statt zu zeigen, was SignatureCat zuletzt gesendet hat:

- **Aktuelle Signatur anzeigen** - in einer erfolgreichen Zeile pro Nutzer. Öffnet eine schreibgeschützte Vorschau der Signatur, die derzeit auf dieser Adresse gespeichert ist.
- **Signatur eines Mitarbeiters prüfen** - im Kopfbereich der Protokollseite. Suchen Sie einen beliebigen Nutzer in Ihrem Workspace und klicken Sie auf **Signatur anzeigen**.

Beide greifen im Moment des Klicks auf Gmail zu und erfassen damit auch Signaturen, die ein Nutzer in Gmail von Hand bearbeitet hat, nicht nur die Kürzungen von Gmail selbst. Hat das Postfach gar keine Signatur, meldet das Fenster "{email} hat in Gmail keine Signatur gesetzt." Die Abfrage steht Editoren und Admins offen, und jede einzelne wird mit der gelesenen Adresse in Ihrem Aktivitätsprotokoll festgehalten.

## Was meist überlebt und was meist gekürzt wird

Google dokumentiert die Regeln nicht, betrachten Sie das Folgende also als Beobachtung und nicht als Spezifikation.

- **Der eine in der Praxis beobachtete Fall:** Eine handgeschriebene Vorlage aus verschachtelter Tabelle, horizontaler Linie, Bannerbild und kursivem Rechtstext wurde erfolgreich angewendet - und Gmail behielt nur den Teil oberhalb der horizontalen Linie. Alles darunter fehlte im Postfach.
- **Tiefe Verschachtelung ist der übliche Verdächtige.** Layouts aus Tabellen in Tabellen in Tabellen geben Gmail am meisten zum Umschreiben.
- **Kosmetische Unterschiede sind keine Kürzung.** Sieht Ihre Signatur im Postfach richtig aus und ist keine Warnung erschienen, ist das erneute Serialisieren Ihres Markups durch Gmail harmlos.

SignatureCat überwacht diese strukturellen Elemente auf Verschwinden: Links, Zeilenumbrüche, `div`, `hr`, Bilder, Listen und Listeneinträge, Absätze, `span`, Tabellen mit ihren Zeilen und Zellen sowie Fett und Kursiv. Das sind die Namen, die Sie in der Liste der entfernten Elemente sehen.

Wird etwas markiert, vereinfachen Sie den markierten Teil, testen Sie ihn auf Ihrem eigenen Postfach und lesen Sie das Postfach zurück, statt der Vorschau zu vertrauen - die Vorschau rendert das HTML, das SignatureCat sendet, und genau diese Kopie kann Gmail reduzieren.

## Das 10.000-Zeichen-Limit von Gmail

Gmail begrenzt eine Signatur auf 10.000 HTML-Zeichen, und das ist ein eigener, früherer Fehlerfall: Es geht um Größe, nicht um Struktur, und er stoppt Sie, bevor überhaupt etwas Gmail erreicht. Der [visuelle Editor](/docs/visual-editor) zeigt in der Ecke der Arbeitsfläche einen Live-Zähler "{used} / {max} Zeichen", der die Farbe wechselt, je näher Sie der Grenze kommen. Oberhalb des Limits meldet der Editor "Die Signatur überschreitet das Gmail-Limit von 10.000 HTML-Zeichen. Kürze sie, um zu speichern." und das Speichern wird abgelehnt.

Eine Vorlage, die in das Budget passt, kann trotzdem von Gmail gekürzt werden, und eine gekürzte Signatur liegt meist deutlich unter der Grenze - die beiden Probleme haben nichts miteinander zu tun.

## Wann Sie den Support kontaktieren sollten

Schreiben Sie dem Support, wenn eine Signatur gekürzt wird und das Vereinfachen nicht hilft, oder wenn dieselbe Vorlage bei manchen Nutzern korrekt und bei anderen gekürzt gespeichert wird. Die Adresse und die allgemeine Checkliste stehen unter [Hilfe erhalten](/docs/get-help); legen Sie außerdem bei:

- den **Auftragslink** (`app.signature.cat/jobs/...`) oder einen Screenshot der Zeile mit dem Badge **von Gmail gekürzt**,
- den vollständigen Text hinter **Technische Details** (Zeichenzahlen und entfernte Elemente),
- die betroffene Vorlage und die Angabe, welcher Teil davon im Postfach verschwindet,
- ob **Mir eine Testsignatur setzen** auf Ihrem eigenen Postfach das Problem reproduziert.

> [!IMPORTANT]
> Der Support kann Gmail nicht dazu bringen, Markup zu behalten, das es verwerfen wollte - das steuert Google. Wobei der Support helfen kann, ist die Frage, welches Konstrukt in der Vorlage die Kürzung auslöst.
