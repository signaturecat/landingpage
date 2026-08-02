---
title: Podgląd w kliencie pocztowym
navTitle: Podgląd w kliencie pocztowym
description: Zobacz podpis Gmail na symulowanych powierzchniach Gmaila, Outlooka i Apple Mail w trybie jasnym i ciemnym - co pokazuje podgląd SignatureCat, a czego nie.
updated: 2026-08-02
---

# Podgląd w kliencie pocztowym

Podgląd obok edytora rysuje Twój podpis na symulowanej powierzchni klienta pocztowego: Twój HTML, bez zmian, na tle strony tego klienta, jego domyślną czcionką i z tą jedną zmianą kolorów, którą ten klient wprowadza w trybie ciemnym. To przybliżenie, a nie silnik renderujący samego klienta.

Aplikacja mówi to sama, pod ikoną informacji na końcu rzędu klientów ("Co ten podgląd pokazuje, a czego nie"):

> Przybliżenie: HTML podpisu jest bez zmian, zmienia się tylko tło i sposób, w jaki ten klient przemalowuje kolory w trybie ciemnym. To nie render silnikiem klienta.

Symulacji używaj do wczesnego wyłapywania błędów kolorów i układu. Po odpowiedź, która się liczy, sięgaj po **Ustaw mi testowy podpis** i własną skrzynkę.

## Co zmienia profil klienta

Profil zmienia cztery rzeczy wokół Twojego podpisu i nic w jego środku:

- tło strony pod wiadomością,
- domyślny kolor tekstu,
- domyślny kolor linków,
- domyślną czcionkę klienta i jej rozmiar.

Wszystko, co Twój szablon ustawia jawnie - czcionki, kolory, szerokości tabel, rozmiary obrazków - przechodzi nietknięte. Dlatego właśnie domyślna czcionka ma znaczenie: podpis, który nie ustawia `font-family`, dziedziczy domyślną czcionkę klienta odbiorcy, a każdy profil pokazuje, która by to była.

Profile przełączasz przyciskami-pigułkami nad ramką ("Symulowany klient pocztowy"), a obok nich siedzi przełącznik **Jasny** / **Ciemny**. Podgląd otwiera się na **Gmail (web)** w trybie **Jasny** - na powierzchni pokazującej podpis dokładnie tak, jak go napisano - i zapamiętuje wybrany klient oraz tryb na Twoją następną wizytę. Ramka działa w piaskownicy: nie uruchamiają się w niej żadne skrypty, a linki z podpisu otwierają się w nowej karcie.

## Pięć profili klientów

| Profil | Co symuluje | Po co jest |
|---|---|---|
| **Gmail (web)** | Gmail w przeglądarce: biała strona, Arial, tylko tryb jasny | Widok "jak napisano" i profil, na którym otwiera się podgląd |
| **Gmail (app)** | Gmail w telefonie: Roboto, pełna inwersja w trybie ciemnym | Najpowszechniejszy klient z pełną inwersją |
| **Outlook (classic, Windows)** | Silnik renderujący Worda: stos Aptos/Calibri w 11 pt, plus reguły geometrii i wymuszona inwersja w trybie ciemnym | Jedyny profil, który przybliża także inny silnik układu |
| **Outlook.com** | Outlook w przeglądarce: Segoe UI i tryb ciemny zachowujący kolory ustawione przez Ciebie jawnie | Przypadek częściowej inwersji, w którym zmieniają się tylko niektóre kolory |
| **Apple Mail** | Apple Mail na macOS i iOS: czcionka systemowa, pełna inwersja w trybie ciemnym | Drugi klient z pełną inwersją, o innych wartościach domyślnych |

Cztery z pięciu profili oferują tryb jasny i ciemny, więc kombinacji klienta i trybu jest w sumie dziewięć. Nazwy marek celowo zostają nieprzetłumaczone w każdej wersji językowej aplikacji.

## Jasny i ciemny

Każdy profil stosuje tę jedną transformację kolorów, którą dany klient faktycznie wykonuje w trybie ciemnym - a te pięć transformacji nie jest takich samych.

| Profil | Tryb ciemny |
|---|---|
| Gmail (web) | Niedostępny. Interfejs Gmaila w przeglądarce przyciemnia się wokół wiadomości, nigdy samej wiadomości. |
| Gmail (app) | Pełna inwersja, chyba że podpis maluje własne tło. |
| Apple Mail | Pełna inwersja, chyba że podpis maluje własne tło. |
| Outlook (classic, Windows) | Inwertuje zawsze, nawet podpis z własnym tłem, bo Word i tak przemalowuje. |
| Outlook.com | Częściowa: ciemna powierzchnia z jaśniejszym domyślnym tekstem i linkami, przy czym kolory ustawione w podpisie jawnie zostają nietknięte. |

Połowa **Ciemny** przełącznika jest wyłączona dla **Gmail (web)**, a powód widnieje na samej kontrolce: "Gmail (web) przyciemnia własny interfejs, ale nigdy kolorów wewnątrz wiadomości."

### Podpisy z własnym tłem

Jeśli Twój podpis maluje własne, nieprzezroczyste tło, profile inwertujące nie ruszają jego kolorów - i podgląd to mówi: "Ten podpis ma własne tło, więc klient inwertujący nie rusza jego kolorów." Prawdziwy klient z automatyczną inwersją zostawia taką treść w spokoju, więc symulacja robi tak samo.

Biel, `transparent` i w pełni przezroczyste wartości `rgba()` nie liczą się tu jako tło. **Outlook (classic, Windows)** jest wyjątkiem: inwertuje mimo wszystko, dlatego ciemne maile marketingowe wychodzą tam jasne.

### Dobieranie kolorów, które przetrwają oba tryby

Zostaw linie kontaktowe bez jawnego koloru i pozwól im dziedziczyć. Klient z wymuszonym trybem ciemnym rozjaśnia dziedziczony tekst, więc linie zostają czytelne; ciemna szarość zaszyta w każdej linii wygląda dobrze na bieli i niemal znika na ciemnej powierzchni Outlook.com, gdzie jawne kolory zostają takie, jakie są. Podgląd nazywa i ten przypadek: "Outlook.com zostawia kolory ustawione jawnie przez autora i rozjaśnia tylko tekst bez własnego koloru - zaszyty ciemny kolor zostaje tu ciemny."

Wbudowane startery są napisane właśnie tak: imię i nazwisko oraz stanowisko niosą kolor, linie kontaktowe żadnego, a linki używają szarości z wystarczającym kontrastem i na białej stronie, i na ciemnej powierzchni.

## Outlook (classic, Windows) renderuje Wordem

Klasyczny Outlook na Windowsie nie używa silnika przeglądarki - rysuje pocztę Wordem, a ten profil przybliża tę geometrię **zarówno** w trybie jasnym, jak i ciemnym. W tym profilu:

- zaokrąglone rogi znikają, więc okrągłe zdjęcie pokazuje się jako kwadrat,
- `display` działa wyłącznie jako `display:none`, więc span ostylowany na blok przestaje się tak zachowywać,
- marginesy na `<span>` są odrzucane,
- padding przeżywa tylko wewnątrz komórek tabeli (`td` i `th`),
- `white-space`, `float`, `box-shadow`, `text-shadow`, `opacity`, `transform` oraz obrazki tła są ignorowane,
- `max-width` dotyczy wyłącznie tabel.

Dlatego wbudowane startery budują każdą linię jako `<div>` z jawnymi marginesami, odstępy realizują paddingiem na komórkach tabeli, a rozmiary obrazków ustawiają atrybutami `width` i `height` zamiast CSS-em.

> [!NOTE]
> Okrągłe zdjęcie profilowe nie może wyglądać wszędzie tak samo: silnik Worda nie obsługuje zaokrąglonych rogów, więc `{{photo}}` jest kołem w Gmailu i Apple Mail, a kwadratem w klasycznym Outlooku. Podgląd odtwarza tę różnicę, zamiast ją ukrywać.

Jedna rzecz do zapamiętania, zanim przełączysz karty: otwarcie HTML-a dostrojonego pod Outlooka w [edytorze wizualnym](/docs/visual-editor) i zapisanie go serializuje znaczniki od nowa i gubi część tego, co daje parytet z klasycznym Outlookiem - marginesy bloków, jawne wysokości linii i padding komórek. Jeśli potrzebujesz tego parytetu, edytuj szablon dalej na karcie **HTML**.

## Czego symulacja nie odtwarza

Symulacja kończy się na powierzchni. Czego nie robi:

- nie uruchamia własnego silnika renderującego klienta - nic, co widzisz, nie jest prawdziwym wynikiem Gmaila ani Outlooka;
- nie odtwarza auto-layoutu tabel klasycznego Outlooka ani skalowania 120 DPI, które on stosuje;
- nie twierdzi, że kolory producentów są dokładne - powierzchnie to reprezentatywne przybliżenia, bo żaden producent nie publikuje prawdziwych wartości;
- nie pokazuje, co Gmail zapisze po zapisaniu podpisu. Gmail uruchamia własny sanitizer na swoich serwerach, więc podpis może zostać okrojony już po udanym zapisie - zobacz [Kiedy Gmail okraja Twój podpis](/docs/gmail-sanitization).

## Renderuj jako

Pole **Renderuj jako:** renderuje szablon na podstawie rekordu Google Directory prawdziwej osoby, więc sprawdzisz przypadki, których nie ma w Twoim własnym rekordzie: długie stanowisko, brakujący numer telefonu, pusty dział.

- Zostaw pole puste, a podgląd wyrenderuje się na podstawie Twojego rekordu Directory.
- Wpisz dwa znaki lub więcej, a pojawią się podpowiedzi z katalogu Twojego Workspace, każda z nazwiskiem, adresem i zdjęciem z Directory. Maksymalnie dziesięć trafień, z pominięciem użytkowników zawieszonych.
- Pole przyjmuje też dowolny tekst, więc możesz wpisać każdy adres - alias albo kogoś, kogo wyszukiwarka nie zwraca. Podgląd przeładowuje się, gdy tylko wpisane dane są kompletnym adresem. Gdy nic nie pasuje: "Brak pasujących osób. Możesz też wpisać dowolny adres."
- **Wyczyść i renderuj jako ja** przywraca renderowanie na Ciebie.

Renderowanie jako ktoś inny wymaga poziomu dostępu Designer, Editor lub Admin. Użytkownicy self-service dostają ten sam podgląd, przypięty do własnego rekordu. Zobacz [Zarządzanie dostępem](/docs/user-management).

Linia bezpośrednio pod podglądem zawsze nazywa użyty rekord: "Wyrenderowano na podstawie danych Directory dla {email}."

Wartości rozwiązują się dokładnie tak, jak przy prawdziwym zastosowaniu: rekord Google Directory, a na nim wartości per użytkownik zapisane na karcie Dane. Pełna lista pól i tego, skąd każde pochodzi, jest w [Zmiennych szablonów](/docs/template-variables). Jeśli szablon używa `{{banner}}` albo `{{logo}}`, druga linia pod podglądem przypomina, że te tokeny renderują się z obrazkami wybranymi dla tego szablonu - zobacz [Banery i logo](/docs/banners-and-logos).

Gdy celu nie da się wyrenderować, komunikat jest konkretny:

| Komunikat | Co się stało |
|---|---|
| "Nie znaleziono użytkownika Workspace dla {email}. Sprawdź adres i spróbuj ponownie." | Tego adresu nie ma w Twoim Google Directory. |
| "Ten adres e-mail lub domena są nieprawidłowe. Sprawdź je i spróbuj ponownie." | Adres albo jego domena są źle sformułowane. |
| "Zbyt wiele odświeżeń podglądu. Wstrzymuję na chwilę, podgląd odświeży się sam." | Zbyt wiele odświeżeń w krótkim czasie. Podgląd wraca sam z siebie. |
| "Dokończ konfigurację delegacji domenowej (DWD), aby zobaczyć podgląd podpisów." | Podgląd czyta katalog, więc potrzebuje zweryfikowanej delegacji. Zobacz [Domain-Wide Delegation](/docs/domain-wide-delegation). |

## Jedyne w 100 procentach wierne sprawdzenie

Twoja własna skrzynka to jedyne wierne sprawdzenie. Kliknij **Ustaw mi testowy podpis** w edytorze: SignatureCat renderuje szablon na podstawie Twojego rekordu Directory i zapisuje go jako Twój własny podpis Gmail, więc nikogo innego to nie dotyka. Potem otwórz Gmaila i obejrzyj wynik.

To sprawdzenie odpowiada na inne pytanie niż podgląd. Podgląd pokazuje, jak klient narysowałby Twój HTML; skrzynka pokazuje, co Gmail faktycznie zapisał, a Gmail przepisuje podpisy na własnych serwerach w trakcie zapisu. Jeśli wynik wygląda na ucięty, przeczytaj [Kiedy Gmail okraja Twój podpis](/docs/gmail-sanitization).

## Gdzie pojawia się podgląd

Symulacja klienta jest w dwóch miejscach, w których powstają podpisy:

- **Edytor szablonu** na stronie [Podpisy](https://app.signature.cat/signatures), dla poziomów Designer, Editor i Admin - z pigułkami klientów, przełącznikiem trybu jasnego i ciemnego, polem **Renderuj jako** i przyciskiem **Ustaw mi testowy podpis**. Zobacz [Szablony](/docs/templates).
- **[Mój podpis](https://app.signature.cat/self-service)**, dla użytkowników self-service - te same pigułki i ten sam przełącznik, zawsze renderowane na podstawie rekordu zalogowanego użytkownika ("Wyrenderowano na podstawie Twoich danych Directory."). Nie ma tam przycisku testowego zastosowania, więc zastrzeżenie wskazuje drugą drogę do pewności: "Pełną wierność zobaczysz, gdy zapiszesz i sprawdzisz podpis w swojej skrzynce." Zobacz [Podpisy self-service](/docs/self-service).
