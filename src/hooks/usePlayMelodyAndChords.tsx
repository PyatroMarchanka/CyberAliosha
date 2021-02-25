import React, { useContext, useState } from 'react';
import { chordsAdderStore } from '../context/ChordsAdderContext';
import { ChordModel, PartNote } from '../dataset/all_chords_for_impro';
import { useMidiPlayer } from '../utils/useMidiPlayer';

interface Props {}

export const usePlayMelodyAndChords = ({
  part,
  chords,
}: {
  part: PartNote[][];
  chords: ChordModel[];
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { Player, MPlayer } = useMidiPlayer(setIsPlaying);

  const {
    state: { playAccompanimentWithMelody },
    dispatch,
  } = useContext(chordsAdderStore);

  const playPart = (loops: number = 2) => {
    if (playAccompanimentWithMelody) {
      Player?.playPartChords(chords);
    }
    Player?.playPart(part.flat(), () => setIsPlaying(false));
  };

  const handlePlaying = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      playPart(2);
    } else {
      setIsPlaying(false);
      Player?.stopAll();
    }
  };

  return <div></div>;
};
