import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
}: ButtonProps) {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-6 py-3',
        lg: 'px-8 py-4 text-lg'
    };

    return (
        <button
            className={`${baseClass} ${variantClass} ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
