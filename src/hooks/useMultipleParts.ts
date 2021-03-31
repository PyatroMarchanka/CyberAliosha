import { PartOptions } from '../musicBrain/PartCreator';
import { useContext, useEffect, useState } from 'react';
import PartsFabric from '../musicBrain/PartsFabric';
import { ChordModel, PartNote } from '../dataset/all_chords_for_impro';
import { settingsStore } from '../context/SettingsProvider';

export const useMultipleParts = (chords: ChordModel[]) => {
  const {
    state: { notesLength, notesPattern },
  } = useContext(settingsStore);

  const partOptions: PartOptions = {
    type: 'soprano',
    notesLength: notesLength,
    function: 'accompaniment',
    pattern: notesPattern,
    restProbability: 0,
  };

  const [partsFabric, setPartsFabric] = useState<PartsFabric | null>();

  const [parts, setParts] = useState<PartNote[][][]>([]);

  useEffect(() => {
    if (chords && chords.length) {
      setPartsFabric(new PartsFabric(chords, 1));
    }
  }, [chords]);

  const addPart = () => {
    if (!partsFabric) return;

    const newPart = partsFabric?.addPart(partOptions);
    setParts([...parts, newPart]);
  };

  const deleteLastPart = () => {
    setParts(parts.slice(0, -1));
  };

  return { parts, addPart, deleteLastPart };
};
