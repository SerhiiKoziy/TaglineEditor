import { ReactNode } from 'react';
import { MainPanel } from '../MainPanel/MainPanel';
import { ItemPanel } from '../ItemPanel/ItemPanel';
import { StylesPanel } from '../StylesPanel/StylesPanel';
import { PanelType } from '../../types';

export interface PanelConfig {
  component: ReactNode;
  requiresItemId?: boolean;
}

/**
 * Panel registry for scalable panel management
 * Add new panels here instead of modifying switch statements
 */
export function getPanelConfig(
  panelType: PanelType,
  itemId?: string | null
): PanelConfig {
  switch (panelType) {
    case 'main':
      return {
        component: <MainPanel />,
      };
    case 'createItem':
      return {
        component: <ItemPanel isCreating={true} />,
      };
    case 'editItem':
      return {
        component: <ItemPanel isCreating={false} itemId={itemId} />,
        requiresItemId: true,
      };
    case 'styles':
      return {
        component: <StylesPanel />,
      };
    default:
      return {
        component: <MainPanel />, // Default fallback
      };
  }
}
