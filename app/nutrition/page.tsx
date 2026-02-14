'use client';

import { useState } from 'react';
import { MobileLayout } from '@/components/layout/mobile-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { calculateMacros } from '@/lib/utils/calculations';
import { mealExamples, foodsToAvoid, eatingOrder } from '@/lib/data/meals';
import type { User } from '@/types';

export default function NutritionPage() {
    const [user] = useLocalStorage<User>('user', {
        weight: 80,
        startDate: new Date().toISOString(),
        currentWeek: 1,
        currentDay: 1,
    });

    const [hydration, setHydration] = useLocalStorage<number>('daily-hydration', 0);
    const [selectedTab, setSelectedTab] = useState<'ftour' | 'suhoor' | 'avoid'>('ftour');

    const macros = calculateMacros(user.weight);

    const ftourMeals = mealExamples.filter(m => m.category === 'ftour-main');
    const snacks = mealExamples.filter(m => m.category === 'snack');
    const suhoorMeals = mealExamples.filter(m => m.category === 'suhoor');
    const rupture = mealExamples.find(m => m.category === 'ftour-rupture');

    return (
        <MobileLayout>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                    Nutrition
                </h1>
                <p className="text-[var(--text-secondary)]">
                    Plan alimentaire stratégique
                </p>
            </div>

            {/* Macro Calculator */}
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Objectifs macros ({user.weight}kg)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <p className="text-sm text-[var(--text-secondary)] mb-1">Protéines</p>
                            <p className="text-2xl font-bold text-[var(--accent)]">
                                {macros.protein.min}-{macros.protein.max}g
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-[var(--text-secondary)] mb-1">Lipides</p>
                            <p className="text-2xl font-bold text-[var(--accent)]">
                                {macros.fats.min}-{macros.fats.max}g
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-[var(--text-secondary)] mb-1">Glucides</p>
                            <p className="text-2xl font-bold text-[var(--accent)]">
                                {macros.carbs.min}-{macros.carbs.max}g
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Hydration Tracker */}
            <Card className="mb-4">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Hydratation</CardTitle>
                        <Icons.Droplet size={20} className="text-[var(--accent)]" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-3xl font-bold text-[var(--text-primary)]">
                                {hydration.toFixed(1)}L
                            </p>
                            <p className="text-sm text-[var(--text-secondary)]">
                                Objectif: 2.5-3L
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setHydration(Math.max(0, hydration - 0.25))}
                                className="w-10 h-10 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] rounded-lg flex items-center justify-center transition-colors"
                            >
                                <Icons.Minus size={20} />
                            </button>
                            <button
                                onClick={() => setHydration(Math.min(5, hydration + 0.25))}
                                className="w-10 h-10 bg-[var(--accent)] hover:bg-[var(--accent-light)] rounded-lg flex items-center justify-center transition-colors"
                            >
                                <Icons.Plus size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className={`flex-1 h-2 rounded-full transition-all ${hydration >= (i + 1) * 0.25
                                    ? 'bg-[var(--accent)]'
                                    : 'bg-[var(--bg-tertiary)]'
                                    }`}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Eating Order Strategy */}
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Ordre alimentaire stratégique</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {eatingOrder.map((order) => (
                            <div key={order.step} className="flex gap-3">
                                <div className="flex-shrink-0 w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center font-bold text-sm">
                                    {order.step}
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-[var(--text-primary)] mb-1">
                                        {order.title}
                                    </p>
                                    <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                                        {order.items.map((item, i) => (
                                            <li key={i}>• {item}</li>
                                        ))}
                                    </ul>
                                    <p className="text-xs text-[var(--text-muted)] mt-1 italic">
                                        {order.timing}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Tab Selector */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setSelectedTab('ftour')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${selectedTab === 'ftour'
                        ? 'bg-[var(--accent)] text-[var(--text-primary)]'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                        }`}
                >
                    Ftour
                </button>
                <button
                    onClick={() => setSelectedTab('suhoor')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${selectedTab === 'suhoor'
                        ? 'bg-[var(--accent)] text-[var(--text-primary)]'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                        }`}
                >
                    Suhoor
                </button>
                <button
                    onClick={() => setSelectedTab('avoid')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${selectedTab === 'avoid'
                        ? 'bg-[var(--accent)] text-[var(--text-primary)]'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                        }`}
                >
                    À éviter
                </button>
            </div>

            {/* Ftour Tab */}
            {selectedTab === 'ftour' && (
                <div className="space-y-4">
                    {/* Rupture */}
                    {rupture && (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Icons.Moon size={20} className="text-[var(--accent)]" />
                                    <CardTitle>{rupture.name}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 mb-4">
                                    {rupture.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                            <span className="text-[var(--accent)] mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                                    <div>
                                        <p className="text-[var(--text-muted)]">Prot</p>
                                        <p className="font-semibold text-[var(--text-primary)]">{rupture.macros.protein}g</p>
                                    </div>
                                    <div>
                                        <p className="text-[var(--text-muted)]">Gluc</p>
                                        <p className="font-semibold text-[var(--text-primary)]">{rupture.macros.carbs}g</p>
                                    </div>
                                    <div>
                                        <p className="text-[var(--text-muted)]">Lip</p>
                                        <p className="font-semibold text-[var(--text-primary)]">{rupture.macros.fats}g</p>
                                    </div>
                                    <div>
                                        <p className="text-[var(--text-muted)]">Cal</p>
                                        <p className="font-semibold text-[var(--accent)]">{rupture.macros.calories}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Main Meals */}
                    {ftourMeals.map((meal, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{meal.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 mb-4">
                                    {meal.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                            <span className="text-[var(--accent)] mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                                    <div>
                                        <p className="text-[var(--text-muted)]">Prot</p>
                                        <p className="font-semibold text-[var(--text-primary)]">{meal.macros.protein}g</p>
                                    </div>
                                    <div>
                                        <p className="text-[var(--text-muted)]">Gluc</p>
                                        <p className="font-semibold text-[var(--text-primary)]">{meal.macros.carbs}g</p>
                                    </div>
                                    <div>
                                        <p className="text-[var(--text-muted)]">Lip</p>
                                        <p className="font-semibold text-[var(--text-primary)]">{meal.macros.fats}g</p>
                                    </div>
                                    <div>
                                        <p className="text-[var(--text-muted)]">Cal</p>
                                        <p className="font-semibold text-[var(--accent)]">{meal.macros.calories}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Snacks */}
                    <div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                            Collations nocturnes
                        </h3>
                        <div className="space-y-3">
                            {snacks.map((snack, index) => (
                                <Card key={index}>
                                    <CardContent className="p-4">
                                        <p className="font-medium text-[var(--text-primary)] mb-2">
                                            {snack.name}
                                        </p>
                                        <ul className="space-y-1 mb-3">
                                            {snack.items.map((item, i) => (
                                                <li key={i} className="text-sm text-[var(--text-secondary)]">
                                                    • {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex gap-4 text-xs">
                                            <span className="text-[var(--text-muted)]">
                                                {snack.macros.protein}g prot
                                            </span>
                                            <span className="text-[var(--text-muted)]">
                                                {snack.macros.carbs}g gluc
                                            </span>
                                            <span className="text-[var(--accent)]">
                                                {snack.macros.calories} cal
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Suhoor Tab */}
            {selectedTab === 'suhoor' && (
                <div className="space-y-4">
                    {suhoorMeals.map((meal, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{meal.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 mb-4">
                                    {meal.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                            <span className="text-[var(--accent)] mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                                    <div>
                                        <p className="text-[var(--text-muted)]">Prot</p>
                                        <p className="font-semibold text-[var(--text-primary)]">{meal.macros.protein}g</p>
                                    </div>
                                    <div>
                                        <p className="text-[var(--text-muted)]">Gluc</p>
                                        <p className="font-semibold text-[var(--text-primary)]">{meal.macros.carbs}g</p>
                                    </div>
                                    <div>
                                        <p className="text-[var(--text-muted)]">Lip</p>
                                        <p className="font-semibold text-[var(--text-primary)]">{meal.macros.fats}g</p>
                                    </div>
                                    <div>
                                        <p className="text-[var(--text-muted)]">Cal</p>
                                        <p className="font-semibold text-[var(--accent)]">{meal.macros.calories}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Avoid Tab */}
            {selectedTab === 'avoid' && (
                <div className="space-y-3">
                    {foodsToAvoid.map((item, index) => (
                        <Card key={index}>
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-[var(--error)] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-[var(--error)] text-xl">×</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-[var(--text-primary)] mb-1">
                                            {item.food}
                                        </p>
                                        <p className="text-sm text-[var(--text-secondary)] mb-1">
                                            <span className="text-[var(--text-muted)]">Raison:</span> {item.reason}
                                        </p>
                                        <p className="text-sm text-[var(--error)] mb-2">
                                            <span className="text-[var(--text-muted)]">Impact:</span> {item.impact}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Icons.ChevronRight size={16} className="text-[var(--success)]" />
                                            <span className="text-[var(--success)]">
                                                Alternative: {item.alternative}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </MobileLayout>
    );
}
