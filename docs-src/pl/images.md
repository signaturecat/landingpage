---
title: Obrazki
navTitle: Obrazki
description: Referencja obrazków w podpisach e-mail SignatureCat dla Google Workspace - biblioteka, opisy ALT, hosting, formaty, limity i usuwanie.
updated: 2026-08-02
---

# Obrazki

Obrazki w podpisach - logo firmy, banery kampanii i zdjęcia profilowe - pochodzą w SignatureCat z trzech źródeł: wbudowanej **biblioteki obrazków**, **zewnętrznych adresów URL**, które hostujesz samodzielnie, oraz **zdjęć profilowych** z Google Directory. Ta strona to referencja; praktyczny przewodnik to [Banery i logo](/docs/banners-and-logos).

## Biblioteka obrazków

Każdy workspace ma jedną bibliotekę z dwoma rodzajami wpisów:

| Rodzaj | Rozmiar renderowania | Token | Limit biblioteki |
|---|---|---|---|
| Logo | 115x115 px | `{{logo}}` | 200 wpisów |
| Baner | 450x100 px, max-width 100% | `{{banner}}` | 200 wpisów |

Wpisy w bibliotece mają opcjonalną nazwę, opcjonalny **link po kliknięciu** i opcjonalny **Opis obrazka (ALT)**. Każdy szablon wybiera z biblioteki własne logo i baner; szablony bez wyboru renderują neutralny placeholder. Wgrywane pliki to PNG lub JPG, do 5 MB (zalecane 200 KB); SVG nie jest przyjmowane.

## Opis obrazka (ALT)

**Opis obrazka (ALT)** to treść, którą odbiorca widzi zamiast obrazka, gdy jego klient poczty blokuje obrazki, oraz to, co odczytuje czytnik ekranu. Jest opcjonalny i ograniczony do 300 znaków.

- **Gdzie go ustawiasz:** w formularzu dodawania, gdy wgrywasz plik albo wklejasz link, w kroku obrazka w kreatorze nowego szablonu, a później w panelu **Szczegóły wybranego obrazka** w bibliotece.
- **Czego dotyczy:** każdego wpisu biblioteki, niezależnie od tego, czy plik hostuje SignatureCat, czy linkujesz do własnego.
- **Dokąd podróżuje:** razem z wpisem biblioteki, dokładnie tak jak link po kliknięciu - zmieniasz go raz, a każdy szablon używający tego obrazka wysyła nowy opis przy następnym renderowaniu.
- **Jeśli zostawisz go pustym:** obrazek renderuje się jako dekoracyjny i nie dostaje żadnego opisu.

## Skąd serwowane są obrazki

- **Pliki wgrane do biblioteki** są przechowywane przez SignatureCat i serwowane z `https://images.signature.cat/...` przez CDN z długotrwałym cache'owaniem.
- Ze zweryfikowaną [własną domeną obrazków](/docs/custom-image-domain) nowo renderowane podpisy serwują obrazki z biblioteki z Twojej subdomeny (na przykład `images.yourcompany.com`) - lepsza dostarczalność, ten sam magazyn.
- **Obrazki z zewnętrznych adresów URL** ("Mam link") są linkowane bezpośrednio stamtąd, gdzie je hostujesz. Muszą być publiczne i dostępne po HTTPS; najlepiej hostuj je na własnej domenie.

> [!IMPORTANT]
> Adresy URL obrazków są zapisywane na stałe w każdym wyrenderowanym podpisie, więc e-maile, które są już w skrzynkach odbiorców, wciąż pobierają adres, z którym zostały wysłane: usunięcie wpisu biblioteki hostowanego przez SignatureCat zwalnia przechowywany plik, a obrazek z czasem przestaje się ładować w dostarczonej już poczcie.

## Zdjęcia profilowe

Zmienna `{{photo}}` używa zdjęcia profilowego Google użytkownika z Directory (automatycznie skalowanego do 400 px). Nie jest częścią biblioteki - zdjęciami profilowymi użytkownicy i administratorzy zarządzają w Google Workspace. Zobacz [Zmienne szablonów](/docs/template-variables#zmienne-osobowe-google-directory).

## Cykl życia

- **Podmiana obrazka:** wgraj nowy plik, wybierz go w każdym szablonie, który używał starego, i dopiero gdy masz pewność, usuń stary wpis - albo zachowaj ten sam wpis biblioteki i zaktualizuj tylko jego link po kliknięciu lub opis ALT, co każdy szablon podchwytuje przy następnym renderowaniu.
- **Usunięcie wpisu biblioteki** odłącza go od szablonów, które go używają (wracają do placeholdera), po ostrzeżeniu z liczbą użyć. Te podpisy w międzyczasie nadal są stosowane.
- **Usunięcie używanego obrazka powiadamia workspace:** w dzwonku pojawia się powiadomienie w aplikacji, a do administratorów i właściciela idzie e-mail wymieniający dotknięte szablony. Zobacz [Powiadomienia](/docs/notifications).
- **Hostowane pliki są zwalniane:** gdy wpis biblioteki zniknie, SignatureCat sprząta przechowywany plik przy najbliższym dziennym przebiegu, więc obrazek przestaje się ładować także w dostarczonych już e-mailach. Usunięcie jest trwałe i nie da się go cofnąć samodzielnie.
- **Usunięcie nie dotyczy obrazków zewnętrznych.** To Ty hostujesz plik, więc usunięcie wpisu biblioteki usuwa tylko wpis - stare e-maile ładują obrazek, dopóki sam nie zdejmiesz go z serwera.

## Wskazówki dostarczalności

- Utrzymuj małe pliki (banery poniżej 200 KB) - duże obrazki spowalniają renderowanie i pogarszają ocenę spamową.
- Serwuj obrazki z własnej domeny dzięki [własnej domenie obrazków](/docs/custom-image-domain) - klienci poczty bardziej ufają domenie nadawcy.
- Gmail proxuje obrazki dla odbiorców, więc egzotyczne konfiguracje hostingu (allowlisty IP, sprawdzanie nagłówka referer) zepsują renderowanie. Trzymaj obrazki po prostu publiczne.
