/* ===================================================================
   project.js — Project detail page
   Project data loaded from data.js
   =================================================================== */

// ─── DOM References ──────────────────────────────────────────────
var projectContent = document.getElementById('projectContent');
var navHeader = document.getElementById('navHeader');
var themeToggle = document.getElementById('themeToggle');

// ─── Helpers ─────────────────────────────────────────────────────
function createEl(tag, className, text) {
  var el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

function createLink(href, className, text, external) {
  var a = document.createElement('a');
  a.href = href;
  a.className = className;
  a.textContent = text;
  if (external) {
    a.target = '_blank';
    a.rel = 'noopener';
  }
  return a;
}

// ─── Get project ID from URL ─────────────────────────────────────
function getProjectId() {
  var params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// ─── Render project detail ───────────────────────────────────────
function renderProject(project) {
  document.title = project.title + ' — Su\'studio';

  var frag = document.createDocumentFragment();

  var imagesToShow = project.images && project.images.length > 0
    ? project.images
    : [project.thumbnail];

  // Banner (first image)
  var banner = createEl('div', 'project-banner');
  var bannerImg = document.createElement('img');
  bannerImg.src = imagesToShow[0];
  bannerImg.alt = project.title;
  banner.appendChild(bannerImg);
  frag.appendChild(banner);

  // Meta
  var metaText = project.period
    ? categoryLabels[project.category] + ' · ' + project.period
    : categoryLabels[project.category];
  frag.appendChild(createEl('p', 'project-meta', metaText));

  // Title & role
  frag.appendChild(createEl('h1', 'project-title', project.title));
  frag.appendChild(createEl('p', 'project-role', project.role));

  // Overview
  var overview = createEl('p', 'project-overview', project.subtitle);
  frag.appendChild(overview);

  // Details
  if (project.details && project.details.length > 0) {
    frag.appendChild(createEl('h4', 'project-section-title', 'Details'));
    var ul = createEl('ul', 'project-details');
    project.details.forEach(function(d) {
      ul.appendChild(createEl('li', null, d));
    });
    frag.appendChild(ul);
  }

  // Tech stack
  frag.appendChild(createEl('h4', 'project-section-title', 'Tech Stack'));
  var tagsDiv = createEl('div', 'project-tags');
  project.stack.forEach(function(s) {
    tagsDiv.appendChild(createEl('span', 'tag', s));
  });
  frag.appendChild(tagsDiv);

  // Lesson
  if (project.lesson) {
    frag.appendChild(createEl('h4', 'project-section-title', 'Lesson Learned'));
    var quote = createEl('blockquote', 'project-lesson', project.lesson);
    frag.appendChild(quote);
  }

  // Links
  if (project.liveUrl || project.githubUrl) {
    var linksDiv = createEl('div', 'project-links');
    if (project.liveUrl) {
      linksDiv.appendChild(createLink(project.liveUrl, 'btn btn-primary', 'Live Site ↗', true));
    }
    if (project.githubUrl) {
      linksDiv.appendChild(createLink(project.githubUrl, 'btn btn-outline', 'GitHub ↗', true));
    }
    frag.appendChild(linksDiv);
  }

  // Remaining images gallery
  if (imagesToShow.length > 1) {
    var gallery = createEl('div', 'project-gallery');
    for (var i = 1; i < imagesToShow.length; i++) {
      var img = document.createElement('img');
      img.src = imagesToShow[i];
      img.alt = project.title + ' — ' + (i + 1);
      img.loading = 'lazy';
      gallery.appendChild(img);
    }
    frag.appendChild(gallery);
  }

  // Back button at bottom
  var backWrap = createEl('div', 'project-back');
  var backLink = createLink('projects.html', 'btn btn-outline', '← Back to Projects', false);
  backWrap.appendChild(backLink);
  frag.appendChild(backWrap);

  projectContent.appendChild(frag);
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
  var id = getProjectId();
  if (!id) {
    location.href = 'index.html';
    return;
  }

  var project = projects.find(function(p) { return p.id === id; });
  if (!project) {
    location.href = 'index.html';
    return;
  }

  renderProject(project);
})();
