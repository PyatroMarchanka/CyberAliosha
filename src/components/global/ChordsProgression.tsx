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
  onChordClick?: (chord: ChordModel) => void;
  selectedChord?: number;
}

export const ChordsProgression = ({
  chords,
  title,
  action,
  onChordClick,
  selectedChord,
}: Props) => {
  return (
    <StyledProgressionContainer>
      <Header>
        {!!title && typeof title === 'string' && (
          <Typography className="title" variant="h6">
            {title}
          </Typography>
        )}
        {!!title && typeof title !== 'string' && title}
        {!!action && action}
      </Header>

      <StyledProgression>
        {chords.map((chord, idx) => (
          <Button
            onClick={onChordClick ? () => onChordClick(chord) : undefined}
            key={idx}
            className="chord"
            color={idx === selectedChord ? theme.colors.blue : undefined}
          >
            {convertChordToString(chord)}
          </Button>
        ))}
      </StyledProgression>
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
