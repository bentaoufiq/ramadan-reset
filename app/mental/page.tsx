'use client';

import { useState, useEffect } from 'react';
import { MobileLayout } from '@/components/layout/mobile-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { getMotivationalMessage } from '@/lib/utils/calculations';
import type { User } from '@/types';

export default function MentalPage() {
    const [user] = useLocalStorage<User>('user', {
        weight: 80,
        startDate: new Date().toISOString(),
        currentWeek: 1,
        currentDay: 1,
    });

    const [streak, setStreak] = useLocalStorage<number>('streak', 0);
    const [timerActive, setTimerActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [weeklyObjectives, setWeeklyObjectives] = useLocalStorage<boolean[]>('weekly-objectives', [
        false, false, false, false, false, false, false
    ]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => time - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setTimerActive(false);
            // Increment streak when timer completes
            setStreak(streak + 1);
        }
        return () => clearInterval(interval);
    }, [timerActive, timeLeft]);

    const startTimer = () => {
        setTimeLeft(300);
        setTimerActive(true);
    };

    const stopTimer = () => {
        setTimerActive(false);
        setTimeLeft(300);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleObjective = (index: number) => {
        const newObjectives = [...weeklyObjectives];
        newObjectives[index] = !newObjectives[index];
        setWeeklyObjectives(newObjectives);
    };

    const completedObjectives = weeklyObjectives.filter(Boolean).length;
    const progressPercentage = (user.currentDay / 28) * 100;

    const objectives = [
        'Routine matin 6/7 jours',
        'Marche post-Ftour 6/7 jours',
        '3 séances entraînement',
        'Mobilité quotidienne 7/7',
        'Hydratation 2.5L+ quotidien',
        'Sommeil 7h+ par nuit',
        '1 activité plaisir'
    ];

    const getMilestoneIcon = (days: number) => {
        if (streak >= days) return '🏆';
        return '🔒';
    };

    return (
        <MobileLayout>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                    Reset Mental
                </h1>
                <p className="text-[var(--text-secondary)]">
                    Discipline et motivation
                </p>
            </div>

            {/* Motivation Message */}
            <Card className="mb-4 bg-gradient-to-br from-[var(--accent-dark)] to-[var(--bg-secondary)]">
                <CardContent className="p-6 text-center">
                    <p className="text-lg text-[var(--text-primary)] font-medium">
                        {getMotivationalMessage(streak, progressPercentage)}
                    </p>
                </CardContent>
            </Card>

            {/* Streak Counter */}
            <Card className="mb-4">
                <CardContent className="p-6">
                    <div className="text-center">
                        <Icons.Flame size={48} className="text-[var(--accent)] mx-auto mb-3" />
                        <p className="text-5xl font-bold text-[var(--text-primary)] mb-2">
                            {streak}
                        </p>
                        <p className="text-lg text-[var(--text-secondary)]">
                            Jours de suite
                        </p>
                    </div>

                    {/* Milestones */}
                    <div className="mt-6 grid grid-cols-4 gap-3">
                        {[7, 14, 21, 28].map((milestone) => (
                            <div
                                key={milestone}
                                className={`text-center p-3 rounded-lg ${streak >= milestone
                                        ? 'bg-[var(--accent)] bg-opacity-20 border border-[var(--accent)]'
                                        : 'bg-[var(--bg-tertiary)]'
                                    }`}
                            >
                                <div className="text-2xl mb-1">{getMilestoneIcon(milestone)}</div>
                                <p className={`text-xs font-semibold ${streak >= milestone ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
                                    }`}>
                                    {milestone}j
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* 5-Minute Rule Timer */}
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Règle des 5 minutes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center mb-4">
                        <div className="text-6xl font-bold text-[var(--accent)] mb-4">
                            {formatTime(timeLeft)}
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] mb-6">
                            Engagement minimal → Momentum garanti
                        </p>
                        {!timerActive ? (
                            <Button
                                variant="primary"
                                className="w-full"
                                onClick={startTimer}
                            >
                                <Icons.Play size={20} />
                                Commencer maintenant
                            </Button>
                        ) : (
                            <Button
                                variant="secondary"
                                className="w-full"
                                onClick={stopTimer}
                            >
                                Arrêter
                            </Button>
                        )}
                    </div>
                    <div className="bg-[var(--bg-tertiary)] p-4 rounded-lg">
                        <p className="text-sm text-[var(--text-secondary)]">
                            <strong className="text-[var(--text-primary)]">Principe:</strong> Après 5 min de mouvement,
                            80% de chances de continuer. Le démarrage est la partie la plus dure.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Weekly Objectives */}
            <Card className="mb-4">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Objectifs Semaine {user.currentWeek}</CardTitle>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-[var(--accent)]">
                                {completedObjectives}/{objectives.length}
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 mb-4">
                        {objectives.map((objective, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${weeklyObjectives[index]
                                        ? 'bg-[var(--accent-dark)] border border-[var(--accent)]'
                                        : 'bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)]'
                                    }`}
                                onClick={() => toggleObjective(index)}
                            >
                                <div
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${weeklyObjectives[index]
                                            ? 'border-[var(--success)] bg-[var(--success)]'
                                            : 'border-[var(--text-muted)]'
                                        }`}
                                >
                                    {weeklyObjectives[index] && <Icons.Check size={16} />}
                                </div>
                                <p className="text-sm font-medium text-[var(--text-primary)]">
                                    {objective}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[var(--accent)] transition-all duration-500"
                            style={{ width: `${(completedObjectives / objectives.length) * 100}%` }}
                        />
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] text-center mt-2">
                        {Math.round((completedObjectives / objectives.length) * 100)}% complété
                    </p>
                </CardContent>
            </Card>

            {/* Anti-Canapé Strategies */}
            <Card>
                <CardHeader>
                    <CardTitle>Stratégies anti-canapé</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 bg-[var(--accent)] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-[var(--accent)] font-bold">1</span>
                            </div>
                            <div>
                                <p className="font-semibold text-[var(--text-primary)] mb-1">
                                    Friction inverse
                                </p>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Retirer coussins canapé • Tapis yoga déroulé • Chaussures à l'entrée
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="w-8 h-8 bg-[var(--accent)] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-[var(--accent)] font-bold">2</span>
                            </div>
                            <div>
                                <p className="font-semibold text-[var(--text-primary)] mb-1">
                                    Bundling dopamine
                                </p>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Podcast préféré → Uniquement pendant marche • Série → Après 10 min mobilité
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="w-8 h-8 bg-[var(--accent)] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-[var(--accent)] font-bold">3</span>
                            </div>
                            <div>
                                <p className="font-semibold text-[var(--text-primary)] mb-1">
                                    Identité shift
                                </p>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    "Je suis quelqu'un qui bouge" vs "Je dois m'entraîner"
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="w-8 h-8 bg-[var(--accent)] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-[var(--accent)] font-bold">4</span>
                            </div>
                            <div>
                                <p className="font-semibold text-[var(--text-primary)] mb-1">
                                    Accountability externe
                                </p>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Partenaire entraînement • Groupe WhatsApp check-in • Pari financier
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </MobileLayout>
    );
}
