import PatternCreator from './PatternCreator';
import BarCreator from './BarCreator';

export default class PartCreator {
  constructor(chords, squaresCount, partOptions) {
    console.log('partOptions', partOptions);
    this.pattern =
      partOptions.pattern === 'accompaniment' &&
      new PatternCreator().getPattern(partOptions.notes, partOptions.type);
    console.log('this pattern', this.pattern);
    this.chords = chords;
    this.barCreator = new BarCreator(partOptions.notesLength, partOptions.type);
    this.squaresCountToAdd = squaresCount;
    this.notes = [];
    console.log('partOptions.restProbability', partOptions.restProbability);
    this.onInit(partOptions.restProbability / 100);
  }

  onInit(restProbability) {
    this.createRandomPart(restProbability);
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
        this.notes = [...this.notes, ...newBar];
      }
    }
  }
}
