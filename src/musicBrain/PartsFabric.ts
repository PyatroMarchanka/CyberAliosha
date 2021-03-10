import { Lyric } from '../utils/textUtils';
import { ChordModel, NotesLengthType, NotesPatterns } from './../dataset/all_chords_for_impro';
import PartCreator, { PartOptions } from './PartCreator';

export default class PartsFabric {
  chords: ChordModel[];
  parts: any[];
  squaresCount: number;
  constructor(chords: ChordModel[], squaresCount: number) {
    this.chords = chords;
    this.parts = [];
    this.squaresCount = squaresCount;
  }

  addPart(partOptions: PartOptions) {
    const part = new PartCreator(this.chords, this.squaresCount, partOptions).notes;
    this.parts.push(part);
    return part;
  }

  createPartByLyric = (partOptions: PartOptions) => {};

  getParts() {
    return this.parts;
  }
}
