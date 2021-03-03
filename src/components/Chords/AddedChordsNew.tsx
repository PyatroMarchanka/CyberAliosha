import React, { useContext, useEffect, useState } from 'react';
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
import { VexChordsController } from '../../musicViews/VexChordsController';

export const AddedChordsNew = () => {
  const [playingChord] = useState<number | null>(null);
  const history = useHistory();
  const [showGuitarChords, setShowGuitarChords] = useState(true);
  const chordsPrefix = 'added-chords-';

  const [ChordsDrawer, setChordsDrawer] = useState<VexChordsController | null>(null);

  const { Player, MPlayer } = useMidiPlayer();

  const {
    state: { addedChords, replacingChord },
    dispatch,
  } = useContext(chordsAdderStore);

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

  useEffect(() => {
    setChordsDrawer(new VexChordsController(chordsPrefix));
  }, []);

  const chords = [
    {
      name: 'Am',
      chord: [
        [1, 2],
        [2, 1],
        [3, 2],
        [4, 0], // fret 0 = open string
        [5, 'x'], // fret x = muted string
        [6, 'x'],
      ],

      // optional: position marker
      position: 5, // start render at fret 5

      // optional: barres for barre chords
      // barres: [{ fromString: 6, toString: 1, fret: 1 }],

      // optional: tuning keys
      tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
    },
    {
      name: 'E7',
      chord: [
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 3], // fret 0 = open string
        [5, 'x'], // fret x = muted string
        [6, 'x'],
      ],

      // optional: position marker
      position: 5, // start render at fret 5

      // optional: barres for barre chords
      // barres: [{ fromString: 6, toString: 1, fret: 1 }],

      // optional: tuning keys
      tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
    },
  ];

  useEffect(() => {
    ChordsDrawer?.drawChords(addedChords);
  }, [addedChords]);

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

      {!!addedChords.length && (
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
          {showGuitarChords && <div></div>}
          <Chords>
            {chords.map((chord, idx) => (
              <div id={`${chordsPrefix}${idx}`}></div>
            ))}
          </Chords>
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
    color: ${theme.colors.white};
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

const Chords = styled.div`
  display: flex;
  background-color: ${theme.colors.white};
`;
