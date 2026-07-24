---
title: Obrazki
navTitle: Obrazki
description: Referencja obrazków SignatureCat - biblioteka per workspace, hosting na images.signature.cat lub własnej domenie, formaty, limity i cykl życia.
updated: 2026-07-17
---

# Obrazki

Obrazki w podpisach - logo firmy, banery kampanii i zdjęcia profilowe - pochodzą w SignatureCat z trzech źródeł: wbudowanej **biblioteki obrazków**, **zewnętrznych adresów URL**, które hostujesz samodzielnie, oraz **zdjęć profilowych** z Google Directory. Ta strona to referencja; praktyczny przewodnik to [Banery i logo](/docs/banners-and-logos/).

## Biblioteka obrazków

Każdy workspace ma jedną bibliotekę z dwoma rodzajami wpisów:

| Rodzaj | Rozmiar renderowania | Token | Limit biblioteki |
|---|---|---|---|
| Logo | 115x115 px | `{{logo}}` | 200 wpisów |
| Baner | 450x100 px, max-width 100% | `{{banner}}` | 200 wpisów |

Wpisy w bibliotece mają opcjonalną nazwę i opcjonalny **link po kliknięciu**. Każdy szablon wybiera z biblioteki własne logo i baner; szablony bez wyboru renderują neutralny placeholder. Wgrywane pliki to PNG lub JPG, do 5 MB (zalecane 200 KB); SVG nie jest przyjmowane.

## Skąd serwowane są obrazki

- **Pliki wgrane do biblioteki** są przechowywane przez SignatureCat i serwowane z `https://images.signature.cat/...` przez CDN z długotrwałym cache'owaniem.
- Ze zweryfikowaną [własną domeną obrazków](/docs/custom-image-domain/) nowo renderowane podpisy serwują obrazki z biblioteki z Twojej subdomeny (na przykład `images.yourcompany.com`) - lepsza dostarczalność, ten sam magazyn.
- **Obrazki z zewnętrznych adresów URL** ("Mam link") są linkowane bezpośrednio stamtąd, gdzie je hostujesz. Muszą być publiczne i dostępne po HTTPS; najlepiej hostuj je na własnej domenie.

> [!IMPORTANT]
> Adresy URL obrazków są zapisywane na stałe w każdym wyrenderowanym podpisie. E-maile, które są już w skrzynkach odbiorców, wciąż pobierają adres, z którym zostały wysłane - dlatego SignatureCat nigdy nie usuwa plików źródłowych usuniętych wpisów biblioteki i dlatego zewnętrzny obrazek zdjęty z hostingu pokaże się jako uszkodzony w starych mailach.

## Zdjęcia profilowe

Zmienna `{{photo}}` używa zdjęcia profilowego Google użytkownika z Directory (automatycznie skalowanego do 400 px). Nie jest częścią biblioteki - zdjęciami profilowymi użytkownicy i administratorzy zarządzają w Google Workspace. Zobacz [Zmienne szablonów](/docs/template-variables/#person-variables-google-directory).

## Cykl życia

- **Podmiana obrazka:** dodaj nowy plik do biblioteki i wybierz go w szablonie - albo zachowaj ten sam wpis biblioteki i zaktualizuj tylko jego link po kliknięciu (podchwytywany przy następnym renderowaniu).
- **Usunięcie wpisu biblioteki** odłącza go od szablonów, które go używają (wracają do placeholdera), po ostrzeżeniu z liczbą użyć.
- **Wysłane już e-maile** nigdy nie są objęte zmianami w bibliotece.

## Wskazówki dostarczalności

- Utrzymuj małe pliki (banery poniżej 200 KB) - duże obrazki spowalniają renderowanie i pogarszają ocenę spamową.
- Serwuj obrazki z własnej domeny dzięki [własnej domenie obrazków](/docs/custom-image-domain/) - klienci poczty bardziej ufają domenie nadawcy.
- Gmail proxuje obrazki dla odbiorców, więc egzotyczne konfiguracje hostingu (allowlisty IP, sprawdzanie nagłówka referer) zepsują renderowanie. Trzymaj obrazki po prostu publiczne.
