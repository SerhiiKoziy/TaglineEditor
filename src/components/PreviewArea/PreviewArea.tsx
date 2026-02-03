import { observer } from 'mobx-react-lite';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { taglineStore } from '../../stores/taglineStore';
import { Tagline } from '../Tagline/Tagline';
import { TagStyle, TagSize, TagRadius } from '../../types';
import styles from './PreviewArea.module.css';

interface SortableTagProps {
  id: string;
  item: { id: string; label: string; link: string };
  style: TagStyle;
  size: TagSize;
  radius: TagRadius;
}

const SortableTag = ({ id, item, style, size, radius }: SortableTagProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style_transform = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style_transform}
      className={styles.draggableTag}
      {...attributes}
      {...listeners}
    >
      <Tagline
        label={item.label}
        link={item.link}
        style={style}
        size={size}
        radius={radius}
      />
    </div>
  );
};

export const PreviewArea = observer(() => {
  const { items, style, size, radius, alignment, reorderItems } = taglineStore;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getContainerClassName = () => {
    const alignClass = {
      left: styles.alignLeft,
      center: styles.alignCenter,
      right: styles.alignRight,
    }[alignment];

    return `${styles.container} ${alignClass}`;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      reorderItems(newItems);
    }
  };

  return (
    <div className={styles.previewArea}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tagline element</h1>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map((item) => item.id)}>
          <div className={getContainerClassName()}>
            {items.map((item) => (
              <SortableTag
                key={item.id}
                id={item.id}
                item={item}
                style={style}
                size={size}
                radius={radius}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
});
