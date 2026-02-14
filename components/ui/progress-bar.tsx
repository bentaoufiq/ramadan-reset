import React from 'react';

interface ProgressBarProps {
    value: number; // 0-100
    max?: number;
    className?: string;
    showLabel?: boolean;
}

export function ProgressBar({ value, max = 100, className = '', showLabel = true }: ProgressBarProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    // Color based on progress
    const getColor = () => {
        if (percentage < 33) return 'var(--error)';
        if (percentage < 66) return 'var(--warning)';
        return 'var(--success)';
    };

    return (
        <div className={`w-full ${className}`}>
            <div className="w-full h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                <div
                    className="h-full transition-all duration-500 ease-out rounded-full"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: getColor()
                    }}
                />
            </div>
            {showLabel && (
                <div className="mt-1 text-sm text-[var(--text-secondary)] text-right">
                    {Math.round(percentage)}%
                </div>
            )}
        </div>
    );
}
