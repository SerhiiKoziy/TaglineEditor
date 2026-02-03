import { observer } from 'mobx-react-lite';
import { taglineStore } from '../../stores/taglineStore';
import styles from './EditorToggle.module.css';

export const EditorToggle = observer(() => {
  const { isEditorVisible, toggleEditor } = taglineStore;

  return (
    <div className={styles.control}>
      <button
        className={styles.toggleButton}
        onClick={() => toggleEditor()}
        aria-label="Toggle editor"
      >
        {isEditorVisible ? 'Hide Editor' : 'Show Editor'}
      </button>
    </div>
  );
});
