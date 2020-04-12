import {
  randomIntegerRange,
  createDurMeasure
} from "./utils";

export default class PatternCreator {
  getPattern(notesLengthType, type) {
    const durs = createDurMeasure(notesLengthType, type);
    const result = [];
    durs.forEach((dur, idx) => {
        console.log(idx);
      if (idx === 0 && type === "bass") {
        console.log("bass 0 note tonic");
        result.push({
          chordPitch: 0,
          dur: dur
        });
      }
      else if (type === "bass" && idx === 1 && durs[0] < 0.25) {
        console.log("bass 1 note tonic");
        result.push({
          chordPitch: 0,
          dur: dur
        });
      } else {
          console.log('not the bass');
        result.push({
          chordPitch: randomIntegerRange(0, 3),
          dur: dur
        });
      }
    });
    console.log(result);
    console.log(result.reduce((acc, cur) => acc + cur.dur, 0));
    return result;
  }
}
