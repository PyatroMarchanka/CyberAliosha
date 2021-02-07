import React, { useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { chordsAdderStore } from '../../../context/ChordsAdderContext';
import { theme } from '../../../utils/theme';

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

export function KeyMoodSelector() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const {
    state: { key, mood },
    dispatch,
  } = useContext(chordsAdderStore);

  const handleKeyChange = (event: React.ChangeEvent<{ value: string }>) => {
    dispatch({
      type: 'SET_START_KEY',
      payload: event.target.value,
    });
  };

  const handleMoodChange = (event: React.ChangeEvent<{ value: string }>) => {
    dispatch({
      type: 'SET_START_MOOD',
      payload: event.target.value === 'm' ? 'm' : '',
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getMoodLabel = (value: '' | 'm') => {
    return value === 'm' ? 'Minor' : 'Major';
  };

  return (
    <div>
      <Button color="inherit" variant="outlined" onClick={handleClickOpen}>
        {`Key: ${key}${mood}`}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Set key and mood</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Key</InputLabel>
              <Select
                labelId="demo-dialog-native-label"
                value={key}
                onChange={handleKeyChange}
                input={<Input id="demo-dialog-native" />}
              >
                <MenuItem value={'C'}>C</MenuItem>
                <MenuItem value={'C#'}>C#</MenuItem>
                <MenuItem value={'D'}>D</MenuItem>
                <MenuItem value={'D#'}>D#</MenuItem>
                <MenuItem value={'E'}>E</MenuItem>
                <MenuItem value={'F'}>F</MenuItem>
                <MenuItem value={'F#'}>F#</MenuItem>
                <MenuItem value={'G'}>G</MenuItem>
                <MenuItem value={'G#'}>G#</MenuItem>
                <MenuItem value={'A'}>A</MenuItem>
                <MenuItem value={'A#'}>A#</MenuItem>
                <MenuItem value={'B'}>B</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-select-input">Mood</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={mood === '' ? 'maj' : 'm'}
                onChange={handleMoodChange}
                input={<Input id="demo-dialog-select-input" />}
              >
                <MenuItem value={'maj'}>{getMoodLabel('')}</MenuItem>
                <MenuItem value={'m'}>{getMoodLabel('m')}</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleClose} color="inherit">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
