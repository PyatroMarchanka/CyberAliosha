import React from 'react';
import { SaveModal } from '../../components/global/SaveModal';
import { ChordModel, PartNote } from '../../dataset/all_chords_for_impro';
import { saveMelody } from '../../localStorageUtils/melodiesStorage';
import { theme } from '../../utils/theme';

export const SaveMelodiesModal = ({
  melody,
  chords,
}: {
  melody: PartNote[][];
  chords: ChordModel[];
}) => {
  const saveAndClose = (title: string) => {
    saveMelody(melody, chords, title);
  };

  return (
    <SaveModal
      title="Set name of the new hit"
      onSave={saveAndClose}
      disabled={!melody?.length}
      iconColor={theme.colors.blueGreySticky[500]}
    />
  );
};
