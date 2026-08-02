---
title: Vorlagenvariablen
navTitle: Vorlagenvariablen
description: Alle SignatureCat-Signaturvariablen - Felder aus dem Google Workspace-Verzeichnis, Datenüberschreibungen pro Nutzer, Logo- und Banner-Token sowie bedingte del/delete-Blöcke.
updated: 2026-08-02
---

# Vorlagenvariablen

SignatureCat-Vorlagen verwenden `{{variable}}`-Token, die zum Anwendungszeitpunkt pro Nutzer aufgelöst werden. Es gibt neun Personenvariablen (befüllt aus Google Directory), zwei Bild-Token und zwei bedingte Tags. Token-Namen sind kleingeschrieben und werden unabhängig von Groß-/Kleinschreibung erkannt - `{{Phone}}` funktioniert genauso wie `{{phone}}`. Unbekannte Token werden beim Speichern der Vorlage abgelehnt.

## Personenvariablen (Google Directory)

Die Werte stammen aus dem Datensatz jedes Nutzers in Ihrem Google Workspace-Directory. Halten Sie das Directory gepflegt, und jede Signatur bleibt automatisch korrekt.

Ein für einen Nutzer im Tab **Daten** gespeicherter Wert hat Vorrang vor dem Verzeichnis - nur für diesen Nutzer und nur für dieses Feld, und zwar überall dort, wo die Signatur gerendert wird: in der Vorschau, bei **Mir eine Testsignatur setzen** und beim echten Rollout in die Postfächer. Felder, die Sie dem Verzeichnis überlassen, kommen weiterhin aus dem Verzeichnis. Siehe [Benutzerdaten-Überschreibungen](/docs/user-data). Eine Ausnahme: Wird eine Signatur auf einen Sendealias geschrieben, folgen `{{email}}` und `{{domain}}` immer der Alias-Adresse, auch wenn sie überschrieben sind.

| Token | Wert | Hinweise |
|---|---|---|
| `{{firstname}}` | Vorname | |
| `{{lastname}}` | Nachname | |
| `{{email}}` | Primäre E-Mail-Adresse | Beim Anwenden auf einen Alias löst sie stattdessen zur **Alias**-Adresse auf. |
| `{{domain}}` | Domain-Teil der E-Mail | Folgt dem Alias, wenn auf einen Alias angewendet wird. |
| `{{jobtitle}}` | Position | Aus dem primären Organisationseintrag des Nutzers im Directory. |
| `{{department}}` | Abteilung | Aus demselben Organisationseintrag. |
| `{{photo}}` | Profilbild | Allein stehend rendert das Token ein fertiges Profilbild - standardmäßig rund, eckig, wenn die Vorlage auf diese Form umgestellt ist (standardmäßig 115x115 px, [Form und Größe werden pro Vorlage festgelegt](/docs/visual-editor#bilder-logo-banner-und-foto)); Nutzer ohne Directory-Foto erhalten gar kein Bild statt eines defekten Symbols. Innerhalb Ihres eigenen `<img src="{{photo}}">` löst es zur HTTPS-Foto-URL auf (automatisch auf 400 px skaliert), und Ihr Markup bleibt unangetastet. |
| `{{address}}` | Formatierte Adresse | Der primäre Adresseintrag des Nutzers. |
| `{{phone}}` | Telefonnummer | Die erste nicht leere von: Arbeit, dann Mobil, dann Privat. |

**Leere Werte werden als leerer Text gerendert.** Die Signatur bricht nie, aber es kann ein verwaistes Label wie "Tel.:" übrig bleiben - genau dafür gibt es bedingte Blöcke.

## Bild-Token

| Token | Wert |
|---|---|
| `{{logo}}` | Das für die Vorlage gewählte Firmenlogo - standardmäßig 115x115 px, pro Vorlage in der Größe änderbar (24-300 px). |
| `{{banner}}` | Der für die Vorlage gewählte Kampagnenbanner - standardmäßig 450x100 px (ein Bibliothekseintrag kann eine eigene Größe definieren), pro Vorlage in der Größe änderbar, auf schmalen Bildschirmen verkleinert. |

Bilder stammen aus der Bibliothek pro Workspace und werden pro Vorlage ausgewählt; ist nichts ausgewählt, wird ein neutraler Platzhalter gerendert. Hat das Bibliotheksbild einen Klick-Link, wird das Bild automatisch darin eingeschlossen - und jede Vorlage kann [diesen Link überschreiben](/docs/visual-editor#bilder-logo-banner-und-foto). Größendetails und die Ziehpunkte sind im [visuellen Editor](/docs/visual-editor) und in [Banner und Logos](/docs/banners-and-logos) beschrieben.

Trägt der Bibliothekseintrag eine **Bildbeschreibung (ALT)**, wird dieser Text als `alt`-Attribut des gerenderten Bildes ausgegeben - für hochgeladene Bilder ebenso wie für Einträge, die auf Ihre eigene URL zeigen. Es ist das, was Empfänger lesen, wenn ihr Mail-Programm Bilder blockiert oder nicht laden kann. Die Beschreibung gehört zum Bibliothekseintrag, also zeigt jede Vorlage, die dieses Bild verwendet, dieselbe; ein Eintrag ohne Beschreibung rendert ein leeres `alt`.

> [!NOTE]
> Bild-Token rendern immer etwas (Bild oder Platzhalter) und zählen daher für die bedingten Blöcke unten nicht als "leer".

## Bedingte Blöcke: del und delete

Zwei umschließende Tags entfernen ganze Fragmente der Signatur, wenn Daten fehlen:

- `{{del}} ... {{/del}}` - **weich**: Der Block wird nur entfernt, wenn **jede** Personenvariable darin leer ist. Ist mindestens eine befüllt, bleibt der Block (leere Variablen darin werden als leerer Text gerendert).
- `{{delete}} ... {{/delete}}` - **hart**: Der Block wird entfernt, wenn **irgendeine** Personenvariable darin leer ist. Nutzen Sie ihn, wenn ein Fragment nur vollständig Sinn ergibt.

Beispiel - eine Telefonzeile, die für Nutzer ohne Telefonnummer verschwindet:

```html
{{del}}<tr><td>Tel: {{phone}}</td></tr>{{/del}}
```

Blöcke können verschachtelt werden; innere Blöcke werden zuerst ausgewertet. Unausgeglichene Tags werden beim Speichern abgelehnt, und die Tags selbst werden nie in die endgültige Gmail-Signatur geschrieben.

Ein Wächter kann auch eine ganze Tabellenzelle, mehrere benachbarte Zellen oder eine komplette Tabellenzeile umschließen. Im [visuellen Editor](/docs/visual-editor#spalten) ist das eine bedingte Spalte, eingestellt über den Schalter der Spalte selbst.

> [!TIP]
> Faustregel: Schließen Sie jede optionale Zeile (Telefon, Adresse, Abteilung) in `{{del}}`-Tags ein. Signaturen von Nutzern mit spärlichen Directory-Datensätzen schrumpfen dann elegant, statt leere Labels zu zeigen.

## Testen, wie Variablen aufgelöst werden

Nutzen Sie **Rendern als** im [Vorlagen-Editor](/docs/templates#der-editor) für eine Vorschau anhand des Datensatzes eines beliebigen echten Nutzers und **Mir eine Testsignatur setzen**, um das Ergebnis auf Ihr eigenes Postfach anzuwenden. Beides ist in [Ihre erste Vorlage erstellen](/docs/create-your-first-template) beschrieben.
