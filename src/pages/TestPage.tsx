import React, { useEffect } from 'react';
import { NotesLengthType } from '../dataset/all_chords_for_impro';
import { checksBarForStresses, createLyricLineNotesDurs, lyricLineToDurWithStress } from '../utils';
import { convertTextLinesToLyricEnglish } from '../utils/text/textUtils';

const testDurs: { dur: number; stressed: boolean }[] = [
  { dur: 0.125, stressed: true },
  { dur: 0.25, stressed: false },
  { dur: 0.25, stressed: true },
  { dur: 0.125, stressed: false },

  { dur: 0.25, stressed: false },
];

const testLyric = {
  words: [['one'], ['ba', 'by'], ['to'], ['a', 'no', 'ther'], ['says']],
  syllablesCount: 8,
  stresses: [0, 0, 0, 1, 0],
};

interface Props {}

export const TestPage = (props: Props) => {
  useEffect(() => {
    console.log(JSON.stringify(convertTextLinesToLyricEnglish('One baby to another says')));
    // console.log('lyricLineToDurWithStress', lyricLineToDurWithStress(testLyric));
    // console.log(' checkBarForLyric', checksBarForStresses(testDurs, 1));
    const durs = createLyricLineNotesDurs(testLyric, NotesLengthType.Middle, 2);
    console.log('durs', durs);
    durs.forEach((dur) =>
      console.log('checksBarForStresses(dur as any, 1)', checksBarForStresses(dur as any, 1))
    );
  }, []);

  return <div>Test</div>;
};
