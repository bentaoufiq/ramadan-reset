'use client';

import { useState, useEffect } from 'react';
import { MobileLayout } from '@/components/layout/mobile-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Icons } from '@/components/ui/icons';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { calculateProgress, getMotivationalMessage } from '@/lib/utils/calculations';
import type { DailyMetrics, User } from '@/types';

export default function DashboardPage() {
  const [user, setUser] = useLocalStorage<User>('user', {
    weight: 80,
    startDate: new Date().toISOString(),
    currentWeek: 1,
    currentDay: 1,
  });

  const [todayMetrics, setTodayMetrics] = useLocalStorage<DailyMetrics>('today-metrics', {
    date: new Date().toISOString().split('T')[0],
    steps: 0,
    hydration: 0,
    energy: 7,
    sleep: 7,
    libido: 7,
    motivation: 7,
    workoutCompleted: false,
    mobilityCompleted: false,
    walkCompleted: false,
  });

  const [streak, setStreak] = useLocalStorage<number>('streak', 0);

  // Calculate current progress
  useEffect(() => {
    const progress = calculateProgress(user.startDate);
    if (progress.week !== user.currentWeek || progress.day !== user.currentDay) {
      setUser({ ...user, currentWeek: progress.week, currentDay: progress.day });
    }
  }, []);

  const updateSteps = (delta: number) => {
    setTodayMetrics({ ...todayMetrics, steps: Math.max(0, todayMetrics.steps + delta) });
  };

  const updateHydration = (delta: number) => {
    setTodayMetrics({
      ...todayMetrics,
      hydration: Math.max(0, Math.min(3, todayMetrics.hydration + delta))
    });
  };

  const progressPercentage = (user.currentDay / 28) * 100;

  return (
    <MobileLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
          Ramadan Reset
        </h1>
        <p className="text-[var(--text-secondary)]">
          {getMotivationalMessage(streak, progressPercentage)}
        </p>
      </div>

      {/* Week/Day Progress */}
      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Semaine {user.currentWeek} • Jour {user.currentDay}</CardTitle>
            <Icons.Moon size={24} className="text-[var(--accent)]" />
          </div>
        </CardHeader>
        <CardContent>
          <ProgressBar value={user.currentDay} max={28} />
          <p className="text-sm text-[var(--text-muted)] mt-2">
            {28 - user.currentDay} jours restants
          </p>
        </CardContent>
      </Card>

      {/* Today's Workout */}
      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Séance du jour</CardTitle>
            {todayMetrics.workoutCompleted && (
              <Icons.Check size={20} className="text-[var(--success)]" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[var(--text-primary)] font-medium">
                Circuit métabolique S{user.currentWeek}
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                20-30 min • {user.currentWeek <= 2 ? '3 tours' : '4 tours'}
              </p>
            </div>
            <Icons.Dumbbell size={32} className="text-[var(--accent)]" />
          </div>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => window.location.href = '/training'}
          >
            <Icons.Play size={20} />
            Lancer l'entraînement
          </Button>
        </CardContent>
      </Card>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Steps Counter */}
        <Card hover={false}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[var(--text-secondary)]">Pas</span>
              <Icons.Flame size={16} className="text-[var(--accent)]" />
            </div>
            <div className="text-2xl font-bold text-[var(--text-primary)] mb-3">
              {todayMetrics.steps.toLocaleString()}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateSteps(-100)}
                className="flex-1 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] rounded-lg p-2 transition-colors"
              >
                <Icons.Minus size={16} className="mx-auto" />
              </button>
              <button
                onClick={() => updateSteps(100)}
                className="flex-1 bg-[var(--accent)] hover:bg-[var(--accent-light)] rounded-lg p-2 transition-colors"
              >
                <Icons.Plus size={16} className="mx-auto" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Hydration */}
        <Card hover={false}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[var(--text-secondary)]">Hydratation</span>
              <Icons.Droplet size={16} className="text-[var(--accent)]" />
            </div>
            <div className="text-2xl font-bold text-[var(--text-primary)] mb-3">
              {todayMetrics.hydration.toFixed(1)}L
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateHydration(-0.25)}
                className="flex-1 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] rounded-lg p-2 transition-colors"
              >
                <Icons.Minus size={16} className="mx-auto" />
              </button>
              <button
                onClick={() => updateHydration(0.25)}
                className="flex-1 bg-[var(--accent)] hover:bg-[var(--accent-light)] rounded-lg p-2 transition-colors"
              >
                <Icons.Plus size={16} className="mx-auto" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reminders */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Rappels du jour</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${todayMetrics.mobilityCompleted
                ? 'bg-[var(--accent-dark)] border border-[var(--accent)]'
                : 'bg-[var(--bg-tertiary)]'
              }`}
            onClick={() => setTodayMetrics({ ...todayMetrics, mobilityCompleted: !todayMetrics.mobilityCompleted })}
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${todayMetrics.mobilityCompleted
                ? 'border-[var(--success)] bg-[var(--success)]'
                : 'border-[var(--text-muted)]'
              }`}>
              {todayMetrics.mobilityCompleted && <Icons.Check size={16} />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Mobilité quotidienne
              </p>
              <p className="text-xs text-[var(--text-secondary)]">5-10 min</p>
            </div>
          </div>

          <div
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${todayMetrics.walkCompleted
                ? 'bg-[var(--accent-dark)] border border-[var(--accent)]'
                : 'bg-[var(--bg-tertiary)]'
              }`}
            onClick={() => setTodayMetrics({ ...todayMetrics, walkCompleted: !todayMetrics.walkCompleted })}
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${todayMetrics.walkCompleted
                ? 'border-[var(--success)] bg-[var(--success)]'
                : 'border-[var(--text-muted)]'
              }`}>
              {todayMetrics.walkCompleted && <Icons.Check size={16} />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Marche post-Ftour
              </p>
              <p className="text-xs text-[var(--text-secondary)]">10-15 min</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Energy Quick Check */}
      <Card>
        <CardHeader>
          <CardTitle>Énergie du jour</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-2 py-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
              <button
                key={level}
                onClick={() => setTodayMetrics({ ...todayMetrics, energy: level })}
                className={`w-8 h-8 rounded-full transition-all ${todayMetrics.energy >= level
                    ? 'bg-[var(--accent)] scale-110'
                    : 'bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)]'
                  }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-[var(--text-secondary)]">
            Niveau: {todayMetrics.energy}/10
          </p>
        </CardContent>
      </Card>
    </MobileLayout>
  );
}
