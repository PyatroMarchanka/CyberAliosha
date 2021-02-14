import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { routes } from '../../../pages/routes';

import { IconButton, Typography } from '@material-ui/core';
import StopIcon from '@material-ui/icons/Stop';
import BackspaceIcon from '@material-ui/icons/Backspace';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import styled from 'styled-components';
import { theme } from '../../../utils/theme';
import { MetalBlock } from '../../../styled/global';

import { chordsAdderStore } from '../../../context/ChordsAdderContext';
import { ChordModel } from '../../../dataset/all_chords_for_impro';
import { convertChordToString, playChord } from '../../../utils';
import { Player } from '../../../utils/Player';

import { ChordWithEditModal } from './ChordWithEditModal';
import { StyledProgression } from '../../../styled/Chords';
import { Icon } from '../../global/Icon';
import { SaveChordsModal } from './SaveChordsModal';
import { Button } from '../../global/Button';

interface Props {}

export const AddedChordsNew = ({}: Props) => {
  const [playingChord, setPlayingChord] = useState<number | null>(null);
  const history = useHistory();

  const [isPlaying, setIsPlaying] = useState(false);

  const [PlayerInst] = useState<Player>(new Player());

  const {
    state: { addedChords, replacingChord, addedChordsMode },
    dispatch,
  } = useContext(chordsAdderStore);

  const handlePlaying = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      PlayerInst.setPartChords(addedChords, 4, 2);
      PlayerInst.playAll();
    } else {
      setIsPlaying(false);
      PlayerInst.stopMelody();
    }
  };

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

  const openInMelodyEditor = () => {
    history.push({
      pathname: routes.melodyEditor,
      state: { chords: addedChords },
    });
  };

  return (
    <Container>
      {addedChords.length > 0 && (
        <Header>
          <Typography className="added-title" variant="h5">
            Added chords:
          </Typography>
        </Header>
      )}
      {!addedChords.length ? (
        <Typography className="added-title" variant="h6">
          No chords
        </Typography>
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
      <Actions>
        <IconButton disabled={!addedChords.length} onClick={handlePlaying} className="icon">
          {isPlaying ? (
            <Icon type="material" fill={theme.colors.white} Icon={StopIcon} className="play-icon" />
          ) : (
            <Icon
              type="play"
              disabled={!addedChords.length}
              fill={theme.colors.white}
              className="play-icon"
            />
          )}
        </IconButton>
        <IconButton className="icon" disabled={!addedChords.length} onClick={deleteLast}>
          <Icon
            type="material"
            Icon={BackspaceIcon}
            disabled={!addedChords.length}
            fill={theme.colors.white}
            className="play-icon"
          />
        </IconButton>
        <IconButton className="icon" disabled={!addedChords.length} onClick={deleteAll}>
          <Icon
            type="material"
            Icon={DeleteForeverIcon}
            disabled={!addedChords.length}
            fill={theme.colors.white}
            className="play-icon  remove-all-icon"
          />
        </IconButton>
        <SaveChordsModal chords={addedChords} />
        <Button onClick={openInMelodyEditor} disabled={!addedChords.length} type="primary">
          Add melody
        </Button>
      </Actions>
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
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .icon {
    color: ${theme.colors.white};

    &.disabled {
      color: rgba(255, 255, 255, 0.3);
      fill: rgba(255, 255, 255, 0.3);
    }
  }

  .play-icon {
    width: 30px;
    height: 30px;
  }

  .remove-all-icon {
    width: 35px;
    height: 35px;
  }
`;
