import type { Meal } from '@/types';

export const mealExamples: Meal[] = [
    // Ftour - Rupture
    {
        name: 'Rupture du jeûne',
        category: 'ftour-rupture',
        items: [
            '3 dattes Medjool',
            'Soupe harira ou lentilles (1 bol)',
            'Eau tiède citronnée (250 ml)'
        ],
        macros: {
            protein: 8,
            carbs: 45,
            fats: 3,
            calories: 240
        }
    },

    // Ftour - Main (Day 1)
    {
        name: 'Ftour principal - Jour 1',
        category: 'ftour-main',
        items: [
            'Poulet grillé épices (200g)',
            'Salade verte + tomates + concombre (300g)',
            'Huile d\'olive + citron',
            'Riz basmati (150g cuit)',
            '1 poignée d\'amandes (30g)'
        ],
        macros: {
            protein: 52,
            carbs: 48,
            fats: 22,
            calories: 600
        }
    },

    // Ftour - Main (Day 2)
    {
        name: 'Ftour principal - Jour 2',
        category: 'ftour-main',
        items: [
            'Poisson grillé (saumon/dorade 200g)',
            'Légumes rôtis (courgettes, poivrons, aubergines 300g)',
            'Quinoa (150g cuit)',
            'Huile d\'olive + herbes'
        ],
        macros: {
            protein: 48,
            carbs: 42,
            fats: 26,
            calories: 620
        }
    },

    // Ftour - Main (Day 3)
    {
        name: 'Ftour principal - Jour 3',
        category: 'ftour-main',
        items: [
            'Tajine viande maigre (bœuf/agneau 200g)',
            'Légumes tajine (carottes, navets, courgettes 300g)',
            'Patate douce (150g)',
            'Huile d\'olive'
        ],
        macros: {
            protein: 50,
            carbs: 45,
            fats: 20,
            calories: 580
        }
    },

    // Snack
    {
        name: 'Collation nocturne - Option 1',
        category: 'snack',
        items: [
            'Yaourt grec nature (200g)',
            '1 c. à soupe miel',
            'Cannelle'
        ],
        macros: {
            protein: 20,
            carbs: 22,
            fats: 8,
            calories: 240
        }
    },

    {
        name: 'Collation nocturne - Option 2',
        category: 'snack',
        items: [
            'Fromage blanc (150g)',
            'Noix mélangées (30g)',
            'Myrtilles (50g)'
        ],
        macros: {
            protein: 18,
            carbs: 16,
            fats: 14,
            calories: 260
        }
    },

    // Suhoor
    {
        name: 'Suhoor - Option 1',
        category: 'suhoor',
        items: [
            'Omelette 3 œufs + épinards',
            'Pain complet (2 tranches)',
            'Avocat (1/2)',
            'Dattes (2)',
            'Eau (500 ml)'
        ],
        macros: {
            protein: 28,
            carbs: 42,
            fats: 24,
            calories: 500
        }
    },

    {
        name: 'Suhoor - Option 2',
        category: 'suhoor',
        items: [
            'Smoothie: banane + whey protéine + beurre amande + lait amande',
            'Pain complet + beurre cacahuète',
            'Dattes (2)',
            'Eau (500 ml)'
        ],
        macros: {
            protein: 32,
            carbs: 48,
            fats: 20,
            calories: 520
        }
    },

    {
        name: 'Suhoor - Option 3',
        category: 'suhoor',
        items: [
            'Msemen complet (2) + miel',
            'Fromage (50g)',
            'Banane',
            'Dattes (2)',
            'Eau (500 ml)'
        ],
        macros: {
            protein: 22,
            carbs: 52,
            fats: 18,
            calories: 480
        }
    }
];

export const foodsToAvoid = [
    {
        food: 'Pâtisseries orientales',
        reason: 'Sucre + gras trans',
        impact: 'Pic insuline + inflammation',
        alternative: 'Dattes + noix'
    },
    {
        food: 'Jus de fruits',
        reason: 'Fructose concentré',
        impact: 'Stockage foie → ventre',
        alternative: 'Fruits entiers'
    },
    {
        food: 'Pain blanc',
        reason: 'Index glycémique élevé',
        impact: 'Pic insuline → crash',
        alternative: 'Pain complet/grains entiers'
    },
    {
        food: 'Sodas/boissons sucrées',
        reason: 'Calories vides',
        impact: 'Résistance insuline',
        alternative: 'Eau infusée/thé vert'
    },
    {
        food: 'Fritures',
        reason: 'Gras oxydés',
        impact: 'Inflammation systémique',
        alternative: 'Grillé/vapeur/four'
    },
    {
        food: 'Excès de sel',
        reason: 'Rétention d\'eau',
        impact: 'Masque perte graisse',
        alternative: 'Épices et herbes'
    }
];

export const eatingOrder = [
    {
        step: 1,
        title: 'Rupture (15 min)',
        items: ['2-3 dattes', 'Eau tiède (250ml)', 'Soupe légère (1 bol)'],
        timing: 'Pause 10-15 min après'
    },
    {
        step: 2,
        title: 'Protéines d\'abord',
        items: ['Poulet/Poisson/Viande (200-250g)'],
        timing: '30-40 min après rupture'
    },
    {
        step: 3,
        title: 'Légumes ensuite',
        items: ['Salade/Légumes cuits (300-400g)'],
        timing: 'Immédiatement après protéines'
    },
    {
        step: 4,
        title: 'Glucides en dernier',
        items: ['Riz/Patate douce/Quinoa (150-200g cuit)'],
        timing: 'Après légumes'
    },
    {
        step: 5,
        title: 'Lipides sains',
        items: ['Huile d\'olive/Avocat/Noix'],
        timing: 'Intégrés au repas'
    }
];
