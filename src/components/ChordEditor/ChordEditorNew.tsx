import React, { useContext } from 'react';
import { ChordsAdderProvider, chordsAdderStore } from '../../context/ChordsAdderContext';
import { AddedChordsNew } from './new/AddedChordsNew';
import { ChordsAdderNew } from './new/ChordsAdderNew';

interface Props {}

export const ChordEditorNew = ({}: Props) => {
  const { state, dispatch } = useContext(chordsAdderStore);

  return (
    <ChordsAdderProvider>
      <AddedChordsNew />
      <ChordsAdderNew />
      <div>ChordEditor</div>
    </ChordsAdderProvider>
  );
};
