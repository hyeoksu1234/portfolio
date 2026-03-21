# Portfolio Website Renewal — Design Spec

## Purpose

당근마켓 Local Jobs Trust&Safety Frontend Engineer 지원을 위한 포트폴리오 사이트 전면 리뉴얼. "디자이너 출신 프론트엔드 개발자"로 포지셔닝 전환.

## Decisions

| Item | Decision |
|------|----------|
| Tech stack | Vanilla HTML + CSS + JS (no build tools) |
| Site structure | SPA-style single page + project detail modal |
| Animation | Cinematic & Smooth — `cubic-bezier(0.16, 1, 0.3, 1)` + stagger delays |
| Theme | `prefers-color-scheme` auto-detect + manual toggle + `localStorage` |
| Color palette | Warm Vermillion — #E8572A accent, #FAFAF8 bg, #1A1A1A text |
| Projects | 11 total (Dev 7 + Design 3 + PD 1) |
| File architecture | `index.html` + `styles.css` + `main.js` (single file approach) |

## File Structure

```
index.html      — All sections (Hero, Projects, About, Footer)
styles.css      — All styles (CSS custom properties for theming)
main.js         — All interactions (scroll, modal, filter, theme)
img/            — Image assets (existing structure)
```

## Color System

```css
:root {
  --bg: #FAFAF8;
  --text: #1A1A1A;
  --accent: #E8572A;
  --muted: #6B7280;
  --card-bg: #FFFFFF;
  --tag-bg: #F3F4F6;
  --tag-text: #374151;
}
[data-theme="dark"] {
  --bg: #0F0F0F;
  --text: #F5F5F5;
  --accent: #E8572A;
  --muted: #9CA3AF;
  --card-bg: #1A1A1A;
  --tag-bg: #262626;
  --tag-text: #D1D5DB;
}
```

## Typography

- Korean body: Pretendard Variable (CDN)
- English display: Libre Baskerville (Google Fonts) — serif, professional warmth
- Monospace (code/tags): Fira Code (Google Fonts)

## Section 1: Hero

Full viewport height (`100vh`). Fixed navigation at top.

**Navigation:** Logo (Su'studio) left, menu links (Projects / About) center, theme toggle right. On scroll: `backdrop-filter: blur(12px)` + subtle border-bottom. Active section indicator via IntersectionObserver.

**Content (centered):**
```
이혁수 | Su'studio                     — Display font, clamp(48px, 8vw, 96px)
사용자 문제를 디자인으로 정의하고,        — Pretendard, 18-22px, --muted
코드로 해결합니다.
커뮤니케이션 디자인 전공 → 4년 독학      — Pretendard, 14-16px, --muted
프론트엔드 → B2B SaaS 창업 CEO
[Projects ↓]  [GitHub]  [Email]         — CTA button group
```

**Load animation sequence (all cinematic curve):**
1. Name — fade up (0ms, 1200ms duration)
2. Tagline line 1 — fade up (200ms delay)
3. Tagline line 2 — fade up (400ms delay)
4. CTA buttons — fade up (600ms delay)
5. Navigation — fade in (800ms delay)
6. Scroll indicator — fade in (1200ms delay)

All use `translateY(30px) → 0` with `cubic-bezier(0.16, 1, 0.3, 1)`.

**Scroll indicator:** Bottom-center, chevron with gentle bounce animation.

## Section 2: Projects

**Layout:**
- Section title: "Projects" (Display font, left-aligned)
- Filter bar: All / Development / Design / PD (pill buttons, active = --accent bg)
- Card grid: 2 columns (desktop), 1 column (mobile)

**Project card:**
- Thumbnail image (16:10 ratio) with `overflow: hidden`
- Category tag + title + subtitle + tech stack tags (max 3)
- Hover: `translateY(-4px)` + shadow increase (300ms), thumbnail `scale(1.03)`
- Click: opens modal

**Filter animation:**
- Exit: `opacity: 0` + `scale(0.95)` in 200ms
- Enter: staggered fade up, 80ms interval between cards
- "All" view: flat list in order Dev → Design → PD (no group headers)

**Scroll trigger:** Section title and filter bar fade up on viewport entry. Cards animate individually via IntersectionObserver.

**Project data (JS array):**

| # | Title | Category | Live URL |
|---|-------|----------|----------|
| 1 | Q-ALIGN | dev | qalign.kr |
| 2 | 상명대 졸업전시 사이트 | dev | smucd2025.com |
| 3 | Designer × Code 커뮤니티 | dev | designxcode.kr |
| 4 | MA-CC 코칭 & 컨설팅 | dev | ma-cc.co.kr |
| 5 | F&B 메뉴 주문 웹앱 | dev | hyeoksu1234.github.io/kdot-app |
| 6 | 코인 거래소 기능 구현 | dev | — |
| 7 | 코인/주식 인디케이터 | dev | — |
| 8 | Linkus 팀원 매칭 | design | — |
| 9 | 브랜딩/로고 디자인 | design | — |
| 10 | 송년 음악회 포스터 | design | — |
| 11 | PD 프로젝트 | pd | — |

## Section 3: Project Detail Modal

**Structure:**
- Overlay: semi-transparent black + `backdrop-filter: blur(8px)`
- Container: `max-width: 800px`, centered, scrollable
- Content: banner image → category/period → title (h2) → role → overview → detail bullets → tech stack tags → lesson (quote style) → link buttons

**Open animation:**
1. Overlay: `opacity: 0 → 1` (200ms)
2. Container: `translateY(40px) + opacity: 0 → 0 + 1` (400ms, cinematic curve)
3. Internal content: sequential fade up (200ms delay after container)

**Close:** Reverse animation. Triggers: X button / ESC / overlay click. Restores `body` overflow.

**URL integration:**
- Open: `history.pushState(null, '', '#project-id')`
- Close: `history.back()`
- Page load: check `location.hash` → auto-open matching modal

**Mobile:** Full screen (`100vh × 100vw`), internal scroll, fixed close button top.

## Section 4: About

**Intro (2-column, 1-column on mobile):**
- Left: profile photo (rounded corners)
- Right: name, brand, quote, intro paragraphs
- Positioning text: "디자이너 출신 프론트엔드 개발자" (NOT "프로덕트 디자이너")

**Experience timeline:**
- Vertical line connecting entries
- Date left-aligned (fixed width), description right
- Entries:
  - 2025 ~ : Q-ALIGN Co-founder & CEO
  - 2025 ~ : Designer × Code Founder
  - 2021.09-2022.03: 카론크리에이티브 PD (피닉스박) ← corrected from 피식대학
  - 2021.02-2021.06: 다니엘 프로젝트 PD
  - 2020.03-2021.01: Pranky Friends YouTube PD
  - 2020.01-2020.02: U.K ad 인턴
  - 2019.04-2020.01: 미노아이디 TOPTEN

**Education:** Same timeline style.

**Tech Stack (categorized tag grid):**
- Core: React, Next.js, TypeScript, Tailwind CSS
- State & Data: Context API, Supabase, Prisma, PostgreSQL
- Infra: Vercel, AWS S3/CloudFront, Git
- AI: Claude API, Multi-LLM Client, Cursor
- Design: Figma, Photoshop, Illustrator, InDesign, After Effects, Cinema 4D, GSAP, Framer Motion

**Scroll animations:** All elements fade up on viewport entry with stagger.

## Section 5: Footer

Centered layout:
- Su'studio brand
- Links: Email (artingeveryday@gmail.com), GitHub, Instagram/Threads
- Copyright: © 2026 이혁수
- No phone number or address

## Animation System

All scroll-triggered animations use IntersectionObserver with `threshold: 0.1`.

**Shared cinematic transition:**
```css
.animate-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
              transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.animate-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Stagger via CSS custom property: `transition-delay: var(--delay, 0ms)`.

## Responsive Breakpoints

- Mobile: < 640px (1 column, full-width modal)
- Tablet: 640-1024px (2 column grid)
- Desktop: > 1024px (2 column grid, max-width: 1200px container)

## SEO & Performance

- Semantic HTML (`header`, `main`, `section`, `footer`, `nav`)
- Open Graph meta tags (title, description, image, url)
- Image lazy loading (`loading="lazy"`)
- Google Fonts preload
- `<html lang="ko">`

## Content Corrections (from original prompt checklist)

- [x] "프로덕트 디자이너" → "디자이너 출신 프론트엔드 개발자"
- [x] Dev projects ordered first (Q-ALIGN → 졸업전시 → DxC → MA-CC)
- [x] "피식대학" → "피닉스박"
- [x] Phone number and address removed (email only)
- [ ] GitHub repo links — user to provide
- [ ] Live site links — verified in prompt

## Accessibility

- Modal: `role="dialog"`, `aria-modal="true"`, focus trap, restore focus on close
- Keyboard: ESC closes modal, Tab cycles within modal
- `prefers-reduced-motion`: disable all transitions/animations, show content immediately
- Focus rings on all interactive elements (`:focus-visible`)
- Skip-to-content link (visually hidden)

## Mobile Navigation

- Hamburger menu icon (3-line) replaces center links below 640px
- Opens full-height slide-down overlay with nav links
- Same theme toggle position (right)

## Theme Toggle

- Sun/moon icon toggle button
- Smooth icon crossfade on switch (200ms)
- Initial state: `prefers-color-scheme` media query → override by `localStorage` if set

## Image Assets

- Reuse existing images from `img/project/` and `img/my_photo/`
- Thumbnails: existing project images, displayed at 16:10 aspect ratio via `object-fit: cover`
- Profile photo: `img/my_photo/hyeoksu.jpg` (existing)
- Modal banners: same as thumbnail (first image in project folder)
- Format: existing PNG/JPG, no conversion needed

## URL Routing

- Nav links: smooth scroll to `#projects`, `#about` sections
- Modal: `#project-{id}` where id matches project slug (e.g., `#project-q-align`)
- Browser back from modal: closes modal, returns to previous scroll position
- Forward/back between multiple modals: each pushState is a history entry, popstate handler manages open/close
