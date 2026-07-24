---
title: Połącz swój Google Workspace
navTitle: Połącz Google Workspace
description: Zarejestruj SignatureCat jako superadmin Google Workspace, utwórz odizolowane konto usługi i autoryzuj Domain-Wide Delegation.
updated: 2026-07-17
---

# Połącz swój Google Workspace

Aby połączyć Google Workspace z SignatureCat, **superadmin Workspace** loguje się na [app.signature.cat](https://app.signature.cat), tworzy dedykowane konto usługi i autoryzuje je w Google Admin console przez Domain-Wide Delegation (DWD). Cały proces zajmuje około 10 minut i jest wymagany dokładnie raz.

> [!IMPORTANT]
> Pierwszą rejestrację konta firmy musi przeprowadzić **superadmin Google Workspace**. Tylko superadmin może otworzyć stronę Domain-Wide Delegation w Google Admin console, a SignatureCat potrzebuje dostępu do katalogu, aby poprawnie policzyć Twoich użytkowników. Zwykłych użytkowników można zaprosić później - nie potrzebują uprawnień administratora. Zobacz [Zarządzanie dostępem](/docs/user-management/).

## Krok 1: Zaloguj się przez Google

Otwórz [app.signature.cat](https://app.signature.cat) i kliknij **Zaloguj się przez Google**, używając konta firmowego. Na tym etapie SignatureCat prosi wyłącznie o podstawowe zakresy logowania `openid email profile` - uprawnienia Workspace są nadawane osobno w kroku 3, i to wyłącznie Twojemu własnemu, odizolowanemu kontu usługi.

Prywatne konta Gmail są odrzucane: SignatureCat wymaga konta Google Workspace.

## Krok 2: Skonfiguruj swój workspace

Zaraz po pierwszym zalogowaniu trafiasz na ekran **Skonfiguruj swój workspace**. Kliknięcie **Skonfiguruj workspace** tworzy dedykowane, odizolowane konto serwisowe Google Cloud dla Twojej organizacji - to tożsamość, która będzie zarządzać podpisami Gmail w Twoim imieniu. Zwykle zajmuje to kilka sekund (do 15).

> [!NOTE]
> Każdy klient dostaje **własne** konto usługi. Jego poświadczenia są przechowywane w sejfie sekretów, nigdy w bazie danych aplikacji, a klucze są rotowane automatycznie. Rotacja nigdy nie zmienia Client ID, więc nigdy nie będziesz musieć z jej powodu autoryzować dostępu ponownie.

Ten krok może ukończyć wyłącznie administrator, który założył organizację.

## Krok 3: Autoryzuj Domain-Wide Delegation

Następnie kreator **Autoryzuj SignatureCat w Workspace** pod adresem [app.signature.cat/onboarding/dwd](https://app.signature.cat/onboarding/dwd) prowadzi Cię przez Google Admin console:

1. **Otwórz Konsolę Administratora** - kreator linkuje wprost do [strony Domain-wide delegation](https://admin.google.com/ac/owl/domainwidedelegation) (Security, API Controls, Domain-wide delegation). Zaloguj się jako superadmin.
2. **Dodaj nowy** - kliknij **Add new** API client.
3. **Wklej Client ID** - skopiuj numeryczny Client ID pokazany w kreatorze (unikalny dla Twojej organizacji) i wklej go w formularzu Admin console. Użyj przycisku kopiowania; to musi być identyfikator numeryczny, nie adres e-mail.
4. **Wklej zakresy OAuth** - skopiuj z kreatora ciąg zakresów oddzielonych przecinkami i wklej go w pole OAuth scopes:

```
https://www.googleapis.com/auth/gmail.settings.basic,https://www.googleapis.com/auth/admin.directory.user.readonly,https://www.googleapis.com/auth/admin.directory.group.member.readonly,https://www.googleapis.com/auth/admin.directory.customer.readonly,https://www.googleapis.com/auth/gmail.settings.sharing
```

5. **Autoryzuj** - kliknij **Authorize** w Admin console.
6. **Sprawdź** - z powrotem w SignatureCat kliknij **Sprawdź**. Aplikacja wykonuje test łączności dla każdego zakresu i pokazuje wynik OK / Błąd per zakres.

Ostatni zakres, `gmail.settings.sharing`, jest **opcjonalny**: jest potrzebny wyłącznie do zapisywania podpisów na aliasach send-as. Możesz go teraz pominąć i dodać później - cała reszta działa, a kreator pokaże informację "Obsługa aliasów jest wyłączona". Zobacz [Przypisania](/docs/assignments/#alias-modes), aby dowiedzieć się, co odblokowują aliasy.

> [!WARNING]
> Wklej ciąg zakresów dokładnie tak, jak został skopiowany. Brakujący lub zmieniony zakres oblewa sprawdzenie z błędem per zakres, na przykład "Ten zakres nie został autoryzowany. Powtórz krok 4 z dokładnym ciągiem zakresów."

### Sprawdzenie zgłasza, że dostęp wciąż się propaguje

Google potrzebuje chwili, aby rozpropagować świeży grant DWD - zwykle sekund, czasem do około 30 sekund. Przycisk **Sprawdź** sam odczekuje większość tego okna. Jeśli nadal widzisz żółtą kartę "dostęp może się jeszcze propagować", odczekaj chwilę i kliknij **Sprawdź** ponownie. To nie jest błąd.

## Krok 4: Płatności

Po zweryfikowaniu DWD trafiasz na [Płatności](https://app.signature.cat/billing), aby rozpocząć 7-dniowy bezpłatny okres próbny (karta jest pobierana z góry, a obciążana po zakończeniu okresu próbnego). Zobacz [Faktury](/docs/invoices/), aby poznać progi cenowe.

To wszystko - przejdź do [Utwórz swój pierwszy szablon](/docs/create-your-first-template/).

## Odnawianie lub ponowne nadawanie Domain-Wide Delegation

Jeśli wpis DWD lub któryś z jego zakresów zostanie później usunięty w Google Admin console, SignatureCat wykryje to przed najbliższą synchronizacją: synchronizacje podpisów zostają wstrzymane, administratorzy dostają powiadomienie w aplikacji i e-mail, a aplikacja prosi o ponowne przejście kreatora.

Aby uruchomić go ponownie w dowolnym momencie, otwórz [Ustawienia](https://app.signature.cat/settings), znajdź sekcję **Konto usługi** i kliknij **Uruchom ponownie kreator DWD** (tam też widoczny jest Client ID). Gdy sprawdzenie przejdzie, synchronizacje wznawiają się automatycznie.

> [!WARNING]
> Usunięcie wpisu Domain-Wide Delegation w Admin console natychmiast psuje zarządzanie podpisami w całym Twoim workspace. Jeśli usuwasz konto SignatureCat, usuń wpis DWD dopiero potem - SignatureCat nie może usunąć go za Ciebie.
