import { NotesLengthType } from '../dataset/all_chords_for_impro';
import { randomIntegerRange, createDurMeasure } from '../utils';
import { PartOptions } from './PartCreator';

export interface Pattern {
  chordPitch: number;
  dur: number;
}
export default class PatternCreator {
  getPattern(notesLengthType: NotesLengthType, type: PartOptions['type']) {
    const durs = createDurMeasure(notesLengthType);
    const result: Pattern[] = [];

    durs?.forEach((dur, idx) => {
      if (idx === 0 && type === 'bass') {
        result.push({
          chordPitch: 0,
          dur: dur,
        });
      } else if (type === 'bass' && idx === 1 && durs[0] < 0.25) {
        result.push({
          chordPitch: 0,
          dur: dur,
        });
      } else {
        result.push({
          chordPitch: randomIntegerRange(0, 3),
          dur: dur,
        });
      }
    });

    return result;
  }
}
