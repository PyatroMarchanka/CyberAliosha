import { randomIntegerRange } from '../utils';
import { ChordModel, PartNote } from './../dataset/all_chords_for_impro';
import { PartOptions } from './PartCreator';
import PartsFabric from './PartsFabric';

export const generateMelody = (chords: ChordModel[], partOptions: PartOptions, loopCounts = 1) => {
  const partFabric = new PartsFabric(chords, loopCounts);

  const melody = partFabric.addPart(partOptions);
  return melody;
};

export const addOneMorePartToPart = (part: PartNote[][], chords: ChordModel[]): PartNote[][] => {
  const newPart = part.map((bar, idx) =>
    bar.map((note) => addRandomVoiceNoteToPartNote(note, part, chords[idx]))
  );

  return newPart;
};

const addRandomVoiceNoteToPartNote = (
  note: PartNote,
  part: PartNote[][],
  chord: ChordModel
): PartNote => {
  const newVoiceNote = chord[2][randomIntegerRange(0, chord[2].length)] + '6';

  const newPartNote = {
    ...note,
    note: [...note.note, newVoiceNote],
  };

  return newPartNote;
};

const addLowerVoiceNoteToPartNote = (
  note: PartNote,
  part: PartNote[][],
  chord: ChordModel
): PartNote => {
  const newVoiceNote = chord[2][randomIntegerRange(0, chord[2].length)] + '5';

  const newPartNote = {
    ...note,
    note: [...note.note, newVoiceNote],
  };

  return newPartNote;
};
