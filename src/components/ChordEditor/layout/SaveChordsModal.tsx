import { FormControl, IconButton, InputLabel, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import { Button as MatButton } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Icon } from '../../global/Icon';
import SaveIcon from '@material-ui/icons/Save';
import { saveSavedChords } from '../../../localStorageUtils/addedChordsStorage';
import { ChordModel } from '../../../dataset/all_chords_for_impro';
import { theme } from '../../../utils/theme';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  chords: ChordModel[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);

export const SaveChordsModal = ({ chords }: Props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [titleValue, setTitleValue] = useState('');

  const handleClose = () => {
    setIsOpen(false);
  };

  const saveAndClose = () => {
    saveSavedChords(chords, titleValue);
    handleClose();
  };

  return (
    <Container>
      <IconButton
        disabled={!chords.length}
        onClick={() => setIsOpen(true)}
        className="icon"
        edge="start"
        aria-label="menu"
      >
        <Icon
          type="material"
          Icon={SaveIcon}
          disabled={!chords.length}
          fill={theme.colors.white}
          className="play-icon"
        />
      </IconButton>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Set name of the new hit</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <TextField
                id="standard-basic"
                label="Standard"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
              />
            </FormControl>

            {/* <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-select-input">Mood</InputLabel>
            </FormControl> */}
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
