import { Button, IconButton, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { chordsAdderStore } from '../../../context/ChordsAdderContext';
import { ChordModel } from '../../../dataset/all_chords_for_impro';
import { convertChordToString, playAllChords, playChord } from '../../../utils';
import { ChordWithEditModal } from './ChordWithEditModal';
import SaveIcon from '@material-ui/icons/Save';
import BackspaceIcon from '@material-ui/icons/Backspace';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { saveSavedChords } from '../../../localStorageUtils/addedChordsStorage';
import { StyledProgression, StyledProgressionContainer } from '../../../styled/Chords';
import { RadioButtonsGroup } from '../../global/RadioButtonsGroup';
import { KeyMoodSelector } from './KeySelector';

interface Props {}

export const AddedChordsNew = ({}: Props) => {
  const [playingChord, setPlayingChord] = useState<number | null>(null);

  const {
    state: { addedChords, replacingChord, addedChordsMode },
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

  const deleteAll = () => {
    dispatch({
      type: 'DELETE_ALL_CHORDS',
    });
  };

  const deleteLast = () => {
    dispatch({
      type: 'DELETE_LAST_CHORD',
    });
  };

  const onClose = () => {
    dispatch({
      type: 'ADD_CHORDS_TO_ADD',
      payload: addedChords[addedChords.length - 1],
    });
  };

  const onRandomClick = () => {
    dispatch({
      type: 'ADD_RANDOM_CHORDS_TO_ADD',
      payload: 8,
    });
  };

  return (
    <StyledProgressionContainer>
      <Header>
        <Typography variant="h5">Added chords:</Typography>
        <Actions>
          <KeyMoodSelector />
          <Button onClick={onRandomClick} color="inherit" variant="outlined">
            Random
          </Button>
          <Button onClick={() => playAllChords(addedChords)} color="inherit" variant="outlined">
            Play
          </Button>
        </Actions>

        <IconButton
          disabled={!addedChords.length}
          onClick={() => saveSavedChords(addedChords)}
          className="icon"
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <SaveIcon fontSize="large" />
        </IconButton>
      </Header>
      {!addedChords.length ? (
        <Typography variant="h6">No chords</Typography>
      ) : (
        <StyledProgression>
          {addedChords.map((chord: ChordModel, idx) => (
            <ChordWithEditModal
              className={`chord ${true && 'half'}`}
              isSelected={idx === replacingChord?.idx || idx === playingChord}
              key={`chord-${chord[0]}-${idx}`}
              onClose={() => onClose()}
              onDelete={() => onDelete(chord, idx)}
              onReplace={() => onReplace(chord, idx)}
              playChord={() => playChord(convertChordToString(chord))}
            >
              {convertChordToString(chord)}
            </ChordWithEditModal>
          ))}
        </StyledProgression>
      )}
      <AlignedRight>
        <IconButton disabled={!addedChords.length} onClick={deleteLast} color="secondary">
          <BackspaceIcon fontSize="large" />
        </IconButton>
        <IconButton disabled={!addedChords.length} onClick={deleteAll} color="secondary">
          <DeleteForeverIcon fontSize="large" />
        </IconButton>
      </AlignedRight>
    </StyledProgressionContainer>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AlignedRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Actions = styled.div`
  > * {
    margin: 10px 0;
    display: block;
  }
`;
