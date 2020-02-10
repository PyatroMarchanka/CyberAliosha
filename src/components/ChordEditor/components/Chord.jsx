import React from "react";
import { playChord } from "../../../MidiFileCreater/utils";

export default function Chord(props) {
  return (
  <button id={props.id} key={props.id}  className="btn btn-outline-dark" onClick={(e) => {
    props.handleClick(e);
    playChord(props.chordName);
  }
}>{props.chordName}</button>
  )
  
  
}
