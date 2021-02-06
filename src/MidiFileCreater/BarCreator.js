import { DURATIONS } from '../dataset/dataset';
import { randomIntegerRange, createDurMeasure } from '../utils';

export default class BarCreator {
  constructor(notesLengthMode, type) {
    this.type = type;
    this.notesLengthMode = notesLengthMode;
    this.toneJsArr = [];
  }

  getRandomBar(chord, idx, pattern, restProbability) {
    this.toneJsArr = this.createRandomBar(chord, pattern, restProbability);
    this.createOctave(idx);
    return this.toneJsArr;
  }

  createRandomBar(chord, pattern, restProbability) {
    let resultBar = [];
    if (pattern) {
      pattern.map((patternNote) => {
        resultBar.push({
          note: Math.random() > restProbability ? chord[2][patternNote.chordPitch] : '',
          dur: patternNote.dur,
        });
      });

      return resultBar;
    }

    const durs = createDurMeasure(this.notesLengthMode);
    for (let index = 0; index < durs.length; index++) {
      const newNote = this.createRandomNote(chord[2], durs[index], null, restProbability);
      resultBar.push(newNote);
    }

    return resultBar;
  }

  createOctave(idx) {
    if (this.type === 'soprano') {
      console.log('soprano');
      this.toneJsArr = this.toneJsArr.map((note) => {
        if (!note.note) {
          return note;
        }

        note.note = note.note + (idx % 5 === 0 ? '3' : idx % 9 === 0 ? '5' : '4');
        return note;
      });
    }
    if (this.type === 'bass') {
      this.toneJsArr = this.toneJsArr.map((note) => {
        if (!note.note) {
          return note;
        }
        note.note = note.note + (idx % 6 === 0 ? '1' : '2');
        return note;
      });
    }
    if (this.type === 'tenor') {
      this.toneJsArr = this.toneJsArr.map((note) => {
        if (!note.note) {
          return note;
        }

        note.note = note.note + (idx % 6 === 0 ? '2' : '3');
        return note;
      });
    }
  }

  createRandomNote(notes, dur, note, restProbability) {
    const randNoteIndex = randomIntegerRange(0, notes.length);
    const randNote = {
      note: Math.random() > restProbability ? (note ? note : notes[randNoteIndex]) : '',
      dur: dur || 1 / +DURATIONS[randomIntegerRange(1, DURATIONS.length)],
    };
    return randNote;
  }
}
