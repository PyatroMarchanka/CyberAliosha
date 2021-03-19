import React from 'react';

import { saveSavedChords } from '../../localStorageUtils/addedChordsStorage';
import { ChordModel } from '../../dataset/all_chords_for_impro';

import { SaveModal } from '../global/SaveModal';

interface Props {
  chords: ChordModel[];
}

export const SaveChordsModal = ({ chords }: Props) => {
  const saveAndClose = (title: string) => {
    console.log('saveAndClose');
    saveSavedChords(chords, title);
  };

  return (
    <SaveModal title='Set name of the new hit2' onSave={saveAndClose} disabled={!chords.length} />
  );
};
