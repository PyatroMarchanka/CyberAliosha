import { IconButton, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { chordsAdderStore } from '../../../context/ChordsAdderContext';
import { ChordModel } from '../../../dataset/all_chords_for_impro';
import { convertChordToString } from '../../../MidiFileCreater/utils';
import { theme } from '../../../utils/theme';
import { ChordWithEditModal } from './ChordWithEditModal';
import SaveIcon from '@material-ui/icons/Save';
import { saveSavedChords } from '../../../localStorageUtils/addedChordsStorage';
import { StyledProgression, StyledProgressionContainer } from '../../../styled/Chords';
import { ChordsProgression } from '../../global/ChordsProgression';

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

  if (!addedChords.length) {
    return null;
  }

  return (
    <ChordsProgression
      title="Added chords:"
      action={
        <IconButton
          onClick={() => saveSavedChords(addedChords)}
          className="icon"
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <SaveIcon fontSize="large" />
        </IconButton>
      }
      chords={addedChords}
    />
  );
};
