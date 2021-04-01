import { ChordModel, PartNote } from './../dataset/all_chords_for_impro';
import PartsFabric from './PartsFabric';
// @ts-ignore
import Midi from 'jsmidgen';

export default class CreateMidiFile {
  chords: ChordModel[];
  partsFabric: PartsFabric;
  file: Midi.File;
  parts: PartNote[][];
  tempo: number;

  constructor(chords: ChordModel[], loopCounts = 1, tempo = 120) {
    this.chords = chords;
    this.partsFabric = new PartsFabric(chords, loopCounts);
    this.file = new Midi.File();
    this.parts = [];
    this.tempo = tempo;
  }

  createMidiFile() {
    this.file = new Midi.File();
  }

  addAllPartsInFile(parts: PartNote[][][]) {
    parts.forEach((part) => this.addPartInFile(part));
  }

  addPartInFile(part: PartNote[][]) {
    const track = new Midi.Track();
    track.instrument(0, 0x1e);
    track.setTempo(this.tempo);
    for (let note of part.flat()) {
      track.addChord(0, note.note, 512 * note.dur);
    }
    this.file.addTrack(track);
  }

  getURI() {
    return 'data:audio/mid;base64,' + btoa(this.file.toBytes());
  }
}
