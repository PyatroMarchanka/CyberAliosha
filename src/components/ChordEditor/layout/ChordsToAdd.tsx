import React, { useContext, useEffect } from 'react';
import { chordsAdderStore } from '../../../context/ChordsAdderContext';
import { ChordModel } from '../../../dataset/all_chords_for_impro';
import { convertChordToString, getDataSet, playChord } from '../../../MidiFileCreater/utils';
import { sortChordsByType } from '../../../utils/chordsUtils';
import { ChordsTitledLine } from './ChordsTitledLine';

export const ChordsToAdd = () => {
  const { state, dispatch } = useContext(chordsAdderStore);

  const onChordClick = (chord: ChordModel) => {
    playChord(convertChordToString(chord));

    if (state.replacingChord) {
      dispatch({
        type: 'REPLACE_CHORD',
        payload: chord,
      });

      dispatch({
        type: 'SET_REPLACING_CHORD',
        payload: null,
      });
    } else {
      dispatch({
        type: 'ADD_CHORD',
        payload: chord,
      });
    }
  };

  useEffect(() => {
    if (!state.addedChords.length) {
      dispatch({
        type: 'ADD_CHORDS_TO_ADD',
        payload: [state.key, state.mood],
      });
    } else {
      const lastChord = state.addedChords[state.addedChords.length - 1];

      dispatch({
        type: 'ADD_CHORDS_TO_ADD',
        payload: lastChord,
      });
    }
  }, [state.addedChords, state.key, state.mood]);

  return (
    <div>
      <ChordsTitledLine
        onChordClick={onChordClick}
        chords={sortChordsByType(['m', 'm7'], state.chordsToAdd)}
        title="Minor chords:"
      />
      <ChordsTitledLine
        onChordClick={onChordClick}
        chords={sortChordsByType(['', 'maj'], state.chordsToAdd)}
        title="Major chords:"
      />
      <ChordsTitledLine
        onChordClick={onChordClick}
        chords={sortChordsByType(['7', 'dim7', 'aug', 'dim7', 'm7b5'], state.chordsToAdd)}
        title="Unstable chords:"
      />
    </div>
  );
};
