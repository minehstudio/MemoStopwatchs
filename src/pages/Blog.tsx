import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Timer, Target, Zap, BookOpen } from 'lucide-react';

const blogPosts = [
  {
    id: '1',
    title: '효율적인 시간 관리를 위한 스톱워치 활용법',
    excerpt: '생산성을 높이는 스톱워치 사용 팁과 시간 관리 전략을 소개합니다. 포모도로 기법부터 실무 활용까지.',
    date: '2025-09-24',
    readTime: '5분',
    slug: 'time-management-tips',
    category: '생산성',
    emoji: '🎯',
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    id: '2',
    title: '운동할 때 타이머 활용하기: HIIT 운동 가이드',
    excerpt: '고강도 인터벌 트레이닝(HIIT)을 할 때 타이머를 효과적으로 사용하는 방법입니다. 초보자부터 중급자까지.',
    date: '2025-09-23',
    readTime: '7분',
    slug: 'hiit-workout-timer',
    category: '운동',
    emoji: '⚡',
    gradient: 'from-green-500 to-blue-500'
  }
];

export default function Blog() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f3e8ff 0%, #ffffff 50%, #dbeafe 100%)' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(90deg, #7c3aed 0%, #2563eb 50%, #4338ca 100%)',
        color: 'white',
        padding: '4rem 1rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#c4b5fd',
              textDecoration: 'none',
              marginBottom: '2rem',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = '#c4b5fd'}
          >
            <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Back to Timer
          </Link>

          <div style={{ textAlign: 'center', maxWidth: '768px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                padding: '1rem',
                backdropFilter: 'blur(8px)'
              }}>
                <BookOpen style={{ width: '48px', height: '48px' }} />
              </div>
            </div>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              background: 'linear-gradient(90deg, #ffffff 0%, #c4b5fd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              MemoStopwatch Blog
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#c4b5fd',
              lineHeight: '1.6'
            }}>
              시간 관리와 생산성 향상을 위한 실용적인 팁과 가이드를 공유합니다. <br />
              더 효율적인 하루를 만들어보세요.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem' }}>
        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}>
              <div style={{
                width: '4px',
                height: '32px',
                background: 'linear-gradient(180deg, #8b5cf6 0%, #3b82f6 100%)',
                borderRadius: '2px'
              }}></div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>Featured Post</h2>
            </div>

            <article style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              transition: 'all 0.3s'
            }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{
                  flex: '0 0 33.333333%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  padding: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{ textAlign: 'center', color: 'white' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                      {blogPosts[0].emoji}
                    </div>
                    <div style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(8px)',
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      {blogPosts[0].category}
                    </div>
                  </div>
                </div>

                <div style={{ flex: '1', padding: '2rem' }}>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {blogPosts[0].date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {blogPosts[0].readTime} 읽기
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                    <Link to={`/blog/${blogPosts[0].slug}`}>
                      {blogPosts[0].title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    {blogPosts[0].excerpt}
                  </p>

                  <Link
                    to={`/blog/${blogPosts[0].slug}`}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    자세히 보기
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* Other Posts */}
        {blogPosts.length > 1 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}>
              <div style={{
                width: '4px',
                height: '32px',
                background: 'linear-gradient(180deg, #3b82f6 0%, #4338ca 100%)',
                borderRadius: '9999px'
              }}></div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>More Articles</h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem'
            }}>
              {blogPosts.slice(1).map((post) => (
                <article key={post.id} style={{
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{
                    height: '128px',
                    background: `linear-gradient(135deg, ${post.gradient.includes('green') ? '#10b981, #3b82f6' : '#8b5cf6, #3b82f6'})`,
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{ fontSize: '3rem' }}>
                      {post.emoji}
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem' }}>
                    <div style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      background: `linear-gradient(135deg, ${post.gradient.includes('green') ? '#10b981, #3b82f6' : '#8b5cf6, #3b82f6'})`,
                      color: 'white',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      marginBottom: '12px'
                    }}>
                      {post.category}
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      marginBottom: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar style={{ width: '12px', height: '12px' }} />
                        {post.date}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock style={{ width: '12px', height: '12px' }} />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: 'bold',
                      color: '#111827',
                      marginBottom: '12px',
                      lineHeight: '1.4',
                      transition: 'color 0.2s'
                    }}>
                      <Link to={`/blog/${post.slug}`} style={{
                        textDecoration: 'none',
                        color: 'inherit'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#8b5cf6'}
                      onMouseLeave={(e) => e.target.style.color = '#111827'}
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p style={{
                      color: '#6b7280',
                      marginBottom: '1rem',
                      fontSize: '0.875rem',
                      lineHeight: '1.5',
                      display: '-webkit-box',
                      WebkitLineClamp: '3',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {post.excerpt}
                    </p>

                    <Link
                      to={`/blog/${post.slug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        color: '#8b5cf6',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#7c3aed'}
                      onMouseLeave={(e) => e.target.style.color = '#8b5cf6'}
                    >
                      읽어보기 →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div style={{
          marginTop: '5rem',
          background: 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          color: 'white'
        }}>
          <Timer style={{ width: '64px', height: '64px', margin: '0 auto 1.5rem', color: '#c4b5fd' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>
            더 효율적인 시간 관리를 시작해보세요!
          </h3>
          <p style={{
            color: '#c4b5fd',
            marginBottom: '1.5rem',
            maxWidth: '512px',
            margin: '0 auto 1.5rem'
          }}>
            MemoStopwatch로 생산성을 높이고, 블로그에서 더 많은 팁을 확인하세요.
          </p>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 24px',
              background: 'white',
              color: '#8b5cf6',
              fontWeight: '500',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f3e8ff';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'white';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <Timer style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            스톱워치 사용하기
          </Link>
        </div>

      </div>
    </div>
  );
}