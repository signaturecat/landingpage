---
title: Zweryfikuj zadanie przypisania
navTitle: Weryfikuj zadania przypisań
description: Sprawdź, czy zadanie podpisów SignatureCat powiodło się w Google Workspace - statusy zadań, wyniki per użytkownik, kody błędów i odczyt skrzynki Gmail na żywo.
updated: 2026-08-02
---

# Zweryfikuj zadanie przypisania

Każda synchronizacja i każde ręczne zastosowanie działa jako zadanie z wynikiem per użytkownik, który możesz przejrzeć. Najszybszym sprawdzeniem jest strona [Logi zadań](https://app.signature.cat/logs); działające zadanie ma też własny widok szczegółów pod `app.signature.cat/jobs/{id}`, aktualizowany w czasie rzeczywistym.

## Sprawdź logi zadań

Otwórz [Logi zadań](https://app.signature.cat/logs) (poziomy Editor i Admin). Każdy wiersz to jedno zakończone zadanie - **Synchronizacja przypisań** albo **Ręczne zastosowanie** - ze statusem, czasem rozpoczęcia i zakończenia, informacją, kto je uruchomił ("Automatycznie" dla codziennej synchronizacji), i podsumowaniem w rodzaju "42 udanych, 1 nieudanych, 2 pominiętych".

Rozwiń wiersz, aby zobaczyć szczegóły per użytkownik, albo kliknij **Otwórz pełny widok zadania**, aby zobaczyć kompletną tabelę wyników.

Po zakończeniu zadania pełny widok pokazuje też panel **Szczegóły realizacji**: **Zaktualizowane adresy główne**, **Zaktualizowane aliasy send-as**, **Przetworzone grupy** (z liczbą podgrup, jeśli przypisanie je obejmowało), **Przetworzone jednostki organizacyjne (OU)**, a dla celu obejmującego cały Workspace - liczbę użytkowników, do których się rozwinął. Dzięki niemu potwierdzisz, że zadanie objęło oczekiwaną grupę osób.

> [!NOTE]
> Logi zadań są przechowywane przez ograniczony czas (domyślnie ostatnie 30 dni), a starsze wpisy są usuwane automatycznie. Sprawdzaj zadania wkrótce po dużych wdrożeniach.

## Statusy zadań

| Status | Znaczenie |
|---|---|
| W kolejce | Czeka, aż worker je odbierze. |
| Trwa | W toku - strona szczegółów aktualizuje się na żywo. |
| Powodzenie | Każdy objęty użytkownik dostał podpis. |
| Częściowe | Część użytkowników się powiodła, część nie lub została pominięta - przejrzyj wiersze. |
| Niepowodzenie | Zadanie nie zostało ukończone. Zadanie tkwiące w statusie Trwa ponad 30 minut jest automatycznie oznaczane jako Niepowodzenie. |
| Anulowane | Anulowane przed uruchomieniem (na przykład szablon usunięto z oczekującymi zadaniami). |

## Co mówią wiersze per użytkownik

Każdy wiersz pokazuje zapisany adres (wiersze aliasów mają odznakę "alias"), status i kod błędu, gdy coś poszło nie tak. Najczęstsze:

- **TARGET_NOT_FOUND** - przypisana grupa lub OU już nie istnieje w Workspace (usunięta albo błędny identyfikator). Cel został pominięty, administratorzy dostają powiadomienie, a wiersz przypisania pokazuje odznakę "nie znaleziono w Workspace". Popraw lub usuń przypisanie na stronie [Przypisania](https://app.signature.cat/assignments).
- **USER_NOT_FOUND** - użytkownik już nie istnieje w katalogu.
- **ALIAS_SCOPE_MISSING** - podpisy aliasów wymagają opcjonalnego zakresu `gmail.settings.sharing`, który nie został nadany. Zobacz [Połącz swój Google Workspace](/docs/connect-google-workspace#krok-4-autoryzuj-domain-wide-delegation).
- **DWD_NOT_CONFIGURED / DWD_SCOPE_MISSING** - Domain-Wide Delegation nie działa albo brakuje zakresu. Uruchom ponownie kreator z [Ustawień](https://app.signature.cat/settings). Zobacz [Domain-Wide Delegation](/docs/domain-wide-delegation).
- **RATE_LIMITED** - Google ograniczył tempo zapytań; worker automatycznie ponawia próby, zanim pokaże ten kod.

Jeden kod jest ostrzeżeniem, a nie niepowodzeniem: **GMAIL_SIGNATURE_SANITIZED** siedzi na wierszach, które **się powiodły**, i pokazuje się jako bursztynowa odznaka **okrojony przez Gmail** z komunikatem "Podpis ustawiony, ale Gmail zapisał okrojoną wersję." Gmail przyjął zapis, a potem przepisał HTML w trakcie zapisywania, więc ponowienie zapisze dokładnie to samo. Naprawa polega na uproszczeniu oznaczonych znaczników - **Szczegóły techniczne** w wierszu nazywają utracone elementy - i ponownym przetestowaniu szablonu. Zobacz [Kiedy Gmail okraja Twój podpis](/docs/gmail-sanitization).

Wiersz może też nieść notkę "nadpisano N innych przypisań dla tego użytkownika" - użytkownik pasował do kilku przypisań i to właśnie wygrało. Reguły pierwszeństwa są w [referencji przypisań](/docs/assignments#jak-dziaa-pierwszestwo).

## Weryfikacja w samym Gmail

Najszybsze sprawdzenie to **Wyświetl aktualną stopkę** w udanym wierszu w [Logach zadań](https://app.signature.cat/logs): odczytuje skrzynkę Gmail tego użytkownika na żywo i pokazuje, co naprawdę jest w niej zapisane, łącznie z tym, co użytkownik zmienił ręcznie. Zobacz [Odczytaj aktualną stopkę ze skrzynki](/docs/logs#odczytaj-aktualn-stopk-ze-skrzynki).

Aby sprawdzić to w samym kliencie pocztowym, poproś objętego użytkownika o otwarcie ustawień Gmail i sprawdzenie podpisu albo wyślij do siebie wiadomość testową. Pamiętaj, że własny podpis [self-service](/docs/self-service) użytkownika wygrywa z przypisaniami, chyba że przypisanie go nadpisuje.

> [!TIP]
> Zakończone zadanie nie ma przycisku ponawiania. Gdy usuniesz już to, na co wskazuje kod błędu, wyślij nowe zastosowanie ze strony [Zastosuj](https://app.signature.cat/apply) tylko dla tych adresów - nie trzeba ponownie stosować podpisu u wszystkich.
