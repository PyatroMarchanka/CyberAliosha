import nlp from 'compromise';
import compromiseSyllables from 'compromise-syllables';
import * as stresses from '../../dataset/stresses.json';

// @ts-ignore
import { syllabify } from './syllabifyRuFork';

export type Word = string[];
export interface LyricLine {
  words: Word[];
  syllablesCount: number;
  stresses?: number[];
}
export interface Lyric {
  lines: LyricLine[];
  syllablesCount: number;
}

nlp.extend(compromiseSyllables);

interface NLPJson {
  normal: string;
  syllables: string[];
  text: string;
}

export const splitTextLineToSyllables = (text: string) => {
  let json: NLPJson[] = (nlp(text).terms() as any).syllables();
  const syllables = json
    .filter((data) => !!data.normal)
    .map((word) => ({
      word: word.syllables,
      stress: getWordStressedSyllable(word.normal),
    }));
  return syllables;
};

export const convertTextLinesToLyricEnglish = (textLines: string) => {
  const lines = textLines.split('\n');
  const splited = lines.map((line) => splitTextLineToSyllables(line));
  const lyric: Lyric = {
    lines: splited.map((line) => {
      const lyricLine: LyricLine = {
        words: line.map((word) => word.word),
        syllablesCount: line.map((word) => word.word).flat(Infinity).length,
        stresses: line.map((word) => word.stress),
      };
      return lyricLine;
    }),
    syllablesCount: splited.map((line) => line.map((word) => word.word)).flat(Infinity).length,
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
        stresses: line.map((word) => 2),
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

export const getWordStressedSyllable = (word: any) => {
  const dictionary = (stresses as any).default;

  if (dictionary[word] !== undefined) {
    console.log('Found in dictionary: ', word);
    return dictionary[word];
  } else {
    console.log('Not found in dictionary ', word);
    return 0;
  }
};
