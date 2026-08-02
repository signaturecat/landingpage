---
title: Serwuj obrazki z własnej domeny
navTitle: Własna domena obrazków
description: Skieruj subdomenę taką jak images.yourcompany.com na SignatureCat jednym rekordem CNAME, aby obrazki w podpisach w Gmailu ładowały się z Twojej domeny.
updated: 2026-08-02
---

# Serwuj obrazki z własnej domeny

Domyślnie logo i banery w Twoich podpisach są serwowane z `images.signature.cat`. Możesz zamiast tego serwować je z subdomeny własnej domeny - na przykład `images.yourcompany.com`. Klienci poczty chętniej pobierają obrazki z domeny nadawcy, więc rośnie dostarczalność, a adresy URL niosą Twoją markę.

Konfiguracja niczego nie psuje: dopóki domena nie jest aktywna, obrazki wciąż ładują się z `images.signature.cat`, a po aktywacji przełączenie następuje automatycznie dla nowo renderowanych podpisów. Szablony pozostają bez zmian.

## Wymagania

- Poziom dostępu **Admin** w SignatureCat.
- Dostęp do ustawień DNS Twojej domeny.
- **Subdomena** (jak `images.yourcompany.com`). Domeny główne (`yourcompany.com`) celowo nie są obsługiwane.

## Konfiguracja

1. Otwórz bibliotekę obrazków z edytora dowolnego szablonu na stronie [Podpisy](https://app.signature.cat/signatures) (przycisk Logo lub Baner) i wybierz **Użyj własnej domeny** w pasku serwowania.
2. **Podaj subdomenę** - na przykład `images.yourcompany.com` - i kliknij **Wygeneruj rekord DNS**.
3. **Dodaj jeden rekord DNS** u swojego dostawcy DNS, dokładnie tak, jak pokazano: rekord **CNAME** wskazujący subdomenę na `cdn.signature.cat`. Ten jeden rekord to wszystko, czego potrzebuje SignatureCat. Część dostawców oczekuje w polu Nazwa tylko fragmentu przed Twoją domeną - kreator wypisuje dla Ciebie tę skróconą formę.
4. **Poczekaj na weryfikację.** SignatureCat sprawdza rekord automatycznie co kilka minut; możesz też kliknąć **Sprawdź teraz**. Aktywacja zwykle trwa kilka minut, czasem do godziny, póki DNS się odświeża. Certyfikat TLS jest wystawiany za Ciebie.

Kreator pokazuje jeden z trzech statusów: **Oczekuje na rekordy DNS**, **Domena aktywna** lub **Weryfikacja nieudana**.

Po aktywacji: "Nowe maile pobierają obrazki z Twojej domeny. Szablony zostają bez zmian - podmiana dzieje się automatycznie."

> [!NOTE]
> Wysłane już e-maile nie są objęte zmianą - nadal ładują obrazki z adresu, z którym zostały wyrenderowane.

### Weryfikacja nie przechodzi?

Jeśli po sprawdzeniu domena wciąż czeka albo weryfikacja się nie powiodła, kreator odsłania rekord **TXT** pod nagłówkiem **Weryfikacja nie przechodzi?**. To rezerwowa ścieżka dla dwóch rzadkich przypadków: rekord CAA na Twojej domenie blokuje centrum certyfikacji, z którego korzysta SignatureCat, albo ta nazwa hosta jest już proxowana przez inną strefę Cloudflare. Dodaj rekord TXT obok CNAME, a potem kliknij ponownie **Sprawdź teraz**. W każdym innym przypadku sam CNAME wystarcza.

## Usuwanie domeny

Usunięcie domeny w kreatorze automatycznie przełącza serwowanie obrazków z powrotem na `images.signature.cat` dla nowych maili. Nic się nie psuje.

> [!WARNING]
> Jeśli usuniesz rekord CNAME u dostawcy DNS, **póki domena jest wciąż aktywna w SignatureCat**, każdy obrazek serwowany już z tej subdomeny przestanie się ładować - łącznie z obrazkami w e-mailach wysłanych wcześniej. Zawsze najpierw usuń domenę w SignatureCat, a dopiero potem posprzątaj DNS.

Aktywne domeny są sprawdzane ponownie automatycznie, więc zniknięcie rekordu CNAME zostaje zauważone w mniej więcej dobę: domena wypada ze stanu aktywnego, a nowo renderowane podpisy same wracają do `images.signature.cat`. To zabezpieczenie dla przyszłych podpisów, a nie naprawa tych, które są już w skrzynkach odbiorców - stąd kolejność powyżej.
