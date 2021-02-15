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
}

export const SheetStave = ({
  generateMelody,
  generateChords,
  bars,
  chords,
  playMelody,
  stopMelody,
}: Props) => {
  const ref = useRef(null);
  const [staves, setStaves] = useState<VexFlowController | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
    }
  }, [bars, chords, staves]);

  useEffect(() => {
    if (ref.current && !staves) {
      setStaves(new VexFlowController(ref));
    }
  }, [staves]);

  return (
    <Container>
      <Button onClick={generateMelodyInternal}>Generate melody</Button>
      <Button onClick={generateChords}>Generate chords</Button>
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
      <div className={bars.length > 0 ? 'stave' : ''} ref={ref} id="vf"></div>
    </Container>
  );
};

const Container = styled.div`
  margin: 0;
  .stave {
    background-color: ${theme.colors.white};
    padding: 20px;

    @media screen and (max-width: 900px) {
      overflow-x: auto;

      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
  }
`;
