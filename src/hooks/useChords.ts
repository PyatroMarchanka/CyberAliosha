import { useCallback, useContext, useEffect, useState } from 'react';
import { settingsStore } from '../context/SettingsProvider';
import { ChordModel, PartNote } from '../dataset/all_chords_for_impro';
import { generateMelody } from '../musicBrain/melodyUtils';
import MidiChordsCreator from '../musicBrain/MidiChordsCreator';

export const useChords = (location: any, locationChords?: ChordModel[]) => {
  const {
    state: { notesLength, notesPattern, playAccompanimentWithMelody, chordsToGenerateCount },
  } = useContext(settingsStore);

  const chordsCreator = new MidiChordsCreator();
  const [chords, setChords] = useState<ChordModel[]>([]);
  const [part, setPart] = useState<PartNote[][]>([]);

  const generateChords = () => {
    const chords: ChordModel[] | undefined = chordsCreator.getRandomCyclicChords(
      chordsToGenerateCount
    );

    if (chords) {
      let eightChords: ChordModel[] = [];
      while (eightChords.length < 8) {
        eightChords = [...eightChords, ...chords];
      }

      setChords(eightChords);
      setPart([]);
    }
  };

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

  useEffect(() => {
    if (locationChords) {
      setChords(locationChords);
    } else {
      generateChords();
    }
  }, [location]);

  return {
    chords,
    setChords,
    generateChords,
    getMelody,
    part,
    setPart,
  };
};
