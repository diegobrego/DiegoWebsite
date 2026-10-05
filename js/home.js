/* Home page: renders social icons, game cards and the about text from
   site.config.js. Everything is built with textContent - no HTML injection. */
(() => {
  'use strict';

  const S = window.SITE || {};
  const ICONS = 'assets/Icons/';

  const PLATFORMS = {
    steam:     { label: 'Steam',     icon: 'icons8-steam-144.png' },
    itch:      { label: 'itch.io',   icon: 'icons8-itch-io-144.png' },
    x:         { label: 'X',         icon: 'icons8-twitterx-144.png' },
    instagram: { label: 'Instagram', icon: 'icons8-instagram-144.png' },
    facebook:  { label: 'Facebook',  icon: 'icons8-facebook-144.png' },
  };

  const el = (tag, props = {}, ...kids) => {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (v === false || v == null) return;
      if (k === 'class') node.className = v;
      else node.setAttribute(k, v);
    });
    kids.flat().forEach((k) => node.append(k));
    return node;
  };

  const external = { target: '_blank', rel: 'noopener noreferrer' };
  const icon = (key) => el('img', { src: ICONS + PLATFORMS[key].icon, alt: '', width: 24, height: 24 });

  const formatDate = (s) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s || '')) return s || '';
    return new Date(s + 'T00:00:00Z').toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
    });
  };

  /* ---------- header buttons ---------- */
  const social = document.getElementById('social');
  Object.entries(S.links || {}).forEach(([key, url]) => {
    if (!url || !PLATFORMS[key]) return;
    social.append(el('a', { class: 'btn', href: url, ...external }, icon(key), PLATFORMS[key].label));
  });
  if (!social.children.length) social.hidden = true;

  /* ---------- games ---------- */
  const card = (g) => {
    const soon = g.status === 'coming-soon';
    const buttons = Object.entries(g.links || {})
      .filter(([key, url]) => url && PLATFORMS[key])
      .map(([key, url]) => {
        const text = soon && key === 'steam' ? 'Wishlist on Steam' : PLATFORMS[key].label;
        return el('a', { class: 'btn', href: url, ...external }, icon(key), text);
      });

    return el('article', { class: 'game' + (g.image ? '' : ' no-image') },
      g.image && el('img', { class: 'game-capsule', src: g.image, alt: g.title + ' capsule art', loading: 'lazy' }),
      el('div', { class: 'game-info' },
        el('h3', {}, g.title),
        el('div', { class: 'game-meta' },
          el('span', { class: 'badge' + (soon ? ' soon' : '') }, soon ? 'Coming soon' : 'Out now'),
          g.releaseDate && el('span', {}, formatDate(g.releaseDate))),
        el('p', {}, g.description || ''),
        g.tags && g.tags.length && el('ul', { class: 'tags', 'aria-label': 'Tags' }, g.tags.map((t) => el('li', {}, t))),
        buttons.length && el('div', { class: 'btn-row' }, buttons)));
  };

  const mount = document.getElementById('games');
  const all = S.games || [];
  [
    { title: 'Coming soon!', list: all.filter((g) => g.status === 'coming-soon') },
    { title: 'Out now!',     list: all.filter((g) => g.status !== 'coming-soon') },
  ].forEach(({ title, list }) => {
    if (!list.length) return;
    mount.append(el('section', { class: 'section', 'data-section': '' },
      el('h2', { class: 'section-title' }, el('span', {}, title)),
      list.map(card)));
  });

  /* ---------- about ---------- */
  const about = document.getElementById('about-text');
  (S.studio && S.studio.about || []).forEach((p) => about.append(el('p', {}, p)));
})();
