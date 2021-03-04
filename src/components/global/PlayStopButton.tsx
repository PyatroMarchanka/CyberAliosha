import { IconButton } from '@material-ui/core';
import React from 'react';
import { theme } from '../../utils/theme';
import { Icon } from './Icon';
import StopIcon from '@material-ui/icons/Stop';

interface Props {
  handlePlaying: () => void;
  isPlaying: boolean;
  iconColor?: string;
}

export const PlayStopButton = ({
  handlePlaying,
  isPlaying,
  iconColor = theme.colors.black,
}: Props) => {
  return (
    <IconButton onClick={handlePlaying} className="icon">
      {isPlaying ? (
        <Icon type="material" fill={iconColor} Icon={StopIcon} className="play-icon" />
      ) : (
        <Icon type="play" fill={iconColor} className="play-icon" />
      )}
    </IconButton>
  );
};
