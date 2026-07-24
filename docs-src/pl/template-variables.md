---
title: Zmienne szablonów
navTitle: Zmienne szablonów
description: Kompletna referencja zmiennych szablonów SignatureCat - pola osobowe z Google Directory, tokeny logo i banera oraz bloki warunkowe del/delete.
updated: 2026-07-17
---

# Zmienne szablonów

Szablony SignatureCat używają tokenów `{{variable}}`, które rozwiązują się per użytkownik w momencie zastosowania. Jest dziewięć zmiennych osobowych (wypełnianych z Google Directory), dwa tokeny obrazków i dwa tagi warunkowe. Nazwy tokenów są pisane małymi literami i dopasowywane bez rozróżniania wielkości liter - `{{Phone}}` działa tak samo jak `{{phone}}`. Nieznane tokeny są odrzucane przy zapisie szablonu.

## Zmienne osobowe (Google Directory)

Wartości pochodzą z rekordu każdego użytkownika w katalogu Twojego Google Workspace. Utrzymuj porządek w katalogu, a każdy podpis pozostanie dokładny automatycznie.

| Token | Wartość | Uwagi |
|---|---|---|
| `{{firstname}}` | Imię | |
| `{{lastname}}` | Nazwisko | |
| `{{email}}` | Główny adres e-mail | Przy zastosowaniu do aliasu rozwiązuje się do adresu **aliasu**. |
| `{{domain}}` | Część domenowa adresu e-mail | Podąża za aliasem przy zastosowaniu do aliasu. |
| `{{jobtitle}}` | Stanowisko | Z głównego wpisu organizacji użytkownika w Directory. |
| `{{department}}` | Dział | Z tego samego wpisu organizacji. |
| `{{photo}}` | URL zdjęcia profilowego | Automatycznie skalowany do 400 px dla ostrego renderowania; musi to być zdjęcie po HTTPS. |
| `{{address}}` | Sformatowany adres | Główny wpis adresu użytkownika. |
| `{{phone}}` | Numer telefonu | Pierwszy niepusty z: służbowy, potem komórkowy, potem domowy. |

**Puste wartości renderują się jako pusty tekst.** Podpis nigdy się nie psuje, ale może zostać wisząca etykieta w rodzaju "Tel:" - właśnie do tego służą bloki warunkowe.

## Tokeny obrazków

| Token | Wartość |
|---|---|
| `{{logo}}` | Wybrane w szablonie logo firmy, renderowane 115x115 px. |
| `{{banner}}` | Wybrany w szablonie baner kampanii, renderowany 450x100 px, pomniejszany na wąskich ekranach. |

Obrazki pochodzą z biblioteki per workspace i są wybierane per szablon; jeśli nic nie wybrano, renderuje się neutralny placeholder. Jeśli obrazek w bibliotece ma link po kliknięciu, obrazek jest w niego automatycznie opakowywany. Zobacz [Banery i logo](/docs/banners-and-logos/).

> [!NOTE]
> Tokeny obrazków zawsze coś renderują (obrazek albo placeholder), więc nie liczą się jako "puste" dla poniższych bloków warunkowych.

## Bloki warunkowe: del i delete

Dwa tagi opakowujące usuwają całe fragmenty podpisu, gdy brakuje danych:

- `{{del}} ... {{/del}}` - **miękki**: blok jest usuwany tylko wtedy, gdy **każda** zmienna osobowa wewnątrz jest pusta. Jeśli choć jedna jest wypełniona, blok zostaje (puste zmienne wewnątrz renderują się jako pusty tekst).
- `{{delete}} ... {{/delete}}` - **twardy**: blok jest usuwany, gdy **jakakolwiek** zmienna osobowa wewnątrz jest pusta. Używaj go, gdy fragment ma sens tylko w komplecie.

Przykład - linia z telefonem, która znika dla użytkowników bez żadnego numeru:

```html
{{del}}<tr><td>Tel: {{phone}}</td></tr>{{/del}}
```

Bloki można zagnieżdżać; bloki wewnętrzne są rozstrzygane najpierw. Niezbalansowane tagi są odrzucane przy zapisie, a same tagi nigdy nie trafiają do końcowego podpisu Gmail.

> [!TIP]
> Praktyczna zasada: owijaj każdą opcjonalną linię (telefon, adres, dział) w tagi `{{del}}`. Podpisy użytkowników z ubogimi rekordami Directory będą wtedy elegancko się kurczyć zamiast pokazywać puste etykiety.

## Testowanie rozwiązywania zmiennych

Użyj **Renderuj jako** w [edytorze szablonów](/docs/templates/#the-editor), aby zobaczyć podgląd na rekordzie dowolnego prawdziwego użytkownika, i **Ustaw mi testowy podpis**, aby zastosować wynik do własnej skrzynki. Oba są opisane w [Utwórz swój pierwszy szablon](/docs/create-your-first-template/).
