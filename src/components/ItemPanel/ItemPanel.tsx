import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import { taglineStore } from '../../stores/taglineStore';
import { Panel } from '../Panel/Panel';
import styles from './ItemPanel.module.css';

interface ItemPanelProps {
  isCreating: boolean;
  itemId?: string | null;
}

export const ItemPanel = observer(({ isCreating, itemId }: ItemPanelProps) => {
  const { items, addItem, updateItem, closeCreateItem, closeEditItem, closePanel } = taglineStore;
  
  const item = itemId ? items.find((i) => i.id === itemId) : null;
  
  const [label, setLabel] = useState(item?.label || '');
  const [link, setLink] = useState(item?.link || '');

  useEffect(() => {
    if (item) {
      setLabel(item.label);
      setLink(item.link);
    } else {
      setLabel('');
      setLink('');
    }
  }, [item]);

  const handleSave = () => {
    if (!label.trim()) return;

    if (isCreating) {
      addItem({ label: label.trim(), link: link.trim() || 'https://onepage.io' });
    } else if (itemId) {
      updateItem(itemId, { label: label.trim(), link: link.trim() || 'https://onepage.io' });
    }
  };

  const handleBack = () => {
    if (isCreating) {
      closeCreateItem();
    } else {
      closeEditItem();
    }
  };

  const handleClose = () => {
    closePanel();
  };

  return (
    <Panel title="Item" onClose={handleClose} onBack={handleBack}>
      <div className={styles.content}>
        <div className={styles.field}>
          <label className={styles.label}>Label</label>
          <input
            type="text"
            className={styles.input}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Enter label"
            autoFocus
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Link</label>
          <input
            type="url"
            className={styles.input}
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://onepage.io"
          />
        </div>
        <button
          className={styles.saveButton}
          onClick={handleSave}
          disabled={!label.trim()}
        >
          Save
        </button>
      </div>
    </Panel>
  );
});
