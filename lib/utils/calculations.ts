/**
 * Calculate macronutrient targets based on user weight
 */
export function calculateMacros(weightKg: number) {
    return {
        protein: {
            min: Math.round(weightKg * 2.0),
            max: Math.round(weightKg * 2.2),
            unit: 'g'
        },
        fats: {
            min: Math.round(weightKg * 0.8),
            max: Math.round(weightKg * 1.0),
            unit: 'g'
        },
        carbs: {
            min: Math.round(weightKg * 1.5),
            max: Math.round(weightKg * 2.0),
            unit: 'g'
        }
    };
}

/**
 * Calculate current week and day based on start date
 */
export function calculateProgress(startDate: string): { week: number; day: number } {
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const week = Math.min(Math.ceil(diffDays / 7), 4);
    const day = diffDays;

    return { week, day };
}

/**
 * Analyze metrics and provide recommendation
 */
export function analyzeProgress(metrics: {
    energy: number;
    sleep: number;
    motivation: number;
    recovery: boolean;
}): 'increase' | 'maintain' | 'reduce' {
    let greenSignals = 0;
    let redSignals = 0;

    // Green signals
    if (metrics.recovery) greenSignals++;
    if (metrics.energy >= 8) greenSignals++;
    if (metrics.sleep >= 7) greenSignals++;
    if (metrics.motivation >= 7) greenSignals++;

    // Red signals
    if (metrics.energy < 6) redSignals++;
    if (metrics.sleep < 6) redSignals++;
    if (metrics.motivation < 5) redSignals++;

    if (greenSignals >= 3) return 'increase';
    if (redSignals >= 2) return 'reduce';
    return 'maintain';
}

/**
 * Format number with unit
 */
export function formatMetric(value: number, unit: string): string {
    return `${value}${unit}`;
}

/**
 * Calculate average from array of numbers
 */
export function calculateAverage(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, val) => acc + val, 0);
    return Math.round((sum / numbers.length) * 10) / 10;
}

/**
 * Get week label
 */
export function getWeekLabel(week: number): string {
    const labels = ['Adaptation', 'Endurance', 'Intensification', 'Consolidation'];
    return labels[week - 1] || 'Week ' + week;
}

/**
 * Format date for display
 */
export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long'
    });
}

/**
 * Get motivational message based on streak
 */
export function getMotivationalMessage(streak: number, progress: number): string {
    if (streak === 0) {
        return "Commencez aujourd'hui. Chaque voyage commence par un premier pas.";
    }
    if (streak < 3) {
        return `${streak} jours ! Le momentum se construit. Continue.`;
    }
    if (streak < 7) {
        return `${streak} jours de suite ! L'habitude se forme. Excellent travail.`;
    }
    if (streak < 14) {
        return `${streak} jours ! Tu es en feu 🔥 L'identité change.`;
    }
    if (streak < 21) {
        return `${streak} jours ! Incroyable discipline. Tu es transformé.`;
    }
    if (streak >= 28) {
        return `${streak} jours ! CHAMPION. Tu as complété le programme ! 🏆`;
    }
    return `${streak} jours ! Continue, tu es sur la bonne voie.`;
}
