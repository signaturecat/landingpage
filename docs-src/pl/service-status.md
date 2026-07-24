---
title: Status usługi i SLA
navTitle: Status usługi
description: Strona statusu SignatureCat na żywo, cel 99% miesięcznej dostępności, co liczy się jako przestój i gdzie ogłaszane są okna serwisowe.
updated: 2026-07-17
---

# Status usługi i SLA

Bieżąca dostępność, incydenty i okna serwisowe są publikowane na **[status.signature.cat](https://status.signature.cat/)**. Strona statusu jest punktem odniesienia dla dostępności: liczy się to, co ona raportuje, również dla poniższego SLA. Jej plakietka jest też widoczna w nagłówku tej dokumentacji.

## Cel dostępności

SignatureCat celuje w **co najmniej 99% dostępności w miesiącu kalendarzowym**, mierzonej i publikowanej na [stronie statusu](https://status.signature.cat/). Cel nie obowiązuje w bezpłatnym okresie próbnym.

Za przestój nie liczą się:

- **planowane prace serwisowe**, ogłaszane z wyprzedzeniem na [status.signature.cat/maintenance](https://status.signature.cat/maintenance),
- awarie zewnętrznych dostawców, od których zależy platforma (hosting, CDN, obsługa płatności, API Google),
- siła wyższa,
- przyczyny po stronie klienta - w szczególności odebrany grant [Domain-Wide Delegation](/docs/domain-wide-delegation/) lub zmiany konfiguracji Workspace.

Dostarczanie podpisów zależy od dostępności i polityk API Google; zmiany, które Google wprowadza w tych API lub w Twoim Workspace, są poza kontrolą SignatureCat.

Pełne, wiążące brzmienie znajduje się w [Regulaminie](https://signature.cat/legal/) - regulamin domyślnie nie przewiduje rekompensat za niedostępność (service credits); indywidualne gwarancje SLA można uzgodnić w osobnej umowie.

## Podczas incydentu

- Bieżący wpływ i aktualizacje są publikowane na [stronie statusu](https://status.signature.cat/) w miarę rozwoju incydentu.
- Synchronizacje podpisów **czekają w kolejce, nie giną** - po przywróceniu usługi codzienna synchronizacja doprowadza każdą skrzynkę do stanu docelowego.
- Awarie i anomalie możesz zgłaszać na [contact@signature.cat](mailto:contact@signature.cat) - zobacz [Uzyskaj pomoc](/docs/get-help/).

## Okna serwisowe

Planowane przerwy techniczne są ogłaszane z wyprzedzeniem na [status.signature.cat/maintenance](https://status.signature.cat/maintenance). Są planowane tak, aby zminimalizować wpływ na użytkowników, i nie liczą się do przestoju.

> [!TIP]
> Strona statusu oferuje opcje subskrypcji - zasubskrybuj swój kanał ops lub IT, aby aktualizacje o incydentach docierały do Ciebie bez ręcznego sprawdzania.
