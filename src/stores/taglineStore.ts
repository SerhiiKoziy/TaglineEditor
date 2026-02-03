import { makeObservable, observable, action } from 'mobx';
import { TagItem, TagStyle, TagSize, TagRadius, TagAlignment, PanelType, TaglineConfig } from '../types';
import { BaseStore } from './baseStore';
import { apiService } from '../services/apiService';
import { generateId } from '../utils/idGenerator';
import { DEFAULT_TAGLINE_CONFIG, DEFAULT_LINK } from '../constants';

class TaglineStore extends BaseStore {
  items: TagItem[] = [
    { id: '1', label: 'Marketing', link: DEFAULT_LINK },
    { id: '2', label: 'Design', link: DEFAULT_LINK },
    { id: '3', label: 'Development', link: DEFAULT_LINK },
    { id: '4', label: 'Front', link: DEFAULT_LINK },
    { id: '5', label: 'AI Engineering', link: DEFAULT_LINK },
  ];

  style: TagStyle = DEFAULT_TAGLINE_CONFIG.style;
  size: TagSize = DEFAULT_TAGLINE_CONFIG.size;
  radius: TagRadius = DEFAULT_TAGLINE_CONFIG.radius;
  alignment: TagAlignment = DEFAULT_TAGLINE_CONFIG.alignment;

  currentPanel: PanelType = 'main';
  editingItemId: string | null = null;
  isCreatingItem = false;
  isEditorVisible = true;

  private saveDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    super();
    // Use makeObservable instead of makeAutoObservable for classes with superclass
    // MUST be called immediately after super() and before any observable access
    makeObservable(this, {
      // Base class observables
      isLoading: observable,
      error: observable,
      // TaglineStore observables
      items: observable,
      style: observable,
      size: observable,
      radius: observable,
      alignment: observable,
      currentPanel: observable,
      editingItemId: observable,
      isCreatingItem: observable,
      isEditorVisible: observable,
      // Actions
      setStyle: action,
      setSize: action,
      setRadius: action,
      setAlignment: action,
      addItem: action,
      updateItem: action,
      deleteItem: action,
      reorderItems: action,
      openCreateItem: action,
      closeCreateItem: action,
      openEditItem: action,
      closeEditItem: action,
      openStyles: action,
      closePanel: action,
      setPanel: action,
      toggleEditor: action,
    });
  }

  // Initialize data after store creation - call this from App or after store instantiation
  initialize() {
    this.loadInitialData();
  }

  private async loadInitialData() {
    const config = await this.executeWithErrorHandling(
      () => apiService.loadTaglineConfig(),
      'Failed to load tagline configuration'
    );

    if (config) {
      this.items = config.items;
      this.style = config.style;
      this.size = config.size;
      this.radius = config.radius;
      this.alignment = config.alignment;
    }
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
      id: generateId(),
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

  reorderItems = (newOrder: TagItem[]) => {
    this.items = newOrder;
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
    // Debounce rapid changes (e.g., during drag & drop)
    if (this.saveDebounceTimer) {
      clearTimeout(this.saveDebounceTimer);
    }

    this.saveDebounceTimer = setTimeout(async () => {
      const config: TaglineConfig = {
        items: this.items,
        style: this.style,
        size: this.size,
        radius: this.radius,
        alignment: this.alignment,
      };

      await this.executeWithErrorHandling(
        () => apiService.saveTaglineConfig(config),
        'Failed to save tagline configuration'
      );
    }, 300); // 300ms debounce
  }
}

export const taglineStore = new TaglineStore();
// Initialize after store is created
taglineStore.initialize();