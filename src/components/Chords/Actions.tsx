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
import { PlayStopButton } from '../global/PlayStopButton';
import { colorChordsOnPlay, stopTransport } from '../../utils/PlayerLegacy';
import { ChordModel } from '../../dataset/all_chords_for_impro';

interface Props {
  play?: boolean;
  deleteLast?: boolean;
  deleteAll?: boolean;
  chords: ChordModel[];
}

export const Actions = ({ chords }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const { Player, MPlayer } = useMidiPlayer(setIsPlaying);
  const [colorChord, setColorChord] = useState<number | null>(null);

  const {
    state: { bpm },
    dispatch,
  } = useContext(chordsAdderStore);

  const handlePlaying = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      Player?.playPartChords(chords, () => setIsPlaying(false));
      colorChordsOnPlay(chords, setColorChord, bpm);
    } else {
      setIsPlaying(false);
      stopTransport();
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

  const buttonsDisabled = !chords.length || isPlaying;

  return (
    <ActionsContainer>
      <PlayStopButton handlePlaying={handlePlaying} isPlaying={isPlaying} />
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
      <SaveChordsModal chords={chords} />
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