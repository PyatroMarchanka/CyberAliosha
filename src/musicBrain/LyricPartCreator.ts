import { LyricLine } from './../utils/text/textUtils';
import { PartOptions } from './PartCreator';
import { Pattern } from './PatternCreator';
import { Lyric } from '../utils/text/textUtils';
import {
  PartNote,
  ChordModel,
  NotesPatterns,
  NotesLengthType,
} from './../dataset/all_chords_for_impro';
import BarCreator from './BarCreator';
import { checksBarForStresses, createLyricLineNotesDurs } from '../utils';

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

  getBarNotesByLyric = (barNotesCounts: number[], restProbability: number = 0) => {
    let notes: PartNote[][] = [];

    for (let index = 0; index < this.squaresCountToAdd; index++) {
      this.chords.forEach((chord, i) => {
        const newBar = this.barCreator.getRandomBar(
          chord,
          i,
          this.pattern,
          restProbability,
          barNotesCounts[i]
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

  // NEW LYRIC MELODY CREATOR
  createPartByLyricNew = (lyric: Lyric, notesLength: NotesLengthType) => {
    this.notes = [];
    let lyricNotes = lyric.lines
      .map((line) => createLyricLineNotesDurs(line, notesLength, 2))
      .flat();
    lyricNotes.forEach((notes) => {
      if (!checksBarForStresses(notes as any, 1)) {
        throw new Error('Bar is not valid');
      }
    });

    const patrNotes = lyricNotes.map((barDurs, i) => {
      const durs = barDurs.map((dur) => dur.dur!);

      const barNotes = this.barCreator.getNotesWithOctavesForBar(
        barDurs,
        this.chords[i % this.chords.length]
      );

      return barNotes!.map(
        (note, i) =>
          ({ ...note, rest: !!(barDurs[i].isAdditional || barDurs[i].isLiga) } as PartNote)
      );
    });

    this.notes = this.addLyricToNotesNew(patrNotes, lyric);
    return this.notes;
  };

  addLyricToNotesNew = (notes: PartNote[][], lyric: Lyric): PartNote[][] => {
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
