import { ChordsMode } from './../dataset/all_chords_for_impro';
import { NotesLengthType, NotesPatterns } from '../dataset/all_chords_for_impro';
import { StorageNames } from './storagesController';

export interface Settings {
  bpm: number;
  notesLength: NotesLengthType;
  notesPattern: NotesPatterns;
  playAccompanimentWithMelody: boolean;
  chordsGuitarMode: boolean;
  chordsToGenerateCount: number;
  notesCountToPlayForChord: number;
  chordsMode: ChordsMode;
}

const initialSettings: Settings = {
  bpm: 130,
  notesLength: NotesLengthType.Middle,
  notesPattern: NotesPatterns.None,
  playAccompanimentWithMelody: true,
  chordsGuitarMode: false,
  chordsToGenerateCount: 8,
  notesCountToPlayForChord: 2,
  chordsMode: ChordsMode.JazzChords,
};

export const getSettings = (): Settings => {
  return !!localStorage?.getItem(StorageNames.Settings)
    ? {
        ...initialSettings,
        ...JSON.parse(localStorage.getItem(StorageNames.Settings)!),
      }
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
