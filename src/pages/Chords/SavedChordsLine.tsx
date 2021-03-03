import { IconButton } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../../components/global/Button';
import { ChordsProgression } from '../../components/global/ChordsProgression';
import { Icon } from '../../components/global/Icon';
import { PlayStopButton } from '../../components/global/PlayStopButton';
import { removeSavedChordsById } from '../../localStorageUtils/addedChordsStorage';
import { SavedChords } from '../../localStorageUtils/storagesController';
import { MetalBlock } from '../../styled/global';
import { theme } from '../../utils/theme';
import DeleteIcon from '@material-ui/icons/Delete';
import { ChordModel } from '../../dataset/all_chords_for_impro';
import { useColorChords } from '../../hooks/useColorChords';
import { usePlayMelodyAndChords } from '../../hooks/usePlayMelodyAndChords';
import { ChordCharts } from '../../components/Chords/ChordCharts';
import Modal from '../../components/global/Modal';

interface Props {
  onRemove: () => void;
  savedChords: SavedChords;
  openInEditor: (chords: ChordModel[]) => void;
  idx?: number;
}

export const SavedChordsLine = ({ onRemove, savedChords, openInEditor, idx }: Props) => {
  const { colorChord, onPlay, onStop } = useColorChords({ chords: savedChords.data });
  const { MPlayer, handlePlaying, isPlaying, Player } = usePlayMelodyAndChords({
    chords: savedChords.data,
    onPlay,
    onStop,
  });
  console.log('isPlaying', isPlaying);

  return (
    <Chords>
      <ChordsProgression
        title={savedChords.title || savedChords.id}
        key={savedChords.id}
        chords={savedChords.data}
        onChordClick={Player?.playChord}
        selectedChord={colorChord}
        action={
          <div>
            <PlayStopButton handlePlaying={handlePlaying} isPlaying={isPlaying} />
            <IconButton
              onClick={onRemove}
              className="icon"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <Icon type="material" Icon={DeleteIcon} fill={theme.colors.white} />
            </IconButton>
            <Modal
              className="sheet-modal"
              triggerComponent={
                <IconButton
                  onClick={() => {}}
                  className="icon"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                >
                  <Icon type="guitar" fill={theme.colors.white} />
                </IconButton>
              }
              title="Chords on guitar"
              style={{ padding: '0' }}
            >
              <ChordCharts chords={savedChords.data} chordsPrefix={`saved-chords-${idx}`} />
            </Modal>

            <Button onClick={() => openInEditor(savedChords.data)}>Add Melody</Button>
          </div>
        }
      />
      {MPlayer}
    </Chords>
  );
};

const Chords = styled(MetalBlock)`
  padding: 20px;

  .guitar-icon {
    width: 28px;
    height: 28px;
  }
`;
