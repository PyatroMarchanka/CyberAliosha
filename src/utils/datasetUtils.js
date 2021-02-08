const CHORD_BIG = [
  ['A', 'm', ['A', 'C', 'E'], ['B', 'D', 'E', 'F', 'G']],
  ['A', 'm7', ['A', 'C', 'E', 'G'], ['B', 'D', 'E', 'F', 'G']],
  ['A', 'm9', ['A', 'C', 'E', 'G', 'B'], ['B', 'D', 'E', 'F', 'G']],
  ['A', 'm7b5', ['A', 'C', 'D#', 'G'], ['B', 'D#', 'D', 'F', 'G']],
  ['A', 'mAdd9', ['A', 'C', 'E', 'G', 'B'], ['B', 'E', 'D', 'F', 'G']],
  ['A', '', ['A', 'C#', 'E'], ['B', 'E', 'D', 'F#', 'G#']],
  ['A', '7', ['A', 'C#', 'E', 'G'], ['B', 'E', 'D', 'F#', 'G']],
  ['A', '7b5', ['A', 'C#', 'D#', 'G'], ['B', 'E', 'D', 'F#', 'G']],
  ['A', 'maj', ['A', 'C#', 'E', 'G#'], ['B', 'E', 'D', 'F#', 'G#']],
  ['A', 'majAdd9', ['A', 'C#', 'E', 'G#', 'B'], ['B', 'E', 'D', 'F#', 'G#']],
  ['A', 'dim7', ['A', 'C', 'D#', 'F#'], ['A#', 'C', 'D#', 'D', 'F#', 'G']],
  ['A', 'aug', ['A', 'C#', 'F'], ['A', 'C#', 'F']],
];

const NOTES_MAP_SOLO = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

function transposeNote(note, step, notesMap) {
  let indexOfNote = notesMap.indexOf(note);
  if (step < 0) {
    step = notesMap.length - step;
  }
  return notesMap[(indexOfNote + step) % notesMap.length];
}

function transposeChord(chord, step, notes) {
  let newChord = JSON.parse(JSON.stringify(chord));
  newChord[0] = transposeNote(newChord[0], step, notes);
  newChord[2] = newChord[2].map((note) => {
    note = transposeNote(note, step, notes);
    return note;
  });
  newChord[3] = newChord[3].map((note) => {
    note = transposeNote(note, step, notes);
    return note;
  });
  return newChord;
}

function transposeTone(toneOfChords, step) {
  let newTone = JSON.parse(JSON.stringify(toneOfChords));
  return newTone.map((chord) => transposeChord(chord, step, NOTES_MAP_SOLO));
}

function getDataSet() {
  let allChords = [];

  for (let index = 0; index < 12; index++) {
    allChords.push(transposeTone(CHORD_BIG, index, NOTES_MAP_SOLO));
  }
  return JSON.stringify(allChords);
}
