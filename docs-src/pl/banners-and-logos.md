---
title: Wgrywaj i wstawiaj banery oraz logo
navTitle: Banery i logo
description: Dodawaj logo firmy i banery kampanii do szablonów podpisów Gmail w SignatureCat - biblioteka obrazków, opisy ALT, rozmiary, linki po kliknięciu i usuwanie.
updated: 2026-08-02
---

# Wgrywaj i wstawiaj banery oraz logo

SignatureCat przechowuje dwa rodzaje obrazków firmowych w bibliotece per workspace: **logo** (domyślnie 115x115 px) i **banery** (domyślnie 450x100 px, pomniejszane na małych ekranach). Każdy szablon wybiera własne logo i baner, wstawiane tokenami `{{logo}}` i `{{banner}}` - i może zmienić rozmiar każdego z nich na własne potrzeby [uchwytami zmiany rozmiaru edytora wizualnego](/docs/visual-editor#obrazki-logo-baner-i-zdjcie).

## Dodaj obrazek do biblioteki

1. Otwórz szablon w edytorze na stronie [Podpisy](https://app.signature.cat/signatures).
2. Kliknij **Logo** lub **Baner** w pasku narzędzi - każdy otwiera własną galerię (logo i banery nigdy się nie mieszają).
3. Wybierz **Dodaj do biblioteki**, a następnie:
   - **Mam link** - wklej publiczny adres HTTPS obrazka, który już hostujesz, albo
   - **Wgraj plik** - PNG lub JPG, zalecane do 200 KB (twardy limit 5 MB).
4. Opcjonalnie ustaw nazwę w bibliotece, link po kliknięciu ("Po kliknięciu prowadzi do") i **Opis obrazka (ALT)**, po czym zapisz. Obrazek zostaje dodany do biblioteki i wybrany dla tego szablonu.

Banerowi możesz też nadać **własny rozmiar wpisu w bibliotece** (checkbox z polami szerokości i wysokości, 24-600 x 24-400 px) - zarówno przy dodawaniu wpisu, jak i później w szczegółach wybranego wpisu. Ten rozmiar staje się domyślnym rozmiarem wpisu wszędzie tam, gdzie jest on używany; wyczyszczenie go przywraca 450x100.

> [!NOTE]
> Tylko PNG i JPG - pliki SVG nie są przyjmowane (słabe wsparcie klientów pocztowych i względy bezpieczeństwa). Biblioteka mieści do 200 obrazków każdego rodzaju.

## Wstaw do szablonu

Wskaż obrazek w galerii i kliknij **Użyj wybranego** - edytor może też wstawić za Ciebie token `{{logo}}` lub `{{banner}}` w miejscu kursora. Przy renderowaniu token staje się właściwym znacznikiem obrazka; jeśli obrazek ma link po kliknięciu, jest automatycznie opakowywany w link.

Jeśli szablon używa `{{banner}}` bez wybranego banera, zamiast niego renderuje się neutralny placeholder, a edytor podpowiada, żeby jakiś wybrać - podpis nigdy się nie psuje.

## Rozmiary obrazków: domyślny z biblioteki vs per szablon

O tym, jak duże renderuje się logo lub baner, decydują dwie warstwy, a wygrywa ta bardziej szczegółowa:

1. **Rozmiar per szablon** - ustawiany uchwytami zmiany rozmiaru w [edytorze wizualnym](/docs/visual-editor#obrazki-logo-baner-i-zdjcie) (baner 24-600 x 24-400 px, logo 24-300 px). Dotyczy tylko tego szablonu, więc zmiana rozmiaru banera w jednym szablonie nigdy nie zmienia pozostałych współdzielących ten sam obrazek.
2. **Rozmiar wpisu w bibliotece** (tylko banery) - własny domyślny rozmiar wpisu opisany wyżej.

Gdy nie ustawiono żadnego z nich, obowiązują wartości domyślne: logo 115x115, baner 450x100.

## Linki po kliknięciu

Link po kliknięciu podróżuje z **obrazkiem w bibliotece**, nie z szablonem: aktualizujesz link raz, a każdy szablon używający tego obrazka podchwytuje zmianę przy następnym renderowaniu. To wygodne przy rotacji banerów kampanii - podmieniasz adres docelowy bez dotykania szablonów.

Gdy jeden szablon ma się zachowywać inaczej, zaznacz chip obrazka w [edytorze wizualnym](/docs/visual-editor#obrazki-logo-baner-i-zdjcie) i użyj przycisku **Link**: zachowaj link z biblioteki, usuń link tylko dla tego szablonu albo skieruj go pod inny adres.

## Opis obrazka (ALT)

Każdy obrazek w bibliotece może nieść **Opis obrazka (ALT)**, do 300 znaków. Aplikacja mówi to wprost: "Ten opis zobaczy odbiorca, jeśli jego program pocztowy nie może wyświetlić obrazka." Wiele osób czyta pocztę z domyślnie zablokowanymi obrazkami, a czytniki ekranu odczytują opis zamiast obrazka, więc wpis logo opisany jako "logo Acme" wciąż mówi coś sensownego.

Ustaw go przy dodawaniu obrazka (zarówno **Mam link**, jak i **Wgraj plik**), w kroku obrazka w kreatorze nowego szablonu albo później w panelu **Szczegóły wybranego obrazka** w bibliotece. Podobnie jak link po kliknięciu, opis należy do wpisu biblioteki, więc każdy szablon używający tego obrazka wysyła ten sam - a obrazki hostowane przez Ciebie dostają to pole tak samo jak wgrane pliki. Zostaw je puste, a obrazek renderuje się jako dekoracyjny, bez żadnego opisu.

> [!TIP]
> Opisuj to, co obrazek mówi, a nie to, że jest obrazkiem: "logo Acme" albo "promocja wiosna 2026 - 20 procent taniej" jest lepsze niż "banner.png".

## Zalecane wymiary

| Rodzaj | Domyślny rozmiar renderowania | Zalecenie |
|---|---|---|
| Logo | 115x115 px (rozmiar zmienialny per szablon do 300 px) | Obrazek kwadratowy, najlepiej PNG z przezroczystością. |
| Baner | 450x100 px (własne rozmiary do 600x400 px; max-width 100%) | Eksportuj w dwukrotności rozmiaru wyświetlania dla ostrego renderowania HiDPI, utrzymuj plik poniżej 200 KB. |

Duże obrazki spowalniają renderowanie wiadomości i mogą wpychać maile w obszar "wiadomości skróconej" w Gmail - utrzymuj małe pliki.

## Usuwanie obrazków

Usunięcie obrazka z biblioteki odłącza go od każdego szablonu, który go wybrał - te szablony wracają do placeholdera i nadal są normalnie stosowane. Aplikacja najpierw ostrzega: "Ten obrazek jest używany w N stopkach. Po usunięciu przestanie się tam wyświetlać - w jego miejscu pojawi się placeholder."

Jeśli usunięty obrazek był wciąż używany, SignatureCat mówi o tym również całemu workspace: w dzwonku pojawia się powiadomienie w aplikacji ("Usunięto logo używane przez Twoje podpisy"), a do administratorów i właściciela idzie e-mail wymieniający dotknięte szablony. Nikt nie musi przypadkiem wypatrzyć placeholdera.

> [!IMPORTANT]
> Dla obrazków hostowanych przez SignatureCat usunięcie jest trwałe: przechowywany plik zostaje zwolniony przy najbliższym dziennym sprzątaniu, więc obrazek przestaje się ładować także w e-mailach, które zostały już dostarczone, i nie da się tego cofnąć samodzielnie.

Obrazków dodanych przez **Mam link** to nie dotyczy - plik zostaje na Twoim serwerze, więc stare e-maile nadal go ładują. Aby bezpiecznie podmienić hostowany obrazek, wgraj nowy, przestaw na niego szablony i dopiero gdy masz pewność, że nic go już nie potrzebuje, usuń stary wpis.

## Skąd serwowane są obrazki

Obrazki z biblioteki są domyślnie hostowane pod `images.signature.cat`. Aby serwować je z własnej subdomeny (lepsza dostarczalność), zobacz [Serwuj obrazki z własnej domeny](/docs/custom-image-domain). Obrazki z zewnętrznych adresów ("Mam link") są zawsze pobierane stamtąd, gdzie je hostujesz - muszą pozostać publicznie dostępne przez HTTPS.
