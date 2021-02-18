import { ChordModel } from '../dataset/all_chords_for_impro';
import ALL_CHORDS_FOR_IMPROVISE from '../dataset/all_chords_for_impro';
import { convertChordToString, isInChordsArray, randomIntegerRange } from '../utils';
import releases, { getAllReleaserableToTarget } from './Releaser';
import { Slide } from '@material-ui/core';

export default class MidiChordsCreator {
  chords: ChordModel[];
  constructor() {
    this.chords = [];
  }

  generateChords(all_chords: ChordModel[][], count: number, startChord?: ChordModel) {
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

  generateCyclicChords = (
    all_chords: ChordModel[][],
    count: number,
    startChord?: ChordModel,
    partial: ChordModel[] = [],
  ): ChordModel[] | undefined => {
    if (!startChord) {
      const randTone = all_chords[randomIntegerRange(0, all_chords.length)];
      const chordsOk = [0, 1, 5, 7];
      let randChord = randTone[chordsOk[randomIntegerRange(0, chordsOk.length)]];
      console.log('randChord', randChord);
      startChord = randChord;
    }

    const releasersForStartChord = getAllReleaserableToTarget(startChord);
    let result = [...partial];

    if (!result.length) {
      result.push(startChord);
    }

    if (partial.length === count) {
      return partial;
    }

    const releaseChord = releases(result[result.length - 1]);
    if (releaseChord) {
      const test = this.generateCyclicChords(all_chords, count, startChord, [
        ...result,
        releaseChord,
      ]);

      if (
        test &&
        test.length === count &&
        isInChordsArray(releasersForStartChord, test[test?.length - 1])
      ) {
        return test;
      } else if (result.length > 1) {
        console.log('startChord', convertChordToString(startChord));

        result.pop();
        return this.generateCyclicChords(
          all_chords,
          count,
          startChord,
          result.slice(0, result.length - 1),
        );
      } else {
        this.generateCyclicChords(all_chords, count, startChord, [startChord]);
      }
    } else {
      result.pop();
      return this.generateCyclicChords(all_chords, count, startChord, [...result]);
    }
  };

  getNewChords(count: number, startChord?: ChordModel) {
    const chords = this.generateChords(ALL_CHORDS_FOR_IMPROVISE, count, startChord);
    return chords;
  }

  getNewCyclicChords(count: number, startChord?: ChordModel) {
    const chords = this.generateCyclicChords(ALL_CHORDS_FOR_IMPROVISE, count, startChord);
    return chords;
  }

  getChords() {
    return this.chords;
  }
}
