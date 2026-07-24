---
title: Zmień dane rozliczeniowe i płatności
navTitle: Dane rozliczeniowe
description: Aktualizuj kartę, nazwę firmy, adres rozliczeniowy i NIP na fakturach SignatureCat przez portal rozliczeniowy Stripe.
updated: 2026-07-17
---

# Zmień dane rozliczeniowe i płatności

Kartami płatniczymi i danymi firmy do faktur zarządzasz w **portalu rozliczeniowym Stripe**, otwieranym z poziomu SignatureCat. Dostęp do płatności mają wyłącznie użytkownicy z poziomem Admin.

## Zaktualizuj kartę płatniczą

1. Otwórz [Płatności](https://app.signature.cat/billing) i kliknij **Zarządzaj płatnościami** (albo otwórz [Ustawienia](https://app.signature.cat/settings), sekcja Płatności, **Zarządzaj w Stripe Portal**).
2. W portalu Stripe dodaj nową kartę i ustaw ją jako domyślną.

Następne obciążenie użyje nowej karty. Jeśli jesteś w oknie karencji po nieudanej płatności, udane obciążenie natychmiast przywraca wszystko do normy.

## Zaktualizuj nazwę firmy, adres lub NIP

W tym samym portalu Stripe edytujesz prawną **nazwę firmy**, **adres rozliczeniowy** i **identyfikator podatkowy** (VAT / NIP - polskie firmy używają numeru VAT z prefiksem `PL`). Dane te drukują się na każdej fakturze wystawionej po zmianie; już wystawione faktury pozostają bez zmian.

> [!NOTE]
> **E-mail do faktur** celowo nie jest edytowalny w portalu Stripe - zmieniaj go w [Ustawieniach](https://app.signature.cat/settings), w sekcji Płatności, aby aplikacja i Stripe zawsze były zgodne. Zobacz [Faktury](/docs/invoices/#set-the-invoice-email).

## Sprawdź status subskrypcji

Sekcja Płatności w [Ustawieniach](https://app.signature.cat/settings) pokazuje status subskrypcji (Aktywna, Okres próbny, Zaległa płatność, Anulowana), bieżącą liczbę aktywnych użytkowników i datę odnowienia ("Aktywna do ...").

## Anuluj subskrypcję

W [Ustawieniach](https://app.signature.cat/settings), w sekcji Płatności, kliknij **Anuluj subskrypcję**. Dostęp trwa do końca bieżącego okresu rozliczeniowego, potem zarządzanie podpisami się zatrzymuje. Twoje podpisy Gmail nie są usuwane - po prostu przestają być zarządzane i aktualizowane.

> [!WARNING]
> Anulowanie nie usuwa Twoich danych ani wpisu Domain-Wide Delegation. Jeśli odchodzisz na dobre, usuń też konto w Strefie niebezpiecznej w [Ustawieniach](https://app.signature.cat/settings) i usuń wpis DWD w Google Admin console - zobacz [Domain-Wide Delegation](/docs/domain-wide-delegation/#removing-signaturecat).
