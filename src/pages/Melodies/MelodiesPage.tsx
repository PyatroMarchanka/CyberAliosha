import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { theme } from '../../utils/theme';

import { ChordModel, NotesLengthType, PartNote } from '../../dataset/all_chords_for_impro';
import { Player } from '../../utils/Player';

import CreateMidiFile from '../../MidiFileCreater/CreateMidiFile';
import MidiChordsCreator from '../../MidiFileCreater/MidiChordsCreator';
import { SheetStave } from './SheetStave';
import { ChordsAdderProvider } from '../../context/ChordsAdderContext';

interface Props {}

export const MelodiesPage = ({}: Props) => {
  const chordsCreator = new MidiChordsCreator();
  const [chords, setChords] = useState<ChordModel[]>([]);

  const fileEditor = new CreateMidiFile(chords);
  const [part, setPart] = useState<PartNote[][]>([]);
  const [PlayerInst] = useState<Player>(new Player());

  const playPart = (loops: number = 2) => {
    PlayerInst.setChordsAndMelody(chords, part.flat(), 4, loops);
    PlayerInst.playAll();
  };

  const generateMelody = () => {
    const newPart = fileEditor.addPart({
      type: 'soprano',
      notesLength: NotesLengthType.Middle,
      function: 'accompaniment',
      pattern: 'accompaniment',
      restProbability: 0,
    });

    setPart(newPart);
  };

  useEffect(() => {
    const chords: ChordModel[] | undefined = chordsCreator.getNewCyclicChords(8);
    console.log('chords', chords);
    if (chords) {
      setChords(chords);
    }
  }, []);

  return (
    <Container>
      <SheetStave
        stopMelody={() => PlayerInst.stopMelody()}
        playMelody={() => playPart(2)}
        generateMelody={generateMelody}
        chords={chords}
        bars={part}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background-color: ${theme.colors.white};
`;
