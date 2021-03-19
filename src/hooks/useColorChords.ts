import React, { useContext, useState } from 'react';
import * as Tone from 'tone';
import { settingsStore } from '../context/SettingsProvider';
import { ChordModel } from '../dataset/all_chords_for_impro';

export const colorChordsOnPlay = (
  chords: ChordModel[],
  setColorChord: (idx: number | undefined) => void,
  bpm: number
) => {
  Tone.Transport.start();

  var N = (4 * 60) / bpm;

  chords.forEach((_, idx, allChords) => {
    Tone.Transport.scheduleOnce(() => {
      setColorChord(idx);
    }, N * idx);

    if (idx === allChords.length - 1) {
      Tone.Transport.scheduleOnce(() => {
        setColorChord(undefined);
      }, N * idx + 1);
    }
  });
};

export const stopTransport = () => {
  Tone.Transport.stop();
};

interface Props {
  chords: ChordModel[];
}

export const useColorChords = ({ chords }: Props) => {
  const {
    state: { bpm },
  } = useContext(settingsStore);

  const [colorChord, setColorChord] = useState<number | undefined>(undefined);

  const onPlay = () => {
    if (setColorChord) {
      colorChordsOnPlay(chords, setColorChord, bpm);
    }
  };

  const onStop = () => {
    stopTransport();
    if (setColorChord) {
      setColorChord(undefined);
    }
  };

  return { colorChord, onPlay, onStop };
};
