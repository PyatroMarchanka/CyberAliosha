import ALL_CHORDS_FOR_IMPROVISE from '../dataset/all_chords_for_impro';
import { randomIntegerRange } from './utils';
import releases from './Releaser';

export default class MidiChordsCreator {
  constructor() {
    this.chords = [];
  }

  generateChords(all_chords, count, startChord) {
    const result = [];
    for (let i = 0; i < count; i++) {
      const releaseChord = releases(result[i - 1]);
      if (releaseChord) {
        result.push(releaseChord);
      } else {
        let randChord;
        if (startChord) {
          randChord = startChord;
        } else {
          const randTone = all_chords[randomIntegerRange(0, all_chords.length)];
          randChord = randTone[randomIntegerRange(0, randTone.length)];
        }
        result.push(randChord);
      }
    }
    return result.slice(0, count);
  }

  getNewChords(count, startChord) {
    const chords = this.generateChords(ALL_CHORDS_FOR_IMPROVISE, count, startChord);
    return chords;
  }

  getChords() {
    return this.chords;
  }
}
