import React, { Component } from 'react';
import Chord from './Chord';
import Typography from '@material-ui/core/Typography';

export default class ChordAdder extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="App-chord-editor ">
        <Typography variant="h4">Chord Adder</Typography>
        <div className="grid-col-4">
          {this.props.chords
            ? this.props.chords.map((chord, idx) => (
                <Chord
                  key={idx + '-chord-to-add'}
                  id={idx + '-chord-to-add'}
                  chordName={chord[0] + chord[1]}
                  handleClick={this.props.handleClick}
                />
              ))
            : null}
        </div>
      </div>
    );
  }
}
