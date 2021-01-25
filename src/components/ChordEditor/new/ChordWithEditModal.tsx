import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import { Button } from '../../global/Button';
import { theme } from '../../../utils/theme';

interface Props {
  children: any;
  onReplace: () => void;
  onDelete: () => void;
  onClose: () => void;
  isSelected: boolean;
}

export const ChordWithEditModal = ({ children, isSelected, onReplace, onDelete }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Button
        color={anchorEl || isSelected ? theme.colors.blue : undefined}
        aria-describedby={id}
        onClick={handleClick}
      >
        {children}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Button onClick={onReplace} color={theme.colors.bluegrey}>
          Replace
        </Button>
        <Button onClick={onDelete} color={theme.colors.amber}>
          Delete
        </Button>
      </Popover>
    </>
  );
};
