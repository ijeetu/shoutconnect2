/* ------------------------------------------------
 * Connect Agency — Services page interactions
 * 01. Hero discipline rotator
 * 02. Capability navigator scrollspy
 * ------------------------------------------------ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --------------------------------------------- //
  // Hero Discipline Rotator Start
  // --------------------------------------------- //
  var rotator = document.querySelector("[data-services-rotator]");

  if (rotator) {
    var words = Array.prototype.slice.call(rotator.querySelectorAll(".services-hero__rotator-item"));

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
  // Capability Navigator Scrollspy Start
  // --------------------------------------------- //
  var panelsWrap = document.querySelector("[data-services-panels]");
  var indexWrap = document.querySelector("[data-services-index]");

  if (!panelsWrap || !indexWrap) return;

  var panels = Array.prototype.slice.call(panelsWrap.querySelectorAll("[data-services-panel]"));
  var links = Array.prototype.slice.call(indexWrap.querySelectorAll("[data-services-target]"));

  if (!panels.length || !links.length) return;

  function setActive(id) {
    links.forEach(function (link) {
      var isActive = link.dataset.servicesTarget === id;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      var target = document.getElementById(link.dataset.servicesTarget);
      if (!target) return;
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    panels.forEach(function (panel) {
      observer.observe(panel);
    });
  }
  // --------------------------------------------- //
  // Capability Navigator Scrollspy End
  // --------------------------------------------- //
})();
