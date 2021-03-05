import React, { useContext, useEffect, useState } from 'react';

import styled from 'styled-components';
import { theme } from '../../utils/theme';

import { ChordModel, PartNote } from '../../dataset/all_chords_for_impro';
import CreateMidiFile from '../../musicBrain/CreateMidiFile';
import MidiChordsCreator from '../../musicBrain/MidiChordsCreator';
import { SheetStave } from './SheetStave';
import { useLocation } from 'react-router-dom';
import { ChordsProgression } from '../../components/global/ChordsProgression';
import { chordsAdderStore } from '../../context/ChordsAdderContext';

import { Button } from '../../components/global/Button';
import { PageTitle } from '../../components/global/PageTitle';
import { SaveMelodiesModal } from './SaveMelodiesModal';
import { Checkbox } from '../../components/global/Checkbox';
import { MetalBlock } from '../../styled/global';

import { PlayStopButton } from '../../components/global/PlayStopButton';
import { usePlayMelodyAndChords } from '../../hooks/usePlayMelodyAndChords';
import { TextSplitter } from '../../components/Text/TextSplitter';
import { convertTextLinesToLyric, Lyric } from '../../utils/textUtils';
import { generateMelody } from '../../musicBrain/melodyUtils';

export const MelodiesPage = () => {
  const location = useLocation();
  const chordsCreator = new MidiChordsCreator();
  const [chords, setChords] = useState<ChordModel[]>([]);
  const {
    state: { notesLength, notesPattern, playAccompanimentWithMelody },
    dispatch,
  } = useContext(chordsAdderStore);

  const locationChords = (location.state as { chords: ChordModel[] } | undefined)?.chords;

  const [part, setPart] = useState<PartNote[][]>([]);
  const [lyric, setLyric] = useState<Lyric | null>(null);

  const { handlePlaying, MPlayer, isPlaying, Player } = usePlayMelodyAndChords({
    chords,
    part,
  });

  const generateChords = () => {
    const chords: ChordModel[] | undefined = chordsCreator.getNewCyclicChords(8);

    if (chords) {
      setChords(chords);
      setPart([]);
    }
  };

  const getMelody = () => {
    const newPart = generateMelody(chords, {
      type: 'soprano',
      notesLength: notesLength,
      function: 'accompaniment',
      pattern: notesPattern,
      restProbability: 0,
    });

    setPart(newPart);
  };

  const onPlayAccompanimentChange = (value: boolean) => {
    dispatch({
      type: 'PLAY_ACCOMPANIMENT',
      payload: value,
    });
  };

  useEffect(() => {
    if (locationChords) {
      setChords(locationChords);
    } else {
      generateChords();
    }
  }, [location]);

  const onLyricAdd = (text: string) => {
    const lyric = convertTextLinesToLyric(text);
    console.log('lyric', lyric);
    setLyric(lyric);
  };

  return (
    <>
      <PageTitle title="Melodies Editor" />
      <Container>
        <MetalBlock>
          <Header>
            {chords.length > 0 && (
              <Chords>
                <ChordsProgression chords={chords} onChordClick={Player?.playChord} />
              </Chords>
            )}
            <Actions>
              <div className="buttons">
                {part.length > 0 && (
                  <PlayStopButton handlePlaying={handlePlaying} isPlaying={isPlaying} />
                )}
                <SaveMelodiesModal melody={part} chords={chords} />
                <Checkbox
                  label="Play accompaniment"
                  value={playAccompanimentWithMelody}
                  onChange={onPlayAccompanimentChange}
                />
              </div>
              <div>
                <Button disabled={isPlaying} onClick={getMelody}>
                  Generate melody
                </Button>
                <Button disabled={isPlaying} onClick={generateChords}>
                  Generate chords
                </Button>
              </div>
            </Actions>
            <TextSplitterWrapper>
              <TextSplitter onSubmit={onLyricAdd} />
            </TextSplitterWrapper>
          </Header>
        </MetalBlock>

        <SheetStave chords={chords} bars={part} />
        {MPlayer}
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: ${theme.colors.white};
`;

const Chords = styled.div`
  display: flex;
`;

const Actions = styled.div`
  .buttons {
    padding: 0 10px;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > div {
    display: flex;
  }
`;
const TextSplitterWrapper = styled.div``;

const Header = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  @media ${theme.breakpoints.belowTabletM} {
    flex-direction: column;
    > div {
      flex-basis: 100%;
    }
  }
`;
