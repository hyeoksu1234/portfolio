/* ===================================================================
   data.js — Shared project data
   Used by both index.html (main.js) and project.html (project.js)
   =================================================================== */

var projects = [
  {
    id: 'q-align',
    title: 'Q-ALIGN',
    subtitle: '조직 정렬을 측정·분석하는 B2B SaaS 플랫폼',
    category: 'dev',
    role: 'Co-founder & CEO — 기획 · 디자인 · 풀스택 개발',
    period: '2025 ~ 현재',
    stack: ['React 19', 'Express 5', 'TypeScript', 'Prisma', 'PostgreSQL', 'Supabase Auth', 'Tailwind CSS', 'GSAP', 'Electron'],
    liveUrl: 'https://www.qalign.kr/',
    githubUrl: '',
    thumbnail: 'img/project/q-align/1.png',
    images: ['img/project/q-align/1.png'],
    details: [
      '리더십의 전략 의도와 팀원의 이해 사이 간극을 데이터로 시각화하는 대시보드 구현',
      'Multi-LLM 자동 폴백 시스템 설계 (Anthropic → OpenAI → DeepSeek)',
      'JWT 기반 인증 시스템 (Web: httpOnly 쿠키 / Electron: localStorage 분기)',
      'Slack Bolt 통합 — 슬래시 커맨드, 모달 인터랙션으로 팀원 답변 수집 (수정 중)',
      '피드백 루프 시스템: ActionLog → OutcomeMeasurement → PatternLearning → RuleEngine',
      '프롬프트 A/B 테스트 시스템으로 AI 분석 품질 지속 개선',
      'Canvas 기반 네트워크 복잡도 시각화, 정렬 매트릭스 차트',
      '임팩트 투자 서류심사 12:1 경쟁률 통과, 최종 라운드 진출'
    ],
    lesson: '"만들 수 있다"와 "시장이 원한다"는 다른 문제. 가설을 세우면 반드시 데이터로 검증하는 습관.'
  },
  {
    id: 'smu-grad',
    title: '상명대학교 졸업전시 사이트',
    subtitle: '커뮤니케이션 디자인학과 2025 졸업전시 아카이브',
    category: 'dev',
    role: '팀 리드 — 개발 및 디자인',
    period: '2025',
    stack: ['Next.js', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'AWS S3/CloudFront'],
    liveUrl: 'https://www.smucd2025.com/',
    githubUrl: '',
    thumbnail: 'img/project/smu/1.png',
    images: ['img/project/smu/1.png'],
    details: [
      '40명+ 졸업생 작품 데이터를 탐색하는 아카이브 경험 설계',
      'Supabase-first with local fallback 패턴으로 서비스 안정성 확보',
      'React cache()를 활용한 request-level 데이터 중복 요청 방지',
      '프로필 이미지 S3 업로드 + CDN URL 자동 생성 스크립트 구축',
      '디자이너 데이터 머징 (같은 학번의 복수 스튜디오 소속 처리)',
      '모바일/데스크톱 반응형 레이아웃 + Framer Motion 애니메이션',
      'Pretendard + Adobe Typekit + Inter 멀티 폰트 시스템'
    ],
    lesson: '디자인 전공 학생들과 협업하며 "양쪽 언어를 모두 이해하는" 소통의 가치를 체감.'
  },
  {
    id: 'designer-code',
    title: 'Designer × Code 커뮤니티',
    subtitle: '디자이너를 위한 바이브 코딩 커뮤니티 플랫폼',
    category: 'dev',
    role: 'Founder & Instructor — 기획 · 디자인 · 개발 · 운영',
    period: '2025 ~ 현재',
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind CSS v4', 'Framer Motion', 'Claude API'],
    liveUrl: 'https://www.designxcode.kr/',
    githubUrl: '',
    thumbnail: 'img/project/designercode/1.png',
    images: ['img/project/designercode/1.png'],
    details: [
      'Atomic Design 패턴 (atoms → molecules → organisms → templates) 적용',
      'Server/Browser/Admin 세 가지 Supabase 클라이언트 분리, RLS 적용',
      'Claude web_search 도구로 뉴스 자동 수집 CRON 시스템',
      'Claude Sonnet 기반 블로그 포스트 자동 생성 (시리즈 컨텍스트 지원)',
      '그룹 시스템 (가입 신청 → 승인), 쇼케이스, 게시판 기능',
      'Brutalist 디자인 시스템: bg-zinc-950, #E5FD52 accent, border-radius: 0',
      '오픈 2일 만에 17+ 멤버 합류, 초기 트랙션 검증'
    ],
    lesson: '커뮤니티 제품은 기술보다 "사람이 모이는 이유"를 설계하는 게 먼저.'
  },
  {
    id: 'ma-cc',
    title: 'MA-CC 코칭 & 컨설팅',
    subtitle: 'Masterpiece Alliance 기업 웹사이트',
    category: 'dev',
    role: '기획 · 디자인 · 구축',
    period: '2025',
    stack: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'Nodemailer'],
    liveUrl: 'https://www.ma-cc.co.kr/',
    githubUrl: '',
    thumbnail: 'img/project/macc/1.png',
    images: ['img/project/macc/1.png'],
    details: [
      '기업 브랜딩에 맞춘 웹사이트를 기획부터 배포까지 단독 구축',
      'Nodemailer + Next.js API Routes 기반 문의 폼 백엔드 개발',
      'Supabase Storage 활용한 콘텐츠 관리'
    ],
    lesson: ''
  },
  {
    id: 'coin-indicator',
    title: '코인/주식 인디케이터',
    subtitle: 'EMA 크로스오버 + 다중 필터 기반 매매 보조지표 시스템',
    category: 'dev',
    role: '기획 · 개발',
    period: '2024',
    stack: ['Pine Script v6', 'TradingView', 'Technical Analysis'],
    liveUrl: '',
    githubUrl: '',
    thumbnail: 'img/project/indicator/1.png',
    images: ['img/project/indicator/1.png'],
    details: [
      'Fast/Slow/Trend 3중 EMA 크로스오버 기반 매수·매도 시그널 생성',
      'RSI 필터 (Long ≥ 55, Short ≤ 45) + 거래량 SMA 필터로 노이즈 제거',
      'ATR 기반 자동 손절/익절 가이드 라인 (Risk/Reward 비율 설정 가능)',
      '캔들 확정(Close) 기반 시그널 확인으로 허위 시그널 방지',
      '추세 배경색 시각화 (상승: 녹색, 하락: 적색) + BUY/SELL 라벨',
      'Auto-clear 옵션: 손절/익절 도달 시 가이드 자동 초기화',
      'TradingView Alert 연동 (Long/Short/Any Signal)'
    ],
    lesson: '기술적 지표는 도구일 뿐, 리스크 관리와 원칙 준수가 실전에서의 핵심.'
  },
  {
    id: 'linkus',
    title: 'Linkus — 팀원 매칭 서비스',
    subtitle: '신뢰 기반 공모전 팀원 매칭 서비스 UX 설계',
    category: 'design',
    role: 'UX 설계',
    period: '2024',
    stack: ['Figma', 'UX Research', 'Prototyping'],
    liveUrl: '',
    githubUrl: '',
    thumbnail: 'img/project/team/main.png',
    images: [
      'img/project/team/main.png',
      'img/project/team/1@4x.png', 'img/project/team/2@4x.png', 'img/project/team/3@4x.png',
      'img/project/team/4@4x.png', 'img/project/team/5@4x.png', 'img/project/team/6@4x.png',
      'img/project/team/7@4x.png', 'img/project/team/8@4x.png', 'img/project/team/9@4x.png',
      'img/project/team/10@4x.png', 'img/project/team/11@4x.png', 'img/project/team/12@4x.png',
      'img/project/team/13@4x.png', 'img/project/team/14@4x.png', 'img/project/team/15@4x.png',
      'img/project/team/16@4x.png', 'img/project/team/17@4x.png', 'img/project/team/18@4x.png',
      'img/project/team/19@4x.png', 'img/project/team/20@4x.png', 'img/project/team/21@4x.png',
      'img/project/team/21@4x-1.png', 'img/project/team/22@4x.png', 'img/project/team/23@4x.png',
      'img/project/team/24@4x.png', 'img/project/team/25@4x.png', 'img/project/team/26@4x.png',
      'img/project/team/27@4x.png', 'img/project/team/28@4x.png', 'img/project/team/29@4x.png',
      'img/project/team/30@4x.png', 'img/project/team/31@4x.png', 'img/project/team/32@4x.png',
      'img/project/team/33@4x.png', 'img/project/team/34@4x.png', 'img/project/team/35@4x.png',
      'img/project/team/36@4x.png', 'img/project/team/37@4x.png', 'img/project/team/38@4x.png',
      'img/project/team/39@4x.png', 'img/project/team/40@4x.png', 'img/project/team/41@4x.png',
      'img/project/team/42@4x.png', 'img/project/team/43@4x.png', 'img/project/team/44@4x.png',
      'img/project/team/45@4x.png', 'img/project/team/46@4x.png', 'img/project/team/47@4x.png',
      'img/project/team/48@4x.png', 'img/project/team/49@4x.png', 'img/project/team/50@4x.png',
      'img/project/team/51@4x.png', 'img/project/team/52@4x.png', 'img/project/team/53@4x.png',
      'img/project/team/54@4x.png', 'img/project/team/55@4x.png', 'img/project/team/56@4x.png',
      'img/project/team/57@4x.png', 'img/project/team/58@4x.png', 'img/project/team/59@4x.png',
      'img/project/team/60@4x.png', 'img/project/team/61@4x.png', 'img/project/team/62@4x.png',
      'img/project/team/63@4x.png', 'img/project/team/64@4x.png', 'img/project/team/65@4x.png',
      'img/project/team/66@4x.png', 'img/project/team/67@4x.png', 'img/project/team/68@4x.png',
      'img/project/team/69@4x.png', 'img/project/team/70@4x.png', 'img/project/team/71@4x.png',
      'img/project/team/72@4x.png', 'img/project/team/73@4x.png', 'img/project/team/74@4x.png',
      'img/project/team/75@4x.png', 'img/project/team/76@4x.png', 'img/project/team/77@4x.png',
      'img/project/team/78@4x.png', 'img/project/team/79@4x.png', 'img/project/team/80@4x.png',
      'img/project/team/81@4x.png', 'img/project/team/82@4x.png', 'img/project/team/83@4x.png'
    ],
    details: [
      '문제 인식: 공모전 참여 시 성실하고 역량 있는 팀원을 구하기 어려움',
      '기존 커뮤니티의 한계: 공고 중심이라 성향/열정 파악이 어려움, 일정 관리 분산',
      '핵심 해결 아이디어: "열정 온도" 신뢰도 시스템 + 태그 기반 상호보완적 역량 매칭',
      '핵심 가치: "열정과 역량이 연결되는 신뢰 기반 커뮤니티"'
    ],
    lesson: ''
  },
  {
    id: 'branding',
    title: '브랜딩 / 로고 디자인',
    subtitle: 'BI/CI, 브랜드 아이덴티티 디자인 작업 모음',
    category: 'design',
    role: '디자이너',
    period: '',
    stack: ['Illustrator', 'Photoshop', 'InDesign'],
    liveUrl: '',
    githubUrl: '',
    thumbnail: 'img/project/branding/1.png',
    images: [
      'img/project/branding/1.png', 'img/project/branding/2.png', 'img/project/branding/3.png',
      'img/project/branding/4.png', 'img/project/branding/5.png'
    ],
    details: [],
    lesson: ''
  },
  {
    id: 'pd-projects',
    title: 'PD 프로젝트',
    subtitle: 'YouTube PD 영상 제작 이력',
    category: 'pd',
    role: 'YouTube PD — 기획 · 촬영 · 편집',
    period: '2020 – 2022',
    stack: ['Premiere Pro', 'After Effects', 'Cinema 4D'],
    liveUrl: '',
    githubUrl: '',
    thumbnail: 'img/project/pd/1.png',
    images: ['img/project/pd/1.png'],
    details: [
      '카론크리에이티브 PD (2021.09–2022.03): 피닉스박 방송 편집, 콘텐츠 기획 및 제작',
      '다니엘 프로젝트 PD (2021.02–2021.06): 온라인 강의 영상 제작, YouTube 채널 촬영·편집',
      'Pranky Friends (2020.03–2021.01): 14편 제작 / 기획·촬영·편집',
      'Forbes Korea 2020 Power YouTuber 100 선정',
      '주요 영상: 지체장애인 전동휠체어 264만뷰, 외국인 참교육 243만뷰, 가출소녀 231만뷰'
    ],
    lesson: ''
  }
];

var categoryOrder = { dev: 0, design: 1, pd: 2 };
var categoryLabels = { dev: 'Development', design: 'Design', pd: 'PD' };
