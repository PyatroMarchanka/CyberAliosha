import { NOTES_MAP_SOLO } from '../dataset/dataset';
// @ts-ignore
import Tone, { PolySynth, AMSynth, Sampler, Buffer } from 'tone';
import chordsForImpro, { ChordModel, NotesLengthType } from '../dataset/all_chords_for_impro';
import { SampleLibrary } from './ToneInstruments';

function randomIntegerRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const chordStringToFullChord = (chordName: string) => {
  const chordKeyMood = convertChordStringToArr(chordName);
  return findNotes(chordKeyMood[0], 0, chordKeyMood[1]);
};

function chordNamesToFullArr(chordNames: string[]) {
  const chordsArrs = chordNames.map((chordString) => convertChordStringToArr(chordString));
  const fullChordsArr = chordsArrs.map((chordsArr) => findNotes(chordsArr[0], 0, chordsArr[1]));
  return fullChordsArr;
}

function findNotes(tone: string, step: number, type: string) {
  const keyChords: ChordModel[] | undefined = chordsForImpro.find(
    (tonica) => tonica[0][0] === transposeNote(tone, step, NOTES_MAP_SOLO),
  );

  return keyChords?.find((chord: ChordModel) => chord[1] === type);
}

// old synth
// const synth = new PolySynth(5, AMSynth).toMaster();

var guitar = SampleLibrary.load({
  instruments: 'guitar-acoustic',
});

Buffer.on('load', function () {
  guitar.toMaster();
});

function playChord(chord: string, time = 0) {
  const now = Tone.now();
  const chordNameArr = convertChordStringToArr(chord);
  const fullChord = findNotes(chordNameArr[0], 0, chordNameArr[1]);
  const chordNotes = fullChord && fullChord[2];

  chordNotes &&
    chordNotes.forEach((note, index) => {
      switch (index) {
        case 0:
          guitar.triggerAttackRelease(note + '1', 2, now + time);
          break;

        case 1:
        case 2:
          guitar.triggerAttackRelease(note + '2', 2, now + time);
          break;

        case 3:
        case 4:
        case 5:
          guitar.triggerAttackRelease(note + '3', 2, now + time);
          break;

        default:
          break;
      }
    });
}

const playAllChords = (chords: ChordModel[]) => {
  const now = Tone.now();
  chords.forEach((chord, idx) => {
    chord[2].forEach((note, index) => {
      switch (index) {
        case 0:
          guitar.triggerAttackRelease(note + '1', 2, now + idx);
          break;

        case 1:
        case 2:
          guitar.triggerAttackRelease(note + '2', 2, now + idx);
          break;

        case 3:
        case 4:
        case 5:
          guitar.triggerAttackRelease(note + '3', 2, now + idx);
          break;

        default:
          break;
      }
    });
  });
};

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

  return [tone, chordFunction];
}

const convertChordToString = (chord: ChordModel) => {
  return `${chord[0]}${chord[1]}`;
};

const getTermsFromArrToSum = (
  array: number[],
  target: number,
  partial: number[],
): number[] | undefined => {
  array = array.sort((a, b) => a - b);
  const sum = partial.reduce((acc, cur) => acc + cur, 0);
  const rand = array[Math.floor(Math.random() * array.length)];
  const result = [...partial, rand];

  if (sum + rand === target) {
    return result;
  }

  if (sum + rand > target) {
    return getTermsFromArrToSum(array.slice(0, array.indexOf(rand)), target, partial);
  }

  if (sum + rand < target) {
    return getTermsFromArrToSum(array, target, result);
  }
};

const getDursByNotesLengthType = (notesLengthType: NotesLengthType) => {
  switch (notesLengthType) {
    case NotesLengthType.Often:
      return [2, 4, 8, 8, 8, 16];
    case NotesLengthType.Middle:
      return [2, 4, 4, 4, 4, 8, 8, 8];
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

    default:
      return [8];
  }
};

function createDurMeasure(notesLengthType: NotesLengthType, count: number) {
  let result = getTermsFromArrToSum(
    getDursByNotesLengthType(notesLengthType).map((num) => 1 / num),
    1,
    [],
  );

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
  playChord,
  playAllChords,
  convertChordStringToArr,
  findNotes,
  chordNamesToFullArr,
  convertChordToString,
  chordStringToFullChord,
};
