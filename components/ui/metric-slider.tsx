import React, { useState } from 'react';

interface MetricSliderProps {
    value: number;
    onChange: (value: number) => void;
    label: string;
    min?: number;
    max?: number;
    className?: string;
}

export function MetricSlider({
    value,
    onChange,
    label,
    min = 1,
    max = 10,
    className = ''
}: MetricSliderProps) {
    const [localValue, setLocalValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value);
        setLocalValue(newValue);
        onChange(newValue);
    };

    const getEmoji = (val: number) => {
        if (val <= 3) return '😴';
        if (val <= 5) return '😐';
        if (val <= 7) return '🙂';
        if (val <= 9) return '😊';
        return '🔥';
    };

    const getColor = (val: number) => {
        if (val <= 4) return 'var(--error)';
        if (val <= 7) return 'var(--warning)';
        return 'var(--success)';
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[var(--text-primary)]">
                    {label}
                </label>
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{getEmoji(localValue)}</span>
                    <span
                        className="text-2xl font-bold"
                        style={{ color: getColor(localValue) }}
                    >
                        {localValue}
                    </span>
                </div>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                value={localValue}
                onChange={handleChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                    background: `linear-gradient(to right, ${getColor(localValue)} 0%, ${getColor(localValue)} ${((localValue - min) / (max - min)) * 100}%, var(--bg-tertiary) ${((localValue - min) / (max - min)) * 100}%, var(--bg-tertiary) 100%)`
                }}
            />
            <div className="flex justify-between text-xs text-[var(--text-muted)]">
                <span>Faible</span>
                <span>Élevé</span>
            </div>
        </div>
    );
}
