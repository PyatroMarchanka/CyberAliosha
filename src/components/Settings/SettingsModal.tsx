import { FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useContext } from 'react';

import Dialog from '@material-ui/core/Dialog';
import { Button as MatButton } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { chordsAdderStore } from '../../context/ChordsAdderContext';
import {
  getNotesPatternLabel,
  getNotesTypeLabel,
  NotesLengthType,
  NotesPatterns,
} from '../../dataset/all_chords_for_impro';

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

const notesLengthTypes = [
  NotesLengthType.Often,
  NotesLengthType.Middle,
  NotesLengthType.Seldom,
  NotesLengthType.VeryOften,
  NotesLengthType.VerySeldom,
  NotesLengthType.Sixteen,
  NotesLengthType.Eight,
  NotesLengthType.Quarter,
  NotesLengthType.Half,
  NotesLengthType.Whole,
];

const notesPatterns = [NotesPatterns.None, NotesPatterns.Riff];

interface Tempos {
  bpm: 60 | 75 | 90 | 110 | 130 | 160 | 190 | 220;
}

const bpmToTempoName = {
  60: 'Adagio',
  75: 'Andante',
  90: 'Moderato',
  110: 'Animato',
  130: 'Allegro',
  160: 'Vivo',
  190: 'Presto',
  220: 'Prestissimo',
};

export const SettingsModal = ({ isOpen, setIsOpen }: Props) => {
  const classes = useStyles();

  const {
    state: { bpm, notesLength, notesPattern },
    dispatch,
  } = useContext(chordsAdderStore);

  const setBpm = (value: string) => {
    dispatch({
      type: 'SET_BPM',
      payload: +value,
    });
  };

  const setNotesLength = (value: NotesLengthType) => {
    dispatch({
      type: 'SET_NOTES_LENGTH',
      payload: value,
    });
  };

  const setNotesPattern = (value: NotesPatterns) => {
    dispatch({
      type: 'SET_NOTES_PATTERN',
      payload: value,
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
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="tempo-label">Tempo</InputLabel>
            <Select
              labelId="tempo-label"
              id="tempo"
              value={bpm}
              onChange={(e: any) => setBpm(e.target.value)}
              input={<Input id="demo-dialog-select-input" />}
            >
              {Object.entries(bpmToTempoName).map(([bpm, label]) => (
                <MenuItem key={label} value={bpm}>
                  {`${label} - ${bpm} bpm`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="demo-dialog-select-input">Melody notes length</InputLabel>
            <Select
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
              value={notesLength}
              onChange={(e) => setNotesLength(e.target.value as NotesLengthType)}
              input={<Input id="demo-dialog-select-input" />}
            >
              {notesLengthTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {getNotesTypeLabel(type)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="demo-dialog-select-input">Melody rythme pattern</InputLabel>
            <Select
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
              value={notesPattern}
              onChange={(e) => setNotesPattern(e.target.value as NotesPatterns)}
              input={<Input id="demo-dialog-select-input" />}
            >
              {notesPatterns.map((pattern) => (
                <MenuItem key={pattern} value={pattern}>
                  {getNotesPatternLabel(pattern)}
                </MenuItem>
              ))}
            </Select>
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