// Shared contact links and optional Google Analytics 4 integration.
(() => {
  document.querySelectorAll('[data-contact-email]').forEach((link) => {
    const email = atob(link.dataset.contactEmail);
    link.href = 'mailto:' + email;
    link.querySelectorAll('[data-contact-email-text]').forEach((text) => {
      text.textContent = email;
    });
  });

  const measurementId = document.querySelector('meta[name="ga4-measurement-id"]')?.content;
  if (!/^G-[A-Z0-9]+$/.test(measurementId || '') || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
  document.head.appendChild(tag);
})();
