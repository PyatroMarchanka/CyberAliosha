import React from 'react';
import { playChord } from '../../../MidiFileCreater/utils';
import styled from 'styled-components';
import { theme } from '../../../utils/theme';
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
