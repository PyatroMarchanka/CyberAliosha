import { IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ChordModel, PartNote } from '../../dataset/all_chords_for_impro';
import { getFileUri } from '../../utils/midiUtils';
import { theme } from '../../utils/theme';
import { Button, PrimaryButtonStyles } from './Button';
import { Icon } from './Icon';

interface Props {
  part: PartNote[][];
  chords: ChordModel[];
}

export const MidiFileGetter = ({ part, chords }: Props) => {
  const [fileUri, setFileUri] = useState<string | null>(null);

  const getFile = () => {
    const uri = getFileUri(part, chords);
    setFileUri(uri);

    window.location.href = uri;
  };
  return (
    <Container>
      <div onClick={getFile}>
        <Icon type='midi' className='icon-midi' />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
  }

  .icon-midi {
    width: 80px;
    height: 40px;
    &:hover {
      cursor: pointer;
    }
  }
  .icon-midi svg {
    width: 100%;
  }
`;
