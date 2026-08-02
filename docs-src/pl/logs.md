---
title: Logi
navTitle: Logi
description: Gdzie SignatureCat zapisuje każde zadanie podpisów Gmail - logi zadań, wyniki per użytkownik, odznaka okrojony przez Gmail, odczyt skrzynki na żywo i retencja.
updated: 2026-08-02
---

# Logi

SignatureCat prowadzi operacyjny log każdego zadania podpisów, per użytkownik i per adres, więc zawsze możesz odpowiedzieć na pytanie "czy się zastosowało, a jeśli nie, to dlaczego". Punktem wejścia jest zakładka **Logi** w górnej nawigacji: [Logi zadań](https://app.signature.cat/logs).

## Logi zadań

[Logi zadań](https://app.signature.cat/logs) (poziomy Editor i Admin) wypisują ostatnie zakończone zadania Twojego workspace, od najnowszych:

- **Rodzaj** - Synchronizacja przypisań (codzienne zadanie lub **Synchronizuj teraz**) albo Ręczne zastosowanie (ze strony [Zastosuj](https://app.signature.cat/apply) i zapisów self-service).
- **Status** - Powodzenie, Częściowe, Niepowodzenie lub Anulowane.
- **Kto** - użytkownik, który je uruchomił, albo "Automatycznie" dla synchronizacji z harmonogramu.
- **Liczniki** - "N udanych, N nieudanych, N pominiętych".

Rozwinięcie wiersza pokazuje wyniki per użytkownik w miejscu; **Otwórz pełny widok zadania** otwiera kompletną tabelę wyników pod `app.signature.cat/jobs/{id}`.

## Co zawiera wiersz wyniku

Jeden wiersz na zapisany adres: użytkownik (albo alias, oznaczony odznaką "alias"), rezultat i kod błędu dla niepowodzeń lub pominięć. Najczęstsze kody i ich rozwiązania są wypisane w [Zweryfikuj zadanie przypisania](/docs/verify-assignments#co-mwi-wiersze-per-uytkownik). Wiersze mogą też nieść notkę "nadpisano N innych przypisań dla tego użytkownika" na potrzeby audytu [pierwszeństwa](/docs/assignments#jak-dziaa-pierwszestwo).

Udany wiersz może dodatkowo nieść bursztynową odznakę **okrojony przez Gmail** wraz z komunikatem "Podpis ustawiony, ale Gmail zapisał okrojoną wersję." Samo zastosowanie się powiodło - Gmail przyjął zapis, a potem przepisał HTML na własnych serwerach, już w trakcie zapisywania. **Szczegóły techniczne** w wierszu nazywają elementy, które zniknęły, oraz liczniki znaków przed i po. Zobacz [Kiedy Gmail okraja Twój podpis](/docs/gmail-sanitization).

## Odczytaj aktualną stopkę ze skrzynki

Dwie akcje na tej stronie odczytują skrzynkę na żywo: **Wyświetl aktualną stopkę** w udanym wierszu wyniku oraz **Sprawdź stopkę pracownika** w nagłówku strony. Obie otwierają ten sam panel tylko do odczytu, zatytułowany "Aktualna stopka ze skrzynki", z podtytułem "Odczytuje podpis bezpośrednio ze skrzynki Gmail użytkownika."

- **Wyświetl aktualną stopkę** pojawia się w wierszach, które się powiodły, i od razu uruchamia odczyt dla tego adresu.
- **Sprawdź stopkę pracownika** pozwala wybrać dowolną osobę z Twojego Workspace w polu **Pracownik** i kliknąć **Pokaż stopkę**.
- Obie są dostępne dla poziomów Editor i Admin.
- Panel pokazuje podpis, ale go nie edytuje. Ponieważ czyta Gmaila, a nie własne zapisy SignatureCat, ujawnia też podpisy, które użytkownik zmienił ręcznie w ustawieniach Gmail.
- Jeśli nic nie jest zapisane, zamiast podglądu zobaczysz "{email} nie ma ustawionej stopki w Gmailu."

> [!NOTE]
> Każdy odczyt jest zapisywany w dzienniku aktywności Twojego konta w [Ustawieniach](https://app.signature.cat/settings) razem ze sprawdzonym adresem i długością podpisu - nigdy z jego treścią. Samego podpisu SignatureCat nie przechowuje.

## Retencja

Logi zadań są przechowywane przez ograniczone okno (domyślnie **30 dni** od zakończenia zadania), po czym są usuwane automatycznie - strona podaje bieżące okno. Po dużych wdrożeniach przeglądaj lub eksportuj wszystko, czego potrzebujesz, wkrótce po fakcie.

> [!NOTE]
> Okno retencji dotyczy logów wykonania zadań. Twoje szablony, przypisania i ustawienia są oczywiście trwałe.

## Zadania na żywo

Działające zadanie najlepiej obserwować na jego własnej stronie `app.signature.cat/jobs/{id}`, która odpytuje o postęp - zobacz [Zadania zastosowania](/docs/apply-jobs#obserwowanie-zadania).
