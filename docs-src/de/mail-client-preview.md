---
title: E-Mail-Client-Vorschau
navTitle: E-Mail-Client-Vorschau
description: Sehen Sie eine Gmail-Signatur auf simulierten Flächen von Gmail, Outlook und Apple Mail in Hell und Dunkel - was die SignatureCat-Vorschau zeigt und was nicht.
updated: 2026-08-02
---

# E-Mail-Client-Vorschau

Die Vorschau neben dem Editor zeichnet Ihre Signatur auf die simulierte Fläche eines E-Mail-Clients: Ihr HTML, unverändert, auf dem Seitenhintergrund dieses Clients, in seiner Standardschrift, mit der einen Farbänderung, die dieser Client im Dunkelmodus vornimmt. Das ist eine Annäherung, nicht die Rendering-Engine des Clients selbst.

Die App sagt das selbst, hinter dem Info-Symbol am Ende der Client-Reihe ("Was diese Vorschau zeigt und was nicht"):

> Annäherung: das Signatur-HTML bleibt unverändert, nur die Fläche und die Art, wie dieser Client Farben im Dunkelmodus neu einfärbt. Kein Rendering durch die Engine des Clients.

Nutzen Sie die Simulation, um Farb- und Layoutfehler früh zu finden. Für die Antwort, die zählt, nutzen Sie **Mir eine Testsignatur setzen** und Ihr eigenes Postfach.

## Was ein Client-Profil verändert

Ein Profil verändert vier Dinge rund um Ihre Signatur und nichts in ihr:

- den Seitenhintergrund hinter der Nachricht,
- die Standard-Textfarbe,
- die Standard-Linkfarbe,
- die Standardschrift und -größe des Clients.

Alles, was Ihre Vorlage ausdrücklich setzt - Schriften, Farben, Tabellenbreiten, Bildgrößen -, wird unverändert durchgereicht. Genau deshalb ist die Standardschrift wichtig: Eine Signatur, die kein `font-family` setzt, erbt die Standardschrift des Clients beim Empfänger, und jedes Profil zeigt Ihnen, welche das wäre.

Die Pillen-Buttons über dem Rahmen ("Simulierter E-Mail-Client") wechseln das Profil, daneben liegt ein Umschalter **Hell** / **Dunkel**. Die Vorschau öffnet mit **Gmail (web)** in **Hell** - der Fläche, die die Signatur so zeigt, wie sie gestaltet wurde - und merkt sich Client und Modus für Ihren nächsten Besuch. Der Rahmen läuft in einer Sandbox: Darin werden keine Skripte ausgeführt, und Links in der Signatur öffnen in einem neuen Tab.

## Die fünf Client-Profile

| Profil | Was es simuliert | Warum es da ist |
|---|---|---|
| **Gmail (web)** | Gmail im Browser: weiße Seite, Arial, nur Hell | Die Ansicht wie gestaltet, und das Profil, mit dem die Vorschau öffnet |
| **Gmail (app)** | Gmail auf dem Telefon: Roboto, vollständige Invertierung im Dunkelmodus | Der häufigste vollständig invertierende Client |
| **Outlook (classic, Windows)** | Die Word-Rendering-Engine: ein Aptos/Calibri-Stack in 11 pt, dazu Geometrieregeln und eine erzwungene Invertierung im Dunkelmodus | Das einzige Profil, das auch eine andere Layout-Engine annähert |
| **Outlook.com** | Outlook im Web: Segoe UI und ein Dunkelmodus, der die ausdrücklich gesetzten Farben behält | Der Fall der teilweisen Invertierung, bei dem sich nur manche Farben ändern |
| **Apple Mail** | Apple Mail auf macOS und iOS: die Systemschrift, vollständige Invertierung im Dunkelmodus | Der zweite vollständig invertierende Client, mit anderen Standardwerten |

Vier der fünf bieten Hell und Dunkel, insgesamt gibt es also neun Kombinationen aus Client und Modus. Die Markennamen bleiben in jeder Sprachversion der App bewusst unübersetzt.

## Hell und Dunkel

Jedes Profil wendet die eine Farbtransformation an, die der jeweilige Client im Dunkelmodus tatsächlich vornimmt - und die fünf sind nicht dieselbe Transformation.

| Profil | Dunkelmodus |
|---|---|
| Gmail (web) | Nicht angeboten. Die Weboberfläche von Gmail verdunkelt die Umgebung der Nachricht, nie die Nachricht selbst. |
| Gmail (app) | Vollständige Invertierung, außer die Signatur bringt einen eigenen Hintergrund mit. |
| Apple Mail | Vollständige Invertierung, außer die Signatur bringt einen eigenen Hintergrund mit. |
| Outlook (classic, Windows) | Invertiert immer, auch eine Signatur mit eigenem Hintergrund, weil Word ohnehin neu einfärbt. |
| Outlook.com | Teilweise: eine dunkle Fläche mit hellerem Standardtext und helleren Links, während jede in der Signatur ausdrücklich gesetzte Farbe unangetastet bleibt. |

Die Hälfte **Dunkel** des Umschalters ist bei **Gmail (web)** deaktiviert, mit der Begründung direkt am Bedienelement: "Gmail (web) verdunkelt die eigene Oberfläche, aber nie die Farben innerhalb einer Nachricht."

### Signaturen mit eigenem Hintergrund

Hat Ihre Signatur einen eigenen deckenden Hintergrund, lassen die invertierenden Profile ihre Farben unberührt - und die Vorschau sagt das auch: "Diese Signatur hat einen eigenen Hintergrund, daher lässt ein invertierender Client ihre Farben unberührt." Ein echter automatisch invertierender Client lässt solche Inhalte in Ruhe, also tut es die Simulation ebenfalls.

Weiß, `transparent` und vollständig transparente `rgba()`-Werte zählen hier nicht als Hintergrund. **Outlook (classic, Windows)** ist die Ausnahme: Es invertiert trotzdem, weshalb dunkle Marketing-Mails dort hell herauskommen.

### Farben wählen, die beide Modi überstehen

Lassen Sie Ihre Kontaktzeilen ohne ausdrückliche Farbe und vererben Sie sie stattdessen. Ein Client mit erzwungenem Dunkelmodus hellt geerbten Text auf, sodass die Zeilen lesbar bleiben; ein auf jeder Zeile fest eingetragenes Dunkelgrau sieht auf Weiß richtig aus und verschwindet auf der dunklen Fläche von Outlook.com fast, wo ausdrücklich gesetzte Farben unverändert bleiben. Die Vorschau benennt auch diesen Fall: "Outlook.com behält Farben, die der Autor ausdrücklich gesetzt hat, und hellt nur Text ohne eigene Farbe auf - eine fest eingetragene dunkle Farbe bleibt hier dunkel."

Die mitgelieferten Starter sind so geschrieben: Name und Position tragen eine Farbe, die Kontaktzeilen keine, und die Links verwenden ein Grau mit genügend Kontrast auf einer weißen Seite und auf einer dunklen Fläche.

## Outlook (classic, Windows) rendert mit Word

Das klassische Outlook unter Windows nutzt keine Browser-Engine - es zeichnet Mails mit Word, und dieses Profil nähert diese Geometrie in **beiden** Modi an, Hell und Dunkel. In diesem Profil gilt:

- runde Ecken werden entfernt, ein rundes Foto erscheint also quadratisch,
- `display` wird nur als `display:none` beachtet, ein als Block gestyltes span verhält sich also nicht mehr wie eines,
- Außenabstände an `<span>` entfallen,
- Innenabstände wirken nur in Tabellenzellen (`td` und `th`),
- `white-space`, `float`, `box-shadow`, `text-shadow`, `opacity`, `transform` und Hintergrundbilder werden ignoriert,
- `max-width` gilt nur für Tabellen.

Deshalb bauen die mitgelieferten Starter jede Zeile als `<div>` mit ausdrücklichen Außenabständen, setzen Zwischenräume als Innenabstand auf Tabellenzellen und legen Bildgrößen über die Attribute `width` und `height` statt über CSS fest.

> [!NOTE]
> Ein rundes Profilfoto kann nicht überall gleich aussehen: Die Word-Engine unterstützt keine runden Ecken, deshalb ist `{{photo}}` in Gmail und Apple Mail ein Kreis und im klassischen Outlook ein Quadrat. Die Vorschau bildet diesen Unterschied ab, statt ihn zu verstecken.

Eines sollten Sie wissen, bevor Sie den Tab wechseln: Öffnen Sie auf Outlook abgestimmtes HTML im [visuellen Editor](/docs/visual-editor) und speichern es dort, wird das Markup neu serialisiert, und ein Teil dessen geht verloren, was die Gleichwertigkeit mit dem klassischen Outlook ausmacht - Blockaußenabstände, ausdrückliche Zeilenhöhen und Zellinnenabstände. Wenn Sie diese Gleichwertigkeit brauchen, bearbeiten Sie die Vorlage weiter im Tab **HTML**.

## Was die Simulation nicht nachbildet

Die Simulation endet an der Oberfläche. Sie tut Folgendes nicht:

- die Rendering-Engine des Clients ausführen - nichts, was Sie sehen, ist echte Ausgabe von Gmail oder Outlook;
- das Tabellen-Auto-Layout des klassischen Outlook oder dessen 120-DPI-Skalierung nachbilden;
- exakte Herstellerfarben behaupten - die Flächen sind repräsentative Annäherungen, weil kein Hersteller die echten Werte veröffentlicht;
- zeigen, was Gmail nach dem Speichern ablegt. Gmail führt auf seinen Servern eine eigene Bereinigung aus, sodass eine Signatur nach einem erfolgreichen Schreibvorgang gekürzt sein kann - siehe [Wenn Gmail Ihre Signatur kürzt](/docs/gmail-sanitization).

## Rendern als

Das Feld **Rendern als:** rendert die Vorlage anhand des Google-Directory-Datensatzes einer echten Person, sodass Sie die Fälle prüfen können, die Ihr eigener Datensatz nicht hergibt: eine lange Position, eine fehlende Telefonnummer, eine leere Abteilung.

- Bleibt das Feld leer, rendert die Vorschau anhand Ihres eigenen Directory-Datensatzes.
- Ab zwei Zeichen erscheinen Vorschläge aus Ihrem Workspace-Verzeichnis, jeweils mit Name, Adresse und Directory-Foto. Höchstens zehn Treffer, gesperrte Nutzer ausgenommen.
- Das Feld nimmt auch freien Text an, Sie können also jede beliebige Adresse eintippen - einen Alias oder jemanden, den die Suche nicht liefert. Die Vorschau lädt neu, sobald das Eingetippte eine vollständige Adresse ist. Passt nichts: "Keine passenden Personen. Sie können auch jede Adresse eintippen."
- **Leeren und als ich rendern** stellt wieder auf Sie um.

Das Rendern als jemand anderes erfordert die Zugriffsstufe Designer, Editor oder Admin. Self-Service-Nutzer erhalten dieselbe Vorschau, fest auf ihren eigenen Datensatz gesetzt. Siehe [Benutzerverwaltung](/docs/user-management).

Die Zeile direkt unter der Vorschau nennt immer den verwendeten Datensatz: "Gerendert anhand der Directory-Daten von {email}."

Werte lösen sich genau so auf wie bei einer echten Anwendung: der Google-Directory-Datensatz, überlagert von den Werten pro Nutzer, die auf dem Tab Daten gespeichert sind. Die vollständige Feldliste und die Herkunft jedes einzelnen Feldes stehen in [Vorlagenvariablen](/docs/template-variables). Verwendet die Vorlage `{{banner}}` oder `{{logo}}`, erinnert Sie eine zweite Zeile unter der Vorschau daran, dass diese Token mit den für diese Vorlage gewählten Bildern gerendert werden - siehe [Banner und Logos](/docs/banners-and-logos).

Lässt sich ein Ziel nicht rendern, ist die Meldung konkret:

| Meldung | Was passiert ist |
|---|---|
| "Kein Workspace-Nutzer für {email} gefunden. Adresse prüfen und erneut versuchen." | Die Adresse steht nicht in Ihrem Google Directory. |
| "Diese E-Mail-Adresse oder Domain ist ungültig. Bitte prüfen und erneut versuchen." | Die Adresse oder ihre Domain ist fehlerhaft. |
| "Zu viele Vorschau-Aktualisierungen. Kurze Pause, dann wird automatisch aktualisiert." | Zu viele Aktualisierungen in kurzer Zeit. Die Vorschau läuft von selbst weiter. |
| "Schließe die Einrichtung der domänenweiten Delegierung ab, um Signaturen anzuzeigen." | Die Vorschau liest das Verzeichnis und braucht daher eine verifizierte Delegierung. Siehe [Domain-Wide Delegation](/docs/domain-wide-delegation). |

## Die einzige 100-Prozent-Prüfung

Ihr eigenes Postfach ist die einzige getreue Prüfung. Klicken Sie im Editor auf **Mir eine Testsignatur setzen**: SignatureCat rendert die Vorlage anhand Ihres eigenen Directory-Datensatzes und schreibt sie in Ihre eigene Gmail-Signatur, sodass niemand sonst betroffen ist. Öffnen Sie dann Gmail und sehen Sie sich das Ergebnis an.

Diese Prüfung beantwortet eine andere Frage als die Vorschau. Die Vorschau zeigt, wie ein Client Ihr HTML zeichnen würde; das Postfach zeigt, was Gmail tatsächlich gespeichert hat, und Gmail schreibt Signaturen beim Speichern auf den eigenen Servern um. Sieht das Ergebnis abgeschnitten aus, lesen Sie [Wenn Gmail Ihre Signatur kürzt](/docs/gmail-sanitization).

## Wo die Vorschau erscheint

Die Client-Simulation gibt es an den beiden Stellen, an denen Signaturen gestaltet werden:

- **Der Vorlagen-Editor** auf [Signaturen](https://app.signature.cat/signatures), für Designer, Editoren und Admins - mit den Client-Pillen, dem Umschalter für Hell und Dunkel, **Rendern als** und **Mir eine Testsignatur setzen**. Siehe [Vorlagen](/docs/templates).
- **[Meine Signatur](https://app.signature.cat/self-service)**, für Self-Service-Nutzer - dieselben Pillen und derselbe Umschalter, immer gerendert anhand des eigenen Datensatzes des angemeldeten Nutzers ("Gerendert anhand Ihres eigenen Directory-Datensatzes."). Einen Button für die Test-Anwendung gibt es dort nicht, daher nennt der Hinweis den anderen Weg zur Gewissheit: "Für volle Treue speichern Sie und sehen sich die Signatur in Ihrem eigenen Postfach an." Siehe [Self-Service-Signaturen](/docs/self-service).
