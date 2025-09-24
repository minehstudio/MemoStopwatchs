# Memo Stopwatch - 개발 문서

## 프로젝트 개요
**Memo Stopwatch**는 메모 기능이 있는 멀티 스탑워치 웹 애플리케이션입니다.

### 기본 정보
- **프로젝트명**: Memo Stopwatch (StopNote30)
- **타입**: React SPA (Single Page Application)
- **용도**: 생산성 도구, 운동/요리/업무용 타이머
- **배포 URL**: [현재 Vercel 기본 도메인]
- **예정 도메인**: memostopwatch.org

## 기술 스택

### Frontend
- **React**: 18.3.1
- **TypeScript**: 최신 버전
- **빌드 도구**: Vite 6.3.5
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: Radix UI
- **아이콘**: Lucide React

### 배포 & 호스팅
- **호스팅**: Vercel
- **소스 관리**: GitHub (Public)
- **저장소**: https://github.com/minehstudio/MemoStopwatchs.git
- **자동 배포**: GitHub → Vercel 연동

## 주요 기능

### 1. 멀티 스탑워치
- 최대 **5개** 동시 관리
- 독립적인 시작/정지/리셋 기능
- **밀리초** 단위 정확도 (00:00.00 형식)

### 2. 메모 기능
- 각 스탑워치마다 **최대 30자** 메모
- 실시간 글자수 표시
- 수정 시간 자동 기록

### 3. 데이터 저장
- **localStorage** 기반 로컬 저장
- 페이지 새로고침 후에도 데이터 유지
- 실행 중인 타이머는 일시정지 상태로 복원

### 4. 반응형 디자인
- **모바일 우선** 설계
- **데스크톱** 대응 (사이드 광고 영역)
- Tailwind CSS로 구현

## 프로젝트 구조

```
Minimal Stopwatch App/
├── public/
│   ├── favicon.svg           # 파비콘 (시계 아이콘)
│   └── og-image.svg         # SNS 공유용 이미지 (1200x630)
├── src/
│   ├── components/
│   │   ├── ui/              # Radix UI 컴포넌트들
│   │   ├── StopwatchCard.tsx # 개별 스탑워치 컴포넌트
│   │   └── AdBanner.tsx     # 광고 영역 컴포넌트
│   ├── App.tsx              # 메인 앱 로직
│   ├── main.tsx             # 앱 엔트리포인트
│   └── index.css            # Tailwind CSS 설정
├── index.html               # HTML 템플릿 (SEO 메타태그 포함)
├── package.json             # 의존성 및 스크립트
├── vite.config.ts           # Vite 빌드 설정
└── .gitignore              # Git 제외 파일 목록
```

## 핵심 컴포넌트

### App.tsx
- 전체 애플리케이션 상태 관리
- localStorage 데이터 로드/저장
- 스탑워치 추가/삭제/업데이트 로직

### StopwatchCard.tsx
- 개별 스탑워치 UI/UX
- 타이머 로직 (setInterval 기반)
- 메모 입력 및 시간 포맷팅

### AdBanner.tsx
- 광고 배너 플레이스홀더
- 3가지 크기: top (728x90), side (160x600), card (모바일용)

## SEO & 마케팅

### 메타 데이터
- **Title**: "Memo Stopwatch - Free Multi Timer with Notes"
- **Description**: 한영 혼합, 메모 기능 강조
- **Keywords**: multi stopwatch, memo stopwatch, 멀티 스탑워치, 메모 스탑워치
- **Open Graph**: 1200x630 이미지 포함

### 타겟 키워드
- 메모 스탑워치
- 멀티 타이머
- 생산성 도구
- 운동 타이머
- 요리 타이머

## 빌드 & 배포

### 로컬 개발
```bash
npm install
npm run dev  # http://localhost:3000
```

### 프로덕션 빌드
```bash
npm run build  # build/ 폴더 생성
```

### 배포 과정
1. GitHub에 코드 푸시
2. Vercel 자동 감지 및 빌드
3. **Framework Preset**: Vite 설정 필요
4. 자동 배포 완료

## 완료된 작업 ✅

### 1. SEO 최적화 (2025-09-24)
- **도메인 설정**: memostopwatch.com 구매 완료
- **메타태그 URL 업데이트**: 모든 og:url, og:image를 새 도메인으로 변경
- **Canonical URL 추가**: 중복 콘텐츠 방지를 위한 canonical 태그 추가
- **구조화된 데이터**: WebApplication Schema.org 마크업 추가
- **robots.txt 생성**: 검색엔진 크롤링 허용 설정
- **sitemap.xml 생성**: Google 검색 인덱싱용 사이트맵

## 다음 단계 (To-Do)

### 1. 검색엔진 등록 ⚡ 우선순위: 높음
- [ ] **Google Search Console 등록**
  - https://search.google.com/search-console 접속
  - 도메인 소유권 인증 (DNS TXT 레코드 추가)
  - sitemap.xml 제출
  - 인덱싱 요청
- [ ] **네이버 서치어드바이저 등록**
  - https://searchadvisor.naver.com 접속
  - 사이트 등록 및 소유권 확인
  - 사이트맵 제출
- [ ] **Google Analytics 설치**
  - GA4 계정 생성
  - 추적 코드 index.html에 추가
  - 목표 설정 (체류시간, 타이머 사용 횟수 등)

### 2. 배포 설정 ⚡ 우선순위: 높음
- [ ] **Vercel 도메인 연결**
  - Vercel 대시보드에서 Custom Domain 추가
  - DNS 설정 (A 레코드 또는 CNAME)
  - SSL 인증서 자동 발급 확인
- [ ] **빌드 & 배포**
  - `npm run build` 로컬 테스트
  - GitHub 푸시 → Vercel 자동 배포
  - 배포 후 실제 도메인에서 확인

### 3. 수익화 준비 ⚡ 우선순위: 중간
- [ ] **개인정보처리방침 페이지 작성**
  - /privacy 라우트 추가
  - 광고, 쿠키, 분석 도구 사용 명시
  - footer에 링크 추가
- [ ] **Google AdSense 신청**
  - AdSense 계정 생성
  - 사이트 심사 요청
  - 승인 후 광고 코드 삽입
- [ ] **광고 위치 최적화**
  - AdBanner.tsx에 실제 광고 코드 적용
  - 모바일/데스크톱 반응형 광고 설정

### 4. 마케팅 & 홍보 ⚡ 우선순위: 중간
- [ ] **SNS 공유 최적화**
  - og:image 실제 이미지 제작 (1200x630)
  - 카카오톡, 페이스북 공유 테스트
- [ ] **커뮤니티 홍보**
  - 생산성 관련 커뮤니티 (클리앙, 뽐뿌 등)
  - 운동/요리 커뮤니티
  - 개발자 커뮤니티 (Show HN 등)
- [ ] **블로그 포스팅**
  - 사용 가이드 작성
  - SEO 키워드 타겟팅

### 5. 기능 개선 (장기) ⚡ 우선순위: 낮음
- [ ] **PWA 지원**: 앱처럼 설치 가능하게
- [ ] **다크 모드**: 시스템 설정 연동
- [ ] **사운드 알림**: 타이머 종료 시 알림음
- [ ] **데이터 내보내기**: CSV, JSON 형식
- [ ] **클라우드 동기화**: 로그인 기능 추가

## 빠른 참고 명령어

```bash
# 로컬 개발
cd 01_memostopwatch
npm run dev

# 프로덕션 빌드
npm run build

# Git 커밋 & 푸시
git add .
git commit -m "SEO optimization and domain update"
git push origin main
```

## 중요 링크
- **실제 도메인**: https://memostopwatch.com
- **GitHub**: https://github.com/minehstudio/MemoStopwatchs
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Google Search Console**: https://search.google.com/search-console
- **Google Analytics**: https://analytics.google.com

## 기술적 고려사항

### 성능
- Vite 기반 빠른 빌드
- React 18 최적화
- 번들 크기: ~183KB (gzip: ~58KB)

### 호환성
- 모던 브라우저 지원
- ES6+ 기능 사용
- 모바일 터치 최적화

### 보안
- XSS 방지 (React 기본 보안)
- localStorage만 사용 (서버 없음)
- HTTPS 강제 (Vercel 기본)

## 개발자 정보
- **Git 사용자**: minehstudio (mineh.studio@gmail.com)
- **개발 도구**: Claude Code 활용
- **개발 기간**: 2024년 9월

## 라이선스 & 저작권
- **저작권**: © 2024 Memo Stopwatch
- **코드**: GitHub Public Repository
- **이미지**: 자체 제작 SVG

---

이 문서는 프로젝트의 전체적인 이해를 위해 작성되었습니다.
추가 질문이나 기술적 세부사항은 소스코드를 참조하세요.