import React from 'react';
import { SaveModal } from '../../components/global/SaveModal';
import { PartNote } from '../../dataset/all_chords_for_impro';
import { saveMelody } from '../../localStorageUtils/melodiesStorage';
import { theme } from '../../utils/theme';

export const SaveMelodiesModal = ({ melody }: { melody: PartNote[][] }) => {
  const saveAndClose = (title: string) => {
    saveMelody(melody, title);
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
