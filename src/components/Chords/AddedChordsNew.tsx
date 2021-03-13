import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { routes } from '../../pages/routes';

import { Typography } from '@material-ui/core';

import styled from 'styled-components';
import { theme } from '../../utils/theme';
import { MetalBlock } from '../../styled/global';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { chordsAdderStore } from '../../context/ChordsAdderContext';
import { ChordModel } from '../../dataset/all_chords_for_impro';
import { convertChordToString } from '../../utils';

import { ChordWithEditModal } from './ChordWithEditModal';
import { StyledProgression } from '../../styled/Chords';
import { Button } from '../global/Button';

import { useMidiPlayer } from '../../utils/useMidiPlayer';
import { Actions } from './Actions';
import { useColorChords } from '../../hooks/useColorChords';
import { ChordCharts } from './ChordCharts';
import { settingsStore } from '../../context/SettingsProvider';

export const AddedChordsNew = () => {
  const [playingChord] = useState<number | null>(null);
  const history = useHistory();
  const chordsPrefix = 'added-chords-';

  const { Player, MPlayer } = useMidiPlayer();

  const {
    state: { addedChords, replacingChord },
    dispatch,
  } = useContext(chordsAdderStore);

  const {
    state: { chordsGuitarMode },
  } = useContext(settingsStore);

  const { colorChord, onPlay, onStop } = useColorChords({ chords: addedChords });

  const onReplace = (previousChord: ChordModel, nextChord: ChordModel, idx: number) => {
    dispatch({
      type: 'ADD_CHORDS_FOR_REPLACE',
      payload: { previous: previousChord, next: nextChord },
    });

    dispatch({
      type: 'SET_REPLACING_CHORD',
      payload: { chord: addedChords[idx], idx },
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

  const openInMelodyEditor = () => {
    history.push({
      pathname: routes.melodyEditor,
      state: { chords: addedChords },
    });
  };

  return (
    <Container>
      <Header>
        {!!addedChords.length ? (
          <Typography className="added-title" variant="h6">
            Added chords:
          </Typography>
        ) : (
          <Typography className="added-title" variant="h6">
            No chords
          </Typography>
        )}
        <Actions chords={addedChords} onPlay={onPlay} onStop={onStop} />
      </Header>

      {!!addedChords.length && chordsGuitarMode && (
        <ChordCharts selectedChord={colorChord} chords={addedChords} chordsPrefix={chordsPrefix} />
      )}
      {!!addedChords.length && !chordsGuitarMode && (
        <AllChordsLines>
          <StyledProgression>
            <TransitionGroup className="list">
              {addedChords.map((chord: ChordModel, idx, arr) => (
                <CSSTransition key={`chord-${chord[0]}-${idx}`} timeout={500} classNames="item">
                  <ChordWithEditModal
                    className={`chord ${true && 'half'}`}
                    isSelected={
                      idx === replacingChord?.idx || idx === playingChord || idx === colorChord
                    }
                    onClose={() => onClose()}
                    onDelete={() => onDelete(chord, idx)}
                    onReplace={() => onReplace(arr[idx - 1], arr[idx + 1] || arr[0], idx)}
                    playChord={() => Player?.playChord(chord)}
                  >
                    {convertChordToString(chord)}
                  </ChordWithEditModal>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </StyledProgression>
        </AllChordsLines>
      )}

      {!!addedChords.length && (
        <AddMelody>
          <Button onClick={openInMelodyEditor} type="primary">
            Add melody
          </Button>
        </AddMelody>
      )}
      {MPlayer}
    </Container>
  );
};

const Container = styled(MetalBlock)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .added-title {
    /* color: ${theme.colors.white}; */
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${theme.breakpoints.belowMobileL} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const AllChordsLines = styled.div`
  margin: 20px 0;
`;

const AddMelody = styled.div`
  display: flex;
  justify-content: flex-end;
`;
