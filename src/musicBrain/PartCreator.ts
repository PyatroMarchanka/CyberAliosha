import { LyricPartCreator } from './LyricPartCreator';
import { MotiveCreator } from './MotiveCreator';
import { ChordModel, PartNote } from './../dataset/all_chords_for_impro';
import PatternCreator, { Pattern } from './PatternCreator';
import BarCreator from './BarCreator';
import { NotesLengthType, NotesPatterns } from '../dataset/all_chords_for_impro';
import { Lyric } from '../utils/text/textUtils';

export interface PartOptions {
  type: 'soprano' | 'tenor' | 'bass';
  notesLength: NotesLengthType;
  function: 'accompaniment';
  pattern: NotesPatterns;
  restProbability: number;
  lyric?: Lyric;
}
export default class PartCreator {
  pattern: Pattern[] | null;
  middlePattern: Pattern[];
  chords: ChordModel[];
  barCreator: BarCreator;
  motiveCreator: MotiveCreator;
  lyricPartCreator: LyricPartCreator;
  squaresCountToAdd: number;
  notes: PartNote[][];
  lyric?: Lyric;

  constructor(chords: ChordModel[], squaresCount: number, partOptions: PartOptions) {
    this.pattern =
      partOptions.pattern === 'riff'
        ? new PatternCreator().getPattern(partOptions.notesLength, partOptions.type)
        : null;
    this.middlePattern = new PatternCreator().getPattern(partOptions.notesLength, partOptions.type);
    this.chords = chords;
    this.barCreator = new BarCreator(partOptions.notesLength, partOptions.type);
    this.motiveCreator = new MotiveCreator(partOptions);
    this.lyricPartCreator = new LyricPartCreator(chords, partOptions);
    this.squaresCountToAdd = squaresCount;
    this.notes = [];
    this.lyric = partOptions.lyric;
    this.onInit(partOptions);
  }

  onInit(partOptions: PartOptions) {
    if (this.lyric) {
      this.notes = this.lyricPartCreator.createPartByLyric(this.lyric);
    } else if (partOptions.pattern === NotesPatterns.Motive) {
      this.notes = this.motiveCreator.getPart(this.chords);
    } else {
      this.createNewRandomPart(partOptions.restProbability);
    }
  }

  createNewRandomPart(restProbability: number) {
    this.notes = [];
    for (let index = 0; index < this.squaresCountToAdd; index++) {
      this.chords.forEach((chord, i) => {
        const newBar = this.barCreator.getRandomBar(
          chord,
          i,
          (i + 1) % 4 === 0 ? this.middlePattern : this.pattern,
          restProbability
        );

        if (newBar) {
          this.notes = [...this.notes, newBar];
        }
      });
    }
  }
}
