# CLAUDE.md

## 개발 명령어

```bash
npm run build   # 프로젝트 상세 정적 페이지, sitemap, robots 생성
npm run check   # 생성 후 콘텐츠·에셋·SEO 검증
npm run dev     # http://localhost:5173 정적 서버
```

## 제품 목적

이 사이트는 이혁수의 PM 경력을 중심으로 `문제 → 판단 → 과정 → 결과 → 근거`를 보여주는 포트폴리오다. 디자인·개발·미디어 경험은 별도 직무 정체성이 아니라 PM의 실행력과 기술 이해도를 뒷받침하는 이력으로 배치한다. 고객사·비공개 자료는 수치와 공개 범위를 분리하며, 확인할 수 없는 성과를 만들지 않는다.

## 구조

- `index.html` — 기존 Su'studio 디자인의 Hero, About, 경력, 교육, PM 역량
- `data.js` — 9개 프로젝트의 단일 콘텐츠 원본
- `projects/index.html` — 역할별 프로젝트 목록(생성 파일)
- `projects/{id}/index.html` — 검색 가능한 정적 case study(생성 파일)
- `scripts/generate-site.js` — 프로젝트 페이지, sitemap, robots 생성
- `scripts/check-site.js` — 필수 필드, 이미지, 경로, canonical, JSON-LD 검증
- `main.js` — 테마, 메뉴, 애니메이션
- `projects.js` — 목록 카드와 필터
- `styles.css` — 기존 크림·오렌지 Su'studio 디자인 토큰과 PM 상세 확장 스타일
- `project.html` / `project.js` — 이전 쿼리 주소를 clean route로 이동

## 콘텐츠 원칙

프로젝트마다 아래를 유지한다.

1. 발견한 문제와 맥락
2. 본인이 내린 판단과 이유·trade-off
3. 단계별 실행 과정
4. Before/After와 정량 결과
5. 공개·내부·비공개로 구분한 근거
6. 공개 가능할 때만 GitHub 저장소 링크

## 디자인 원칙

- 리뉴얼 직전 포트폴리오의 시각 언어를 기준으로 유지한다.
- 크림 배경, 오렌지 포인트, 대형 `HYEOK / SU`, 중앙 프로필, 2열 프로젝트 카드, 800px 상세 본문을 임의로 재설계하지 않는다.
- PM 콘텐츠가 늘어나도 새로운 대시보드형 카드나 과도한 섹션을 추가하지 않고 기존 타임라인·태그·얇은 구분선 패턴 안에서 확장한다.

## 이미지

페이지는 WebP 최적화본만 참조한다. 원본 PNG/JPG는 과거 작업 보존용으로 Git에 남기고 `.vercelignore`로 배포에서 제외한다. Open Graph 이미지만 `img/my_photo/projects-og.jpg`를 사용한다.
