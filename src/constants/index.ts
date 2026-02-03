import { TagStyle, TagSize, TagRadius, TagAlignment } from '../types';

export const DEFAULT_TAGLINE_CONFIG = {
  style: 'style2' as TagStyle,
  size: 'M' as TagSize,
  radius: 8 as TagRadius,
  alignment: 'left' as TagAlignment,
};

export const TAG_STYLES: TagStyle[] = ['style1', 'style2', 'style3', 'style4'];
export const TAG_SIZES: TagSize[] = ['XL', 'L', 'M', 'S', 'XS'];
export const TAG_RADII: TagRadius[] = [0, 4, 8, 12, 100];
export const TAG_ALIGNMENTS: TagAlignment[] = ['left', 'center', 'right'];

export const DEFAULT_LINK = 'https://onepage.io';

export const PANEL_NAMES = {
  MAIN: 'main',
  CREATE_ITEM: 'createItem',
  EDIT_ITEM: 'editItem',
  STYLES: 'styles',
} as const;
