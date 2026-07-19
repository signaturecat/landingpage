# Allgemeine Geschäftsbedingungen (AGB) für Signature.Cat

Version 1.2 - gültig ab 02.08.2026

**Diese Allgemeinen Geschäftsbedingungen sind in polnischer Sprache unter https://signature.cat/terms als rechtsverbindliche Fassung verfügbar. Dieses Dokument ist eine automatische Übersetzung des polnischen Originals, dient ausschließlich Informationszwecken und kann Fehler oder Ungenauigkeiten enthalten. Im Falle von Abweichungen ist die polnische Fassung maßgeblich.**

Diese AGB stellen ein Reglement für die Erbringung von Dienstleistungen auf elektronischem Wege im Sinne von Art. 8 des polnischen Gesetzes vom 18. Juli 2002 über die Erbringung von Dienstleistungen auf elektronischem Wege dar.

---

## § 1. Anbieter

1. Anbieter ist **Tomasz Piasecki**, der eine Geschäftstätigkeit unter der Firma **SystemAdmin Tomasz Piasecki** ausübt, ul. Aleje Jerozolimskie 190, 02-486 Warszawa, NIP 1231455439 (nachfolgend: „Anbieter“).
2. Kontakt zum Anbieter: E-Mail **contact@signature.cat**.
3. Der Dienst wird unter folgenden Adressen erbracht: **https://app.signature.cat** (Anwendung) sowie **https://signature.cat** (Informationsseite).

## § 2. Definitionen

1. **Dienst / Plattform** - der Dienst Signature.Cat, der auf elektronischem Wege im SaaS-Modell erbracht wird, beschrieben in § 4.
2. **Kunde** - ein Unternehmer (juristische Person, Organisationseinheit oder natürliche Person, die eine Geschäftstätigkeit ausübt), der mit dem Anbieter einen Vertrag im Zusammenhang mit seiner Geschäfts- oder Berufstätigkeit geschlossen hat.
3. **Vertrag** - der Vertrag über die Erbringung des Dienstes, geschlossen zwischen dem Anbieter und dem Kunden zu den Bedingungen der AGB.
4. **Workspace** - die Google Workspace-Umgebung des Kunden, registriert auf die Domain des Kunden, die der Kunde in seiner eigenen Google-Admin-Konsole verwaltet.
5. **Konto** - das Konto des Kunden in der Plattform, verknüpft mit einer Workspace-Domain.
6. **Nutzer** - eine natürliche Person, die im Namen des Kunden handelt und sich mit einem Google-Konto aus dem Workspace des Kunden bei der Plattform anmeldet.
7. **Workspace-Administrator** - ein Nutzer, der im Workspace des Kunden über Google-Super-Administrator-Rechte verfügt.
8. **Zugriffsstufe** - der Umfang der Berechtigungen des Nutzers in der Plattform, vergeben gemäß § 6 Abs. 6.
9. **Testzeitraum (Trial)** - der 7-tägige Testzeitraum, beschrieben in § 7.
10. **Abonnementplan** - das monatliche, sich verlängernde Abonnement, abgerechnet nach der Anzahl der Seats, beschrieben in § 8.
11. **Seat** - ein aktiver (nicht gesperrter) Nutzer im Workspace des Kunden, ermittelt auf Grundlage des Google-Nutzerverzeichnisses (Directory).
12. **DWD (Domain-Wide Delegation)** - ein Google-Mechanismus, bei dem der Workspace-Administrator ein dediziertes Dienstkonto autorisiert, im Workspace des Kunden in genau festgelegten Bereichen (Scopes) zu handeln (§ 5 Abs. 3).
13. **Zahlungsdienstleister** - Stripe, ein Anbieter von Zahlungsdiensten, der Zahlungen und Abrechnungsdaten abwickelt (Zertifizierung PCI-DSS Level 1).
14. **DPA** - der Auftragsverarbeitungsvertrag im Sinne von Art. 28 DSGVO, geschlossen zwischen dem Kunden und dem Anbieter.
15. **AGB** - das vorliegende Dokument.

## § 3. Charakter des Dienstes - ausschließlich B2B

1. Der Dienst ist **ausschließlich für Unternehmer** bestimmt und darf ausschließlich im Zusammenhang mit der Geschäfts- oder Berufstätigkeit des Kunden genutzt werden. Der Anbieter erbringt den Dienst nicht für Verbraucher.
2. Mit Abschluss des Vertrags erklärt der Kunde, dass er ihn im Rahmen seiner Geschäfts- oder Berufstätigkeit abschließt und dass der Vertrag für ihn beruflichen Charakter hat. Das Erfordernis eines auf die Firmendomain registrierten Google Workspace (§ 5 Abs. 1) stellt eine technische Bestätigung dieses Charakters dar.
3. Auf den Vertrag finden die Vorschriften zum Verbraucherschutz keine Anwendung, einschließlich des gesetzlichen 14-tägigen Rechts auf Widerruf eines Fernabsatzvertrags - im weitesten gesetzlich zulässigen Umfang.
4. Die Person, die die AGB im Namen des Kunden akzeptiert, erklärt, dass sie bevollmächtigt ist, Verpflichtungen im Namen des Kunden einzugehen.

## § 4. Umfang und Beschreibung des Dienstes

1. Der Dienst besteht in der zentralen Verwaltung der E-Mail-Signaturen der Gmail-Nutzer im Workspace des Kunden. Zum Zeitpunkt des Inkrafttretens der AGB umfasst der Dienst:
   1. die Erstellung und Bearbeitung von Signaturvorlagen im HTML-Format, mit personalisierenden Variablen (u. a. Vorname, Nachname, Position, Abteilung, Telefon, Foto) sowie bedingten Blöcken; die Werte der Variablen werden laufend aus dem Nutzerverzeichnis des Workspace des Kunden abgerufen;
   2. die Zuweisung von Vorlagen an einzelne Nutzer, Google-Gruppen oder Organisationseinheiten (OU); die Zuweisungen werden zum Zeitpunkt der Bereitstellung auf die jeweiligen Personen aufgelöst;
   3. die automatische, tägliche Synchronisierung der Zuweisungen, die die Signaturen auf aktuellem Stand hält;
   4. die optionale Bereitstellung von Signaturen auf Versand-Aliassen (send-as), sofern der Kunde dem durch Autorisierung eines zusätzlichen, optionalen DWD-Scopes zustimmt (§ 5 Abs. 3 Nr. 5);
   5. eine Self-Service-Seite für Endnutzer (Vorschau und, je nach vergebener Zugriffsstufe, auch Bearbeitung der eigenen Signatur);
   6. eine Bibliothek von Firmenbildern (Logos, Banner) samt deren Hosting unter einer vom Anbieter bereitgestellten Adresse oder - nach Konfiguration eines CNAME-Eintrags durch den Kunden - unter einer Subdomain der eigenen Domain des Kunden;
   7. die Verwaltung der Zugriffsstufen der Nutzer (§ 6 Abs. 6);
   8. ein Ereignisregister (Audit-Log), das die im Konto vorgenommenen Handlungen dokumentiert;
   9. eine Benutzeroberfläche in den Sprachen: Englisch, Polnisch, Deutsch und Französisch;
   10. E-Mail-Benachrichtigungen über Ereignisse betreffend das Konto (u. a. Registrierung, Vergabe von Zugriffsrechten, Verlust der DWD-Autorisierung, Abrechnungsereignisse).
2. Der Dienst sieht im Rahmen einer angemessenen Nutzung keine Begrenzung der Anzahl der Signaturvorlagen oder Bilder vor; die technischen Beschränkungen sind in § 5 Abs. 5 angegeben. Der einzige Abrechnungsparameter ist die Anzahl der Seats (§ 8).
3. Der Anbieter entwickelt den Dienst laufend weiter. Änderungen, die die für den Kunden wesentlichen Funktionen nicht verschlechtern, stellen keine Vertragsänderung dar.

## § 5. Technische Anforderungen und Nutzungsregeln

1. Die Nutzung des Dienstes erfordert auf Seiten des Kunden:
   1. ein aktives **Google Workspace**-Abonnement, registriert auf die Domain des Kunden; die Anmeldung bei der Plattform ist ausschließlich mit einem Google-Konto aus dem Workspace möglich (private Konten, z. B. @gmail.com, werden nicht unterstützt);
   2. einen Workspace-Administrator (Google-Super-Administrator) - nur er kann die DWD-Autorisierung in der Google-Admin-Konsole durchführen und die erste Registrierung des Kontos vornehmen;
   3. eine aktuelle Version eines der allgemein gebräuchlichen Webbrowser (u. a. Chrome, Firefox, Safari, Edge) mit aktiviertem JavaScript und aktivierten Cookies;
   4. ein aktives E-Mail-Konto zum Empfang von Benachrichtigungen und Abrechnungskorrespondenz.
2. Die Signaturen werden im Dienst **Gmail** bereitgestellt (Einstellung der Versandsignatur des Nutzers). Der Dienst unterstützt keine anderen E-Mail-Clients oder Mailserver.
3. Der Betrieb des Dienstes erfordert, dass der Kunde die DWD-Autorisierung für ein dediziertes Dienstkonto in folgenden Scopes aufrechterhält:
   1. `https://www.googleapis.com/auth/gmail.settings.basic` (Schreiben von Signaturen) - erforderlich;
   2. `https://www.googleapis.com/auth/admin.directory.user.readonly` (Lesen des Nutzerverzeichnisses) - erforderlich;
   3. `https://www.googleapis.com/auth/admin.directory.group.member.readonly` (Lesen der Gruppenmitgliedschaften) - erforderlich;
   4. `https://www.googleapis.com/auth/admin.directory.customer.readonly` (Lesen grundlegender Workspace-Daten) - erforderlich;
   5. `https://www.googleapis.com/auth/gmail.settings.sharing` (Signaturen auf Send-as-Aliassen) - optional; sein Fehlen deaktiviert ausschließlich die Alias-Funktion.
   Der Widerruf oder die Einschränkung der DWD-Autorisierung durch den Kunden macht die Erbringung eines wesentlichen Teils des Dienstes unmöglich und stellt keine Nichterfüllung des Vertrags durch den Anbieter dar.
4. Die Inhalte der Signaturen unterliegen einer automatischen serverseitigen Sanitisierung: unzulässig sind Skripte, JavaScript-Ereignisse sowie bestimmte CSS-Konstruktionen, die dem Tracking oder der Einschleusung von Code dienen könnten. Bilder werden ausschließlich in den Formaten PNG und JPEG angenommen (das SVG-Format wird aus Sicherheitsgründen blockiert), mit einer Größe von bis zu 5 MB und in einer Anzahl von bis zu 200 pro Ressourcenart; die Dateien werden auf ihren tatsächlichen Inhaltstyp geprüft.
5. Untersagt ist die Bereitstellung rechtswidriger Inhalte durch den Kunden, insbesondere: Inhalte, die Rechte Dritter verletzen (u. a. Urheberrechte an Logos und Grafiken), Schadcode, Inhalte, die dem Versand unerbetener kommerzieller Informationen (Spam) dienen, sowie Inhalte, die Empfänger in die Irre führen.
6. Untersagt sind ferner: Versuche, Sicherheitsmechanismen oder Limits der Plattform zu umgehen, Sicherheitstests ohne vorherige schriftliche Zustimmung des Anbieters, das automatische Abrufen von Inhalten der Plattform (Scraping), die gemeinsame Nutzung des Kontos mit Dritten sowie der Weiterverkauf des Dienstes ohne gesonderten Vertrag.

## § 6. Registrierung, Konto und Nutzer

1. Die Registrierung des Kontos erfolgt durch Anmeldung mit einem Google Workspace-Konto (Google OAuth). Die Plattform speichert keine Passwörter der Nutzer; die Authentifizierung erfolgt ausschließlich über Google.
2. **Der Vertrag kommt mit der Akzeptanz der AGB bei der Registrierung des Kontos zustande, spätestens jedoch mit der Aktivierung des Testzeitraums oder des Abonnementplans.** Der Testzeitraum stellt einen vollwertigen Vertrag über die Erbringung von Dienstleistungen auf elektronischem Wege dar.
3. Das Konto ist mit einer Workspace-Domain verknüpft. Die erste Registrierung des Kontos kann ausschließlich der Workspace-Administrator durchführen.
4. Der Kunde gewährleistet, dass die bei der Registrierung und in den Abrechnungen angegebenen Daten wahr und aktuell sind.
5. Der Kunde haftet für Handlungen und Unterlassungen aller seiner Nutzer wie für eigene Handlungen und ist verpflichtet sicherzustellen, dass ausschließlich dazu befugte Personen Zugriff auf das Konto haben.
6. Der Zugriff der Nutzer auf die Funktionen der Plattform wird durch Zugriffsstufen bestimmt (vom Self-Service-Zugriff über Projekt- und Bearbeitungsrechte bis hin zu vollen Administratorrechten), die in der Plattform durch berechtigte Nutzer des Kunden vergeben werden. Workspace-Administratoren verfügen stets über die volle Administratorstufe, und diese kann ihnen in der Plattform nicht entzogen werden.
7. **Servicezugriff (Support).** Das Support-Team des Anbieters darf Änderungen an den Kontoeinstellungen (z. B. an Signaturvorlagen, Zuweisungen oder Berechtigungen) nur nach vorheriger Zustimmung des Kunden vornehmen, die über einen dedizierten Schalter in den Plattformeinstellungen erteilt wird und Nutzern mit Administratorstufe zur Verfügung steht. Die Zustimmung kann jederzeit widerrufen werden. Das Aktivieren und Deaktivieren der Zustimmung sowie jede vom Support vorgenommene Änderung werden im Audit-Protokoll des Kontos zusammen mit dem Namen des Support-Mitarbeiters vermerkt. Unabhängig von der Zustimmung behält der Anbieter lesenden Zugriff in dem Umfang, der zur Aufrechterhaltung des Dienstes und zur Fehlerdiagnose erforderlich ist (gemäß DPA und Datenschutzerklärung).

## § 7. Testzeitraum

1. Einem neuen Kunden steht ein kostenloser Testzeitraum von **7 Tagen** ab Aktivierung zu, der - zum Zeitpunkt des Inkrafttretens der AGB - die volle Funktionalität des Dienstes umfasst, vorbehaltlich Abs. 8.
2. Die Aktivierung des Testzeitraums erfordert die Angabe einer gültigen Zahlungskarte im Formular des Zahlungsdienstleisters. **Während des Testzeitraums wird die Karte nicht belastet.**
3. **Nach Ablauf des Testzeitraums wandelt sich das Abonnement automatisch in einen kostenpflichtigen Abonnementplan um, und die Karte des Kunden wird mit der ersten Monatsgebühr belastet** - es sei denn, der Kunde kündigt das Abonnement vor Ablauf des Testzeitraums. Eine Kündigung vor dem Ende des Testzeitraums ist mit keinerlei Gebühren verbunden.
4. Der Anbieter erinnert an das bevorstehende Ende des Testzeitraums mit einer E-Mail-Nachricht, die etwa 3 Tage vor dessen Ablauf versandt wird.
5. Verfügt das Konto zum Zeitpunkt des Endes des Testzeitraums über keine gültige Zahlungsmethode, wird das Abonnement automatisch ohne Berechnung von Gebühren storniert, und der Zugriff auf die Funktionen der Plattform wird bis zum Erwerb eines Abonnementplans gesperrt.
6. **Der Testzeitraum steht pro Workspace-Domain einmalig zu.** Die Inanspruchnahme des Testzeitraums wird in einem vom Anbieter geführten Register vermerkt und bleibt auch nach der Löschung des Kontos wirksam; eine erneute Registrierung derselben Domain beginnt unmittelbar mit dem kostenpflichtigen Abonnementplan.
7. Das Ende des Testzeitraums ohne Umwandlung in einen Abonnementplan führt nicht zur automatischen Löschung der Kontodaten; die Regeln für die Speicherung und Löschung von Daten bestimmen § 15 sowie die Datenschutzerklärung.
8. **Der Testzeitraum wird „wie besehen“ (as-is) erbracht, im weitesten gesetzlich zulässigen Umfang.** Während des Testzeitraums:
   1. gilt das in § 9 Abs. 1 genannte Verfügbarkeitsziel nicht, und dem Kunden stehen weder Servicegutschriften noch Schadensersatz für die Nichtverfügbarkeit des Dienstes zu;
   2. übernimmt der Anbieter keine Garantien oder Zusicherungen hinsichtlich der Funktion, der Verfügbarkeit und der Eignung des Dienstes für die Zwecke des Kunden;
   3. wird technischer Support ausschließlich per E-Mail (contact@signature.cat) geleistet, ohne garantierte Antwortzeit;
   4. kann der Anbieter den Umfang der im Testzeitraum verfügbaren Funktionen einschränken oder ändern.
   Die Bestimmungen dieses Absatzes beschränken weder das Reklamationsverfahren (§ 13) noch die Haftung für vorsätzlich verursachte Schäden.

## § 8. Gebühren und Abrechnung

1. Der Dienst wird im Modell eines **monatlichen, im Voraus zahlbaren Abonnements** abgerechnet, in US-Dollar (USD). Ein Jahresplan wird nicht angeboten.
2. Die Höhe der Gebühr hängt von der Anzahl der Seats ab, nach **kaskadierend (graduated)** berechneten Stufen - jeder Seat wird zum Satz der Stufe abgerechnet, zu der er gehört:

   | Anzahl der Seats | Satz pro Seat / Monat |
   |---|---|
   | 1 - 50 | 0,80 USD |
   | 51 - 120 | 0,70 USD |
   | 121 - 300 | 0,60 USD |
   | ab 301 | 0,55 USD |

   Beispiel: 60 Seats = 50 x 0,80 USD + 10 x 0,70 USD = 47,00 USD monatlich.
3. Die Anzahl der Seats entspricht der Anzahl der aktiven (nicht gesperrten) Nutzer im Workspace des Kunden, mindestens jedoch 1, und wird auf Grundlage des Workspace-Nutzerverzeichnisses **automatisch aktualisiert**: eine Erhöhung der Seat-Anzahl wird unverzüglich mit einer anteiligen Nachzahlung für den verbleibenden Teil des Abrechnungszeitraums abgerechnet, und eine Verringerung der Seat-Anzahl wird ab dem folgenden Abrechnungszeitraum berücksichtigt (der Kunde erhält keine Erstattung für den laufenden Zeitraum).
4. Die Zahlungen werden vom Zahlungsdienstleister abgewickelt. **Der Anbieter speichert keine Zahlungskartendaten.** Die Abrechnungsdaten (Firmenname, Adresse, optional NIP/VAT ID) werden im Formular des Zahlungsdienstleisters angegeben und dort gespeichert; in der Plattform verwaltet der Kunde ausschließlich die E-Mail-Adresse für Abrechnungszwecke.
5. Die in Abs. 2 genannten Preise enthalten keine Steuern. Der Kunde ist für die Abführung der nach den Vorschriften der für ihn maßgeblichen Jurisdiktion geschuldeten Steuern verantwortlich, einschließlich - im Falle von umsatzsteuerpflichtigen Unternehmern aus der EU - unter Berücksichtigung des Reverse-Charge-Verfahrens, sofern dieses Anwendung findet.
6. Zahlungsbestätigungen und Abrechnungsdokumente werden an die vom Kunden angegebene E-Mail-Adresse für Abrechnungszwecke zugestellt.
7. **Das Abonnement verlängert sich automatisch jeden Monat**, bis es gekündigt wird. Der Kunde kann das Abonnement jederzeit kündigen - in den Einstellungen der Plattform oder im Abrechnungsportal des Zahlungsdienstleisters - mit Wirkung zum Ende des laufenden, bezahlten Abrechnungszeitraums. Bis zum Ende dieses Zeitraums bleibt der Dienst in vollem Umfang verfügbar.
8. Im Falle einer fehlgeschlagenen Kartenbelastung:
   1. wird der Zugriff auf den Dienst während eines **3-tägigen Nachfristzeitraums** aufrechterhalten, gerechnet ab dem ersten fehlgeschlagenen Belastungsversuch; der Kunde wird per E-Mail und durch eine Meldung in der Plattform informiert und kann in dieser Zeit die Zahlungsmethode aktualisieren;
   2. werden erneute Belastungsversuche automatisch vom Zahlungsdienstleister durchgeführt;
   3. wird nach erfolglosem Ablauf des Nachfristzeitraums der Zugriff auf die Funktionen der Plattform bis zur Begleichung des Rückstands ausgesetzt; eine erfolgreiche Belastung stellt den Zugriff automatisch wieder her.
9. **Gebühren für einen begonnenen Abrechnungszeitraum werden nicht erstattet**, auch nicht im Falle der Kündigung des Abonnements oder der Löschung des Kontos während des Zeitraums. Dies schließt Ansprüche des Kunden wegen Nichterfüllung des Vertrags durch den Anbieter nicht aus.
10. Der Anbieter ist berechtigt, die Preisliste zu ändern, insbesondere im Falle einer Änderung der Kosten der Diensterbringung, des Funktionsumfangs, der Tarife externer Anbieter oder des Marktumfelds. Eine Änderung der Preisliste erfordert eine Benachrichtigung des Kunden per E-Mail mit einer Frist von mindestens **30 Tagen** (§ 14 Abs. 5) und gilt frühestens ab dem nächsten Abrechnungszeitraum, der nach Ablauf dieser Frist beginnt. Die Preise ändern sich nicht während eines bezahlten Zeitraums. Ein Kunde, der die neuen Preise nicht akzeptiert, kann das Abonnement gemäß Abs. 7 kündigen.

## § 9. Verfügbarkeit des Dienstes

1. Der Anbieter bemüht sich mit der gebotenen Sorgfalt, eine Verfügbarkeit der Plattform von mindestens **99% pro Kalendermonat** zu gewährleisten. Dieses Ziel gilt nicht im Testzeitraum (§ 7 Abs. 8).
2. Die Verfügbarkeit der Plattform wird auf der Statusseite des Anbieters unter **https://status.signature.cat/** (die „Statusseite") gemessen und veröffentlicht. Grundlage für die Ermittlung der Verfügbarkeit der Plattform in einem Kalendermonat, einschließlich der Erreichung des in Abs. 1 genannten Ziels, sind die Angaben der Statusseite - unter Ausschluss der in Abs. 3 genannten Unterbrechungen und Ereignisse.
3. Nicht als Nichtverfügbarkeit gelten Unterbrechungen infolge von:
   1. geplanten technischen Unterbrechungen und Wartungsarbeiten, die im Voraus auf der Statusseite unter **https://status.signature.cat/maintenance** angekündigt werden;
   2. Ausfällen oder Einschränkungen auf Seiten externer Infrastruktur- und Dienstanbieter, die die Plattform nutzt (u. a. Hosting, Content Delivery Network, Zahlungsdienstleister, Google-Dienste und Google-APIs);
   3. höherer Gewalt;
   4. Ursachen auf Seiten des Kunden, insbesondere des Widerrufs der DWD-Autorisierung, von Änderungen der Workspace-Konfiguration oder der Nichterfüllung der technischen Anforderungen aus § 5.
4. Die Bereitstellung von Signaturen hängt von der Verfügbarkeit und den Funktionsregeln der Google-APIs ab; der Anbieter haftet weder für Änderungen, die Google an diesen Schnittstellen vornimmt, noch für Entscheidungen von Google bezüglich des Workspace des Kunden.
5. Aktuelle Informationen über Ausfälle, Vorfälle und geplante Wartungsarbeiten werden auf der Statusseite veröffentlicht. Ausfälle und Unregelmäßigkeiten können an die Adresse contact@signature.cat gemeldet werden. Die AGB sehen keine Servicegutschriften vor; individuelle SLA-Garantien können in einem gesonderten Vertrag vereinbart werden.

## § 10. Haftung

1. Der Anbieter haftet für die Nichterfüllung oder nicht ordnungsgemäße Erfüllung des Vertrags nach den allgemeinen Grundsätzen, mit den nachstehend genannten Beschränkungen, die im Geschäftsverkehr zwischen Unternehmern (B2B) zulässig sind.
2. **Die Gesamthaftung des Anbieters** aus sämtlichen mit dem Vertrag zusammenhängenden Rechtsgründen ist auf den Gegenwert **einer monatlichen Abonnementgebühr** für das von dem Schaden betroffene Konto beschränkt - in Höhe der Gebühr für den Abrechnungszeitraum, in dem das schadensverursachende Ereignis eingetreten ist, und wenn die Gebühr für diesen Zeitraum nicht berechnet wurde (insbesondere im Testzeitraum) - in einer Höhe, die nach der Anzahl der Seats des Kunden und der am Tag des Ereignisses geltenden Preisliste berechnet wird.
3. Der Anbieter haftet nicht für entgangenen Gewinn oder für mittelbare Schäden und Folgeschäden, einschließlich des Verlusts von Einnahmen, Reputation oder von außerhalb der Plattform verarbeiteten Daten.
4. Die Beschränkungen aus Abs. 2 und 3 finden keine Anwendung auf vorsätzlich verursachte Schäden.
5. Der Kunde ist verantwortlich für:
   1. die in die Plattform eingegebenen Inhalte (Vorlagen, Bilder, URL-Adressen), einschließlich des Besitzes der Rechte zu deren Nutzung;
   2. die Übereinstimmung der Signaturinhalte mit dem für den Kunden geltenden Recht (einschließlich der Anforderungen an die Kennzeichnung geschäftlicher Korrespondenz);
   3. die Folgen der Handlungen von Personen, denen er den Zugriff auf das Konto ermöglicht hat, sowie die Folgen unbefugten Zugriffs, der auf der Nichteinhaltung der Sicherheitsregeln auf Seiten des Kunden beruht;
   4. die Aufrechterhaltung der DWD-Autorisierung sowie die Richtigkeit der Workspace-Konfiguration.
6. Im Falle eines wesentlichen Verstoßes gegen die AGB kann der Anbieter - nach erfolgloser Aufforderung zur Unterlassung der Verstöße, und in gravierenden Fällen (z. B. Verbreitung von Schadcode, Spam) unverzüglich - den Zugriff auf das Konto bis zur Klärung der Angelegenheit aussetzen. Die Aussetzung entbindet den Kunden nicht von der Pflicht zur Zahlung für den laufenden Abrechnungszeitraum.

## § 11. Geistiges Eigentum und Lizenz

1. Die Plattform, einschließlich ihres Codes, ihrer Benutzeroberfläche, ihrer Dokumentation sowie der Marken und Logos von Signature.Cat, ist Eigentum des Anbieters oder Gegenstand ihm zustehender Rechte.
2. Für die Dauer des Vertrags erteilt der Anbieter dem Kunden eine nicht ausschließliche, nicht übertragbare, territorial auf den Wirkungsbereich des Dienstes beschränkte Lizenz zur Nutzung der Plattform, ausschließlich für die Zwecke der eigenen Tätigkeit des Kunden. Die Lizenz umfasst kein Recht zur Unterlizenzierung.
3. Untersagt sind das Dekompilieren, die Rückgewinnung des Quellcodes (Reverse Engineering), das Kopieren oder das Erstellen abgeleiteter Werke der Plattform, außer in den durch zwingende Rechtsvorschriften erlaubten Fällen.
4. **Die Inhalte des Kunden** (Signaturvorlagen, Bilder, Konfiguration) bleiben Eigentum des Kunden. Der Kunde erteilt dem Anbieter eine Lizenz, die auf den zur Erbringung des Dienstes erforderlichen Umfang beschränkt ist (Speicherung, Verarbeitung, Rendering und Veröffentlichung von Bildern unter den Hosting-Adressen, Bereitstellung von Signaturen im Workspace des Kunden).
5. Der Anbieter **verwendet die Inhalte und Daten des Kunden weder zum Training von Modellen künstlicher Intelligenz** noch zu anderen Zwecken als der Erbringung und Aufrechterhaltung des Dienstes.

## § 12. Personenbezogene Daten und DPA

1. Hinsichtlich der personenbezogenen Daten der Nutzer, der Abrechnungsdaten und der über die Seiten des Anbieters erhobenen Daten ist der Anbieter der Verantwortliche. Die Grundsätze der Verarbeitung bestimmt die Datenschutzerklärung, verfügbar unter https://signature.cat/privacy.
2. Hinsichtlich der personenbezogenen Daten der Mitarbeiter und freien Mitarbeiter des Kunden, die im Rahmen des Dienstes verarbeitet werden (Daten des Workspace-Verzeichnisses, die in Signaturen verwendet werden), ist der Kunde der Verantwortliche, und der Anbieter handelt als Auftragsverarbeiter (Prozessor) auf dokumentierte Weisung des Kunden.
3. Die Parteien schließen einen DPA, der die in Abs. 2 genannte Auftragsverarbeitung regelt. Der Abschluss des DPA erfolgt auf Antrag des Kunden an die Adresse contact@signature.cat. Der DPA wird ausschließlich in englischer Sprache geschlossen, und die englische Fassung ist seine einzige verbindliche Fassung. Bis zum Abschluss eines individuellen DPA erfolgt die Auftragsverarbeitung nach den in der Datenschutzerklärung und den AGB beschriebenen Grundsätzen.
4. Die Liste der Unterauftragsverarbeiter (weiterer Auftragsverarbeiter) stellt der Anbieter dem Kunden im Rahmen des DPA sowie auf Anfrage zur Verfügung.

## § 13. Reklamationen

1. Reklamationen bezüglich des Dienstes können an die Adresse **contact@signature.cat** gerichtet werden.
2. Die Meldung sollte enthalten: die Workspace-Domain, eine Beschreibung des Problems, Datum und Uhrzeit des Auftretens sowie - nach Möglichkeit - die Anfrage-ID oder einen Screenshot der Fehlermeldung.
3. Der Anbieter bestätigt den Eingang der Reklamation innerhalb von 3 Arbeitstagen und bearbeitet sie innerhalb von **14 Tagen** nach Erhalt der vollständigen Meldung. Über das Ergebnis wird der Kunde an die E-Mail-Adresse informiert, von der die Meldung gesendet wurde, oder an eine andere angegebene Adresse.
4. Erfordert die Bearbeitung der Reklamation die Ergänzung von Informationen, läuft die Frist aus Abs. 3 ab dem Tag ihrer Bereitstellung.

## § 14. Änderungen der AGB und der Preisliste, Benachrichtigungen

1. Der Anbieter ist berechtigt, die AGB zu ändern, insbesondere im Falle: einer Änderung des Umfangs oder der Funktionsweise des Dienstes, einer Änderung der Rechtsvorschriften oder ihrer Auslegung, einer Änderung der Bedingungen externer Anbieter, aus Sicherheitsgründen sowie zur Vornahme redaktioneller Änderungen. Die Berechtigung zur Änderung der Preisliste regelt § 8 Abs. 10.
2. Änderungen treten unter Einhaltung der folgenden Vorlauffristen in Kraft, gerechnet ab dem Tag der Veröffentlichung der Benachrichtigung:
   1. **Änderungen der Preisliste** - mindestens **30 Tage**, mit Wirkung frühestens ab dem nächsten Abrechnungszeitraum (§ 8 Abs. 10);
   2. **funktionale Änderungen** (betreffend den Umfang oder die Funktionsweise des Dienstes oder die Rechte und Pflichten der Parteien) - mindestens **10 Tage**;
   3. **redaktionelle oder kosmetische Änderungen**, die die Rechte und Pflichten des Kunden nicht berühren - mindestens **7 Tage**;
   4. **Änderungen aufgrund zwingender Rechtsvorschriften oder behördlicher Entscheidungen** - **unverzüglich**, auch ohne Einhaltung der in Nr. 1-3 genannten Fristen, wenn eine sich aus der Vorschrift oder der Entscheidung ergebende Frist dies erfordert.
3. Benachrichtigungen über die in Abs. 2 Nr. 2-4 genannten Änderungen werden nach der Anmeldung in der Benutzeroberfläche der Anwendung angezeigt. Der Nutzer ist verpflichtet, sich regelmäßig anzumelden und die Benachrichtigungen zu prüfen. Die Nutzung der Anwendung nach dem Datum des Inkrafttretens der Änderung gilt als deren Annahme.
4. Hat sich kein Nutzer des Kunden innerhalb von 30 Tagen vor der Veröffentlichung der in Abs. 3 genannten Benachrichtigung bei der Plattform angemeldet, kann der Anbieter zusätzlich eine Benachrichtigung an die E-Mail-Adresse des Kunden senden; dieser Versand hat unterstützenden Charakter, ist nicht garantiert, und sein Ausbleiben berührt nicht die Wirksamkeit der in der Plattform veröffentlichten Benachrichtigung.
5. **Über Änderungen der Preisliste (Abs. 2 Nr. 1) informiert der Anbieter per E-Mail**, versandt von der Adresse **alerts@signature.cat** an die E-Mail-Adresse für Abrechnungszwecke, und in deren Ermangelung - an die E-Mail-Adresse des Workspace-Administrators. Die Benachrichtigung gilt mit ihrem Versand an die richtige Adresse als zugestellt. Der Anbieter haftet nicht für die Nichtzustellung oder die verspätete Zustellung der Nachricht aus Gründen, die auf Seiten des Kunden oder seines E-Mail-Anbieters liegen, insbesondere infolge: der Einstufung der Nachricht als Spam, ihrer Verschiebung in die Quarantäne, der Ablehnung auf Ebene des empfangenden Servers oder der in der Domain des Kunden konfigurierten Filterregeln. Zur Sicherstellung der Zustellbarkeit sollte der Kunde die Adresse alerts@signature.cat in die Liste vertrauenswürdiger Absender (Whitelist) in seiner Domain aufnehmen und eine aktuelle E-Mail-Adresse für Abrechnungszwecke pflegen; die Folgen der Unterlassung dieser Maßnahmen trägt der Kunde. Die in diesem Absatz festgelegten Zustellungsregeln gelten entsprechend für die übrigen in den AGB vorgesehenen E-Mail-Benachrichtigungen.
6. Ein Kunde, der die Änderungen nicht akzeptiert, kann den Vertrag vor dem Datum ihres Inkrafttretens ohne zusätzliche Kosten kündigen - durch Kündigung des Abonnements mit Wirkung zum Ende des laufenden Abrechnungszeitraums.
7. Der Anbieter führt ein Archiv der früheren Versionen der AGB und stellt es auf eine an contact@signature.cat gesendete Anfrage zur Verfügung.

## § 15. Vertragsbeendigung, Daten nach der Beendigung und Migration

1. Der Vertrag wird auf unbestimmte Zeit geschlossen, mit monatlichen Abrechnungszeiträumen.
2. **Der Kunde kann den Vertrag jederzeit beenden**, indem er das Abonnement kündigt (§ 8 Abs. 7), mit Wirkung zum Ende des laufenden Abrechnungszeitraums, ohne Vertragsstrafen und ohne Beendigungsgebühren. Die Kündigungsfrist überschreitet somit nicht einen monatlichen Abrechnungszeitraum.
3. Der Anbieter kann den Vertrag mit einer Kündigungsfrist von 30 Tagen kündigen, jedoch nicht früher als zum Ende des bezahlten Abrechnungszeitraums, insbesondere im Falle der Einstellung des Dienstes. Im Falle eines gravierenden Verstoßes des Kunden gegen die AGB kann der Anbieter den Vertrag mit sofortiger Wirkung kündigen, nach vorheriger Anwendung von § 10 Abs. 6, es sei denn, der Charakter des Verstoßes macht dies unmöglich.
4. Nach dem Erlöschen des Abonnements wird der Zugriff auf die Funktionen der Plattform gesperrt, und die Kontodaten werden gemäß der Datenschutzerklärung gespeichert - bis zu ihrer Löschung auf Verlangen des Kunden oder bis zum Ablauf der dort genannten Fristen. Zuvor in den Postfächern der Nutzer des Kunden bereitgestellte Signaturen bleiben unverändert (der Dienst löscht sie nicht).
5. **Die Löschung des Kontos** ist im Self-Service in den Einstellungen der Plattform für einen Nutzer mit Administratorrechten verfügbar und erfordert eine Bestätigung durch die Eingabe der Workspace-Domain. Mit der Stellung des Antrags wird das Abonnement mit sofortiger Wirkung storniert, und nach Ablauf von **7 Tagen** werden die Kontodaten dauerhaft gelöscht (einschließlich der Vorlagen, Zuweisungen, Bilder, Nutzerkonten sowie der dedizierten Cloud-Ressourcen des Kunden), vorbehaltlich der Daten, deren längere Speicherung die Datenschutzerklärung oder Rechtsvorschriften vorsehen.
6. **Datenexport:** Auf einen an die Adresse contact@signature.cat gerichteten Antrag stellt der Anbieter dem Kunden einen Export der Kontodaten (insbesondere der Signaturvorlagen und der Zuweisungskonfiguration) in einem allgemein gebräuchlichen, offenen, maschinenlesbaren Format (JSON oder CSV) zur Verfügung - während der Laufzeit des Vertrags sowie innerhalb von **30 Tagen** nach dessen Beendigung, sofern die Daten nicht zuvor auf Verlangen des Kunden dauerhaft gelöscht wurden. Der Export ist kostenlos.
7. Der Anbieter erhebt keine Gebühren für den Anbieterwechsel und schafft keine technischen Hindernisse für die Migration der Daten zu einem anderen Anbieter oder in die eigene Infrastruktur des Kunden.
8. Nach der Beendigung des Vertrags sollte der Kunde den DWD-Autorisierungseintrag in der Google-Admin-Konsole selbständig entfernen - der Anbieter hat keine technische Möglichkeit, dies für den Kunden zu tun.

## § 16. Schlussbestimmungen

1. Auf den Vertrag findet **polnisches Recht** Anwendung.
2. Zuständig für Streitigkeiten aus dem Vertrag ist das ordentliche Gericht, das örtlich für den Sitz des Anbieters zuständig ist. Der vorstehende Satz berührt nicht die zwingenden Vorschriften über die gerichtliche Zuständigkeit.
3. Sollten sich einzelne Bestimmungen der AGB als unwirksam oder undurchsetzbar erweisen, bleiben die übrigen Bestimmungen in Kraft, und an die Stelle der unwirksamen Bestimmung tritt eine wirksame Bestimmung, die ihrem wirtschaftlichen Zweck am nächsten kommt.
4. Diese Fassung (1.1) der AGB tritt am **17.07.2026** in Kraft; die Fassung 1.0 galt ab dem 16.07.2026.

---

SystemAdmin Tomasz Piasecki, ul. Aleje Jerozolimskie 190, 02-486 Warszawa, NIP 1231455439
contact@signature.cat
