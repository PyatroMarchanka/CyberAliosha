import { IconButton, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { chordsAdderStore } from '../../../context/ChordsAdderContext';
import { ChordModel } from '../../../dataset/all_chords_for_impro';
import {
  convertChordToString,
  playAllChords,
  playAllChordsArpeggiated,
  playChord,
  playPartChordsArpeggiated,
  stopMelody,
} from '../../../utils';
import { ChordWithEditModal } from './ChordWithEditModal';
import SaveIcon from '@material-ui/icons/Save';
import BackspaceIcon from '@material-ui/icons/Backspace';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { saveSavedChords } from '../../../localStorageUtils/addedChordsStorage';
import { StyledProgression } from '../../../styled/Chords';
import { Button } from '../../global/Button';
import { theme } from '../../../utils/theme';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import StopIcon from '@material-ui/icons/Stop';
import { Icon } from '../../global/Icon';

interface Props {}

export const AddedChordsNew = ({}: Props) => {
  const [playingChord, setPlayingChord] = useState<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const {
    state: { addedChords, replacingChord, addedChordsMode },
    dispatch,
  } = useContext(chordsAdderStore);

  const handlePlaying = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      // playAllChordsArpeggiated(addedChords, 4);
      playPartChordsArpeggiated(addedChords, 4);
    } else {
      setIsPlaying(false);
      stopMelody();
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
        <IconButton
          disabled={!addedChords.length}
          onClick={() => saveSavedChords(addedChords)}
          className="icon"
          edge="start"
          aria-label="menu"
        >
          <Icon
            type="material"
            Icon={SaveIcon}
            disabled={!addedChords.length}
            fill={theme.colors.white}
            className="play-icon"
          />
        </IconButton>
      </Actions>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;

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
