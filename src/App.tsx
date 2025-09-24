import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Plus, Play } from 'lucide-react';
import StopwatchCard, { Stopwatch } from './components/StopwatchCard';
import AdBanner from './components/AdBanner';

const STORAGE_KEY = 'stopwatch-app-data';
const MAX_STOPWATCHES = 5;

export default function App() {
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
          <div className="flex flex-col gap-4 mb-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ⏱️ Memo Stopwatch
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Multi Timer with Notes</p>
            </div>
          </div>
          
          {/* 상단 광고 */}
          <div className="flex justify-center">
            <div className="w-full max-w-[728px]">
              <AdBanner size="top" className="hidden md:block" />
              <AdBanner size="card" className="md:hidden" />
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
                {stopwatches.map((stopwatch, index) => (
                  <React.Fragment key={stopwatch.id}>
                    <div className="w-full max-w-[728px]">
                      <StopwatchCard
                        stopwatch={stopwatch}
                        onUpdate={updateStopwatch}
                        onDelete={deleteStopwatch}
                      />
                    </div>
                    {/* 카드 간 광고 (2번째와 4번째 카드 뒤) */}
                    {(index === 1 || index === 3) && (
                      <div className="w-full max-w-[728px]">
                        <AdBanner size="top" className="hidden md:block" />
                        <AdBanner size="card" className="md:hidden" />
                      </div>
                    )}
                  </React.Fragment>
                ))}


              </div>
            )}
          </main>
        </div>

        {/* 하단 광고 */}
        <footer className="mt-12 pt-8 border-t border-border">
          <div className="flex justify-center mb-6">
            <div className="w-full max-w-[728px]">
              <AdBanner size="top" className="hidden md:block" />
              <AdBanner size="card" className="md:hidden" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              © 2024 Memo Stopwatch - Simple & Fast Multi Timer with Notes
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}