import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChordModel } from '../../dataset/all_chords_for_impro';
import { usePlayMelodyAndChords } from '../../hooks/usePlayMelodyAndChords';
import { VexChordsController } from '../../musicViews/VexChordsController';
import { theme } from '../../utils/theme';

interface Props {
  chords: ChordModel[];
  chordsPrefix: string;
}

export const ChordCharts = ({ chords, chordsPrefix }: Props) => {
  const [ChordsDrawer, setChordsDrawer] = useState<VexChordsController | null>(null);
  const { Player, MPlayer } = usePlayMelodyAndChords({});
  useEffect(() => {
    setChordsDrawer(new VexChordsController(chordsPrefix));
  }, []);

  useEffect(() => {
    ChordsDrawer?.drawChords(chords);
  }, [chords, ChordsDrawer]);

  return (
    <Chords>
      {chords.map((chord, idx) => (
        <div
          onClick={() => Player?.playChord(chord)}
          key={`${chordsPrefix}${idx}`}
          id={`${chordsPrefix}${idx}`}
        ></div>
      ))}
      {MPlayer}
    </Chords>
  );
};

const Chords = styled.div`
  display: flex;
  background-color: ${theme.colors.white};
  min-width: 200px;
  overflow-x: auto;
`;
