import { NOTES_MAP_SOLO } from '../dataset/dataset';
import Tone, { PolySynth, AMSynth, Sampler, Buffer } from 'tone';
import chordsForImpro, { ChordModel } from '../dataset/all_chords_for_impro';
import { SampleLibrary } from './ToneInstruments';

function randomIntegerRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const chordStringToFullChord = (chordName) => {
  const chordKeyMood = convertChordStringToArr(chordName);
  return findNotes(chordKeyMood[0], 0, chordKeyMood[1]);
};

function chordNamesToFullArr(chordNames) {
  const chordsArrs = chordNames.map((chordString) => convertChordStringToArr(chordString));
  const fullChordsArr = chordsArrs.map((chordsArr) => findNotes(chordsArr[0], 0, chordsArr[1]));
  return fullChordsArr;
}

function findNotes(tone, step, type) {
  return chordsForImpro
    .find((tonica) => tonica[0][0] === transposeNote(tone, step, NOTES_MAP_SOLO))
    .find((chord) => chord[1] === type);
}

// old synth
// const synth = new PolySynth(5, AMSynth).toMaster();

var guitar = SampleLibrary.load({
  instruments: 'guitar-acoustic',
});

Buffer.on('load', function () {
  guitar.toMaster();
});

function playChord(chord, time = 0) {
  const now = Tone.now();
  const chordNameArr = convertChordStringToArr(chord);
  const chordNotes = findNotes(chordNameArr[0], 0, chordNameArr[1])[2];

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

const playAllChords = (chords) => {
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

function convertChordStringToArr(chord) {
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

const convertChordToString = (chord) => {
  return `${chord[0]}${chord[1]}`;
};

const getTermsFromArrToSum = (array, target, partial) => {
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

// TODO: create arr of objects {measure: number, durs: [0.5, 0.5]}
function createDurMeasure(notesLengthType, count) {
  const typeLengthMap = {
    often: [2, 4, 8, 8, 8, 16],
    middle: [2, 4, 4, 4, 4, 8, 8, 8],
    seldom: [1, 1, 2, 2, 2, 4],
    veryOften: [8, 16],
    verySeldom: [1, 2],
    whole: [1],
    half: [2],
    quarter: [4],
    eight: [8],
    sixteen: [16],
  };

  let result = getTermsFromArrToSum(
    typeLengthMap[notesLengthType].map((num) => 1 / num),
    1,
    [],
  );

  return result;
}

function transposeTonality(tonality, step) {
  const newTonality = JSON.parse(JSON.stringify(tonality));
  newTonality[0] = newTonality[0]
    .split('m/')
    .map((note) => transposeNote(note, step))
    .join('m/');
  newTonality[1] = newTonality[1].map((noteChords) => {
    console.log(noteChords);
    noteChords[0] = transposeNote(noteChords[0], step);
    return noteChords;
  });
  return newTonality;
}

const CHORDS_MAP = [
  ['A', 'm', ['A', 'C', 'E']],
  ['A', 'm7', ['A', 'C', 'E', 'G']],
  ['A', 'm7b5', ['A', 'C', 'D#Eb', 'G']],
  ['A', 'mAdd9', ['A', 'C', 'E', 'G', 'B']],

  ['A', '', ['A', 'C#Db', 'E']],
  ['A', '7', ['A', 'C#Db', 'E', 'G']],
  ['A', 'maj', ['A', 'C#Db', 'E', 'G#Ab']],
  ['A', 'majAdd9', ['A', 'C#Db', 'E', 'G#Ab', 'B']],
  ['A', 'dim7', ['A', 'C', 'D#Eb', 'F#Gb']],
  ['A', 'aug', ['A', 'C#Db', 'F']],
];

const CHORD_BIG = [
  ['A', 'm', ['A', 'C', 'E'], ['B', 'D', 'E', 'F', 'G']],
  ['A', 'm7', ['A', 'C', 'E', 'G'], ['B', 'D', 'E', 'F', 'G']],
  ['A', 'm9', ['A', 'C', 'E', 'G', 'B'], ['B', 'D', 'E', 'F', 'G']],
  ['A', 'm7b5', ['A', 'C', 'D#', 'G'], ['B', 'D#', 'D', 'F', 'G']],
  ['A', 'mAdd9', ['A', 'C', 'E', 'G', 'B'], ['B', 'E', 'D', 'F', 'G']],
  ['A', '', ['A', 'C#', 'E'], ['B', 'E', 'D', 'F#', 'G#']],
  ['A', '7', ['A', 'C#', 'E', 'G'], ['B', 'E', 'D', 'F#', 'G']],
  ['A', 'maj', ['A', 'C#', 'E', 'G#'], ['B', 'E', 'D', 'F#', 'G#']],
  ['A', 'majAdd9', ['A', 'C#', 'E', 'G#', 'B'], ['B', 'E', 'D', 'F#', 'G#']],
  ['A', 'dim7', ['A', 'C', 'D#', 'F#'], ['A#', 'C', 'D#', 'D', 'F#', 'G']],
  ['A', 'aug', ['A', 'C#', 'F'], ['A', 'C#', 'F']],
];
function transposeNote(note, step, notesMap) {
  let indexOfNote = notesMap.indexOf(note);
  if (step < 0) {
    step = notesMap.length - step;
  }
  return notesMap[(indexOfNote + step) % notesMap.length];
}

function transposeChord(chord, step, notes) {
  console.log('transposeChord', chord);
  let newChord = JSON.parse(JSON.stringify(chord));
  newChord[0] = transposeNote(newChord[0], step, notes);
  newChord[2] = newChord[2].map((note) => {
    note = transposeNote(note, step, notes);
    return note;
  });
  newChord[3] = newChord[3].map((note) => {
    note = transposeNote(note, step, notes);
    return note;
  });
  return newChord;
}

function transposeTone(toneOfChords, step) {
  let newTone = JSON.parse(JSON.stringify(toneOfChords));
  return newTone.map((chord) => transposeChord(chord, step, NOTES_MAP_SOLO));
}

function getDataSet(chordsMap) {
  let allChords = [];

  for (let index = 0; index < 12; index++) {
    allChords.push(transposeTone(chordsMap, index, NOTES_MAP_SOLO));
  }
  return JSON.stringify(allChords);
}

export {
  transposeNote,
  randomIntegerRange,
  getDataSet,
  createDurMeasure,
  playChord,
  playAllChords,
  transposeTonality,
  convertChordStringToArr,
  findNotes,
  chordNamesToFullArr,
  convertChordToString,
  chordStringToFullChord,
};
