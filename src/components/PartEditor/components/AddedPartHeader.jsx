import React, { useState } from 'react';
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

export default function AddedPartHeader({ partOptions }) {
  const playRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTestInstrument = () => {
    setIsPlaying(true);

    let when = playRef.current.contextTime();

    const notes = partOptions.part.map((note) => {
      note.note = convertNoteToMidiPitch(note.note);
      note.dur = note.dur;
      return note;
    });

    for (let note of notes) {
      playRef.current.playChordAt(when, 260, [note.note], note.dur * 3);
      when += note.dur * 3;
    }
  };

  return (
    <div className="added-parts__part text-white">
      <p>{`Type: ${partOptions.type}`}</p>
      <p>{`Function: ${partOptions.function}`}</p>
      <p>{`Notes: ${partOptions.notes}`}</p>
      <p>{`Rest probability: ${partOptions.restProbability}%`}</p>
      <button className="btn btn-outline" onClick={playTestInstrument}>
        Play
      </button>
      {isPlaying && (
        <button
          onClick={() => {
            playRef.current.cancelQueue();
          }}
          className="btn btn-outline"
        >
          Stop
        </button>
      )}
      <MIDISounds ref={playRef} appElementName="root" instruments={[3, 260]} />
    </div>
  );
}
