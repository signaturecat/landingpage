---
title: Benutzerdaten-Überschreibungen
navTitle: Benutzerdaten
description: Speichern Sie Werte pro Nutzer, die Ihr Google Workspace-Verzeichnis in Gmail-Signaturen überschreiben - Einwilligung, die neun Felder, Self-Service-Bearbeitung und Löschung.
updated: 2026-08-02
---

# Benutzerdaten-Überschreibungen

Im Tab **Daten** speichern Sie Ihren eigenen Wert für einen einzelnen Nutzer und verwenden ihn in Signaturen anstelle dessen, was das Google-Verzeichnis liefert. Die Funktion ist aus, bis ein Admin sie einschaltet, sie deckt dieselben neun [Personenvariablen](/docs/template-variables) ab, die Ihre Vorlagen ohnehin verwenden, und sie schreibt nie etwas nach Google zurück. Die Seite ist [app.signature.cat/data](https://app.signature.cat/data), nur für Admins.

## Wann Überschreibungen sinnvoll sind

Nutzen Sie Überschreibungen für Lücken, die Sie an der Quelle nicht schnell schließen können. Die Daten in Google zu korrigieren bleibt der empfohlene Weg, und der Einwilligungsbildschirm sagt es auch: **Erst das Verzeichnis - dann Überschreibungen**. Der beste Ort für Mitarbeiterdaten ist das Google-Verzeichnis selbst (in der Google Admin-Konsole: **Verzeichnis**, **Nutzer**, einen Nutzer auswählen, **Nutzerinformationen**). Dort gepflegte Daten fließen automatisch in Signaturen, ganz ohne Überschreibungen, und jedes andere Workspace-Tool profitiert ebenfalls davon.

Gute Gründe, trotzdem zu überschreiben:

- eine Position oder Abteilung ist heute falsch, und der zuständige Prozess wird diese Woche nicht korrigiert;
- ein externer Mitarbeiter hat keine Telefonnummer im Verzeichnis, braucht aber eine in der Signatur;
- eine Person soll in E-Mails unter einem bevorzugten Vornamen erscheinen, aber nicht im Verzeichnis-Datensatz.

Den Verzeichnis-Datensatz später zu korrigieren ist immer unbedenklich: Stellen Sie das Feld zurück auf den Verzeichniswert, und die Überschreibung verschwindet.

## Einschalten

Nichts wird gespeichert, bis ein Admin die Funktion aktiviert. Öffnen Sie [Daten](https://app.signature.cat/data) und lesen Sie den Einwilligungsbildschirm **Signaturdaten für ausgewählte Benutzer speichern?**, der unter **Was wir speichern - und wann** festhält:

- Nichts wird gespeichert, bis Sie die Funktion aktivieren - und dann nur die Werte, die Sie selbst eintragen, nur für die Nutzer, die Sie überschreiben;
- jede Änderung landet im Audit-Protokoll (wer, wann und welche Felder - nie die Werte);
- das Abschalten der Funktion löscht alle gespeicherten Werte endgültig, und aus Ihrem Workspace entfernte Nutzer werden automatisch bereinigt.

Klicken Sie auf **Aktivieren und Daten speichern**, um sie einzuschalten. Bis dahin enthalten die Datenseiten nichts, und die Funktion ruft das Verzeichnis überhaupt nicht ab.

> [!IMPORTANT]
> Die Werte, die Sie hier eintragen, werden von SignatureCat gespeichert, in SignatureCats eigener Datenbank - nicht in Ihrem Google Workspace. Ihre Google-Verzeichnisdatensätze werden von dieser Funktion nie verändert.

Die Datenseite benötigt eine verifizierte Workspace-Verbindung; ist der Einrichtungsassistent unvollständig, landen Sie zuerst bei [Domain-Wide Delegation](/docs/domain-wide-delegation).

## Felder, die Sie überschreiben können

Neun Felder, eines pro Personenvariable. Ein gespeicherter Wert gewinnt auf jedem Render-Pfad über den Verzeichniswert (Editor-Vorschau, Testanwendung, manuelle Anwendung und tägliche Synchronisierung): Was der Editor zeigt, wird auch ausgeliefert. Ein Feld, das Sie unangetastet lassen, behält seinen Verzeichniswert.

| Feld | Variable | Fällt zurück auf | Limit |
|---|---|---|---|
| **Vorname** | `{{firstname}}` | Vorname im Verzeichnis | 120 Zeichen |
| **Nachname** | `{{lastname}}` | Nachname im Verzeichnis | 120 Zeichen |
| **E-Mail (angezeigt)** | `{{email}}` | Primäre E-Mail-Adresse | 320 Zeichen, muss eine gültige Adresse sein |
| **Domain (angezeigt)** | `{{domain}}` | Domain-Teil der primären Adresse | 253 Zeichen, nackte Domain wie `yourcompany.com` |
| **Position** | `{{jobtitle}}` | Position im primären Organisationseintrag des Nutzers | 200 Zeichen |
| **Abteilung** | `{{department}}` | Abteilung im selben Eintrag | 200 Zeichen |
| **Foto-URL** | `{{photo}}` | Profilbild aus dem Verzeichnis | 2048 Zeichen, nur `https://`-Link |
| **Adresse** | `{{address}}` | Die primäre Adresse des Nutzers, formatiert | 300 Zeichen |
| **Telefon** | `{{phone}}` | Erste nicht leere von Arbeit, Mobil, Privat | 60 Zeichen |

> [!WARNING]
> **E-Mail (angezeigt)** und **Domain (angezeigt)** ändern nur, was die Signatur anzeigt. Sie ändern nie die Postfachadresse, von der E-Mails gesendet werden, und legen in Google nichts an.

Zwei weitere Regeln, die Sie kennen sollten:

- **Foto-URL** nimmt einen öffentlichen `https://`-Link zu einem Bild, das Sie selbst hosten - SignatureCat hostet keine Mitarbeiterfotos.
- Wird eine Signatur auf einen send-as-Alias geschrieben, folgen `{{email}}` und `{{domain}}` der Alias-Adresse, selbst wenn Sie für diesen Nutzer eine Überschreibung gespeichert haben; jedes andere Feld behält seine Überschreibung. Siehe [Alias-Modi](/docs/assignments#alias-modi).

## Einen Nutzer überschreiben

1. Tippen Sie auf [Daten](https://app.signature.cat/data) in **Benutzer finden** - mindestens ein Zeichen. Die Ergebnisse kommen live aus Ihrem Workspace-Verzeichnis; eine leere Suche liefert absichtlich nichts, damit die Seite nie Ihren gesamten Workspace auflistet.
2. Wählen Sie den Nutzer aus den Ergebnissen. Der Editor öffnet sich, und jedes Feld zeigt seinen Live-Wert aus dem Verzeichnis, schreibgeschützt und mit einem Wolken-Symbol markiert.
3. Klicken Sie auf das Symbol neben einem Feld, um es von **Wert aus dem Verzeichnis verwenden** auf **Dieses Feld überschreiben** umzustellen, und tippen Sie Ihren Wert. Der Verzeichnismodus ist für jedes Feld die Voreinstellung, und ein Feld dorthin zurückzustellen entfernt den gespeicherten Wert beim Speichern.
4. Sind die Daten an der Quelle falsch, folgen Sie **Diesen Benutzer in der Google Admin-Konsole bearbeiten** - das öffnet das Profil dieses Nutzers in Google.
5. Klicken Sie auf **Daten speichern**.

Nach dem Speichern sagt die App, was mit dem Postfach passiert ist:

| Was die App sagt | Was es bedeutet |
|---|---|
| "Gespeichert. Die Signatur von jane@yourcompany.com wird gleich aktualisiert." | Eine einmalige Aktualisierung der Signatur dieses Nutzers wurde eingereiht. |
| "Gespeichert, aber jane@yourcompany.com hat keine zugewiesene Signatur - im Postfach wurde nichts angewendet." | Der Nutzer passt zu keiner Zuweisung und hat keine Self-Service-Wahl getroffen, es gibt also nichts zu aktualisieren. |
| "Gespeichert. Die Änderung greift mit der nächsten Signatur-Synchronisierung." | Es konnte gerade nichts eingereiht werden; die tägliche Synchronisierung nimmt die Änderung auf. |

Jeder überschriebene Nutzer steht unter **Benutzer mit überschriebenen Daten**, mit den Feldern, die einen Wert tragen, dem Datum und der **Letzten Änderung** (**Administrator**, **Self-Service** oder **CSV-Import**). Diese Liste stammt aus SignatureCats eigener Datenbank und ruft Google nicht ab.

Für Dutzende oder Hunderte Nutzer auf einmal nutzen Sie stattdessen **Aus CSV importieren** - siehe [Benutzerdaten aus einer CSV importieren](/docs/user-data-import).

## Eine Überschreibung entfernen

Alle Felder eines Nutzers zu leeren löscht seinen gespeicherten Eintrag:

- im Editor entfernt **Zurück zu Verzeichnisdaten** alle gespeicherten Werte auf einmal;
- in der Liste tut **Überschreibung entfernen** in der Zeile dasselbe;
- einen Nutzer zu speichern, dessen Felder alle wieder im Verzeichnismodus sind, entfernt den Eintrag ebenfalls.

Einen leeren Wert zu erzwingen ist nicht möglich: Eine leere Überschreibung bedeutet immer "Verzeichnis verwenden". Soll eine Signatur ein fehlendes Feld ganz ausblenden, schließen Sie diese Zeile stattdessen in einen [bedingten Block](/docs/template-variables#bedingte-blcke-del-und-delete) ein.

Ein Nutzer, der bereits aus Ihrem Workspace verschwunden ist, lässt sich weiterhin von Hand bereinigen - der Editor meldet "Dieser Benutzer existiert nicht mehr in Ihrem Workspace." und bietet **Überschreibung jetzt entfernen** an. Die automatische Bereinigung würde den Eintrag ohnehin entfernen.

## Nutzer ihre eigenen Daten eintragen lassen

Öffnen Sie das Schloss **Self-Service-Bearbeitung** auf der Datenseite, damit Nutzer ihre eigenen Werte auf der Seite Meine Signatur eintragen können. Auf [app.signature.cat/self-service](https://app.signature.cat/self-service) erscheint dann die Schaltfläche **Meine Signaturdaten**, die **Ergänzen Sie Ihre Daten** öffnet - denselben Editor pro Feld, mit **Meine Daten speichern** und **Verzeichnisdaten verwenden**.

- Jede Zugriffsstufe ab **Self-Service** aufwärts kann ihn nutzen, und immer nur für den eigenen Datensatz.
- Ihre Einträge erscheinen in Ihrer Liste mit **Self-Service** in der Spalte **Letzte Änderung**, neben der Adresse desjenigen, der sie gespeichert hat.
- Sie können jeden davon überschreiben oder löschen; ein Speichern durch einen Admin setzt die Quelle des Eintrags auf **Administrator**.
- Jede Self-Service-Änderung landet im Audit-Protokoll wie Ihre eigene.

Mehr zur Seite Meine Signatur: [Self-Service](/docs/self-service).

## Wer darf was

Der Tab **Daten** ist wie die [Benutzerverwaltung](/docs/user-management) nur für Admins. Alle anderen können höchstens ihren eigenen Datensatz bearbeiten.

| Wer | Was er darf |
|---|---|
| Admin | Die Funktion ein- und ausschalten, jeden Nutzer überschreiben, [eine CSV importieren](/docs/user-data-import), die Self-Service-Bearbeitung öffnen oder schließen. |
| Stufe **Self-Service** und höher | Nur die eigenen Werte bearbeiten, und nur solange die Funktion aktiv und die Self-Service-Bearbeitung geöffnet ist. |

## Abschalten

Der Bereich **Abschalten und löschen** am Ende der Datenseite entfernt alles. Klicken Sie auf **Datenüberschreibung abschalten**, folgen Sie dann in **Alle gespeicherten Daten löschen?** dem Feld **Geben Sie zur Bestätigung Ihre Workspace-Domain ein** und klicken Sie auf **Alles löschen und abschalten**.

Jeder für Ihren Workspace gespeicherte Wert wird sofort gelöscht, und die Self-Service-Bearbeitung wird mit der Funktion abgeschaltet. Signaturen fallen mit der nächsten Anwendung auf Verzeichnisdaten zurück.

> [!CAUTION]
> Die Löschung ist endgültig und lässt sich nicht rückgängig machen. Exportieren oder notieren Sie alles, was Sie behalten wollen, bevor Sie bestätigen.

Die Datenseite bleibt auch dann erreichbar, wenn ein Abonnement abgelaufen ist - der Ausschalter steht Ihnen also immer zur Verfügung.

## Lebenszyklus und Datenschutz

- Einträge existieren nur für die Nutzer, die tatsächlich jemand überschrieben hat - SignatureCat spiegelt Ihr Verzeichnis nie.
- Gesperrte Nutzer behalten ihre gespeicherten Werte.
- Aus Ihrem Workspace gelöschte Nutzer verlieren ihre Einträge automatisch, einmal täglich.
- Löschen Sie Ihr SignatureCat-Konto, werden alle gespeicherten Werte mitgelöscht.
- Jede Änderung wird mit wer, wann und welchen Feldnamen ins Audit-Protokoll geschrieben - nie die Werte selbst.
- Das Abschalten der Funktion löscht alles, sofort.

Die verbindlichen Dokumente und die Datenschutz-Zusammenfassung finden Sie auf der Seite [Rechtliches](/docs/legal).
