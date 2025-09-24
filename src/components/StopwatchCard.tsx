import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Play, Pause, Square, RotateCcw, X } from 'lucide-react';

export interface Stopwatch {
  id: string;
  time: number;
  isRunning: boolean;
  isPaused: boolean;
  memo: string;
  lastModified: string;
}

interface StopwatchCardProps {
  stopwatch: Stopwatch;
  onUpdate: (id: string, updates: Partial<Stopwatch>) => void;
  onDelete: (id: string) => void;
}

const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((ms % 1000) / 10);
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
};

export default function StopwatchCard({ stopwatch, onUpdate, onDelete }: StopwatchCardProps) {
  const [memo, setMemo] = useState(stopwatch.memo);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (stopwatch.isRunning) {
      startTimeRef.current = Date.now() - (stopwatch.time % 1000);
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const newTime = Math.floor(stopwatch.time / 1000) * 1000 + elapsed;
        onUpdate(stopwatch.id, { time: newTime });
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [stopwatch.isRunning, stopwatch.time, stopwatch.id, onUpdate]);

  const handleStart = () => {
    if (stopwatch.isPaused) {
      onUpdate(stopwatch.id, { isRunning: true, isPaused: false });
    } else {
      onUpdate(stopwatch.id, { isRunning: true, isPaused: false });
    }
  };

  const handlePause = () => {
    onUpdate(stopwatch.id, { isRunning: false, isPaused: true });
  };

  const handleStop = () => {
    onUpdate(stopwatch.id, { isRunning: false, isPaused: false });
  };

  const handleReset = () => {
    onUpdate(stopwatch.id, { 
      time: 0, 
      isRunning: false, 
      isPaused: false 
    });
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMemo = e.target.value.slice(0, 30);
    setMemo(newMemo);
    onUpdate(stopwatch.id, { 
      memo: newMemo,
      lastModified: new Date().toLocaleString('ko-KR')
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="font-mono text-xl sm:text-2xl font-medium text-center sm:text-left">
            {formatTime(stopwatch.time)}
          </div>
          <div className="flex gap-2 justify-center sm:justify-start">
            <Button
              size="default"
              variant="outline"
              onClick={stopwatch.isRunning ? handlePause : handleStart}
              className="w-12 h-12 sm:w-10 sm:h-10 p-0 rounded-lg touch-manipulation"
            >
              {stopwatch.isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              size="default"
              variant="outline"
              onClick={handleStop}
              className="w-12 h-12 sm:w-10 sm:h-10 p-0 rounded-lg touch-manipulation"
            >
              <Square className="w-4 h-4" />
            </Button>
            <Button
              size="default"
              variant="outline"
              onClick={handleReset}
              className="w-12 h-12 sm:w-10 sm:h-10 p-0 rounded-lg touch-manipulation"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Button
          size="default"
          variant="ghost"
          onClick={() => onDelete(stopwatch.id)}
          className="w-10 h-10 sm:w-8 sm:h-8 p-0 text-muted-foreground hover:text-destructive rounded-lg touch-manipulation flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-2">
        <Input
          placeholder="Memo (max 30 characters)"
          value={memo}
          onChange={handleMemoChange}
          maxLength={30}
          className="text-sm border-border"
        />
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground bg-muted px-2 py-1 rounded-md">
            {memo.length}/30
          </span>
          {stopwatch.lastModified && (
            <span className="text-muted-foreground">Modified: {stopwatch.lastModified}</span>
          )}
        </div>
      </div>
    </div>
  );
}