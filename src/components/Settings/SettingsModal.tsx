import { FormControl, TextField } from '@material-ui/core';
import React, { useContext } from 'react';

import Dialog from '@material-ui/core/Dialog';
import { Button as MatButton } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { chordsAdderStore } from '../../context/ChordsAdderContext';

interface Props {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
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
    icon: {
      marginLeft: '2rem',
    },
  }),
);

export const SettingsModal = ({ isOpen, setIsOpen }: Props) => {
  const classes = useStyles();

  const {
    state: { bpm },
    dispatch,
  } = useContext(chordsAdderStore);

  const setBpm = (value: string) => {
    dispatch({
      type: 'SET_BPM',
      payload: +value,
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const saveAndClose = () => {
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Common bpm:</DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <FormControl className={classes.formControl}>
            <TextField
              id="standard-basic"
              label="120"
              type="number"
              value={bpm}
              onChange={(e) => setBpm(e.target.value)}
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
  );
};
