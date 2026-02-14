'use client';

import { useState } from 'react';
import { MobileLayout } from '@/components/layout/mobile-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MetricSlider } from '@/components/ui/metric-slider';
import { Icons } from '@/components/ui/icons';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { analyzeProgress } from '@/lib/utils/calculations';
import type { WeeklyMetrics, User } from '@/types';

export default function ProgressPage() {
    const [user] = useLocalStorage<User>('user', {
        weight: 80,
        startDate: new Date().toISOString(),
        currentWeek: 1,
        currentDay: 1,
    });

    const [weeklyMetrics, setWeeklyMetrics] = useLocalStorage<WeeklyMetrics[]>('weekly-metrics', []);
    const [currentMetrics, setCurrentMetrics] = useState<Partial<WeeklyMetrics>>({
        week: user.currentWeek,
        waistMeasurement: 0,
        weight: user.weight,
        averageEnergy: 7,
        averageSleep: 7,
        averageLibido: 7,
        averageMotivation: 7,
    });

    const saveWeeklyMetrics = () => {
        const existing = weeklyMetrics.find(m => m.week === user.currentWeek);
        if (existing) {
            setWeeklyMetrics(weeklyMetrics.map(m =>
                m.week === user.currentWeek ? currentMetrics as WeeklyMetrics : m
            ));
        } else {
            setWeeklyMetrics([...weeklyMetrics, currentMetrics as WeeklyMetrics]);
        }
    };

    const recommendation = analyzeProgress({
        energy: currentMetrics.averageEnergy || 7,
        sleep: currentMetrics.averageSleep || 7,
        motivation: currentMetrics.averageMotivation || 7,
        recovery: true,
    });

    const getRecommendationColor = () => {
        if (recommendation === 'increase') return 'var(--success)';
        if (recommendation === 'reduce') return 'var(--error)';
        return 'var(--warning)';
    };

    const getRecommendationText = () => {
        if (recommendation === 'increase') return '✅ Augmenter l\'intensité';
        if (recommendation === 'reduce') return '⚠️ Réduire l\'intensité';
        return '➡️ Maintenir';
    };

    const baselineWaist = weeklyMetrics.find(m => m.week === 1)?.waistMeasurement || 0;
    const waistChange = currentMetrics.waistMeasurement && baselineWaist
        ? currentMetrics.waistMeasurement - baselineWaist
        : 0;

    return (
        <MobileLayout>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                    Progression
                </h1>
                <p className="text-[var(--text-secondary)]">
                    Semaine {user.currentWeek} • Suivi et analyse
                </p>
            </div>

            {/* Smart Recommendation */}
            <Card className="mb-4" style={{ borderColor: getRecommendationColor() }}>
                <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${getRecommendationColor()}20` }}
                        >
                            <Icons.TrendingUp size={24} style={{ color: getRecommendationColor() }} />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-[var(--text-primary)] mb-1">
                                Recommandation
                            </p>
                            <p className="text-lg font-bold" style={{ color: getRecommendationColor() }}>
                                {getRecommendationText()}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Waist Measurement */}
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Tour de taille</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <input
                                type="number"
                                value={currentMetrics.waistMeasurement || ''}
                                onChange={(e) => setCurrentMetrics({
                                    ...currentMetrics,
                                    waistMeasurement: parseFloat(e.target.value) || 0
                                })}
                                placeholder="Ex: 95"
                                className="text-3xl font-bold bg-transparent border-b-2 border-[var(--accent)] text-[var(--text-primary)] w-24 outline-none"
                            />
                            <span className="text-xl text-[var(--text-secondary)] ml-2">cm</span>
                        </div>
                        {waistChange !== 0 && (
                            <div className={`text-right ${waistChange < 0 ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
                                <p className="text-2xl font-bold">
                                    {waistChange > 0 ? '+' : ''}{waistChange.toFixed(1)} cm
                                </p>
                                <p className="text-sm">vs Semaine 1</p>
                            </div>
                        )}
                    </div>
                    {baselineWaist > 0 && (
                        <div className="bg-[var(--bg-tertiary)] p-3 rounded-lg">
                            <p className="text-sm text-[var(--text-secondary)]">
                                Objectif 4 semaines: -2 à -4 cm
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Weight (Optional) */}
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Poids (optionnel)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <input
                            type="number"
                            step="0.1"
                            value={currentMetrics.weight || ''}
                            onChange={(e) => setCurrentMetrics({
                                ...currentMetrics,
                                weight: parseFloat(e.target.value) || 0
                            })}
                            placeholder="Ex: 80.5"
                            className="text-2xl font-bold bg-transparent border-b-2 border-[var(--accent)] text-[var(--text-primary)] w-24 outline-none"
                        />
                        <span className="text-lg text-[var(--text-secondary)]">kg</span>
                    </div>
                </CardContent>
            </Card>

            {/* Weekly Metrics */}
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Métriques hebdomadaires</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <MetricSlider
                        label="Énergie moyenne"
                        value={currentMetrics.averageEnergy || 7}
                        onChange={(val) => setCurrentMetrics({ ...currentMetrics, averageEnergy: val })}
                    />
                    <MetricSlider
                        label="Qualité sommeil"
                        value={currentMetrics.averageSleep || 7}
                        onChange={(val) => setCurrentMetrics({ ...currentMetrics, averageSleep: val })}
                    />
                    <MetricSlider
                        label="Libido"
                        value={currentMetrics.averageLibido || 7}
                        onChange={(val) => setCurrentMetrics({ ...currentMetrics, averageLibido: val })}
                    />
                    <MetricSlider
                        label="Motivation"
                        value={currentMetrics.averageMotivation || 7}
                        onChange={(val) => setCurrentMetrics({ ...currentMetrics, averageMotivation: val })}
                    />
                </CardContent>
            </Card>

            {/* Save Button */}
            <button
                onClick={saveWeeklyMetrics}
                className="w-full btn btn-primary mb-4"
            >
                <Icons.Check size={20} />
                Sauvegarder la semaine {user.currentWeek}
            </button>

            {/* Historical Data */}
            {weeklyMetrics.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Historique</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {weeklyMetrics.sort((a, b) => b.week - a.week).map((metric) => (
                                <div
                                    key={metric.week}
                                    className="p-3 bg-[var(--bg-tertiary)] rounded-lg"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-semibold text-[var(--text-primary)]">
                                            Semaine {metric.week}
                                        </p>
                                        <p className="text-sm text-[var(--accent)]">
                                            {metric.waistMeasurement} cm
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2 text-xs text-center">
                                        <div>
                                            <p className="text-[var(--text-muted)]">Énergie</p>
                                            <p className="font-semibold text-[var(--text-primary)]">
                                                {metric.averageEnergy}/10
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[var(--text-muted)]">Sommeil</p>
                                            <p className="font-semibold text-[var(--text-primary)]">
                                                {metric.averageSleep}/10
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[var(--text-muted)]">Libido</p>
                                            <p className="font-semibold text-[var(--text-primary)]">
                                                {metric.averageLibido}/10
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[var(--text-muted)]">Motiv</p>
                                            <p className="font-semibold text-[var(--text-primary)]">
                                                {metric.averageMotivation}/10
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </MobileLayout>
    );
}
