import React, { Component } from "react";
import Chord from "./Chord";

export default class ChordAdder extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="App-chord-editor ">
        <h3>Chord Adder</h3>
        <div className="grid-col-4">
          {this.props.chords ? 
          this.props.chords.map((chord, idx) => (
            <Chord
              key={idx + "-chord-to-add"}
              id={idx + "-chord-to-add"}
              chordName={chord[0] + chord[1]}
              handleClick={this.props.handleClick}
            />
          )) :
          null
          }
        </div>
      </div>
    );
  }
}
