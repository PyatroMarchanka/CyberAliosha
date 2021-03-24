import { ChordModel, MidiNote, PartNote } from '../dataset/all_chords_for_impro';

interface Note {
  note: 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';
}

export const instruments = [4];
const voiceInstrument = instruments[0];
export class MidiPlayer {
  playRef: any;
  bpm: number = 80;
  timeout: NodeJS.Timeout | null;

  constructor(playRef: any, bpm: number) {
    this.playRef = playRef;
    this.bpm = bpm;

    if (this.playRef.current) {
      this.playRef.current?.setBand256(-5);
      this.playRef.current?.setBand512(-5);
    }
  }

  convertNoteToMidiPitch = (noteNameStr: string, isRest?: boolean) => {
    if (typeof noteNameStr === 'number') {
      return noteNameStr;
    }
    if (isRest) {
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
        note: this.convertNoteToMidiPitch(note.note, note.rest),
        dur: note.dur,
      };

      return midiNote;
    });
  };

  playPartChords = (chords: ChordModel[], onEnd?: () => void, notesPerBar: number = 4) => {
    const part = chords.map((chord) => this.getNotesForChord(chord, notesPerBar)).flat();

    this.playPart(part, onEnd, undefined, 4);
  };

  getNotesForChord = (chord: ChordModel, notesPerBar: number = 4): PartNote[] => {
    let notes: string[] = [];
    if (chord[2].length === 3) {
      notes = [...chord[2], chord[2][1], ...chord[2], chord[2][1]].slice(0, notesPerBar);
    }

    if (chord[2].length === 4) {
      notes = [...chord[2], ...chord[2]].slice(0, notesPerBar);
    }

    if (chord[2].length === 5) {
      notes = [
        chord[2][0],
        chord[2][1],
        chord[2][3],
        chord[2][4],
        chord[2][0],
        chord[2][1],
        chord[2][3],
        chord[2][4],
      ].slice(0, notesPerBar);
    }

    return notes.map((note, index) => ({
      note: getOctaveForGuitar(note, index),
      dur: (1 / notesPerBar) as PartNote['dur'],
    }));
  };

  getPartLength = (part?: PartNote[] | null, chords?: ChordModel[]): number => {
    let length = 0;
    let partToCalculate;

    if (part) {
      partToCalculate = part;
    }

    if (chords) {
      partToCalculate = chords.map((chord) => this.getNotesForChord(chord, 4)).flat();
    }

    var bpm = this.bpm;
    var N = (4 * 60) / bpm;

    if (!partToCalculate) {
      return 0;
    }

    for (let note of partToCalculate) {
      const bpmDur = N * note.dur;
      length += bpmDur;
    }

    return length;
  };

  playPart = (
    part: PartNote[],
    onEnd?: () => void,
    newBpm?: number,
    instrument = voiceInstrument
  ) => {
    var bpm = newBpm || this.bpm;
    var N = (4 * 60) / bpm;
    let length = 0;

    const midipart = this.convertPartNotesPartToMidiPitches(part);
    let when = this.playRef.current?.contextTime();
    for (let note of midipart) {
      const bpmDur = N * note.dur;
      this.playRef.current?.playChordAt(when, instrument, [note.note], bpmDur);
      // this.playRef.current?.playChordAt(when, 4, [note.note], bpmDur);
      when += bpmDur;
      length += bpmDur;
    }

    if (onEnd) {
      this.timeout = setTimeout(onEnd, length * 1000);
    }
  };

  playChord = (chord: ChordModel, time = 0) => {
    const notes = chord[2].map((note, index) =>
      this.convertNoteToMidiPitch(getOctaveForGuitar(note, index))
    );

    this.playRef.current?.playStrumUpNow(4, notes, 1);
  };

  stopAll = () => {
    this.playRef?.current?.cancelQueue();

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
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
