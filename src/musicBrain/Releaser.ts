import { intersectionWith } from 'lodash';
import { ChordModel } from '../dataset/all_chords_for_impro';
import { randomIntegerRange, findNotes } from '../utils';

export default function releases(chord: ChordModel) {
  if (!chord) return;

  let result;
  if (chord[1] === 'dim7') {
    switch (randomIntegerRange(1, 5)) {
      case 1:
        result = findNotes(chord[0], 1, 'maj');
        break;
      case 2:
        result = findNotes(chord[0], 4, 'm7');
        break;
      case 3:
        result = findNotes(chord[0], 7, 'maj');
        break;
      case 4:
        result = findNotes(chord[0], 10, 'm');
        break;
      default:
        break;
    }
    return result;
  }
  if (chord[1] === '7') {
    result = findNotes(chord[0], 5, Math.random() > 0.5 ? 'm7' : 'maj');

    switch (randomIntegerRange(1, 4)) {
      case 1:
        result = findNotes(chord[0], 5, 'm7');
        break;
      case 2:
        result = findNotes(chord[0], 9, 'maj');
        break;
      case 3:
        result = findNotes(chord[0], 6, '7b5');
        break;
      default:
        break;
    }

    return result;
  }
  if (chord[1] === '7b5') {
    result = findNotes(chord[0], 11, Math.random() > 0.5 ? 'm7' : 'maj');
    return result;
  }
  if (chord[1] === 'aug') {
    switch (randomIntegerRange(1, 5)) {
      case 1:
        result = findNotes(chord[0], 1, 'm7');
        break;
      case 2:
        result = findNotes(chord[0], 0, 'maj');
        break;
      case 3:
        result = findNotes(chord[0], 0, '');
        break;
      case 4:
        result = findNotes(chord[0], 1, 'm');
        break;

      default:
        break;
    }
    return result;
  }
  if (chord[1] === 'm7b5') {
    switch (randomIntegerRange(1, 3)) {
      case 1:
        result = findNotes(chord[0], 5, '7');
        break;
      case 2:
        result = findNotes(chord[0], 9, 'dim7');
        break;

      default:
        break;
    }

    return result;
  }

  if (chord[1] === 'm' || chord[1] === 'm7' || chord[1] === 'mAdd9' || chord[1] === 'm9') {
    switch (randomIntegerRange(1, 7)) {
      case 1:
        result = findNotes(chord[0], 3, 'maj');
        break;
      case 2:
        result = findNotes(chord[0], 5, 'm7');
        break;
      case 3:
        result = findNotes(chord[0], 7, '7');
        break;
      case 4:
        result = findNotes(chord[0], 2, 'm7b5');
        break;
      case 5:
        result = findNotes(chord[0], 2, 'dim7');
        break;
      case 6:
        result = findNotes(chord[0], 11, 'aug');
        break;

      default:
        break;
    }
    return result;
  }

  if (chord[1] === '' || chord[1] === 'maj' || chord[1] === 'majAdd9') {
    switch (randomIntegerRange(1, 11)) {
      case 1:
        result = findNotes(chord[0], 2, 'm');
        break;
      case 2:
        result = findNotes(chord[0], 4, 'm7');
        break;
      case 3:
        result = findNotes(chord[0], 5, 'maj');
        break;
      case 4:
        result = findNotes(chord[0], 7, '7');
        break;
      case 5:
        result = findNotes(chord[0], 9, 'm7');
        break;
      case 6:
        result = findNotes(chord[0], 11, 'm7b5');
        break;
      case 7:
        result = findNotes(chord[0], 2, '7');
        break;
      case 8:
        result = findNotes(chord[0], 11, 'm7');
        break;
      case 9:
        result = findNotes(chord[0], 7, 'maj');
        break;
      case 10:
        result = findNotes(chord[0], 0, 'aug');
        break;
      default:
        break;
    }
    return result;
  }
  return result;
}

export const getAllReleaserableToTarget = (target: ChordModel) => {
  const results: ChordModel[] = [];
  if (target[1] === 'm' || target[1] === 'm7' || target[1] === 'mAdd9' || target[1] === 'm9') {
    results.push(findNotes(target[0], 7, 'm')!);
    results.push(findNotes(target[0], 7, 'm7')!);
    results.push(findNotes(target[0], 11, 'dim7')!);
    results.push(findNotes(target[0], 2, 'dim7')!);
    results.push(findNotes(target[0], 7, '7')!);
    results.push(findNotes(target[0], 1, '7b5')!);
    results.push(findNotes(target[0], 11, 'aug')!);

    return results;
  }

  if (target[1] === '' || target[1] === 'maj' || target[1] === 'majAdd9') {
    results.push(findNotes(target[0], 7, '')!);
    results.push(findNotes(target[0], 7, '7')!);
    results.push(findNotes(target[0], 11, 'dim7')!);
    results.push(findNotes(target[0], 2, 'dim7')!);
    results.push(findNotes(target[0], 1, '7b5')!);
    return results;
  }

  if (target[1] === '7b5') {
    results.push(findNotes(target[0], 7, '7')!);
    results.push(findNotes(target[0], 1, 'dim7')!);
  }

  if (target[1] === '7') {
    results.push(findNotes(target[0], 5, 'm')!);
    results.push(findNotes(target[0], 5, '')!);
    results.push(findNotes(target[0], 5, 'm7')!);
    results.push(findNotes(target[0], 5, 'maj')!);
    results.push(findNotes(target[0], 5, 'mAdd9')!);
    results.push(findNotes(target[0], 5, 'majAdd9')!);
    results.push(findNotes(target[0], 10, 'm')!);
    results.push(findNotes(target[0], 10, '')!);
    results.push(findNotes(target[0], 10, 'm7')!);
    results.push(findNotes(target[0], 10, 'maj')!);
    results.push(findNotes(target[0], 10, 'mAdd9')!);
    results.push(findNotes(target[0], 10, 'majAdd9')!);
    results.push(findNotes(target[0], 1, 'dim7')!);
  }

  results.push(findNotes(target[0], 7, '')!);
  results.push(findNotes(target[0], 7, '7')!);
  results.push(findNotes(target[0], 11, 'dim7')!);
  results.push(findNotes(target[0], 2, 'dim7')!);
  results.push(findNotes(target[0], 1, '7b5')!);
  return results;
};

export const searchItems = (chord: ChordModel) => {
  if (!chord) return;

  if (chord[1] === 'dim7') {
    return findAllChords(chord, [0, 'dim7'], [1, 'maj'], [4, 'm7'], [7, 'maj'], [10, 'm']);
  }
  if (chord[1] === '7') {
    return findAllChords(
      chord,
      [0, '7'],
      [5, 'm7'],
      [5, 'm'],
      [5, ''],
      [5, 'maj'],
      [2, 'm'],
      [2, 'm7'],
    );
  }

  if (chord[1] === '7b5') {
    return findAllChords(
      chord,
      [0, '7'],
      [5, 'm7'],
      [5, 'm'],
      [5, ''],
      [5, 'maj'],
      [2, 'm'],
      [2, 'm7'],
      [11, 'm7'],
      [11, 'maj'],
    );
  }

  if (chord[1] === 'm7b5') {
    return findAllChords(
      chord,
      [0, 'm7b5'],
      [10, 'm'],
      [10, 'm7'],
      [2, '7'],
      [5, '7'],
      [9, 'dim7'],
    );
  }

  if (chord[1] === 'aug') {
    return findAllChords(
      chord,
      [0, ''],
      [0, 'm'],
      [0, '7'],
      [1, 'm'],
      [8, ''],
      [8, '7'],
      [5, 'm'],
      [5, ''],
      [9, 'm'],
    );
  }

  if (chord[1] === 'm' || chord[1] === 'm7' || chord[1] === 'mAdd9') {
    return findAllChords(
      chord,
      [0, 'm'],
      [0, 'm7'],
      [2, '7'],
      [3, 'maj'],
      [5, 'm7'],
      [7, '7'],
      [7, 'm7'],
      [8, 'maj'],
      [10, 'maj'],
      [11, 'aug'],
    );
  }

  if (chord[1] === '' || chord[1] === 'maj') {
    return findAllChords(
      chord,
      [0, 'aug'],
      [0, ''],
      [0, 'maj'],
      [2, 'm'],
      [4, ''],
      [4, '7'],
      [4, 'm7'],
      [5, 'maj'],
      [7, '7'],
      [9, 'm7'],
      [11, 'm7b5'],
      [2, '7'],
      [11, 'm7'],
      [7, 'maj'],
      [5, 'dim7'],
    );
  }
  throw new Error(`Unknown chord ${chord[0]}${chord[1]}`);
};

export const searchItemsForReplace = (previousChord: ChordModel, nextChord: ChordModel) => {
  const previous = searchItems(previousChord);

  const next = getAllReleaserableToTarget(nextChord);
  var common = intersectionWith(previous, next, (a, b) => a[0] === b[0] && a[1] === b[1]);
  console.log('previous', previous, 'next', next, 'common', common);
  return common;
};

function findAllChords(chord: ChordModel, ...rest: any) {
  const result: ChordModel[] = [];
  rest.forEach((toFind: any) => {
    result.push(findNotes(chord[0], toFind[0], toFind[1]));
  });
  return result;
}
