import { ChordModel } from '../dataset/all_chords_for_impro';
import CreateMidiFile from './CreateMidiFile';
export default class FileEditor {
  userChords: any;
  midiCreator: any;
  partOptions: any;

  constructor() {
    this.userChords = null;
    this.midiCreator = null;
    this.partOptions = {
      type: 'soprano',
      notesLength: 'often',
      function: 'solo',
      restProbability: 0.2,
    };
  }

  createNewFile(chords: ChordModel[]) {
    this.midiCreator = new CreateMidiFile(chords);
  }

  generateMidi() {
    this.midiCreator.addAllPartsInFile();
    // this.downloadButton.setAttribute("href", `${this.midiCreator.getURI()}`);
    // this.midiCreator = new CreateMidiFile(this.userChords);
  }

  addNewPart() {
    return this.midiCreator.addPart(this.partOptions);
    // const newPart = document.createElement("div");
    // newPart.innerText = this.addedPartText();
  }
  getURI() {
    return this.midiCreator.getURI();
  }
}
