---
title: Einen Zuweisungsauftrag prüfen
navTitle: Zuweisungsaufträge prüfen
description: Prüfen Sie, ob ein SignatureCat-Synchronisierungs- oder Anwendungs-Auftrag erfolgreich war - Auftragsstatus, Ergebnisse pro Nutzer und was die häufigen Fehlercodes bedeuten.
updated: 2026-07-19
---

# Einen Zuweisungsauftrag prüfen

Jede Synchronisierung und jedes manuelle Anwenden läuft als Auftrag mit einem Ergebnis pro Nutzer, das Sie einsehen können. Die schnellste Prüfung ist die Seite [Aufgabenprotokolle](https://app.signature.cat/assignments/logs); ein laufender Auftrag hat außerdem seine eigene Detailansicht unter `app.signature.cat/jobs/{id}`, die sich in Echtzeit aktualisiert.

## Die Aufgabenprotokolle prüfen

Öffnen Sie die [Aufgabenprotokolle](https://app.signature.cat/assignments/logs) (Editoren und Admins). Jede Zeile ist ein abgeschlossener Auftrag - eine **Zuweisungssynchronisierung** oder ein **Manuelles Anwenden** - mit Status, Start- und Endzeit, Auslöser („Automatisch" für die tägliche Synchronisierung) und einer Zusammenfassung wie „42 erfolgreich, 1 fehlgeschlagen, 2 übersprungen".

Klappen Sie eine Zeile auf, um die Details pro Nutzer zu sehen, oder klicken Sie auf **Vollständige Aufgabenansicht öffnen** für die komplette Ergebnistabelle.

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

Jede Zeile zeigt die geschriebene Adresse (Alias-Zeilen tragen ein „Alias"-Badge), den Status und bei Problemen einen Fehlercode. Die häufigsten:

- **TARGET_NOT_FOUND** - die zugewiesene Gruppe oder OU existiert nicht mehr im Workspace (gelöscht oder falscher Bezeichner). Das Ziel wurde übersprungen, Admins erhalten eine Benachrichtigung, und die Zuweisungszeile zeigt das Badge „nicht im Workspace gefunden". Korrigieren oder entfernen Sie die Zuweisung auf [Zuweisungen](https://app.signature.cat/assignments).
- **USER_NOT_FOUND** - der Nutzer existiert nicht mehr im Directory.
- **ALIAS_SCOPE_MISSING** - Alias-Signaturen erfordern den optionalen Bereich `gmail.settings.sharing`, der nicht erteilt wurde. Siehe [Ihren Google Workspace verbinden](/docs/connect-google-workspace/#step-3-authorize-domain-wide-delegation).
- **DWD_NOT_CONFIGURED / DWD_SCOPE_MISSING** - Domain-Wide Delegation ist defekt oder ein Bereich fehlt. Führen Sie den Assistenten aus den [Einstellungen](https://app.signature.cat/settings) erneut aus. Siehe [Domain-Wide Delegation](/docs/domain-wide-delegation/).
- **RATE_LIMITED** - Google hat die Anfragen gedrosselt; der Worker wiederholt automatisch, bevor dieser Code angezeigt wird.

Eine Zeile kann außerdem den Vermerk „N andere Zuweisung(en) für diesen Nutzer überschrieben" tragen - der Nutzer passte auf mehrere Zuweisungen, und diese hat gewonnen. Die Vorrangregeln stehen in der [Zuweisungen-Referenz](/docs/assignments/#how-precedence-works).

## In Gmail prüfen

Für eine Stichprobe bitten Sie einen erfassten Nutzer, die Gmail-Einstellungen zu öffnen und die Signatur anzusehen, oder senden Sie sich selbst eine Testnachricht. Denken Sie daran, dass die eigene [Self-Service](/docs/self-service/)-Signatur eines Nutzers über Zuweisungen gewinnt, sofern die Zuweisung sie nicht überschreibt.

> [!TIP]
> Fehlgeschlagene Zeilen eines abgeschlossenen Auftrags lassen sich in der Auftrags-Detailansicht mit **Fehlgeschlagene erneut ausführen** wiederholen - kein erneutes Anwenden auf alle nötig.
