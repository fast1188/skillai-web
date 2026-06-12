// skillai.top main.js v3.0 (2026-06-13 修 BUG-035/037 + 修-02)
(function() {
  'use strict';
  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  function fixDownloadDup() {
    document.querySelectorAll('a[href*="/download"]').forEach((a, i) => { if (i > 0) a.remove(); });
    document.querySelectorAll('header').forEach(h => { const links = h.querySelectorAll('a[href*="/download"]'); if (links.length > 1) for (let i = 1; i < links.length; i++) links[i].remove(); });
  }
  function fixDocsLink() {
    document.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.indexOf('newapi.pro') >= 0 || href.indexOf('new-api') >= 0 || href.indexOf('docs.newapi') >= 0) {
        a.setAttribute('href', 'https://docs.skillai.top');
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
        a.textContent = '\u{1F4D1} \u63A5\u5165\u6587\u6863';
      }
    });
  }
  function removeNewApiFooter() {
    document.querySelectorAll('a, span, div, p').forEach(el => {
      if (el.children.length === 0) {
        const t = (el.textContent || '').trim();
        if (t.indexOf('\u8BBE\u8BA1\u4E0E\u5F00\u53D1\u7531 New API') >= 0 || t === 'New API' || t.indexOf('designed by New API') >= 0) {
          el.remove();
        }
      }
    });
  }
  function fixVendorLogos() {
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', function() {
        const alt = (this.alt || '').trim();
        if (alt) {
          const span = document.createElement('span');
          span.textContent = alt.slice(0, 2).toUpperCase();
          span.style.cssText = 'background:linear-gradient(135deg,#7c5cff,#22d3ee);color:#fff;font-weight:700;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;min-width:48px;min-height:48px;font-size:18px;';
          this.parentNode && this.parentNode.replaceChild(span, this);
        }
      });
    });
  }
  function apply() {
    try { fixDownloadDup(); fixDocsLink(); removeNewApiFooter(); fixVendorLogos(); } catch (e) { console.error('skillai main.js:', e); }
  }
  ready(apply);
  const obs = new MutationObserver(() => { clearTimeout(window._smaT); window._smaT = setTimeout(apply, 200); });
  obs.observe(document.body, { childList: true, subtree: true });
})();