import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Vex from 'vexflow';
import { Button } from '../../components/global/Button';
import PartEditor from '../../components/PartEditor/PartEditor';
import { ChordModel, PartNote } from '../../dataset/all_chords_for_impro';
import { VexFlowController } from './VexFlowController';

interface Props {
  bars: PartNote[][];
  generateMelody: () => void;
  playMelody: () => void;
  chords: ChordModel[];
}

export const SheetStave = ({ generateMelody, bars, chords, playMelody }: Props) => {
  const ref = useRef(null);
  const [staves, setStaves] = useState<VexFlowController | null>(null);

  const generateMelodyInternal = () => {
    if (staves) {
      generateMelody();
    }
  };

  useEffect(() => {
    if (staves) {
      staves.drawAll(bars, chords);
    }
  }, [bars]);

  useEffect(() => {
    if (ref.current) {
      setStaves(new VexFlowController(ref));
    }
  }, [ref.current]);

  return (
    <Container>
      <Button onClick={generateMelodyInternal}>Generate Melody!</Button>
      <Button onClick={playMelody}>Play</Button>
      <div ref={ref} id="vf"></div>
    </Container>
  );
};

const Container = styled.div`
  margin: 40px 0;
`;
