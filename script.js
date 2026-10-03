/**
 * Pertis Infra — Under Construction
 * Fade-in on load and on scroll; respects prefers-reduced-motion.
 */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * Mark elements visible (fade-up animation).
   * @param {Element[]} elements
   */
  function reveal(elements) {
    elements.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  var fadeEls = document.querySelectorAll(".fade-up");

  if (prefersReducedMotion) {
    reveal(Array.from(fadeEls));
    return;
  }

  // Hero content: stagger reveal shortly after load
  var heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    var heroFade = heroContent.querySelectorAll(".fade-up");
    window.requestAnimationFrame(function () {
      heroFade.forEach(function (el, i) {
        el.style.transitionDelay = i * 0.1 + "s";
        el.classList.add("is-visible");
      });
    });
  }

  // Sections below hero: IntersectionObserver
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        var target = entry.target;
        if (target.classList.contains("fade-up")) {
          target.classList.add("is-visible");
        } else {
          reveal(Array.from(target.querySelectorAll(".fade-up")));
        }
        observer.unobserve(target);
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12,
    }
  );

  document.querySelectorAll(".services, .contact").forEach(function (section) {
    observer.observe(section);
  });

  // Observe standalone fade-ups outside hero (if any)
  fadeEls.forEach(function (el) {
    if (heroContent && heroContent.contains(el)) return;
    if (el.closest(".services") || el.closest(".contact")) return;
    observer.observe(el);
  });
})();
