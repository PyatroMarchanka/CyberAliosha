import { Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { ChordModel } from '../../dataset/all_chords_for_impro';
import { MetalBlock } from '../../styled/global';
import { theme } from '../../utils/theme';
import { Button } from '../global/Button';

interface Props {
  chords: ChordModel[];
  title?: string;
  onChordClick: (chord: ChordModel) => void;
}

export const ChordsTitledLine = ({ chords, title, onChordClick }: Props) => {
  return (
    <Container>
      {!!title && (
        <TitleWrapper>
          <Typography className="title" variant="h6">
            {title}
          </Typography>
          {/* <Line /> */}
        </TitleWrapper>
      )}
      <Chords>
        {chords.length ? (
          chords.map((chord, idx) => (
            <Button
              key={`${chord[0]}-${idx}`}
              onClick={() => onChordClick(chord)}
            >{`${chord[0]}${chord[1]}`}</Button>
          ))
        ) : (
          <Typography className="title" variant="subtitle1">
            No chords
          </Typography>
        )}
      </Chords>
    </Container>
  );
};

const Container = styled(MetalBlock)`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 10px 10px;

  @media ${theme.breakpoints.belowTablet} {
    padding: 0 10px 10px 5px;
  }

  .title {
    color: ${theme.colors.white};

    @media ${theme.breakpoints.belowTablet} {
      font-size: 16px;
    }
  }
`;

const Chords = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TitleWrapper = styled.div`
  height: 75px;
  display: flex;
  min-width: 200px;
  align-items: center;
  justify-content: center;

  @media ${theme.breakpoints.belowTablet} {
    height: unset;
  }
`;
