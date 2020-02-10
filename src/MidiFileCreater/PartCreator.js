import PatternCreator from './PatternCreator'
import BarCreator from "./BarCreator";

export default class PartCreator {
  constructor(chords, squaresCount, notesLength, type, pattern) {
    this.pattern = pattern === 'accompaniment' && new PatternCreator().getPattern(notesLength, type);
    console.log(this.pattern);
    this.chords = chords;
    this.barCreator = new BarCreator(notesLength, type);
    this.squaresCountToAdd = squaresCount;
    this.notes = [];
    this.onInit();
  }

  onInit() {
    this.createRandomPart();
  }

  createRandomPart() {
    for (let index = 0; index < this.squaresCountToAdd; index++) {
      for (let idx in this.chords) {
        const newBar = this.barCreator.getRandomBar(this.chords[idx], idx, this.pattern)
        this.notes = [...this.notes, ...newBar];
      }
    }
  }
}

