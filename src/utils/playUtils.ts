// @ts-ignore
import Tone, { Buffer } from 'tone';
import { ChordModel, PartNote } from '../dataset/all_chords_for_impro';
import { SampleLibrary } from '../MidiFileCreater/ToneInstruments';
import { convertChordStringToArr, findNotes } from './chordsUtils';

const toneJsDurs = {
  [2]: '1n',
  [1]: '1n',
  [0.5]: '2n',
  [0.25]: '4n',
  [0.125]: '8n',
  [0.0625]: '16n',
};

const convertNotesToToneJsArr = (notes: PartNote[]) => {
  let now = 0;

  const data = notes.map((note) => {
    const noteData = { note: note.note, dur: toneJsDurs[note.dur], time: now };
    now = now + note.dur;
    return noteData;
  });

  return data;
};

// old synth
// const synth = new PolySynth(5, AMSynth).toMaster();

let guitar = SampleLibrary.load({
  instruments: 'piano',
});

Buffer.on('load', function () {
  console.log('instruments: piano,');
  guitar.toMaster();
});

Tone.Transport.start();

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
      return note + '2';
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

const getTransportTime = (previousTime: string, note: PartNote) => {
  let [bar, quaters, sixteenths] = previousTime.split('.').map(Number);
  const { dur } = note;

  const noteBars = dur - (dur % 1);
  const noteQuarters = dur - (dur % 0.25) / 0.25;
  const noteSixteenths = dur - (dur % 0.125) / 0.125;
};

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

const getNotesForChord = (chord: ChordModel, notesPerBar: number = 4): PartNote[] => {
  const notes = [...chord[2].slice(0, notesPerBar - 1), chord[2][1]];
  return notes.map((note, index) => ({
    note: getOctaveForGuitar(note, index),
    dur: (1 / notesPerBar) as PartNote['dur'],
  }));
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
  const data = convertNotesToToneJsArr(notes);

  const part = new Tone.Part((time: any, note: any) => {
    guitar.triggerAttackRelease(note.note, note.dur, time);
  }, data).start(0);

  part.humanize = true;

  console.log(part);

  Tone.Transport.start();
};

export const playPartChordsArpeggiated = (
  chords: ChordModel[],
  notesPerBar: number = 4,
  loops: number = 1,
) => {
  const notes = chords.map((chord) => getNotesForChord(chord, notesPerBar)).flat();

  playMelody(notes, 1);

  // for (let index = 0; index < loops; index++) {
  //   chords.forEach((chord) => {
  //     playChordArpeggiated(now, chord, notesPerBar);
  //     now += 1;
  //   });
  // }
};

export const stopMelody = () => {
  console.log('stopMelodys');
  Tone.Transport.cancel();
  Tone.Transport.start();
  // Tone.Transport.stop();
  // Tone.Player.stopAll();
  // guitar.disconnect();
  // guitar.toMaster();
  // guitar = SampleLibrary.load({
  //   instruments: 'piano',
  // });
};
