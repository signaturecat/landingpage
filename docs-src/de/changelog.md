---
title: Changelog
navTitle: Changelog
description: Was ist neu in SignatureCat - monatliche Highlights neuer Funktionen und Verbesserungen der E-Mail-Signatur-Verwaltung für Google Workspace und Gmail.
updated: 2026-08-19
published: 2026-07-24
---

# Changelog

Was ist neu in SignatureCat, dem E-Mail-Signatur-Manager für Google Workspace. Wir verbessern Signaturvorlagen, die Gmail-Integration und die Workspace-Verwaltung laufend - die Highlights sammeln wir hier, Monat für Monat.

## August 2026

- **Personen nach Namen finden, nicht nur nach E-Mail.** Jede Personensuche in der App - das "Rendern als"-Feld im Editor, [Protokolle](/docs/logs), [Benutzerdaten](/docs/user-data) und eine ganz neue Suche beim Vergeben von Zugriff in der [Benutzerverwaltung](/docs/user-management) - findet jetzt nach Vorname, Nachname und vollem Namen: "Tomasz", "Piasecki" und "Tomasz Piasecki" finden dieselbe Person, und Namen mit Sonderzeichen wie "Łukasz" funktionieren so, wie Sie sie eintippen.
- **Animierte GIFs in Ihrer Bildbibliothek.** Logos und Banner können jetzt animiert sein: Laden Sie eine .gif-Datei hoch (bis 20 MB; PNG und JPG bleiben bei 5 MB) und verwenden Sie sie wie jedes andere Bild - mit derselben Größenänderung pro Vorlage, demselben Klick-Link und Alternativtext. Eine Einschränkung: Das klassische Outlook unter Windows zeigt nur das erste Bild einer Animation. Siehe [Banner und Logos](/docs/banners-and-logos).
- **Zuweisungen heißen jetzt Automatische Zuweisungen.** Die Seite hat einen klareren Namen und sagt jetzt, wie sie wirklich arbeitet: Zuweisungen werden einmal täglich automatisch neu angewendet, und **Jetzt synchronisieren** erzwingt die Synchronisierung sofort. An Zielen und Vorrangregeln hat sich nichts geändert. Siehe [Vorlagen zuweisen](/docs/assign-templates).
- **Die Workspace-Verbindung abschließen, auch wenn jemand anderes sie begonnen hat.** Die Einrichtung gehört nicht mehr einer einzelnen Person: Ist der Administrator, der das Onboarding begonnen hat, nicht erreichbar, kann ein anderer Administrator übernehmen und sie abschließen - der Bestätigungsbildschirm zeigt, wer begonnen hat, und lässt Sie fortfahren. Auch der Verbindungsassistent spricht klarer: Er sagt Ihnen, wenn das angemeldete Konto kein Google-Workspace-Super-Admin ist, und zeigt, wann die letzte Prüfung lief. Siehe [Google Workspace verbinden](/docs/connect-google-workspace).
- **Wir prüfen jetzt, was Gmail wirklich gespeichert hat.** Gmail schreibt Signaturen beim Speichern auf den eigenen Servern um und kann dabei Teile eines komplizierten Layouts stillschweigend verwerfen. SignatureCat vergleicht jetzt das Gesendete mit dem, was Gmail behalten hat: Wurde etwas gekürzt, erhält die Ergebniszeile das Kennzeichen "von Gmail gekürzt", und die Testsignatur im Editor nennt Ihnen die verschwundenen Elemente. Siehe [Wenn Gmail Ihre Signatur kürzt](/docs/gmail-sanitization).
- **Sehen, welche Signatur ein Postfach gerade hat.** Aus den [Protokollen](/docs/logs) heraus öffnen Sie die aktuelle Gmail-Signatur jedes Mitarbeiters und sehen sie sich an, ohne um einen Screenshot bitten zu müssen. Praktisch, wenn jemand seine Signatur in Gmail von Hand bearbeitet hat oder wenn Sie einen Beleg dafür wollen, dass ein Rollout angekommen ist.
- **Alternativtext für Logos und Banner.** Jedes Bild in Ihrer Bibliothek kann jetzt eine kurze Beschreibung tragen, die Empfänger sehen, wenn ihr Mail-Programm Bilder blockiert - einer der einfachsten Gewinne an Barrierefreiheit in einer E-Mail-Signatur. Siehe [Banner und Logos](/docs/banners-and-logos).
- **Jedes Bild, direkt aus einer URL.** Neben der gemeinsamen Bildbibliothek platziert der visuelle Editor jetzt auch ein einmaliges Bild, das irgendwo gehostet ist - mit eigener Beschreibung, eckiger oder runder Form und Größenänderung per Ziehen. Profilbilder haben dieselbe Wahl bekommen: rund (Standard) oder eckig.
- **Trennlinien, die Sie gestalten können.** Fügen Sie eine waagerechte Linie zwischen Blöcken ein und legen Sie ihre Farbe und Länge fest - die saubere Art, einen Namen von den Kontaktdaten abzusetzen.
- **Spalten, die verschwinden, wenn sie leer sind.** Eine ganze Spalte lässt sich jetzt als bedingt markieren, sodass die Fotospalte (oder die Telefonspalte) bei Personen ohne Foto oder ohne Telefon verschwindet, statt eine Lücke in ihrer Signatur zu hinterlassen.
- **Vorhandene HTML-Signaturen importieren besser.** Mehrzeilige Layout-Tabellen, bedingte Abschnitte um ganze Zellen und handgeschriebenes Markup überstehen den Wechsel in den visuellen Editor jetzt deutlich originalgetreuer.
- **Aktualisierte Datenschutzerklärung.** Eine neue Fassung der [Datenschutzerklärung](https://signature.cat/privacy) gilt ab heute: Sie beschreibt die optionale Speicherung von [Benutzerdaten](/docs/user-data) und das Zurücklesen einer Signatur aus einem Postfach.

## Juli 2026

- **Lücken in Ihren Verzeichnisdaten füllen.** Fehlende Positionen oder Telefonnummern stehen einer guten Signatur nicht mehr im Weg. Im neuen Tab **Daten** speichern Sie Werte pro Nutzer, die das Google-Verzeichnis in Signaturen überschreiben, importieren Hunderte davon aus einer CSV-Datei oder lassen die Leute ihre Angaben selbst ergänzen. Die Funktion ist aus, bis Sie sie einschalten, und beim Ausschalten wird alles Gespeicherte gelöscht. Siehe [Benutzerdaten-Überschreibungen](/docs/user-data).
- **Ein visueller Signatur-Editor.** Gestalten Sie Gmail-Signaturvorlagen, ohne HTML zu schreiben: Variablen-Chips zum Ziehen und Ablegen, Layouts mit 2-3 Spalten, websichere Schriften, eine E-Mail-sichere Farbpalette und sichtbare bedingte Blöcke - mit einer Ausgabe, die garantiert korrekt in Gmail rendert. Der klassische HTML-Editor bleibt einen Tab entfernt. Siehe die neue Anleitung [Visueller Editor](/docs/visual-editor).
- **Bildgrößen pro Vorlage ändern.** Ziehen Sie die Ecken eines Logos, Banners oder Profilbilds direkt auf der Arbeitsfläche - jede Signaturvorlage behält ihre eigene Größe, und Banner-Bibliothekseinträge können eigene Standardmaße definieren. Eine Vorlage kann außerdem den Klick-Link eines Bildes überschreiben, ohne die gemeinsame Bibliothek anzufassen.
- **Spaltenbreiten zum Ziehen.** Fassen Sie den Zwischenraum zwischen zwei Spalten an, um ihre Proportionen zu ändern, oder nehmen Sie eine ganze Zeile auf und verschieben Sie sie. Ein Layout mit 30/70 aus Foto und Kontaktdaten ist jetzt ein Ziehvorgang, keine Schätzung.
- **Formatierung, die an Variablen haftet.** `{{firstname}}` größer zu machen oder ihm eine Farbe zu geben, wird jetzt wirklich so ausgeliefert, statt stillschweigend auf den Stil des umgebenden Textes zurückzufallen.
- **Eine klügere {{photo}}-Variable.** Allein verwendet rendert `{{photo}}` jetzt ein fertiges rundes Profilbild in der pro Vorlage eingestellten Größe - und Nutzer ohne Foto im Google Workspace-Directory bekommen kein defektes Bild, das Foto verschwindet einfach aus ihrer Signatur.
- **Klarere Vorlagen-Validierung.** Speicherfehler nennen jetzt das genaue unbekannte Token oder zählen die unausgeglichenen bedingten Tags, und der Editor erklärt `{{del}}` vs. `{{delete}}` mit zwei animierten Mini-Demos.
- **Ihre Signatur so sehen, wie jeder Mail-Client sie zeigt.** Die Vorschau simuliert jetzt Gmail im Web, Gmail auf dem Telefon, das klassische Outlook unter Windows, Outlook.com und Apple Mail, in Hell und Dunkel - so entdecken Sie die Dunkelmodus-Überraschung vor Ihren Kolleginnen und Kollegen. Mit dem Feld **Rendern als** rendern Sie die Vorlage außerdem anhand des Verzeichnis-Datensatzes eines beliebigen echten Nutzers. Siehe [E-Mail-Client-Vorschau](/docs/mail-client-preview).
- **Starter-Vorlagen für Outlook neu gebaut, und mehr davon.** Die eingebauten Startpunkte wurden neu geschrieben, damit eine brandneue Signatur im klassischen Outlook nicht mehr zu einer einzigen Zeile zusammenfällt, und der Assistent für neue Vorlagen kann jetzt zusätzliche fertige Designs über die drei eingebauten hinaus anbieten.
- **Dokumentation in vier Sprachen.** Dieses Hilfe-Center ist jetzt auf Englisch, Polnisch, Deutsch und Französisch verfügbar. Die Sprachauswahl in der Fußzeile führt zum selben Artikel, damit Ihr ganzes Team in seiner Sprache über die Signaturverwaltung in Google Workspace lesen kann.
- **Sehen, wer eine Signaturvorlage bearbeitet hat.** Jede Signaturvorlage zeigt jetzt, wer sie zuletzt bearbeitet hat und wann - in der Vorlagenliste und im Signatur-Editor. Praktisch, wenn mehrere Workspace-Admins E-Mail-Signaturen gemeinsam verwalten.
- **Einfachere eigene Bild-Domains.** Für das Hosting von Signatur-Bannern und Logos auf der eigenen Domain reicht jetzt ein einziger CNAME-Eintrag. Ein Assistent prüft die Einrichtung für Sie - siehe [Eigene Bild-Domain](/docs/custom-image-domain).
- **Ein Hinweis, wenn ein verwendetes Bild gelöscht wird.** Das Entfernen eines Logos oder Banners, das Signaturvorlagen noch verwenden, löst jetzt eine Benachrichtigung in der App und eine E-Mail an die Admins aus, damit ein fehlendes Bild nie eine stille Überraschung in einem Postfach ist.
- **Übersichtlichere Rollout-Ergebnisse.** Die Job-Ansicht wurde überarbeitet: farbiger Fortschrittsbalken, Ergebnis-Symbole pro Nutzer und ein Abschnitt mit Ausführungsdetails, der genau zeigt, welche Gmail-Konten die neue Signatur erhalten haben.
- **Eigene Logs-Seite.** Die Historie der Signatur-Zuweisungen hat jetzt eine eigene Seite [Logs](/docs/logs) - wer wann welche E-Mail-Signatur erhalten hat, ist einen Klick entfernt.
- **Eine Warnung, wenn der Workspace-Zugriff bricht.** Verliert SignatureCat den Zugriff, den es auf Ihren Google Workspace braucht, sehen Admins jetzt einen roten Balken quer über der App mit einem Button **Zugriff jetzt prüfen**, statt es Tage später an einem fehlgeschlagenen Rollout zu merken.
- **Eine geführte Tour beim ersten Besuch.** Neue Admins erhalten einen kurzen, überspringbaren Rundgang durch die Navigation auf der Seite Signaturen, damit niemand raten muss, was hinter welchem Tab liegt.
- **Öffentliche Dokumentation gestartet.** signature.cat/docs ging mit über 20 Anleitungen live - von der [Verbindung Ihres Google Workspace](/docs/connect-google-workspace) bis zur [ersten Signaturvorlage](/docs/create-your-first-template). Hilfe-Links in der App führen jetzt direkt zum passenden Artikel.
- **Bessere Fehlermeldungen überall.** Jede Ansicht zeigt jetzt eine klare Meldung in Ihrer Sprache, wenn etwas schiefgeht, mit technischen Details auf Abruf - hilfreich beim Kontakt mit dem Support.
- **Sichereres Löschen von Vorlagen.** Beim Löschen einer Signaturvorlage, die noch Gruppen oder Organisationseinheiten zugewiesen ist, erscheint zuerst eine Warnung mit genauen Zahlen.
- **Rechtliches aktualisiert.** Neuer Rechtsbereich mit Nutzungsbedingungen und Datenschutzerklärung pro Sprache, ein datenschutzfreundliches Cookie-Banner und die Zustimmung zu den Bedingungen direkt im Onboarding.

## Juni 2026

- **Signaturen für Gmail-Sendealiasse.** SignatureCat verwaltet E-Mail-Signaturen auch für Gmail-Aliasse, nicht nur für die Hauptadresse. Aktivieren Sie die optionale Google-Workspace-Berechtigung, und jeder Sendealias in Ihrer Domain kann eine eigene Marken-Signatur tragen.
- **In-App-Benachrichtigungen und neue E-Mails.** Eine Benachrichtigungsglocke informiert Workspace-Admins über Signatur-Rollouts, und alle Transaktions-E-Mails erhielten ein klares, responsives Redesign.
- **Self-Service-Kontrolle pro Zuweisung.** Entscheiden Sie pro Gruppe oder Organisationseinheit, ob Nutzer ihre eigene E-Mail-Signatur anpassen dürfen oder die Firmenvorlage gesperrt bleibt - siehe [Self-Service](/docs/self-service).
- **Kostenlose Testphase für jeden Workspace.** Neues Preismodell mit kostenloser Testphase: Verbinden Sie Ihren Google Workspace, testen Sie die komplette Signaturverwaltung und wählen Sie einen Plan, wenn Sie bereit sind.
- **Verbesserte mobile Nutzung.** Tooltips, bessere mobile Layouts und ein überarbeiteter Anmeldebildschirm in der ganzen App.

## Mai 2026

- **SignatureCat geht an den Start.** Erste öffentliche Version: zentrale Verwaltung von E-Mail-Signaturen für Google Workspace. Gestalten Sie eine Signaturvorlage, rollen Sie sie an alle Gmail-Nutzer Ihrer Domain aus und halten Sie das Branding automatisch konsistent.
