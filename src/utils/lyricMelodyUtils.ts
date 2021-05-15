import { getDursByNotesLengthType } from '.';
import { NotesLengthType } from '../dataset/all_chords_for_impro';
import { LyricLine } from './text/textUtils';

const DURS_TO_PUT_STRESSED = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5];
const MIN_STEP = 0.125;

export const checksBarForStresses = (
  durs: { dur: number; stressed: boolean }[],
  target: number
) => {
  const isSumValid = durs?.reduce((acc, cur) => acc + cur.dur, 0) === target;

  if (!isSumValid) {
    return false;
  }

  durs.forEach((dur, i) => {
    if (dur.stressed) {
      const sumBefore = durs.slice(0, 1).reduce((acc, cur) => acc + cur.dur, 0);
      const isStressedNoteValid = DURS_TO_PUT_STRESSED.includes(sumBefore);

      if (!isStressedNoteValid) {
        return false;
      }
    }
  });

  return true;
};

interface DurWithStress {
  dur?: number;
  stressed: boolean;
  isAdditional?: boolean;
  isLiga?: boolean;
}

export const lyricLineToDurWithStress = (lyricLine: LyricLine) => {
  const result: DurWithStress[] = [];
  lyricLine.words.forEach((word, wordI) => {
    word.forEach((syll, syllI) => {
      result.push({ stressed: syllI === lyricLine.stresses?.[wordI] && word.length > 1 });
    });
  });

  return result;
};

const splitLyricDursToBars = (lyricDurs: DurWithStress[]): DurWithStress[][] => {
  const result: DurWithStress[][] = [];
  let bar = 0;

  lyricDurs.forEach((dur, i) => {
    const sum = result.flat().reduce((acc, dur) => acc + dur.dur!, 0);
    if (!result[bar]) {
      result[bar] = [];
    }
    console.log('sum', sum, dur.dur, bar + 1);
    if (sum + dur.dur! < bar + 1) {
      result[bar].push(dur);
    } else if (sum + dur.dur! === bar + 1) {
      result[bar].push(dur);
      ++bar;
    } else {
      result[bar].push({ ...dur, dur: bar + 1 - sum });

      console.log('dur.dur! - (bar + 1 - sum)', dur.dur! - (bar + 1 - sum));
      if (!result[bar + 1]) {
        result[bar + 1] = [];
      }
      result[bar + 1].push({
        ...dur,
        dur: dur.dur! - (bar + 1 - sum),
        isLiga: true,
        isAdditional: true,
      });

      ++bar;
    }
  });
  console.log('result', result);
  return result;
};

const pushRandomDurInDursArr = (
  array: number[],
  target: number,
  lyricStresses: DurWithStress[],
  currentSyll: number,
  partial: DurWithStress[]
) => {
  const currentSum = partial.reduce((acc, cur) => acc + cur.dur!, 0);

  const randDur = array[Math.floor(Math.random() * array.length)];

  const result: DurWithStress[] = [...partial];

  if (lyricStresses[currentSyll].stressed && DURS_TO_PUT_STRESSED.includes(currentSum)) {
    result.push({ stressed: true, dur: randDur });
  } else if (lyricStresses[currentSyll].stressed && !DURS_TO_PUT_STRESSED.includes(currentSum)) {
    let closestDurForStressed = DURS_TO_PUT_STRESSED.find((dur) => dur > currentSum)! - currentSum;

    result.push({ isAdditional: true, stressed: false, dur: closestDurForStressed });
    result.push({ stressed: true, dur: randDur });
  } else if (!lyricStresses[currentSyll].stressed) {
    result.push({ stressed: false, dur: randDur });
  }

  return result;
};

const getDursByLyric = (
  array: number[],
  target: number,
  lyricStresses: DurWithStress[],
  currentSyll?: number,
  partial?: DurWithStress[]
): any => {
  currentSyll = currentSyll ?? 0;
  partial = partial || [];
  let result: DurWithStress[] = [...partial];

  if (currentSyll < lyricStresses.length) {
    result = pushRandomDurInDursArr(array, target, lyricStresses, currentSyll, partial);
  }

  const newSum = result.reduce((acc, cur) => acc + cur.dur!, 0);
  const isAllLyricAdded = result.filter((dur) => !dur.isAdditional).length >= lyricStresses.length;

  // if all is ok
  if (newSum === target && isAllLyricAdded) {
    return result;
  }

  // if newSum is equal to target but not all the lyric notes were used
  if (newSum === target && !isAllLyricAdded) {
    return getDursByLyric(array, target, lyricStresses);
  }

  // if newSum > target
  if (newSum > target) {
    const last = result[result.length - 1];
    const diff = newSum - target;

    if (last.dur! > diff && isAllLyricAdded) {
      result[result.length - 1].dur = last.dur! - diff;
      return result;
    }

    return getDursByLyric(array, target, lyricStresses);
  }

  // if newSum < target
  if (newSum < target) {
    if (currentSyll < lyricStresses.length) {
      return getDursByLyric(array, target, lyricStresses, currentSyll + 1, result);
    }

    if (currentSyll >= lyricStresses.length && isAllLyricAdded) {
      result.push({ isAdditional: true, stressed: false, dur: target - newSum });
      return result;
    }

    return getDursByLyric(array, target, lyricStresses);
  }
};

export function createLyricLineNotesDurs(
  lyricLine: LyricLine,
  notesLengthType: NotesLengthType,
  target: number
) {
  let result = getDursByLyric(
    getDursByNotesLengthType(notesLengthType),
    target,
    lyricLineToDurWithStress(lyricLine)
  );
  console.log('result', result);
  const sum = result?.reduce((acc: any, cur: any) => acc + cur.dur, 0);
  console.log('sum', sum);
  return splitLyricDursToBars(result);
}
