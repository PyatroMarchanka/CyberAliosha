import { PartOptions } from './PartCreator';
import {
  NotesLengthType,
  ChordModel,
  PartNote,
  Notes,
  SolidNotes,
} from './../dataset/all_chords_for_impro';
import { DURATIONS } from '../dataset/dataset';
import { randomIntegerRange, createDurMeasure, createDurMeasureByCount } from '../utils';
import { Pattern } from './PatternCreator';
import { cloneDeep, shuffle } from 'lodash';

export default class BarCreator {
  type: PartOptions['type'];
  notesLengthMode: NotesLengthType;
  toneJsArr: PartNote[] | null | undefined;
  constructor(notesLengthMode: NotesLengthType, type: PartOptions['type']) {
    this.type = type;
    this.notesLengthMode = notesLengthMode;
    this.toneJsArr = [];
  }

  getRandomBar(
    chord: ChordModel,
    idx: number,
    pattern: Pattern[] | null,
    restProbability: number,
    notesCount?: number,
  ) {
    this.toneJsArr = this.createRandomBar(chord, pattern, restProbability, notesCount);
    this.createOctave(idx);
    return this.toneJsArr;
  }

  createRandomBar(
    chord: ChordModel,
    pattern: Pattern[] | null,
    restProbability: number,
    notesCount?: number,
  ) {
    let resultBar: PartNote[] = [];

    if (pattern) {
      pattern.map((patternNote) => {
        resultBar.push({
          note: Math.random() > restProbability ? chord[2][patternNote.chordPitch] : '',
          dur: patternNote.dur as PartNote['dur'],
        });
      });

      return resultBar;
    }

    let durs: number[] | undefined = [];
    if (notesCount) {
      durs = createDurMeasureByCount(this.notesLengthMode, notesCount);
    } else {
      durs = createDurMeasure(this.notesLengthMode);
    }

    if (!durs) return null;

    for (let index = 0; index < durs.length; index++) {
      const newNote = this.createRandomNote(
        chord[2],
        durs[index] as PartNote['dur'],
        null,
        restProbability,
      );
      resultBar.push(newNote);
    }

    if (notesCount) {
      return this.muteNotesBySyllablesCount(resultBar, notesCount);
    } else {
      return resultBar;
    }
  }

  muteNotesBySyllablesCount = (notes: PartNote[], count: number) => {
    const shortIdxes: number[] = notes.map((note, idx) => idx);

    const shuffledShortsIdxes = shuffle(shortIdxes);
    const result = cloneDeep(notes);
    let i = 0;
    while (result.filter((note) => !note.rest).length > count) {
      result[shortIdxes[i]].rest = true;
      i++;
    }
    return result;
  };

  createOctave(idx: number) {
    if (this.type === 'soprano') {
      this.toneJsArr = this.toneJsArr?.map((note) => {
        if (!note.note) {
          return note;
        }

        note.note = note.note + (idx % 5 === 0 ? '3' : idx % 9 === 0 ? '5' : '4');
        return note;
      });
    }
    if (this.type === 'bass') {
      this.toneJsArr = this.toneJsArr?.map((note) => {
        if (!note.note) {
          return note;
        }
        note.note = note.note + (idx % 6 === 0 ? '1' : '2');
        return note;
      });
    }
    if (this.type === 'tenor') {
      this.toneJsArr = this.toneJsArr?.map((note) => {
        if (!note.note) {
          return note;
        }

        note.note = note.note + (idx % 6 === 0 ? '2' : '3');
        return note;
      });
    }
  }

  createRandomNote(
    notes: Notes[],
    dur: PartNote['dur'],
    note: Notes | null,
    restProbability: number,
  ) {
    const randNoteIndex = randomIntegerRange(0, notes.length);
    const randNote = {
      note: Math.random() > restProbability ? (note ? note : notes[randNoteIndex]) : '',
      dur: dur || 1 / +DURATIONS[randomIntegerRange(1, DURATIONS.length)],
    };
    return randNote;
  }
}
