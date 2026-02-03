export interface TagItem {
  id: string;
  label: string;
  link: string;
}

export type TagStyle = 'style1' | 'style2' | 'style3' | 'style4';
export type TagSize = 'XL' | 'L' | 'M' | 'S' | 'XS';
export type TagRadius = 0 | 4 | 8 | 12 | 100;
export type TagAlignment = 'left' | 'center' | 'right';

export interface TaglineConfig {
  items: TagItem[];
  style: TagStyle;
  size: TagSize;
  radius: TagRadius;
  alignment: TagAlignment;
}

export type PanelType = 'main' | 'createItem' | 'editItem' | 'styles' | null;
