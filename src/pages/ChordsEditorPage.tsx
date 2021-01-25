import React, { ReactElement } from 'react';
import ChordEditor from '../components/ChordEditor/ChordEditor';
import { ChordEditorNew } from '../components/ChordEditor/ChordEditorNew';

interface Props {}

export function ChordsEditorPage({}: Props): ReactElement {
  return <ChordEditorNew />;
}
