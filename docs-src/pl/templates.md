---
title: Szablony
navTitle: Szablony
description: Referencja szablonów SignatureCat - edytor HTML, startery, podgląd, testowe zastosowanie, przełącznik self-service, szablon domyślny i bezpieczne usuwanie.
updated: 2026-07-17
---

# Szablony

Szablon to pojedynczy dokument HTML z tokenami `{{variable}}`, który SignatureCat renderuje per użytkownik. Szablony mieszkają na stronie [Podpisy](https://app.signature.cat/signatures) (poziomy Designer, Editor i Admin) i są edytowane w edytorze kodu z podglądem na żywo.

Prowadzony pierwszy przebieg znajdziesz w [Utwórz swój pierwszy szablon](/docs/create-your-first-template/). Zestaw zmiennych ma własną stronę: [Zmienne szablonów](/docs/template-variables/).

## Edytor

Edytor pod `app.signature.cat/signatures/{id}` jest **HTML-first**: edytujesz kod podpisu bezpośrednio, z autouzupełnianiem wszystkich tokenów `{{variable}}`. Obok panelu kodu masz:

- **Podgląd** - renderowanie rozwiązanego podpisu na żywo, w piaskownicy. **Renderuj jako** podstawia rekord Directory dowolnego prawdziwego użytkownika, więc sprawdzisz przypadki brzegowe (długie nazwiska, brakujące numery telefonów).
- **Wstaw zmienną** - menu wszystkich zmiennych osobowych, pogrupowanych z podpowiedziami.
- **Logo / Baner** - galerie obrazków per rodzaj; zobacz [Banery i logo](/docs/banners-and-logos/).
- **Owiń w {{del}} / Owiń w {{delete}}** - opakowuje bieżące zaznaczenie w tagi warunkowe.
- **Ustaw mi testowy podpis** - renderuje na podstawie Twojego rekordu Directory i stosuje wyłącznie do Twojej skrzynki Gmail.
- **Nazwa i ikona** - etykieta, ikona i kolor pokazywane na listach szablonów (nigdy nie renderowane do podpisów).

## Walidacja i sanityzacja

Zapis waliduje szablon i odrzuca:

- nieznane tokeny (wszystko, co nie jest znaną zmienną, tokenem obrazka ani tagiem warunkowym),
- niezbalansowane pary `{{del}}` / `{{delete}}`.

HTML jest sanityzowany przy zapisie: skrypty, iframe'y, handlery zdarzeń (`onclick=` i podobne) oraz adresy `javascript:` są usuwane. Podpisy są z natury statycznym HTML - Gmail i tak usunąłby aktywną zawartość.

> [!TIP]
> Podpisy Gmail renderują się najlepiej z układami opartymi na tabelach i stylami inline. Unikaj zewnętrznych plików CSS i web fontów; większość klientów poczty je ignoruje.

## Szablon domyślny

Jeden szablon może być oznaczony jako **Domyślny**. Użytkownicy nieobjęci żadnym [przypisaniem](/docs/assignments/) ani wyborem [self-service](/docs/self-service/) wracają do niego - podobnie jak użytkownicy, których przypisanie zostało usunięte.

## Przełącznik self-service

Każdy szablon ma przełącznik self-service decydujący, czy użytkownicy końcowi mogą go wybrać na stronie [Mój podpis](https://app.signature.cat/self-service). Wyłączenie go czyści wybory self-service, które z niego korzystają (z potwierdzeniem). Szczegóły: [Self-service](/docs/self-service/).

## Usuwanie szablonu

Usunięcie nieużywanego szablonu po prostu go usuwa. Usunięcie szablonu, który jest **w użyciu**, pokazuje najpierw okno kaskady, wyliczające dokładnie, co odchodzi razem z nim:

- jego przypisania grup i OU,
- wybory self-service dokonane przez użytkowników,
- zakolejkowane zadania zastosowania (anulowane).

> [!WARNING]
> Potwierdzenie przyciskiem **Usuń mimo to** trwale usuwa szablon razem z jego przypisaniami i wyborami self-service. Objęci nimi użytkownicy wrócą do szablonu domyślnego przy następnej synchronizacji. Tej operacji nie można cofnąć.
