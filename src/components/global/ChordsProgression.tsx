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
  title?: string | JSX.Element;
  action?: any;
}

export const ChordsProgression = ({ chords, title, action }: Props) => {
  const chordsChunks = chunk(chords, 4);

  return (
    <StyledProgressionContainer>
      <Header>
        {!!title && typeof title === 'string' && (
          <Typography className="title" variant="h5">
            {title}
          </Typography>
        )}
        {!!title && typeof title !== 'string' && title}
        {!!action && action}
      </Header>

      {chordsChunks.map((chunk, i) => (
        <StyledProgression key={i}>
          {chunk.map((chord, idx) => (
            <Button key={idx} className="chord">
              {convertChordToString(chord)}
            </Button>
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
