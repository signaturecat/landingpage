---
title: Einen Zuweisungsauftrag prüfen
navTitle: Zuweisungsaufträge prüfen
description: Prüfen Sie, ob ein SignatureCat-Signatur-Auftrag in Google Workspace erfolgreich war - Auftragsstatus, Ergebnisse pro Nutzer, Fehlercodes und das Live-Lesen eines Gmail-Postfachs.
updated: 2026-08-02
---

# Einen Zuweisungsauftrag prüfen

Jede Synchronisierung und jedes manuelle Anwenden läuft als Auftrag mit einem Ergebnis pro Nutzer, das Sie einsehen können. Die schnellste Prüfung ist die Seite [Aufgabenprotokolle](https://app.signature.cat/logs); ein laufender Auftrag hat außerdem seine eigene Detailansicht unter `app.signature.cat/jobs/{id}`, die sich in Echtzeit aktualisiert.

## Die Aufgabenprotokolle prüfen

Öffnen Sie die [Aufgabenprotokolle](https://app.signature.cat/logs) (Editoren und Admins). Jede Zeile ist ein abgeschlossener Auftrag - eine **Zuweisungssynchronisierung** oder ein **Manuelles Anwenden** - mit Status, Start- und Endzeit, Auslöser ("Automatisch" für die tägliche Synchronisierung) und einer Zusammenfassung wie "42 erfolgreich, 1 fehlgeschlagen, 2 übersprungen".

Klappen Sie eine Zeile auf, um die Details pro Nutzer zu sehen, oder klicken Sie auf **Vollständige Aufgabenansicht öffnen** für die komplette Ergebnistabelle.

Die vollständige Auftragsansicht enthält nach Abschluss des Auftrags außerdem den Bereich **Ausführungsdetails**: **Aktualisierte Hauptadressen**, **Aktualisierte send-as-Aliasse**, **Verarbeitete Gruppen** (mit der Anzahl der Untergruppen, wenn die Zuweisung sie einschloss), **Verarbeitete Organisationseinheiten (OU)** und bei einem Ziel über den gesamten Workspace die Anzahl der Nutzer, zu der es aufgelöst wurde. Damit bestätigen Sie, dass ein Auftrag die erwartete Zielgruppe erfasst hat.

> [!NOTE]
> Aufgabenprotokolle werden für begrenzte Zeit aufbewahrt (standardmäßig die letzten 30 Tage), ältere Einträge werden automatisch entfernt. Prüfen Sie Aufträge zeitnah nach großen Rollouts.

## Auftragsstatus

| Status | Bedeutung |
|---|---|
| In Warteschlange | Wartet darauf, dass der Worker ihn aufnimmt. |
| Läuft | In Bearbeitung - die Detailseite aktualisiert sich live. |
| Erfolgreich | Jeder angesprochene Nutzer hat die Signatur erhalten. |
| Teilweise | Manche Nutzer erfolgreich, manche fehlgeschlagen oder übersprungen - prüfen Sie die Zeilen. |
| Fehlgeschlagen | Der Auftrag wurde nicht abgeschlossen. Ein Auftrag, der länger als 30 Minuten in Läuft hängt, wird automatisch als Fehlgeschlagen markiert. |
| Abgebrochen | Vor der Ausführung abgebrochen (zum Beispiel wurde die Vorlage mit ausstehenden Aufträgen gelöscht). |

## Was die Zeilen pro Nutzer aussagen

Jede Zeile zeigt die geschriebene Adresse (Alias-Zeilen tragen ein "Alias"-Badge), den Status und bei Problemen einen Fehlercode. Die häufigsten:

- **TARGET_NOT_FOUND** - die zugewiesene Gruppe oder OU existiert nicht mehr im Workspace (gelöscht oder falscher Bezeichner). Das Ziel wurde übersprungen, Admins erhalten eine Benachrichtigung, und die Zuweisungszeile zeigt das Badge "nicht im Workspace gefunden". Korrigieren oder entfernen Sie die Zuweisung auf [Zuweisungen](https://app.signature.cat/assignments).
- **USER_NOT_FOUND** - der Nutzer existiert nicht mehr im Directory.
- **ALIAS_SCOPE_MISSING** - Alias-Signaturen erfordern den optionalen Bereich `gmail.settings.sharing`, der nicht erteilt wurde. Siehe [Ihren Google Workspace verbinden](/docs/connect-google-workspace#schritt-4-domain-wide-delegation-autorisieren).
- **DWD_NOT_CONFIGURED / DWD_SCOPE_MISSING** - Domain-Wide Delegation ist defekt oder ein Bereich fehlt. Führen Sie den Assistenten aus den [Einstellungen](https://app.signature.cat/settings) erneut aus. Siehe [Domain-Wide Delegation](/docs/domain-wide-delegation).
- **RATE_LIMITED** - Google hat die Anfragen gedrosselt; der Worker wiederholt automatisch, bevor dieser Code angezeigt wird.

Ein Code ist eine Warnung und kein Fehlschlag: **GMAIL_SIGNATURE_SANITIZED** steht in Zeilen, die **erfolgreich** waren, angezeigt als bernsteinfarbenes Badge **von Gmail gekürzt** mit "Angewendet, aber Gmail hat eine gekürzte Kopie dieser Signatur gespeichert." Gmail hat den Schreibvorgang angenommen und das HTML beim Speichern umgeschrieben, ein erneuter Versuch speichert also genau dasselbe. Die Lösung ist, das markierte Markup zu vereinfachen - **Technische Details** in der Zeile nennt die entfernten Elemente - und die Vorlage erneut zu testen. Siehe [Wenn Gmail Ihre Signatur kürzt](/docs/gmail-sanitization).

Eine Zeile kann außerdem den Vermerk "N andere Zuweisung(en) für diesen Nutzer überschrieben" tragen - der Nutzer passte auf mehrere Zuweisungen, und diese hat gewonnen. Die Vorrangregeln stehen in der [Zuweisungen-Referenz](/docs/assignments#wie-der-vorrang-funktioniert).

## In Gmail prüfen

Die schnellste Prüfung ist **Aktuelle Signatur anzeigen** in einer erfolgreichen Zeile der [Aufgabenprotokolle](https://app.signature.cat/logs): Das liest das Gmail-Postfach dieses Nutzers live und zeigt Ihnen, was dort wirklich gespeichert ist, einschließlich allem, was der Nutzer von Hand geändert hat. Siehe [Die aktuelle Signatur aus dem Postfach lesen](/docs/logs#die-aktuelle-signatur-aus-dem-postfach-lesen).

Für eine Prüfung im Mail-Client selbst bitten Sie einen erfassten Nutzer, die Gmail-Einstellungen zu öffnen und die Signatur anzusehen, oder senden Sie sich selbst eine Testnachricht. Denken Sie daran, dass die eigene [Self-Service](/docs/self-service)-Signatur eines Nutzers über Zuweisungen gewinnt, sofern die Zuweisung sie nicht überschreibt.

> [!TIP]
> Ein abgeschlossener Auftrag hat keine Schaltfläche zum Wiederholen. Sobald Sie behoben haben, worauf der Fehlercode zeigt, starten Sie über die Seite [Anwenden](https://app.signature.cat/apply) eine neue Anwendung nur für diese Adressen - kein erneutes Anwenden auf alle nötig.
