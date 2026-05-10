/**
* Template Name: Medilab
* Template URL: https://bootstrapmade.com/medilab-free-medical-bootstrap-theme/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Co-op work term panels (hero cards switch main content)
   */
  const COOP_KEYS = ['kal', 'ops', 'amd'];
  const FOOTER_HTML_BY_COOP = {
    kal: 'IT Assistant (Co-op) | Kal-Polymers (Sept 2024 – Dec 2024) <br> Mississauga, ON',
    ops: 'Junior Technical Analyst (Co-op) | Ontario Public Service / GovTechON (Jan 5 – Apr 30, 2026) <br> Toronto, ON',
    amd: 'Co-op role (TBD) | AMD (Summer 2026) <br> Location TBD'
  };

  function getStoredCoop() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('coop');
    if (q && COOP_KEYS.includes(q)) return q;

    if (window.location.hash) {
      const h = window.location.hash.slice(1);
      const suffixMatch = h.match(/^(?:about|departments|technologies|goals-reflections|testimonials)-(kal|ops|amd)$/);
      if (suffixMatch && COOP_KEYS.includes(suffixMatch[1])) return suffixMatch[1];
    }

    try {
      const fromStorage = localStorage.getItem('coop-term');
      if (fromStorage && COOP_KEYS.includes(fromStorage)) return fromStorage;
    } catch (e) { /* ignore */ }
    return 'kal';
  }

  function setStoredCoop(coop) {
    try {
      localStorage.setItem('coop-term', coop);
    } catch (e) { /* ignore */ }
  }

  function syncUrlCoop(coop) {
    const url = new URL(window.location.href);
    url.searchParams.set('coop', coop);
    window.history.replaceState({}, '', url);
  }

  function updateNavForCoop(coop) {
    document.querySelectorAll('.nav-section-link').forEach(link => {
      const key = link.getAttribute('data-section');
      if (!key) return;
      link.href = `#${key}-${coop}`;
    });
  }

  function applyCoopTerm(coop, opts) {
    const options = opts || {};
    if (!COOP_KEYS.includes(coop)) coop = 'kal';

    COOP_KEYS.forEach(key => {
      const panel = document.getElementById('coop-panel-' + key);
      if (!panel) return;
      const on = key === coop;
      panel.classList.toggle('is-active', on);
      panel.setAttribute('aria-hidden', on ? 'false' : 'true');
    });

    document.querySelectorAll('.coop-selector').forEach(box => {
      const on = box.getAttribute('data-coop') === coop;
      box.classList.toggle('coop-active', on);
      box.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    const footerLine = document.getElementById('footer-coop-line');
    if (footerLine && FOOTER_HTML_BY_COOP[coop]) {
      footerLine.innerHTML = FOOTER_HTML_BY_COOP[coop];
    }

    updateNavForCoop(coop);
    setStoredCoop(coop);
    if (!options.skipUrl) {
      syncUrlCoop(coop);
    }

    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }

    document.querySelectorAll('.init-swiper').forEach((el) => {
      if (el.swiper) {
        el.swiper.update();
      }
    });

    if (!options.skipScroll) {
      const firstSection = document.querySelector('#about-' + coop);
      if (firstSection) {
        const scrollMarginTop = parseInt(getComputedStyle(firstSection).scrollMarginTop, 10) || 0;
        window.scrollTo({
          top: firstSection.offsetTop - scrollMarginTop,
          behavior: 'smooth'
        });
      }
    }
  }

  function initCoopSelectors() {
    const initial = getStoredCoop();
    applyCoopTerm(initial, { skipScroll: true, skipUrl: true });

    document.querySelectorAll('.coop-selector').forEach(box => {
      box.addEventListener('click', function() {
        const c = this.getAttribute('data-coop');
        if (c) applyCoopTerm(c);
      });
      box.addEventListener('keydown', function(e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        const c = this.getAttribute('data-coop');
        if (c) applyCoopTerm(c);
      });
    });
  }

  window.addEventListener('load', initCoopSelectors);

})();