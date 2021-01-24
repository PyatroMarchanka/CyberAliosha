import React, { Component } from 'react';
import Chord from './Chord';
import ChordMenuEdit from './ChordMenuEdit';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { theme } from '../../../utils/theme';

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
      <Container className="added-chords">
        <h3 className="App-chord-editor"></h3>
        <Typography variant="h4">Added Chords</Typography>
        {this.showMenu()}
        {this.props.chords.length > 0 ? (
          <div className="grid-col-4">
            {this.props.chords.map((chord, idx) => (
              <Chord
                id={idx + '-added-chord'}
                key={idx + '-added-chord'}
                chordName={chord}
                handleClick={this.props.selectChord}
              />
            ))}
          </div>
        ) : (
          'Chords have not been added!'
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  text-align: center;
`;
