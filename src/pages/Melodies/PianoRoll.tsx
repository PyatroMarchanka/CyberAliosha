import React, { useEffect } from 'react';

// @ts-ignore
import PianoRollReact from 'react-piano-roll';

interface Props {}

export const PianoRoll = ({}: Props) => {
  return (
    <PianoRollReact
      width={1200}
      height={460}
      zoom={6}
      resolution={2}
      gridLineColor={0x333333}
      blackGridBgColor={0x1e1e1e}
      whiteGridBgColor={0x282828}
      noteData={[
        ['0:0:0', 'F5', ''],
        ['0:0:0', 'C4', '2n'],
        ['0:0:0', 'D4', '2n'],
        ['0:0:0', 'E4', '2n'],
        ['0:2:0', 'B4', '4n'],
        ['0:3:0', 'A#4', '4n'],
      ]}
    />
  );
};
