import CreateMidiFile from '../musicBrain/CreateMidiFile';
import { PartNote, ChordModel } from './../dataset/all_chords_for_impro';
import { getNotesForChord } from './MidiPlayer';

export const getFileUri = (part: PartNote[][], chords: ChordModel[]) => {
  const midiFileCreator = new CreateMidiFile(chords);
  const chordsPart = chords.map((chord) => getNotesForChord(chord, 4));
  midiFileCreator.addAllPartsInFile([part, chordsPart]);

  return midiFileCreator.getURI();
};
