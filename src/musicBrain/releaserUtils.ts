import { intersectionWith, uniqWith } from 'lodash';
import {
  ChordModel,
  ChordRelease,
  MajorChords,
  MinorChords,
  UnstableChords,
} from '../dataset/all_chords_for_impro';
import { convertChordToString, findNotes, isChordsEqual } from '../utils';

export const getReleasesByType = (
  step: number,
  type: MajorChords.Major | MinorChords.Minor
): ChordRelease[] => {
  switch (type) {
    case MajorChords.Major:
      return Object.values(MajorChords).map((type) => [step, type]);

    case MinorChords.Minor:
      return Object.values(MinorChords).map((type) => [step, type]);

    default:
      return Object.values(MinorChords).map((type) => [step, type]);
  }
};

export const getAllReleaserable = (target: ChordModel) => {
  const results = getReleaserablesByChordType(target[1]).map((release) =>
    findNotes(target[0], release[0], release[1])
  );

  return results;
};

export const getAllReleaserablesForTonality = (toneChord: ChordModel) => {
  const releases = getChordsReleasesForTonality(toneChord);

  return releases.map((release) => findNotes(toneChord[0], release[0], release[1]));
};

export const getAllReleases = (target: ChordModel) => {
  const results = getReleasesByChordType(target[1]).map((release) =>
    findNotes(target[0], release[0], release[1])
  );
  return results;
};

export const getAllReleasesForReplace = (chord: ChordModel) => {};

export const searchItemsForReplace = (previousChord: ChordModel, nextChord: ChordModel) => {
  const previous = getAllReleases(previousChord);

  const next = getAllReleaserable(nextChord);

  var common = intersectionWith(previous, next, (a, b) => a[0] === b[0] && a[1] === b[1]);
  return common;
};

export const getReleasesByChordType = (type: ChordModel[1]): ChordRelease[] => {
  switch (type) {
    case UnstableChords.D7:
      return [
        [5, MinorChords.M7],
        [5, MinorChords.Minor],
        [5, MajorChords.Major],
        [5, MajorChords.Maj7],
        [2, MinorChords.Minor],
        [2, MinorChords.M7],
      ];

    case UnstableChords.D7b5:
      return [
        [5, MinorChords.M7],
        [5, MinorChords.Minor],
        [5, MajorChords.Major],
        [5, MajorChords.Maj7],
        [2, MinorChords.Minor],
        [2, MinorChords.M7],
        [11, MinorChords.M7],
        [11, MajorChords.Maj7],
      ];

    case UnstableChords.Aug:
      return [
        [0, MajorChords.Major],
        [1, MinorChords.Minor],
        [8, MajorChords.Major],
        [8, UnstableChords.D7],
        [5, MinorChords.Minor],
        [5, MajorChords.Major],
        [9, MinorChords.Minor],
      ];

    case UnstableChords.Dim7:
      return [
        [1, MajorChords.Maj7],
        [3, UnstableChords.Dim7],
        [4, MinorChords.M7],
        [7, MajorChords.Maj7],
        [10, MinorChords.Minor],
      ];

    case MinorChords.Minor:
    case MinorChords.M7:
    case 'm9':
    case MinorChords.Madd9:
      return [
        [2, UnstableChords.D7],
        [3, MajorChords.Maj7],
        [5, MinorChords.M7],
        [7, UnstableChords.D7],
        [7, MinorChords.M7],
        [8, MajorChords.Maj7],
        [10, MajorChords.Major],
        [11, UnstableChords.Aug],
      ];

    case UnstableChords.Min7b5:
      return [
        [0, UnstableChords.Dim7],
        [10, MinorChords.Minor],
        [10, MinorChords.M7],
        [2, UnstableChords.D7],
        [5, UnstableChords.D7],
        [9, UnstableChords.Dim7],
      ];

    case MajorChords.Maj7:
    case MajorChords.Major:
    case MajorChords.MajAdd9:
      return [
        [0, UnstableChords.Aug],
        [2, MinorChords.Minor],
        [2, UnstableChords.D7],
        [4, MinorChords.M7],
        [5, MajorChords.Maj7],
        [5, UnstableChords.Dim7],
        [7, UnstableChords.D7],
        [9, MinorChords.M7],
        [11, UnstableChords.Min7b5],
      ];

    default:
      console.log('Return releases for major chord, because chord type is unknown: ', type);

      return [
        [0, UnstableChords.Aug],
        [2, MinorChords.Minor],
        [2, UnstableChords.D7],
        [4, MinorChords.M7],
        [5, MajorChords.Maj7],
        [5, UnstableChords.Dim7],
        [7, UnstableChords.D7],
        [9, MinorChords.M7],
        [11, UnstableChords.Min7b5],
      ];
  }
};

export const getReleaserablesByChordType = (type: ChordModel[1]): ChordRelease[] => {
  switch (type) {
    case UnstableChords.D7:
      return [
        [5, MinorChords.Minor],
        [5, MajorChords.Major],
        [5, MajorChords.Maj7],
        [5, MinorChords.Madd9],
        [5, MajorChords.MajAdd9],
        [1, UnstableChords.Dim7],
      ];

    case UnstableChords.D7b5:
      return [
        [1, MinorChords.M7],
        [1, UnstableChords.Dim7],
        [7, UnstableChords.D7],
        [7, UnstableChords.Dim7],
      ];

    case UnstableChords.Aug:
      return [
        [0, MajorChords.Major],
        [0, MajorChords.Maj7],
        [1, MinorChords.Minor],
        [1, MinorChords.M7],
        [5, MinorChords.Minor],
        [5, MinorChords.M7],
        [8, MajorChords.Major],
        [8, MajorChords.Maj7],
      ];

    case UnstableChords.Dim7:
      return [
        [3, UnstableChords.Dim7],
        [11, UnstableChords.D7b5],
        [10, MinorChords.Minor],
        [10, MinorChords.M7],
        [10, MajorChords.Major],
        [10, MajorChords.Maj7],
        [7, MajorChords.Maj7],
        [7, MinorChords.Minor],
        [7, MajorChords.Major],
        [7, MinorChords.Madd9],
        [7, MajorChords.MajAdd9],
      ];

    case MinorChords.Minor:
    case MinorChords.M7:
    case UnstableChords.M9:
    case MinorChords.Madd9:
      return [
        [1, UnstableChords.D7b5],
        [2, UnstableChords.Dim7],
        [7, MinorChords.Minor],
        [7, MinorChords.M7],
        [7, UnstableChords.D7],
        [9, UnstableChords.Min7b5],
        [11, UnstableChords.Dim7],
        [11, UnstableChords.Aug],
      ];

    case UnstableChords.Min7b5:
      return [
        [10, MinorChords.Minor],
        [10, MinorChords.M7],
        [10, MinorChords.Madd9],
        [1, MajorChords.Major],
        [1, MajorChords.Maj7],
        [1, MajorChords.MajAdd9],
        [11, MajorChords.Major],
        [11, MajorChords.Maj7],
        [11, MajorChords.MajAdd9],
      ];

    case MajorChords.Maj7:
    case MajorChords.Major:
    case MajorChords.MajAdd9:
      return [
        [1, UnstableChords.Min7b5],
        [7, MajorChords.Major],
        [7, UnstableChords.D7],
        [11, UnstableChords.Dim7],
        [2, UnstableChords.Dim7],
        [1, UnstableChords.D7b5],
      ];

    default:
      console.log('Return releases for major chord, because chord type is unknown: ', type);

      return [
        [1, UnstableChords.Min7b5],
        [7, MajorChords.Major],
        [7, UnstableChords.D7],
        [11, UnstableChords.Dim7],
        [2, UnstableChords.Dim7],
        [1, UnstableChords.D7b5],
      ];
  }
};

export const getChordsForChords = (chords: ChordModel[], count = -2): any => {
  const arr = chords.slice(count).map((chord) => detectTonalitiesByChord(chord));

  const toneChords = intersectionWith(arr[0], arr[1], isChordsEqual);
  if (toneChords.length > 1) {
    return getChordsForChords(chords, --count);
  }

  const resultChords = toneChords.map((chord) => {
    const releases = getChordsReleasesForTonality(chord);
    return releases.map((release) => findNotes(chord[0], release[0], release[1]));
  });

  const uniqueChords = uniqWith(resultChords.flat(), isChordsEqual);
  return uniqueChords;
};

const detectTonalitiesByChord = (chord: ChordModel): ChordModel[] => {
  let releases: ChordRelease[] = [];
  if (Object.values(MajorChords).includes(chord[1] as any)) {
    releases = [
      [0, MajorChords.Major],
      [5, MajorChords.Major],
      [7, MajorChords.Major],
      [9, MinorChords.Minor],
      [2, MinorChords.Minor],
      [4, MinorChords.Minor],
    ];
  } else if (Object.values(MinorChords).includes(chord[1] as any)) {
    releases = [
      [3, MajorChords.Major],
      [8, MajorChords.Major],
      [10, MajorChords.Major],
      [0, MinorChords.Minor],
      [5, MinorChords.Minor],
      [7, MinorChords.Minor],
    ];
  } else if (chord[1] === UnstableChords.D7 || chord[1] === UnstableChords.D7b5) {
    releases = [
      [5, MajorChords.Major],
      [5, MinorChords.Minor],
    ];
  } else if (chord[1] === UnstableChords.Dim7) {
    releases = [
      [1, MajorChords.Major],
      [10, MinorChords.Minor],
      [7, MinorChords.Minor],
      [7, MajorChords.Major],
    ];
  } else if (chord[1] === UnstableChords.Aug) {
    releases = [
      [0, MajorChords.Major],
      [1, MinorChords.Minor],
    ];
  }

  return releases.map((release) => findNotes(chord[0], release[0], release[1]));
};

const getChordsReleasesForTonality = (chord: ChordModel): ChordRelease[] => {
  switch (chord[1]) {
    case MinorChords.Minor:
    case MinorChords.M7:
    case UnstableChords.M9:
    case MinorChords.Madd9:
      return [
        [0, MinorChords.Minor],
        [0, MinorChords.M7],
        [0, MinorChords.Madd9],
        [2, UnstableChords.Min7b5],
        [2, UnstableChords.Dim7],
        ...getReleasesByType(3, MajorChords.Major),
        ...getReleasesByType(5, MinorChords.Minor),
        [7, UnstableChords.D7],
        [7, UnstableChords.D7b5],
        ...getReleasesByType(8, MajorChords.Major),
        ...getReleasesByType(10, MajorChords.Major),
        [10, UnstableChords.D7],
        [11, UnstableChords.Dim7],
      ];

    case MajorChords.Major:
    case MajorChords.Maj7:
    case MajorChords.MajAdd9:
      return [
        [0, MajorChords.Major],
        [0, MajorChords.Maj7],
        [0, MajorChords.MajAdd9],
        [2, UnstableChords.Dim7],
        ...getReleasesByType(2, MinorChords.Minor),
        ...getReleasesByType(4, MinorChords.Minor),
        ...getReleasesByType(5, MajorChords.Major),
        [7, UnstableChords.D7],
        [7, MajorChords.Major],
        [7, UnstableChords.D7b5],
        ...getReleasesByType(9, MinorChords.Minor),
        [11, UnstableChords.Min7b5],
        [11, UnstableChords.Dim7],
      ];

    default:
      console.log('Return releases for major chord, because chord type is unknown: ', chord);

      return [];
  }
};
