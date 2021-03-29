import React, { useState } from 'react';
import { useEffect } from 'react';
import { ChordModel } from '../dataset/all_chords_for_impro';
import { getSavedChords, removeSavedChordsById } from '../localStorageUtils/addedChordsStorage';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { routes } from './routes';
import { Tabs } from '../components/global/Tabs';
import { SavedChords, SavedMelodies } from '../localStorageUtils/storagesController';
import { getSavedMelodies } from '../localStorageUtils/melodiesStorage';
import { Melody } from './Melodies/Melody';
import { SavedChordsLine } from './Chords/SavedChordsLine';
import { Typography } from '@material-ui/core';

export const SavedPage = () => {
  const [savedChords, setSavedChords] = useState<SavedChords[]>([]);
  const [savedMelodies, setSavedMelodies] = useState<SavedMelodies[]>([]);
  const history = useHistory();

  const fetchChords = () => {
    const savedChords = getSavedChords();
    if (savedChords) {
      setSavedChords(savedChords);
    }
  };
  const fetchMelodies = () => {
    const melodies = getSavedMelodies();
    if (melodies) {
      setSavedMelodies(melodies);
    }
  };

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
          savedChords.map((chordsObject, idx) => (
            <SavedChordsLine
              openInEditor={openInMelodyEditor}
              savedChords={chordsObject}
              onRemove={() => {
                removeSavedChordsById(chordsObject.id);
                fetchChords();
              }}
              idx={idx}
            />
          ))}
        {!savedChords || (!savedChords.length && <Typography variant='h6'>No chords</Typography>)}
      </Container>
      <Container>
        {savedMelodies?.map((melody) => (
          <Melody melodyData={melody} fetchMelodies={fetchMelodies} />
        ))}
        {!savedMelodies ||
          (!savedMelodies.length && <Typography variant='h6'>No melodies</Typography>)}
      </Container>
    </Tabs>
  );
};

const Container = styled.div``;
