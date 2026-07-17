
document.addEventListener('DOMContentLoaded', function () {

  /* -------------------------------------------------
     NAVBAR: solid on scroll
  ------------------------------------------------- */
  var nav = document.getElementById('mainNav');
  function toggleNav(){
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  toggleNav();
  window.addEventListener('scroll', toggleNav);

  /* -------------------------------------------------
     HERO ARCH: draw-in on load + tooth ticks
  ------------------------------------------------- */
  var archPath = document.getElementById('heroArchPath');
  var ticksGroup = document.getElementById('heroArchTicks');
  var len = archPath.getTotalLength();
  archPath.style.strokeDasharray = len;
  archPath.style.strokeDashoffset = len;

  // place tick marks along the arch to suggest tooth positions
  var tickCount = 14;
  for (var i = 0; i <= tickCount; i++) {
    var pt = archPath.getPointAtLength((len / tickCount) * i);
    var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', pt.x);
    c.setAttribute('cy', pt.y);
    c.setAttribute('r', 0);
    ticksGroup.appendChild(c);
  }

  gsap.registerPlugin(ScrollTrigger);

  var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .to(archPath, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' })
    .to('.hero-arch-ticks circle', { r: 3, duration: .5, stagger: .04 }, '-=0.6')
    .from('.hero-kicker', { y: 20, opacity: 0, duration: .6 }, '-=1.2')
    .from('.hero-title', { y: 40, opacity: 0, duration: .8 }, '-=1.0')
    .from('.hero-sub', { y: 30, opacity: 0, duration: .7 }, '-=0.6')
    .from('.hero-cta-row a', { y: 20, opacity: 0, duration: .6, stagger: .12 }, '-=0.5')
    .from('.hero-stats > div', { y: 20, opacity: 0, duration: .6, stagger: .1 }, '-=0.4');

  /* -------------------------------------------------
     COUNTERS
  ------------------------------------------------- */
  document.querySelectorAll('.counter').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2,
      delay: 1.2,
      ease: 'power1.out',
      onUpdate: function () { el.textContent = Math.floor(obj.val).toLocaleString('es-DO'); }
    });
  });

  /* -------------------------------------------------
     SCROLL REVEALS
  ------------------------------------------------- */
  gsap.utils.toArray('.reveal-up').forEach(function (el) {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: .9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  gsap.utils.toArray('.service-card').forEach(function (card, i) {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      duration: .7,
      delay: (i % 3) * 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 88%' }
    });
  });

  gsap.utils.toArray('.why-list li').forEach(function (li, i) {
    gsap.from(li, {
      opacity: 0,
      x: -24,
      duration: .6,
      delay: i * 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: li, start: 'top 92%' }
    });
  });

  /* -------------------------------------------------
     SWIPER: Equipo
  ------------------------------------------------- */
  new Swiper('.teamSwiper', {
    slidesPerView: 1.15,
    spaceBetween: 24,
    breakpoints: {
      576: { slidesPerView: 2.2 },
      992: { slidesPerView: 4 }
    },
    navigation: { nextEl: '.team-next', prevEl: '.team-prev' }
  });

  /* -------------------------------------------------
     SWIPER: Testimonios
  ------------------------------------------------- */
  new Swiper('.testimonialSwiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    breakpoints: {
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 }
    },
    navigation: { nextEl: '.testi-next', prevEl: '.testi-prev' }
  });

  /* -------------------------------------------------
     SWIPER: Galería
  ------------------------------------------------- */
  new Swiper('.gallerySwiper', {
    slidesPerView: 1.2,
    spaceBetween: 20,
    breakpoints: {
      576: { slidesPerView: 2 },
      992: { slidesPerView: 3.2 }
    },
    navigation: { nextEl: '.gal-next', prevEl: '.gal-prev' }
  });

  /* -------------------------------------------------
     FORM: fake submit UX
  ------------------------------------------------- */
  var form = document.getElementById('appointmentForm');
  var success = document.getElementById('formSuccess');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    success.style.display = 'block';
    gsap.from(success, { opacity: 0, y: -10, duration: .5 });
    form.reset();
  });

});