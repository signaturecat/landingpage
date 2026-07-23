---
title: Zarządzanie dostępem i poziomy dostępu
navTitle: Zarządzanie dostępem
description: Kto może logować się do SignatureCat, na co pozwala każdy poziom dostępu i jak nadawać dostęp pojedynczym użytkownikom lub całym grupom Google.
updated: 2026-07-17
---

# Zarządzanie dostępem i poziomy dostępu

Do SignatureCat mogą logować się tylko osoby, które jawnie wpuścisz: superadmini Workspace (zawsze dozwoleni), użytkownicy z bezpośrednim grantem dostępu i członkowie grup, którym nadasz dostęp. Wszyscy pozostali są zawracani przy logowaniu. Dostępem zarządzasz na stronie [Zarządzanie dostępem](https://app.signature.cat/user-management) (tylko Admin).

## Na co pozwala każdy poziom dostępu?

| Poziom dostępu | Na co pozwala |
|---|---|
| Self-service | Ustawia własny podpis wyłącznie z szablonów organizacji. |
| Self-service + edycja | Self-service plus własny kod HTML podpisu. |
| Designer | Edytuje szablony podpisów organizacji. |
| Editor | Designer plus zarządzanie przypisaniami i zadaniami zastosowania oraz powiadomienia w aplikacji. |
| Admin | Pełny dostęp, łącznie z płatnościami, zarządzaniem dostępem, domenami obrazków i kreatorem DWD. |

Kilka praktycznych konsekwencji:

- **Szablony** ([Podpisy](https://app.signature.cat/signatures)): Designer, Editor, Admin.
- **Przypisania i Zastosuj** ([Przypisania](https://app.signature.cat/assignments), [Zastosuj](https://app.signature.cat/apply)): Editor, Admin.
- **Płatności, zarządzanie dostępem, własna domena obrazków**: tylko Admin.
- Użytkownicy z poziomem Editor widzą [powiadomienia](/docs/notifications/) w aplikacji; **e-maile** alertowe i rozliczeniowe trafiają wyłącznie do administratorów.

> [!NOTE]
> **Superadmini** Workspace zawsze mają poziom Admin. Jest to egzekwowane przy każdym logowaniu i nie da się tego odebrać w SignatureCat - aby to zmienić, zmień ich status administratora w samym Google Workspace.

## Kto może się logować?

Logowanie odbywa się wyłącznie przez Google i wymaga konta Google Workspace w Twojej domenie. Gdy próbuje ktoś bez dostępu, widzi: „Twoje konto nie ma jeszcze dostępu do SignatureCat. Poproś superadmina Workspace o nadanie dostępu, a następnie zaloguj się ponownie." - i nic w Twoim workspace się nie zmienia.

Sesje trwają do 7 dni nieaktywności z twardym limitem 14 dni, potem potrzebne jest ponowne zalogowanie przez Google jednym kliknięciem.

## Nadaj dostęp pojedynczemu użytkownikowi

1. Otwórz [Zarządzanie dostępem](https://app.signature.cat/user-management) i kliknij **Dodaj dostęp**.
2. Na karcie **Użytkownik** wpisz adres e-mail (musi należeć do Twojego Workspace, łącznie z domenami wtórnymi).
3. Wybierz poziom dostępu i kliknij **Zapisz dostęp**.

Użytkownik otrzymuje e-mail z zaproszeniem „Masz teraz dostęp do signature.cat".

Bezpośredni grant użytkownika zawsze **nadpisuje** grant grupowy dla tej osoby - nawet jeśli grant grupowy jest silniejszy.

## Nadaj dostęp całej grupie Google

1. W tym samym panelu przełącz się na kartę **Grupa**.
2. Wklej email grupy (na przykład `engineering@example.com`), wybierz poziom i zapisz.

> [!WARNING]
> Grant grupowy obejmuje **wszystkich w grupie, łącznie z osobami dodanymi do niej w przyszłości** - członkostwo jest sprawdzane na żywo przy każdym logowaniu, bez potwierdzania per osoba. Szerokim grupom nadawaj najniższy poziom, który wystarcza (zwykle Self-service).

> [!IMPORTANT]
> Członkostwo w grupie jest ustalane w momencie logowania użytkownika. Ktoś, kto jest już zalogowany albo został właśnie dodany do grupy, może musieć **zalogować się ponownie**, zanim nowy dostęp zacznie obowiązywać.

## Odbieranie i zmiana dostępu

- Granty edytujesz i usuwasz z tej samej strony. Usunięcie grantu blokuje następne logowanie; nie usuwa podpisu, który jest już zastosowany w skrzynce.
- Nie możesz zmienić ani odebrać **własnego** dostępu - musi to zrobić inny administrator (interfejs pokazuje odznakę „To Ty" zamiast kontrolek).
- Poziomy dostępu kontrolują wyłącznie aplikację SignatureCat. Nie mają żadnego wpływu na konto Google użytkownika.

## Pozwól użytkownikom zarządzać własnym podpisem

Nadaj użytkownikom (lub grupie) poziom **Self-service** i włącz co najmniej jeden szablon do self-service - pełny przebieg jest opisany w [Self-service](/docs/self-service/).
