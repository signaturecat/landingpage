---
title: Zmienne szablonów
navTitle: Zmienne szablonów
description: Kompletna referencja zmiennych szablonów SignatureCat - pola z katalogu Google Workspace, nadpisania danych per użytkownik, tokeny logo i banera oraz bloki warunkowe del/delete.
updated: 2026-08-02
---

# Zmienne szablonów

Szablony SignatureCat używają tokenów `{{variable}}`, które rozwiązują się per użytkownik w momencie zastosowania. Jest dziewięć zmiennych osobowych (wypełnianych z Google Directory), dwa tokeny obrazków i dwa tagi warunkowe. Nazwy tokenów są pisane małymi literami i dopasowywane bez rozróżniania wielkości liter - `{{Phone}}` działa tak samo jak `{{phone}}`. Nieznane tokeny są odrzucane przy zapisie szablonu.

## Zmienne osobowe (Google Directory)

Wartości pochodzą z rekordu każdego użytkownika w katalogu Twojego Google Workspace. Utrzymuj porządek w katalogu, a każdy podpis pozostanie dokładny automatycznie.

Wartość zapisana dla użytkownika na zakładce **Dane** ma pierwszeństwo przed katalogiem - dla tego użytkownika i wyłącznie dla tego pola, wszędzie tam, gdzie podpis jest renderowany: w podglądzie, przy **Ustaw mi testowy podpis** i przy prawdziwym wdrożeniu do skrzynek. Pola, które zostawisz katalogowi, nadal pochodzą z katalogu. Zobacz [Dane użytkowników](/docs/user-data). Jeden wyjątek: gdy podpis jest zapisywany na aliasie send-as, `{{email}}` i `{{domain}}` zawsze podążają za adresem aliasu, nawet jeśli są nadpisane.

| Token | Wartość | Uwagi |
|---|---|---|
| `{{firstname}}` | Imię | |
| `{{lastname}}` | Nazwisko | |
| `{{email}}` | Główny adres e-mail | Przy zastosowaniu do aliasu rozwiązuje się do adresu **aliasu**. |
| `{{domain}}` | Część domenowa adresu e-mail | Podąża za aliasem przy zastosowaniu do aliasu. |
| `{{jobtitle}}` | Stanowisko | Z głównego wpisu organizacji użytkownika w Directory. |
| `{{department}}` | Dział | Z tego samego wpisu organizacji. |
| `{{photo}}` | Zdjęcie profilowe | Użyty samodzielnie, token renderuje gotowe zdjęcie profilowe - domyślnie okrągłe, kwadratowe, jeśli szablon został przełączony na ten kształt (domyślnie 115x115 px, [kształt i rozmiar ustawiasz per szablon](/docs/visual-editor#obrazki-logo-baner-i-zdjcie)); użytkownicy bez zdjęcia w Directory nie dostają żadnego obrazka zamiast zepsutej ikony. Wewnątrz Twojego własnego `<img src="{{photo}}">` rozwiązuje się do adresu HTTPS zdjęcia (automatycznie skalowanego do 400 px), a Twoje znaczniki pozostają nietknięte. |
| `{{address}}` | Sformatowany adres | Główny wpis adresu użytkownika. |
| `{{phone}}` | Numer telefonu | Pierwszy niepusty z: służbowy, potem komórkowy, potem domowy. |

**Puste wartości renderują się jako pusty tekst.** Podpis nigdy się nie psuje, ale może zostać wisząca etykieta w rodzaju "Tel:" - właśnie do tego służą bloki warunkowe.

## Tokeny obrazków

| Token | Wartość |
|---|---|
| `{{logo}}` | Wybrane w szablonie logo firmy - domyślnie 115x115 px, rozmiar zmienialny per szablon (24-300 px). |
| `{{banner}}` | Wybrany w szablonie baner kampanii - domyślnie 450x100 px (wpis w bibliotece może definiować własny rozmiar), rozmiar zmienialny per szablon, pomniejszany na wąskich ekranach. |

Obrazki pochodzą z biblioteki per workspace i są wybierane per szablon; jeśli nic nie wybrano, renderuje się neutralny placeholder. Jeśli obrazek w bibliotece ma link po kliknięciu, obrazek jest w niego automatycznie opakowywany - a każdy szablon może [ten link nadpisać](/docs/visual-editor#obrazki-logo-baner-i-zdjcie). Szczegóły rozmiarów i uchwyty zmiany rozmiaru opisują [edytor wizualny](/docs/visual-editor) oraz [Banery i logo](/docs/banners-and-logos).

Jeśli wpis w bibliotece niesie **Opis obrazka (ALT)**, ten tekst jest emitowany jako atrybut `alt` renderowanego obrazka - zarówno dla obrazków wgranych przez Ciebie, jak i dla wpisów wskazujących na Twój własny adres URL. To właśnie czytają odbiorcy, gdy ich program pocztowy blokuje obrazki albo nie potrafi ich wczytać. Opis należy do wpisu w bibliotece, więc każdy szablon używający tego obrazka pokazuje ten sam; wpis bez opisu renderuje puste `alt`.

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

Tag warunkowy może też objąć całą komórkę tabeli, ciąg sąsiadujących komórek albo cały wiersz tabeli. W [edytorze wizualnym](/docs/visual-editor#kolumny) jest to kolumna warunkowa, ustawiana przełącznikiem samej kolumny.

> [!TIP]
> Praktyczna zasada: owijaj każdą opcjonalną linię (telefon, adres, dział) w tagi `{{del}}`. Podpisy użytkowników z ubogimi rekordami Directory będą wtedy elegancko się kurczyć zamiast pokazywać puste etykiety.

## Testowanie rozwiązywania zmiennych

Użyj **Renderuj jako** w [edytorze szablonów](/docs/templates#edytor), aby zobaczyć podgląd na rekordzie dowolnego prawdziwego użytkownika, i **Ustaw mi testowy podpis**, aby zastosować wynik do własnej skrzynki. Oba są opisane w [Utwórz swój pierwszy szablon](/docs/create-your-first-template).
