---
title: Edytor wizualny
navTitle: Edytor wizualny
description: Projektuj podpisy Gmail bez pisania HTML - edytor wizualny SignatureCat z chipami zmiennych, zmianą rozmiaru obrazków, kolumnami, czcionkami i wynikiem gwarantowanie bezpiecznym dla Gmaila.
updated: 2026-07-26
---

# Edytor wizualny

Edytor wizualny pozwala zaprojektować szablon podpisu bez napisania ani linijki HTML. Pracujesz na kanwie z formatowaniem tekstu, chipami zmiennych i obrazkami w rzeczywistym rozmiarze - a wszystko, co edytor wygeneruje, jest gwarantowanie bezpieczne dla poczty: edytor potrafi wyemitować wyłącznie znaczniki renderujące się poprawnie w Gmailu, więc nie da się w nim zbudować podpisu, który zepsuje się w skrzynce.

Edytor mieszka na tej samej stronie co [edytor HTML](/docs/templates/#the-editor): otwórz dowolny szablon na stronie [Podpisy](https://app.signature.cat/signatures) i przełączaj się między kartami **Wizualny** i **HTML**.

## Tryby edycji

Każdy szablon jest edytowany w jednym z dwóch trybów, a edytor otwiera się w trybie, w którym szablon był ostatnio zapisany:

- **Wizualny** - kanwa opisana na tej stronie. Zapis przechowuje zarówno dokument wizualny, jak i wygenerowany HTML.
- **HTML** - klasyczny edytor kodu z autouzupełnianiem tokenów; zobacz [Szablony](/docs/templates/#the-editor).

Przełączać się można w każdej chwili, z dwoma zastrzeżeniami:

- **HTML na Wizualny to konwersja w jedną stronę.** Importer tłumaczy Twoje znaczniki na bloki kanwy najlepiej, jak potrafi - proste układy (w tym jednowierszowe tabele, które stają się [kolumnami](#kolumny)) konwertują się czysto, a głęboko zagnieżdżone układy tabel są spłaszczane. Edytor ostrzega przed stratną konwersją.
- **Wizualny na HTML to degradacja.** Dostajesz wygenerowany HTML do swobodnej edycji, ale zapis z karty HTML odrzuca dokument wizualny - późniejszy powrót oznacza ponowną konwersję.

## Tekst, czcionki i kolory

Kanwa obsługuje formatowanie, które niezawodnie przeżywa klienty poczty: akapity, **pogrubienie**, *kursywę*, podkreślenie, listy punktowane i numerowane, bezpieczną dla e-maili paletę kolorów tekstu, linki (web, mailto i tel) oraz cofnij/ponów.

Typografią sterują dwie listy rozwijane:

- **Rozmiar czcionki** - od 10 do 24 px.
- **Czcionka** - "Domyślna (klient poczty)" plus siedem rodzin web-safe: Arial, Verdana, Tahoma, Trebuchet MS, Georgia, Times New Roman i Courier New. Opcja domyślna nie emituje żadnej czcionki, pozwalając klientowi poczty każdego odbiorcy użyć własnej - to najbezpieczniejszy wybór.

> [!NOTE]
> Czcionki web-safe renderują się spójnie, bo są dostarczane z systemem odbiorcy, a nie z e-mailem. Przy pierwszym wyborze czcionki innej niż domyślna edytor pokazuje krótką notkę o kompatybilności.

## Kolumny

Wstaw z paska narzędzi wiersz z 2 lub 3 kolumnami, aby umieścić treści obok siebie - na przykład zdjęcie po lewej i dane kontaktowe po prawej. Kolumny są zapisywane w wygenerowanym HTML jako jednowierszowa tabela - jedyna technika układu, którą każdy klient poczty renderuje poprawnie. Istniejące jednowierszowe tabele w importowanym HTML automatycznie stają się kolumnami.

## Zmienne jako chipy

Zmienne osobowe, takie jak `{{firstname}}` czy `{{phone}}`, pojawiają się na kanwie jako **chipy** - zwarte tokeny, których nie da się przypadkiem zepsuć wpisywaniem tekstu do środka. Chipy można:

- wstawiać z menu **Wstaw zmienną**,
- formatować jak tekst (pogrubienie, kursywa i podkreślenie stosują się do rozwiązanej wartości),
- przeciągać i upuszczać w dowolne miejsce kanwy,
- usuwać przyciskiem kosza pojawiającym się po najechaniu.

Pełna lista zmiennych i reguły ich rozwiązywania są w [Zmiennych szablonów](/docs/template-variables/).

## Obrazki: logo, baner i zdjęcie

`{{logo}}`, `{{banner}}` i `{{photo}}` renderują się na kanwie jako chipy obrazków w rzeczywistym rozmiarze - chipy logo i banera pokazują faktyczny obrazek wybrany z Twojej [biblioteki](/docs/banners-and-logos/), a chip zdjęcia pokazuje okrągły placeholder awatara (prawdziwe zdjęcia są podstawiane per użytkownik przy renderowaniu).

Zaznacz chip obrazka i przeciągnij jego **uchwyty zmiany rozmiaru** (krawędzie i narożnik), aby dopasować rozmiar dla tego szablonu - jak przy zmianie rozmiaru okna. Dwuklik przywraca rozmiar domyślny; uchwyty działają też z klawiatury (strzałki co 10 px, Shift ze strzałkami co 50 px, Home/End skaczą do limitów). Dozwolone zakresy:

| Obrazek | Rozmiar domyślny | Zakres zmiany rozmiaru |
|---|---|---|
| Logo | 115x115 px | 24-300 px na bok |
| Baner | 450x100 px (albo własny rozmiar wpisu w bibliotece) | 24-600 x 24-400 px |
| Zdjęcie | 115x115 px, okrągłe | 24-300 px na bok |

Rozmiary są przechowywane **per szablon**: zmiana rozmiaru banera w jednym szablonie nigdy nie zmienia innych szablonów używających tego samego obrazka z biblioteki.

Zaznaczony chip logo lub banera udostępnia też przycisk **Link**: zachowaj link po kliknięciu z obrazka w bibliotece, usuń link tylko dla tego szablonu albo skieruj go pod inny adres - bez dotykania wpisu w bibliotece, który współdzielą inne szablony.

## Bloki warunkowe

Owinięcia `{{del}}` i `{{delete}}` pojawiają się na kanwie jako obramowane bloki, więc dokładnie widzisz, co zniknie, gdy użytkownikowi brakuje danych. Gdy zapis zostaje odrzucony z powodu niezbalansowanych tagów, edytor pokazuje dwa zapętlone mikro-demo kontrastujące zachowanie `{{del}}` i `{{delete}}` - dokładne reguły są w [Zmiennych szablonów](/docs/template-variables/#conditional-blocks-del-and-delete).

## Jak zmieścić się w limicie Gmaila

Gmail ogranicza podpisy do 10 000 znaków. Licznik budżetu na żywo pod kanwą śledzi rozmiar wygenerowanego HTML, więc wiesz o problemie na długo, zanim Gmail odrzuciłby podpis.

## Reset i walidacja

- **Przywróć zapisane** (widoczny zawsze, gdy masz niezapisane zmiany) przywraca szablon do ostatnio zapisanego stanu, łącznie z zapisanym trybem edycji, po potwierdzeniu.
- Błędy walidacji są konkretne: nieznany token jest wymieniany z nazwy, a niezbalansowane tagi warunkowe przychodzą z licznikami otwarć/zamknięć - bez zgadywania.

Gdy szablon wygląda dobrze, obejrzyj podgląd na prawdziwych użytkownikach i przetestuj go na własnej skrzynce - zobacz [Utwórz swój pierwszy szablon](/docs/create-your-first-template/#preview-as-a-real-user).
