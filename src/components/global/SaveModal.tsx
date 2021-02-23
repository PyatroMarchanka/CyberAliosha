import { FormControl, IconButton, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import { Button as MatButton } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Icon } from '../global/Icon';
import SaveIcon from '@material-ui/icons/Save';
import { theme } from '../../utils/theme';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  onSave: (title: string) => void;
  title: string;
  disabled?: boolean;
  iconColor?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      '& label.Mui-focused': {
        color: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
      },
    },
    formControl: {
      margin: theme.spacing(1),
      width: '100%',
    },
  }),
);

export const SaveModal = ({ onSave, disabled, title, iconColor = theme.colors.white }: Props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [titleValue, setTitleValue] = useState('');

  const handleClose = () => {
    setIsOpen(false);
  };

  const saveAndClose = () => {
    onSave(titleValue);
    handleClose();
  };

  return (
    <Container>
      <IconButton
        disabled={disabled}
        onClick={() => setIsOpen(true)}
        className="icon"
        edge="start"
        aria-label="menu"
      >
        <Icon
          type="material"
          Icon={SaveIcon}
          disabled={disabled}
          fill={iconColor}
          className="icon"
        />
      </IconButton>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <TextField
                id="standard-basic"
                label="Title"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <MatButton onClick={handleClose} color="inherit">
            Cancel
          </MatButton>
          <MatButton onClick={() => saveAndClose()} color="inherit">
            Ok
          </MatButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

const Container = styled.div``;
