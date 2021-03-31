import { useCallback, useContext, useState } from 'react';
import { settingsStore } from '../context/SettingsProvider';
import { generateMelody } from '../musicBrain/melodyUtils';
import { ChordModel, PartNote } from './../dataset/all_chords_for_impro';

export const usePart = (chords: ChordModel[]) => {
  const {
    state: { notesLength, notesPattern },
  } = useContext(settingsStore);

  const [part, setPart] = useState<PartNote[][]>([]);

  const getMelody = useCallback(() => {
    const newPart = generateMelody(chords, {
      type: 'soprano',
      notesLength: notesLength,
      function: 'accompaniment',
      pattern: notesPattern,
      restProbability: 0,
    });

    setPart(newPart);
  }, [chords, notesLength, notesPattern]);

  return { part, setPart, getMelody };
};
