import ALL_CHORDS_FOR_IMPROVISE from "../dataset/all_chords_for_impro";
import { randomIntegerRange } from "./utils";
import releases from "./Releaser";

export default class MidiChordsCreator {
  constructor() {
    this.chords = [];
  }

  generateChords(all_chords, count) {
    const result = [];
    for (let i = 0; i < count; i++) {
      const releaseChord = releases(result[i - 1]);
      if (releaseChord) {
        result.push(releaseChord);
        continue;
      }
      const randTone = all_chords[randomIntegerRange(0, all_chords.length)];
      let randChord = randTone[randomIntegerRange(0, randTone.length)];
      result.push(randChord);
    }
    return result.slice(0, count);
  }

  getNewChords(count){
   const chords = this.generateChords(ALL_CHORDS_FOR_IMPROVISE, count);
      return chords;
  }


  getChords(){
      return this.chords;
  }
}
