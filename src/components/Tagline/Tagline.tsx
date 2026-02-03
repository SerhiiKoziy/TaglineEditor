import React from 'react';
import { TagStyle, TagSize, TagRadius } from '../../types';
import styles from './Tagline.module.css';

interface TaglineProps {
  label: string;
  link: string;
  style: TagStyle;
  size: TagSize;
  radius: TagRadius;
}

export const Tagline: React.FC<TaglineProps> = ({ label, link, style, size, radius }) => {
  // Map TagStyle to Button status
  const getStatus = (tagStyle: TagStyle): 'primary' | 'secondary' | 'outline' | 'base' => {
    const styleMap: Record<TagStyle, 'primary' | 'secondary' | 'outline' | 'base'> = {
      style1: 'base',
      style2: 'secondary',
      style3: 'primary',
      style4: 'outline',
    };
    return styleMap[tagStyle] || 'base';
  };

  const status = getStatus(style);

  const getSizeClass = () => {
    const sizeMap = {
      XL: styles.sizeXL,
      L: styles.sizeL,
      M: styles.sizeM,
      S: styles.sizeS,
      XS: styles.sizeXS,
    };
    return sizeMap[size] || styles.sizeM;
  };

  const getRadiusClass = () => {
    const radiusMap = {
      0: styles.radius0,
      4: styles.radius4,
      8: styles.radius8,
      12: styles.radius12,
      100: styles.radius100,
    };
    return radiusMap[radius] || styles.radius8;
  };

  const statusClass = styles[status as keyof typeof styles] || styles.base;
  const sizeClass = getSizeClass();
  const radiusClass = getRadiusClass();

  return (
    <a
      href={link}
      className={`${styles.tagline} ${statusClass} ${sizeClass} ${radiusClass}`}
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
    >
      {label}
    </a>
  );
};
