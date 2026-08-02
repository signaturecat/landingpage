---
title: Kiedy Gmail okraja Twój podpis
navTitle: Okrajanie przez Gmail
description: Dlaczego Gmail może zapisać okrojoną kopię podpisu, który SignatureCat zastosował w Twoim Google Workspace, jak to rozpoznać i jak poprawić szablon.
updated: 2026-08-02
---

# Kiedy Gmail okraja Twój podpis

Jeśli SignatureCat raportuje udane zastosowanie, a podpis w Gmailu wygląda na ucięty, to Gmail okroił go już po zapisie. Gmail przy każdym zapisie podpisu uruchamia własny sanitizer na serwerach Google, więc kopia, którą Gmail zachowuje, może różnić się strukturalnie od tej wysłanej przez SignatureCat - zapis się udaje, a zapisany wynik i tak jest krótszy. SignatureCat porównuje obie przy każdym zapisie i mówi Ci, kiedy się różnią.

## Dlaczego Gmail zmienia podpis, który zastosował się poprawnie

Gmail sanityzuje HTML podpisu na własnych serwerach, według reguł, których Google nie publikuje. Wywołanie API może zwrócić powodzenie, a Gmail i tak zachowa okrojoną kopię, wyrzucając elementy, których nie chciał zapisać. Przepisanie dzieje się wewnątrz Google, już po tym, jak Twój szablon opuścił SignatureCat, więc ani walidacja szablonu, ani podgląd nie są w stanie tego przewidzieć.

SignatureCat wychwytuje to natychmiast po fakcie. Każdy zapis podpisu odczytuje kopię, którą Gmail zwraca w odpowiedzi na ten zapis - treść tej odpowiedzi to zapisany podpis, już po sanityzacji - i porównuje jej strukturę z tym, co zostało wysłane. Sprawdzenie nie kosztuje ani jednego dodatkowego wywołania API Google i działa na wszystkich czterech ścieżkach zapisu: jednorazowych zastosowaniach, codziennej synchronizacji przypisań i obu ścieżkach zapisu aliasów. Kosmetyczne przepisania nie podnoszą ostrzeżenia: ponownie zakodowane encje, białe znaki, `b` zamienione na `strong` albo `i` na `em`, a także opakowanie Twojego podpisu we własne znaczniki Gmaila są traktowane jako nieszkodliwe. Ostrzeżenie zapala się tylko wtedy, gdy faktycznie zniknęły elementy strukturalne.

> [!NOTE]
> To zachowanie Gmaila po stronie Google, a nie ustawienie SignatureCat, i nie da się go wyłączyć. Własny sanitizer SignatureCat to co innego: działa wcześniej, przy zapisie szablonu, i usuwa skrypty, iframe'y oraz inline'owe handlery zdarzeń - zobacz [Szablony](/docs/templates).

## Gdzie zobaczysz ostrzeżenie

Raportują je dwa miejsca: wyniki zadania w [Logach](/docs/logs) oraz testowe zastosowanie w edytorze szablonu.

### W Logach i na widoku zadania

Wiersz per użytkownik zachowuje zielony ptaszek i dostaje bursztynową odznakę **okrojony przez Gmail** wraz z komunikatem "Podpis ustawiony, ale Gmail zapisał okrojoną wersję." Ta sama odznaka i ten sam komunikat pojawiają się na pełnym widoku zadania pod `app.signature.cat/jobs/{id}`.

Rozwiń **Szczegóły techniczne** w wierszu, aby zobaczyć surowe fakty: ile znaków wysłano, ile Gmail zapisał i które elementy zniknęły, wraz z licznikami przed i po, na przykład:

```
Gmail stored a sanitized copy of the signature (2712 -> 1580 chars; dropped tags: tr 5->3, img 2->1)
```

Podpis, który Gmail zapisał jako całkiem pusty, niesie tę samą odznakę i ten sam komunikat - dopiero szczegóły techniczne mówią, że zapisany podpis jest pusty. Kod błędu per użytkownik stojący za odznaką to `GMAIL_SIGNATURE_SANITIZED`; w odróżnieniu od kodów z [Zweryfikuj zadanie przypisania](/docs/verify-assignments) siedzi on na udanym wierszu i jest ostrzeżeniem, a nie niepowodzeniem.

### Po testowym zastosowaniu w edytorze

Kliknij **Ustaw mi testowy podpis** w edytorze szablonu, a SignatureCat zapisze szablon jako Twój własny podpis Gmail, po czym odczyta Twoją skrzynkę z powrotem. Jeśli Gmail go okroił, pojawi się bursztynowe, zamykalne powiadomienie z jednym z dwóch tytułów:

| Tytuł | Co zapisał Gmail |
|---|---|
| Podpis ustawiony, ale Gmail zapisał okrojoną wersję. | Strukturalnie inną, okrojoną kopię. |
| Podpis ustawiony, ale Gmail zapisał pustą stopkę. | Zupełnie nic. |

Treść brzmi: "Gmail przepisuje podpisy na swoich serwerach podczas zapisu. Sprawdź swoją skrzynkę i uprość problematyczne fragmenty, jeśli czegoś brakuje." Rozwinięcie szczegółów pokazuje "Wysłano {sent} znaków, Gmail zapisał {stored}." oraz "Utracone elementy: {list}". **Zamknij ostrzeżenie** zamyka powiadomienie.

> [!TIP]
> To najszybszy sposób na znalezienie konstrukcji, którą Gmail odrzuca: dotyka wyłącznie Twojej własnej skrzynki i weryfikuje wynik po każdym zapisie, więc każda próba to jedno kliknięcie.

## Dlaczego wiersz nadal liczy się jako sukces

Zapis się powiódł, więc wiersz zostaje sukcesem. Gmail przyjął żądanie i zapisał podpis; ponowne zastosowanie tego samego szablonu wyśle ten sam HTML, a Gmail zapisze tę samą okrojoną kopię. Ponowne uruchomienie wdrożenia niczego więc nie zmieni.

Naprawiać trzeba szablon, a nie zadanie:

1. Przeczytaj listę utraconych elementów w szczegółach technicznych - nazywa ona fragmenty, które zniknęły.
2. Uprość ten fragment szablonu: spłaszcz zagnieżdżenia, rozbij jeden skomplikowany blok na proste, usuń element stojący w miejscu, w którym podpis się urywa.
3. Zastosuj go u siebie przyciskiem **Ustaw mi testowy podpis** i sprawdź, czy ostrzeżenie zniknęło.
4. Odczytaj skrzynkę, aby potwierdzić, co Gmail naprawdę zachował.
5. Zastosuj ponownie u dotkniętych użytkowników, gdy test wyjdzie czysto.

## Sprawdź, co naprawdę jest w skrzynce

Dwie akcje w [Logach](/docs/logs) odczytują podpis na żywo ze skrzynki, zamiast pokazywać to, co SignatureCat wysłał ostatnim razem:

- **Wyświetl aktualną stopkę** - w udanym wierszu per użytkownik. Otwiera podgląd tylko do odczytu podpisu przechowywanego obecnie pod tym adresem.
- **Sprawdź stopkę pracownika** - w nagłówku strony Logi. Wyszukaj dowolnego użytkownika w swoim Workspace i kliknij **Pokaż stopkę**.

Obie sięgają do Gmaila w momencie kliknięcia, więc wyłapują też podpisy zmienione ręcznie przez użytkownika w Gmailu, nie tylko okrajanie samego Gmaila. Jeśli w skrzynce nie ma żadnego podpisu, okienko mówi "{email} nie ma ustawionej stopki w Gmailu." Odczyt jest dostępny dla poziomów Editor i Admin, a każde jego użycie trafia do Twojego logu aktywności razem z odczytanym adresem.

## Co zwykle przetrwa, a co zwykle zostaje okrojone

Google nie dokumentuje tych reguł, więc traktuj to jako obserwacje, a nie specyfikację.

- **Jedyny przypadek widziany na produkcji:** ręcznie napisany szablon łączący zagnieżdżoną tabelę, linię poziomą, obrazek banera i notkę prawną kursywą zastosował się poprawnie - a Gmail zachował tylko część powyżej linii poziomej. Wszystko poniżej zniknęło ze skrzynki.
- **Głębokie zagnieżdżenie to typowy podejrzany.** Układy zbudowane z tabel w tabelach w tabelach dają Gmailowi najwięcej do przepisania.
- **Różnice kosmetyczne to nie okrajanie.** Jeśli podpis wygląda w skrzynce poprawnie i nie pojawiło się ostrzeżenie, ponowna serializacja Twoich znaczników przez Gmaila jest nieszkodliwa.

SignatureCat pilnuje, czy nie znikają elementy strukturalne: linki, łamania linii, `div`, `hr`, obrazki, listy i ich pozycje, akapity, `span`, tabele wraz z wierszami i komórkami oraz pogrubienie i kursywa. To właśnie te nazwy zobaczysz na liście utraconych elementów.

Gdy coś zostanie oznaczone, uprość oznaczony fragment, przetestuj go na własnej skrzynce i odczytaj skrzynkę, zamiast ufać podglądowi - podgląd renderuje HTML, który wysyła SignatureCat, czyli dokładnie tę kopię, którą Gmail może okroić.

## Limit 10 000 znaków w Gmailu

Gmail ogranicza podpis do 10 000 znaków HTML i jest to osobny, wcześniejszy tryb awarii: chodzi o rozmiar, a nie o strukturę, i zatrzymuje Cię, zanim cokolwiek dotrze do Gmaila. [Edytor wizualny](/docs/visual-editor) pokazuje w rogu kanwy licznik budżetu na żywo z treścią "{used} / {max} znaków", który zmienia kolor, gdy zbliżasz się do limitu. Po przekroczeniu limitu edytor mówi "Podpis przekracza limit Gmaila: 10 000 znaków HTML. Skróć go, aby zapisać.", a zapis zostaje odrzucony.

Szablon mieszczący się w budżecie i tak może zostać okrojony przez Gmaila, a okrojony podpis zwykle jest mocno poniżej limitu - to dwa niezależne problemy.

## Kiedy napisać do supportu

Napisz do supportu, gdy podpis jest okrajany, a upraszczanie go nie pomaga, albo gdy ten sam szablon u części użytkowników zapisuje się poprawnie, a u innych zostaje okrojony. Adres i ogólną listę kontrolną znajdziesz w [Uzyskaj pomoc](/docs/get-help), a w zgłoszeniu zawrzyj:

- **link do zadania** (`app.signature.cat/jobs/...`) albo zrzut ekranu wiersza z odznaką **okrojony przez Gmail**,
- pełną treść z sekcji **Szczegóły techniczne** (liczniki znaków i utracone elementy),
- szablon, którego to dotyczy, i jego fragment, który znika w skrzynce,
- czy **Ustaw mi testowy podpis** na Twojej własnej skrzynce odtwarza problem.

> [!IMPORTANT]
> Support nie zmusi Gmaila, żeby zachował znaczniki, które ten postanowił wyrzucić - kontroluje to Google. W czym support pomoże, to w ustaleniu, która konstrukcja w szablonie wywołuje okrajanie.
