import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const content = {
  ko: {
    title: 'Privacy Policy',
    sections: [
      {
        title: '개인정보 수집 및 이용',
        content: 'MemoStopwatch는 회원가입 없이 이용할 수 있으며, 사용자의 메모와 스톱워치 기록은 브라우저 LocalStorage에만 저장되고 서버로 전송되지 않습니다.'
      },
      {
        title: '광고 및 쿠키',
        content: '본 사이트에는 Google AdSense 광고가 게재될 수 있습니다. Google 및 제3자 공급업체는 쿠키를 사용하여 맞춤형 광고를 제공할 수 있습니다. 사용자는 https://www.google.com/settings/ads 에서 맞춤 광고를 선택 해제할 수 있습니다.'
      },
      {
        title: '정책 변경',
        content: '본 정책은 필요에 따라 변경될 수 있으며, 변경 시 본 페이지를 통해 공지합니다.'
      }
    ],
    contact: '문의: mineh.studio@gmail.com',
    lastUpdated: '최종 업데이트: 2025년 9월',
    metaTitle: 'Privacy Policy | MemoStopwatch - 개인정보처리방침',
    metaDescription: 'MemoStopwatch 서비스의 개인정보처리방침 및 데이터 보호 정책'
  },
  en: {
    title: 'Privacy Policy',
    sections: [
      {
        title: 'Data Collection',
        content: 'MemoStopwatch requires no sign-up. Notes and stopwatch data are stored only in your browser\'s LocalStorage and are never sent to our servers.'
      },
      {
        title: 'Advertising and Cookies',
        content: 'Google AdSense may serve ads on this site. Google and third-party vendors may use cookies to deliver personalized ads. You can opt out via https://www.google.com/settings/ads.'
      },
      {
        title: 'Policy Changes',
        content: 'This policy may change and updates will be posted on this page.'
      }
    ],
    contact: 'Contact: mineh.studio@gmail.com',
    lastUpdated: 'Last Updated: September 2025',
    metaTitle: 'Privacy Policy | MemoStopwatch',
    metaDescription: 'Privacy policy and data protection for MemoStopwatch service'
  }
};

export default function Privacy() {
  const { lang = 'en' } = useParams<{ lang?: string }>();
  const currentContent = content[lang as keyof typeof content] || content.en;

  useEffect(() => {
    document.title = currentContent.metaTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', currentContent.metaDescription);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = currentContent.metaDescription;
      document.head.appendChild(meta);
    }
  }, [currentContent]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8">
          ← Back to Timer
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {currentContent.title}
          </h1>

          <div className="prose prose-gray max-w-none">
            {currentContent.sections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}

            <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-500">
              <p>{currentContent.lastUpdated}</p>
              <p className="mt-2">{currentContent.contact}</p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              to="/ko/privacy"
              className={`px-4 py-2 rounded ${lang === 'ko' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              한국어
            </Link>
            <Link
              to="/en/privacy"
              className={`px-4 py-2 rounded ${lang === 'en' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              English
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}