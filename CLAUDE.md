# CLAUDE.md

## 개발 명령어

```bash
npm run build   # 프로젝트 상세 정적 페이지, sitemap, robots 생성
npm run check   # 생성 후 콘텐츠·에셋·SEO 검증
npm run dev     # http://localhost:5173 정적 서버
```

## 제품 목적

이 사이트는 이혁수의 PM·제품 개발·디자인·미디어 경력을 `문제 → 판단 → 과정 → 결과 → 근거`로 보여주는 근거 중심 포트폴리오다. 고객사·비공개 자료는 수치와 공개 범위를 분리하며, 확인할 수 없는 성과를 만들지 않는다.

## 구조

- `index.html` — 홈, 검증 수치, 선별 프로젝트, 업무 원칙, 경력
- `data.js` — 9개 프로젝트의 단일 콘텐츠 원본
- `projects/index.html` — 역할별 프로젝트 목록(생성 파일)
- `projects/{id}/index.html` — 검색 가능한 정적 case study(생성 파일)
- `scripts/generate-site.js` — 프로젝트 페이지, sitemap, robots 생성
- `scripts/check-site.js` — 필수 필드, 이미지, 경로, canonical, JSON-LD 검증
- `main.js` — 테마, 메뉴, 애니메이션
- `projects.js` — 목록 카드와 필터
- `styles.css` — 공통 디자인 토큰과 반응형 스타일
- `project.html` / `project.js` — 이전 쿼리 주소를 clean route로 이동

## 콘텐츠 원칙

프로젝트마다 아래를 유지한다.

1. 발견한 문제와 맥락
2. 본인이 내린 판단과 이유·trade-off
3. 단계별 실행 과정
4. Before/After와 정량 결과
5. 공개·내부·비공개로 구분한 근거
6. 공개 가능할 때만 GitHub 저장소 링크

## 이미지

페이지는 WebP 최적화본만 참조한다. 원본 PNG/JPG는 과거 작업 보존용으로 Git에 남기고 `.vercelignore`로 배포에서 제외한다. Open Graph 이미지만 `img/my_photo/projects-og.jpg`를 사용한다.
