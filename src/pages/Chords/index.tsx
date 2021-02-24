import React from 'react';
import { Tabs } from '../../components/global/Tabs';
import { ChordEditorPage } from './ChordEditorPage';
import { SavedPage } from '../SavedPage';

interface Props {}

export const ChordsPage = ({}: Props) => {
  return (
    <Tabs items={[{ label: 'Editor' }, { label: 'Saved' }]}>
      <ChordEditorPage />
      <SavedPage />
    </Tabs>
  );
};
