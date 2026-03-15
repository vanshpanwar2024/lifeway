import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-semibold tracking-wide transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const variants = {
    primary: 'bg-olive-500 text-white hover:bg-olive-600 hover:-translate-y-[2px] hover:shadow-[0_12px_24px_rgba(107,142,35,0.25)] focus:ring-2 focus:ring-olive-500/30',
    secondary: 'bg-white text-cream-900 border border-cream-300 hover:bg-cream-100 hover:-translate-y-[2px] hover:shadow-[0_8px_18px_rgba(0,0,0,0.06)]',
    outline: 'border border-cream-300 text-cream-900 hover:border-cream-400 hover:bg-cream-50 hover:-translate-y-[2px]',
    ghost: 'hover:bg-cream-100 text-cream-700',
    dark: 'bg-cream-900 text-white hover:bg-cream-800 hover:-translate-y-[2px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)]',
  };

  const sizes = {
    sm: 'h-9 px-5 text-sm gap-2',
    md: 'h-12 px-7 text-base gap-2',
    lg: 'h-14 px-9 text-lg gap-3'
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
