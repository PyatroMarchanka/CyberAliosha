import { ChordModel, PartNote } from './../dataset/all_chords_for_impro';
import PatternCreator, { Pattern } from './PatternCreator';
import BarCreator from './BarCreator';
import { NotesLengthType, NotesPatterns } from '../dataset/all_chords_for_impro';
import { Lyric } from '../utils/textUtils';

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
  squaresCountToAdd: number;
  notes: PartNote[][];
  constructor(chords: ChordModel[], squaresCount: number, partOptions: PartOptions) {
    this.pattern =
      partOptions.pattern === 'riff'
        ? new PatternCreator().getPattern(partOptions.notesLength, partOptions.type)
        : null;
    this.middlePattern = new PatternCreator().getPattern(partOptions.notesLength, partOptions.type);
    this.chords = chords;
    this.barCreator = new BarCreator(partOptions.notesLength, partOptions.type);
    this.squaresCountToAdd = squaresCount;
    this.notes = [];
    this.onInit(partOptions.restProbability / 100);
  }

  createNewRandomPart(restProbability: number) {
    for (let index = 0; index < this.squaresCountToAdd; index++) {
      this.chords.forEach((chord, i) => {
        const newBar = this.barCreator.getRandomBar(
          chord,
          i,
          (i + 1) % 4 === 0 ? this.middlePattern : this.pattern,
          restProbability,
        );

        if (newBar) {
          this.notes = [...this.notes, newBar];
        }
      });
    }
  }

  onInit(restProbability: number) {
    this.createNewRandomPart(restProbability);
  }

  createRandomPart(restProbability: number) {
    for (let index = 0; index < this.squaresCountToAdd; index++) {
      for (let idx in this.chords) {
        const newBar = this.barCreator.getRandomBar(
          this.chords[idx],
          +idx,
          this.pattern,
          restProbability,
        );

        if (newBar) {
          this.notes = [...this.notes, newBar];
        }
      }
    }
  }

  createRandomPartBars(restProbability: number) {
    for (let index = 0; index < this.squaresCountToAdd; index++) {
      for (let idx in this.chords) {
        const newBar = this.barCreator.getRandomBar(
          this.chords[idx],
          +idx,
          this.pattern,
          restProbability,
        );

        if (newBar) {
          this.notes = [...this.notes, newBar];
        }
      }
    }
  }
}
