---
title: Edytor wizualny
navTitle: Edytor wizualny
description: Projektuj szablony podpisów Gmail bez pisania HTML - chipy zmiennych, kolumny, separatory, własne obrazki i bezpieczne dla e-maili formatowanie na jednej kanwie.
updated: 2026-08-02
---

# Edytor wizualny

Edytor wizualny pozwala zaprojektować szablon podpisu bez napisania ani linijki HTML. Pracujesz na kanwie z formatowaniem tekstu, chipami zmiennych i obrazkami w rzeczywistym rozmiarze, a edytor potrafi wyemitować wyłącznie znaczniki z listy bezpiecznej dla poczty - to, co powstaje na kanwie, jest dokładnie tym, co SignatureCat przechowuje i wysyła do Gmaila, nic nie jest przepisywane za Twoimi plecami.

> [!NOTE]
> Ostatnie słowo należy do Gmaila: przy zapisywaniu podpisu uruchamia własny sanityzator, więc bardzo skomplikowany układ i tak może wrócić okrojony. Zobacz [Gdy Gmail okrawa Twój podpis](/docs/gmail-sanitization).

Edytor mieszka na tej samej stronie co [edytor HTML](/docs/templates#edytor): otwórz dowolny szablon na stronie [Podpisy](https://app.signature.cat/signatures) i przełączaj się między kartami **Wizualny** i **HTML**.

## Tryby edycji

Każdy szablon jest edytowany w jednym z dwóch trybów, a edytor otwiera się w trybie, w którym szablon był ostatnio zapisany:

- **Wizualny** - kanwa opisana na tej stronie. Zapis przechowuje zarówno dokument wizualny, jak i wygenerowany HTML.
- **HTML** - klasyczny edytor kodu z autouzupełnianiem tokenów; zobacz [Szablony](/docs/templates#edytor).

Przełączać się można w każdej chwili, z dwoma zastrzeżeniami:

- **HTML na Wizualny to konwersja w jedną stronę.** Importer tłumaczy Twoje znaczniki na bloki kanwy najlepiej, jak potrafi, a ręcznie pisany podpis znosi tę podróż znacznie lepiej niż kiedyś: każdy wiersz wielowierszowej tabeli układu staje się własnym [wierszem kolumn](#kolumny), a tagi `{{del}}` i `{{delete}}` owinięte wokół całej komórki, ciągu sąsiadujących komórek albo całego wiersza są zachowywane, zamiast po cichu znikać. Głęboko zagnieżdżone układy tabel nadal są spłaszczane, a edytor ostrzega Cię przed stratną konwersją.
- **Wizualny na HTML to degradacja.** Dostajesz wygenerowany HTML do swobodnej edycji, ale zapis z karty HTML odrzuca dokument wizualny - późniejszy powrót oznacza ponowną konwersję.

## Tekst, czcionki i kolory

Kanwa obsługuje formatowanie, które niezawodnie przeżywa klienty poczty: akapity, **pogrubienie**, *kursywę*, podkreślenie, listy punktowane i numerowane, bezpieczną dla e-maili paletę kolorów tekstu, linki (web, mailto i tel) oraz cofnij/ponów.

Typografią sterują dwie listy rozwijane:

- **Rozmiar czcionki** - siedem stałych rozmiarów plus **Rozmiar domyślny**: 10, 12, 14, 16, 18, 20 i 24 px. Nic innego nie jest dostępne, a domyślny rozmiar kanwy to 14 px.
- **Czcionka** - "Domyślna (klient poczty)" plus siedem rodzin web-safe: Arial, Verdana, Tahoma, Trebuchet MS, Georgia, Times New Roman i Courier New. Opcja domyślna nie emituje żadnej czcionki, pozwalając klientowi poczty każdego odbiorcy użyć własnej - to najbezpieczniejszy wybór. Czcionka stosuje się do całego podpisu, a nie do zaznaczenia.

**Kolor tekstu** oferuje osiem bezpiecznych dla e-maili próbek plus **Kolor domyślny**, który kolor z powrotem usuwa.

> [!NOTE]
> Czcionki web-safe renderują się spójnie, bo są dostarczane z systemem odbiorcy, a nie z e-mailem. Przy pierwszym wyborze czcionki innej niż domyślna edytor pokazuje krótką notkę o kompatybilności.

## Kolumny

Wstaw z paska narzędzi wiersz z 2 lub 3 kolumnami (**Wstaw 2 kolumny**, **Wstaw 3 kolumny**), aby umieścić treści obok siebie - na przykład zdjęcie po lewej i dane kontaktowe po prawej. Kolumny są zapisywane w wygenerowanym HTML jako jednowierszowa tabela - jedyna technika układu, którą każdy klient poczty renderuje poprawnie. Nie da się dodać kolumny do istniejącego wiersza: wstaw wiersz z taką liczbą kolumn, jakiej potrzebujesz.

Gdy wiersz jest już na kanwie:

- **Zmień proporcje.** Przeciągnij kolorowy pasek w odstępie między dwiema kolumnami (**Szerokość kolumny (przeciągnij; strzałki dostosowują)**). Każda kolumna zachowuje co najmniej 10 procent szerokości, a uchwyt działa też z klawiatury - strzałki przesuwają go co 5 procent. Jedno przeciągnięcie ustawia proporcje całego wiersza, więc wiersz jest albo podzielony po równo, albo w całości po Twojemu.
- **Przenieś cały wiersz.** Uchwyt w lewym górnym rogu wiersza (**Przenieś ten wiersz (upuść między liniami)**) przeciąga go między pozostałe bloki, a linia pokazuje, gdzie wyląduje.
- **Usuń pojedynczą kolumnę.** Przycisk kosza w nakładce kolumny ją usuwa; kolumna, która wciąż ma treść, najpierw prosi o potwierdzenie. Wiersz, w którym została tylko jedna kolumna, jest automatycznie rozpakowywany, więc usuwanie nigdy nie zostawia po sobie zepsutego układu.
- **Ustaw kolumnę jako warunkową.** Przełącznik w nakładce kolumny przełącza ją kolejno na brak tagu, `{{del}}` i `{{delete}}` (**Ustaw kolumnę jako warunkową (zniknie, gdy jej zmienne są puste)**). Cała kolumna znika wtedy u użytkowników, u których zmienne w jej wnętrzu są puste - na przykład kolumna ze zdjęciem u osób bez zdjęcia. Kolumna warunkowa jest rysowana przerywaną obwódką i ma w rogu etykietę z tokenem; reguły są dokładnie takie same jak dla [bloków warunkowych](/docs/template-variables#bloki-warunkowe-del-i-delete).

Importowany HTML zachowuje swój układ: każdy wiersz tabeli z wieloma komórkami staje się osobnym wierszem kolumn, więc wiersz ze zdjęciem i nazwiskiem nad wierszem z separatorem zostaje dwoma wierszami, zamiast zlewać się w jeden.

## Separatory

Separator to pozioma linia między dwoma blokami - schludny sposób na oddzielenie nazwiska od danych kontaktowych. Wstawisz go przyciskiem **Wstaw separator**; domyślnie jest cienką jasnoszarą linią z odrobiną odstępu nad i pod.

Na kanwie jest zaznaczalnym blokiem o nazwie **Linia oddzielająca**. Najedź na niego, aby dostać uchwyt przeciągający go między pozostałe bloki i przycisk, który go usuwa. Dwie właściwości ustawiasz sam:

- **Kolor** - zaznacz linię, potem wybierz próbkę z palety na pasku narzędzi (**Kolor linii (zaznacz linię, potem wybierz kolor)**).
- **Długość** - przeciągnij uchwyt na końcu linii (**Długość linii (przeciągnij; podwójny klik = pełna szerokość)**) między 10 a 100 procent szerokości podpisu. Podwójny klik przywraca pełną szerokość.

Separator napisany przez Ciebie ręcznie w HTML zachowuje nadany mu styl, gdy szablon jest konwertowany do trybu wizualnego.

## Zmienne jako chipy

Zmienne osobowe, takie jak `{{firstname}}` czy `{{phone}}`, pojawiają się na kanwie jako **chipy** - zwarte tokeny, których nie da się przypadkiem zepsuć wpisywaniem tekstu do środka. Chipy można:

- wstawiać z menu **Wstaw zmienną**,
- formatować jak otaczający je tekst - pogrubienie, kursywa, podkreślenie, a do tego **Kolor tekstu** i **Rozmiar czcionki**, które przenoszą się na wartość trafiającą do dostarczonego podpisu,
- przeciągać i upuszczać w dowolne miejsce kanwy,
- usuwać przyciskiem kosza pojawiającym się po najechaniu.

Zanim wybierzesz rozmiar albo kolor, zaznacz chip lub fragment tekstu, który go zawiera: samo ustawienie kursora obok chipa nic nie zmienia. Chipy obrazków (`{{logo}}`, `{{banner}}`, `{{photo}}`) nigdy nie są w ten sposób stylowane - ich rozmiar ustawia się uchwytami zmiany rozmiaru.

Pełna lista zmiennych i reguły ich rozwiązywania są w [Zmiennych szablonów](/docs/template-variables).

## Obrazki: logo, baner i zdjęcie

`{{logo}}`, `{{banner}}` i `{{photo}}` renderują się na kanwie jako chipy obrazków w rzeczywistym rozmiarze - chipy logo i banera pokazują faktyczny obrazek wybrany z Twojej [biblioteki](/docs/banners-and-logos), a chip zdjęcia pokazuje placeholder awatara (prawdziwe zdjęcia są podstawiane per użytkownik przy renderowaniu).

Zaznacz chip obrazka i przeciągnij jego **uchwyty zmiany rozmiaru** (krawędzie i narożnik), aby dopasować rozmiar dla tego szablonu - jak przy zmianie rozmiaru okna. Dwuklik przywraca rozmiar domyślny. Uchwyty obsługuje się myszą; nie ma dla nich sterowania klawiaturą. Dozwolone zakresy:

| Obrazek | Rozmiar domyślny | Zakres zmiany rozmiaru |
|---|---|---|
| Logo | 115x115 px | 24-300 px na bok |
| Baner | 450x100 px (albo własny rozmiar wpisu w bibliotece) | 24-600 x 24-400 px |
| Zdjęcie | 115x115 px, okrągłe | 24-300 px na bok |

Zdjęcie profilowe jest domyślnie okrągłe. Mały przełącznik na uchwycie chipa zdjęcia zmienia je dla tego szablonu w kwadratowe (**Przełącz na kwadratowe zdjęcie**) i z powrotem (**Przełącz na okrągłe zdjęcie**).

Rozmiary są przechowywane **per szablon**: zmiana rozmiaru banera w jednym szablonie nigdy nie zmienia innych szablonów używających tego samego obrazka z biblioteki.

Zaznaczony chip logo lub banera udostępnia też przycisk **Link**: zachowaj link po kliknięciu z obrazka w bibliotece, usuń link tylko dla tego szablonu albo skieruj go pod inny adres - bez dotykania wpisu w bibliotece, który współdzielą inne szablony.

## Własne obrazki

Dowolny obrazek, który już hostujesz pod adresem `https://`, trafi prosto do szablonu, bez dodawania go do współdzielonej biblioteki. Kliknij **Wstaw obrazek (URL)** na pasku narzędzi i wypełnij:

- **Adres obrazka (https)** - adres obrazka. Musi zaczynać się od `https://`.
- **Opis (ALT, opcjonalny)** - to, co widzą odbiorcy, gdy ich program pocztowy nie potrafi wyświetlić obrazka. Nie może zawierać tokenów szablonu `{{ }}`.
- **Kształt** - **Prostokątny** albo **Zaokrąglony**.

Na kanwie blok działa jak pozostałe obrazki: uchwyt przenosi go między blokami, uchwyty na krawędziach i w narożniku zmieniają rozmiar (od 16 do 600 px szerokości i od 16 do 400 px wysokości), ołówek (**Edytuj obrazek**) otwiera z powrotem adres, opis i kształt, a przycisk kosza go usuwa. Jeśli umieścisz go wewnątrz linku, link zostaje zachowany.

Własny obrazek należy do tego jednego szablonu. Nie jest wpisem w bibliotece: nie pojawia się w galeriach Logo i Baner, inne szablony nie mogą go wybrać i nie zarządza się nim w [Banerach i logo](/docs/banners-and-logos). SignatureCat ani nie wgrywa, ani nie przechowuje tego pliku - obrazek zostaje na Twoim hostingu, więc adres musi działać tak długo, jak długo podpis jest w użyciu.

> [!TIP]
> Używaj biblioteki do logo i banera kampanii, które współdzieli cała firma, a własnego obrazka do jednorazowych wstawek - odznaki nagrody albo logo wydarzenia, które żyje w jednym szablonie.

## Bloki warunkowe

Owinięcia `{{del}}` i `{{delete}}` pojawiają się na kanwie jako obramowane bloki, więc dokładnie widzisz, co zniknie, gdy użytkownikowi brakuje danych. Ten sam tag może nieść cała [kolumna](#kolumny). Gdy zapis zostaje odrzucony z powodu niezbalansowanych tagów, edytor pokazuje dwa zapętlone mikro-demo kontrastujące zachowanie `{{del}}` i `{{delete}}` - dokładne reguły są w [Zmiennych szablonów](/docs/template-variables#bloki-warunkowe-del-i-delete).

## Jak zmieścić się w limicie Gmaila

Gmail ogranicza podpisy do 10 000 znaków. Licznik budżetu na żywo pod kanwą śledzi rozmiar wygenerowanego HTML, więc wiesz o problemie na długo, zanim Gmail odrzuciłby podpis.

## Reset i walidacja

- **Odrzuć zmiany** (widoczny zawsze, gdy masz niezapisane zmiany, z podpowiedzią "Przywróć ostatnio zapisaną wersję") przywraca szablon do ostatnio zapisanego stanu, łącznie z zapisanym trybem edycji, po potwierdzeniu.
- Błędy walidacji są konkretne: nieznany token jest wymieniany z nazwy, a niezbalansowane tagi warunkowe przychodzą z licznikami otwarć/zamknięć - bez zgadywania.

Gdy szablon wygląda dobrze, sprawdź go na symulowanych klientach nad podglądem ([Podgląd w kliencie poczty](/docs/mail-client-preview)), wyrenderuj go na prawdziwych użytkownikach i przetestuj na własnej skrzynce - zobacz [Utwórz swój pierwszy szablon](/docs/create-your-first-template#podgld-jako-prawdziwy-uytkownik).
