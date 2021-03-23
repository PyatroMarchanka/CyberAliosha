import { SolidNotes, DotNotes } from './../dataset/all_chords_for_impro';
import { NOTES_MAP_SOLO } from '../dataset/dataset';
import { ChordModel, ChordType, NotesLengthType } from '../dataset/all_chords_for_impro';

import chordsForImpro from '../dataset/all_chords';

function randomIntegerRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const sortChordsByType = (types: ChordType[], chords: ChordModel[]) => {
  return chords.filter((chord) => types.includes(chord[1]));
};

const chordStringToFullChord = (chordName: string) => {
  const chordKeyMood = convertChordStringToArr(chordName);
  return findNotes(chordKeyMood[0], 0, chordKeyMood[1]);
};

const isChordsEqual = (chord1: ChordModel, chord2: ChordModel) => {
  return chord1[0] === chord2[0] && chord1[1] === chord2[1];
};

function chordNamesToFullArr(chordNames: string[]) {
  const chordsArrs = chordNames.map((chordString) => convertChordStringToArr(chordString));
  const fullChordsArr = chordsArrs.map((chordsArr) => findNotes(chordsArr[0], 0, chordsArr[1]));
  return fullChordsArr;
}

function findNotes(tone: string, step: number, type: ChordModel[1]) {
  const keyChords: ChordModel[] = chordsForImpro.find(
    (tonica) => tonica[0][0] === transposeNote(tone, step, NOTES_MAP_SOLO)
  )!;

  return keyChords.find((chord: ChordModel) => chord[1] === type)!;
}

function convertChordStringToArr(chord: string) {
  let tone;
  let chordFunction;
  if (chord[1] === '#') {
    tone = chord.slice(0, 2);
    chordFunction = chord.slice(2);
  } else {
    tone = chord.slice(0, 1);
    chordFunction = chord.slice(1);
  }

  return [tone, chordFunction] as { 0: ChordModel[0]; 1: ChordModel[1] };
}

const convertChordToString = (chord: ChordModel) => {
  return `${chord[0]}${chord[1]}`;
};

const shortNotes = [
  SolidNotes.Quarter,
  SolidNotes.Quarter,
  DotNotes.Eight,
  SolidNotes.Eight,
  SolidNotes.Eight,
  SolidNotes.Sixteen,
];
const longNotes = [DotNotes.Half, SolidNotes.Half, SolidNotes.Half];

const getTermsFromArrToSum = (
  array: number[],
  target: number,
  partial: number[],
  count?: number
): number[] | undefined => {
  array = array.sort((a, b) => a - b);
  const sum = partial.reduce((acc, cur) => acc + cur, 0);
  const rand = array[Math.floor(Math.random() * array.length)];
  const result = [...partial, rand];

  if (count) {
    if (sum + rand === target && result.length >= count) {
      return result;
    }
    if (sum + rand === target && result.length < count) {
      return getTermsFromArrToSum(array, target, partial.slice(0, partial.length - 2), count);
    }
  } else if (sum + rand === target) {
    return result;
  }

  if (sum + rand > target) {
    return getTermsFromArrToSum(array.slice(0, array.indexOf(rand)), target, partial, count);
  }

  if (sum + rand < target) {
    return getTermsFromArrToSum(array, target, result, count);
  }
};
const getTermsFromArrToSumSimple = (
  array: number[],
  target: number,
  partial: number[]
): number[] | undefined => {
  array = array.sort((a, b) => a - b);
  const sum = partial.reduce((acc, cur) => acc + cur, 0);
  const rand = array[Math.floor(Math.random() * array.length)];
  const result = [...partial, rand];

  if (sum + rand === target) {
    return result;
  }

  if (array.length === 0) {
    return getTermsFromArrToSumSimple(
      getDursByNotesLengthType(NotesLengthType.Middle),
      target,
      partial.slice(0, partial.length - 1)
    );
  }

  if (sum + rand > target) {
    return getTermsFromArrToSumSimple(array.slice(0, array.indexOf(rand)), target, partial);
  }

  if (sum + rand < target) {
    return getTermsFromArrToSumSimple(array, target, result);
  }
  return result;
};

const isInChordsArray = (chordsArr: ChordModel[], chord: ChordModel) => {
  for (let index = 0; index < chordsArr.length; index++) {
    const chordElement = chordsArr[index];
    if (chordElement[0] === chord[0] && chordElement[1] === chord[1]) {
      return true;
    }
  }

  return false;
};

const getDursByNotesLengthType = (notesLengthType: NotesLengthType) => {
  switch (notesLengthType) {
    case NotesLengthType.Often:
      return [2, 4, 8, 8, 8, 16];
    case NotesLengthType.Middle:
      return [
        DotNotes.Half,
        SolidNotes.Half,
        SolidNotes.Half,
        SolidNotes.Half,
        DotNotes.Quarter,
        SolidNotes.Quarter,
        SolidNotes.Quarter,
        SolidNotes.Quarter,
        // DotNotes.Eight,
        SolidNotes.Eight,
        SolidNotes.Eight,
        SolidNotes.Eight,
        // SolidNotes.Sixteen,
      ];
    case NotesLengthType.Seldom:
      return [1, 1, 2, 2, 2, 4];
    case NotesLengthType.VeryOften:
      return [8, 16];
    case NotesLengthType.VerySeldom:
      return [1, 2];
    case NotesLengthType.Whole:
      return [1];
    case NotesLengthType.Half:
      return [2];
    case NotesLengthType.Quarter:
      return [4];
    case NotesLengthType.Eight:
      return [8];
    case NotesLengthType.Sixteen:
      return [16];

    case NotesLengthType.Lyric:
      return [
        DotNotes.Half,
        SolidNotes.Half,
        SolidNotes.Half,
        DotNotes.Quarter,
        SolidNotes.Quarter,
        SolidNotes.Quarter,
        DotNotes.Eight,
        SolidNotes.Eight,
        SolidNotes.Eight,
        SolidNotes.Sixteen,
      ];

    default:
      return [8];
  }
};

function createDurMeasure(notesLengthType: NotesLengthType, sum = 1) {
  let result = getTermsFromArrToSumSimple(getDursByNotesLengthType(notesLengthType), sum, []);
  return result;
}

function createDurMeasureByCount(notesLengthType: NotesLengthType, count: number) {
  let result = getTermsFromArrToSum(getDursByNotesLengthType(notesLengthType), 1, [], count);
  return result;
}

function transposeNote(note: string, step: number, notesMap: string[]) {
  let indexOfNote = notesMap.indexOf(note);
  if (step < 0) {
    step = notesMap.length - step;
  }
  return notesMap[(indexOfNote + step) % notesMap.length];
}

export {
  transposeNote,
  randomIntegerRange,
  createDurMeasure,
  createDurMeasureByCount,
  convertChordStringToArr,
  findNotes,
  chordNamesToFullArr,
  convertChordToString,
  chordStringToFullChord,
  isInChordsArray,
  isChordsEqual,
};
