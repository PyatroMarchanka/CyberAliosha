import React from 'react';
import { PianoRoll } from './PianoRoll';
import { SheetStave } from './SheetStave';

interface Props {}

export const MelodiesPage = ({}: Props) => {
  return (
    <div>
      <PianoRoll />
      <SheetStave />
    </div>
  );
};
