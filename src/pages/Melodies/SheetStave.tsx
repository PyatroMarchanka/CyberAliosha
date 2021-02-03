import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Vex from 'vexflow';
import { Button } from '../../components/global/Button';
import PartEditor from '../../components/PartEditor/PartEditor';
import { PartNote } from '../../dataset/all_chords_for_impro';
import { VexFlowController } from './VexFlowController';

interface Props {
  bars: PartNote[][];
  generateMelody: () => void;
}

export const SheetStave = ({ generateMelody, bars }: Props) => {
  const ref = useRef(null);
  const [staves, setStaves] = useState<VexFlowController | null>(null);

  const generateMelodyInternal = () => {
    if (staves) {
      generateMelody();
      staves.drawAll(bars);
    }
  };

  useEffect(() => {
    if (ref.current) {
      setStaves(new VexFlowController(ref));
    }
  }, [ref.current]);

  return (
    <Container>
      <Button onClick={generateMelodyInternal}>Generate Melody!</Button>
      <div ref={ref} id="vf"></div>
      <PartEditor />
    </Container>
  );
};

const Container = styled.div`
  margin: 40px 0;
`;
