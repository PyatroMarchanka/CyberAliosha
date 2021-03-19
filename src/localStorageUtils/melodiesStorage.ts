import { ChordModel, PartNote } from './../dataset/all_chords_for_impro';
import {
  clearStorage,
  getStorage,
  removeItemById,
  SavedMelodies,
  saveItem,
  StorageNames,
} from './storagesController';

export const saveMelody = (addedChords: PartNote[][], chords: ChordModel[], title: string) => {
  saveItem({ melody: addedChords, chords: chords }, StorageNames.Melodies, title);
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
