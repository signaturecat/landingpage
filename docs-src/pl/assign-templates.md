---
title: Przypisz szablony do grup, OU lub wszystkich
navTitle: Przypisz szablony
description: Powiąż szablony SignatureCat z grupami Google, jednostkami organizacyjnymi lub wszystkimi aktywnymi użytkownikami w Workspace i synchronizuj podpisy na żądanie.
updated: 2026-07-17
---

# Przypisz szablony do grup, OU lub wszystkich

Przypisania wiążą szablon z celem - grupą Google, jednostką organizacyjną (OU) lub wszystkimi aktywnymi użytkownikami w Twoim workspace - i utrzymują go zastosowanym automatycznie. Zarządzasz nimi na stronie [Przypisania](https://app.signature.cat/assignments) (dostępnej dla poziomów Editor i Admin).

## Przypisz do grupy

1. Na stronie [Przypisania](https://app.signature.cat/assignments) dodaj wpis w sekcji **Przypisania grup**.
2. Podaj **Email grupy** (na przykład `engineering@example.com`).
3. Wybierz **Szablon**.
4. Opcjonalnie włącz **+ podgrupy**, aby objąć członków grup zagnieżdżonych.
5. Opcjonalnie wybierz tryb aliasów w sekcji **Aliasy** - zobacz [tryby aliasów](/docs/assignments/#alias-modes), aby dowiedzieć się, co robią opcje "Adresy z grupy" i "Wszystkie aliasy".

## Przypisz do jednostki organizacyjnej

1. Dodaj wpis w sekcji **Przypisania OU**.
2. Podaj **Ścieżkę OU** zaczynającą się od ukośnika, na przykład `/Engineering`.
3. Wybierz szablon i opcjonalnie włącz **+ pod-OU**, aby objąć całe poddrzewo.

## Przypisz do całego workspace

Sekcja **Przypisz wszystkim** mieści maksymalnie jeden wpis na workspace. Obejmuje każdego aktywnego (niezawieszonego) użytkownika i działa jako warstwa bazowa: przypisania OU i grup nadal nadpisują ją per użytkownik, więc możesz ustawić domyślny podpis dla całej firmy i doprecyzować go dla wybranych zespołów.

Kliknij **Przypisz wszystkim**, wybierz szablon i zapisz formularz.

> [!IMPORTANT]
> Przypisanie dla wszystkich obejmuje każdego aktywnego użytkownika w Twoim Workspace, a codzienna synchronizacja będzie je stale ponownie stosować bez dodatkowego potwierdzenia. Przejrzyj szablon uważnie przed zapisaniem - najlepiej po [teście na własnej skrzynce](/docs/create-your-first-template/#test-it-on-your-own-mailbox).

## Kiedy podpisy faktycznie się zmieniają?

- Kliknij **Synchronizuj teraz** na stronie Przypisania, aby zastosować wszystko od razu, albo
- poczekaj na **codzienną synchronizację w tle**, która raz dziennie ponownie stosuje wszystkie przypisania i automatycznie wychwytuje nowych członków grup, przenosiny między OU i nowo zatrudnionych.

Jeśli użytkownik pasuje do kilku przypisań, wygrywa dokładnie jedno: grupa wygrywa z OU, OU wygrywa z przypisaniem dla wszystkich, a własny wybór [self-service](/docs/self-service/) użytkownika wygrywa ze wszystkimi, chyba że przypisanie ma włączone **Nadpisuj self-service**. Dokładne reguły znajdziesz w [referencji przypisań](/docs/assignments/#how-precedence-works).

Dalej: [zweryfikuj zadanie przypisania](/docs/verify-assignments/), aby potwierdzić, że wszystko dotarło na miejsce.

> [!NOTE]
> Każdy cel może mieć tylko jedno przypisanie. Próba utworzenia drugiego dla tej samej grupy lub OU kończy się komunikatem "Wskazany cel ma już przypisanie. Edytuj istniejący wpis albo wybierz inny cel."
