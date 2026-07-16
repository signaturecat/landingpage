# Regulamin świadczenia usług Signature.Cat

Wersja 1.0 - obowiązuje od dnia 16.07.2026

Niniejszy Regulamin jest regulaminem świadczenia usług drogą elektroniczną w rozumieniu art. 8 ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną. Wersja polska Regulaminu jest wersją wiążącą prawnie. Wersje angielska, niemiecka i francuska są tłumaczeniami automatycznymi udostępnianymi wyłącznie w celach informacyjnych i mogą zawierać błędy; w przypadku rozbieżności rozstrzyga wersja polska.

---

## § 1. Usługodawca

1. Usługodawcą jest **Tomasz Piasecki**, prowadzący działalność gospodarczą pod firmą **SystemAdmin Tomasz Piasecki**, ul. Aleje Jerozolimskie 190, 02-486 Warszawa, NIP 1231455439 (dalej: „Usługodawca").
2. Kontakt z Usługodawcą: e-mail **contact@signature.cat**.
3. Usługa świadczona jest pod adresami: **https://app.signature.cat** (aplikacja) oraz **https://signature.cat** (strona informacyjna).

## § 2. Definicje

1. **Usługa / Platforma** - usługa Signature.Cat świadczona drogą elektroniczną w modelu SaaS, opisana w § 4.
2. **Klient** - przedsiębiorca (osoba prawna, jednostka organizacyjna lub osoba fizyczna prowadząca działalność gospodarczą), który zawarł z Usługodawcą Umowę w związku ze swoją działalnością gospodarczą lub zawodową.
3. **Umowa** - umowa o świadczenie Usługi zawarta pomiędzy Usługodawcą a Klientem na warunkach Regulaminu.
4. **Workspace** - środowisko Google Workspace Klienta, zarejestrowane na domenę Klienta, którym Klient zarządza we własnej konsoli administracyjnej Google.
5. **Konto** - konto Klienta w Platformie, powiązane z jedną domeną Workspace.
6. **Użytkownik** - osoba fizyczna działająca w imieniu Klienta, która loguje się do Platformy kontem Google należącym do Workspace Klienta.
7. **Administrator Workspace** - Użytkownik posiadający w Workspace Klienta uprawnienia super administratora Google.
8. **Poziom dostępu** - zakres uprawnień Użytkownika w Platformie, nadawany zgodnie z § 6 ust. 6.
9. **Okres Próbny (Trial)** - 7-dniowy okres testowy opisany w § 7.
10. **Plan Subskrypcyjny** - miesięczna, odnawialna subskrypcja rozliczana według liczby Seatów, opisana w § 8.
11. **Seat** - jeden aktywny (niezawieszony) użytkownik w Workspace Klienta, ustalany na podstawie katalogu użytkowników Google (Directory).
12. **DWD (Domain-Wide Delegation)** - mechanizm Google polegający na autoryzowaniu przez Administratora Workspace dedykowanego konta serwisowego do działania w Workspace Klienta w ściśle określonych zakresach (§ 5 ust. 3).
13. **Operator Płatności** - Stripe, dostawca usług płatniczych obsługujący płatności i dane rozliczeniowe (certyfikacja PCI-DSS Level 1).
14. **DPA** - umowa powierzenia przetwarzania danych osobowych w rozumieniu art. 28 RODO, zawierana pomiędzy Klientem a Usługodawcą.
15. **Regulamin** - niniejszy dokument.

## § 3. Charakter usługi - wyłącznie B2B

1. Usługa jest przeznaczona **wyłącznie dla przedsiębiorców** i może być wykorzystywana wyłącznie w związku z działalnością gospodarczą lub zawodową Klienta. Usługodawca nie świadczy Usługi na rzecz konsumentów.
2. Zawierając Umowę Klient oświadcza, że zawiera ją w ramach prowadzonej działalności gospodarczej lub zawodowej oraz że Umowa ma dla niego charakter zawodowy. Wymóg posiadania Google Workspace zarejestrowanego na domenę firmową (§ 5 ust. 1) stanowi techniczne potwierdzenie tego charakteru.
3. Do Umowy nie stosuje się przepisów o ochronie konsumentów, w tym ustawowego 14-dniowego prawa odstąpienia od umowy zawartej na odległość - w najszerszym zakresie dopuszczalnym przez prawo.
4. Osoba akceptująca Regulamin w imieniu Klienta oświadcza, że jest umocowana do zaciągania zobowiązań w imieniu Klienta.

## § 4. Zakres i opis Usługi

1. Usługa polega na centralnym zarządzaniu podpisami (sygnaturami) wiadomości e-mail użytkowników Gmail w ramach Workspace Klienta. Na dzień wejścia w życie Regulaminu Usługa obejmuje:
   1. tworzenie i edycję szablonów sygnatur w formacie HTML, ze zmiennymi personalizującymi (m.in. imię, nazwisko, stanowisko, dział, telefon, zdjęcie) oraz blokami warunkowymi; wartości zmiennych pobierane są na bieżąco z katalogu użytkowników Workspace Klienta;
   2. przypisywanie szablonów do pojedynczych użytkowników, grup Google lub jednostek organizacyjnych (OU); przypisania są rozwijane do właściwych osób w momencie wdrożenia;
   3. automatyczną, codzienną synchronizację przypisań, utrzymującą sygnatury w stanie aktualnym;
   4. opcjonalne wdrażanie sygnatur na aliasach wysyłkowych (send-as), o ile Klient wyrazi na to zgodę poprzez autoryzację dodatkowego, opcjonalnego zakresu DWD (§ 5 ust. 3 pkt 5);
   5. stronę samoobsługową dla użytkowników końcowych (podgląd, a w zależności od nadanego Poziomu dostępu także edycja własnej sygnatury);
   6. bibliotekę obrazków firmowych (logo, banery) wraz z ich hostingiem pod adresem udostępnianym przez Usługodawcę lub - po skonfigurowaniu przez Klienta rekordu CNAME - pod subdomeną własnej domeny Klienta;
   7. zarządzanie Poziomami dostępu Użytkowników (§ 6 ust. 6);
   8. rejestr zdarzeń (dziennik audytu) dokumentujący działania wykonane w Koncie;
   9. interfejs w językach: angielskim, polskim, niemieckim i francuskim;
   10. powiadomienia e-mail o zdarzeniach dotyczących Konta (m.in. rejestracja, nadanie dostępu, utrata autoryzacji DWD, zdarzenia rozliczeniowe).
2. Usługa nie obejmuje limitu liczby szablonów sygnatur ani obrazków w ramach rozsądnego użytku; ograniczenia techniczne wskazane są w § 5 ust. 5. Jedynym parametrem rozliczeniowym jest liczba Seatów (§ 8).
3. Usługodawca stale rozwija Usługę. Zmiany, które nie pogarszają funkcjonalności istotnych dla Klienta, nie stanowią zmiany Umowy.

## § 5. Wymagania techniczne i zasady korzystania

1. Korzystanie z Usługi wymaga po stronie Klienta:
   1. aktywnej subskrypcji **Google Workspace** zarejestrowanej na domenę Klienta; logowanie do Platformy możliwe jest wyłącznie kontem Google należącym do Workspace (konta prywatne, np. @gmail.com, nie są obsługiwane);
   2. Administratora Workspace (super administratora Google) - wyłącznie on może przeprowadzić autoryzację DWD w konsoli administracyjnej Google oraz dokonać pierwszej rejestracji Konta;
   3. aktualnej wersji jednej z powszechnie używanych przeglądarek internetowych (m.in. Chrome, Firefox, Safari, Edge) z włączoną obsługą JavaScript i plików cookies;
   4. aktywnego konta e-mail do odbioru powiadomień i korespondencji rozliczeniowej.
2. Sygnatury wdrażane są w usłudze **Gmail** (ustawienie sygnatury wysyłkowej użytkownika). Usługa nie obsługuje innych klientów ani serwerów poczty.
3. Działanie Usługi wymaga utrzymywania przez Klienta autoryzacji DWD dla dedykowanego konta serwisowego w następujących zakresach:
   1. `https://www.googleapis.com/auth/gmail.settings.basic` (zapis sygnatur) - wymagany;
   2. `https://www.googleapis.com/auth/admin.directory.user.readonly` (odczyt katalogu użytkowników) - wymagany;
   3. `https://www.googleapis.com/auth/admin.directory.group.member.readonly` (odczyt członkostwa w grupach) - wymagany;
   4. `https://www.googleapis.com/auth/admin.directory.customer.readonly` (odczyt podstawowych danych Workspace) - wymagany;
   5. `https://www.googleapis.com/auth/gmail.settings.sharing` (sygnatury na aliasach send-as) - opcjonalny; jego brak wyłącza wyłącznie funkcję aliasów.
   Cofnięcie lub ograniczenie autoryzacji DWD przez Klienta uniemożliwia świadczenie istotnej części Usługi i nie stanowi niewykonania Umowy przez Usługodawcę.
4. Treści sygnatur podlegają automatycznej sanityzacji po stronie serwera: niedozwolone są skrypty, zdarzenia JavaScript oraz wybrane konstrukcje CSS mogące służyć śledzeniu lub wstrzykiwaniu kodu. Obrazki przyjmowane są wyłącznie w formatach PNG i JPEG (format SVG jest blokowany ze względów bezpieczeństwa), o rozmiarze do 5 MB, w liczbie do 200 na rodzaj zasobu; pliki są weryfikowane co do faktycznego typu zawartości.
5. Zakazane jest dostarczanie przez Klienta treści o charakterze bezprawnym, w tym w szczególności: treści naruszających prawa osób trzecich (m.in. prawa autorskie do logotypów i grafik), złośliwego kodu, treści służących wysyłce niezamówionej informacji handlowej (spam) oraz treści wprowadzających odbiorców w błąd.
6. Zakazane są ponadto: próby obchodzenia zabezpieczeń lub limitów Platformy, testy bezpieczeństwa bez uprzedniej pisemnej zgody Usługodawcy, automatyczne pobieranie treści Platformy (scraping), współdzielenie Konta z podmiotami trzecimi oraz odsprzedaż Usługi bez odrębnej umowy.

## § 6. Rejestracja, Konto i Użytkownicy

1. Rejestracja Konta następuje poprzez zalogowanie się kontem Google Workspace (Google OAuth). Platforma nie przechowuje haseł Użytkowników; uwierzytelnianie realizowane jest wyłącznie przez Google.
2. **Umowa zostaje zawarta z chwilą akceptacji Regulaminu podczas rejestracji Konta, najpóźniej jednak z chwilą aktywacji Okresu Próbnego lub Planu Subskrypcyjnego.** Okres Próbny stanowi pełnoprawną umowę o świadczenie usług drogą elektroniczną.
3. Konto powiązane jest z jedną domeną Workspace. Pierwszą rejestrację Konta może przeprowadzić wyłącznie Administrator Workspace.
4. Klient zapewnia, że dane podane przy rejestracji i w rozliczeniach są prawdziwe i aktualne.
5. Klient odpowiada za działania i zaniechania wszystkich swoich Użytkowników jak za działania własne oraz zobowiązany jest zapewnić, aby dostęp do Konta miały wyłącznie osoby do tego upoważnione.
6. Dostęp Użytkowników do funkcji Platformy określają Poziomy dostępu (od dostępu samoobsługowego, przez uprawnienia projektowe i edycyjne, po pełne uprawnienia administracyjne), nadawane w Platformie przez uprawnionych Użytkowników Klienta. Administratorzy Workspace posiadają zawsze pełny poziom administracyjny i nie może im on zostać odebrany w Platformie.

## § 7. Okres Próbny

1. Nowemu Klientowi przysługuje jeden bezpłatny Okres Próbny trwający **7 dni** od aktywacji, obejmujący - na dzień wejścia w życie Regulaminu - pełną funkcjonalność Usługi, z zastrzeżeniem ust. 8.
2. Aktywacja Okresu Próbnego wymaga podania ważnej karty płatniczej w formularzu Operatora Płatności. **W trakcie Okresu Próbnego karta nie jest obciążana.**
3. **Po upływie Okresu Próbnego subskrypcja przekształca się automatycznie w płatny Plan Subskrypcyjny, a karta Klienta zostaje obciążona pierwszą opłatą miesięczną** - chyba że Klient anuluje subskrypcję przed upływem Okresu Próbnego. Anulowanie przed końcem Okresu Próbnego nie wiąże się z żadnymi opłatami.
4. Usługodawca przypomina o zbliżającym się końcu Okresu Próbnego wiadomością e-mail wysyłaną około 3 dni przed jego upływem.
5. Jeżeli w chwili zakończenia Okresu Próbnego Konto nie posiada ważnej metody płatności, subskrypcja zostaje automatycznie anulowana bez naliczania opłat, a dostęp do funkcji Platformy zostaje zablokowany do czasu wykupienia Planu Subskrypcyjnego.
6. **Okres Próbny przysługuje jednokrotnie na daną domenę Workspace.** Wykorzystanie Okresu Próbnego jest odnotowywane w rejestrze prowadzonym przez Usługodawcę i pozostaje skuteczne także po usunięciu Konta; ponowna rejestracja tej samej domeny rozpoczyna się bezpośrednio od płatnego Planu Subskrypcyjnego.
7. Zakończenie Okresu Próbnego bez konwersji na Plan Subskrypcyjny nie powoduje automatycznego usunięcia danych Konta; zasady przechowywania i usuwania danych określa § 15 oraz Polityka Prywatności.
8. **Okres Próbny świadczony jest „w stanie, w jakim jest" (as-is), w najszerszym zakresie dopuszczalnym przez prawo.** W Okresie Próbnym:
   1. nie obowiązuje cel dostępności, o którym mowa w § 9 ust. 1, a Klientowi nie przysługują kredyty serwisowe ani odszkodowanie za niedostępność Usługi;
   2. Usługodawca nie udziela gwarancji ani zapewnień co do działania, dostępności i przydatności Usługi do celów Klienta;
   3. wsparcie techniczne świadczone jest wyłącznie drogą e-mail (contact@signature.cat), bez gwarantowanego czasu odpowiedzi;
   4. Usługodawca może ograniczyć lub zmienić zakres funkcji dostępnych w Okresie Próbnym.
   Postanowienia niniejszego ustępu nie ograniczają procedury reklamacyjnej (§ 13) ani odpowiedzialności za szkody wyrządzone z winy umyślnej.

## § 8. Opłaty i rozliczenia

1. Usługa rozliczana jest w modelu **miesięcznej subskrypcji płatnej z góry**, w dolarach amerykańskich (USD). Plan roczny nie jest oferowany.
2. Wysokość opłaty zależy od liczby Seatów, według progów naliczanych **kaskadowo (graduated)** - każdy Seat rozliczany jest według stawki progu, do którego należy:

   | Liczba Seatów | Stawka za Seat / miesiąc |
   |---|---|
   | 1 - 50 | 0,80 USD |
   | 51 - 120 | 0,70 USD |
   | 121 - 300 | 0,60 USD |
   | od 301 | 0,55 USD |

   Przykład: 60 Seatów = 50 x 0,80 USD + 10 x 0,70 USD = 47,00 USD miesięcznie.
3. Liczba Seatów odpowiada liczbie aktywnych (niezawieszonych) użytkowników w Workspace Klienta, nie mniej niż 1, i jest **aktualizowana automatycznie** na podstawie katalogu użytkowników Workspace: wzrost liczby Seatów rozliczany jest niezwłocznie z proporcjonalną dopłatą za pozostałą część okresu rozliczeniowego, a zmniejszenie liczby Seatów uwzględniane jest od kolejnego okresu rozliczeniowego (Klient nie otrzymuje zwrotu za bieżący okres).
4. Płatności obsługuje Operator Płatności. **Usługodawca nie przechowuje danych kart płatniczych.** Dane rozliczeniowe (nazwa firmy, adres, opcjonalnie NIP/VAT ID) podawane są w formularzu Operatora Płatności i tam przechowywane; w Platformie Klient zarządza wyłącznie adresem e-mail do rozliczeń.
5. Ceny wskazane w ust. 2 nie obejmują podatków. Klient odpowiada za rozliczenie podatków należnych zgodnie z przepisami właściwej dla niego jurysdykcji, w tym - w przypadku podatników VAT z UE - z uwzględnieniem mechanizmu odwrotnego obciążenia, jeżeli znajduje on zastosowanie.
6. Potwierdzenia płatności i dokumenty rozliczeniowe dostarczane są na adres e-mail do rozliczeń wskazany przez Klienta.
7. **Subskrypcja odnawia się automatycznie co miesiąc** do czasu jej anulowania. Klient może anulować subskrypcję w każdej chwili - w ustawieniach Platformy lub w portalu rozliczeniowym Operatora Płatności - ze skutkiem na koniec bieżącego, opłaconego okresu rozliczeniowego. Do końca tego okresu Usługa pozostaje w pełni dostępna.
8. W razie nieudanego obciążenia karty:
   1. dostęp do Usługi jest utrzymywany przez **3-dniowy okres naprawczy**, liczony od pierwszej nieudanej próby obciążenia; Klient jest informowany wiadomością e-mail oraz komunikatem w Platformie i może w tym czasie zaktualizować metodę płatności;
   2. ponowne próby obciążenia realizowane są automatycznie przez Operatora Płatności;
   3. po bezskutecznym upływie okresu naprawczego dostęp do funkcji Platformy zostaje zawieszony do czasu uregulowania zaległości; skuteczne obciążenie przywraca dostęp automatycznie.
9. **Opłaty za rozpoczęty okres rozliczeniowy nie podlegają zwrotowi**, w tym w razie anulowania subskrypcji lub usunięcia Konta w trakcie okresu. Nie wyłącza to roszczeń Klienta z tytułu niewykonania Umowy przez Usługodawcę.
10. Usługodawca jest uprawniony do zmiany cennika, w szczególności w razie zmiany kosztów świadczenia Usługi, zakresu funkcji, stawek dostawców zewnętrznych lub otoczenia rynkowego. Zmiana cennika wymaga powiadomienia Klienta wiadomością e-mail z co najmniej **30-dniowym** wyprzedzeniem (§ 14 ust. 5) i obowiązuje najwcześniej od kolejnego okresu rozliczeniowego rozpoczynającego się po upływie tego terminu. Ceny nie ulegają zmianie w trakcie opłaconego okresu. Klient, który nie akceptuje nowych cen, może anulować subskrypcję zgodnie z ust. 7.

## § 9. Dostępność Usługi

1. Usługodawca dokłada należytej staranności, aby dostępność Platformy wynosiła co najmniej **99% w skali miesiąca kalendarzowego**. Cel ten nie obowiązuje w Okresie Próbnym (§ 7 ust. 8).
2. Do niedostępności nie wlicza się przerw wynikających z:
   1. planowanych prac utrzymaniowych, zapowiedzianych z wyprzedzeniem;
   2. awarii lub ograniczeń po stronie zewnętrznych dostawców infrastruktury i usług, z których korzysta Platforma (m.in. hosting, sieć dostarczania treści, operator płatności, usługi i interfejsy API Google);
   3. siły wyższej;
   4. przyczyn leżących po stronie Klienta, w szczególności cofnięcia autoryzacji DWD, zmian w konfiguracji Workspace lub braku spełnienia wymagań technicznych z § 5.
3. Wdrażanie sygnatur jest zależne od dostępności i zasad działania interfejsów API Google; Usługodawca nie odpowiada za zmiany wprowadzane przez Google w tych interfejsach ani za decyzje Google dotyczące Workspace Klienta.
4. Awarie i nieprawidłowości można zgłaszać na adres contact@signature.cat. Regulamin nie przewiduje kredytów serwisowych; indywidualne gwarancje SLA mogą zostać uzgodnione w odrębnej umowie.

## § 10. Odpowiedzialność

1. Usługodawca odpowiada za niewykonanie lub nienależyte wykonanie Umowy na zasadach ogólnych, z ograniczeniami wskazanymi poniżej, dopuszczalnymi w obrocie profesjonalnym (B2B).
2. **Łączna odpowiedzialność Usługodawcy** z wszelkich tytułów związanych z Umową ograniczona jest do równowartości **jednej miesięcznej opłaty subskrypcyjnej** za Konto, którego dotyczy szkoda - w wysokości opłaty za okres rozliczeniowy, w którym nastąpiło zdarzenie wywołujące szkodę, a jeżeli opłata za ten okres nie została naliczona (w szczególności w Okresie Próbnym) - w wysokości obliczonej według liczby Seatów Klienta i cennika obowiązujących w dniu zdarzenia.
3. Usługodawca nie odpowiada za utracone korzyści ani szkody pośrednie i następcze, w tym utratę przychodów, renomy lub danych przetwarzanych poza Platformą.
4. Ograniczenia z ust. 2 i 3 nie mają zastosowania do szkód wyrządzonych z winy umyślnej.
5. Klient odpowiada za:
   1. treści wprowadzane do Platformy (szablony, obrazki, adresy URL), w tym za posiadanie praw do ich wykorzystania;
   2. zgodność treści sygnatur z prawem obowiązującym Klienta (w tym z wymogami dotyczącymi oznaczania korespondencji handlowej);
   3. skutki działań osób, którym umożliwił dostęp do Konta, oraz skutki nieuprawnionego dostępu wynikającego z niedochowania przez Klienta zasad bezpieczeństwa po jego stronie;
   4. utrzymanie autoryzacji DWD oraz poprawność konfiguracji Workspace.
6. W razie istotnego naruszenia Regulaminu Usługodawca może - po bezskutecznym wezwaniu do zaniechania naruszeń, a w przypadkach rażących (np. dystrybucja złośliwego kodu, spam) niezwłocznie - zawiesić dostęp do Konta do czasu wyjaśnienia sprawy. Zawieszenie nie zwalnia Klienta z obowiązku zapłaty za bieżący okres rozliczeniowy.

## § 11. Własność intelektualna i licencja

1. Platforma, w tym jej kod, interfejs, dokumentacja, znaki i logotypy Signature.Cat, stanowi własność Usługodawcy lub przedmiot przysługujących mu praw.
2. Na czas trwania Umowy Usługodawca udziela Klientowi niewyłącznej, nieprzenoszalnej, ograniczonej terytorialnie do zakresu działania Usługi licencji na korzystanie z Platformy, wyłącznie na potrzeby własnej działalności Klienta. Licencja nie obejmuje prawa do sublicencjonowania.
3. Zakazane jest dekompilowanie, odtwarzanie kodu źródłowego (reverse engineering), kopiowanie lub tworzenie utworów zależnych Platformy, poza przypadkami dozwolonymi bezwzględnie obowiązującymi przepisami prawa.
4. **Treści Klienta** (szablony sygnatur, obrazki, konfiguracja) pozostają własnością Klienta. Klient udziela Usługodawcy licencji ograniczonej do zakresu niezbędnego do świadczenia Usługi (przechowywanie, przetwarzanie, renderowanie i publikowanie obrazków pod adresami hostingowymi, wdrażanie sygnatur w Workspace Klienta).
5. Usługodawca **nie wykorzystuje treści ani danych Klienta do trenowania modeli sztucznej inteligencji** ani do celów innych niż świadczenie i utrzymanie Usługi.

## § 12. Dane osobowe i DPA

1. W zakresie danych osobowych Użytkowników, danych rozliczeniowych i danych zbieranych przez strony Usługodawcy - administratorem danych jest Usługodawca. Zasady przetwarzania określa Polityka Prywatności dostępna pod adresem https://signature.cat/privacy.
2. W zakresie danych osobowych pracowników i współpracowników Klienta przetwarzanych w ramach Usługi (dane katalogu Workspace wykorzystywane w sygnaturach) - administratorem danych jest Klient, a Usługodawca działa jako podmiot przetwarzający (procesor) na udokumentowane polecenie Klienta.
3. Strony zawierają DPA regulującą powierzenie, o którym mowa w ust. 2. Zawarcie DPA następuje na wniosek Klienta skierowany na adres contact@signature.cat. DPA zawierana jest wyłącznie w języku angielskim i wersja angielska jest jej jedyną wersją wiążącą. Do czasu zawarcia indywidualnej DPA powierzenie odbywa się na zasadach opisanych w Polityce Prywatności i Regulaminie.
4. Wykaz podprocesorów (dalszych podmiotów przetwarzających) Usługodawca udostępnia Klientowi w ramach DPA oraz na żądanie.

## § 13. Reklamacje

1. Reklamacje dotyczące Usługi można składać na adres **contact@signature.cat**.
2. Zgłoszenie powinno zawierać: domenę Workspace, opis problemu, datę i godzinę wystąpienia oraz - w miarę możliwości - identyfikator żądania lub zrzut ekranu komunikatu błędu.
3. Usługodawca potwierdza przyjęcie reklamacji w terminie 3 dni roboczych i rozpatruje ją w terminie **14 dni** od otrzymania kompletnego zgłoszenia. O wyniku Klient informowany jest na adres e-mail, z którego wysłano zgłoszenie, lub na inny wskazany adres.
4. Jeżeli rozpatrzenie reklamacji wymaga uzupełnienia informacji, termin z ust. 3 biegnie od dnia ich dostarczenia.

## § 14. Zmiany Regulaminu i cennika, powiadomienia

1. Usługodawca jest uprawniony do zmiany Regulaminu, w szczególności w razie: zmiany zakresu lub sposobu działania Usługi, zmiany przepisów prawa lub ich wykładni, zmiany warunków dostawców zewnętrznych, względów bezpieczeństwa, a także w celu wprowadzenia zmian redakcyjnych. Uprawnienie do zmiany cennika reguluje § 8 ust. 10.
2. Zmiany wchodzą w życie z zachowaniem następujących okresów wyprzedzenia, liczonych od dnia opublikowania powiadomienia:
   1. **zmiany cennika** - co najmniej **30 dni**, ze skutkiem najwcześniej od kolejnego okresu rozliczeniowego (§ 8 ust. 10);
   2. **zmiany funkcjonalne** (dotyczące zakresu lub sposobu działania Usługi albo praw i obowiązków stron) - co najmniej **10 dni**;
   3. **zmiany redakcyjne lub kosmetyczne**, niewpływające na prawa i obowiązki Klienta - co najmniej **7 dni**;
   4. **zmiany wynikające z bezwzględnie obowiązujących przepisów prawa lub decyzji organów** - **niezwłocznie**, w tym bez zachowania okresów wskazanych w pkt 1-3, jeżeli wymaga tego termin wynikający z przepisu lub decyzji.
3. Powiadomienia o zmianach, o których mowa w ust. 2 pkt 2-4, wyświetlane są w interfejsie aplikacji po zalogowaniu. Użytkownik zobowiązany jest do regularnego logowania się i sprawdzania powiadomień. Skorzystanie z aplikacji po dacie wejścia zmiany w życie jest równoznaczne z jej akceptacją.
4. Jeżeli żaden Użytkownik Klienta nie zalogował się do Platformy w okresie 30 dni poprzedzających opublikowanie powiadomienia, o którym mowa w ust. 3, Usługodawca może dodatkowo przesłać powiadomienie na adres e-mail Klienta; wysyłka ta ma charakter pomocniczy, nie jest gwarantowana i jej brak nie wpływa na skuteczność powiadomienia opublikowanego w Platformie.
5. **O zmianach cennika (ust. 2 pkt 1) Usługodawca informuje wiadomością e-mail**, wysyłaną z adresu **alerts@signature.cat** na adres e-mail do rozliczeń, a w jego braku - na adres e-mail Administratora Workspace. Powiadomienie uważa się za doręczone z chwilą jego wysłania na właściwy adres. Usługodawca nie ponosi odpowiedzialności za niedostarczenie lub opóźnienie doręczenia wiadomości z przyczyn leżących po stronie Klienta lub jego dostawcy poczty, w szczególności wskutek: uznania wiadomości za spam, umieszczenia jej w kwarantannie, odrzucenia na poziomie serwera odbiorczego lub reguł filtrowania skonfigurowanych w domenie Klienta. W celu zapewnienia doręczalności Klient powinien dodać adres alerts@signature.cat do listy zaufanych nadawców (whitelisty) w swojej domenie oraz utrzymywać aktualny adres e-mail do rozliczeń; skutki zaniechania tych czynności obciążają Klienta. Zasady doręczeń określone w niniejszym ustępie stosuje się odpowiednio do pozostałych powiadomień e-mail przewidzianych Regulaminem.
6. Klient, który nie akceptuje zmian, może przed datą ich wejścia w życie wypowiedzieć Umowę bez dodatkowych kosztów - poprzez anulowanie subskrypcji ze skutkiem na koniec bieżącego okresu rozliczeniowego.
7. Usługodawca prowadzi archiwum poprzednich wersji Regulaminu i udostępnia je na żądanie przesłane na contact@signature.cat.

## § 15. Rozwiązanie Umowy, dane po zakończeniu i migracja

1. Umowa zawierana jest na czas nieokreślony, z miesięcznymi okresami rozliczeniowymi.
2. **Klient może rozwiązać Umowę w każdym czasie** poprzez anulowanie subskrypcji (§ 8 ust. 7), ze skutkiem na koniec bieżącego okresu rozliczeniowego, bez kar umownych i bez opłat za zakończenie. Okres wypowiedzenia nie przekracza zatem jednego miesięcznego okresu rozliczeniowego.
3. Usługodawca może wypowiedzieć Umowę z zachowaniem 30-dniowego okresu wypowiedzenia, nie wcześniej jednak niż na koniec opłaconego okresu rozliczeniowego, w szczególności w razie zakończenia świadczenia Usługi. W razie rażącego naruszenia Regulaminu przez Klienta Usługodawca może wypowiedzieć Umowę ze skutkiem natychmiastowym, po uprzednim zastosowaniu § 10 ust. 6, chyba że charakter naruszenia to uniemożliwia.
4. Po wygaśnięciu subskrypcji dostęp do funkcji Platformy zostaje zablokowany, a dane Konta są przechowywane zgodnie z Polityką Prywatności - do czasu ich usunięcia na żądanie Klienta albo upływu okresów tam wskazanych. Sygnatury wdrożone wcześniej w skrzynkach użytkowników Klienta pozostają bez zmian (Usługa ich nie usuwa).
5. **Usunięcie Konta** jest dostępne samoobsługowo w ustawieniach Platformy dla Użytkownika z uprawnieniami administracyjnymi i wymaga potwierdzenia przez wpisanie domeny Workspace. Z chwilą zgłoszenia żądania subskrypcja zostaje anulowana ze skutkiem natychmiastowym, a po upływie **7 dni** dane Konta są trwale usuwane (w tym szablony, przypisania, obrazki, konta Użytkowników oraz dedykowane zasoby chmurowe Klienta), z zastrzeżeniem danych, których dłuższe przechowywanie przewiduje Polityka Prywatności lub przepisy prawa.
6. **Eksport danych:** na wniosek złożony na adres contact@signature.cat Usługodawca udostępnia Klientowi eksport danych Konta (w szczególności szablonów sygnatur i konfiguracji przypisań) w powszechnie używanym, otwartym formacie nadającym się do odczytu maszynowego (JSON lub CSV) - w trakcie obowiązywania Umowy oraz w terminie **30 dni** od jej zakończenia, o ile dane nie zostały wcześniej trwale usunięte na żądanie Klienta. Eksport jest bezpłatny.
7. Usługodawca nie stosuje opłat za zmianę dostawcy ani technicznych utrudnień w migracji danych do innego dostawcy lub infrastruktury własnej Klienta.
8. Po zakończeniu Umowy Klient powinien samodzielnie usunąć wpis autoryzacji DWD w konsoli administracyjnej Google - Usługodawca nie ma technicznej możliwości wykonania tego za Klienta.

## § 16. Postanowienia końcowe

1. Prawem właściwym dla Umowy jest **prawo polskie**.
2. Sądem właściwym dla sporów wynikających z Umowy jest sąd powszechny właściwy miejscowo dla siedziby Usługodawcy. Zdanie poprzednie nie narusza bezwzględnie obowiązujących przepisów o jurysdykcji.
3. Jeżeli poszczególne postanowienia Regulaminu okażą się nieważne lub bezskuteczne, pozostałe postanowienia pozostają w mocy, a w miejsce postanowienia nieważnego stosuje się ważne postanowienie najbliższe jego celowi gospodarczemu.
4. Regulamin wchodzi w życie z dniem **16.07.2026**.

---

SystemAdmin Tomasz Piasecki, ul. Aleje Jerozolimskie 190, 02-486 Warszawa, NIP 1231455439
contact@signature.cat
