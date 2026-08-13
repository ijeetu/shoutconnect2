/* ------------------------------------------------
 * Connect Agency — Work page interactions
 * 01. Hero discipline rotator
 * 02. Archive filtering + staggered reveal
 * 03. Cover lightbox (keyboard + swipe aware)
 * ------------------------------------------------ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --------------------------------------------- //
  // Hero Discipline Rotator Start
  // --------------------------------------------- //
  var rotator = document.querySelector("[data-work-rotator]");

  if (rotator) {
    var words = Array.prototype.slice.call(rotator.querySelectorAll(".work-hero__rotator-item"));

    if (words.length) {
      var activeWord = 0;
      words[0].classList.add("is-active");

      if (words.length > 1 && !reduceMotion) {
        window.setInterval(function () {
          var current = words[activeWord];
          activeWord = (activeWord + 1) % words.length;
          var next = words[activeWord];

          current.classList.remove("is-active");
          current.classList.add("is-leaving");
          next.classList.add("is-active");

          window.setTimeout(function () {
            current.classList.remove("is-leaving");
          }, 600);
        }, 2600);
      }
    }
  }
  // --------------------------------------------- //
  // Hero Discipline Rotator End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Archive Filters & Reveal Start
  // --------------------------------------------- //
  var grid = document.querySelector("[data-work-grid]");

  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll(".work-card"));
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll("[data-work-filter]"));
  var counter = document.querySelector("[data-work-count]");
  var emptyState = document.querySelector("[data-work-empty]");
  var visibleCards = cards.slice();

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

  function applyFilter(theme) {
    visibleCards = [];

    cards.forEach(function (card) {
      var match = theme === "all" || card.dataset.theme === theme;

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
      card.dataset.position = String(index);
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

      applyFilter(button.dataset.workFilter);
    });
  });

  cards.forEach(function (card, index) {
    card.dataset.position = String(index);
  });
  // --------------------------------------------- //
  // Archive Filters & Reveal End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Cover Lightbox Start
  // --------------------------------------------- //
  var lightbox = document.querySelector("[data-work-lightbox]");

  if (!lightbox) return;

  var stageImage = lightbox.querySelector("[data-lightbox-image]");
  var titleEl = lightbox.querySelector("[data-lightbox-title]");
  var metaEl = lightbox.querySelector("[data-lightbox-meta]");
  var currentEl = lightbox.querySelector("[data-lightbox-current]");
  var totalEl = lightbox.querySelector("[data-lightbox-total]");
  var prevBtn = lightbox.querySelector("[data-lightbox-prev]");
  var nextBtn = lightbox.querySelector("[data-lightbox-next]");
  var closeBtn = lightbox.querySelector("[data-lightbox-close]");
  var activeIndex = 0;
  var lastFocused = null;

  function lockScroll(locked) {
    document.body.classList.toggle("overflow-hidden", locked);
    // `lenis` is declared globally in app.js, which loads before this file.
    if (typeof lenis === "undefined" || !lenis) return;
    if (locked) lenis.stop();
    else lenis.start();
  }

  function renderSlide(index) {
    var card = visibleCards[index];
    if (!card) return;

    activeIndex = index;

    var source = card.dataset.full || card.querySelector("img").getAttribute("src");
    stageImage.classList.remove("is-loaded");
    stageImage.alt = card.dataset.client + " report cover";

    var preload = new Image();
    preload.onload = function () {
      stageImage.src = source;
      requestAnimationFrame(function () {
        stageImage.classList.add("is-loaded");
      });
    };
    preload.src = source;

    if (titleEl) titleEl.textContent = card.dataset.client;
    if (metaEl) metaEl.textContent = card.dataset.themeLabel + " · " + card.dataset.deliverable;
    if (currentEl) currentEl.textContent = String(index + 1);
    if (totalEl) totalEl.textContent = String(visibleCards.length);
  }

  function openLightbox(card) {
    var index = visibleCards.indexOf(card);
    if (index === -1) return;

    lastFocused = card;
    renderSlide(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    lockScroll(true);
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lockScroll(false);
    if (lastFocused) lastFocused.focus();
  }

  function step(delta) {
    if (!visibleCards.length) return;
    var next = (activeIndex + delta + visibleCards.length) % visibleCards.length;
    renderSlide(next);
  }

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      openLightbox(card);
    });
  });

  if (prevBtn) prevBtn.addEventListener("click", function () { step(-1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { step(1); });
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox || event.target.hasAttribute("data-lightbox-backdrop")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  });

  // Swipe support on touch devices.
  var touchStartX = 0;

  lightbox.addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener("touchend", function (event) {
    var delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) < 60) return;
    step(delta < 0 ? 1 : -1);
  }, { passive: true });
  // --------------------------------------------- //
  // Cover Lightbox End
  // --------------------------------------------- //
})();
