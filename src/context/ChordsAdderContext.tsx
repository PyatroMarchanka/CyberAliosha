import React, { createContext, useReducer } from 'react';
import { ChordModel } from '../dataset/all_chords_for_impro';
import ItemsSearcher from '../MidiFileCreater/ItemsSearcher';
import MidiChordsCreator from '../MidiFileCreater/MidiChordsCreator';
import { convertChordToString } from '../MidiFileCreater/utils';

interface State {
  addedChords: ChordModel[];
  chordsToAdd: ChordModel[];
  replacingChord: { chord: ChordModel; idx: number } | null;
}

interface Action {
  type:
    | 'ADD_CHORD'
    | 'ADD_CHORDS_TO_ADD'
    | 'DELETE_CHORD'
    | 'REPLACE_CHORD'
    | 'ADD_RANDOM_CHORDS_TO_ADD'
    | 'SET_REPLACING_CHORD';
  payload?: any;
}

const initialState = {
  addedChords: [],
  chordsToAdd: [],
  replacingChord: null,
};

interface Context {
  state: State;
  dispatch: (action: Action) => void;
}

const chordsAdderStore = createContext<Context>({ state: initialState, dispatch: () => {} });
const { Provider } = chordsAdderStore;

const ChordsAdderProvider = ({ children }: any) => {
  const chordsCreator = new MidiChordsCreator();
  const chordSearcher = new ItemsSearcher();

  const [state, dispatch] = useReducer((state: State, action: Action) => {
    switch (action.type) {
      case 'ADD_CHORD':
        return {
          ...state,
          chordsToAdd: chordSearcher.searchItems(action.payload) || [],
          addedChords: [...state.addedChords, action.payload],
        };

      case 'ADD_CHORDS_TO_ADD':
        return {
          ...state,
          chordsToAdd: chordSearcher.searchItems(action.payload) || [],
        };

      case 'ADD_RANDOM_CHORDS_TO_ADD':
        return {
          ...state,
          chordsToAdd: chordsCreator.generateChords(8) || [],
        };

      case 'DELETE_CHORD':
        const newFilteredChords = [...state.addedChords];
        state.addedChords.splice(action.payload, 1);
        return {
          ...state,
          addedChords: newFilteredChords,
          chordsToAdd:
            chordSearcher.searchItems(newFilteredChords[newFilteredChords.length - 1]) || [],
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
            chordsToAdd:
              chordSearcher.searchItems(newReplacedChords[newReplacedChords.length - 1]) || [],
          };
        } else {
          return state;
        }

      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { ChordsAdderProvider, chordsAdderStore };
