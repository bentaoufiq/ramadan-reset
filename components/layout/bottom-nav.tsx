'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '../ui/icons';

const navItems = [
    { href: '/', label: 'Dashboard', icon: Icons.Home },
    { href: '/training', label: 'Entraînement', icon: Icons.Dumbbell },
    { href: '/nutrition', label: 'Nutrition', icon: Icons.Utensils },
    { href: '/progress', label: 'Progrès', icon: Icons.TrendingUp },
    { href: '/mental', label: 'Mental', icon: Icons.Brain },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 glass-effect border-t border-[var(--border)] z-50 safe-area-bottom">
            <div className="max-w-lg mx-auto">
                <div className="flex items-center justify-around py-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col items-center justify-center min-w-[60px] py-2 px-3 rounded-lg transition-all ${isActive
                                        ? 'text-[var(--accent-light)]'
                                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                <Icon size={24} className={isActive ? 'animate-fade-in' : ''} />
                                <span className="text-xs mt-1 font-medium">{item.label}</span>
                                {isActive && (
                                    <div className="absolute bottom-0 w-12 h-1 bg-[var(--accent)] rounded-t-full" />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
