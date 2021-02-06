import { convertChordStringToArr, findNotes } from '../utils';

export default class ItemsSearcher {
  searchItems(chord) {
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
      );
    }
    throw new Error(`Unknown chord ${chord[0]}${chord[1]}`);
  }
}

// export function chordNamesToFullArr(chordNames) {
//   const chordsArrs = chordNames.map(chordString =>
//     convertChordStringToArr(chordString)
//   );
//   const fullChordsArr = chordsArrs.map(chordsArr => findNotes(chordsArr[0], 0, chordsArr[1]))
//   return fullChordsArr;
// }

// export function convertChordStringToArr(chord) {
//   let tone;
//   let chordFunction;
//   if (chord[1] === "#") {
//     tone = chord.slice(0, 2);
//     chordFunction = chord.slice(2);
//   } else {
//     tone = chord.slice(0, 1);
//     chordFunction = chord.slice(1);
//   }

//   return [tone, chordFunction];
// }

function findAllChords(chord, ...rest) {
  const result = [];
  rest.forEach((toFind) => {
    result.push(findNotes(chord[0], toFind[0], toFind[1]));
  });
  return result;
}

// export function findNotes(tone, step, type) {
//   return chordsForImpro
//     .find(tonica => tonica[0][0] === transposeNote(tone, step, NOTES_MAP_SOLO))
//     .find(chord => chord[1] === type);
// }
