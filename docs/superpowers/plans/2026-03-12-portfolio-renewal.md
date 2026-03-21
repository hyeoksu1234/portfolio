# Portfolio Website Renewal Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio site as a single-page static site with cinematic scroll animations, project modal, and dark/light theming to position the author as a "디자이너 출신 프론트엔드 개발자" for a 당근 frontend engineer application.

**Architecture:** Single HTML file (`index.html`) with all sections (Hero, Projects, About, Footer), one CSS file (`styles.css`) with CSS custom properties for theming, and one JS file (`main.js`) handling scroll animations, modal, filtering, and theme toggle. Project data is a JS array rendered dynamically.

**Tech Stack:** Vanilla HTML5, CSS3 (custom properties, Grid, Flexbox), JavaScript (ES6+, IntersectionObserver, History API). Fonts: Pretendard Variable, Libre Baskerville, Fira Code.

**Spec:** `docs/superpowers/specs/2026-03-12-portfolio-renewal-design.md`

**Image directory mapping:**
| Project | Image folder | Thumbnail |
|---------|-------------|-----------|
| Q-ALIGN | img/project/q-align/ | img/project/q-align/1.png |
| 졸업전시 | img/project/smu/ | img/project/smu/1.png |
| Designer × Code | (none — use placeholder) | img/my_photo/projects.jpg |
| MA-CC | img/project/macc/ | img/project/macc/1.png |
| F&B 주문 | img/project/fb/ | img/project/fb/1.png |
| 코인 거래소 | img/project/platform/ | img/project/platform/1.png |
| 코인 인디케이터 | img/project/indicator/ | img/project/indicator/1.png |
| Linkus | img/project/team/ | img/project/team/main.png |
| 브랜딩 | img/project/branding/ | img/project/branding/1.png |
| 로고 | img/project/logo/ | img/project/logo/1.png |
| 포스터 | img/project/poster/ | img/project/poster/1.png |
| PD | img/project/pd/ | img/project/pd/1.png |

---

## Chunk 1: Foundation (HTML structure + CSS base + theming)

### Task 1: Create styles.css — CSS reset, custom properties, typography, theming

**Files:**
- Create: `styles.css` (new file, replaces old styles)

- [ ] **Step 1: Write CSS reset + custom properties + typography**

```css
/* === Reset === */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

/* === Theme Variables === */
:root {
  --bg: #FAFAF8;
  --text: #1A1A1A;
  --accent: #E8572A;
  --muted: #6B7280;
  --card-bg: #FFFFFF;
  --tag-bg: #F3F4F6;
  --tag-text: #374151;
  --nav-bg: rgba(250, 250, 248, 0.8);
  --overlay-bg: rgba(0, 0, 0, 0.6);
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 30px rgba(0,0,0,0.12);
  --transition-smooth: cubic-bezier(0.16, 1, 0.3, 1);
}

[data-theme="dark"] {
  --bg: #0F0F0F;
  --text: #F5F5F5;
  --accent: #E8572A;
  --muted: #9CA3AF;
  --card-bg: #1A1A1A;
  --tag-bg: #262626;
  --tag-text: #D1D5DB;
  --nav-bg: rgba(15, 15, 15, 0.8);
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.2);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.3);
  --shadow-lg: 0 8px 30px rgba(0,0,0,0.4);
}

/* === Base === */
html { scroll-behavior: smooth; }

body {
  font-family: 'Pretendard Variable', 'Pretendard', -apple-system, sans-serif;
  background-color: var(--bg);
  color: var(--text);
  transition: background-color 0.3s, color 0.3s;
  overflow-x: hidden;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* === Typography === */
.display-font {
  font-family: 'Libre Baskerville', 'Georgia', serif;
}
.mono-font {
  font-family: 'Fira Code', monospace;
}

/* === Animation base === */
.animate-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1s var(--transition-smooth),
              transform 1s var(--transition-smooth);
  transition-delay: var(--delay, 0ms);
}
.animate-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* === Reduced motion === */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .animate-in { opacity: 1; transform: none; }
}

/* === Skip link === */
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: var(--accent);
  color: #fff;
  border-radius: 4px;
  z-index: 100;
  text-decoration: none;
}
.skip-link:focus { top: 1rem; }

/* === Container === */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
```

- [ ] **Step 2: Verify CSS loads in browser**

Open `http://localhost:5173` after creating `index.html` in the next task. For now, verify the file was created and has no syntax issues by checking file size.

Run: `wc -l styles.css`
Expected: ~80 lines

### Task 2: Create index.html — document head + Hero section HTML

**Files:**
- Create: `index.html` (new file, replaces old)

- [ ] **Step 1: Write the HTML document with head and Hero section**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>이혁수 | Su'studio — Portfolio</title>
  <meta name="description" content="사용자 문제를 디자인으로 정의하고, 코드로 해결하는 디자이너 출신 프론트엔드 개발자 이혁수의 포트폴리오">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://hyeoksu1234.github.io/portfolio_website/">
  <meta property="og:title" content="이혁수 | Su'studio — Portfolio">
  <meta property="og:description" content="사용자 문제를 디자인으로 정의하고, 코드로 해결합니다.">
  <meta property="og:image" content="https://hyeoksu1234.github.io/portfolio_website/img/my_photo/projects.jpg">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="styles.css">

  <!-- Theme: apply before render to prevent flash -->
  <script>
    (function() {
      const saved = localStorage.getItem('theme');
      if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    })();
  </script>
</head>
<body>
  <!-- Skip link -->
  <a href="#projects" class="skip-link">Skip to Projects</a>

  <!-- Navigation -->
  <header class="nav-header animate-in" id="navHeader" style="--delay:800ms">
    <nav class="nav container">
      <a href="#" class="nav-logo display-font">
        <span class="nav-logo-su">Su</span>'studio
      </a>
      <div class="nav-links" id="navLinks">
        <a href="#projects" class="nav-link" data-section="projects">Projects</a>
        <a href="#about" class="nav-link" data-section="about">About</a>
      </div>
      <div class="nav-right">
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
          <svg class="icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          <svg class="icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
        </button>
        <button class="nav-hamburger" id="navHamburger" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  </header>

  <!-- Mobile Menu Overlay -->
  <div class="mobile-menu" id="mobileMenu">
    <a href="#projects" class="mobile-menu-link">Projects</a>
    <a href="#about" class="mobile-menu-link">About</a>
  </div>

  <main>
  <!-- Hero Section -->
  <section class="hero" id="hero">
    <div class="hero-content">
      <h1 class="hero-name display-font animate-in" style="--delay:0ms">
        이혁수 <span class="hero-divider">|</span> Su'studio
      </h1>
      <p class="hero-tagline animate-in" style="--delay:200ms">
        사용자 문제를 디자인으로 정의하고, 코드로 해결합니다.
      </p>
      <p class="hero-subtitle animate-in" style="--delay:400ms">
        커뮤니케이션 디자인 전공 → 4년 독학 프론트엔드 → B2B SaaS 창업 CEO<br>
        디자인과 코드, 양쪽에서 사용자 경험을 만드는 사람입니다.
      </p>
      <div class="hero-cta animate-in" style="--delay:600ms">
        <a href="#projects" class="btn btn-primary">Projects ↓</a>
        <a href="https://github.com/hyeoksu1234" target="_blank" rel="noopener" class="btn btn-outline">GitHub</a>
        <a href="mailto:artingeveryday@gmail.com" class="btn btn-outline">Email</a>
      </div>
    </div>
    <button class="scroll-indicator animate-in" style="--delay:1200ms" aria-label="Scroll down" onclick="document.getElementById('projects').scrollIntoView({behavior:'smooth'})">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
    </button>
  </section>

  <!-- Projects Section (Task 4) -->
  <section class="section projects-section" id="projects">
    <div class="container">
      <h2 class="section-title display-font animate-in">Projects</h2>
      <div class="filter-bar animate-in" style="--delay:100ms" role="tablist" aria-label="Project category filter">
        <button class="filter-btn active" data-filter="all" role="tab" aria-selected="true">All</button>
        <button class="filter-btn" data-filter="dev" role="tab" aria-selected="false">Development</button>
        <button class="filter-btn" data-filter="design" role="tab" aria-selected="false">Design</button>
        <button class="filter-btn" data-filter="pd" role="tab" aria-selected="false">PD</button>
      </div>
      <div class="projects-grid" id="projectsGrid" aria-live="polite">
        <!-- Cards rendered by main.js -->
      </div>
    </div>
  </section>

  <!-- About Section (Task 5) -->
  <section class="section about-section" id="about">
    <div class="container">
      <h2 class="section-title display-font animate-in">About</h2>

      <!-- Intro -->
      <div class="about-intro">
        <div class="about-photo animate-in">
          <img src="img/my_photo/hyeoksu.jpg" alt="이혁수 프로필 사진" loading="lazy">
        </div>
        <div class="about-text animate-in" style="--delay:100ms">
          <h3 class="about-name">이혁수 <span class="about-brand">Lee Hyeok Su</span></h3>
          <p class="about-quote">"세상에 이로움을 남기고 싶은 사람"</p>
          <p>커뮤니케이션 디자인을 전공하며 메시지와 경험이 사람과 사회에 어떤 영향을 미치는지를 고민해 온 디자이너 출신 개발자입니다.</p>
          <p>2년간 YouTube PD로 활동하며 콘텐츠 기획·연출·편집을 담당했고, 누적 2,000만 회 이상의 조회수를 기록했습니다. 이 과정에서 제작한 채널이 Forbes Korea 2020 Power YouTuber 100에 선정되며 콘텐츠가 사회에 미치는 긍정적 파급력을 직접 경험했습니다.</p>
          <p>현재는 AI와 코딩을 활용한 서비스 개발에 집중하며, UI/UX 디자인을 넘어 서비스 흐름, 정보 구조, 인터랙션 설계까지 아우르는 역할을 수행하고 있습니다.</p>
        </div>
      </div>

      <!-- Experience Timeline -->
      <div class="timeline-section">
        <h3 class="subsection-title animate-in">Experience</h3>
        <div class="timeline">
          <div class="timeline-item animate-in">
            <span class="timeline-date">2025 ~ 현재</span>
            <div class="timeline-content">
              <strong>Q-ALIGN Co-founder & CEO</strong>
              <p>조직 정렬 B2B SaaS 플랫폼 기획·개발</p>
            </div>
          </div>
          <div class="timeline-item animate-in">
            <span class="timeline-date">2025 ~ 현재</span>
            <div class="timeline-content">
              <strong>Designer × Code Founder</strong>
              <p>디자이너를 위한 바이브 코딩 커뮤니티</p>
            </div>
          </div>
          <div class="timeline-item animate-in">
            <span class="timeline-date">2021.09 – 2022.03</span>
            <div class="timeline-content">
              <strong>카론크리에이티브 PD</strong>
              <p>피닉스박 방송 편집, 콘텐츠 기획 및 제작</p>
            </div>
          </div>
          <div class="timeline-item animate-in">
            <span class="timeline-date">2021.02 – 2021.06</span>
            <div class="timeline-content">
              <strong>다니엘 프로젝트 PD</strong>
              <p>온라인 강의 영상 제작, YouTube 채널 촬영·편집</p>
            </div>
          </div>
          <div class="timeline-item animate-in">
            <span class="timeline-date">2020.03 – 2021.01</span>
            <div class="timeline-content">
              <strong>Pranky Friends YouTube PD</strong>
              <p>14편 제작 · Forbes Korea 2020 Power YouTuber 100 선정</p>
            </div>
          </div>
          <div class="timeline-item animate-in">
            <span class="timeline-date">2020.01 – 2020.02</span>
            <div class="timeline-content">
              <strong>U.K ad 골프 광고 회사 인턴</strong>
            </div>
          </div>
          <div class="timeline-item animate-in">
            <span class="timeline-date">2019.04 – 2020.01</span>
            <div class="timeline-content">
              <strong>미노아이디 TOPTEN 인테리어 디자인</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div class="timeline-section">
        <h3 class="subsection-title animate-in">Education</h3>
        <div class="timeline">
          <div class="timeline-item animate-in">
            <span class="timeline-date">2026.02</span>
            <div class="timeline-content"><strong>상명대학교 커뮤니케이션디자인과</strong> <span class="muted">졸업 수료</span></div>
          </div>
          <div class="timeline-item animate-in">
            <span class="timeline-date">2018.02</span>
            <div class="timeline-content"><strong>재현고등학교</strong> <span class="muted">졸업</span></div>
          </div>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="techstack-section">
        <h3 class="subsection-title animate-in">Tech Stack</h3>
        <div class="techstack-grid">
          <div class="techstack-group animate-in">
            <span class="techstack-label">Core</span>
            <div class="techstack-tags">
              <span class="tag">React</span><span class="tag">Next.js</span><span class="tag">TypeScript</span><span class="tag">Tailwind CSS</span>
            </div>
          </div>
          <div class="techstack-group animate-in">
            <span class="techstack-label">State & Data</span>
            <div class="techstack-tags">
              <span class="tag">Context API</span><span class="tag">Supabase</span><span class="tag">Prisma</span><span class="tag">PostgreSQL</span>
            </div>
          </div>
          <div class="techstack-group animate-in">
            <span class="techstack-label">Infra</span>
            <div class="techstack-tags">
              <span class="tag">Vercel</span><span class="tag">AWS S3/CloudFront</span><span class="tag">Git</span>
            </div>
          </div>
          <div class="techstack-group animate-in">
            <span class="techstack-label">AI</span>
            <div class="techstack-tags">
              <span class="tag">Claude API</span><span class="tag">Multi-LLM Client</span><span class="tag">Cursor</span>
            </div>
          </div>
          <div class="techstack-group animate-in">
            <span class="techstack-label">Design</span>
            <div class="techstack-tags">
              <span class="tag">Figma</span><span class="tag">Photoshop</span><span class="tag">Illustrator</span><span class="tag">InDesign</span><span class="tag">After Effects</span><span class="tag">Cinema 4D</span><span class="tag">GSAP</span><span class="tag">Framer Motion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="container footer-content">
      <span class="footer-brand display-font">Su'studio</span>
      <div class="footer-links">
        <a href="mailto:artingeveryday@gmail.com">Email</a>
        <a href="https://github.com/hyeoksu1234" target="_blank" rel="noopener">GitHub</a>
        <a href="https://www.instagram.com/ai_story.official" target="_blank" rel="noopener">Instagram</a>
      </div>
      <p class="footer-copy">© 2026 이혁수. All rights reserved.</p>
    </div>
  </footer>

  <!-- Modal Container -->
  <div class="modal-overlay" id="modalOverlay" role="dialog" aria-modal="true" aria-hidden="true">
    <div class="modal-container" id="modalContainer">
      <button class="modal-close" id="modalClose" aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      <div class="modal-body" id="modalBody">
        <!-- Rendered by main.js -->
      </div>
    </div>
  </div>

  <script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify page loads correctly**

Run: `npm run dev` and open `http://localhost:5173`
Expected: Page loads with white background, text visible, no console errors.

- [ ] **Step 3: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add HTML structure and CSS foundation with theming"
```

### Task 3: Add CSS for navigation, hero, and layout

**Files:**
- Modify: `styles.css` (append navigation + hero + layout styles)

- [ ] **Step 1: Append navigation styles to styles.css**

```css
/* === Navigation === */
.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 1rem 0;
  transition: background-color 0.3s, border-color 0.3s, backdrop-filter 0.3s;
}
.nav-header.scrolled {
  background-color: var(--nav-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
[data-theme="dark"] .nav-header.scrolled {
  border-bottom-color: rgba(255,255,255,0.06);
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
  transition: color 0.3s;
}
.nav-logo-su { color: var(--muted); }
.nav-links {
  display: flex;
  gap: 2rem;
}
.nav-link {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.3s;
  position: relative;
}
.nav-link:hover, .nav-link.active {
  color: var(--accent);
}
.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
  border-radius: 1px;
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Theme toggle */
.theme-toggle {
  background: none;
  border: none;
  color: var(--muted);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: color 0.3s, background-color 0.3s;
  display: flex;
  align-items: center;
}
.theme-toggle:hover {
  color: var(--text);
  background: var(--tag-bg);
}
.icon-moon { display: none; }
[data-theme="dark"] .icon-sun { display: none; }
[data-theme="dark"] .icon-moon { display: block; }

/* Hamburger */
.nav-hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.nav-hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--muted);
  transition: transform 0.3s, opacity 0.3s;
}
.nav-hamburger.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.nav-hamburger.open span:nth-child(2) { opacity: 0; }
.nav-hamburger.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

/* Mobile menu overlay */
.mobile-menu {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 40;
  background: var(--bg);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  opacity: 0;
  transition: opacity 0.3s;
}
.mobile-menu.open { display: flex; opacity: 1; }
.mobile-menu-link {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
}
.mobile-menu-link:hover { color: var(--accent); }

@media (max-width: 639px) {
  .nav-links { display: none; }
  .nav-hamburger { display: flex; }
}
```

- [ ] **Step 2: Append hero styles to styles.css**

```css
/* === Hero === */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 1.5rem 4rem;
  position: relative;
}
.hero-content {
  max-width: 700px;
}
.hero-name {
  font-size: clamp(48px, 8vw, 96px);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}
.hero-divider {
  color: var(--muted);
  font-weight: 400;
}
.hero-tagline {
  font-size: clamp(18px, 2.5vw, 22px);
  color: var(--text);
  margin-bottom: 1rem;
  line-height: 1.5;
}
.hero-subtitle {
  font-size: clamp(14px, 1.8vw, 16px);
  color: var(--muted);
  margin-bottom: 2rem;
  line-height: 1.7;
}
.hero-cta {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
  border: none;
}
.btn-primary {
  background: var(--accent);
  color: #fff;
}
.btn-primary:hover {
  background: #d44d22;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
.btn-outline {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--muted);
}
.btn-outline:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: none;
  border: none;
  color: var(--muted);
  cursor: pointer;
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
}
```

- [ ] **Step 3: Append section + projects grid + about + footer styles**

```css
/* === Sections === */
.section {
  padding: 6rem 0;
}
.section-title {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 700;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
}
.subsection-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.muted { color: var(--muted); }

/* === Filter bar === */
.filter-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}
.filter-btn {
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  border: 1px solid var(--muted);
  background: transparent;
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}
.filter-btn:hover { border-color: var(--accent); color: var(--accent); }
.filter-btn.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
.filter-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* === Projects grid === */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}
@media (max-width: 639px) {
  .projects-grid { grid-template-columns: 1fr; }
}

/* === Project card === */
.project-card {
  background: var(--card-bg);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
}
.project-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
.project-card:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.card-thumb {
  width: 100%;
  aspect-ratio: 16/10;
  overflow: hidden;
}
.card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease-out;
}
.project-card:hover .card-thumb img {
  transform: scale(1.03);
}
.card-info {
  padding: 1.25rem;
}
.card-category {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--accent);
  margin-bottom: 0.5rem;
}
.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
}
.card-subtitle {
  font-size: 0.85rem;
  color: var(--muted);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: var(--tag-bg);
  color: var(--tag-text);
  font-size: 0.75rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
}

/* === About section === */
.about-intro {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  align-items: start;
}
@media (max-width: 639px) {
  .about-intro {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
.about-photo img {
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
}
.about-name {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.about-brand {
  font-size: 1rem;
  color: var(--muted);
  font-weight: 400;
}
.about-quote {
  font-style: italic;
  color: var(--accent);
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}
.about-text p {
  margin-bottom: 1rem;
  color: var(--muted);
  line-height: 1.7;
}

/* === Timeline === */
.timeline-section { margin-bottom: 3rem; }
.timeline {
  position: relative;
  padding-left: 1.5rem;
  border-left: 2px solid var(--tag-bg);
}
.timeline-item {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 1rem;
  padding-bottom: 1.5rem;
  position: relative;
}
.timeline-item::before {
  content: '';
  position: absolute;
  left: -1.5rem;
  top: 0.5rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  transform: translateX(-4px);
}
.timeline-date {
  font-size: 0.85rem;
  color: var(--muted);
  font-family: 'Fira Code', monospace;
  white-space: nowrap;
}
.timeline-content strong {
  font-size: 1rem;
  display: block;
  margin-bottom: 0.25rem;
}
.timeline-content p {
  font-size: 0.9rem;
  color: var(--muted);
}
@media (max-width: 639px) {
  .timeline-item {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
}

/* === Tech stack === */
.techstack-section { margin-bottom: 3rem; }
.techstack-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.techstack-group {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
}
.techstack-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--muted);
  min-width: 100px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.techstack-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

/* === Footer === */
.footer {
  padding: 3rem 0;
  border-top: 1px solid var(--tag-bg);
}
.footer-content {
  text-align: center;
}
.footer-brand {
  font-size: 1.25rem;
  font-weight: 700;
  display: block;
  margin-bottom: 1rem;
  color: var(--text);
}
.footer-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}
.footer-links a {
  color: var(--muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
}
.footer-links a:hover { color: var(--accent); }
.footer-copy {
  font-size: 0.8rem;
  color: var(--muted);
}

/* === Modal === */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: var(--overlay-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}
.modal-overlay.open {
  opacity: 1;
  pointer-events: auto;
}
.modal-container {
  background: var(--bg);
  border-radius: 20px;
  max-width: 800px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  transform: translateY(40px);
  opacity: 0;
  transition: transform 0.4s var(--transition-smooth),
              opacity 0.4s var(--transition-smooth);
}
.modal-overlay.open .modal-container {
  transform: translateY(0);
  opacity: 1;
}
.modal-close {
  position: sticky;
  top: 1rem;
  float: right;
  margin: 1rem;
  background: var(--tag-bg);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text);
  z-index: 1;
  transition: background 0.3s;
}
.modal-close:hover { background: var(--accent); color: #fff; }
.modal-body { padding: 0 2rem 2rem; }
.modal-banner {
  width: calc(100% + 4rem);
  margin: -0px -2rem 1.5rem;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
}
.modal-banner img {
  width: 100%;
  display: block;
}
.modal-meta {
  font-size: 0.85rem;
  color: var(--muted);
  margin-bottom: 0.5rem;
}
.modal-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.modal-role {
  font-size: 0.95rem;
  color: var(--accent);
  margin-bottom: 1.5rem;
}
.modal-section-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 1.5rem 0 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--tag-bg);
}
.modal-details {
  list-style: none;
  padding: 0;
}
.modal-details li {
  position: relative;
  padding-left: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--muted);
}
.modal-details li::before {
  content: '·';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: 700;
}
.modal-lesson {
  font-style: italic;
  color: var(--muted);
  padding: 1rem;
  background: var(--tag-bg);
  border-radius: 8px;
  border-left: 3px solid var(--accent);
  font-size: 0.9rem;
  line-height: 1.6;
}
.modal-links {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}
.modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.5rem;
}

@media (max-width: 639px) {
  .modal-container {
    width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 0;
  }
  .modal-banner { border-radius: 0; }
}

/* === Focus visible === */
a:focus-visible, button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* === Body modal open === */
body.modal-open { overflow: hidden; }
```

- [ ] **Step 4: Verify hero and nav render properly**

Run: Open `http://localhost:5173`
Expected: Hero section centered, navigation visible, scroll indicator bouncing, buttons styled.

- [ ] **Step 5: Commit**

```bash
git add styles.css
git commit -m "feat: add complete CSS for nav, hero, projects, about, modal, footer"
```

---

## Chunk 2: JavaScript — interactions, data, and modal

### Task 4: Create main.js — project data + card rendering

**Files:**
- Create: `main.js`

- [ ] **Step 1: Write project data array and card rendering function**

Write `main.js` with the complete projects data array from the user's prompt (all 11 projects with full details: id, title, subtitle, category, role, period, stack, liveUrl, githubUrl, thumbnail, images, details array, lesson). Then write `renderCards(filter)` function that:
1. Clears `#projectsGrid`
2. Filters projects by category (or shows all in Dev → Design → PD order)
3. Creates card elements with thumbnail, category tag, title, subtitle, stack tags (max 3)
4. Adds `animate-in` class for scroll animation
5. Attaches click handler to open modal

The project data should include all content from the user's original prompt (the detailed descriptions, tech stacks, lessons learned, etc. for each project).

- [ ] **Step 2: Verify cards render**

Run: Open `http://localhost:5173`
Expected: 11 project cards visible in 2-column grid with thumbnails loading.

- [ ] **Step 3: Commit**

```bash
git add main.js
git commit -m "feat: add project data and card rendering"
```

### Task 5: Add filtering, modal, and scroll animations to main.js

**Files:**
- Modify: `main.js` (append)

- [ ] **Step 1: Add filter functionality**

Add event listeners to `.filter-btn` buttons. On click:
1. Remove `active` from all filter buttons, add to clicked
2. Animate out current cards (`opacity: 0`, `scale(0.95)`, 200ms)
3. After 200ms, call `renderCards(filter)` with new category
4. Stagger fade-in new cards (80ms interval)

- [ ] **Step 2: Add modal open/close**

Write `openModal(projectId)` and `closeModal()` functions:
- `openModal`: find project by id, populate `#modalBody` with banner, meta, title, role, overview, details list, tech tags, lesson quote, link buttons. Add `.open` to overlay. Set `body.modal-open`. `history.pushState`.
- `closeModal`: Remove `.open`, restore body, `history.back()`.
- Event listeners: `#modalClose` click, overlay click (not container), ESC key.
- Focus trap: on Tab, cycle within modal.
- `popstate` event: close modal if hash removed.
- Page load: check `location.hash`, auto-open if matches `#project-{id}`.

- [ ] **Step 3: Add scroll animations (IntersectionObserver)**

Create observer with `threshold: 0.1`:
- Observe all `.animate-in` elements
- On intersect: add `.visible` class, unobserve
- Debounce initial hero animations (they animate on load, not scroll)

- [ ] **Step 4: Add theme toggle**

On `#themeToggle` click:
1. Toggle `data-theme` attribute on `<html>` between `dark` and light (remove attribute)
2. Save to `localStorage`

Also listen for `matchMedia('(prefers-color-scheme: dark)')` changes to update if no manual preference saved.

- [ ] **Step 5: Add nav scroll behavior**

1. On scroll: add `.scrolled` class to `#navHeader` when `scrollY > 50`
2. IntersectionObserver on `#projects` and `#about` sections to update `.active` on nav links
3. Mobile hamburger: toggle `.open` on `#navHamburger` and `#mobileMenu`. Close on link click.

- [ ] **Step 6: Verify all interactions**

Test checklist:
- [ ] Filter buttons switch categories with animation
- [ ] Project cards open modal with correct data
- [ ] Modal closes via X, ESC, overlay click
- [ ] URL hash updates on modal open/close
- [ ] Direct URL with hash opens modal on page load
- [ ] Theme toggle switches dark/light
- [ ] Theme persists on reload
- [ ] Nav background appears on scroll
- [ ] Active nav link updates on scroll
- [ ] Mobile hamburger menu works
- [ ] Scroll animations trigger on viewport entry

Run: Manual testing in browser at `http://localhost:5173`

- [ ] **Step 7: Commit**

```bash
git add main.js
git commit -m "feat: add filtering, modal, scroll animations, theme toggle, nav behavior"
```

---

## Chunk 3: Polish and cleanup

### Task 6: Responsive testing and fixes

**Files:**
- Modify: `styles.css` (responsive adjustments as needed)

- [ ] **Step 1: Test at mobile (375px), tablet (768px), desktop (1440px)**

Use browser DevTools responsive mode. Check:
- Hero text sizes and spacing
- Project grid (1 col mobile, 2 col tablet+)
- About intro (1 col mobile, 2 col desktop)
- Timeline layout
- Modal (full screen mobile, centered desktop)
- Navigation (hamburger mobile, links desktop)

- [ ] **Step 2: Fix any responsive issues found**

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "fix: responsive layout adjustments"
```

### Task 7: Remove old files and update package.json

**Files:**
- Delete: `styles2.css`, `styles3.css`, `styles-detail.css`, `sketch.js`, `sketch2.js`
- Delete: `about.html`, `projects.html`
- Delete: `design/*.html` (all 13 detail pages)
- Modify: `package.json` (no changes needed, dev server still works)

- [ ] **Step 1: Verify new site works independently**

Run: Open `http://localhost:5173`
Expected: Full site works with only `index.html`, `styles.css`, `main.js`, and `img/`.

- [ ] **Step 2: Remove old files**

```bash
git rm styles2.css styles3.css styles-detail.css sketch.js sketch2.js
git rm about.html projects.html
git rm design/*.html
```

- [ ] **Step 3: Update CLAUDE.md to reflect new architecture**

Update `CLAUDE.md` to document the new single-file architecture, remove references to old files.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove old multi-page files, update CLAUDE.md"
```

### Task 8: Final QA and pre-deploy check

**Files:**
- All files (read-only review)

- [ ] **Step 1: Run through final checklist**

From original prompt:
- [ ] "디자이너 출신 프론트엔드 개발자" positioning (not "프로덕트 디자이너")
- [ ] Dev projects first (Q-ALIGN → 졸업전시 → DxC → MA-CC)
- [ ] "피닉스박" (not "피식대학")
- [ ] No phone number or address (email only)
- [ ] All live site links work
- [ ] Mobile responsive
- [ ] Image loading performance

- [ ] **Step 2: Validate HTML**

Check for semantic HTML, proper alt tags, ARIA attributes, lang attribute.

- [ ] **Step 3: Test prefers-reduced-motion**

In browser DevTools, enable "Reduce motion" and verify all animations are disabled.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final QA pass"
```
