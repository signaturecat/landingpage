---
title: Support-Zugriff
navTitle: Support-Zugriff
description: Was der SignatureCat-Support in Ihrem Google Workspace-Konto tun darf und was nicht, einschließlich der Ansicht der aktuellen Gmail-Signatur eines Nutzers, und wie das protokolliert wird.
updated: 2026-08-02
---

# Support-Zugriff

Standardmäßig kann der SignatureCat-Support **nichts an Ihrem Konto ändern**. Wenn unser Team direkt mit anpacken soll - zum Beispiel beim Onboarding oder bei der Suche nach einer fehlerhaften Zuweisung - kann ein Admin diese Berechtigung mit einem einzigen Schalter erteilen und ebenso leicht wieder entziehen.

## Wo der Schalter ist

Öffnen Sie die [Einstellungen](https://app.signature.cat/settings) und suchen Sie den Bereich **Support-Zugriff**. Er ist nur für Nutzer mit der Zugriffsstufe **Admin** sichtbar. Schalten Sie ihn ein, um Änderungen zu erlauben, und aus, um sie wieder zu blockieren - die Änderung wirkt sofort.

## Was er freischaltet

Mit **eingeschaltetem** Support-Zugriff kann unser Support-Team die Bereiche Ihres Kontos anpassen, bei denen es typischerweise hilft, plus eine Diagnoseansicht, die sonst blockiert ist:

| Bereich | Beispiele |
|---|---|
| Signaturvorlagen | Defektes HTML reparieren, Variablen anpassen |
| Zuweisungen | Eine Gruppe oder OU neu ausrichten, die zugewiesene Vorlage ändern |
| Benutzerzugriff | Zugriffsrechte hinzufügen oder korrigieren |
| Rechnungs-E-Mail | Die Adresse korrigieren, an die Ihre Rechnungen gehen |
| Signaturdiagnose | Die Signatur ansehen, die derzeit im Gmail eines Nutzers gesetzt ist |

Mit **ausgeschaltetem** Schalter kann der Support weiterhin Kontodaten *lesen*, die zur Diagnose eines Problems nötig sind (Auftragsprotokolle, Konfiguration), aber jede Änderung wird vom System abgelehnt - nicht nur in der Oberfläche ausgeblendet. Die aktuelle Gmail-Signatur eines Nutzers anzusehen ist die Ausnahme unter den Lesezugriffen: Sie greift in ein Postfach hinein und wird daher abgelehnt, sobald der Schalter aus ist.

## Was er nie erlaubt

Unabhängig vom Schalter kann das SignatureCat-Personal nicht:

- sich als Sie oder einer Ihrer Nutzer anmelden;
- Ihr Abonnement ändern oder kündigen oder Abbuchungen auslösen;
- Ihr Konto löschen;
- die E-Mails von irgendjemandem lesen - SignatureCat hält überhaupt keine Scopes für Mail-Inhalte, sodass Mails, Anhänge und Entwürfe mit eingeschaltetem wie ausgeschaltetem Schalter unerreichbar bleiben (siehe [Domain-Wide Delegation](/docs/domain-wide-delegation));
- auf gespeicherte Geheimnisse oder Zugangsdaten zugreifen.

## Alles wird protokolliert

Transparenz ist eingebaut:

- Das Ein- oder Ausschalten des Schalters wird in das Aktivitätsprotokoll Ihres Kontos geschrieben, und die anderen Admins erhalten eine In-App-Benachrichtigung, wenn der Support-Zugriff aktiviert wird.
- Jede Änderung unseres Teams erscheint im Aktivitätsprotokoll in den [Einstellungen](https://app.signature.cat/settings) als Name des Mitarbeiters gefolgt von "(SignatureCat Support)" - derselbe Verlauf, in den auch die Änderungen Ihrer eigenen Admins gehen.
- Jedes Mal, wenn unser Team die derzeit im Gmail eines Nutzers gesetzte Signatur ansieht, wird dieser Zugriff in dasselbe Aktivitätsprotokoll geschrieben. Der Eintrag hält die geprüfte Adresse fest, nie die Signatur selbst.
- Diese Einträge sind Teil Ihrer Kontodaten und daher in Datenexporten enthalten.

> [!TIP]
> Aktivieren Sie den Support-Zugriff für die Dauer eines Support-Falls und schalten Sie ihn aus, wenn der Fall abgeschlossen ist. Es geht nichts kaputt, wenn er aus bleibt - er begrenzt nur, was unser Team direkt für Sie tun kann.

Der Mechanismus ist in den [Nutzungsbedingungen und der Datenschutzerklärung](/legal) beschrieben (Dienstzugriff mit Zustimmung des Kunden).
