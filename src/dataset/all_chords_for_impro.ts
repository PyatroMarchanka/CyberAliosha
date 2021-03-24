export interface ChordModel {
  0: Notes;
  1: ChordType;
  2: SharpNotes[];
  3: SharpNotes[];
}
export type SharpNotes = 'A' | 'A#' | 'B' | 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#';

export const allNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
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

export enum SolidNotes {
  Double = 2,
  Whole = 1,
  Half = 0.5,
  Quarter = 0.25,
  Eight = 0.125,
  Sixteen = 0.0625,
}

export enum DotNotes {
  Half = 0.75,
  Quarter = 0.375,
  Eight = 0.1875,
}

export interface PartNote {
  note: string;
  dur: SolidNotes | DotNotes;
  dot?: boolean;
  rest?: boolean;
  lyric?: string;
}

export interface MidiNote {
  note: number;
  dur: SolidNotes | DotNotes;
  dot?: boolean;
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
  Lyric = 'lyric',
}

export enum NotesPatterns {
  None = 'none',
  Riff = 'riff',
  Motive = 'motive',
}

export enum ChordsMode {
  SingleTonality = 'single_tonality',
  JazzChords = 'jazz',
}

export const getChordsModeLabel = (mode: ChordsMode) => {
  const labels = {
    [ChordsMode.SingleTonality]: 'Single tonality',
    [ChordsMode.JazzChords]: 'Jazz',
  };

  return labels[mode];
};

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
    [NotesLengthType.Lyric]: 'Lyric',
  };

  return labels[type];
};

export const getNotesPatternLabel = (type: NotesPatterns) => {
  const labels = {
    [NotesPatterns.None]: 'None',
    [NotesPatterns.Riff]: 'Riff',
    [NotesPatterns.Motive]: 'Motive',
  };

  return labels[type];
};
