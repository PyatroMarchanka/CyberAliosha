export class WordSplitter {
  constructor(string) {
    this.string = string;
  }

  splitStrBySyllable(str) {
    const stringArr = str
      .split(/[:;,.?!-]/)
      .join('')
      .split(' ');
    let result = [];
    stringArr.map((word) => {
      let vowels = word.match(/[ыаияоеуюэёЫАИЯОЕУЮЭЁ]/g);
      let lastVowelIdx;
      if (vowels !== null) {
        result.push([]);
        lastVowelIdx = word.lastIndexOf(vowels[vowels.length - 1]);
      }
      word.split('').map((char, idx) => {
        result[result.length - 1].push(char);
        if (idx !== lastVowelIdx && char.match(/[ыаияоеуюэёЫАИЯОЕУЮЭЁ]/) !== null) {
          result.push([]);
          return;
        }
      });
    });
    return result.map((syll) => syll.join(''));
  }

  splitPoem() {
    let lineArr = this.string.trim().split('\n');
    const splittedLinesArr = lineArr
      .map((line) => {
        const newLine = this.splitStrBySyllable(line);
        return newLine;
      })
      .filter((arr) => arr.length);
    return splittedLinesArr;
  }
}
