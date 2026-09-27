/**
 * Confirmation emails for the /form contact form: one for lead requests
 * ("Book a call" / "Custom pricing"), one for help requests (docs "Help").
 * Sent by the Worker through Resend from contact@signature.cat, in the
 * language of the page the form was filled in.
 *
 * Rendered here rather than as Resend Templates on purpose: the copy is
 * versioned and reviewed with the code, the 4 locales live in one table,
 * every user-supplied value is HTML-escaped under our control and the whole
 * thing is unit-tested (cloudflare/worker.test.mjs - including the
 * no-AI-tell typography rule), with no template ids to keep in sync.
 * Layout and tokens follow app/packages/email/src/templates.ts and the team
 * guidelines in ../mailing-wytyczne (tables + inline CSS, role=presentation,
 * one h1, lang/dir on <html> and div[role=article], hidden preheader, 600px,
 * dark-mode overrides, stacked summary rows that survive 320px, explicit
 * text/plain part, no marketing content, no unsubscribe link).
 *
 * Copy rules: plain ASCII "-" and straight quotes only (no em/en dashes, no
 * invisible characters, no typographic quotes) - enforced by a test.
 */

const RESEND_EMAILS_URL = 'https://api.resend.com/emails';
const FROM = 'SignatureCat <contact@signature.cat>';
const USER_AGENT = 'signature.cat-worker/1.0 (+https://signature.cat)';
const SEND_TIMEOUT_MS = 8000;
const MAIL_LOGO = 'https://signature.cat/assets/img/email-logo.png'; // 80x80 PNG, shown at 40x40
const PRIVACY_URL = 'https://signature.cat/legal#privacy';
const STATUS_URL = 'https://status.signature.cat/';
// Legal footer data, as published in the Privacy Policy (legal/src/privacy.*.md).
const LEGAL = {
  name: 'SystemAdmin Tomasz Piasecki',
  street: 'ul. Aleje Jerozolimskie 190',
  city: '02-486 Warszawa',
  tax: 'NIP 1231455439',
};

// ---- copy (4 locales) ------------------------------------------------------------
export const MAIL_COPY = {
  en: {
    labels: {
      topic: 'Topic', name: 'Full name', company: 'Company name', workEmail: 'Work email',
      email: 'Email', phone: 'Phone', size: 'Organization size', message: 'Additional details',
      problem: 'Problem description', urgency: 'Urgency',
    },
    sizes: {
      '1-50': '1-50 employees', '51-120': '51-120 employees', '121-300': '121-300 employees',
      '301-1000': '301-1000 employees', '1001-5000': '1001-5000 employees', '5000+': 'More than 5000 employees',
    },
    topics: { call: 'Book a call', pricing: 'Custom pricing', general: 'General enquiry' },
    urgency: {
      low: 'Low - a question or a suggestion',
      normal: 'Normal - something does not work as expected',
      high: 'High - the problem blocks part of the team',
      critical: 'Critical - signatures are broken for the whole organization',
    },
    detailsHeading: 'Your request',
    note: 'If anything above is wrong, just reply to this email.',
    closing: 'Have a nice day!',
    greetingNoName: 'Thank you!',
    signoff: 'The SignatureCat team',
    privacy: 'Privacy Policy',
    objection: 'You can object to our processing of these details at any time: just reply to this email.',
    tagline: 'SignatureCat - centrally managed Gmail signatures for Google Workspace.',
    lead: {
      subject: 'We have received your request',
      preheader: 'A copy of your details is below. We will get back to you shortly.',
      greeting: 'Thank you, {name}!',
      intro: {
        call: 'Thank you for contacting SignatureCat. Your request is with our team and we will get back to you at {email} shortly to arrange the call.',
        pricing: 'Thank you for contacting SignatureCat. Your request is with our team: we will prepare an offer for your organization and get back to you at {email} shortly.',
        general: 'Thank you for contacting SignatureCat. Your request is with our team and we will get back to you at {email} shortly.',
      },
      bookingText: 'Want to pick a time for the call right away? Choose one in our calendar:',
      bookingButton: 'Pick a time',
      orOpen: 'Or open this link:',
      optIn: 'You also agreed to receive occasional marketing emails from SignatureCat. You can withdraw that consent at any time.',
      why: 'You are receiving this email because this address was entered in the contact form on signature.cat. If it was not you, you can ignore this message.',
      whyOptIn: 'You are receiving this email because this address was entered in the contact form on signature.cat. If it was not you, reply to this email and we will remove the address from our mailing list and delete these details.',
    },
    help: {
      subject: 'We have received your support request',
      preheader: 'A copy of your request is below. We will reply by email.',
      greeting: 'Thank you, {name}!',
      intro: 'Your support request is with our team. We handle requests by urgency and will reply to {email} by email.',
      statusText: 'If many users are affected at once, check the service status page for an ongoing incident:',
      why: 'You are receiving this email because this address was entered in the help form on signature.cat. If it was not you, you can ignore this message.',
    },
  },
  pl: {
    labels: {
      topic: 'Temat', name: 'Imię i nazwisko', company: 'Nazwa firmy', workEmail: 'Email służbowy',
      email: 'Email', phone: 'Telefon', size: 'Wielkość organizacji', message: 'Dodatkowy opis',
      problem: 'Opis problemu', urgency: 'Pilność',
    },
    sizes: {
      '1-50': '1-50 pracowników', '51-120': '51-120 pracowników', '121-300': '121-300 pracowników',
      '301-1000': '301-1000 pracowników', '1001-5000': '1001-5000 pracowników', '5000+': 'Ponad 5000 pracowników',
    },
    topics: { call: 'Umów rozmowę', pricing: 'Indywidualna wycena', general: 'Zapytanie ogólne' },
    urgency: {
      low: 'Niska - pytanie lub sugestia',
      normal: 'Normalna - coś działa inaczej, niż powinno',
      high: 'Wysoka - problem blokuje część zespołu',
      critical: 'Krytyczna - podpisy nie działają w całej organizacji',
    },
    detailsHeading: 'Twoje zgłoszenie',
    note: 'Jeśli coś się nie zgadza, po prostu odpowiedz na tę wiadomość.',
    closing: 'Miłego dnia!',
    greetingNoName: 'Dziękujemy!',
    signoff: 'Zespół SignatureCat',
    privacy: 'Polityka prywatności',
    objection: 'W każdej chwili możesz sprzeciwić się przetwarzaniu tych danych: wystarczy odpowiedzieć na tę wiadomość.',
    tagline: 'SignatureCat - centralnie zarządzane podpisy Gmail dla Google Workspace.',
    lead: {
      subject: 'Otrzymaliśmy Twoje zgłoszenie',
      preheader: 'Poniżej kopia przesłanych danych. Wkrótce się odezwiemy.',
      greeting: 'Dziękujemy, {name}!',
      intro: {
        call: 'Dziękujemy za kontakt z SignatureCat. Twoje zgłoszenie trafiło do naszego zespołu - wkrótce odezwiemy się na adres {email}, żeby umówić rozmowę.',
        pricing: 'Dziękujemy za kontakt z SignatureCat. Twoje zgłoszenie trafiło do naszego zespołu - przygotujemy ofertę dla Twojej organizacji i wkrótce odezwiemy się na adres {email}.',
        general: 'Dziękujemy za kontakt z SignatureCat. Twoje zgłoszenie trafiło do naszego zespołu - wkrótce odezwiemy się na adres {email}.',
      },
      bookingText: 'Chcesz od razu wybrać termin rozmowy? Zrobisz to w naszym kalendarzu:',
      bookingButton: 'Wybierz termin',
      orOpen: 'Albo otwórz ten link:',
      optIn: 'Zapisaliśmy też zgodę na okazjonalne wiadomości marketingowe od SignatureCat. Możesz ją wycofać w każdej chwili.',
      why: 'Otrzymujesz tę wiadomość, ponieważ ten adres został podany w formularzu kontaktowym na signature.cat. Jeśli to nie Ty, zignoruj tę wiadomość.',
      whyOptIn: 'Otrzymujesz tę wiadomość, ponieważ ten adres został podany w formularzu kontaktowym na signature.cat. Jeśli to nie Ty, odpowiedz na tę wiadomość - usuniemy adres z listy mailingowej i skasujemy te dane.',
    },
    help: {
      subject: 'Otrzymaliśmy Twoją prośbę o pomoc',
      preheader: 'Poniżej kopia zgłoszenia. Odpowiemy mailowo.',
      greeting: 'Dziękujemy, {name}!',
      intro: 'Twoje zgłoszenie trafiło do zespołu wsparcia. Zajmujemy się zgłoszeniami według pilności i odpowiemy mailowo na adres {email}.',
      statusText: 'Jeśli problem dotyczy wielu użytkowników naraz, sprawdź, czy na stronie statusu usługi nie trwa awaria:',
      why: 'Otrzymujesz tę wiadomość, ponieważ ten adres został podany w formularzu pomocy na signature.cat. Jeśli to nie Ty, zignoruj tę wiadomość.',
    },
  },
  de: {
    labels: {
      topic: 'Thema', name: 'Vor- und Nachname', company: 'Firmenname', workEmail: 'Geschäftliche E-Mail',
      email: 'E-Mail', phone: 'Telefon', size: 'Größe der Organisation', message: 'Weitere Informationen',
      problem: 'Problembeschreibung', urgency: 'Dringlichkeit',
    },
    sizes: {
      '1-50': '1-50 Mitarbeitende', '51-120': '51-120 Mitarbeitende', '121-300': '121-300 Mitarbeitende',
      '301-1000': '301-1000 Mitarbeitende', '1001-5000': '1001-5000 Mitarbeitende', '5000+': 'Mehr als 5000 Mitarbeitende',
    },
    topics: { call: 'Gespräch vereinbaren', pricing: 'Individuelles Angebot', general: 'Allgemeine Anfrage' },
    urgency: {
      low: 'Niedrig - eine Frage oder ein Vorschlag',
      normal: 'Normal - etwas funktioniert nicht wie erwartet',
      high: 'Hoch - das Problem blockiert einen Teil des Teams',
      critical: 'Kritisch - Signaturen funktionieren in der ganzen Organisation nicht',
    },
    detailsHeading: 'Ihre Anfrage',
    note: 'Falls etwas nicht stimmt, antworten Sie einfach auf diese E-Mail.',
    closing: 'Einen schönen Tag noch!',
    greetingNoName: 'Vielen Dank!',
    signoff: 'Ihr SignatureCat-Team',
    privacy: 'Datenschutzerklärung',
    objection: 'Sie können der Verarbeitung dieser Angaben jederzeit widersprechen: Antworten Sie einfach auf diese E-Mail.',
    tagline: 'SignatureCat - zentral verwaltete Gmail-Signaturen für Google Workspace.',
    lead: {
      subject: 'Wir haben Ihre Anfrage erhalten',
      preheader: 'Unten finden Sie eine Kopie Ihrer Angaben. Wir melden uns in Kürze.',
      greeting: 'Vielen Dank, {name}!',
      intro: {
        call: 'Vielen Dank für Ihre Nachricht an SignatureCat. Ihre Anfrage ist bei unserem Team angekommen - wir melden uns in Kürze unter {email}, um das Gespräch zu vereinbaren.',
        pricing: 'Vielen Dank für Ihre Nachricht an SignatureCat. Ihre Anfrage ist bei unserem Team angekommen - wir erstellen ein Angebot für Ihre Organisation und melden uns in Kürze unter {email}.',
        general: 'Vielen Dank für Ihre Nachricht an SignatureCat. Ihre Anfrage ist bei unserem Team angekommen - wir melden uns in Kürze unter {email}.',
      },
      bookingText: 'Möchten Sie gleich einen Termin für das Gespräch wählen? Das geht in unserem Kalender:',
      bookingButton: 'Termin wählen',
      orOpen: 'Oder öffnen Sie diesen Link:',
      optIn: 'Ihre Einwilligung in gelegentliche Marketing-E-Mails von SignatureCat haben wir gespeichert. Sie können sie jederzeit widerrufen.',
      why: 'Sie erhalten diese E-Mail, weil diese Adresse im Kontaktformular auf signature.cat angegeben wurde. Falls Sie das nicht waren, können Sie diese Nachricht ignorieren.',
      whyOptIn: 'Sie erhalten diese E-Mail, weil diese Adresse im Kontaktformular auf signature.cat angegeben wurde. Falls Sie das nicht waren, antworten Sie auf diese E-Mail - wir entfernen die Adresse aus unserem Verteiler und löschen diese Angaben.',
    },
    help: {
      subject: 'Wir haben Ihre Supportanfrage erhalten',
      preheader: 'Unten finden Sie eine Kopie Ihrer Anfrage. Wir antworten per E-Mail.',
      greeting: 'Vielen Dank, {name}!',
      intro: 'Ihre Supportanfrage ist bei unserem Team angekommen. Wir bearbeiten Anfragen nach Dringlichkeit und antworten Ihnen per E-Mail an {email}.',
      statusText: 'Wenn viele Nutzer gleichzeitig betroffen sind, prüfen Sie auf der Statusseite, ob eine Störung vorliegt:',
      why: 'Sie erhalten diese E-Mail, weil diese Adresse im Hilfeformular auf signature.cat angegeben wurde. Falls Sie das nicht waren, können Sie diese Nachricht ignorieren.',
    },
  },
  fr: {
    labels: {
      topic: 'Sujet', name: 'Prénom et nom', company: "Nom de l'entreprise", workEmail: 'E-mail professionnel',
      email: 'E-mail', phone: 'Téléphone', size: "Taille de l'organisation", message: 'Informations complémentaires',
      problem: 'Description du problème', urgency: 'Urgence',
    },
    sizes: {
      '1-50': '1-50 collaborateurs', '51-120': '51-120 collaborateurs', '121-300': '121-300 collaborateurs',
      '301-1000': '301-1000 collaborateurs', '1001-5000': '1001-5000 collaborateurs', '5000+': 'Plus de 5000 collaborateurs',
    },
    topics: { call: 'Planifier un appel', pricing: 'Tarif sur mesure', general: 'Demande générale' },
    urgency: {
      low: 'Faible - une question ou une suggestion',
      normal: 'Normale - quelque chose ne fonctionne pas comme prévu',
      high: "Élevée - le problème bloque une partie de l'équipe",
      critical: "Critique - les signatures ne fonctionnent plus dans toute l'organisation",
    },
    detailsHeading: 'Votre demande',
    note: 'Si une information est inexacte, répondez simplement à cet e-mail.',
    closing: 'Belle journée !',
    greetingNoName: 'Merci !',
    signoff: "L'équipe SignatureCat",
    privacy: 'Politique de confidentialité',
    objection: 'Vous pouvez à tout moment vous opposer au traitement de ces informations : il suffit de répondre à cet e-mail.',
    tagline: 'SignatureCat - signatures Gmail gérées de manière centralisée pour Google Workspace.',
    lead: {
      subject: 'Nous avons bien reçu votre demande',
      preheader: 'Vous trouverez ci-dessous une copie de vos informations. Nous revenons vers vous très vite.',
      greeting: 'Merci, {name} !',
      intro: {
        call: "Merci d'avoir contacté SignatureCat. Votre demande est bien arrivée chez notre équipe : nous revenons vers vous très vite à l'adresse {email} pour planifier l'appel.",
        pricing: "Merci d'avoir contacté SignatureCat. Votre demande est bien arrivée chez notre équipe : nous préparons une offre pour votre organisation et revenons vers vous très vite à l'adresse {email}.",
        general: "Merci d'avoir contacté SignatureCat. Votre demande est bien arrivée chez notre équipe : nous revenons vers vous très vite à l'adresse {email}.",
      },
      bookingText: "Vous souhaitez choisir dès maintenant un créneau pour l'appel ? Rendez-vous dans notre calendrier :",
      bookingButton: 'Choisir un créneau',
      orOpen: 'Ou ouvrez ce lien :',
      optIn: 'Votre accord pour recevoir occasionnellement des e-mails marketing de SignatureCat a bien été enregistré. Vous pouvez le retirer à tout moment.',
      why: "Vous recevez cet e-mail car cette adresse a été saisie dans le formulaire de contact de signature.cat. Si ce n'était pas vous, ignorez simplement ce message.",
      whyOptIn: "Vous recevez cet e-mail car cette adresse a été saisie dans le formulaire de contact de signature.cat. Si ce n'était pas vous, répondez à cet e-mail : nous retirerons l'adresse de notre liste de diffusion et supprimerons ces informations.",
    },
    help: {
      subject: "Nous avons bien reçu votre demande d'assistance",
      preheader: 'Vous trouverez ci-dessous une copie de votre demande. Nous vous répondrons par e-mail.',
      greeting: 'Merci, {name} !',
      intro: "Votre demande d'assistance est bien arrivée chez notre équipe. Nous traitons les demandes selon leur urgence et vous répondrons par e-mail à l'adresse {email}.",
      statusText: "Si de nombreux utilisateurs sont touchés en même temps, vérifiez sur la page d'état du service qu'aucun incident n'est en cours :",
      why: "Vous recevez cet e-mail car cette adresse a été saisie dans le formulaire d'aide de signature.cat. Si ce n'était pas vous, ignorez simplement ce message.",
    },
  },
};

// ---- rendering helpers (ported from app/packages/email/src/templates.ts) ------------
// SINGLE quotes only: the stack is interpolated into style="..." attributes.
const FONT = "ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const C = {
  page: '#f6f9fc', card: '#ffffff', border: '#e7e1d8', ink: '#292524', muted: '#6b6660',
  accent: '#f2a8ff', accentInk: '#292524', box: '#f5f1ea',
};
// Only & < > " ' ` are escaped (diacritics stay raw UTF-8) - the app's he.escape contract.
const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '`': '&#x60;' };
export const esc = (v) => String(v ?? '').replace(/[&<>"'`]/g, (ch) => ESC[ch]);
const escMultiline = (v) => esc(v).replace(/\n/g, '<br />'); // escape first, then break lines
// {token} fill. The replacement is a function so user input is never read as
// a replacement pattern ($&, $1 ...).
const fillText = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (_m, k) => String(vars[k] ?? ''));
const fillHtml = (tpl, vars) => esc(tpl).replace(/\{(\w+)\}/g, (_m, k) => esc(vars[k] ?? ''));

// word-break: a long address in the intro must not widen the card at 320px
// (overflow-wrap alone does not lower a table cell's min-content width).
const WRAP = 'overflow-wrap:break-word;word-break:break-word';
const P = `margin:0 0 16px;font-family:${FONT};font-size:16px;line-height:1.6;color:${C.ink};${WRAP}`;
const P_LAST = `margin:0;font-family:${FONT};font-size:16px;line-height:1.6;color:${C.ink};${WRAP}`;
const P_MUTED = `margin:0 0 16px;font-family:${FONT};font-size:13px;line-height:1.6;color:${C.muted};overflow-wrap:break-word;word-break:break-word`;
const H2 = `margin:0 0 12px;font-family:${FONT};font-size:13px;font-weight:700;line-height:1.4;color:${C.ink};text-transform:uppercase;letter-spacing:0.05em`;
const LINK = `color:${C.ink};text-decoration:underline`;

function mailButton(href, label) {
  const safe = /^https:\/\//i.test(href) ? href : '#';
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 12px"><tr>
<td class="sc-btncell" align="center" bgcolor="${C.accent}" style="border-radius:10px;mso-padding-alt:13px 26px;background:${C.accent}">
<a class="sc-btn" href="${esc(safe)}" style="display:inline-block;padding:13px 26px;background:${C.accent};color:${C.accentInk}!important;font-family:${FONT};font-size:16px;font-weight:600;line-height:20px;text-decoration:none;border-radius:10px;-webkit-text-size-adjust:none">${esc(label)}</a>
</td></tr></table>`;
}

// Stacked label-above-value rows: readable at 320px without media queries
// (Gmail desktop and Outlook ignore them). Labels are trusted copy, values
// are user input - both escaped.
function mailSummary(rows) {
  const body = rows
    .filter((r) => r.value)
    .map(
      (r, i) => `<tr><td class="sc-row" style="padding:12px 16px;${i ? `border-top:1px solid ${C.border};` : ''}">
<p class="sc-muted" style="margin:0 0 2px;font-family:${FONT};font-size:13px;line-height:1.4;color:${C.muted}">${esc(r.label)}</p>
<p class="sc-text" style="margin:0;font-family:${FONT};font-size:15px;line-height:1.5;color:${C.ink};overflow-wrap:break-word;word-break:break-word">${r.multiline ? escMultiline(r.value) : esc(r.value)}</p>
</td></tr>`,
    )
    .join('\n');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin:0 0 20px"><tr>
<td class="sc-box" style="background:${C.box};border:1px solid ${C.border};border-radius:10px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%">
${body}
</table>
</td></tr></table>`;
}

function mailLayout({ locale, subject, preheader, title, bodyHtml, footerHtml }) {
  const lang = MAIL_COPY[locale] ? locale : 'en';
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="${lang}" dir="ltr">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
<meta name="color-scheme" content="light dark" />
<meta name="supported-color-schemes" content="light dark" />
<title>${esc(subject)}</title>
<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
<style type="text/css">
:root{color-scheme:light dark;supported-color-schemes:light dark}
body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
table{border-collapse:collapse}
table td{mso-line-height-rule:exactly}
img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none}
a img{border:none}
p,h1,h2,h3,h4,h5,h6{margin:0;padding:0}
a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important}
a[href^="tel"]{color:inherit!important;text-decoration:none!important}
@media (prefers-color-scheme:dark){
.sc-page{background:transparent!important}
.sc-card{background:#292524!important;border-color:#3f3a37!important;border-top-color:#f2a8ff!important}
.sc-header{border-color:#3f3a37!important}
.sc-footer{border-color:#3f3a37!important;color:#a8a29e!important}
.sc-wordmark,.sc-h1,.sc-h2{color:#faf5ef!important}
.sc-text{color:#ece7e1!important}
.sc-muted,.sc-footlink{color:#a8a29e!important}
.sc-link{color:#faf5ef!important}
.sc-btncell,.sc-btn{background:#e89bf5!important}
.sc-box{background:#1c1917!important;border-color:#3f3a37!important}
.sc-row{border-color:#3f3a37!important}
}
@media only screen and (max-width:600px){
.sc-outer{padding:18px 10px!important}
.sc-px{padding-left:20px!important;padding-right:20px!important}
.sc-body-pad{padding-top:28px!important;padding-bottom:28px!important}
}
</style>
</head>
<body class="sc-page" style="margin:0;padding:0;width:100%;background:${C.page}">
<div role="article" aria-roledescription="email" aria-label="${esc(subject)}" lang="${lang}" dir="ltr" style="font-size:max(16px,1rem)">
<div style="display:none!important;visibility:hidden;mso-hide:all;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden">${esc(preheader)}</div>
<table role="presentation" class="sc-page" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.page}">
<tr><td class="sc-outer" align="center" valign="top" style="padding:32px 16px">
<!--[if (gte mso 9)|(IE)]><table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" width="600"><tr><td><![endif]-->
<table role="presentation" class="sc-card" align="center" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:${C.card};border:1px solid ${C.border};border-top:4px solid ${C.accent};border-radius:16px;overflow:hidden">
<tr><td class="sc-header sc-px" style="padding:22px 32px;border-bottom:1px solid ${C.border}">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle" style="padding-right:12px"><img src="${MAIL_LOGO}" alt="" width="40" height="40" style="display:block;width:40px;height:40px;border-radius:9px" /></td>
<td valign="middle"><span class="sc-wordmark" style="font-family:${FONT};font-size:18px;font-weight:700;letter-spacing:-0.02em;color:${C.ink}">SignatureCat</span></td>
</tr></table>
</td></tr>
<tr><td class="sc-body-pad sc-px" style="padding:32px;font-family:${FONT};font-size:16px;line-height:1.6;color:${C.ink}">
<h1 class="sc-h1" style="margin:0 0 16px;font-family:${FONT};font-size:22px;font-weight:700;letter-spacing:-0.02em;line-height:1.3;color:${C.ink}">${esc(title)}</h1>
${bodyHtml}
</td></tr>
<tr><td class="sc-footer sc-px" style="padding:20px 32px;border-top:1px solid ${C.border};font-family:${FONT};font-size:13px;line-height:1.6;color:${C.muted}">
${footerHtml}
</td></tr>
</table>
<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
</td></tr>
</table>
</div>
</body>
</html>`;
}

// Keeps "02-486 Warszawa" / "NIP ..." from breaking at the hyphen or space.
const nowrap = (v) => `<span style="white-space:nowrap">${esc(v)}</span>`;

function footer(c, why, year) {
  const html = `<p style="margin:0 0 6px">${esc(c.tagline)}</p>
<p style="margin:0 0 6px">${esc(why)}</p>
<p style="margin:0 0 6px">${esc(c.objection)}</p>
<p style="margin:0 0 6px"><a class="sc-footlink" href="${PRIVACY_URL}" style="color:${C.muted};text-decoration:underline">${esc(c.privacy)}</a> | <a class="sc-footlink" href="mailto:contact@signature.cat" style="color:${C.muted};text-decoration:underline">contact@signature.cat</a></p>
<p style="margin:0">&copy; ${year} SignatureCat | ${esc(LEGAL.name)}, ${esc(LEGAL.street)}, ${nowrap(LEGAL.city)} | ${nowrap(LEGAL.tax)}</p>`;
  const text = [
    '--',
    c.tagline,
    why,
    c.objection,
    `${c.privacy}: ${PRIVACY_URL}`,
    'contact@signature.cat',
    `(c) ${year} SignatureCat | ${LEGAL.name}, ${LEGAL.street}, ${LEGAL.city} | ${LEGAL.tax}`,
  ];
  return { html, text };
}

// Greet by first name only when it looks like one: the email goes to whatever
// address the form carries, so "www.evil.example Kowalski" must not become
// "Thank you, www.evil.example!". Letters (any script), apostrophe, hyphen.
const firstName = (name) => {
  const token = String(name).split(' ')[0];
  return /^[\p{L}][\p{L}'-]{0,39}$/u.test(token) ? token : '';
};
const greeting = (c, m, name) => {
  const first = firstName(name);
  return first ? fillText(m.greeting, { name: first }) : c.greetingNoName;
};
// Free text echoed back to the recipient (name, company, description) gets
// its URL- and domain-like tokens defanged ("evil[.]example", "hxxps[://]"),
// so mail clients do not turn attacker-written text into live links in a
// message signed by signature.cat. Slack and Notion keep the original text.
const URLISH_RE = /\b(?:[a-z][a-z0-9+.-]*:\/\/|www\.)\S+|\b(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/\S*)?/gi;
export const defang = (v) =>
  String(v ?? '').replace(URLISH_RE, (t) => t.replace('://', '[://]').replace(/\./g, '[.]'));
const copyFor = (locale) => MAIL_COPY[locale] || MAIL_COPY.en;

/** The booking link for the email: Google's page without the embed flag. */
function bookingLink(booking) {
  if (!booking) return '';
  try {
    const url = new URL(booking);
    if (url.protocol !== 'https:') return '';
    url.searchParams.delete('gv');
    return url.toString();
  } catch (e) {
    return '';
  }
}

/** Lead confirmation (parsed by parseContact). */
export function renderLeadConfirmation(lead, { booking = '', year = new Date().getUTCFullYear() } = {}) {
  const c = copyFor(lead.locale);
  const m = c.lead;
  const title = greeting(c, m, lead.name);
  const intro = m.intro[lead.topic] || m.intro.general;
  const link = bookingLink(booking);
  const rows = [
    { label: c.labels.topic, value: c.topics[lead.topic] || c.topics.general },
    { label: c.labels.name, value: defang(lead.name) },
    { label: c.labels.company, value: defang(lead.company) },
    { label: c.labels.workEmail, value: lead.email },
    { label: c.labels.phone, value: lead.phone },
    { label: c.labels.size, value: c.sizes[lead.size] || lead.size },
    { label: c.labels.message, value: defang(lead.message), multiline: true },
  ];
  // With the marketing opt-in, "not you? ignore it" would leave a stranger on
  // the list - that variant tells them how to get removed instead.
  const foot = footer(c, lead.marketing ? m.whyOptIn : m.why, year);
  const bodyHtml = [
    `<p class="sc-text" style="${P}">${fillHtml(intro, { email: lead.email })}</p>`,
    link
      ? `<p class="sc-text" style="${P.replace('margin:0 0 16px', 'margin:0 0 12px')}">${esc(m.bookingText)}</p>
${mailButton(link, m.bookingButton)}
<p class="sc-muted" style="${P_MUTED}">${esc(m.orOpen)} <a class="sc-link" href="${esc(link)}" style="${LINK}">${esc(link)}</a></p>`
      : '',
    `<h2 class="sc-h2" style="${H2}">${esc(c.detailsHeading)}</h2>`,
    mailSummary(rows),
    lead.marketing ? `<p class="sc-muted" style="${P_MUTED}">${esc(m.optIn)}</p>` : '',
    `<p class="sc-text" style="${P}">${esc(c.note)}</p>`,
    `<p class="sc-text" style="${P_LAST}">${esc(c.closing)}<br />${esc(c.signoff)}</p>`,
  ]
    .filter(Boolean)
    .join('\n');
  const html = mailLayout({ locale: lead.locale, subject: m.subject, preheader: m.preheader, title, bodyHtml, footerHtml: foot.html });
  const text = [
    title,
    '',
    fillText(intro, { email: lead.email }),
    ...(link ? ['', m.bookingText, link] : []),
    '',
    c.detailsHeading,
    ...rows.filter((r) => r.value).map((r) => `${r.label}: ${r.value}`),
    ...(lead.marketing ? ['', m.optIn] : []),
    '',
    c.note,
    '',
    c.closing,
    c.signoff,
    '',
    ...foot.text,
  ].join('\n');
  return { subject: m.subject, html, text };
}

/** Help-request confirmation (parsed by parseHelp). */
export function renderHelpConfirmation(req, { year = new Date().getUTCFullYear() } = {}) {
  const c = copyFor(req.locale);
  const m = c.help;
  const title = greeting(c, m, req.name);
  const rows = [
    { label: c.labels.urgency, value: c.urgency[req.urgency] || req.urgency },
    { label: c.labels.name, value: defang(req.name) },
    { label: c.labels.email, value: req.email },
    { label: c.labels.phone, value: req.phone },
    { label: c.labels.problem, value: defang(req.message), multiline: true },
  ];
  const foot = footer(c, m.why, year);
  const bodyHtml = [
    `<p class="sc-text" style="${P}">${fillHtml(m.intro, { email: req.email })}</p>`,
    `<p class="sc-text" style="${P}">${esc(m.statusText)} <a class="sc-link" href="${STATUS_URL}" style="${LINK}">status.signature.cat</a></p>`,
    `<h2 class="sc-h2" style="${H2}">${esc(c.detailsHeading)}</h2>`,
    mailSummary(rows),
    `<p class="sc-text" style="${P}">${esc(c.note)}</p>`,
    `<p class="sc-text" style="${P_LAST}">${esc(c.closing)}<br />${esc(c.signoff)}</p>`,
  ].join('\n');
  const html = mailLayout({ locale: req.locale, subject: m.subject, preheader: m.preheader, title, bodyHtml, footerHtml: foot.html });
  const text = [
    title,
    '',
    fillText(m.intro, { email: req.email }),
    '',
    `${m.statusText} ${STATUS_URL}`,
    '',
    c.detailsHeading,
    ...rows.filter((r) => r.value).map((r) => `${r.label}: ${r.value}`),
    '',
    c.note,
    '',
    c.closing,
    c.signoff,
    '',
    ...foot.text,
  ].join('\n');
  return { subject: m.subject, html, text };
}

/**
 * Send one rendered confirmation through Resend. Never throws. Uses
 * RESEND_SEND_API_KEY (recommended: a "Sending access" key limited to the
 * signature.cat domain) or falls back to RESEND_API_KEY (the full-access key
 * of the banner gate). Resolves to {status: 'off' | 'sent' | 'failed', detail?}.
 */
export async function sendConfirmation(env, to, mail, { kind, locale }) {
  const key = env?.RESEND_SEND_API_KEY || env?.RESEND_API_KEY;
  if (!key) return { status: 'off' };
  let res;
  try {
    res = await fetch(RESEND_EMAILS_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        'User-Agent': USER_AGENT, // Resend rejects requests without one
      },
      body: JSON.stringify({
        from: FROM,
        to: [to],
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        tags: [
          { name: 'category', value: `${kind}_confirmation` },
          { name: 'locale', value: locale },
        ],
      }),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });
  } catch (e) {
    const detail = e?.name === 'TimeoutError' ? 'timeout' : 'unreachable';
    console.error(`contact form: confirmation email ${detail}`);
    return { status: 'failed', detail };
  }
  if (res.ok) return { status: 'sent' };
  let body = null;
  try {
    body = await res.json();
  } catch (e) {
    /* non-JSON answer */
  }
  const detail = `HTTP ${res.status}${body?.name ? ` ${body.name}` : ''}`;
  console.error(`contact form: confirmation email ${detail}: ${String(body?.message || '').slice(0, 300)}`);
  return { status: 'failed', detail };
}
