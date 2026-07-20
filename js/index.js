document.addEventListener("DOMContentLoaded", function () {
  /* -------------------------------------------------
     NAVBAR: solid on scroll
  ------------------------------------------------- */
  var nav = document.getElementById("mainNav");
  function toggleNav() {
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  toggleNav();
  window.addEventListener("scroll", toggleNav);

  /* -------------------------------------------------
     MOBILE MENU (fullscreen, tablets & phones)
  ------------------------------------------------- */
  var burger = document.getElementById("navBurger");
  var mobileMenu = document.getElementById("mobileMenu");
  var mobileLinks = mobileMenu.querySelectorAll(".mobile-menu-links a");
  var menuOpen = false;

  function openMenu() {
    menuOpen = true;
    burger.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Cerrar menú");
    mobileMenu.classList.add("is-open");
    document.body.classList.add("menu-open");
    gsap.to(mobileLinks, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.06,
      delay: 0.15,
      ease: "power3.out",
    });
    gsap.to(".mobile-menu-foot", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: 0.45,
      ease: "power3.out",
    });
  }

  function closeMenu() {
    menuOpen = false;
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Abrir menú");
    mobileMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    gsap.set(mobileLinks, { opacity: 0, y: 24 });
    gsap.set(".mobile-menu-foot", { opacity: 0, y: 20 });
  }

  burger.addEventListener("click", function () {
    menuOpen ? closeMenu() : openMenu();
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
  mobileMenu
    .querySelector(".mobile-menu-foot .btn-coral")
    .addEventListener("click", closeMenu);
  document
    .getElementById("mobileMenuClose")
    .addEventListener("click", closeMenu);

  // Close automatically if the viewport grows into desktop size
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 992 && menuOpen) closeMenu();
  });

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuOpen) closeMenu();
  });

  /* -------------------------------------------------
     HERO ARCH: draw-in on load + tooth ticks
  ------------------------------------------------- */
  var archPath = document.getElementById("heroArchPath");
  var ticksGroup = document.getElementById("heroArchTicks");
  var len = archPath.getTotalLength();
  archPath.style.strokeDasharray = len;
  archPath.style.strokeDashoffset = len;

  // place tick marks along the arch to suggest tooth positions
  var tickCount = 14;
  for (var i = 0; i <= tickCount; i++) {
    var pt = archPath.getPointAtLength((len / tickCount) * i);
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", pt.x);
    c.setAttribute("cy", pt.y);
    c.setAttribute("r", 0);
    ticksGroup.appendChild(c);
  }

  gsap.registerPlugin(ScrollTrigger);

  var heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl
    .to(archPath, {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: "power2.inOut",
    })
    .to(
      ".hero-arch-ticks circle",
      { r: 3, duration: 0.5, stagger: 0.04 },
      "-=0.6",
    )
    .from(".hero-kicker", { y: 20, opacity: 0, duration: 0.6 }, "-=1.2")
    .from(".hero-title", { y: 40, opacity: 0, duration: 0.8 }, "-=1.0")
    .from(".hero-sub", { y: 30, opacity: 0, duration: 0.7 }, "-=0.6")
    .from(
      ".hero-cta-row a",
      { y: 20, opacity: 0, duration: 0.6, stagger: 0.12 },
      "-=0.5",
    )
    .from(
      ".hero-stats > div",
      { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 },
      "-=0.4",
    );

  /* -------------------------------------------------
     COUNTERS
  ------------------------------------------------- */
  document.querySelectorAll(".counter").forEach(function (el) {
    var target = parseInt(el.getAttribute("data-target"), 10);
    var obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2,
      delay: 1.2,
      ease: "power1.out",
      onUpdate: function () {
        el.textContent = Math.floor(obj.val).toLocaleString("es-DO");
      },
    });
  });

  /* -------------------------------------------------
     SCROLL REVEALS
  ------------------------------------------------- */
  gsap.utils.toArray(".reveal-up").forEach(function (el) {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });

  gsap.utils.toArray(".service-card").forEach(function (card, i) {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      duration: 0.7,
      delay: (i % 3) * 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: card, start: "top 88%" },
    });
  });

  gsap.utils.toArray(".why-list li").forEach(function (li, i) {
    gsap.from(li, {
      opacity: 0,
      x: -24,
      duration: 0.6,
      delay: i * 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: li, start: "top 92%" },
    });
  });

  /* -------------------------------------------------
     SWIPER: Equipo
  ------------------------------------------------- */
  new Swiper(".teamSwiper", {
    slidesPerView: 1.15,
    spaceBetween: 24,
    breakpoints: {
      576: { slidesPerView: 2.2 },
      992: { slidesPerView: 4 },
    },
    navigation: { nextEl: ".team-next", prevEl: ".team-prev" },
  });

  /* -------------------------------------------------
     SWIPER: Testimonios
  ------------------------------------------------- */
  new Swiper(".testimonialSwiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    breakpoints: {
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 },
    },
    navigation: { nextEl: ".testi-next", prevEl: ".testi-prev" },
  });

  /* -------------------------------------------------
     SWIPER: Galería
  ------------------------------------------------- */
  new Swiper(".gallerySwiper", {
    slidesPerView: 1.2,
    spaceBetween: 20,
    breakpoints: {
      576: { slidesPerView: 2 },
      992: { slidesPerView: 3.2 },
    },
    navigation: { nextEl: ".gal-next", prevEl: ".gal-prev" },
  });

  /* -------------------------------------------------
     FORM: fake submit UX
  ------------------------------------------------- */
  var form = document.getElementById("appointmentForm");
  var success = document.getElementById("formSuccess");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    success.style.display = "block";
    gsap.from(success, { opacity: 0, y: -10, duration: 0.5 });
    form.reset();
  });

  /* -------------------------------------------------
      boton "arriba" scroll to top  
    --------------------------------------------- */
  var btnArriba = document.getElementById("arriba");

  btnArriba.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });

    // ocultar el boton "arriba" cuando el usuario esta en la parte superior de la pagina
    if (window.scrollY == 0) {
      btnArriba.style.display = "none";
    } else {
      btnArriba.style.display = "block";
    }
  });
});
