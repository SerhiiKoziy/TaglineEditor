import React from 'react';
import styles from './Icon.module.css';

interface IconProps {
  children: React.ReactNode;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ children, className = '' }) => {
  return (
    <span className={`${styles.icon} ${className}`}>
      {children}
    </span>
  );
};
