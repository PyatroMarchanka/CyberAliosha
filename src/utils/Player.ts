import * as Tone from 'tone';
import { ChordModel, MidiNote, PartNote } from '../dataset/all_chords_for_impro';
import { SampleLibrary } from '../musicBrain/ToneInstruments';

let guitar: Tone.Sampler;

export const loadSounds = async () => {
  guitar = SampleLibrary.load({
    instruments: 'piano',
  });

  await Tone.Buffer.loaded();
  console.log('instruments: piano,');
  guitar.toDestination();
};

const toneJsDurs = {
  [2]: '1n',
  [1]: '1n',
  [0.5]: '2n',
  [0.25]: '4n',
  [0.125]: '8n',
  [0.0625]: '16n',
};

export class Player {
  private melodyPart: Tone.Part;
  private chordsPart: Tone.Part;
  private part: number;
  public loaded: boolean;

  constructor() {
    Tone.Transport.bpm.setValueAtTime(80, Tone.now());
    Tone.Transport.start();
    Tone.Transport.bpm.rampTo(80);
    this.loaded = false;
  }

  private convertNotesToToneJsArr = (notes: PartNote[]) => {
    let now = Tone.now();

    const data = notes.map((note) => {
      const noteData = { note: note.note, dur: toneJsDurs[note.dur], time: now };
      now = now + note.dur;
      return noteData;
    });

    return data;
  };

  setChordsAndMelody = (
    chords: ChordModel[],
    notes: PartNote[],
    notesPerBar: number = 4,
    loops: number = 1,
    cb?: () => void,
  ) => {
    this.setPart(notes, loops);
    this.setPartChords(chords, notesPerBar, loops);

    if (cb) {
      const end = notes.reduce((acc, cur) => acc + cur.dur, 0);
      Tone.Transport.scheduleOnce(cb, Tone.now() + end * loops);
    }
  };

  setPart = (notes: PartNote[], loops: number = 1, cb?: () => void) => {
    this.melodyPart = this.getPart(notes, loops);

    if (cb) {
      const end = notes.reduce((acc, cur) => acc + cur.dur, 0);
      Tone.Transport.scheduleOnce(cb, Tone.now() + end * loops);
    }
  };

  setPartChords = (
    chords: ChordModel[],
    notesPerBar: number = 4,
    loops: number = 1,
    cb?: () => void,
  ) => {
    const notes = chords.map((chord) => this.getNotesForChord(chord, notesPerBar)).flat();
    this.chordsPart = this.getPart(notes, loops);
    if (cb) {
      const end = notes.reduce((acc, cur) => acc + cur.dur, 0);
      Tone.Transport.scheduleOnce(cb, Tone.now() + end * loops);
    }
  };

  getPart = (notes: PartNote[], loops: number = 1) => {
    let loopedNotes: PartNote[] = [];

    for (let index = 0; index < loops; index++) {
      loopedNotes = [...loopedNotes, ...notes];
    }

    const data = this.convertNotesToToneJsArr(loopedNotes);

    const part = new Tone.Part((time: any, note: any) => {
      guitar.triggerAttackRelease(note.note, note.dur, time);
    }, data);

    return part;
  };

  static playChord = (chord: ChordModel, time = 0) => {
    const now = Tone.now();
    const chordNotes = chord[2];

    chordNotes &&
      chordNotes.forEach((note, index) => {
        guitar.triggerAttackRelease(getOctaveForGuitar(note, index), 2, now + time);
      });
  };

  playChordArpeggiatedOld = (now: any, chord: ChordModel, notesPerBar: number = 4) => {
    const notes = [...chord[2].slice(0, notesPerBar - 1), chord[2][1]];
    notes.forEach((note, index) => {
      guitar.triggerAttackRelease(
        getOctaveForGuitar(note, index),
        2 / notesPerBar,
        now + index * (1 / notesPerBar),
      );
    });
  };

  getNotesForChord = (chord: ChordModel, notesPerBar: number = 4): PartNote[] => {
    const notes = [...chord[2].slice(0, notesPerBar - 1), chord[2][1]];
    return notes.map((note, index) => ({
      note: getOctaveForGuitar(note, index),
      dur: (1 / notesPerBar) as PartNote['dur'],
    }));
  };

  playAllChords = (chords: ChordModel[], loops: number = 1) => {
    const now = Tone.now();

    for (let index = 0; index < loops; index++) {
      chords.forEach((chord, idx) => {
        chord[2].forEach((note, index) => {
          guitar.triggerAttackRelease(getOctaveForGuitar(note, index), 2, now + idx);
        });
      });
    }
  };

  playAllChordsArpeggiated = (chords: ChordModel[], notesPerBar: number = 4, loops: number = 1) => {
    let now = Tone.now();

    for (let index = 0; index < loops; index++) {
      chords.forEach((chord) => {
        this.playChordArpeggiatedOld(now, chord, notesPerBar);
        now += 1;
      });
    }
  };

  playAll = (bpm = 120) => {
    console.log('bpm', bpm);
    // Tone.getTransport().bpm.rampTo(bpm);

    if (this.melodyPart?.start) {
      this.melodyPart.start(0);
    }

    if (this.chordsPart?.start) {
      this.chordsPart.start(0);
    }
  };

  stopMelody = () => {
    if (this.melodyPart?.stop) {
      this.melodyPart.stop(0);
    }

    if (this.chordsPart?.stop) {
      this.chordsPart.stop(0);
    }
  };
}

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
