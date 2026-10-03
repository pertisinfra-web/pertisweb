(function () {
  "use strict";

  var emailUser = "info";
  var emailDomain = "pertisinfra.com";
  var emailAddress = emailUser + "@" + emailDomain;

  document.querySelectorAll("[data-email-link]").forEach(function (link) {
    link.href = "mailto:" + emailAddress;
  });

  document.querySelectorAll("[data-email-address]").forEach(function (address) {
    address.textContent = emailAddress;
  });

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  var heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    var heroFade = heroContent.querySelectorAll(".fade-up");
    window.requestAnimationFrame(function () {
      heroFade.forEach(function (el) {
        el.classList.add("is-visible");
      });
    });
  }

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

  fadeEls.forEach(function (el) {
    if (heroContent && heroContent.contains(el)) return;
    if (el.closest(".services") || el.closest(".contact")) return;
    observer.observe(el);
  });
})();
