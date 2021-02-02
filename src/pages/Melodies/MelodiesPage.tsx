import React from 'react';
import CreateMidiFile from '../../MidiFileCreater/CreateMidiFile';
import MidiChordsCreator from '../../MidiFileCreater/MidiChordsCreator';
import { PianoRoll } from './PianoRoll';
import { SheetStave } from './SheetStave';

interface Props {}

export const MelodiesPage = ({}: Props) => {
  const chordsCreator = new MidiChordsCreator();
  const chords = chordsCreator.getNewChords(4);
  const fileEditor = new CreateMidiFile(chords);
  const part = fileEditor.addPart({
    type: 'soprano',
    notesLength: 'middle',
    function: 'solo',
    restProbability: 0,
  });

  return (
    <div>
      <SheetStave notes={part} />
    </div>
  );
};
