import { ChordModel } from '../dataset/all_chords_for_impro';

export const sortChordsByType = (types: ChordModel[1][], chords: ChordModel[]) => {
  return chords.filter((chord) => types.includes(chord[1]));
};
