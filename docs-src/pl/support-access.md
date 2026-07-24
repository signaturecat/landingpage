---
title: Dostęp dla supportu
navTitle: Dostęp dla supportu
description: Pozwól supportowi SignatureCat wprowadzać zmiany na Twoim koncie, gdy Ci pomaga - co odblokowuje przełącznik, gdzie go znaleźć i jak każde działanie trafia do dziennika aktywności.
updated: 2026-07-19
---

# Dostęp dla supportu

Domyślnie support SignatureCat **nie może niczego zmienić na Twoim koncie**. Jeśli chcesz, aby nasz zespół pomógł Ci w praktyce - na przykład podczas wdrożenia albo przy tropieniu źle zachowującego się przypisania - Admin może nadać to uprawnienie jednym przełącznikiem i równie łatwo je odebrać.

## Gdzie jest przełącznik

Wejdź w [Ustawienia](https://app.signature.cat/settings) i znajdź sekcję **Dostęp dla supportu**. Widzą ją wyłącznie użytkownicy z poziomem dostępu **Admin**. Włącz przełącznik, aby zezwolić na zmiany, wyłącz, aby znów je zablokować - zmiana działa natychmiast.

## Co odblokowuje

Z **włączonym** dostępem dla supportu nasz zespół może korygować te obszary Twojego konta, przy których zwykle pomaga:

| Obszar | Przykłady |
|---|---|
| Szablony podpisów | Naprawa zepsutego HTML, poprawki zmiennych |
| Przypisania | Zmiana celu grupy lub OU, zmiana przypisanego szablonu |
| Dostęp użytkowników | Dodawanie lub korygowanie grantów dostępu |
| E-mail do faktur | Poprawa adresu, na który przychodzą faktury |

Z **wyłączonym** przełącznikiem support nadal może *czytać* dane konta potrzebne do diagnozy problemu (logi zadań, konfigurację), ale każda zmiana jest odrzucana przez system - a nie tylko ukrywana w interfejsie.

## Na co nigdy nie pozwala

Niezależnie od przełącznika pracownicy SignatureCat nie mogą:

- logować się jako Ty ani żaden z Twoich użytkowników;
- zmieniać ani anulować Twojej subskrypcji, ani naliczać opłat;
- usunąć Twojego konta;
- czytać skrzynek Twojej organizacji (usługa zapisuje wyłącznie ustawienia podpisu Gmail - zobacz [Domain-Wide Delegation](/docs/domain-wide-delegation));
- sięgać do przechowywanych sekretów ani poświadczeń.

## Wszystko zostaje odnotowane

Przejrzystość jest wbudowana:

- Włączenie i wyłączenie przełącznika jest zapisywane w dzienniku aktywności Twojego konta, a pozostali Administratorzy dostają powiadomienie w aplikacji, gdy dostęp dla supportu zostaje włączony.
- Każda zmiana wykonana przez nasz zespół pojawia się w dzienniku aktywności w [Ustawieniach](https://app.signature.cat/settings) jako imię i nazwisko pracownika z dopiskiem „(SignatureCat Support)" - to ten sam ślad, do którego trafiają zmiany Twoich własnych administratorów.
- Te wpisy są częścią danych Twojego konta, więc są uwzględniane w eksportach danych.

> [!TIP]
> Włącz dostęp dla supportu na czas trwania zgłoszenia i wyłącz go po jego zamknięciu. Nic się nie psuje, gdy zostaje wyłączony - ogranicza jedynie to, co nasz zespół może zrobić dla Ciebie w praktyce.

Mechanizm jest opisany w [Regulaminie i Polityce prywatności](/legal) (dostęp serwisowy za zgodą Klienta).
