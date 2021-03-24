import { createContext, useReducer } from 'react';
import { ChordModel } from '../dataset/all_chords_for_impro';

import MidiChordsCreator from '../musicBrain/MidiChordsCreator';
import {
  getAllReleaserablesForTonality,
  getAllReleases,
  searchItemsForReplace,
} from '../musicBrain/releaserUtils';
import { chordStringToFullChord } from '../utils';

interface State {
  addedChords: ChordModel[];
  chordsToAdd: ChordModel[];
  replacingChord: { chord: ChordModel; idx: number } | null;
  addedChordsMode: 'edit' | 'play';
  key: string;
  mood: '' | 'min';
  chordsLenght: 1 | 2 | 4;
}

interface Action {
  type:
    | 'ADD_CHORD'
    | 'ADD_CHORDS_TO_ADD'
    | 'ADD_INITIAL_CHORDS_TO_ADD'
    | 'DELETE_CHORD'
    | 'DELETE_ALL_CHORDS'
    | 'DELETE_LAST_CHORD'
    | 'REPLACE_CHORD'
    | 'ADD_RANDOM_CHORDS_TO_ADD'
    | 'SET_REPLACING_CHORD'
    | 'SET_ADDED_CHORDS_MODE'
    | 'SET_START_KEY'
    | 'SET_START_MOOD'
    | 'SET_CHORDS_LENGHT'
    | 'ADD_CHORDS_FOR_REPLACE'
    | 'ADD_CHORD_SINGLE_TONE'
    | 'ADD_CHORDS_TO_ADD_SINGLE_TONE'
    | 'ADD_INITIAL_CHORDS_TO_ADD_SINGLE_TONE'
    | 'ADD_RANDOM_CHORDS_TO_ADD_SINGLE_TONE';
  payload?: any;
}

const initialState: State = {
  addedChords: [],
  chordsToAdd: [],
  replacingChord: null,
  addedChordsMode: 'play',
  key: 'C',
  mood: '',
  chordsLenght: 1,
};

interface Context {
  state: State;
  dispatch: (action: Action) => void;
}

const chordsAdderStore = createContext<Context>({ state: initialState, dispatch: () => {} });
const { Provider } = chordsAdderStore;

const ChordsAdderProvider = ({ children }: any) => {
  const chordsCreator = new MidiChordsCreator();

  const [state, dispatch] = useReducer((state: State, action: Action) => {
    switch (action.type) {
      case 'SET_CHORDS_LENGHT':
        return {
          ...state,
          key: action.payload,
        };

      case 'SET_START_KEY':
        return {
          ...state,
          key: action.payload,
        };

      case 'SET_START_MOOD':
        return {
          ...state,
          mood: action.payload,
        };

      case 'ADD_CHORD':
        return {
          ...state,
          chordsToAdd: getAllReleases(action.payload) || [],
          addedChords: [...state.addedChords, action.payload],
        };

      case 'ADD_CHORD_SINGLE_TONE':
        return {
          ...state,
          addedChords: [...state.addedChords, action.payload],
        };

      case 'ADD_CHORDS_TO_ADD_SINGLE_TONE':
        return {
          ...state,
          chordsToAdd:
            getAllReleaserablesForTonality(chordStringToFullChord(state.key + state.mood)) || [],
        };

      case 'ADD_INITIAL_CHORDS_TO_ADD_SINGLE_TONE':
        const singleToneChord = chordStringToFullChord(state.key + state.mood);

        return {
          ...state,
          chordsToAdd: [...(getAllReleaserablesForTonality(singleToneChord) || [])],
        };

      case 'ADD_RANDOM_CHORDS_TO_ADD_SINGLE_TONE':
        return {
          ...state,
          addedChords:
            chordsCreator.getRandomCyclicChords(
              action.payload,
              chordStringToFullChord(state.key + state.mood)
            ) || [],
        };

      case 'ADD_CHORDS_TO_ADD':
        return {
          ...state,
          chordsToAdd: getAllReleases(action.payload) || [],
        };

      case 'ADD_INITIAL_CHORDS_TO_ADD':
        const keyChord = chordStringToFullChord(state.key + state.mood);
        return {
          ...state,
          chordsToAdd: [keyChord, ...(getAllReleases(keyChord) || [])],
        };

      case 'ADD_CHORDS_FOR_REPLACE':
        return {
          ...state,
          chordsToAdd: searchItemsForReplace(action.payload.previous, action.payload.next) || [],
        };

      case 'ADD_RANDOM_CHORDS_TO_ADD':
        const current = chordStringToFullChord(state.key + state.mood);
        return {
          ...state,
          addedChords: chordsCreator.getRandomCyclicChords(action.payload, current) || [],
        };

      case 'DELETE_CHORD':
        const newFilteredChords = [...state.addedChords];
        state.addedChords.splice(action.payload, 1);
        return {
          ...state,
          addedChords: newFilteredChords,
          chordsToAdd: getAllReleases(newFilteredChords[newFilteredChords.length - 1]) || [],
        };

      case 'DELETE_ALL_CHORDS':
        return {
          ...state,
          addedChords: [],
        };

      case 'DELETE_LAST_CHORD':
        return {
          ...state,
          addedChords: state.addedChords.slice(0, -1),
        };

      case 'SET_REPLACING_CHORD':
        return {
          ...state,
          replacingChord: action.payload,
        };

      case 'REPLACE_CHORD':
        const newReplacedChords = [...state.addedChords];
        if (state.replacingChord) {
          newReplacedChords.splice(state.replacingChord.idx, 1, action.payload);

          return {
            ...state,
            addedChords: newReplacedChords,
            chordsToAdd: getAllReleases(newReplacedChords[newReplacedChords.length - 1]) || [],
          };
        } else {
          return state;
        }

      case 'SET_ADDED_CHORDS_MODE':
        return {
          ...state,
          addedChordsMode: action.payload,
        };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { ChordsAdderProvider, chordsAdderStore };
