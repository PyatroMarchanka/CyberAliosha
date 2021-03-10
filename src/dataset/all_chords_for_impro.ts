export interface ChordModel {
  0: Notes;
  1: ChordType;
  2: Notes[];
  3: Notes[];
}

export type Notes =
  | 'A'
  | 'A#'
  | 'Bb'
  | 'B'
  | 'C'
  | 'C#'
  | 'Db'
  | 'D'
  | 'D#'
  | 'Eb'
  | 'E'
  | 'F'
  | 'F#'
  | 'Gb'
  | 'G'
  | 'G#'
  | 'Ab';

export type ChordType = MajorChords | MinorChords | UnstableChords;

export enum MajorChords {
  Major = '',
  Maj7 = 'maj',
  MajAdd9 = 'majAdd9',
}

export enum MinorChords {
  Minor = 'm',
  M7 = 'm7',
  Madd9 = 'mAdd9',
}

export enum UnstableChords {
  Dim7 = 'dim7',
  Aug = 'aug',
  D7b5 = '7b5',
  D7 = '7',
  Min7b5 = 'm7b5',
  M9 = 'm9',
}

export interface ChordRelease {
  0: number;
  1: MajorChords | MinorChords | UnstableChords;
}

export interface Tonality {
  0: ChordModel[0];
  1: MajorChords.Major | MinorChords.Minor;
}

export interface PartNote {
  note: string;
  dur: 0.0625 | 0.125 | 0.25 | 0.5 | 1 | 2;
}

export interface MidiNote {
  note: number;
  dur: 0.0625 | 0.125 | 0.25 | 0.5 | 1 | 2;
}

export enum NotesLengthType {
  Often = 'often',
  Middle = 'middle',
  Seldom = 'seldom',
  VeryOften = 'very_often',
  VerySeldom = 'very_seldom',
  Whole = 'whole',
  Half = 'half',
  Quarter = 'quarter',
  Eight = 'eight',
  Sixteen = 'sixteen',
}

export enum NotesPatterns {
  None = 'none',
  Riff = 'riff',
}

export const getNotesTypeLabel = (type: NotesLengthType) => {
  const labels = {
    [NotesLengthType.Often]: 'Often',
    [NotesLengthType.Middle]: 'Middle',
    [NotesLengthType.VeryOften]: 'Very often',
    [NotesLengthType.VerySeldom]: 'Very seldom',
    [NotesLengthType.Whole]: 'Whole',
    [NotesLengthType.Half]: 'Half',
    [NotesLengthType.Quarter]: 'Quarter',
    [NotesLengthType.Eight]: 'Eight',
    [NotesLengthType.Sixteen]: 'Sixteen',
    [NotesLengthType.Seldom]: 'Seldom',
  };

  return labels[type];
};

export const getNotesPatternLabel = (type: NotesPatterns) => {
  const labels = {
    [NotesPatterns.None]: 'None',
    [NotesPatterns.Riff]: 'Riff',
  };

  return labels[type];
};
