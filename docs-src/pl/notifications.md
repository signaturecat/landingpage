---
title: Powiadomienia
navTitle: Powiadomienia
description: Które alerty SignatureCat przychodzą e-mailem, a które pojawiają się w aplikacji - utrata DWD, brakujące cele przypisań, zdarzenia okresu próbnego i płatności.
updated: 2026-07-17
---

# Powiadomienia

SignatureCat powiadamia Cię dwoma kanałami: **e-mailem** o zdarzeniach na poziomie konta wymagających działania oraz **dzwonkiem powiadomień w aplikacji** o alertach operacyjnych. E-maile trafiają do administratorów (i właściciela konta); dzwonek widzą użytkownicy z poziomami Admin i Editor.

## Co przychodzi e-mailem?

| E-mail | Kiedy jest wysyłany | Kto go otrzymuje |
|---|---|---|
| Witaj w signature.cat | Pierwsze logowanie nowego użytkownika | Nowy użytkownik |
| Masz teraz dostęp do signature.cat | Administrator nadaje użytkownikowi dostęp w [Zarządzaniu dostępem](https://app.signature.cat/user-management) | Użytkownik z nadanym dostępem |
| Twój okres próbny signature.cat rozpoczął się | Początek okresu próbnego | Administratorzy + właściciel |
| Twój okres próbny signature.cat wkrótce się kończy | Około 3 dni przed końcem okresu próbnego | Administratorzy + właściciel |
| Twój plan signature.cat jest aktywny | Pierwsze udane obciążenie po okresie próbnym | Administratorzy + właściciel |
| Wymagane działanie - płatność signature.cat nie powiodła się | Obciążenie nie powiodło się (rusza okno karencji) | Administratorzy + właściciel |
| Cel przypisania signature.cat już nie istnieje | Przypisana grupa lub OU została usunięta w Workspace | Administratorzy + właściciel |
| Wymagane działanie - signature.cat utracił dostęp do Workspace (DWD) | Domain-Wide Delegation przestało działać lub odebrano wymagany zakres | Administratorzy + właściciel |

E-maile alertowe są deduplikowane (najwyżej jeden na temat dziennie) i wysyłane tylko przy przejściu w stan awarii, a nie przy każdej kolejnej próbie.

> [!NOTE]
> Te e-maile produktowe są czymś innym niż **faktury i potwierdzenia** Stripe, które trafiają na adres [e-mail do faktur](/docs/invoices/#set-the-invoice-email). Użytkownicy z poziomami Editor i Designer nie otrzymują e-maili alertowych - tylko powiadomienia w aplikacji.

## Co pojawia się w aplikacji?

Ikona dzwonka w górnej nawigacji (poziomy Admin i Editor) zbiera powiadomienia operacyjne; nieprzeczytane pokazują plakietkę, a każdy wpis można odrzucić.

| Powiadomienie w aplikacji | Waga | Wyzwalacz |
|---|---|---|
| Utracono dostęp Domain-Wide Delegation | Błąd | DWD lub wymagany zakres przestały działać; synchronizacje są wstrzymane, dopóki administrator ponownie nie przejdzie [kreatora DWD](/docs/domain-wide-delegation/#what-happens-if-dwd-is-removed-or-a-scope-revoked). |
| Grupa / OU już nie istnieje | Ostrzeżenie | [Cel przypisania](/docs/assignments/#when-targets-disappear) zniknął; worker ponowi próbę przy następnej synchronizacji. |
| Użytkownicy bez podpisu self-service | Ostrzeżenie | Użytkownicy self-service, którzy nie wybrali jeszcze szablonu (najwyżej raz na 7 dni). |
| Okres próbny wkrótce się kończy | Ostrzeżenie | Około 3 dni przed końcem okresu próbnego. |
| Płatność nie przeszła | Błąd | Obciążenie nie powiodło się; trwa okno karencji. |

Poza dzwonkiem w aplikacji mogą pojawić się dwa banery: bursztynowy **baner okresu próbnego** w jego ostatnich dniach oraz czerwony **baner płatności** („Zaktualizuj kartę do {date}, inaczej zarządzanie podpisami zostanie wstrzymane") w oknie karencji płatności.

## Zalecana konfiguracja

- Zadbaj, aby co najmniej jedna regularnie czytana skrzynka miała poziom **Admin** - e-maile alertowe trafiają wyłącznie do administratorów i właściciela. Zobacz [Zarządzanie dostępem](/docs/user-management/).
- Skieruj [e-mail do faktur](/docs/invoices/#set-the-invoice-email) do księgowości, aby dokumenty nigdy nie zależały od skrzynki administratora.
- Obserwuj [status.signature.cat](https://status.signature.cat/) pod kątem incydentów na poziomie platformy - zobacz [Status usługi](/docs/service-status/).
