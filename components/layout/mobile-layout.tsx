import React from 'react';

interface MobileLayoutProps {
    children: React.ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] pb-20">
            <div className="max-w-lg mx-auto px-4 py-6">
                {children}
            </div>
        </div>
    );
}
