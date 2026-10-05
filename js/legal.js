/* Impressum + Datenschutzerklaerung, generated from site.config.js.
   German is the default (it is the legally relevant language for a German
   business); add ?lang=en for the English convenience translation.

   This is a starting template, not legal advice. Anything required that is
   still empty in site.config.js is shown as an orange [placeholder]. */
(() => {
  'use strict';

  const S = window.SITE || {};
  const C = S.company || {};
  const P = S.privacy || {};
  const H = P.hosting || {};
  const A = P.supervisoryAuthority || {};

  const page = document.body.dataset.page;                        // "impressum" | "datenschutz"
  const lang = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'de';
  const t = (de, en) => (lang === 'en' ? en : de);

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const missing = [];   // required, still empty
  const advised = [];   // optional but strongly recommended
  const val = (v, label) => {
    if (v) return esc(v);
    missing.push(label);
    return `<mark class="missing">[${esc(label)}]</mark>`;
  };
  const mail = (v) => (v ? `<a href="mailto:${esc(v)}">${esc(v)}</a>` : val('', 'E-Mail'));
  const link = (url, text) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(text || url)}</a>`;
  const date = (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString(t('de-DE', 'en-GB'), {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });

  const ROLES = {
    owner:               { de: 'Inhaber',        en: 'Owner' },
    'managing-director': { de: 'Geschäftsführer', en: 'Managing director' },
    partner:             { de: 'Gesellschafter', en: 'Partner' },
  };
  const role = ROLES[C.role] || ROLES.owner;

  /* ------------------------------------------------------------------
     Impressum
     ------------------------------------------------------------------ */
  function impressum() {
    if (!C.phone) advised.push(t('Telefonnummer (empfohlen)', 'Phone number (recommended)'));

    const out = [];
    out.push(`<h1>${t('Impressum', 'Legal notice')}</h1>`);
    out.push(`<p class="lead">${t('Angaben gemäß § 5 DDG', 'Information pursuant to Section 5 DDG (German Digital Services Act)')}</p>`);

    out.push(`<h2>${t('Anbieter', 'Provider')}</h2>
      <address>
        ${val(C.legalName, t('Name / Firma', 'Business name'))}<br>
        ${role[lang]}: ${val(C.ownerName, t('Vor- und Nachname', 'Full name'))}<br>
        ${val(C.street, t('Straße und Hausnummer', 'Street and number'))}<br>
        ${val(C.zip, t('PLZ', 'ZIP'))} ${val(C.city, t('Ort', 'City'))}<br>
        ${t('Deutschland', 'Germany')}
      </address>`);

    out.push(`<h2>${t('Kontakt', 'Contact')}</h2>
      <p>${t('E-Mail', 'Email')}: ${mail(C.email)}${C.phone ? `<br>${t('Telefon', 'Phone')}: ${esc(C.phone)}` : ''}</p>`);

    if (C.registerNumber) {
      out.push(`<h2>${t('Registereintrag', 'Commercial register')}</h2>
        <p>${t('Eintragung im Handelsregister.', 'Entered in the commercial register.')}<br>
        ${t('Registergericht', 'Register court')}: ${val(C.registerCourt, t('Registergericht', 'Register court'))}<br>
        ${t('Registernummer', 'Register number')}: ${esc(C.registerNumber)}</p>`);
    }

    if (C.vatId || C.wIdNr || C.smallBusinessNote) {
      out.push(`<h2>${t('Steuerliche Angaben', 'Tax information')}</h2><p>`);
      if (C.vatId) out.push(`${t('Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG', 'VAT identification number pursuant to Section 27a UStG')}: ${esc(C.vatId)}<br>`);
      if (C.wIdNr) out.push(`${t('Wirtschafts-Identifikationsnummer gemäß § 139c AO', 'Business identification number pursuant to Section 139c AO')}: ${esc(C.wIdNr)}<br>`);
      if (C.smallBusinessNote) out.push(t('Kleinunternehmer gemäß § 19 UStG: Es wird keine Umsatzsteuer berechnet.', 'Small business pursuant to Section 19 UStG: no VAT is charged.'));
      out.push('</p>');
    }

    if (C.contentResponsible) {
      out.push(`<h2>${t('Verantwortlich für den Inhalt', 'Responsible for content')}</h2>
        <p>${t('Verantwortlich nach § 18 Abs. 2 MStV', 'Responsible pursuant to Section 18 (2) MStV')}: ${esc(C.contentResponsible)}</p>`);
    }

    if (C.showDisputeNotice) {
      out.push(`<h2>${t('Verbraucherstreitbeilegung', 'Consumer dispute resolution')}</h2>
        <p>${t('Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
               'We are neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board.')}</p>`);
    }

    return out.join('\n');
  }

  /* ------------------------------------------------------------------
     Datenschutzerklaerung
     ------------------------------------------------------------------ */
  function datenschutz() {
    const who = [C.legalName, C.ownerName && `${role[lang]}: ${C.ownerName}`].filter(Boolean).map(esc).join(', ')
      || val('', t('Name / Firma', 'Business name'));
    const where = [C.street, [C.zip, C.city].filter(Boolean).join(' ')].filter(Boolean).map(esc).join(', ')
      || val('', t('Anschrift', 'Address'));

    const authority = A.name
      ? `${t('Die für uns zuständige Aufsichtsbehörde ist:', 'The supervisory authority responsible for us is:')} ${esc(A.name)}${A.address ? ', ' + esc(A.address) : ''}${A.url ? ' (' + link(A.url) + ')' : ''}.`
      : '';

    const out = [];
    out.push(`<h1>${t('Datenschutzerklärung', 'Privacy policy')}</h1>`);
    out.push(`<p class="lead">${t('Stand', 'Last updated')}: ${esc(P.lastUpdated ? date(P.lastUpdated) : '')}</p>`);

    out.push(`<h2>1. ${t('Verantwortlicher', 'Controller')}</h2>
      <p>${t('Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der DSGVO ist:', 'The controller responsible for data processing on this website within the meaning of the GDPR is:')}</p>
      <address>${who}<br>${where}<br>${t('Deutschland', 'Germany')}<br>${t('E-Mail', 'Email')}: ${mail(C.email)}</address>`);

    out.push(`<h2>2. ${t('Überblick', 'Overview')}</h2>
      <p>${t('Diese Website verwendet keine Cookies, kein Tracking, keine Webanalyse und keine Werbung. Es werden keine externen Inhalte (z. B. Schriftarten, Videos, Karten oder Social-Media-Plugins) von Drittanbietern nachgeladen. Es gibt keine Benutzerkonten, Formulare oder Newsletter.',
             'This website uses no cookies, no tracking, no web analytics and no advertising. No external content (such as fonts, videos, maps or social media plugins) is loaded from third parties. There are no user accounts, forms or newsletters.')}</p>`);

    out.push(`<h2>3. ${t('Hosting und Server-Logfiles', 'Hosting and server log files')}</h2>
      <p>${t(`Diese Website wird bei ${esc(H.name)} gehostet. Beim Aufruf der Website verarbeitet der Hosting-Anbieter automatisch Daten, die Ihr Browser übermittelt: IP-Adresse, Datum und Uhrzeit des Abrufs, angeforderte Seite bzw. Datei, übertragene Datenmenge, Browsertyp und -version, Betriebssystem sowie Referrer-URL. Die Verarbeitung ist technisch erforderlich, um die Website auszuliefern und ihre Stabilität und Sicherheit zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und stabilen Betrieb). Wir verwenden diese Daten nicht, um Rückschlüsse auf einzelne Personen zu ziehen.`,
             `This website is hosted by ${esc(H.name)}. When you visit the website, the hosting provider automatically processes data transmitted by your browser: IP address, date and time of the request, requested page or file, amount of data transferred, browser type and version, operating system and referrer URL. This processing is technically necessary to deliver the website and to keep it stable and secure. The legal basis is Art. 6(1)(f) GDPR (legitimate interest in secure and stable operation). We do not use this data to draw conclusions about individuals.`)}</p>
      <p>${t('Anbieter', 'Provider')}: ${esc(H.name)}${H.address ? ', ' + esc(H.address) : ''}.${H.privacyUrl ? ' ' + t('Datenschutzhinweise des Anbieters', 'Provider privacy information') + ': ' + link(H.privacyUrl) : ''}</p>
      <p>${t('Dabei kann Ihre IP-Adresse in die USA übermittelt werden. Die Übermittlung stützt sich auf den Angemessenheitsbeschluss der EU-Kommission zum EU-U.S. Data Privacy Framework bzw. auf Standardvertragsklauseln des Anbieters.',
             'Your IP address may be transferred to the USA in the process. The transfer relies on the European Commission’s adequacy decision for the EU-U.S. Data Privacy Framework or on the provider’s standard contractual clauses.')}</p>`);

    out.push(`<h2>4. ${t('Kontaktaufnahme per E-Mail', 'Contact by email')}</h2>
      <p>${t('Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre E-Mail-Adresse, Ihren Namen (sofern angegeben) und den Inhalt Ihrer Nachricht, um Ihre Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage mit einem Vertrag zusammenhängt, andernfalls Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Wir löschen die Daten, sobald die Anfrage erledigt ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
             'If you contact us by email, we process your email address, your name (if provided) and the content of your message in order to answer your request. The legal basis is Art. 6(1)(b) GDPR where the request relates to a contract, otherwise Art. 6(1)(f) GDPR (legitimate interest in answering enquiries). We delete the data once the request has been dealt with and no statutory retention duties apply.')}</p>`);

    out.push(`<h2>5. ${t('Externe Links', 'External links')}</h2>
      <p>${t('Diese Website enthält Links zu externen Seiten, z. B. zu Steam (Valve Corporation), itch.io und sozialen Netzwerken. Es handelt sich um reine Links, keine eingebetteten Inhalte: Daten werden erst an diese Anbieter übertragen, wenn Sie einen Link anklicken. Für die Datenverarbeitung auf den verlinkten Seiten sind deren Betreiber verantwortlich; bitte beachten Sie deren Datenschutzerklärungen.',
             'This website contains links to external sites, for example Steam (Valve Corporation), itch.io and social networks. These are plain links, not embedded content: no data is sent to these providers until you click a link. The operators of the linked sites are responsible for data processing there; please refer to their privacy policies.')}</p>`);

    out.push(`<h2>6. ${t('Ihre Rechte', 'Your rights')}</h2>
      <p>${t('Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:', 'You have the following rights regarding your personal data:')}</p>
      <ul>
        <li>${t('Auskunft (Art. 15 DSGVO)', 'access (Art. 15 GDPR)')}</li>
        <li>${t('Berichtigung (Art. 16 DSGVO)', 'rectification (Art. 16 GDPR)')}</li>
        <li>${t('Löschung (Art. 17 DSGVO)', 'erasure (Art. 17 GDPR)')}</li>
        <li>${t('Einschränkung der Verarbeitung (Art. 18 DSGVO)', 'restriction of processing (Art. 18 GDPR)')}</li>
        <li>${t('Datenübertragbarkeit (Art. 20 DSGVO)', 'data portability (Art. 20 GDPR)')}</li>
        <li>${t('Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)', 'objection to processing (Art. 21 GDPR)')}</li>
      </ul>
      <p>${t('Zur Ausübung Ihrer Rechte genügt eine E-Mail an die oben genannte Adresse.', 'To exercise your rights, simply send an email to the address above.')}</p>`);

    out.push(`<h2>7. ${t('Beschwerderecht', 'Right to lodge a complaint')}</h2>
      <p>${t('Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO), insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.',
             'You have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR), in particular in the Member State of your habitual residence, place of work or place of the alleged infringement.')} ${authority}</p>`);

    out.push(`<h2>8. ${t('Verschlüsselung', 'Encryption')}</h2>
      <p>${t('Diese Website wird über eine verschlüsselte HTTPS-Verbindung ausgeliefert.', 'This website is delivered over an encrypted HTTPS connection.')}</p>`);

    return out.join('\n');
  }

  /* ------------------------------------------------------------------
     Render
     ------------------------------------------------------------------ */
  const body = page === 'datenschutz' ? datenschutz() : impressum();

  let banner = '';
  if (missing.length || advised.length) {
    banner = `<div class="draft" role="note"><strong>${t('Entwurf – bitte vervollständigen', 'Draft – please complete')}</strong><br>
      ${t('Trage diese Angaben in site.config.js ein:', 'Fill these in in site.config.js:')}
      ${[...new Set([...missing, ...advised])].map(esc).join(', ')}.
      <br><small>${t('Dieser Hinweis verschwindet automatisch, sobald alles ausgefüllt ist.', 'This notice disappears automatically once everything is filled in.')}</small></div>`;
    console.warn('[site.config.js] Missing legal data:', [...new Set([...missing, ...advised])]);
  }

  document.getElementById('doc').innerHTML = banner + body;
  document.documentElement.lang = lang;
  document.title = `${page === 'datenschutz' ? t('Datenschutzerklärung', 'Privacy policy') : t('Impressum', 'Legal notice')} – ${(S.studio && S.studio.name) || ''}`;

  const sw = document.getElementById('lang-switch');
  if (sw) {
    sw.innerHTML = ['de', 'en'].map((l) =>
      `<a class="btn small" href="?lang=${l}" ${l === lang ? 'aria-current="true"' : ''} hreflang="${l}" lang="${l}">${l.toUpperCase()}</a>`).join('');
  }
  document.querySelectorAll('a[data-keep-lang]').forEach((a) => {
    a.href = a.getAttribute('href').split('?')[0] + '?lang=' + lang;
  });
})();
