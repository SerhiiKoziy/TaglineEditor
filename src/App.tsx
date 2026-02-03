import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { taglineStore } from './stores/taglineStore';
import { PreviewArea } from './components/PreviewArea/PreviewArea';
import { EditorArea } from './components/EditorArea/EditorArea';
import { EditorToggle } from './components/EditorToggle/EditorToggle';
import styles from './App.module.css';

const App = observer(() => {
  const { isEditorVisible } = taglineStore;

  useEffect(() => {
    // Initialize with main panel open
    taglineStore.setPanel('main');
  }, []);

  return (
    <div className={styles.app}>
      <EditorToggle />
      <div className={styles.contentContainer}>
        <PreviewArea />
        {isEditorVisible && <EditorArea />}
      </div>
    </div>
  );
});

export default App;
