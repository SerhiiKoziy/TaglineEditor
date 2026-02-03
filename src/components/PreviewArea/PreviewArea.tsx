import { observer } from 'mobx-react-lite';
import { taglineStore } from '../../stores/taglineStore';
import { Tagline } from '../Tagline/Tagline';
import styles from './PreviewArea.module.css';

export const PreviewArea = observer(() => {
  const { items, style, size, radius, alignment } = taglineStore;

  const getContainerClassName = () => {
    const alignClass = {
      left: styles.alignLeft,
      center: styles.alignCenter,
      right: styles.alignRight,
    }[alignment];

    return `${styles.container} ${alignClass}`;
  };

  return (
    <div className={styles.previewArea}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tagline element</h1>
      </div>
      <div className={getContainerClassName()}>
        {items.map((item) => (
          <Tagline
            key={item.id}
            label={item.label}
            link={item.link}
            style={style}
            size={size}
            radius={radius}
          />
        ))}
      </div>
    </div>
  );
});
