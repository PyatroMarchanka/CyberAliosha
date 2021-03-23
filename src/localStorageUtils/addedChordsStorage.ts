import { ChordModel } from './../dataset/all_chords_for_impro';
import {
  clearStorage,
  getStorage,
  removeItemById,
  SavedChords,
  saveItem,
  StorageNames,
} from './storagesController';

export const saveSavedChords = (addedChords: ChordModel[], title: string) => {
  saveItem(addedChords, StorageNames.Chords, title);
};

export const clearSavedChords = () => {
  clearStorage(StorageNames.Chords);
};

export const removeSavedChordsById = (id: string) => {
  removeItemById(id, StorageNames.Chords);
};

export const getSavedChords = (): SavedChords[] | undefined => {
  return getStorage<SavedChords>(StorageNames.Chords);
};
