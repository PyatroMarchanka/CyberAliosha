import React, { useContext, useState } from "react";

import { ChordModel, PartNote } from "../dataset/all_chords_for_impro";
import { useMidiPlayer } from "../utils/useMidiPlayer";

import { settingsStore } from "../context/SettingsProvider";

interface Props {
  part?: PartNote[][];
  chords?: ChordModel[];
  onPlay?: (chords?: ChordModel[], part?: PartNote[][]) => void;
  onStop?: (chords?: ChordModel[], part?: PartNote[][]) => void;
}

export const usePlayMelodyAndChords = ({
  part,
  chords,
  onPlay,
  onStop,
}: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { Player, MPlayer } = useMidiPlayer(setIsPlaying);

  const {
    state: { playAccompanimentWithMelody, notesCountToPlayForChord },
  } = useContext(settingsStore);

  const playPart = (chords?: ChordModel[], part?: PartNote[][]) => {
    setIsPlaying(true);

    if ((chords && part && playAccompanimentWithMelody) || (chords && !part)) {
      Player?.playPartChords(
        chords,
        () => setIsPlaying(false),
        notesCountToPlayForChord
      );
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
