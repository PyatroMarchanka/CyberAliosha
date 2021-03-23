import { ChordModel, PartNote } from './../dataset/all_chords_for_impro';

export enum StorageNames {
  Chords = 'added_chords',
  Melodies = 'saved_melodies',
  Settings = 'settings',
}

interface SerialazedData {
  data: string;
  id: string;
  title: string;
}

export interface SavedChords {
  data: ChordModel[];
  id: string;
  title?: string;
}

export interface SavedMelodies {
  data: { melody: PartNote[][]; chords: ChordModel[] };
  id: string;
  title?: string;
}

export const saveItem = (item: any, storage: StorageNames, title: string) => {
  const previousItems = localStorage.getItem(storage);
  const currentItems = {
    id: `${Math.random().toString()}`,
    data: JSON.stringify(item),
    title: `${title} - ${new Date().toLocaleDateString()}`,
  };

  if (previousItems) {
    const updatedItems = JSON.parse(previousItems);

    updatedItems.push(currentItems);

    localStorage.setItem(storage, JSON.stringify(updatedItems));
  } else {
    localStorage.setItem(storage, JSON.stringify([currentItems]));
  }
};

export const clearStorage = (storage: StorageNames) => {
  localStorage.removeItem(storage);
};

export const removeItemById = (id: string, storage: StorageNames) => {
  const saved = localStorage.getItem(storage);

  if (saved) {
    const items = JSON.parse(saved);

    const filteredItems = items?.filter((item: { id: string }) => item.id !== id);

    localStorage.setItem(storage, JSON.stringify(filteredItems));
  }
};

export const getStorage = <T>(storage: StorageNames): T[] => {
  const saved = localStorage.getItem(storage);
  if (saved) {
    const items = JSON.parse(saved);

    return items.map((progression: SerialazedData) => ({
      id: progression.id,
      data: progression.data ? JSON.parse(progression.data) : [],
      title: progression.title,
    }));
  } else return [];
};
