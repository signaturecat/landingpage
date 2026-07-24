---
title: Logi
navTitle: Logi
description: Gdzie SignatureCat zapisuje, co się wydarzyło - logi zadań synchronizacji i zastosowań, wyniki per użytkownik, retencja i ślad audytowy.
updated: 2026-07-19
---

# Logi

SignatureCat prowadzi operacyjny log każdego zadania podpisów, per użytkownik i per adres, więc zawsze możesz odpowiedzieć na pytanie "czy się zastosowało, a jeśli nie, to dlaczego". Głównym punktem wejścia są [Logi zadań](https://app.signature.cat/assignments/logs).

## Logi zadań

[Logi zadań](https://app.signature.cat/assignments/logs) (poziomy Editor i Admin) wypisują ostatnie zakończone zadania Twojego workspace, od najnowszych:

- **Rodzaj** - Synchronizacja przypisań (codzienne zadanie lub **Synchronizuj teraz**) albo Ręczne zastosowanie (ze strony [Zastosuj](https://app.signature.cat/apply) i zapisów self-service).
- **Status** - Powodzenie, Częściowe, Niepowodzenie lub Anulowane.
- **Kto** - użytkownik, który je uruchomił, albo "Automatycznie" dla synchronizacji z harmonogramu.
- **Liczniki** - "N udanych, N nieudanych, N pominiętych".

Rozwinięcie wiersza pokazuje wyniki per użytkownik w miejscu; **Otwórz pełny widok zadania** otwiera kompletną tabelę wyników pod `app.signature.cat/jobs/{id}`.

## Co zawiera wiersz wyniku

Jeden wiersz na zapisany adres: użytkownik (albo alias, oznaczony odznaką "alias"), rezultat i kod błędu dla niepowodzeń lub pominięć. Najczęstsze kody i ich rozwiązania są wypisane w [Zweryfikuj zadanie przypisania](/docs/verify-assignments/#what-the-per-user-rows-tell-you). Wiersze mogą też nieść notkę "nadpisano N innych przypisań dla tego użytkownika" na potrzeby audytu [pierwszeństwa](/docs/assignments/#how-precedence-works).

## Retencja

Logi zadań są przechowywane przez ograniczone okno (domyślnie **30 dni** od zakończenia zadania), po czym są usuwane automatycznie - strona podaje bieżące okno. Po dużych wdrożeniach przeglądaj lub eksportuj wszystko, czego potrzebujesz, wkrótce po fakcie.

> [!NOTE]
> Okno retencji dotyczy logów wykonania zadań. Twoje szablony, przypisania i ustawienia są oczywiście trwałe.

## Zadania na żywo

Działające zadanie najlepiej obserwować na jego własnej stronie `app.signature.cat/jobs/{id}`, która odpytuje o postęp - zobacz [Zadania zastosowania](/docs/apply-jobs/#watching-a-job).
