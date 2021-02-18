import React, { useContext, useRef, useState } from 'react';
import Popover from '@material-ui/core/Popover';
import { Button } from '../global/Button';
import { theme } from '../../utils/theme';
import { chordsAdderStore } from '../../context/ChordsAdderContext';

interface Props {
  children: any;
  onReplace: () => void;
  onDelete: () => void;
  onClose: () => void;
  playChord: () => void;
  isSelected: boolean;
  className?: string;
}

export const ChordWithEditModal = ({
  children,
  isSelected,
  onReplace,
  onDelete,
  className,
  playChord,
}: Props) => {
  const ref = useRef(null);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    playChord();
  };

  const handleLongPress = () => {
    if (ref.current) {
      setAnchorEl(ref.current);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div ref={ref}>
      <Button
        className={className}
        color={anchorEl || isSelected ? theme.colors.blue : undefined}
        aria-describedby={id}
        onClick={handleClick}
        onLongPress={handleLongPress}
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
    </div>
  );
};
