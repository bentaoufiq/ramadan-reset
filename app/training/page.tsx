'use client';

import { useState } from 'react';
import { MobileLayout } from '@/components/layout/mobile-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { getWorkoutForWeek } from '@/lib/data/workouts';
import type { User } from '@/types';

type EquipmentMode = 'bodyweight' | 'dumbbells' | 'gym';

export default function TrainingPage() {
    const [user] = useLocalStorage<User>('user', {
        weight: 80,
        startDate: new Date().toISOString(),
        currentWeek: 1,
        currentDay: 1,
    });

    const [selectedWeek, setSelectedWeek] = useState(user.currentWeek);
    const [equipmentMode, setEquipmentMode] = useState<EquipmentMode>('bodyweight');
    const [fatigueMode, setFatigueMode] = useState(false);
    const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
    const [completedExercises, setCompletedExercises] = useLocalStorage<string[]>('completed-exercises', []);

    const workout = getWorkoutForWeek(selectedWeek);

    if (!workout) {
        return (
            <MobileLayout>
                <div className="text-center py-12">
                    <p className="text-[var(--text-secondary)]">Aucun entraînement trouvé pour cette semaine</p>
                </div>
            </MobileLayout>
        );
    }

    const toggleExerciseComplete = (exerciseId: string) => {
        if (completedExercises.includes(exerciseId)) {
            setCompletedExercises(completedExercises.filter(id => id !== exerciseId));
        } else {
            setCompletedExercises([...completedExercises, exerciseId]);
        }
    };

    const getSetsReps = (sets: number, reps: string) => {
        if (fatigueMode) {
            return `${Math.max(2, sets - 1)} × ${reps}`;
        }
        return `${sets} × ${reps}`;
    };

    return (
        <MobileLayout>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                    Entraînement
                </h1>
                <p className="text-[var(--text-secondary)]">
                    {workout.duration} min • {workout.exercises.length} exercices
                </p>
            </div>

            {/* Week Selector */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {[1, 2, 3, 4].map((week) => (
                    <button
                        key={week}
                        onClick={() => setSelectedWeek(week)}
                        className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${selectedWeek === week
                                ? 'bg-[var(--accent)] text-[var(--text-primary)]'
                                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                            }`}
                    >
                        Semaine {week}
                    </button>
                ))}
            </div>

            {/* Equipment Mode Selector */}
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Équipement</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                        <button
                            onClick={() => setEquipmentMode('bodyweight')}
                            className={`p-3 rounded-lg font-medium transition-all ${equipmentMode === 'bodyweight'
                                    ? 'bg-[var(--accent)] text-[var(--text-primary)]'
                                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                                }`}
                        >
                            Poids du corps
                        </button>
                        <button
                            onClick={() => setEquipmentMode('dumbbells')}
                            className={`p-3 rounded-lg font-medium transition-all ${equipmentMode === 'dumbbells'
                                    ? 'bg-[var(--accent)] text-[var(--text-primary)]'
                                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                                }`}
                        >
                            Haltères
                        </button>
                        <button
                            onClick={() => setEquipmentMode('gym')}
                            className={`p-3 rounded-lg font-medium transition-all ${equipmentMode === 'gym'
                                    ? 'bg-[var(--accent)] text-[var(--text-primary)]'
                                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                                }`}
                        >
                            Gym
                        </button>
                    </div>
                </CardContent>
            </Card>

            {/* Fatigue Mode Toggle */}
            <Card className="mb-4">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-[var(--text-primary)]">Mode fatigue</p>
                            <p className="text-sm text-[var(--text-secondary)]">Réduit l'intensité de 50%</p>
                        </div>
                        <button
                            onClick={() => setFatigueMode(!fatigueMode)}
                            className={`w-14 h-8 rounded-full transition-all ${fatigueMode ? 'bg-[var(--warning)]' : 'bg-[var(--bg-tertiary)]'
                                }`}
                        >
                            <div
                                className={`w-6 h-6 bg-white rounded-full transition-transform ${fatigueMode ? 'translate-x-7' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>
                </CardContent>
            </Card>

            {/* Warmup */}
            <Card className="mb-4">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Icons.Timer size={20} className="text-[var(--accent)]" />
                        <CardTitle>Échauffement (5 min)</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {workout.warmup.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                <span className="text-[var(--accent)] mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Exercises */}
            <div className="space-y-3 mb-4">
                {workout.exercises.map((exercise, index) => {
                    const isExpanded = expandedExercise === exercise.id;
                    const isCompleted = completedExercises.includes(exercise.id);

                    return (
                        <Card key={exercise.id} className={isCompleted ? 'border-[var(--success)]' : ''}>
                            <CardContent className="p-4">
                                <div
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => setExpandedExercise(isExpanded ? null : exercise.id)}
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-bold text-[var(--accent)]">#{index + 1}</span>
                                            <h3 className="font-semibold text-[var(--text-primary)]">
                                                {exercise.variations[equipmentMode]}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-[var(--text-secondary)]">
                                            {getSetsReps(exercise.sets, exercise.reps)} • Tempo {exercise.tempo} • Repos {exercise.rest}s
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleExerciseComplete(exercise.id);
                                            }}
                                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isCompleted
                                                    ? 'bg-[var(--success)] border-[var(--success)]'
                                                    : 'border-[var(--text-muted)]'
                                                }`}
                                        >
                                            {isCompleted && <Icons.Check size={16} />}
                                        </button>
                                        <Icons.ChevronRight
                                            size={20}
                                            className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                        />
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="mt-4 pt-4 border-t border-[var(--border)] animate-fade-in">
                                        <div className="mb-3">
                                            <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                                                Muscles ciblés
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {exercise.muscleGroups.map((muscle) => (
                                                    <span
                                                        key={muscle}
                                                        className="px-2 py-1 bg-[var(--accent-dark)] text-xs rounded-full text-[var(--text-primary)]"
                                                    >
                                                        {muscle}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                                                Technique
                                            </p>
                                            <p className="text-sm text-[var(--text-secondary)]">
                                                {exercise.description}
                                            </p>
                                        </div>
                                        <div className="bg-[var(--bg-tertiary)] p-3 rounded-lg">
                                            <p className="text-xs text-[var(--text-muted)] mb-1">Tempo expliqué:</p>
                                            <p className="text-sm text-[var(--text-secondary)]">
                                                {exercise.tempo === 'Statique'
                                                    ? 'Maintenir la position sans bouger'
                                                    : `${exercise.tempo.split('-')[0]}s descente • ${exercise.tempo.split('-')[1]}s pause • ${exercise.tempo.split('-')[2]}s montée`
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Cooldown */}
            <Card className="mb-4">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Icons.Moon size={20} className="text-[var(--accent)]" />
                        <CardTitle>Retour au calme (5 min)</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {workout.cooldown.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                <span className="text-[var(--accent)] mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Completion Summary */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[var(--text-secondary)]">Progression</p>
                            <p className="text-2xl font-bold text-[var(--text-primary)]">
                                {completedExercises.length}/{workout.exercises.length}
                            </p>
                        </div>
                        <div className="w-16 h-16 rounded-full border-4 border-[var(--accent)] flex items-center justify-center">
                            <span className="text-lg font-bold text-[var(--accent)]">
                                {Math.round((completedExercises.length / workout.exercises.length) * 100)}%
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </MobileLayout>
    );
}
