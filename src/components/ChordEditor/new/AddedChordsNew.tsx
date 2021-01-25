import React, { useContext } from 'react';
import { chordsAdderStore } from '../../../context/ChordsAdderContext';
import { ChordModel } from '../../../dataset/all_chords_for_impro';
import { convertChordToString } from '../../../MidiFileCreater/utils';
import { ChordWithEditModal } from './ChordWithEditModal';

interface Props {}

export const AddedChordsNew = ({}: Props) => {
  const {
    state: { addedChords, replacingChord },
    dispatch,
  } = useContext(chordsAdderStore);

  const onReplace = (chord: ChordModel, idx: number) => {
    dispatch({
      type: 'ADD_CHORDS_TO_ADD',
      payload: chord,
    });

    dispatch({
      type: 'SET_REPLACING_CHORD',
      payload: { chord, idx },
    });
  };

  const onDelete = (chord: ChordModel, idx: number) => {
    dispatch({
      type: 'DELETE_CHORD',
      payload: idx,
    });
  };

  const onClose = () => {
    dispatch({
      type: 'ADD_CHORDS_TO_ADD',
      payload: addedChords[addedChords.length - 1],
    });
  };

  return (
    <div>
      {addedChords.map((chord: ChordModel, idx) => (
        <ChordWithEditModal
          isSelected={idx === replacingChord?.idx}
          key={`chord-${chord[0]}-${idx}`}
          onClose={() => onClose()}
          onDelete={() => onDelete(chord, idx)}
          onReplace={() => onReplace(chord, idx)}
        >
          {convertChordToString(chord)}
        </ChordWithEditModal>
      ))}
    </div>
  );
};
