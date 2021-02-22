import { IconButton } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../components/global/Button';
import { Icon } from '../../components/global/Icon';
import { ChordModel, PartNote } from '../../dataset/all_chords_for_impro';
import { theme } from '../../utils/theme';
import { VexFlowController } from './VexFlowController';
import StopIcon from '@material-ui/icons/Stop';

interface Props {
  bars: PartNote[][];
  generateMelody: () => void;
  generateChords: () => void;
  playMelody: () => void;
  chords: ChordModel[];
  stopMelody: () => void;
  isPlaying: boolean;
  setIsPlaying: (bool: boolean) => void;
}

export const SheetStave = ({
  generateMelody,
  generateChords,
  bars,
  chords,
  playMelody,
  stopMelody,
  isPlaying,
  setIsPlaying,
}: Props) => {
  const ref = useRef(null);
  const [staves, setStaves] = useState<VexFlowController | null>(null);

  const handlePlaying = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      playMelody();
    } else {
      setIsPlaying(false);
      stopMelody();
    }
  };

  const generateMelodyInternal = () => {
    if (staves) {
      generateMelody();
    }
  };

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
      <Actions>
        <Button disabled={isPlaying} onClick={generateMelodyInternal}>
          Generate melody
        </Button>
        <Button disabled={isPlaying} onClick={generateChords}>
          Generate chords
        </Button>
        {bars.length > 0 && (
          <IconButton onClick={handlePlaying} className="icon">
            {isPlaying ? (
              <Icon
                type="material"
                fill={theme.colors.blueGreySticky[500]}
                Icon={StopIcon}
                className="play-icon"
              />
            ) : (
              <Icon type="play" fill={theme.colors.blueGreySticky[500]} className="play-icon" />
            )}
          </IconButton>
        )}
      </Actions>
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
