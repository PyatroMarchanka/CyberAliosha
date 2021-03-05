import nlp from 'compromise';
import compromiseSyllables from 'compromise-syllables';

export type Word = string[];
export interface LyricLine {
  words: Word[];
  syllablesCount: number;
}
export interface Lyric {
  lines: LyricLine[];
  syllablesCount: number;
}

nlp.extend(compromiseSyllables);

export const splitTextLineToSyllables = (text: string) => {
  let json = (nlp(text).terms() as any).syllables();
  const syllables = json.map((word: any) => word.syllables);
  return syllables;
};

export const convertTextLinesToLyric = (textLines: string) => {
  const lines = textLines.split('\n');
  const splited = lines.map((line) => splitTextLineToSyllables(line)) as string[][][];
  const lyric: Lyric = {
    lines: splited.map((line) => {
      const lyricLine: LyricLine = {
        words: line,
        syllablesCount: line.flat(Infinity).length,
      };
      return lyricLine;
    }),
    syllablesCount: splited.flat(Infinity).length,
  };

  return lyric;
};
