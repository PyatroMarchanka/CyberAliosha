import { ChordModel, MidiNote, PartNote } from '../dataset/all_chords_for_impro';

interface Note {
  note: 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';
}
export class MidiPlayer {
  playRef: any;
  bpm: number = 80;

  constructor(playRef: any, bpm: number) {
    this.playRef = playRef;
    this.bpm = bpm;
  }

  convertNoteToMidiPitch = (noteNameStr: string) => {
    if (typeof noteNameStr === 'number') {
      return noteNameStr;
    }
    if (noteNameStr === '') {
      return -100;
    }
    const notesDictionary = {
      C: 0,
      'C#': 1,
      D: 2,
      'D#': 3,
      E: 4,
      F: 5,
      'F#': 6,
      G: 7,
      'G#': 8,
      A: 9,
      'A#': 10,
      B: 11,
    };

    const note = notesDictionary[noteNameStr.slice(0, noteNameStr.length - 1) as Note['note']];
    const octave = +noteNameStr[noteNameStr.length - 1];
    const c = 24;
    const result = c + (octave - 1) * 12 + note;
    return result;
  };

  convertPartNotesPartToMidiPitches = (notes: PartNote[]): MidiNote[] => {
    return notes.map((note) => {
      const midiNote = {
        note: this.convertNoteToMidiPitch(note.note),
        dur: note.dur,
      };

      return midiNote;
    });
  };

  playPartChords = (chords: ChordModel[], notesPerBar: number = 4) => {
    const part = chords.map((chord) => this.getNotesForChord(chord, notesPerBar)).flat();

    this.playPart(part);
  };

  getNotesForChord = (chord: ChordModel, notesPerBar: number = 4): PartNote[] => {
    const notes = [...chord[2].slice(0, notesPerBar - 1), chord[2][1]];
    return notes.map((note, index) => ({
      note: getOctaveForGuitar(note, index),
      dur: (1 / notesPerBar) as PartNote['dur'],
    }));
  };

  playPart = (part: PartNote[], newBpm?: number) => {
    var bpm = newBpm || this.bpm;
    var N = (4 * 60) / bpm;

    const midipart = this.convertPartNotesPartToMidiPitches(part);
    let when = this.playRef.current.contextTime();
    for (let note of midipart) {
      const bpmDur = N * note.dur;
      this.playRef.current.playChordAt(when, 4, [note.note], bpmDur);
      when += bpmDur;
    }
  };

  playChord = (chord: ChordModel, time = 0) => {
    const notes = chord[2].map((note, index) =>
      this.convertNoteToMidiPitch(getOctaveForGuitar(note, index)),
    );

    this.playRef.current.playChordNow(4, notes, 1);
  };

  stopAll = () => {
    this.playRef.current.cancelQueue();
  };
}

const getOctaveForGuitar = (note: string, index: number) => {
  switch (index) {
    case 0:
      return note + '2';

    case 1:
    case 2:
      return note + '3';

    case 3:
    case 4:
    case 5:
      return note + '4';

    default:
      return note + '3';
  }
};
