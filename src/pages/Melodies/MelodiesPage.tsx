import React, { useContext, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import { theme } from '../../utils/theme';

import { ChordModel, NotesLengthType, PartNote } from '../../dataset/all_chords_for_impro';
import { Player } from '../../utils/PlayerLegacy';

import CreateMidiFile from '../../musicBrain/CreateMidiFile';
import MidiChordsCreator from '../../musicBrain/MidiChordsCreator';
import { SheetStave } from './SheetStave';
import { useLocation } from 'react-router-dom';
import { ChordsProgression } from '../../components/global/ChordsProgression';
import { IconButton, Typography } from '@material-ui/core';
import { chordsAdderStore } from '../../context/ChordsAdderContext';
// @ts-ignore
import MIDISounds from 'midi-sounds-react';
import { MidiPlayer } from '../../utils/MidiPlayer';
import { Button } from '../../components/global/Button';
import { useMidiPlayer } from '../../utils/useMidiPlayer';
import { PageTitle } from '../../components/global/PageTitle';
import { SaveMelodiesModal } from './SaveMelodiesModal';
import { Checkbox } from '../../components/global/Checkbox';
import { MetalBlock } from '../../styled/global';
import { Icon } from '../../components/global/Icon';
import StopIcon from '@material-ui/icons/Stop';

interface Props {}

export const MelodiesPage = () => {
  const location = useLocation();
  const chordsCreator = new MidiChordsCreator();
  const [chords, setChords] = useState<ChordModel[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const {
    state: { notesLength, notesPattern, playAccompanimentWithMelody },
    dispatch,
  } = useContext(chordsAdderStore);

  const locationChords = (location.state as { chords: ChordModel[] } | undefined)?.chords;

  const fileEditor = new CreateMidiFile(chords);
  const [part, setPart] = useState<PartNote[][]>([]);

  console.log('part', part);
  const { Player, MPlayer } = useMidiPlayer(setIsPlaying);

  const playPart = (loops: number = 2) => {
    if (playAccompanimentWithMelody) {
      Player?.playPartChords(chords);
    }
    Player?.playPart(part.flat(), () => setIsPlaying(false));
  };

  const generateChords = () => {
    const chords: ChordModel[] | undefined = chordsCreator.getNewCyclicChords(8);

    if (chords) {
      setChords(chords);
      setPart([]);
    }
  };

  const generateMelody = () => {
    const newPart = fileEditor.addPart({
      type: 'soprano',
      notesLength: notesLength,
      function: 'accompaniment',
      pattern: notesPattern,
      restProbability: 0,
    });

    setPart(newPart);
  };

  const handlePlaying = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      playPart(2);
    } else {
      setIsPlaying(false);
      Player?.stopAll();
    }
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
              <div>
                {part.length > 0 && (
                  <IconButton onClick={handlePlaying} className="icon">
                    {isPlaying ? (
                      <Icon
                        type="material"
                        fill={theme.colors.blueGreySticky[500]}
                        Icon={StopIcon}
                        className="play-icon"
                      />
                    ) : (
                      <Icon
                        type="play"
                        fill={theme.colors.blueGreySticky[500]}
                        className="play-icon"
                      />
                    )}
                  </IconButton>
                )}
                <SaveMelodiesModal melody={part} chords={chords} />
                <Checkbox
                  label="Play accompaniment"
                  value={playAccompanimentWithMelody}
                  onChange={onPlayAccompanimentChange}
                />
              </div>
              <div>
                <Button disabled={isPlaying} onClick={generateMelody}>
                  Generate melody
                </Button>
                <Button disabled={isPlaying} onClick={generateChords}>
                  Generate chords
                </Button>
              </div>
            </Actions>
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
  > div {
    display: flex;
  }
`;

const Header = styled.div`
  padding: 20px;
  display: flex;
  > div {
    flex-basis: 50%;
  }

  @media ${theme.breakpoints.belowTabletM} {
    flex-direction: column;
    > div {
      flex-basis: 100%;
    }
  }
`;
