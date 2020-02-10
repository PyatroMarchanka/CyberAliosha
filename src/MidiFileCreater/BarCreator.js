import { DURATIONS } from "../dataset/dataset";
import { randomIntegerRange, createDurMeasure } from "./utils";

export default class BarCreator {
  constructor(notesLengthMode, type) {
    this.type = type;
    this.notesLengthMode = notesLengthMode;
    this.toneJsArr = [];
  }

  getRandomBar(chord, idx, pattern) {
    this.toneJsArr = this.createRandomBar(chord, pattern);
    this.createOctave(idx);
    return this.toneJsArr;
  }

  createRandomBar(chord, pattern) {
    let resultBar = [];
    if (pattern){
        pattern.map(patternNote => {
          resultBar.push({
            note: chord[2][patternNote.chordPitch],
            dur: patternNote.dur
          })
        })
        return resultBar;
    }
    const durs = createDurMeasure(this.notesLengthMode);
    for (let index = 0; index < durs.length; index++) {
      // const chordNotes = 2;
      // const chordModeNotes = 3;

      // let notesMapIndex =
      //   (this.type === "soprano" || this.type === "tenor") &&
      //   durs[index] <= 0.125
      //     ? chordModeNotes
      //     : chordNotes;
      const newNote = this.createRandomNote(chord[2], durs[index]);

      // if (
      //   this.type === "no chomatic!" &&
      //   Math.random() > 0.75 &&
      //   index % 2 === 1 &&
      //   (chord[1] === "7" || chord[1] === "dim7" || chord[1] === "m7b5")
      // ) {
      //   const possibleChromatismNote = transposeNote(
      //     newNote.note,
      //     Math.random() > 0.5 ? -1 : 1,
      //     NOTES_MAP
      //   );
      //   const possibleCrom = this.createRandomNote(
      //     chord[2],
      //     durs[++index] || 0.5,
      //     possibleChromatismNote
      //   );
      //   resultBar.push(possibleCrom);
      // }
      resultBar.push(newNote);
    }
    return resultBar;
  }

  createOctave(idx) {
    if (this.type === "soprano") {
      this.toneJsArr = this.toneJsArr.map((note) => {
        note.note =
          note.note + (idx % 5 === 0 ? "4" : idx % 9 === 0 ? "6" : "5");
        return note;
      });
    }
    if (this.type === "bass") {
      this.toneJsArr = this.toneJsArr.map(note => {
          note.note = note.note + (idx % 6 === 0 ? "1" : "2");
          return note;
        })
      
    }
    if (this.type === "tenor") {
      this.toneJsArr = this.toneJsArr.map(note => {
          note.note = note.note + (idx % 6 === 0 ? "3" : "4");
          return note;
        })
    }
  }

  createRandomNote(notes, dur, note) {
    const randNoteIndex = randomIntegerRange(0, notes.length);
    const randNote = {
      note: note ? note : notes[randNoteIndex],
      dur: dur || 1 / +DURATIONS[randomIntegerRange(1, DURATIONS.length)]
    };
    return randNote;
  }
}
