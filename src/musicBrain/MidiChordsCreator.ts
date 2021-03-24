import { ChordModel } from '../dataset/all_chords_for_impro';
import ALL_CHORDS_FOR_IMPROVISE from '../dataset/all_chords';
import { isInChordsArray, randomIntegerRange } from '../utils';
import {
  getAllReleaserablesForTonality,
  getAllReleaserable,
  getAllReleases,
} from './releaserUtils';

export default class MidiChordsCreator {
  chords: ChordModel[];
  constructor() {
    this.chords = [];
  }

  generateChords(all_chords: ChordModel[][], count: number, startChord?: ChordModel) {
    const result = [];
    for (let i = 0; i < count; i++) {
      const releases = getAllReleases(result[i - 1]);

      const releaseChord = releases[randomIntegerRange(0, releases?.length)];
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

  generateRandomCyclicChords = (
    all_chords: ChordModel[][],
    count: number,
    startChord?: ChordModel,
    partial: ChordModel[] = []
  ): ChordModel[] | undefined => {
    if (!startChord && !(typeof all_chords[0][0] === 'string')) {
      const randTone = all_chords[randomIntegerRange(0, all_chords.length)];
      const chordsOk = [0, 1, 2, 4, 5, 8, 9];
      let randChord = randTone[chordsOk[randomIntegerRange(0, chordsOk.length)]];
      startChord = randChord;
    }

    const releasersForStartChord = getAllReleaserable(startChord!);
    let result = [...partial];

    if (!result.length) {
      result.push(startChord!);
    }

    if (partial.length === count) {
      return partial;
    }

    const releases = getAllReleases(result[result.length - 1]);
    const releaseChord = releases[randomIntegerRange(0, releases?.length)];

    if (releaseChord) {
      const test = this.generateRandomCyclicChords(all_chords, count, startChord, [
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
        return this.generateRandomCyclicChords(
          all_chords,
          count,
          startChord,
          result.slice(0, result.length - 3)
        );
      } else {
        return this.generateRandomCyclicChords(all_chords, count, startChord, [startChord!]);
      }
    } else {
      result.pop();
      return this.generateRandomCyclicChords(all_chords, count, startChord, [...result]);
    }
  };

  getRandomChords(count: number, startChord?: ChordModel) {
    const chords = this.generateChords(ALL_CHORDS_FOR_IMPROVISE, count, startChord);
    return chords;
  }

  getRandomCyclicChords(count: number, startChord?: ChordModel) {
    const chords = this.generateRandomCyclicChords(ALL_CHORDS_FOR_IMPROVISE, count, startChord);
    return chords;
  }

  // getNewCyclicChordsForTonality(count: number, startChord: ChordModel) {
  //   const allChords = getAllReleaserablesForTonality(startChord);

  //   const chords = this.generateCyclicChords(allChords, count, startChord);
  //   return chords;
  // }

  getChords() {
    return this.chords;
  }
}
