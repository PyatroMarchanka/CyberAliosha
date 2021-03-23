import { ChordModel } from './../dataset/all_chords_for_impro';
import { build } from './vexchordsFork/builder';
import ChordBox, { ChordChart } from './vexchordsFork/chordbox';

export class VexChordsController {
  private selectorPrefix: string;
  private chordParams = {
    // Customizations (all optional, defaults shown)
    width: 150, // canvas width
    height: 180, // canvas height
    circleRadius: 5, // circle radius (width / 20 by default)

    numStrings: 6, // number of strings (e.g., 4 for bass)
    numFrets: 5, // number of frets (e.g., 7 for stretch chords)
    showTuning: true, // show tuning keys

    defaultColor: '#666', // default color
    bgColor: '#FFF', // background color
    strokeColor: '#666', // stroke color (overrides defaultColor)
    textColor: '#666', // text color (overrides defaultColor)
    stringColor: '#666', // string color (overrides defaultColor)
    fretColor: '#666', // fret color (overrides defaultColor)
    labelColor: '#666', // label color (overrides defaultColor)

    fretWidth: 1, // fret width
    stringWidth: 1, // string width

    // fontFamily,
    fontSize: undefined,
    // fontWeight,
    // fontStyle,
    // labelWeight
  };

  chords: ChordBox[] = [];
  chordCharts: ChordChart[];

  constructor(selectorPrefix: string, color = '#666') {
    this.selectorPrefix = selectorPrefix;
    this.chordParams = {
      ...this.chordParams,
      defaultColor: color,
      bgColor: '#FFF',
      strokeColor: color,
      textColor: color,
      stringColor: color,
      fretColor: color,
      labelColor: color,
    };
  }

  drawChords = (chords: ChordModel[]) => {
    if (this.chords.length > 0) {
      this.chords.forEach((chord) => {
        chord.clear();
      });
    }

    this.chordCharts = this.getChordsData(chords);

    this.chords = this.chordCharts.map(
      (chart, idx) => new ChordBox(`#${this.selectorPrefix}${idx}`, this.chordParams)
    );

    this.chords.forEach((chord, idx) => {
      chord.draw(this.chordCharts[idx]);
      chord.drawText(Math.ceil(this.chordParams.width / 2), 0, this.chordCharts[idx].name || '', {
        fontSize: 20,
      });
    });
  };

  private getChordsData = (chords: ChordModel[]): ChordChart[] => {
    return chords.map((chord) => this.findChordChartData(chord));
  };

  findChordChartData = (chord: ChordModel): ChordChart => {
    const chordChart = build(chord[0], chord[1]);
    return chordChart;
  };

  clear = () => {
    this.chords.forEach((chord) => {
      chord.clear();
    });
  };
}
