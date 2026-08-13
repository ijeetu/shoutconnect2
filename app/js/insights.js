/* ------------------------------------------------
 * Connect Agency — Insights page interactions
 * 01. Topic filtering + staggered reveal
 * Self-contained: guards every DOM query and bails out early when its
 * nodes are absent, so it can never interfere with work.js or any other
 * page's scripts.
 * ------------------------------------------------ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var grid = document.querySelector("[data-insights-grid]");

  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll(".insights-card"));
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll("[data-insights-filter]"));
  var counter = document.querySelector("[data-insights-count]");
  var emptyState = document.querySelector("[data-insights-empty]");
  var visibleCards = cards.slice();

  if (!cards.length) return;

  function revealCard(card, order) {
    if (reduceMotion) {
      card.classList.add("is-revealed");
      return;
    }
    card.style.transitionDelay = Math.min(order, 8) * 60 + "ms";
    requestAnimationFrame(function () {
      card.classList.add("is-revealed");
    });
    window.setTimeout(function () {
      card.style.transitionDelay = "";
    }, 900);
  }

  // Reveal cards as they scroll into view.
  if ("IntersectionObserver" in window && !reduceMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, index) {
          if (!entry.isIntersecting) return;
          revealCard(entry.target, index);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    cards.forEach(function (card) {
      observer.observe(card);
    });
  } else {
    cards.forEach(function (card) {
      card.classList.add("is-revealed");
    });
  }

  function applyFilter(topic) {
    visibleCards = [];

    cards.forEach(function (card) {
      var match = topic === "all" || card.dataset.insightsTopic === topic;

      if (match) {
        card.classList.remove("is-hidden");
        card.classList.remove("is-revealed");
        visibleCards.push(card);
      } else {
        card.classList.add("is-hidden");
        card.classList.remove("is-revealed");
      }
    });

    visibleCards.forEach(function (card, index) {
      revealCard(card, index);
    });

    if (counter) counter.textContent = String(visibleCards.length);
    if (emptyState) emptyState.hidden = visibleCards.length > 0;

    if (window.ScrollTrigger && typeof window.ScrollTrigger.refresh === "function") {
      window.setTimeout(function () {
        window.ScrollTrigger.refresh();
      }, 400);
    }
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (button.classList.contains("is-active")) return;

      filterButtons.forEach(function (other) {
        other.classList.remove("is-active");
        other.setAttribute("aria-pressed", "false");
      });
      button.classList.add("is-active");
      button.setAttribute("aria-pressed", "true");

      applyFilter(button.dataset.insightsFilter);
    });
  });
})();
