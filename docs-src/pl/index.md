---
title: Wprowadzenie
navTitle: Wprowadzenie
description: Czym jest SignatureCat i jak zarządza podpisami Gmail w całym Twoim Google Workspace - szablony, przypisania i automatyczna codzienna synchronizacja.
updated: 2026-07-17
---

# Dokumentacja SignatureCat

SignatureCat centralnie zarządza podpisami Gmail w całym Twoim Google Workspace. Projektujesz jeden szablon podpisu HTML ze zmiennymi, przypisujesz go użytkownikom przez grupy, jednostki organizacyjne lub cały workspace, a SignatureCat zapisuje spersonalizowany podpis do każdej skrzynki - i utrzymuje go aktualnym automatycznie.

Aplikacja działa pod adresem [app.signature.cat](https://app.signature.cat). Ta dokumentacja obejmuje wszystko: od pierwszej konfiguracji po codzienną referencję.

## Jak działa SignatureCat?

1. **Połącz swój Google Workspace.** Superadmin Workspace autoryzuje SignatureCat przez [Domain-Wide Delegation](/docs/domain-wide-delegation/), dzięki czemu może on czytać katalog użytkowników i zapisywać podpisy Gmail.
2. **Utwórz szablon.** Jeden szablon HTML ze [zmiennymi](/docs/template-variables/) takimi jak `{{firstname}}` czy `{{jobtitle}}`, które rozwiązują się per użytkownik z Twojego Google Directory.
3. **Przypisz go.** Wiąż szablony z grupami, jednostkami organizacyjnymi lub wszystkimi naraz na stronie [Przypisania](https://app.signature.cat/assignments).
4. **Bądź na bieżąco.** Synchronizacja w tle raz dziennie ponownie stosuje przypisania, więc nowo zatrudnieni i zmiany w zespołach dostają właściwy podpis bez niczyjego udziału.

## Czego potrzebujesz

- Domeny **Google Workspace** (prywatne konta Gmail nie są obsługiwane).
- **Superadmina Workspace**, który zarejestruje firmę i wykona jednorazową autoryzację. Codzienną pracę można potem delegować osobom bez uprawnień administratora przez [zarządzanie dostępem](/docs/user-management/).
- Około **10 minut** na całą pierwszą konfigurację.

> [!NOTE]
> Każdy workspace zaczyna od 7-dniowego bezpłatnego okresu próbnego. Karta jest pobierana przy rejestracji, a pierwsze obciążenie następuje po zakończeniu okresu próbnego. Zobacz [Faktury](/docs/invoices/), aby poznać cennik i szczegóły rozliczeń.

## Pierwsze kroki

Przejdź przewodniki wprowadzające po kolei:

1. [Połącz swój Google Workspace](/docs/connect-google-workspace/) - rejestracja, utworzenie konta usługi i kreator Domain-Wide Delegation.
2. [Utwórz swój pierwszy szablon](/docs/create-your-first-template/) - edytor, zmienne, podgląd i test na własnej skrzynce.
3. [Przypisz szablony](/docs/assign-templates/) - grupy, OU lub cały workspace.
4. [Zweryfikuj zadanie przypisania](/docs/verify-assignments/) - potwierdź, że podpisy trafiły tam, gdzie powinny.

## Gdzie szukać informacji

- [Szablony](/docs/templates/) i [Zmienne szablonów](/docs/template-variables/) - pełna referencja edytora i zmiennych.
- [Przypisania](/docs/assignments/) - reguły pierwszeństwa i tryby aliasów.
- [Zadania zastosowania](/docs/apply-jobs/) i [Logi](/docs/logs/) - jak śledzone jest wdrażanie podpisów.
- [Powiadomienia](/docs/notifications/) - które alerty przychodzą e-mailem, a które pojawiają się w aplikacji.
- [Uzyskaj pomoc](/docs/get-help/) - kontakt z supportem i [status usługi](/docs/service-status/).
