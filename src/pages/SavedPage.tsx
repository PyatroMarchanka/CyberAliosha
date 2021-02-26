import { IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { ChordsProgression } from '../components/global/ChordsProgression';
import { ChordModel } from '../dataset/all_chords_for_impro';
import { getSavedChords, removeSavedChordsById } from '../localStorageUtils/addedChordsStorage';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import { MetalBlock } from '../styled/global';
import { Icon } from '../components/global/Icon';
import { theme } from '../utils/theme';
import { useHistory } from 'react-router';
import { routes } from './routes';
import { Button } from '../components/global/Button';
import { Tabs } from '../components/global/Tabs';
import { SavedChords, SavedMelodies } from '../localStorageUtils/storagesController';
import { getSavedMelodies } from '../localStorageUtils/melodiesStorage';
import { Melody } from './Melodies/Melody';
import { useMidiPlayer } from '../utils/useMidiPlayer';
import { usePlayMelodyAndChords } from '../hooks/usePlayMelodyAndChords';
import { SavedChordsLine } from './Chords/SavedChordsLine';
import { useColorChords } from '../hooks/useColorChords';

interface Props {}

export const SavedPage = ({}: Props) => {
  const [savedChords, setSavedChords] = useState<SavedChords[]>([]);
  const [savedMelodies, setSavedMelodies] = useState<SavedMelodies[]>([]);
  const history = useHistory();

  const fetchChords = () => {
    const savedChords = getSavedChords();
    if (savedChords) {
      setSavedChords(savedChords);
      console.log('savedChords', savedChords);
    }
  };
  const fetchMelodies = () => {
    const melodies = getSavedMelodies();
    console.log('melodies', melodies);
    if (melodies) {
      setSavedMelodies(melodies);
    }
  };

  const { MPlayer, isPlaying, Player, playPart, stopAll } = usePlayMelodyAndChords({});

  const openInMelodyEditor = (chords: ChordModel[]) => {
    history.push({ pathname: routes.melodyEditor, state: { chords } });
  };

  useEffect(() => {
    fetchChords();
    fetchMelodies();
  }, []);

  return (
    <Tabs items={[{ label: 'Saved chords' }, { label: 'Saved melodies' }]}>
      <Container>
        {!!savedChords &&
          savedChords.map((chordsObject) => (
            <SavedChordsLine
              openInEditor={openInMelodyEditor}
              savedChords={chordsObject}
              onRemove={() => {
                removeSavedChordsById(chordsObject.id);
                fetchChords();
              }}
            />
          ))}
        {MPlayer}
      </Container>
      <Container>
        {savedMelodies?.map((melody) => (
          <Melody melodyData={melody} fetchMelodies={fetchMelodies} />
        ))}
      </Container>
    </Tabs>
  );
};

const Container = styled.div``;

const Chords = styled(MetalBlock)`
  padding: 20px;
`;
