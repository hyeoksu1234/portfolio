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
  <meta property="og:site_name" content="이혁수 포트폴리오">
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

function header({ backHref, backLabel = '이전 페이지' } = {}) {
  const left = backHref
    ? `<a href="${escapeHtml(backHref)}" class="btn-back" aria-label="${escapeHtml(backLabel)}">←</a>`
    : `<a href="/projects/" class="nav-text-link">Projects</a>`;

  return `<header class="nav-header" id="navHeader">
    <nav class="nav-bar" aria-label="주요 메뉴">
      ${left}
      <a href="/" class="nav-brand" aria-label="이혁수 포트폴리오 홈">Su'studio</a>
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
        <a href="/projects/">Projects</a>
      </div>
      <p class="footer-copy">© 2026 이혁수. 확인 가능한 근거를 중심으로 기록합니다.</p>
    </div>
  </footer>`;
}

function renderPoints(points) {
  if (!points || !points.length) return '';
  return `<ul class="case-points">${points.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}</ul>`;
}

function renderDecisions(decisions) {
  return decisions.map((item, index) => `<article class="decision-card">
    <span class="decision-index">${String(index + 1).padStart(2, '0')}</span>
    <div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.rationale)}</p>
      ${item.tradeoff ? `<p class="decision-tradeoff"><strong>Trade-off</strong> ${escapeHtml(item.tradeoff)}</p>` : ''}
    </div>
  </article>`).join('');
}

function renderProcess(process) {
  return process.map((item) => `<li class="process-item">
    <div class="process-marker">${escapeHtml(item.stage)}</div>
    <div class="process-copy">
      <p class="process-meta">${escapeHtml(item.period || '')}</p>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
    </div>
  </li>`).join('');
}

function renderOutcomes(outcomes) {
  return outcomes.map((item) => `<article class="outcome-card">
    <p class="outcome-value">${escapeHtml(item.value)}</p>
    <h3>${escapeHtml(item.label)}</h3>
    <dl class="before-after">
      <div><dt>Before</dt><dd>${escapeHtml(item.before)}</dd></div>
      <div><dt>After</dt><dd>${escapeHtml(item.after)}</dd></div>
    </dl>
    <p class="source-note">근거 · ${escapeHtml(item.source)}</p>
  </article>`).join('');
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
  return evidence.map((item) => {
    const title = item.url
      ? `<a href="${escapeHtml(item.url)}" target="_blank" rel="noopener">${escapeHtml(item.label)} ↗</a>`
      : `<span>${escapeHtml(item.label)}</span>`;
    return `<li class="evidence-item">
      <div class="evidence-title">${title}<span class="access-badge access-${escapeHtml(item.access)}">${escapeHtml(accessLabel(item.access))}</span></div>
      <p>${escapeHtml(item.detail)}</p>
    </li>`;
  }).join('');
}

function renderRepository(repository) {
  const hasUrl = repository && repository.url;
  const title = hasUrl
    ? `<a href="${escapeHtml(repository.url)}" target="_blank" rel="noopener">${escapeHtml(repository.label)} ↗</a>`
    : `<span>${escapeHtml(repository.label)}</span>`;
  return `<div class="repository-card repository-${escapeHtml(repository.status)}">
    <div>
      <p class="repository-kicker">Repository · ${escapeHtml(repository.status)}</p>
      <h3>${title}</h3>
      <p>${escapeHtml(repository.note || '')}</p>
    </div>
  </div>`;
}

function renderGallery(project) {
  const images = (project.images || []).slice(1);
  if (!images.length) return '';
  return `<section class="case-section gallery-section" aria-labelledby="gallery-title">
    <div class="case-section-heading"><p class="section-number">06</p><div><h2 id="gallery-title">Selected artifacts</h2><p>핵심 판단과 과정을 보여주는 대표 산출물만 선별했습니다.</p></div></div>
    <div class="project-gallery">
      ${images.map((image, index) => `<figure><img src="${escapeHtml(image)}" alt="${escapeHtml(project.title)} 산출물 ${index + 2}" loading="lazy" decoding="async"><figcaption>${escapeHtml(project.title)} · artifact ${String(index + 2).padStart(2, '0')}</figcaption></figure>`).join('')}
    </div>
  </section>`;
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
    author: { '@type': 'Person', name: '이혁수', url: siteUrl },
    keywords: project.stack.join(', '),
    inLanguage: 'ko-KR'
  };

  return `${head({
    title: `${project.title} — 이혁수 포트폴리오`,
    description,
    canonical,
    image,
    type: 'article',
    jsonLd
  })}
<body>
  <a href="#project-main" class="skip-link">프로젝트 본문으로 이동</a>
  ${header({ backHref: '/projects/', backLabel: '프로젝트 목록으로 돌아가기' })}
  <main class="project-page case-study" id="project-main">
    <article>
      <header class="case-hero container-wide">
        <figure class="project-banner">
          <img src="${escapeHtml(project.thumbnail)}" alt="${escapeHtml(project.title)} 대표 화면" fetchpriority="high" decoding="async">
          ${project.imageCaption ? `<figcaption>${escapeHtml(project.imageCaption)}</figcaption>` : ''}
        </figure>
        <div class="case-hero-copy">
          <p class="project-meta">${escapeHtml(categoryLabels[project.category])} · ${escapeHtml(project.period)} · ${escapeHtml(project.status)}</p>
          <h1 class="project-title">${escapeHtml(project.title)}</h1>
          <p class="project-role">${escapeHtml(project.role)}</p>
          <p class="project-overview">${escapeHtml(project.summary)}</p>
          <div class="project-links">
            ${project.liveUrl ? `<a href="${escapeHtml(project.liveUrl)}" class="btn btn-primary" target="_blank" rel="noopener">Live site ↗</a>` : ''}
            ${project.repository.url ? `<a href="${escapeHtml(project.repository.url)}" class="btn btn-outline" target="_blank" rel="noopener">${project.repository.status === 'public' ? 'GitHub ↗' : 'Case evidence ↗'}</a>` : ''}
          </div>
        </div>
      </header>

      <div class="case-meta-strip container-wide" aria-label="프로젝트 요약 정보">
        <div><span>Role</span><strong>${escapeHtml(project.role)}</strong></div>
        <div><span>Contribution</span><strong>${escapeHtml(project.contribution)}</strong></div>
        <div><span>Evidence</span><strong>${escapeHtml(project.evidence.length)}개 근거 · 공개/비공개 구분</strong></div>
      </div>

      <div class="container case-content">
        <section class="case-section" aria-labelledby="problem-title">
          <div class="case-section-heading"><p class="section-number">01</p><div><h2 id="problem-title">Problem</h2><p>어떤 문제를 발견했는지</p></div></div>
          <div class="problem-panel"><p class="case-lead">${escapeHtml(project.problem.title)}</p><p>${escapeHtml(project.problem.body)}</p>${renderPoints(project.problem.points)}</div>
        </section>

        <section class="case-section" aria-labelledby="decision-title">
          <div class="case-section-heading"><p class="section-number">02</p><div><h2 id="decision-title">Decision</h2><p>무엇을 판단했고 왜 그렇게 했는지</p></div></div>
          <div class="decision-list">${renderDecisions(project.decisions)}</div>
        </section>

        <section class="case-section" aria-labelledby="process-title">
          <div class="case-section-heading"><p class="section-number">03</p><div><h2 id="process-title">Process</h2><p>어떤 과정을 거쳤는지</p></div></div>
          <ol class="process-list">${renderProcess(project.process)}</ol>
        </section>

        <section class="case-section" aria-labelledby="outcome-title">
          <div class="case-section-heading"><p class="section-number">04</p><div><h2 id="outcome-title">Outcome</h2><p>전후 결과와 확인 가능한 정량적 변화</p></div></div>
          <div class="outcome-grid">${renderOutcomes(project.outcomes)}</div>
        </section>

        <section class="case-section" aria-labelledby="evidence-title">
          <div class="case-section-heading"><p class="section-number">05</p><div><h2 id="evidence-title">Evidence</h2><p>검증 가능한 근거와 공개 범위</p></div></div>
          <ul class="evidence-list">${renderEvidence(project.evidence)}</ul>
          ${renderRepository(project.repository)}
          <div class="project-stack-block">
            <h3>Tools & domain</h3>
            <div class="project-tags">${project.stack.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join('')}</div>
          </div>
        </section>

        ${renderGallery(project)}

        <section class="lesson-panel" aria-labelledby="lesson-title">
          <p class="section-number">Reflection</p>
          <h2 id="lesson-title">${escapeHtml(project.lesson)}</h2>
        </section>

        <nav class="next-project" aria-label="다음 프로젝트">
          <span>Next project</span>
          <a href="/projects/${escapeHtml(nextProject.id)}/">${escapeHtml(nextProject.title)} →</a>
        </nav>
      </div>
    </article>
  </main>
  ${footer()}
  <script src="/main.js"></script>
</body>
</html>`;
}

function renderProjectsIndex() {
  const canonical = `${siteUrl}/projects/`;
  const description = '제품 관리, 개발, UX 디자인, 콘텐츠 제작을 문제·판단·과정·결과·근거로 정리한 이혁수의 프로젝트 아카이브.';
  const image = `${siteUrl}/img/my_photo/projects-og.jpg`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '이혁수 프로젝트 아카이브',
    description,
    url: canonical,
    mainEntity: projects.map((project) => ({ '@type': 'CreativeWork', name: project.title, url: `${siteUrl}/projects/${project.id}/` }))
  };

  return `${head({ title: 'Projects — 이혁수 포트폴리오', description, canonical, image, jsonLd })}
<body>
  <a href="#projects-main" class="skip-link">프로젝트 목록으로 이동</a>
  ${header({ backHref: '/', backLabel: '홈으로 돌아가기' })}
  <main id="projects-main">
    <section class="section projects-section projects-index">
      <div class="container">
        <p class="page-kicker">Evidence-led portfolio</p>
        <h1 class="section-title display-font animate-in">Projects</h1>
        <p class="page-intro animate-in">직함보다 실제로 발견한 문제, 내린 판단, 실행 과정과 확인 가능한 결과를 중심으로 정리했습니다. 고객사 자료는 공개 범위를 분명히 표시합니다.</p>
        <div class="filter-bar animate-in" role="tablist" aria-label="프로젝트 역할 필터">
          <button class="filter-btn active" data-filter="all" role="tab" aria-selected="true" type="button">All</button>
          <button class="filter-btn" data-filter="pm" role="tab" aria-selected="false" type="button">PM</button>
          <button class="filter-btn" data-filter="product" role="tab" aria-selected="false" type="button">Product & Dev</button>
          <button class="filter-btn" data-filter="design" role="tab" aria-selected="false" type="button">Design</button>
          <button class="filter-btn" data-filter="media" role="tab" aria-selected="false" type="button">Media</button>
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
