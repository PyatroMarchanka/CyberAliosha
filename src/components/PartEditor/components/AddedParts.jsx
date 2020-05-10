import React, { useEffect, useState } from 'react';
import AddedPartHeader from './AddedPartHeader';
import MIDISounds from 'midi-sounds-react';
import { useRef } from 'react';

const convertNoteToMidiPitch = (noteNameStr) => {
  if (typeof noteNameStr === 'number') {
    return noteNameStr;
  }
  if (noteNameStr === '') {
    return -100;
  }
  console.log(noteNameStr);
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const note = notes.indexOf(noteNameStr.slice(0, noteNameStr.length - 1));
  const octave = +noteNameStr[noteNameStr.length - 1];
  const c = 24;
  const result = c + (octave - 1) * 12 + note;
  console.log(result);
  return result;
};

export default function AddedParts({ partOptionsArr }) {
  const playRef = useRef(null);
  const [parts, setParts] = useState([]);

  const setAllParts = () => {
    const allParts = partOptionsArr.map((partOption) => {
      const notes = partOption.part.map((note) => {
        note.note = convertNoteToMidiPitch(note.note);
        note.dur = note.dur;
        return note;
      });
      return notes;
    });

    setParts(allParts);
  };

  useEffect(() => {
    setAllParts();
  }, [partOptionsArr]);

  const playTestInstrument = (part) => {
    let when = playRef.current.contextTime();
    for (let note of part) {
      playRef.current.playChordAt(when, 260, [note.note], note.dur * 2);
      when += note.dur;
    }
  };

  const playAll = () => {
    parts.forEach((part) => {
      playTestInstrument(part);
    });
  };

  return (
    <div className="part-editor__added-parts mb-20 mt-20">
      <div>
        {parts.length > 1 && (
          <div>
            <button onClick={playAll}>Play all</button>
            <button onClick={() => playRef.current.cancelQueue()}>Stop all</button>
          </div>
        )}
        <div style={{ display: 'none', marginBottom: '20px' }}>
          <MIDISounds ref={playRef} appElementName="root" instruments={[3, 260]} />
        </div>
      </div>
      {partOptionsArr.map((partOptions, index) => (
        <AddedPartHeader key={index} partOptions={partOptions} />
      ))}
    </div>
  );
}
