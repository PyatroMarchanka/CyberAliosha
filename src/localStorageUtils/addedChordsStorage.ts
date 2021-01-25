import { ChordModel } from './../dataset/all_chords_for_impro';

export const storages = {
  savedChords: 'added_chords',
};

interface SerialazedSavedChords {
  chords: string;
  id: string;
}

export interface SavedChords {
  chords: ChordModel[];
  id: string;
}

export const saveSavedChords = async (addedChords: ChordModel[]) => {
  const previousChords = localStorage.getItem(storages.savedChords);
  const currentChords = {
    id: Math.random().toString(),
    chords: JSON.stringify(addedChords),
  };

  if (previousChords) {
    const updatedChords = JSON.parse(previousChords);

    updatedChords.push(currentChords);

    localStorage.setItem(storages.savedChords, JSON.stringify(updatedChords));
  } else {
    localStorage.setItem(storages.savedChords, JSON.stringify([currentChords]));
  }
};

export const clearSavedChords = () => {
  localStorage.removeItem(storages.savedChords);
};

export const removeSavedChordsById = (id: string) => {
  const saved = localStorage.getItem(storages.savedChords);

  if (saved) {
    const progressions = JSON.parse(saved);

    const filteredChords = progressions?.filter((chords: { id: string }) => chords.id !== id);

    localStorage.setItem(storages.savedChords, JSON.stringify(filteredChords));
  }
};

export const getSavedChords = (): SavedChords[] | undefined => {
  const saved = localStorage.getItem(storages.savedChords);
  if (saved) {
    const progressions = JSON.parse(saved);

    return progressions.map(
      (progressions: SerialazedSavedChords): SavedChords => ({
        id: progressions.id,
        chords: JSON.parse(progressions.chords),
      }),
    );
  }
};
