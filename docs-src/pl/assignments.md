---
title: Przypisania
navTitle: Przypisania
description: Referencja przypisań SignatureCat - rodzaje celów, pierwszeństwo gdy użytkownik pasuje do kilku przypisań, tryby aliasów i obsługa konfliktów.
updated: 2026-07-17
---

# Przypisania

Przypisanie wiąże jeden szablon z jednym celem i utrzymuje go zastosowanym dzięki codziennej synchronizacji. Ta strona to referencja działania celów, pierwszeństwa i aliasów; przewodnik krok po kroku znajdziesz w [Przypisz szablony](/docs/assign-templates/). Przypisaniami zarządzają użytkownicy z poziomami Editor i Admin pod adresem [app.signature.cat/assignments](https://app.signature.cat/assignments).

## Rodzaje celów

| Cel | Wartość | Opcja zakresu |
|---|---|---|
| Grupa | Adres email grupy | **+ podgrupy** obejmuje członków grup zagnieżdżonych. |
| OU | Ścieżka zaczynająca się od `/`, na przykład `/Engineering` | **+ pod-OU** obejmuje całe poddrzewo. |
| Wszyscy | Wszyscy aktywni użytkownicy w Workspace | Maksymalnie **jedno** takie przypisanie na workspace. |

Każdy cel może mieć tylko jedno przypisanie - utworzenie duplikatu jest odrzucane z komunikatem „Wskazany cel ma już przypisanie." Rodzaj celu jest stały po utworzeniu; aby zamienić przypisanie grupy na przypisanie OU, usuń je i utwórz na nowo.

Pojedynczy użytkownicy celowo nie są celem przypisań - pojedyncze osoby obejmiesz przez [self-service](/docs/self-service/) albo jednorazowe [zadanie zastosowania](/docs/apply-jobs/).

## Jak działa pierwszeństwo

Użytkownicy często pasują do kilku przypisań. Każda synchronizacja wyznacza dokładnie **jednego zwycięzcę per użytkownik**, warstwa po warstwie, od dołu do góry:

1. **Wszyscy** - warstwa bazowa dla każdego aktywnego użytkownika.
2. **Przypisania OU** nadpisują przypisanie dla wszystkich dla użytkowników w danym OU.
3. **Przypisania grup** nadpisują szablon OU dla swoich członków. Jeśli użytkownik należy do wielu przypisanych grup, wygrywa przypisanie **ostatnio zaktualizowane**.
4. **Self-service** - własny wybór użytkownika wygrywa z każdym przypisaniem, **chyba że** zwycięskie przypisanie ma włączone **Nadpisuj self-service**.

Gdy przypisanie wypiera inne dla danego użytkownika, wiersz wyniku zadania odnotowuje to („nadpisano N innych przypisań dla tego użytkownika"), więc konflikty możesz audytować na stronach [logów](/docs/logs/).

> [!TIP]
> Sprawdzony wzorzec: jedno przypisanie dla wszystkich jako firmowy domyślny podpis, przypisania OU per kraj lub marka, przypisania grup dla wyjątków (kampania sprzedażowa, zarząd). Warstwy załatwiają resztę.

## Tryby aliasów

Każde przypisanie ma ustawienie **Aliasy**, które decyduje, na które adresy trafia podpis. Zapisywanie aliasów wymaga opcjonalnego zakresu `gmail.settings.sharing` - zobacz [Domain-Wide Delegation](/docs/domain-wide-delegation/#what-exactly-do-i-authorize).

| Tryb | Zachowanie |
|---|---|
| **Wyłączone** (domyślnie) | Podpis trafia tylko na adres główny każdego użytkownika. Aliasy send-as pozostają nietknięte. |
| **Adresy z grupy** | Tylko przypisania grup. Podpis trafia dokładnie na adresy wymienione w grupie: członek dodany aliasem dostaje go tylko na tym aliasie, a dodany adresem głównym - tylko na adresie głównym. Aliasy spoza grupy nigdy nie są zmieniane. |
| **Wszystkie aliasy** | Każdy użytkownik dostaje podpis na adresie głównym i na każdym posiadanym aliasie send-as. Posiadane aliasy, które nie są jeszcze skonfigurowane jako wpisy send-as, są najpierw tworzone. |

Uwagi o zachowaniu:

- W trybie **Wszystkie aliasy** adresy zewnętrzne i aliasy nieedytowalne nigdy nie są tworzone automatycznie; świeżo utworzony wpis send-as, który Gmail raportuje jako oczekujący na weryfikację, jest pomijany do czasu weryfikacji.
- `{{email}}` i `{{domain}}` rozwiązują się do zapisywanego **aliasu**, więc podpisy aliasów pokazują właściwy adres. Wszystkie pozostałe zmienne pochodzą z rekordu właściciela skrzynki.
- Każdy zapis aliasu dostaje własny wiersz w wynikach zadania, więc [weryfikacja](/docs/verify-assignments/) pokazuje dokładnie, które adresy zostały podpisane, a które pominięte.
- Podpisy self-service są zawsze stosowane również na zaakceptowanych aliasach użytkownika.

## Nadpisuj self-service

Przełącznik **Nadpisuj self-service**, ustawiany per przypisanie, sprawia, że przypisanie wygrywa z własnymi wyborami self-service użytkowników. Wiersz pokazuje wtedy odznakę „nadpisuje self-service". Używaj go dla podpisów krytycznych pod kątem zgodności (zastrzeżenia prawne), gdzie indywidualna personalizacja jest niedopuszczalna.

## Gdy cele znikają

Jeśli przypisana grupa lub OU zostanie usunięta w Google Workspace, najbliższa synchronizacja oznacza przypisanie odznaką „nie znaleziono w Workspace", pomija cel, powiadamia administratorów (w aplikacji + e-mailem, raz na serię niepowodzeń) i ponawia próbę przy kolejnych synchronizacjach. Popraw cel w panelu edycji albo usuń przypisanie. Zobacz [Zweryfikuj zadanie przypisania](/docs/verify-assignments/#what-the-per-user-rows-tell-you).

## Edycja i usuwanie

Wiersze edytuje się w miejscu (szablon, wartość celu, zakres, tryb aliasów, nadpisywanie). Usunięcie przypisania kończy zarządzanie objętymi nim użytkownikami - już zastosowane podpisy pozostają w Gmail, dopóki coś innego (inne przypisanie, self-service albo szablon domyślny) nie nadpisze ich przy późniejszej synchronizacji.
