import CreateMidiFile from '../musicBrain/CreateMidiFile';
import { PartNote, ChordModel } from './../dataset/all_chords_for_impro';

export const getFileUri = (part: PartNote[][], chords: ChordModel[]) => {
  const midiFileCreator = new CreateMidiFile(chords);
  midiFileCreator.addAllPartsInFile([part]);

  return midiFileCreator.getURI();
};
