# 뽀모 베이커리 (Ppomo Bakery) 공식 홈페이지

천연발효종과 저온 숙성으로 바게트, 치아바타, 소금빵을 빚어내는 테이크아웃 전문 동네 빵집 **“뽀모 베이커리”**의 운영용 단일 페이지 웹사이트입니다.

---

## 1. 기술 스택 및 주요 특징

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (엄격한 4대 전용 컬러 토큰 및 7대 폰트 스케일 적용)
- **Image Optimization**: `<picture>` 태그 기반 모바일/데스크톱 다운로드 분기, WebP/AVIF 압축
- **A11y & SEO**: Skip Link, 시맨틱 태그 구조, 44×44px 터치 타깃, Tabular-nums 적용, 조건부 Schema.org Restaurant JSON-LD 및 동적 Sitemap/Robots 지원

---

## 2. 프로젝트 실행 방법

### 개발 서버 실행
```bash
# 종속성 설치 (이미 설치 완료됨)
pnpm install

# 로컬 개발 서버 실행 (기본 포트: http://localhost:3000)
pnpm dev
```

### 프로덕션 빌드 및 실행
```bash
# 정적 페이지 및 최적화 번들 빌드
pnpm build

# 프로덕션 서버 구동
pnpm start
```

### 정적 검사 및 타입 검사
```bash
# TypeScript 타입 검사
pnpm typecheck

# ESLint 검사
pnpm lint
```

---

## 3. 미정 정보 확인 및 입력 위치 가이드

본 프로젝트는 확인되지 않은 가짜 정보(가짜 주소, 임의의 평점 및 후기, 허위 길찾기 링크 등)를 일체 생성하지 않도록 설계되었습니다.  
모든 매장 정보는 단일 파일(`src/data/store.ts`)과 메뉴 파일(`src/data/menu.ts`)에서 관리되며, 정보가 확정되면 해당 파일의 `null` 값을 실제 값으로 수정하는 즉시 사이트에 정식 활성화됩니다.

| 항목 | 관리 파일 위치 | 현재 상태 | 확정 시 입력 방법 |
| :--- | :--- | :--- | :--- |
| **도로명 주소** | `src/data/store.ts` (`address`) | `null` | `"서울특별시 송파구 ..."` 입력 시 푸터, 오시는 길 카드 자동 노출 |
| **지도 좌표 (위도/경도)** | `src/data/store.ts` (`latitude`, `longitude`) | `null` | 위도/경도 숫자 입력 시 JSON-LD 및 지도 컴포넌트 자동 연동 |
| **네이버 길찾기 URL** | `src/data/store.ts` (`naverDirectionsUrl`) | `null` | 확정 링크 입력 시 히어로, 매장 안내, 모바일 하단 바에 '길찾기' 버튼 활성화 |
| **카카오 길찾기 URL** | `src/data/store.ts` (`kakaoDirectionsUrl`) | `null` | 확정 링크 입력 시 카카오맵 길찾기 버튼 활성화 |
| **예약 / 온라인 주문** | `src/data/store.ts` (`reservationUrl`) | `null` | 확정 URL 입력 시 히어로, 메뉴, 모바일 바 4곳에 `data-slot` 예약 CTA 자동 활성화 |
| **주차장 정보** | `src/data/store.ts` (`parking`) | `null` | 주차장 명칭 및 도보 시간 문자열 입력 |
| **배달 플랫폼/주문 링크** | `src/data/store.ts` (`delivery.platform`) | `null` | 제휴 배달 앱 명칭 및 주문 링크 입력 |
| **시그니처 외 신메뉴 상세** | `src/data/menu.ts` (`signatureMenus`, `upcomingMenus`) | 이름만 등록됨 | 가격, 원산지, 재료, 알레르기 유발 물질 확정 시 추가 등록 |
| **실제 사이트 도메인** | `.env.local` (`NEXT_PUBLIC_SITE_URL`) | 미지정 | `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` 등록 시 Canonical 및 Sitemap 자동 완성 |

---

## 4. 실제 사진 교체 가이드 (우선순위)

실제 매장 사진이 촬영되면 다음 순서에 따라 `public/images/` 디렉터리의 이미지를 동일한 파일명으로 교체하십시오:

1. **IMG-01 & IMG-02 (히어로 세트)**
   - `public/images/hero-desktop.webp` (데스크톱 16:9, 가로 2,400px 이상)
   - `public/images/hero-mobile.webp` (모바일 세로형, 가로 2,400px 이상)
2. **IMG-04 (크랙 소금빵)**
   - `public/images/menu-salt-bread.webp` (4:3 비율, 가로 1,600px 이상)
3. **IMG-12 (매대 풍경)**
   - `public/images/gallery/gallery-12.webp` (4:3 비율, 가로 2,400px 이상)

---

## 5. 디자인 토큰 사양

- **색상 시스템**:
  - 배경: `#FFF7EC`
  - 본문/우드: `#2E2118`
  - 클릭 포인트(CTA 전용): `#D9652B`
  - 상태(휴무/품절): `#9B2C2C`
- **폰트**:
  - 제목: Noto Serif KR (600, 700)
  - 본문: Pretendard Variable (400, 500)
- **금지 원칙 준수**:
  - 건강 효능/소화 개선 단정 문구 배제
  - 인위적인 별점/가짜 후기/어색한 배지 배제
  - 모바일과 데스크톱 이미지 중복 다운로드 방지 (`<picture>` 적용)
