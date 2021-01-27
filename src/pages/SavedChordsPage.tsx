import { IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { ChordsProgression } from '../components/global/ChordsProgression';
import { ChordModel } from '../dataset/all_chords_for_impro';
import {
  clearSavedChords,
  getSavedChords,
  removeSavedChordsById,
  SavedChords,
  storages,
} from '../localStorageUtils/addedChordsStorage';
import DeleteIcon from '@material-ui/icons/Delete';

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
    <div>
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
                <DeleteIcon fontSize="large" />
              </IconButton>
            }
          />
        ))}
    </div>
  );
};
