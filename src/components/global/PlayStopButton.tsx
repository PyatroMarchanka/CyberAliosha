import { IconButton } from '@material-ui/core';
import React from 'react';
import { theme } from '../../utils/theme';
import { Icon } from './Icon';
import StopIcon from '@material-ui/icons/Stop';

interface Props {
  handlePlaying: () => void;
  isPlaying: boolean;
}

export const PlayStopButton = ({ handlePlaying, isPlaying }: Props) => {
  return (
    <IconButton onClick={handlePlaying} className="icon">
      {isPlaying ? (
        <Icon
          type="material"
          fill={theme.colors.blueGreySticky[500]}
          Icon={StopIcon}
          className="play-icon"
        />
      ) : (
        <Icon type="play" fill={theme.colors.blueGreySticky[500]} className="play-icon" />
      )}
    </IconButton>
  );
};
