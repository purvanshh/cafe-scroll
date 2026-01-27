import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    fullWidth?: boolean;
    href?: string;
}

export const Button = ({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    href,
    ...props
}: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center px-8 py-3 rounded-full transition-all duration-300 font-bold text-sm tracking-wide uppercase";

    const variants = {
        primary: "bg-brown-primary text-text-light hover:bg-brown-muted shadow-sm",
        secondary: "bg-bg-dark text-text-light hover:bg-neutral-800 border border-button-border",
        outline: "bg-transparent border border-button-border text-text-dark hover:bg-brown-primary hover:text-text-light hover:border-brown-primary"
    };

    const widthStyles = fullWidth ? "w-full" : "";

    const classes = `${baseStyles} ${variants[variant]} ${widthStyles} ${className}`;

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
};
