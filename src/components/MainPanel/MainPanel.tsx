import { observer } from 'mobx-react-lite';
import { taglineStore } from '../../stores/taglineStore';
import { Panel } from '../Panel/Panel';
import styles from './MainPanel.module.css';

export const MainPanel = observer(() => {
  const { items, openCreateItem, openEditItem, openStyles, deleteItem } = taglineStore;

  return (
    <Panel title="Tagline" onClose={() => taglineStore.closePanel()} openStyles={openStyles} showStylesButton={true}>
      <div className={styles.content}>
        <div className={styles.itemList}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <span className={styles.itemLabel} onClick={() => openEditItem(item.id)}>
                {item.label}
              </span>
              <button
                className={styles.deleteButton}
                onClick={() => deleteItem(item.id)}
                aria-label="Delete item"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button className={styles.addButton} onClick={() => openCreateItem()}>
          <span className={styles.plusIcon}>+</span>
          <span>Add item</span>
        </button>
      </div>
    </Panel>
  );
});
