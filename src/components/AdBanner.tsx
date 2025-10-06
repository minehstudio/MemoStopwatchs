import React, { useEffect } from 'react';

interface AdBannerProps {
  size: 'top' | 'side' | 'card';
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdBanner({ size, className = '' }: AdBannerProps) {
  const isDevelopment = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';

  useEffect(() => {
    if (!isDevelopment) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [isDevelopment]);

  // 각 위치별로 다른 Ad Slot ID를 사용
  // AdSense에서 각 광고 단위를 만든 후 여기에 ID를 넣으세요
  const getAdConfig = () => {
    switch (size) {
      case 'top':
        return {
          slot: '7018828434',  // 리더보드(728×90) 광고
          format: '',  // AdSense 코드에서 format 지정 안함
          style: {
            display: 'inline-block',
            width: '728px',
            height: '90px',
            maxWidth: '100%'
          }
        };
      case 'side':
        return {
          slot: '7018828434', // 임시로 같은 광고 사용 (나중에 별도 광고 단위 생성)
          format: '',
          style: {
            display: 'inline-block',
            width: '728px',
            height: '90px',
            maxWidth: '100%'
          }
        };
      case 'card':
        return {
          slot: '7018828434', // 임시로 같은 광고 사용 (나중에 별도 광고 단위 생성)
          format: '',
          style: {
            display: 'inline-block',
            width: '728px',
            height: '90px',
            maxWidth: '100%'
          }
        };
      default:
        return {
          slot: '7018828434',
          format: '',
          style: {
            display: 'inline-block',
            width: '728px',
            height: '90px',
            maxWidth: '100%'
          }
        };
    }
  };

  const adConfig = getAdConfig();

  // 개발 환경에서는 플레이스홀더 표시
  if (isDevelopment) {
    return (
      <div
        className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 ${className}`}
        style={adConfig.style}
      >
        <span className="text-sm">Ad Space ({size})</span>
      </div>
    );
  }

  return (
    <div className={`${className}`} style={{ maxWidth: '100%' }}>
      <ins className="adsbygoogle"
           style={adConfig.style}
           data-ad-client="ca-pub-2515680001641394"
           data-ad-slot={adConfig.slot}
           data-ad-format={adConfig.format}
           data-full-width-responsive="true"></ins>
    </div>
  );
}