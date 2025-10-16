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

        {/* SEO Content Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-gray max-w-none">

              {/* Introduction Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About MemoStopwatch - Free Online Multi Timer with Notes</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  MemoStopwatch is a free online stopwatch tool that helps you manage multiple timers simultaneously while adding notes to each one.
                  Whether you're a student studying for exams, a professional managing projects, a freelancer tracking billable hours,
                  or an athlete timing your workouts, our intuitive multi-timer interface makes time tracking effortless.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Unlike traditional stopwatches, MemoStopwatch allows you to run up to 5 independent timers at once, each with its own 30-character memo field.
                  This unique feature lets you track different activities, tasks, or exercises simultaneously without losing context.
                  All your data is automatically saved in your browser, so you never lose your progress.
                </p>
              </section>

              {/* How to Use Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use MemoStopwatch</h2>
                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                  <ol className="space-y-4 text-gray-700">
                    <li className="flex">
                      <span className="font-bold text-purple-600 mr-3">1.</span>
                      <span>Click the "New Stopwatch" button to create your first timer. You can create up to 5 stopwatches simultaneously.</span>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-purple-600 mr-3">2.</span>
                      <span>Press the play button to start timing your activity. The timer will begin counting up from zero.</span>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-purple-600 mr-3">3.</span>
                      <span>Add a note in the memo field (up to 30 characters) to describe what you're timing - for example, "Study Session", "Client Call", or "HIIT Workout".</span>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-purple-600 mr-3">4.</span>
                      <span>Use the pause button to temporarily stop the timer, and resume whenever you're ready to continue.</span>
                    </li>
                    <li className="flex">
                      <span className="font-bold text-purple-600 mr-3">5.</span>
                      <span>Click the reset button to return the timer to zero, or delete the stopwatch entirely if you're finished with it.</span>
                    </li>
                  </ol>
                </div>
                <p className="text-gray-700">
                  All your stopwatches are automatically saved in your browser's local storage, so you can close the page and return later without losing your data.
                  This makes MemoStopwatch perfect for tracking long-term projects or recurring activities.
                </p>
              </section>

              {/* Use Cases Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Perfect For Every Time-Tracking Need</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-3">For Students & Learning</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Track study sessions for different subjects simultaneously</li>
                      <li>• Use the Pomodoro technique with multiple timers</li>
                      <li>• Time practice exams and quiz preparations</li>
                      <li>• Monitor focus time and break duration</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-purple-900 mb-3">For Work & Productivity</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Track billable hours for different clients or projects</li>
                      <li>• Manage multiple tasks with time boxing technique</li>
                      <li>• Monitor meeting durations and break times</li>
                      <li>• Measure time spent on specific workflow stages</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-green-900 mb-3">For Fitness & Sports</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Time HIIT workout intervals and rest periods</li>
                      <li>• Track multiple exercise sets at the gym</li>
                      <li>• Monitor running, cycling, or swimming segments</li>
                      <li>• Manage circuit training rotations</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-orange-900 mb-3">For Daily Life</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Time cooking or baking multiple dishes</li>
                      <li>• Track meditation or mindfulness sessions</li>
                      <li>• Monitor children's screen time or activity duration</li>
                      <li>• Manage household chores and tasks</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Features Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                  <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span><strong>Multiple Timers:</strong> Run up to 5 stopwatches simultaneously</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span><strong>Memo Function:</strong> Add 30-character notes to each timer</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span><strong>Auto-Save:</strong> Data persists in your browser automatically</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span><strong>No Login Required:</strong> Start using immediately, no account needed</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span><strong>100% Free:</strong> All features available at no cost</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span><strong>Mobile Friendly:</strong> Works perfectly on all devices</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span><strong>Clean Interface:</strong> Minimalist design for distraction-free timing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span><strong>Privacy First:</strong> All data stays in your browser, nothing sent to servers</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-bold text-gray-900 mb-2">Is MemoStopwatch really free?</h3>
                    <p className="text-gray-700">Yes, MemoStopwatch is completely free to use. All features are available without any subscription or payment required. We display ads to keep the service free for everyone.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-gray-900 mb-2">Do I need to create an account?</h3>
                    <p className="text-gray-700">No account is required. MemoStopwatch works immediately without any login or registration. Your data is saved automatically in your browser's local storage.</p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-bold text-gray-900 mb-2">How many stopwatches can I use at once?</h3>
                    <p className="text-gray-700">You can create and run up to 5 stopwatches simultaneously. This allows you to track multiple activities, tasks, or projects at the same time.</p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h3 className="font-bold text-gray-900 mb-2">Will my timers be saved if I close the browser?</h3>
                    <p className="text-gray-700">Yes, all your stopwatch data is automatically saved in your browser's local storage. When you return to the site, your timers will be restored. However, running timers will be paused for accuracy.</p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="font-bold text-gray-900 mb-2">Can I use this on my phone or tablet?</h3>
                    <p className="text-gray-700">Absolutely! MemoStopwatch is fully responsive and works perfectly on smartphones, tablets, and desktop computers. The interface adapts to your screen size for optimal usability.</p>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-4">
                    <h3 className="font-bold text-gray-900 mb-2">What happens to my data? Is it private?</h3>
                    <p className="text-gray-700">Your privacy is important to us. All stopwatch data is stored locally in your browser only. Nothing is sent to our servers or any third parties. Your timing data never leaves your device.</p>
                  </div>

                  <div className="border-l-4 border-pink-500 pl-4">
                    <h3 className="font-bold text-gray-900 mb-2">Can I export or share my timer data?</h3>
                    <p className="text-gray-700">Currently, MemoStopwatch focuses on real-time tracking. The memo feature allows you to note what each timer is for, which you can manually record or screenshot as needed.</p>
                  </div>
                </div>
              </section>

              {/* Tips Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Time Management Tips</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">Get the most out of MemoStopwatch with these productivity techniques:</p>

                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h4 className="font-bold text-purple-900 mb-2">The Pomodoro Technique</h4>
                      <p>Use one stopwatch for 25-minute focused work sessions, and another for 5-minute breaks. After four pomodoros, take a longer 15-30 minute break. This technique helps maintain high concentration and prevents burnout.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Time Boxing</h4>
                      <p>Assign specific time blocks to different tasks or projects. Create separate stopwatches for each task and work on them for predetermined durations. This prevents tasks from expanding beyond their allocated time.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-green-900 mb-2">Task Batching</h4>
                      <p>Group similar activities together and time them collectively. For example, use one stopwatch for all email responses, another for creative work, and a third for administrative tasks. This reduces context switching and improves efficiency.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-orange-900 mb-2">Progress Tracking</h4>
                      <p>Monitor how long tasks actually take versus how long you think they should take. Use the memo field to label tasks, then compare actual times to improve future planning and estimation accuracy.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Closing Section */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Tracking Your Time More Effectively Today</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Whether you want to boost productivity, improve time awareness, track work hours, or optimize your workout routine,
                  MemoStopwatch provides the simple yet powerful tools you need. No complicated features to learn, no expensive subscriptions to buy -
                  just clean, effective time tracking that works.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Join thousands of students, professionals, freelancers, and fitness enthusiasts who use MemoStopwatch daily to manage their time better.
                  Create your first stopwatch above and experience the difference that proper time tracking can make in your daily routine.
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}