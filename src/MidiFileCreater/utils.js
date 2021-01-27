import { NOTES_MAP_SOLO } from '../dataset/dataset';
import { PolySynth, AMSynth } from 'tone';
import chordsForImpro, { ChordModel } from '../dataset/all_chords_for_impro';

function randomIntegerRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

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

const synth = new PolySynth(5, AMSynth).toMaster();

function playChord(chord) {
  const chordNameArr = convertChordStringToArr(chord);
  const chordNotes = findNotes(chordNameArr[0], 0, chordNameArr[1])[2];
  for (let chordNote of chordNotes) {
    synth.triggerAttackRelease(chordNote + '4', 1);
  }
}

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

function createDurMeasure(notesLengthType, count) {
  console.log('notesLengthType', notesLengthType);
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
  let result = [];
  let currentAllNotesLength = 0;
  while (currentAllNotesLength < 1) {
    let dur =
      1 /
      typeLengthMap[notesLengthType][randomIntegerRange(0, typeLengthMap[notesLengthType].length)];
    result.push(dur);
    currentAllNotesLength += dur;
  }
  const space = 1;
  result[result.length - 1] = result[result.length - 1] - (currentAllNotesLength - space);
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
  ['A', 'm', ['A', 'C'], ['B', 'D', 'E', 'F', 'G']],
  ['A', 'm7', ['A', 'C', 'G'], ['B', 'D', 'E', 'F', 'G']],
  ['A', 'm9', ['A', 'C', 'G', 'B'], ['B', 'D', 'E', 'F', 'G']],
  ['A', 'm7b5', ['A', 'C', 'G'], ['B', 'D#', 'D', 'F', 'G']],
  ['A', 'mAdd9', ['A', 'C', 'G', 'B'], ['B', 'E', 'D', 'F', 'G']],
  ['A', '', ['A', 'C#'], ['B', 'E', 'D', 'F#', 'G#']],
  ['A', '7', ['A', 'C#', 'G'], ['B', 'E', 'D', 'F#', 'G']],
  ['A', 'maj', ['A', 'C#', 'G#'], ['B', 'E', 'D', 'F#', 'G#']],
  ['A', 'majAdd9', ['A', 'C#', 'G#', 'B'], ['B', 'E', 'D', 'F#', 'G#']],
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
  transposeTonality,
  convertChordStringToArr,
  findNotes,
  chordNamesToFullArr,
  convertChordToString,
};
