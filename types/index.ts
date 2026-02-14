export interface User {
    weight: number; // kg
    startDate: string;
    currentWeek: number; // 1-4
    currentDay: number; // 1-30
}

export interface DailyMetrics {
    date: string;
    steps: number;
    hydration: number; // liters
    energy: number; // 1-10
    sleep: number; // 1-10
    libido: number; // 1-10
    motivation: number; // 1-10
    workoutCompleted: boolean;
    mobilityCompleted: boolean;
    walkCompleted: boolean;
}

export interface WeeklyMetrics {
    week: number;
    waistMeasurement: number; // cm
    weight?: number; // kg (optional)
    averageEnergy: number;
    averageSleep: number;
    averageLibido: number;
    averageMotivation: number;
}

export interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: string; // e.g., "10-12"
    tempo: string; // e.g., "2-1-2"
    rest: number; // seconds
    muscleGroups: string[];
    description: string;
    variations: {
        bodyweight: string;
        dumbbells?: string;
        gym?: string;
    };
}

export interface WorkoutSession {
    week: number;
    day: number;
    exercises: Exercise[];
    warmup: string[];
    cooldown: string[];
    duration: number; // minutes
}

export interface Meal {
    name: string;
    category: 'ftour-rupture' | 'ftour-main' | 'snack' | 'suhoor';
    items: string[];
    macros: {
        protein: number;
        carbs: number;
        fats: number;
        calories: number;
    };
}

export interface Supplement {
    name: string;
    dosage: string;
    timing: 'ftour' | 'suhoor';
    tier: 'essential' | 'recommended' | 'optional';
    benefits: string[];
}

export interface ProgressRecommendation {
    action: 'increase' | 'maintain' | 'reduce';
    reasons: string[];
    confidence: number; // 0-1
}
