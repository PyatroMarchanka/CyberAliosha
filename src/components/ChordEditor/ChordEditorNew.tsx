import React, { useContext, useEffect } from 'react';
import { ChordsAdderProvider } from '../../context/ChordsAdderContext';

import { AddedChordsNew } from './new/AddedChordsNew';
import { ChordsToAdd } from './new/ChordsToAdd';

interface Props {}

export const ChordEditorNew = ({}: Props) => {
  return (
    <ChordsAdderProvider>
      <AddedChordsNew />
      <ChordsToAdd />
      <div>ChordEditor</div>
    </ChordsAdderProvider>
  );
};
