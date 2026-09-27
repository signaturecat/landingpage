# Polityka Prywatności Signature.Cat

Wersja 1.3 - obowiązuje od dnia 27.09.2026

Wersja polska niniejszego dokumentu jest wersją wiążącą prawnie. Wersje angielska, niemiecka i francuska są tłumaczeniami automatycznymi udostępnianymi wyłącznie w celach informacyjnych i mogą zawierać błędy; w przypadku rozbieżności rozstrzyga wersja polska.

---

## 1. Administrator danych i kontakt

Administratorem danych osobowych w zakresie opisanym w niniejszej Polityce jest **Tomasz Piasecki**, prowadzący działalność gospodarczą pod firmą **SystemAdmin Tomasz Piasecki**, ul. Aleje Jerozolimskie 190, 02-486 Warszawa, NIP 1231455439 (dalej: „my", „Usługodawca").

Kontakt we wszystkich sprawach dotyczących danych osobowych: **contact@signature.cat**.

## 2. Zakres dokumentu

Polityka dotyczy:

- aplikacji **app.signature.cat** (usługa Signature.Cat - centralne zarządzanie sygnaturami Gmail w Google Workspace, dalej: „Usługa"),
- strony informacyjnej **signature.cat** wraz z podstronami językowymi, dokumentacją oraz dostępnymi na tej stronie formularzami i narzędziami (formularz kontaktowy, formularz pomocy, generator banerów),
- listy mailingowej (informacje handlowe przesyłane pocztą e-mail osobom, które wyraziły na to zgodę),
- hostingu obrazków sygnatur (adresy udostępniane przez Usługodawcę oraz subdomeny skonfigurowane przez Klientów),
- korespondencji prowadzonej z nami (e-mail, zgłoszenia, reklamacje).

Usługa jest przeznaczona wyłącznie dla przedsiębiorców (B2B). Pojęcia pisane wielką literą mają znaczenie nadane w Regulaminie (https://signature.cat/terms).

## 3. Dwie role: administrator i podmiot przetwarzający

W zależności od kategorii danych występujemy w jednej z dwóch ról:

**a) Administrator danych** - w odniesieniu do:
- danych Użytkowników logujących się do Usługi (osób działających w imieniu Klienta),
- danych rozliczeniowych i kontaktowych Klienta,
- danych osób odwiedzających stronę signature.cat i korzystających z dostępnych na niej formularzy,
- danych osób kontaktujących się z nami oraz osób zapisanych na naszą listę mailingową.

**b) Podmiot przetwarzający (procesor)** - w odniesieniu do danych osobowych pracowników i współpracowników Klienta, przetwarzanych w ramach Usługi na polecenie Klienta. Administratorem tych danych jest Klient. Przetwarzanie polega na:
- odczycie danych z katalogu użytkowników Google Workspace Klienta (imię, nazwisko, adres e-mail wraz z aliasami, stanowisko, dział, numery telefonów, adres, adres URL zdjęcia profilowego) **wyłącznie na bieżąco, w chwili podglądu lub wdrażania sygnatury** - wartości te nie są przez nas przechowywane po zakończeniu operacji;
- przechowywaniu wartości pól sygnatury wprowadzonych przez Klienta w ramach funkcji **Dane użytkowników** - funkcji opcjonalnej, domyślnie wyłączonej, uruchamianej samodzielną decyzją administratora Klienta (opis niżej);
- zapisie wyrenderowanej sygnatury w ustawieniach Gmail danego użytkownika (sygnatura pozostaje w środowisku Google Klienta);
- odczycie sygnatury zapisanej w ustawieniach Gmail danego użytkownika - automatycznie po każdym wdrożeniu oraz na żądanie osoby upoważnionej przez Klienta (opis niżej);
- krótkotrwałym przechowywaniu adresów e-mail objętych wdrożeniem w historii zadań (30 dni, na potrzeby raportu z wdrożenia);
- przechowywaniu treści, które Klient samodzielnie umieści w szablonach sygnatur lub obrazkach.

**Dane użytkowników (wartości wprowadzane przez Klienta).** Funkcja jest domyślnie wyłączona i do jej uruchomienia konieczna jest wyraźna decyzja administratora Klienta. Po włączeniu przechowujemy w naszej bazie danych wartości pól sygnatury dotyczące osób wskazanych przez Klienta: imię, nazwisko, wyświetlany adres e-mail, wyświetlaną domenę, stanowisko, dział, adres URL zdjęcia, adres i numer telefonu, wraz z informacją, kto i kiedy wprowadził ostatnią zmianę. Wartości wprowadza administrator Klienta, sam użytkownik (jeżeli Klient na to zezwoli) albo import pliku CSV; zastępują one dane z katalogu Google Workspace wyłącznie na potrzeby renderowania sygnatury. Wpis istnieje tylko dla osób, dla których Klient wprowadził co najmniej jedną wartość. Wyłączenie funkcji przez Klienta trwale usuwa wszystkie przechowywane wartości, a wpisy osób usuniętych z Google Workspace Klienta kasujemy automatycznie (pkt 8). W dzienniku audytu odnotowujemy, kto, kiedy i które pola zmienił - nigdy same wartości.

**Odczyt zapisanej sygnatury.** Google może samodzielnie zmodyfikować sygnaturę przy zapisie, dlatego po każdym wdrożeniu sprawdzamy, jaką treść sygnatury zapisał Gmail. Ten sam odczyt jest dostępny na żądanie osoby upoważnionej przez Klienta (podgląd sygnatury aktualnie ustawionej w skrzynce wskazanego użytkownika). Treść odczytanej sygnatury nie jest przez nas przechowywana ani buforowana - prezentujemy ją wyłącznie w przeglądarce osoby wykonującej odczyt. W dzienniku audytu odnotowujemy adres sprawdzanej skrzynki, moment odczytu i długość sygnatury.

Powierzenie przetwarzania reguluje umowa powierzenia (DPA), zawierana wyłącznie w języku angielskim - jej zawarcie następuje na wniosek Klienta skierowany na contact@signature.cat. Pełna lista dalszych podmiotów przetwarzających (podprocesorów) udostępniana jest Klientom w ramach DPA oraz na żądanie.

## 4. Kategorie przetwarzanych danych (jako administrator)

**Dane konta Użytkownika** - pozyskiwane z Google podczas logowania (Google OAuth): identyfikator konta Google, adres e-mail, imię i nazwisko, adres URL zdjęcia profilowego, domena Workspace; a ponadto nadany Poziom dostępu i rola w Koncie.

**Dane rozliczeniowe** - adres e-mail do rozliczeń (przechowywany w Usłudze); nazwa firmy, adres rozliczeniowy, numer NIP/VAT ID oraz dane karty płatniczej podawane są w formularzach operatora płatności i przechowywane wyłącznie przez tego operatora - nie mamy dostępu do danych kart.

**Treści Konta** - szablony sygnatur (HTML), konfiguracja przypisań, obrazki (logo, banery) wraz z adresami URL. Obrazki wykorzystywane w sygnaturach są publicznie dostępne pod swoimi adresami URL (są widoczne dla odbiorców wiadomości e-mail).

**Dziennik audytu** - zapis działań wykonanych w Koncie: rodzaj akcji, identyfikator Użytkownika, znacznik czasu oraz metadane zdarzenia (mogą obejmować adres e-mail Użytkownika). Dziennik audytu **nie zawiera adresów IP ani informacji o przeglądarce**.

**Dane techniczne** - adres IP przetwarzamy wyłącznie ulotnie (w pamięci) na potrzeby limitowania ruchu i ochrony przed nadużyciami - **nie zapisujemy adresów IP w bazie danych**. Standardowe logi techniczne infrastruktury hostingowej (w tym logi HTTP) przetwarzane są w ramach platformy hostingowej w celach diagnostycznych. Przetwarzanie adresu IP przez dostawców strony signature.cat, w tym przez Cloudflare i Google jako odrębnych administratorów, opisujemy poniżej oraz w pkt 6 i 11.

**Komunikacja** - wiadomości e-mail wysyłane przez nas (powiadomienia o zdarzeniach Konta, Okresie Próbnym, płatnościach, dostępach, a także potwierdzenia zgłoszeń z formularza kontaktowego i formularza pomocy na stronie signature.cat) zawierają adres e-mail odbiorcy, jego imię i nazwisko lub nazwę oraz informacje o zdarzeniu; korespondencja przychodząca przetwarzana jest w celu obsługi sprawy.

**Rejestr Okresów Próbnych** - domena Workspace i data wykorzystania okresu próbnego (bez danych osób fizycznych), prowadzony w celu zapobiegania nadużyciom; wpis pozostaje skuteczny również po usunięciu Konta.

**Strona signature.cat** - preferencje zapisane w przeglądarce (m.in. wybrany język i wybór w banerze zgód) oraz - po wyrażeniu zgody - dane statystyczne Google Analytics (pkt 11). Strony dokumentacji pobierają bieżący stan Usługi ze strony statusu (status.signature.cat) prowadzonej przez zewnętrznego dostawcę, który otrzymuje przy tym adres IP i dane przeglądarki.

**Formularz kontaktowy** (umówienie rozmowy, indywidualna wycena) - imię i nazwisko, służbowy adres e-mail, numer telefonu, nazwa firmy, wielkość organizacji, opcjonalny opis zapytania, temat zapytania, język strony i data wysłania oraz informacja, czy wyrażono zgodę marketingową. Zapytanie zapisujemy w bazie zapytań handlowych (CRM) i przekazujemy jako powiadomienie do narzędzia komunikacji wewnętrznej zespołu. Po przyjęciu zapytania strona automatycznie wyświetla osadzony kalendarz rezerwacji rozmów Google Calendar (pkt 11); dokonanie rezerwacji jest dobrowolne, a dane podane przy rezerwacji (m.in. imię, nazwisko, adres e-mail i wybrany termin) trafiają bezpośrednio do Google i do naszego kalendarza, przy czym potwierdzenie rezerwacji wysyła Google.

**Formularz pomocy** (przycisk „Pomoc" w dokumentacji) - imię i nazwisko, adres e-mail, opcjonalny numer telefonu, pilność zgłoszenia, opis problemu, adres strony dokumentacji, z której otwarto formularz, oraz język strony. Zgłoszenie przekazujemy jako powiadomienie do narzędzia komunikacji wewnętrznej zespołu, na osobny kanał zespołu wsparcia; nie zapisujemy go w bazie zapytań handlowych i nie dodajemy podanego adresu e-mail do listy mailingowej.

**Potwierdzenia zgłoszeń** - po wysłaniu formularza kontaktowego lub formularza pomocy wysyłamy na podany adres e-mail potwierdzenie otrzymania zgłoszenia z kopią przesłanych danych (w przypadku formularza kontaktowego także z odnośnikiem do kalendarza rezerwacji). Potwierdzenie nie zawiera treści marketingowych, a liczbę potwierdzeń wysyłanych na jeden adres ograniczamy (co do zasady do jednego na minutę).

**Generator banerów** - korzystanie z generatora jest dobrowolne. Baner powstaje w całości w przeglądarce (zdjęcie dodane do generatora nie opuszcza urządzenia). Pobranie lub skopiowanie gotowego baneru wymaga podania adresu e-mail i wyrażenia zgody na otrzymywanie od nas informacji handlowych pocztą e-mail; w danej przeglądarce prosimy o to tylko raz. Adres dodajemy do listy mailingowej, a w przeglądarce zapisujemy informację, że ten krok został wykonany (pkt 11). Wycofanie zgody nie ogranicza możliwości korzystania z pobranych już banerów.

**Lista mailingowa** - adres e-mail (a przy zapisie z formularza kontaktowego także imię i nazwisko) osób, które wyraziły zgodę na otrzymywanie od nas informacji handlowych pocztą e-mail: w formularzu kontaktowym (osobne, dobrowolne pole) albo w generatorze banerów. Informacje handlowe wysyłamy wyłącznie osobom, które wyraziły taką zgodę.

**Ochrona formularzy** - formularze na stronie signature.cat chronimy mechanizmem Cloudflare Turnstile, który w celu odróżnienia ludzi od botów analizuje m.in. adres IP oraz cechy przeglądarki i połączenia (np. nagłówek User-Agent, parametry połączenia TLS); mechanizm nie odczytuje treści wpisywanej do formularzy. Adres IP, a w przypadku potwierdzeń zgłoszeń także adres e-mail odbiorcy, wykorzystujemy ponadto przez 60 sekund w licznikach limitowania ruchu na brzegu sieci.

## 5. Cele przetwarzania i podstawy prawne

| Cel | Podstawa prawna (RODO) |
|---|---|
| Zawarcie i wykonanie Umowy: prowadzenie Konta, świadczenie funkcji Usługi, Okres Próbny, powiadomienia transakcyjne | art. 6 ust. 1 lit. b |
| Obsługa płatności i rozliczeń (w tym przekazanie danych operatorowi płatności) | art. 6 ust. 1 lit. b |
| Realizacja obowiązków podatkowych i księgowych | art. 6 ust. 1 lit. c |
| Bezpieczeństwo Usługi i strony signature.cat oraz zapobieganie nadużyciom: limitowanie ruchu, ochrona formularzy (Cloudflare Turnstile), sanityzacja treści, dziennik audytu, rejestr Okresów Próbnych, wewnętrzne powiadomienia o zdarzeniach na kontach | art. 6 ust. 1 lit. f (prawnie uzasadniony interes: ochrona Usługi, strony i klientów) |
| Udostępnianie strony signature.cat i dokumentacji, w tym wyświetlanie bieżącego stanu Usługi pobieranego ze strony statusu (status.signature.cat) | art. 6 ust. 1 lit. f (prawnie uzasadniony interes: udostępnienie strony oraz informowanie o dostępności Usługi) |
| Obsługa zgłoszeń, pytań i reklamacji, w tym zgłoszeń z formularza pomocy, oraz potwierdzenie otrzymania zgłoszenia z formularza pomocy wiadomością e-mail | art. 6 ust. 1 lit. b (gdy zgłoszenie dotyczy Umowy, której stroną jest osoba zgłaszająca) lub lit. f (prawnie uzasadniony interes: obsługa zgłoszenia i wsparcie Klienta oraz jego Użytkowników) |
| Obsługa zapytań z formularza kontaktowego: odpowiedź, przygotowanie oferty, umówienie rozmowy (w tym rezerwacja terminu w kalendarzu), prowadzenie rozmów handlowych, ewidencja w bazie zapytań handlowych oraz potwierdzenie otrzymania zapytania wiadomością e-mail | art. 6 ust. 1 lit. f (prawnie uzasadniony interes: odpowiedź na zapytanie i prowadzenie rozmów handlowych z podmiotem reprezentowanym przez osobę pytającą); gdy osoba pyta we własnym imieniu jako przedsiębiorca - art. 6 ust. 1 lit. b (działania podejmowane na jej żądanie przed zawarciem umowy) |
| Przesyłanie informacji handlowych pocztą e-mail (lista mailingowa) | art. 6 ust. 1 lit. a (zgoda); zgody na przesyłanie informacji handlowej na podany adres e-mail wymaga także art. 398 ust. 1 ustawy z dnia 12 lipca 2024 r. - Prawo komunikacji elektronicznej (Dz.U. z 2024 r. poz. 1221, z późn. zm.) |
| Wykazanie udzielenia i wycofania zgody oraz zapewnienie, że po rezygnacji nie wyślemy kolejnych informacji handlowych | art. 6 ust. 1 lit. f (prawnie uzasadniony interes: rozliczalność i poszanowanie rezygnacji) |
| Ustalenie, dochodzenie lub obrona roszczeń | art. 6 ust. 1 lit. f |
| Statystyka odwiedzin strony signature.cat, w tym zbiorczy pomiar liczby wysłanych formularzy kontaktowych (Google Analytics) | art. 6 ust. 1 lit. a (zgoda) |

Podanie danych konta i danych rozliczeniowych jest dobrowolne, ale niezbędne do korzystania z Usługi. Podanie danych w formularzu kontaktowym i formularzu pomocy jest dobrowolne: pola oznaczone jako opcjonalne można pominąć, a bez wypełnienia pozostałych pól nie możemy przyjąć zgłoszenia; zgoda marketingowa w formularzu kontaktowym jest w pełni dobrowolna i nie wpływa na obsługę zapytania. Korzystanie z generatora banerów jest dobrowolne, przy czym pobranie lub skopiowanie baneru wymaga podania adresu e-mail i wyrażenia zgody na otrzymywanie informacji handlowych (pkt 4). Nie podejmujemy decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu, które wywoływałyby skutki prawne lub w podobny sposób istotnie wpływały na osobę, której dane dotyczą; automatyczna ochrona formularzy (Cloudflare Turnstile) może jedynie uniemożliwić wysłanie formularza - w takim przypadku można napisać do nas na adres contact@signature.cat. Danych nie wykorzystujemy do trenowania modeli sztucznej inteligencji.

## 6. Odbiorcy danych i podprocesorzy

Dane przekazujemy wyłącznie podmiotom wspierającym świadczenie Usługi, działanie strony signature.cat oraz obsługę zapytań i zgłoszeń, w zakresie niezbędnym do ich zadań; część danych przetwarzają ponadto odrębni administratorzy w zakresie opisanym pod tabelą. Korzystamy z następujących kategorii dostawców:

| Kategoria | Zakres danych | Lokalizacja przetwarzania |
|---|---|---|
| Dostawca hostingu aplikacji i bazy danych | wszystkie dane Usługi | UE (Amsterdam) |
| Dostawca usług sieciowych, CDN, magazynu obrazków i ochrony formularzy (Cloudflare, w tym Cloudflare Turnstile) | ruch sieciowy, obrazki Klientów, dane przesyłane przez formularze na stronie signature.cat, sygnały ochrony przed botami (adres IP, cechy przeglądarki i połączenia) | magazyn obrazków: jurysdykcja UE; sieć: globalna infrastruktura brzegowa |
| Dostawca usług chmurowych (zarządzanie sekretami, archiwum dziennika audytu) | klucze techniczne kont serwisowych, archiwum audytu | archiwum: region UE; sekrety: replikacja wieloregionowa |
| Operator płatności (certyfikacja PCI-DSS Level 1) | dane rozliczeniowe, dane kart (wyłącznie u operatora) | UE/USA |
| Dostawca poczty e-mail (wiadomości transakcyjne, potwierdzenia zgłoszeń, lista mailingowa) | adres e-mail odbiorcy, imię i nazwisko lub nazwa, treść wiadomości (w potwierdzeniach zgłoszeń: kopia danych z formularza), dane listy mailingowej (adres e-mail, imię i nazwisko, status zapisu) | USA |
| Google (usługi i interfejsy API Google Workspace) | logowanie OAuth, operacje w Workspace Klienta | zgodnie z konfiguracją Workspace Klienta |
| Google (kalendarz rezerwacji rozmów osadzony na stronie signature.cat; Google Analytics - wyłącznie po wyrażeniu zgody) | dane podane przy rezerwacji, adres IP i dane przeglądarki, pliki cookies Google, dane o odwiedzinach i zdarzeniach na stronie powiązane z identyfikatorem plików cookies Google Analytics | USA i globalna infrastruktura Google |
| Narzędzie do prowadzenia bazy zapytań handlowych (CRM) | dane z formularza kontaktowego (bez zgłoszeń z formularza pomocy) | USA |
| Narzędzia komunikacji wewnętrznej zespołu (powiadomienia operacyjne, powiadomienia o zapytaniach i zgłoszeniach) | zdarzenia dotyczące kont (m.in. domena Workspace i adres e-mail administratora Klienta), dane i treść zapytań z formularza kontaktowego oraz zgłoszeń z formularza pomocy | UE/USA |
| Dostawca hostingu plików strony signature.cat | dane techniczne żądań HTTP | USA/globalnie |
| Dostawca strony statusu Usługi (status.signature.cat) | adres IP i dane przeglądarki przy wyświetlaniu stron dokumentacji | UE/USA |

Pełną, imienną listę podprocesorów wraz z rolami udostępniamy Klientom w ramach DPA oraz na żądanie (contact@signature.cat); osobie, której dane dotyczą, na jej żądanie wskazujemy również nazwy odbiorców jej danych (art. 15 ust. 1 lit. c RODO). Dane mogą być ponadto udostępnione podmiotom uprawnionym na podstawie przepisów prawa (np. organom publicznym) oraz doradcom prawnym i księgowym Usługodawcy w niezbędnym zakresie.

Cloudflare (w zakresie ulepszania mechanizmów wykrywania botów, zob. https://www.cloudflare.com/turnstile-privacy-policy/) oraz Google Ireland Limited (w zakresie własnych plików cookies i konta Google osoby dokonującej rezerwacji, zob. https://policies.google.com/privacy) przetwarzają część danych wskazanych w tabeli powyżej jako odrębni administratorzy, na zasadach własnych polityk prywatności.

## 7. Przekazywanie danych poza EOG

Podstawowa infrastruktura Usługi (aplikacja, baza danych, magazyn obrazków, archiwum audytu) działa w regionach Unii Europejskiej. Część dostawców wskazanych w pkt 6 (operator płatności, dostawca usług sieciowych, dostawca poczty e-mail, Google, narzędzia komunikacji wewnętrznej, narzędzie do prowadzenia bazy zapytań handlowych, dostawca hostingu plików strony signature.cat, dostawca strony statusu) ma siedzibę w USA lub korzysta z infrastruktury globalnej - w związku z czym dane mogą być przekazywane poza Europejski Obszar Gospodarczy, w szczególności do Stanów Zjednoczonych.

Podstawą takich transferów są standardowe klauzule umowne (SCC) przyjęte przez Komisję Europejską, zawarte w umowach z tymi dostawcami (w tym w umowach powierzenia), a w odniesieniu do dostawców certyfikowanych w programie EU-US Data Privacy Framework - decyzja wykonawcza Komisji (UE) 2023/1795 z dnia 10 lipca 2023 r. stwierdzająca odpowiedni stopień ochrony. W zakresie, w jakim Cloudflare i Google przetwarzają dane jako odrębni administratorzy (pkt 6), przekazują je poza EOG na zasadach opisanych w ich politykach prywatności. Informacje o zabezpieczeniach transferów, w tym kopię stosowanych przez nas zabezpieczeń, można uzyskać pod adresem contact@signature.cat.

## 8. Okresy przechowywania danych

| Dane | Okres przechowywania |
|---|---|
| Dane Konta (Użytkownicy, szablony, przypisania, obrazki, ustawienia) | przez czas trwania Umowy; po wygaśnięciu subskrypcji - do czasu usunięcia Konta na żądanie Klienta, nie dłużej niż do upływu terminów przedawnienia roszczeń związanych z Umową (co do zasady 6 lat) |
| Usunięcie Konta (samoobsługowe, w ustawieniach) | trwałe usunięcie danych następuje po upływie 7 dni od zgłoszenia żądania |
| Sesje logowania | 7 dni od ostatniej aktywności, maksymalnie 14 dni od zalogowania |
| Historia wdrożeń sygnatur (w tym adresy e-mail objęte wdrożeniem) | 30 dni od zakończenia zadania |
| Wartości pól sygnatury wprowadzone przez Klienta (funkcja Dane użytkowników) | przez czas korzystania przez Klienta z funkcji; usunięcie następuje natychmiast po skasowaniu wpisu albo wyłączeniu funkcji przez Klienta, a wpisy osób usuniętych z Google Workspace Klienta kasowane są automatycznie w codziennym przeglądzie |
| Dziennik audytu | 365 dni w bazie produkcyjnej; kopia archiwalna na potrzeby bezpieczeństwa i obrony roszczeń - nie dłużej niż 6 lat |
| Wyniki automatycznych testów połączenia z Workspace (preflight) | 90 dni |
| Wewnętrzne zdarzenia operacyjne (powiadomienia zespołu) | 30 dni od dostarczenia |
| Kolejka powiadomień e-mail aplikacji (adres odbiorcy, dane powiadomienia) | 90 dni od wysyłki (powiadomienia, których nie udało się wysłać: 90 dni od ich utworzenia) |
| Niedokończone przesyłki obrazków (bez zatwierdzenia) | 30 minut, następnie automatyczne usunięcie |
| Rejestr Okresów Próbnych (domena Workspace + data) | przez czas świadczenia usługi Signature.Cat (zapobieganie nadużyciom) |
| Dokumenty rozliczeniowe i księgowe | 5 lat, licząc od końca roku podatkowego (obowiązek prawny) |
| Korespondencja i zgłoszenia (w tym zgłoszenia z formularza pomocy) | przez czas obsługi sprawy, następnie do upływu terminów przedawnienia roszczeń |
| Zapytania z formularza kontaktowego (baza zapytań handlowych, powiadomienia w narzędziu komunikacji wewnętrznej, rezerwacje rozmów w kalendarzu) | do 12 miesięcy od ostatniego kontaktu, jeżeli rozmowy nie będą kontynuowane lub nie dojdzie do rozpoczęcia współpracy; po zawarciu Umowy - jak Dane Konta oraz korespondencja i zgłoszenia |
| Wiadomości e-mail u dostawcy poczty e-mail (potwierdzenia zgłoszeń i powiadomienia aplikacji: treść i dane wysyłki) | do 30 dni od wysyłki (kopie zapasowe dostawcy: do 7 dni dłużej) |
| Lista mailingowa | do czasu wycofania zgody; po jej wycofaniu zachowujemy wpis oznaczony jako wypisany (adres e-mail, a jeżeli został podany - także imię i nazwisko, oraz datę zapisu), aby nie wysyłać kolejnych wiadomości i móc wykazać udzielenie i wycofanie zgody - do upływu terminów przedawnienia roszczeń |
| Liczniki limitowania ruchu na brzegu sieci (adres IP, adres e-mail odbiorcy potwierdzenia) | 60 sekund |
| Dane statystyczne Google Analytics | do 14 miesięcy |
| Dane w trakcie Okresu Próbnego | jak dane Konta (pkt 10) |

Dane pracowników Klienta pobierane z katalogu Workspace nie są przechowywane - przetwarzamy je wyłącznie w chwili renderowania lub wdrażania sygnatury (pkt 3 lit. b). Wyjątkiem są wartości, które Klient wprowadza samodzielnie w ramach funkcji Dane użytkowników; okres ich przechowywania wskazuje tabela powyżej.

## 9. Prawa osób, których dane dotyczą

Każdej osobie, której dane przetwarzamy jako administrator, przysługują prawa: dostępu do danych, sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych, sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie oraz wycofania zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej wycofaniem).

**Prawo sprzeciwu.** Każdej osobie przysługuje prawo wniesienia w dowolnym momencie sprzeciwu - z przyczyn związanych z jej szczególną sytuacją - wobec przetwarzania jej danych na podstawie prawnie uzasadnionego interesu (art. 6 ust. 1 lit. f RODO), w tym danych z formularza kontaktowego i formularza pomocy. Sprzeciw wobec przetwarzania danych z formularza kontaktowego w celu prowadzenia rozmów handlowych nie wymaga uzasadnienia. Sprzeciw można zgłosić na adres contact@signature.cat.

**Wycofanie zgody marketingowej.** Zgodę na otrzymywanie informacji handlowych można wycofać w każdej chwili, bez podawania przyczyny: klikając odnośnik rezygnacji w wiadomości marketingowej, odpowiadając na naszą wiadomość albo pisząc na adres contact@signature.cat. Wycofanie zgody nie wpływa na zgodność z prawem wysyłki dokonanej wcześniej i nie ogranicza możliwości korzystania z pobranych już banerów.

Żądania można zgłaszać na adres **contact@signature.cat**. Odpowiadamy bez zbędnej zwłoki, najpóźniej w terminie miesiąca (z możliwością przedłużenia o dwa miesiące w sprawach skomplikowanych, o czym poinformujemy).

Każdej osobie przysługuje również skarga do organu nadzorczego: **Prezes Urzędu Ochrony Danych Osobowych**, ul. Stawki 2, 00-193 Warszawa (uodo.gov.pl).

Jeżeli żądanie dotyczy danych przetwarzanych przez nas w roli podmiotu przetwarzającego (dane pracowników Klienta - pkt 3 lit. b), właściwym adresatem żądania jest pracodawca (Klient) jako administrator tych danych. Przekażemy takie żądanie Klientowi i będziemy wspierać jego realizację.

## 10. Okres Próbny

Okres Próbny jest w pełni wiążącą umową o świadczenie usług drogą elektroniczną. Dane zbierane w trakcie Okresu Próbnego przetwarzamy na zasadach identycznych jak po przejściu na płatną subskrypcję. Jeżeli Okres Próbny nie zakończy się przejściem na płatny plan, Konto traci dostęp do funkcji Usługi, a dane przechowywane są zgodnie z pkt 8 - Klient może w każdej chwili samodzielnie usunąć Konto (trwałe usunięcie po 7 dniach).

## 11. Pliki cookies i analityka

**Aplikacja app.signature.cat** korzysta wyłącznie z plików cookies niezbędnych do działania:

| Cookie | Cel | Okres |
|---|---|---|
| `__Secure-next-auth.session-token` (i techniczne cookies logowania) | utrzymanie zalogowanej sesji (HTTP-only) | do 7 dni od ostatniej aktywności, maks. 14 dni |
| `NEXT_LOCALE` | zapamiętanie wybranego języka interfejsu | 12 miesięcy |

Aplikacja nie używa cookies analitycznych ani marketingowych. W pamięci lokalnej przeglądarki (localStorage) aplikacja zapisuje wyłącznie ustawienia interfejsu (np. wybrany podgląd programu pocztowego lub informację o ukryciu komunikatu o Okresie Próbnym) oraz techniczny wpis `nextauth.message`, który po wylogowaniu synchronizuje stan sesji między otwartymi kartami (bez danych osobowych).

**Strona signature.cat** korzysta z następujących plików cookies i wpisów w pamięci przeglądarki:

| Nazwa | Cel | Okres |
|---|---|---|
| `sigcat_consent` (cookie) | zapamiętanie wyboru w banerze zgód | 12 miesięcy |
| `sigcat_locale` (cookie oraz pamięć lokalna) | zapamiętanie ręcznie wybranego języka strony | cookie: 12 miesięcy; pamięć lokalna: do czasu wyczyszczenia danych przeglądarki |
| `sigcat-theme` (pamięć lokalna) | zapamiętanie jasnego lub ciemnego motywu dokumentacji | do czasu wyczyszczenia danych przeglądarki lub powrotu do ustawienia systemowego |
| `sc.cf.from` (pamięć sesji) | zachowanie adresu strony dokumentacji, z której otwarto formularz pomocy, na wypadek zmiany języka formularza | do zamknięcia karty przeglądarki |
| `sigcat_bg_lead` (cookie) | zapamiętanie, że w tej przeglądarce podano już adres e-mail w generatorze banerów, aby nie pytać o niego ponownie | 12 miesięcy |
| `_ga`, `_ga_*` (Google Analytics 4) | statystyka odwiedzin, wyłącznie po wyrażeniu zgody | do 24 miesięcy |

Wszystkie pozycje z tabeli poza Google Analytics służą wyłącznie działaniu strony i funkcji, z których się korzysta, i nie są używane do śledzenia ani reklamy; zapisujemy je bez odrębnej zgody jako niezbędne do świadczenia usługi, z której się korzysta (art. 399 ust. 3 pkt 2 ustawy - Prawo komunikacji elektronicznej), a pliki Google Analytics - wyłącznie po wyrażeniu zgody. Zapisywanie plików cookies i danych w pamięci przeglądarki można ograniczyć lub zablokować w ustawieniach przeglądarki; zablokowanie pozycji niezbędnych może uniemożliwić działanie niektórych funkcji strony.

**Google Analytics 4** (dostawca: Google Ireland Limited) służy wyłącznie do zbiorczej statystyki odwiedzin strony signature.cat (m.in. liczba odwiedzin, źródła ruchu, przybliżona lokalizacja na poziomie miasta, a także liczba wysłanych formularzy kontaktowych wraz z tematem zapytania - bez treści formularzy i bez wpisanych w nie danych, takich jak imię i nazwisko, adres e-mail czy numer telefonu). Narzędzie uruchamiane jest **wyłącznie po wyrażeniu zgody** w banerze zgód na stronie; zgodę można w każdej chwili wycofać, zmieniając ustawienia zgód na stronie lub usuwając pliki cookies. Google Analytics 4 nie zapisuje pełnych adresów IP. Dane zdarzeń przechowywane są w narzędziu maksymalnie 14 miesięcy. Google Analytics nie jest osadzone w aplikacji app.signature.cat.

**Ochrona formularzy (Cloudflare Turnstile).** Mechanizm ładowany jest dopiero przy pierwszej interakcji z formularzem kontaktowym lub formularzem pomocy albo po otwarciu okna podania adresu e-mail w generatorze banerów (przy pierwszej próbie pobrania lub skopiowania baneru); skrypt i ramka weryfikacji pochodzą z serwerów Cloudflare (challenges.cloudflare.com), a ramka może korzystać z pamięci przeglądarki na potrzeby weryfikacji. Nie ustawiamy na jego potrzeby własnych plików cookies. Zasady przetwarzania danych przez Cloudflare opisuje Turnstile Privacy Addendum: https://www.cloudflare.com/turnstile-privacy-policy/.

**Kalendarz rezerwacji (Google).** Po pomyślnym wysłaniu formularza kontaktowego strona automatycznie, bez dodatkowego kliknięcia, wyświetla osadzony kalendarz rezerwacji rozmów Google Calendar. Już w chwili jego wyświetlenia, także jeżeli rezerwacja nie zostanie dokonana, Google otrzymuje adres IP i dane przeglądarki oraz może zapisywać lub odczytywać w przeglądarce własne pliki cookies (np. `NID`, wykorzystywany przez Google także do celów reklamowych) na zasadach polityki prywatności Google (https://policies.google.com/privacy); jeżeli osoba odwiedzająca stronę jest zalogowana na konto Google, Google może też uzupełnić dane rezerwacji na podstawie tego konta. Bezpośrednio pod kalendarzem informujemy, że Google może zapisywać w przeglądarce własne pliki cookies. Dokonanie rezerwacji jest dobrowolne i nie jest warunkiem obsługi zapytania; otwarcie strony rezerwacji w nowej karcie również wiąże się z przekazaniem tych danych Google.

Sami nie stosujemy cookies marketingowych ani nie sprzedajemy danych osobowych; pliki cookies, które Google może zapisywać w osadzonym kalendarzu rezerwacji, opisujemy powyżej.

## 12. Dane z interfejsów API Google

Usługa korzysta z interfejsów API Google (logowanie Google OAuth oraz interfejsy Google Workspace: ustawienia Gmail - zapis i odczyt sygnatury - oraz katalog użytkowników, w zakresach wskazanych w Regulaminie; Usługa nie korzysta z uprawnień dających dostęp do treści wiadomości). Wykorzystanie informacji otrzymanych z interfejsów API Google jest zgodne z Google API Services User Data Policy, w tym z wymogami ograniczonego wykorzystania (Limited Use): dane te wykorzystujemy wyłącznie do świadczenia i ulepszania funkcji Usługi widocznych dla użytkownika (zarządzanie sygnaturami), nie wykorzystujemy ich do celów reklamowych, nie sprzedajemy ich, nie przekazujemy podmiotom trzecim poza zakresem niezbędnym do świadczenia Usługi ani nie wykorzystujemy do trenowania modeli sztucznej inteligencji.

## 13. Bezpieczeństwo danych (środki techniczne i organizacyjne)

Stosujemy m.in. następujące środki:

- szyfrowanie transmisji TLS na całym ruchu, z wymuszeniem HTTPS (HSTS);
- szyfrowanie tokenów OAuth w spoczynku algorytmem AES-256-GCM, z kluczem szyfrującym przechowywanym poza bazą danych;
- klucze prywatne kont serwisowych przechowywane wyłącznie w usłudze zarządzania sekretami (nigdy w bazie danych, logach ani odpowiedziach API), z pamięciowym buforem wygasającym do 5 minut oraz automatyczną, okresową rotacją kluczy;
- izolację klientów: jedno dedykowane konto serwisowe Google na Klienta oraz ograniczenie każdej operacji na danych do środowiska danego Klienta;
- kontrolę dostępu opartą na poziomach uprawnień, egzekwowaną po stronie serwera dla każdej operacji;
- dostęp serwisowy personelu SignatureCat: zmiany ustawień Konta przez nasz zespół supportu wymagają uprzedniej zgody Klienta, udzielanej przez administratora dedykowanym przełącznikiem w ustawieniach aplikacji; tej samej zgody wymaga podgląd sygnatury zapisanej w skrzynce wskazanego użytkownika, mimo że jest to wyłącznie odczyt; każde działanie supportu, każdy taki podgląd oraz włączenie i wyłączenie zgody są odnotowywane w dzienniku audytu Konta wraz z imieniem i nazwiskiem pracownika, a dostęp w trybie odczytu (diagnostyka) ogranicza się do zakresu niezbędnego do utrzymania Usługi;
- uwierzytelnianie wyłącznie przez Google OAuth (Usługa nie przechowuje haseł); dodatkowe zabezpieczenia logowania, w tym MFA, wynikają z polityki Google Workspace Klienta;
- nagłówki bezpieczeństwa przeglądarki, w tym egzekwowaną politykę Content Security Policy;
- limitowanie ruchu per adres IP na brzegu sieci, a na stronie signature.cat także ochronę formularzy mechanizmem Cloudflare Turnstile, limit potwierdzeń e-mail wysyłanych na jeden adres oraz neutralizację odnośników w treści odsyłanej w potwierdzeniach;
- sanityzację treści sygnatur po stronie serwera (blokada skryptów i niebezpiecznych konstrukcji) oraz weryfikację przesyłanych plików graficznych (wyłącznie PNG, JPEG i GIF, kontrola rzeczywistego typu pliku, limit 5 MB dla PNG i JPEG oraz 20 MB dla GIF, blokada SVG);
- bazę danych w sieci prywatnej, bez publicznego punktu dostępu; kopie zapasowe z możliwością odtwarzania do punktu w czasie;
- dziennik audytu w modelu „tylko dopisywanie" (append-only) oraz wewnętrzne powiadomienia o istotnych zdarzeniach na kontach;
- minimalizację danych: atrybuty pracowników Klienta pobierane z katalogu Workspace nie są przechowywane, a dane kart płatniczych przetwarza wyłącznie operator płatności;
- funkcja Dane użytkowników, stanowiąca świadomy wyjątek od powyższej zasady, jest domyślnie wyłączona, uruchamiana wyłącznie decyzją administratora Klienta, obejmuje tylko osoby wskazane przez Klienta, a jej wyłączenie trwale usuwa wszystkie przechowywane wartości.

## 14. Naruszenia ochrony danych

W przypadku naruszenia ochrony danych osobowych dokonujemy oceny ryzyka i - gdy jest to wymagane - zgłaszamy naruszenie Prezesowi UODO w terminie 72 godzin od jego stwierdzenia oraz zawiadamiamy osoby, których dane dotyczą, jeżeli naruszenie może powodować wysokie ryzyko dla ich praw i wolności. Jako podmiot przetwarzający informujemy Klienta (administratora) o naruszeniu dotyczącym powierzonych danych bez zbędnej zwłoki po jego stwierdzeniu.

## 15. Zmiany Polityki

O zmianach Polityki informujemy z wyprzedzeniem co najmniej **14 dni** - powiadomieniem wyświetlanym w aplikacji po zalogowaniu. Jeżeli żaden Użytkownik Klienta nie zalogował się do aplikacji w okresie 30 dni poprzedzających opublikowanie powiadomienia, możemy dodatkowo przesłać powiadomienie e-mail (wysyłka pomocnicza, niegwarantowana). Zmiany wynikające z przepisów prawa mogą wejść w życie niezwłocznie. Z dniem publikacji wchodzą w życie także zmiany, które polegają wyłącznie na uzupełnieniu lub sprostowaniu informacji o przetwarzaniu danych (w tym o przetwarzaniu w ramach nowych funkcji), nie zmieniają celów, podstaw prawnych ani odbiorców przetwarzania danych zebranych wcześniej i nie ograniczają praw osób, których dane dotyczą; art. 13 RODO wymaga podania informacji o nowym przetwarzaniu podczas pozyskiwania danych osobowych. Nie dotyczy to zmian rozszerzających przetwarzanie danych powierzonych nam przez Klienta (pkt 3 lit. b) ani dodania lub zastąpienia podprocesora - do takich zmian stosuje się wyprzedzenie wskazane w zdaniu pierwszym, a jeżeli zawarto DPA - zamiast niego zasady określone w DPA. Archiwum poprzednich wersji wraz z datami obowiązywania udostępniamy na żądanie przesłane na contact@signature.cat.

Wersja 1.3 (obowiązuje od 27.09.2026) uzupełnia Politykę o opis przetwarzania danych na stronie signature.cat w związku z formularzem kontaktowym i formularzem pomocy, potwierdzeniami zgłoszeń, bazą zapytań handlowych, kalendarzem rezerwacji, generatorem banerów, listą mailingową, ochroną formularzy, stroną statusu i hostingiem plików strony oraz plikami cookies i pamięcią przeglądarki (także w aplikacji); wyodrębnia informacje o prawie sprzeciwu i wycofaniu zgody (pkt 9), koryguje lokalizację przetwarzania u dostawcy poczty e-mail (USA), aktualizuje opis formatów przesyłanych obrazków, dodaje okresy przechowywania wiadomości w kolejce powiadomień e-mail aplikacji i u dostawcy poczty e-mail oraz doprecyzowuje w pkt 15 zasady wejścia w życie zmian polegających wyłącznie na uzupełnieniu lub sprostowaniu informacji. Zmiany nie ograniczają praw osób, których dane dotyczą.

---

SystemAdmin Tomasz Piasecki, ul. Aleje Jerozolimskie 190, 02-486 Warszawa, NIP 1231455439
contact@signature.cat
