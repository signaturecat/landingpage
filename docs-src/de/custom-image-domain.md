---
title: Bilder von der eigenen Domain ausliefern
navTitle: Eigene Bilddomain
description: Verbinden Sie eine Subdomain wie images.yourcompany.com über zwei DNS-Einträge mit SignatureCat, damit Signaturbilder von Ihrer eigenen Domain geladen werden.
updated: 2026-07-17
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
3. **Fügen Sie zwei DNS-Einträge** bei Ihrem DNS-Anbieter hinzu, exakt wie angezeigt:
   - einen **CNAME**-Eintrag, der die Subdomain auf `cdn.signature.cat` zeigen lässt (leitet die Subdomain zu uns),
   - einen **TXT**-Eintrag, der den Domainbesitz nachweist.
4. **Warten Sie auf die Verifizierung.** SignatureCat prüft die Einträge automatisch alle paar Minuten; Sie können auch auf **Jetzt prüfen** klicken. Die Aktivierung dauert in der Regel wenige Minuten, manchmal bis zu einer Stunde, während DNS aktualisiert wird. Das TLS-Zertifikat wird für Sie ausgestellt.

Der Assistent zeigt einen von drei Status: **Wartet auf DNS-Einträge**, **Domain aktiv** oder **Verifizierung fehlgeschlagen**.

Sobald aktiv: "Neue E-Mails laden Bilder von Ihrer Domain. Vorlagen bleiben unverändert - der Wechsel erfolgt automatisch."

> [!NOTE]
> Bereits gesendete E-Mails sind nicht betroffen - sie laden Bilder weiterhin von der URL, mit der sie gerendert wurden.

## Die Domain entfernen

Das Entfernen der Domain im Assistenten stellt die Bildauslieferung für neue E-Mails automatisch auf `images.signature.cat` zurück. Nichts geht kaputt.

> [!WARNING]
> Der umgekehrte Weg wird nicht überwacht: Löschen Sie den CNAME-Eintrag bei Ihrem DNS-Anbieter, **während die Domain in SignatureCat noch aktiv ist**, laden Bilder in neu gesendeten Signaturen stillschweigend nicht mehr. Entfernen Sie die Domain immer zuerst in SignatureCat und räumen Sie dann DNS auf.
