/* Shared interactions: theme, navigation, and progressive reveal. */
(function() {
  var navHeader = document.getElementById('navHeader');
  var themeToggle = document.getElementById('themeToggle');
  var hamburger = document.getElementById('navHamburger');
  var dropdownMenu = document.getElementById('dropdownMenu');

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function syncThemeLabel() {
    if (!themeToggle) return;
    var dark = currentTheme() === 'dark';
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? '라이트 모드로 전환' : '다크 모드로 전환');
  }

  if (themeToggle) {
    syncThemeLabel();
    themeToggle.addEventListener('click', function() {
      if (currentTheme() === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
      syncThemeLabel();
    });
  }

  var colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
  if (colorScheme && colorScheme.addEventListener) {
    colorScheme.addEventListener('change', function(event) {
      if (localStorage.getItem('theme')) return;
      if (event.matches) document.documentElement.setAttribute('data-theme', 'dark');
      else document.documentElement.removeAttribute('data-theme');
      syncThemeLabel();
    });
  }

  if (navHeader) {
    var scrollTicking = false;
    window.addEventListener('scroll', function() {
      if (scrollTicking) return;
      requestAnimationFrame(function() {
        navHeader.classList.toggle('scrolled', window.scrollY > 40);
        scrollTicking = false;
      });
      scrollTicking = true;
    });
  }

  function closeDropdown() {
    if (!hamburger || !dropdownMenu) return;
    hamburger.classList.remove('open');
    dropdownMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', '메뉴 열기');
  }

  if (hamburger && dropdownMenu) {
    hamburger.addEventListener('click', function(event) {
      event.stopPropagation();
      var isOpen = hamburger.classList.toggle('open');
      dropdownMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    });

    dropdownMenu.querySelectorAll('.dropdown-link').forEach(function(link) {
      link.addEventListener('click', closeDropdown);
    });

    document.addEventListener('click', function(event) {
      if (!hamburger.contains(event.target) && !dropdownMenu.contains(event.target)) closeDropdown();
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') closeDropdown();
    });
  }

  function initBlurText() {
    document.querySelectorAll('.blur-text').forEach(function(element) {
      var text = element.getAttribute('data-blur-text');
      var animateBy = element.getAttribute('data-blur-by') || 'words';
      var delay = parseInt(element.getAttribute('data-blur-delay') || '50', 10);
      if (!text) return;

      var segments = animateBy === 'letters' ? text.split('') : text.split(' ');
      element.textContent = '';
      segments.forEach(function(segment, index) {
        var span = document.createElement('span');
        span.className = 'blur-char';
        span.textContent = segment;
        span.style.transitionDelay = (index * delay) + 'ms';
        element.appendChild(span);
        if (animateBy === 'words' && index < segments.length - 1) element.appendChild(document.createTextNode('\u00a0'));
      });

      requestAnimationFrame(function() {
        element.querySelectorAll('.blur-char').forEach(function(character) { character.classList.add('visible'); });
      });
    });
  }

  var revealElements = document.querySelectorAll('.animate-in');
  document.querySelectorAll('.hero .animate-in').forEach(function(element) {
    element.classList.add('visible');
  });
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    revealElements.forEach(function(element) {
      if (!element.closest('.hero')) observer.observe(element);
    });
  } else {
    revealElements.forEach(function(element) { element.classList.add('visible'); });
  }

  initBlurText();
})();
