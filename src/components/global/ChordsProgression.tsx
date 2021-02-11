import { Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { ChordModel } from '../../dataset/all_chords_for_impro';
import { convertChordToString } from '../../utils';
import { StyledProgressionContainer, StyledProgression } from '../../styled/Chords';
import { Button } from './Button';
import { theme } from '../../utils/theme';

import { chunk } from 'lodash';

interface Props {
  chords: ChordModel[];
  title?: string;
  action?: any;
}

export const ChordsProgression = ({ chords, title, action }: Props) => {
  const chordsChunks = chunk(chords, 4);

  return (
    <StyledProgressionContainer>
      <Header>
        {!!title && (
          <Typography className="title" variant="h5">
            {title}
          </Typography>
        )}
        {!!action && action}
      </Header>

      {chordsChunks.map((chunk) => (
        <StyledProgression>
          {chunk.map((chord) => (
            <Button className="chord">{convertChordToString(chord)}</Button>
          ))}
        </StyledProgression>
      ))}
    </StyledProgressionContainer>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  .title {
    color: ${theme.colors.white};
  }
`;
