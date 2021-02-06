import React, { useEffect, useState } from 'react';
import { ChordModel, NotesLengthType, PartNote } from '../../dataset/all_chords_for_impro';
import CreateMidiFile from '../../MidiFileCreater/CreateMidiFile';
import MidiChordsCreator from '../../MidiFileCreater/MidiChordsCreator';
import { playAllChords, playMelody } from '../../utils';
import { SheetStave } from './SheetStave';

interface Props {}

export const MelodiesPage = ({}: Props) => {
  const chordsCreator = new MidiChordsCreator();
  const [chords, setChords] = useState<ChordModel[]>([]);
  console.log('chords', chords);

  const fileEditor = new CreateMidiFile(chords);
  const [part, setPart] = useState<PartNote[][]>([]);

  const playPart = () => {
    playAllChords(chords);
    playMelody(part.flat());
  };

  const generateMelody = () => {
    const newPart = fileEditor.addPart({
      type: 'soprano',
      notesLength: NotesLengthType.Seldom,
      function: 'solo',
      restProbability: 0,
    });

    setPart(newPart);
  };

  useEffect(() => {
    const chords: ChordModel[] = chordsCreator.getNewChords(16);
    setChords(chords);
  }, []);

  return (
    <div>
      <SheetStave playMelody={playPart} generateMelody={generateMelody} bars={part} />
    </div>
  );
};
