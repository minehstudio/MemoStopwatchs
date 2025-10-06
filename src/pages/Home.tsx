import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Plus, Play, BookOpen } from 'lucide-react';
import StopwatchCard, { Stopwatch } from '../components/StopwatchCard';
import AdBanner from '../components/AdBanner';

const STORAGE_KEY = 'stopwatch-app-data';
const MAX_STOPWATCHES = 5;

export default function Home() {
  const [stopwatches, setStopwatches] = useState<Stopwatch[]>([]);

  // localStorage에서 데이터 로드
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // 실행 중인 스탑워치는 일시정지 상태로 복원
          const restoredStopwatches = parsed.map(sw => ({
            ...sw,
            isRunning: false,
            isPaused: sw.isRunning || sw.isPaused
          }));
          setStopwatches(restoredStopwatches);
        }
      } catch (error) {
        console.error('Failed to load data from localStorage:', error);
      }
    }
  }, []);

  // localStorage에 데이터 저장
  useEffect(() => {
    if (stopwatches.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stopwatches));
    }
  }, [stopwatches]);

  const addStopwatch = () => {
    if (stopwatches.length >= MAX_STOPWATCHES) return;

    const newStopwatch: Stopwatch = {
      id: Date.now().toString(),
      time: 0,
      isRunning: false,
      isPaused: false,
      memo: '',
      lastModified: ''
    };

    setStopwatches(prev => [...prev, newStopwatch]);
  };

  const updateStopwatch = (id: string, updates: Partial<Stopwatch>) => {
    setStopwatches(prev =>
      prev.map(sw =>
        sw.id === id ? { ...sw, ...updates } : sw
      )
    );
  };

  const deleteStopwatch = (id: string) => {
    setStopwatches(prev => prev.filter(sw => sw.id !== id));
  };

  const clearAllData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setStopwatches([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {/* 상단 바 */}
        <header className="mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-full max-w-[728px] relative">
              <div className="text-left" style={{ marginLeft: '8px', marginTop: '13px' }}>
                <Link
                  to="/blog"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 10px',
                    background: 'linear-gradient(to right, #8b5cf6, #3b82f6)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '500',
                    borderRadius: '16px',
                    boxShadow: '0 4px 8px -2px rgba(0, 0, 0, 0.1)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    width: 'fit-content'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 8px 12px -2px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 4px 8px -2px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <BookOpen className="w-3 h-3" />
                  Blog
                </Link>
              </div>

              <div className="text-center pt-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ⏱️ Memo Stopwatch
                </h1>
                <p className="text-sm text-muted-foreground mt-1">Multi Timer with Notes</p>
              </div>
            </div>
          </div>

          {/* 상단 광고 */}
          <div className="flex justify-center">
            <div className="w-full max-w-[728px]">
              <div className="text-left" style={{ marginLeft: '8px' }}>
                <AdBanner size="top" className="hidden md:block" />
                <AdBanner size="card" className="md:hidden" />
              </div>
            </div>
          </div>
        </header>

        <div className="w-full">
          {/* 메인 콘텐츠 */}
          <main className="w-full">
            {/* 버튼 영역 */}
            <div className="flex justify-center mb-6 px-4">
              <div className="w-full max-w-[728px] flex gap-2 justify-start">
                <Button
                  onClick={addStopwatch}
                  disabled={stopwatches.length >= MAX_STOPWATCHES}
                  size="default"
                  className="flex items-center gap-2 min-h-[44px] px-4"
                  title={stopwatches.length >= MAX_STOPWATCHES ? "Maximum 5 stopwatches" : "Add new stopwatch"}
                >
                  <Plus className="w-4 h-4" />
                  New Stopwatch
                </Button>
                {stopwatches.length > 0 && (
                  <Button
                    onClick={clearAllData}
                    variant="outline"
                    size="default"
                    className="min-h-[44px] px-4"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </div>

            {stopwatches.length === 0 ? (
              <div className="text-center py-16">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Manage up to 5 stopwatches simultaneously</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 flex flex-col items-center px-4">
                {stopwatches.map((stopwatch) => (
                  <div key={stopwatch.id} className="w-full max-w-[728px]">
                    <StopwatchCard
                      stopwatch={stopwatch}
                      onUpdate={updateStopwatch}
                      onDelete={deleteStopwatch}
                    />
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>

        {/* 하단 광고 */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex justify-center mb-6">
            <div className="w-full max-w-[728px]">
              <AdBanner size="top" className="hidden md:block" />
              <AdBanner size="card" className="md:hidden" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}