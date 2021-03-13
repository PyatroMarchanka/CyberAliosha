import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChordModel } from '../../dataset/all_chords_for_impro';
import { usePlayMelodyAndChords } from '../../hooks/usePlayMelodyAndChords';
import { VexChordsController } from '../../musicViews/VexChordsController';
import { theme } from '../../utils/theme';

interface Props {
  chords: ChordModel[];
  chordsPrefix: string;
  selectedChord?: number;
  color?: string;
}

export const ChordCharts = ({ chords, chordsPrefix, selectedChord, color = '#666' }: Props) => {
  const [ChordsDrawer, setChordsDrawer] = useState<VexChordsController | null>(null);
  const { Player, MPlayer } = usePlayMelodyAndChords({});
  useEffect(() => {
    setChordsDrawer(new VexChordsController(chordsPrefix, color));
  }, [chordsPrefix, color]);

  useEffect(() => {
    ChordsDrawer?.drawChords(chords);
  }, [chords, ChordsDrawer]);

  return (
    <Chords>
      {chords.map((chord, idx) => (
        <Chord
          isSelected={selectedChord === idx}
          onClick={() => Player?.playChord(chord)}
          key={`${chordsPrefix}${idx}`}
          id={`${chordsPrefix}${idx}`}
        ></Chord>
      ))}
      {MPlayer}
    </Chords>
  );
};

const Chords = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: ${theme.colors.white};
  min-width: 200px;
  overflow-x: auto;
`;

const Chord = styled.div<{ isSelected: boolean }>`
  &:hover {
    background-color: ${theme.colors.grey[200]};
    cursor: pointer;
  }

  background-color: ${({ isSelected }) => (isSelected ? theme.colors.grey[200] : 0)};
`;
