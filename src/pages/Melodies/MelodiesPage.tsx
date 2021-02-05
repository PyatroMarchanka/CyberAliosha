import React, { useState } from 'react';
import { PartNote } from '../../dataset/all_chords_for_impro';
import CreateMidiFile from '../../MidiFileCreater/CreateMidiFile';
import MidiChordsCreator from '../../MidiFileCreater/MidiChordsCreator';
import { SheetStave } from './SheetStave';

interface Props {}

export const MelodiesPage = ({}: Props) => {
  const chordsCreator = new MidiChordsCreator();
  const chords = chordsCreator.getNewChords(4);
  console.log('chords', chords);

  const fileEditor = new CreateMidiFile(chords);
  const [part, setPart] = useState<PartNote[][]>([]);

  const generateMelody = () => {
    const newPart = fileEditor.addPart({
      type: 'soprano',
      notesLength: 'middle',
      function: 'solo',
      restProbability: 0,
    });

    setPart(newPart);
  };

  return (
    <div>
      <SheetStave generateMelody={generateMelody} bars={part} />
    </div>
  );
};
