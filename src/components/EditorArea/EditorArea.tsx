import { observer } from 'mobx-react-lite';
import { taglineStore } from '../../stores/taglineStore';
import { MainPanel } from '../MainPanel/MainPanel';
import { ItemPanel } from '../ItemPanel/ItemPanel';
import { StylesPanel } from '../StylesPanel/StylesPanel';
import styles from './EditorArea.module.css';

export const EditorArea = observer(() => {
  const { currentPanel, editingItemId } = taglineStore;

  const renderPanel = () => {
    const panelToShow = currentPanel || 'main';
    
    switch (panelToShow) {
      case 'main':
        return <MainPanel />;
      case 'createItem':
        return <ItemPanel isCreating={true} />;
      case 'editItem':
        return <ItemPanel isCreating={false} itemId={editingItemId} />;
      case 'styles':
        return <StylesPanel />;
      default:
        return <MainPanel />;
    }
  };

  return (
    <div className={styles.editorArea}>
      <div className={styles.panelContainer}>
        {renderPanel()}
      </div>
    </div>
  );
});
