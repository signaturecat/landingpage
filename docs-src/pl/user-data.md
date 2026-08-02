---
title: Nadpisania danych użytkowników
navTitle: Dane użytkowników
description: Przechowuj wartości per użytkownik, które nadpisują katalog Google Workspace w podpisach Gmail - zgoda, dziewięć pól, edycja self-service i usuwanie.
updated: 2026-08-02
---

# Nadpisania danych użytkowników

Zakładka **Dane** pozwala zapisać własną wartość dla pojedynczej osoby i użyć jej w podpisach zamiast tego, co zwraca katalog Google. Funkcja jest wyłączona, dopóki nie włączy jej Admin, obejmuje te same dziewięć osobowych [zmiennych](/docs/template-variables), których używają Twoje szablony, i nigdy niczego nie zapisuje z powrotem do Google. Strona to [app.signature.cat/data](https://app.signature.cat/data), tylko dla poziomu Admin.

## Kiedy używać nadpisań

Używaj nadpisań tam, gdzie braku nie da się szybko naprawić u źródła. Poprawienie danych w Google pozostaje zalecaną drogą i mówi o tym sam ekran zgody: **Najpierw katalog - nadpisania później**. Najlepszym miejscem na dane pracowników jest sam katalog Google (w konsoli administracyjnej Google: **Katalog**, **Użytkownicy**, wybierz osobę, **Informacje o użytkowniku**). Dane trzymane tam trafiają do podpisów automatycznie, bez żadnych nadpisań, i korzysta z nich każde inne narzędzie Workspace.

Dobre powody, by mimo wszystko nadpisać:

- stanowisko albo dział jest dziś błędne, a proces, który za nie odpowiada, nie zostanie naprawiony w tym tygodniu;
- współpracownik nie ma w katalogu numeru telefonu, a w podpisie musi go mieć;
- jedna osoba ma występować w mailu pod preferowanym imieniem, ale nie w rekordzie katalogu.

Późniejsze poprawienie rekordu w katalogu zawsze jest bezpieczne: przełącz pole z powrotem na wartość z katalogu, a nadpisanie zniknie.

## Włączanie

Nic nie jest zapisywane, dopóki funkcji nie włączy Admin. Otwórz [Dane](https://app.signature.cat/data) i przeczytaj ekran zgody **Przechowywać dane do podpisów dla wybranych osób?**, który w sekcji **Co i kiedy przechowujemy** mówi:

- nic nie jest zapisywane, dopóki nie włączysz funkcji - a potem wyłącznie wartości, które sami wpiszecie, tylko dla nadpisanych osób;
- każda zmiana ląduje w dzienniku audytu (kto, kiedy i które pola - nigdy wartości);
- wyłączenie funkcji trwale usuwa wszystkie zapisane wartości, a osoby usunięte z Workspace są czyszczone automatycznie.

Kliknij **Włącz i przechowuj dane**, aby ją uruchomić. Do tego momentu ekrany danych niczego nie przechowują, a funkcja nie wykonuje żadnych zapytań do katalogu.

> [!IMPORTANT]
> Wartości, które tu wpisujesz, przechowuje SignatureCat, we własnej bazie danych SignatureCat - nie w Twoim Google Workspace. Ta funkcja nigdy nie zmienia rekordów w Twoim katalogu Google.

Strona Dane wymaga zweryfikowanego połączenia z Workspace; jeśli kreator konfiguracji nie jest dokończony, trafisz najpierw na [Domain-Wide Delegation](/docs/domain-wide-delegation).

## Pola, które możesz nadpisać

Dziewięć pól, po jednym na każdą zmienną osobową. Zapisana wartość wygrywa z wartością z katalogu na każdej ścieżce renderowania - podgląd w edytorze, testowe zastosowanie, ręczne zastosowanie i codzienna synchronizacja - więc to, co pokazuje edytor, trafia do skrzynek. Pole, którego nie ruszysz, zachowuje wartość z katalogu.

| Pole | Zmienna | Wartość z katalogu | Limit |
|---|---|---|---|
| **Imię** | `{{firstname}}` | Imię z katalogu | 120 znaków |
| **Nazwisko** | `{{lastname}}` | Nazwisko z katalogu | 120 znaków |
| **E-mail (wyświetlany)** | `{{email}}` | Główny adres e-mail | 320 znaków, musi być poprawnym adresem |
| **Domena (wyświetlana)** | `{{domain}}` | Część domenowa adresu głównego | 253 znaki, sama domena, na przykład `yourcompany.com` |
| **Stanowisko** | `{{jobtitle}}` | Stanowisko z głównego wpisu organizacji użytkownika | 200 znaków |
| **Dział** | `{{department}}` | Dział z tego samego wpisu | 200 znaków |
| **URL zdjęcia** | `{{photo}}` | Zdjęcie profilowe z katalogu | 2048 znaków, tylko link `https://` |
| **Adres** | `{{address}}` | Główny adres użytkownika, sformatowany | 300 znaków |
| **Telefon** | `{{phone}}` | Pierwszy niepusty z: służbowy, komórkowy, domowy | 60 znaków |

> [!WARNING]
> **E-mail (wyświetlany)** i **Domena (wyświetlana)** zmieniają tylko to, co pokazuje podpis. Nigdy nie zmieniają adresu skrzynki, z której wychodzą maile, i niczego nie tworzą w Google.

Dwie dodatkowe reguły warte zapamiętania:

- **URL zdjęcia** przyjmuje publiczny link `https://` do obrazka, który hostujesz sam - SignatureCat nie hostuje zdjęć pracowników.
- Gdy podpis jest zapisywany na aliasie send-as, `{{email}}` i `{{domain}}` podążają za adresem aliasu, nawet jeśli masz dla tej osoby zapisane nadpisanie; wszystkie pozostałe pola zachowują swoje nadpisania. Zobacz [Tryby aliasów](/docs/assignments#tryby-aliasw).

## Nadpisanie dla jednej osoby

1. Na stronie [Dane](https://app.signature.cat/data) zacznij pisać w polu **Znajdź użytkownika** - wystarczy jeden znak. Wyniki pochodzą na żywo z katalogu Twojego Workspace; puste wyszukiwanie celowo nie zwraca nic, dzięki czemu strona nigdy nie wypisuje całego Workspace.
2. Wybierz osobę z wyników. Otworzy się edytor, w którym każde pole pokazuje aktualną wartość z katalogu, tylko do odczytu, oznaczoną ikoną chmury.
3. Kliknij ikonę obok pola, aby przełączyć je z **Użyj wartości z katalogu** na **Nadpisz to pole**, i wpisz swoją wartość. Tryb katalogu jest domyślny dla każdego pola, a przełączenie pola z powrotem na niego usuwa zapisaną wartość przy zapisie.
4. Jeśli dane są błędne u źródła, skorzystaj z **Edytuj tę osobę w konsoli Google** - otwiera profil tej osoby w Google.
5. Kliknij **Zapisz dane**.

Po zapisie aplikacja mówi, co stało się ze skrzynką:

| Co mówi aplikacja | Co to znaczy |
|---|---|
| "Zapisano. Podpis jane@yourcompany.com odświeży się za chwilę." | Jednorazowe odświeżenie podpisu tej osoby zostało zakolejkowane. |
| "Zapisano, ale jane@yourcompany.com nie ma przypisanego podpisu - nic nie zostało zastosowane w skrzynce." | Osoba nie pasuje do żadnego przypisania i nie dokonała wyboru self-service, więc nie ma czego odświeżać. |
| "Zapisano. Zmiana wejdzie w życie przy najbliższej synchronizacji podpisów." | Nic nie dało się teraz zakolejkować; zmianę podchwyci codzienna synchronizacja. |

Każda nadpisana osoba trafia na listę **Osoby z nadpisanymi danymi**, wraz z polami, które mają wartość, datą i kolumną **Ostatnia zmiana** (**Administrator**, **Self-service** albo **Import CSV**). Ta lista pochodzi z własnej bazy danych SignatureCat i nie wykonuje żadnych zapytań do Google.

Dla dziesiątek lub setek osób naraz użyj **Import z CSV** - zobacz [Import danych użytkowników z CSV](/docs/user-data-import).

## Usuwanie nadpisania

Wyczyszczenie wszystkich pól danej osoby usuwa jej zapisany wpis:

- w edytorze **Wróć do danych z katalogu** usuwa wszystkie zapisane wartości naraz;
- na liście to samo robi **Usuń nadpisanie** w wierszu;
- zapisanie osoby, której wszystkie pola wróciły do trybu katalogu, również usuwa wpis.

Nie da się wymusić pustej wartości: puste nadpisanie zawsze oznacza "użyj katalogu". Jeśli podpis ma całkowicie ukrywać brakujące pole, zamknij tę linię w [bloku warunkowym](/docs/template-variables#bloki-warunkowe-del-i-delete).

Osobę, której już nie ma w Twoim Workspace, wciąż możesz wyczyścić ręcznie - edytor mówi "Ten użytkownik nie istnieje już w Twoim Workspace." i proponuje **Usuń nadpisanie teraz**. Automatyczne czyszczenie i tak usunęłoby ten wpis.

## Pozwól ludziom uzupełnić własne dane

Włącz przełącznik **Edycja self-service** na stronie Dane, aby pozwolić użytkownikom wpisywać własne wartości na stronie Mój podpis. Pod adresem [app.signature.cat/self-service](https://app.signature.cat/self-service) pojawi się wtedy przycisk **Moje dane do podpisu**, który otwiera **Uzupełnij swoje dane** - ten sam edytor per pole, z **Zapisz moje dane** i **Użyj danych z katalogu**.

- Skorzysta z niego każdy poziom dostępu od **Self-service** wzwyż, i zawsze tylko na własnym rekordzie.
- Ich wpisy pojawiają się na Twojej liście z wartością **Self-service** w kolumnie **Ostatnia zmiana**, obok adresu osoby, która je zapisała.
- Każdy z nich możesz nadpisać albo usunąć; zapis administratora zmienia źródło wpisu na **Administrator**.
- Każda zmiana self-service ląduje w dzienniku audytu tak samo jak Twoja.

Więcej o stronie Mój podpis: [Self-service](/docs/self-service).

## Kto co może

Zakładka **Dane** jest tylko dla poziomu Admin, tak jak [Zarządzanie dostępem](/docs/user-management). Wszyscy pozostali mogą co najwyżej edytować własny rekord.

| Kto | Co może zrobić |
|---|---|
| Admin | Włączyć i wyłączyć funkcję, nadpisać dowolną osobę, [zaimportować CSV](/docs/user-data-import), otworzyć lub zamknąć edycję self-service. |
| Poziom **Self-service** i wyżej | Edytować wyłącznie własne wartości i tylko wtedy, gdy funkcja jest włączona, a edycja self-service otwarta. |

## Wyłączanie

Sekcja **Wyłącz i usuń** na dole strony Dane usuwa wszystko. Kliknij **Wyłącz nadpisywanie danych**, a następnie w oknie **Usunąć wszystkie zapisane dane?** wykonaj **Przepisz domenę Workspace, aby potwierdzić** i kliknij **Usuń wszystko i wyłącz**.

Wszystkie zapisane wartości Twojego workspace znikają natychmiast, a edycja self-service wyłącza się razem z funkcją. Podpisy wracają do danych z katalogu przy najbliższym zastosowaniu.

> [!CAUTION]
> Usunięcie jest trwałe i nie da się go cofnąć. Zanim potwierdzisz, wyeksportuj albo zapisz sobie wszystko, co chcesz zachować.

Strona Dane pozostaje dostępna nawet wtedy, gdy subskrypcja wygasła, więc wyłącznik masz zawsze pod ręką.

## Cykl życia i prywatność

- Wpisy istnieją tylko dla osób, które ktoś faktycznie nadpisał - SignatureCat nigdy nie kopiuje Twojego katalogu.
- Zawieszeni użytkownicy zachowują swoje zapisane wartości.
- Osoby usunięte z Twojego Workspace mają wpisy usuwane automatycznie, raz dziennie.
- Usunięcie konta SignatureCat usuwa razem z nim wszystkie zapisane wartości.
- Każda zmiana trafia do dziennika audytu z informacją kto, kiedy i które pola - nigdy z samymi wartościami.
- Wyłączenie funkcji usuwa wszystko, natychmiast.

Wiążące dokumenty i podsumowanie prywatności znajdziesz na stronie [Kwestie prawne](/docs/legal).
