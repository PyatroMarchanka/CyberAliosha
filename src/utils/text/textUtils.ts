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

export const convertTextLinesToLyricRussian = (textLines: string) => {
  const lines: string[][][] = textLines.split('\n').map((str) => {
    const line = syllabify(str);
    console.log('line', line);

    const vovels = new RegExp(/[уеёыаоэяиюіУЕЁЫАОЭЯИЮІ]/g);

    const words: string[] = [];

    line.split(/[\s-]/).forEach((str: string) => {
      if (vovels.test(str)) {
        // const match = str.match(vovels);
        // console.log('match', match);
        words.push(str);
      } else {
        words[words.length - 1] = `${words[words.length - 1]} ${str}`;
      }
    });

    console.log('words', words);

    return words
      .filter((str: string) => {
        const reg = new RegExp(
          /[йцукенгшщзхъёфывапролджэячсмиітьбюўЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИІТЬБЮЎ]/,
        );

        if (!reg.test(str)) {
          return false;
        }
        return true;
      })
      .map((word: string) => word.split('·'));
  });
  console.log('lines', lines);

  const lyric: Lyric = {
    lines: lines
      .filter((line) => !!line.length)
      .map((line) => ({ words: line, syllablesCount: line.flat(Infinity).length })),
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
