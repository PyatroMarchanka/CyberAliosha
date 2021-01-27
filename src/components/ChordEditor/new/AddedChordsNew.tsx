import { IconButton, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { chordsAdderStore } from '../../../context/ChordsAdderContext';
import { ChordModel } from '../../../dataset/all_chords_for_impro';
import { convertChordToString, playChord } from '../../../MidiFileCreater/utils';
import { theme } from '../../../utils/theme';
import { ChordWithEditModal } from './ChordWithEditModal';
import SaveIcon from '@material-ui/icons/Save';
import { saveSavedChords } from '../../../localStorageUtils/addedChordsStorage';
import { StyledProgression, StyledProgressionContainer } from '../../../styled/Chords';
import { RadioButtonsGroup } from '../../global/RadioButtonsGroup';
import { Button } from '../../global/Button';

interface Props {}

export const AddedChordsNew = ({}: Props) => {
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

  const onClose = () => {
    dispatch({
      type: 'ADD_CHORDS_TO_ADD',
      payload: addedChords[addedChords.length - 1],
    });
  };

  const onModeChange = (value: string) => {
    dispatch({
      type: 'SET_ADDED_CHORDS_MODE',
      payload: value,
    });
  };

  return (
    <StyledProgressionContainer>
      <Header>
        <Typography variant="h5">Added chords:</Typography>
        <RadioButtonsGroup
          title="Chords mode:"
          value={addedChordsMode}
          onChange={(value) => onModeChange(value)}
          items={[
            { label: 'Edit', value: 'edit' },
            { label: 'Play', value: 'play' },
          ]}
        />
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
              isSelected={idx === replacingChord?.idx}
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
        <Button disabled={!addedChords.length} onClick={deleteAll} color={theme.colors.pink}>
          Delete all
        </Button>
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
