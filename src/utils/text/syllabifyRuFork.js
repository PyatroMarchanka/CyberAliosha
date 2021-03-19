const vowels = /[аеёиоуыэюяіi]/gi;
const deaf = 'длкпстфхцчшщўДЛКПСТФХЦЧШЩЎ';
const signs = ['ь', 'ъ', 'Ь', 'Ъ', "'"];
const voiced = ['м', 'р', 'л', 'н', 'М', 'Р', 'Л', 'Н'];

const splitLines = (source) => {
  return source.split('\n');
};

const splitWords = (source) => {
  return source.split(' ');
};

const addSyllable = (collection, syllable) => {
  collection.push(syllable);
};

const indexSign = (letters) => {
  let index = -1;
  signs.some((letter) => {
    index = letters.indexOf(letter);
    return index !== -1;
  });
  return index;
};

const indexYoy = (letters, nextLetter) => {
  const index = letters.indexOf('й');

  if (index !== -1) {
    return index;
  }
  return -1;
};

const indexSonoric = (letters) => {
  let index = -1;

  voiced.some((letter) => {
    index = letters.indexOf(letter);
    return index !== -1;
  });

  if (index !== -1) {
    const nextLetter = letters[index + 1];
    if (deaf.indexOf(nextLetter) === -1) {
      return -1;
    }
  }

  return index;
};

const _syllabifyWord = (word, { separator = '·' } = {}) => {
  const collection = [];

  const vowelsMatches = word.match(vowels);

  if (!vowelsMatches) {
    return word;
  }

  const letters = word.match(/[a-яёіiў]/gi);

  let skip = 0;
  let currentSyllable = '';
  let currentSyllableCount = 0;
  let isWordEnd = false;
  let isLastSyllable = false;

  const len = letters.length;

  letters.forEach((letter, index) => {
    if (skip) {
      return skip--;
    }

    currentSyllable += letter;

    isWordEnd = index + 1 === len;
    isLastSyllable = vowelsMatches.length - collection.length === 1;

    if (isLastSyllable) {
      return isWordEnd ? addSyllable(collection, currentSyllable) : null;
    }

    if (vowels.test(letter)) {
      vowels.lastIndex = 0;
      currentSyllableCount++;

      const nextVowel = vowelsMatches[currentSyllableCount];
      const nextWovelIndex = letters.indexOf(nextVowel, index + 1);
      const between = letters.slice(index + 1, nextWovelIndex);

      let indexSlice = -1;

      indexSlice = indexSign(between);

      if (indexSlice === -1) {
        indexSlice = indexYoy(between);
      }

      if (indexSlice === -1) {
        indexSlice = indexSonoric(between);
      }

      if (indexSlice !== -1) {
        const sufix = between.slice(0, indexSlice + 1);
        currentSyllable += sufix.join('');
        skip = sufix.length;
      }

      addSyllable(collection, currentSyllable);
      currentSyllable = '';
    }
  });

  return word.replace(/[а-яёіiў]+/i, collection.join(separator));
};

const syllabifyWord = (word, { separator = '·' } = {}) => {
  return word
    .split('-')
    .map((word_) => _syllabifyWord(word_, { separator }))
    .join('-');
};

export const syllabify = (source, { separator = '·' } = {}) => {
  const lines = splitLines(source);
  const modifyLines = lines.map((line) => {
    const words = splitWords(line);
    const syllabifyedWords = words
      .map((word) => syllabifyWord(word, { separator }))
      .map((word) => word.split('·'));
    return syllabifyedWords;
  });
  return modifyLines.flat();
};
