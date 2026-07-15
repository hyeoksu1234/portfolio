const fs = require('fs');
const path = require('path');
const { projects, categoryLabels } = require('../data.js');

const root = path.resolve(__dirname, '..');
const siteUrl = 'https://portfolio-hyeoksu.vercel.app';

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function absoluteUrl(value) {
  if (!value) return siteUrl;
  if (/^https?:\/\//.test(value)) return value;
  return siteUrl + (value.charAt(0) === '/' ? value : '/' + value);
}

function themeBootScript() {
  return `<script>
    (function() {
      var saved = localStorage.getItem('theme');
      if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    })();
  </script>`;
}

function head({ title, description, canonical, image, type = 'website', jsonLd }) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="icon" href="/img/my_photo/hyeoksu.webp" type="image/webp">
  <link rel="canonical" href="${escapeHtml(canonical)}">

  <meta property="og:type" content="${escapeHtml(type)}">
  <meta property="og:locale" content="ko_KR">
  <meta property="og:site_name" content="이혁수 PM 포트폴리오">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(image)}">

  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
  <link rel="preload" as="style" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">
  ${themeBootScript()}
  <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
</head>`;
}

function header({ backHref = '/', backLabel = '홈으로 돌아가기' } = {}) {
  return `<header class="nav-header" id="navHeader">
    <nav class="nav-bar" aria-label="주요 메뉴">
      <a href="${escapeHtml(backHref)}" class="btn-back" aria-label="${escapeHtml(backLabel)}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </a>
      <a href="/" class="nav-brand" aria-label="이혁수 PM 포트폴리오 홈">Su'studio</a>
      <button class="theme-pill" id="themeToggle" type="button" aria-label="다크 모드로 전환" aria-pressed="false">
        <span class="theme-pill-knob" aria-hidden="true"></span>
      </button>
    </nav>
  </header>`;
}

function footer() {
  return `<footer class="footer">
    <div class="container footer-content">
      <span class="footer-brand display-font">Su'studio</span>
      <div class="footer-links">
        <a href="mailto:hslee000106@gmail.com">Email</a>
        <a href="https://github.com/hyeoksu1234" target="_blank" rel="noopener">GitHub</a>
        <a href="/projects/">PM Cases</a>
      </div>
      <p class="footer-copy">© 2026 이혁수. 확인 가능한 근거를 중심으로 기록합니다.</p>
    </div>
  </footer>`;
}

function renderPoints(points) {
  if (!points || !points.length) return '';
  return `<ul class="project-details">${points.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}</ul>`;
}

function renderDecisions(decisions) {
  return `<ul class="project-details project-decisions">${decisions.map((item) => `<li>
    <strong>${escapeHtml(item.title)}</strong>
    <span>${escapeHtml(item.rationale)}</span>
    ${item.tradeoff ? `<small>Trade-off · ${escapeHtml(item.tradeoff)}</small>` : ''}
  </li>`).join('')}</ul>`;
}

function renderProcess(process) {
  return `<ol class="project-process">${process.map((item) => `<li>
    <span class="process-number">${escapeHtml(item.stage)}</span>
    <div><strong>${escapeHtml(item.title)}</strong>${item.period ? `<small>${escapeHtml(item.period)}</small>` : ''}<p>${escapeHtml(item.description)}</p></div>
  </li>`).join('')}</ol>`;
}

function renderOutcomes(outcomes) {
  return `<div class="project-outcomes">${outcomes.map((item) => `<article class="project-outcome">
    <div class="project-outcome-heading"><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></div>
    <dl><div><dt>Before</dt><dd>${escapeHtml(item.before)}</dd></div><div><dt>After</dt><dd>${escapeHtml(item.after)}</dd></div></dl>
    <p>근거 · ${escapeHtml(item.source)}</p>
  </article>`).join('')}</div>`;
}

function accessLabel(access) {
  const labels = {
    public: 'Public',
    internal: 'Internal',
    private: 'Private',
    pending: 'Verifying',
    portfolio: 'Portfolio asset',
    'public-record': 'Public record'
  };
  return labels[access] || access;
}

function renderEvidence(evidence) {
  return `<ul class="project-evidence">${evidence.map((item) => {
    const label = item.url
      ? `<a href="${escapeHtml(item.url)}" target="_blank" rel="noopener">${escapeHtml(item.label)} ↗</a>`
      : `<strong>${escapeHtml(item.label)}</strong>`;
    return `<li><div>${label}<span class="access-badge access-${escapeHtml(item.access)}">${escapeHtml(accessLabel(item.access))}</span></div><p>${escapeHtml(item.detail)}</p></li>`;
  }).join('')}</ul>`;
}

function renderRepository(repository) {
  const label = repository.url
    ? `<a href="${escapeHtml(repository.url)}" target="_blank" rel="noopener">${escapeHtml(repository.label)} ↗</a>`
    : `<strong>${escapeHtml(repository.label)}</strong>`;
  return `<div class="project-repository"><span>Repository · ${escapeHtml(repository.status)}</span><div>${label}</div><p>${escapeHtml(repository.note || '')}</p></div>`;
}

function renderGallery(project) {
  const images = (project.images || []).slice(1);
  if (!images.length) return '';
  return `<h2 class="project-section-title">Selected Artifacts</h2>
  <div class="project-gallery">
    ${images.map((image, index) => `<figure><img src="${escapeHtml(image)}" alt="${escapeHtml(project.title)} 산출물 ${index + 2}" loading="lazy" decoding="async"><figcaption>${escapeHtml(project.title)} · artifact ${String(index + 2).padStart(2, '0')}</figcaption></figure>`).join('')}
  </div>`;
}

function renderProject(project, nextProject) {
  const canonical = `${siteUrl}/projects/${project.id}/`;
  const image = absoluteUrl(project.thumbnail);
  const description = project.summary;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description,
    url: canonical,
    image,
    author: { '@type': 'Person', name: '이혁수', jobTitle: 'Product Manager', url: siteUrl },
    keywords: project.stack.join(', '),
    inLanguage: 'ko-KR'
  };

  return `${head({
    title: `${project.title} — 이혁수 PM 포트폴리오`,
    description,
    canonical,
    image,
    type: 'article',
    jsonLd
  })}
<body>
  <a href="#project-main" class="skip-link">프로젝트 본문으로 이동</a>
  ${header({ backHref: '/projects/', backLabel: '프로젝트 목록으로 돌아가기' })}
  <main class="project-page" id="project-main">
    <article class="container project-detail">
      <figure class="project-banner">
        <img src="${escapeHtml(project.thumbnail)}" alt="${escapeHtml(project.title)} 대표 화면" fetchpriority="high" decoding="async">
        ${project.imageCaption ? `<figcaption>${escapeHtml(project.imageCaption)}</figcaption>` : ''}
      </figure>

      <p class="project-meta">${escapeHtml(categoryLabels[project.category])} · ${escapeHtml(project.period)} · ${escapeHtml(project.status)}</p>
      <h1 class="project-title">${escapeHtml(project.title)}</h1>
      <p class="project-role">${escapeHtml(project.role)}</p>
      <p class="project-overview">${escapeHtml(project.summary)}</p>

      <div class="project-links">
        ${project.liveUrl ? `<a href="${escapeHtml(project.liveUrl)}" class="btn btn-primary" target="_blank" rel="noopener">Live Site ↗</a>` : ''}
        ${project.repository.url ? `<a href="${escapeHtml(project.repository.url)}" class="btn btn-outline" target="_blank" rel="noopener">${project.repository.status === 'public' ? 'GitHub ↗' : 'Case Evidence ↗'}</a>` : ''}
      </div>

      <section aria-labelledby="contribution-title">
        <h2 class="project-section-title" id="contribution-title">Contribution</h2>
        <p class="project-overview">${escapeHtml(project.contribution)}</p>
      </section>

      <section aria-labelledby="problem-title">
        <h2 class="project-section-title" id="problem-title">Problem</h2>
        <p class="project-key-sentence">${escapeHtml(project.problem.title)}</p>
        <p class="project-overview">${escapeHtml(project.problem.body)}</p>
        ${renderPoints(project.problem.points)}
      </section>

      <section aria-labelledby="decision-title">
        <h2 class="project-section-title" id="decision-title">Decision</h2>
        ${renderDecisions(project.decisions)}
      </section>

      <section aria-labelledby="process-title">
        <h2 class="project-section-title" id="process-title">Process</h2>
        ${renderProcess(project.process)}
      </section>

      <section aria-labelledby="outcome-title">
        <h2 class="project-section-title" id="outcome-title">Outcome</h2>
        ${renderOutcomes(project.outcomes)}
      </section>

      <section aria-labelledby="evidence-title">
        <h2 class="project-section-title" id="evidence-title">Evidence</h2>
        ${renderEvidence(project.evidence)}
        ${renderRepository(project.repository)}
      </section>

      <section aria-labelledby="tools-title">
        <h2 class="project-section-title" id="tools-title">Tools & Domain</h2>
        <div class="project-tags">${project.stack.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join('')}</div>
      </section>

      ${renderGallery(project)}

      <section aria-labelledby="lesson-title">
        <h2 class="project-section-title" id="lesson-title">Lesson Learned</h2>
        <blockquote class="project-lesson">${escapeHtml(project.lesson)}</blockquote>
      </section>

      <nav class="project-back" aria-label="프로젝트 이동">
        <a href="/projects/" class="btn btn-outline">← Back to Projects</a>
        <a href="/projects/${escapeHtml(nextProject.id)}/" class="next-project-link">Next · ${escapeHtml(nextProject.title)} →</a>
      </nav>
    </article>
  </main>
  ${footer()}
  <script src="/main.js"></script>
</body>
</html>`;
}

function renderProjectsIndex() {
  const canonical = `${siteUrl}/projects/`;
  const description = '커머스 운영과 제품 기획에서 발견한 문제, 내린 판단, 실행 과정과 확인 가능한 결과를 정리한 이혁수의 PM 포트폴리오.';
  const image = `${siteUrl}/img/my_photo/projects-og.jpg`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '이혁수 PM 프로젝트 아카이브',
    description,
    url: canonical,
    mainEntity: projects.map((project) => ({ '@type': 'CreativeWork', name: project.title, url: `${siteUrl}/projects/${project.id}/` }))
  };

  return `${head({ title: 'PM Cases — 이혁수 포트폴리오', description, canonical, image, jsonLd })}
<body>
  <a href="#projects-main" class="skip-link">프로젝트 목록으로 이동</a>
  ${header({ backHref: '/', backLabel: '홈으로 돌아가기' })}
  <main id="projects-main">
    <section class="section projects-section projects-index">
      <div class="container">
        <h1 class="section-title display-font animate-in">Projects</h1>
        <div class="filter-bar animate-in" style="--delay:100ms" role="group" aria-label="프로젝트 역할 필터">
          <button class="filter-btn active" data-filter="all" aria-pressed="true" type="button">All</button>
          <button class="filter-btn" data-filter="pm" aria-pressed="false" type="button">PM & Ops</button>
          <button class="filter-btn" data-filter="product" aria-pressed="false" type="button">Product</button>
          <button class="filter-btn" data-filter="design" aria-pressed="false" type="button">UX & Design</button>
          <button class="filter-btn" data-filter="media" aria-pressed="false" type="button">Content</button>
        </div>
        <div class="projects-grid" id="projectsGrid" aria-live="polite"></div>
      </div>
    </section>
  </main>
  ${footer()}
  <script src="/data.js"></script>
  <script src="/projects.js"></script>
  <script src="/main.js"></script>
</body>
</html>`;
}

function writeFile(relativePath, content) {
  const target = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content.replace(/[ \t]+$/gm, ''));
}

projects.forEach((project, index) => {
  const nextProject = projects[(index + 1) % projects.length];
  writeFile(path.join('projects', project.id, 'index.html'), renderProject(project, nextProject));
});

writeFile(path.join('projects', 'index.html'), renderProjectsIndex());

const sitemapUrls = [
  `${siteUrl}/`,
  `${siteUrl}/projects/`,
  ...projects.map((project) => `${siteUrl}/projects/${project.id}/`)
];

writeFile('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFile('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);

console.log(`Generated ${projects.length} project pages, projects index, sitemap, and robots.txt.`);
