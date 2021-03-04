import { FormControl, IconButton, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import { Button as MatButton } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Icon } from '../global/Icon';
import SettingsIcon from '@material-ui/icons/Settings';
import { ChordModel } from '../../dataset/all_chords_for_impro';
import { theme } from '../../utils/theme';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { chordsAdderStore } from '../../context/ChordsAdderContext';

import { SettingsModal } from './SettingsModal';

interface Props {}

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

export const Settings = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
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
    <Container>
      <IconButton
        onClick={() => setIsOpen(true)}
        className={classes.icon}
        edge="start"
        aria-label="menu"
      >
        <Icon type="material" Icon={SettingsIcon} className="play-icon" />
      </IconButton>
      <SettingsModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Container>
  );
};

const Container = styled.div``;
