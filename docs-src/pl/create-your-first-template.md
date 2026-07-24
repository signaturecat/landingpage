---
title: Utwórz swój pierwszy szablon
navTitle: Utwórz swój pierwszy szablon
description: Utwórz szablon podpisu Gmail w SignatureCat, spersonalizuj go zmiennymi z Google Directory, obejrzyj podgląd i przetestuj na własnej skrzynce.
updated: 2026-07-17
---

# Utwórz swój pierwszy szablon

Szablon to jeden podpis HTML, który SignatureCat personalizuje per użytkownik danymi z Twojego Google Directory. Szablony tworzysz na stronie [Podpisy](https://app.signature.cat/signatures), a wynik możesz bezpiecznie przetestować na własnej skrzynce, zanim cokolwiek wdrożysz.

## Utwórz szablon

1. Otwórz [Podpisy](https://app.signature.cat/signatures) i kliknij **Nowy szablon**.
2. Wybierz punkt startowy:
   - **Domyślny** - zdjęcie z Directory plus dane kontaktowe.
   - **Z logo firmy** - Twoje logo (115x115 px) zamiast zdjęcia osobistego, spójne w całej firmie.
   - **Z banerem** - podpis plus baner kampanii (450x100 px) pod spodem.
3. Dla starterów z logo lub banerem wybierz obrazek z biblioteki albo wgraj nowy - albo pomiń ten krok, a do czasu wyboru używany będzie placeholder. Zobacz [Banery i logo](/docs/banners-and-logos/).

Edytor otwiera się od razu. Wszystko ze startera możesz później dostosować.

## Personalizuj zmiennymi

Wstawiaj tokeny `{{variable}}` przez menu **Wstaw zmienną** - na przykład `{{firstname}}`, `{{jobtitle}}` albo `{{phone}}`. W momencie zastosowania każdy token rozwiązuje się z rekordu użytkownika w Google Directory, więc jeden szablon daje osobisty podpis każdemu.

Owijaj opcjonalne linie w tagi warunkowe, aby podpisy pozostały czyste przy brakujących danych:

- `{{del}} ... {{/del}}` usuwa owinięty blok tylko wtedy, gdy **wszystkie** zmienne wewnątrz są puste.
- `{{delete}} ... {{/delete}}` usuwa blok, gdy **choć jedna** zmienna wewnątrz jest pusta.

Pełna lista zmiennych, źródło każdej wartości i dokładne reguły warunków znajdują się w referencji [Zmienne szablonów](/docs/template-variables/).

> [!TIP]
> Zadbaj o porządek w danych Directory przed wdrożeniem - stanowiska, działy i numery telefonów pochodzą wprost z Google Directory. Puste pola renderują się po prostu jako pusty tekst, chyba że owiniesz je w tagi `{{del}}`.

## Podgląd jako prawdziwy użytkownik

Panel podglądu renderuje rozwiązany podpis na żywo w trakcie pisania. Użyj kontrolki **Renderuj jako**, aby podstawić rekord Directory dowolnego prawdziwego użytkownika - domyślnie renderowanie odbywa się na Twoich danych. Podgląd mówi dokładnie, którego rekordu użył: „Wyrenderowano na podstawie danych Directory dla {email}."

## Przetestuj na własnej skrzynce

Kliknij **Ustaw mi testowy podpis** w pasku narzędzi edytora. SignatureCat wyrenderuje szablon na podstawie Twojego rekordu Directory i zapisze go do Twojego własnego podpisu Gmail - nikt inny nie zostaje objęty. Wyślij do siebie e-mail albo zajrzyj do ustawień Gmail, żeby zobaczyć realny efekt.

Gdy szablon Ci odpowiada, przejdź do [Przypisz szablony](/docs/assign-templates/).

> [!NOTE]
> Zapisanie szablonu waliduje go: nieznane `{{tokens}}` oraz niezbalansowane tagi `{{del}}` / `{{delete}}` są odrzucane, a HTML jest sanityzowany (skrypty, iframe'y i inline'owe handlery zdarzeń są usuwane). Zobacz [Szablony](/docs/templates/), aby poznać pełną referencję.
