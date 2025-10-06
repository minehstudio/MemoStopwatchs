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
  useEffect(() => {
    try {
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
           data-ad-client="ca-pub-2515680001641394"
           data-ad-slot="YOUR_AD_SLOT_ID"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}
