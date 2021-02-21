import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { IconButton, Typography } from '@material-ui/core';
import StopIcon from '@material-ui/icons/Stop';
import BackspaceIcon from '@material-ui/icons/Backspace';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { chordsAdderStore } from '../../context/ChordsAdderContext';
import { theme } from '../../utils/theme';
import { useMidiPlayer } from '../../utils/useMidiPlayer';
import { Icon } from '../global/Icon';
import { SaveChordsModal } from './SaveChordsModal';

interface Props {}

export const Actions = ({}: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const { Player, MPlayer } = useMidiPlayer(setIsPlaying);

  const {
    state: { addedChords, replacingChord, bpm },
    dispatch,
  } = useContext(chordsAdderStore);

  const handlePlaying = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      Player?.playPartChords(addedChords, () => setIsPlaying(false));
    } else {
      setIsPlaying(false);
      Player?.stopAll();
    }
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

  const buttonsDisabled = !addedChords.length || isPlaying;

  return (
    <ActionsContainer>
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
      <IconButton className="icon" disabled={buttonsDisabled} onClick={deleteLast}>
        <Icon
          type="material"
          Icon={BackspaceIcon}
          disabled={buttonsDisabled}
          fill={theme.colors.white}
          className="play-icon"
        />
      </IconButton>
      <IconButton className="icon" disabled={buttonsDisabled} onClick={deleteAll}>
        <Icon
          type="material"
          Icon={DeleteForeverIcon}
          disabled={buttonsDisabled}
          fill={theme.colors.white}
          className="play-icon  remove-all-icon"
        />
      </IconButton>
      <SaveChordsModal chords={addedChords} />
      {MPlayer}
    </ActionsContainer>
  );
};

const ActionsContainer = styled.div`
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
