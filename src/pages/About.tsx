import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const content = {
  ko: {
    title: 'About MemoStopwatch',
    description: 'MemoStopwatch는 누구나 무료로 사용할 수 있는 간단한 온라인 스톱워치 서비스입니다.',
    features: [
      '사용자는 시간을 측정하면서 동시에 30자 메모를 남길 수 있습니다.',
      '학생, 직장인, 프리랜서, 운동을 즐기는 분들이 더 효율적으로 시간을 관리하도록 돕는 것이 목표입니다.'
    ],
    metaTitle: 'About | MemoStopwatch - 메모 가능한 무료 온라인 스톱워치',
    metaDescription: '무료로 사용할 수 있는 메모 기능이 있는 온라인 스톱워치 서비스 소개'
  },
  en: {
    title: 'About MemoStopwatch',
    description: 'MemoStopwatch is a free, minimalist online stopwatch.',
    features: [
      'Measure time and add a quick 30-character note right next to each stopwatch.',
      'Our goal is to help students, professionals, freelancers, and fitness lovers manage time more effectively.'
    ],
    metaTitle: 'About | MemoStopwatch - Free Multi Timer with Notes',
    metaDescription: 'Free online stopwatch with memo feature for better time management'
  }
};

export default function About() {
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
            <p className="text-lg text-gray-700 mb-4">
              {currentContent.description}
            </p>

            {currentContent.features.map((feature, index) => (
              <p key={index} className="text-gray-600 mb-3">
                {feature}
              </p>
            ))}

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-xs text-gray-400">
                Developer contact: <a href="mailto:mineh.studio@gmail.com" className="text-purple-600 hover:text-purple-700 underline">mineh.studio@gmail.com</a>
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              to="/ko/about"
              className={`px-4 py-2 rounded ${lang === 'ko' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              한국어
            </Link>
            <Link
              to="/en/about"
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