import { ChordModel } from './../dataset/all_chords_for_impro';

export const storages = {
  savedChords: 'added_chords',
};

interface SerialazedSavedChords {
  chords: string;
  id: string;
  title: string;
}

export interface SavedChords {
  chords: ChordModel[];
  id: string;
  title?: string;
}

export const saveSavedChords = (addedChords: ChordModel[], title: string) => {
  const previousChords = localStorage.getItem(storages.savedChords);
  const currentChords = {
    id: Math.random().toString(),
    chords: JSON.stringify(addedChords),
    title,
  };

  console.log('title', title);

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
      (progression: SerialazedSavedChords): SavedChords => ({
        id: progression.id,
        chords: JSON.parse(progression.chords),
        title: progression.title,
      }),
    );
  }
};
