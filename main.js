/* ===================================================================
   main.js — Portfolio home page interactions
   =================================================================== */

// ─── DOM References ──────────────────────────────────────────────
var navHeader = document.getElementById('navHeader');
var themeToggle = document.getElementById('themeToggle');
var hamburger = document.getElementById('navHamburger');
var dropdownMenu = document.getElementById('dropdownMenu');

// ─── Scroll Animations (IntersectionObserver) ────────────────────
var scrollObserver = null;

function observeElements(elements) {
  if (!scrollObserver) {
    scrollObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  }

  elements.forEach(function(el) {
    scrollObserver.observe(el);
  });
}

// ─── Theme Toggle ────────────────────────────────────────────────
themeToggle.addEventListener('click', function() {
  var html = document.documentElement;
  var current = html.getAttribute('data-theme');
  if (current === 'dark') {
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
  if (!localStorage.getItem('theme')) {
    if (e.matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }
});

// ─── Nav Scroll Behavior ─────────────────────────────────────────
var scrollTicking = false;
window.addEventListener('scroll', function() {
  if (!scrollTicking) {
    requestAnimationFrame(function() {
      if (window.scrollY > 50) {
        navHeader.classList.add('scrolled');
      } else {
        navHeader.classList.remove('scrolled');
      }
      scrollTicking = false;
    });
    scrollTicking = true;
  }
});

// Active nav link tracking
var navLinks = document.querySelectorAll('.dropdown-link[data-section]');
var sections = document.querySelectorAll('#about');

var sectionObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      var id = entry.target.id;
      navLinks.forEach(function(link) {
        if (link.dataset.section === id) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}, { threshold: 0.2, rootMargin: '-80px 0px 0px 0px' });

sections.forEach(function(s) { sectionObserver.observe(s); });

// ─── Dropdown Menu ──────────────────────────────────────────────
function closeDropdown() {
  hamburger.classList.remove('open');
  dropdownMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', function(e) {
  e.stopPropagation();
  var isOpen = hamburger.classList.toggle('open');
  dropdownMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close dropdown on link click
dropdownMenu.querySelectorAll('.dropdown-link').forEach(function(link) {
  link.addEventListener('click', function() {
    closeDropdown();
  });
});

// Close dropdown on click outside
document.addEventListener('click', function(e) {
  if (!hamburger.contains(e.target) && !dropdownMenu.contains(e.target)) {
    closeDropdown();
  }
});

// ─── BlurText Animation ──────────────────────────────────────────
function initBlurText() {
  var blurElements = document.querySelectorAll('.blur-text');

  blurElements.forEach(function(el) {
    var text = el.getAttribute('data-blur-text');
    var animateBy = el.getAttribute('data-blur-by') || 'words';
    var delay = parseInt(el.getAttribute('data-blur-delay') || '50', 10);

    if (!text) return;

    var segments = animateBy === 'letters' ? text.split('') : text.split(' ');

    // Clear element and build spans
    el.textContent = '';

    segments.forEach(function(segment, i) {
      var span = document.createElement('span');
      span.className = 'blur-char';
      span.textContent = segment;
      span.style.transitionDelay = (i * delay) + 'ms';

      el.appendChild(span);

      // Add space between words
      if (animateBy === 'words' && i < segments.length - 1) {
        var space = document.createTextNode('\u00A0');
        el.appendChild(space);
      }
    });

    // Observe for viewport entry
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var chars = el.querySelectorAll('.blur-char');
          chars.forEach(function(c) {
            c.classList.add('visible');
          });
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(el);
  });
}

// ─── Init ────────────────────────────────────────────────────────
(function init() {
  // BlurText hero animation
  initBlurText();

  observeElements(document.querySelectorAll('main .animate-in'));

  // Hero elements animate immediately via CSS transition-delay
  document.querySelectorAll('.hero .animate-in, .nav-header.animate-in').forEach(function(el) {
    el.classList.add('visible');
  });
})();
