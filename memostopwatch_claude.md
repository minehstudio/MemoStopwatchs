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

## 예정 작업

### 1. 도메인 설정
- **도메인**: memostopwatch.org (GoDaddy 구매 예정)
- **Vercel 연결** 후 DNS 설정
- **HTTPS** 자동 적용

### 2. Google AdSense 연동
- **개인정보처리방침** 페이지 추가 필요
- AdBanner.tsx 컴포넌트에 실제 광고 코드 적용
- 승인 후 수익화 시작

### 3. 기능 개선 아이디어
- 사운드 알림 기능
- 다크 모드 지원
- 스탑워치 그룹핑
- CSV 내보내기
- PWA (앱 설치) 지원

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