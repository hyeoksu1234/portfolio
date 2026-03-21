# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 명령어

```bash
npm run dev    # 로컬 개발 서버 실행 (http://localhost:5173)
npm start      # npm run dev와 동일
```

Python 내장 HTTP 서버를 사용하므로 Python 3가 설치되어 있어야 함.

## 아키텍처

빌드 과정이나 프레임워크 없이 순수 HTML/CSS/JS로 구성된 정적 포트폴리오 웹사이트.
GitHub Pages로 배포: `https://hyeoksu1234.github.io/portfolio_website/`

### 파일 구조 (SPA-style 단일 페이지)

- **index.html** - 전체 사이트 (Hero → Projects → About → Footer)
- **styles.css** - 모든 스타일 (CSS custom properties로 다크/라이트 테마)
- **main.js** - 모든 인터랙션 (프로젝트 데이터, 카드 렌더링, 필터, 모달, 스크롤 애니메이션, 테마 토글)

### 테마 시스템

- `[data-theme="dark"]`로 다크 모드 전환, `localStorage`에 저장
- `prefers-color-scheme` 미디어 쿼리로 시스템 설정 자동 감지
- `<head>` 인라인 스크립트로 FOUC 방지

### 프로젝트 데이터

`main.js` 상단의 `projects` 배열에 11개 프로젝트 정의. 각 프로젝트: id, title, subtitle, category, role, period, stack, liveUrl, githubUrl, thumbnail, details, lesson.

### 카테고리 필터

`data-filter` 속성으로 분류: `all`, `dev`, `design`, `pd`. "All" 뷰: Dev → Design → PD 순서.

### 모달 시스템

- `#project-{id}` URL 해시로 모달 열기/닫기
- `history.pushState`/`popstate`로 브라우저 뒤로가기 지원
- 포커스 트랩, ESC 닫기, 오버레이 클릭 닫기

### 애니메이션

- `.animate-in` + `.visible` 클래스로 스크롤 트리거 (IntersectionObserver)
- `--delay` CSS 커스텀 프로퍼티로 스태거 딜레이
- `cubic-bezier(0.16, 1, 0.3, 1)` 시네마틱 커브
- `prefers-reduced-motion: reduce` 지원

### 이미지 구조

- `img/my_photo/` - 프로필 사진
- `img/project/{name}/` - 프로젝트별 이미지 (q-align, smu, macc, fb, platform, indicator, team, branding, logo, poster, pd)

### 외부 의존성

- Pretendard Variable (CDN) - 한글 본문
- Google Fonts: Libre Baskerville (영문 디스플레이), Fira Code (모노스페이스)
