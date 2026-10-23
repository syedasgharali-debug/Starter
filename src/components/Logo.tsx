import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  to,
  className = '',
}) => {
  const imageSrc = variant === 'icon' 
    ? '/assets/klarsolution-icon-reflection@2x.png' 
    : '/assets/klarsolution-logo-reflection@2x.png';

  const sizeClasses = {
    sm: variant === 'icon' ? 'h-8 sm:h-10' : 'h-10 sm:h-12',
    md: variant === 'icon' ? 'h-12 sm:h-14' : 'h-14 sm:h-16',
    lg: variant === 'icon' ? 'h-16 sm:h-20' : 'h-20 sm:h-24',
  };

  const content = (
    <div className={`inline-flex items-center justify-center bg-black overflow-hidden rounded-lg ${className}`}>
      <img
        src={imageSrc}
        alt="Klar Solution"
        className={`${sizeClasses[size]} w-auto object-contain object-center transition-opacity hover:opacity-95`}
      />
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
};
