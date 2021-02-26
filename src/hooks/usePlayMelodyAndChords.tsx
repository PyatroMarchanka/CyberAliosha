import { IconButton } from '@material-ui/core';
import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../components/global/Icon';
import { chordsAdderStore } from '../context/ChordsAdderContext';
import { ChordModel, PartNote } from '../dataset/all_chords_for_impro';
import { theme } from '../utils/theme';
import { useMidiPlayer } from '../utils/useMidiPlayer';
import StopIcon from '@material-ui/icons/Stop';
import { Checkbox } from '../components/global/Checkbox';

interface Props {
  part?: PartNote[][];
  chords?: ChordModel[];
  onPlay?: (chords?: ChordModel[], part?: PartNote[][]) => void;
  onStop?: (chords?: ChordModel[], part?: PartNote[][]) => void;
}

export const usePlayMelodyAndChords = ({ part, chords, onPlay, onStop }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { Player, MPlayer } = useMidiPlayer(setIsPlaying);

  const {
    state: { playAccompanimentWithMelody },
  } = useContext(chordsAdderStore);

  const playPart = (chords?: ChordModel[], part?: PartNote[][]) => {
    setIsPlaying(true);

    if ((chords && part && playAccompanimentWithMelody) || (chords && !part)) {
      Player?.playPartChords(chords);
    }
    if (part) {
      Player?.playPart(part.flat(), () => setIsPlaying(false));
    }
  };

  const stopAll = () => {
    setIsPlaying(false);
    Player?.stopAll();
  };

  const handlePlaying = () => {
    if (!isPlaying) {
      playPart(chords, part);

      if (onPlay) {
        onPlay(chords, part);
      }
    } else {
      stopAll();

      if (onStop) {
        onStop(chords, part);
      }
    }
  };

  return {
    handlePlaying,
    MPlayer,
    isPlaying,
    Player,
    playPart,
    stopAll,
  };
};
