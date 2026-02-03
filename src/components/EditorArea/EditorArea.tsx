import { observer } from 'mobx-react-lite';
import { taglineStore } from '../../stores/taglineStore';
import { getPanelConfig } from './panelRegistry';
import styles from './EditorArea.module.css';

export const EditorArea = observer(() => {
  const { currentPanel, editingItemId } = taglineStore;

  const renderPanel = () => {
    const panelToShow = currentPanel || 'main';
    const config = getPanelConfig(panelToShow, editingItemId);
    return config.component;
  };

  return (
    <div className={styles.editorArea}>
      <div className={styles.panelContainer}>
        {renderPanel()}
      </div>
    </div>
  );
});
