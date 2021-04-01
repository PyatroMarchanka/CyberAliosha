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
import PartsFabric from '../../musicBrain/PartsFabric';
import { PartOptions } from '../../musicBrain/PartCreator';
import { useLyric } from '../../hooks/useLyric';
import { usePart } from '../../hooks/usePart';
import { useChords } from '../../hooks/useChords';

export const MelodiesPage = () => {
  const location = useLocation();

  const {
    state: { playAccompanimentWithMelody },
    dispatch,
  } = useContext(settingsStore);
  const [showLyric, setShowLyric] = useState(false);

  const locationChords = (location.state as { chords: ChordModel[] } | undefined)?.chords;

  const { chords, setChords, generateChords, part, setPart, getMelody, addOneMorePart } = useChords(
    location,
    locationChords
  );

  const { handlePlaying, MPlayer, isPlaying, Player } = usePlayMelodyAndChords({
    chords,
    part,
  });

  const onPlayAccompanimentChange = (value: boolean) => {
    dispatch({
      type: 'PLAY_ACCOMPANIMENT',
      payload: value,
    });
  };

  const { onLyricAdd } = useLyric(chords, setPart, setChords);

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
                <Checkbox label='Lyric' value={showLyric} onChange={setShowLyric} />
              </div>
              <div>
                <Button disabled={isPlaying} onClick={generateChords}>
                  Generate chords
                </Button>
                {!showLyric && (
                  <Button disabled={isPlaying} onClick={getMelody}>
                    Generate melody
                  </Button>
                )}
                {!!part.length && (
                  <Button disabled={isPlaying} onClick={addOneMorePart}>
                    Add voice
                  </Button>
                )}
              </div>
            </Actions>
            {showLyric && (
              <TextSplitterWrapper>
                <TextSplitter onSubmit={onLyricAdd} />
              </TextSplitterWrapper>
            )}
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
