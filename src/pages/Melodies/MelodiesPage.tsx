import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChordModel, NotesLengthType, PartNote } from '../../dataset/all_chords_for_impro';
import CreateMidiFile from '../../MidiFileCreater/CreateMidiFile';
import MidiChordsCreator from '../../MidiFileCreater/MidiChordsCreator';
import { MetalBlock } from '../../styled/global';
import { playAllChords, playAllChordsArpeggiated, playMelody } from '../../utils';
import { SheetStave } from './SheetStave';

interface Props {}

export const MelodiesPage = ({}: Props) => {
  const chordsCreator = new MidiChordsCreator();
  const [chords, setChords] = useState<ChordModel[]>([]);

  const fileEditor = new CreateMidiFile(chords);
  const [part, setPart] = useState<PartNote[][]>([]);

  const playPart = (loops: number = 2) => {
    // playAllChords(chords);
    playAllChordsArpeggiated(chords, 2, loops);
    playMelody(part.flat(), loops);
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
        playMelody={() => playPart(2)}
        generateMelody={generateMelody}
        chords={chords}
        bars={part}
      />
    </Container>
  );
};

const Container = styled(MetalBlock)`
  padding: 20px;
`;
