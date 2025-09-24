import React from 'react';

interface AdBannerProps {
  size: 'top' | 'side' | 'card';
  className?: string;
}

export default function AdBanner({ size, className = '' }: AdBannerProps) {
  const getAdContent = () => {
    switch (size) {
      case 'top':
        return {
          width: '728px',
          height: '90px',
          text: 'Ad Banner (728×90)'
        };
      case 'side':
        return {
          width: '160px',
          height: '600px',
          text: 'Side Ad (160×600)'
        };
      case 'card':
        return {
          width: '100%',
          height: '60px',
          text: 'Card Ad'
        };
      default:
        return {
          width: '100%',
          height: '60px',
          text: 'Advertisement'
        };
    }
  };

  const adContent = getAdContent();

  return (
    <div
      className={`bg-muted border border-border rounded-xl flex items-center justify-center ${className}`}
      style={{
        width: adContent.width,
        height: adContent.height,
        maxWidth: '100%'
      }}
    >
      {/* Ad content will be inserted here */}
    </div>
  );
}