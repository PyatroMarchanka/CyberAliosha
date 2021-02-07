import { PartNote, ChordModel } from './../../dataset/all_chords_for_impro';
import Vex from 'vexflow';
import { convertChordToString } from '../../utils';
const VF = Vex.Flow;

export class VexFlowController {
  ref: any;
  renderer: Vex.Flow.Renderer;
  barsPerLine = 4;
  lineHeight = 150;
  lineWidth = 300;
  context: Vex.IRenderContext;

  constructor(ref: any) {
    this.ref = ref;
    this.renderer = new VF.Renderer(this.ref?.current!, VF.Renderer.Backends.SVG);
    this.context = this.renderer.getContext();
    this.context.setFont('Arial', 10).setBackgroundFillStyle('#eed');
    this.renderer.resize(1500, 10);
  }

  drawAll = (notes: PartNote[][], chords: ChordModel[]) => {
    this.drawStaveLines(notes, chords);
  };

  drawStaveLines = (bars: PartNote[][], chords: ChordModel[]) => {
    if (bars.length) {
      this.context.clear();
    }
    const barsVexflow = bars.map((bar, idx) => {
      const vexflowBar = this.convertToVexflow(bar);
      return this.addChordName(vexflowBar, chords[idx]);
    });
    const staveLines = Math.ceil(barsVexflow.length / 5);

    this.renderer.resize(1500, staveLines * this.lineHeight);

    for (let staveLineNumber = 0; staveLineNumber < staveLines; staveLineNumber++) {
      barsVexflow
        .slice(
          staveLineNumber * this.barsPerLine,
          staveLineNumber * this.barsPerLine + this.barsPerLine,
        )
        .forEach((bar, barNumber) => this.drawStaveLineBar(bar, barNumber, staveLineNumber));
    }
  };

  drawStaveLineBar = (bar: Vex.Flow.StaveNote[], barNumber: number, staveLineNumber: number) => {
    const stave = new Vex.Flow.Stave(
      barNumber * this.lineWidth,
      staveLineNumber * this.lineHeight,
      this.lineWidth,
    );

    if (barNumber === 0) {
      stave.addClef('treble').setContext(this.context).draw();
      Vex.Flow.Formatter.FormatAndDraw(this.context, stave, bar, true);
    } else {
      Vex.Flow.Formatter.FormatAndDraw(this.context, stave, bar, true);
      stave.setContext(this.context).draw();
    }
  };

  convertToVexflow = (notes: PartNote[]) => {
    return notes.map((partNote, idx) => {
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

  addChordName = (notes: Vex.Flow.StaveNote[], chord: ChordModel) => {
    return notes.map((note, idx) => {
      if (idx === 0) {
        note.addModifier(
          0,
          new VF.Annotation(convertChordToString(chord))
            .setVerticalJustification(1)
            .setFont('Sans-serif', 16, ''),
        );
      }
      return note;
    });
  };
}
