import { ChordModel, MidiNote, PartNote } from '../dataset/all_chords_for_impro';

export class MidiPlayer {
  playRef: any;
  bpm: number = 80;

  constructor(playRef: any) {
    this.playRef = playRef;
  }

  convertNoteToMidiPitch = (noteNameStr: string) => {
    if (typeof noteNameStr === 'number') {
      return noteNameStr;
    }
    if (noteNameStr === '') {
      return -100;
    }
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const note = notes.indexOf(noteNameStr.slice(0, noteNameStr.length - 1));
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

  playPart = (part: PartNote[]) => {
    var bpm = this.bpm;
    var N = (4 * 60) / bpm;

    const midipart = this.convertPartNotesPartToMidiPitches(part);
    let when = this.playRef.current.contextTime();
    for (let note of midipart) {
      const bpmDur = N * note.dur;
      console.log('when', when);
      this.playRef.current.playChordAt(when, 4, [note.note], bpmDur);
      when += bpmDur;
    }
  };

  stopAll = () => {
    this.playRef.current.cancelQueue();
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
