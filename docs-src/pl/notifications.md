---
title: Powiadomienia
navTitle: Powiadomienia
description: Które alerty SignatureCat przychodzą e-mailem, a które pojawiają się w aplikacji - dostęp do Google Workspace, cele przypisań, obrazki, płatności.
updated: 2026-08-02
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
| Usunięto logo używane w Twoich podpisach | Obrazek z biblioteki został usunięty, gdy szablony wciąż go używały; dla banerów temat brzmi "Usunięto baner używany w Twoich podpisach" | Administratorzy + właściciel |

E-maile alertowe są deduplikowane (najwyżej jeden na temat dziennie) i wysyłane tylko przy przejściu w stan awarii, a nie przy każdej kolejnej próbie. E-mail o usuniętym obrazku rządzi się własną regułą: jeden e-mail na usunięty obrazek i odbiorcę, więc porządki w bibliotece nigdy nie zalewają skrzynki.

> [!NOTE]
> Te e-maile produktowe są czymś innym niż **faktury i potwierdzenia** Stripe, które trafiają na adres [e-mail do faktur](/docs/invoices#ustaw-e-mail-do-faktur). Użytkownicy z poziomami Editor i Designer nie otrzymują e-maili alertowych - tylko powiadomienia w aplikacji.

## Co pojawia się w aplikacji?

Ikona dzwonka w górnej nawigacji (poziomy Admin i Editor) zbiera powiadomienia operacyjne; nieprzeczytane pokazują plakietkę, a każdy wpis można odrzucić.

| Powiadomienie w aplikacji | Waga | Wyzwalacz |
|---|---|---|
| Utracono dostęp Domain-Wide Delegation | Błąd | DWD lub wymagany zakres przestały działać; synchronizacje są wstrzymane, dopóki administrator ponownie nie przejdzie [kreatora DWD](/docs/domain-wide-delegation#co-si-dzieje-gdy-dwd-zostanie-usunite-lub-zakres-odebrany). |
| Grupa / OU już nie istnieje | Ostrzeżenie | [Cel przypisania](/docs/assignments#gdy-cele-znikaj) zniknął; worker ponowi próbę przy następnej synchronizacji. |
| Użytkownicy bez podpisu self-service | Ostrzeżenie | Użytkownicy self-service, którzy nie wybrali jeszcze szablonu (najwyżej raz na 7 dni). |
| Usunięto logo lub baner używany przez Twoje podpisy | Ostrzeżenie | Ktoś usunął [obrazek z biblioteki](/docs/banners-and-logos#usuwanie-obrazkw), którego wciąż używał co najmniej jeden szablon; wpis nazywa osobę, która go usunęła, oraz szablony stosowane dalej z placeholderem. |
| Włączono dostęp dla supportu | Informacja | Administrator włączył przełącznik [Dostępu dla supportu](/docs/support-access); wpis nazywa osobę, która na to zezwoliła. |
| Okres próbny wkrótce się kończy | Ostrzeżenie | Około 3 dni przed końcem okresu próbnego. |
| Płatność nie przeszła | Błąd | Obciążenie nie powiodło się; trwa okno karencji. |

Poza dzwonkiem w aplikacji mogą pojawić się trzy banery: bursztynowy **baner okresu próbnego** w jego ostatnich dniach, czerwony **baner płatności** ("Zaktualizuj kartę do {date}, inaczej zarządzanie podpisami zostanie wstrzymane") w oknie karencji płatności oraz czerwony **baner dostępu do Workspace** ("Ostatnia weryfikacja dostępu do Google Workspace nie powiodła się. Synchronizacja podpisów jest wstrzymana do czasu naprawy dostępu.").

Baner dostępu do Workspace widzą wyłącznie administratorzy, bo tylko oni mogą to naprawić, i pojawia się dopiero wtedy, gdy weryfikacja naprawdę się nie powiodła - nigdy tylko dlatego, że jest stara albo że jej brakuje. Wbudowany przycisk **Sprawdź dostęp teraz** uruchamia weryfikację dostępu od razu: jeśli przejdzie, baner znika; jeśli znowu się nie powiedzie, trafiasz do kreatora DWD, do którego baner linkuje też wprost jako **Otwórz kreator DWD**. Zobacz [Domain-Wide Delegation](/docs/domain-wide-delegation).

## Zalecana konfiguracja

- Zadbaj, aby co najmniej jedna regularnie czytana skrzynka miała poziom **Admin** - e-maile alertowe trafiają wyłącznie do administratorów i właściciela. Zobacz [Zarządzanie dostępem](/docs/user-management).
- Skieruj [e-mail do faktur](/docs/invoices#ustaw-e-mail-do-faktur) do księgowości, aby dokumenty nigdy nie zależały od skrzynki administratora.
- Obserwuj [status.signature.cat](https://status.signature.cat/) pod kątem incydentów na poziomie platformy - zobacz [Status usługi](/docs/service-status).
