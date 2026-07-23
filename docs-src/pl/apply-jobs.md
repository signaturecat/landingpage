---
title: Zadania zastosowania
navTitle: Zadania zastosowania
description: Jak SignatureCat stosuje podpisy - codzienna synchronizacja przypisań, ręczne jednorazowe zastosowania ze strony Zastosuj i śledzenie zadań.
updated: 2026-07-17
---

# Zadania zastosowania

Każdy zapis podpisu odbywa się w ramach **zadania**: albo cyklicznej **synchronizacji przypisań**, albo **ręcznego zastosowania**, które uruchamiasz samodzielnie. Zadania działają w tle, raportują wyniki per użytkownik i można je obserwować na żywo.

## Synchronizacja przypisań

Raz dziennie SignatureCat ponownie rozwiązuje wszystkie [przypisania](/docs/assignments/) i ponownie stosuje podpisy w całym workspace. Właśnie dzięki temu podpisy pozostają aktualne, gdy ludzie dołączają do grup, przenoszą się między OU albo zaczynają pracę. Tę samą synchronizację możesz uruchomić w dowolnym momencie przyciskiem **Synchronizuj teraz** na stronie [Przypisania](https://app.signature.cat/assignments).

## Ręczne zastosowania: strona Zastosuj

Strona [Zastosuj](https://app.signature.cat/apply) (poziomy Editor i Admin) wysyła zadanie **jednorazowe**: wybierasz szablon, wybierasz odbiorców, stosujesz raz. Jest niezależna od przypisań - przydaje się do jednorazowych wdrożeń, naprawiania pojedynczych skrzynek albo objęcia osób spoza jakiegokolwiek przypisania.

Odbiorców można dowolnie łączyć (do 50 pozycji):

- **Wszyscy** - jedno kliknięcie obejmuje każdego aktywnego użytkownika w Workspace w momencie zastosowania.
- **Użytkownicy** - pojedynczy użytkownicy, wyszukiwani po adresie e-mail. To jedyne miejsce z celowaniem w pojedynczych użytkowników.
- **Grupy** - członkowie są rozwiązywani w momencie zastosowania. Uwaga: grupy zagnieżdżone **nie** są tutaj rozwijane (inaczej niż w przypisaniach z opcją **+ podgrupy**).
- **OU** - po ścieżce, z polem wyboru **wraz z pod-OU**.
- **Aliasy** - konkretne adresy send-as (do 50). Każdy jest dopasowywany do właściciela skrzynki i podpisywany tylko wtedy, gdy jest zaakceptowanym aliasem send-as; `{{email}}` / `{{domain}}` renderują się z aliasu.

Wysłanie przekierowuje do widoku zadania na żywo.

> [!NOTE]
> Jednorazowe zastosowanie zapisuje podpis **raz**. Jeśli użytkownik jest objęty przypisaniem albo wyborem self-service, najbliższa codzienna synchronizacja nadpisze wynik jednorazowego zastosowania zgodnie z [regułami pierwszeństwa](/docs/assignments/#how-precedence-works).

## Obserwowanie zadania

Widok zadania pod adresem `app.signature.cat/jobs/{id}` aktualizuje się na żywo w trakcie działania zadania: status, postęp i tabela wyników per użytkownik z kodami błędów. Zakończone zadania trafiają też na listę [Logi zadań](https://app.signature.cat/assignments/logs). **Ponów nieudane** ponawia wyłącznie nieudane wiersze.

Statusy i kody błędów są opisane w [Zweryfikuj zadanie przypisania](/docs/verify-assignments/#job-statuses).

## Jak szybko widać zmiany?

Ręczne zastosowania i zapisy self-service są niemal natychmiastowe (od sekund do kilku minut przy dużych celach). Zmiany w przypisaniach zaczynają obowiązywać przy najbliższej codziennej synchronizacji, chyba że klikniesz **Synchronizuj teraz**. Gmail pokazuje nowy podpis przy następnym tworzeniu wiadomości - wysłane już e-maile nigdy się nie zmieniają.
