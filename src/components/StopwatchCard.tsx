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
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-sm">
      <div className="flex items-center justify-between mb-1.5">
        <div className="font-mono text-lg sm:text-xl font-medium">
          {formatTime(stopwatch.time)}
        </div>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={stopwatch.isRunning ? handlePause : handleStart}
            className="w-8 h-8 p-0 rounded touch-manipulation"
          >
            {stopwatch.isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleStop}
            className="w-8 h-8 p-0 rounded touch-manipulation"
          >
            <Square className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleReset}
            className="w-8 h-8 p-0 rounded touch-manipulation"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(stopwatch.id)}
            className="w-8 h-8 p-0 text-muted-foreground hover:text-destructive rounded touch-manipulation"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="space-y-1">
        <Input
          placeholder="Memo (max 30 characters)"
          value={memo}
          onChange={handleMemoChange}
          maxLength={30}
          className="text-sm border-border h-8"
        />
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground px-1">
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