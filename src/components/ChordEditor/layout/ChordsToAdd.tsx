import { IconButton } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { chordsAdderStore } from '../../../context/ChordsAdderContext';
import { ChordModel } from '../../../dataset/all_chords_for_impro';
import { convertChordToString, playChord } from '../../../utils';
import { sortChordsByType } from '../../../utils';
import { theme } from '../../../utils/theme';
import { Button } from '../../global/Button';
import { Icon } from '../../global/Icon';
import { ChordsTitledLine } from './ChordsTitledLine';
import { KeyMoodSelector } from './KeySelector';

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

  const onRandomClick = () => {
    dispatch({
      type: 'ADD_RANDOM_CHORDS_TO_ADD',
      payload: 8,
    });
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
    <Container>
      <Chords>
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
      </Chords>
      <Actions>
        <IconButton onClick={onRandomClick}>
          <Icon type="radom" className="random-icon" fill={theme.colors.white} />
        </IconButton>
        <KeyMoodSelector />
      </Actions>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Chords = styled.div`
  > div {
    flex: 1;
  }

  display: flex;
  justify-content: space-between;

  @media ${theme.breakpoints.belowTablet} {
    flex-direction: column;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;

  .random-icon {
    width: 30px;
    height: 30px;
  }
`;
