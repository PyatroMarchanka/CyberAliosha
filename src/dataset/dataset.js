const NOTE_MODES = {
  dorian: ["C", "D", "Eb", "F", "G", "A", "Bb"],
  frigyan: ["C", "Db", "Eb", "F", "G", "Ab", "Bb"],
  balkanMinor: ["C", "D", "Eb", "F#", "G", "A", "Bb"],
  naturalMajor: ["C", "D", "E", "F", "G", "A", "B"],
  naturalMinor: ["C", "D", "Eb", "F", "G", "Ab", "Bb"]
};

const DURATIONS = ["1", "2", "4", "8", "16"];

const TONALITY_SCALES = [
  ["Am/C", ["A", "B", "C", "D", "E", "F", "G"]],
  ["G#Abm/B", ["G#Ab", "A#Bb", "B", "C#Db", "D#Eb", "E", "F#Gb"]],
  ["Bm/D", ["B", "C#Db", "D", "E", "F#Gb", "G", "A"]],
  ["A#Bbm/C#Db", ["A#Bb", "C", "С#Db", "D#Eb", "F", "F#Gb", "G#Ab"]],
  ["Cm/D#Eb", ["C", "D", "D#Eb", "F", "G", "G#Ab", "A#Bb"]],
  ["C#Dbm/E", ["C#Db", "D#Eb", "E", "F#Gb", "G#AB", "A", "B"]],
  ["Dm/F", ["D", "E", "F", "G", "A", "A#Bb", "C"]],
  ["Em/G", ["E", "F#Gb", "G", "A", "B", "C", "D"]],
  ["D#Ebm/F#Gb", ["D#Eb", "F", "F#Gb", "G#Ab", "A#Bb", "B", "C#Db"]],
  ["Fm/G#Ab", ["F", "G", "G#Ab", "A#Bb", "C", "C#Db", "D#Eb"]],
  ["F#Gbm/A", ["F#Gb", "G#AB", "A", "B", "C#Db", "D", "E"]],
  ["Gm/A#Bb", ["G", "A", "A#Bb", "C", "D", "D#Eb", "F"]],
  ["G#m/B", ["G#AB", "A#Bb", "B", "C#Db", "D#Eb", "E", "F#Gb"]]
];

const NOTES_MAP = [
  "A",
  "A#Bb",
  "B",
  "C",
  "C#Db",
  "D",
  "D#Eb",
  "E",
  "F",
  "F#Gb",
  "G",
  "G#Ab"
];

const NOTES_MAP_SOLO = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#"
];

export { TONALITY_SCALES, NOTES_MAP, DURATIONS, NOTE_MODES, NOTES_MAP_SOLO };
