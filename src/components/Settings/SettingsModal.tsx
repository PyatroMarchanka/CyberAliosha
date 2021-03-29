import { FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useContext } from 'react';

import Dialog from '@material-ui/core/Dialog';
import { Button as MatButton } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  ChordsMode,
  getChordsModeLabel,
  getNotesPatternLabel,
  getNotesTypeLabel,
  NotesLengthType,
  NotesPatterns,
} from '../../dataset/all_chords_for_impro';
import { settingsStore } from '../../context/SettingsProvider';
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
  })
);

const notesLengthTypes = Object.values(NotesLengthType);

const notesPatterns = Object.values(NotesPatterns);

const chordModes = Object.values(ChordsMode);

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
    state: {
      bpm,
      notesLength,
      notesPattern,
      chordsToGenerateCount,
      notesCountToPlayForChord,
      chordsMode,
    },
    dispatch,
  } = useContext(settingsStore);

  const { dispatch: chordsDispatch } = useContext(chordsAdderStore);

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

  const setChordsToGenerateCount = (value: number) => {
    dispatch({
      type: 'SET_CHORDS_TO_GENERATE_COUNT',
      payload: value,
    });
  };

  const setNotesToPlayForChordCount = (value: number) => {
    dispatch({
      type: 'SET_SETTINGS',
      payload: { notesCountToPlayForChord: value },
    });
  };

  const setChordsMode = (value: ChordsMode) => {
    dispatch({
      type: 'SET_SETTINGS',
      payload: { chordsMode: value },
    });
    if (value === ChordsMode.SingleTonality) {
      chordsDispatch({
        type: 'ADD_INITIAL_CHORDS_TO_ADD_SINGLE_TONE',
      });
    } else if (value === ChordsMode.JazzChords) {
      chordsDispatch({
        type: 'ADD_INITIAL_CHORDS_TO_ADD',
      });
    }
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
            <InputLabel htmlFor='tempo-label'>Tempo</InputLabel>
            <Select
              labelId='tempo-label'
              id='tempo'
              value={bpm}
              onChange={(e: any) => setBpm(e.target.value)}
              input={<Input id='tempo-label' />}
            >
              {Object.entries(bpmToTempoName).map(([bpm, label]) => (
                <MenuItem key={label} value={bpm}>
                  {`${label} - ${bpm} bpm`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='demo-dialog-melody-type'>Melody notes length</InputLabel>
            <Select
              labelId='demo-dialog-select-label'
              id='demo-dialog-select'
              value={notesLength}
              onChange={(e) => setNotesLength(e.target.value as NotesLengthType)}
              input={<Input id='demo-dialog-melody-type' />}
            >
              {notesLengthTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {getNotesTypeLabel(type)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='demo-dialog-notes-pattern'>Melody rythme pattern</InputLabel>
            <Select
              labelId='demo-dialog-select-label'
              id='demo-dialog-select'
              value={notesPattern}
              onChange={(e) => setNotesPattern(e.target.value as NotesPatterns)}
              input={<Input id='demo-dialog-notes-pattern' />}
            >
              {notesPatterns.map((pattern) => (
                <MenuItem key={pattern} value={pattern}>
                  {getNotesPatternLabel(pattern)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='demo-dialog-chords-count'>Chords to generate count</InputLabel>
            <Select
              labelId='demo-dialog-chords-count'
              id='chords-count'
              value={+chordsToGenerateCount}
              onChange={(e) => setChordsToGenerateCount(e.target.value as number)}
              input={<Input id='demo-dialog-chords-count' />}
            >
              {[4, 6, 8, 12, 16].map((count) => (
                <MenuItem key={count} value={+count}>
                  {count}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='demo-dialog-chords-notes-play-count'>
              Notes count to play for chord
            </InputLabel>
            <Select
              labelId='demo-dialog-chords-count'
              id='chords-notes-play-count'
              value={+notesCountToPlayForChord}
              onChange={(e) => setNotesToPlayForChordCount(e.target.value as number)}
              input={<Input id='demo-dialog-chords-notes-play-count' />}
            >
              {[1, 2, 4, 8].map((count) => (
                <MenuItem key={count} value={+count}>
                  {count}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='chords-mode'>Chords mode</InputLabel>
            <Select
              labelId='demo-dialog-chords-mode'
              id='label-chords-mode'
              value={chordsMode}
              onChange={(e) => setChordsMode(e.target.value as ChordsMode)}
              input={<Input id='chords-mode' />}
            >
              {chordModes.map((mode) => (
                <MenuItem key={mode} value={mode}>
                  {getChordsModeLabel(mode)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <MatButton onClick={handleClose} color='inherit'>
          Cancel
        </MatButton>
        <MatButton onClick={() => saveAndClose()} color='inherit'>
          Ok
        </MatButton>
      </DialogActions>
    </Dialog>
  );
};
