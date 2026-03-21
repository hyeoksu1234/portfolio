/* ===================================================================
   projects.js — Projects listing page
   Project data loaded from data.js
   =================================================================== */

// ─── DOM References ──────────────────────────────────────────────
var grid = document.getElementById('projectsGrid');
var navHeader = document.getElementById('navHeader');
var themeToggle = document.getElementById('themeToggle');

// ─── Helpers ─────────────────────────────────────────────────────
function createEl(tag, className, text) {
  var el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

function createImg(src, alt) {
  var img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  return img;
}

// ─── Card Rendering ─────────────────────────────────────────────
function renderCards(filter) {
  grid.textContent = '';
  var filtered = filter === 'all'
    ? [].concat(projects).sort(function(a, b) { return categoryOrder[a.category] - categoryOrder[b.category]; })
    : projects.filter(function(p) { return p.category === filter; });

  filtered.forEach(function(project, i) {
    var card = document.createElement('article');
    card.className = 'project-card animate-in';
    card.style.setProperty('--delay', (i * 80) + 'ms');
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', project.title + ' 프로젝트 상세 보기');

    // Thumbnail
    var thumbWrap = createEl('div', 'card-thumb');
    thumbWrap.appendChild(createImg(project.thumbnail, project.title + ' 썸네일'));
    card.appendChild(thumbWrap);

    // Info
    var info = createEl('div', 'card-info');
    info.appendChild(createEl('span', 'card-category', categoryLabels[project.category]));
    info.appendChild(createEl('h3', 'card-title', project.title));
    info.appendChild(createEl('p', 'card-subtitle', project.subtitle));

    var tags = createEl('div', 'card-tags');
    project.stack.slice(0, 3).forEach(function(s) {
      tags.appendChild(createEl('span', 'tag', s));
    });
    info.appendChild(tags);
    card.appendChild(info);

    card.addEventListener('click', function() { location.href = 'project.html?id=' + project.id; });
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        location.href = 'project.html?id=' + project.id;
      }
    });

    grid.appendChild(card);
  });

  // Observe new cards for scroll animation
  observeElements(grid.querySelectorAll('.animate-in'));
}

// ─── Scroll Animations ──────────────────────────────────────────
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

// ─── Filter ──────────────────────────────────────────────────────
var filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    var filter = btn.dataset.filter;

    filterBtns.forEach(function(b) {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    // Animate out
    var cards = grid.querySelectorAll('.project-card');
    cards.forEach(function(c) {
      c.style.opacity = '0';
      c.style.transform = 'scale(0.95)';
    });

    setTimeout(function() {
      renderCards(filter);
    }, 200);
  });
});

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

// ─── Init ────────────────────────────────────────────────────────
(function init() {
  renderCards('all');
  observeElements(document.querySelectorAll('.animate-in:not(.project-card)'));
})();
