/* Shared behaviour: binds site.config.js into the page.
   No cookies, no storage, no network requests. */
(() => {
  'use strict';

  const S = window.SITE || {};
  const get = (path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), S);

  document.querySelectorAll('[data-cfg]').forEach((el) => {
    const v = get(el.dataset.cfg);
    if (v) el.textContent = v;
  });
  document.querySelectorAll('[data-mailto]').forEach((a) => {
    const v = get(a.dataset.mailto);
    if (v) { a.href = 'mailto:' + v; a.textContent = v; }
    else a.hidden = true;
  });
  document.querySelectorAll('[data-require]').forEach((el) => {
    if (!get(el.dataset.require)) el.hidden = true;
  });
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
