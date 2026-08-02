---
title: Changelog
navTitle: Changelog
description: Co nowego w SignatureCat - comiesięczne podsumowanie nowych funkcji i ulepszeń w zarządzaniu podpisami e-mail dla Google Workspace i Gmaila.
updated: 2026-08-02
published: 2026-07-24
---

# Changelog

Co nowego w SignatureCat, menedżerze podpisów e-mail dla Google Workspace. Stale ulepszamy szablony podpisów, integrację z Gmailem i administrację Workspace - najważniejsze zmiany zbieramy tutaj, miesiąc po miesiącu.

## Sierpień 2026

- **Sprawdzamy teraz, co naprawdę zapisał Gmail.** Gmail przy zapisie przepisuje podpisy na własnych serwerach i potrafi po cichu wyrzucić fragmenty skomplikowanego układu. SignatureCat porównuje teraz to, co wysłał, z tym, co Gmail zachował: jeśli cokolwiek zostało okrojone, wiersz wyniku dostaje odznakę "okrojony przez Gmail", a testowy podpis w edytorze mówi Ci, które elementy zniknęły. Zobacz [Gdy Gmail okrawa Twój podpis](/docs/gmail-sanitization).
- **Zobacz podpis, który skrzynka ma w tej chwili.** Z poziomu [Logów](/docs/logs) otworzysz i obejrzysz aktualny podpis Gmail dowolnego pracownika, bez proszenia go o zrzut ekranu. Przydatne, gdy ktoś edytował swój podpis ręcznie w Gmailu albo gdy chcesz mieć dowód, że wdrożenie doszło do skutku.
- **Tekst alternatywny dla logo i banerów.** Każdy obrazek w Twojej bibliotece może teraz nieść krótki opis, który odbiorcy zobaczą, gdy ich program pocztowy blokuje obrazki - jedna z najprostszych rzeczy, jakie da się zrobić dla dostępności podpisu e-mail. Zobacz [Banery i logo](/docs/banners-and-logos).
- **Dowolny obrazek prosto z adresu URL.** Obok współdzielonej biblioteki obrazków edytor wizualny umieści teraz jednorazowy obrazek hostowany gdziekolwiek - z własnym opisem, kształtem prostokątnym albo zaokrąglonym i zmianą rozmiaru przez przeciąganie. Zdjęcia profilowe dostały ten sam wybór: okrągłe (domyślnie) albo kwadratowe.
- **Separatory, które możesz ostylować.** Wstaw poziomą linię między blokami i ustaw jej kolor oraz długość - to schludny sposób na oddzielenie nazwiska od danych kontaktowych.
- **Kolumny, które znikają, gdy są puste.** Całą kolumnę można teraz oznaczyć jako warunkową, więc kolumna ze zdjęciem (albo z telefonem) znika u osób bez zdjęcia lub bez numeru, zamiast zostawiać dziurę w ich podpisie.
- **Lepszy import istniejących podpisów HTML.** Wielowierszowe tabele układu, sekcje warunkowe wokół całych komórek i ręcznie pisane znaczniki przechodzą teraz przełączenie na edytor wizualny znacznie wierniej.
- **Aktualizacja polityki prywatności.** Nowa wersja [Polityki prywatności](https://signature.cat/privacy) obowiązuje od dziś: opisuje opcjonalne przechowywanie [danych użytkowników](/docs/user-data) oraz odczytywanie podpisu ze skrzynki.

## Lipiec 2026

- **Uzupełnij luki w danych z katalogu.** Brakujące stanowiska czy numery telefonów nie blokują już dobrego podpisu. Na nowej zakładce **Dane** zapiszesz wartości per użytkownik, które w podpisach nadpisują katalog Google, zaimportujesz ich setki z pliku CSV albo pozwolisz ludziom uzupełnić własne dane. Funkcja jest wyłączona, dopóki jej nie włączysz, a wyłączenie kasuje wszystko, co przechowywała. Zobacz [Dane użytkowników](/docs/user-data).
- **Wizualny edytor podpisów.** Projektuj szablony podpisów Gmail bez pisania HTML: chipy zmiennych do przeciągania i upuszczania, układy 2-3 kolumn, czcionki web-safe, bezpieczna dla e-maili paleta kolorów i widoczne bloki warunkowe - z wynikiem gwarantowanie renderującym się poprawnie w Gmailu. Klasyczny edytor HTML pozostaje o jedną kartę obok. Zobacz nowy przewodnik [Edytor wizualny](/docs/visual-editor).
- **Zmiana rozmiaru obrazków per szablon.** Przeciągaj narożniki logo, banera lub zdjęcia profilowego wprost na kanwie - każdy szablon podpisu trzyma własny rozmiar, a wpisy banerów w bibliotece mogą definiować własne domyślne wymiary. Szablon może też nadpisać link po kliknięciu obrazka bez dotykania współdzielonej biblioteki.
- **Szerokości kolumn do przeciągania.** Chwyć odstęp między dwiema kolumnami, aby zmienić ich proporcje, albo złap cały wiersz i przenieś go. Układ 30/70 ze zdjęciem i danymi to teraz jedno przeciągnięcie, a nie zgadywanka.
- **Formatowanie, które trzyma się zmiennych.** Powiększenie `{{firstname}}` albo nadanie mu koloru naprawdę trafia teraz w takiej postaci do dostarczonego podpisu, zamiast po cichu wracać do stylu otaczającego tekstu.
- **Mądrzejsza zmienna {{photo}}.** Użyty samodzielnie, `{{photo}}` renderuje teraz gotowe okrągłe zdjęcie profilowe o rozmiarze per szablon - a użytkownicy bez zdjęcia w Google Workspace Directory nie dostają zepsutego obrazka: zdjęcie po prostu znika z ich podpisu.
- **Czytelniejsza walidacja szablonów.** Błędy zapisu wymieniają teraz z nazwy konkretny nieznany token albo liczą niezbalansowane tagi warunkowe, a edytor wyjaśnia różnicę między `{{del}}` i `{{delete}}` dwoma animowanymi mini-demo.
- **Zobacz swój podpis tak, jak pokazuje go każdy klient poczty.** Podgląd potrafi teraz symulować Gmaila w przeglądarce, Gmaila na telefonie, klasycznego Outlooka na Windows, Outlook.com i Apple Mail, w trybie jasnym i ciemnym - więc niespodziankę z trybem ciemnym złapiesz przed swoimi współpracownikami. Szablon wyrenderujesz też na rekordzie katalogu dowolnego prawdziwego użytkownika polem **Renderuj jako**. Zobacz [Podgląd w kliencie poczty](/docs/mail-client-preview).
- **Startery przebudowane pod Outlooka - i jest ich więcej.** Wbudowane punkty startowe napisaliśmy od nowa, żeby świeżo utworzony podpis nie zwijał się już do jednej linii w klasycznym Outlooku, a kreator nowego szablonu może teraz proponować dodatkowe gotowe projekty ponad trzy wbudowane.
- **Dokumentacja w czterech językach.** To centrum pomocy jest teraz dostępne po angielsku, polsku, niemiecku i francusku. Przełącznik języka w stopce prowadzi do tego samego artykułu, więc cały zespół może czytać o zarządzaniu podpisami w Google Workspace w swoim języku.
- **Zobacz, kto edytował szablon podpisu.** Każdy szablon podpisu pokazuje teraz, kto ostatnio go edytował i kiedy - na liście szablonów i w edytorze podpisu. Przydatne, gdy podpisami e-mail zarządza kilku administratorów Workspace.
- **Prostsza własna domena obrazków.** Hostowanie banerów i logo podpisów na własnej domenie wymaga teraz tylko jednego rekordu CNAME. Kreator sam sprawdza konfigurację - zobacz [Własna domena obrazków](/docs/custom-image-domain).
- **Ostrzeżenie, gdy usuwasz używany obrazek.** Usunięcie logo albo banera, z którego wciąż korzystają szablony podpisów, wysyła teraz powiadomienie w aplikacji i e-mail do administratorów, więc brakujący obrazek nigdy nie będzie cichą niespodzianką w czyjejś skrzynce.
- **Czytelniejsze wyniki wdrażania podpisów.** Widok zadania przeszedł odświeżenie: kolorowy pasek postępu, ikony wyników per użytkownik i sekcja szczegółów realizacji, która pokazuje dokładnie, które konta Gmail otrzymały nowy podpis.
- **Osobna strona Logi.** Historia przypisań podpisów ma własną stronę [Logi](/docs/logs), więc sprawdzenie, kto i kiedy dostał dany podpis e-mail, to jedno kliknięcie.
- **Ostrzeżenie, gdy psuje się dostęp do Workspace.** Jeśli SignatureCat straci dostęp, którego potrzebuje do Twojego Google Workspace, administratorzy zobaczą teraz czerwony pasek przez całą aplikację z przyciskiem **Sprawdź dostęp teraz**, zamiast dowiadywać się o wszystkim z nieudanego wdrożenia kilka dni później.
- **Przewodnik przy pierwszej wizycie.** Nowi administratorzy dostają krótkie oprowadzenie po nawigacji na stronie Podpisy, które można pominąć - nikt nie musi zgadywać, co kryje się za każdą zakładką.
- **Start publicznej dokumentacji.** signature.cat/docs wystartowało z ponad 20 przewodnikami - od [podłączenia Google Workspace](/docs/connect-google-workspace) po [pierwszy szablon podpisu](/docs/create-your-first-template). Linki pomocy w aplikacji prowadzą teraz prosto do właściwego artykułu.
- **Lepsze komunikaty błędów w całej aplikacji.** Każdy ekran pokazuje teraz czytelny komunikat w Twoim języku, gdy coś pójdzie nie tak, ze szczegółami technicznymi na wyciągnięcie ręki - przydatne przy kontakcie z pomocą.
- **Bezpieczniejsze usuwanie szablonów.** Usunięcie szablonu podpisu, który wciąż jest przypisany do grup lub jednostek organizacyjnych, pokazuje najpierw ostrzeżenie z dokładnymi licznikami.
- **Odświeżenie sekcji prawnej.** Nowe centrum informacji prawnych z regulaminem i polityką prywatności w każdym języku, przyjazny prywatności baner cookies oraz akceptacja warunków wbudowana w onboarding.

## Czerwiec 2026

- **Podpisy dla aliasów wysyłania w Gmailu.** SignatureCat zarządza podpisami e-mail także dla aliasów Gmaila, nie tylko dla adresu głównego. Włącz opcjonalne uprawnienie Google Workspace, a każdy alias wysyłania w Twojej domenie może mieć własny firmowy podpis.
- **Powiadomienia w aplikacji i nowe maile.** Dzwonek powiadomień informuje administratorów Workspace o wdrożeniach podpisów, a wszystkie maile transakcyjne przeszły czytelny, responsywny lifting.
- **Kontrola self-service per przypisanie.** Zdecyduj per grupa lub jednostka organizacyjna, czy użytkownicy mogą dostosować własny podpis e-mail, czy firmowy szablon pozostaje zablokowany - zobacz [Self-service](/docs/self-service).
- **Darmowy okres próbny dla każdego workspace.** Nowy cennik z darmowym okresem próbnym: podłącz swój Google Workspace, wypróbuj pełne zarządzanie podpisami i wybierz plan, kiedy będziesz gotowy.
- **Dopracowane wrażenia mobilne.** Podpowiedzi, lepsze układy mobilne i odświeżony ekran logowania w całej aplikacji.

## Maj 2026

- **SignatureCat debiutuje publicznie.** Pierwsze publiczne wydanie: scentralizowane zarządzanie podpisami e-mail dla Google Workspace. Zaprojektuj jeden szablon podpisu, wdróż go u każdego użytkownika Gmaila w swojej domenie i utrzymuj spójny branding automatycznie.
