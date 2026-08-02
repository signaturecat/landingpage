---
title: Szablony
navTitle: Szablony
description: Jak działają szablony podpisów SignatureCat - edytory wizualny i HTML, podgląd na żywo, testowe zastosowanie w Gmailu, szablon domyślny i bezpieczne usuwanie.
updated: 2026-08-02
---

# Szablony

Szablon to pojedynczy dokument HTML z tokenami `{{variable}}`, który SignatureCat renderuje per użytkownik. Szablony mieszkają na stronie [Podpisy](https://app.signature.cat/signatures) (poziomy Designer, Editor i Admin) i są edytowane w [edytorze wizualnym](/docs/visual-editor) albo w edytorze kodu, oba z podglądem na żywo.

Każdy wpis na liście niesie swoją nazwę, ikonę i kolor, znacznik **Domyślny** tam, gdzie ma zastosowanie, oraz **Ostatnio edytowane przez** z osobą, która zmieniła go jako ostatnia - przydatne, gdy pracę dzieli kilku administratorów. **Duplikuj** tworzy niezależną kopię szablonu, więc wypróbujesz wariant bez ruszania oryginału.

Prowadzony pierwszy przebieg znajdziesz w [Utwórz swój pierwszy szablon](/docs/create-your-first-template). Zestaw zmiennych ma własną stronę: [Zmienne szablonów](/docs/template-variables).

## Edytor

Edytor pod `app.signature.cat/signatures/{id}` ma dwie karty i otwiera się w trybie, w którym szablon był ostatnio zapisany:

- **Wizualny** - projektowanie na kanwie bez pisania HTML: chipy zmiennych, uchwyty zmiany rozmiaru obrazków, kolumny, separatory, jednorazowe obrazki z adresu URL, czcionki i bezpieczna dla e-maili paleta kolorów. Ma [własną stronę](/docs/visual-editor).
- **HTML** - bezpośrednia edycja kodu podpisu, z autouzupełnianiem wszystkich tokenów `{{variable}}`.

Konwersja HTML na Wizualny działa w jedną stronę i nie zawsze jest bezstratna (złożone układy tabel są spłaszczane; edytor najpierw ostrzega); zapis z karty HTML odrzuca dokument wizualny. W obu trybach masz:

- **Podgląd** - renderowanie rozwiązanego podpisu na żywo, w piaskownicy. **Renderuj jako** podstawia rekord Directory dowolnego prawdziwego użytkownika, więc sprawdzisz przypadki brzegowe (długie nazwiska, brakujące numery telefonów), a sam podgląd potrafi naśladować pięć klientów poczty w trybie jasnym i ciemnym; zobacz [Podgląd w kliencie poczty](/docs/mail-client-preview).
- **Wstaw zmienną** - menu wszystkich zmiennych osobowych, pogrupowanych z podpowiedziami.
- **Logo / Baner** - galerie obrazków per rodzaj; zobacz [Banery i logo](/docs/banners-and-logos).
- **Owiń w {{del}} / Owiń w {{delete}}** - opakowuje bieżące zaznaczenie w tagi warunkowe.
- **Ustaw mi testowy podpis** - renderuje na podstawie Twojego rekordu Directory i stosuje wyłącznie do Twojej skrzynki Gmail. SignatureCat odczytuje potem z powrotem to, co Gmail faktycznie zapisał, więc podpis okrojony przez Gmaila przy zapisie zostaje zgłoszony, zamiast wyglądać na poprawny; zobacz [Gdy Gmail okrawa Twój podpis](/docs/gmail-sanitization).
- **Odrzuć zmiany** - pojawia się zawsze, gdy masz niezapisane zmiany, i przywraca ostatnio zapisaną wersję, po potwierdzeniu.
- **Nazwa i ikona** - etykieta, ikona i kolor pokazywane na listach szablonów (nigdy nie renderowane do podpisów).

## Walidacja i sanityzacja

Zapis waliduje szablon i odrzuca:

- nieznane tokeny (wszystko, co nie jest znaną zmienną, tokenem obrazka ani tagiem warunkowym),
- niezbalansowane pary `{{del}}` / `{{delete}}`.

Komunikaty błędów są konkretne: nieznany token jest wymieniany z nazwy, a niezbalansowane tagi warunkowe przychodzą z licznikami otwarć/zamknięć. Licznik na żywo śledzi gmailowy limit 10 000 znaków podpisu.

HTML jest sanityzowany przy zapisie: skrypty, iframe'y, handlery zdarzeń (`onclick=` i podobne) oraz adresy `javascript:` są usuwane. Podpisy są z natury statycznym HTML - Gmail i tak usunąłby aktywną zawartość.

Gmail sanityzuje po swojemu, na własnych serwerach, w momencie zapisywania podpisu: zapis może się udać, a Gmail i tak zachowa uproszczoną kopię skomplikowanego układu. SignatureCat porównuje jedno z drugim i mówi Ci, kiedy tak się stało - co z tym zrobić, opisuje [Gdy Gmail okrawa Twój podpis](/docs/gmail-sanitization).

> [!TIP]
> Podpisy Gmail renderują się najlepiej z układami opartymi na tabelach i stylami inline. Unikaj zewnętrznych plików CSS i web fontów; większość klientów poczty je ignoruje.

## Szablon domyślny

Jeden szablon może być oznaczony jako **Domyślny**. Użytkownicy nieobjęci żadnym [przypisaniem](/docs/assignments) ani wyborem [self-service](/docs/self-service) wracają do niego - podobnie jak użytkownicy, których przypisanie zostało usunięte.

## Przełącznik self-service

Każdy szablon ma przełącznik self-service decydujący, czy użytkownicy końcowi mogą go wybrać na stronie [Mój podpis](https://app.signature.cat/self-service). Wyłączenie go czyści wybory self-service, które z niego korzystają (z potwierdzeniem). Szczegóły: [Self-service](/docs/self-service).

## Usuwanie szablonu

Usunięcie nieużywanego szablonu po prostu go usuwa. Usunięcie szablonu, który jest **w użyciu**, pokazuje najpierw okno kaskady, wyliczające dokładnie, co odchodzi razem z nim:

- jego przypisania grup i OU,
- wybory self-service dokonane przez użytkowników,
- zakolejkowane zadania zastosowania (anulowane).

> [!WARNING]
> Potwierdzenie przyciskiem **Usuń mimo to** trwale usuwa szablon razem z jego przypisaniami i wyborami self-service. Objęci nimi użytkownicy wrócą do szablonu domyślnego przy następnej synchronizacji. Tej operacji nie można cofnąć.
