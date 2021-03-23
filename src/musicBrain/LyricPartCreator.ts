import { PartOptions } from './PartCreator';
import { Pattern } from './PatternCreator';
import { Lyric } from '../utils/text/textUtils';
import { PartNote, ChordModel, NotesPatterns } from './../dataset/all_chords_for_impro';
import BarCreator from './BarCreator';

export class LyricPartCreator {
  notes: PartNote[][];
  squaresCountToAdd: number = 1;
  chords: ChordModel[];
  barCreator: BarCreator;
  pattern: Pattern[];

  constructor(chords: ChordModel[], partOptions: PartOptions) {
    this.chords = chords;
    this.barCreator = new BarCreator(partOptions.notesLength, partOptions.type);
  }

  createPartByLyric = (lyric: Lyric, restProbability: number = 0) => {
    this.notes = [];
    const chordNotesCounts = this.getChordNotesCounts(lyric);
    let notes: PartNote[][] = this.getBarNotesByLyric(chordNotesCounts, restProbability);
    this.notes = this.addLyricToNotes(notes, lyric);
    return this.notes;
  };

  getBarNotesByLyric = (chordNotesCounts: number[], restProbability: number = 0) => {
    let notes: PartNote[][] = [];

    for (let index = 0; index < this.squaresCountToAdd; index++) {
      this.chords.forEach((chord, i) => {
        const newBar = this.barCreator.getRandomBar(
          chord,
          i,
          this.pattern,
          restProbability,
          chordNotesCounts[i]
        );

        if (newBar) {
          notes = [...notes, newBar];
        }
      });
    }

    return notes;
  };

  getChordNotesCounts = (lyric: Lyric) => {
    const chordsForLine = Math.floor(this.chords.length / lyric.lines.length);
    const sumArr = (a: number[]) => a.reduce((acc, cur) => acc + cur, 0);

    const chordNotesCounts = lyric.lines
      .map((line) => {
        let count = line.syllablesCount;

        const chordNotesCount = count / chordsForLine;
        const ceilChordNotesCount = Math.ceil(count / chordsForLine);
        const floorChordNotesCount = Math.floor(count / chordsForLine);

        const lineCounts: number[] = [];
        let i = 0;
        while (sumArr(lineCounts) + chordNotesCount < count) {
          lineCounts.push(i % 2 === 0 ? floorChordNotesCount : ceilChordNotesCount);
          i++;
        }

        return lineCounts;
      }, [] as number[])
      .flat();

    return chordNotesCounts;
  };

  addLyricToNotes = (notes: PartNote[][], lyric: Lyric) => {
    const textLine = lyric.lines.map((line) => line.words.flat(Infinity)).flat() as string[];

    const result = notes.map((notesBar, barIdx) => {
      return notesBar.map((note, noteIdx) => {
        if (!note.rest) {
          note.lyric = textLine.shift();
        }
        return note;
      });
    });

    return result;
  };
}
