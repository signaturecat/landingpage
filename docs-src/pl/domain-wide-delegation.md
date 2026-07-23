---
title: Domain-Wide Delegation
navTitle: Domain-Wide Delegation
description: Jak SignatureCat korzysta z Google Domain-Wide Delegation - zakresy, Client ID per klient, propagacja, wykrywanie odebrania dostępu i ponowne nadawanie.
updated: 2026-07-17
---

# Domain-Wide Delegation

Domain-Wide Delegation (DWD) to mechanizm Google Workspace, który pozwala dedykowanemu kontu usługi SignatureCat czytać Twój katalog i zapisywać podpisy Gmail - bez znajomości czyjegokolwiek hasła. Nadajesz go raz w Google Admin console; ta strona wyjaśnia dokładnie, co jest nadawane i jak zachowuje się w czasie.

Konfiguracja krok po kroku jest w [Połącz swój Google Workspace](/docs/connect-google-workspace/). To jest referencja.

## Co dokładnie autoryzuję?

Dodajesz **jednego klienta API** na [stronie Domain-wide delegation](https://admin.google.com/ac/owl/domainwidedelegation) w Admin console, identyfikowanego numerycznym **Client ID**, unikalnym dla Twojej organizacji (każdy klient SignatureCat ma własne, odizolowane konto usługi). Client ID jest pokazany w kreatorze DWD, a później w [Ustawieniach](https://app.signature.cat/settings), w sekcji Konto usługi.

Zakresy i przeznaczenie każdego z nich:

| Zakres | Wymagany | Używany do |
|---|---|---|
| `gmail.settings.basic` | Tak | Zapisywanie podpisu na adresie głównym każdego użytkownika. |
| `admin.directory.user.readonly` | Tak | Odczyt profili użytkowników - imion i nazwisk, stanowisk, telefonów - na potrzeby [zmiennych szablonów](/docs/template-variables/). |
| `admin.directory.group.member.readonly` | Tak | Rozwijanie przypisań grup do listy członków. |
| `admin.directory.customer.readonly` | Tak | Odczyt liczby użytkowników workspace na potrzeby rozliczeń. |
| `gmail.settings.sharing` | Opcjonalny | Zapisywanie podpisów na **aliasach** send-as. Pomiń go, a funkcje aliasów pozostaną wyłączone. |

SignatureCat nigdy nie prosi o zakresy treści poczty - nie może czytać ani wysyłać niczyich e-maili.

## Czy Client ID jest stały?

Tak. SignatureCat automatycznie rotuje klucze swojego konta usługi ze względów bezpieczeństwa, ale rotacja tworzy nowy klucz na **tym samym** koncie usługi - numeryczny Client ID nigdy się nie zmienia. Nigdy nie będziesz musieć ponownie autoryzować DWD z powodu rotacji kluczy.

## Jak szybko działa nowy grant?

Google propaguje zmiany DWD z opóźnieniem - zwykle sekundy, sporadycznie do około 30 sekund. Przycisk **Sprawdź** w kreatorze odczekuje ten czas, zanim zgłosi niepowodzenie, więc pojedyncze kliknięcie zwykle kończy się sukcesem zaraz po autoryzacji. Żółta karta z informacją o propagacji oznacza dokładnie to: odczekaj chwilę i sprawdź ponownie.

## Co się dzieje, gdy DWD zostanie usunięte lub zakres odebrany?

SignatureCat weryfikuje stan DWD przed każdą synchronizacją. Gdy coś się psuje:

- synchronizacje podpisów są **natychmiast wstrzymywane** (nic nie zostaje zastosowane połowicznie),
- administratorzy dostają w aplikacji powiadomienie „Utracono dostęp Domain-Wide Delegation" oraz e-mail „Wymagane działanie",
- aplikacja kieruje administratorów z powrotem do kreatora DWD.

Ponowne nadanie brakującego wpisu lub zakresu i zaliczenie **Sprawdź** wznawia wszystko - stan naprawia się sam, niczego nie trzeba odbudowywać. Aby otworzyć kreator w dowolnym momencie, użyj **Uruchom ponownie kreator DWD** w [Ustawieniach](https://app.signature.cat/settings), w sekcji Konto usługi.

> [!WARNING]
> Grant DWD obowiązuje w całej organizacji, a jego usunięcie zatrzymuje zarządzanie podpisami w całym workspace naraz. Jeśli chcesz tylko zrezygnować z obsługi aliasów, usuń wyłącznie zakres `gmail.settings.sharing` i ponownie uruchom **Sprawdź**.

## Dodanie opcjonalnego zakresu aliasów później

Dodaj `https://www.googleapis.com/auth/gmail.settings.sharing` do istniejącego wpisu w Admin console (zachowaj pozostałe cztery zakresy), potem użyj **Uruchom ponownie kreator DWD** i kliknij **Sprawdź**. Funkcje aliasów odblokują się automatycznie - zobacz [tryby aliasów](/docs/assignments/#alias-modes).

## Usuwanie SignatureCat

Gdy usuwasz konto, SignatureCat usuwa własną infrastrukturę, ale nie może edytować Twojej Admin console: **usuń wpis klienta API samodzielnie** na [stronie Domain-wide delegation](https://admin.google.com/ac/owl/domainwidedelegation) po zniknięciu konta.
