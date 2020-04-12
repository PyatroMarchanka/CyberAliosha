import React, { Component } from "react";
import ChordEditor from "../ChordEditor/ChordEditor";
import PartEditor from "../PartEditor/PartEditor";

export default class MainWindow extends Component {
  constructor(props) {
    super(props);
    this.chords = [];    
    this.state = {
      chordsToAdd: this.chords,
      isChordsSet: false
    };
    this.setChords = this.setChords.bind(this);
  }

  setChords(chords, bool){
    this.setState({
      chordsToAdd: chords,
      isChordsSet: bool
    })
  }


  render() {
    return (
      <div>
        <div className="main-window">
        <ChordEditor setChords={this.setChords} chords={this.chords}/>
        {
          this.state.isChordsSet ? <PartEditor setChords={this.setChords} chords={this.state.chordsToAdd}/> : null
        }
        
        </div>
      </div>
    );
  }
}
