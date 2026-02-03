import React from 'react';
import { Icon } from '../Icon/Icon';
import { StylesIcon } from '../Icon/StylesIcon';
import styles from './Panel.module.css';

interface PanelProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  onBack?: () => void;
  openStyles?: () => void;
  showStylesButton?: boolean;
  className?: string;
}

export const Panel: React.FC<PanelProps> = ({ title, onClose, children, onBack, openStyles, showStylesButton = false, className = '' }) => {
  return (
    <div className={`${styles.panel} ${className}`}>
      <div className={styles.header}>
        {onBack && (
          <button className={styles.backButton} onClick={onBack} aria-label="Back">
            ‹
          </button>
        )}
        <h2 className={styles.title}>{title}</h2>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
      <div className={styles.content}>{children}</div>

      {showStylesButton && openStyles && (
        <button className={styles.stylesButton} onClick={() => openStyles()}>
          <div className={styles.stylesButtonIcon}>
            <Icon>
              <StylesIcon />
            </Icon>
            <span>Styles</span>
          </div>

          <span className={styles.arrowIcon}>›</span>
        </button>
      )}
    </div>
  );
};
