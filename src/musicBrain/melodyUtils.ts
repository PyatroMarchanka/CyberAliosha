import { Lyric } from '../utils/textUtils';
import { ChordModel, NotesLengthType, NotesPatterns } from './../dataset/all_chords_for_impro';
import PartsFabric from './PartsFabric';

interface PartOptions {
  type: 'soprano';
  notesLength: NotesLengthType;
  function: 'accompaniment';
  pattern: NotesPatterns;
  restProbability: number;
  lyric?: Lyric;
}

export const generateMelody = (chords: ChordModel[], partOptions: PartOptions, loopCounts = 1) => {
  const partFabric = new PartsFabric(chords, loopCounts);

  const melody = partFabric.addPart(partOptions);
  return melody;
};
