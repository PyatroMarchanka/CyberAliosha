import React from 'react';
import { IconButton } from '@material-ui/core';
import { theme } from '../../utils/theme';
import { Icon } from './Icon';

interface Props {
  onChange: (value: boolean) => void;
  value: boolean;
  className?: string;
}

export const CheckboxIcon = ({ onChange, value, className }: Props) => {
  return (
    <IconButton onClick={() => onChange(!value)}>
      <Icon
        type='guitar'
        fill={value ? theme.colors.black : theme.colors.grey[500]}
      />
    </IconButton>
  );
};
