import React, { Component } from 'react';
import Selector from './components/Selector';
import Button from '../ChordEditor/components/Button';
import FileEditor from '../../MidiFileCreater/FileEditor';
import partOptions from '../../dataset/partOptions';
import { chordNamesToFullArr } from '../../MidiFileCreater/utils';
import AddedParts from './components/AddedParts';

export default class PartEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partOptions: {
        type: 'soprano',
        function: 'solo',
        notes: 'often',
        restProbability: 20,
      },
      fileLink: null,
      addedPartsHeaders: [],
    };
    this.fileEditor = new FileEditor();
    this.isFile = false;
    this.types = partOptions.types;
    this.function = partOptions.function;
    this.notes = partOptions.notes;

    this.handleSelectorsChange = this.handleSelectorsChange.bind(this);
    this.addPart = this.addPart.bind(this);
    this.generateMidi = this.generateMidi.bind(this);
    this.createNewFile = this.createNewFile.bind(this);
    this.fileDidDownloaded = this.fileDidDownloaded.bind(this);
  }

  handleSelectorsChange(e) {
    const partOptions = JSON.parse(JSON.stringify(this.state.partOptions));
    partOptions[e.target.name] = e.target.value;
    console.log(e.target.value);
    this.setState({
      partOptions,
    });
  }

  createNewFile() {
    const fullChords = chordNamesToFullArr(this.props.chords);
    this.fileEditor.createNewFile(fullChords);
  }

  addPart() {
    // if(this.fileEditor.userChords === null){
    //   return;
    // }
    if (!this.fileEditor.midiCreator) {
      this.createNewFile();
    }
    this.fileEditor.partOptions = this.state.partOptions;
    this.fileEditor.addNewPart();
    const newPartHeader = this.state.partOptions;
    this.setState({
      addedPartsHeaders: [...this.state.addedPartsHeaders, newPartHeader],
    });
  }

  fileDidDownloaded() {
    this.props.setChords(null, false);
    this.setState({
      fileLink: null,
      addedPartsHeaders: [],
    });
  }

  generateMidi() {
    if (this.fileEditor.midiCreator === null) {
      console.log('add a part !');
      return;
    }
    if (this.state.fileLink !== null) {
      console.log('file already generated!');
      return;
    }
    this.fileEditor.generateMidi();
    this.setState({
      fileLink: (
        <a href={this.fileEditor.getURI()}>
          <Button class="btn btn-big" handleClick={this.fileDidDownloaded} text="Download file" />
        </a>
      ),
    });
    this.createNewFile();
  }
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="App-chord-editor">
        <h3>Part Editor</h3>
        <Selector
          name="type"
          id="part-type"
          options={this.types}
          handleChange={this.handleSelectorsChange}
        />
        <Selector
          name="function"
          id="part-function"
          options={this.function}
          handleChange={this.handleSelectorsChange}
        />
        <Selector
          name="notes"
          id="part-notes"
          options={this.notes}
          handleChange={this.handleSelectorsChange}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 0',
          }}
        >
          <label className="label text-white" htmlFor="restProbability">
            Rest probability: {this.state.partOptions.restProbability}%
          </label>
          <input
            id="restProbability"
            className="input"
            value={this.state.partOptions.restProbability}
            type="range"
            min="0"
            max="100"
            onChange={this.handleSelectorsChange}
            name="restProbability"
          />
        </div>
        <Button class="btn btn-big" handleClick={this.addPart} text="Add a part in file" />
        <AddedParts partOptionsArr={this.state.addedPartsHeaders} />
        <Button class="btn btn-big mb-20" handleClick={this.generateMidi} text="Generate file" />
        {this.state.fileLink}
      </div>
    );
  }
}
