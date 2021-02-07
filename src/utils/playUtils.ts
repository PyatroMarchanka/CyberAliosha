// @ts-ignore
import Tone, { Buffer } from 'tone';
import { ChordModel, PartNote } from '../dataset/all_chords_for_impro';
import { SampleLibrary } from '../MidiFileCreater/ToneInstruments';
import { convertChordStringToArr, findNotes } from './chordsUtils';

// old synth
// const synth = new PolySynth(5, AMSynth).toMaster();

var guitar = SampleLibrary.load({
  instruments: 'guitar-acoustic',
});

Buffer.on('load', function () {
  console.log('instruments: guitar-acoustic,');
  guitar.toMaster();
});

export function playChord(chord: string, time = 0) {
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

export const playAllChords = (chords: ChordModel[]) => {
  const now = Tone.now();
  chords.forEach((chord, idx) => {
    chord[2].forEach((note, index) => {
      switch (index) {
        case 0:
          guitar.triggerAttackRelease(note + '1', 1, now + idx);
          break;

        case 1:
        case 2:
          guitar.triggerAttackRelease(note + '2', 1, now + idx);
          break;

        case 3:
        case 4:
        case 5:
          guitar.triggerAttackRelease(note + '3', 1, now + idx);
          break;

        default:
          break;
      }
    });
  });
};

export const playMelody = (notes: PartNote[]) => {
  let now = Tone.now();

  notes.forEach((note) => {
    guitar.triggerAttackRelease(note.note, note.dur, now + note.dur);
    now = now + note.dur;
  });
};
