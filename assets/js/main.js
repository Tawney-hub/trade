/**
* Template Name: Restaurantly
* Template URL: https://bootstrapmade.com/restaurantly-restaurant-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader) return;
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
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

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
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader — force remove after 2s max so it never hangs
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    const removePreloader = () => preloader.remove();
    window.addEventListener('load', removePreloader);
    setTimeout(removePreloader, 2000);
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

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
  const glightbox = GLightbox({ selector: '.glightbox' });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({ filter: this.getAttribute('data-filter') });
        if (typeof aosInit === 'function') aosInit();
      }, false);
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
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
  window.addEventListener('load', function () {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          const scrollMarginTop = getComputedStyle(target).scrollMarginTop;
          window.scrollTo({
            top: target.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  const navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      const section = document.querySelector(navmenulink.hash);
      if (!section) return;
      const position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Logo switcher
   */
  function updateLogo() {
    const logo = document.getElementById('navbar-logo');
    if (!logo) return;
    const isLight = document.body.classList.contains('light-mode');
    logo.src = isLight ? 'assets/img/logo png.png' : 'assets/img/logo B.png';
  }

  /**
   * Theme Toggle Logic
   */
  const themeToggle = document.querySelector('#theme-toggle');
  const bodyElement = document.querySelector('body');
  const savedTheme = localStorage.getItem('theme');

  // Apply saved theme immediately
  if (savedTheme === 'light') {
    bodyElement.classList.add('light-mode');
    if (themeToggle) themeToggle.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
  }

  // Set correct logo immediately — no waiting for load event
  updateLogo();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      bodyElement.classList.toggle('light-mode');
      const isLight = bodyElement.classList.contains('light-mode');

      updateLogo();

      if (isLight) {
        themeToggle.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
        localStorage.setItem('theme', 'light');
      } else {
        themeToggle.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  /**
   * Custom Cursor — smooth with requestAnimationFrame, no memory leak
   */
  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');

  if (dot && outline) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    let animating = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';

      if (!animating) {
        animating = true;
        requestAnimationFrame(animateOutline);
      }
    });

    function animateOutline() {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      outline.style.left = outlineX + 'px';
      outline.style.top = outlineY + 'px';

      const dist = Math.abs(mouseX - outlineX) + Math.abs(mouseY - outlineY);
      if (dist > 0.5) {
        requestAnimationFrame(animateOutline);
      } else {
        animating = false;
      }
    }

    document.querySelectorAll('a, button, .theme-switch').forEach(link => {
      link.addEventListener('mouseenter', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        outline.style.backgroundColor = 'rgba(205, 164, 94, 0.1)';
      });
      link.addEventListener('mouseleave', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(1)';
        outline.style.backgroundColor = 'transparent';
      });
    });
  }

  /**
   * Scroll Progress Bar — throttled with requestAnimationFrame
   */
  const scrollBar = document.getElementById('scrollBar');
  if (scrollBar) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const winScroll = document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          scrollBar.style.width = ((winScroll / height) * 100) + '%';
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * Intersection Observer for Reveals
   */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section, .card-item, .menu-item').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

})();