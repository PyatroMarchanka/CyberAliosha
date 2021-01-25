import React, { useContext, useEffect } from 'react';
import { chordsAdderStore } from '../../../context/ChordsAdderContext';
import { ChordModel } from '../../../dataset/all_chords_for_impro';
import { convertChordToString } from '../../../MidiFileCreater/utils';
import { Button } from '../../global/Button';

interface Props {}

export const ChordsAdderNew = ({}: Props) => {
  const { state, dispatch } = useContext(chordsAdderStore);

  useEffect(() => {
    if (!state.addedChords.length) {
      dispatch({
        type: 'ADD_CHORDS_TO_ADD',
        payload: ['C', ''],
      });
    } else {
      const lastChord = state.addedChords[state.addedChords.length - 1];

      dispatch({
        type: 'ADD_CHORDS_TO_ADD',
        payload: lastChord,
      });
    }
  }, [state.addedChords]);

  const onChordClick = (chord: ChordModel) => {
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

  return (
    <div>
      {state.chordsToAdd.map((chord, idx) => (
        <Button
          key={`${chord[0]}-${idx}`}
          onClick={() => onChordClick(chord)}
        >{`${chord[0]}${chord[1]}`}</Button>
      ))}
    </div>
  );
};
