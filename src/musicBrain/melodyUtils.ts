import { ChordModel } from './../dataset/all_chords_for_impro';
import { PartOptions } from './PartCreator';
import PartsFabric from './PartsFabric';

export const generateMelody = (chords: ChordModel[], partOptions: PartOptions, loopCounts = 1) => {
  const partFabric = new PartsFabric(chords, loopCounts);

  const melody = partFabric.addPart(partOptions);
  return melody;
};
