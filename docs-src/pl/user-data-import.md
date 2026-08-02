---
title: Import danych użytkowników z CSV
navTitle: Import danych
description: Wczytaj masowo dane do podpisów per użytkownik z pliku CSV - kolumny, reguły zastępowania, limity, krok podglądu i synchronizacja z Gmail po imporcie.
updated: 2026-08-02
---

# Import danych użytkowników z CSV

Import CSV ustawia zapisane wartości dla wielu osób naraz, pod adresem [app.signature.cat/data/import](https://app.signature.cat/data/import) albo przez **Import z CSV** na stronie [Dane](https://app.signature.cat/data). Plik jest sprawdzany, zanim cokolwiek zostanie zapisane, a cały import działa w trybie wszystko-albo-nic. Najpierw włącz funkcję - zobacz [Nadpisania danych użytkowników](/docs/user-data).

## Kiedy go używać

Użyj importu, gdy masz do skonfigurowania dziesiątki albo setki osób, zwykle prosto z eksportu z systemu HR. Dla jednej osoby szybszy jest edytor per użytkownik, który od razu odświeża jej podpis.

Import dotyka wyłącznie adresów wymienionych w pliku. Wszyscy pozostali zachowują to, co mają, łącznie z osobami bez żadnych zapisanych danych.

## Plik

Zacznij od **Pobierz wzorcowy CSV** na stronie importu - zawiera wiersz nagłówka i jeden przykładowy wiersz:

```
email,firstname,lastname,jobtitle,department,photo,address,phone
jane.doe@yourcompany.com,Jane,Doe,Senior Account Manager,Sales,https://yourcompany.com/photos/jane.jpg,"Main Street 1, 00-001 Warsaw",+48 600 000 000
```

Format to zwykły CSV: rozdzielany przecinkami, jeden wiersz nagłówka, wartości z przecinkiem w środku ujęte w cudzysłowy (cudzysłów wewnątrz cytowanej wartości jest podwajany), końce linii LF albo CRLF, UTF-8.

`email` jest wymagany w każdym pliku. Identyfikuje osobę, której wpis zastępuje dany wiersz, i musi być jej **głównym** adresem w Workspace - nie jest nadpisaniem zmiennej `{{email}}` ani nie trafia do żadnego podpisu. Aliasy nie są tu rozwiązywane, więc wiersz z aliasem nigdy nie dotrze do podpisu tej osoby.

Dodaj co najmniej jedną kolumnę danych. Każda z nich ustawia pole o tej samej nazwie na ekranie [Dane](https://app.signature.cat/data):

| Kolumna | Ustawia | Limit |
|---|---|---|
| `firstname` | **Imię**, `{{firstname}}` | 120 znaków |
| `lastname` | **Nazwisko**, `{{lastname}}` | 120 znaków |
| `jobtitle` | **Stanowisko**, `{{jobtitle}}` | 200 znaków |
| `department` | **Dział**, `{{department}}` | 200 znaków |
| `photo` | **URL zdjęcia**, `{{photo}}` | 2048 znaków, tylko link `https://` |
| `address` | **Adres**, `{{address}}` | 300 znaków |
| `phone` | **Telefon**, `{{phone}}` | 60 znaków |

Kolumny mogą występować w dowolnej kolejności, ale każdy nagłówek musi być jedną z powyższych nazw i żadna nie może pojawić się dwa razy.

> [!IMPORTANT]
> Nadpisań **E-mail (wyświetlany)** i **Domena (wyświetlana)** celowo nie da się zaimportować - dzięki temu kolumna `email` pozostaje jednoznaczna. Te dwa pola ustawiaj per osoba w edytorze na stronie [Dane](https://app.signature.cat/data).

## Co robi wiersz

Wiersz zastępuje całe zapisane nadpisanie danej osoby - to nie jest aktualizacja częściowa:

- wypełniona komórka zapisuje swoją wartość;
- pusta komórka oznacza "użyj katalogu" i czyści wartość zapisaną dla tego pola;
- kolumna pominięta w nagłówku również jest czyszczona, dla każdego adresu z pliku;
- wiersz z samym adresem i bez żadnych wartości usuwa nadpisanie tej osoby w całości;
- osoby spoza pliku nigdy nie są dotykane.

Plik z samymi kolumnami `email` i `phone` wyczyści więc wszystkie pozostałe zapisane pola wymienionych osób. Wyeksportuj to, co już masz, albo wypisz każdą kolumnę, którą chcesz zachować.

## Limity

Do **2000 wierszy danych** i **1 MB** na plik. Większe pliki są odrzucane jeszcze przed wysyłką - podziel dane na kilka plików i zaimportuj je jeden po drugim.

## Wgraj, sprawdź, potwierdź

Nic nie jest zapisywane, dopóki nie potwierdzisz podglądu:

1. **Wgranie.** Wskaż plik przyciskiem **Wybierz plik CSV**. Zostanie od razu sparsowany i sprawdzony.
2. **Sprawdź przed importem.** Dostajesz podsumowanie (ile wierszy, ile nowych, ile aktualizuje istniejący wpis) i tabelę wierszy oznaczonych jako **Nowy** albo **Aktualizacja**, ze słowem "katalog" wszędzie tam, gdzie komórka wyczyści wartość. Bardzo długie pliki pokazują tylko pierwsze wiersze; importowane są wszystkie.
3. **Potwierdzenie.** Kliknij **Importuj wiersze: N**. Dopiero teraz cokolwiek jest zapisywane. Ekran wyniku raportuje, ile wpisów zapisano i ile wpisów usunęły puste wiersze.

## Jeden zły wiersz odrzuca cały plik

Import działa w trybie wszystko-albo-nic: jeśli walidacji nie przejdzie którykolwiek wiersz albo sam plik, nic nie zostaje zapisane i żaden wpis się nie zmienia. Popraw plik i wgraj go ponownie.

Problemy z pojedynczym wierszem:

| Co mówi aplikacja | Przyczyna i rozwiązanie |
|---|---|
| "Adres e-mail jest niepoprawny." | Komórka `email` nie jest składniowo poprawnym adresem. |
| "Ten e-mail występuje w pliku więcej niż raz." | Ten sam adres jest wypisany dwa razy. Połącz wiersze w jeden - wiersz zastępuje cały wpis, więc drugi po cichu by wygrał. |
| "Wiersz ma inną liczbę komórek niż nagłówek." | Zwykle przecinek poza cudzysłowami wewnątrz wartości. Ujmij takie wartości w cudzysłowy. |
| "Wiersz zawiera znaki sterujące (np. łamanie linii w wartości)." | Wartości muszą być jednoliniowym zwykłym tekstem. Usuń łamania linii i tabulatory, także wewnątrz cytowanych komórek. |
| "Wartość jest niepoprawna dla swojej kolumny." | Wartość jest dłuższa niż powyższy limit albo komórka `photo` nie jest linkiem `https://`. |

Problemy, które odrzucają cały plik:

| Co mówi aplikacja | Przyczyna i rozwiązanie |
|---|---|
| "Plik nie ma wierszy z danymi." | Plik zawiera tylko nagłówek. |
| "Brakuje kolumny email." | Dodaj wymaganą kolumnę `email`. |
| "Dodaj co najmniej jedną kolumnę danych poza email." | Sam plik z adresami niczego nie robi. |
| "Nieznana kolumna w nagłówku." | Akceptowane jest tylko osiem udokumentowanych nazw kolumn, pisanych dokładnie tak samo. |
| "Kolumna występuje w nagłówku dwa razy." | Usuń duplikat. |
| "Plik ma ponad 2000 wierszy danych." | Podziel plik. |
| "Cudzysłów w wartości nie został domknięty - sprawdź cytowanie." | Otwierający cudzysłów nie ma zamykającego - często przez zabłąkany cudzysłów w adresie. |

> [!TIP]
> Zwykłym źródłem kłopotów są eksporty z arkuszy kalkulacyjnych: sprawdź, czy Twoje narzędzie zapisało czysty CSV (a nie rozdzielany średnikami) i czy w żadnej komórce nie ma łamania linii.

## Po imporcie

Zaimportowane wartości trafiają do skrzynek przy najbliższej codziennej synchronizacji. Aby zastosować je wcześniej, użyj **Synchronizuj podpisy teraz** na ekranie wyniku - uruchamia synchronizację podpisów od razu. Przycisk jest opcjonalny; pominięcie go po prostu zostawia zmianę codziennej synchronizacji. Jeśli synchronizacja już trwa, aplikacja o tym powie, a to, czego ten przebieg nie obejmie, zastosuje kolejny.

W odróżnieniu od zapisu jednej osoby na stronie [Dane](https://app.signature.cat/data), import sam z siebie nie odświeża podpisów - właśnie dlatego jest ten przycisk.

> [!NOTE]
> Wiersz z adresem, który nie istnieje w Twoim Workspace, jest przyjmowany (adresy są sprawdzane tylko pod kątem formy), nigdy nie trafia do żadnej skrzynki i zostaje później automatycznie wyczyszczony. Jest nieszkodliwy, ale warto go usunąć z pliku źródłowego.

Powiązane: [Nadpisania danych użytkowników](/docs/user-data), [Zmienne szablonów](/docs/template-variables), [Logi](/docs/logs).
