import { Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { ChordModel } from '../../dataset/all_chords_for_impro';
import { convertChordToString } from '../../utils';
import { StyledProgressionContainer, StyledProgression } from '../../styled/Chords';
import { Button } from './Button';

interface Props {
  chords: ChordModel[];
  title?: string;
  action?: any;
}

export const ChordsProgression = ({ chords, title, action }: Props) => {
  return (
    <StyledProgressionContainer>
      <Header>
        {!!title && <Typography variant="h5">{title}</Typography>}
        {!!action && action}
      </Header>

      <StyledProgression>
        {chords.map((chord) => (
          <Button className="chord">{convertChordToString(chord)}</Button>
        ))}
      </StyledProgression>
    </StyledProgressionContainer>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
