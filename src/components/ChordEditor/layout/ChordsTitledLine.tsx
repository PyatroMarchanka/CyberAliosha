import { Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { chordsAdderStore } from '../../../context/ChordsAdderContext';
import { ChordModel } from '../../../dataset/all_chords_for_impro';
import { Button } from '../../global/Button';

interface Props {
  chords: ChordModel[];
  title?: string;
  onChordClick: (chord: ChordModel) => void;
}

export const ChordsTitledLine = ({ chords, title, onChordClick }: Props) => {
  return (
    <Container>
      {!!title && (
        <Typography className="title" variant="h6">
          {title}
        </Typography>
      )}
      <div>
        {chords.map((chord, idx) => (
          <Button
            key={`${chord[0]}-${idx}`}
            onClick={() => onChordClick(chord)}
          >{`${chord[0]}${chord[1]}`}</Button>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;

  .title {
    margin-right: 20px;
    min-width: 200px;
  }
`;
