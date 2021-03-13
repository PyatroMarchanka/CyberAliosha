import React, { useContext, useEffect, useRef, useState } from 'react';
import { instruments, MidiPlayer } from './MidiPlayer';
// @ts-ignore
import MIDISounds from 'midi-sounds-react';
import styled from 'styled-components';
import { settingsStore } from '../context/SettingsProvider';

export const useMidiPlayer = (setIsPlaying?: (bool: boolean) => void) => {
  const {
    state: { bpm },
  } = useContext(settingsStore);

  const [midiPlayer, setMidiPlayer] = useState<MidiPlayer | null>(null);

  const playerRef = useRef(null);

  const MPlayer = (
    <Container>
      <MIDISounds ref={playerRef} appElementName="root" instruments={instruments} />
    </Container>
  );

  useEffect(() => {
    if (midiPlayer) {
      setIsPlaying && setIsPlaying(false);
      midiPlayer.stopAll();
    }
    setMidiPlayer(new MidiPlayer(playerRef, bpm));
  }, [bpm]);

  return { Player: midiPlayer, MPlayer };
};

const Container = styled.div`
  .MIDISounds {
    display: none;
  }
`;
