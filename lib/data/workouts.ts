import type { WorkoutSession, Exercise } from '@/types';

// Week 1-2: Adaptation Phase
const week1Exercises: Exercise[] = [
    {
        id: 'w1-squat',
        name: 'Squat au poids du corps',
        sets: 3,
        reps: '10-12',
        tempo: '2-1-2',
        rest: 15,
        muscleGroups: ['Quadriceps', 'Fessiers', 'Tronc'],
        description: 'Pieds largeur épaules, descendre jusqu\'à parallèle, garder le dos droit',
        variations: {
            bodyweight: 'Squat classique',
            dumbbells: 'Goblet squat (1 haltère devant poitrine)',
            gym: 'Squat barre guidée ou goblet squat haltère lourd'
        }
    },
    {
        id: 'w1-pushup',
        name: 'Push-up incliné',
        sets: 3,
        reps: '8-10',
        tempo: '2-0-2',
        rest: 15,
        muscleGroups: ['Pectoraux', 'Triceps', 'Épaules', 'Tronc'],
        description: 'Mains sur table ou rebord, corps aligné, descendre contrôlé',
        variations: {
            bodyweight: 'Push-up incliné (mains sur table)',
            dumbbells: 'Push-up avec haltères comme poignées',
            gym: 'Développé couché haltères légers'
        }
    },
    {
        id: 'w1-bridge',
        name: 'Pont fessier',
        sets: 3,
        reps: '12-15',
        tempo: '2-1-2',
        rest: 15,
        muscleGroups: ['Fessiers', 'Ischio-jambiers', 'Dos bas'],
        description: 'Allongé sur le dos, pieds au sol, soulever bassin en contractant fessiers',
        variations: {
            bodyweight: 'Pont bilatéral',
            dumbbells: 'Pont avec haltère sur hanches',
            gym: 'Hip thrust sur banc avec barre'
        }
    },
    {
        id: 'w1-plank',
        name: 'Planche genoux au sol',
        sets: 3,
        reps: '20-30 sec',
        tempo: 'Statique',
        rest: 15,
        muscleGroups: ['Tronc profond', 'Épaules'],
        description: 'Avant-bras au sol, genoux au sol, corps aligné de genoux à épaules',
        variations: {
            bodyweight: 'Planche genoux',
            dumbbells: 'Planche pieds au sol',
            gym: 'Planche pieds au sol + Pallof press'
        }
    },
    {
        id: 'w1-birddog',
        name: 'Bird-dog',
        sets: 3,
        reps: '8/côté',
        tempo: '2-1-2',
        rest: 90,
        muscleGroups: ['Tronc', 'Dos', 'Stabilisateurs'],
        description: 'À quatre pattes, étendre bras opposé et jambe, maintenir équilibre',
        variations: {
            bodyweight: 'Bird-dog classique',
            dumbbells: 'Bird-dog avec pause 3 sec',
            gym: 'Cable pull-through'
        }
    }
];

// Week 3-4: Progression Phase
const week3Exercises: Exercise[] = [
    {
        id: 'w3-goblet-squat',
        name: 'Squat goblet',
        sets: 4,
        reps: '12-15',
        tempo: '3-1-2',
        rest: 10,
        muscleGroups: ['Quadriceps', 'Fessiers', 'Tronc'],
        description: 'Haltère devant poitrine, squat profond, tempo plus lent',
        variations: {
            bodyweight: 'Squat tempo lent',
            dumbbells: 'Goblet squat haltère 5-10kg',
            gym: 'Squat barre 20-40kg'
        }
    },
    {
        id: 'w3-pushup',
        name: 'Push-up standard',
        sets: 4,
        reps: '8-12',
        tempo: '2-0-2',
        rest: 10,
        muscleGroups: ['Pectoraux', 'Triceps', 'Épaules', 'Tronc'],
        description: 'Push-up complet pieds au sol, corps aligné',
        variations: {
            bodyweight: 'Push-up standard',
            dumbbells: 'Push-up avec haltères',
            gym: 'Développé couché haltères 3×8-10'
        }
    },
    {
        id: 'w3-lunge',
        name: 'Fente alternée',
        sets: 4,
        reps: '10/jambe',
        tempo: '2-1-2',
        rest: 10,
        muscleGroups: ['Quadriceps', 'Fessiers', 'Stabilité'],
        description: 'Fente avant alternée, genou arrière proche du sol',
        variations: {
            bodyweight: 'Fente poids du corps',
            dumbbells: 'Fente haltères en mains',
            gym: 'Fente marchée haltères 3×10/jambe'
        }
    },
    {
        id: 'w3-plank',
        name: 'Planche pieds au sol',
        sets: 4,
        reps: '30-45 sec',
        tempo: 'Statique',
        rest: 10,
        muscleGroups: ['Tronc profond', 'Épaules'],
        description: 'Planche complète, pieds au sol, corps aligné',
        variations: {
            bodyweight: 'Planche standard',
            dumbbells: 'Planche avec tap épaules',
            gym: 'Planche + Pallof press 3×12/côté'
        }
    },
    {
        id: 'w3-deadbug',
        name: 'Dead bug',
        sets: 4,
        reps: '10/côté',
        tempo: '2-1-2',
        rest: 10,
        muscleGroups: ['Tronc', 'Coordination'],
        description: 'Sur le dos, bras et jambes en l\'air, alterner extensions opposées',
        variations: {
            bodyweight: 'Dead bug classique',
            dumbbells: 'Dead bug avec haltère léger',
            gym: 'Dead bug + Ab wheel 3×10'
        }
    },
    {
        id: 'w3-superman',
        name: 'Superman',
        sets: 4,
        reps: '12-15',
        tempo: '2-1-2',
        rest: 60,
        muscleGroups: ['Chaîne postérieure', 'Dos'],
        description: 'Allongé ventre, soulever bras et jambes simultanément',
        variations: {
            bodyweight: 'Superman classique',
            dumbbells: 'Superman avec pause 2 sec',
            gym: 'Back extension machine 3×12-15'
        }
    }
];

export const workoutProgram: WorkoutSession[] = [
    // Week 1
    {
        week: 1,
        day: 1,
        exercises: week1Exercises,
        warmup: [
            'Rotations articulaires (chevilles, genoux, hanches, épaules) - 30 sec chaque',
            'Cat-Cow (mobilité colonne) - 10 répétitions lentes',
            'Marche sur place genoux hauts - 1 min'
        ],
        cooldown: [
            'Étirement psoas - 45 sec/côté',
            'Étirement fessiers - 45 sec/côté',
            'Respiration diaphragmatique - 2 min (5 sec inspire / 7 sec expire)'
        ],
        duration: 20
    },
    // Week 2 (same exercises, building consistency)
    {
        week: 2,
        day: 1,
        exercises: week1Exercises,
        warmup: [
            'Rotations articulaires (chevilles, genoux, hanches, épaules) - 30 sec chaque',
            'Cat-Cow (mobilité colonne) - 10 répétitions lentes',
            'Marche sur place genoux hauts - 1 min'
        ],
        cooldown: [
            'Étirement psoas - 45 sec/côté',
            'Étirement fessiers - 45 sec/côté',
            'Respiration diaphragmatique - 2 min (5 sec inspire / 7 sec expire)'
        ],
        duration: 22
    },
    // Week 3
    {
        week: 3,
        day: 1,
        exercises: week3Exercises,
        warmup: [
            'Rotations articulaires complètes - 2 min',
            'Cat-Cow + Thoracic rotation - 10 reps',
            'Squat mobilité - 10 reps lents',
            'Marche sur place - 1 min'
        ],
        cooldown: [
            'Étirement complet chaîne postérieure - 1 min/côté',
            'Pigeon pose - 1 min/côté',
            'Respiration 4-7-8 - 5 cycles'
        ],
        duration: 25
    },
    // Week 4
    {
        week: 4,
        day: 1,
        exercises: week3Exercises,
        warmup: [
            'Rotations articulaires complètes - 2 min',
            'Cat-Cow + Thoracic rotation - 10 reps',
            'Squat mobilité - 10 reps lents',
            'Marche sur place - 1 min'
        ],
        cooldown: [
            'Étirement complet chaîne postérieure - 1 min/côté',
            'Pigeon pose - 1 min/côté',
            'Respiration 4-7-8 - 5 cycles'
        ],
        duration: 28
    }
];

export function getWorkoutForWeek(week: number): WorkoutSession | undefined {
    return workoutProgram.find(w => w.week === week);
}
