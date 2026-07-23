---
title: Faktury
navTitle: Faktury
description: Jak działają rozliczenia SignatureCat - progi cenowe, 7-dniowy okres próbny, dokąd wysyłane są faktury i jak ustawić dedykowany e-mail do faktur.
updated: 2026-07-17
---

# Faktury

SignatureCat rozlicza się miesięcznie za aktywnego użytkownika Workspace, przez Stripe. Faktury i potwierdzenia są wysyłane na Twój adres **e-mail do faktur**, który możesz skierować na skrzynkę księgowości niezależnie od jakiegokolwiek konta administratora. Faktury za dany miesiąc są wystawiane najpóźniej **10. dnia następnego miesiąca**.

## Cennik

Cennik jest progowy per użytkownik - każdy przedział ma własną stawkę, a większe workspace'y płacą średnio mniej:

| Liczba użytkowników Workspace | Cena za użytkownika / miesiąc |
|---|---|
| 1 - 50 | 0,80 USD |
| 51 - 120 | 0,70 USD |
| 121 - 300 | 0,60 USD |
| 301+ | 0,55 USD |

Na przykład 60 użytkowników kosztuje 50 x 0,80 USD + 10 x 0,70 USD = 47,00 USD miesięcznie. Ceny są w USD i nie zawierają podatku.

**Co liczy się jako rozliczany użytkownik:** liczba aktywnych (niezawieszonych) użytkowników w katalogu Twojego Google Workspace - nie liczba logowań do SignatureCat. Wzrost liczby użytkowników jest odzwierciedlany od razu z rozliczeniem proporcjonalnym; gdy zatrudnienie spada, niższa liczba obowiązuje od następnego okresu rozliczeniowego.

## 7-dniowy okres próbny

Każdy workspace zaczyna od 7-dniowego bezpłatnego okresu próbnego. Karta jest pobierana przy rejestracji, a pierwsze obciążenie następuje po zakończeniu okresu próbnego. W ostatnich 3 dniach okresu próbnego aplikacja pokazuje baner przypominający, a około 3 dni przed końcem dostajesz też e-mail „Twój okres próbny signature.cat wkrótce się kończy".

> [!NOTE]
> Okres próbny jest przyznawany **raz na domenę Workspace**. Usunięcie konta i ponowna rejestracja tej samej domeny nie rozpoczyna nowego okresu próbnego.

## Ustaw e-mail do faktur

1. Otwórz [Ustawienia](https://app.signature.cat/settings) (tylko Admin) i znajdź sekcję **Płatności**.
2. Wpisz adres w polu **E-mail do faktur** - „Na ten adres Stripe wysyła faktury i potwierdzenia płatności. Może być inny niż e-mail konta administratora." - i kliknij **Zapisz**.

Użyj tego, aby kierować dokumenty prosto do księgowości (na przykład `invoices@yourcompany.com`). Produktowe alerty związane z rozliczeniami (kończący się okres próbny, nieudana płatność) są osobne i trafiają do administratorów - zobacz [Powiadomienia](/docs/notifications/).

## Dane firmy na fakturze

Prawna nazwa firmy, adres rozliczeniowy i identyfikator podatkowy (VAT / NIP) są przechowywane wyłącznie w Stripe i drukowane na każdej fakturze wystawionej po ich ustawieniu. Podajesz je przy pierwszej płatności i możesz edytować w dowolnym momencie - zobacz [Dane rozliczeniowe](/docs/billing-details/). Zmiany obowiązują dla przyszłych faktur; już wystawione faktury są niezmienne.

## Co się dzieje, gdy płatność się nie powiedzie?

Nieudane obciążenie **nie** odcina dostępu od razu. Dostajesz e-mail „Wymagane działanie - płatność signature.cat nie powiodła się" i czerwony baner w aplikacji, a także krótkie okno karencji (do 3 dni) na aktualizację karty przez **Zarządzaj płatnościami** na stronie [Płatności](https://app.signature.cat/billing). Jeśli okno minie bez udanego obciążenia, zarządzanie podpisami jest wstrzymywane do czasu udanej płatności - Twoje podpisy Gmail zostają, jak są, ale zmiany i synchronizacje się zatrzymują.
