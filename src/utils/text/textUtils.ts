import nlp from 'compromise';
import compromiseSyllables from 'compromise-syllables';

// @ts-ignore
import { syllabify } from './syllabifyRuFork';

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

export const convertTextLinesToLyricEnglish = (textLines: string) => {
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

const removePronounseFromLine = (line: string[][]) => {
  const vowels = new RegExp(/[аеёиоуыэюяіi]/gi);

  const result: string[][] = [];

  let temp: string[] | null = null;

  line.forEach((word) => {
    if (word.length === 1 && !vowels.test(word[0]) && !!result[result.length - 2]) {
      const lastWord = result.length - 1;
      result[lastWord][result[lastWord].length - 1] += ` ${word[0]}`;
    } else if (word.length === 1 && !vowels.test(word[0]) && !result[result.length - 2]) {
      temp = word;
    } else {
      result.push(word);

      if (temp) {
        result[result.length - 1][0] = `${temp[0]} ${result[result.length - 1][0]}`;
        temp = null;
      }
    }
  });

  return result;
};

export const convertTextLinesToLyricRussian = (textLines: string) => {
  const lines: string[][][] = textLines.split('\n').map((str) => {
    const line: string[][] = syllabify(
      str.split('–').join('').split('-').join('').split(' ').filter(Boolean).join(' ')
    );

    return removePronounseFromLine(line);
  });

  const lyric: Lyric = {
    lines: lines
      .filter((line) => !!line.length)
      .map((line) => ({
        words: line,
        syllablesCount: line.flat(Infinity).length,
      })),
    syllablesCount: lines.flat(Infinity).length,
  };

  return lyric;
};

export const isTextRussian = (text: string) => {
  const reg = new RegExp(/[йцукенгшщзхъёфывапролджэячсмитьбюЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ]/);

  if (reg.test(text)) {
    return true;
  }

  return false;
};

export const convertTextToSyllables = (textLines: string) => {
  if (isTextRussian(textLines)) {
    return convertTextLinesToLyricRussian(textLines);
  } else {
    return convertTextLinesToLyricEnglish(textLines);
  }
};
