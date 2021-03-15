import { NotesLengthType, NotesPatterns } from '../dataset/all_chords_for_impro';
import {
  clearStorage,
  getStorage,
  removeItemById,
  saveItem,
  StorageNames,
} from './storagesController';

export interface Settings {
  bpm: number;
  notesLength: NotesLengthType;
  notesPattern: NotesPatterns;
  playAccompanimentWithMelody: boolean;
  chordsGuitarMode: boolean;
  chordsToGenerateCount: number;
}

const initialSettings: Settings = {
  bpm: 130,
  notesLength: NotesLengthType.Middle,
  notesPattern: NotesPatterns.None,
  playAccompanimentWithMelody: true,
  chordsGuitarMode: false,
  chordsToGenerateCount: 8,
};

export const getSettings = (): Settings => {
  return !!localStorage?.getItem(StorageNames.Settings)
    ? JSON.parse(localStorage.getItem(StorageNames.Settings)!)
    : initialSettings;
};

export const saveSettings = (settings: Partial<Settings>) => {
  const oldSettings = getSettings();

  localStorage.setItem(StorageNames.Settings, JSON.stringify({ ...oldSettings, ...settings }));
};

export const clearSettings = () => {
  localStorage.removeItem(StorageNames.Settings);
  localStorage.setItem(StorageNames.Settings, JSON.stringify(initialSettings));
};
