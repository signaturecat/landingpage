---
title: Bilder von der eigenen Domain ausliefern
navTitle: Eigene Bilddomain
description: Verbinden Sie eine Subdomain wie images.yourcompany.com mit einem einzigen CNAME-Eintrag mit SignatureCat, damit Signaturbilder in Gmail von Ihrer eigenen Domain geladen werden.
updated: 2026-08-02
---

# Bilder von der eigenen Domain ausliefern

Standardmäßig werden Logos und Banner in Ihren Signaturen von `images.signature.cat` ausgeliefert. Sie können sie stattdessen von einer Subdomain Ihrer eigenen Domain ausliefern - zum Beispiel `images.yourcompany.com`. Mail-Clients laden Bilder von der Domain des Absenders bereitwilliger, was die Zustellbarkeit verbessert, und die URLs tragen Ihre Marke.

Die Einrichtung macht nichts kaputt: Bis die Domain aktiv ist, werden Bilder weiterhin von `images.signature.cat` geladen, und nach der Aktivierung erfolgt der Wechsel für neu gerenderte Signaturen automatisch. Vorlagen bleiben unverändert.

## Voraussetzungen

- Die Zugriffsstufe **Admin** in SignatureCat.
- Zugriff auf die DNS-Einstellungen Ihrer Domain.
- Eine **Subdomain** (wie `images.yourcompany.com`). Apex-Domains (`yourcompany.com`) werden bewusst nicht unterstützt.

## Einrichtung

1. Öffnen Sie die Bildbibliothek aus einem beliebigen Vorlagen-Editor auf [Signaturen](https://app.signature.cat/signatures) (Button Logo oder Banner) und wählen Sie in der Auslieferungsleiste **Eigene Domain verwenden**.
2. **Geben Sie eine Subdomain ein** - zum Beispiel `images.yourcompany.com` - und klicken Sie auf **DNS-Eintrag erzeugen**.
3. **Fügen Sie einen DNS-Eintrag** bei Ihrem DNS-Anbieter hinzu, exakt wie angezeigt: einen **CNAME**, der Ihre Subdomain auf `cdn.signature.cat` zeigen lässt. Dieser eine Eintrag ist alles, was SignatureCat braucht. Manche Anbieter wollen im Feld Name nur den Teil vor Ihrer Domain, und der Assistent gibt Ihnen diese Kurzform aus.
4. **Warten Sie auf die Verifizierung.** SignatureCat prüft den Eintrag automatisch alle paar Minuten; Sie können auch auf **Jetzt prüfen** klicken. Die Aktivierung dauert in der Regel wenige Minuten, manchmal bis zu einer Stunde, während DNS aktualisiert wird. Das TLS-Zertifikat wird für Sie ausgestellt.

Der Assistent zeigt einen von drei Status: **Wartet auf DNS-Einträge**, **Domain aktiv** oder **Verifizierung fehlgeschlagen**.

Sobald aktiv: "Neue E-Mails laden Bilder von Ihrer Domain. Vorlagen bleiben unverändert - der Wechsel erfolgt automatisch."

> [!NOTE]
> Bereits gesendete E-Mails sind nicht betroffen - sie laden Bilder weiterhin von der URL, mit der sie gerendert wurden.

### Verifizierung klappt nicht?

Bleibt die Domain nach einer Prüfung ausstehend oder schlägt die Verifizierung fehl, blendet der Assistent unter der Überschrift **Verifizierung klappt nicht?** einen **TXT**-Eintrag ein. Er ist ein Rückfallweg für zwei seltene Fälle: Ein CAA-Eintrag auf Ihrer Domain blockiert die Zertifizierungsstelle, die SignatureCat verwendet, oder der Hostname wird bereits über eine andere Cloudflare-Zone geleitet. Fügen Sie den TXT-Eintrag zusätzlich zum CNAME hinzu und klicken Sie erneut auf **Jetzt prüfen**. In jedem anderen Fall genügt der CNAME allein.

## Die Domain entfernen

Das Entfernen der Domain im Assistenten stellt die Bildauslieferung für neue E-Mails automatisch auf `images.signature.cat` zurück. Nichts geht kaputt.

> [!WARNING]
> Löschen Sie den CNAME-Eintrag bei Ihrem DNS-Anbieter, **während die Domain in SignatureCat noch aktiv ist**, lädt jedes Bild, das bereits über diese Subdomain ausgeliefert wurde, nicht mehr - auch Bilder in E-Mails, die früher gesendet wurden. Entfernen Sie die Domain immer zuerst in SignatureCat und räumen Sie dann DNS auf.

Aktive Domains werden automatisch erneut geprüft, ein verschwundener CNAME fällt also innerhalb von etwa einem Tag auf: Die Domain verlässt den aktiven Zustand, und neu gerenderte Signaturen fallen von selbst auf `images.signature.cat` zurück. Das ist ein Sicherheitsnetz für künftige Signaturen, keine Reparatur für die, die bereits in den Postfächern der Empfänger liegen - daher die obige Reihenfolge.
