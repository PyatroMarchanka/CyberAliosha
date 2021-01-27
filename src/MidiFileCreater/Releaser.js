import { randomIntegerRange, findNotes } from './utils';

export default function releases(chord) {
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
    return result;
  }
  if (chord[1] === 'm7b5') {
    switch (randomIntegerRange(1, 8)) {
      case 1:
        result = findNotes(chord[0], 5, '7');
        break;
      case 2:
        result = findNotes(chord[0], 9, 'dim7');
        break;

      default:
        break;
    }
    result = findNotes(chord[0], 5, '7');
    return result;
  }

  if (chord[1] === 'm' || chord[1] === 'm7' || chord[1] === 'mAdd9') {
    switch (randomIntegerRange(1, 5)) {
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
        result = findNotes(chord[0], 8, 'maj');
        break;

      default:
        break;
    }
    return result;
  }

  if (chord[1] === '' || chord[1] === 'maj') {
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
      default:
        break;
    }
    return result;
  }
  return result;
}
