import { IconButton } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../components/global/Button';
import { Icon } from '../../components/global/Icon';
import { ChordModel, PartNote } from '../../dataset/all_chords_for_impro';
import { theme } from '../../utils/theme';
import { VexFlowController } from '../../musicViews/VexFlowController';
import StopIcon from '@material-ui/icons/Stop';

interface Props {
  bars: PartNote[][];
  chords?: ChordModel[];
}

export const SheetStave = ({ bars, chords }: Props) => {
  const ref = useRef(null);
  const [staves, setStaves] = useState<VexFlowController | null>(null);

  useEffect(() => {
    if (staves && bars.length > 0) {
      staves.drawAll(bars, chords);
    } else {
      staves?.clear();
    }
  }, [bars, chords, staves]);

  useEffect(() => {
    if (ref.current && !staves) {
      setStaves(new VexFlowController(ref));
    }
  }, [staves]);

  return (
    <Container>
      <StaveContainer>
        <div className={bars.length > 0 ? 'stave' : ''} ref={ref} id="vf"></div>
      </StaveContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 0;
`;

const StaveContainer = styled.div`
  display: flex;
  justify-content: center;

  .stave {
    background-color: ${theme.colors.white};
    padding: 20px;

    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
`;
