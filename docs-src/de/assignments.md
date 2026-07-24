---
title: Zuweisungen
navTitle: Zuweisungen
description: SignatureCat-Zuweisungen-Referenz - Zielarten, Vorrang bei mehreren zutreffenden Zuweisungen, Alias-Modi und Konfliktbehandlung.
updated: 2026-07-17
---

# Zuweisungen

Eine Zuweisung bindet eine Vorlage an ein Ziel und hält sie über die tägliche Synchronisierung angewendet. Diese Seite ist die Referenz dafür, wie sich Ziele, Vorrang und Aliasse verhalten; die Anleitung steht in [Vorlagen zuweisen](/docs/assign-templates/). Zuweisungen werden unter [app.signature.cat/assignments](https://app.signature.cat/assignments) von Editoren und Admins verwaltet.

## Zielarten

| Ziel | Wert | Umfangsoption |
|---|---|---|
| Gruppe | Gruppen-E-Mail-Adresse | **+ Untergruppen** schließt Mitglieder verschachtelter Gruppen ein. |
| OU | Pfad beginnend mit `/`, zum Beispiel `/Engineering` | **+ Unter-OUs** deckt den gesamten Teilbaum ab. |
| Alle | Alle aktiven Nutzer im Workspace | Höchstens **eine** solche Zuweisung pro Workspace. |

Jedes Ziel kann nur eine Zuweisung tragen - das Anlegen eines Duplikats wird mit "Dieses Ziel hat bereits eine Zuweisung." abgelehnt. Die Zielart ist nach dem Anlegen fest; um eine Gruppen-Zuweisung auf eine OU umzustellen, löschen Sie sie und legen sie neu an.

Einzelne Nutzer sind bewusst kein Zuweisungsziel - decken Sie Einzelpersonen über [Self-Service](/docs/self-service/) oder einen einmaligen [Anwendungs-Auftrag](/docs/apply-jobs/) ab.

## Wie der Vorrang funktioniert

Nutzer passen oft auf mehrere Zuweisungen. Jede Synchronisierung ermittelt genau **einen Gewinner pro Nutzer**, Ebene für Ebene, von unten nach oben:

1. **Alle** - die Basisebene für jeden aktiven Nutzer.
2. **OU-Zuweisungen** überschreiben die Zuweisung an alle für Nutzer in der OU.
3. **Gruppen-Zuweisungen** überschreiben die OU-Vorlage für ihre Mitglieder. Gehört ein Nutzer zu mehreren zugewiesenen Gruppen, gewinnt die **zuletzt aktualisierte** Zuweisung.
4. **Self-Service** - die eigene Wahl eines Nutzers gewinnt über jede Zuweisung, **außer** die gewinnende Zuweisung hat **Self-Service überschreiben** aktiviert.

Verdrängt eine Zuweisung andere für einen Nutzer, vermerkt es die Ergebniszeile des Auftrags ("N andere Zuweisung(en) für diesen Nutzer überschrieben"), sodass Sie Konflikte auf den [Protokoll](/docs/logs/)-Seiten nachvollziehen können.

> [!TIP]
> Bewährtes Muster: eine Zuweisung an alle als Unternehmensstandard, OU-Zuweisungen pro Land oder Marke, Gruppen-Zuweisungen für Ausnahmen (Vertriebskampagne, Führungsteam). Die Ebenenlogik erledigt den Rest.

## Alias-Modi

Jede Zuweisung hat eine Einstellung **Aliasse**, die steuert, welche Adressen die Signatur erhalten. Das Schreiben auf Aliasse erfordert den optionalen Bereich `gmail.settings.sharing` - siehe [Domain-Wide Delegation](/docs/domain-wide-delegation/#what-exactly-do-i-authorize).

| Modus | Verhalten |
|---|---|
| **Aus** (Standard) | Nur die primäre Adresse jedes Nutzers wird signiert. Send-as-Aliasse bleiben unberührt. |
| **Adressen aus der Gruppe** | Nur bei Gruppen-Zuweisungen. Die Signatur geht an genau die Adressen, die die Gruppe listet: Ein per Alias hinzugefügtes Mitglied erhält sie nur auf diesem Alias, ein per primärer Adresse hinzugefügtes Mitglied nur auf der primären. Aliasse, die nicht in der Gruppe sind, werden nie angefasst. |
| **Alle Aliasse** | Jeder Nutzer erhält die Signatur auf seiner primären Adresse und auf jedem eigenen send-as-Alias. Eigene Aliasse, die noch nicht als send-as-Einträge eingerichtet sind, werden zuerst angelegt. |

Hinweise zum Verhalten:

- Mit **Alle Aliasse** werden externe Adressen und nicht bearbeitbare Aliasse nie automatisch angelegt; ein neu angelegter send-as-Eintrag, den Gmail als "Verifizierung ausstehend" meldet, wird bis zur Verifizierung übersprungen.
- `{{email}}` und `{{domain}}` lösen zum gerade geschriebenen **Alias** auf, sodass Alias-Signaturen die richtige Adresse zeigen. Alle anderen Variablen stammen aus dem Datensatz des Postfach-Inhabers.
- Jeder Alias-Schreibvorgang erhält eine eigene Zeile in den Auftragsergebnissen, sodass die [Prüfung](/docs/verify-assignments/) genau zeigt, welche Adressen signiert oder übersprungen wurden.
- Self-Service-Signaturen werden immer auch auf die akzeptierten Aliasse des Nutzers angewendet.

## Self-Service überschreiben

Pro Zuweisung sorgt der Schalter **Self-Service überschreiben** dafür, dass die Zuweisung über die eigene Self-Service-Wahl der Nutzer gewinnt. Die Zeile zeigt das Badge "überschreibt Self-Service". Nutzen Sie ihn für compliance-kritische Signaturen (rechtliche Disclaimer), bei denen individuelle Anpassung nicht akzeptabel ist.

## Wenn Ziele verschwinden

Wird eine zugewiesene Gruppe oder OU in Google Workspace gelöscht, markiert die nächste Synchronisierung die Zuweisung mit dem Badge "nicht im Workspace gefunden", überspringt das Ziel, benachrichtigt Admins (in der App + per E-Mail, einmal pro Fehlerserie) und versucht es bei folgenden Synchronisierungen erneut. Korrigieren Sie das Ziel im Bearbeitungsbereich oder entfernen Sie die Zuweisung. Siehe [Einen Zuweisungsauftrag prüfen](/docs/verify-assignments/#what-the-per-user-rows-tell-you).

## Bearbeiten und Entfernen

Zeilen werden direkt bearbeitet (Vorlage, Zielwert, Umfang, Alias-Modus, Überschreiben). Das Entfernen einer Zuweisung beendet die Verwaltung dieser Nutzer - bereits angewendete Signaturen bleiben in Gmail, bis etwas anderes (eine andere Zuweisung, Self-Service oder die Standardvorlage) sie bei einer späteren Synchronisierung überschreibt.
