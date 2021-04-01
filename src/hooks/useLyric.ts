import { ChordModel, NotesLengthType, PartNote } from '../dataset/all_chords_for_impro';
import { convertTextToSyllables, Lyric } from '../utils/text/textUtils';
import { useContext, useState } from 'react';
import { generateMelody } from '../musicBrain/melodyUtils';
import { settingsStore } from '../context/SettingsProvider';

export const useLyric = (
  chords: ChordModel[],
  setPart: (part: PartNote[][]) => void,
  setChords: (chords: ChordModel[]) => void
) => {
  const [lyric, setLyric] = useState<Lyric | null>(null);

  const {
    state: { notesPattern },
  } = useContext(settingsStore);

  const onLyricAdd = (text: string) => {
    const lyric = convertTextToSyllables(text);
    const isLinesLong = Math.round(lyric.syllablesCount / lyric.lines.length) > 4;

    setLyric(lyric);

    const chordsCountForSong = lyric.lines.length * (isLinesLong ? 4 : 2);

    let chordsForSong: ChordModel[] = [];
    while (chordsForSong.length < chordsCountForSong) {
      chordsForSong = [...chordsForSong, ...chords!];
    }

    chordsForSong = chordsForSong.slice(0, chordsCountForSong);

    if (chords) {
      setChords(chordsForSong);

      const newPart = generateMelody(chordsForSong, {
        type: 'soprano',
        notesLength: NotesLengthType.Middle,
        function: 'accompaniment',
        pattern: notesPattern,
        restProbability: 0,
        lyric,
      });

      setPart(newPart);
    }
  };

  return { onLyricAdd, lyric };
};
