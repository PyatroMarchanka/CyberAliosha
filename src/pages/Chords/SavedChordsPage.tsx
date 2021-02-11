import { IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { ChordsProgression } from '../../components/global/ChordsProgression';
import { ChordModel } from '../../dataset/all_chords_for_impro';
import {
  clearSavedChords,
  getSavedChords,
  removeSavedChordsById,
  SavedChords,
  storages,
} from '../../localStorageUtils/addedChordsStorage';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import { MetalBlock } from '../../styled/global';
import { Icon } from '../../components/global/Icon';
import { theme } from '../../utils/theme';

interface Props {}

export const SavedChordsPage = ({}: Props) => {
  const [savedChords, setSavedChords] = useState<SavedChords[]>([]);

  const fetchChords = () => {
    const savedChords = getSavedChords();
    if (savedChords) {
      setSavedChords(savedChords);
    }
  };

  useEffect(() => {
    fetchChords();
  }, []);

  return (
    <Container>
      {!!savedChords &&
        savedChords.map((chordsObject) => (
          <ChordsProgression
            title={chordsObject.id}
            key={chordsObject.id}
            chords={chordsObject.chords}
            action={
              <IconButton
                onClick={() => {
                  removeSavedChordsById(chordsObject.id);
                  fetchChords();
                }}
                className="icon"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <Icon type="material" Icon={DeleteIcon} fill={theme.colors.white} />
              </IconButton>
            }
          />
        ))}
    </Container>
  );
};

const Container = styled(MetalBlock)`
  padding: 20px;
`;
