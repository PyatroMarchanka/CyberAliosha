import React, { Component } from 'react';
import AddedChords from './components/AddedChords';
import ChordAdder from './components/ChordAdder';
import MidiChordsCreator from '../../MidiFileCreater/MidiChordsCreator';
import ItemsSearcher from '../../MidiFileCreater/ItemsSearcher';
import { Button } from '../global/Button';
import styled from 'styled-components';
import { theme } from '../../utils/theme';

export default class ChordEditor extends Component {
  constructor(props) {
    super(props);
    this.chordsCreator = new MidiChordsCreator();
    this.chordSearcher = new ItemsSearcher();
    this.addChord = this.addChord.bind(this);
    this.deleteChord = this.deleteChord.bind(this);
    this.replaceChord = this.replaceChord.bind(this);
    this.setUpForReplace = this.setUpForReplace.bind(this);
    this.selectChord = this.selectChord.bind(this);
    this.deselectChord = this.deselectChord.bind(this);
    this.liftUpChords = this.liftUpChords.bind(this);
    this.proposeChordsForLast = this.proposeChordsForLast.bind(this);
    this.getRandomChords = this.getRandomChords.bind(this);
    this.toggleAddedChordsLabel = this.toggleAddedChordsLabel.bind(this);

    this.state = {
      chordsToAdd: this.chordSearcher.searchItems('C'),
      addedChords: [],
      isForReplace: false,
      isSelection: false,
      selectedChord: null,
      addedChordsLabel: "Click 'Set these chords' to set",
    };
    console.log('chordsToAdd', this.state.chordsToAdd);
  }

  liftUpChords() {
    if (this.state.addedChords.length < 1) {
      this.toggleAddedChordsLabel(2);
      return;
    }
    this.props.setChords(this.state.addedChords, true);
    this.toggleAddedChordsLabel(1);
  }

  toggleAddedChordsLabel(state) {
    const map = {
      0: "Click 'Set these chords' to set",
      1: 'Chords have been added!',
      2: 'Chords have not been added!',
    };
    this.setState({
      addedChordsLabel: map[state],
    });
  }

  selectChord(e) {
    this.setState({
      isSelection: true,
      selectedChord: e.target,
    });
  }

  deselectChord() {
    this.setState({
      isSelection: false,
      isForReplace: false,
      selectedChord: null,
    });
    this.proposeChordsForLast();
  }

  addChord(e) {
    const oldState = [...this.state.addedChords];
    this.setState({
      chordsToAdd: this.chordSearcher.searchItems(e.target.innerText),
      addedChords: [...oldState, e.target.innerText],
    });
  }

  deleteChord(element) {
    const deleteIdx = +element.id[0];
    const newChords = [...this.state.addedChords];
    newChords.splice(deleteIdx, 1);
    this.setState({
      addedChords: newChords,
    });
  }

  proposeChordsForLast() {
    const last = this.state.addedChords[this.state.addedChords.length - 1];
    console.log(last);
    this.setState({
      chordsToAdd: this.chordSearcher.searchItems(last),
    });
  }

  setUpForReplace() {
    const selectedIdx = +this.state.selectedChord.id[0];
    const searchIdx = selectedIdx === 0 ? 0 : selectedIdx - 1;
    this.setState({
      chordsToAdd: this.chordSearcher.searchItems(this.state.addedChords[searchIdx]),
      isForReplace: true,
    });
  }

  replaceChord(e) {
    const replaceIdx = +this.state.selectedChord.id[0];
    const newChords = [...this.state.addedChords];
    newChords.splice(replaceIdx, 1, e.target.innerText);
    this.setState({
      addedChords: newChords,
      isForReplace: false,
    });
  }

  getRandomChords() {
    const chords = this.chordsCreator.getNewChords(8);
    console.log(chords);
    this.setState({
      addedChords: chords.map((chord) => chord[0] + chord[1]),
    });
  }

  render() {
    return (
      <div>
        <AddedChords
          chords={this.state.addedChords}
          selectedChord={this.state.selectedChord}
          selectChord={this.selectChord}
          isSelection={this.state.isSelection}
          deleteChord={this.deleteChord}
          replaceChord={this.setUpForReplace}
          deselectChord={this.deselectChord}
        />
        <ChordAdder
          chords={this.state.chordsToAdd}
          handleClick={this.state.isForReplace ? this.replaceChord : this.addChord}
        />
        <Buttons>
          <Button color={theme.colors.deeppurple} onClick={this.getRandomChords}>
            Set random chords
          </Button>
          <Button color={theme.colors.deeppurple} onClick={this.liftUpChords}>
            Set these chords
          </Button>
        </Buttons>
        {this.state.addedChordsLabel}
      </div>
    );
  }
}

const Buttons = styled.div`
  display: flex;
  justify-content: center;
`;
