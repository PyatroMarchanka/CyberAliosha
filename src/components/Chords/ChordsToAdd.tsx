import { IconButton } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { chordsAdderStore } from '../../context/ChordsAdderContext';
import {
  ChordModel,
  MajorChords,
  MinorChords,
  UnstableChords,
} from '../../dataset/all_chords_for_impro';
import { MetalBlock } from '../../styled/global';
import { sortChordsByType } from '../../utils';
import { theme } from '../../utils/theme';
import { useMidiPlayer } from '../../utils/useMidiPlayer';
import { Icon } from '../global/Icon';
import { ChordsTitledLine } from './ChordsTitledLine';
import { KeyMoodSelector } from './KeySelector';

export const ChordsToAdd = () => {
  const { state, dispatch } = useContext(chordsAdderStore);

  const { Player, MPlayer } = useMidiPlayer();

  const onChordClick = (chord: ChordModel) => {
    Player?.playChord(chord);

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
        type: 'ADD_INITIAL_CHORDS_TO_ADD',
      });
    } else {
      const lastChord = state.addedChords[state.addedChords.length - 1];

      dispatch({
        type: 'ADD_CHORDS_TO_ADD',
        payload: lastChord,
      });
    }
  }, [state.addedChords, state.key, state.mood, dispatch]);

  return (
    <Container>
      <Actions>
        <IconButton onClick={onRandomClick}>
          <Icon type="radom" className="random-icon" />
        </IconButton>
        <KeyMoodSelector />
      </Actions>
      <Chords>
        <ChordsTitledLine
          onChordClick={onChordClick}
          chords={sortChordsByType(Object.values(MinorChords), state.chordsToAdd)}
          title="Minor chords:"
        />
        <ChordsTitledLine
          onChordClick={onChordClick}
          chords={sortChordsByType(Object.values(MajorChords), state.chordsToAdd)}
          title="Major chords:"
        />
        <ChordsTitledLine
          onChordClick={onChordClick}
          chords={sortChordsByType(Object.values(UnstableChords), state.chordsToAdd)}
          title="Unstable chords:"
        />
      </Chords>
      {MPlayer}
    </Container>
  );
};

const Container = styled.div`
  /* padding: 20px; */
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

const Actions = styled(MetalBlock)`
  display: flex;
  justify-content: flex-start;

  .random-icon {
    width: 30px;
    height: 30px;
  }
`;
