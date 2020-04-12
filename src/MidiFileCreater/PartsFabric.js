import PartCreator from './PartCreator';

export default class PartsFabric {
  constructor(chords, squaresCount) {
    this.chords = chords;
    this.parts = [];
    this.squaresCount = squaresCount;
  }

  addPart(partOptions) {
    const part = new PartCreator(this.chords, this.squaresCount, partOptions).notes;
    this.parts.push(part);
  }

  getParts() {
    return this.parts;
  }
}
