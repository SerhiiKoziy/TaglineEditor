import { makeAutoObservable } from 'mobx';
import { TagItem, TagStyle, TagSize, TagRadius, TagAlignment, PanelType, TaglineConfig } from '../types';

class TaglineStore {
  items: TagItem[] = [
    { id: '1', label: 'Marketing', link: 'https://onepage.io' },
    { id: '2', label: 'Design', link: 'https://onepage.io' },
    { id: '3', label: 'Development', link: 'https://onepage.io' },
    { id: '4', label: 'Front', link: 'https://onepage.io' },
    { id: '5', label: 'AI Engineering', link: 'https://onepage.io' },
  ];

  style: TagStyle = 'style2';
  size: TagSize = 'M';
  radius: TagRadius = 8;
  alignment: TagAlignment = 'left';

  currentPanel: PanelType = 'main';
  editingItemId: string | null = null;
  isCreatingItem = false;
  isEditorVisible = true;

  constructor() {
    makeAutoObservable(this);
  }

  setStyle = (style: TagStyle) => {
    this.style = style;
    this.saveToServer();
  };

  setSize = (size: TagSize) => {
    this.size = size;
    this.saveToServer();
  };

  setRadius = (radius: TagRadius) => {
    this.radius = radius;
    this.saveToServer();
  };

  setAlignment = (alignment: TagAlignment) => {
    this.alignment = alignment;
    this.saveToServer();
  };

  addItem = (item: Omit<TagItem, 'id'>) => {
    const newItem: TagItem = {
      ...item,
      id: Date.now().toString(),
    };
    this.items.push(newItem);
    this.saveToServer();
    this.closeCreateItem();
  };

  updateItem = (id: string, updates: Partial<Omit<TagItem, 'id'>>) => {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      Object.assign(item, updates);
      this.saveToServer();
    }
    this.closeEditItem();
  };

  deleteItem = (id: string) => {
    this.items = this.items.filter((i) => i.id !== id);
    this.saveToServer();
  };

  openCreateItem = () => {
    this.isCreatingItem = true;
    this.currentPanel = 'createItem';
  };

  closeCreateItem = () => {
    this.isCreatingItem = false;
    this.currentPanel = 'main';
  };

  openEditItem = (id: string) => {
    this.editingItemId = id;
    this.currentPanel = 'editItem';
  };

  closeEditItem = () => {
    this.editingItemId = null;
    this.currentPanel = 'main';
  };

  openStyles = () => {
    this.currentPanel = 'styles';
  };

  closePanel = () => {
    this.currentPanel = null;
    this.isEditorVisible = false;
  };

  setPanel = (panel: PanelType) => {
    this.currentPanel = panel;
  };

  toggleEditor = () => {
    this.isEditorVisible = !this.isEditorVisible;
    // If showing editor and no panel is set, open main panel
    if (this.isEditorVisible && !this.currentPanel) {
      this.currentPanel = 'main';
    }
  };

  private saveToServer() {
    const config: TaglineConfig = {
      items: this.items,
      style: this.style,
      size: this.size,
      radius: this.radius,
      alignment: this.alignment,
    };
    console.log('POST http://api/tagline', config);
  }
}

export const taglineStore = new TaglineStore();
