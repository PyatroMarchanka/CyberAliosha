import React from 'react';
import { Tabs } from '../../components/global/Tabs';
import { ChordEditorPage } from './ChordEditorPage';
import { SavedChordsPage } from './SavedChordsPage';

interface Props {}

export const ChordsPage = ({}: Props) => {
  return (
    <Tabs items={[{ label: 'Editor' }, { label: 'Saved' }]}>
      <ChordEditorPage />
      <SavedChordsPage />
    </Tabs>
  );
};
