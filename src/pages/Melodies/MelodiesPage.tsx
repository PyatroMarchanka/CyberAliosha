import React, { useContext, useEffect, useState } from 'react';

import styled from 'styled-components';
import { theme } from '../../utils/theme';

import { ChordModel, NotesLengthType, PartNote } from '../../dataset/all_chords_for_impro';
import MidiChordsCreator from '../../musicBrain/MidiChordsCreator';
import { SheetStave } from './SheetStave';
import { useLocation } from 'react-router-dom';
import { ChordsProgression } from '../../components/global/ChordsProgression';

import { Button } from '../../components/global/Button';
import { PageTitle } from '../../components/global/PageTitle';
import { SaveMelodiesModal } from './SaveMelodiesModal';
import { Checkbox } from '../../components/global/Checkbox';
import { MetalBlock } from '../../styled/global';

import { PlayStopButton } from '../../components/global/PlayStopButton';
import { usePlayMelodyAndChords } from '../../hooks/usePlayMelodyAndChords';
import { TextSplitter } from '../../components/Text/TextSplitter';
import { convertTextToSyllables, Lyric } from '../../utils/text/textUtils';
import { generateMelody } from '../../musicBrain/melodyUtils';
import { settingsStore } from '../../context/SettingsProvider';
import { MotiveCreator } from '../../musicBrain/MotiveCreator';

export const MelodiesPage = () => {
  const location = useLocation();
  const chordsCreator = new MidiChordsCreator();
  const [chords, setChords] = useState<ChordModel[]>([]);
  const {
    state: { notesLength, notesPattern, playAccompanimentWithMelody, chordsToGenerateCount },
    dispatch,
  } = useContext(settingsStore);

  const locationChords = (location.state as { chords: ChordModel[] } | undefined)?.chords;

  const [part, setPart] = useState<PartNote[][]>([]);
  const [lyric, setLyric] = useState<Lyric | null>(null);

  const { handlePlaying, MPlayer, isPlaying, Player } = usePlayMelodyAndChords({
    chords,
    part,
  });

  const generateChords = () => {
    const chords: ChordModel[] | undefined = chordsCreator.getNewCyclicChords(
      chordsToGenerateCount
    );

    if (chords) {
      let eightChords: ChordModel[] = [];
      while (eightChords.length < 8) {
        eightChords = [...eightChords, ...chords];
      }

      setChords(eightChords);
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
    const lyric = convertTextToSyllables(text);
    const isLinesLong = Math.round(lyric.syllablesCount / lyric.lines.length) > 4;

    setLyric(lyric);

    const chordsCountForSong = lyric.lines.length * (isLinesLong ? 4 : 2);

    let chordsForSong: ChordModel[] = [];
    while (chordsForSong.length < chordsCountForSong) {
      chordsForSong = [...chordsForSong, ...chords!];
    }

    chordsForSong = chordsForSong.slice(0, chordsCountForSong);

    if (chordsForSong) {
      setChords(chordsForSong);

      const newPart = generateMelody(chordsForSong, {
        type: 'soprano',
        notesLength: NotesLengthType.Middle,
        function: 'accompaniment',
        pattern: notesPattern,
        restProbability: 0,
        lyric,
      });

      setPart(newPart);
    }
  };

  return (
    <>
      <PageTitle title='Melodies Editor' />
      <Container>
        <MetalBlock>
          <Header>
            {chords.length > 0 && (
              <Chords>
                <ChordsProgression chords={chords} onChordClick={Player?.playChord} />
              </Chords>
            )}
            <Actions>
              <div className='buttons'>
                {part.length > 0 && (
                  <PlayStopButton handlePlaying={handlePlaying} isPlaying={isPlaying} />
                )}
                <SaveMelodiesModal melody={part} chords={chords} />
                <Checkbox
                  label='Play accompaniment'
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
const TextSplitterWrapper = styled.div`
  @media ${theme.breakpoints.belowMobile} {
    margin-top: 20px;
    width: 100%;
  }
`;

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
