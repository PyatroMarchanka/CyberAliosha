import { PartOptions } from './PartCreator';
import { cloneDeep, map } from 'lodash';
import { createDurMeasure, randomIntegerRange } from '../utils';
import {
  PartNote,
  ChordModel,
  SharpNotes,
  allNotes,
  NotesLengthType,
} from './../dataset/all_chords_for_impro';
import BarCreator from './BarCreator';

interface MotiveCreatorProps {}

export class MotiveCreator {
  barCreator: BarCreator;
  partOptions: PartOptions;

  constructor(partOptions: PartOptions) {
    this.partOptions = partOptions;
    this.barCreator = new BarCreator(partOptions.notesLength, partOptions.type);
  }

  getPart = (chords: ChordModel[]) => {
    const initialPart = this.barCreator.getRandomBar(
      chords[0],
      0,
      null,
      this.partOptions.restProbability
    );

    if (!initialPart) {
      throw new Error(`Error on creating initial part for MotiveCreator: chord: ${chords[0]}`);
    }

    return chords.map(
      (chord, i) => this.getBarWithMovedNotes(initialPart, chord)
      // (i + 3) % 4 === 0 || (i + 4) % 4 === 0
      //   ? this.getBarWithMovedNotes(initialPart, chord)
      //   : this.getBarByMotive(initialPart, chord)
    );
  };

  getBarByMotive = (initialPart: PartNote[], chord: ChordModel) => {
    const notes: PartNote[] = cloneDeep(initialPart);

    return notes.map((note) => {
      note.note =
        this.getClosestNoteInChord(note.note.slice(0, -1) as SharpNotes, chord) +
        note.note[note.note.length - 1];
      return note;
    });
  };

  getClosestNoteInChord = (note: SharpNotes, chord: ChordModel) => {
    const noteIdx = allNotes.indexOf(note);

    const resultIdx = chord[2].map((chordNote) => {
      const idx = allNotes.indexOf(chordNote);
      let diff = Math.abs(idx - noteIdx);
      let resultIdx = diff;

      if (resultIdx >= 6) {
        const newIdx = Math.min(idx, noteIdx) + allNotes.length;
        resultIdx = newIdx - Math.max(idx, noteIdx);
      }

      return resultIdx;
    });

    const min = resultIdx.reduce((acc, cur) => (acc < cur ? acc : cur));
    const resultNote = chord[2][resultIdx.indexOf(min)];

    return resultNote;
  };

  getBarWithMovedNotes = (initialPart: PartNote[], chord: ChordModel) => {
    const newBar = this.getBarByMotive(initialPart, chord);

    const idxWithBiggestNote = newBar.reduce(
      (acc, cur, idx) => (initialPart[acc].dur < cur.dur ? idx : acc),
      0
    );

    if (Math.random() > 0.3) {
      const splittedNote = this.splitNote([newBar[idxWithBiggestNote]], chord);
      newBar.splice(idxWithBiggestNote, 1, ...(splittedNote || []));

      return newBar;
    } else {
      return this.moveNotesInBar(newBar, chord);
    }
  };

  moveNotesInBar = (initialPart: PartNote[], chord: ChordModel) => {
    const newBar = this.getBarByMotive(initialPart, chord);
    const durs = newBar.map((bar) => bar.dur);
    const spliceStart = randomIntegerRange(0, durs.length);
    const deleteCount = randomIntegerRange(1, durs.length - spliceStart);

    const spliced = durs.splice(spliceStart, deleteCount);

    durs.splice(randomIntegerRange(0, durs.length), 0, ...spliced);

    return newBar.map((note, idx) => {
      note.dur = durs[idx];
      return note;
    });
  };

  splitNote = (notes: PartNote[], chord: ChordModel) => {
    const durs = createDurMeasure(
      NotesLengthType.Middle,
      notes.reduce((acc, cur) => acc + cur.dur, 0)
    );

    const newNotes: PartNote[] | undefined = durs?.map((dur) => ({
      dur,
      note: chord[2][randomIntegerRange(0, chord[2].length)] + '4',
    }));

    return newNotes;
  };
}
