---
title: Wgrywaj i wstawiaj banery oraz logo
navTitle: Banery i logo
description: Dodawaj logo firmy i banery kampanii do szablonów podpisów SignatureCat - biblioteka obrazków, limity wgrywania, linki po kliknięciu i placeholdery.
updated: 2026-07-17
---

# Wgrywaj i wstawiaj banery oraz logo

SignatureCat przechowuje dwa rodzaje obrazków firmowych w bibliotece per workspace: **logo** (renderowane 115x115 px) i **banery** (renderowane 450x100 px, pomniejszane na małych ekranach). Każdy szablon wybiera własne logo i baner, wstawiane tokenami `{{logo}}` i `{{banner}}`.

## Dodaj obrazek do biblioteki

1. Otwórz szablon w edytorze na stronie [Podpisy](https://app.signature.cat/signatures).
2. Kliknij **Logo** lub **Baner** w pasku narzędzi - każdy otwiera własną galerię (logo i banery nigdy się nie mieszają).
3. Wybierz **Dodaj do biblioteki**, a następnie:
   - **Mam link** - wklej publiczny adres HTTPS obrazka, który już hostujesz, albo
   - **Wgraj plik** - PNG lub JPG, zalecane do 200 KB (twardy limit 5 MB).
4. Opcjonalnie ustaw nazwę w bibliotece i link po kliknięciu („Po kliknięciu prowadzi do"), po czym zapisz. Obrazek zostaje dodany do biblioteki i wybrany dla tego szablonu.

> [!NOTE]
> Tylko PNG i JPG - pliki SVG nie są przyjmowane (słabe wsparcie klientów pocztowych i względy bezpieczeństwa). Biblioteka mieści do 200 obrazków każdego rodzaju.

## Wstaw do szablonu

Wskaż obrazek w galerii i kliknij **Użyj wybranego** - edytor może też wstawić za Ciebie token `{{logo}}` lub `{{banner}}` w miejscu kursora. Przy renderowaniu token staje się właściwym znacznikiem obrazka; jeśli obrazek ma link po kliknięciu, jest automatycznie opakowywany w link.

Jeśli szablon używa `{{banner}}` bez wybranego banera, zamiast niego renderuje się neutralny placeholder, a edytor podpowiada, żeby jakiś wybrać - podpis nigdy się nie psuje.

## Linki po kliknięciu

Link po kliknięciu podróżuje z **obrazkiem w bibliotece**, nie z szablonem: aktualizujesz link raz, a każdy szablon używający tego obrazka podchwytuje zmianę przy następnym renderowaniu. To wygodne przy rotacji banerów kampanii - podmieniasz adres docelowy bez dotykania szablonów.

## Zalecane wymiary

| Rodzaj | Rozmiar renderowania | Zalecenie |
|---|---|---|
| Logo | 115x115 px | Obrazek kwadratowy, najlepiej PNG z przezroczystością. |
| Baner | 450x100 px (max-width 100%) | Eksportuj w 900x200 px dla ostrego renderowania HiDPI, utrzymuj plik poniżej 200 KB. |

Duże obrazki spowalniają renderowanie wiadomości i mogą wpychać maile w obszar „wiadomości skróconej" w Gmail - utrzymuj małe pliki.

## Usuwanie obrazków

Usunięcie obrazka z biblioteki odłącza go od każdego szablonu, który go wybrał - te szablony wracają do placeholdera. Aplikacja najpierw ostrzega: „Ten obrazek jest używany w N stopkach. Po usunięciu przestanie się tam wyświetlać - w jego miejscu pojawi się placeholder."

> [!NOTE]
> Wysłane już e-maile zachowują swoje obrazki - usunięcie wpływa tylko na przyszłe renderowania.

## Skąd serwowane są obrazki

Obrazki z biblioteki są domyślnie hostowane pod `images.signature.cat`. Aby serwować je z własnej subdomeny (lepsza dostarczalność), zobacz [Serwuj obrazki z własnej domeny](/docs/custom-image-domain/). Obrazki z zewnętrznych adresów („Mam link") są zawsze pobierane stamtąd, gdzie je hostujesz - muszą pozostać publicznie dostępne przez HTTPS.
