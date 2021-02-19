import React, { useContext, useEffect, useRef, useState } from 'react';
import { chordsAdderStore } from '../context/ChordsAdderContext';
import { MidiPlayer } from './MidiPlayer';
// @ts-ignore
import MIDISounds from 'midi-sounds-react';
import styled from 'styled-components';

export const useMidiPlayer = (setIsPlaying?: (bool: boolean) => void) => {
  const {
    state: { bpm },
  } = useContext(chordsAdderStore);

  const [midiPlayer, setMidiPlayer] = useState<MidiPlayer | null>(null);

  const playerRef = useRef(null);

  const MPlayer = (
    <Container>
      <MIDISounds ref={playerRef} appElementName="root" instruments={[4]} />
    </Container>
  );

  useEffect(() => {
    if (midiPlayer) {
      setIsPlaying && setIsPlaying(false);
      midiPlayer.stopAll();
    }
    setMidiPlayer(new MidiPlayer(playerRef, bpm));
  }, [playerRef.current, bpm]);

  return { Player: midiPlayer, MPlayer };
};

const Container = styled.div`
  .MIDISounds {
    display: none;
  }
`;
