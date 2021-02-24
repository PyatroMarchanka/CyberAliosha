import React from 'react';

import styled from 'styled-components';
import { IconButton, Typography } from '@material-ui/core';
import { MetalBlock } from '../../styled/global';

import { SavedMelodies } from '../../localStorageUtils/storagesController';
import { Button } from '../../components/global/Button';
import { theme } from '../../utils/theme';
import Modal from '../../components/global/Modal';
import { SheetStave } from './SheetStave';
import { removeMelodyById } from '../../localStorageUtils/melodiesStorage';
import { Icon } from '../../components/global/Icon';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {
  melodyData: SavedMelodies;
  fetchMelodies: () => void;
}

export const Melody = ({ melodyData, fetchMelodies }: Props) => {
  const { chords, melody } = melodyData.data;
  console.log('chords, melody', chords, melody);
  return (
    <StyledMelody>
      <Typography className="title" variant="h6">
        {melodyData.title}
      </Typography>
      <div className="actions">
        <IconButton
          onClick={() => {
            removeMelodyById(melodyData.id);
            fetchMelodies();
          }}
          className="icon"
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <Icon type="material" Icon={DeleteIcon} fill={theme.colors.white} />
        </IconButton>
        <Modal
          className="sheet-modal"
          triggerComponent={<Button>View</Button>}
          title="Part Preview"
        >
          <SheetStave bars={melody} chords={chords} />
        </Modal>
      </div>
    </StyledMelody>
  );
};

const StyledMelody = styled(MetalBlock)`
  padding: 20px;
  display: flex;
  justify-content: space-between;

  .title {
    color: ${theme.colors.white};
  }

  .actions {
    display: flex;
    align-items: center;
  }

  .MuiPaper-root {
    width: 100%;
  }
`;
