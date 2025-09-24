import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

const blogPosts = {
  'time-management-tips': {
    title: '효율적인 시간 관리를 위한 스톱워치 활용법',
    date: '2025-09-24',
    readTime: '5분',
    content: `
## 시간 관리의 중요성

현대 사회에서 시간 관리는 성공의 핵심 요소 중 하나입니다. 특히 업무와 개인 생활의 균형을 맞추기 위해서는 효율적인 시간 관리 기법이 필요합니다.

## 포모도로 기법과 스톱워치

**포모도로 기법**은 25분 집중 작업 후 5분 휴식을 반복하는 시간 관리 방법입니다. 스톱워치를 활용하면 이 기법을 쉽게 실행할 수 있습니다.

### 실행 방법:
1. 25분 타이머 설정
2. 집중해서 작업 수행
3. 5분 휴식
4. 4회 반복 후 15-30분 긴 휴식

## 메모 기능의 활용

스톱워치와 함께 메모 기능을 사용하면 더욱 효과적입니다:

- **작업 내용 기록**: 무엇을 했는지 추적
- **진행 상황 체크**: 목표 달성도 확인
- **개선점 발견**: 시간 낭비 요소 파악

## 마무리

효율적인 시간 관리는 하루아침에 이뤄지지 않습니다. 꾸준한 연습과 자신만의 패턴을 찾아가는 것이 중요합니다.

*더 많은 생산성 팁이 궁금하시다면 다음 글도 확인해보세요!*
    `
  },
  'hiit-workout-timer': {
    title: '운동할 때 타이머 활용하기: HIIT 운동 가이드',
    date: '2025-09-23',
    readTime: '7분',
    content: `
## HIIT란 무엇인가?

**고강도 인터벌 트레이닝(HIIT)**는 짧은 시간 동안 고강도 운동과 휴식을 반복하는 운동 방법입니다. 시간 효율성이 뛰어나 바쁜 현대인들에게 인기가 높습니다.

## 타이머의 중요성

HIIT 운동에서 정확한 시간 관리는 운동 효과를 극대화하는 핵심입니다. 타이머 없이는 제대로 된 HIIT를 할 수 없다고 해도 과언이 아닙니다.

## 초보자용 HIIT 루틴

### 20분 기본 프로그램:
- **워밍업**: 3분 가벼운 움직임
- **고강도**: 30초 전력으로 운동
- **휴식**: 30초 완전 휴식
- **반복**: 8라운드 진행
- **쿨다운**: 3분 스트레칭

## 중급자용 HIIT 루틴

### 25분 중급 프로그램:
- **워밍업**: 3분
- **고강도**: 45초
- **휴식**: 15초
- **반복**: 12라운드
- **쿨다운**: 4분

## 메모 활용 팁

운동할 때 메모 기능을 활용하면:

- **운동 종목 기록**: 어떤 운동을 했는지
- **세트별 기록**: 각 라운드별 성과
- **체감 강도**: 1-10점 척도로 기록
- **개선점**: 다음 운동 시 참고사항

## 주의사항

- 무리하지 말고 체력에 맞게 조절
- 부상 방지를 위한 충분한 워밍업
- 운동 후 적절한 휴식과 영양 섭취

## 마무리

꾸준한 HIIT 운동으로 건강한 몸을 만들어보세요. 타이머와 함께라면 더욱 체계적인 운동이 가능합니다!

*건강한 운동 습관을 위한 더 많은 팁을 준비하고 있습니다.*
    `
  }
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug as keyof typeof blogPosts] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">페이지를 찾을 수 없습니다</h1>
          <Link to="/blog" className="text-purple-600 hover:text-purple-700">
            블로그로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/blog" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-8">
          <header className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} 읽기
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>
          </header>

          <div style={{ maxWidth: 'none' }}>
            {post.content.split('\n\n').map((paragraph, index) => {
              // ## 헤딩 2
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} style={{
                    fontSize: '1.875rem',
                    fontWeight: 'bold',
                    color: '#111827',
                    marginTop: '2rem',
                    marginBottom: '1rem',
                    paddingBottom: '0.5rem',
                    borderBottom: '2px solid #e5e7eb'
                  }}>
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }

              // ### 헤딩 3
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginTop: '1.5rem',
                    marginBottom: '0.75rem'
                  }}>
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }

              // 순서가 있는 리스트 (1. 2. 3.)
              if (/^\d+\.\s/.test(paragraph)) {
                const items = paragraph.split('\n').filter(line => /^\d+\.\s/.test(line));
                return (
                  <ol key={index} style={{
                    listStyleType: 'decimal',
                    paddingLeft: '1.5rem',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    lineHeight: '1.75'
                  }}>
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex} style={{
                        color: '#374151',
                        marginBottom: '0.5rem',
                        paddingLeft: '0.5rem'
                      }}>
                        {item.replace(/^\d+\.\s/, '')}
                      </li>
                    ))}
                  </ol>
                );
              }

              // 순서가 없는 리스트 (- •)
              if (paragraph.startsWith('- ') || paragraph.includes('\n- ')) {
                const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                return (
                  <ul key={index} style={{
                    listStyleType: 'disc',
                    paddingLeft: '1.5rem',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    lineHeight: '1.75'
                  }}>
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex} style={{
                        color: '#374151',
                        marginBottom: '0.5rem',
                        paddingLeft: '0.5rem'
                      }}>
                        {item.replace('- ', '').split('**').map((part, partIndex) =>
                          partIndex % 2 === 1 ? <strong key={partIndex} style={{ fontWeight: 'bold', color: '#111827' }}>{part}</strong> : part
                        )}
                      </li>
                    ))}
                  </ul>
                );
              }

              // 인용구 (> 로 시작)
              if (paragraph.startsWith('> ')) {
                return (
                  <blockquote key={index} style={{
                    borderLeft: '4px solid #8b5cf6',
                    paddingLeft: '1rem',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    fontStyle: 'italic',
                    color: '#6b7280',
                    backgroundColor: '#f9fafb',
                    padding: '1rem',
                    borderRadius: '0 8px 8px 0'
                  }}>
                    {paragraph.replace('> ', '')}
                  </blockquote>
                );
              }

              // 코드 블록 (``` 로 감싸진)
              if (paragraph.startsWith('```') && paragraph.endsWith('```')) {
                return (
                  <pre key={index} style={{
                    backgroundColor: '#f3f4f6',
                    padding: '1rem',
                    borderRadius: '8px',
                    overflow: 'auto',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    border: '1px solid #e5e7eb'
                  }}>
                    <code style={{
                      fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                      fontSize: '0.875rem',
                      color: '#1f2937'
                    }}>
                      {paragraph.replace(/^```|```$/g, '').trim()}
                    </code>
                  </pre>
                );
              }

              // Bold 및 이탤릭 텍스트가 포함된 단락
              if (paragraph.includes('**') || paragraph.includes('*')) {
                return (
                  <p key={index} style={{
                    color: '#374151',
                    marginBottom: '1rem',
                    lineHeight: '1.75',
                    fontSize: '1rem'
                  }}>
                    {paragraph.split('**').map((part, partIndex) => {
                      if (partIndex % 2 === 1) {
                        return <strong key={partIndex} style={{ fontWeight: 'bold', color: '#111827' }}>{part}</strong>;
                      }
                      // 이탤릭 처리 (*single asterisk*)
                      return part.split(/\*([^*]+)\*/).map((italicPart, italicIndex) =>
                        italicIndex % 2 === 1 ? <em key={`${partIndex}-${italicIndex}`} style={{ fontStyle: 'italic', color: '#6b7280' }}>{italicPart}</em> : italicPart
                      );
                    })}
                  </p>
                );
              }

              // 중앙 정렬 이탤릭 텍스트 (앞뒤로 * 하나씩)
              if (paragraph.startsWith('*') && paragraph.endsWith('*') && !paragraph.includes('**')) {
                return (
                  <p key={index} style={{
                    color: '#6b7280',
                    fontStyle: 'italic',
                    textAlign: 'center',
                    marginTop: '1.5rem',
                    marginBottom: '1.5rem',
                    fontSize: '0.95rem'
                  }}>
                    {paragraph.replace(/^\*|\*$/g, '')}
                  </p>
                );
              }

              // 일반 단락
              return (
                <p key={index} style={{
                  color: '#374151',
                  marginBottom: '1rem',
                  lineHeight: '1.75',
                  fontSize: '1rem'
                }}>
                  {paragraph}
                </p>
              );
            })}
          </div>
        </article>

        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            다른 글 보러가기
          </Link>
        </div>
      </div>
    </div>
  );
}