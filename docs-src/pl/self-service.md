---
title: Podpisy self-service
navTitle: Self-service
description: Pozwól użytkownikom wybrać i zastosować własny podpis Gmail z zatwierdzonych przez administratora szablonów SignatureCat - konfiguracja, przebieg i reguły pierwszeństwa.
updated: 2026-07-17
---

# Podpisy self-service

Self-service pozwala każdemu użytkownikowi wybrać własny podpis spośród zatwierdzonych przez Ciebie szablonów i natychmiast zastosować go do własnej skrzynki - bez dotykania czyjejkolwiek innej. Użytkownicy znajdą go w sekcji **Mój podpis** pod adresem [app.signature.cat/self-service](https://app.signature.cat/self-service).

## Co konfiguruje administrator

Self-service udostępniają dwa przełączniki:

1. **Włącz szablony do self-service.** Na stronie [Podpisy](https://app.signature.cat/signatures) włącz self-service dla każdego szablonu, który użytkownicy mogą wybierać. Tylko te szablony są widoczne na stronie self-service.
2. **Nadaj użytkownikom dostęp.** W [Zarządzaniu dostępem](https://app.signature.cat/user-management) nadaj użytkownikom lub grupom poziom **Self-service** (albo **Self-service + edycja**, aby pozwolić też na własny kod HTML). Zobacz [Zarządzanie dostępem](/docs/user-management/) - w tym ostrzeżenie o grantach grupowych obejmujących przyszłych członków.

> [!WARNING]
> Wyłączenie self-service na szablonie czyści wybory każdego użytkownika, który go wybrał, a ich oczekujące zadania są anulowane. Aplikacja najpierw prosi o potwierdzenie.

## Co robi użytkownik

1. Loguje się na [app.signature.cat](https://app.signature.cat) i otwiera **Mój podpis**.
2. Wybiera **Szablon organizacji** z listy. Podgląd na żywo renderuje się na podstawie danych Directory tego użytkownika.
3. Użytkownicy z poziomem edycji mogą przełączyć się na **Własny HTML** i dostosować kod, z tymi samymi dostępnymi [zmiennymi](/docs/template-variables/); **Przywróć szablon** przywraca oryginał.
4. Klika **Zapisz podpis**. Podpis jest stosowany do skrzynki użytkownika od razu („Zapisano - zastosowano w Twojej skrzynce"), łącznie z jego zaakceptowanymi aliasami send-as.

Jeśli lista jest pusta, żaden szablon nie ma jeszcze włączonego self-service: „Twoja organizacja nie opublikowała jeszcze żadnych szablonów self-service. Poproś administratora o włączenie szablonu."

## Jak self-service współgra z przypisaniami

Wybór self-service użytkownika siedzi na **szczycie** drabiny pierwszeństwa: wygrywa z przypisaniami grup, OU i przypisaniem dla wszystkich. Jedyny wyjątek to przypisanie z włączonym **Nadpisuj self-service**, które odwraca tę regułę dla objętych nim użytkowników. Szczegóły: [Przypisania](/docs/assignments/#how-precedence-works).

> [!NOTE]
> Użytkownicy self-service mogą ustawić wyłącznie **własny** podpis. Widzą tylko te szablony, które włączysz - nigdy dane innych użytkowników ani strony administracyjne.
