---
title: Changelog
navTitle: Changelog
description: Co nowego w SignatureCat - comiesięczne podsumowanie nowych funkcji i ulepszeń w zarządzaniu podpisami e-mail dla Google Workspace i Gmaila.
updated: 2026-07-26
published: 2026-07-24
---

# Changelog

Co nowego w SignatureCat, menedżerze podpisów e-mail dla Google Workspace. Stale ulepszamy szablony podpisów, integrację z Gmailem i administrację Workspace - najważniejsze zmiany zbieramy tutaj, miesiąc po miesiącu.

## Lipiec 2026

- **Wizualny edytor podpisów.** Projektuj szablony podpisów Gmail bez pisania HTML: chipy zmiennych do przeciągania i upuszczania, układy 2-3 kolumn, czcionki web-safe, bezpieczna dla e-maili paleta kolorów i widoczne bloki warunkowe - z wynikiem gwarantowanie renderującym się poprawnie w Gmailu. Klasyczny edytor HTML pozostaje o jedną kartę obok. Zobacz nowy przewodnik [Edytor wizualny](/docs/visual-editor).
- **Zmiana rozmiaru obrazków per szablon.** Przeciągaj narożniki logo, banera lub zdjęcia profilowego wprost na kanwie - każdy szablon podpisu trzyma własny rozmiar, a wpisy banerów w bibliotece mogą definiować własne domyślne wymiary. Szablon może też nadpisać link po kliknięciu obrazka bez dotykania współdzielonej biblioteki.
- **Mądrzejsza zmienna {{photo}}.** Użyty samodzielnie, `{{photo}}` renderuje teraz gotowe okrągłe zdjęcie profilowe o rozmiarze per szablon - a użytkownicy bez zdjęcia w Google Workspace Directory nie dostają zepsutego obrazka: zdjęcie po prostu znika z ich podpisu.
- **Czytelniejsza walidacja szablonów.** Błędy zapisu wymieniają teraz z nazwy konkretny nieznany token albo liczą niezbalansowane tagi warunkowe, a edytor wyjaśnia różnicę między `{{del}}` i `{{delete}}` dwoma animowanymi mini-demo.
- **Dokumentacja w czterech językach.** To centrum pomocy jest teraz dostępne po angielsku, polsku, niemiecku i francusku. Przełącznik języka w stopce prowadzi do tego samego artykułu, więc cały zespół może czytać o zarządzaniu podpisami w Google Workspace w swoim języku.
- **Zobacz, kto edytował szablon podpisu.** Każdy szablon podpisu pokazuje teraz, kto ostatnio go edytował i kiedy - na liście szablonów i w edytorze podpisu. Przydatne, gdy podpisami e-mail zarządza kilku administratorów Workspace.
- **Prostsza własna domena obrazków.** Hostowanie banerów i logo podpisów na własnej domenie wymaga teraz tylko jednego rekordu CNAME. Kreator sam sprawdza konfigurację - zobacz [Własna domena obrazków](/docs/custom-image-domain).
- **Czytelniejsze wyniki wdrażania podpisów.** Widok zadania przeszedł odświeżenie: kolorowy pasek postępu, ikony wyników per użytkownik i sekcja szczegółów realizacji, która pokazuje dokładnie, które konta Gmail otrzymały nowy podpis.
- **Osobna strona Logi.** Historia przypisań podpisów ma własną stronę [Logi](/docs/logs), więc sprawdzenie, kto i kiedy dostał dany podpis e-mail, to jedno kliknięcie.
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
