import PatternCreator from './PatternCreator';
import BarCreator from './BarCreator';

export default class PartCreator {
  constructor(chords, squaresCount, partOptions) {
    this.pattern =
      partOptions.pattern === 'accompaniment' &&
      new PatternCreator().getPattern(partOptions.notesLength, partOptions.type);
    this.chords = chords;
    this.barCreator = new BarCreator(partOptions.notesLength, partOptions.type);
    this.squaresCountToAdd = squaresCount;
    this.notes = [];
    this.onInit(partOptions.restProbability / 100);
  }

  onInit(restProbability) {
    this.createRandomPartBars(restProbability);
  }

  createRandomPart(restProbability) {
    for (let index = 0; index < this.squaresCountToAdd; index++) {
      for (let idx in this.chords) {
        const newBar = this.barCreator.getRandomBar(
          this.chords[idx],
          idx,
          this.pattern,
          restProbability,
        );

        this.notes = [...this.notes, newBar];
      }
    }
  }

  createRandomPartBars(restProbability) {
    for (let index = 0; index < this.squaresCountToAdd; index++) {
      for (let idx in this.chords) {
        const newBar = this.barCreator.getRandomBar(
          this.chords[idx],
          idx,
          this.pattern,
          restProbability,
        );

        this.notes = [...this.notes, newBar];
      }
    }
  }
}