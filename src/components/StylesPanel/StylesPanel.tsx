import { observer } from 'mobx-react-lite';
import { taglineStore } from '../../stores/taglineStore';
import { Panel } from '../Panel/Panel';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { AlgLeftIcon } from '../Icon/AlgLeftIcon';
import { AlgCenterIcon } from '../Icon/AlgCenterIcon';
import { AlgRightIcon } from '../Icon/AlgRightIcon';
import { TAG_STYLES, TAG_SIZES, TAG_RADII, TAG_ALIGNMENTS } from '../../constants';
import styles from './StylesPanel.module.css';

export const StylesPanel = observer(() => {
  const { style, size, radius, alignment, setStyle, setSize, setRadius, setAlignment } = taglineStore;

  const getStyleStatus = (index: number): 'primary' | 'secondary' | 'outline' | 'base' => {
    // Map each style button to its status based on position
    // Index 0: base (dark grey)
    // Index 1: secondary (dark blue with light blue text)
    // Index 2: primary (vibrant blue)
    // Index 3: outline (dark grey with border)
    const statusMap: ('primary' | 'secondary' | 'outline' | 'base')[] = ['base', 'secondary', 'primary', 'outline'];
    return statusMap[index] || 'base';
  };

  const handleBack = () => {
    taglineStore.setPanel('main');
  };

  return (
    <Panel title="Styles" onClose={() => taglineStore.closePanel()} onBack={handleBack}>
      <div className={styles.content}>
        <div className={styles.section}>
          <label className={styles.sectionLabel}>Style</label>
          <div className={styles.buttonGroup}>
            {TAG_STYLES.map((s, index) => (
              <Button
                key={s}
                status={getStyleStatus(index)}
                onClick={() => setStyle(s)}
                active={style === s}
                aria-label={`Style ${s}`}
              >
                Aa
              </Button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <label className={styles.sectionLabel}>Size</label>
          <div className={styles.buttonGroup}>
            {TAG_SIZES.map((s) => (
              <button
                key={s}
                className={`${styles.sizeButton} ${size === s ? styles.active : ''}`}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <label className={styles.sectionLabel}>Radius</label>
          <div className={styles.buttonGroup}>
            {TAG_RADII.map((r) => (
              <button
                key={r}
                className={`${styles.radiusButton} ${radius === r ? styles.active : ''}`}
                onClick={() => setRadius(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <label className={styles.sectionLabel}>Alignment</label>
          <div className={styles.buttonGroupAlignment}>
            {TAG_ALIGNMENTS.map((a) => (
              <button
                key={a}
                className={`${styles.alignmentButton} ${alignment === a ? styles.active : ''}`}
                onClick={() => setAlignment(a)}
                aria-label={`Align ${a}`}
              >
                <Icon>
                  {a === 'left' && <AlgLeftIcon />}
                  {a === 'center' && <AlgCenterIcon />}
                  {a === 'right' && <AlgRightIcon />}
                </Icon>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
});
