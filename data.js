/* ===================================================================
   data.js — Portfolio content source of truth
   A project is only allowed to claim facts that have a named source.
   =================================================================== */

var projects = [
  {
    id: 'fila-commerce-pm',
    title: 'FILA Korea 자사몰 운영',
    subtitle: '3사·4개 시스템 사이의 운영 리스크를 구조화한 커머스 PM 사례',
    category: 'pm',
    role: 'Lukuku · Operations & Improvement PM',
    period: '2026.03 — 현재',
    status: '운영 중',
    featured: true,
    stack: ['Shopify', 'ERP / WMS', 'Slack', 'Git', 'ISMS', 'Incident Management'],
    liveUrl: 'https://www.fila.co.kr/',
    repository: {
      status: 'private',
      label: '고객사 소유 비공개 저장소',
      note: '4개 운영 저장소의 merge·배포 이력만 비식별 집계해 사용했습니다.'
    },
    thumbnail: '/img/project/fila/cover.webp',
    images: ['/img/project/fila/cover.webp'],
    imageCaption: 'FILA 공식 온라인 스토어 공개 화면 · 2026.07.15 캡처',
    summary: '입사 직후 흩어진 코드·Slack·회의 기록에서 Shopify–MSA–ERP/WMS의 운영 구조를 역설계하고, 기획전·주문 장애·보안·공수·배포 관리까지 하나의 운영 체계로 연결했습니다.',
    contribution: '요구사항 정리, 3사 일정·정책 조율, 장애 분류와 종료 조건 설계, 배포·공수 감사, ISMS 대응, 운영 문서화·자동화',
    problem: {
      title: '문제는 기능 하나가 아니라 분산된 의사결정 구조였습니다.',
      body: '고객사, 운영 대행사, 외부 물류 파트너가 서로 다른 시스템과 언어를 사용했습니다. 주문·결제 이슈가 발생하면 Shopify, 내부 MSA, ERP/WMS 중 어디서 실패했는지와 누가 결정해야 하는지가 한눈에 보이지 않았습니다.',
      points: [
        '온보딩 정보가 Slack, 코드, 회의, 개인 기억에 분산되어 있었습니다.',
        '대형 행사 이후 서로 다른 원인의 오류가 하나의 장애처럼 묶여 담당과 조치가 흔들렸습니다.',
        '월간 공수와 배포 보고가 원본 증거와 연결되지 않아 확정·추정이 섞일 위험이 있었습니다.'
      ]
    },
    decisions: [
      {
        title: '기능 요청보다 시스템과 결정권을 먼저 역설계',
        rationale: '화면 단위로 대응하면 같은 문제가 주문·물류·정산 단계에서 반복됩니다. Shopify–MSA–ERP/WMS의 상태와 실패 구간, 3사의 승인권을 먼저 연결했습니다.',
        tradeoff: '초기 속도는 느려 보이지만 이후 질문과 에스컬레이션의 정확도가 높아집니다.'
      },
      {
        title: 'Members Week 장애를 A–H 8개 유형으로 분리',
        rationale: '플랫폼 502, 내부 400, 비즈니스 오류, ERP 전송 누락은 해결 주체와 종료 조건이 달랐습니다. 단일 장애명이 아닌 케이스 단위로 오너와 검증 방법을 붙였습니다.'
      },
      {
        title: '기억이 아닌 Slack·Git·배포 이력을 교차 검증',
        rationale: '공수 후보, main merge, 운영 배포를 별도 원본으로 수집하고 확정값과 확인 필요값을 분리했습니다.'
      },
      {
        title: '보안 원문은 남기지 않고 절차와 증빙 위치만 기록',
        rationale: '인수인계 가능성과 고객 정보 보호를 동시에 만족하도록 인증정보·개인정보 원문을 Archive에서 제외했습니다.'
      }
    ],
    process: [
      { stage: '01', title: '온보딩·역설계', period: '03.30–04.10', description: '코드, Slack, 회의록, 기존 문서를 대조해 시스템·협업 지도와 주문 상태 문제 지도를 만들었습니다.' },
      { stage: '02', title: '독립 운영', period: '04.13–05.26', description: '기획전, 주문·클레임, ERP/WMS 합의, 장애·정산 리포트를 반복 가능한 형식으로 운영했습니다.' },
      { stage: '03', title: '복합 프로젝트', period: '05.27–06.19', description: '주문 IF 006·007, 픽업, 3D 캠페인, Members Week의 정책·API·테스트 의존성을 조율했습니다.' },
      { stage: '04', title: '안정화·관리체계', period: '06.22–07.15', description: '주문결제 장애, ISMS, 월간 공수·배포 감사, 데일리 운영 자동화를 하나의 관리 체계로 묶었습니다.' }
    ],
    outcomes: [
      { value: '22분', label: '런칭 QA 수정 완료', before: '09:51 상품 카드 클릭 불가 발견', after: '10:13 수정 완료·11:00 런칭 전 정상화', source: '2026.04.02 온보딩 일지·4월 기획전 전수 기록' },
      { value: '14개', label: '주문 IF STG 시나리오', before: '3사 완료 기준과 예외 조건이 분산', after: '006·007·WMS 정책을 테스트 시나리오로 고정', source: '주문 IF 006·007 외부용 개발 정의서' },
      { value: '8개', label: '장애 유형 분리', before: '서로 다른 오류가 한 장애로 묶임', after: 'A–H별 담당·조치·종료 조건 분리', source: 'Members Week 주문결제 이슈 케이스 분리 리포트' },
      { value: '180건', label: '6월 Slack 후보 전수', before: '대화와 공수 근거가 채널에 분산', after: '4개 채널 후보를 동일 기준으로 분류', source: '6월 Slack 공수 전수 후보 CSV' },
      { value: '164건', label: 'main merge 대조', before: '개발·운영 이력이 서로 다른 원본에 존재', after: 'FILA 4개 저장소 merge 이력과 업무 근거 연결', source: '6월 Git 근거 CSV' },
      { value: '19개', label: '운영 배포 그룹 확인', before: '배포 단위와 공수 단위가 불명확', after: '확정 19개와 추가 확인 1개를 분리', source: '6월 배포이력 보고서' }
    ],
    evidence: [
      { label: 'FILA 공식 온라인 스토어', type: 'live', url: 'https://www.fila.co.kr/', access: 'public', detail: '현재 운영 중인 공개 서비스' },
      { label: 'Urban Creek 런칭 QA 타임라인', type: 'document', access: 'internal', detail: '09:51 클릭 불가 발견 → 10:13 수정 완료 → 11:00 정상 런칭 기록' },
      { label: '주문 IF 006·007 외부용 개발 정의서', type: 'document', access: 'internal', detail: '정책·필드·예외·테스트 기준을 3사 공유 형식으로 정리' },
      { label: 'Members Week 장애 케이스 분리 리포트', type: 'document', access: 'internal', detail: 'A–H 분류, 원인·담당·조치·검증 조건 기록' },
      { label: '6월 Slack·Git·배포 교차 감사', type: 'dataset', access: 'internal', detail: '후보 180건, main merge 164건, 운영 배포 19개 근거' },
      { label: 'PM Archive 프로젝트 허브', type: 'archive', access: 'internal', detail: '인수인계·결정 로그·현재 현황·반복 업무 원본. 보안상 비공개' }
    ],
    lesson: '운영 PM의 역할은 모든 답을 아는 것이 아니라, 실패 구간과 결정권을 분리하고 팀이 같은 근거로 움직이게 만드는 일이라는 점을 배웠습니다.'
  },
  {
    id: 'q-align',
    title: 'Q-ALIGN',
    subtitle: '조직 정렬을 측정·분석하는 B2B SaaS 플랫폼',
    category: 'product',
    role: 'Co-founder & CEO · Product Strategy & Delivery',
    period: '2025 — 현재',
    status: '검증 중',
    featured: true,
    stack: ['React 19', 'Express 5', 'TypeScript', 'Prisma', 'PostgreSQL', 'Supabase Auth', 'Slack Bolt', 'Electron'],
    liveUrl: 'https://www.qalign.kr/',
    repository: {
      status: 'private',
      label: 'qalignofficial-dev/Q-ALIGN · Private',
      note: '실제 제품 저장소는 비공개입니다. 빈 공개 미러는 근거가 될 수 없어 링크하지 않습니다.'
    },
    thumbnail: '/img/project/q-align/1.webp',
    images: ['/img/project/q-align/1.webp'],
    summary: '리더십의 전략 의도와 팀원의 이해 사이 간극을 설문과 네트워크 데이터로 시각화하고, 행동–성과–학습으로 이어지는 피드백 루프를 설계했습니다.',
    contribution: '시장 가설, 제품 구조, UX, 프론트·백엔드, AI 분석, 데스크톱 앱, 초기 투자 검증',
    problem: {
      title: '조직의 정렬 상태는 감으로만 이야기되고 있었습니다.',
      body: '리더가 전달했다고 생각하는 전략과 팀원이 실제로 이해한 내용의 간극을 객관적으로 확인하기 어려웠고, 진단 이후 행동이 실제 성과로 연결됐는지도 추적되지 않았습니다.',
      points: ['전략 이해도와 네트워크 복잡도를 함께 볼 수 있는 진단 구조가 필요했습니다.', 'AI 분석 실패가 전체 진단 실패로 이어지지 않는 복원력이 필요했습니다.', '웹과 Electron에서 서로 다른 인증 저장 방식을 안전하게 다뤄야 했습니다.']
    },
    decisions: [
      { title: '진단 결과를 정렬 매트릭스와 네트워크로 이중 시각화', rationale: '평균 점수만으로는 팀 내부의 연결 구조와 병목을 설명하기 어려웠기 때문입니다.' },
      { title: '3개 LLM 공급자 자동 폴백', rationale: '한 공급자의 장애·제한이 분석 전체를 중단시키지 않도록 Anthropic–OpenAI–DeepSeek 순으로 복구 경로를 설계했습니다.' },
      { title: '행동–성과–패턴–규칙 피드백 루프', rationale: '한 번의 진단 보고서에서 끝나지 않고 실행 효과를 학습하는 제품으로 만들기 위해서입니다.' }
    ],
    process: [
      { stage: '01', title: '가설 정의', description: '조직 정렬을 전략 이해, 관계망, 실행 결과로 나누고 측정 가능한 데이터 구조로 번역했습니다.' },
      { stage: '02', title: '제품화', description: '대시보드, 정렬 매트릭스, Canvas 네트워크 시각화와 인증·권한 구조를 구현했습니다.' },
      { stage: '03', title: '업무 도구 연결', description: 'Slack 슬래시 커맨드와 모달 수집 흐름, Electron 데스크톱 경험을 연결했습니다.' },
      { stage: '04', title: '검증 과제 분리', description: '구현 규모와 고객 성과를 구분하고, 실제 고객 전후 KPI가 확보되기 전에는 제품 성과로 주장하지 않기로 했습니다.' }
    ],
    outcomes: [
      { value: '239', label: '비공개 저장소 commit', before: '제품 가설과 초기 프로토타입', after: '웹·데스크톱·Slack을 잇는 제품 구현', source: 'qalignofficial-dev/Q-ALIGN · 2025.12–2026.06' },
      { value: '17개', label: 'Prisma data model', before: '정성적 조직 진단', after: '진단–행동–성과–학습을 연결한 데이터 구조', source: '비공개 제품 저장소 schema' },
      { value: '검증 대기', label: '고객 전후 KPI', before: '구현 완료도 중심', after: '실사용 조직의 정렬·행동 변화 측정 필요', source: '공개 가능한 고객 KPI 미확보' }
    ],
    evidence: [
      { label: 'Q-ALIGN 라이브 서비스', type: 'live', url: 'https://www.qalign.kr/', access: 'public', detail: '제품 화면과 주요 사용자 흐름' },
      { label: 'qalignofficial-dev/Q-ALIGN', type: 'github', access: 'private', detail: '239 commits, 질문 데이터 108개, Prisma model 17개를 확인한 실제 제품 저장소' },
      { label: 'PRD·Feedback Loop·A/B Testing 문서', type: 'document', access: 'private', detail: '문제 가설, 핵심 판단, 학습 구조의 변경 이력' }
    ],
    lesson: '만들 수 있다는 사실과 시장이 원한다는 증거는 다릅니다. 기능보다 검증 설계를 먼저 묻는 습관을 얻었습니다.'
  },
  {
    id: 'smu-grad',
    title: '상명대학교 졸업전시',
    subtitle: '97명·194개 작품 데이터를 연결한 디지털 아카이브',
    category: 'product',
    role: 'Project Lead · Product Planning & Delivery',
    period: '2025',
    status: '운영 완료',
    featured: true,
    stack: ['Next.js', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'AWS S3 / CloudFront'],
    liveUrl: 'https://www.smucd2025.com/',
    repository: { status: 'public', label: 'GitHub · exhibition', url: 'https://github.com/hyeoksu1234/exhibition', note: '협업 원본의 fork이며, 작성자 필터로 본인 기여 11 commits를 확인할 수 있습니다.' },
    thumbnail: '/img/project/smu/1.webp',
    images: ['/img/project/smu/1.webp'],
    summary: '서로 다른 스튜디오와 형식으로 제출된 97명의 데이터를 194개 작품 항목으로 연결하고, 행사 기간에도 안정적으로 운영할 수 있는 데이터·이미지 파이프라인을 만들었습니다.',
    contribution: '팀 리드, 정보 구조, 인터랙션 디자인, 데이터 모델, 프론트엔드, 이미지 배포 자동화',
    problem: {
      title: '작품은 많았지만 관람자가 탐색할 공통 구조가 없었습니다.',
      body: '97명의 졸업생이 두 스튜디오에 걸쳐 서로 다른 형식으로 데이터를 제출했습니다. 같은 학생의 복수 소속과 대용량 이미지, 행사 직전 수정 요청을 동시에 처리해야 했습니다.',
      points: ['학번 기준 데이터 중복과 복수 스튜디오 소속을 함께 처리해야 했습니다.', '외부 데이터 장애 시에도 전시 페이지가 열려야 했습니다.', '프로필 이미지 업로드·URL 생성의 반복 작업을 줄여야 했습니다.']
    },
    decisions: [
      { title: 'Supabase-first + local fallback', rationale: '운영 데이터의 최신성을 유지하면서도 외부 장애가 전시 전체 중단으로 이어지지 않게 했습니다.' },
      { title: '학번 중심 데이터 머지', rationale: '복수 스튜디오 소속을 잃지 않으면서 동일 학생의 프로필과 작품 정보를 일관되게 묶기 위해서입니다.' },
      { title: 'S3 업로드와 CDN URL 생성 자동화', rationale: '마감 직전의 반복 업로드 실수와 수작업 시간을 줄이기 위해서입니다.' }
    ],
    process: [
      { stage: '01', title: '콘텐츠 모델링', description: '학생, 스튜디오, 작품, 프로필의 관계와 예외 케이스를 먼저 정의했습니다.' },
      { stage: '02', title: '탐색 경험 설계', description: '모바일·데스크톱에서 작품과 작가를 오갈 수 있는 정보 구조와 인터랙션을 만들었습니다.' },
      { stage: '03', title: '데이터·이미지 파이프라인', description: 'Supabase, local fallback, S3/CloudFront 자동화와 request-level cache를 적용했습니다.' },
      { stage: '04', title: '전시 운영', description: '행사 전 콘텐츠 병합과 반응형 QA를 거쳐 공개 배포했습니다.' }
    ],
    outcomes: [
      { value: '97명', label: '졸업생 데이터', before: '형식이 다른 개별 제출물', after: '학번 기준으로 작가·스튜디오 관계 통합', source: 'student-data.ts · designers.ts' },
      { value: '194개', label: '작품 항목 생성', before: '복수 스튜디오 소속이 분산', after: '97명 × 2 studio work entry로 연결', source: 'works.ts 생성 로직' },
      { value: '11', label: '본인 귀속 commits', before: '협업 저장소 참여', after: '데이터·UI·배포 개선 기여 확인', source: 'GitHub author filter' }
    ],
    evidence: [
      { label: '상명대학교 졸업전시 라이브', type: 'live', url: 'https://www.smucd2025.com/', access: 'public', detail: '작가·작품 탐색과 반응형 화면' },
      { label: 'exhibition GitHub', type: 'github', url: 'https://github.com/hyeoksu1234/exhibition', access: 'public', detail: '119 total commits, 본인 귀속 11 commits와 데이터·이미지 파이프라인 코드' }
    ],
    lesson: '디자인 전공자와 개발 구현 사이를 번역하는 사람이 있을 때 팀의 수정 속도와 결과 품질이 함께 좋아진다는 점을 확인했습니다.'
  },
  {
    id: 'designer-code',
    title: 'Designer × Code',
    subtitle: '디자이너가 직접 제품을 만드는 바이브 코딩 커뮤니티',
    category: 'product',
    role: 'Founder · Community Product & Operations',
    period: '2025 — 현재',
    status: '운영 중',
    featured: true,
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind CSS v4', 'Framer Motion', 'Claude API'],
    liveUrl: 'https://www.designxcode.kr/',
    repository: { status: 'private', label: '비공개 제품 저장소', note: '라이브 서비스와 초기 운영 수치만 공개합니다.' },
    thumbnail: '/img/project/designercode/1.webp',
    images: ['/img/project/designercode/1.webp'],
    summary: '코딩을 배우는 것보다 자신의 아이디어를 실제 서비스로 만드는 경험이 필요한 디자이너를 위해 커뮤니티, 학습 콘텐츠, 쇼케이스를 한 제품으로 연결했습니다.',
    contribution: '문제 정의, 커뮤니티 운영, 커리큘럼, 제품 디자인, 풀스택 개발, AI 콘텐츠 자동화',
    problem: { title: '디자이너에게 필요한 것은 또 하나의 문법 강의가 아니었습니다.', body: '디자인 배경의 사용자는 개발 용어와 환경 설정에서 쉽게 이탈했고, 배운 내용을 자신의 프로젝트로 연결할 동료와 피드백 구조가 부족했습니다.', points: ['배움–제작–공유가 서로 다른 도구에 분산되었습니다.', '운영자가 지속적으로 새 콘텐츠를 공급하기 어려웠습니다.', '그룹 가입과 권한을 안전하게 관리해야 했습니다.'] },
    decisions: [
      { title: '강의 사이트가 아닌 커뮤니티 제품', rationale: '완강보다 실제 제작과 동료 피드백이 지속 행동을 만든다고 판단했습니다.' },
      { title: 'Atomic Design과 역할별 Supabase 클라이언트', rationale: '빠른 실험과 운영 권한의 안전성을 함께 확보하기 위해 UI와 데이터 접근 구조를 분리했습니다.' },
      { title: 'AI 뉴스·블로그 자동화는 초안까지만', rationale: '운영 누락을 줄이되 최종 큐레이션과 맥락 판단은 사람이 맡도록 설계했습니다.' }
    ],
    process: [
      { stage: '01', title: '커뮤니티 가설', description: '디자이너가 모이는 이유를 학습보다 제작·피드백·쇼케이스로 정의했습니다.' },
      { stage: '02', title: 'MVP 구축', description: '가입 승인, 그룹, 게시판, 쇼케이스와 콘텐츠 구조를 구현했습니다.' },
      { stage: '03', title: '운영 자동화', description: '뉴스 수집과 시리즈 맥락을 유지하는 블로그 초안 생성을 연결했습니다.' },
      { stage: '04', title: '초기 트랙션 확인', description: '오픈 후 가입 흐름과 초기 멤버 반응을 관찰했습니다.' }
    ],
    outcomes: [{ value: '17명', label: '공개 그룹 참여', before: '커뮤니티 가설', after: '20명 정원 그룹에 17명 참여 상태 공개', source: 'designxcode.kr 공개 그룹 화면 · 2026.07.15 확인' }],
    evidence: [
      { label: 'Designer × Code 라이브', type: 'live', url: 'https://www.designxcode.kr/', access: 'public', detail: '커뮤니티 제품과 콘텐츠 구조' },
      { label: '공개 그룹 화면', type: 'dataset', access: 'public', detail: '17/20명 그룹과 별도 5명 그룹을 공개 서비스에서 확인' }
    ],
    lesson: '커뮤니티 제품은 기능 수보다 사람이 다시 올 이유와 서로를 도울 구조를 먼저 설계해야 합니다.'
  },
  {
    id: 'ma-cc',
    title: 'MA-CC 코칭 & 컨설팅',
    subtitle: '전문 서비스의 신뢰와 문의 전환을 연결한 기업 웹사이트',
    category: 'product',
    role: 'Independent PM · Service Strategy & Delivery',
    period: '2025',
    status: '운영 중',
    featured: false,
    stack: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'Nodemailer'],
    liveUrl: 'https://www.ma-cc.co.kr/',
    repository: { status: 'public', label: 'GitHub', url: 'https://github.com/hyeoksu1234/macc-website', note: '공개 저장소는 fork 이력을 포함합니다.' },
    thumbnail: '/img/project/macc/1.webp',
    images: ['/img/project/macc/1.webp'],
    summary: '컨설팅의 추상적인 가치를 신뢰 가능한 브랜드 경험과 문의 흐름으로 바꾸고, 기획부터 배포까지 단독으로 완성했습니다.',
    contribution: '브랜드·콘텐츠 구조, UI, 반응형 개발, 문의 백엔드, 콘텐츠 저장, 배포',
    problem: { title: '전문성은 있었지만 웹에서 신뢰를 판단할 구조가 부족했습니다.', body: '잠재 고객이 서비스의 차이와 진행 방식을 이해하고 바로 문의할 수 있도록 브랜드 서사와 전환 경로를 한 흐름으로 정리해야 했습니다.', points: ['브랜드 메시지와 서비스 설명을 웹 정보 구조로 번역해야 했습니다.', '문의가 이메일까지 안정적으로 전달돼야 했습니다.', '운영자가 콘텐츠를 관리할 수 있어야 했습니다.'] },
    decisions: [
      { title: '서비스 설명과 문의를 하나의 서사로 연결', rationale: '별도 브로슈어 없이도 방문자가 적합성을 판단하고 다음 행동을 선택하게 하기 위해서입니다.' },
      { title: 'Next.js API Routes + Nodemailer', rationale: '외부 폼 서비스 의존 없이 문의 상태와 오류 처리를 제품 안에서 제어하기 위해서입니다.' }
    ],
    process: [
      { stage: '01', title: '브랜드 구조화', description: '핵심 고객, 서비스 가치, 신뢰 근거와 문의 전환 문장을 정리했습니다.' },
      { stage: '02', title: '디자인·구축', description: '반응형 UI, 모션, 콘텐츠 관리와 문의 API를 한 코드베이스에 구현했습니다.' },
      { stage: '03', title: '배포·운영', description: '실서비스 도메인에 배포하고 문의 흐름과 콘텐츠를 운영 가능한 상태로 전달했습니다.' }
    ],
    outcomes: [
      { value: '38', label: '본인 귀속 commits', before: '브랜드 자료와 요구가 분산', after: '기획–디자인–백엔드–배포를 코드로 연결', source: 'macc-website GitHub author filter' },
      { value: '70', label: '협업 저장소 total commits', before: '개별 수정 요청', after: '운영 가능한 기업 웹 제품', source: 'macc-website GitHub history' }
    ],
    evidence: [
      { label: 'MA-CC 라이브', type: 'live', url: 'https://www.ma-cc.co.kr/', access: 'public', detail: '브랜드·서비스·문의 흐름' },
      { label: 'macc-website GitHub', type: 'github', url: 'https://github.com/hyeoksu1234/macc-website', access: 'public', detail: '구현 저장소' }
    ],
    lesson: '작은 기업 사이트일수록 시각적 완성도와 함께 문의 이후의 운영 흐름까지 제품으로 봐야 합니다.'
  },
  {
    id: 'coin-indicator',
    title: '코인·주식 인디케이터',
    subtitle: '노이즈와 리스크를 함께 다루는 TradingView 보조지표',
    category: 'product',
    role: 'Independent · Product Planning & Validation',
    period: '2024',
    status: '프로토타입',
    featured: false,
    stack: ['Pine Script v6', 'TradingView', 'Technical Analysis'],
    repository: { status: 'not-published', label: '공개 저장소 없음', note: '전략 수익률과 백테스트 수치는 검증 자료가 없어 공개하지 않습니다.' },
    thumbnail: '/img/project/indicator/1.webp',
    images: ['/img/project/indicator/1.webp'],
    summary: '단순 교차 신호가 만드는 과잉 진입을 줄이기 위해 추세, 모멘텀, 거래량, 변동성 기준을 한 규칙 안에 묶었습니다.',
    contribution: '매매 규칙 정의, Pine Script 구현, 시각화, 알림·리스크 가이드',
    problem: { title: '신호는 많았지만 진입과 리스크 판단 기준이 일관되지 않았습니다.', body: 'EMA 교차만으로는 횡보장에서 노이즈가 많았고, 신호 이후 손절·익절 기준과 캔들 확정 여부가 사용자의 임의 판단에 남아 있었습니다.', points: ['추세와 모멘텀을 함께 확인할 필터가 필요했습니다.', '진입 시점에 손절·익절 범위를 동시에 보여줘야 했습니다.', '미확정 캔들의 허위 신호를 줄여야 했습니다.'] },
    decisions: [
      { title: '3중 EMA + RSI + 거래량 필터', rationale: '서로 다른 성격의 조건이 동시에 맞을 때만 신호를 내 노이즈를 줄이기 위해서입니다.' },
      { title: 'ATR 기반 리스크 가이드', rationale: '고정 금액 대신 시장 변동성에 맞는 손절·익절 범위를 제시하기 위해서입니다.' },
      { title: '캔들 종가 확정 후 신호', rationale: '실시간 변동 중 사라지는 허위 신호를 줄이기 위해서입니다.' }
    ],
    process: [
      { stage: '01', title: '규칙 모델링', description: '진입, 추세, 거래량, 리스크, 종료 조건을 독립 파라미터로 정의했습니다.' },
      { stage: '02', title: '시각·알림 구현', description: 'BUY/SELL, 추세 배경, 손절·익절 라인과 TradingView Alert를 연결했습니다.' },
      { stage: '03', title: '검증 경계 설정', description: '기능 구현과 투자 성과를 분리하고, 백테스트 근거가 없는 수익률은 포트폴리오에서 제외했습니다.' }
    ],
    outcomes: [{ value: '검증 전', label: '투자 성과', before: '규칙이 분산된 수동 판단', after: '일관된 신호·리스크 가이드 구현', source: 'TradingView 프로토타입' }],
    evidence: [{ label: 'TradingView 프로토타입 화면', type: 'image', access: 'portfolio', detail: '신호, 배경 추세, 손절·익절 라인 구현 화면' }],
    lesson: '기술 지표를 만들었다는 사실과 투자 성과를 증명했다는 사실을 분리해야 신뢰를 지킬 수 있습니다.'
  },
  {
    id: 'linkus',
    title: 'Linkus',
    subtitle: '열정과 역량을 연결하는 공모전 팀원 매칭 UX',
    category: 'design',
    role: 'Product Discovery & UX Design',
    period: '2022',
    status: 'UX 프로토타입',
    featured: false,
    stack: ['UX Research', 'Information Architecture', 'Figma', 'Prototyping'],
    repository: { status: 'evidence-only', label: 'GitHub · Linkus case artifacts', url: 'https://github.com/hyeoksu1234/portfolio_website/blob/main/design/linkus.html', note: '별도 제품 저장소가 아닌 공개 UX case study와 산출물 근거입니다.' },
    thumbnail: '/img/project/team/main.webp',
    images: [
      '/img/project/team/main.webp',
      '/img/project/team/1@4x.webp', '/img/project/team/8@4x.webp', '/img/project/team/16@4x.webp',
      '/img/project/team/24@4x.webp', '/img/project/team/32@4x.webp', '/img/project/team/40@4x.webp',
      '/img/project/team/48@4x.webp', '/img/project/team/56@4x.webp', '/img/project/team/64@4x.webp',
      '/img/project/team/72@4x.webp', '/img/project/team/80@4x.webp', '/img/project/team/83@4x.webp'
    ],
    summary: '공고 정보만으로는 알기 어려운 팀원의 성실성과 협업 성향을 신뢰 신호로 바꾸고, 모집 이후 일정 관리까지 이어지는 경험을 설계했습니다.',
    contribution: '문제 정의, 경쟁 서비스 분석, 핵심 가치, 정보 구조, 신뢰 모델, 프로토타입',
    problem: { title: '팀원을 찾는 것보다 믿을 수 있는 팀원을 판단하는 일이 더 어려웠습니다.', body: '기존 커뮤니티는 공고와 기술 스택을 보여주지만, 실제 공모전 완주에 중요한 열정·응답 성향·일정 약속은 확인하기 어려웠습니다.', points: ['공고 중심 정보만으로 팀원의 협업 태도를 알기 어려웠습니다.', '역량이 비슷한 사람보다 상호 보완적인 조합이 필요했습니다.', '모집 이후 일정 관리가 다른 도구로 분산됐습니다.'] },
    decisions: [
      { title: '열정 온도를 신뢰 신호로 사용', rationale: '스펙보다 완주 가능성과 협업 태도를 판단할 보조 지표가 필요했습니다.' },
      { title: '태그 기반 상호보완 매칭', rationale: '같은 역량의 반복보다 필요한 역할을 채우는 팀 구성이 중요하다고 판단했습니다.' },
      { title: '모집과 일정 관리를 한 흐름으로 연결', rationale: '팀을 만든 뒤 도구가 바뀌며 생기는 이탈과 정보 손실을 줄이기 위해서입니다.' }
    ],
    process: [
      { stage: '01', title: '문제 탐색', description: '2022.10.12–15 모집 후 공모전 경험이 있는 20대 대학생 6명을 대상으로 사용자 조사를 설계했습니다.' },
      { stage: '02', title: '기존 경험 분석', description: '공고형 커뮤니티가 제공하는 정보와 실제 선택에 필요한 신호의 간극을 비교했습니다.' },
      { stage: '03', title: '사용자 모델링', description: 'VOC와 어피니티 다이어그램, 행동변수 매핑을 거쳐 리더형·팔로워형 2개 퍼소나를 정의했습니다.' },
      { stage: '04', title: '프로토타이핑', description: '탐색–지원–팀 구성–일정 관리의 전체 사용자 흐름을 화면으로 검증했습니다.' }
    ],
    outcomes: [
      { value: '6명', label: '심층 인터뷰', before: '공고형 서비스에 대한 가설', after: '실제 팀 빌딩 경험자의 VOC와 행동변수 확보', source: 'Linkus research deck · 2022.10.16' },
      { value: '30–40분', label: '1인당 인터뷰', before: '기능 아이디어 중심', after: '맥락·동기·협업 성향을 기준으로 문제 재정의', source: 'Linkus research deck · slide 24' },
      { value: '검증 전', label: '출시 후 KPI', before: 'UX 프로토타입', after: '전환·사용성 성과는 추가 검증 필요', source: '출시 후 데이터 미확보' }
    ],
    evidence: [
      { label: 'Linkus 공개 case study', type: 'github', url: 'https://github.com/hyeoksu1234/portfolio_website/blob/main/design/linkus.html', access: 'public', detail: '문제 정의, 열정 온도, 태그 기반 매칭 판단' },
      { label: 'Linkus UX 산출물', type: 'image', url: 'https://github.com/hyeoksu1234/portfolio_website/tree/main/img/project/team', access: 'public', detail: '정보 구조와 화면 프로토타입 원본' }
    ],
    lesson: '매칭 서비스에서 프로필 항목보다 중요한 것은 사용자가 서로를 믿을 수 있게 만드는 증거 구조입니다.'
  },
  {
    id: 'branding',
    title: 'Brand Identity Collection',
    subtitle: '로고와 응용 체계로 정리한 브랜드 디자인 작업',
    category: 'design',
    role: 'Brand Strategy & Design',
    period: 'Selected works',
    status: '아카이브',
    featured: false,
    stack: ['Illustrator', 'Photoshop', 'InDesign'],
    repository: { status: 'evidence-only', label: 'GitHub · Branding case artifacts', url: 'https://github.com/hyeoksu1234/portfolio_website/blob/main/design/branding.html', note: '별도 개발 저장소가 아닌 공개 디자인 case study 근거입니다.' },
    thumbnail: '/img/project/branding/1.webp',
    images: ['/img/project/branding/1.webp', '/img/project/branding/2.webp', '/img/project/branding/3.webp', '/img/project/branding/4.webp', '/img/project/branding/5.webp'],
    summary: '서로 다른 브랜드의 성격을 로고, 색, 타이포그래피와 응용 매체에서 일관되게 보이도록 정리한 선별 작업입니다.',
    contribution: '브랜드 콘셉트, 로고, 시각 시스템, 응용 디자인',
    problem: { title: '개별 작업의 결과 이미지는 남아 있지만, 프로젝트별 원문 맥락은 충분하지 않습니다.', body: '확인할 수 없는 고객 배경이나 성과를 새로 만들지 않고, 현재는 검증 가능한 시각 결과물만 공개합니다.', points: ['브랜드별 문제 정의와 사용자 반응 수치는 원본 자료 보강이 필요합니다.', '각 결과물은 저장소에 남은 원본 이미지로 확인할 수 있습니다.'] },
    decisions: [{ title: '성과 서사를 추정하지 않고 결과물 중심으로 공개', rationale: '맥락이 부족한 프로젝트에 가상의 문제·성과를 붙이는 것보다 자료의 한계를 명시하는 편이 신뢰에 맞습니다.' }],
    process: [{ stage: '01', title: '선별·정리', description: '현재 남아 있는 원본 중 로고와 응용 시스템을 보여주는 5개 결과물을 선별했습니다.' }],
    outcomes: [{ value: '5개', label: '검증 가능한 결과물', before: '프로젝트 맥락이 분산', after: '현재 확인 가능한 시각 산출물만 공개', source: '포트폴리오 원본 이미지' }],
    evidence: [
      { label: 'Branding 공개 case study', type: 'github', url: 'https://github.com/hyeoksu1234/portfolio_website/blob/main/design/branding.html', access: 'public', detail: '브랜드 분석과 결과물 맥락' },
      { label: '브랜드 디자인 원본 이미지', type: 'image', url: 'https://github.com/hyeoksu1234/portfolio_website/tree/main/img/project/branding', access: 'public', detail: '5개의 선별 결과물' }
    ],
    lesson: '좋은 포트폴리오는 빈칸을 그럴듯한 이야기로 채우기보다, 확인 가능한 범위와 추가로 필요한 근거를 함께 보여줘야 합니다.'
  },
  {
    id: 'pd-projects',
    title: 'YouTube PD Projects',
    subtitle: '기획·촬영·편집을 한 흐름으로 운영한 콘텐츠 제작 이력',
    category: 'media',
    role: 'Content Project Lead · Planning & Direction',
    period: '2020 — 2022',
    status: '경력 아카이브',
    featured: false,
    stack: ['Content Strategy', 'Premiere Pro', 'After Effects', 'Cinema 4D'],
    repository: { status: 'evidence-only', label: 'GitHub · PD case archive', url: 'https://github.com/hyeoksu1234/portfolio_website/blob/main/design/pd.html', note: '영상 링크와 제작 이력을 보존한 공개 아카이브입니다.' },
    thumbnail: '/img/project/pd/1.webp',
    images: ['/img/project/pd/1.webp'],
    summary: '사회적 메시지와 대중적 전달력을 함께 설계하며 콘텐츠의 기획, 현장 촬영, 편집과 발행을 반복 운영했습니다.',
    contribution: '아이템 기획, 촬영 디렉션, 편집, 모션 그래픽, 채널 운영 협업',
    problem: { title: '좋은 메시지도 시청자가 끝까지 보지 않으면 전달되지 않습니다.', body: '사회적 주제와 인물의 이야기를 자극적으로 소비하지 않으면서도, 초반 훅과 전개 리듬으로 대중에게 도달하게 만들어야 했습니다.', points: ['기획 의도와 시청 지속을 함께 고려해야 했습니다.', '현장 변수와 후반 편집을 하나의 제작 일정으로 관리해야 했습니다.', '영상별 역할과 성과를 공개 근거와 연결해야 했습니다.'] },
    decisions: [
      { title: '기획–촬영–편집을 한 사람이 끝까지 연결', rationale: '현장에서 얻은 맥락을 편집 리듬과 메시지 손실 없이 이어가기 위해서입니다.' },
      { title: '사회적 메시지와 대중적 포맷의 균형', rationale: '주제의 존중을 지키면서도 더 많은 시청자에게 도달하기 위해서입니다.' }
    ],
    process: [
      { stage: '01', title: '아이템·구성', description: '인물과 상황의 핵심 메시지, 초반 훅, 전체 전개를 설계했습니다.' },
      { stage: '02', title: '촬영·디렉션', description: '현장 상황에 맞춰 장면과 인터뷰를 확보하고 후반 편집을 고려해 운영했습니다.' },
      { stage: '03', title: '편집·발행', description: '리듬, 자막, 모션 그래픽과 피드백을 반영해 채널 포맷에 맞게 완성했습니다.' }
    ],
    outcomes: [
      { value: '323만+', label: '대표 영상 현재 조회수', before: '기획·제작', after: '공개 영상 VHVnlArD4ro 도달', source: 'YouTube 공개 viewCount · 2026.07.15' },
      { value: '377만+', label: '연결된 3편 합산 조회', before: '3개 개별 제작물', after: '3,775,858 views 확인', source: 'YouTube 공개 viewCount 합산 · 2026.07.15' },
      { value: 'Forbes', label: '사회적 메시지 사례 소개', before: 'Pranky Friends 채널 운영', after: '2020 대한민국 파워 유튜버 100 특집 기사에 소개', source: 'Forbes Korea 기사' }
    ],
    evidence: [
      { label: 'PD 공개 case archive', type: 'github', url: 'https://github.com/hyeoksu1234/portfolio_website/blob/main/design/pd.html', access: 'public', detail: '제작 이력과 연결 영상 원본' },
      { label: '대표 영상 3편', type: 'video', access: 'public-record', detail: '현재 조회수 3,235,820 · 272,909 · 267,129 확인' },
      { label: 'Forbes Korea 특집 기사', type: 'article', url: 'https://www.forbeskorea.co.kr/news/articleView.html?idxno=331116', access: 'public', detail: '프랭키프렌즈를 사회적 메시지 사례로 소개' }
    ],
    lesson: '콘텐츠 제작에서 배운 훅, 흐름, 피드백 감각은 지금도 제품의 정보 구조와 이해관계자 커뮤니케이션에 쓰이고 있습니다.'
  }
];

var categoryOrder = { pm: 0, product: 1, design: 2, media: 3 };
var categoryLabels = {
  pm: 'PM & Operations',
  product: 'Product Strategy',
  design: 'UX & Design',
  media: 'Content & Direction'
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { projects: projects, categoryOrder: categoryOrder, categoryLabels: categoryLabels };
}
