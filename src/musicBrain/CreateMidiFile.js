import PartsFabric from './PartsFabric';
import MidiChordsCreator from './MidiChordsCreator';
import { randomIntegerRange } from '../utils';
import Midi from 'jsmidgen';

export default class CreateMidiFile {
  constructor(chords, chordsCount = 8, loopCounts = 1, tempo = 120) {
    this.chords = chords || new MidiChordsCreator(chordsCount);
    this.partsFabric = new PartsFabric(chords || this.chords.getChords(), loopCounts);
    this.file = new Midi.File();
    this.parts = [];
    this.tempo = randomIntegerRange(80, 130);
  }

  addPart(partOptions) {
    return this.partsFabric.addPart(partOptions);
  }

  createMidiFile() {
    this.file = new Midi.File();
  }

  addAllPartsInFile() {
    this.partsFabric.getParts().forEach((part) => this.addPartInFIle(part));
  }

  addPartInFIle(part) {
    const track = new Midi.Track();
    track.instrument(0, 0x1e);
    track.setTempo(this.tempo);
    for (let note of part) {
      track.addNote(0, note.note, 512 * note.dur);
    }
    this.file.addTrack(track);
  }

  getURI() {
    return 'data:audio/mid;base64,' + btoa(this.file.toBytes());
  }
}
