import styled, { createGlobalStyle } from 'styled-components';
import { IconButton, Typography } from '@material-ui/core';
import { MetalBlock } from '../../styled/global';

import { SavedMelodies } from '../../localStorageUtils/storagesController';
import { theme } from '../../utils/theme';
import Modal from '../../components/global/Modal';
import { SheetStave } from './SheetStave';
import { removeMelodyById } from '../../localStorageUtils/melodiesStorage';
import { Icon } from '../../components/global/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import { PlayStopButton } from '../../components/global/PlayStopButton';
import { usePlayMelodyAndChords } from '../../hooks/usePlayMelodyAndChords';

interface Props {
  melodyData: SavedMelodies;
  fetchMelodies: () => void;
}

export const Melody = ({ melodyData, fetchMelodies }: Props) => {
  const { chords, melody } = melodyData.data;

  const { handlePlaying, MPlayer, isPlaying } = usePlayMelodyAndChords({
    part: melody,
    chords,
  });

  return (
    <StyledMelody>
      <GlobalStyles />
      <Typography className='title' variant='h6'>
        {melodyData.title}
      </Typography>
      <div className='actions'>
        <Actions>
          <PlayStopButton handlePlaying={handlePlaying} isPlaying={isPlaying} />
        </Actions>
        <IconButton
          onClick={() => {
            removeMelodyById(melodyData.id);
            fetchMelodies();
          }}
          className='icon'
          edge='start'
          color='inherit'
          aria-label='menu'
        >
          <Icon type='material' Icon={DeleteIcon} />
        </IconButton>

        <Modal
          className='sheet-modal'
          triggerComponent={
            <IconButton className='icon' edge='start' color='inherit' aria-label='menu'>
              <Icon type='notes' />
            </IconButton>
          }
          title='Part Preview'
          style={{ padding: '0' }}
        >
          <SheetStave bars={melody} chords={chords} backgroundColor={theme.colors.white} />
        </Modal>
        {MPlayer}
      </div>
    </StyledMelody>
  );
};

const StyledMelody = styled(MetalBlock)`
  padding: 20px;
  display: flex;
  justify-content: space-between;

  .title {
    /* color: ${theme.colors.white}; */
  }

  .actions {
    display: flex;
    align-items: center;
  }
`;

const GlobalStyles = createGlobalStyle`
.sheet-modal {
    .MuiDialogContent-root {
      padding: 0;
    }

    @media ${theme.breakpoints.belowMobile} {
      .MuiDialog-paper {
        margin: 15px;
      }
    }
  }
`;

const Actions = styled.div``;
