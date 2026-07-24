---
title: Uzyskaj pomoc
navTitle: Uzyskaj pomoc
description: Jak skontaktować się z supportem SignatureCat, co zawrzeć w zgłoszeniu i gdzie zajrzeć przed napisaniem - strona statusu, logi i typowe rozwiązania.
updated: 2026-07-17
---

# Uzyskaj pomoc

Support jest dostępny e-mailowo pod adresem [contact@signature.cat](mailto:contact@signature.cat). Zanim napiszesz, szybka samodzielna diagnoza często daje odpowiedź szybciej - większość przypadków "podpisy przestały się stosować" to jedna z trzech znanych przyczyn.

## Szybka samodzielna diagnoza

1. **Czy to incydent platformy?** Sprawdź [status.signature.cat](https://status.signature.cat/) - incydenty i prace serwisowe są ogłaszane tam. Zobacz [Status usługi](/docs/service-status/).
2. **Czy zadanie się nie powiodło?** Otwórz [Logi zadań](https://app.signature.cat/assignments/logs) i przejrzyj kody błędów per użytkownik - [Zweryfikuj zadanie przypisania](/docs/verify-assignments/#what-the-per-user-rows-tell-you) wyjaśnia każdy z nich wraz z rozwiązaniem.
3. **Czy Domain-Wide Delegation jest sprawne?** Jeśli synchronizacje są wstrzymane, administratorzy będą mieć powiadomienie "Utracono dostęp Domain-Wide Delegation" - uruchom ponownie kreator z [Ustawień](https://app.signature.cat/settings). Zobacz [Domain-Wide Delegation](/docs/domain-wide-delegation/#what-happens-if-dwd-is-removed-or-a-scope-revoked).
4. **Płatności wstrzymane?** Czerwony baner i status "Zaległa płatność" na stronie [Płatności](https://app.signature.cat/billing) oznaczają, że po nieudanej płatności minęło okno karencji - aktualizacja karty przywraca wszystko. Zobacz [Dane rozliczeniowe](/docs/billing-details/).

## Pisanie do supportu

Napisz na [contact@signature.cat](mailto:contact@signature.cat), w miarę możliwości z adresu w domenie Twojego Workspace. Załącz:

- swoją **domenę Workspace** (na przykład `yourcompany.com`),
- **czego się spodziewano, a co się stało**, ze znacznikami czasu i Twoją strefą czasową,
- **link do zadania** (`app.signature.cat/jobs/...`) albo zrzut ekranu wiersza z [Logów zadań](https://app.signature.cat/assignments/logs), jeśli sprawa dotyczy zadania,
- każdy **kod błędu** pokazany w aplikacji (komunikaty błędów można rozwinąć, aby zobaczyć kod, status HTTP i identyfikator żądania - załącz wszystkie trzy).

> [!TIP]
> Identyfikator żądania z rozwiniętego komunikatu błędu pozwala supportowi znaleźć Twoje dokładne żądanie w logach serwera - to najbardziej przydatna rzecz, jaką możesz załączyć.

## Czego oczekiwać w odpowiedzi

Support działa wyłącznie e-mailowo. W okresie próbnym nie ma gwarantowanego czasu odpowiedzi; płacący klienci są obsługiwani priorytetowo. Incydenty dotykające wielu klientów są koordynowane publicznie na [stronie statusu](https://status.signature.cat/).

## Propozycje funkcji i opinie

Wysyłaj je na ten sam adres - raporty z realnego użycia kształtują roadmapę. Opisz swój przypadek użycia, a nie tylko nazwę funkcji; tak dotrze najlepiej.
