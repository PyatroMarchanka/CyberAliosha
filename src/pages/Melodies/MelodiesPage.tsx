import React, { useContext, useEffect, useState } from 'react';

import styled from 'styled-components';
import { theme } from '../../utils/theme';

import { ChordModel, NotesLengthType, PartNote } from '../../dataset/all_chords_for_impro';
import { Player } from '../../utils/Player';

import CreateMidiFile from '../../MidiFileCreater/CreateMidiFile';
import MidiChordsCreator from '../../MidiFileCreater/MidiChordsCreator';
import { SheetStave } from './SheetStave';
import { useLocation } from 'react-router-dom';
import { chordsAdderStore } from '../../context/ChordsAdderContext';
import { ChordsProgression } from '../../components/global/ChordsProgression';
import { Typography } from '@material-ui/core';

interface Props {}

export const MelodiesPage = ({}: Props) => {
  const location = useLocation();
  const chordsCreator = new MidiChordsCreator();
  const [chords, setChords] = useState<ChordModel[]>([]);
  console.log(location);

  const locationChords = (location.state as { chords: ChordModel[] } | undefined)?.chords;

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
    if (locationChords) {
      setChords(locationChords);
    } else {
      const chords: ChordModel[] | undefined = chordsCreator.getNewCyclicChords(8);

      if (chords) {
        setChords(chords);
      }
    }
  }, [location]);

  return (
    <Container>
      {chords.length > 0 && (
        <Chords>
          <ChordsProgression
            chords={chords}
            title={<Typography variant="h5">Chords for melody:</Typography>}
          />
        </Chords>
      )}
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

const Chords = styled.div`
  margin-bottom: 30px;
`;
