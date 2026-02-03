import React from 'react';
import styles from './Button.module.css';

type ButtonStatus = 'primary' | 'secondary' | 'outline' | 'base';

interface ButtonProps {
  children: React.ReactNode;
  status?: ButtonStatus;
  onClick?: () => void;
  className?: string;
  active?: boolean;
  'aria-label'?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  status = 'base', 
  onClick, 
  className = '',
  active = false,
  'aria-label': ariaLabel
}) => {
  // Apply both status and active classes - active only changes background
  const statusClass = styles[status];
  const activeClass = active ? styles.active : '';
  
  return (
    <button
      className={`${styles.button} ${statusClass} ${activeClass} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
