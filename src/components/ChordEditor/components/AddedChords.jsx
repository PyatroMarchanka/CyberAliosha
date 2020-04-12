import React, { Component } from "react";
import Chord from "./Chord";
import ChordMenuEdit from "./ChordMenuEdit";

export default class AddedChords extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showMenu() {
    return (
      this.props.isSelection && (
        <ChordMenuEdit
          deleteChord={() => this.props.deleteChord(this.props.selectedChord)}
          replaceChord={this.props.replaceChord}
          deselectChord={this.props.deselectChord}
        />
      )
    );
  }

  render() {
    return (
      <div className="added-chords text-white">
        <h3 className="App-chord-editor text-white">Added Chords</h3>
        {this.showMenu()}
        {this.props.chords.length > 0 ? (
          <div className="grid-col-4">
            {this.props.chords.map((chord, idx) => (
              <Chord
                id={idx + "-added-chord"}
                key={idx + "-added-chord"}
                chordName={chord}
                handleClick={this.props.selectChord}
              />
            ))}
          </div>
        ) : (
          "Chords have not been added!"
        )}
      </div>
    );
  }
}
