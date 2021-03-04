import nlp from 'compromise';
import compromiseSyllables from 'compromise-syllables';

nlp.extend(compromiseSyllables);

export const splitTextToSyllables = (text: string) => {
  let json = (nlp(text).terms() as any).syllables();
  const syllables = json.map((word: any) => word.syllables);
  console.log('syllables', syllables);
  return syllables;
};
