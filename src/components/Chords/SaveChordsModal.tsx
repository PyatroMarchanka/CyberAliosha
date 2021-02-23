import React from 'react';
import styled from 'styled-components';

import { saveSavedChords } from '../../localStorageUtils/addedChordsStorage';
import { ChordModel } from '../../dataset/all_chords_for_impro';

import { SaveModal } from '../global/SaveModal';

interface Props {
  chords: ChordModel[];
}

export const SaveChordsModal = ({ chords }: Props) => {
  const saveAndClose = (title: string) => {
    saveSavedChords(chords, title);
  };

  return (
    <SaveModal title="Set name of the new hit" onSave={saveAndClose} disabled={!chords.length} />
  );
};

const Container = styled.div``;
