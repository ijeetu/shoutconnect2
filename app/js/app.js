/*! ------------------------------------------------
 * Project Name: Rayo - Digital Agency & Personal Portfolio HTML Template
 * Project Description: Elevate your digital presence with Rayo - dynamic and stylish HTML template designed for creative agencies and personal brands. With modern layouts, smooth interactions and a polished aesthetic, Rayo template helps showcase projects, services and expertise with clarity and impact.
 * Tags: mix_design, resume, portfolio, personal page, cv, template, one page, responsive, html5, css3, creative, clean, agency, studio
 * Version: 1.0.0
 * Build Date: July 2025
 * Last Update: August 2025
 * This product is available exclusively on Themeforest
 * Author: mix_design
 * Author URI: https://themeforest.net/user/mix_design
 * File name: app.js
 * ------------------------------------------------

 * ------------------------------------------------
 * Table of Contents
 * ------------------------------------------------
 *
 *  01. Loader & Loading Animation
 *  02. Lenis Scroll Plugin
 *  03. Typed.js Plugin
 *  04. Header Scroll Behavior
 *  05. Hero #02 Scroll Out Animation
 *  06. Hero #07 Scroll Out Animation
 *  07. Hero #08 Scroll Out Animation
 *  08. SVG Fallback
 *  09. Chrome Smooth Scroll
 *  10. Images Moving Ban
 *  11. Detecting Mobile/Desktop
 *  12. Smooth Scrolling
 *  13. Menu & Hamburger
 *  14. Menu Accordion
 *  15. Layout Masonry
 *  16. Accordion
 *  17. Magnific Popup Video
 *  18. Mailchimp Subscribe Form
 *  19. Contact Form
 *  20. Parallax - Ukiyo Images & Video
 *  21. Pinned Images
 *  22. Stacking Cards
 *  23. Animation - Buttons Common
 *  24. Animation - Text Reveal
 *  25. Animation - Scroll Universal
 *  26. Animation - Images Reveal on Hover
 *  27. Swiper Slider - Testimonials #01
 *  28. Swiper Slider - Testimonials #02
 *  29. Swiper Slider - Inner Pages Demo
 *  30. CountUp - All Counters Options
 *  31. Marquee - Two Lines
 *  32. Marquee - One Line To Right
 *  33. Marquee - One Line To Left
 *  34. SVG DOM Injection
 *  35. Color Switch
 *  36. Scroll to Top Button
 *  37. Parallax Universal
 *
 * ------------------------------------------------
 * Table of Contents End
 * ------------------------------------------------ */

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

// --------------------------------------------- //
// Loader & Loading Animation Start
// --------------------------------------------- //
const loadingWrap = document.querySelector('.loading-wrap');
const loadingItems = loadingWrap
  ? loadingWrap.querySelectorAll('.loading__item:not(.hero-news__title):not(.hero-news__services)')
  : [];
const fadeInItems = document.querySelectorAll('.loading__fade');
const pageEntryItems = document.querySelectorAll('.mxd-nav__wrap, #header, #mxd-page-content');
const deferredVideos = document.querySelectorAll('.mxd-hero-05-videoblock__video video');
const loaderRoot = document.getElementById('loader');
const isInnerPage = document.body.classList.contains('inner-page') || !loaderRoot;
const loaderTypedTarget = document.getElementById('loader-typed');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Content is ready as soon as its markup is available. Lazy images, custom
// fonts, and background videos must not hold the whole page behind an intro.
gsap.set(pageEntryItems, { autoAlpha: 1 });
if (loadingItems.length) gsap.set(loadingItems, { autoAlpha: 1, y: 0 });
gsap.set(fadeInItems, { autoAlpha: 1 });

function playVideos(videos) {
  videos.forEach((video) => {
    const playPromise = video.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch(() => {});
    }
  });
}

function finishLoader() {
  if (!loaderRoot) return;
  loaderRoot.classList.add('loaded');
  loaderRoot.hidden = true;
}

// If scripts arrive late, the page may already be painted; do not cover it
// with an introduction after the visitor has started reading.
const introIsTimely = window.performance && window.performance.now() < 600;
if (loaderRoot && !isInnerPage && !prefersReducedMotion && introIsTimely) {
  if (loaderTypedTarget) {
    loaderTypedTarget.innerHTML = 'Conceptualisers<br>Creators<br>Communicators';
  }
  loaderRoot.classList.add('loader--fonts-ready');
  loaderRoot.setAttribute('aria-hidden', 'true');
  loaderRoot.style.pointerEvents = 'none';
  loaderRoot.hidden = false;
  // Keep the existing branding as a brief introduction, without typing or
  // network readiness delays. The timeout also guards an interrupted tween.
  setTimeout(() => {
    gsap.to(loaderRoot.querySelector('.loader__wrapper'), {
      duration: 0.18,
      ease: 'none',
      autoAlpha: 0,
      onComplete: finishLoader
    });
  }, 350);
  setTimeout(finishLoader, 650);
} else {
  finishLoader();
}

playVideos(deferredVideos);

// --------------------------------------------- //
// Loader & Loading Animation End
// --------------------------------------------- //

// --------------------------------------------- //
// Lenis Scroll Plugin Start
// --------------------------------------------- //
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
});
gsap.ticker.lagSmoothing(0);
// --------------------------------------------- //
// Lenis Scroll Plugin End
// --------------------------------------------- //

$(window).on("load", function() {
   
  "use strict";

  // --------------------------------------------- //
  // Typed.js Plugin Settings Start
  // --------------------------------------------- //
  var animatedHeadline = $(".animated-type");
  if(animatedHeadline.length){
    var typed = new Typed('#typed', {
      stringsElement: '#typed-strings',
      showCursor: true,
      cursorChar: '_',
      loop: true,
      typeSpeed: 70,
      backSpeed: 30,
      backDelay: 2500
    });
  }
  // --------------------------------------------- //
  // Typed.js Plugin Settings End
  // --------------------------------------------- //
  
});

$(window).on("scroll", function() {

  // --------------------------------------------- //
  // Header Scroll Behavior Start
  // --------------------------------------------- //
  if($(window).scrollTop() > 10) {
      $(".mxd-header").addClass("is-hidden");
  } else {
    $(".mxd-header").removeClass("is-hidden");
  }
  // --------------------------------------------- //
  // Header Scroll Behavior End
  // --------------------------------------------- //

});

// --------------------------------------------- //
// Hero #02 Scroll Out Animation Start
// --------------------------------------------- //
// Hero #02 scroll animated elements
hero02FadeOutEl = document.querySelectorAll(".hero-02-static-anim-el"); 
hero02FadeOutEl.forEach((element) => {
  let hero02fadeOutTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero-02-static__tl-trigger",
      start: "top 14%",
      end: "top 0.2%",
      scrub: {
        scrub: true, 
        ease: "sine",
      },
      // markers: true
    },
  });
  hero02fadeOutTl.fromTo(element, {
    transform: "translate3d(0, 0, 0)",
    scaleY: 1,
    opacity: 1
  }, 
  {
    transform: "translate3d(0, -5rem, 0)",
    scaleY: 1.3,
    opacity: 0
  });
});
// Hero #02 pinned screen
fadeOutEl = document.querySelectorAll(".hero-02-fade-out-scroll"); 
fadeOutEl.forEach((element) => {
  let fadeOutTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".mxd-pinned-fullscreen__tl-trigger",
      start: "top 80%",
      end: "top 10%",
      scrub: {
        scrub: true, 
        ease: "sine",
      },
      // markers: true
    },
  });
  fadeOutTl.fromTo(element, { opacity: 1 }, { opacity: 0 });
});
// --------------------------------------------- //
// Hero #02 Scroll Out Animation End
// --------------------------------------------- //

// --------------------------------------------- //
// Hero #07 Scroll Out Animation Start
// --------------------------------------------- //
// Hero #07 scroll animated elements
hero07FadeOutEl = document.querySelectorAll(".hero-07-slide-out-scroll"); 
hero07FadeOutEl.forEach((element) => {
  let hero07fadeOutTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".mxd-hero-07__tl-trigger",
      start: "top 86%",
      end: "top 10%",
      scrub: {
        scrub: true, 
        ease: "power4.out",
      },
      // markers: true
    },
  });
  hero07fadeOutTl.fromTo(element, {
    transform: "translate3d(0, 0, 0)",
    scaleY: 1,
    // opacity: 1
  }, 
  {
    transform: "translate3d(0, -26rem, 0)",
    scaleY: 0.8,
    // opacity: 0
  });
});
// Hero #07 small scroll-out elements
fadeOutEl = document.querySelectorAll(".hero-07-fade-out-scroll"); 
fadeOutEl.forEach((element) => {
  let fadeOutTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".mxd-hero-07__tl-trigger",
      start: "top 70%",
      end: "top 40%",
      scrub: {
        scrub: true, 
        ease: "elastic.out(1,0.3)",
      },
      // markers: true
    },
  });
  fadeOutTl.fromTo(element, { opacity: 1, transform: "translate3d(0, 0, 0)" }, { opacity: 0, transform: "translate3d(0, -10rem, 0)"});
});
// --------------------------------------------- //
// Hero #07 Scroll Out Animation End
// --------------------------------------------- //

// --------------------------------------------- //
// Hero #08 Scroll Out Animation Start
// --------------------------------------------- //
hero07FadeOutEl = document.querySelectorAll(".hero-08-slide-out-scroll");
hero07ScaleOutEl = document.querySelectorAll(".hero-08-scale-out-scroll"); 
hero07FadeOutEl.forEach((element) => {
  let hero07fadeOutTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".mxd-hero-08__tl-trigger",
      start: "top 80%",
      end: "top 40%",
      scrub: {
        scrub: true, 
        ease: "power4.inOut",
      },
      // markers: true
    },
  });
  hero07fadeOutTl.fromTo(element, {
    transform: "translate3d(0, 0, 0)",
    // scaleY: 1,
    opacity: 1
  }, 
  {
    transform: "translate3d(0, -5rem, 0)",
    // scaleY: 0.8,
    opacity: 0
  });
});
hero07ScaleOutEl.forEach((element) => {
  let hero07scaleOutTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".mxd-hero-08__tl-trigger",
      start: "top 40%",
      end: "top 10%",
      scrub: {
        scrub: true, 
        ease: "power4.inOut",
      },
      // markers: true
    },
  });
  hero07scaleOutTl.fromTo(element, {
    transform: "translate3d(0, 0, 0)",
    scaleY: 1,
    opacity: 1
  }, 
  {
    transform: "translate3d(0, -5rem, 0)",
    scaleY: 1.2,
    opacity: 0
  });
});
// --------------------------------------------- //
// Hero #08 Scroll Out Animation End
// --------------------------------------------- //


$(function() {

  // --------------------------------------------- //
  // SVG Fallback Start
  // --------------------------------------------- //
  if(!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function() {
      return $(this).attr("src").replace(".svg", ".png");
    });
  };
  // --------------------------------------------- //
  // SVG Fallback End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Chrome Smooth Scroll Start
  // --------------------------------------------- //
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {
  };
  // --------------------------------------------- //
  // Chrome Smooth Scroll End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Images Moving Ban Start
  // --------------------------------------------- //
  $("img, a").on("dragstart", function(event) { event.preventDefault(); });
  // --------------------------------------------- //
  // Images Moving Ban End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Detecting Mobile/Desktop Start
  // --------------------------------------------- //
  var isMobile = false;
  if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('html').addClass('touch');
    isMobile = true;
  }
  else {
    $('html').addClass('no-touch');
    isMobile = false;
  }
  //IE, Edge
  var isIE = /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /Edge\/\d+/.test(navigator.userAgent);
  // --------------------------------------------- //
  // Detecting Mobile/Desktop End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Smooth Scrolling Start
  // --------------------------------------------- //
  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          } else {
            $target.attr('tabindex','-1');
            $target.focus();
          };
        });
      }
    }
  });
  // --------------------------------------------- //
  // Smooth Scrolling End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Menu & Hamburger Start
  // --------------------------------------------- //
  $(".mxd-nav__wrap").each(function() {
    let hamburgerEl   = $(this).find(".mxd-nav__hamburger");
    let navLineEl     = $(this).find(".hamburger__line");
    let menuContainEl = $(this).find(".mxd-menu__contain");
    let flipItemEl    = $(this).find(".hamburger__base");
    let menuWrapEl    = $(this).find(".mxd-menu__wrapper");
    let menuBaseEl    = $(this).find(".mxd-menu__base");
    let menuLinkEl    = $(this).find(".mxd-menu__link");
    let menuItem      = $(this).find(".main-menu__item");
    let videoEl       = $(this).find(".menu-promo__video");
    const menuVideos  = $(this).find(".menu-video").get();
    let fadeInEl      = $(this).find(".menu-fade-in");
    const headerEl = $(".mxd-header");
    let menuOpen = false;

    gsap.set(menuWrapEl, { display: "none", pointerEvents: "none" });

    function finishMenuClose() {
      if (menuOpen) return;
      gsap.set(menuWrapEl, { display: "none", pointerEvents: "none" });
      headerEl.removeClass("menu-is-visible");
    }

    function flip(forwards) {
      let state = Flip.getState(flipItemEl);
      if (forwards) {
        flipItemEl.appendTo(menuContainEl);
      } else {
        flipItemEl.appendTo(hamburgerEl);
      }
      Flip.from(state, { ease: "power4.inOut", duration: 0.8 });
    }

    let tl = gsap.timeline({ paused: true, onReverseComplete: finishMenuClose });
    tl.from(menuBaseEl, { 
      opacity: 0,
      duration: 0.75,
      ease: "power2.inOut"
    }, 0);
    tl.from(menuContainEl, {
      opacity: 0,
      yPercent: 2,
      duration: 0.55,
      ease: "power2.out"
    }, 0.08);
    tl.to(navLineEl.eq(0), { y: 5, duration: 0.16 }, "<")
    tl.to(navLineEl.eq(1), { y: -5, duration: 0.16 }, "<")
    tl.to(navLineEl.eq(0), { rotate: 45, duration: 0.16 }, 0.2)
    tl.to(navLineEl.eq(1), { rotate: -45, duration: 0.16 }, 0.2)
    tl.add("fade-in-up")
    .from(menuItem, {
      opacity: 0,
      yPercent: 50,
      duration: 0.2,
      stagger: {amount: 0.2}
    }, "fade-in-up")
    .from(videoEl, {
      opacity: 0,
      yPercent: 20,
      duration: 0.2,
    }, "fade-in-up");
    tl.from(fadeInEl, { opacity: 0, duration: 0.3, });

    function openMenu(open) {
      if (menuOpen === open) return;
      menuOpen = open;

      if (open) {
        gsap.set(menuWrapEl, { display: "flex", pointerEvents: "auto" });
        flip(true);
        playVideos(menuVideos);
        hamburgerEl.addClass("nav-open");
        headerEl.addClass("menu-is-visible");
        tl.play();
      } else {
        // A close request must interrupt the entrance animation immediately.
        // Release the page beneath the panel while its outro completes.
        menuVideos.forEach((video) => video.pause());
        gsap.set(menuWrapEl, { pointerEvents: "none" });
        flip(false);
        hamburgerEl.removeClass("nav-open");
        tl.reverse();
        if (tl.time() === 0) finishMenuClose();
      }
    }

    hamburgerEl.on("click", function(event) {
      event.preventDefault();
      if ($(this).hasClass("nav-open")) {
        openMenu(false);
      } else {
        openMenu(true);
      }
    });
    menuBaseEl.on("click", function () {
      openMenu(false);
    });
    $(document).on("keydown", function (e) {
      if (e.key === "Escape") {
        openMenu(false);
      }
    });

    window.addEventListener("beforeunload", (event) => {
      openMenu(false);
    });

  });
  // --------------------------------------------- //
  // Menu & Hamburger End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Menu Accordion Start
  // --------------------------------------------- //
  var Accordion = function(el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;
    var links = this.el.find('.main-menu__toggle');
    links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
  }
  Accordion.prototype.dropdown = function(e) {
    var $el = e.data.el;
        $this = $(this),
        $next = $this.next();
    $next.slideToggle();
    $this.parent().toggleClass('open');
    if (!e.data.multiple) {
      $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
    };
  }
  var accordion = new Accordion($('#main-menu'), false);
  // --------------------------------------------- //
  // Menu Accordion End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Layout Masonry After Each Image Loads Start
  // --------------------------------------------- //
  $('.mxd-projects-masonry__gallery').imagesLoaded().progress( function() {
    $('.mxd-projects-masonry__gallery').masonry('layout');
    ScrollTrigger.refresh();
  });
  // --------------------------------------------- //
  // Layout Masonry After Each Image Loads End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Accordion Start
  // --------------------------------------------- //
  $(".mxd-accordion__title").on("click", function(e) {
    e.preventDefault();
    var $this = $(this);
    if (!$this.hasClass("accordion-active")) {
      $(".mxd-accordion__content").slideUp(400);
      $(".mxd-accordion__title").removeClass("accordion-active");
      $('.mxd-accordion__arrow').removeClass('accordion-rotate');
    }
    $this.toggleClass("accordion-active");
    $this.next().slideToggle();
    $('.mxd-accordion__arrow',this).toggleClass('accordion-rotate');
    });
  // --------------------------------------------- //
  // Accordion End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Magnific Popup Video Start
  // --------------------------------------------- //
  $('#showreel-trigger').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
    callbacks: {
      beforeOpen: function() { $('body').addClass('overflow-hidden'); lenis.stop(); },
      close: function() { $('body').removeClass('overflow-hidden'); lenis.start(); }
    }
  });
  // --------------------------------------------- //
  // Magnific Popup Video End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Subscribe Form Start
  // --------------------------------------------- //
  $('.notify-form').on('submit', function(e) {
    e.preventDefault();
    var $form = $(this);
    var $notify = $form.closest('.notify');
    var email = $form.find('input[type="email"]').val();
    var $btn = $form.find('button[type="submit"]').addClass('is-submitting').prop('disabled', true);

    $.ajax({
      type: 'POST',
      url: 'subscribe.php',
      data: { email: email }
    }).done(function() {
      $notify.find('.form').addClass('is-hidden');
      $notify.find('.subscription-ok').addClass('is-visible');
      setTimeout(function() {
        $notify.find('.subscription-ok').removeClass('is-visible');
        $notify.find('.form').delay(300).removeClass('is-hidden');
        $form.trigger('reset');
      }, 5000);
    }).fail(function() {
      $notify.find('.form').addClass('is-hidden');
      $notify.find('.subscription-error').addClass('is-visible');
      setTimeout(function() {
        $notify.find('.subscription-error').removeClass('is-visible');
        $notify.find('.form').delay(300).removeClass('is-hidden');
        $form.trigger('reset');
      }, 5000);
    }).always(function() {
      $btn.removeClass('is-submitting').prop('disabled', false);
    });
  });
  // --------------------------------------------- //
  // Subscribe Form End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Contact Form Start
  // --------------------------------------------- //
  $("#contact-form").submit(function() { //Change
    var th = $(this);
    var $btn = th.find('button[type="submit"]').addClass('is-submitting').prop('disabled', true);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
      $('.contact').find('.form').addClass('is-hidden');
      $('.contact').find('.contact-ok').addClass('is-visible');
      setTimeout(function() {
        // Done Functions
        $('.contact').find('.contact-ok').removeClass('is-visible');
        $('.contact').find('.form').delay(300).removeClass('is-hidden');
        th.trigger("reset");
      }, 5000);
    }).fail(function() {
      $('.contact').find('.form').addClass('is-hidden');
      $('.contact').find('.contact-error').addClass('is-visible');
      setTimeout(function() {
        $('.contact').find('.contact-error').removeClass('is-visible');
        $('.contact').find('.form').delay(300).removeClass('is-hidden');
      }, 5000);
    }).always(function() {
      $btn.removeClass('is-submitting').prop('disabled', false);
    });
    return false;
  });
  // --------------------------------------------- //
  // Contact Form End
  // --------------------------------------------- //
  
});

// --------------------------------------------- //
// Parallax - Ukiyo Images & Video Start
// --------------------------------------------- //
const images = document.querySelectorAll(".parallax-img");
const imagesSmall = document.querySelectorAll(".parallax-img-small");
const video = document.querySelectorAll(".parallax-video");
new Ukiyo(images,{
  scale: 1.5,
  speed: 1.5,
  externalRAF: false,
});
new Ukiyo(imagesSmall,{
  scale: 1.2,
  speed: 1.5,
  externalRAF: false
});
new Ukiyo(video,{
  scale: 1.5,
  speed: 1.5,
  externalRAF: false
});
// --------------------------------------------- //
// Parallax - Ukiyo Images & Video End
// --------------------------------------------- //

// --------------------------------------------- //
// Pinned Images (for Services Block) Start
// --------------------------------------------- //
$(".mxd-pinned").each(function (index) {
  let childTriggers = $(this).find(".mxd-pinned__text-item");
  let childTargets = $(this).find(".mxd-pinned__img-item");
  function makeItemActive(index) {
    childTriggers.removeClass('is-active');
    childTargets.removeClass('is-active');
    childTriggers.eq(index).addClass('is-active');
    childTargets.eq(index).addClass('is-active');
  }
  makeItemActive(0);
  childTriggers.each(function (index) {
    ScrollTrigger.create({
      trigger: $(this),
      start: "top center",
      end: "bottom center",
      onToggle: (isActive) => {
        if (isActive) {
          makeItemActive(index);
        }
      }
    })
  });
});
// --------------------------------------------- //
// Pinned Images (for Services Block) End
// --------------------------------------------- //

// --------------------------------------------- //
// Stacking Cards Start
// --------------------------------------------- //
const stackWrappers = document.querySelectorAll(".stack-wrapper");

if (stackWrappers.length) {
  stackWrappers.forEach((wrapper) => {
    const cards = wrapper.querySelectorAll(".stack-item");
    const stickySpace = wrapper.querySelector(".stack-offset");
    if (!cards.length || !stickySpace) return;

    const animation = gsap.timeline();
    let cardHeight = 0;

    function initCards() {
      animation.clear();
      cardHeight = cards[0].offsetHeight;
      cards.forEach((card, index) => {
        if (index === 0) {
          gsap.set(card, { y: 0 });
          return;
        }
        gsap.set(card, { y: index * cardHeight });
        animation.to(card, { y: 0, duration: index * 0.5, ease: "none" }, 0);
      });
    }

    initCards();

    ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      pin: true,
      end: () => `+=${(cards.length * cardHeight) + stickySpace.offsetHeight}`,
      scrub: true,
      animation: animation,
      // markers: true,
      invalidateOnRefresh: true
    });

    ScrollTrigger.addEventListener("refreshInit", initCards);
  });
}
// --------------------------------------------- //
// Stacking Cards End
// --------------------------------------------- //

// --------------------------------------------- //
// Deliver Showcase Rows Start
// --------------------------------------------- //
const deliverShowcases = document.querySelectorAll(".deliver-showcase");

if (deliverShowcases.length) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  deliverShowcases.forEach((showcase) => {
    const rows = Array.from(showcase.querySelectorAll(".deliver-showcase__row"));
    if (!rows.length) return;

    let activeIndex = 0;
    let timer = null;
    let paused = false;

    const setActive = (index) => {
      rows.forEach((row, rowIndex) => row.classList.toggle("is-active", rowIndex === index));
      activeIndex = index;
    };

    const next = () => setActive((activeIndex + 1) % rows.length);

    const start = () => {
      if (prefersReducedMotion || timer) return;
      timer = window.setInterval(() => {
        if (!paused) next();
      }, 3200);
    };

    const stop = () => {
      if (!timer) return;
      window.clearInterval(timer);
      timer = null;
    };

    setActive(0);
    requestAnimationFrame(() => {
      showcase.classList.add("is-ready");
    });

    rows.forEach((row, index) => {
      row.addEventListener("mouseenter", () => {
        paused = true;
        setActive(index);
      });
      row.addEventListener("mouseleave", () => {
        paused = false;
      });
      row.addEventListener("focusin", () => {
        paused = true;
        setActive(index);
      });
      row.addEventListener("focusout", () => {
        paused = false;
      });
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) start();
            else stop();
          });
        },
        { threshold: 0.35 }
      );
      observer.observe(showcase);
    } else {
      start();
    }
  });
}
// --------------------------------------------- //
// Deliver Showcase Rows End
// --------------------------------------------- //

// --------------------------------------------- //
// Progress Stories Hover Loops Start
// --------------------------------------------- //
const progressStoryItems = document.querySelectorAll(".progress-stories__item");
const progressStoriesGrid = document.querySelector(".progress-stories__grid");

if (progressStoryItems.length) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hoverImageSets = {
    building_nation: [
      "img/covers/2026/thumb/apl-apollo-tubes.webp",
      "img/covers/2026/thumb/ashwini-container-movers.webp",
      "img/covers/2026/thumb/advait-energy.webp",
      "img/covers/2026/thumb/ajmera-realty.webp",
      "img/covers/2026/thumb/alpex-solar.webp",
      "img/covers/2026/thumb/alphageo.webp",
      "img/covers/2026/thumb/azad-engineering.webp",
      "img/covers/2026/thumb/elin-electronics.webp",
      "img/covers/2026/thumb/fujiyama-power.webp",
      "img/covers/2026/thumb/gmm-pfaudler.webp",
      "img/covers/2026/thumb/hbl-engineering.webp",
      "img/covers/2026/thumb/heg.webp",
      "img/covers/2026/thumb/kajaria-ceramics.webp",
      "img/covers/2026/thumb/krishca-strapping.webp",
      "img/covers/2026/thumb/lmw.webp",
      "img/covers/2026/thumb/midwest.webp",
      "img/covers/2026/thumb/orientbell.webp",
      "img/covers/2026/thumb/rvnl.webp",
      "img/covers/2026/thumb/shyam-metalics.webp",
      "img/covers/2026/thumb/tarc.webp",
      "img/covers/2026/thumb/tipco-engineering.webp",
      "img/covers/2026/thumb/vardhman-special-steels.webp",
      "img/covers/2026/thumb/yash-highvoltage.webp"
    ],
    shaping_future: [
      "img/covers/2026/thumb/cyient-dlm.webp",
      "img/covers/2026/thumb/cohance-lifesciences.webp",
      "img/covers/2026/thumb/alembic-pharma.webp",
      "img/covers/2026/thumb/suven-life-sciences.webp",
      "img/covers/2026/thumb/balaji-amines.webp",
      "img/covers/2026/thumb/gujarat-terce.webp",
      "img/covers/2026/thumb/ind-swift-labs.webp",
      "img/covers/2026/thumb/jg-chemicals.webp",
      "img/covers/2026/thumb/primo-chemicals.webp",
      "img/covers/2026/thumb/sigachi.webp",
      "img/covers/2026/thumb/venus-remedies.webp",
      "img/covers/2026/thumb/vipul-organics.webp"
    ],
    creating_impact: [
      "img/covers/2026/thumb/srichakra-polyplast.webp",
      "img/covers/2026/thumb/heritage-foods.webp",
      "img/covers/2026/thumb/vardhman-textiles.webp",
      "img/covers/2026/thumb/andhra-paper.webp",
      "img/covers/2026/thumb/bhilwara-technical-textiles.webp",
      "img/covers/2026/thumb/gokul-agro.webp",
      "img/covers/2026/thumb/indo-count.webp",
      "img/covers/2026/thumb/maral-overseas.webp",
      "img/covers/2026/thumb/nacl-industries.webp",
      "img/covers/2026/thumb/pajson-agro.webp",
      "img/covers/2026/thumb/relaxo.webp",
      "img/covers/2026/thumb/rswm.webp"
    ],
    driving_growth: [
      "img/covers/2026/thumb/zaggle.webp",
      "img/covers/2026/thumb/mobikwik.webp",
      "img/covers/2026/thumb/capital-india.webp",
      "img/covers/2026/thumb/sg-finserve.webp",
      "img/covers/2026/thumb/wealth-first.webp",
      "img/covers/2026/thumb/arman-financial.webp"
    ]
  };

  const encodePath = (path) => path.split("/").map((segment) => encodeURIComponent(segment)).join("/");
  const coverCompanies = {
    "apl-apollo-tubes": "APL Apollo Tubes",
    "ashwini-container-movers": "Ashwini Container Movers",
    "advait-energy": "Advait Energy",
    "ajmera-realty": "Ajmera Realty",
    "alpex-solar": "Alpex Solar",
    alphageo: "Alphageo",
    "azad-engineering": "Azad Engineering",
    "elin-electronics": "Elin Electronics",
    "fujiyama-power": "Fujiyama Power",
    "gmm-pfaudler": "GMM Pfaudler",
    "hbl-engineering": "HBL Engineering",
    heg: "HEG",
    "kajaria-ceramics": "Kajaria Ceramics",
    "krishca-strapping": "Krishca Strapping",
    lmw: "LMW",
    midwest: "Midwest",
    orientbell: "Orientbell",
    rvnl: "RVNL",
    "shyam-metalics": "Shyam Metalics",
    tarc: "TARC",
    "tipco-engineering": "Tipco Engineering",
    "vardhman-special-steels": "Vardhman Special Steels",
    "yash-highvoltage": "Yash Highvoltage",
    "cyient-dlm": "Cyient DLM",
    "cohance-lifesciences": "Cohance Lifesciences",
    "alembic-pharma": "Alembic Pharma",
    "suven-life-sciences": "Suven Life Sciences",
    "balaji-amines": "Balaji Amines",
    "gujarat-terce": "Gujarat Terce",
    "ind-swift-labs": "Ind-Swift Labs",
    "jg-chemicals": "JG Chemicals",
    "primo-chemicals": "Primo Chemicals",
    sigachi: "Sigachi",
    "venus-remedies": "Venus Remedies",
    "vipul-organics": "Vipul Organics",
    "srichakra-polyplast": "Srichakra Polyplast",
    "heritage-foods": "Heritage Foods",
    "vardhman-textiles": "Vardhman Textiles",
    "andhra-paper": "Andhra Paper",
    "bhilwara-technical-textiles": "Bhilwara Technical Textiles",
    "gokul-agro": "Gokul Agro",
    "indo-count": "Indo Count",
    "maral-overseas": "Maral Overseas",
    "nacl-industries": "NACL Industries",
    "pajson-agro": "Pajson Agro",
    relaxo: "Relaxo",
    rswm: "RSWM",
    zaggle: "Zaggle",
    mobikwik: "MobiKwik",
    "capital-india": "Capital India",
    "sg-finserve": "SG Finserve",
    "wealth-first": "Wealth First",
    "arman-financial": "Arman Financial"
  };

  progressStoryItems.forEach((item) => {
    const media = item.querySelector(".progress-stories__media");
    const frontImg = media ? media.querySelector("img") : null;
    if (!media || !frontImg) return;

    const setName = item.dataset.storySet;
    const rawSet = hoverImageSets[setName];
    if (!rawSet || !rawSet.length) return;
    const imageSet = rawSet.map((path) => {
      const slug = path.split("/").pop().replace(/\.webp$/, "");
      const company = coverCompanies[slug] || slug.replace(/-/g, " ");
      return {
        src: encodePath(path),
        alt: `${company} annual report 2025-26 cover`
      };
    });
    const coverBackground = (src) => `url("${new URL(src, document.baseURI).href}")`;

    const backImg = frontImg.cloneNode(true);
    backImg.classList.remove("is-visible");
    backImg.setAttribute("aria-hidden", "true");
    media.appendChild(backImg);

    let currentIndex = 0;
    let loopTimer = null;
    let showFront = true;
    let swapVersion = 0;
    const preloadedPaths = new Set([imageSet[0].src]);

    // Fetch only the next two covers while the card is active, rather than
    // downloading its entire gallery on the first hover or keyboard focus.
    const preloadUpcoming = () => {
      if (prefersReducedMotion) return;
      for (let offset = 1; offset <= 2; offset++) {
        const src = imageSet[(currentIndex + offset) % imageSet.length].src;
        if (preloadedPaths.has(src)) continue;
        preloadedPaths.add(src);
        const preloaded = new Image();
        preloaded.decoding = "async";
        preloaded.src = src;
      }
    };

    const swapTo = (index) => {
      const incoming = showFront ? backImg : frontImg;
      const outgoing = showFront ? frontImg : backImg;
      const version = ++swapVersion;
      let revealed = false;
      const revealIncoming = () => {
        requestAnimationFrame(() => {
          if (revealed || version !== swapVersion || !loopTimer) return;
          revealed = true;
          incoming.onload = null;
          incoming.classList.add("is-visible");
          incoming.removeAttribute("aria-hidden");
          outgoing.classList.remove("is-visible");
          outgoing.setAttribute("aria-hidden", "true");
          media.style.setProperty("--story-bg", coverBackground(imageSet[index].src));
          showFront = !showFront;
        });
      };
      // Keep the current cover visible until the next one has loaded.
      incoming.onload = revealIncoming;
      incoming.src = imageSet[index].src;
      incoming.alt = imageSet[index].alt;
      if (incoming.complete && incoming.naturalWidth) revealIncoming();
      preloadUpcoming();
    };

    const startLoop = () => {
      item.classList.add("is-looping");
      if (progressStoriesGrid) progressStoriesGrid.classList.add("is-focus-active");
      if (prefersReducedMotion || loopTimer || imageSet.length < 2) return;
      preloadUpcoming();
      loopTimer = window.setInterval(() => {
        currentIndex = (currentIndex + 1) % imageSet.length;
        swapTo(currentIndex);
      }, 1300);
    };

    const stopLoop = () => {
      item.classList.remove("is-looping");
      if (progressStoriesGrid) progressStoriesGrid.classList.remove("is-focus-active");
      if (loopTimer) {
        window.clearInterval(loopTimer);
        loopTimer = null;
      }
      swapVersion++;
      currentIndex = 0;
      frontImg.onload = null;
      backImg.onload = null;
      frontImg.src = imageSet[0].src;
      backImg.src = imageSet[0].src;
      frontImg.alt = imageSet[0].alt;
      backImg.alt = imageSet[0].alt;
      frontImg.classList.add("is-visible");
      frontImg.removeAttribute("aria-hidden");
      backImg.classList.remove("is-visible");
      backImg.setAttribute("aria-hidden", "true");
      media.style.setProperty("--story-bg", coverBackground(imageSet[0].src));
      showFront = true;
    };

    frontImg.src = imageSet[0].src;
    frontImg.alt = imageSet[0].alt;
    backImg.alt = imageSet[0].alt;
    frontImg.classList.add("is-visible");
    frontImg.removeAttribute("aria-hidden");
    backImg.classList.remove("is-visible");
    media.style.setProperty("--story-bg", coverBackground(imageSet[0].src));

    item.addEventListener("mouseenter", startLoop);
    item.addEventListener("mouseleave", stopLoop);
    item.addEventListener("focusin", startLoop);
    item.addEventListener("focusout", stopLoop);
  });
}
// --------------------------------------------- //
// Progress Stories Hover Loops End
// --------------------------------------------- //

// --------------------------------------------- //
// Key Clients Slider Start
// --------------------------------------------- //
const keyClientsSliders = document.querySelectorAll(".key-clients__slider");

if (keyClientsSliders.length) {
  keyClientsSliders.forEach((slider) => {
    const track = slider.querySelector("[data-clients-track]");
    const prevButton = slider.querySelector(".key-clients__arrow--prev");
    const nextButton = slider.querySelector(".key-clients__arrow--next");
    if (!track || !prevButton || !nextButton) return;

    const getStep = () => {
      const tile = track.querySelector(".key-clients__tile");
      if (!tile) return track.clientWidth * 0.8;
      return tile.getBoundingClientRect().width;
    };

    const updateButtons = () => {
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      prevButton.disabled = track.scrollLeft <= 2;
      nextButton.disabled = track.scrollLeft >= maxScroll - 2;
    };

    prevButton.addEventListener("click", () => {
      track.scrollBy({ left: -getStep(), behavior: "smooth" });
    });

    nextButton.addEventListener("click", () => {
      track.scrollBy({ left: getStep(), behavior: "smooth" });
    });

    track.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    updateButtons();
  });
}
// --------------------------------------------- //
// Key Clients Slider End
// --------------------------------------------- //

// --------------------------------------------- //
// Animation - Buttons Common Start
// --------------------------------------------- //
let elements = document.querySelectorAll(".btn-anim .btn-caption");

elements.forEach((element) => {
  let innerText = element.innerText;
  element.innerHTML = "";
  let textContainer = document.createElement("div");
  textContainer.classList.add("btn-anim__block");
  for (let letter of innerText) {
    let span = document.createElement("span");
    span.innerText = letter.trim() === "" ? "\xa0" : letter;
    span.classList.add("btn-anim__letter");
    textContainer.appendChild(span);
  }
    element.appendChild(textContainer);
    element.appendChild(textContainer.cloneNode(true));
});

elements.forEach((element) => {
  element.addEventListener("mouseover", () => {
    element.classList.remove("play");
  })
});
// --------------------------------------------- //
// Animation - Buttons Common End
// --------------------------------------------- //

// --------------------------------------------- //
// Animation - Text Reveal Start
// --------------------------------------------- //
const splitTypes = document.querySelectorAll(".reveal-type");
splitTypes.forEach((char,i) => {
  const text = new SplitType(char, { types: 'words, chars' });
  gsap.from(text.chars, {
    scrollTrigger: {
      trigger: char,
      start: 'top 80%',
      end: 'top 20%',
      scrub: true,
      markers: false
    },
    opacity: 0.2,
    stagger: 0.1
  });
});

const animInUp = document.querySelectorAll(".reveal-in-up");
animInUp.forEach((char,i) => {
  const text = new SplitType(char);
  gsap.from(text.chars, {
    scrollTrigger: {
      trigger: char,
      start: 'top 90%',
      end: 'top 20%',
      scrub: true,
      // markers: true
    },
    transformOrigin: "top left",
    //rotationY: 90,
    y: 10,
    stagger: 0.2,
    delay: 0.2,
    duration: 2,
    //opacity: 0.2
  });
});
// --------------------------------------------- //
// Animation - Text Reveal End
// --------------------------------------------- //

// --------------------------------------------- //
// Animation - Scroll Universal Animations Start
// --------------------------------------------- //
// Scroll Rotating Animation
const animateRotation = document.querySelectorAll(".animate-rotation");
animateRotation.forEach((section) => {
  var value = $(section).data("value");
  gsap.fromTo(section, {
    ease: 'sine',
    rotate: 0,
  }, {
    rotate: value,
    scrollTrigger: {
      trigger: section,
      scrub: true,
      toggleActions: 'play none none reverse',
    }
  });
});

//Scroll Animation In Up
const animateInUp = document.querySelectorAll(".anim-uni-in-up");
animateInUp.forEach((element) => {
  gsap.fromTo(element, {
    opacity: 0,
    y: 50,
    ease: 'sine',
  }, {
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: element,
      toggleActions: 'play none none reverse',
    }
  });
});

// Scroll Animation Scale In
const animateInUpFront = document.querySelectorAll(".anim-uni-scale-in");
animateInUpFront.forEach((element) => {
  gsap.fromTo(element, {
    opacity: 1,
    y: 50,
    //x: 70,
    scale: 1.2,
    ease: 'sine',
  }, {
    y: 0,
    x: 0,
    opacity: 1,
    scale: 1,
    scrollTrigger: {
      trigger: element,
      toggleActions: 'play none none reverse',
    }
  });
});

// Scroll Animation Scale In Right
const animateInUpRight = document.querySelectorAll(".anim-uni-scale-in-right");
animateInUpRight.forEach((element) => {
  gsap.fromTo(element, {
    opacity: 1,
    y: 50,
    x: -70,
    scale: 1.2,
    ease: 'sine',
    duration: 5
  }, {
    y: 0,
    x: 0,
    opacity: 1,
    scale: 1,
    scrollTrigger: {
      trigger: element,
      toggleActions: 'play none none reverse',
    }
  });
});

// Scroll Animation Scale In Left
const animateInUpLeft = document.querySelectorAll(".anim-uni-scale-in-left");
animateInUpLeft.forEach((element) => {
  gsap.fromTo(element, {
    opacity: 1,
    y: 50,
    x: 70,
    scale: 1.2,
    ease: 'sine',
  }, {
    y: 0,
    x: 0,
    opacity: 1,
    scale: 1,
    scrollTrigger: {
      trigger: element,
      toggleActions: 'play none none reverse',
    }
  });
});

// Grid Animation 2 cards
if(document.querySelector(".animate-card-2")) {
  gsap.set(".animate-card-2", {y: 50, opacity: 0});
  ScrollTrigger.batch(".animate-card-2", {
    interval: 0.1,
    batchMax: 2,
    duration: 3,
    onEnter: batch => gsap.to(batch, {
      opacity: 1, 
      y: 0,
      ease: 'sine',
      stagger: {each: 0.15, grid: [1, 2]}, 
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, {opacity: 1, y: 0, overwrite: true}),
    onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
    onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 50, overwrite: true})
  });
  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".animate-card-2", {y: 0, opacity: 1}));
};

// Grid Animation 3 cards
if(document.querySelector(".animate-card-3")) {
  gsap.set(".animate-card-3", {y: 50, opacity: 0});
  ScrollTrigger.batch(".animate-card-3", {
    interval: 0.1,
    batchMax: 3,
    duration: 3,
    onEnter: batch => gsap.to(batch, {
      opacity: 1, 
      y: 0,
      ease: 'sine',
      stagger: {each: 0.15, grid: [1, 3]}, 
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, {opacity: 1, y: 0, overwrite: true}),
    onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
    onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 50, overwrite: true})
  });
  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".animate-card-3", {y: 0, opacity: 1}));
};

// Grid Animation 4 cards
if(document.querySelector(".animate-card-4")) {
  gsap.set(".animate-card-4", {y: 50, opacity: 0});
  ScrollTrigger.batch(".animate-card-4", {
    interval: 0.1,
    batchMax: 4,
    delay: 1000,
    onEnter: batch => gsap.to(batch, {
      opacity: 1, 
      y: 0,
      ease: 'sine',
      stagger: {each: 0.15, grid: [1, 4]}, 
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, {opacity: 1, y: 0, overwrite: true}),
    onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
    onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 50, overwrite: true})
  });
  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".animate-card-4", {y: 0, opacity: 1}));
};

// Grid Animation 5 cards
if(document.querySelector(".animate-card-5")) {
  gsap.set(".animate-card-5", {y: 50, opacity: 0});
  ScrollTrigger.batch(".animate-card-5", {
    interval: 0.1,
    batchMax: 5,
    delay: 1000,
    onEnter: batch => gsap.to(batch, {
      opacity: 1, 
      y: 0,
      ease: 'sine',
      stagger: {each: 0.15, grid: [1, 5]}, 
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, {opacity: 1, y: 0, overwrite: true}),
    onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
    onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 50, overwrite: true})
  });
  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".animate-card-5", {y: 0, opacity: 1}));
};

// Top to Bottom Animation
toBottomEl = document.querySelectorAll(".anim-top-to-bottom"); 
toBottomEl.forEach((element) => {
  let toBottomTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".fullwidth-text__tl-trigger",
      start: "top 99%",
      end: "top 24%",
      scrub: {
        scrub: true, 
        ease: "none" 
      },
      // markers: true
    },
  });
  toBottomTl.fromTo(element, {
    transform: "translate3d(0, -100%, 0)"
  }, 
  {
    transform: "translate3d(0, 0, 0)"
  });
});

// Zoom In / Zoom Out Container Animations
const docStyle = getComputedStyle(document.documentElement);
const zoomInContainer = document.querySelectorAll(".anim-zoom-in-container");
const zoomOutContainer = document.querySelectorAll(".anim-zoom-out-container");

// Zoom In 
zoomInContainer.forEach((element) => {
  let zoomInBlockTl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top 82%",
      end: "top 14%",
      scrub: {
        scrub: true, 
        ease: "power4.inOut" 
      },
      // markers: true
    },
  });
  zoomInBlockTl.fromTo(element, {
    borderRadius: '200px',
    transform: "scale3d(0.94, 1, 1)"
  }, 
  {
    borderRadius: docStyle.getPropertyValue("--_radius-l"),
    transform: "scale3d(1, 1, 1)"
  });
});

// Zoom Out
zoomOutContainer.forEach((element) => {
  let zoomOutBlockTl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top 82%",
      end: "top 14%",
      scrub: {
        scrub: true, 
        ease: "power4.inOut" 
      },
      // markers: true
    },
  });
  zoomOutBlockTl.fromTo(element, {
    borderRadius: '200px',
    transform: "scale3d(1.14, 1, 1)"
  }, 
  {
    borderRadius: docStyle.getPropertyValue("--_radius-l"),
    transform: "scale3d(1, 1, 1)",
  });
});
// --------------------------------------------- //
// Animation - Scroll Universal Animations End
// --------------------------------------------- //

// --------------------------------------------- //
// Animation - Images Reveal on Hover Start
// --------------------------------------------- //
const link = document.querySelectorAll('.hover-reveal__item');
const linkHoverReveal = document.querySelectorAll('.hover-reveal__content');
const linkImages = document.querySelectorAll('.hover-reveal__image');

for(let i = 0; i < link.length; i++) {
  link[i].addEventListener('mousemove', (e) => {
    linkHoverReveal[i].style.opacity = 1;
    linkHoverReveal[i].style.transform = `translate(-80%, -50% )`;
    linkImages[i].style.transform = 'scale(1, 1)';
    linkHoverReveal[i].style.left = e.clientX + "px";
  })
  
  link[i].addEventListener('mouseleave', (e) => {
    linkHoverReveal[i].style.opacity = 0;
    linkHoverReveal[i].style.transform = `translate(-80%, -50%)`;
    linkImages[i].style.transform = 'scale(1, 1.4)';
  })
}
// --------------------------------------------- //
// Animation - Images Reveal on Hover End
// --------------------------------------------- //

// --------------------------------------------- //
// Swiper Slider - Testimonials #01 Start
// --------------------------------------------- //
const testimonialsSlider = document.querySelector("testimonials-slider");

if (!testimonialsSlider) {
  const swiper = new Swiper('.swiper-testimonials', {
    slidesPerView: 'auto',
    grabCursor: true,
    spaceBetween: 30,
    autoplay: true,
    delay: 3000,
    speed: 1000,
    loop: true,
    parallax: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
};
// --------------------------------------------- //
// Swiper Slider - Testimonials #01 End
// --------------------------------------------- //

// --------------------------------------------- //
// Swiper Slider - Testimonials #02 Start
// --------------------------------------------- //
const testimonialsSlider2 = document.querySelector("testimonials-slider-2");

if (!testimonialsSlider2) {
  const swiper = new Swiper('.swiper-testimonials-2', {
    slidesPerView: 1,
    grabCursor: true,
    effect: 'fade',
    spaceBetween: 30,
    autoplay: true,
    delay: 3000,
    speed: 1000,
    loop: true,
    parallax: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
};
// --------------------------------------------- //
// Swiper Slider - Testimonials #02 End
// --------------------------------------------- //

// --------------------------------------------- //
// Swiper Slider - Inner Pages Demo Start
// --------------------------------------------- //
const innerDemoSlider = document.querySelector("mxd-demo-swiper");

if (!innerDemoSlider) {
  const swiper = new Swiper('.mxd-demo-swiper', {
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1600: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    loop: true,
    parallax: true,
    autoplay: { disableOnInteraction: false, enabled: true },
    grabCursor: true,
    speed: 600,
    centeredSlides: true,
    keyboard: { enabled: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
};
// --------------------------------------------- //
// Swiper Slider - Inner Pages Demo End
// --------------------------------------------- //

// --------------------------------------------- //
// CountUp - All Counters Options Start
// --------------------------------------------- //
const optionsNormal = {
  enableScrollSpy: true
};
const optionsDecimal = {
  decimalPlaces: 1,
  enableScrollSpy: true
};
const optionsDecimalTwo = {
  decimalPlaces: 2,
  enableScrollSpy: true
};
const optionsPercent = {
  suffix: '%',
  enableScrollSpy: true
};
const optionsK = {
  suffix: 'K',
  enableScrollSpy: true
};
const optionsPlus = {
  suffix: '+',
  enableScrollSpy: true
};
// --------------------------------------------- //
// CountUp - All Counters Options End
// --------------------------------------------- //

// --------------------------------------------- //
// Marquee - Two Lines Start
// --------------------------------------------- //
const initMarquees = () => {
  const items = [...document.querySelectorAll(".marquee--gsap")];
  if (items) {
    const marqueeObject = {
      top: {
        el: null,
        width: 0
      },
      bottom: {
        el: null,
        width: 0
      }
    };
    items.forEach((itemBlock) => {
      marqueeObject.top.el = itemBlock.querySelector(".marquee__top");
      marqueeObject.bottom.el = itemBlock.querySelector(".marquee__bottom");
      marqueeObject.top.width = marqueeObject.top.el.offsetWidth;
      marqueeObject.bottom.width = marqueeObject.bottom.el.offsetWidth;
      marqueeObject.top.el.innerHTML += marqueeObject.top.el.innerHTML;
      marqueeObject.bottom.el.innerHTML += marqueeObject.bottom.el.innerHTML;
      let dirFromLeft = "-=50%";
      let dirFromRight = "+=50%";
      let master = gsap
        .timeline()
        .add(marquee(marqueeObject.top.el, 30, dirFromLeft), 0)
        .add(marquee(marqueeObject.bottom.el, 30, dirFromRight), 0);
      let tween = gsap.to(master, { 
        duration: 1.5, 
        timeScale: 1, 
        paused: true 
      });
      let timeScaleClamp = gsap.utils.clamp(1, 6);
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          master.timeScale(timeScaleClamp(Math.abs(self.getVelocity() / 200)));
          tween.invalidate().restart();
        }
      });
    });
  }
};
const marquee = (item, time, direction) => {
  let mod = gsap.utils.wrap(0, 50);
  return gsap.to(item, {
    duration: time,
    ease: "none",
    x: direction,
    modifiers: {
      x: (x) => (direction = mod(parseFloat(x)) + "%")
    },
    repeat: -1
  });
};
initMarquees();
// --------------------------------------------- //
// Marquee - Two Lines End
// --------------------------------------------- //

// --------------------------------------------- //
// Marquee - One Line To Right Start
// --------------------------------------------- //
const initMarquee = () => {
  const items = [...document.querySelectorAll(".marquee-right--gsap")];
  if (items) {
    const marqueeObject = {
      el: null,
      width: 0
    };
    items.forEach((itemBlock) => {
      marqueeObject.el = itemBlock.querySelector(".marquee__toright");
      marqueeObject.width = marqueeObject.el.offsetWidth;
      marqueeObject.el.innerHTML += marqueeObject.el.innerHTML;
      //let dirFromLeft = "-=50%";
      let dirFromRight = "+=50%";
      let master = gsap
        .timeline()
        //.add(marquee(marqueeObject.el, 20, dirFromLeft), 0);
        .add(marqueeRight(marqueeObject.el, 30, dirFromRight), 0);
      let tween = gsap.to(master, { 
        duration: 1.5, 
        timeScale: 1, 
        paused: true 
      });
      let timeScaleClamp = gsap.utils.clamp(1, 6);
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          master.timeScale(timeScaleClamp(Math.abs(self.getVelocity() / 200)));
          tween.invalidate().restart();
        }
      });
    });
  }
};
const marqueeRight = (item, time, direction) => {
  let mod = gsap.utils.wrap(0, 50);
  return gsap.to(item, {
    duration: time,
    ease: "none",
    x: direction,
    modifiers: {
      x: (x) => (direction = mod(parseFloat(x)) + "%")
    },
    repeat: -1
  });
};
initMarquee();
// --------------------------------------------- //
// Marquee - One Line To Right End
// --------------------------------------------- //

// --------------------------------------------- //
// Marquee - One Line To Left Start
// --------------------------------------------- //
const initMarqueeLeft = () => {
  const items = [...document.querySelectorAll(".marquee-left--gsap")];
  if (items) {
    const marqueeObject = {
      el: null,
      width: 0
    };
    items.forEach((itemBlock) => {
      marqueeObject.el = itemBlock.querySelector(".marquee__toleft");
      marqueeObject.width = marqueeObject.el.offsetWidth;
      marqueeObject.el.innerHTML += marqueeObject.el.innerHTML;
      let dirFromLeft = "-=50%";
      // let dirFromRight = "+=50%";
      let master = gsap
        .timeline()
        .add(marquee(marqueeObject.el, 30, dirFromLeft), 0);
        // .add(marqueeRight(marqueeObject.el, 30, dirFromRight), 0);
      let tween = gsap.to(master, { 
        duration: 1.5, 
        timeScale: 1, 
        paused: true 
      });
      let timeScaleClamp = gsap.utils.clamp(1, 6);
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          master.timeScale(timeScaleClamp(Math.abs(self.getVelocity() / 200)));
          tween.invalidate().restart();
        }
      });
    });
  }
};
const marqueeLeft = (item, time, direction) => {
  let mod = gsap.utils.wrap(0, 50);
  return gsap.to(item, {
    duration: time,
    ease: "none",
    x: direction,
    modifiers: {
      x: (x) => (direction = mod(parseFloat(x)) + "%")
    },
    repeat: -1
  });
};
initMarqueeLeft();
// --------------------------------------------- //
// Marquee - One Line To Left End
// --------------------------------------------- //

// --------------------------------------------- //
// SVG DOM Injection Start
// --------------------------------------------- //
var mySVGsToInject = document.querySelectorAll('img.inject-me');
var injectorOptions = {
  evalScripts: 'once',
  pngFallback: 'assets/png',
  each: function (svg) {
  }
};
SVGInjector(mySVGsToInject, injectorOptions, function (totalSVGsInjected) {
  console.log('We injected ' + totalSVGsInjected + ' SVG(s)!');
});
// --------------------------------------------- //
// SVG DOM Injection End
// --------------------------------------------- //

// --------------------------------------------- //
// Light Theme Lock Start
// --------------------------------------------- //
function applyLightTheme() {
  const root = document.documentElement;
  root.setAttribute('color-scheme', 'light');
  localStorage.setItem('template.theme', 'light');
}
applyLightTheme();
window.addEventListener('DOMContentLoaded', applyLightTheme);
// --------------------------------------------- //
// Light Theme Lock End
// --------------------------------------------- //

// --------------------------------------------- //
// Scroll to Top Button Start
// --------------------------------------------- //
const toTop = document.querySelector(".btn-to-top");

$(".btn-to-top").each(function() {
  toTop.addEventListener("click", function(event){
    event.preventDefault()
  });

  toTop.addEventListener("click", () => gsap.to(window, { 
    scrollTo: 0, 
    ease: 'power4.inOut',
    duration: 1.3,
  }));

  gsap.set(toTop, { opacity: 0 });

  gsap.to(toTop, {
    opacity: 1,
    autoAlpha: 1,
    scrollTrigger: {
      trigger: "body",
      start: "top -20%",
      end: "top -20%",
      toggleActions: "play none reverse none"
    }
  });
});
// --------------------------------------------- //
// Scroll to Top Button End
// --------------------------------------------- //

// ------------------------------------------------------------------------------ //
// Parallax Universal (apply parallax effect to any element with a data-speed attribute) Start
// ------------------------------------------------------------------------------ //
const parallaxElements = document.querySelectorAll("[data-speed]");
if (parallaxElements.length) gsap.to(parallaxElements, {
  y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window) ,
  ease: "none",
  scrollTrigger: {
    start: 0,
    end: "max",
    invalidateOnRefresh: true,
    scrub: 0
  }
});
// --------------------------------------------- //
// Parallax Universal End
// --------------------------------------------- //
