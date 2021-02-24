import { intersectionWith } from 'lodash';
import { ChordModel } from '../dataset/all_chords_for_impro';
import { findNotes } from '../utils';

export interface ChordRelease {
  0: number;
  1: ChordModel[1];
}

export const getAllReleaserable = (target: ChordModel) => {
  const results = getReleaserablesByChordType(target[1]).map((release) =>
    findNotes(target[0], release[0], release[1]),
  );

  return results;
};

export const getAllReleases = (target: ChordModel) => {
  const results = getReleasesByChordType(target[1]).map((release) =>
    findNotes(target[0], release[0], release[1]),
  );
  return results;
};

export const getAllReleasesForReplace = (chord: ChordModel) => {};

export const searchItemsForReplace = (previousChord: ChordModel, nextChord: ChordModel) => {
  const previous = getAllReleases(previousChord);

  const next = getAllReleaserable(nextChord);

  var common = intersectionWith(previous, next, (a, b) => a[0] === b[0] && a[1] === b[1]);
  console.log('previous', previous, 'next', next, 'common', common);
  return common;
};

export const getReleasesByChordType = (type: ChordModel[1]): ChordRelease[] => {
  switch (type) {
    case '7':
      return [
        [5, 'm7'],
        [5, 'm'],
        [5, ''],
        [5, 'maj'],
        [2, 'm'],
        [2, 'm7'],
      ];

    case '7b5':
      return [
        [5, 'm7'],
        [5, 'm'],
        [5, ''],
        [5, 'maj'],
        [2, 'm'],
        [2, 'm7'],
        [11, 'm7'],
        [11, 'maj'],
      ];

    case 'aug':
      return [
        [0, ''],
        [0, 'm'],
        [0, '7'],
        [1, 'm'],
        [8, ''],
        [8, '7'],
        [5, 'm'],
        [5, ''],
        [9, 'm'],
      ];

    case 'dim7':
      return [
        [1, 'maj'],
        [3, 'dim7'],
        [4, 'm7'],
        [7, 'maj'],
        [10, 'm'],
      ];

    case 'm':
    case 'm7':
    case 'm9':
    case 'mAdd9':
      return [
        [2, '7'],
        [3, 'maj'],
        [5, 'm7'],
        [7, '7'],
        [7, 'm7'],
        [8, 'maj'],
        [10, ''],
        [11, 'aug'],
      ];

    case 'm7b5':
      return [
        [0, 'dim7'],
        [10, 'm'],
        [10, 'm7'],
        [2, '7'],
        [5, '7'],
        [9, 'dim7'],
      ];

    case 'maj':
    case '':
    case 'majAdd9':
      return [
        [0, 'aug'],
        [2, 'm'],
        [2, '7'],
        [4, 'm7'],
        [5, 'maj'],
        [5, 'dim7'],
        [7, '7'],
        [9, 'm7'],
        [11, 'm7b5'],
      ];

    default:
      console.log('Return releases for major chord, because chord type is unknown: ', type);

      return [
        [0, 'aug'],
        [2, 'm'],
        [2, '7'],
        [4, 'm7'],
        [5, 'maj'],
        [5, 'dim7'],
        [7, '7'],
        [9, 'm7'],
        [11, 'm7b5'],
      ];
  }
};

export const getReleaserablesByChordType = (type: ChordModel[1]): ChordRelease[] => {
  switch (type) {
    case '7':
      return [
        [5, 'm'],
        [5, ''],
        [5, 'maj'],
        [5, 'mAdd9'],
        [5, 'majAdd9'],
        [1, 'dim7'],
      ];

    case '7b5':
      return [
        [1, 'm7'],
        [1, 'dim7'],
        [7, '7'],
        [7, 'dim7'],
      ];

    case 'aug':
      return [
        [0, ''],
        [0, 'maj'],
        [1, 'm'],
        [1, 'm7'],
        [5, 'm'],
        [5, 'm7'],
        [8, ''],
        [8, 'maj'],
      ];

    case 'dim7':
      return [
        [3, 'dim7'],
        [11, '7b5'],
        [10, 'm'],
        [10, 'm7'],
        [10, ''],
        [10, 'maj'],
        [7, 'maj'],
        [7, 'm'],
        [7, ''],
        [7, 'mAdd9'],
        [7, 'majAdd9'],
      ];

    case 'm':
    case 'm7':
    case 'm9':
    case 'mAdd9':
      return [
        [1, '7b5'],
        [2, 'dim7'],
        [7, 'm'],
        [7, 'm7'],
        [7, '7'],
        [9, 'm7b5'],
        [11, 'dim7'],
        [11, 'aug'],
      ];

    case 'm7b5':
      return [
        [10, 'm'],
        [10, 'm7'],
        [10, 'mAdd9'],
        [1, ''],
        [1, 'maj'],
        [1, 'majAdd9'],
        [11, ''],
        [11, 'maj'],
        [11, 'majAdd9'],
      ];

    case 'maj':
    case '':
    case 'majAdd9':
      return [
        [1, 'm7b5'],
        [7, ''],
        [7, '7'],
        [11, 'dim7'],
        [2, 'dim7'],
        [1, '7b5'],
      ];

    default:
      console.log('Return releases for major chord, because chord type is unknown: ', type);

      return [
        [1, 'm7b5'],
        [7, ''],
        [7, '7'],
        [11, 'dim7'],
        [2, 'dim7'],
        [1, '7b5'],
      ];
  }
};
