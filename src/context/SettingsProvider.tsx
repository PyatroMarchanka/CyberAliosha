import React, { createContext, useReducer } from 'react';
import { getSettings, saveSettings, Settings } from '../localStorageUtils/settingsStorage';

type State = Settings;

interface Action {
  type:
    | 'SET_BPM'
    | 'SET_NOTES_LENGTH'
    | 'SET_NOTES_PATTERN'
    | 'PLAY_ACCOMPANIMENT'
    | 'SET_CHORDS_GUITAR_MODE'
    | 'SET_SETTINGS'
    | 'SET_CHORDS_TO_GENERATE_COUNT';

  payload?: any;
}

const initialState: State = getSettings();

interface Context {
  state: State;
  dispatch: (action: Action) => void;
}

const settingsStore = createContext<Context>({ state: initialState, dispatch: () => {} });
const { Provider } = settingsStore;

const SettingsProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer((state: State, action: Action) => {
    switch (action.type) {
      case 'SET_NOTES_LENGTH':
        saveSettings({ notesLength: action.payload });
        return {
          ...state,
          notesLength: action.payload,
        };

      case 'SET_BPM':
        saveSettings({ bpm: action.payload });
        return {
          ...state,
          bpm: action.payload,
        };

      case 'SET_NOTES_PATTERN':
        saveSettings({ notesPattern: action.payload });
        return {
          ...state,
          notesPattern: action.payload,
        };

      case 'PLAY_ACCOMPANIMENT':
        saveSettings({ playAccompanimentWithMelody: action.payload });
        return {
          ...state,
          playAccompanimentWithMelody: action.payload,
        };

      case 'SET_CHORDS_GUITAR_MODE':
        saveSettings({ chordsGuitarMode: action.payload });
        return {
          ...state,
          chordsGuitarMode: action.payload,
        };

      case 'SET_CHORDS_TO_GENERATE_COUNT':
        saveSettings({ chordsToGenerateCount: action.payload });
        return {
          ...state,
          chordsToGenerateCount: action.payload,
        };

      case 'SET_SETTINGS':
        saveSettings({
          ...state,
          ...action.payload,
        });

        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { SettingsProvider, settingsStore };
