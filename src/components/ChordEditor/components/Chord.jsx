import React from 'react';
import { playChord } from '../../../utils';
import { Button } from '../../global/Button';

export default function Chord(props) {
  return (
    <Button
      id={props.id}
      key={props.id}
      onClick={(e) => {
        props.handleClick(e);
        playChord(props.chordName);
      }}
    >
      {props.chordName}
    </Button>
  );
}
