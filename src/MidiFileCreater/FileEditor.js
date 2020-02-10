import CreateMidiFile from "./CreateMidiFile";
export default class FileEditor {
  constructor() {
    this.userChords = null;
    this.midiCreator = null;
    this.partOptions = {
        type: "soprano",
        notesLength: 'often',
        function: 'solo'
    };
  }

  createNewFile(chords){
    this.midiCreator = new CreateMidiFile(chords);
  }

  generateMidi() {
    this.midiCreator.addAllPartsInFile();
    // this.downloadButton.setAttribute("href", `${this.midiCreator.getURI()}`);
    // this.midiCreator = new CreateMidiFile(this.userChords);
  }

  addNewPart() {
    this.midiCreator.addPart(this.partOptions);
    // const newPart = document.createElement("div");
    // newPart.innerText = this.addedPartText();
  }
  getURI(){
    return this.midiCreator.getURI();
  }
  
}
