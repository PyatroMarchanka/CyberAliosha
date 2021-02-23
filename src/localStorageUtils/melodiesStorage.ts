import { ChordModel, PartNote } from './../dataset/all_chords_for_impro';
import {
  clearStorage,
  getStorage,
  removeItemById,
  SavedChords,
  saveItem,
  StorageNames,
} from './storagesController';

export interface SavedMelodies {
  id: string;
  data: PartNote[][];
  title: string;
}

export const saveMelody = (addedChords: PartNote[][], title: string) => {
  saveItem(addedChords, StorageNames.Melodies, title);
};

export const clearMelody = () => {
  clearStorage(StorageNames.Melodies);
};

export const removeMelodyById = (id: string) => {
  removeItemById(id, StorageNames.Melodies);
};

export const getSavedMelodies = (): SavedMelodies[] => {
  return getStorage<SavedMelodies>(StorageNames.Melodies);
};
