# Google AdSense 설정 가이드

## 🔧 현재 준비된 사항
1. ✅ AdBanner 컴포넌트가 이미 구현되어 있음
2. ✅ 광고 위치가 이미 지정되어 있음 (상단, 사이드, 카드)
3. ⏳ AdSense 스크립트 추가 필요

## 📝 설정 방법

### 1단계: index.html에 AdSense 스크립트 추가
`index.html` 파일의 16번째 줄 (`</script>`) 다음에 아래 코드를 추가하세요:

```html
<!-- Google AdSense -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
        crossorigin="anonymous"></script>
```

**중요**: `ca-pub-YOUR_PUBLISHER_ID`를 실제 AdSense Publisher ID로 교체하세요.

### 2단계: AdBanner 컴포넌트 수정
`src/components/AdBanner.tsx` 파일을 아래와 같이 수정:

```tsx
import React, { useEffect } from 'react';

interface AdBannerProps {
  size: 'top' | 'side' | 'card';
  className?: string;
}

export default function AdBanner({ size, className = '' }: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  const getAdStyle = () => {
    switch (size) {
      case 'top':
        return {
          display: 'block',
          width: '728px',
          height: '90px'
        };
      case 'side':
        return {
          display: 'block',
          width: '160px',
          height: '600px'
        };
      case 'card':
        return {
          display: 'block',
          width: '100%',
          height: '60px'
        };
      default:
        return {
          display: 'block',
          width: '100%',
          height: '60px'
        };
    }
  };

  const adStyle = getAdStyle();

  return (
    <div className={`${className}`} style={{ maxWidth: '100%' }}>
      <ins className="adsbygoogle"
           style={adStyle}
           data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
           data-ad-slot="YOUR_AD_SLOT_ID"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}
```

### 3단계: AdSense 계정에서 필요한 정보
1. **Publisher ID**: `ca-pub-XXXXXXXXXXXXXXXXX` 형식
2. **Ad Slot ID**: 각 광고 단위별로 다른 슬롯 ID

### 4단계: 각 광고 크기별 추천 설정

#### 상단 광고 (Leaderboard)
- 크기: 728x90
- 위치: 페이지 상단
- 광고 포맷: Display

#### 사이드 광고 (Wide Skyscraper)
- 크기: 160x600
- 위치: 페이지 사이드
- 광고 포맷: Display

#### 카드 광고 (In-feed)
- 크기: Responsive
- 위치: 콘텐츠 사이
- 광고 포맷: In-feed

## ⚠️ 주의사항

1. **도메인 승인**: memostopwatch.com이 AdSense에서 승인되어야 함
2. **트래픽 필요**: 최소한의 트래픽이 있어야 광고 표시
3. **정책 준수**: AdSense 정책을 반드시 준수
4. **테스트 모드**: 개발 중에는 테스트 광고 사용 권장

## 🧪 테스트 방법

1. 로컬에서 테스트할 때는 테스트 광고 코드 사용:
```javascript
data-ad-client="ca-pub-3940256099942544" // Google 테스트 Publisher ID
data-ad-slot="6300978111" // 테스트 Ad Slot
```

2. 실제 배포 전 체크리스트:
- [ ] Publisher ID 교체 완료
- [ ] Ad Slot ID 교체 완료
- [ ] 도메인 승인 확인
- [ ] 광고 위치 확인
- [ ] 반응형 디자인 테스트

## 📊 수익 최적화 팁

1. **광고 위치**: Above the fold에 최소 1개 광고
2. **광고 개수**: 페이지당 3-4개 권장
3. **광고 크기**: 다양한 크기 혼합 사용
4. **모바일 최적화**: 반응형 광고 사용

## 🔗 유용한 링크

- [Google AdSense 대시보드](https://www.google.com/adsense/)
- [AdSense 도움말](https://support.google.com/adsense)
- [광고 단위 만들기](https://support.google.com/adsense/answer/9274516)