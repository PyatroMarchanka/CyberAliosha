import { PartNote } from './../../dataset/all_chords_for_impro';
import Vex from 'vexflow';
import { duration } from '@material-ui/core';

export class VexFlowController {
  notes: PartNote[];

  constructor(notes: PartNote[]) {
    this.notes = notes;
    console.log('notes', notes);
  }

  convertToVexflow = (notes: PartNote[]) => {
    // new Vex.Flow.StaveNote({ keys: ['c/4'], duration: 'q' })
    return notes.map((partNote) => {
      console.log((1 / partNote.dur).toString(), partNote.dur);
      const octave = partNote.note[partNote.note.length - 1];

      const accidental = partNote.note.slice(0, -1).length > 1;

      const vexflowNote = new Vex.Flow.StaveNote({
        keys: [`${partNote.note[0]}/${octave}`],
        duration: (1 / partNote.dur).toString(),
      });

      if (accidental) {
        vexflowNote.addAccidental(0, new Vex.Flow.Accidental('#'));
      }

      return vexflowNote;
    });
  };
}
