import React, { useContext, useEffect } from 'react';
import { ChordsAdderProvider } from '../../context/ChordsAdderContext';

import { AddedChordsNew } from './layout/AddedChordsNew';
import { ChordsToAdd } from './layout/ChordsToAdd';

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
