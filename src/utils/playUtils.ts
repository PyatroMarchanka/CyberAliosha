// @ts-ignore
import Tone, { Buffer } from 'tone';
import { ChordModel, PartNote } from '../dataset/all_chords_for_impro';
import { SampleLibrary } from '../MidiFileCreater/ToneInstruments';
import { convertChordStringToArr, findNotes } from './chordsUtils';

// old synth
// const synth = new PolySynth(5, AMSynth).toMaster();

let guitar = SampleLibrary.load({
  instruments: 'piano',
});

Buffer.on('load', function () {
  console.log('instruments: piano,');
  guitar.toMaster();
});

const getOctaveForGuitar = (note: string, index: number) => {
  switch (index) {
    case 0:
      return note + '1';

    case 1:
    case 2:
      return note + '2';

    case 3:
    case 4:
    case 5:
      return note + '3';

    default:
      break;
  }
};

export function playChord(chord: string, time = 0) {
  const now = Tone.now();
  const chordNameArr = convertChordStringToArr(chord);
  const fullChord = findNotes(chordNameArr[0], 0, chordNameArr[1]);
  const chordNotes = fullChord && fullChord[2];

  chordNotes &&
    chordNotes.forEach((note, index) => {
      guitar.triggerAttackRelease(getOctaveForGuitar(note, index), 2, now + time);
    });
}

const playChordArpeggiated = (now: any, chord: ChordModel, notesPerBar: number = 4) => {
  const notes = [...chord[2].slice(0, notesPerBar - 1), chord[2][1]];
  notes.forEach((note, index) => {
    guitar.triggerAttackRelease(
      getOctaveForGuitar(note, index),
      2 / notesPerBar,
      now + index * (1 / notesPerBar),
    );
  });
};

export const playAllChords = (chords: ChordModel[], loops: number = 1) => {
  const now = Tone.now();

  for (let index = 0; index < loops; index++) {
    chords.forEach((chord, idx) => {
      chord[2].forEach((note, index) => {
        guitar.triggerAttackRelease(getOctaveForGuitar(note, index), 2, now + idx);
      });
    });
  }
};

export const playAllChordsArpeggiated = (
  chords: ChordModel[],
  notesPerBar: number = 4,
  loops: number = 1,
) => {
  let now = Tone.now();

  for (let index = 0; index < loops; index++) {
    chords.forEach((chord) => {
      playChordArpeggiated(now, chord, notesPerBar);
      now += 1;
    });
  }
};

export const playMelody = (notes: PartNote[], loops: number = 1) => {
  let now = Tone.now();
  console.log('playMelody', loops);

  for (let index = 0; index < loops; index++) {
    notes.forEach((note) => {
      guitar.triggerAttackRelease(note.note, note.dur, now);
      now = now + note.dur;
    });
  }
};

export const stopMelody = () => {
  // guitar.disconnect();
  // guitar = SampleLibrary.load({
  //   instruments: 'piano',
  // });
};
